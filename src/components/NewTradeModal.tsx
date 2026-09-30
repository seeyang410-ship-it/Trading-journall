import React, { useState, useMemo, useRef } from 'react';
import { X, Check, Save, Star, AlertTriangle, ShieldCheck, Image as ImageIcon, Upload } from 'lucide-react';
import { Trade, SetupType, EmotionTag, MistakeTag, AssetClass } from '../types/trade';

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

  const [symbol, setSymbol] = useState(initialData?.symbol || 'XAUUSD');
  const [type, setType] = useState<'BUY' | 'SELL'>(initialData?.type || 'BUY');
  const [volume, setVolume] = useState<number>(initialData?.volume || 1.0);
  const [openPrice, setOpenPrice] = useState<number>(initialData?.openPrice || 2908.5);
  const [closePrice, setClosePrice] = useState<number>(initialData?.closePrice || 2924.0);
  const [stopLoss, setStopLoss] = useState<number | undefined>(initialData?.stopLoss || 2898.0);
  const [takeProfit, setTakeProfit] = useState<number | undefined>(initialData?.takeProfit || 2930.0);
  const [profit, setProfit] = useState<number>(initialData?.profit || 1550.0);
  const [commission, setCommission] = useState<number>(initialData?.commission || -12.0);
  const [swap, setSwap] = useState<number>(initialData?.swap || 0);
  const [setup, setSetup] = useState<SetupType>(initialData?.setup || setupList[0] || 'Order Block / FVG');
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionTag>('Disciplined');
  const [selectedMistake, setSelectedMistake] = useState<MistakeTag>('None (Disciplined)');
  const [rating, setRating] = useState<number>(initialData?.rating || 5);
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [chartUrl, setChartUrl] = useState<string | undefined>(initialData?.chartUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const newTrade: Trade = {
      id: initialData?.id || `tr-${Date.now()}`,
      ticket: initialData?.ticket || Math.floor(950000 + Math.random() * 40000),
      symbol: symbol.toUpperCase().trim(),
      assetClass: symbol.includes('USD') && !['XAUUSD', 'BTCUSD'].includes(symbol) ? 'Forex' : 'Commodities',
      type,
      volume,
      openTime: initialData?.openTime || new Date(Date.now() - 3600000 * 2).toISOString(),
      closeTime: initialData?.closeTime || new Date().toISOString(),
      openPrice,
      closePrice,
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
      accountId
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
          
          {/* Symbol, Type, Volume Row */}
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
              <label className="block text-xs font-medium text-slate-300 mb-1">多空方向 (Direction)</label>
              <div className="grid grid-cols-2 gap-1 p-0.5 bg-[#141b29] rounded-lg border border-[#20293d]">
                <button
                  type="button"
                  onClick={() => setType('BUY')}
                  className={`py-1 text-xs font-mono font-medium rounded transition-colors ${
                    type === 'BUY' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  BUY (多)
                </button>
                <button
                  type="button"
                  onClick={() => setType('SELL')}
                  className={`py-1 text-xs font-mono font-medium rounded transition-colors ${
                    type === 'SELL' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400'
                  }`}
                >
                  SELL (空)
                </button>
              </div>
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
          </div>

          {/* Prices Row: Open, Close, StopLoss, TakeProfit */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">入场价格 (Open)</label>
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
              <label className="block text-xs font-medium text-slate-300 mb-1">平仓价格 (Close)</label>
              <input
                type="number"
                step="any"
                value={closePrice}
                onChange={(e) => setClosePrice(parseFloat(e.target.value) || 0)}
                required
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

          {/* P&L & Commission Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">净盈亏 USD (Profit)</label>
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

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">佣金手续费 (Commission)</label>
              <input
                type="number"
                step="0.01"
                value={commission}
                onChange={(e) => setCommission(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">隔夜利息 (Swap)</label>
              <input
                type="number"
                step="0.01"
                value={swap}
                onChange={(e) => setSwap(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Strategy Setup & Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          </div>

          {/* Psychology & Mistake Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">执行失误标记</label>
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
