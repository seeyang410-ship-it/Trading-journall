import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Activity, 
  Sliders, 
  Plus, 
  RefreshCw,
  Maximize2,
  BarChart2,
  Layers
} from 'lucide-react';
import { MarketQuote } from '../types/trade';
import { 
  INITIAL_QUOTES, 
  getCurrentMarketSessions, 
  generateCandlesForSymbol, 
  Candle 
} from '../services/marketData';

interface MarketViewProps {
  onLogTradeFromMarket: (symbol: string, currentPrice: number) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({ onLogTradeFromMarket }) => {
  const [quotes, setQuotes] = useState<MarketQuote[]>(INITIAL_QUOTES);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('XAUUSD');
  const [timeframe, setTimeframe] = useState<'M1' | 'M5' | 'M15' | 'H1' | 'D1'>('M15');
  const [showEMA, setShowEMA] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  const selectedQuote = useMemo(() => {
    return quotes.find(q => q.symbol === selectedSymbol) || quotes[0];
  }, [quotes, selectedSymbol]);

  // Load candles when selected symbol or timeframe changes
  useEffect(() => {
    if (selectedQuote) {
      const generated = generateCandlesForSymbol(selectedQuote.symbol, selectedQuote.price, 36);
      setCandles(generated);
    }
  }, [selectedSymbol, timeframe]);

  // Real-time market tick simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setQuotes(prevQuotes => {
        return prevQuotes.map(q => {
          // 40% chance of price micro-tick per second
          if (Math.random() < 0.4) {
            const spreadDelta = (Math.random() - 0.49) * (q.digits === 5 ? 0.00015 : q.digits === 3 ? 0.02 : q.price * 0.0003);
            const newPrice = Math.max(0.0001, q.price + spreadDelta);
            const change = newPrice - q.prevClose;
            const changePercent = (change / q.prevClose) * 100;
            const roundedPrice = Math.round(newPrice * Math.pow(10, q.digits)) / Math.pow(10, q.digits);
            return {
              ...q,
              price: roundedPrice,
              bid: roundedPrice - (q.spread * (q.digits === 5 ? 0.0001 : 0.01)),
              ask: roundedPrice + (q.spread * (q.digits === 5 ? 0.0001 : 0.01)),
              change: Math.round(change * 1000) / 1000,
              changePercent: Math.round(changePercent * 100) / 100
            };
          }
          return q;
        });
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const sessions = useMemo(() => getCurrentMarketSessions(), []);

  // SVG Candlestick Chart Dimensions & Calculations
  const chartW = 860;
  const candleAreaH = 260;
  const rsiAreaH = showRSI ? 80 : 0;
  const totalChartH = candleAreaH + rsiAreaH + 40;
  const pad = { top: 20, right: 65, bottom: 25, left: 15 };

  const { candlePaths, ema20Path, rsiPath, priceMin, priceMax, yPriceTicks } = useMemo(() => {
    if (!candles.length) {
      return { candlePaths: [], ema20Path: '', rsiPath: '', priceMin: 0, priceMax: 0, yPriceTicks: [] };
    }

    const highs = candles.map(c => c.high);
    const lows = candles.map(c => c.low);
    let min = Math.min(...lows);
    let max = Math.max(...highs);
    const margin = (max - min) * 0.08 || 1;
    min -= margin;
    max += margin;

    const innerW = chartW - pad.left - pad.right;
    const innerH = candleAreaH - pad.top;
    const barWidth = Math.max(6, Math.min(18, (innerW / candles.length) * 0.65));

    // Candles
    const renderedCandles = candles.map((c, i) => {
      const cx = pad.left + (i + 0.5) * (innerW / candles.length);
      const isBull = c.close >= c.open;
      const topY = pad.top + innerH - ((Math.max(c.open, c.close) - min) / (max - min)) * innerH;
      const botY = pad.top + innerH - ((Math.min(c.open, c.close) - min) / (max - min)) * innerH;
      const highY = pad.top + innerH - ((c.high - min) / (max - min)) * innerH;
      const lowY = pad.top + innerH - ((c.low - min) / (max - min)) * innerH;
      const bodyH = Math.max(2, botY - topY);

      return {
        cx,
        topY,
        bodyH,
        highY,
        lowY,
        isBull,
        candle: c,
        barWidth
      };
    });

    // EMA 20 line path
    let emaPath = '';
    candles.forEach((c, i) => {
      if (c.ema20) {
        const x = pad.left + (i + 0.5) * (innerW / candles.length);
        const y = pad.top + innerH - ((c.ema20 - min) / (max - min)) * innerH;
        emaPath += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      }
    });

    // RSI Path
    let rPath = '';
    if (showRSI) {
      const rsiTop = candleAreaH + 15;
      const rsiInnerH = rsiAreaH - 20;
      candles.forEach((c, i) => {
        if (c.rsi !== undefined) {
          const x = pad.left + (i + 0.5) * (innerW / candles.length);
          const y = rsiTop + rsiInnerH - (c.rsi / 100) * rsiInnerH;
          rPath += `${rPath === '' ? 'M' : 'L'} ${x},${y} `;
        }
      });
    }

    // Price ticks on Y axis
    const ticks = [0, 0.25, 0.5, 0.75, 1].map(pct => {
      const val = min + (max - min) * pct;
      const y = pad.top + innerH - pct * innerH;
      return { val, y };
    });

    return {
      candlePaths: renderedCandles,
      ema20Path: emaPath,
      rsiPath: rPath,
      priceMin: min,
      priceMax: max,
      yPriceTicks: ticks
    };
  }, [candles, showRSI]);

  return (
    <div className="space-y-4 max-w-[1520px] mx-auto pb-16">
      
      {/* 1. Global Market Trading Sessions Bar */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">全球交易时段状态</span>
            <span className="text-xs text-slate-400 font-mono">UTC {new Date().toUTCString().slice(17, 22)}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
            {sessions.map(s => (
              <div 
                key={s.name}
                className={`px-3 py-1.5 rounded-lg border text-xs flex items-center justify-between gap-3 ${
                  s.isOpen 
                    ? s.isPeakOverlap 
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300' 
                      : 'bg-[#141d2c] border-[#223048] text-slate-200' 
                    : 'bg-[#0f1420] border-[#182133] text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${s.isOpen ? 'bg-emerald-400' : 'bg-slate-400'}`} />
                  <span className="font-medium">{s.city}</span>
                </div>
                <div className="text-[11px] font-mono">
                  {s.isOpen ? (s.isPeakOverlap ? '⚡ 重叠高峰' : '开盘中') : '休市'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content: Watchlist Table on Left + Technical Chart on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Watchlist Table (4 cols on lg) */}
        <div className="lg:col-span-4 bg-[#101622] border border-[#1b2336] rounded-xl p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a2336] mb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>实时自选行情 (Watchlist)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">1.2s 刷新</span>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[580px] pr-1">
            {quotes.map(q => {
              const isSelected = q.symbol === selectedSymbol;
              const isPos = q.change >= 0;

              return (
                <button
                  key={q.symbol}
                  onClick={() => setSelectedSymbol(q.symbol)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'bg-[#172236] border-emerald-500/40 shadow-sm' 
                      : 'bg-[#121824] hover:bg-[#151c2a] border-[#1c263b]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-mono">{q.symbol}</span>
                      <span className="text-[10px] text-slate-400 bg-[#0d121c] px-1 py-0.2 rounded font-sans">
                        {q.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[130px] mt-0.5">
                      {q.name}
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-sm font-bold text-slate-100">
                      {q.price.toFixed(q.digits)}
                    </div>
                    <div className={`text-[11px] flex items-center justify-end gap-1 mt-0.5 ${isPos ? 'text-emerald-400 font-medium' : 'text-rose-400 font-medium'}`}>
                      {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{isPos ? '+' : ''}{q.changePercent.toFixed(2)}%</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Action from Selected Quote */}
          <div className="pt-3 mt-3 border-t border-[#1a2336]">
            <button
              onClick={() => onLogTradeFromMarket(selectedQuote.symbol, selectedQuote.price)}
              className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>以此品种快速记账 ({selectedQuote.symbol})</span>
            </button>
          </div>
        </div>

        {/* Right Technical Chart (8 cols on lg) */}
        <div className="lg:col-span-8 bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          
          {/* Chart Header Bar */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1a2336] mb-3">
              
              {/* Symbol & Price Summary */}
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-mono text-white tracking-tight">
                      {selectedQuote.symbol}
                    </h2>
                    <span className="text-xs text-slate-400">
                      {selectedQuote.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono mt-1">
                    <span className="text-base font-bold text-white">
                      ${selectedQuote.price.toFixed(selectedQuote.digits)}
                    </span>
                    <span className={selectedQuote.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedQuote.change >= 0 ? '+' : ''}{selectedQuote.change.toFixed(selectedQuote.digits)} ({selectedQuote.changePercent.toFixed(2)}%)
                    </span>
                    <span className="text-slate-400 hidden sm:inline">点差: {selectedQuote.spread} pips</span>
                  </div>
                </div>
              </div>

              {/* Timeframes & Indicators Toggle */}
              <div className="flex items-center gap-2">
                
                {/* Timeframe Selectors */}
                <div className="flex items-center p-0.5 bg-[#141b29] rounded-lg border border-[#20293d]">
                  {(['M1', 'M5', 'M15', 'H1', 'D1'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                        timeframe === tf
                          ? 'bg-emerald-500 text-slate-950 font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                {/* Indicator buttons */}
                <button
                  onClick={() => setShowEMA(!showEMA)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                    showEMA ? 'bg-[#1b2538] text-amber-300 border-amber-500/30' : 'bg-[#141b29] text-slate-400 border-[#20293d]'
                  }`}
                  title="20周期指数移动平均线"
                >
                  EMA 20
                </button>

                <button
                  onClick={() => setShowRSI(!showRSI)}
                  className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                    showRSI ? 'bg-[#1b2538] text-purple-300 border-purple-500/30' : 'bg-[#141b29] text-slate-400 border-[#20293d]'
                  }`}
                  title="相对强弱指标"
                >
                  RSI 14
                </button>

              </div>
            </div>

            {/* Candlestick Inspection Header (OHLC) */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 mb-2">
              {hoveredCandle ? (
                <>
                  <span>时间: <strong className="text-slate-200">{hoveredCandle.time}</strong></span>
                  <span>开: <strong className="text-slate-200">{hoveredCandle.open}</strong></span>
                  <span>高: <strong className="text-emerald-400">{hoveredCandle.high}</strong></span>
                  <span>低: <strong className="text-rose-400">{hoveredCandle.low}</strong></span>
                  <span>收: <strong className={hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-400' : 'text-rose-400'}>{hoveredCandle.close}</strong></span>
                  <span>量: <strong className="text-slate-200">{hoveredCandle.volume}</strong></span>
                  {hoveredCandle.rsi && (
                    <span>RSI: <strong className="text-purple-400">{hoveredCandle.rsi}</strong></span>
                  )}
                </>
              ) : (
                <div className="text-slate-400">
                  移动鼠标悬停在 K 线柱上查看高低点位、开收盘及指标数据
                </div>
              )}
            </div>

            {/* SVG Candlestick Chart */}
            <div className="relative w-full aspect-[16/9] bg-[#0b0f17] rounded-lg border border-[#161f2e] p-2">
              <svg 
                viewBox={`0 0 ${chartW} ${totalChartH}`} 
                className="w-full h-full overflow-visible"
                onMouseLeave={() => setHoveredCandle(null)}
              >
                {/* Horizontal price grid lines */}
                {yPriceTicks.map(t => (
                  <g key={t.val}>
                    <line
                      x1={pad.left}
                      y1={t.y}
                      x2={chartW - pad.right}
                      y2={t.y}
                      stroke="#182030"
                      strokeDasharray="2 2"
                    />
                    <text
                      x={chartW - pad.right + 8}
                      y={t.y + 4}
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                    >
                      {t.val.toFixed(selectedQuote.digits)}
                    </text>
                  </g>
                ))}

                {/* Candlestick Wicks & Bodies */}
                {candlePaths.map((cp, idx) => (
                  <g 
                    key={idx}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredCandle(cp.candle)}
                  >
                    {/* Wick */}
                    <line
                      x1={cp.cx}
                      y1={cp.highY}
                      x2={cp.cx}
                      y2={cp.lowY}
                      stroke={cp.isBull ? '#10b981' : '#f43f5e'}
                      strokeWidth="1.5"
                    />
                    {/* Body */}
                    <rect
                      x={cp.cx - cp.barWidth / 2}
                      y={cp.topY}
                      width={cp.barWidth}
                      height={cp.bodyH}
                      fill={cp.isBull ? '#10b981' : '#f43f5e'}
                      rx="1"
                    />
                  </g>
                ))}

                {/* EMA 20 Line Overlay */}
                {showEMA && ema20Path && (
                  <path
                    d={ema20Path}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* RSI Sub-Panel */}
                {showRSI && (
                  <g transform={`translate(0, ${candleAreaH + 15})`}>
                    {/* Divider line */}
                    <line x1={pad.left} y1="0" x2={chartW - pad.right} y2="0" stroke="#1f293d" />
                    
                    {/* RSI Overbought 70 & Oversold 30 lines */}
                    <line x1={pad.left} y1={(rsiAreaH - 20) * 0.3} x2={chartW - pad.right} y2={(rsiAreaH - 20) * 0.3} stroke="#3b4252" strokeDasharray="3 3" />
                    <text x={chartW - pad.right + 6} y={(rsiAreaH - 20) * 0.3 + 3} fill="#a855f7" fontSize="9" fontFamily="JetBrains Mono">70</text>
                    
                    <line x1={pad.left} y1={(rsiAreaH - 20) * 0.7} x2={chartW - pad.right} y2={(rsiAreaH - 20) * 0.7} stroke="#3b4252" strokeDasharray="3 3" />
                    <text x={chartW - pad.right + 6} y={(rsiAreaH - 20) * 0.7 + 3} fill="#a855f7" fontSize="9" fontFamily="JetBrains Mono">30</text>

                    {/* RSI Curve */}
                    {rsiPath && (
                      <path
                        d={rsiPath}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Market Status Footnote */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-[#1a2336] mt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#f59e0b]" />
                <span className="text-[11px] font-mono">EMA 20</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-[#a855f7]" />
                <span className="text-[11px] font-mono">RSI 14</span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              最高: {selectedQuote.high24h} · 最低: {selectedQuote.low24h}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
