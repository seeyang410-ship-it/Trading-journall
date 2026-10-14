import { StockResearchProfile } from '../types/equity';
import { 
  PresetValuationCompany, 
  DCFModelInputs, 
  DDMModelInputs, 
  CCAModelInputs, 
  RIMModelInputs, 
  PeerCompanyComp 
} from '../types/valuation';
import { INITIAL_STOCKS } from '../data/seedEquities';

// Generate default sector peers for CCA comps when converting any stock
function getSectorPeersForStock(stock: StockResearchProfile): PeerCompanyComp[] {
  const currentTicker = stock.ticker.toUpperCase();
  const currentEvEbitda = stock.evToEbitda > 0 ? stock.evToEbitda : 14;
  const currentPe = stock.peTTM > 0 ? stock.peTTM : 18;
  const currentPs = stock.marketCapUSD > 0 && stock.financialHistory[0]?.revenue 
    ? +(stock.marketCapUSD * 1000 / stock.financialHistory[0].revenue).toFixed(1) 
    : 3.5;
  const currentPb = stock.moatRating.includes('Wide') ? 4.8 : 2.2;

  // If there are other stocks in the same sector from INITIAL_STOCKS, use them!
  const sectorPeers = INITIAL_STOCKS
    .filter(s => s.ticker.toUpperCase() !== currentTicker && (s.sector === stock.sector || s.region === stock.region))
    .slice(0, 3)
    .map(s => ({
      ticker: s.ticker,
      name: s.name.split(' ')[0],
      evEbitda: s.evToEbitda || +(currentEvEbitda * 0.95).toFixed(1),
      pe: s.peTTM || +(currentPe * 0.92).toFixed(1),
      ps: +(s.marketCapUSD * 1000 / (s.financialHistory[0]?.revenue || 10000)).toFixed(1) || currentPs,
      pb: +(s.roic / 5).toFixed(1) || currentPb
    }));

  if (sectorPeers.length >= 2) {
    return sectorPeers;
  }

  // Fallback industry standard peers
  return [
    {
      ticker: 'PEER-1',
      name: '行业基准龙头 A',
      evEbitda: +(currentEvEbitda * 1.05).toFixed(1),
      pe: +(currentPe * 1.08).toFixed(1),
      ps: +(currentPs * 1.1).toFixed(1),
      pb: +(currentPb * 1.05).toFixed(1)
    },
    {
      ticker: 'PEER-2',
      name: '行业中位竞争对手 B',
      evEbitda: +(currentEvEbitda * 0.92).toFixed(1),
      pe: +(currentPe * 0.90).toFixed(1),
      ps: +(currentPs * 0.88).toFixed(1),
      pb: +(currentPb * 0.92).toFixed(1)
    },
    {
      ticker: 'PEER-3',
      name: '全球对标标杆 C',
      evEbitda: +(currentEvEbitda * 1.12).toFixed(1),
      pe: +(currentPe * 1.15).toFixed(1),
      ps: +(currentPs * 1.15).toFixed(1),
      pb: +(currentPb * 1.20).toFixed(1)
    }
  ];
}

/**
 * Converts any StockResearchProfile (from the Equity Research / Stock Database)
 * into a fully specified CFA Valuation Model preset company!
 */
export function convertStockProfileToValuationCompany(stock: StockResearchProfile): PresetValuationCompany {
  const latestFin = stock.financialHistory[0] || {
    year: '2024',
    revenue: 10000,
    revenueGrowth: 8.0,
    grossProfit: 5000,
    grossMargin: 50.0,
    operatingIncome: 2500,
    operatingMargin: 25.0,
    netIncome: 2000,
    netMargin: 20.0,
    eps: 2.0,
    cfo: 2400,
    capex: 600,
    fcf: 1800,
    fcfMargin: 18.0,
    totalCash: 3000,
    totalDebt: 4000,
    netDebt: 1000,
    sharesOutstanding: 1000
  };

  const shares = latestFin.sharesOutstanding || (stock.marketCapUSD > 0 && stock.currentPrice > 0 ? Math.round(stock.marketCapUSD * 1000 / stock.currentPrice) : 1000);
  const baseRevenue = latestFin.revenue || 10000;
  const opMargin = latestFin.operatingMargin || (latestFin.operatingIncome && latestFin.revenue ? +(latestFin.operatingIncome / latestFin.revenue * 100).toFixed(1) : 22.0);
  const g1 = stock.dcfParams.growthStage1Rate || 8.0;
  const g2 = stock.dcfParams.growthStage2Rate || 4.5;
  const rf = stock.dcfParams.riskFreeRate || 4.10;
  const erp = stock.dcfParams.equityRiskPremium || 5.20;
  const beta = stock.dcfParams.beta || 1.05;
  const costOfDebt = stock.dcfParams.costOfDebt || 4.50;
  const taxRate = stock.dcfParams.taxRate || 21.0;
  const ke = +(rf + beta * erp).toFixed(2);

  const dcfInputs: DCFModelInputs = {
    companyName: stock.name,
    ticker: stock.ticker,
    currency: stock.currency,
    currentSharePrice: stock.currentPrice,
    dilutedShares: shares,
    baseRevenue: baseRevenue,
    forecastYears: 5,
    revenueGrowthRates: [
      +g1.toFixed(1),
      +(g1 * 0.95).toFixed(1),
      +(g1 * 0.90).toFixed(1),
      +(g2 * 1.1).toFixed(1),
      +g2.toFixed(1)
    ],
    ebitMargins: [
      +opMargin.toFixed(1),
      +(opMargin * 1.01).toFixed(1),
      +(opMargin * 1.02).toFixed(1),
      +opMargin.toFixed(1),
      +(opMargin * 0.99).toFixed(1)
    ],
    taxRate: taxRate,
    daPercentOfRevenue: 3.5,
    capexPercentOfRevenue: latestFin.capex && latestFin.revenue 
      ? Math.max(1.5, Math.min(18.0, +(latestFin.capex / latestFin.revenue * 100).toFixed(1))) 
      : 3.5,
    nwcPercentOfRevenueDelta: 2.5,
    riskFreeRate: rf,
    equityRiskPremium: erp,
    beta: beta,
    preTaxCostOfDebt: costOfDebt,
    weightOfEquity: latestFin.netDebt > 0 ? 82.0 : 94.0,
    weightOfDebt: latestFin.netDebt > 0 ? 18.0 : 6.0,
    terminalGrowthRate: stock.dcfParams.terminalGrowthRate || 2.5,
    exitEbitdaMultiple: stock.evToEbitda > 0 ? stock.evToEbitda : 14.0,
    terminalMethod: 'AVERAGE',
    cashAndEquivalents: Math.max(0, latestFin.totalCash || 0),
    totalDebt: Math.max(0, latestFin.totalDebt || 0),
    minorityInterest: 0
  };

  // DDM Inputs
  const annualDividend = stock.dividendYield > 0 
    ? +(stock.currentPrice * (stock.dividendYield / 100)).toFixed(2) 
    : 0.50;

  const ddmInputs: DDMModelInputs = {
    companyName: stock.name,
    ticker: stock.ticker,
    currency: stock.currency,
    currentSharePrice: stock.currentPrice,
    currentDividendPerShare: annualDividend,
    costOfEquity: ke,
    highGrowthRate: +(g1 * 0.85).toFixed(1),
    highGrowthYears: 5,
    terminalGrowthRate: Math.min(3.5, stock.dcfParams.terminalGrowthRate || 2.5),
    hModelHalfLifeYears: 4
  };

  // CCA Inputs
  const ccaInputs: CCAModelInputs = {
    companyName: stock.name,
    ticker: stock.ticker,
    currency: stock.currency,
    currentSharePrice: stock.currentPrice,
    dilutedShares: shares,
    ltmEbitda: latestFin.operatingIncome ? +(latestFin.operatingIncome * 1.15).toFixed(0) : 3000,
    ltmNetIncome: latestFin.netIncome || 2000,
    ltmRevenue: latestFin.revenue || 10000,
    bookValueOfEquity: latestFin.netIncome ? Math.round(latestFin.netIncome * 8) : Math.round(shares * stock.currentPrice * 0.4),
    netDebt: latestFin.netDebt || 0,
    premiumDiscountFactor: stock.moatRating.includes('Wide') ? 8.0 : stock.moatRating.includes('Narrow') ? 3.0 : 0.0,
    peers: getSectorPeersForStock(stock)
  };

  // RIM Inputs
  const bookValuePerShare = shares > 0 
    ? +(ccaInputs.bookValueOfEquity / shares).toFixed(2) 
    : +(stock.currentPrice * 0.35).toFixed(2);
  const roicOrRoe = stock.roic > 0 ? stock.roic : 15.0;

  const rimInputs: RIMModelInputs = {
    companyName: stock.name,
    ticker: stock.ticker,
    currency: stock.currency,
    currentSharePrice: stock.currentPrice,
    bookValuePerShare: Math.max(1, bookValuePerShare),
    costOfEquity: ke,
    forecastYears: 5,
    projectedRoes: [
      +roicOrRoe.toFixed(1),
      +(roicOrRoe * 0.98).toFixed(1),
      +(roicOrRoe * 0.95).toFixed(1),
      +(roicOrRoe * 0.92).toFixed(1),
      +(roicOrRoe * 0.90).toFixed(1)
    ],
    dividendPayoutRatio: stock.dividendYield > 0 ? Math.min(75, Math.max(20, Math.round(stock.dividendYield * 12))) : 30,
    persistenceFactor: stock.moatRating.includes('Wide') ? 0.75 : 0.55
  };

  return {
    id: stock.ticker,
    name: stock.name,
    ticker: stock.ticker,
    sector: `${stock.sector} (${stock.industry})`,
    description: `已与【个股深度研报】自动双向链接：${stock.name} (${stock.ticker})，包含最新财务报表、EBITDA利润率与现金流折现假设。`,
    dcfInputs,
    ddmInputs,
    ccaInputs,
    rimInputs
  };
}
