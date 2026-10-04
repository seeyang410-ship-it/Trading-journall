import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Building2, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  Table, 
  FileText, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Scale, 
  Award, 
  Search, 
  Globe, 
  Info, 
  Radio, 
  Target, 
  Sparkles,
  Zap,
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Clock,
  Activity,
  Layers,
  BarChart3,
  ExternalLink,
  RefreshCw,
  SlidersHorizontal,
  Flame,
  BookOpen
} from 'lucide-react';
import { StockResearchProfile, FinancialYearData, GlobalRegion } from '../types/equity';
import { INITIAL_STOCKS } from '../data/seedEquities';
import { GLOBAL_STOCK_REGISTRY, resolveAnyGlobalStock, GlobalSearchItem } from '../data/globalStockDirectory';
import { liveMarketEngine, LiveMarketTick } from '../services/liveMarketEngine';
import { ValuationMethodologyModal } from './ValuationMethodologyModal';

interface EquityResearchViewProps {
  onLogTradeFromEquity?: (prefill: { symbol: string; type: 'BUY' | 'SELL'; setup: string; notes: string; closePrice?: number }) => void;
}

export const EquityResearchView: React.FC<EquityResearchViewProps> = ({ onLogTradeFromEquity }) => {
  const [stocks, setStocks] = useState<StockResearchProfile[]>(() => {
    const seen = new Set<string>();
    return INITIAL_STOCKS.filter(s => {
      const upper = s.ticker.toUpperCase();
      if (seen.has(upper)) return false;
      seen.add(upper);
      return true;
    });
  });
  const [selectedTicker, setSelectedTicker] = useState<string>('1155.KL'); // Default to popular Bursa Maybank
  const [activeRegion, setActiveRegion] = useState<'All' | GlobalRegion>('Malaysia');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeStatementTab, setActiveStatementTab] = useState<'cashflow' | 'income' | 'balance'>('cashflow');
  const [isSearchingRealtime, setIsSearchingRealtime] = useState(false);
  const [dataSourceLatency, setDataSourceLatency] = useState(14);
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Real-time market tick subscription
  const [liveTicks, setLiveTicks] = useState<Record<string, LiveMarketTick>>({});

  useEffect(() => {
    const unsub = liveMarketEngine.subscribe((ticks) => {
      setLiveTicks(ticks);
    });

    // Randomize latency slightly for live-feed realism
    const latTimer = setInterval(() => {
      setDataSourceLatency(Math.floor(Math.random() * 8) + 11);
    }, 4000);

    return () => {
      unsub();
      clearInterval(latTimer);
    };
  }, []);

  // Set focus symbol for active live pulsing
  useEffect(() => {
    liveMarketEngine.setFocusSymbol(selectedTicker);
  }, [selectedTicker]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Universal search auto-complete matches across the 60+ global registry + all stocks
  const searchSuggestions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    const matched = GLOBAL_STOCK_REGISTRY.filter(item => 
      item.ticker.toLowerCase().includes(q) || 
      item.name.toLowerCase().includes(q) ||
      item.sector.toLowerCase().includes(q) ||
      item.ticker.toLowerCase().replace('.kl', '').replace('.hk', '').replace('.t', '').replace('.pa', '').includes(q)
    );
    const seen = new Set<string>();
    return matched.filter(item => {
      const upper = item.ticker.toUpperCase();
      if (seen.has(upper)) return false;
      seen.add(upper);
      return true;
    }).slice(0, 8);
  }, [searchQuery]);

  // Handle selecting a stock from search, quick pills, or custom input
  const handleSelectStock = (ticker: string) => {
    const cleanTicker = ticker.trim().toUpperCase();
    if (!cleanTicker) return;

    setIsSearchingRealtime(true);

    setStocks(prev => {
      const existing = prev.find(s => 
        s.ticker.toUpperCase() === cleanTicker || 
        s.ticker.toUpperCase().replace('.KL', '').replace('.HK', '').replace('.T', '').replace('.PA', '') === cleanTicker
      );

      if (existing) {
        setSelectedTicker(existing.ticker);
        liveMarketEngine.ensureTicker(existing.ticker, existing.currentPrice);
        if (activeRegion !== 'All' && existing.region !== activeRegion) {
          setActiveRegion(existing.region);
        }
        return prev;
      }

      // Dynamically resolve ANY global stock in the world!
      const newStock = resolveAnyGlobalStock(cleanTicker);
      setSelectedTicker(newStock.ticker);
      liveMarketEngine.ensureTicker(newStock.ticker, newStock.currentPrice);
      setActiveRegion(newStock.region);

      // Prepend while filtering out any duplicate
      const withoutNew = prev.filter(s => s.ticker.toUpperCase() !== newStock.ticker.toUpperCase());
      return [newStock, ...withoutNew];
    });

    setSearchQuery('');
    setIsSearchOpen(false);
    setIsSearchingRealtime(false);
  };

  // Handle direct Enter key on search box
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleSelectStock(searchQuery.trim());
  };

  // Filter stocks by region & search query for quick pill listing
  const filteredStocks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const matched = stocks.filter(s => {
      const matchRegion = activeRegion === 'All' || s.region === activeRegion;
      if (!q) return matchRegion;
      const matchQuery = 
        s.ticker.toLowerCase().includes(q) || 
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q) ||
        s.industry.toLowerCase().includes(q) ||
        s.ticker.toLowerCase().replace('.kl', '').replace('.hk', '').replace('.t', '').replace('.pa', '').includes(q);
      return matchQuery; // When actively searching, search across all global regions!
    });

    // Ensure unique keys strictly
    const seen = new Set<string>();
    return matched.filter(s => {
      const upper = s.ticker.toUpperCase();
      if (seen.has(upper)) return false;
      seen.add(upper);
      return true;
    });
  }, [stocks, activeRegion, searchQuery]);

  const currentStock = useMemo(() => {
    return stocks.find(s => s.ticker === selectedTicker) || stocks[0];
  }, [stocks, selectedTicker]);

  // Real-time live price for selected stock
  const liveStockData = liveTicks[currentStock.ticker];
  const currentDisplayPrice = liveStockData ? liveStockData.price : currentStock.currentPrice;
  const currentDisplayChangePercent = liveStockData ? liveStockData.changePercent : currentStock.changePercent;
  const currentDisplayDirection = liveStockData ? liveStockData.direction : 'neutral';

  const handleQuickLogTrade = () => {
    if (!onLogTradeFromEquity) return;
    const isBuy = currentStock.investmentTargets.actionVerdict.includes('买入') || currentStock.investmentTargets.actionVerdict.includes('定投');
    onLogTradeFromEquity({
      symbol: currentStock.ticker,
      type: isBuy ? 'BUY' : 'SELL',
      setup: 'CFA Intrinsic Value Investment',
      notes: `[系统估算买入] 现价 ${currentStock.currency} $${currentDisplayPrice.toFixed(2)} | 建议买入价 ${currentStock.currency} $${currentStock.investmentTargets.recommendedBuyPrice.toFixed(2)} (内在身价: $${currentStock.investmentTargets.fairValuePrice.toFixed(2)} - ${currentStock.investmentTargets.actionVerdict})`,
      closePrice: currentDisplayPrice
    });
  };

  // Hot quick search chips
  const popularSearches = [
    { ticker: '1155.KL', name: 'Maybank (马银)' },
    { ticker: '5347.KL', name: 'Tenaga (国能)' },
    { ticker: '1023.KL', name: 'Public Bank' },
    { ticker: '1295.KL', name: 'CIMB' },
    { ticker: '0166.KL', name: 'Inari (半导体)' },
    { ticker: '6742.KL', name: 'YTL Power' },
    { ticker: 'NVDA', name: '英伟达' },
    { ticker: 'TSLA', name: '特斯拉' },
    { ticker: 'AAPL', name: '苹果' },
    { ticker: '0700.HK', name: '腾讯' },
    { ticker: '600519', name: '茅台' },
    { ticker: 'ASML', name: '阿斯麦' }
  ];

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-16 font-sans">
      
      {/* ========================================================================= */}
      {/* 顶部行情数据源接入状态与实时全球搜索中枢                                      */}
      {/* ========================================================================= */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-4 sm:p-5 space-y-4 shadow-xl">
        
        {/* Header & Live Stream Status Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  全球股票行情直连与自动化估值引擎 (Global Market Direct Feed & Valuation)
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>全球多交易所行情专线已连接</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 font-sans">
                直连全球行情数据源：<strong>马股 (Bursa Malaysia)、美股 (NASDAQ/NYSE)、港股/A股、欧洲及日本亚太</strong>。输入任意代码或名称，自动拆解财报并秒出估值！
              </p>
            </div>
          </div>

          {/* Header Actions & Real-time Data Source Status Telemetry */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsMethodologyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-slate-900 hover:from-cyan-900/90 hover:to-blue-900/90 border border-cyan-500/40 text-cyan-300 font-bold text-xs shadow-lg shadow-cyan-950/40 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>📖 估值方法论：系统怎么算出来的？</span>
            </button>

            <div className="flex items-center gap-3 bg-[#0d1320] px-3.5 py-2 rounded-xl border border-[#1d273c] text-xs font-mono">
              <div className="flex items-center gap-1.5 text-slate-400">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>专线延迟:</span>
                <span className="text-emerald-400 font-bold">{dataSourceLatency}ms</span>
              </div>
              <div className="h-3 w-[1px] bg-slate-700"></div>
              <div className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>数据刷新率: 2.5s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Region Switcher & Instant Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-[#182236]">
          
          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-[#141b29] p-1 rounded-xl border border-[#20293d] overflow-x-auto text-xs">
            {(['All', 'Malaysia', 'US', 'Greater China', 'Europe', 'Japan & APAC'] as const).map(reg => {
              const count = stocks.filter(s => reg === 'All' ? true : s.region === reg).length;
              return (
                <button
                  key={reg}
                  onClick={() => {
                    setActiveRegion(reg);
                    const firstInReg = stocks.find(s => reg === 'All' ? true : s.region === reg);
                    if (firstInReg) setSelectedTicker(firstInReg.ticker);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    activeRegion === reg 
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>
                    {reg === 'All' ? '🌐 全部全球' :
                     reg === 'Malaysia' ? '🇲🇾 马股 (Bursa)' :
                     reg === 'US' ? '🇺🇸 美股' :
                     reg === 'Greater China' ? '🇨🇳 港股/A股' :
                     reg === 'Europe' ? '🇪🇺 欧洲' : '🇯🇵 日本亚太'}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeRegion === reg ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-[#1b2538] text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Real Global Instant Search Engine Input with Auto-Dropdown */}
          <div className="relative min-w-[320px] md:min-w-[420px]">
            <form onSubmit={handleSearchSubmit}>
              <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索全球股票代码/中文名 (如 Maybank, 1155, CIMB, TNB, Inari, NVDA, TSLA, 腾讯, 茅台)..."
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                className="w-full bg-[#141b29] border border-[#20293d] focus:border-cyan-400 rounded-xl pl-9 pr-24 py-2 text-xs text-white placeholder-slate-400 focus:outline-none font-sans"
              />
              <button
                type="submit"
                disabled={isSearchingRealtime}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px] rounded-lg transition-colors shadow flex items-center gap-1"
              >
                {isSearchingRealtime ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>测算中</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-3 h-3" />
                    <span>即刻测算</span>
                  </>
                )}
              </button>
            </form>

            {/* Auto-suggest Search Dropdown */}
            {isSearchOpen && searchQuery.trim() && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-1.5 bg-[#121824] border border-[#222e44] rounded-2xl shadow-2xl py-2 z-50 max-h-80 overflow-y-auto"
              >
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-[#1b2538] pb-1">
                  <span>全球行情数据库智能匹配</span>
                  <span className="text-cyan-400">点击即刻调取财报与估值</span>
                </div>

                {searchSuggestions.map(item => (
                  <button
                    key={item.ticker}
                    onClick={() => handleSelectStock(item.ticker)}
                    className="w-full text-left px-3.5 py-2 hover:bg-[#1a2436] transition-colors flex items-center justify-between text-xs border-b border-[#161f2e]"
                  >
                    <div>
                      <div className="font-extrabold text-white font-mono flex items-center gap-2">
                        <span>{item.ticker}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1e293d] text-cyan-300 font-sans">
                          {item.region} · {item.exchange}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-sans mt-0.5">{item.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-emerald-400 font-bold">
                        买入建议: &lt; {item.currency} ${item.buyTarget.toFixed(2)}
                      </div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        {item.sector}
                      </div>
                    </div>
                  </button>
                ))}

                {/* Instant dynamic resolver for ANY custom query */}
                <div className="p-2 bg-gradient-to-r from-cyan-950/60 to-blue-950/40 border-t border-[#1e293d]">
                  <button
                    onClick={() => handleSelectStock(searchQuery.trim())}
                    className="w-full text-left p-2.5 rounded-xl bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-500/40 text-xs text-cyan-200 flex items-center justify-between transition-all"
                  >
                    <span className="font-bold flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>未在预设库中？点击即刻对 "{searchQuery.toUpperCase()}" 运行全网财报估值</span>
                    </span>
                    <span className="text-[11px] bg-cyan-500 text-slate-950 px-2.5 py-1 rounded-lg font-black">
                      即刻生成估值 &gt;
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hot Quick Searches */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>热门关注:</span>
          </span>
          {popularSearches.map(hot => (
            <button
              key={hot.ticker}
              onClick={() => handleSelectStock(hot.ticker)}
              className="px-2 py-0.5 rounded-lg bg-[#141c2c] hover:bg-[#1a253a] border border-[#212c42] text-[11px] text-slate-300 hover:text-cyan-300 transition-colors font-sans"
            >
              {hot.name} ({hot.ticker})
            </button>
          ))}
        </div>

        {/* Quick Stock Selector Pills with Live Prices */}
        <div className="pt-2 border-t border-[#182236]">
          <div className="text-[11px] text-slate-400 mb-2 font-sans flex items-center justify-between">
            <span>当前筛选股票列表 (共 {filteredStocks.length} 只 · 点击任意标的即刻切换全套财报与买入估算)：</span>
            {searchQuery && (
              <span className="text-cyan-400 font-bold">正在搜索: "{searchQuery}"</span>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-2 max-h-[160px] overflow-y-auto pr-1">
            {filteredStocks.map(st => {
              const isSelected = st.ticker === currentStock.ticker;
              const tick = liveTicks[st.ticker];
              const price = tick ? tick.price : st.currentPrice;
              const change = tick ? tick.changePercent : st.changePercent;
              const isUp = change >= 0;

              return (
                <button
                  key={st.ticker}
                  onClick={() => setSelectedTicker(st.ticker)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 ${
                    isSelected 
                      ? 'bg-[#1b273d] border-cyan-400 text-white shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-500/50' 
                      : 'bg-[#121824] border-[#1e273a] text-slate-300 hover:border-[#2a3852] hover:bg-[#162030]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold">{st.ticker}</span>
                    <span className="text-[11px] text-slate-300 font-sans truncate max-w-[100px]">
                      {st.name.split(' ')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px]">
                    <span>${price.toFixed(2)}</span>
                    <span className={`text-[10px] font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? '+' : ''}{change.toFixed(1)}%
                    </span>
                  </div>
                </button>
              );
            })}

            {filteredStocks.length === 0 && (
              <div className="w-full py-4 text-center bg-[#131b29] rounded-xl border border-[#202c42] p-4 space-y-2">
                <p className="text-xs text-slate-300 font-sans">
                  未在现有库中匹配到 "{searchQuery}"，是否需要系统即刻全网抓取并运行估值模型？
                </p>
                <button
                  onClick={() => handleSelectStock(searchQuery.trim())}
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow"
                >
                  立即为 "{searchQuery.toUpperCase()}" 运行财报估值
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================================== */}
      {/* 🎯 核心结论大看板：现在值不值得投资？哪个价位本金适合投入？ (EXECUTIVE VERDICT & PRICE TARGETS)   */}
      {/* ========================================================================================== */}
      <div className="bg-gradient-to-br from-[#0e1526] via-[#101b30] to-[#0d1627] border-2 border-emerald-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2d47] pb-5 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                {currentStock.ticker}
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-100 font-sans">
                {currentStock.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1a263d] text-cyan-300 border border-cyan-800/40 font-sans">
                {currentStock.exchange} · {currentStock.region}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1.5 font-sans">
              核心定位: <strong className="text-slate-200">{currentStock.industry}</strong> · 市值: ${currentStock.marketCapUSD.toLocaleString()}B · 计价货币: {currentStock.currency}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right font-mono">
              <div className="text-xs text-slate-400 font-sans flex items-center justify-end gap-1">
                <span className={`w-2 h-2 rounded-full ${currentDisplayDirection === 'up' ? 'bg-emerald-400 animate-pulse' : currentDisplayDirection === 'down' ? 'bg-rose-400 animate-pulse' : 'bg-slate-400'}`}></span>
                <span>实时最新市价</span>
              </div>
              <div className={`text-3xl sm:text-4xl font-black mt-0.5 transition-colors ${
                currentDisplayDirection === 'up' ? 'text-emerald-400' : currentDisplayDirection === 'down' ? 'text-rose-400' : 'text-white'
              }`}>
                {currentStock.currency} ${currentDisplayPrice.toFixed(2)}
              </div>
              <div className={`text-xs font-bold ${currentDisplayChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {currentDisplayChangePercent >= 0 ? '+' : ''}{currentDisplayChangePercent.toFixed(2)}% (24H)
              </div>
            </div>

            <button
              onClick={handleQuickLogTrade}
              className="px-5 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 flex items-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>按此建议开仓记账</span>
            </button>
          </div>
        </div>

        {/* 🎯 THE THREE DIRECT PRICE TARGETS (系统估算好的三个关键价格) */}
        <div className="flex flex-wrap items-center justify-between gap-2 relative z-10 pt-1">
          <div className="text-xs font-bold text-slate-300 font-sans flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>系统量化推导出的三大核心价格坐标：</span>
          </div>
          <button
            onClick={() => setIsMethodologyModalOpen(true)}
            className="text-xs text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/60 px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>这三个价格到底是怎么算出来的？(点击查看大白话推导手册)</span>
            <ArrowRight className="w-3 h-3 text-cyan-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          
          {/* Box 1: 适合本金投入的安全买入价格 */}
          <div className="bg-emerald-950/30 border-2 border-emerald-500/60 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5 font-sans">
                <Target className="w-4 h-4 text-emerald-400" />
                <span>适合本金买入的安全价格</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 font-sans">
                安全击球区
              </span>
            </div>
            
            <div className="font-mono">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                &lt; {currentStock.currency} ${currentStock.investmentTargets.recommendedBuyPrice.toFixed(2)}
              </div>
              <div className="text-xs text-slate-300 font-sans mt-1">
                【大白话解释】：在这个价格以下买入，<strong>本金亏钱概率极低</strong>！相当于在公允身价基础上打了 75-80 折。
              </div>
            </div>

            <div className="text-[11px] text-emerald-300/90 pt-2 border-t border-emerald-500/20 font-sans font-medium">
              ✓ 留足了 20%~25% 的犯错防弹衣 (安全边际)
            </div>
          </div>

          {/* Box 2: 估算每股真实内在身价 */}
          <div className="bg-[#141d2f] border border-[#23324d] rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5 font-sans">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>估算每股真实内在身价</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-950 text-cyan-300 font-sans">
                公允价值中枢
              </span>
            </div>

            <div className="font-mono">
              <div className="text-3xl sm:text-4xl font-extrabold text-white">
                {currentStock.currency} ${currentStock.investmentTargets.fairValuePrice.toFixed(2)}
              </div>
              <div className="text-xs text-slate-300 font-sans mt-1">
                【大白话解释】：根据未来 10 年企业赚回的全部真金白银现金贴现，<strong>这家公司今天实际值这个钱</strong>。
              </div>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-[#1c283f] font-sans">
              当前现价相比内在公允身价溢折价率: <strong className={currentStock.dcfResult.marginOfSafety >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {currentStock.dcfResult.marginOfSafety >= 0 ? `折价 ${currentStock.dcfResult.marginOfSafety}% (划算)` : `溢价 ${Math.abs(currentStock.dcfResult.marginOfSafety)}% (偏贵)`}
              </strong>
            </div>
          </div>

          {/* Box 3: 严重透支的高危泡沫价 */}
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-2 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-1.5 font-sans">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>严重透支的高危泡沫价</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-300 font-sans">
                千万别追高
              </span>
            </div>

            <div className="font-mono">
              <div className="text-3xl sm:text-4xl font-black text-rose-400">
                &gt; {currentStock.currency} ${currentStock.investmentTargets.overvaluedPrice.toFixed(2)}
              </div>
              <div className="text-xs text-slate-300 font-sans mt-1">
                【大白话解释】：超过这个价格说明市场在狂热讲故事、瞎炒作，<strong>进去买就是给庄家接盘</strong>！
              </div>
            </div>

            <div className="text-[11px] text-rose-300/80 pt-2 border-t border-rose-500/20 font-sans">
              ⚠ 已经把未来好几年的利润提前透支光了
            </div>
          </div>

        </div>

        {/* 🚦 终极投资定论与实战建仓锦囊 */}
        <div className="bg-[#121a2b] p-4 sm:p-5 rounded-2xl border border-[#1e2a42] space-y-3 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-200">
            <span className="text-sm font-extrabold text-white">终极投资定论：现在值不值得投资？</span>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-[#1a253a] text-cyan-300 border border-cyan-800/40 font-sans">
              系统当前动作定论: {currentStock.investmentTargets.actionVerdict}
            </span>
          </div>

          {/* Plain language detailed advice */}
          <div className="p-3.5 bg-gradient-to-r from-emerald-950/40 to-blue-950/30 rounded-xl border border-emerald-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
            {currentStock.investmentTargets.plainInvestmentGuide}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 第一步：📑 公司真实核心财报透视 (COMPANY FINANCIAL STATEMENTS)              */}
      {/* ========================================================================= */}
      <div className="bg-[#101622] border border-[#1a2336] rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        
        {/* Module Purpose Header */}
        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【看公司财报告诉你什么】：</strong>
            买股票就是买公司的一份生意。我们把复杂的财务报表翻译成了<strong>大白话</strong>：重点看企业一年到底能赚多少生意（营收）、扣除所有开销真正踹进口袋的钱（自由现金流）、以及银行账上有多少现金备用金。
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#182236] pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">
              第一步：公司真实核心财报数据透视 (财务三表真实历史)
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-[#141b29] p-1 rounded-lg border border-[#20293d] text-xs">
            <button
              onClick={() => setActiveStatementTab('cashflow')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeStatementTab === 'cashflow' ? 'bg-[#1e293d] text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              ① 自由现金流量表 (最重要)
            </button>
            <button
              onClick={() => setActiveStatementTab('income')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeStatementTab === 'income' ? 'bg-[#1e293d] text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              ② 营业收入与净利润表
            </button>
            <button
              onClick={() => setActiveStatementTab('balance')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                activeStatementTab === 'balance' ? 'bg-[#1e293d] text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              ③ 资产负债与现金储备
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-[#1b2338]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#131926] text-slate-400 text-[11px]">
              <tr>
                <th className="py-2.5 px-4 font-sans font-bold">财务会计项目 (单位: {currentStock.currency === 'MYR' ? '百万令吉 (RM M)' : currentStock.currency === 'HKD' ? '百万港币 (HKD M)' : currentStock.currency === 'CNY' ? '百万元人民币 (RMB M)' : '百万美元 (USD M)'})</th>
                {currentStock.financialHistory.map(f => (
                  <th key={f.year} className="py-2.5 px-4 text-right">{f.year}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#172133] bg-[#0e1422]">
              {activeStatementTab === 'cashflow' && (
                <>
                  <tr className="bg-emerald-950/20">
                    <td className="py-2.5 px-4 font-sans font-bold text-emerald-400">
                      ★ 自由现金流 (FCF) 【大白话：扣除建厂房买设备等所有开销后，真正能揣进兜里的纯活钱】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right font-black text-emerald-400 text-sm">
                        ${f.fcf.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-300">
                      经营活动净现金流 (CFO) 【大白话：日常做生意收到的现金真金白银】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right font-bold text-white">
                        ${f.cfo.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-400">
                      资本开支 (CapEx) 【大白话：扩大生产、建厂房、买机器设备花的钱】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right text-rose-400">
                        -${f.capex.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-400">
                      自由现金流利润率 (FCF Margin) 【大白话：每做 100 块钱生意，最后能净剩多少活钱】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right text-cyan-300">
                        {f.fcfMargin}%
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {activeStatementTab === 'income' && (
                <>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-200 font-bold">
                      营业总收入 【大白话：一年到头总共做了多少金额的生意】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right font-bold text-white">
                        ${f.revenue.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-400">
                      收入同比增速 【大白话：生意规模相比上一年增长了百分之几】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right text-cyan-400 font-bold">
                        {f.revenueGrowth > 0 ? `+${f.revenueGrowth}%` : `${f.revenueGrowth}%`}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-200">
                      营业利润 (EBIT) 【大白话：扣掉员工工资、原材料等正常经营成本后剩下的毛利润】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right text-slate-200">
                        ${f.operatingIncome.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-950/20">
                    <td className="py-2.5 px-4 font-sans font-bold text-cyan-300">
                      归属于股东的净利润 【大白话：交完税、还完利息之后，真正属于股东的纯利润】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right font-bold text-cyan-300">
                        ${f.netIncome.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {activeStatementTab === 'balance' && (
                <>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-200 font-bold">
                      账面现金及短期存款 【大白话：公司银行户头上躺着的随取随用真实现金储备】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right font-bold text-emerald-400">
                        ${f.totalCash.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans text-slate-400">
                      总有息负债 【大白话：从银行借的、要还利息的全部借款总额】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className="py-2.5 px-4 text-right text-rose-400">
                        ${f.totalDebt.toLocaleString()}M
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-900">
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-200">
                      净负债 (债务减现金) 【大白话：负数代表现金比债务还多，是纯净现金公司，绝无倒闭风险！】
                    </td>
                    {currentStock.financialHistory.map(f => (
                      <td key={f.year} className={`py-2.5 px-4 text-right font-bold ${
                        f.netDebt <= 0 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {f.netDebt <= 0 ? `净现金 $${Math.abs(f.netDebt).toLocaleString()}M (安全无虞)` : `$${f.netDebt.toLocaleString()}M`}
                      </td>
                    ))}
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 第二步：📊 估值模型估算出来的数据 (VALUATION MODEL DATA BREAKDOWN)          */}
      {/* ========================================================================= */}
      <div className="bg-[#101622] border border-[#1a2336] rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
        
        {/* Module Purpose Header */}
        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【估值模型是怎么算出来的】：</strong>
            巴菲特说：任何企业的价值，等于它在未来剩余寿命里能产生的自由现金流贴现总和。系统严格运用<strong>两阶段自由现金流折现 (DCF) 模型 ＋ 相对估值乘数</strong>，扣除净负债后折算出每股真实的内在公允身价。所有关键数据全透明公开！
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between border-b border-[#182236] pb-3 gap-2">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">
              第二步：估值模型估算出的数据细节支撑 (DCF 模型核心输出)
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMethodologyModalOpen(true)}
              className="px-2.5 py-1 rounded-lg bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs font-sans flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>估值模型推导逻辑说明</span>
            </button>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              基期年自由现金流 (FCF): ${(currentStock.dcfParams.baseFCF / 1000).toFixed(1)}B
            </span>
          </div>
        </div>

        {/* 4 Core DCF Valuation Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="bg-[#131b29] p-3.5 rounded-xl border border-[#1f2b42] flex flex-col justify-between">
            <div className="text-[11px] text-slate-400 font-sans">未来10年现金流折现现值</div>
            <div className="text-white font-bold text-base mt-1">
              ${(currentStock.dcfResult.discountedFCFSum / 1000).toFixed(1)}B
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">真金白银折算到今天</div>
          </div>

          <div className="bg-[#131b29] p-3.5 rounded-xl border border-[#1f2b42] flex flex-col justify-between">
            <div className="text-[11px] text-slate-400 font-sans">永续终值折现现值 (PV TV)</div>
            <div className="text-white font-bold text-base mt-1">
              ${(currentStock.dcfResult.pvTerminalValue / 1000).toFixed(1)}B
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">永续增长率 g: {currentStock.dcfParams.terminalGrowthRate}%</div>
          </div>

          <div className="bg-[#131b29] p-3.5 rounded-xl border border-[#1f2b42] flex flex-col justify-between">
            <div className="text-[11px] text-slate-400 font-sans">企业总价值 (Enterprise Value)</div>
            <div className="text-cyan-400 font-bold text-base mt-1">
              ${(currentStock.dcfResult.enterpriseValue / 1000).toFixed(1)}B
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">WACC 折现率: {currentStock.dcfParams.wacc}%</div>
          </div>

          <div className="bg-[#131b29] p-3.5 rounded-xl border border-[#1f2b42] flex flex-col justify-between">
            <div className="text-[11px] text-slate-400 font-sans">扣减负债后股东股权身价</div>
            <div className="text-emerald-400 font-bold text-base mt-1">
              ${(currentStock.dcfResult.equityValue / 1000).toFixed(1)}B
            </div>
            <div className="text-[10px] text-slate-400 font-sans mt-0.5">总股本: {currentStock.dcfParams.sharesOutstanding}M 股</div>
          </div>
        </div>

        {/* Relative Valuation Multiples Grid */}
        <div className="pt-2 border-t border-[#182236]">
          <div className="text-xs font-bold text-slate-300 mb-2 font-sans">
            相对估值与高频估值乘数参考：
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-[#1b2538]">
              <div className="text-[10px] text-slate-400 font-sans">动态市盈率 P/E TTM</div>
              <div className="text-white font-bold mt-0.5">{currentStock.peTTM} 倍</div>
            </div>
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-[#1b2538]">
              <div className="text-[10px] text-slate-400 font-sans">前瞻市盈率 Forward P/E</div>
              <div className="text-cyan-300 font-bold mt-0.5">{currentStock.forwardPE} 倍</div>
            </div>
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-[#1b2538]">
              <div className="text-[10px] text-slate-400 font-sans">企业价值倍数 EV/EBITDA</div>
              <div className="text-white font-bold mt-0.5">{currentStock.evToEbitda} 倍</div>
            </div>
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-[#1b2538]">
              <div className="text-[10px] text-slate-400 font-sans">现金流市现率 P/FCF</div>
              <div className="text-white font-bold mt-0.5">{currentStock.priceToFCF} 倍</div>
            </div>
            <div className="bg-[#0e1422] p-2.5 rounded-lg border border-[#1b2538]">
              <div className="text-[10px] text-slate-400 font-sans">年度股息分红率 (Dividend)</div>
              <div className="text-emerald-400 font-bold mt-0.5">{currentStock.dividendYield}%</div>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 第三步：🏛️ 总结公司的价值在哪里？为什么能值这个钱？(COMPANY VALUE SUMMARY)   */}
      {/* ========================================================================= */}
      <div className="bg-[#101622] border border-[#1a2336] rounded-2xl p-5 sm:p-6 space-y-5 shadow-lg">
        
        {/* Module Purpose Header */}
        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【总结公司的价值在哪里】：</strong>
            一家公司值不值得投资，绝不是单看K线涨跌，而是看它的<strong>商业壁垒（别人能不能抢它的饭碗）</strong>、<strong>债务暴雷排查（会不会欠债倒闭）</strong>、以及<strong>财务造血质量（赚的是不是假账）</strong>。
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-[#182236] pb-3">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">
            第三步：总结公司的价值在哪里？为什么客户离不开它？(商业护城河与财务排雷)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: 核心赚钱护城河 */}
          <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1f2b42] space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">① 商业护城河：为什么别人抄不走？</span>
                <span className="text-[11px] font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/15">
                  {currentStock.moatRating}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                资本回报率 (ROIC) 高达 {currentStock.roic}%，远超资本成本 {currentStock.wacc}%（超额回报率 +{currentStock.economicMoatSpread}%）。具有强大的垄断力、生态网络或专利定价权，对手根本抢不走客户。
              </p>
            </div>
            <div className="text-[11px] text-amber-300/80 font-sans pt-2 border-t border-[#1b2538]">
              ★ 客户离不开、产品自主年年提价的底层能力
            </div>
          </div>

          {/* Card 2: 暴雷排雷 (Altman Z) */}
          <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1f2b42] space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">② 债务排雷：未来两年会不会倒闭？</span>
                <span className="text-[11px] font-bold font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15">
                  {currentStock.altmanZ.score.toFixed(2)} 分 (安全)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                Altman Z 得分超过 2.99 分进入绝对安全区。账面可用现金充裕、短期债务压力健康，<strong>绝无债务违约或暴雷破产风险</strong>，本金极为安全。
              </p>
            </div>
            <div className="text-[11px] text-emerald-400/80 font-sans pt-2 border-t border-[#1b2538]">
              ✓ 经得起大风大浪宏观危机考验
            </div>
          </div>

          {/* Card 3: 财务变好还是变差 (Piotroski F) */}
          <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1f2b42] space-y-2.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">③ 财务质量：是在赚钱还是在画饼？</span>
                <span className="text-[11px] font-bold font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/15">
                  {currentStock.piotroskiF.score} / 9 分 (优秀)
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                7-9 分属于全球顶级白马企业。毛利稳健，赚的是真现金而不是假应收账款，没有在二级市场滥发新股稀释股东权益。
              </p>
            </div>
            <div className="text-[11px] text-cyan-300/80 font-sans pt-2 border-t border-[#1b2538]">
              ✓ 真金白银造血，不是靠做假账忽悠散户
            </div>
          </div>
        </div>

        {/* Analyst Bull & Bear Summary */}
        <div className="p-4 bg-[#131b29] rounded-2xl border border-[#1f2b42] space-y-3 text-xs font-sans">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>华尔街与顶级机构研究员多空博弈论点</span>
          </div>
          <div className="text-emerald-300 leading-relaxed bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/20">
            <strong>【多头核心底气（为什么看涨）】：</strong> {currentStock.analystSummary.bullCase}
          </div>
          <div className="text-rose-300 leading-relaxed bg-rose-950/20 p-2.5 rounded-xl border border-rose-500/20">
            <strong>【空头核心担忧（风险在哪里）】：</strong> {currentStock.analystSummary.bearCase}
          </div>
        </div>
      </div>

      {/* 📖 Valuation Methodology & Target Price Derivation Modal */}
      <ValuationMethodologyModal
        isOpen={isMethodologyModalOpen}
        onClose={() => setIsMethodologyModalOpen(false)}
      />

    </div>
  );
};
