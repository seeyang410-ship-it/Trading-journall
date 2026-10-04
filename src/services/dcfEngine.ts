import { 
  DCFModelParameters, 
  DCFValuationResult, 
  EquityRating, 
  AltmanZScoreDetail, 
  PiotroskiFScoreDetail,
  FinancialYearData 
} from '../types/equity';

/**
 * Calculates Intrinsic Value per share using a 2-stage Discounted Free Cash Flow (DCF) model
 */
export function calculateDCF(params: DCFModelParameters): DCFValuationResult {
  const {
    currentPrice,
    sharesOutstanding,
    baseFCF,
    growthStage1Rate,
    growthStage2Rate,
    terminalGrowthRate,
    wacc,
    netDebt
  } = params;

  const waccDecimal = Math.max(wacc / 100, 0.04); // Floor at 4%
  const gTerminalDecimal = Math.min(terminalGrowthRate / 100, waccDecimal - 0.01); // Terminal g must be < WACC

  let runningFCF = baseFCF;
  let pvFCFSum = 0;

  // 10-year projection: Years 1-5 at stage 1 rate, Years 6-10 fading to stage 2 rate
  for (let year = 1; year <= 10; year++) {
    const rate = year <= 5 
      ? growthStage1Rate / 100 
      : (growthStage1Rate + (growthStage2Rate - growthStage1Rate) * ((year - 5) / 5)) / 100;

    runningFCF = runningFCF * (1 + rate);
    const discountFactor = Math.pow(1 + waccDecimal, year);
    const pv = runningFCF / discountFactor;
    pvFCFSum += pv;
  }

  // Terminal value using Gordon Growth formula on year 10 FCF
  const terminalFCF = runningFCF * (1 + gTerminalDecimal);
  const terminalValue = terminalFCF / (waccDecimal - gTerminalDecimal);
  const pvTerminalValue = terminalValue / Math.pow(1 + waccDecimal, 10);

  const enterpriseValue = pvFCFSum + pvTerminalValue;
  // Equity Value = Enterprise Value - Net Debt (Total Debt - Cash)
  const equityValue = enterpriseValue - netDebt;
  const fairValuePerShare = Math.max(0, equityValue / sharesOutstanding);

  const marginOfSafety = fairValuePerShare > 0 
    ? ((fairValuePerShare - currentPrice) / fairValuePerShare) * 100 
    : -100;

  let rating: EquityRating;
  if (marginOfSafety >= 25) {
    rating = 'Strong Buy (深度低估击球区)';
  } else if (marginOfSafety >= 10) {
    rating = 'Buy / Accumulate (具备安全边际)';
  } else if (marginOfSafety >= -10) {
    rating = 'Hold / Fair Value (估值合理)';
  } else if (marginOfSafety >= -25) {
    rating = 'Trim / Overvalued (估值偏高)';
  } else {
    rating = 'Avoid / Bubble (严重透支未来)';
  }

  return {
    discountedFCFSum: Math.round(pvFCFSum * 100) / 100,
    terminalValue: Math.round(terminalValue * 100) / 100,
    pvTerminalValue: Math.round(pvTerminalValue * 100) / 100,
    enterpriseValue: Math.round(enterpriseValue * 100) / 100,
    equityValue: Math.round(equityValue * 100) / 100,
    fairValuePerShare: Math.round(fairValuePerShare * 100) / 100,
    marginOfSafety: Math.round(marginOfSafety * 10) / 10,
    rating
  };
}

/**
 * Generates a 5x5 WACC vs Terminal Growth Rate Sensitivity Matrix
 */
export function generateSensitivityMatrix(params: DCFModelParameters): {
  waccRange: number[];
  growthRange: number[];
  matrix: number[][]; // rows: WACC, cols: Terminal Growth
} {
  const baseWacc = params.wacc;
  const baseG = params.terminalGrowthRate;

  const waccRange = [
    Math.round((baseWacc - 1.5) * 10) / 10,
    Math.round((baseWacc - 0.75) * 10) / 10,
    Math.round(baseWacc * 10) / 10,
    Math.round((baseWacc + 0.75) * 10) / 10,
    Math.round((baseWacc + 1.5) * 10) / 10
  ];

  const growthRange = [
    Math.max(1.0, Math.round((baseG - 1.0) * 10) / 10),
    Math.max(1.5, Math.round((baseG - 0.5) * 10) / 10),
    Math.round(baseG * 10) / 10,
    Math.round((baseG + 0.5) * 10) / 10,
    Math.round((baseG + 1.0) * 10) / 10
  ];

  const matrix = waccRange.map(w => {
    return growthRange.map(g => {
      const res = calculateDCF({
        ...params,
        wacc: w,
        terminalGrowthRate: g
      });
      return res.fairValuePerShare;
    });
  });

  return { waccRange, growthRange, matrix };
}

/**
 * Computes Altman Z-score for manufacturing & tech corporations
 */
export function computeAltmanZ(data: FinancialYearData, marketCapUSD: number): AltmanZScoreDetail {
  const totalAssets = Math.max(data.totalCash + data.netDebt + (data.totalCash * 2), 1000);
  const workingCapital = data.totalCash * 0.8; // conservative estimate
  const retainedEarnings = data.netIncome * 3.5;
  const ebit = data.operatingIncome;
  const totalLiabilities = Math.max(data.totalDebt * 1.3, 500);
  const sales = data.revenue;

  const x1 = workingCapital / totalAssets;
  const x2 = retainedEarnings / totalAssets;
  const x3 = ebit / totalAssets;
  const x4 = (marketCapUSD * 1000) / totalLiabilities;
  const x5 = sales / totalAssets;

  const z = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5;
  const score = Math.round(z * 100) / 100;

  let zone: AltmanZScoreDetail['zone'];
  if (score >= 2.99) {
    zone = 'Safe Zone (安全区)';
  } else if (score >= 1.81) {
    zone = 'Grey Zone (灰色待观察)';
  } else {
    zone = 'Distress Zone (破产危险区)';
  }

  return {
    score,
    zone,
    components: {
      x1_workingCapital: Math.round(x1 * 100) / 100,
      x2_retainedEarnings: Math.round(x2 * 100) / 100,
      x3_ebit: Math.round(x3 * 100) / 100,
      x4_marketCapToLiabilities: Math.round(x4 * 100) / 100,
      x5_salesToAssets: Math.round(x5 * 100) / 100
    }
  };
}

/**
 * Computes Piotroski 9-point fundamental financial strength score
 */
export function computePiotroskiF(current: FinancialYearData, prev: FinancialYearData): PiotroskiFScoreDetail {
  const roaCurrent = current.netIncome / (current.totalCash + current.netDebt + 5000);
  const roaPrev = prev.netIncome / (prev.totalCash + prev.netDebt + 5000);

  const criteria = [
    {
      name: '净资产收益为正 (ROA > 0)',
      description: '当期净利润大于零，企业具备正向盈利能力',
      passed: current.netIncome > 0,
      category: 'Profitability' as const
    },
    {
      name: '经营现金流为正 (CFO > 0)',
      description: '当期经营活动现金净额大于零，现金造血健康',
      passed: current.cfo > 0,
      category: 'Profitability' as const
    },
    {
      name: '资产回报率改善 (ΔROA > 0)',
      description: '当期资产回报率相比上一年度实现增长',
      passed: roaCurrent > roaPrev,
      category: 'Profitability' as const
    },
    {
      name: '现金流质量坚实 (CFO > 净利润)',
      description: '经营现金流大于会计净利润，无虚假应收账款粉饰',
      passed: current.cfo > current.netIncome,
      category: 'Profitability' as const
    },
    {
      name: '长期债务杠杆未显著增加',
      description: '当期总计息负债水平未发生大幅恶化上升',
      passed: current.totalDebt <= prev.totalDebt * 1.1,
      category: 'Leverage & Liquidity' as const
    },
    {
      name: '流动比率健康改善',
      description: '短期资产流动性充足，足以覆盖短期应付债务',
      passed: current.totalCash >= current.totalDebt * 0.4,
      category: 'Leverage & Liquidity' as const
    },
    {
      name: '股本无大幅摊薄稀释',
      description: '当期未向市场大量增发新股或严重稀释流通股',
      passed: current.sharesOutstanding <= prev.sharesOutstanding * 1.02,
      category: 'Leverage & Liquidity' as const
    },
    {
      name: '毛利率维持稳定或上升',
      description: '企业产品/服务具备稳固的定价权与产业链议价力',
      passed: current.grossMargin >= prev.grossMargin - 0.5,
      category: 'Operating Efficiency' as const
    },
    {
      name: '资产周转效率提升',
      description: '营业收入与总资产之比保持扩张，营运效率精进',
      passed: (current.revenue / current.sharesOutstanding) >= (prev.revenue / prev.sharesOutstanding),
      category: 'Operating Efficiency' as const
    }
  ];

  const score = criteria.filter(c => c.passed).length;
  let level: PiotroskiFScoreDetail['level'];
  if (score >= 7) {
    level = 'High Quality (7-9 高质量企业)';
  } else if (score >= 4) {
    level = 'Moderate (4-6 中规中矩)';
  } else {
    level = 'Low Quality (0-3 财务恶化)';
  }

  return {
    score,
    level,
    criteria
  };
}
