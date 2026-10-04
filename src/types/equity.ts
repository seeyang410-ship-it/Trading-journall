export type EquityRating = 
  | 'Strong Buy (深度低估击球区)' 
  | 'Buy / Accumulate (具备安全边际)' 
  | 'Hold / Fair Value (估值合理)' 
  | 'Trim / Overvalued (估值偏高)' 
  | 'Avoid / Bubble (严重透支未来)';

export interface FinancialYearData {
  year: string;
  revenue: number; // in Millions USD
  revenueGrowth: number; // %
  grossProfit: number;
  grossMargin: number; // %
  operatingIncome: number; // EBIT
  operatingMargin: number; // %
  netIncome: number;
  netMargin: number; // %
  eps: number;
  cfo: number; // Cash from Operations
  capex: number; // Capital Expenditures
  fcf: number; // Free Cash Flow = CFO - CapEx
  fcfMargin: number; // %
  totalCash: number;
  totalDebt: number;
  netDebt: number; // Debt - Cash
  sharesOutstanding: number; // in Millions
}

export interface DCFModelParameters {
  currentPrice: number;
  sharesOutstanding: number; // Millions
  baseFCF: number; // Millions USD
  growthStage1Rate: number; // Years 1-5 expected FCF CAGR %
  growthStage2Rate: number; // Years 6-10 fading growth %
  terminalGrowthRate: number; // Long-term perpetual rate % (usually 2%-3%)
  riskFreeRate: number; // 10Y Treasury Yield %
  beta: number; // Equity Beta
  equityRiskPremium: number; // ERP % (usually 4.5% - 5.5%)
  costOfDebt: number; // Pre-tax cost of debt %
  taxRate: number; // Effective corporate tax rate %
  wacc: number; // Calculated Weighted Average Cost of Capital %
  netDebt: number; // Millions USD
}

export interface DCFValuationResult {
  discountedFCFSum: number; // Present value of 10-year cash flows
  terminalValue: number;
  pvTerminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  fairValuePerShare: number; // Intrinsic value
  marginOfSafety: number; // (Fair Value - Current Price) / Fair Value %
  rating: EquityRating;
}

export interface AltmanZScoreDetail {
  score: number;
  zone: 'Safe Zone (安全区)' | 'Grey Zone (灰色待观察)' | 'Distress Zone (破产危险区)';
  components: {
    x1_workingCapital: number;
    x2_retainedEarnings: number;
    x3_ebit: number;
    x4_marketCapToLiabilities: number;
    x5_salesToAssets: number;
  };
}

export interface PiotroskiFScoreDetail {
  score: number; // 0 to 9
  level: 'High Quality (7-9 高质量企业)' | 'Moderate (4-6 中规中矩)' | 'Low Quality (0-3 财务恶化)';
  criteria: {
    name: string;
    description: string;
    passed: boolean;
    category: 'Profitability' | 'Leverage & Liquidity' | 'Operating Efficiency';
  }[];
}

export type GlobalRegion = 'US' | 'Malaysia' | 'Greater China' | 'Europe' | 'Japan & APAC';

export interface InvestmentTargets {
  recommendedBuyPrice: number; // 建议买入击球价（打折安全价）
  fairValuePrice: number; // 估算公允合理价
  overvaluedPrice: number; // 泡沫高估警报价
  actionVerdict: '🟢 强烈买入 (极度划算)' | '🟡 分批定投 / 合理持有' | '🔴 观望等待回踩 (切忌追高)' | '🚫 严重透支，千万别买';
  plainInvestmentGuide: string; // 大白话投资指引
}

export interface StockResearchProfile {
  ticker: string;
  name: string;
  region: GlobalRegion;
  exchange: string; // e.g. NASDAQ, NYSE, HKEX, SSE, Euronext, TSE
  sector: string;
  industry: string;
  currency: string;
  currentPrice: number;
  changePercent: number;
  marketCapUSD: number; // in Billions
  evToEbitda: number;
  peTTM: number;
  forwardPE: number;
  pegRatio: number;
  priceToFCF: number;
  dividendYield: number; // %
  roic: number; // Return on Invested Capital %
  wacc: number; // Weighted Average Cost of Capital %
  economicMoatSpread: number; // ROIC - WACC
  moatRating: 'Wide Moat (宽阔护城河)' | 'Narrow Moat (狭窄护城河)' | 'No Moat (无护城河)';
  financialHistory: FinancialYearData[];
  dcfParams: DCFModelParameters;
  dcfResult: DCFValuationResult;
  investmentTargets: InvestmentTargets; // 核心：直接告诉在什么价格买
  altmanZ: AltmanZScoreDetail;
  piotroskiF: PiotroskiFScoreDetail;
  analystSummary: {
    bullCase: string;
    bearCase: string;
    catalysts: string[];
    fairValueRange: [number, number]; // [Conservative, Optimistic]
  };
}
