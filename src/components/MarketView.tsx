import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Activity, 
  Plus, 
  Search,
  Trash2,
  RefreshCw,
  Sliders,
  Check,
  Globe2,
  Building2,
  ExternalLink,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { 
  globalFinancialApi, 
  WatchlistSymbol, 
  GlobalSearchResult, 
  DEFAULT_GLOBAL_WATCHLIST 
} from '../services/globalFinancialApi';
import { 
  getCurrentMarketSessions, 
  Candle 
} from '../services/marketData';

interface MarketViewProps {
  onLogTradeFromMarket: (symbol: string, currentPrice: number, category?: string) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({ onLogTradeFromMarket }) => {
  // Watchlist state
  const [watchlist, setWatchlist] = useState<WatchlistSymbol[]>(() => globalFinancialApi.getWatchlist());
  const [selectedSymbol, setSelectedSymbol] = useState<string>(() => {
    const list = globalFinancialApi.getWatchlist();
    return list[0]?.symbol || 'NVDA';
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GlobalSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [exchangeFilter, setExchangeFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'Stocks' | 'Forex' | 'Crypto' | 'Commodities' | 'Indices'>('ALL');
  const [addedFeedback, setAddedFeedback] = useState<string | null>(null);

  // Technical chart state
  const [timeframe, setTimeframe] = useState<'M1' | 'M5' | 'M15' | 'H1' | 'D1'>('M15');
  const [showEMA20, setShowEMA20] = useState(true);
  const [showEMA50, setShowEMA50] = useState(true);
  const [showRSI, setShowRSI] = useState(true);
  const [candles, setCandles] = useState<Candle[]>([]);
  const [isLoadingCandles, setIsLoadingCandles] = useState(false);
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Currently selected quote object
  const selectedQuote = useMemo(() => {
    return watchlist.find(q => q.symbol.toUpperCase() === selectedSymbol.toUpperCase()) || watchlist[0] || DEFAULT_GLOBAL_WATCHLIST[0];
  }, [watchlist, selectedSymbol]);

  // Load candlesticks when selected symbol or timeframe changes
  const loadCandles = useCallback(async (sym: string, tf: 'M1' | 'M5' | 'M15' | 'H1' | 'D1') => {
    setIsLoadingCandles(true);
    try {
      const data = await globalFinancialApi.fetchCandles(sym, tf);
      setCandles(data);
    } catch {
      // Handled
    } finally {
      setIsLoadingCandles(false);
    }
  }, []);

  useEffect(() => {
    if (selectedQuote) {
      loadCandles(selectedQuote.symbol, timeframe);
    }
  }, [selectedQuote?.symbol, timeframe, loadCandles]);

  // Debounced search via global financial data API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const results = await globalFinancialApi.searchGlobalSymbols(searchQuery);
        setSearchResults(results);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch live quotes periodically for top watchlist items
  useEffect(() => {
    const refreshQuotes = async () => {
      const syms = watchlist.slice(0, 15).map(w => w.symbol);
      const updates = await globalFinancialApi.fetchLiveQuotes(syms);
      if (Object.keys(updates).length > 0) {
        setWatchlist(prev => {
          return prev.map(item => {
            const up = updates[item.symbol];
            if (up && up.price !== undefined) {
              return {
                ...item,
                price: up.price,
                prevClose: up.prevClose || item.prevClose,
                change: up.change !== undefined ? up.change : item.change,
                changePercent: up.changePercent !== undefined ? up.changePercent : item.changePercent,
                high24h: up.high24h || item.high24h,
                low24h: up.low24h || item.low24h,
                currency: up.currency || item.currency,
                volume: up.volume || item.volume
              };
            }
            return item;
          });
        });
      }
    };

    refreshQuotes();
    const interval = setInterval(refreshQuotes, 30000);
    return () => clearInterval(interval);
  }, [watchlist.length]);

  // Realistic micro-tick simulator for active markets
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setWatchlist(prev => {
        return prev.map(item => {
          if (Math.random() < 0.25) {
            const spreadDelta = (Math.random() - 0.49) * (item.price * 0.0004);
            const newPrice = Math.max(0.0001, item.price + spreadDelta);
            const change = newPrice - item.prevClose;
            const changePercent = (change / item.prevClose) * 100;
            const decimals = item.digits || 2;
            return {
              ...item,
              price: Math.round(newPrice * Math.pow(10, decimals)) / Math.pow(10, decimals),
              change: Math.round(change * 1000) / 1000,
              changePercent: Math.round(changePercent * 100) / 100
            };
          }
          return item;
        });
      });
    }, 2000);

    return () => clearInterval(tickInterval);
  }, []);

  // Add symbol to watchlist handler
  const handleAddToWatchlist = (item: GlobalSearchResult) => {
    const added = globalFinancialApi.addToWatchlist({
      symbol: item.symbol,
      name: item.name,
      exchange: item.exchange,
      type: item.type
    });
    setWatchlist(globalFinancialApi.getWatchlist());
    setSelectedSymbol(added.symbol);
    setAddedFeedback(item.symbol);
    setTimeout(() => setAddedFeedback(null), 1800);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  // Remove symbol from watchlist handler
  const handleRemoveFromWatchlist = (e: React.MouseEvent, sym: string) => {
    e.stopPropagation();
    globalFinancialApi.removeFromWatchlist(sym);
    const updated = globalFinancialApi.getWatchlist();
    setWatchlist(updated);
    if (selectedSymbol === sym && updated.length > 0) {
      setSelectedSymbol(updated[0].symbol);
    }
  };

  // Filtered watchlist by category
  const filteredWatchlist = useMemo(() => {
    if (categoryFilter === 'ALL') return watchlist;
    return watchlist.filter(w => w.category === categoryFilter);
  }, [watchlist, categoryFilter]);

  // Filtered search results by exchange
  const filteredSearchResults = useMemo(() => {
    if (exchangeFilter === 'ALL') return searchResults;
    if (exchangeFilter === 'US') {
      return searchResults.filter(r => {
        const ex = (r.exchange || '').toUpperCase();
        return ex.includes('NASDAQ') || ex.includes('NYSE') || ex.includes('NMS') || ex.includes('NYQ') || ex.includes('BATS');
      });
    }
    if (exchangeFilter === 'HK') {
      return searchResults.filter(r => (r.exchange || '').toUpperCase().includes('HK') || r.symbol.endsWith('.HK'));
    }
    if (exchangeFilter === 'LSE') {
      return searchResults.filter(r => (r.exchange || '').toUpperCase().includes('LON') || (r.exchange || '').toUpperCase().includes('LSE') || r.symbol.endsWith('.L'));
    }
    if (exchangeFilter === 'MY') {
      return searchResults.filter(r => (r.exchange || '').toUpperCase().includes('KLS') || (r.exchange || '').toUpperCase().includes('BURSA') || r.symbol.endsWith('.KL'));
    }
    if (exchangeFilter === 'EU_JP') {
      return searchResults.filter(r => {
        const s = r.symbol;
        const ex = (r.exchange || '').toUpperCase();
        return s.endsWith('.AS') || s.endsWith('.PA') || s.endsWith('.DE') || s.endsWith('.T') || ex.includes('AMSTERDAM') || ex.includes('PARIS') || ex.includes('FRANKFURT') || ex.includes('TOKYO');
      });
    }
    if (exchangeFilter === 'CRYPTO') {
      return searchResults.filter(r => (r.type || '').toUpperCase().includes('CRYPTO') || r.symbol.includes('-USD'));
    }
    if (exchangeFilter === 'FOREX') {
      return searchResults.filter(r => (r.type || '').toUpperCase().includes('CURRENCY') || r.symbol.includes('=X'));
    }
    return searchResults;
  }, [searchResults, exchangeFilter]);

  const sessions = useMemo(() => getCurrentMarketSessions(), []);

  // Candlestick Chart calculations
  const chartW = 860;
  const candleAreaH = 260;
  const rsiAreaH = showRSI ? 80 : 0;
  const pad = { top: 20, right: 65, bottom: 25, left: 15 };

  const { candlePaths, ema20Path, rsiPath, minVal, maxVal, yPriceTicks } = useMemo(() => {
    if (!candles.length) {
      return { candlePaths: [], ema20Path: '', rsiPath: '', minVal: 0, maxVal: 0, yPriceTicks: [] };
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
    const barWidth = Math.max(5, Math.min(16, (innerW / candles.length) * 0.65));

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

    let emaPath = '';
    candles.forEach((c, i) => {
      if (c.ema20) {
        const x = pad.left + (i + 0.5) * (innerW / candles.length);
        const y = pad.top + innerH - ((c.ema20 - min) / (max - min)) * innerH;
        emaPath += `${i === 0 ? 'M' : 'L'} ${x},${y} `;
      }
    });

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

    const ticks = [0, 0.25, 0.5, 0.75, 1].map(pct => {
      const val = min + (max - min) * pct;
      const y = pad.top + innerH - pct * innerH;
      return { val, y };
    });

    return {
      candlePaths: renderedCandles,
      ema20Path: emaPath,
      rsiPath: rPath,
      minVal: min,
      maxVal: max,
      yPriceTicks: ticks
    };
  }, [candles, showRSI]);

  // Quick preset chips for rapid symbol searching
  const PRESET_QUICK_SEARCHES = [
    { label: '英伟达 NVDA', query: 'NVDA' },
    { label: '苹果 AAPL', query: 'AAPL' },
    { label: '腾讯 0700.HK', query: '0700.HK' },
    { label: '阿里 9988.HK', query: '9988.HK' },
    { label: '壳牌 SHEL.L', query: 'SHEL.L' },
    { label: '马银行 1155.KL', query: '1155.KL' },
    { label: '阿斯麦 ASML', query: 'ASML' },
    { label: '丰田 7203.T', query: '7203.T' },
    { label: '比特币 BTC', query: 'BTC-USD' },
    { label: '现货黄金 Gold', query: 'GC=F' },
  ];

  return (
    <div className="space-y-4 max-w-[1520px] mx-auto pb-16">
      
      {/* 1. Global Market Search & Global Financial API Bar */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 shadow-lg relative z-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-[#1b2438]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">全球全市场股票与资产雷达</h2>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  REAL-TIME FINANCIAL API
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                支持直连全球各大交易所：纽交所 (NYSE)、纳斯达克 (NASDAQ)、港交所 (HKEX)、伦交所 (LSE)、泛欧交易所、大马吉隆坡、东证所等
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              全球资产自选库: {watchlist.length} 个品种
            </span>
          </div>
        </div>

        {/* Search input with live API autocomplete dropdown */}
        <div ref={searchContainerRef} className="relative mt-3">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="🔍 输入任意全球代码或名称搜索 (例如: AAPL, 0700.HK, SHEL.L, 1155.KL, ASML, 茅台, 黄金, BTC, EURUSD)..."
              className="w-full bg-[#131a29] border border-[#233047] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 rounded-xl pl-10 pr-24 py-2.5 text-sm text-slate-100 placeholder-slate-400 font-sans outline-none transition-all shadow-inner"
            />
            {isSearching && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>查询中...</span>
              </div>
            )}
          </div>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 pt-2 border-t border-[#182133]">
            <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              全球热门秒查:
            </span>
            {PRESET_QUICK_SEARCHES.map(preset => (
              <button
                key={preset.query}
                onClick={() => {
                  setSearchQuery(preset.query);
                  setShowSearchDropdown(true);
                }}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#141d2d] hover:bg-[#1a263c] border border-[#223049] text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Autocomplete Results Dropdown */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#121927] border border-[#22314a] rounded-xl shadow-2xl z-50 overflow-hidden max-h-[460px] flex flex-col">
              {/* Filter tabs inside dropdown */}
              <div className="p-2.5 bg-[#0d131f] border-b border-[#1b263b] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
                  {[
                    { id: 'ALL', label: '全部' },
                    { id: 'US', label: '美股 (NYSE/NASDAQ)' },
                    { id: 'HK', label: '港股 (HKEX)' },
                    { id: 'LSE', label: '英股 (LSE)' },
                    { id: 'MY', label: '马股 (KLSE)' },
                    { id: 'EU_JP', label: '欧/日股' },
                    { id: 'FOREX', label: '外汇' },
                    { id: 'CRYPTO', label: '加密' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setExchangeFilter(tab.id)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        exchangeFilter === tab.id
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-[#162030]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  找到 {filteredSearchResults.length} 个匹配标的
                </span>
              </div>

              {/* List of matched symbols */}
              <div className="overflow-y-auto divide-y divide-[#182337] p-1 flex-1">
                {isSearching && filteredSearchResults.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>正在连接全球金融数据库查询 "{searchQuery}"...</span>
                  </div>
                ) : filteredSearchResults.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    <p>未找到匹配的代码或资产</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      可尝试输入具体股票代码，如 TSLA, 0700.HK, SHEL.L, 1155.KL 或英文名称
                    </p>
                  </div>
                ) : (
                  filteredSearchResults.map(res => {
                    const isAlreadyAdded = globalFinancialApi.isWatchlisted(res.symbol);
                    const isJustAdded = addedFeedback === res.symbol;

                    return (
                      <div
                        key={res.symbol}
                        className="p-2.5 hover:bg-[#162133] rounded-lg transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-mono">{res.symbol}</span>
                            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-[#1c273a] text-emerald-400 border border-[#273752]">
                              {res.exchange}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#162030] text-slate-400">
                              {res.type}
                            </span>
                          </div>
                          <div className="text-xs text-slate-300 truncate mt-0.5 font-medium">
                            {res.name}
                          </div>
                          {res.sector && (
                            <div className="text-[11px] text-slate-400 truncate mt-0.5">
                              {res.sector}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isAlreadyAdded ? (
                            <button
                              disabled
                              className="px-2.5 py-1 rounded text-xs font-medium bg-[#14231f] text-emerald-400 border border-emerald-500/30 flex items-center gap-1 cursor-default"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>已在自选</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddToWatchlist(res)}
                              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                                isJustAdded 
                                  ? 'bg-emerald-500 text-slate-950' 
                                  : 'bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/40'
                              }`}
                            >
                              {isJustAdded ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>已添加!</span>
                                </>
                              ) : (
                                <>
                                  <Plus className="w-3.5 h-3.5" />
                                  <span>加入自选</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Global Trading Sessions Bar */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-3 sm:p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">全球主流金融中心交易时段</span>
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

      {/* 3. Main Workspace: Watchlist (Left) + Interactive Candlestick Terminal (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Watchlist Table (5 cols on lg) */}
        <div className="lg:col-span-5 bg-[#101622] border border-[#1b2336] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#1a2336] mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">全球自选资产池 (Watchlist)</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredWatchlist.length} / {watchlist.length} 标的
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 text-xs font-mono">
              {[
                { id: 'ALL', label: '全部' },
                { id: 'Stocks', label: '股票' },
                { id: 'Forex', label: '外汇' },
                { id: 'Commodities', label: '大宗商品' },
                { id: 'Crypto', label: '加密' },
                { id: 'Indices', label: '指数' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors shrink-0 ${
                    categoryFilter === cat.id
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-[#131b2a] text-slate-400 hover:text-slate-200 border border-[#1e283d]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Watchlist Cards List */}
            <div className="space-y-1.5 overflow-y-auto max-h-[580px] pr-1">
              {filteredWatchlist.map(q => {
                const isSelected = q.symbol.toUpperCase() === selectedSymbol.toUpperCase();
                const isPos = q.change >= 0;

                return (
                  <div
                    key={q.symbol}
                    onClick={() => setSelectedSymbol(q.symbol)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between cursor-pointer group ${
                      isSelected 
                        ? 'bg-[#172338] border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20' 
                        : 'bg-[#121824] hover:bg-[#151d2c] border-[#1c263b]'
                    }`}
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-bold text-white font-mono tracking-tight">{q.symbol}</span>
                        <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 font-mono">
                          {q.exchange}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-[#0d121c] px-1 py-0.2 rounded">
                          {q.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 truncate mt-0.5">
                        {q.name}
                      </div>
                    </div>

                    <div className="text-right font-mono shrink-0 flex items-center gap-3">
                      <div>
                        <div className="text-sm font-bold text-slate-100">
                          {q.currency === 'USD' ? '$' : q.currency === 'HKD' ? 'HK$' : q.currency === 'MYR' ? 'RM' : q.currency === 'GBp' ? 'p' : q.currency === 'EUR' ? '€' : ''}
                          {q.price.toFixed(q.digits || 2)}
                        </div>
                        <div className={`text-[11px] flex items-center justify-end gap-1 mt-0.5 font-semibold ${isPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPos ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          <span>{isPos ? '+' : ''}{q.changePercent.toFixed(2)}%</span>
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={(e) => handleRemoveFromWatchlist(e, q.symbol)}
                        title="从自选中移除"
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-rose-500/10 transition-opacity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Action from Selected Quote */}
          <div className="pt-3 mt-3 border-t border-[#1a2336]">
            <button
              onClick={() => onLogTradeFromMarket(selectedQuote.symbol, selectedQuote.price, selectedQuote.category)}
              className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>以此品种快速记账 ({selectedQuote.symbol} · ${selectedQuote.price})</span>
            </button>
          </div>
        </div>

        {/* Right Interactive Candlestick Terminal (7 cols on lg) */}
        <div className="lg:col-span-7 bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          
          <div>
            {/* Header: Selected Symbol Details */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1a2336] mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-mono text-white tracking-tight">
                    {selectedQuote.symbol}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    {selectedQuote.exchange}
                  </span>
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {selectedQuote.name}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono mt-1">
                  <span className="text-lg font-bold text-white">
                    {selectedQuote.currency === 'USD' ? '$' : selectedQuote.currency === 'HKD' ? 'HK$' : selectedQuote.currency === 'MYR' ? 'RM' : ''}
                    {selectedQuote.price.toFixed(selectedQuote.digits || 2)}
                  </span>
                  <span className={selectedQuote.change >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                    {selectedQuote.change >= 0 ? '+' : ''}{selectedQuote.change.toFixed(selectedQuote.digits || 2)} ({selectedQuote.changePercent.toFixed(2)}%)
                  </span>
                  <span className="text-slate-400">24H高: ${selectedQuote.high24h}</span>
                  <span className="text-slate-400">24H低: ${selectedQuote.low24h}</span>
                  <span className="text-slate-400">成交量: {selectedQuote.volume}</span>
                </div>
              </div>

              {/* Timeframes & Indicators Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Timeframes */}
                <div className="flex items-center p-0.5 bg-[#141b29] rounded-lg border border-[#20293d]">
                  {(['M1', 'M5', 'M15', 'H1', 'D1'] as const).map(tf => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 text-xs font-mono font-medium rounded transition-colors ${
                        timeframe === tf
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                {/* EMA 20 */}
                <button
                  onClick={() => setShowEMA20(!showEMA20)}
                  className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
                    showEMA20 ? 'bg-amber-950/40 text-amber-300 border-amber-500/40' : 'bg-[#141b29] text-slate-400 border-[#20293d]'
                  }`}
                  title="20周期均线"
                >
                  EMA 20
                </button>

                {/* RSI 14 */}
                <button
                  onClick={() => setShowRSI(!showRSI)}
                  className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
                    showRSI ? 'bg-purple-950/40 text-purple-300 border-purple-500/40' : 'bg-[#141b29] text-slate-400 border-[#20293d]'
                  }`}
                  title="RSI 相对强弱指标"
                >
                  RSI 14
                </button>

                <button
                  onClick={() => loadCandles(selectedQuote.symbol, timeframe)}
                  title="刷新K线行情"
                  className="p-1.5 rounded bg-[#141b29] hover:bg-[#1a2336] text-slate-400 hover:text-emerald-400 border border-[#20293d] transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCandles ? 'animate-spin text-emerald-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* OHLC Bar Inspector */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 mb-2 bg-[#0c1017] p-2 rounded-lg border border-[#162030]">
              {hoveredCandle ? (
                <>
                  <span>时间: <strong className="text-slate-200">{hoveredCandle.time}</strong></span>
                  <span>开: <strong className="text-slate-200">{hoveredCandle.open}</strong></span>
                  <span>高: <strong className="text-emerald-400">{hoveredCandle.high}</strong></span>
                  <span>低: <strong className="text-rose-400">{hoveredCandle.low}</strong></span>
                  <span>收: <strong className={hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-400' : 'text-rose-400'}>{hoveredCandle.close}</strong></span>
                  <span>量: <strong className="text-slate-200">{hoveredCandle.volume}</strong></span>
                  {hoveredCandle.ema20 && <span>EMA20: <strong className="text-amber-300">{hoveredCandle.ema20}</strong></span>}
                  {hoveredCandle.rsi !== undefined && <span>RSI: <strong className="text-purple-300">{hoveredCandle.rsi}</strong></span>}
                </>
              ) : (
                <div className="flex items-center gap-2 text-slate-400">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>将光标悬停在 K 线图上可查看精准 OHLC / EMA / RSI 数值</span>
                </div>
              )}
            </div>

            {/* SVG Candlestick Chart */}
            <div className="relative w-full overflow-hidden bg-[#0a0d13] border border-[#182233] rounded-xl p-2">
              {isLoadingCandles && (
                <div className="absolute inset-0 bg-[#0a0d13]/70 backdrop-blur-xs flex items-center justify-center z-10 text-xs text-emerald-400 font-mono gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>加载实时行情数据中...</span>
                </div>
              )}

              <svg 
                viewBox={`0 0 ${chartW} ${candleAreaH + rsiAreaH + 30}`} 
                className="w-full h-[320px] select-none"
              >
                <defs>
                  <linearGradient id="rsiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal price grid lines */}
                {yPriceTicks.map((t, idx) => (
                  <g key={idx}>
                    <line 
                      x1={pad.left} 
                      y1={t.y} 
                      x2={chartW - pad.right} 
                      y2={t.y} 
                      stroke="#182335" 
                      strokeDasharray="3 3" 
                    />
                    <text 
                      x={chartW - pad.right + 8} 
                      y={t.y + 3} 
                      fill="#64748b" 
                      fontSize="10" 
                      fontFamily="monospace"
                    >
                      {t.val.toFixed(selectedQuote.digits || 2)}
                    </text>
                  </g>
                ))}

                {/* Candlesticks */}
                {candlePaths.map((item, idx) => {
                  const strokeColor = item.isBull ? '#10b981' : '#f43f5e';
                  const fillColor = item.isBull ? '#10b981' : '#f43f5e';

                  return (
                    <g 
                      key={idx}
                      onMouseEnter={() => setHoveredCandle(item.candle)}
                      onMouseLeave={() => setHoveredCandle(null)}
                      className="cursor-crosshair group/candle"
                    >
                      {/* High-Low Wick */}
                      <line
                        x1={item.cx}
                        y1={item.highY}
                        x2={item.cx}
                        y2={item.lowY}
                        stroke={strokeColor}
                        strokeWidth="1.2"
                      />
                      {/* Open-Close Body */}
                      <rect
                        x={item.cx - item.barWidth / 2}
                        y={item.topY}
                        width={item.barWidth}
                        height={item.bodyH}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth="0.8"
                        rx="1"
                        className="transition-opacity group-hover/candle:opacity-80"
                      />
                    </g>
                  );
                })}

                {/* EMA 20 Line */}
                {showEMA20 && ema20Path && (
                  <path
                    d={ema20Path}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}

                {/* RSI Sub-chart */}
                {showRSI && (
                  <g transform={`translate(0, ${candleAreaH})`}>
                    <line 
                      x1={pad.left} 
                      y1="10" 
                      x2={chartW - pad.right} 
                      y2="10" 
                      stroke="#223048" 
                    />
                    {/* RSI Overbought 70 and Oversold 30 lines */}
                    <line 
                      x1={pad.left} 
                      y1="25" 
                      x2={chartW - pad.right} 
                      y2="25" 
                      stroke="#9333ea" 
                      strokeDasharray="2 2" 
                      strokeOpacity="0.4"
                    />
                    <text x={chartW - pad.right + 8} y="28" fill="#9333ea" fontSize="9" fontFamily="monospace">70</text>
                    
                    <line 
                      x1={pad.left} 
                      y1="55" 
                      x2={chartW - pad.right} 
                      y2="55" 
                      stroke="#9333ea" 
                      strokeDasharray="2 2" 
                      strokeOpacity="0.4"
                    />
                    <text x={chartW - pad.right + 8} y="58" fill="#9333ea" fontSize="9" fontFamily="monospace">30</text>

                    {/* RSI Path */}
                    {rsiPath && (
                      <path
                        d={rsiPath}
                        fill="none"
                        stroke="#c084fc"
                        strokeWidth="1.4"
                      />
                    )}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Bottom Bar: Action & Summary */}
          <div className="pt-3 mt-3 border-t border-[#182337] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>数据源: 全球交易所直连行情 (实时撮合与历史K线同步)</span>
            </div>

            <button
              onClick={() => onLogTradeFromMarket(selectedQuote.symbol, selectedQuote.price, selectedQuote.category)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>以 {selectedQuote.symbol} 记账</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
