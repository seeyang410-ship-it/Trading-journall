import React, { useState, useEffect, useCallback } from 'react';
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
  Radio,
  Search,
  BookOpen,
  X
} from 'lucide-react';
import { 
  CURRENT_MACRO_REGIME, 
  INITIAL_CENTRAL_BANK_LIQUIDITY, 
  MACRO_KEY_INDICATORS, 
  ASSET_CORE_DRIVERS 
} from '../data/macroData';
import { resolveAnyMacroAsset } from '../data/macroAssetDrivers';
import { INITIAL_MACRO_NEWS, MacroMarketNews } from '../data/macroNewsData';
import { AssetDriverProfile, MacroIndicator, MacroAssetCategory } from '../types/macro';
import { liveMarketEngine, LiveMarketTick } from '../services/liveMarketEngine';

interface GlobalMacroViewProps {
  onLogTradeFromMacro?: (prefill: { symbol: string; type: 'BUY' | 'SELL'; setup: string; notes: string }) => void;
}

export interface MacroSpectrumCat {
  id: string;
  label: string;
  icon: string;
  shortDesc: string;
}

export const MACRO_SPECTRUM_CATEGORIES: MacroSpectrumCat[] = [
  { id: '💱 全球外汇', label: '💱 全球外汇', icon: '💱', shortDesc: 'G10核心直盘 · 高波动套息交叉盘 · 亚洲与新兴市场货币 · 美元指数' },
  { id: '🪙 加密资产', label: '🪙 加密资产', icon: '🪙', shortDesc: '数字黄金基准 · 高性能L1公链 · DeFi与基础设施 · AI算力代币' },
  { id: '📦 全球大宗商品', label: '📦 大宗商品全品类', icon: '📦', shortDesc: '贵金属 · 工业金属与电池矿 · 能源大宗 · 农产主粮 · 软商品经济作物 · 畜牧' },
  { id: '🌐 全球股指', label: '🌐 全球核心股指', icon: '🌐', shortDesc: '纳斯达克100 · 标普500 · 道指 · 德国DAX40 · 大马综指KLCI · 恒生' },
  { id: '📈 期货市场专区', label: '📈 交易所期货主力', icon: '📈', shortDesc: 'BMD马棕油 · CBOT农产 · NYMEX能源 · COMEX贵金属 · LME' },
  { id: '全部品种', label: '🌐 全景速览矩阵', icon: '🌐', shortDesc: '全球宏观全景矩阵速查' }
];

export const SUB_CATEGORIES_MAP: Record<string, { id: string; label: string }[]> = {
  '💱 全球外汇': [
    { id: 'ALL', label: '全部外汇 (24+品种)' },
    { id: 'MAJORS', label: 'G10核心直盘 (EUR/JPY/GBP/AUD/CAD/CHF/NZD/DXY)' },
    { id: 'CROSSES', label: '高波动套息交叉盘 (GBPJPY/EURJPY/AUDJPY/CADJPY/EURGBP/EURCHF/CHFJPY)' },
    { id: 'ASIA_EM', label: '亚洲与新兴市场货币 (USDMYR/USDCNH/USDSGD/THB/INR/MXN/ZAR/KRW)' }
  ],
  '🪙 加密资产': [
    { id: 'ALL', label: '全部加密资产 (20+核心标的)' },
    { id: 'STORE_OF_VALUE', label: '数字黄金与储备基准 (BTC/ETH/LTC)' },
    { id: 'HIGH_PERF_L1', label: '顶级高性能L1公链 (SOL/SUI/AVAX/ADA/NEAR/TON/DOT)' },
    { id: 'DEFI_INFRA', label: 'DeFi/支付/借贷 (AAVE/LINK/UNI/XRP/BNB/DOGE)' },
    { id: 'AI_MEME', label: 'AI算力与流行迷因 (RENDER/TAO/FET/PEPE)' }
  ],
  '📦 全球大宗商品': [
    { id: 'ALL', label: '全部大宗商品 (35+品种)' },
    { id: 'METALS', label: '🪙 贵金属与工业基石 (黄金/白银/铜/铝/锂/镍/稀土)' },
    { id: 'ENERGY', label: '⚡ 能源大宗 (原油WTI/布伦特/天然气/取暖油/铀矿/动力煤)' },
    { id: 'AGRI', label: '🌾 农产主粮口粮 (CBOT大豆/玉米/小麦/豆粕/豆油/糙米)' },
    { id: 'SOFTS', label: '☕ 软商品经济作物 (大马棕榈油FCPO/咖啡/可可/糖/棉花/橡胶)' },
    { id: 'LIVESTOCK', label: '🥩 畜牧肉类 (活牛/饲牛/瘦肉猪/牛奶)' }
  ],
  '🌐 全球股指': [
    { id: 'ALL', label: '全部主要股指 (12+核心)' },
    { id: 'US_INDICES', label: '美股三大核心与中小盘 (纳指100/标普500/道指/罗素2000)' },
    { id: 'EUROPE_INDICES', label: '欧洲核心 (德国DAX40/英国富时100/欧洲斯托克50)' },
    { id: 'ASIA_PACIFIC', label: '亚太与大马综指 (大马KLCI/日经225/恒生/恒生科技/沪深300/新交所海峡)' }
  ],
  '📈 期货市场专区': [
    { id: 'ALL', label: '全部交易所期货主力 (18+)' },
    { id: 'SOFTS_BMD_FUT', label: 'BMD/ICE (马棕油FCPO/可可/咖啡/棉花)' },
    { id: 'AGRI_FUT', label: 'CBOT (大豆/玉米/小麦/豆粕)' },
    { id: 'METALS_ENERGY_FUT', label: 'COMEX/NYMEX (黄金/白银/铜/原油/美气)' },
    { id: 'LME_SGX_FUT', label: 'LME/SGX (伦铜铝镍/新交所铁矿石)' }
  ],
  '全部品种': [
    { id: 'ALL', label: '全景矩阵速览' },
    { id: 'FX_CRYPTO', label: '💱 外汇 ＆ 加密' },
    { id: 'COMMODITIES', label: '📦 大宗五大门类' },
    { id: 'INDICES_FUTURES', label: '🌐 股指 ＆ 期货' }
  ]
};

export const GlobalMacroView: React.FC<GlobalMacroViewProps> = ({ onLogTradeFromMacro }) => {
  const [assetCategory, setAssetCategory] = useState<string>('💱 全球外汇');
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>('ALL');
  const [selectedAssetSymbol, setSelectedAssetSymbol] = useState<string>('EURUSD');
  const [isMacroDirectoryOpen, setIsMacroDirectoryOpen] = useState<boolean>(false);
  const [macroSearch, setMacroSearch] = useState<string>('');
  const [extraAssets, setExtraAssets] = useState<AssetDriverProfile[]>([]);
  const [horizonTab, setHorizonTab] = useState<'all' | 'short' | 'medium' | 'long'>('all');
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

  const allAvailableAssets = React.useMemo(() => {
    const combined = [...extraAssets, ...ASSET_CORE_DRIVERS];
    const seen = new Set<string>();
    return combined.filter(a => {
      const upper = a.symbol.toUpperCase();
      if (seen.has(upper)) return false;
      seen.add(upper);
      return true;
    });
  }, [extraAssets]);

  const matchAssetToCategory = useCallback((asset: AssetDriverProfile, cat: string): boolean => {
    if (cat === '全部品种') return true;
    const s = asset.symbol.toUpperCase();
    const sub = (asset.subCategory || '').toLowerCase();
    const c = asset.category;

    if (cat === '💱 全球外汇') {
      return c === '外汇' || 
        ['DXY', 'EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCHF', 'USDCAD', 'GBPJPY', 'EURJPY', 'USDMYR', 'USDCNH', 'USDSGD', 'NZDUSD', 'AUDJPY', 'EURGBP', 'EURCHF', 'CADJPY', 'USDTHB', 'USDINR', 'USDMXN', 'USDZAR', 'USDKRW', 'CHFJPY'].includes(s) ||
        (s.includes('USD') && (s.includes('JPY') || s.includes('EUR') || s.includes('GBP') || s.includes('MYR') || s.includes('CNH') || s.includes('CAD') || s.includes('CHF') || s.includes('AUD') || s.includes('NZD') || s.includes('SGD') || s.includes('KRW') || s.includes('MXN') || s.includes('ZAR') || s.includes('THB') || s.includes('INR'))) ||
        sub.includes('汇率') || sub.includes('外汇') || sub.includes('货币');
    }

    if (cat === '🪙 加密资产') {
      return c === '加密货币' || 
        ['BTCUSD', 'ETHUSD', 'SOLUSD', 'XRPUSD', 'BNBUSD', 'DOGEUSD', 'ADAUSD', 'AVAXUSD', 'LINKUSD', 'SUIUSD', 'NEARUSD', 'TONUSD', 'LTCUSD', 'FETUSD', 'UNIUSD', 'TAOUSD', 'DOTUSD', 'PEPEUSD', 'RENDERUSD', 'AAVEUSD'].includes(s) ||
        sub.includes('加密') || sub.includes('公链') || sub.includes('代币') || sub.includes('区块链') || sub.includes('defi');
    }

    if (cat === '📦 全球大宗商品') {
      return c === '大宗商品' || c === '贵金属' || c === '能源商品' || c === '农产品' || c === '软商品' || c === '畜牧肉类' ||
        ['XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD', 'XRHUSD', 'XAUXAG', 'COPPER', 'ALUMINUM', 'TIN', 'NICKEL', 'ZINC', 'LITHIUM', 'IRONORE', 'RAREEARTH', 'COBALT',
         'WTI', 'BRENT', 'NATGAS', 'URANIUM', 'HEATOIL', 'GASOLINE', 'COAL', 'GASOIL', 'TTF',
         'SOYBEAN', 'CORN', 'WHEAT', 'SOYOIL', 'SOYMEAL', 'RICE', 'OATS', 'CANOLA',
         'FCPO', 'COFFEE', 'ROBUSTA', 'COCOA', 'SUGAR', 'COTTON', 'RUBBER', 'OJ', 'LUMBER',
         'LIVE_CATTLE', 'FEEDER_CATTLE', 'LEAN_HOGS', 'MILK'].includes(s) ||
        sub.includes('金属') || sub.includes('黄金') || sub.includes('白银') || sub.includes('铜') || sub.includes('能源') || sub.includes('原油') || sub.includes('农产品') || sub.includes('棕榈') || sub.includes('畜牧');
    }

    if (cat === '🌐 全球股指') {
      return c === '指数' || ['NAS100', 'SPX500', 'US30', 'US2000', 'KLCI', 'FBMKLCI', 'HSI', 'HSTECH', 'CSI300', 'CHINA50', 'HK50', 'STI', 'NIKKEI225', 'JP225', 'GER40', 'UK100', 'STOXX50', 'SENSEX', 'VN30'].includes(s);
    }

    if (cat === '📈 期货市场专区') {
      return c === '期货市场' || 
        s.startsWith('BMD_') || s.startsWith('CME_') || s.startsWith('COMEX_') || s.startsWith('ICE_') || s.startsWith('LME_') || s.startsWith('SGX_') ||
        Boolean(asset.futuresContractSpecs) ||
        ['FCPO', 'SOYBEAN', 'CORN', 'WHEAT', 'COCOA', 'COFFEE', 'SUGAR', 'RUBBER', 'LIVE_CATTLE', 'LEAN_HOGS'].includes(s);
    }

    return false;
  }, []);

  const matchAssetToSubCategory = useCallback((asset: AssetDriverProfile, mainCat: string, subCatId: string): boolean => {
    if (subCatId === 'ALL') return true;
    const s = asset.symbol.toUpperCase();
    const sub = (asset.subCategory || '').toLowerCase();
    const c = asset.category;

    if (mainCat === '全部品种') {
      if (subCatId === 'FX_CRYPTO') return c === '外汇' || c === '加密货币';
      if (subCatId === 'COMMODITIES') return c === '贵金属' || c === '能源商品' || c === '农产品' || c === '软商品' || c === '畜牧肉类';
      if (subCatId === 'INDICES_FUTURES') return c === '期货市场' || c === '指数';
    }

    if (mainCat === '💱 全球外汇') {
      if (subCatId === 'MAJORS') return ['EURUSD', 'USDJPY', 'GBPUSD', 'AUDUSD', 'USDCAD', 'USDCHF', 'NZDUSD', 'DXY'].includes(s);
      if (subCatId === 'CROSSES') return ['GBPJPY', 'EURJPY', 'EURGBP', 'AUDJPY', 'EURCHF', 'CADJPY', 'CHFJPY'].includes(s) || sub.includes('交叉盘');
      if (subCatId === 'ASIA_EM') return ['USDMYR', 'USDCNH', 'USDSGD', 'USDTHB', 'USDINR', 'USDMXN', 'USDZAR', 'USDKRW'].includes(s) || sub.includes('亚洲') || sub.includes('新兴') || sub.includes('马币') || sub.includes('人民币') || sub.includes('泰铢') || sub.includes('卢比') || sub.includes('韩元') || sub.includes('比索');
    }

    if (mainCat === '🪙 加密资产') {
      if (subCatId === 'STORE_OF_VALUE') return ['BTCUSD', 'ETHUSD', 'LTCUSD'].includes(s);
      if (subCatId === 'HIGH_PERF_L1') return ['SOLUSD', 'SUIUSD', 'AVAXUSD', 'ADAUSD', 'NEARUSD', 'TONUSD', 'DOTUSD'].includes(s);
      if (subCatId === 'DEFI_INFRA') return ['AAVEUSD', 'XRPUSD', 'BNBUSD', 'DOGEUSD', 'LINKUSD', 'UNIUSD'].includes(s);
      if (subCatId === 'AI_MEME') return ['RENDERUSD', 'TAOUSD', 'FETUSD', 'PEPEUSD'].includes(s) || sub.includes('ai') || sub.includes('模因') || sub.includes('迷因');
    }

    if (mainCat === '📦 全球大宗商品') {
      if (subCatId === 'METALS') return c === '贵金属' || ['XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD', 'XRHUSD', 'COPPER', 'ALUMINUM', 'TIN', 'NICKEL', 'ZINC', 'LITHIUM', 'IRONORE', 'RAREEARTH', 'COBALT', 'LME_CA', 'LME_AH', 'COMEX_GC', 'COMEX_SI'].includes(s) || sub.includes('金属') || sub.includes('黄金') || sub.includes('白银') || sub.includes('铜') || sub.includes('锂') || sub.includes('矿');
      if (subCatId === 'ENERGY') return c === '能源商品' || ['WTI', 'BRENT', 'HEATOIL', 'GASOLINE', 'GASOIL', 'NATGAS', 'URANIUM', 'COAL', 'TTF', 'NYMEX_CL', 'NYMEX_NG'].includes(s) || sub.includes('能源') || sub.includes('原油') || sub.includes('天然气') || sub.includes('煤') || sub.includes('铀');
      if (subCatId === 'AGRI') return c === '农产品' || ['SOYBEAN', 'SOYMEAL', 'SOYOIL', 'CORN', 'WHEAT', 'RICE', 'OATS', 'CANOLA', 'CME_ZS', 'CME_ZC', 'CME_ZW'].includes(s) || sub.includes('大豆') || sub.includes('玉米') || sub.includes('小麦') || sub.includes('粮');
      if (subCatId === 'SOFTS') return c === '软商品' || ['FCPO', 'COFFEE', 'ROBUSTA', 'COCOA', 'SUGAR', 'COTTON', 'RUBBER', 'OJ', 'LUMBER', 'BMD_FCPO', 'ICE_CC', 'ICE_KC', 'ICE_SB'].includes(s) || sub.includes('棕榈') || sub.includes('咖啡') || sub.includes('可可') || sub.includes('糖') || sub.includes('棉花') || sub.includes('橡胶');
      if (subCatId === 'LIVESTOCK') return c === '畜牧肉类' || ['LIVE_CATTLE', 'FEEDER_CATTLE', 'LEAN_HOGS', 'MILK', 'CME_LE', 'CME_GF', 'CME_HE'].includes(s) || sub.includes('牛') || sub.includes('猪') || sub.includes('肉') || sub.includes('乳');
    }

    if (mainCat === '🌐 全球股指') {
      if (subCatId === 'US_INDICES') return ['NAS100', 'SPX500', 'US30', 'US2000'].includes(s);
      if (subCatId === 'EUROPE_INDICES') return ['GER40', 'UK100', 'STOXX50'].includes(s);
      if (subCatId === 'ASIA_PACIFIC') return ['KLCI', 'FBMKLCI', 'HSI', 'HSTECH', 'CSI300', 'CHINA50', 'HK50', 'NIKKEI225', 'JP225', 'STI'].includes(s);
    }

    if (mainCat === '📈 期货市场专区') {
      if (subCatId === 'SOFTS_BMD_FUT') return s.startsWith('BMD_') || s.startsWith('ICE_') || ['FCPO', 'COFFEE', 'COCOA', 'SUGAR'].includes(s);
      if (subCatId === 'AGRI_FUT') return s.startsWith('CME_') || ['SOYBEAN', 'CORN', 'WHEAT'].includes(s);
      if (subCatId === 'METALS_ENERGY_FUT') return s.startsWith('COMEX_') || s.startsWith('NYMEX_');
      if (subCatId === 'LME_SGX_FUT') return s.startsWith('LME_') || s.startsWith('SGX_') || ['RUBBER', 'COPPER', 'ALUMINUM'].includes(s);
    }


    return true;
  }, []);

  const filteredAssets = React.useMemo(() => {
    let list = allAvailableAssets.filter(a => matchAssetToCategory(a, assetCategory));

    if (subCategoryFilter !== 'ALL') {
      list = list.filter(a => matchAssetToSubCategory(a, assetCategory, subCategoryFilter));
    }

    if (macroSearch.trim()) {
      const q = macroSearch.trim().toLowerCase();
      list = list.filter(a => 
        a.symbol.toLowerCase().includes(q) || 
        a.assetName.toLowerCase().includes(q) || 
        (a.subCategory && a.subCategory.toLowerCase().includes(q))
      );
    }
    return list;
  }, [assetCategory, subCategoryFilter, macroSearch, allAvailableAssets, matchAssetToCategory, matchAssetToSubCategory]);

  const selectedAsset: AssetDriverProfile = allAvailableAssets.find(a => a.symbol === selectedAssetSymbol) || filteredAssets[0] || allAvailableAssets[0];

  const handleCustomMacroResolve = (query: string) => {
    if (!query.trim()) return;
    const resolved = resolveAnyMacroAsset(query.trim());
    setExtraAssets(prev => [resolved, ...prev.filter(a => a.symbol.toUpperCase() !== resolved.symbol.toUpperCase())]);
    setSelectedAssetSymbol(resolved.symbol);
    liveMarketEngine.ensureTicker(resolved.symbol, resolved.currentPrice);
    setMacroSearch('');
  };

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
        <div className="space-y-4 border-b border-[#182236] pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>全球全谱系宏观与大宗资产库 (涵盖商品 · 外汇 · 加密 · 期货 · 股指)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-mono">
                    收录 {allAvailableAssets.length} 核心品种
                  </span>
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                采用顶级对冲基金资产谱系架构：分层收录全球外汇 (G10/交叉/令吉/美指)、全球加密货币 (BTC/ETH/SOL/SUI/RWA)、大宗五大门类（能源/金属/主粮/软商/畜牧）、交易所主力期货及全球股指。
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMacroDirectoryOpen(true)}
                className="px-3 py-1.5 bg-[#172338] hover:bg-cyan-500/20 text-cyan-300 hover:text-white border border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>全品种速查目录 ({allAvailableAssets.length})</span>
              </button>
              <div className="text-xs text-slate-400 font-sans hidden sm:block text-right">
                当前大类: <strong className="text-white font-mono">{filteredAssets.length}</strong> 个品种
              </div>
            </div>
          </div>

          {/* 🌟 一级品类大纲切换导航 (Top-Tier Spectrum Tabs) */}
          <div className="bg-[#101726] p-3 rounded-xl border border-[#1e2a40] space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Layers className="w-3.5 h-3.5" />
                <span>一级核心资产大类选择 (点击切换品类)：</span>
              </span>
              <span className="text-[10px] text-slate-400">
                当前大类：<strong className="text-amber-400">{assetCategory}</strong>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {MACRO_SPECTRUM_CATEGORIES.map(cat => {
                const count = allAvailableAssets.filter(a => matchAssetToCategory(a, cat.id)).length;
                const active = assetCategory === cat.id;
                const isFxOrCrypto = cat.id.includes('外汇') || cat.id.includes('加密');
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setAssetCategory(cat.id);
                      setSubCategoryFilter('ALL');
                      const inCat = allAvailableAssets.filter(a => matchAssetToCategory(a, cat.id));
                      if (inCat.length > 0 && !inCat.some(a => a.symbol === selectedAssetSymbol)) {
                        setSelectedAssetSymbol(inCat[0].symbol);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                      active 
                        ? isFxOrCrypto
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-950/40'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-950/40' 
                        : 'bg-[#141d2d] border-[#1e2c44] text-slate-300 hover:border-[#2e4060] hover:text-white'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      active ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-[#1d293d] text-cyan-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 🎯 二级控制台：快捷下拉直达 ＋ 关键词搜索 ＋ 动态解析 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#111724] p-3 rounded-xl border border-[#1d273a] items-center">
            {/* 1. Categorized Select Dropdown */}
            <div className="md:col-span-5 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans shrink-0 hidden sm:inline">下拉直达:</span>
              <select
                value={selectedAssetSymbol}
                onChange={(e) => {
                  const targetSymbol = e.target.value;
                  setSelectedAssetSymbol(targetSymbol);
                  const found = allAvailableAssets.find(a => a.symbol === targetSymbol);
                  if (found) {
                    for (const cat of MACRO_SPECTRUM_CATEGORIES) {
                      if (cat.id !== '全部品种' && matchAssetToCategory(found, cat.id)) {
                        setAssetCategory(cat.id);
                        setSubCategoryFilter('ALL');
                        break;
                      }
                    }
                  }
                }}
                className="w-full bg-[#0d131f] border border-[#212c40] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
              >
                <optgroup label="💱 全球外汇 (G10直盘 / 交叉盘 / 亚洲新兴 / 美指)">
                  {allAvailableAssets.filter(a => matchAssetToCategory(a, '💱 全球外汇')).map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} - {a.assetName} (${liveTicks[a.symbol]?.price || a.currentPrice})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🪙 全球加密资产 (BTC / ETH / SOL / SUI / DeFi / AI)">
                  {allAvailableAssets.filter(a => matchAssetToCategory(a, '🪙 加密资产')).map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} - {a.assetName} (${liveTicks[a.symbol]?.price || a.currentPrice})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="📦 全球大宗商品全品类 (贵金属/能源/农产主粮/软商品/畜牧)">
                  {allAvailableAssets.filter(a => matchAssetToCategory(a, '📦 全球大宗商品')).map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} - {a.assetName} (${liveTicks[a.symbol]?.price || a.currentPrice})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="🌐 全球核心股指 (美股三大 / 德国DAX / 大马KLCI / 恒生)">
                  {allAvailableAssets.filter(a => matchAssetToCategory(a, '🌐 全球股指')).map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} - {a.assetName} (${liveTicks[a.symbol]?.price || a.currentPrice})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="📈 交易所期货主力 (BMD/CME/ICE/LME/SGX)">
                  {allAvailableAssets.filter(a => matchAssetToCategory(a, '📈 期货市场专区')).map(a => (
                    <option key={a.symbol} value={a.symbol}>
                      {a.symbol} - {a.assetName} (${liveTicks[a.symbol]?.price || a.currentPrice})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* 2. Search input */}
            <div className="md:col-span-7 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={macroSearch}
                  onChange={(e) => setMacroSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && macroSearch.trim()) {
                      handleCustomMacroResolve(macroSearch.trim());
                    }
                  }}
                  placeholder="搜索任意代码或名称（如 BTC, EURUSD, XAU, FCPO, 原油, 日元, 令吉, 铜, 标普）..."
                  className="w-full bg-[#0d131f] border border-[#212c40] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              {macroSearch.trim() && (
                <button
                  onClick={() => handleCustomMacroResolve(macroSearch.trim())}
                  className="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-1 shrink-0"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>全网解析</span>
                </button>
              )}
            </div>
          </div>

          {/* 🏷️ 二级子分类标签导航 (Sub-category Pills - 解决一次性列完所有品种混乱问题) */}
          {SUB_CATEGORIES_MAP[assetCategory] && (
            <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
              <span className="text-[11px] font-bold text-slate-400 font-sans flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>细分筛选:</span>
              </span>
              {SUB_CATEGORIES_MAP[assetCategory].map(sub => {
                const count = allAvailableAssets.filter(a => 
                  matchAssetToCategory(a, assetCategory) && matchAssetToSubCategory(a, assetCategory, sub.id)
                ).length;
                const active = subCategoryFilter === sub.id;
                return (
                  <button
                    key={sub.id}
                    onClick={() => setSubCategoryFilter(sub.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      active
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-sm'
                        : 'bg-[#121824] border-[#1e273a] text-slate-400 hover:text-slate-200 hover:border-[#2b3a54]'
                    }`}
                  >
                    <span>{sub.label}</span>
                    <span className="text-[10px] px-1 py-0.1 rounded bg-[#1c2638] text-slate-300 font-mono">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* If no matches found in current search query */}
          {filteredAssets.length === 0 && macroSearch.trim() && (
            <div className="p-4 bg-[#121929] rounded-xl border border-cyan-500/40 text-center space-y-2">
              <div className="text-xs text-slate-300 font-sans">
                未在当前预置列表中匹配到 "{macroSearch}"
              </div>
              <button
                onClick={() => handleCustomMacroResolve(macroSearch.trim())}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg shadow-md transition-all inline-flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>点击即刻对 "{macroSearch.toUpperCase()}" 启动宏观底层驱动拆解与三周期推导</span>
              </button>
            </div>
          )}

          {/* 🌟 核心呈现系统：坚决不一次性堆砌上百个按钮！ */}
          {/* 场景 A: 当用户停留在「全部品种」且未输入搜索时 ➔ 呈现「九大宏观品类精选速览矩阵」 */}
          {assetCategory === '全部品种' && !macroSearch.trim() && subCategoryFilter === 'ALL' && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-sans px-1">
                <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>九大宏观与大宗资产精选速览矩阵 (点击品种即刻穿透拆解，或点击分类进入深度筛选)：</span>
                </span>
                <span className="text-[11px] text-slate-500 hidden sm:inline">
                  告别无序罗列 · 层级化高效浏览
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {[
                  {
                    catId: '💱 全球外汇',
                    title: '💱 全球外汇市场',
                    desc: 'G10核心直盘 · 套息交叉盘 · 亚洲新兴汇率 · 美元指数',
                    featured: ['EURUSD', 'USDJPY', 'USDMYR', 'DXY'],
                    accent: 'border-cyan-500/40'
                  },
                  {
                    catId: '🪙 加密资产',
                    title: '🪙 全球加密货币',
                    desc: '数字黄金基准 · 高性能L1公链 · RWA现实资产 · 预言机',
                    featured: ['BTCUSD', 'ETHUSD', 'SOLUSD', 'SUIUSD'],
                    accent: 'border-blue-500/40'
                  },
                  {
                    catId: '🪙 贵金属与工业金属',
                    title: '🪙 贵金属与工业金属',
                    desc: '避险黄金白银 · 工业基石铜铝 · 战略新能源锂矿与铁矿',
                    featured: ['XAUUSD', 'XAGUSD', 'COPPER', 'LITHIUM'],
                    accent: 'border-amber-500/40'
                  },
                  {
                    catId: '⚡ 能源大宗',
                    title: '⚡ 能源大宗商品',
                    desc: 'WTI原油 · 布伦特 · 天然气 · 取暖油与核能铀矿',
                    featured: ['WTI', 'BRENT', 'NATGAS', 'URANIUM'],
                    accent: 'border-emerald-500/40'
                  },
                  {
                    catId: '🌾 农产品主粮',
                    title: '🌾 农产品主粮',
                    desc: 'CBOT大豆 · 玉米 · 小麦 · 豆粕与豆油压榨综合体',
                    featured: ['SOYBEAN', 'CORN', 'WHEAT', 'SOYOIL'],
                    accent: 'border-yellow-500/40'
                  },
                  {
                    catId: '☕ 软商品经济作物',
                    title: '☕ 软商品经济作物',
                    desc: '马来西亚棕榈油FCPO · 咖啡 · 可可 · 白糖 · 橡胶',
                    featured: ['FCPO', 'COFFEE', 'COCOA', 'SUGAR'],
                    accent: 'border-orange-500/40'
                  },
                  {
                    catId: '🥩 畜牧肉类',
                    title: '🥩 畜牧肉类商品',
                    desc: '活牛 · 饲牛 · 瘦肉猪 · 牛奶',
                    featured: ['LIVE_CATTLE', 'FEEDER_CATTLE', 'LEAN_HOGS', 'MILK'],
                    accent: 'border-rose-500/40'
                  },
                  {
                    catId: '📈 期货市场专区',
                    title: '📈 全球期货主力',
                    desc: 'BMD·CBOT·NYMEX·ICE·LME·SGX主力合约规格与基差',
                    featured: ['BMD_FCPO', 'CME_ZS', 'COMEX_GC', 'LME_CA'],
                    accent: 'border-purple-500/40'
                  },
                  {
                    catId: '🌐 全球股指',
                    title: '🌐 全球核心股指',
                    desc: '美股纳指100 · 标普500 · 德国DAX · 马来西亚KLCI',
                    featured: ['NAS100', 'SPX500', 'KLCI', 'GER40'],
                    accent: 'border-indigo-500/40'
                  }
                ].map(group => {
                  const groupAssets = allAvailableAssets.filter(a => matchAssetToCategory(a, group.catId));
                  return (
                    <div 
                      key={group.catId}
                      className={`bg-[#0f1524] border ${group.accent} rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-lg hover:border-cyan-400/80 transition-all`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-1.5 border-b border-[#1b2538]">
                          <span className="font-bold text-white text-xs flex items-center gap-1.5">
                            <span>{group.title}</span>
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#162134] text-cyan-300 font-mono">
                            共 {groupAssets.length} 品种
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 font-sans leading-relaxed line-clamp-1">
                          {group.desc}
                        </p>

                        {/* Featured Quick Chips */}
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {group.featured.map(sym => {
                            const asset = allAvailableAssets.find(a => a.symbol === sym);
                            if (!asset) return null;
                            const isSelected = selectedAssetSymbol === sym;
                            const tick = liveTicks[sym];
                            const price = tick ? tick.price : asset.currentPrice;

                            return (
                              <button
                                key={sym}
                                onClick={() => setSelectedAssetSymbol(sym)}
                                className={`p-2 rounded-lg text-left transition-all border ${
                                  isSelected 
                                    ? 'bg-[#18263e] border-cyan-400 text-white ring-1 ring-cyan-500/50 shadow-md' 
                                    : 'bg-[#131b2c] border-[#1f2c42] text-slate-300 hover:border-cyan-500/40 hover:bg-[#182338]'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-mono font-bold text-xs">{sym}</span>
                                  <span className={`text-[10px] font-bold ${
                                    asset.directionBias.includes('BULLISH') ? 'text-emerald-400' :
                                    asset.directionBias.includes('BEARISH') ? 'text-rose-400' : 'text-amber-400'
                                  }`}>
                                    {asset.directionBias.includes('BULLISH') ? '多' : asset.directionBias.includes('BEARISH') ? '空' : '震'}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400 font-sans truncate mt-0.5">
                                  {asset.assetName.split(' ')[0]}
                                </div>
                                <div className="text-white font-mono font-bold text-[11px] mt-1">
                                  ${price.toLocaleString()}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setAssetCategory(group.catId);
                          setSubCategoryFilter('ALL');
                          if (groupAssets.length > 0) {
                            setSelectedAssetSymbol(groupAssets[0].symbol);
                          }
                        }}
                        className="w-full py-1.5 px-3 bg-[#131d2f] hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold rounded-lg border border-[#1e2e48] hover:border-cyan-500/40 transition-all flex items-center justify-center gap-1.5 font-sans"
                      >
                        <span>切换至该大类查看全部 {groupAssets.length} 个标的</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 场景 B: 当用户点击了具体分类 (如外汇、加密、能源、或正在搜索/子分类筛选) ➔ 呈现规整的结构化品种卡片 */}
          {(assetCategory !== '全部品种' || macroSearch.trim() || subCategoryFilter !== 'ALL') && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-sans px-1">
                <span>
                  【{assetCategory}】当前显示: <strong className="text-cyan-300 font-mono">{filteredAssets.length}</strong> 个品种 (点击卡片即刻聚焦研究)
                </span>
                {assetCategory !== '全部品种' && (
                  <button
                    onClick={() => {
                      setAssetCategory('全部品种');
                      setSubCategoryFilter('ALL');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 underline text-xs"
                  >
                    返回全部品类总览
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {filteredAssets.map(asset => {
                  const active = asset.symbol === selectedAssetSymbol;
                  const tick = liveTicks[asset.symbol];
                  const price = tick ? tick.price : asset.currentPrice;

                  return (
                    <button
                      key={asset.symbol}
                      onClick={() => setSelectedAssetSymbol(asset.symbol)}
                      className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between space-y-2 ${
                        active 
                          ? 'bg-[#16253c] border-cyan-400 text-white shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-500/50' 
                          : 'bg-[#111827] border-[#1d273a] text-slate-300 hover:border-[#2b3a54] hover:bg-[#152033]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-sm text-white">{asset.symbol}</span>
                            {active && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 font-sans truncate max-w-[150px] mt-0.5">
                            {asset.assetName}
                          </div>
                        </div>

                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-sans shrink-0 ${
                          asset.directionBias.includes('BULLISH') ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          asset.directionBias.includes('BEARISH') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {asset.directionBias.includes('BULLISH') ? '做多' : asset.directionBias.includes('BEARISH') ? '做空' : '震荡'}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-[#182336] flex items-center justify-between">
                        <div className="font-mono text-sm font-bold text-white">
                          ${price.toLocaleString()}
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#172234] text-cyan-300 font-sans">
                          {asset.subCategory ? asset.subCategory.split('与')[0].slice(0, 8) : asset.category}
                        </span>
                      </div>

                      <div className="text-[10px] text-slate-400 font-sans line-clamp-1 leading-relaxed">
                        {asset.keyCatalysts[0] || asset.coreDriverThesis}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>


        {/* Selected Asset Core Thesis Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Column: Thesis & Stance */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#131b2b] p-4 rounded-xl border border-[#1e2a42]">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#1c293f] text-cyan-300 font-mono font-semibold">
                    {selectedAsset.category}
                  </span>
                  <span>/</span>
                  <span className="text-slate-300 truncate max-w-[200px]">
                    {selectedAsset.subCategory || '宏观核心'}
                  </span>
                  <span>/</span>
                  <span className="font-mono text-white font-bold">{selectedAsset.symbol}</span>
                </div>
                <div className="text-lg font-bold text-white font-mono flex items-center gap-2 mt-0.5">
                  <span>{selectedAsset.assetName}</span>
                  <span className="text-cyan-400 font-extrabold">${liveAssetPrice.toLocaleString()}</span>
                  {liveAssetTick && (
                    <span className={`text-xs ${liveAssetTick.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      ({liveAssetTick.changePercent >= 0 ? '+' : ''}{liveAssetTick.changePercent}%)
                    </span>
                  )}
                  <span className="text-[11px] font-sans font-normal px-2 py-0.5 rounded bg-blue-950/60 border border-blue-500/30 text-blue-300">
                    确信度: {selectedAsset.biasConfidence}%
                  </span>
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

            {/* 🌾 全生命周期深度推导模型 (Full Lifecycle 4-Stage & Inventory Quadrant Derivation) */}
            {selectedAsset.lifecycleDerivation && (
              <div className="bg-[#0c121e] border-2 border-emerald-500/40 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1c273c] pb-3.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-extrabold text-sm sm:text-base flex items-center gap-2">
                        <span>🌾 全生命周期推导模型 (Full Lifecycle Derivation)</span>
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                        {selectedAsset.lifecycleDerivation.lifecycleStage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      穿透大宗商品第一性原理：供给产能生命周期 ➔ 四阶段库存周期象限 ➔ 现金完全成本底线与政策护城河
                    </p>
                  </div>

                  {selectedAsset.futuresContractSpecs && (
                    <span className="text-[11px] px-2.5 py-1 rounded-lg bg-[#141d2d] text-cyan-300 border border-cyan-500/30 font-mono">
                      交易所: {selectedAsset.futuresContractSpecs.exchange.split(' ')[0]}
                    </span>
                  )}
                </div>

                {/* 4-Quadrant Inventory Cycle Indicator */}
                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Activity className="w-4 h-4" />
                      <span>四阶段库存周期象限判定 (4-Stage Inventory Quadrant Status)</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      当前定位：<strong className="text-emerald-400">{selectedAsset.lifecycleDerivation.inventoryCyclePhase}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {[
                      { name: '被动去库存', label: '需求复苏·暴击做多点', active: selectedAsset.lifecycleDerivation.inventoryCyclePhase.includes('被动去库存'), desc: '需求回暖库存快速去化，价格进入主升前夕' },
                      { name: '主动补库存', label: '景气扩张·主升浪加码', active: selectedAsset.lifecycleDerivation.inventoryCyclePhase.includes('主动补库存'), desc: '企业乐观抢购补库，价格处于大牛市主升浪' },
                      { name: '被动补库存', label: '需求见顶·高位滞销警惕', active: selectedAsset.lifecycleDerivation.inventoryCyclePhase.includes('被动补库存'), desc: '终端需求转弱产品积压，警惕高位见顶' },
                      { name: '主动去库存', label: '价格坍塌·甩卖出清寻底', active: selectedAsset.lifecycleDerivation.inventoryCyclePhase.includes('主动去库存'), desc: '行业亏损大降价降库存，磨底左侧出清' }
                    ].map((quad, idx) => (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-xl border transition-all ${
                          quad.active 
                            ? 'bg-[#152338] border-cyan-400 ring-2 ring-cyan-500/40 shadow-lg text-white' 
                            : 'bg-[#0f1624] border-[#1b263b] text-slate-400 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-extrabold ${quad.active ? 'text-cyan-300' : ''}`}>{quad.name}</span>
                          {quad.active && (
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[10px] text-slate-300 mt-1 font-semibold">{quad.label}</div>
                        <div className="text-[10px] text-slate-400 mt-1 font-sans">{quad.desc}</div>
                      </div>
                    ))}
                  </div>

                  {/* Inventory Detailed Description */}
                  <div className="p-3 bg-[#111929] rounded-xl border border-[#1d2a40] text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="text-cyan-300">【库存周期实战拆解】：</strong>{selectedAsset.lifecycleDerivation.inventoryCycleDescription}
                  </div>
                </div>

                {/* Supply & Demand Deep Pillars (Two Columns) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {/* Left: Supply & Demand Drivers */}
                  <div className="p-3.5 bg-[#111827] rounded-xl border border-[#1d283c] space-y-2.5">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>产能瓶颈与下游超级需求引擎</span>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-[#0e1422] rounded-lg border border-[#1b2438]">
                        <div className="text-[11px] font-bold text-slate-400 mb-0.5">供给与物理扩产瓶颈：</div>
                        <div className="text-slate-200 leading-relaxed font-sans">{selectedAsset.lifecycleDerivation.supplyBottleneck}</div>
                      </div>

                      <div className="p-2.5 bg-[#0e1422] rounded-lg border border-[#1b2438]">
                        <div className="text-[11px] font-bold text-slate-400 mb-0.5">下游需求转型与超级周期驱动：</div>
                        <div className="text-slate-200 leading-relaxed font-sans">{selectedAsset.lifecycleDerivation.demandTransformation}</div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Cost Floor, Ceiling & Policy Moat */}
                  <div className="p-3.5 bg-[#111827] rounded-xl border border-[#1d283c] space-y-2.5">
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5" />
                      <span>生产成本边界与政策护城河</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-[#0e1422] rounded-lg border border-[#1b2438] flex flex-col justify-between">
                        <div className="text-[11px] font-bold text-emerald-400 mb-0.5">现金完全生产成本底线 (绝对估值底)：</div>
                        <div className="text-white font-mono font-bold text-xs">{selectedAsset.lifecycleDerivation.costFloorAndCeiling.cashCostFloor}</div>
                      </div>

                      <div className="p-2.5 bg-[#0e1422] rounded-lg border border-[#1b2438] flex flex-col justify-between">
                        <div className="text-[11px] font-bold text-rose-400 mb-0.5">暴利与替代品压制天花板：</div>
                        <div className="text-slate-300 font-mono text-xs">{selectedAsset.lifecycleDerivation.costFloorAndCeiling.profitMarginCeiling}</div>
                      </div>

                      <div className="p-2.5 bg-[#0e1422] rounded-lg border border-[#1b2438]">
                        <div className="text-[11px] font-bold text-cyan-400 mb-0.5">国际地缘与行业政策护城河：</div>
                        <div className="text-slate-300 text-[11px] leading-relaxed font-sans">{selectedAsset.lifecycleDerivation.policyAndGeopoliticalMoat}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Futures Contract Specifications (if available) */}
                {selectedAsset.futuresContractSpecs && (
                  <div className="p-3.5 bg-[#0d1422] rounded-xl border border-cyan-500/25 space-y-2.5">
                    <div className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>全球期货衍生品交易所合约规格与现货基差 (Exchange Contract Specs)</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/40 font-mono">
                        {selectedAsset.futuresContractSpecs.settlementType}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-mono">
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">交易所</div>
                        <div className="text-white font-bold truncate mt-0.5">{selectedAsset.futuresContractSpecs.exchange.split(' ')[0]}</div>
                      </div>
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">合约规模</div>
                        <div className="text-cyan-300 font-bold truncate mt-0.5">{selectedAsset.futuresContractSpecs.contractSize}</div>
                      </div>
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">最小波动点</div>
                        <div className="text-white font-bold truncate mt-0.5">{selectedAsset.futuresContractSpecs.tickSize}</div>
                      </div>
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">初始保证金</div>
                        <div className="text-emerald-400 font-bold truncate mt-0.5">{selectedAsset.futuresContractSpecs.marginRequirement}</div>
                      </div>
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">现货基差结构</div>
                        <div className="text-amber-300 font-bold truncate mt-0.5">{selectedAsset.futuresContractSpecs.basisStatus || '现货平水'}</div>
                      </div>
                      <div className="p-2 bg-[#121a2a] rounded-lg border border-[#1c2940]">
                        <div className="text-[10px] text-slate-400 font-sans">交易时段</div>
                        <div className="text-slate-300 text-[10px] truncate mt-0.5">{selectedAsset.futuresContractSpecs.tradingHours}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 🎯 Multi-Horizon Macro Analysis (短期 · 中长期 · 长期 宏观推导全景) */}
            {selectedAsset.horizonAnalyses && (
              <div className="bg-[#0e1526] p-4 sm:p-5 rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1b273d] pb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                      <span>宏观多时间跨度分析：短期 vs 中长期 vs 长期</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/40 font-mono">
                        {selectedAsset.symbol} 跨周期推导
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 bg-[#131b29] p-1 rounded-lg border border-[#1f2a40] text-xs">
                    <button
                      onClick={() => setHorizonTab('all')}
                      className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                        horizonTab === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      三周期对比
                    </button>
                    <button
                      onClick={() => setHorizonTab('short')}
                      className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                        horizonTab === 'short' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      ⚡ 短期 (1~4周)
                    </button>
                    <button
                      onClick={() => setHorizonTab('medium')}
                      className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                        horizonTab === 'medium' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🌊 中长期 (1~6月)
                    </button>
                    <button
                      onClick={() => setHorizonTab('long')}
                      className={`px-2.5 py-1 rounded-md transition-all font-semibold ${
                        horizonTab === 'long' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      🏛️ 长期 (6月~3年+)
                    </button>
                  </div>
                </div>

                <div className={`grid gap-3.5 ${
                  horizonTab === 'all' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
                }`}>
                  
                  {/* Card 1: ⚡ 短期分析 (1~4周) */}
                  {(horizonTab === 'all' || horizonTab === 'short') && selectedAsset.horizonAnalyses.shortTerm && (
                    <div className="bg-[#121929] border border-[#202c42] rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
                            <span>⚡ 短期视角 (1~4周)</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-sans ${
                            selectedAsset.horizonAnalyses.shortTerm.bias.includes('多') ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                            selectedAsset.horizonAnalyses.shortTerm.bias.includes('空') ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}>
                            {selectedAsset.horizonAnalyses.shortTerm.bias}
                          </span>
                        </div>

                        <div className="font-mono text-xs text-slate-300 bg-[#0d1320] p-2 rounded-lg border border-[#1b2538] flex items-center justify-between">
                          <span className="text-slate-400 font-sans">短线预判波动区间:</span>
                          <span className="text-white font-bold">{selectedAsset.horizonAnalyses.shortTerm.targetRange}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                          {selectedAsset.horizonAnalyses.shortTerm.coreLogic}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#1b263b] text-xs font-sans">
                        <div className="text-[11px] text-slate-400">
                          <strong className="text-cyan-400">短线核心触发点：</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                            {selectedAsset.horizonAnalyses.shortTerm.keyTriggers.map((t, idx) => (
                              <li key={idx} className="truncate">{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-2.5 bg-cyan-950/30 border border-cyan-500/20 rounded-lg text-[11px] text-cyan-200 leading-relaxed">
                          <strong>实战战术：</strong>{selectedAsset.horizonAnalyses.shortTerm.actionTactics}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 2: 🌊 中长期分析 (1~6个月) */}
                  {(horizonTab === 'all' || horizonTab === 'medium') && selectedAsset.horizonAnalyses.mediumTerm && (
                    <div className="bg-[#121929] border border-[#202c42] rounded-xl p-4 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-blue-300 flex items-center gap-1.5">
                            <span>🌊 中长期视角 (1~6个月)</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-sans ${
                            selectedAsset.horizonAnalyses.mediumTerm.bias.includes('多') ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                            selectedAsset.horizonAnalyses.mediumTerm.bias.includes('空') ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}>
                            {selectedAsset.horizonAnalyses.mediumTerm.bias}
                          </span>
                        </div>

                        <div className="font-mono text-xs text-slate-300 bg-[#0d1320] p-2 rounded-lg border border-[#1b2538] flex items-center justify-between">
                          <span className="text-slate-400 font-sans">季度趋势目标区间:</span>
                          <span className="text-white font-bold">{selectedAsset.horizonAnalyses.mediumTerm.targetRange}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                          {selectedAsset.horizonAnalyses.mediumTerm.coreLogic}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#1b263b] text-xs font-sans">
                        <div className="text-[11px] text-slate-400">
                          <strong className="text-blue-400">季度宏观催化剂：</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                            {selectedAsset.horizonAnalyses.mediumTerm.keyTriggers.map((t, idx) => (
                              <li key={idx} className="truncate">{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-2.5 bg-blue-950/30 border border-blue-500/20 rounded-lg text-[11px] text-blue-200 leading-relaxed">
                          <strong>波段布局：</strong>{selectedAsset.horizonAnalyses.mediumTerm.actionTactics}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 3: 🏛️ 长期战略分析 (6个月~3年以上) */}
                  {(horizonTab === 'all' || horizonTab === 'long') && selectedAsset.horizonAnalyses.longTerm && (
                    <div className="bg-[#121929] border border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-md">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                            <span>🏛️ 长期战略视角 (6月~3年+)</span>
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-sans ${
                            selectedAsset.horizonAnalyses.longTerm.bias.includes('多') ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            selectedAsset.horizonAnalyses.longTerm.bias.includes('空') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {selectedAsset.horizonAnalyses.longTerm.bias}
                          </span>
                        </div>

                        <div className="font-mono text-xs text-slate-300 bg-[#0d1320] p-2 rounded-lg border border-[#1b2538] flex items-center justify-between">
                          <span className="text-slate-400 font-sans">长期超级周期身价:</span>
                          <span className="text-emerald-400 font-bold">{selectedAsset.horizonAnalyses.longTerm.targetRange}</span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                          {selectedAsset.horizonAnalyses.longTerm.coreLogic}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[#1b263b] text-xs font-sans">
                        <div className="text-[11px] text-slate-400">
                          <strong className="text-emerald-400">宏观底层大支柱：</strong>
                          <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-300">
                            {selectedAsset.horizonAnalyses.longTerm.keyTriggers.map((t, idx) => (
                              <li key={idx} className="truncate">{t}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-[11px] text-emerald-200 leading-relaxed">
                          <strong>财富配置：</strong>{selectedAsset.horizonAnalyses.longTerm.actionTactics}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

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

      {/* 📖 全球宏观资产全景速查弹窗 (Global Macro Universe Directory Modal) */}
      {isMacroDirectoryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fadeIn">
          <div className="bg-[#0f172a] border border-[#233554] rounded-2xl w-full max-w-4xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="p-4 md:p-5 border-b border-[#1e293b] flex items-center justify-between bg-[#111c30]">
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>全球全谱系宏观资产目录</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">
                      收录 {allAvailableAssets.length} 核心标的
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-sans">
                    涵盖外汇 (G10/交叉/令吉)、加密货币、大宗商品（贵金属/能源/农产/软商/畜牧）、交易所期货主力及全球股指
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMacroDirectoryOpen(false)}
                className="p-1.5 rounded-lg bg-[#1a263d] hover:bg-[#253654] text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Table / List */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {allAvailableAssets.map(asset => {
                  const tick = liveTicks[asset.symbol];
                  const price = tick ? tick.price : asset.currentPrice;
                  const isSelected = asset.symbol === selectedAssetSymbol;

                  return (
                    <button
                      key={asset.symbol}
                      onClick={() => {
                        setSelectedAssetSymbol(asset.symbol);
                        for (const cat of MACRO_SPECTRUM_CATEGORIES) {
                          if (cat.id !== '全部品种' && matchAssetToCategory(asset, cat.id)) {
                            setAssetCategory(cat.id);
                            setSubCategoryFilter('ALL');
                            break;
                          }
                        }
                        setIsMacroDirectoryOpen(false);
                      }}
                      className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-[#18263f] border-cyan-400 text-white ring-2 ring-cyan-500/50 shadow-lg' 
                          : 'bg-[#131d2e] border-[#1e2d44] text-slate-300 hover:bg-[#1a2840] hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-white">{asset.symbol}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-bold ${
                          asset.directionBias.includes('BULLISH') ? 'bg-emerald-500/20 text-emerald-400' :
                          asset.directionBias.includes('BEARISH') ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {asset.directionBias.includes('BULLISH') ? '看多' : asset.directionBias.includes('BEARISH') ? '看空' : '震荡'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 font-sans truncate mt-1">
                        {asset.assetName}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#1e2c42] text-xs">
                        <span className="text-[10px] text-cyan-300 px-1 rounded bg-[#172438]">
                          {asset.category}
                        </span>
                        <span className="font-mono font-bold text-white">
                          ${price.toLocaleString()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#111827] border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400">
              <span>点击任意资产卡片即刻聚焦并展开宏观底层驱动</span>
              <button
                onClick={() => setIsMacroDirectoryOpen(false)}
                className="px-4 py-1.5 bg-[#1e293b] hover:bg-[#283850] text-white rounded-lg transition-colors font-semibold"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

