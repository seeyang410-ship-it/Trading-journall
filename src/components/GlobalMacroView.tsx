import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Activity, 
  ShieldAlert, 
  Zap, 
  DollarSign, 
  BarChart3, 
  Scale, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Info,
  Radio
} from 'lucide-react';
import { 
  CURRENT_MACRO_REGIME, 
  INITIAL_CENTRAL_BANK_LIQUIDITY, 
  MACRO_KEY_INDICATORS, 
  ASSET_CORE_DRIVERS 
} from '../data/macroData';
import { INITIAL_MACRO_NEWS, MacroMarketNews } from '../data/macroNewsData';
import { AssetDriverProfile, MacroIndicator } from '../types/macro';
import { liveMarketEngine, LiveMarketTick } from '../services/liveMarketEngine';

interface GlobalMacroViewProps {
  onLogTradeFromMacro?: (prefill: { symbol: string; type: 'BUY' | 'SELL'; setup: string; notes: string }) => void;
}

export const GlobalMacroView: React.FC<GlobalMacroViewProps> = ({ onLogTradeFromMacro }) => {
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('XAUUSD');
  const [indicatorCategory, setIndicatorCategory] = useState<'All' | 'Rates' | 'Liquidity' | 'Risk' | 'Commodities' | 'FX'>('All');
  const [newsCategory, setNewsCategory] = useState<'All' | 'CentralBank' | 'Rates' | 'Commodities' | 'Crypto'>('All');
  
  // Real-time market tick subscription
  const [liveTicks, setLiveTicks] = useState<Record<string, LiveMarketTick>>({});

  useEffect(() => {
    const unsub = liveMarketEngine.subscribe((ticks) => {
      setLiveTicks(ticks);
    });
    return () => unsub();
  }, []);

  const selectedAsset: AssetDriverProfile = ASSET_CORE_DRIVERS.find(a => a.symbol === selectedAssetSymbol) || ASSET_CORE_DRIVERS[0];

  // Filtered Macro News
  const filteredNews = newsCategory === 'All' 
    ? INITIAL_MACRO_NEWS 
    : INITIAL_MACRO_NEWS.filter(n => n.category === newsCategory);

  // Map live tick to selected asset
  const liveAssetTick = liveTicks[selectedAsset.symbol];
  const liveAssetPrice = liveAssetTick ? liveAssetTick.price : selectedAsset.currentPrice;

  const filteredIndicators = indicatorCategory === 'All' 
    ? MACRO_KEY_INDICATORS 
    : MACRO_KEY_INDICATORS.filter(i => i.category === indicatorCategory);

  const handleQuickTrade = (asset: AssetDriverProfile) => {
    if (!onLogTradeFromMacro) return;
    const isBull = asset.directionBias.includes('BULLISH');
    const isBear = asset.directionBias.includes('BEARISH');
    onLogTradeFromMacro({
      symbol: asset.symbol,
      type: isBull ? 'BUY' : isBear ? 'SELL' : 'BUY',
      setup: 'Macro First-Principle Driver',
      notes: `[华尔街宏观核心驱动] ${asset.coreDriverThesis} (主权催化: ${asset.keyCatalysts[0] || '流动性驱动'})`
    });
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-16 font-sans">
      
      {/* 1. Global Macro Regime Hero Banner */}
      <div className="bg-gradient-to-r from-[#0d1424] via-[#101b30] to-[#0c1527] border border-[#1e2c47] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Explanation Tooltip Banner */}
        <div className="mb-4 p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【全球宏观时钟与流动性水库告诉你什么】：</strong>
            价格涨跌的根本发动机是<strong>“钱的供求”</strong>。美联储净流动性（美联储总资产减去财政账户与逆回购）是华尔街对冲基金监控全球资金蓄水池的核心指标。当净流动性扩张（绿色）时，资金涌向风险资产；收紧时，资产估值承压。
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>当前宏观时钟周期: {CURRENT_MACRO_REGIME.regime}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-400 border border-blue-500/30">
                <Activity className="w-3.5 h-3.5" />
                <span>市场风险情绪: {CURRENT_MACRO_REGIME.sentiment}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-950/70 text-cyan-300 border border-cyan-700/50">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>实时宏观数据总线已连接</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <Globe2 className="w-6 h-6 text-cyan-400" />
              <span>全球宏观流动性与底层驱动中枢 (Global Macro Terminal)</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {CURRENT_MACRO_REGIME.summary}
            </p>

            <div className="text-xs text-slate-400 pt-1 flex items-center gap-2 font-mono">
              <span className="text-cyan-400 font-bold">美联储政策导向:</span>
              <span>{CURRENT_MACRO_REGIME.fedActionBias}</span>
            </div>
          </div>

          {/* Central Bank Net Liquidity Card */}
          <div className="bg-[#0b101c]/80 border border-[#1b263d] rounded-xl p-4 min-w-[280px] shrink-0 font-mono space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-sans font-bold">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                美联储净流动性 (Net Liquidity)
              </span>
              <span className="text-[10px] text-slate-400">Fed - TGA - RRP</span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-white">
                ${INITIAL_CENTRAL_BANK_LIQUIDITY.netLiquidity.toFixed(3)}T
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +${INITIAL_CENTRAL_BANK_LIQUIDITY.netLiquidityChange30d}B / 30D
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#182236] text-[11px] text-slate-400">
              <div>
                <div className="text-[10px] text-slate-400">总资产</div>
                <div className="text-slate-200 font-bold">${INITIAL_CENTRAL_BANK_LIQUIDITY.fedTotalAssets}T</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">TGA 财政账户</div>
                <div className="text-slate-200 font-bold">${INITIAL_CENTRAL_BANK_LIQUIDITY.tgaBalance}B</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400">RRP 逆回购</div>
                <div className="text-slate-200 font-bold">${INITIAL_CENTRAL_BANK_LIQUIDITY.rrpBalance}B</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE MACRO NEWS & REAL IMPACT ENGINE (实时宏观快讯与资产多米诺影响) */}
      <div className="bg-[#101622] border border-[#1a2336] rounded-2xl p-5 sm:p-6 space-y-4">
        
        {/* Header with live indicator & filter pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#182236] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white tracking-tight">
                实时宏观市场快讯与资产连带影响大白话拆解 (Live Macro News & Impact Engine)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                实时连线
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-sans">
              不仅给您推送快讯，而且用大白话直接告诉您：<strong>这条新闻到底说了什么？会对黄金、纳指、美元、大宗商品带来什么直接影响？您该怎么操作？</strong>
            </p>
          </div>

          {/* News category filters */}
          <div className="flex items-center gap-1 bg-[#141b29] p-1 rounded-xl border border-[#20293d] overflow-x-auto text-xs shrink-0">
            {(['All', 'CentralBank', 'Rates', 'Commodities', 'Crypto'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setNewsCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  newsCategory === cat 
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'All' ? '全部全球突发快讯' :
                 cat === 'CentralBank' ? '🏛️ 央行政策' :
                 cat === 'Rates' ? '📉 利率与国债' :
                 cat === 'Commodities' ? '🛢️ 黄金与大宗' : '⚡ 加密流动性'}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards List */}
        <div className="space-y-4">
          {filteredNews.map(news => (
            <div 
              key={news.id}
              className="bg-[#131b29] border border-[#1e2a42] hover:border-[#2a3854] rounded-2xl p-4 sm:p-5 space-y-3.5 transition-all shadow-md"
            >
              {/* News Top Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold font-sans ${
                    news.urgency.includes('BREAKING') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                    news.urgency.includes('IMPORTANT') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {news.urgency}
                  </span>
                  <span className="text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{news.time}</span>
                  </span>
                  <span className="text-slate-400">· 来源: {news.source}</span>
                </div>
              </div>

              {/* News Original Headline */}
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                {news.title}
              </h3>

              {/* 💡 Plain Language Translation (大白话核心翻译) */}
              <div className="p-3 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 rounded-xl border border-blue-500/30 text-xs sm:text-sm text-cyan-200 leading-relaxed font-sans font-medium">
                {news.plainTranslation}
              </div>

              {/* 🌊 Domino Effect / Asset Impact Grid (多米诺连带影响) */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <span>多米诺连带影响 (对各大资产意味着什么)：</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {news.marketImpacts.map((imp, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#0f1522] p-3 rounded-xl border border-[#1b2538] flex flex-col justify-between space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white truncate pr-1">{imp.asset}</span>
                        <span className={`text-[11px] font-extrabold px-1.5 py-0.2 rounded font-sans ${
                          imp.bias === 'BULLISH' ? 'bg-emerald-500/20 text-emerald-400' :
                          imp.bias === 'BEARISH' ? 'bg-rose-500/20 text-rose-400' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {imp.effectTitle}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        {imp.plainReason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🎯 Practical Action Guide (普通人该怎么操作) */}
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/30 flex items-start gap-2 text-xs font-sans text-emerald-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">实战应对动作：</strong>
                  <span>{news.actionGuide}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 3. Key Macro Indicators Grid */}
      <div className="space-y-3">
        
        {/* Section Purpose Banner */}
        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【先导指标矩阵告诉你什么】：</strong>
            ① <strong>10Y TIPS 实际利率</strong>回落 ➔ 极大利好<strong>无息黄金 (XAUUSD)</strong> 与高成长科技股；
            ② <strong>10Y-2Y 利差由倒挂转向正值</strong> ➔ 标志着降息周期正式全面展开；
            ③ <strong>铜金比</strong>上升 ➔ 实体制造业经济强于避险，利多周期股和大宗商品；
            ④ <strong>垃圾债信用利差 (HYG Spread)</strong> 收窄 ➔ 企业信贷安全无虞，系统性暴雷风险极低。
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              全球宏观核心先导指标 (Leading Macro Metrics - 实时刷新)
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#101622] p-1 rounded-lg border border-[#1b2336] text-xs">
            {(['All', 'Rates', 'Liquidity', 'Risk', 'Commodities', 'FX'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setIndicatorCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  indicatorCategory === cat 
                    ? 'bg-[#1e293d] text-cyan-400 font-bold' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'All' ? '全部指标' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredIndicators.map(indicator => {
            // Live tick integration
            const tickKey = indicator.id.includes('us10y') ? 'US10Y' :
                            indicator.id.includes('tips') ? 'TIPS10Y' :
                            indicator.id.includes('dxy') ? 'DXY' :
                            indicator.id.includes('vix') ? 'VIX' : null;
            const tick = tickKey ? liveTicks[tickKey] : null;
            const currentVal = tick ? tick.price : indicator.currentValue;
            const change24h = tick ? tick.change : indicator.change24h;
            const isUp = change24h > 0;
            const isDown = change24h < 0;

            return (
              <div 
                key={indicator.id}
                className="bg-[#101622] border border-[#1a2336] hover:border-[#22314a] rounded-xl p-4 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span className="font-bold text-white truncate pr-2">{indicator.plainTitle || indicator.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-bold ${
                      indicator.status === 'Bullish' ? 'bg-emerald-500/15 text-emerald-400' :
                      indicator.status === 'Bearish' ? 'bg-rose-500/15 text-rose-400' :
                      'bg-slate-700/50 text-slate-300'
                    }`}>
                      {indicator.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-cyan-300/80 font-mono">{indicator.name}</div>

                  <div className="flex items-baseline gap-2 mt-1 font-mono">
                    <span className="text-xl font-bold text-white">
                      {currentVal}{indicator.unit}
                    </span>
                    <span className={`text-xs flex items-center font-bold ${
                      isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-slate-400'
                    }`}>
                      {isUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : isDown ? <ArrowDownRight className="w-3.5 h-3.5" /> : null}
                      {change24h > 0 ? `+${change24h}` : change24h}
                    </span>
                  </div>

                  {/* Sparkline Visual */}
                  <div className="h-6 flex items-end gap-1 mt-2.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    {indicator.chartHistory.map((val, idx) => {
                      const min = Math.min(...indicator.chartHistory);
                      const max = Math.max(...indicator.chartHistory);
                      const range = max - min || 1;
                      const pct = Math.max(15, Math.round(((val - min) / range) * 100));
                      return (
                        <div 
                          key={idx}
                          style={{ height: `${pct}%` }}
                          className={`flex-1 rounded-t-sm transition-all ${
                            idx === indicator.chartHistory.length - 1 ? 'bg-cyan-400' : 'bg-slate-700 hover:bg-slate-500'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] font-sans mt-3 pt-2.5 border-t border-[#172030] leading-relaxed">
                  {indicator.plainAnalogy && (
                    <div className="text-slate-300 bg-[#141d2e] p-2 rounded-lg border border-[#1e2a3f]">
                      {indicator.plainAnalogy}
                    </div>
                  )}
                  {indicator.plainActionAdvice && (
                    <div className="text-emerald-300 font-medium">
                      {indicator.plainActionAdvice}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Deep Asset Drivers Breakdown */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-5 sm:p-6 space-y-6">
        
        {/* Section Purpose Banner */}
        <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl flex items-start gap-2.5 text-xs">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-slate-300 leading-relaxed font-sans">
            <strong className="text-cyan-400">【品种底层驱动第一性原理告诉你什么】：</strong>
            散户交易只看技术图表，机构交易看底层因子驱动。例如：<strong>黄金不是均线推动的，而是由实际利率倒数 (35%) + 央行购金去美元化 (30%) + 法币赤字稀释 (20%) 共同决定的。</strong>通过本看板，您可以清楚知道每个品种当前的做多/做空确信度以及催化剂。
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#182236] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">
                金融资产底层驱动第一性原理 (Underlying Asset Driver Breakdown)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              剥离表象价格K线噪音，拆解每个大类资产背后的决定性引力常数与机构持仓动向
            </p>
          </div>

          {/* Asset Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#141b29] rounded-xl border border-[#20293d]">
            {ASSET_CORE_DRIVERS.map(asset => {
              const active = asset.symbol === selectedAssetSymbol;
              return (
                <button
                  key={asset.symbol}
                  onClick={() => setSelectedAssetSymbol(asset.symbol)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    active 
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{asset.symbol}</span>
                  <span className="text-[10px] font-sans font-normal opacity-80">({asset.assetName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Asset Core Thesis Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Thesis & Stance */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#131b2b] p-4 rounded-xl border border-[#1e2a42]">
              <div>
                <div className="text-xs text-slate-400 font-sans">标的品种 & 实时成交价</div>
                <div className="text-lg font-bold text-white font-mono flex items-center gap-2 mt-0.5">
                  <span>{selectedAsset.assetName}</span>
                  <span className="text-cyan-400 font-extrabold">${liveAssetPrice.toLocaleString()}</span>
                  {liveAssetTick && (
                    <span className={`text-xs ${liveAssetTick.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({liveAssetTick.changePercent >= 0 ? '+' : ''}{liveAssetTick.changePercent}%)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-sans">华尔街机构偏向</div>
                  <div className={`text-sm font-bold mt-0.5 ${
                    selectedAsset.directionBias.includes('BULLISH') ? 'text-emerald-400' :
                    selectedAsset.directionBias.includes('BEARISH') ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {selectedAsset.directionBias}
                  </div>
                </div>

                <button
                  onClick={() => handleQuickTrade(selectedAsset)}
                  className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-lg shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>依据此逻辑记账</span>
                </button>
              </div>
            </div>

            {/* Core Driver Thesis Box */}
            <div className="bg-[#0e1422] p-4 rounded-xl border border-[#1a2438] space-y-2.5">
              <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>底层核心驱动逻辑 (Core Driver Thesis)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-medium">
                {selectedAsset.coreDriverThesis}
              </p>
              {selectedAsset.plainLanguageThesis && (
                <div className="p-3 bg-gradient-to-r from-blue-950/40 to-cyan-950/30 border border-blue-500/30 rounded-xl text-xs text-cyan-200 font-sans leading-relaxed">
                  {selectedAsset.plainLanguageThesis}
                </div>
              )}
              {selectedAsset.plainActionSummary && (
                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-sans leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{selectedAsset.plainActionSummary}</span>
                </div>
              )}
            </div>

            {/* Driver Components Breakdown */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300">决定性核心引力因子分解 (Driver Components)</div>
              <div className="space-y-2">
                {selectedAsset.driverComponents.map((comp, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-[#131926] border border-[#1b2438] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{comp.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                          权重 {comp.weight}%
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans ${
                          comp.impact === 'Positive' ? 'bg-emerald-500/15 text-emerald-400' :
                          comp.impact === 'Negative' ? 'bg-rose-500/15 text-rose-400' :
                          'bg-slate-700/50 text-slate-300'
                        }`}>
                          {comp.impact === 'Positive' ? '利好驱动 (+)' : comp.impact === 'Negative' ? '压制阻力 (-)' : '中性观望'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans leading-relaxed">
                        {comp.description}
                      </p>
                      {comp.plainMeaning && (
                        <div className="text-[11px] text-cyan-300 font-sans bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-800/30">
                          <strong>【大白话白话】：</strong>{comp.plainMeaning}
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0 font-mono text-xs font-bold text-slate-200 bg-[#162032] px-2.5 py-1.5 rounded-lg border border-[#22314a]">
                      {comp.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Catalysts & Institutional Positioning */}
          <div className="space-y-4">
            {/* Institutional Positioning Card */}
            <div className="bg-[#121826] border border-[#1b2438] rounded-xl p-4 space-y-3 font-mono">
              <div className="text-xs font-bold text-slate-200 font-sans flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>华尔街机构持仓动向 (Positioning)</span>
              </div>

              {selectedAsset.institutionalPositioning.cotNetLongContracts !== undefined && (
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#182236]">
                  <span className="text-slate-400 font-sans">CFTC COT 机构净多头</span>
                  <span className="text-white font-bold">
                    {selectedAsset.institutionalPositioning.cotNetLongContracts.toLocaleString()} 张合约
                  </span>
                </div>
              )}

              {selectedAsset.institutionalPositioning.etfFlow7dUSD && (
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#182236]">
                  <span className="text-slate-400 font-sans">近7天 ETF 资金流向</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedAsset.institutionalPositioning.etfFlow7dUSD}
                  </span>
                </div>
              )}

              {selectedAsset.institutionalPositioning.retailSentiment && (
                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-slate-400 font-sans">散户多空情绪</span>
                  <span className="text-amber-400 font-bold">
                    {selectedAsset.institutionalPositioning.retailSentiment}
                  </span>
                </div>
              )}
            </div>

            {/* Upcoming Catalysts List */}
            <div className="bg-[#121826] border border-[#1b2438] rounded-xl p-4 space-y-2.5">
              <div className="text-xs font-bold text-slate-200 font-sans flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>关键宏观催化剂 (Key Catalysts)</span>
              </div>

              <div className="space-y-2 text-xs">
                {selectedAsset.keyCatalysts.map((cat, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Rule Reminder */}
            <div className="bg-gradient-to-br from-blue-950/20 to-cyan-950/20 border border-blue-500/20 rounded-xl p-4 text-[11px] text-slate-300 leading-relaxed space-y-1.5 font-sans">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>华尔街宏观法则 (Macro Principle)</span>
              </div>
              <div>
                “绝不要在宏观流动性紧缩周期中，试图仅凭 15 分钟超卖指标接飞刀。顺应宏观趋势开仓，每一次微观回踩都是机构加仓的黄金坑。”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
