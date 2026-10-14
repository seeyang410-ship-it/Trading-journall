export type ValuationModelType = 'DCF_FCFF' | 'DDM' | 'CCA_MULTIPLES' | 'RESIDUAL_INCOME' | 'FOOTBALL_FIELD';

export type CFARating = 'STRONG_BUY' | 'BUY' | 'HOLD' | 'SELL' | 'STRONG_SELL';

// DCF - FCFF (Free Cash Flow to Firm) Input Parameters
export interface DCFModelInputs {
  companyName: string;
  ticker: string;
  currency: string;
  currentSharePrice: number;
  dilutedShares: number; // in millions
  
  // Base Year Financials (in millions)
  baseRevenue: number;
  
  // Explicit Forecast Horizon (Years 1 to 5)
  forecastYears: number; // usually 5
  revenueGrowthRates: number[]; // e.g. [12.0, 10.5, 9.0, 7.5, 6.0] in %
  ebitMargins: number[]; // e.g. [28.0, 28.5, 29.0, 29.0, 29.0] in %
  taxRate: number; // e.g. 21.0 in %
  
  // Reinvestment Rates (% of Revenue or % of change)
  daPercentOfRevenue: number; // Depreciation & Amortization % of Revenue, e.g. 4.2%
  capexPercentOfRevenue: number; // Capital Expenditures % of Revenue, e.g. 5.5%
  nwcPercentOfRevenueDelta: number; // Net Working Capital change % of revenue delta, e.g. 4.0%
  
  // WACC Parameters (Cost of Capital & CAPM)
  riskFreeRate: number; // Rf %, e.g. 4.10%
  equityRiskPremium: number; // ERP %, e.g. 5.50%
  beta: number; // Beta, e.g. 1.15
  preTaxCostOfDebt: number; // Kd %, e.g. 5.20%
  weightOfEquity: number; // We %, e.g. 85.0%
  weightOfDebt: number; // Wd %, e.g. 15.0%
  
  // Terminal Value Parameters
  terminalGrowthRate: number; // g %, e.g. 2.5%
  exitEbitdaMultiple: number; // EV/EBITDA multiple, e.g. 14.0x
  terminalMethod: 'GORDON' | 'EXIT_MULTIPLE' | 'AVERAGE';
  
  // Balance Sheet Bridge (in millions)
  cashAndEquivalents: number;
  totalDebt: number;
  minorityInterest: number;
}

// Year-by-year FCFF projection item
export interface FCFFYearProjection {
  year: number;
  yearLabel: string;
  revenue: number;
  growthRate: number;
  ebit: number;
  ebitMargin: number;
  taxes: number;
  nopat: number;
  da: number;
  capex: number;
  nwcChange: number;
  fcff: number;
  discountPeriod: number;
  discountFactor: number;
  pvFcff: number;
}

// Calculated DCF Results
export interface DCFModelResults {
  costOfEquity: number; // Ke via CAPM
  afterTaxCostOfDebt: number; // Kd * (1 - t)
  wacc: number;
  
  projections: FCFFYearProjection[];
  cumulativePvFcff: number; // Sum of PV of FCFF (explicit period)
  
  terminalValueGordon: number;
  pvTerminalValueGordon: number;
  
  terminalValueExitMultiple: number;
  pvTerminalValueExitMultiple: number;
  
  enterpriseValue: number;
  netDebt: number;
  equityValue: number;
  
  intrinsicValuePerShare: number;
  upsideDownsidePercent: number;
  cfaRating: CFARating;
  marginOfSafetyPrice: number; // 20% discount to intrinsic value
  
  // Sensitivity Matrix (WACC vs Terminal Growth Rate)
  sensitivityTable: {
    waccSteps: number[]; // row headers
    gSteps: number[]; // column headers
    matrix: number[][]; // [waccIndex][gIndex] = target share price
  };
}

// DDM (Dividend Discount Model) Inputs & Results
export interface DDMModelInputs {
  companyName: string;
  ticker: string;
  currency: string;
  currentSharePrice: number;
  currentDividendPerShare: number; // D0
  costOfEquity: number; // Ke %
  highGrowthRate: number; // g1 %
  highGrowthYears: number; // N years
  terminalGrowthRate: number; // g2 %
  hModelHalfLifeYears?: number; // for H-Model
}

export interface DDMModelResults {
  projectedDividends: { year: number; dividend: number; pv: number }[];
  pvExplicitDividends: number;
  terminalSharePrice: number;
  pvTerminalPrice: number;
  intrinsicValuePerShare: number;
  hModelIntrinsicValue: number;
  upsideDownsidePercent: number;
  cfaRating: CFARating;
}

// CCA (Comps / Multiples Valuation)
export interface PeerCompanyComp {
  ticker: string;
  name: string;
  evEbitda: number;
  pe: number;
  ps: number;
  pb: number;
}

export interface CCAModelInputs {
  companyName: string;
  ticker: string;
  currency: string;
  currentSharePrice: number;
  dilutedShares: number;
  ltmEbitda: number;
  ltmNetIncome: number;
  ltmRevenue: number;
  bookValueOfEquity: number;
  netDebt: number;
  premiumDiscountFactor: number; // % adjustment (e.g. +5% for moat)
  peers: PeerCompanyComp[];
}

export interface CCAModelResults {
  medianEvEbitda: number;
  medianPe: number;
  medianPs: number;
  medianPb: number;
  impliedPriceEvEbitda: number;
  impliedPricePe: number;
  impliedPricePs: number;
  impliedPricePb: number;
  blendedTargetPrice: number;
  upsideDownsidePercent: number;
  cfaRating: CFARating;
}

// Residual Income Model (RIM)
export interface RIMModelInputs {
  companyName: string;
  ticker: string;
  currency: string;
  currentSharePrice: number;
  bookValuePerShare: number; // B0
  costOfEquity: number; // r %
  forecastYears: number;
  projectedRoes: number[]; // ROE % for years 1..N
  dividendPayoutRatio: number; // % of earnings paid out
  persistenceFactor: number; // omega 0..1 (e.g. 0.65)
}

export interface RIMModelResults {
  projections: {
    year: number;
    bookValueBegin: number;
    eps: number;
    dividends: number;
    bookValueEnd: number;
    roe: number;
    equityCharge: number;
    residualIncome: number;
    discountFactor: number;
    pvResidualIncome: number;
  }[];
  cumulativePvRI: number;
  pvTerminalRI: number;
  intrinsicValuePerShare: number;
  impliedPb: number;
  upsideDownsidePercent: number;
  cfaRating: CFARating;
}

// Football Field Summary Item
export interface FootballFieldItem {
  methodName: string;
  methodLabelEn: string;
  minPrice: number;
  basePrice: number;
  maxPrice: number;
  weight: number; // % in final blended target
}

// Preset Company Profile
export interface PresetValuationCompany {
  id: string;
  name: string;
  ticker: string;
  sector: string;
  description: string;
  dcfInputs: DCFModelInputs;
  ddmInputs: DDMModelInputs;
  ccaInputs: CCAModelInputs;
  rimInputs: RIMModelInputs;
}
