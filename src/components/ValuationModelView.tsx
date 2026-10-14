import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  Table, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers, 
  SlidersHorizontal, 
  PieChart, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  ArrowUpRight,
  Info,
  Flame,
  FileSpreadsheet,
  Target,
  Search,
  Zap,
  Link2,
  ExternalLink,
  ArrowRight,
  Globe
} from 'lucide-react';
import { 
  ValuationModelType, 
  DCFModelInputs, 
  DDMModelInputs, 
  CCAModelInputs, 
  RIMModelInputs,
  PeerCompanyComp
} from '../types/valuation';
import { StockResearchProfile } from '../types/equity';
import { INITIAL_STOCKS } from '../data/seedEquities';
import { PRESET_VALUATION_COMPANIES } from '../data/presetValuationModels';
import { convertStockProfileToValuationCompany } from '../services/cfaStockLinker';
import { 
  calculateDCF, 
  calculateDDM, 
  calculateCCA, 
  calculateRIM, 
  buildFootballFieldItems,
  getCFARatingLabel 
} from '../services/cfaValuationEngine';

interface ValuationModelViewProps {
  onLogTradeFromValuation?: (prefill: { symbol: string; type: 'BUY' | 'SELL'; setup: string; notes: string; closePrice?: number }) => void;
  linkedStock?: StockResearchProfile | null;
  onNavigateToEquity?: (ticker: string) => void;
}

export const ValuationModelView: React.FC<ValuationModelViewProps> = ({ 
  onLogTradeFromValuation,
  linkedStock,
  onNavigateToEquity
}) => {
  // Preset or linked company selection
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(() => linkedStock?.ticker || 'AAPL');
  const [linkedEquityStock, setLinkedEquityStock] = useState<StockResearchProfile | null>(() => {
    if (linkedStock) return linkedStock;
    return INITIAL_STOCKS.find(s => s.ticker === 'AAPL') || null;
  });

  // Modal / selector for picking any stock from equity database
  const [isStockDirectoryModalOpen, setIsStockDirectoryModalOpen] = useState(false);
  const [stockDirectorySearch, setStockDirectorySearch] = useState('');
  
  // Active valuation methodology tab
  const [activeModelTab, setActiveModelTab] = useState<ValuationModelType>('DCF_FCFF');
  
  // Custom or loaded state for DCF
  const [dcfInputs, setDcfInputs] = useState<DCFModelInputs>(() => {
    if (linkedStock) {
      const converted = convertStockProfileToValuationCompany(linkedStock);
      return converted.dcfInputs;
    }
    return PRESET_VALUATION_COMPANIES[0].dcfInputs;
  });

  // Custom or loaded state for DDM
  const [ddmInputs, setDdmInputs] = useState<DDMModelInputs>(() => {
    if (linkedStock) {
      const converted = convertStockProfileToValuationCompany(linkedStock);
      return converted.ddmInputs;
    }
    return PRESET_VALUATION_COMPANIES[0].ddmInputs;
  });

  // Custom or loaded state for CCA
  const [ccaInputs, setCcaInputs] = useState<CCAModelInputs>(() => {
    if (linkedStock) {
      const converted = convertStockProfileToValuationCompany(linkedStock);
      return converted.ccaInputs;
    }
    return PRESET_VALUATION_COMPANIES[0].ccaInputs;
  });

  // Custom or loaded state for RIM
  const [rimInputs, setRimInputs] = useState<RIMModelInputs>(() => {
    if (linkedStock) {
      const converted = convertStockProfileToValuationCompany(linkedStock);
      return converted.rimInputs;
    }
    return PRESET_VALUATION_COMPANIES[0].rimInputs;
  });

  // Automatically update inputs when a linkedStock is sent from EquityResearchView
  useEffect(() => {
    if (linkedStock) {
      const converted = convertStockProfileToValuationCompany(linkedStock);
      setSelectedCompanyId(converted.id);
      setLinkedEquityStock(linkedStock);
      setDcfInputs(converted.dcfInputs);
      setDdmInputs(converted.ddmInputs);
      setCcaInputs(converted.ccaInputs);
      setRimInputs(converted.rimInputs);
    }
  }, [linkedStock]);

  // Copy success indicator
  const [copySuccess, setCopySuccess] = useState(false);

  // Switch preset
  const handleSelectPreset = (companyId: string) => {
    setSelectedCompanyId(companyId);
    const preset = PRESET_VALUATION_COMPANIES.find(p => p.id === companyId);
    if (preset) {
      setDcfInputs(JSON.parse(JSON.stringify(preset.dcfInputs)));
      setDdmInputs(JSON.parse(JSON.stringify(preset.ddmInputs)));
      setCcaInputs(JSON.parse(JSON.stringify(preset.ccaInputs)));
      setRimInputs(JSON.parse(JSON.stringify(preset.rimInputs)));
      const matchingEquity = INITIAL_STOCKS.find(s => s.ticker.toUpperCase() === preset.ticker.toUpperCase());
      setLinkedEquityStock(matchingEquity || null);
    }
  };

  // Directly select any stock from Equity research database
  const handleSelectStockFromDirectory = (stock: StockResearchProfile) => {
    const converted = convertStockProfileToValuationCompany(stock);
    setSelectedCompanyId(stock.ticker);
    setLinkedEquityStock(stock);
    setDcfInputs(converted.dcfInputs);
    setDdmInputs(converted.ddmInputs);
    setCcaInputs(converted.ccaInputs);
    setRimInputs(converted.rimInputs);
    setIsStockDirectoryModalOpen(false);
  };

  // Reset inputs back to stock's actual financials
  const handleResetToStockFinancials = () => {
    if (linkedEquityStock) {
      const converted = convertStockProfileToValuationCompany(linkedEquityStock);
      setDcfInputs(converted.dcfInputs);
      setDdmInputs(converted.ddmInputs);
      setCcaInputs(converted.ccaInputs);
      setRimInputs(converted.rimInputs);
    }
  };

  // Helper for DCF inputs update
  const updateDcfField = <K extends keyof DCFModelInputs>(field: K, value: DCFModelInputs[K]) => {
    setDcfInputs(prev => ({ ...prev, [field]: value }));
  };

  const updateGrowthRate = (index: number, val: number) => {
    setDcfInputs(prev => {
      const copy = [...prev.revenueGrowthRates];
      copy[index] = val;
      return { ...prev, revenueGrowthRates: copy };
    });
  };

  const updateEbitMargin = (index: number, val: number) => {
    setDcfInputs(prev => {
      const copy = [...prev.ebitMargins];
      copy[index] = val;
      return { ...prev, ebitMargins: copy };
    });
  };

  // Automated Calculations
  const dcfResults = useMemo(() => calculateDCF(dcfInputs), [dcfInputs]);
  const ddmResults = useMemo(() => calculateDDM(ddmInputs), [ddmInputs]);
  const ccaResults = useMemo(() => calculateCCA(ccaInputs), [ccaInputs]);
  const rimResults = useMemo(() => calculateRIM(rimInputs), [rimInputs]);

  // Football Field Items
  const footballFieldItems = useMemo(() => {
    return buildFootballFieldItems(dcfResults, ddmResults, ccaResults, rimResults, dcfInputs.currentSharePrice);
  }, [dcfResults, ddmResults, ccaResults, rimResults, dcfInputs.currentSharePrice]);

  // Comprehensive Blended Intrinsic Target
  const blendedTargetPrice = useMemo(() => {
    const totalWeight = footballFieldItems.reduce((acc, item) => acc + item.weight, 0);
    const weightedSum = footballFieldItems.reduce((acc, item) => acc + item.basePrice * item.weight, 0);
    return totalWeight > 0 ? +(weightedSum / totalWeight).toFixed(2) : dcfResults.intrinsicValuePerShare;
  }, [footballFieldItems, dcfResults.intrinsicValuePerShare]);

  const activeRatingInfo = useMemo(() => {
    return getCFARatingLabel(dcfResults.cfaRating);
  }, [dcfResults.cfaRating]);

  // Export report summary to clipboard
  const handleCopySummary = () => {
    const summary = `【CFA 估值模型分析简报 - ${dcfInputs.companyName} (${dcfInputs.ticker})】
- 当前市场价格: ${dcfInputs.currency} ${dcfInputs.currentSharePrice.toFixed(2)}
- FCFF 内在公允价值: ${dcfInputs.currency} ${dcfResults.intrinsicValuePerShare.toFixed(2)}
- 空间折现溢价率: ${dcfResults.upsideDownsidePercent > 0 ? '+' : ''}${dcfResults.upsideDownsidePercent}%
- 投资评级建议: ${activeRatingInfo.label}
- 20% 安全边际建议买点: ${dcfInputs.currency} ${dcfResults.marginOfSafetyPrice.toFixed(2)}
- 综合加权目标价 (足球场汇总): ${dcfInputs.currency} ${blendedTargetPrice.toFixed(2)}
- WACC 资本成本: ${dcfResults.wacc}% (股权成本 Ke: ${dcfResults.costOfEquity}%, 债务税后成本: ${dcfResults.afterTaxCostOfDebt}%)
- 预测期现金流总现值: ${dcfResults.cumulativePvFcff} 百万, 终值现值: ${dcfResults.pvTerminalValueGordon} 百万
- 企业价值 (EV): ${dcfResults.enterpriseValue} 百万, 净负债扣减: ${dcfResults.netDebt} 百万
生成于 CFA 估值工作台 (无需手动编写 Excel 模板)`;

    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto text-slate-100">
      
      {/* 1. Top Hero & Preset Selector Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#0a0f1d] border border-[#1e293b] p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                CFA 分析师估值模型中心 (Valuation Model Suite)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                无需手动编写 Excel 公式
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>专业级估值模型模板与全自动化计算工作台</span>
            </h1>

            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              严格遵循 CFA Level 2 股票估值标准。您只需在左侧参数栏填入目标公司的财务指标（营收增速、利润率、WACC各参数与负债情况），系统自动推导 5 年预测表、折现自由现金流、终值与敏感性矩阵，直接输出内在公允价值与评级建议。
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all shadow-md"
            >
              {copySuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              {copySuccess ? '已复制分析简报' : '复制投研简报'}
            </button>

            {onLogTradeFromValuation && (
              <button
                onClick={() => {
                  onLogTradeFromValuation({
                    symbol: dcfInputs.ticker,
                    type: dcfResults.upsideDownsidePercent > 0 ? 'BUY' : 'SELL',
                    setup: `CFA 估值驱动 (${dcfResults.cfaRating})`,
                    notes: `根据 CFA ${activeModelTab} 估值模型测算：当前现价 ${dcfInputs.currency} ${dcfInputs.currentSharePrice}，内在公允价值 ${dcfInputs.currency} ${dcfResults.intrinsicValuePerShare}，预期空间 ${dcfResults.upsideDownsidePercent}%。安全边际买点: ${dcfResults.marginOfSafetyPrice}。`,
                    closePrice: dcfInputs.currentSharePrice
                  });
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                以此估值一键记账
              </button>
            )}
          </div>
        </div>

        {/* Company Template Preset Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">载入名企案例模板 / 自定义公司:</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {PRESET_VALUATION_COMPANIES.map(company => (
              <button
                key={company.id}
                onClick={() => handleSelectPreset(company.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCompanyId === company.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {company.name}
              </button>
            ))}

            <button
              onClick={() => setIsStockDirectoryModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 hover:text-amber-100 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/40 flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>从个股研报库挑选标的导入 (共 {INITIAL_STOCKS.length} 只)...</span>
            </button>
          </div>
        </div>

        {/* 🔗 Bidirectional Equity Link Status Bar */}
        {linkedEquityStock && (
          <div className="mt-4 p-3.5 bg-gradient-to-r from-cyan-950/40 via-[#0e1b2e] to-blue-950/40 border border-cyan-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Link2 className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-extrabold text-white text-xs sm:text-sm">已与个股研报双向联动：</span>
                  <span className="font-mono font-black text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40">
                    {linkedEquityStock.ticker}
                  </span>
                  <span className="font-bold text-slate-200">
                    {linkedEquityStock.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {linkedEquityStock.region} · {linkedEquityStock.sector}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap items-center gap-3 font-mono">
                  <span>实时现价: <strong className="text-white">{linkedEquityStock.currency} ${linkedEquityStock.currentPrice}</strong></span>
                  <span>研报公允目标价: <strong className="text-emerald-400">${linkedEquityStock.investmentTargets.fairValuePrice}</strong></span>
                  <span>商业壁垒: <strong className="text-amber-300">{linkedEquityStock.moatRating.split(' ')[0]}</strong></span>
                  <span className="text-cyan-300 font-sans">✓ 已自动提取历史营收、EBITDA率、WACC与净负债</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleResetToStockFinancials}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="放弃手工微调的预测数据，重新还原为此股票在财报中的真实历史指标"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>重置参数</span>
              </button>

              {onNavigateToEquity && (
                <button
                  onClick={() => onNavigateToEquity(linkedEquityStock.ticker)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-950/50 transition-all hover:scale-105"
                >
                  <span>查看该股深度研报与三大报表</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 2. Model Methodology Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-[#0c121e] border border-[#1e293b] rounded-2xl">
        {[
          { id: 'DCF_FCFF' as ValuationModelType, label: '1. FCFF 自由现金流折现 (黄金标准)', icon: Calculator, badge: '核心主力' },
          { id: 'DDM' as ValuationModelType, label: '2. 股利折现模型 (DDM / H-Model)', icon: DollarSign, badge: '高股息/银行' },
          { id: 'CCA_MULTIPLES' as ValuationModelType, label: '3. 可比公司乘数相对估值 (Comps)', icon: Table, badge: '投行常用' },
          { id: 'RESIDUAL_INCOME' as ValuationModelType, label: '4. 超额收益模型 (RIM / EVA)', icon: Layers, badge: 'CFA Level 2' },
          { id: 'FOOTBALL_FIELD' as ValuationModelType, label: '5. 综合估值足球场图 (Football Field)', icon: Target, badge: '多模型汇总' },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeModelTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveModelTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                isActive ? 'bg-white/20 text-white font-mono' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Valuation Results Hero Banner (Key Intrinsic Value Outputs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Intrinsic Fair Value vs Current Price */}
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
            <span>每股内在公允价值 (Intrinsic Value)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
              {activeModelTab}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">
            {dcfInputs.currency} {dcfResults.intrinsicValuePerShare.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
            <span>当前现价:</span>
            <span className="font-mono text-white font-bold">
              {dcfInputs.currency} {dcfInputs.currentSharePrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Metric 2: Upside / Downside Potential */}
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 mb-1">
            估值空间 / 安全溢价 (Upside / Margin)
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight flex items-center gap-2 ${
            dcfResults.upsideDownsidePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {dcfResults.upsideDownsidePercent >= 0 ? (
              <TrendingUp className="w-6 h-6" />
            ) : (
              <TrendingDown className="w-6 h-6" />
            )}
            <span>{dcfResults.upsideDownsidePercent >= 0 ? '+' : ''}{dcfResults.upsideDownsidePercent}%</span>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            {dcfResults.upsideDownsidePercent >= 0 ? '标的当前处于内在价值折价安全区' : '标的当前估值高于模型公允价值'}
          </div>
        </div>

        {/* Metric 3: CFA Investment Rating */}
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 mb-1">
            CFA 投资评级建议 (CFA Rating)
          </div>
          <div className="text-lg sm:text-xl font-black tracking-tight mt-1">
            <span className={`inline-block px-3 py-1 rounded-xl border text-sm font-bold ${activeRatingInfo.badge}`}>
              {activeRatingInfo.label}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400 line-clamp-1">
            {activeRatingInfo.desc}
          </p>
        </div>

        {/* Metric 4: 20% Margin of Safety Price */}
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center justify-between">
            <span>20% 安全边际防守买点</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
            {dcfInputs.currency} {dcfResults.marginOfSafetyPrice.toFixed(2)}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            格雷厄姆价值投资法则：公允价 8 折买入
          </div>
        </div>
      </div>

      {/* 4. Tab 1: DCF - FCFF Model Workspace */}
      {activeModelTab === 'DCF_FCFF' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Manual Financial Parameter Inputs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Box 1: Core Company & Stock Parameters */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                  标的公司基本参数 (手动录入)
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">单位: 百万 / {dcfInputs.currency}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">公司简称</label>
                  <input
                    type="text"
                    value={dcfInputs.companyName}
                    onChange={(e) => updateDcfField('companyName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">交易代码 (Ticker)</label>
                  <input
                    type="text"
                    value={dcfInputs.ticker}
                    onChange={(e) => updateDcfField('ticker', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">当前股票市价 ({dcfInputs.currency})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dcfInputs.currentSharePrice}
                    onChange={(e) => updateDcfField('currentSharePrice', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-medium block mb-1">稀释后总股本 (百万股)</label>
                  <input
                    type="number"
                    value={dcfInputs.dilutedShares}
                    onChange={(e) => updateDcfField('dilutedShares', parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-slate-400 font-medium block mb-1">基期最新年度营业总收入 (Base Revenue, 百万)</label>
                  <input
                    type="number"
                    value={dcfInputs.baseRevenue}
                    onChange={(e) => updateDcfField('baseRevenue', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Box 2: 5-Year Pro-Forma Forecast Inputs */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  预测期假设 (未来 5 年营收增速与 EBIT 率)
                </h3>
                <span className="text-[11px] text-slate-400">逐年输入</span>
              </div>

              {/* 5-Year Revenue Growth % */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  营收同比增速预测 (Revenue Growth %):
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {dcfInputs.revenueGrowthRates.map((g, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-[10px] text-slate-500 block mb-1 font-mono">Y+{idx + 1}</span>
                      <input
                        type="number"
                        step="0.1"
                        value={g}
                        onChange={(e) => updateGrowthRate(idx, parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white text-center font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 5-Year EBIT Margins % */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  营业利润率预测 (EBIT Margin %):
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {dcfInputs.ebitMargins.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <span className="text-[10px] text-slate-500 block mb-1 font-mono">Y+{idx + 1}</span>
                      <input
                        type="number"
                        step="0.1"
                        value={m}
                        onChange={(e) => updateEbitMargin(idx, parseFloat(e.target.value) || 0)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white text-center font-mono focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost and Tax Rates */}
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <label className="text-slate-400 font-medium block mb-1">有效企业所得税率 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.taxRate}
                    onChange={(e) => updateDcfField('taxRate', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">折旧摊销 D&A 占营收比 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.daPercentOfRevenue}
                    onChange={(e) => updateDcfField('daPercentOfRevenue', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">资本开支 CapEx 占营收比 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.capexPercentOfRevenue}
                    onChange={(e) => updateDcfField('capexPercentOfRevenue', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-medium block mb-1">营运资金变动占增量比 (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.nwcPercentOfRevenueDelta}
                    onChange={(e) => updateDcfField('nwcPercentOfRevenueDelta', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>
            </div>

            {/* Box 3: CFA WACC & CAPM Capital Cost Calculator */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-purple-400" />
                  WACC 加权平均资本成本参数 (CAPM)
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                  动态计算 WACC: {dcfResults.wacc}%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">无风险利率 Rf (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={dcfInputs.riskFreeRate}
                    onChange={(e) => updateDcfField('riskFreeRate', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">股权风险溢价 ERP (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.equityRiskPremium}
                    onChange={(e) => updateDcfField('equityRiskPremium', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">贝塔系数 Beta (β)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={dcfInputs.beta}
                    onChange={(e) => updateDcfField('beta', parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center font-bold text-purple-300"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">债务税前成本 Kd (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.preTaxCostOfDebt}
                    onChange={(e) => updateDcfField('preTaxCostOfDebt', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">权益资本权重 We (%)</label>
                  <input
                    type="number"
                    step="1"
                    value={dcfInputs.weightOfEquity}
                    onChange={(e) => {
                      const we = parseFloat(e.target.value) || 0;
                      updateDcfField('weightOfEquity', we);
                      updateDcfField('weightOfDebt', Math.max(0, 100 - we));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">债务资本权重 Wd (%)</label>
                  <input
                    type="number"
                    step="1"
                    value={dcfInputs.weightOfDebt}
                    onChange={(e) => {
                      const wd = parseFloat(e.target.value) || 0;
                      updateDcfField('weightOfDebt', wd);
                      updateDcfField('weightOfEquity', Math.max(0, 100 - wd));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2 text-white font-mono text-center"
                  />
                </div>
              </div>

              <div className="p-3 bg-purple-950/20 border border-purple-900/40 rounded-xl text-xs flex items-center justify-between font-mono">
                <span className="text-purple-300">CAPM 股权成本 Ke: {dcfResults.costOfEquity}%</span>
                <span className="text-slate-400">债务税后成本: {dcfResults.afterTaxCostOfDebt}%</span>
              </div>
            </div>

            {/* Box 4: Terminal Value & Balance Sheet Bridge */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  终值假设与资产负债表桥梁 (EV to Equity)
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">永续终值增长率 g (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={dcfInputs.terminalGrowthRate}
                    onChange={(e) => updateDcfField('terminalGrowthRate', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">退出乘数 (Exit EV/EBITDA)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={dcfInputs.exitEbitdaMultiple}
                    onChange={(e) => updateDcfField('exitEbitdaMultiple', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">现金及现金等价物 (Cash, 百万)</label>
                  <input
                    type="number"
                    value={dcfInputs.cashAndEquivalents}
                    onChange={(e) => updateDcfField('cashAndEquivalents', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">总计息有息负债 (Total Debt, 百万)</label>
                  <input
                    type="number"
                    value={dcfInputs.totalDebt}
                    onChange={(e) => updateDcfField('totalDebt', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Automated CFA 5-Year Financial Pro-Forma & Sensitivity Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Table 1: Excel-Style Pro-Forma Schedule */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
              <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">
                    全自动 5 年现金流预测表 (Unlevered FCFF Pro-Forma Schedule)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  自动计算 · 无需 Excel 公式
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left font-mono">
                  <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">科目 \\ 预测期</th>
                      {dcfResults.projections.map(p => (
                        <th key={p.year} className="py-2.5 px-3 text-right text-slate-200">
                          {p.yearLabel}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2 px-3 text-slate-400">营业总收入 (Revenue)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right font-semibold text-white">
                          {p.revenue.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-500">营收增速 (Growth %)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-emerald-400">
                          +{p.growthRate.toFixed(1)}%
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">息税前利润 (EBIT)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-white">
                          {p.ebit.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-500">所得税 (Taxes @ {dcfInputs.taxRate}%)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-rose-400">
                          -{p.taxes.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-cyan-950/10 font-bold text-cyan-300">
                      <td className="py-2 px-3">税后净营业利润 (NOPAT)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right">
                          {p.nopat.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">+ 折旧与摊销 (D&A)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-slate-300">
                          +{p.da.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">- 资本开支 (CapEx)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-rose-400">
                          -{p.capex.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-slate-400">- 营运资金变动 (ΔNWC)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right text-slate-400">
                          -{p.nwcChange.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-emerald-950/20 font-bold text-emerald-400 border-t border-emerald-900/40">
                      <td className="py-2.5 px-3">无杠杆自由现金流 (FCFF)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2.5 px-3 text-right text-sm">
                          {p.fcff.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                    <tr className="text-slate-500">
                      <td className="py-2 px-3">折现系数 (1/(1+WACC)^t)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right">
                          {p.discountFactor.toFixed(3)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-slate-900/60 font-semibold text-cyan-300">
                      <td className="py-2 px-3">现金流现值 (PV of FCFF)</td>
                      {dcfResults.projections.map(p => (
                        <td key={p.year} className="py-2 px-3 text-right">
                          {p.pvFcff.toFixed(0)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* EV to Equity Bridge Decomposition */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                企业价值与股权价值桥梁分解 (EV to Equity Bridge)
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 mb-1">预测期现金流现值</div>
                  <div className="text-base font-bold text-white font-mono">
                    {dcfResults.cumulativePvFcff.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Sum of PV(FCFF)</div>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 mb-1">终值折现现值 (PV of TV)</div>
                  <div className="text-base font-bold text-cyan-400 font-mono">
                    {dcfResults.pvTerminalValueGordon.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">占比 {((dcfResults.pvTerminalValueGordon / dcfResults.enterpriseValue) * 100).toFixed(0)}%</div>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 mb-1">企业价值 (EV)</div>
                  <div className="text-base font-bold text-purple-400 font-mono">
                    {dcfResults.enterpriseValue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">PV(FCFF) + PV(TV)</div>
                </div>

                <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl">
                  <div className="text-slate-400 mb-1">净负债 (Net Debt)</div>
                  <div className="text-base font-bold text-amber-400 font-mono">
                    {dcfResults.netDebt.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">总有息负债 - 现金</div>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl flex items-center justify-between text-xs">
                <span className="font-semibold text-cyan-300">
                  隐含股权价值 (Equity Value) = EV - Net Debt = {dcfResults.equityValue.toLocaleString()} 百万
                </span>
                <span className="font-mono text-white font-bold">
                  每股内在价值: {dcfInputs.currency} {dcfResults.intrinsicValuePerShare.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Table 2: 2D Excel Sensitivity Matrix (WACC vs Terminal Growth Rate g) */}
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-400" />
                    双变量敏感性分析矩阵 (Excel Data Table: WACC vs 永续增长率 g)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    实时测算在不同资本成本与经济终值增速下的每股公允目标价 (深色框为基准值)
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full text-xs text-center font-mono border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2 border border-slate-800 bg-slate-900 text-slate-400 font-sans">
                        WACC \ g
                      </th>
                      {dcfResults.sensitivityTable.gSteps.map((g, idx) => (
                        <th 
                          key={idx} 
                          className={`p-2 border border-slate-800 ${
                            idx === 2 ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'bg-slate-900/60 text-slate-400'
                          }`}
                        >
                          g = {g}%
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dcfResults.sensitivityTable.waccSteps.map((waccVal, rIdx) => (
                      <tr key={rIdx}>
                        <td className={`p-2 border border-slate-800 font-bold ${
                          rIdx === 2 ? 'bg-cyan-950/40 text-cyan-300' : 'bg-slate-900/60 text-slate-400'
                        }`}>
                          WACC = {waccVal}%
                        </td>
                        {dcfResults.sensitivityTable.matrix[rIdx].map((cellPrice, cIdx) => {
                          const isCenter = rIdx === 2 && cIdx === 2;
                          const isHigher = cellPrice > dcfInputs.currentSharePrice;
                          return (
                            <td 
                              key={cIdx} 
                              className={`p-2.5 border border-slate-800 text-xs transition-all ${
                                isCenter 
                                  ? 'bg-cyan-500/20 text-cyan-300 font-extrabold border-2 border-cyan-400' 
                                  : isHigher
                                  ? 'text-emerald-400 hover:bg-emerald-950/20'
                                  : 'text-rose-400 hover:bg-rose-950/20'
                              }`}
                            >
                              {cellPrice.toFixed(2)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Tab 2: DDM Model Workspace */}
      {activeModelTab === 'DDM' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              股利折现模型 (DDM) 参数录入
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">当前每股股息 D0 ({ddmInputs.currency})</label>
                <input
                  type="number"
                  step="0.05"
                  value={ddmInputs.currentDividendPerShare}
                  onChange={(e) => setDdmInputs(prev => ({ ...prev, currentDividendPerShare: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">股权要求回报率 Ke (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ddmInputs.costOfEquity}
                  onChange={(e) => setDdmInputs(prev => ({ ...prev, costOfEquity: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">高速增长期年数 (Years)</label>
                <input
                  type="number"
                  value={ddmInputs.highGrowthYears}
                  onChange={(e) => setDdmInputs(prev => ({ ...prev, highGrowthYears: parseInt(e.target.value) || 1 }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">高速期分红增速 g1 (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={ddmInputs.highGrowthRate}
                  onChange={(e) => setDdmInputs(prev => ({ ...prev, highGrowthRate: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">长期永续增长率 g2 (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ddmInputs.terminalGrowthRate}
                  onChange={(e) => setDdmInputs(prev => ({ ...prev, terminalGrowthRate: parseFloat(e.target.value) || 0 }))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Calculator className="w-4 h-4 text-cyan-400" />
              DDM 模型测算结果与逐年股息现值
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 mb-1">两阶段 DDM 内在公允价值</div>
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  {ddmInputs.currency} {ddmResults.intrinsicValuePerShare.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  折让空间: <span className="text-emerald-400 font-bold">{ddmResults.upsideDownsidePercent}%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
                <div className="text-xs text-slate-400 mb-1">CFA H-Model 平滑近似价值</div>
                <div className="text-2xl font-black text-purple-400 font-mono">
                  {ddmInputs.currency} {ddmResults.hModelIntrinsicValue.toFixed(2)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  适用于增速线性平滑放缓企业
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-300">预测期逐年分红排期表:</div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400">
                    <tr>
                      <th className="p-2 text-left">年度</th>
                      <th className="p-2 text-right">预计分红 (DPS)</th>
                      <th className="p-2 text-right">折现现值 (PV)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {ddmResults.projectedDividends.map(d => (
                      <tr key={d.year}>
                        <td className="p-2 text-slate-400">第 {d.year} 年</td>
                        <td className="p-2 text-right text-white">{d.dividend.toFixed(2)}</td>
                        <td className="p-2 text-right text-cyan-300">{d.pv.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900/50 font-bold text-white">
                      <td className="p-2">终值 (Terminal Price at Year {ddmInputs.highGrowthYears})</td>
                      <td className="p-2 text-right">{ddmResults.terminalSharePrice.toFixed(2)}</td>
                      <td className="p-2 text-right text-purple-300">{ddmResults.pvTerminalPrice.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Tab 3: CCA Multiples Workspace */}
      {activeModelTab === 'CCA_MULTIPLES' && (
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                可比公司相对估值乘数模型 (Comparable Company Analysis - CCA)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                投行研究部标配：手动录入标的财务数据与 3~4 家同业公司的 EV/EBITDA, P/E, P/S, P/B
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">综合对标目标价: </span>
              <span className="text-lg font-bold text-cyan-400 font-mono">
                {ccaInputs.currency} {ccaResults.blendedTargetPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-slate-400 mb-1">EV/EBITDA 隐含价</div>
              <div className="text-base font-bold text-white font-mono">
                {ccaInputs.currency} {ccaResults.impliedPriceEvEbitda.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">行业中位数: {ccaResults.medianEvEbitda}x</div>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-slate-400 mb-1">P/E 市盈率隐含价</div>
              <div className="text-base font-bold text-white font-mono">
                {ccaInputs.currency} {ccaResults.impliedPricePe.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">行业中位数: {ccaResults.medianPe}x</div>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-slate-400 mb-1">P/S 市销率隐含价</div>
              <div className="text-base font-bold text-white font-mono">
                {ccaInputs.currency} {ccaResults.impliedPricePs.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">行业中位数: {ccaResults.medianPs}x</div>
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-slate-400 mb-1">P/B 市净率隐含价</div>
              <div className="text-base font-bold text-white font-mono">
                {ccaInputs.currency} {ccaResults.impliedPricePb.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500">行业中位数: {ccaResults.medianPb}x</div>
            </div>
          </div>

          {/* Peers Table */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">同业可比公司池 (Peer Group):</div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead className="bg-slate-900 text-slate-400">
                  <tr>
                    <th className="p-2.5 text-left">公司代码</th>
                    <th className="p-2.5 text-left">公司名称</th>
                    <th className="p-2.5 text-right">EV/EBITDA</th>
                    <th className="p-2.5 text-right">P/E (市盈率)</th>
                    <th className="p-2.5 text-right">P/S (市销率)</th>
                    <th className="p-2.5 text-right">P/B (市净率)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ccaInputs.peers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="p-2.5 text-cyan-300 font-bold">{p.ticker}</td>
                      <td className="p-2.5 text-white font-sans">{p.name}</td>
                      <td className="p-2.5 text-right text-slate-300">{p.evEbitda.toFixed(1)}x</td>
                      <td className="p-2.5 text-right text-slate-300">{p.pe.toFixed(1)}x</td>
                      <td className="p-2.5 text-right text-slate-300">{p.ps.toFixed(1)}x</td>
                      <td className="p-2.5 text-right text-slate-300">{p.pb.toFixed(1)}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Residual Income Model (RIM) */}
      {activeModelTab === 'RESIDUAL_INCOME' && (
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                超额收益估值模型 (Residual Income Model - RIM / EVA)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                CFA Level 2 核心重点：净资产账面价值 + 未来逐年创造的超额收益 (ROE - r) 折现
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">RIM 每股内在公允价值: </span>
              <span className="text-lg font-bold text-purple-400 font-mono">
                {rimInputs.currency} {rimResults.intrinsicValuePerShare.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400">
                <tr>
                  <th className="p-2 text-left">预测年度</th>
                  <th className="p-2 text-right">期初每股净资产 B(t-1)</th>
                  <th className="p-2 text-right">预计 ROE (%)</th>
                  <th className="p-2 text-right">预计每股净利润 (EPS)</th>
                  <th className="p-2 text-right">股权资本成本费用</th>
                  <th className="p-2 text-right text-purple-300">超额收益 (RI)</th>
                  <th className="p-2 text-right">折现现值 (PV of RI)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rimResults.projections.map(p => (
                  <tr key={p.year}>
                    <td className="p-2 text-slate-400">第 {p.year} 年</td>
                    <td className="p-2 text-right text-white">{p.bookValueBegin.toFixed(2)}</td>
                    <td className="p-2 text-right text-emerald-400">{p.roe}%</td>
                    <td className="p-2 text-right text-white">{p.eps.toFixed(2)}</td>
                    <td className="p-2 text-right text-rose-400">-{p.equityCharge.toFixed(2)}</td>
                    <td className="p-2 text-right font-bold text-purple-300">{p.residualIncome.toFixed(2)}</td>
                    <td className="p-2 text-right text-cyan-300">{p.pvResidualIncome.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Tab 5: Football Field Summary Across Models */}
      {activeModelTab === 'FOOTBALL_FIELD' && (
        <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-cyan-400" />
                CFA 综合估值足球场图 (Valuation Football Field Summary)
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                整合 DCF 永续法、退出乘数法、可比倍数 EV/EBITDA、市盈率 PE、超额收益 RIM 等模型的估值区间
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">多模型综合加权公允价值</div>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {dcfInputs.currency} {blendedTargetPrice.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Range Bars */}
          <div className="space-y-4 pt-2">
            {footballFieldItems.map((item, idx) => {
              const maxScale = Math.max(...footballFieldItems.map(i => i.maxPrice)) * 1.15;
              const leftPct = (item.minPrice / maxScale) * 100;
              const widthPct = ((item.maxPrice - item.minPrice) / maxScale) * 100;
              const currentPricePct = (dcfInputs.currentSharePrice / maxScale) * 100;

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-white font-semibold">{item.methodName}</span>
                    <span className="font-mono text-slate-400">
                      区间: {dcfInputs.currency} {item.minPrice} ~ {item.maxPrice} (基准: <span className="text-cyan-300 font-bold">{item.basePrice}</span>)
                    </span>
                  </div>

                  {/* Horizontal Bar Chart Container */}
                  <div className="relative w-full h-7 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                    {/* Valuation Band */}
                    <div
                      className="absolute top-1 bottom-1 rounded bg-gradient-to-r from-blue-600/70 via-cyan-500/70 to-emerald-500/70 border border-cyan-400/40 flex items-center justify-center text-[10px] font-mono text-white"
                      style={{
                        left: `${Math.max(0, leftPct)}%`,
                        width: `${Math.max(5, widthPct)}%`
                      }}
                    >
                      基准 {item.basePrice}
                    </div>

                    {/* Current Price Marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                      style={{ left: `${Math.max(0, Math.min(100, currentPricePct))}%` }}
                      title={`当前市价: ${dcfInputs.currentSharePrice}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footnote and Legend */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-cyan-500 inline-block" /> 模型公允价值波动区间 (Min ~ Max)
              </span>
              <span className="flex items-center gap-1.5 text-rose-300 font-semibold">
                <span className="w-1.5 h-3 bg-rose-400 inline-block" /> 当前市场交易价 ({dcfInputs.currentSharePrice})
              </span>
            </div>
            <div>
              投资建议：当现价明显低于大部分估值区间下沿时，安全边际极高，属于高胜率价值买点。
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🔍 MODAL: 从个股研究库 / 全球股票库直接挑选导入 (STOCK DIRECTORY SELECTOR) */}
      {/* ========================================================================= */}
      {isStockDirectoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0e1626] border border-[#23334d] rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="p-5 border-b border-[#1c293e] flex items-center justify-between bg-[#121c30]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    从个股研究库载入任意股票进入 CFA 估值工作台
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-sans">
                    选择任意个股，系统将自动读取其三大财务报表历史数据、EBITDA利润率、负债现金与WACC贴现参数并填入当前模型
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsStockDirectoryModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors text-sm"
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-[#182336] bg-[#0c1322]">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="搜索股票代码、公司中文名、行业 (如 Maybank, 1155, CIMB, Inari, NVDA, TSLA, 腾讯, 苹果)..."
                  value={stockDirectorySearch}
                  onChange={(e) => setStockDirectorySearch(e.target.value)}
                  className="w-full bg-[#141d2e] border border-[#23334d] focus:border-cyan-400 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Stock List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {INITIAL_STOCKS
                .filter(st => {
                  const q = stockDirectorySearch.toLowerCase().trim();
                  if (!q) return true;
                  return (
                    st.ticker.toLowerCase().includes(q) ||
                    st.name.toLowerCase().includes(q) ||
                    st.sector.toLowerCase().includes(q) ||
                    st.industry.toLowerCase().includes(q) ||
                    st.region.toLowerCase().includes(q)
                  );
                })
                .map(st => {
                  const isCurrent = dcfInputs.ticker.toUpperCase() === st.ticker.toUpperCase();
                  return (
                    <div
                      key={st.ticker}
                      onClick={() => handleSelectStockFromDirectory(st)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-cyan-950/40 border-cyan-400 shadow-md ring-1 ring-cyan-500/50'
                          : 'bg-[#121a2a] hover:bg-[#182338] border-[#1f2b42] hover:border-cyan-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 rounded-xl bg-[#182438] text-white font-mono font-bold text-xs min-w-[70px] text-center border border-[#253652]">
                          {st.ticker}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-sans">{st.name}</span>
                            <span className="text-[10px] px-2 py-0.2 rounded bg-slate-800 text-cyan-300 font-sans">
                              {st.region} · {st.exchange}
                            </span>
                            {st.tag && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                                {st.tag}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-sans mt-0.5">
                            {st.sector} · {st.industry} · 市值: ${st.marketCapUSD}B
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <div className="text-xs font-mono font-bold text-white">
                            市价: {st.currency} ${st.currentPrice.toFixed(2)}
                          </div>
                          <div className="text-[11px] font-mono text-emerald-400 font-medium">
                            研报身价: ${st.investmentTargets.fairValuePrice.toFixed(2)}
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectStockFromDirectory(st);
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow shrink-0 flex items-center gap-1"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>载入模型</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#1a2538] bg-[#101726] flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>载入后模型将自动提取其财务三大报表数字，无需手动复制粘贴</span>
              </span>
              <button
                onClick={() => setIsStockDirectoryModalOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
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
