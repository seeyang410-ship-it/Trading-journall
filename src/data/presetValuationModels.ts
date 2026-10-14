import { PresetValuationCompany } from '../types/valuation';

export const PRESET_VALUATION_COMPANIES: PresetValuationCompany[] = [
  {
    id: 'AAPL',
    name: '苹果公司 (Apple Inc.)',
    ticker: 'AAPL',
    sector: '消费电子 / 软件与服务生态',
    description: '全球消费电子与高毛利生态龙头，拥有极其充沛且可预测的自由现金流 (FCF) 与高 ROIC。',
    dcfInputs: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      currency: 'USD',
      currentSharePrice: 228.50,
      dilutedShares: 15120, // 15.12B shares
      baseRevenue: 385600, // $385.6B
      forecastYears: 5,
      revenueGrowthRates: [7.5, 8.2, 7.8, 6.5, 5.5],
      ebitMargins: [31.5, 32.0, 32.5, 32.5, 32.0],
      taxRate: 15.8,
      daPercentOfRevenue: 3.1,
      capexPercentOfRevenue: 2.8,
      nwcPercentOfRevenueDelta: 2.0,
      riskFreeRate: 4.10,
      equityRiskPremium: 5.20,
      beta: 1.10,
      preTaxCostOfDebt: 4.50,
      weightOfEquity: 92.0,
      weightOfDebt: 8.0,
      terminalGrowthRate: 3.0,
      exitEbitdaMultiple: 22.0,
      terminalMethod: 'AVERAGE',
      cashAndEquivalents: 65200, // $65.2B
      totalDebt: 106500, // $106.5B
      minorityInterest: 0
    },
    ddmInputs: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      currency: 'USD',
      currentSharePrice: 228.50,
      currentDividendPerShare: 1.00,
      costOfEquity: 9.82,
      highGrowthRate: 8.5,
      highGrowthYears: 5,
      terminalGrowthRate: 5.0,
      hModelHalfLifeYears: 4
    },
    ccaInputs: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      currency: 'USD',
      currentSharePrice: 228.50,
      dilutedShares: 15120,
      ltmEbitda: 133400,
      ltmNetIncome: 101800,
      ltmRevenue: 385600,
      bookValueOfEquity: 62100,
      netDebt: 41300,
      premiumDiscountFactor: 8.0, // Moat & ecosystem premium
      peers: [
        { ticker: 'MSFT', name: '微软 (Microsoft)', evEbitda: 24.5, pe: 32.8, ps: 11.2, pb: 11.5 },
        { ticker: 'GOOGL', name: '谷歌 (Alphabet)', evEbitda: 17.8, pe: 23.5, ps: 6.1, pb: 6.8 },
        { ticker: 'META', name: 'Meta Platforms', evEbitda: 18.2, pe: 24.1, ps: 7.9, pb: 7.2 },
        { ticker: 'AMZN', name: '亚马逊 (Amazon)', evEbitda: 16.5, pe: 38.0, ps: 3.2, pb: 7.8 }
      ]
    },
    rimInputs: {
      companyName: 'Apple Inc.',
      ticker: 'AAPL',
      currency: 'USD',
      currentSharePrice: 228.50,
      bookValuePerShare: 4.11,
      costOfEquity: 9.82,
      forecastYears: 5,
      projectedRoes: [145.0, 150.0, 155.0, 150.0, 140.0], // Apple's ROE is exceptionally high due to buybacks
      dividendPayoutRatio: 15.0,
      persistenceFactor: 0.85
    }
  },
  {
    id: '0700.HK',
    name: '腾讯控股 (Tencent Holdings)',
    ticker: '0700.HK',
    sector: '互动娱乐 / 微信生态与企业服务',
    description: '中国互联网与全球游戏巨头，拥有微信护城河、强大的投资组合与高确定性分红回购。',
    dcfInputs: {
      companyName: 'Tencent Holdings',
      ticker: '0700.HK',
      currency: 'HKD',
      currentSharePrice: 428.00,
      dilutedShares: 9380, // 9.38B shares
      baseRevenue: 660000, // 660B CNY (~720B HKD)
      forecastYears: 5,
      revenueGrowthRates: [10.5, 11.0, 9.8, 8.5, 7.2],
      ebitMargins: [32.0, 33.0, 33.5, 33.0, 32.5],
      taxRate: 18.0,
      daPercentOfRevenue: 5.2,
      capexPercentOfRevenue: 6.0,
      nwcPercentOfRevenueDelta: 3.5,
      riskFreeRate: 3.50,
      equityRiskPremium: 6.50,
      beta: 1.05,
      preTaxCostOfDebt: 4.20,
      weightOfEquity: 90.0,
      weightOfDebt: 10.0,
      terminalGrowthRate: 2.8,
      exitEbitdaMultiple: 15.5,
      terminalMethod: 'GORDON',
      cashAndEquivalents: 185000,
      totalDebt: 142000,
      minorityInterest: 26000
    },
    ddmInputs: {
      companyName: 'Tencent Holdings',
      ticker: '0700.HK',
      currency: 'HKD',
      currentSharePrice: 428.00,
      currentDividendPerShare: 3.40,
      costOfEquity: 10.33,
      highGrowthRate: 18.0,
      highGrowthYears: 5,
      terminalGrowthRate: 4.5,
      hModelHalfLifeYears: 4
    },
    ccaInputs: {
      companyName: 'Tencent Holdings',
      ticker: '0700.HK',
      currency: 'HKD',
      currentSharePrice: 428.00,
      dilutedShares: 9380,
      ltmEbitda: 245000,
      ltmNetIncome: 168000,
      ltmRevenue: 660000,
      bookValueOfEquity: 920000,
      netDebt: -43000, // Net cash
      premiumDiscountFactor: 10.0,
      peers: [
        { ticker: '9988.HK', name: '阿里巴巴 (Alibaba)', evEbitda: 8.5, pe: 11.2, ps: 1.7, pb: 1.2 },
        { ticker: '3690.HK', name: '美团 (Meituan)', evEbitda: 16.2, pe: 22.0, ps: 2.6, pb: 3.4 },
        { ticker: 'NTES', name: '网易 (NetEase)', evEbitda: 11.8, pe: 14.5, ps: 4.2, pb: 3.6 },
        { ticker: 'BIDU', name: '百度 (Baidu)', evEbitda: 6.8, pe: 9.8, ps: 1.6, pb: 0.9 }
      ]
    },
    rimInputs: {
      companyName: 'Tencent Holdings',
      ticker: '0700.HK',
      currency: 'HKD',
      currentSharePrice: 428.00,
      bookValuePerShare: 98.08,
      costOfEquity: 10.33,
      forecastYears: 5,
      projectedRoes: [22.0, 22.5, 23.0, 22.0, 21.0],
      dividendPayoutRatio: 22.0,
      persistenceFactor: 0.80
    }
  },
  {
    id: '1155.KL',
    name: '马来亚银行 (Maybank)',
    ticker: '1155.KL',
    sector: '商业银行 / 金融服务 (ASEAN Leader)',
    description: '马来西亚第一大金融财团，以稳健的高股息 (6%+)、健康的净息差与强劲的一级资本充足率著称。经典 DDM 范例。',
    dcfInputs: {
      companyName: 'Malayan Banking Berhad',
      ticker: '1155.KL',
      currency: 'MYR',
      currentSharePrice: 10.32,
      dilutedShares: 12060, // 12.06B shares
      baseRevenue: 30800, // MYR 30.8B
      forecastYears: 5,
      revenueGrowthRates: [5.2, 5.5, 5.0, 4.8, 4.5],
      ebitMargins: [42.0, 42.5, 43.0, 42.8, 42.5],
      taxRate: 24.0,
      daPercentOfRevenue: 2.0,
      capexPercentOfRevenue: 2.2,
      nwcPercentOfRevenueDelta: 1.5,
      riskFreeRate: 3.80,
      equityRiskPremium: 5.50,
      beta: 0.85,
      preTaxCostOfDebt: 4.50,
      weightOfEquity: 88.0,
      weightOfDebt: 12.0,
      terminalGrowthRate: 2.5,
      exitEbitdaMultiple: 9.0,
      terminalMethod: 'GORDON',
      cashAndEquivalents: 45000,
      totalDebt: 38000,
      minorityInterest: 3200
    },
    ddmInputs: {
      companyName: 'Malayan Banking Berhad',
      ticker: '1155.KL',
      currency: 'MYR',
      currentSharePrice: 10.32,
      currentDividendPerShare: 0.62,
      costOfEquity: 8.48, // 3.8% + 0.85 * 5.5%
      highGrowthRate: 5.2,
      highGrowthYears: 5,
      terminalGrowthRate: 3.2,
      hModelHalfLifeYears: 4
    },
    ccaInputs: {
      companyName: 'Malayan Banking Berhad',
      ticker: '1155.KL',
      currency: 'MYR',
      currentSharePrice: 10.32,
      dilutedShares: 12060,
      ltmEbitda: 14200,
      ltmNetIncome: 9800,
      ltmRevenue: 30800,
      bookValueOfEquity: 95000,
      netDebt: -7000,
      premiumDiscountFactor: 5.0, // ASEAN premier bank premium
      peers: [
        { ticker: '1295.KL', name: '大众银行 (Public Bank)', evEbitda: 10.2, pe: 11.5, ps: 4.8, pb: 1.45 },
        { ticker: '1023.KL', name: '联昌国际 (CIMB Group)', evEbitda: 9.1, pe: 10.8, ps: 3.9, pb: 1.15 },
        { ticker: '5819.KL', name: '丰隆银行 (Hong Leong)', evEbitda: 9.5, pe: 11.2, ps: 4.2, pb: 1.25 },
        { ticker: 'D05.SI', name: '星展银行 (DBS Group)', evEbitda: 11.2, pe: 12.1, ps: 5.1, pb: 1.55 }
      ]
    },
    rimInputs: {
      companyName: 'Malayan Banking Berhad',
      ticker: '1155.KL',
      currency: 'MYR',
      currentSharePrice: 10.32,
      bookValuePerShare: 7.88,
      costOfEquity: 8.48,
      forecastYears: 5,
      projectedRoes: [11.2, 11.5, 11.8, 11.5, 11.2],
      dividendPayoutRatio: 78.0,
      persistenceFactor: 0.70
    }
  },
  {
    id: 'NVDA',
    name: '英伟达 (NVIDIA Corporation)',
    ticker: 'NVDA',
    sector: '半导体 / 人工智能与加速计算',
    description: '全球 AI 芯片与 CUDA 平台绝对霸主，正在经历数据中心算力资本开支的历史级超级周期。',
    dcfInputs: {
      companyName: 'NVIDIA Corporation',
      ticker: 'NVDA',
      currency: 'USD',
      currentSharePrice: 135.00,
      dilutedShares: 24500, // 24.5B shares
      baseRevenue: 122000, // $122B
      forecastYears: 5,
      revenueGrowthRates: [42.0, 28.0, 20.0, 15.0, 10.0],
      ebitMargins: [62.0, 61.0, 59.0, 57.0, 55.0],
      taxRate: 14.5,
      daPercentOfRevenue: 2.2,
      capexPercentOfRevenue: 3.5,
      nwcPercentOfRevenueDelta: 3.0,
      riskFreeRate: 4.10,
      equityRiskPremium: 5.50,
      beta: 1.45,
      preTaxCostOfDebt: 4.60,
      weightOfEquity: 96.0,
      weightOfDebt: 4.0,
      terminalGrowthRate: 3.5,
      exitEbitdaMultiple: 28.0,
      terminalMethod: 'EXIT_MULTIPLE',
      cashAndEquivalents: 34800,
      totalDebt: 11200,
      minorityInterest: 0
    },
    ddmInputs: {
      companyName: 'NVIDIA Corporation',
      ticker: 'NVDA',
      currency: 'USD',
      currentSharePrice: 135.00,
      currentDividendPerShare: 0.04,
      costOfEquity: 12.08,
      highGrowthRate: 25.0,
      highGrowthYears: 5,
      terminalGrowthRate: 5.0,
      hModelHalfLifeYears: 4
    },
    ccaInputs: {
      companyName: 'NVIDIA Corporation',
      ticker: 'NVDA',
      currency: 'USD',
      currentSharePrice: 135.00,
      dilutedShares: 24500,
      ltmEbitda: 76000,
      ltmNetIncome: 63000,
      ltmRevenue: 122000,
      bookValueOfEquity: 58000,
      netDebt: -23600,
      premiumDiscountFactor: 15.0, // Moat & CUDA monopoly
      peers: [
        { ticker: 'AMD', name: '超威半导体 (AMD)', evEbitda: 32.0, pe: 42.0, ps: 9.8, pb: 4.5 },
        { ticker: 'AVGO', name: '博通 (Broadcom)', evEbitda: 26.5, pe: 35.0, ps: 14.2, pb: 9.8 },
        { ticker: 'QCOM', name: '高通 (Qualcomm)', evEbitda: 14.5, pe: 18.0, ps: 4.5, pb: 6.2 },
        { ticker: 'TSM', name: '台积电 (TSMC)', evEbitda: 14.8, pe: 21.0, ps: 9.5, pb: 5.8 }
      ]
    },
    rimInputs: {
      companyName: 'NVIDIA Corporation',
      ticker: 'NVDA',
      currency: 'USD',
      currentSharePrice: 135.00,
      bookValuePerShare: 2.37,
      costOfEquity: 12.08,
      forecastYears: 5,
      projectedRoes: [95.0, 90.0, 80.0, 70.0, 60.0],
      dividendPayoutRatio: 5.0,
      persistenceFactor: 0.88
    }
  },
  {
    id: 'CUSTOM_BLANK',
    name: '➕ 自定义公司 (从零输入财报数据)',
    ticker: 'MY_CO',
    sector: '全行业通用 CFA 估值工作底稿',
    description: '空白专业估值底稿：手动输入营收、增速、EBIT利润率、WACC各参数与同行倍数，免去编写复杂 Excel 公式。',
    dcfInputs: {
      companyName: 'My Target Enterprise',
      ticker: 'TARGET',
      currency: 'USD',
      currentSharePrice: 50.00,
      dilutedShares: 1000,
      baseRevenue: 10000,
      forecastYears: 5,
      revenueGrowthRates: [15.0, 12.0, 10.0, 8.0, 6.0],
      ebitMargins: [20.0, 20.5, 21.0, 21.0, 21.0],
      taxRate: 21.0,
      daPercentOfRevenue: 4.0,
      capexPercentOfRevenue: 5.0,
      nwcPercentOfRevenueDelta: 3.0,
      riskFreeRate: 4.00,
      equityRiskPremium: 5.50,
      beta: 1.15,
      preTaxCostOfDebt: 5.00,
      weightOfEquity: 80.0,
      weightOfDebt: 20.0,
      terminalGrowthRate: 2.5,
      exitEbitdaMultiple: 12.0,
      terminalMethod: 'GORDON',
      cashAndEquivalents: 1500,
      totalDebt: 2000,
      minorityInterest: 0
    },
    ddmInputs: {
      companyName: 'My Target Enterprise',
      ticker: 'TARGET',
      currency: 'USD',
      currentSharePrice: 50.00,
      currentDividendPerShare: 1.50,
      costOfEquity: 10.33,
      highGrowthRate: 10.0,
      highGrowthYears: 5,
      terminalGrowthRate: 4.0,
      hModelHalfLifeYears: 4
    },
    ccaInputs: {
      companyName: 'My Target Enterprise',
      ticker: 'TARGET',
      currency: 'USD',
      currentSharePrice: 50.00,
      dilutedShares: 1000,
      ltmEbitda: 2400,
      ltmNetIncome: 1400,
      ltmRevenue: 10000,
      bookValueOfEquity: 8000,
      netDebt: 500,
      premiumDiscountFactor: 0.0,
      peers: [
        { ticker: 'PEER_A', name: '同业可比公司 A', evEbitda: 14.0, pe: 18.0, ps: 2.5, pb: 3.2 },
        { ticker: 'PEER_B', name: '同业可比公司 B', evEbitda: 12.5, pe: 16.5, ps: 2.1, pb: 2.8 },
        { ticker: 'PEER_C', name: '行业标杆公司 C', evEbitda: 15.2, pe: 20.0, ps: 3.0, pb: 3.8 }
      ]
    },
    rimInputs: {
      companyName: 'My Target Enterprise',
      ticker: 'TARGET',
      currency: 'USD',
      currentSharePrice: 50.00,
      bookValuePerShare: 8.00,
      costOfEquity: 10.33,
      forecastYears: 5,
      projectedRoes: [18.0, 18.5, 19.0, 18.5, 18.0],
      dividendPayoutRatio: 30.0,
      persistenceFactor: 0.65
    }
  }
];
