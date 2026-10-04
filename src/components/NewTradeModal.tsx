import React, { useState, useMemo, useRef } from 'react';
import { X, Check, Save, Star, AlertTriangle, ShieldCheck, Image as ImageIcon, Upload, Activity } from 'lucide-react';
import { Trade, SetupType, EmotionTag, MistakeTag, AssetClass, PositionStatus } from '../types/trade';

interface NewTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTrade: (trade: Trade) => void;
  accountId: string;
  initialData?: Partial<Trade>;
  availableSetups?: string[];
}

export const NewTradeModal: React.FC<NewTradeModalProps> = ({
  isOpen,
  onClose,
  onSaveTrade,
  accountId,
  initialData,
  availableSetups
}) => {
  if (!isOpen) return null;

  const defaultSetups: string[] = [
    'Order Block / FVG',
    'Liquidity Sweep',
    'Breakout & Retest',
    'London Open Breakout',
    'Trend Pullback',
    'Range Mean-Reversion',
    'News Momentum'
  ];

  const setupList: string[] = useMemo(() => {
    if (availableSetups && availableSetups.length > 0) {
      return Array.from(new Set([...availableSetups, ...defaultSetups]));
    }
    return defaultSetups;
  }, [availableSetups]);

  const [positionStatus, setPositionStatus] = useState<PositionStatus>(initialData?.positionStatus || 'CLOSED');
  const [symbol, setSymbol] = useState(initialData?.symbol || 'XAUUSD');
  const [type, setType] = useState<'BUY' | 'SELL'>(initialData?.type || 'BUY');
  const [volume, setVolume] = useState<number>(initialData?.volume || 1.0);
  const [openPrice, setOpenPrice] = useState<number>(initialData?.openPrice || 2908.5);
  const [closePrice, setClosePrice] = useState<number>(initialData?.closePrice || 2924.0);
  const [openTime, setOpenTime] = useState<string>(() => {
    if (initialData?.openTime) return initialData.openTime.slice(0, 16);
    const d = new Date(Date.now() - 3600000 * 2);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [closeTime, setCloseTime] = useState<string>(() => {
    if (initialData?.closeTime) return initialData.closeTime.slice(0, 16);
    const d = new Date();
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [stopLoss, setStopLoss] = useState<number | undefined>(initialData?.stopLoss || 2898.0);
  const [takeProfit, setTakeProfit] = useState<number | undefined>(initialData?.takeProfit || 2930.0);
  const [profit, setProfit] = useState<number>(initialData?.profit || 1550.0);
  const [commission, setCommission] = useState<number>(initialData?.commission || -12.0);
  const [swap, setSwap] = useState<number>(initialData?.swap || 0);
  const [setup, setSetup] = useState<SetupType>(initialData?.setup || setupList[0] || 'Order Block / FVG');
  const [macroDriver, setMacroDriver] = useState<string>(initialData?.macroDriver || '顺应全球流动性扩张 (Global Liquidity Expansion)');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionTag>('Disciplined');
  const [selectedMistake, setSelectedMistake] = useState<MistakeTag>('None (Disciplined)');
  const [rating, setRating] = useState<number>(initialData?.rating || 5);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [chartUrl, setChartUrl] = useState<string | undefined>(initialData?.chartUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen && initialData) {
      if (initialData.symbol) setSymbol(initialData.symbol);
      if (initialData.type) setType(initialData.type);
      if (initialData.volume !== undefined) setVolume(initialData.volume);
      if (initialData.openPrice !== undefined) setOpenPrice(initialData.openPrice);
      if (initialData.closePrice !== undefined) setClosePrice(initialData.closePrice);
      if (initialData.setup) setSetup(initialData.setup);
      if (initialData.notes !== undefined) setNotes(initialData.notes);
      if (initialData.macroDriver) setMacroDriver(initialData.macroDriver);
      if (initialData.positionStatus) setPositionStatus(initialData.positionStatus);
    }
  }, [initialData, isOpen]);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setChartUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Calculate pips and RR on the fly
  const pips = React.useMemo(() => {
    const diff = type === 'BUY' ? closePrice - openPrice : openPrice - closePrice;
    if (symbol.includes('JPY')) return Math.round(diff * 100 * 10) / 10;
    if (['XAUUSD', 'GOLD'].includes(symbol)) return Math.round(diff * 10 * 10) / 10;
    if (['BTCUSD', 'NAS100', 'US30'].includes(symbol)) return Math.round(diff * 10) / 10;
    return Math.round(diff * 10000 * 10) / 10;
  }, [symbol, type, openPrice, closePrice]);

  const rrRatio = React.useMemo(() => {
    if (stopLoss && Math.abs(openPrice - stopLoss) > 0.0001) {
      const risk = Math.abs(openPrice - stopLoss);
      const reward = Math.abs(closePrice - openPrice);
      const ratio = reward / risk;
      return Math.round(ratio * 100) / 100 * (profit >= 0 ? 1 : -1);
    }
    return profit >= 0 ? 2.0 : -1.0;
  }, [openPrice, closePrice, stopLoss, profit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedOpen = openTime ? new Date(openTime).toISOString() : (initialData?.openTime || new Date().toISOString());
    const formattedClose = positionStatus === 'HOLDING' 
      ? '' 
      : (closeTime ? new Date(closeTime).toISOString() : new Date().toISOString());

    const newTrade: Trade = {
      id: initialData?.id || `tr-${Date.now()}`,
      ticket: initialData?.ticket || Math.floor(950000 + Math.random() * 40000),
      symbol: symbol.toUpperCase().trim(),
      assetClass: symbol.includes('USD') && !['XAUUSD', 'BTCUSD'].includes(symbol) ? 'Forex' : 'Commodities',
      type,
      volume,
      openTime: formattedOpen,
      closeTime: formattedClose,
      openPrice,
      closePrice: positionStatus === 'HOLDING' ? (closePrice || openPrice) : closePrice,
      stopLoss,
      takeProfit,
      profit,
      commission,
      swap,
      pips,
      rrRatio,
      setup,
      emotions: [selectedEmotion],
      mistakes: [selectedMistake],
      notes,
      rating,
      chartUrl,
      accountId,
      positionStatus,
      macroDriver
    };

    onSaveTrade(newTrade);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#101622] border border-[#1f2a3f] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a2336] sticky top-0 bg-[#101622] z-10">
          <h3 className="text-base font-bold text-white tracking-tight">
            {initialData ? '编辑交易记录' : '手工记录新交易 (Log Trade)'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 flex-1">
          
          {/* Position Status & Direction Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg bg-[#0e1420] border border-[#1b2538]">
            {/* Position Status */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold text-white">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>持仓状态 (Status)</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {positionStatus === 'HOLDING' ? '当前单仍在持仓中' : '该单已平仓结单'}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#141b29] rounded-lg border border-[#20293d]">
                <button
                  type="button"
                  onClick={() => setPositionStatus('HOLDING')}
                  className={`py-1.5 px-3 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 ${
                    positionStatus === 'HOLDING' 
                      ? 'bg-blue-600/30 text-blue-400 border border-blue-500/50 shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${positionStatus === 'HOLDING' ? 'bg-blue-400 animate-pulse' : 'bg-slate-500'}`}></span>
                  <span>持仓中 (Open)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPositionStatus('CLOSED')}
                  className={`py-1.5 px-3 text-xs font-medium rounded transition-all flex items-center justify-center gap-1.5 ${
                    positionStatus === 'CLOSED' 
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>已平仓 (Closed)</span>
                </button>
              </div>
            </div>

            {/* Direction */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 font-bold text-white">
                多空方向 (Direction)
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#141b29] rounded-lg border border-[#20293d]">
                <button
                  type="button"
                  onClick={() => setType('BUY')}
                  className={`py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    type === 'BUY' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  BUY (做多)
                </button>
                <button
                  type="button"
                  onClick={() => setType('SELL')}
                  className={`py-1.5 text-xs font-mono font-medium rounded transition-colors ${
                    type === 'SELL' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  SELL (做空)
                </button>
              </div>
            </div>
          </div>

          {/* Symbol, Volume, Open Time Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">交易品种 (Symbol)</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="例如: XAUUSD, NAS100"
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">交易手数 (Lots)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">开仓时间 (Open Time)</label>
              <input
                type="datetime-local"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Prices Row: Open, Close/Mark, StopLoss, TakeProfit */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">开仓价格 (Open)</label>
              <input
                type="number"
                step="any"
                value={openPrice}
                onChange={(e) => setOpenPrice(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {positionStatus === 'HOLDING' ? '当前价/参考价 (Mark)' : '平仓价格 (Close)'}
              </label>
              <input
                type="number"
                step="any"
                value={closePrice}
                onChange={(e) => setClosePrice(parseFloat(e.target.value) || 0)}
                required={positionStatus === 'CLOSED'}
                placeholder={positionStatus === 'HOLDING' ? '当前参考价格' : '平仓价'}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">止损位 (SL)</label>
              <input
                type="number"
                step="any"
                value={stopLoss || ''}
                onChange={(e) => setStopLoss(parseFloat(e.target.value) || undefined)}
                placeholder="可选"
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">止盈位 (TP)</label>
              <input
                type="number"
                step="any"
                value={takeProfit || ''}
                onChange={(e) => setTakeProfit(parseFloat(e.target.value) || undefined)}
                placeholder="可选"
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          {/* P&L, Close Time (if closed), and Commission Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {positionStatus === 'HOLDING' ? '当前浮动盈亏 USD (Floating P&L)' : '已结净盈亏 USD (Net Profit)'}
              </label>
              <input
                type="number"
                step="0.01"
                value={profit}
                onChange={(e) => setProfit(parseFloat(e.target.value) || 0)}
                required
                className={`w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs font-mono font-bold focus:outline-none ${
                  profit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              />
            </div>

            {positionStatus === 'CLOSED' ? (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">平仓时间 (Close Time)</label>
                <input
                  type="datetime-local"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">平仓时间</label>
                <div className="w-full bg-[#101622] border border-[#1b2336] rounded-lg px-3 py-1.5 text-xs text-blue-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                  <span>持仓进行中 (未平仓)</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">佣金/隔夜费 (Commission / Swap)</label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="number"
                  step="0.01"
                  value={commission}
                  onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                  placeholder="佣金"
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                />
                <input
                  type="number"
                  step="0.01"
                  value={swap}
                  onChange={(e) => setSwap(parseFloat(e.target.value) || 0)}
                  placeholder="库存费"
                  className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-2 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Macro Driver & Strategy Setup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                <span>宏观驱动归因 (Macro Driver)</span>
                <span className="text-[10px] text-cyan-400 font-sans">第一性原理</span>
              </label>
              <select
                value={macroDriver}
                onChange={(e) => setMacroDriver(e.target.value)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="顺应全球流动性扩张 (Global Liquidity Expansion)">顺应全球流动性扩张 (Global Liquidity Expansion)</option>
                <option value="实际利率中枢下行利好 (Real Yields Falling)">实际利率中枢下行利好 (Real Yields Falling)</option>
                <option value="CFA 基本面内在价值低估 (CFA Value & DCF Discount)">CFA 基本面内在价值低估 (CFA Value & DCF Discount)</option>
                <option value="央行去美元化主权储备购金 (Central Bank De-Dollarization)">央行去美元化主权储备购金 (Central Bank De-Dollarization)</option>
                <option value="利差顺势套息驱动 (Carry Trade Yield Spread)">利差顺势套息驱动 (Carry Trade Yield Spread)</option>
                <option value="地缘政治避险溢价 (Geopolitical Risk Premium)">地缘政治避险溢价 (Geopolitical Risk Premium)</option>
                <option value="纯技术面/纯微观形态交易 (Pure Price Action)">纯技术面/纯微观形态交易 (Pure Price Action)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">战术策略模型 (Setup)</label>
              <select
                value={setup}
                onChange={(e) => setSetup(e.target.value as SetupType)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                {setupList.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Execution Rating & Emotions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">执行自我评分 (1-5)</label>
              <div className="flex items-center gap-1 py-1">
                {[1, 2, 3, 4, 5].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-4 h-4 ${s <= rating ? 'fill-amber-400' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">心理与情绪标签</label>
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value as EmotionTag)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
              >
                <option value="Disciplined">纪律严明 (Disciplined)</option>
                <option value="Calm Execution">冷静执行 (Calm Execution)</option>
                <option value="FOMO">踏空恐慌 (FOMO)</option>
                <option value="Revenge Trade">报复性交易 (Revenge Trade)</option>
                <option value="Hesitant">犹豫不决 (Hesitant)</option>
                <option value="Greedy">贪婪扛单 (Greedy)</option>
                <option value="Over-Confident">盲目自信 (Over-Confident)</option>
              </select>
            </div>
          </div>

          {/* Execution Mistake Tag */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">执行失误标记 (Mistake Tag)</label>
            <select
              value={selectedMistake}
              onChange={(e) => setSelectedMistake(e.target.value as MistakeTag)}
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="None (Disciplined)">无违规 (Perfect Execution)</option>
              <option value="Moved Stop Loss">后移止损 (Moved Stop Loss)</option>
              <option value="Early Exit">过早止盈平仓 (Early Exit)</option>
              <option value="Over-Leveraged">仓位过重 (Over-Leveraged)</option>
              <option value="Chased Entry">追高/追空 (Chased Entry)</option>
              <option value="Violated Trading Plan">偏离交易计划 (Violated Plan)</option>
              <option value="Trading in High-Impact News">在无预案重大数据中赌博</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">复盘笔记与得失分析 (Notes)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="入场逻辑是什么？在哪个关键流动性区间出手？平仓是否遵循了交易计划？"
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg p-2.5 text-xs text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Chart Screenshot Upload */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>进出场走势截图 (选填)</span>
              </label>
              {chartUrl && (
                <button
                  type="button"
                  onClick={() => setChartUrl(undefined)}
                  className="text-[11px] text-rose-400 hover:text-rose-300"
                >
                  移除图片
                </button>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
                e.target.value = '';
              }}
              className="hidden"
            />

            {chartUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-[#20293d] bg-[#0c1017] p-1">
                <img src={chartUrl} alt="Chart Preview" className="w-full max-h-[140px] object-contain rounded" />
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-[#20293d] hover:border-cyan-500/50 bg-[#131926] hover:bg-[#162030] cursor-pointer text-slate-400 text-xs transition-colors"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>点击选择图片上传走势图截图</span>
              </div>
            )}
          </div>

          {/* Auto Computed Pips & RR Indicator */}
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0e131d] border border-[#192233] text-xs font-mono">
            <div>盈亏点数: <strong className={pips >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{pips} pips</strong></div>
            <div>实现盈亏比: <strong className={rrRatio >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{rrRatio}R</strong></div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1a2336]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md"
            >
              <Save className="w-3.5 h-3.5" />
              <span>保存交易记录</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
