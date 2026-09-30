import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Trash2, 
  ExternalLink, 
  Plus,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { Trade, SetupType, AssetClass } from '../types/trade';

interface TradeLogViewProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
  onDeleteTrade: (tradeId: string) => void;
  onOpenNewTrade: () => void;
}

export const TradeLogView: React.FC<TradeLogViewProps> = ({
  trades,
  onSelectTrade,
  onDeleteTrade,
  onOpenNewTrade
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [symbolFilter, setSymbolFilter] = useState('ALL');
  const [outcomeFilter, setOutcomeFilter] = useState<'ALL' | 'WIN' | 'LOSS'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'BUY' | 'SELL'>('ALL');
  const [setupFilter, setSetupFilter] = useState<string>('ALL');

  // Extract unique symbols & setups for filters
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

  // Filtered trades
  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      const net = t.profit + t.commission + t.swap;
      
      // Search term
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        const matchSymbol = t.symbol.toLowerCase().includes(q);
        const matchTicket = t.ticket.toString().includes(q);
        const matchNotes = t.notes ? t.notes.toLowerCase().includes(q) : false;
        if (!matchSymbol && !matchTicket && !matchNotes) return false;
      }

      // Symbol
      if (symbolFilter !== 'ALL' && t.symbol !== symbolFilter) return false;

      // Type
      if (typeFilter !== 'ALL' && t.type !== typeFilter) return false;

      // Outcome
      if (outcomeFilter === 'WIN' && net <= 0) return false;
      if (outcomeFilter === 'LOSS' && net >= 0) return false;

      // Setup
      if (setupFilter !== 'ALL' && t.setup !== setupFilter) return false;

      return true;
    }).sort((a, b) => new Date(b.closeTime).getTime() - new Date(a.closeTime).getTime());
  }, [trades, searchTerm, symbolFilter, typeFilter, outcomeFilter, setupFilter]);

  // Export filtered to CSV
  const handleExportCSV = () => {
    const headers = ['Ticket', 'Date', 'Symbol', 'Type', 'Volume', 'OpenPrice', 'ClosePrice', 'Profit', 'Pips', 'RR', 'Setup', 'Notes'];
    const rows = filteredTrades.map(t => [
      t.ticket,
      t.closeTime,
      t.symbol,
      t.type,
      t.volume,
      t.openPrice,
      t.closePrice,
      (t.profit + t.commission + t.swap).toFixed(2),
      t.pips,
      t.rrRatio || '',
      `"${t.setup || ''}"`,
      `"${(t.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tradezella_trades_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredNet = filteredTrades.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
  const totalFilteredWins = filteredTrades.filter(t => (t.profit + t.commission + t.swap) > 0).length;
  const filteredWinRate = filteredTrades.length > 0 ? Math.round((totalFilteredWins / filteredTrades.length) * 100) : 0;

  return (
    <div className="space-y-4 max-w-[1520px] mx-auto pb-16">
      
      {/* Top Filter and Search Bar */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索交易品种、订单号 (Ticket)、或复盘笔记..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#141b29] border border-[#20293d] rounded-lg text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Filters cluster */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Outcome Filter */}
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value as any)}
              className="text-xs bg-[#141b29] border border-[#20293d] text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">全部结果 (盈 & 亏)</option>
              <option value="WIN">仅看盈利单 (Wins)</option>
              <option value="LOSS">仅看亏损单 (Losses)</option>
            </select>

            {/* Symbol Filter */}
            <select
              value={symbolFilter}
              onChange={(e) => setSymbolFilter(e.target.value)}
              className="text-xs bg-[#141b29] border border-[#20293d] text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">全部品种 (Symbols)</option>
              {symbols.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Direction Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="text-xs bg-[#141b29] border border-[#20293d] text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">全部方向 (BUY & SELL)</option>
              <option value="BUY">做多 (BUY)</option>
              <option value="SELL">做空 (SELL)</option>
            </select>

            {/* Setup Filter */}
            <select
              value={setupFilter}
              onChange={(e) => setSetupFilter(e.target.value)}
              className="text-xs bg-[#141b29] border border-[#20293d] text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="ALL">全部交易策略 (Setups)</option>
              {setups.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* Export CSV button */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#141b29] hover:bg-[#1b2438] text-slate-200 border border-[#20293d] transition-colors"
              title="导出当前筛选数据为 CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>导出 CSV</span>
            </button>

            {/* New Trade button */}
            <button
              onClick={onOpenNewTrade}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>添加记录</span>
            </button>

          </div>

        </div>

        {/* Quick summary strip of filtered results */}
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-[#1a2336] gap-2 font-mono">
          <div className="flex items-center gap-3">
            <span>当前筛选: <strong className="text-slate-200 font-semibold">{filteredTrades.length}</strong> 笔交易</span>
            <span>·</span>
            <span>胜率: <strong className="text-emerald-400">{filteredWinRate}%</strong></span>
            <span>·</span>
            <span>筛选净盈亏: <strong className={totalFilteredNet >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {totalFilteredNet >= 0 ? '+' : ''}${totalFilteredNet.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </strong></span>
          </div>
          <div className="text-[11px] text-slate-400">
            支持点击行查看单笔复盘、心理标签与复盘图表
          </div>
        </div>

      </div>

      {/* Trades Table */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1b2436] bg-[#0e131d] text-slate-400 font-medium">
                <th className="py-3 px-3.5">订单号/时间</th>
                <th className="py-3 px-3.5">标的/方向</th>
                <th className="py-3 px-3.5 text-right">手数 (Lots)</th>
                <th className="py-3 px-3.5 text-right">开仓价 → 平仓价</th>
                <th className="py-3 px-3.5 text-right">点数 (Pips)</th>
                <th className="py-3 px-3.5 text-right">净盈亏 (USD)</th>
                <th className="py-3 px-3.5 text-right">盈亏比 (R:R)</th>
                <th className="py-3 px-3.5">策略模型 / 心理状态</th>
                <th className="py-3 px-3.5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161f2e] font-mono">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 font-sans">
                    <div>未找到匹配的交易记录</div>
                    <div className="text-xs text-slate-400 mt-1">请调整搜索关键字或筛选条件</div>
                  </td>
                </tr>
              ) : (
                filteredTrades.map((t) => {
                  const net = t.profit + t.commission + t.swap;
                  const isWin = net > 0;
                  const isLoss = net < 0;
                  const dt = new Date(t.closeTime);
                  const dateStr = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
                  const timeStr = `${String(dt.getHours()).padStart(2, '0')}:${String(dt.getMinutes()).padStart(2, '0')}`;

                  return (
                    <tr 
                      key={t.id}
                      onClick={() => onSelectTrade(t)}
                      className="hover:bg-[#141b29] transition-colors cursor-pointer group"
                    >
                      {/* Ticket & Time */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-200">#{t.ticket}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{dateStr} {timeStr}</div>
                      </td>

                      {/* Symbol & Direction */}
                      <td className="py-3 px-3.5">
                        <div className="font-sans font-bold text-white flex items-center gap-1.5">
                          <span>{t.symbol}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                            t.type === 'BUY' 
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}>
                            {t.type}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans mt-0.5">{t.assetClass}</div>
                      </td>

                      {/* Volume */}
                      <td className="py-3 px-3.5 text-right font-medium text-slate-200">
                        {t.volume.toFixed(2)}
                      </td>

                      {/* Entry -> Exit */}
                      <td className="py-3 px-3.5 text-right text-slate-300">
                        <div>{t.openPrice.toLocaleString()}</div>
                        <div className="text-[11px] text-slate-400">→ {t.closePrice.toLocaleString()}</div>
                      </td>

                      {/* Pips */}
                      <td className="py-3 px-3.5 text-right">
                        <span className={t.pips >= 0 ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}>
                          {t.pips >= 0 ? '+' : ''}{t.pips}
                        </span>
                      </td>

                      {/* Net Profit */}
                      <td className="py-3 px-3.5 text-right">
                        <div className={`font-bold text-sm ${isWin ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-slate-200'}`}>
                          {net >= 0 ? '+' : ''}${net.toFixed(2)}
                        </div>
                        {(t.commission !== 0 || t.swap !== 0) && (
                          <div className="text-[10px] text-slate-400">
                            佣金 ${(t.commission + t.swap).toFixed(1)}
                          </div>
                        )}
                      </td>

                      {/* RR */}
                      <td className="py-3 px-3.5 text-right">
                        {t.rrRatio ? (
                          <span className={`font-medium ${t.rrRatio >= 2 ? 'text-emerald-400' : t.rrRatio > 0 ? 'text-teal-400' : 'text-rose-400'}`}>
                            {t.rrRatio > 0 ? `+${t.rrRatio.toFixed(1)}R` : `${t.rrRatio.toFixed(1)}R`}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      {/* Setup & Psychology Metadata (Clean unboxed text with separators per constitution) */}
                      <td className="py-3 px-3.5 font-sans max-w-[240px]">
                        <div className="font-medium text-slate-200 truncate">
                          {t.setup || '自由交易'}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
                          {t.emotions && t.emotions.length > 0 && (
                            <span>{t.emotions[0]}</span>
                          )}
                          {t.mistakes && t.mistakes.length > 0 && t.mistakes[0] !== 'None (Disciplined)' && (
                            <>
                              <span>·</span>
                              <span className="text-amber-400/90">{t.mistakes[0]}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right font-sans">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTrade(t);
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-400 hover:bg-[#1a2336] rounded transition-colors"
                            title="查看复盘详情"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`确认删除订单 #${t.ticket} 吗？`)) {
                                onDeleteTrade(t.id);
                              }
                            }}
                            className="p-1 text-slate-400 hover:text-rose-400 hover:bg-[#1a2336] rounded transition-colors"
                            title="删除此单"
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
  );
};
