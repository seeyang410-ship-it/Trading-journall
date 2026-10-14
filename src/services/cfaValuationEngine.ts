import {
  DCFModelInputs,
  DCFModelResults,
  FCFFYearProjection,
  DDMModelInputs,
  DDMModelResults,
  CCAModelInputs,
  CCAModelResults,
  RIMModelInputs,
  RIMModelResults,
  FootballFieldItem,
  CFARating
} from '../types/valuation';

/**
 * Determine CFA investment rating from upside/downside percentage
 */
export function getCFARating(upsidePercent: number): CFARating {
  if (upsidePercent >= 22) return 'STRONG_BUY';
  if (upsidePercent >= 8) return 'BUY';
  if (upsidePercent >= -8) return 'HOLD';
  if (upsidePercent >= -22) return 'SELL';
  return 'STRONG_SELL';
}

export function getCFARatingLabel(rating: CFARating): { label: string; color: string; badge: string; desc: string } {
  switch (rating) {
    case 'STRONG_BUY':
      return { 
        label: '强力买入 (Strong Buy)', 
        color: 'text-emerald-400', 
        badge: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        desc: '内在价值大幅高于当前市价 (>22%)，安全边际极高，具备绝佳风险收益比'
      };
    case 'BUY':
      return { 
        label: '买入 (Buy)', 
        color: 'text-green-400', 
        badge: 'bg-green-500/15 border-green-500/30 text-green-300',
        desc: '内在价值高于当前市价 (8%~22%)，具备合理安全边际'
      };
    case 'HOLD':
      return { 
        label: '持有/观望 (Hold)', 
        color: 'text-amber-400', 
        badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        desc: '现价基本充分反映基本面估值 (-8%~8%)，建议观望等待更好买点'
      };
    case 'SELL':
      return { 
        label: '适度减持 (Underperform/Sell)', 
        color: 'text-orange-400', 
        badge: 'bg-orange-500/15 border-orange-500/30 text-orange-300',
        desc: '估值已透支基本面成长 (-8%~-22%)，建议逢高锁定利润或减持'
      };
    case 'STRONG_SELL':
      return { 
        label: '强力卖出 (Strong Sell)', 
        color: 'text-rose-400', 
        badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
        desc: '股价严重脱离内在公允价值 (低估幅度 <-22%)，泡沫风险巨大'
      };
  }
}

/**
 * 1. DCF (FCFF) Free Cash Flow to Firm Calculation Engine
 */
export function calculateDCF(inputs: DCFModelInputs): DCFModelResults {
  // 1. CAPM & WACC
  const rf = inputs.riskFreeRate / 100;
  const erp = inputs.equityRiskPremium / 100;
  const beta = inputs.beta;
  const costOfEquity = rf + beta * erp; // Ke = Rf + Beta * ERP
  
  const kdPreTax = inputs.preTaxCostOfDebt / 100;
  const taxRate = inputs.taxRate / 100;
  const afterTaxCostOfDebt = kdPreTax * (1 - taxRate); // Kd * (1 - t)
  
  const totalWeight = inputs.weightOfEquity + inputs.weightOfDebt;
  const we = totalWeight > 0 ? inputs.weightOfEquity / totalWeight : 1;
  const wd = totalWeight > 0 ? inputs.weightOfDebt / totalWeight : 0;
  
  // WACC = We * Ke + Wd * Kd * (1 - t)
  const wacc = we * costOfEquity + wd * afterTaxCostOfDebt;
  
  // 2. Explicit 5-Year Pro-Forma Projections
  const years = Math.max(1, Math.min(inputs.forecastYears || 5, 10));
  const projections: FCFFYearProjection[] = [];
  
  let currentRev = inputs.baseRevenue;
  let cumulativePvFcff = 0;
  
  const daRatio = inputs.daPercentOfRevenue / 100;
  const capexRatio = inputs.capexPercentOfRevenue / 100;
  const nwcDeltaRatio = inputs.nwcPercentOfRevenueDelta / 100;
  
  for (let i = 0; i < years; i++) {
    const growth = (inputs.revenueGrowthRates[i] ?? (inputs.revenueGrowthRates[inputs.revenueGrowthRates.length - 1] || 5)) / 100;
    const margin = (inputs.ebitMargins[i] ?? (inputs.ebitMargins[inputs.ebitMargins.length - 1] || 20)) / 100;
    
    const prevRev = currentRev;
    const projectedRev = prevRev * (1 + growth);
    const revDelta = projectedRev - prevRev;
    
    const ebit = projectedRev * margin;
    const taxes = Math.max(0, ebit * taxRate);
    const nopat = ebit - taxes;
    
    const da = projectedRev * daRatio;
    const capex = projectedRev * capexRatio;
    const nwcChange = revDelta * nwcDeltaRatio;
    
    // FCFF = NOPAT + D&A - CapEx - Delta NWC
    const fcff = nopat + da - capex - nwcChange;
    
    const period = i + 1;
    // Discount factor = 1 / (1 + WACC)^t
    const discountFactor = Math.pow(1 + Math.max(0.001, wacc), -period);
    const pvFcff = fcff * discountFactor;
    
    cumulativePvFcff += pvFcff;
    
    projections.push({
      year: period,
      yearLabel: `第 ${period} 年 (Y+${period})`,
      revenue: projectedRev,
      growthRate: growth * 100,
      ebit,
      ebitMargin: margin * 100,
      taxes,
      nopat,
      da,
      capex,
      nwcChange,
      fcff,
      discountPeriod: period,
      discountFactor,
      pvFcff
    });
    
    currentRev = projectedRev;
  }
  
  const lastYearProj = projections[projections.length - 1];
  const lastFcff = lastYearProj ? lastYearProj.fcff : 100;
  const lastEbitda = lastYearProj ? (lastYearProj.ebit + lastYearProj.da) : 120;
  
  // 3. Terminal Value
  const g = inputs.terminalGrowthRate / 100;
  const terminalDiscountFactor = Math.pow(1 + Math.max(0.001, wacc), -years);
  
  // Gordon Growth: TV = FCFF_n * (1 + g) / (WACC - g)
  let terminalValueGordon = 0;
  if (wacc > g) {
    terminalValueGordon = (lastFcff * (1 + g)) / (wacc - g);
  } else {
    // Edge fallback if WACC <= g
    terminalValueGordon = (lastFcff * (1 + g)) / 0.02;
  }
  const pvTerminalValueGordon = terminalValueGordon * terminalDiscountFactor;
  
  // Exit Multiple: TV = EBITDA_n * ExitMultiple
  const exitMultiple = Math.max(1, inputs.exitEbitdaMultiple || 12);
  const terminalValueExitMultiple = lastEbitda * exitMultiple;
  const pvTerminalValueExitMultiple = terminalValueExitMultiple * terminalDiscountFactor;
  
  // Selected TV based on method
  let selectedPvTerminal = pvTerminalValueGordon;
  if (inputs.terminalMethod === 'EXIT_MULTIPLE') {
    selectedPvTerminal = pvTerminalValueExitMultiple;
  } else if (inputs.terminalMethod === 'AVERAGE') {
    selectedPvTerminal = (pvTerminalValueGordon + pvTerminalValueExitMultiple) / 2;
  }
  
  // 4. EV to Equity Bridge
  const enterpriseValue = cumulativePvFcff + selectedPvTerminal;
  const netDebt = inputs.totalDebt - inputs.cashAndEquivalents + inputs.minorityInterest;
  const equityValue = enterpriseValue - netDebt;
  
  const shares = Math.max(0.0001, inputs.dilutedShares || 1);
  const intrinsicValuePerShare = equityValue / shares;
  
  const currentPrice = Math.max(0.0001, inputs.currentSharePrice || 1);
  const upsideDownsidePercent = ((intrinsicValuePerShare - currentPrice) / currentPrice) * 100;
  const cfaRating = getCFARating(upsideDownsidePercent);
  const marginOfSafetyPrice = intrinsicValuePerShare * 0.8; // 20% margin of safety
  
  // 5. 5x5 Sensitivity Analysis Matrix (WACC vs Terminal Growth Rate)
  const baseWaccPct = wacc * 100;
  const baseGPct = inputs.terminalGrowthRate;
  
  const waccDeltas = [-1.0, -0.5, 0.0, 0.5, 1.0];
  const gDeltas = [-0.5, -0.25, 0.0, 0.25, 0.5];
  
  const waccSteps = waccDeltas.map(d => +(baseWaccPct + d).toFixed(2));
  const gSteps = gDeltas.map(d => +(baseGPct + d).toFixed(2));
  
  const matrix: number[][] = [];
  
  for (let r = 0; r < waccSteps.length; r++) {
    const rowPrices: number[] = [];
    const testWacc = waccSteps[r] / 100;
    
    // Recalculate PV of explicit FCFF for this testWacc
    let testCumPvFcff = 0;
    for (let i = 0; i < projections.length; i++) {
      const pFcff = projections[i].fcff;
      const pFact = Math.pow(1 + Math.max(0.001, testWacc), -(i + 1));
      testCumPvFcff += pFcff * pFact;
    }
    const testTerminalDiscount = Math.pow(1 + Math.max(0.001, testWacc), -years);
    
    for (let c = 0; c < gSteps.length; c++) {
      const testG = gSteps[c] / 100;
      let testTv = 0;
      if (testWacc > testG) {
        testTv = (lastFcff * (1 + testG)) / (testWacc - testG);
      } else {
        testTv = (lastFcff * (1 + testG)) / 0.015;
      }
      const testPvTv = testTv * testTerminalDiscount;
      const testEv = testCumPvFcff + testPvTv;
      const testEq = testEv - netDebt;
      const testPrice = +(testEq / shares).toFixed(2);
      rowPrices.push(Math.max(0, testPrice));
    }
    matrix.push(rowPrices);
  }
  
  return {
    costOfEquity: +(costOfEquity * 100).toFixed(2),
    afterTaxCostOfDebt: +(afterTaxCostOfDebt * 100).toFixed(2),
    wacc: +(wacc * 100).toFixed(2),
    projections,
    cumulativePvFcff: +cumulativePvFcff.toFixed(2),
    terminalValueGordon: +terminalValueGordon.toFixed(2),
    pvTerminalValueGordon: +pvTerminalValueGordon.toFixed(2),
    terminalValueExitMultiple: +terminalValueExitMultiple.toFixed(2),
    pvTerminalValueExitMultiple: +pvTerminalValueExitMultiple.toFixed(2),
    enterpriseValue: +enterpriseValue.toFixed(2),
    netDebt: +netDebt.toFixed(2),
    equityValue: +equityValue.toFixed(2),
    intrinsicValuePerShare: +intrinsicValuePerShare.toFixed(2),
    upsideDownsidePercent: +upsideDownsidePercent.toFixed(1),
    cfaRating,
    marginOfSafetyPrice: +marginOfSafetyPrice.toFixed(2),
    sensitivityTable: {
      waccSteps,
      gSteps,
      matrix
    }
  };
}

/**
 * 2. DDM (Dividend Discount Model) Engine
 */
export function calculateDDM(inputs: DDMModelInputs): DDMModelResults {
  const ke = inputs.costOfEquity / 100;
  const g1 = inputs.highGrowthRate / 100;
  const g2 = inputs.terminalGrowthRate / 100;
  const years = Math.max(1, inputs.highGrowthYears || 5);
  
  let currentDiv = inputs.currentDividendPerShare;
  const projectedDividends: { year: number; dividend: number; pv: number }[] = [];
  let pvExplicitDividends = 0;
  
  for (let i = 1; i <= years; i++) {
    currentDiv = currentDiv * (1 + g1);
    const pv = currentDiv / Math.pow(1 + Math.max(0.001, ke), i);
    pvExplicitDividends += pv;
    projectedDividends.push({
      year: i,
      dividend: +currentDiv.toFixed(2),
      pv: +pv.toFixed(2)
    });
  }
  
  // Terminal Price = D_{N+1} / (Ke - g2)
  const divNext = currentDiv * (1 + g2);
  let terminalSharePrice = 0;
  if (ke > g2) {
    terminalSharePrice = divNext / (ke - g2);
  } else {
    terminalSharePrice = divNext / 0.015;
  }
  
  const pvTerminalPrice = terminalSharePrice / Math.pow(1 + Math.max(0.001, ke), years);
  const intrinsicValuePerShare = +(pvExplicitDividends + pvTerminalPrice).toFixed(2);
  
  // H-Model approximation: P0 = [D0 * (1 + g2) + D0 * H * (g1 - g2)] / (Ke - g2)
  const H = (inputs.hModelHalfLifeYears || years) / 2;
  let hModelIntrinsicValue = intrinsicValuePerShare;
  if (ke > g2) {
    hModelIntrinsicValue = +(
      (inputs.currentDividendPerShare * (1 + g2) + inputs.currentDividendPerShare * H * (g1 - g2)) /
      (ke - g2)
    ).toFixed(2);
  }
  
  const currentPrice = Math.max(0.0001, inputs.currentSharePrice || 1);
  const upsideDownsidePercent = +(((intrinsicValuePerShare - currentPrice) / currentPrice) * 100).toFixed(1);
  const cfaRating = getCFARating(upsideDownsidePercent);
  
  return {
    projectedDividends,
    pvExplicitDividends: +pvExplicitDividends.toFixed(2),
    terminalSharePrice: +terminalSharePrice.toFixed(2),
    pvTerminalPrice: +pvTerminalPrice.toFixed(2),
    intrinsicValuePerShare,
    hModelIntrinsicValue,
    upsideDownsidePercent,
    cfaRating
  };
}

/**
 * 3. CCA (Comparable Company Analysis) Relative Multiples Engine
 */
export function calculateCCA(inputs: CCAModelInputs): CCAModelResults {
  const peers = inputs.peers || [];
  const premiumFactor = 1 + (inputs.premiumDiscountFactor || 0) / 100;
  const shares = Math.max(0.0001, inputs.dilutedShares || 1);
  
  const getMedian = (nums: number[]) => {
    const valid = nums.filter(n => n > 0).sort((a, b) => a - b);
    if (!valid.length) return 15;
    const mid = Math.floor(valid.length / 2);
    return valid.length % 2 !== 0 ? valid[mid] : (valid[mid - 1] + valid[mid]) / 2;
  };
  
  const medianEvEbitda = +getMedian(peers.map(p => p.evEbitda)).toFixed(1);
  const medianPe = +getMedian(peers.map(p => p.pe)).toFixed(1);
  const medianPs = +getMedian(peers.map(p => p.ps)).toFixed(1);
  const medianPb = +getMedian(peers.map(p => p.pb)).toFixed(1);
  
  // Implied share prices:
  // EV/EBITDA
  const impliedEv = inputs.ltmEbitda * medianEvEbitda * premiumFactor;
  const impliedEquityFromEv = impliedEv - inputs.netDebt;
  const impliedPriceEvEbitda = +(Math.max(0, impliedEquityFromEv) / shares).toFixed(2);
  
  // P/E
  const eps = inputs.ltmNetIncome / shares;
  const impliedPricePe = +(Math.max(0, eps) * medianPe * premiumFactor).toFixed(2);
  
  // P/S
  const sps = inputs.ltmRevenue / shares;
  const impliedPricePs = +(Math.max(0, sps) * medianPs * premiumFactor).toFixed(2);
  
  // P/B
  const bvps = inputs.bookValueOfEquity / shares;
  const impliedPricePb = +(Math.max(0, bvps) * medianPb * premiumFactor).toFixed(2);
  
  // Blended average: giving 40% EV/EBITDA, 35% PE, 15% PS, 10% PB
  const blendedTargetPrice = +(
    impliedPriceEvEbitda * 0.40 +
    impliedPricePe * 0.35 +
    impliedPricePs * 0.15 +
    impliedPricePb * 0.10
  ).toFixed(2);
  
  const currentPrice = Math.max(0.0001, inputs.currentSharePrice || 1);
  const upsideDownsidePercent = +(((blendedTargetPrice - currentPrice) / currentPrice) * 100).toFixed(1);
  const cfaRating = getCFARating(upsideDownsidePercent);
  
  return {
    medianEvEbitda,
    medianPe,
    medianPs,
    medianPb,
    impliedPriceEvEbitda,
    impliedPricePe,
    impliedPricePs,
    impliedPricePb,
    blendedTargetPrice,
    upsideDownsidePercent,
    cfaRating
  };
}

/**
 * 4. Residual Income Model (RIM / EVA) Engine
 */
export function calculateRIM(inputs: RIMModelInputs): RIMModelResults {
  const r = inputs.costOfEquity / 100;
  const omega = Math.min(0.99, Math.max(0, inputs.persistenceFactor || 0.65));
  const years = Math.max(1, inputs.forecastYears || 5);
  const payout = inputs.dividendPayoutRatio / 100;
  
  let currentBv = inputs.bookValuePerShare;
  let cumulativePvRI = 0;
  
  const projections: RIMModelResults['projections'] = [];
  
  for (let i = 1; i <= years; i++) {
    const roe = (inputs.projectedRoes[i - 1] ?? 18) / 100;
    const eps = currentBv * roe;
    const div = eps * payout;
    const endingBv = currentBv + eps - div;
    
    // Equity charge = Beg BV * r
    const equityCharge = currentBv * r;
    // Residual income = EPS - Equity charge = Beg BV * (ROE - r)
    const residualIncome = eps - equityCharge;
    
    const discountFactor = Math.pow(1 + Math.max(0.001, r), -i);
    const pvResidualIncome = residualIncome * discountFactor;
    cumulativePvRI += pvResidualIncome;
    
    projections.push({
      year: i,
      bookValueBegin: +currentBv.toFixed(2),
      eps: +eps.toFixed(2),
      dividends: +div.toFixed(2),
      bookValueEnd: +endingBv.toFixed(2),
      roe: +(roe * 100).toFixed(1),
      equityCharge: +equityCharge.toFixed(2),
      residualIncome: +residualIncome.toFixed(2),
      discountFactor: +discountFactor.toFixed(4),
      pvResidualIncome: +pvResidualIncome.toFixed(2)
    });
    
    currentBv = endingBv;
  }
  
  const lastRI = projections[projections.length - 1]?.residualIncome || 0;
  // Terminal Residual Income = RI_N * omega / (1 + r - omega)
  const denom = (1 + r) - omega;
  const terminalRI = denom > 0.001 ? (lastRI * omega) / denom : 0;
  const terminalDiscount = Math.pow(1 + Math.max(0.001, r), -years);
  const pvTerminalRI = +(terminalRI * terminalDiscount).toFixed(2);
  
  // Intrinsic Value = B0 + Sum(PV of RI) + PV of Terminal RI
  const intrinsicValuePerShare = +(inputs.bookValuePerShare + cumulativePvRI + pvTerminalRI).toFixed(2);
  const impliedPb = inputs.bookValuePerShare > 0 ? +(intrinsicValuePerShare / inputs.bookValuePerShare).toFixed(2) : 1;
  
  const currentPrice = Math.max(0.0001, inputs.currentSharePrice || 1);
  const upsideDownsidePercent = +(((intrinsicValuePerShare - currentPrice) / currentPrice) * 100).toFixed(1);
  const cfaRating = getCFARating(upsideDownsidePercent);
  
  return {
    projections,
    cumulativePvRI: +cumulativePvRI.toFixed(2),
    pvTerminalRI,
    intrinsicValuePerShare,
    impliedPb,
    upsideDownsidePercent,
    cfaRating
  };
}

/**
 * 5. Football Field Summary Across Models
 */
export function buildFootballFieldItems(
  dcf: DCFModelResults,
  ddm: DDMModelResults,
  cca: CCAModelResults,
  rim: RIMModelResults,
  currentPrice: number
): FootballFieldItem[] {
  return [
    {
      methodName: 'FCFF 现金流折现 (永续增长法)',
      methodLabelEn: 'DCF (Gordon Growth)',
      minPrice: +(dcf.intrinsicValuePerShare * 0.88).toFixed(2),
      basePrice: dcf.intrinsicValuePerShare,
      maxPrice: +(dcf.intrinsicValuePerShare * 1.15).toFixed(2),
      weight: 35
    },
    {
      methodName: 'FCFF 现金流折现 (退出乘数法)',
      methodLabelEn: 'DCF (Exit Multiple)',
      minPrice: +(dcf.intrinsicValuePerShare * 0.85).toFixed(2),
      basePrice: +(dcf.intrinsicValuePerShare * 1.04).toFixed(2),
      maxPrice: +(dcf.intrinsicValuePerShare * 1.20).toFixed(2),
      weight: 25
    },
    {
      methodName: '可比公司相对估值 (CCA EV/EBITDA)',
      methodLabelEn: 'CCA (EV/EBITDA)',
      minPrice: +(cca.impliedPriceEvEbitda * 0.90).toFixed(2),
      basePrice: cca.impliedPriceEvEbitda,
      maxPrice: +(cca.impliedPriceEvEbitda * 1.12).toFixed(2),
      weight: 15
    },
    {
      methodName: '可比公司市盈率估值 (CCA P/E)',
      methodLabelEn: 'CCA (P/E Multiple)',
      minPrice: +(cca.impliedPricePe * 0.88).toFixed(2),
      basePrice: cca.impliedPricePe,
      maxPrice: +(cca.impliedPricePe * 1.14).toFixed(2),
      weight: 10
    },
    {
      methodName: '超额收益模型 (Residual Income)',
      methodLabelEn: 'Residual Income (RIM)',
      minPrice: +(rim.intrinsicValuePerShare * 0.92).toFixed(2),
      basePrice: rim.intrinsicValuePerShare,
      maxPrice: +(rim.intrinsicValuePerShare * 1.10).toFixed(2),
      weight: 10
    },
    {
      methodName: '股利折现模型 (DDM / H-Model)',
      methodLabelEn: 'Dividend Discount (DDM)',
      minPrice: +(ddm.intrinsicValuePerShare * 0.90).toFixed(2),
      basePrice: ddm.intrinsicValuePerShare,
      maxPrice: +(ddm.intrinsicValuePerShare * 1.12).toFixed(2),
      weight: 5
    }
  ];
}
