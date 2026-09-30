import React, { useState, useMemo } from 'react';
import { 
  ListOrdered, 
  BookOpen, 
  Layers, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Plus, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  Save, 
  Star, 
  Flame, 
  Target, 
  Clock, 
  Compass, 
  X, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles,
  ArrowUpDown,
  FileSpreadsheet
} from 'lucide-react';
import { Trade, DailyJournalEntry, PlaybookStrategy, SetupType } from '../types/trade';

interface TradingJournalViewProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
  onDeleteTrade: (tradeId: string) => void;
  onOpenNewTrade: () => void;
  journals: DailyJournalEntry[];
  onSaveJournal: (entry: DailyJournalEntry) => void;
  playbooks?: PlaybookStrategy[];
  onAddPlaybook?: (playbook: PlaybookStrategy) => void;
  onDeletePlaybook?: (id: string) => void;
  onResetDefaultPlaybooks?: () => void;
  initialSubTab?: 'trades' | 'journal' | 'playbook';
}

export const TradingJournalView: React.FC<TradingJournalViewProps> = ({
  trades,
  onSelectTrade,
  onDeleteTrade,
  onOpenNewTrade,
  journals,
  onSaveJournal,
  playbooks = [],
  onAddPlaybook,
  onDeletePlaybook,
  onResetDefaultPlaybooks,
  initialSubTab = 'trades'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'trades' | 'journal' | 'playbook'>(initialSubTab);

  // ----------------------------------------------------
  // SUB-TAB 1: TRADES LOG STATE & LOGIC
  // ----------------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');
  const [symbolFilter, setSymbolFilter] = useState('ALL');
  const [outcomeFilter, setOutcomeFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [setupFilter, setSetupFilter] = useState<string>('ALL');

  const symbols = useMemo(() => {
    const set = new Set<string>();
    trades.forEach(t => set.add(t.symbol));
    return Array.from(set);
  }, [trades]);

  const setups = useMemo(() => {
    const set = new Set<string>();
    trades.forEach(t => {
      if (t.setup) set.add(t.setup);
    });
    return Array.from(set);
  }, [trades]);

  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
      
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchSymbol = t.symbol.toLowerCase().includes(q);
        const matchTicket = t.ticket.toString().includes(q);
        const matchNotes = t.notes ? t.notes.toLowerCase().includes(q) : false;
        if (!matchSymbol && !matchTicket && !matchNotes) return false;
      }

      if (symbolFilter !== 'ALL' && t.symbol !== symbolFilter) return false;
      if (typeFilter !== 'ALL' && t.type !== typeFilter) return false;
      if (setupFilter !== 'ALL' && t.setup !== setupFilter) return false;

      if (outcomeFilter === 'WIN' && net <= 0) return false;
      if (outcomeFilter === 'LOSS' && net >= 0) return false;

      return true;
    });
  }, [trades, searchTerm, symbolFilter, typeFilter, setupFilter, outcomeFilter]);

  const logMetrics = useMemo(() => {
    const total = filteredTrades.length;
    if (total === 0) return { winRate: 0, netProfit: 0, winsCount: 0, lossCount: 0 };
    const wins = filteredTrades.filter(t => ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)) > 0);
    const losses = filteredTrades.filter(t => ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)) < 0);
    const net = filteredTrades.reduce((acc, t) => acc + ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)), 0);
    return {
      winRate: Math.round((wins.length / total) * 100),
      netProfit: Math.round(net * 100) / 100,
      winsCount: wins.length,
      lossCount: losses.length
    };
  }, [filteredTrades]);

  const handleExportCSV = () => {
    if (trades.length === 0) {
      alert('当前账本暂无订单可供导出');
      return;
    }
    const headers = ['Ticket,Symbol,Type,Volume,OpenTime,CloseTime,OpenPrice,ClosePrice,Profit,Commission,Swap,NetTotal,Setup,Notes\n'];
    const rows = trades.map(t => {
      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
      return `${t.ticket},${t.symbol},${t.type},${t.volume},${t.openTime},${t.closeTime},${t.openPrice},${t.closePrice},${t.profit},${t.commission},${t.swap},${net},"${t.setup || ''}","${(t.notes || '').replace(/"/g, '""')}"\n`;
    });
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trades_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ----------------------------------------------------
  // SUB-TAB 2: DAILY JOURNAL STATE & LOGIC
  // ----------------------------------------------------
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  });

  const currentJournal = useMemo(() => {
    const existing = journals.find(j => j.date === selectedDate);
    if (existing) return existing;
    return {
      id: `j-${selectedDate}`,
      date: selectedDate,
      preMarketPlan: '',
      postMarketReview: '',
      disciplineScore: 5,
      mood: 'Focused' as const,
      rulesFollowed: true,
      lessonsLearned: ''
    };
  }, [journals, selectedDate]);

  const [formState, setFormState] = useState<DailyJournalEntry>(currentJournal);
  const [isSavedBanner, setIsSavedBanner] = useState(false);

  React.useEffect(() => {
    setFormState(currentJournal);
  }, [currentJournal]);

  const dayTrades = useMemo(() => {
    return trades.filter(t => {
      const d = t.closeTime ? t.closeTime.slice(0, 10) : t.openTime.slice(0, 10);
      return d === selectedDate;
    });
  }, [trades, selectedDate]);

  const dayPnL = dayTrades.reduce((acc, t) => acc + ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)), 0);

  const handleSaveJournalEntry = () => {
    onSaveJournal(formState);
    setIsSavedBanner(true);
    setTimeout(() => setIsSavedBanner(false), 2500);
  };

  // ----------------------------------------------------
  // SUB-TAB 3: PLAYBOOK STATE & LOGIC
  // ----------------------------------------------------
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [newPbName, setNewPbName] = useState('');
  const [newPbDesc, setNewPbDesc] = useState('');
  const [newPbTargetRR, setNewPbTargetRR] = useState('1:2.0 - 1:3.0');
  const [newPbSessions, setNewPbSessions] = useState('伦敦盘, 纽约盘');
  const [newPbTimeframes, setNewPbTimeframes] = useState('H1, M15, M5');
  const [newPbRules, setNewPbRules] = useState('');

  const handleCreatePlaybook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPbName.trim() || !onAddPlaybook) return;

    const rulesList = newPbRules
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    const newPb: PlaybookStrategy = {
      id: `pb-${Date.now()}`,
      name: newPbName.trim(),
      description: newPbDesc.trim() || '自定义战术策略模型',
      targetRR: newPbTargetRR.trim() || '1:2.0',
      recommendedSessions: newPbSessions.split(/[,，]/).map(s => s.trim()).filter(Boolean),
      timeframes: newPbTimeframes.split(/[,，]/).map(t => t.trim()).filter(Boolean),
      rules: rulesList.length > 0 ? rulesList : ['严格按照交易计划执行', '单笔止损不超过预设风控上限']
    };

    onAddPlaybook(newPb);
    setIsAddModalOpen(false);
    setNewPbName('');
    setNewPbDesc('');
    setNewPbTargetRR('1:2.0 - 1:3.0');
    setNewPbSessions('伦敦盘, 纽约盘');
    setNewPbTimeframes('H1, M15, M5');
    setNewPbRules('');
  };

  const fillTemplate = (type: 'ict' | 'breakout') => {
    if (type === 'ict') {
      setNewPbName('ICT 银弹战法 (Silver Bullet)');
      setNewPbDesc('利用特定时间窗口掠夺流动性后形成的市场结构破坏与FVG合理价值缺口进场。');
      setNewPbTargetRR('1:2.5 - 1:4.0');
      setNewPbSessions('伦敦早盘 (03:00-04:00 EST), 纽约早盘 (10:00-11:00 EST)');
      setNewPbTimeframes('M15, M5, M1');
      setNewPbRules('1. 确认高周期关键流动性被扫取 (Liquidity Sweep)\n2. 观察M1或M5级别强实体K线破坏市场结构 (MSS)\n3. 回踩FVG 50%水位限价进场\n4. 止损置于保护性结构高低点，目标为对立侧流动性池');
    } else {
      setNewPbName('放量突破与回踩支阻互换 (Breakout & Retest)');
      setNewPbDesc('重要水平供需区放量被打破后，等待缩量回踩支阻互换位确认支撑/阻力顺势跟随。');
      setNewPbTargetRR('1:2.0 - 1:3.0');
      setNewPbSessions('欧洲盘, 纽约盘');
      setNewPbTimeframes('H1, M15');
      setNewPbRules('1. 确认连续2根大阳/大阴K线实体收盘在关键位外侧\n2. 回调测试突破位时出现明显长引线拒绝形态 (Rejection Wick)\n3. 顺势开仓，止损设置在回踩假破波段极值外侧\n4. 分批止盈至前高/前低');
    }
  };

  const playbookStats = useMemo(() => {
    return playbooks.map(pb => {
      const matchingTrades = trades.filter(t => t.setup === pb.name);
      const wins = matchingTrades.filter(t => ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)) > 0).length;
      const net = matchingTrades.reduce((acc, t) => acc + ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)), 0);
      const winRate = matchingTrades.length > 0 ? Math.round((wins / matchingTrades.length) * 100) : 0;
      return {
        ...pb,
        totalTrades: matchingTrades.length,
        winRate,
        netProfit: Math.round(net * 100) / 100
      };
    });
  }, [playbooks, trades]);

  return (
    <div className="space-y-4 max-w-[1520px] mx-auto pb-16">
      
      {/* 1. Header Segmented Bar (Unified 交易日志) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#101622] border border-[#1b2336] rounded-xl p-3 sm:p-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>交易日志 (Trading Journal)</span>
          </h2>
          <div className="text-xs text-slate-400 mt-0.5">
            订单明细记录、每日心态复盘与战术策略手册三合一
          </div>
        </div>

        {/* 3 Sub-tabs Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#141b29] rounded-lg border border-[#20293d]">
          <button
            onClick={() => setActiveSubTab('trades')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'trades' 
                ? 'bg-[#1e293d] text-emerald-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>订单明细</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 ml-0.5">
              {trades.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('journal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'journal' 
                ? 'bg-[#1e293d] text-emerald-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>每日心智复盘</span>
          </button>

          <button
            onClick={() => setActiveSubTab('playbook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeSubTab === 'playbook' 
                ? 'bg-[#1e293d] text-emerald-400 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>战术策略手册</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 ml-0.5">
              {playbooks.length}
            </span>
          </button>
        </div>
      </div>

      {/* 2. SUB-TAB 1: TRADES LIST (订单明细) */}
      {activeSubTab === 'trades' && (
        <div className="space-y-4">
          
          {/* Filter Bar & Quick Stats */}
          <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索品种、单号或笔记备注..."
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 font-sans"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#141b29] hover:bg-[#1a2336] text-slate-200 border border-[#20293d] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-400" />
                  <span>导出 CSV</span>
                </button>

                <button
                  onClick={onOpenNewTrade}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md shadow-emerald-950/40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>记录新交易</span>
                </button>
              </div>

            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1a2336] text-xs">
              <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                <Filter className="w-3 h-3 text-slate-400" /> 快速筛选:
              </span>

              {/* Direction Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="bg-[#141b29] border border-[#20293d] rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">全部方向 (BUY & SELL)</option>
                <option value="BUY">做多 (BUY)</option>
                <option value="SELL">做空 (SELL)</option>
              </select>

              {/* Outcome Filter */}
              <select
                value={outcomeFilter}
                onChange={(e) => setOutcomeFilter(e.target.value as any)}
                className="bg-[#141b29] border border-[#20293d] rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value="ALL">全部盈亏 (盈利 & 亏损)</option>
                <option value="WIN">仅看盈利单 (Wins)</option>
                <option value="LOSS">仅看亏损单 (Losses)</option>
              </select>

              {/* Symbol Filter */}
              {symbols.length > 0 && (
                <select
                  value={symbolFilter}
                  onChange={(e) => setSymbolFilter(e.target.value)}
                  className="bg-[#141b29] border border-[#20293d] rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">全部交易品种</option>
                  {symbols.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              )}

              {/* Setup Filter */}
              {setups.length > 0 && (
                <select
                  value={setupFilter}
                  onChange={(e) => setSetupFilter(e.target.value)}
                  className="bg-[#141b29] border border-[#20293d] rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="ALL">全部战术模型</option>
                  {setups.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              )}

              {/* Reset filter shortcut */}
              {(searchTerm || symbolFilter !== 'ALL' || outcomeFilter !== 'ALL' || typeFilter !== 'ALL' || setupFilter !== 'ALL') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSymbolFilter('ALL');
                    setOutcomeFilter('ALL');
                    setTypeFilter('ALL');
                    setSetupFilter('ALL');
                  }}
                  className="text-[11px] text-rose-400 hover:text-rose-300 ml-auto"
                >
                  重置筛选
                </button>
              )}
            </div>

            {/* Quick Filtered Summary Strip */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-400">
              <div>
                筛选记录: <strong className="text-white">{filteredTrades.length}</strong> 笔
              </div>
              <div>
                胜率: <strong className="text-emerald-400">{logMetrics.winRate}%</strong> ({logMetrics.winsCount}胜 {logMetrics.lossCount}负)
              </div>
              <div>
                筛选净利: <strong className={logMetrics.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {logMetrics.netProfit >= 0 ? '+' : ''}${logMetrics.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </strong>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-[#101622] border border-[#1b2336] rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-[#131926] border-b border-[#1b2438] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">订单号</th>
                    <th className="py-3 px-4">标的品种</th>
                    <th className="py-3 px-4">方向</th>
                    <th className="py-3 px-4">手数</th>
                    <th className="py-3 px-4">开仓价 → 平仓价</th>
                    <th className="py-3 px-4">开平仓时间</th>
                    <th className="py-3 px-4">点数 (Pips)</th>
                    <th className="py-3 px-4">战术模型 (Setup)</th>
                    <th className="py-3 px-4 text-right">净盈亏 (Net P&L)</th>
                    <th className="py-3 px-4 text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#182133] font-mono">
                  {filteredTrades.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-12 text-center text-slate-400 font-sans">
                        <FileSpreadsheet className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                        <div>暂无符合筛选条件的交易订单</div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          点击上方「记录新交易」或顶部「导入数据」开始记账
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredTrades.map((t) => {
                      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
                      const isProfit = net >= 0;
                      return (
                        <tr 
                          key={t.id}
                          className="hover:bg-[#141b29] transition-colors group cursor-pointer"
                          onClick={() => onSelectTrade(t)}
                        >
                          <td className="py-3 px-4 text-slate-400">
                            #{t.ticket}
                          </td>
                          <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                            <span>{t.symbol}</span>
                            <span className="text-[10px] font-normal px-1 py-0.2 rounded bg-[#182234] text-slate-400 font-sans">
                              {t.assetClass}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              t.type === 'BUY' 
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}>
                              {t.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-200">
                            {t.volume.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {t.openPrice.toFixed(2)} → {t.closePrice.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-[11px]">
                            {t.closeTime ? t.closeTime.slice(5, 16).replace('T', ' ') : t.openTime.slice(5, 16).replace('T', ' ')}
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {t.pips > 0 ? `+${t.pips}` : t.pips}
                          </td>
                          <td className="py-3 px-4 font-sans text-xs">
                            <span className="px-2 py-0.5 rounded bg-[#162033] text-cyan-300 border border-[#223350] text-[11px]">
                              {t.setup || '自由交易'}
                            </span>
                          </td>
                          <td className={`py-3 px-4 text-right font-bold text-sm ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isProfit ? '+' : ''}${net.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => onSelectTrade(t)}
                                className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1f2b42] transition-colors"
                                title="查看订单详情"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`确认删除订单 #${t.ticket} 吗？`)) {
                                    onDeleteTrade(t.id);
                                  }
                                }}
                                className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-[#1f2b42] transition-colors"
                                title="删除该笔订单"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* 3. SUB-TAB 2: DAILY JOURNAL (每日心智复盘) */}
      {activeSubTab === 'journal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Date & Day Snapshot (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1a2336]">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>选择复盘日期</span>
                </div>
                <button
                  onClick={() => {
                    const d = new Date();
                    setSelectedDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
                  }}
                  className="text-[11px] text-emerald-400 hover:text-emerald-300"
                >
                  今天
                </button>
              </div>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
              />

              {/* Day Trades & PnL Summary */}
              <div className="mt-4 pt-3 border-t border-[#1a2336]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400">当日平仓订单:</span>
                  <span className="font-mono text-slate-200">{dayTrades.length} 笔</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">当日净盈亏:</span>
                  <span className={`font-mono font-bold ${dayPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {dayPnL >= 0 ? '+' : ''}${dayPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {dayTrades.length > 0 && (
                  <div className="mt-3 space-y-1.5 max-h-[160px] overflow-y-auto">
                    {dayTrades.map(t => {
                      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
                      return (
                        <div key={t.id} className="p-2 rounded bg-[#131926] border border-[#1c263b] text-xs flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className={`font-bold font-mono text-[10px] px-1 rounded ${t.type === 'BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                              {t.type}
                            </span>
                            <span className="font-semibold text-slate-200">{t.symbol}</span>
                          </div>
                          <span className={`font-mono font-semibold ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {net >= 0 ? '+' : ''}${net.toFixed(1)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Discipline Scorecard */}
            <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 space-y-3">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-amber-400" />
                <span>风控纪律自评打分</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">今日交易心态</label>
                <select
                  value={formState.mood}
                  onChange={(e) => setFormState({ ...formState, mood: e.target.value as any })}
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="Focused">🎯 极度专注 · 严格按计划</option>
                  <option value="Neutral">⚖️ 平和冷静 · 正常发挥</option>
                  <option value="Anxious">😰 焦虑迟疑 · 错失良机</option>
                  <option value="Euphoric">🚀 过于兴奋 · 警惕自满</option>
                  <option value="Frustrated">😡 沮丧冲动 · 有报复交易倾向</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">纪律评分 (1 - 5 星)</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormState({ ...formState, disciplineScore: star })}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= formState.disciplineScore ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#1a2336] flex items-center justify-between">
                <span className="text-xs text-slate-300">是否完全遵守既定交易规则？</span>
                <button
                  type="button"
                  onClick={() => setFormState({ ...formState, rulesFollowed: !formState.rulesFollowed })}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    formState.rulesFollowed 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {formState.rulesFollowed ? '✓ 严格遵守' : '✕ 有违规执行'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Pre-Market & Post-Market Journal (8 cols) */}
          <div className="lg:col-span-8 bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 space-y-4">
            
            {/* Pre-Market Plan */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>盘前推演与策略计划 (Pre-Market Plan)</span>
                </label>
                <span className="text-[11px] text-slate-400">开盘前记录核心关注品种、关键流动性区与预设止损范围</span>
              </div>
              <textarea
                rows={4}
                value={formState.preMarketPlan}
                onChange={(e) => setFormState({ ...formState, preMarketPlan: e.target.value })}
                placeholder="例如：&#10;1. XAUUSD 欧盘观察 2910 美元处流动性扫荡，若收长影线则在 2905 回踩处试多；&#10;2. 严格执行单笔 1% 止损原则，不追高；&#10;3. 美盘前 15 分钟关注非农数据波动..."
                className="w-full bg-[#131926] border border-[#20293d] rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-500/50 leading-relaxed font-sans"
              />
            </div>

            {/* Post-Market Review */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>盘后复盘与心态反思 (Post-Market Review)</span>
                </label>
                <span className="text-[11px] text-slate-400">收盘后回顾执行情况、是否存在情绪化追单或过早平仓</span>
              </div>
              <textarea
                rows={4}
                value={formState.postMarketReview}
                onChange={(e) => setFormState({ ...formState, postMarketReview: e.target.value })}
                placeholder="例如：&#10;今天黄金第1单执行较好，严格等待了回踩；但第2单在欧盘加速时有轻微 FOMO 追单迹象，幸好及时止损，后续需加强耐受力..."
                className="w-full bg-[#131926] border border-[#20293d] rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 leading-relaxed font-sans"
              />
            </div>

            {/* Lessons Learned */}
            <div>
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>核心经验教训与明天改进点 (Lessons Learned)</span>
              </label>
              <textarea
                rows={2}
                value={formState.lessonsLearned}
                onChange={(e) => setFormState({ ...formState, lessonsLearned: e.target.value })}
                placeholder="一句话总结今天的核心领悟，例如：不符合战法清单的行情，哪怕涨上天也不碰！"
                className="w-full bg-[#131926] border border-[#20293d] rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-amber-500/50 leading-relaxed"
              />
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1a2336]">
              {isSavedBanner ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>日记已成功保存并同步！</span>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  日记将自动关联到对应日期的日历热力图
                </span>
              )}

              <button
                onClick={handleSaveJournalEntry}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>保存今日日记</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 4. SUB-TAB 3: PLAYBOOK LIBRARY (战术策略手册: 新增与删除) */}
      {activeSubTab === 'playbook' && (
        <div className="space-y-4">
          
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#101622] border border-[#1b2336] rounded-xl p-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight">我的交易战术策略手册 (Playbook Library)</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  共 {playbooks.length} 套战法
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                制定并沉淀符合您风格的核心进出场规则模型。记账时可直接选择对应战法，系统将自动核算该战法的真实胜率与收益贡献。
              </p>
            </div>

            <div className="flex items-center gap-2">
              {onResetDefaultPlaybooks && playbooks.length < 3 && (
                <button
                  onClick={onResetDefaultPlaybooks}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-[#141b29] hover:bg-[#1b2438] text-slate-300 border border-[#20293d] transition-colors"
                  title="恢复官方推荐的 ICT / 突破回踩 / 均线等经典策略"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>恢复预设战法推荐</span>
                </button>
              )}

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-950/40 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>新增战法策略</span>
              </button>
            </div>
          </div>

          {/* Delete Confirmation Alert Banner */}
          {deleteConfirmId && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/40 rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  确认删除战法<strong>「{playbooks.find(p => p.id === deleteConfirmId)?.name}」</strong>吗？已有关联此战法的历史订单将保留。
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="px-3 py-1 text-xs rounded bg-[#182338] text-slate-300 hover:text-white"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (onDeletePlaybook && deleteConfirmId) {
                      onDeletePlaybook(deleteConfirmId);
                    }
                    setDeleteConfirmId(null);
                  }}
                  className="px-3 py-1 text-xs font-semibold rounded bg-rose-500 hover:bg-rose-400 text-white shadow-sm"
                >
                  确认删除
                </button>
              </div>
            </div>
          )}

          {/* Playbook Cards Grid */}
          {playbookStats.length === 0 ? (
            <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <Layers className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-200">暂无战术策略模型</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                建立明确的交易战法是稳定盈利的第一步。您可以点击下方按钮新增您自己的策略，或一键恢复推荐经典模型。
              </p>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>新增我的第一套战法</span>
                </button>
                {onResetDefaultPlaybooks && (
                  <button
                    onClick={onResetDefaultPlaybooks}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1a2336] text-slate-200 border border-[#20293d] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>恢复推荐经典战法</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {playbookStats.map(pb => (
                <div 
                  key={pb.id} 
                  className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-col justify-between group hover:border-[#2a3854] transition-all shadow-sm"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#1a2336]">
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-sm font-bold text-white tracking-tight truncate" title={pb.name}>
                          {pb.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          目标盈亏比: <strong className="text-slate-200">{pb.targetRR}</strong>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right font-mono">
                          <div className={`text-xs font-bold ${pb.winRate >= 50 ? 'text-emerald-400' : 'text-slate-400'}`}>
                            {pb.totalTrades > 0 ? `${pb.winRate}% 胜率` : '暂无数据'}
                          </div>
                          <div className="text-[10px] text-slate-400">{pb.totalTrades} 笔实盘</div>
                        </div>

                        <button
                          onClick={() => setDeleteConfirmId(pb.id)}
                          className="flex items-center gap-1 px-2 py-1 text-[11px] text-slate-400 hover:text-rose-400 bg-[#141b29] hover:bg-rose-500/10 rounded border border-[#20293d] hover:border-rose-500/30 transition-colors cursor-pointer"
                          title="删除此战法"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">删除</span>
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                      {pb.description}
                    </p>

                    {/* Checklist rules */}
                    <div className="mt-3.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>进场确认准则 (Checklist):</span>
                        <span className="text-[10px] text-slate-400 font-mono">{pb.rules.length} 条</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300 bg-[#0d121c] p-2.5 rounded-lg border border-[#172030]">
                        {pb.rules.map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5 text-xs font-bold shrink-0">✓</span>
                            <span className="leading-snug text-slate-200">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Sessions & PnL */}
                  <div className="pt-3 mt-4 border-t border-[#1a2336] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div className="truncate max-w-[160px]" title={pb.timeframes.join(', ')}>
                      周期: {pb.timeframes.join(', ')}
                    </div>
                    <div className={pb.netProfit >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      贡献: {pb.netProfit >= 0 ? '+' : ''}${pb.netProfit.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* Modal: Add New Playbook Strategy */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#101622] border border-[#1f2a3f] rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1a2336]">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>新增交易战术策略模型</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  设定明确的入场条件与盈亏优势来源，保持严谨的交易执行
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Fill Preset Templates */}
            <div className="px-5 pt-4 pb-1 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">快捷填入常用模板:</span>
              <button
                type="button"
                onClick={() => fillTemplate('ict')}
                className="px-2.5 py-1 rounded bg-[#162033] hover:bg-[#1c2942] text-cyan-300 border border-[#253654] transition-colors text-xs flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>ICT 银弹战法</span>
              </button>
              <button
                type="button"
                onClick={() => fillTemplate('breakout')}
                className="px-2.5 py-1 rounded bg-[#162033] hover:bg-[#1c2942] text-emerald-300 border border-[#253654] transition-colors text-xs flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>突破回踩支阻互换</span>
              </button>
            </div>

            <form onSubmit={handleCreatePlaybook} className="p-5 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">战法名称 (Setup Name) *</label>
                <input
                  type="text"
                  value={newPbName}
                  onChange={(e) => setNewPbName(e.target.value)}
                  placeholder="例如: 欧盘假破扫单, 20/50 均线趋势回踩, 机构订单块FVG"
                  required
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">战术逻辑与核心依据 (Description)</label>
                <textarea
                  rows={2}
                  value={newPbDesc}
                  onChange={(e) => setNewPbDesc(e.target.value)}
                  placeholder="简述该战术的入场逻辑与盈亏优势来源，为什么在这个位置盈亏比合算..."
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">目标盈亏比 (Target R:R)</label>
                  <input
                    type="text"
                    value={newPbTargetRR}
                    onChange={(e) => setNewPbTargetRR(e.target.value)}
                    placeholder="例如: 1:2.0 - 1:3.0"
                    className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-1">适用时间周期 (Timeframes)</label>
                  <input
                    type="text"
                    value={newPbTimeframes}
                    onChange={(e) => setNewPbTimeframes(e.target.value)}
                    placeholder="例如: H1, M15, M5"
                    className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1">适用交易时段 (Sessions)</label>
                <input
                  type="text"
                  value={newPbSessions}
                  onChange={(e) => setNewPbSessions(e.target.value)}
                  placeholder="例如: 伦敦早盘, 纽约开盘"
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
                  <span>进场检查清单准则 (每行一条准则)</span>
                  <span className="text-[11px] text-slate-400 font-normal">换行添加新规则</span>
                </label>
                <textarea
                  rows={4}
                  value={newPbRules}
                  onChange={(e) => setNewPbRules(e.target.value)}
                  placeholder="1. 高级别确认流动性掠夺&#10;2. 出现市场结构破坏 MSS&#10;3. 回踩 50% 缺口挂单进场&#10;4. 止损置于保护极值"
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg p-2.5 text-xs text-slate-200 font-mono placeholder:text-slate-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1a2336]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md cursor-pointer"
                >
                  保存并加入手册
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
