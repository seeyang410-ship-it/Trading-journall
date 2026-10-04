import { StockResearchProfile, FinancialYearData, GlobalRegion } from '../types/equity';
import { calculateDCF, computeAltmanZ, computePiotroskiF } from '../services/dcfEngine';
import { getAllRegistryStocks } from './globalStockDirectory';

function createGlobalStock(
  ticker: string,
  name: string,
  region: GlobalRegion,
  exchange: string,
  sector: string,
  industry: string,
  currency: string,
  currentPrice: number,
  changePercent: number,
  marketCapUSD: number,
  financialHistory: FinancialYearData[],
  dcfConfig: {
    growthStage1: number;
    growthStage2: number;
    terminalGrowth: number;
    wacc: number;
    beta: number;
  },
  multiples: {
    evToEbitda: number;
    peTTM: number;
    forwardPE: number;
    pegRatio: number;
    priceToFCF: number;
    dividendYield: number;
    roic: number;
  },
  moat: {
    rating: 'Wide Moat (宽阔护城河)' | 'Narrow Moat (狭窄护城河)' | 'No Moat (无护城河)';
    spread: number;
  },
  thesis: {
    bullCase: string;
    bearCase: string;
    catalysts: string[];
    fairValueRange: [number, number];
  },
  plainActionGuide?: {
    recommendedBuyPrice?: number;
    verdict?: '🟢 强烈买入 (极度划算)' | '🟡 分批定投 / 合理持有' | '🔴 观望等待回踩 (切忌追高)' | '🚫 严重透支，千万别买';
    guideText?: string;
  }
): StockResearchProfile {
  const latest = financialHistory[0];
  const prev = financialHistory[1] || latest;

  const dcfParams = {
    currentPrice,
    sharesOutstanding: latest.sharesOutstanding,
    baseFCF: latest.fcf,
    growthStage1Rate: dcfConfig.growthStage1,
    growthStage2Rate: dcfConfig.growthStage2,
    terminalGrowthRate: dcfConfig.terminalGrowth,
    riskFreeRate: 4.12,
    beta: dcfConfig.beta,
    equityRiskPremium: region === 'Greater China' ? 6.2 : 4.8,
    costOfDebt: 4.2,
    taxRate: 18.0,
    wacc: dcfConfig.wacc,
    netDebt: latest.netDebt
  };

  const dcfResult = calculateDCF(dcfParams);
  const altmanZ = computeAltmanZ(latest, marketCapUSD);
  const piotroskiF = computePiotroskiF(latest, prev);

  // Directly calculate clear buy prices and verdicts for the user
  const fairVal = dcfResult.fairValuePerShare;
  const buyTarget = plainActionGuide?.recommendedBuyPrice || Math.round(fairVal * 0.8 * 10) / 10; // 20% discount margin
  const bubbleTarget = Math.round(fairVal * 1.25 * 10) / 10;

  let verdict: '🟢 强烈买入 (极度划算)' | '🟡 分批定投 / 合理持有' | '🔴 观望等待回踩 (切忌追高)' | '🚫 严重透支，千万别买';
  let guide: string;

  if (currentPrice <= buyTarget) {
    verdict = '🟢 强烈买入 (极度划算)';
    guide = `【大白话结论】：现价 $${currentPrice} 明显低于安全买入价 $${buyTarget}（打了近 8 折！），具备坚实的安全垫，非常适合现在大胆分批上车买入！`;
  } else if (currentPrice <= fairVal * 1.05) {
    verdict = '🟡 分批定投 / 合理持有';
    guide = `【大白话结论】：现价 $${currentPrice} 处于合理估值区间（公允价约 $${fairVal}），不便宜也不算太贵。如果有长期持仓计划，建议采用“月度小额定投”方式上车，若跌到 $${buyTarget} 以下则加大买入。`;
  } else if (currentPrice <= bubbleTarget) {
    verdict = '🔴 观望等待回踩 (切忌追高)';
    guide = `【大白话结论】：现价 $${currentPrice} 已经高于公允价值 $${fairVal}，现在追高容易站岗被套！适合投资的买入点位在【$${buyTarget} 以下】，请管住手，耐心等大盘回调跌下来再买。`;
  } else {
    verdict = '🚫 严重透支，千万别买';
    guide = `【大白话结论】：现价 $${currentPrice} 已经严重泡沫化，市场过度炒作！千万不要在这个位置当接盘侠，持有的可以考虑分批止盈！`;
  }

  if (plainActionGuide?.verdict) {
    verdict = plainActionGuide.verdict;
  }
  if (plainActionGuide?.guideText) {
    guide = plainActionGuide.guideText;
  }

  return {
    ticker,
    name,
    region,
    exchange,
    sector,
    industry,
    currency,
    currentPrice,
    changePercent,
    marketCapUSD,
    evToEbitda: multiples.evToEbitda,
    peTTM: multiples.peTTM,
    forwardPE: multiples.forwardPE,
    pegRatio: multiples.pegRatio,
    priceToFCF: multiples.priceToFCF,
    dividendYield: multiples.dividendYield,
    roic: multiples.roic,
    wacc: dcfConfig.wacc,
    economicMoatSpread: moat.spread,
    moatRating: moat.rating,
    financialHistory,
    dcfParams,
    dcfResult,
    investmentTargets: {
      recommendedBuyPrice: buyTarget,
      fairValuePrice: fairVal,
      overvaluedPrice: bubbleTarget,
      actionVerdict: verdict,
      plainInvestmentGuide: guide
    },
    altmanZ,
    piotroskiF,
    analystSummary: thesis
  };
}

const CRAFTED_STOCKS: StockResearchProfile[] = [
  // 1. NVDA (英伟达)
  createGlobalStock(
    'NVDA',
    '英伟达 (NVIDIA)',
    'US',
    'NASDAQ',
    '信息技术',
    'AI 算力与计算芯片霸主',
    'USD',
    138.5,
    2.45,
    3393,
    [
      { year: '2024 (FY25E)', revenue: 125000, revenueGrowth: 105.2, grossProfit: 93750, grossMargin: 75.0, operatingIncome: 77500, operatingMargin: 62.0, netIncome: 65000, netMargin: 52.0, eps: 2.65, cfo: 68000, capex: 4500, fcf: 63500, fcfMargin: 50.8, totalCash: 34800, totalDebt: 11000, netDebt: -23800, sharesOutstanding: 24500 },
      { year: '2023 (FY24)', revenue: 60922, revenueGrowth: 125.9, grossProfit: 44301, grossMargin: 72.7, operatingIncome: 32972, operatingMargin: 54.1, netIncome: 29760, netMargin: 48.8, eps: 1.19, cfo: 28090, capex: 1069, fcf: 27021, fcfMargin: 44.4, totalCash: 25980, totalDebt: 11050, netDebt: -14930, sharesOutstanding: 24700 }
    ],
    { growthStage1: 28.0, growthStage2: 14.0, terminalGrowth: 3.0, wacc: 10.2, beta: 1.65 },
    { evToEbitda: 38.2, peTTM: 52.4, forwardPE: 31.8, pegRatio: 1.15, priceToFCF: 53.4, dividendYield: 0.03, roic: 78.4 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 68.2 },
    {
      bullCase: '全世界所有搞 AI 模型的企业（微软、谷歌、Meta）都在给它送钱，芯片供不应求排队到 2026 年，软件生态 CUDA 锁死客户，几乎没有真正对手。',
      bearCase: '一旦大客户 AI 商业化赚钱不如预期，可能会暂时放慢买芯片的速度；地缘限制。',
      catalysts: ['Blackwell 架构新芯片大规模交付', '各大科技公司财报宣布继续加大 AI 资本开支'],
      fairValueRange: [125, 175]
    },
    {
      recommendedBuyPrice: 118.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 $138.5 处于【合理偏贵】区间，内在公允价值约 $148。如果现在手痒想买，建议“小仓位分批定投”；真正的【击球买入黄金价在 $118 以下】，遇到大盘恐慌暴跌回踩 $118 才是大胆重仓上车的最好时机！'
    }
  ),

  // 2. TSLA (特斯拉)
  createGlobalStock(
    'TSLA',
    '特斯拉 (Tesla Inc)',
    'US',
    'NASDAQ',
    '可选消费与科技',
    '新能源汽车与自动驾驶',
    'USD',
    254.2,
    -1.47,
    812,
    [
      { year: '2024 (FY24E)', revenue: 99800, revenueGrowth: 3.2, grossProfit: 18200, grossMargin: 18.2, operatingIncome: 8500, operatingMargin: 8.5, netIncome: 7400, netMargin: 7.4, eps: 2.32, cfo: 12500, capex: 8900, fcf: 3600, fcfMargin: 3.6, totalCash: 33600, totalDebt: 7200, netDebt: -26400, sharesOutstanding: 3200 },
      { year: '2023 (FY23)', revenue: 96773, revenueGrowth: 18.8, grossProfit: 17660, grossMargin: 18.2, operatingIncome: 8891, operatingMargin: 9.2, netIncome: 14997, netMargin: 15.5, eps: 4.30, cfo: 13256, capex: 8898, fcf: 4358, fcfMargin: 4.5, totalCash: 29094, totalDebt: 5200, netDebt: -23894, sharesOutstanding: 3180 }
    ],
    { growthStage1: 16.0, growthStage2: 9.0, terminalGrowth: 2.8, wacc: 9.5, beta: 1.8 },
    { evToEbitda: 48.0, peTTM: 85.0, forwardPE: 62.0, pegRatio: 3.5, priceToFCF: 180.0, dividendYield: 0.0, roic: 16.5 },
    { rating: 'Narrow Moat (狭窄护城河)', spread: 7.0 },
    {
      bullCase: 'FSD 完全自动驾驶软件大规模推送订阅，Cybercab 无人出租车网络开启万亿软件变现，人形机器人 Optimus 未来空间巨大。',
      bearCase: '中国与全球本土车企价格战打得头破血流，纯靠卖车毛利率下滑严重，自动驾驶牌照审批不确定性。',
      catalysts: ['FSD 获准在中国与欧洲正式商用', '低成本 2.5 万美元 Model 2 平台投产'],
      fairValueRange: [180, 260]
    },
    {
      recommendedBuyPrice: 195.0,
      verdict: '🔴 观望等待回踩 (切忌追高)',
      guideText: '【大白话投资建议】：现价 $254.2 估值明显偏高（股价里包含了大量的 Robotaxi 和机器人远期幻想），公允价值在 $215 左右。现价绝对不要头铁追高，【适合投资的低吸价格在 $195 以下】，耐心等回踩再考虑！'
    }
  ),

  // 3. TSM (台积电)
  createGlobalStock(
    'TSM',
    '台积电 (Taiwan Semiconductor)',
    'Greater China',
    'NYSE / TWSE',
    '信息技术',
    '全球先进制程晶圆代工独角兽',
    'USD',
    192.5,
    2.23,
    998,
    [
      { year: '2024 (FY24E)', revenue: 88500, revenueGrowth: 28.5, grossProfit: 48600, grossMargin: 54.9, operatingIncome: 38500, operatingMargin: 43.5, netIncome: 34200, netMargin: 38.6, eps: 6.58, cfo: 48200, capex: 30000, fcf: 18200, fcfMargin: 20.6, totalCash: 52000, totalDebt: 28000, netDebt: -24000, sharesOutstanding: 5186 },
      { year: '2023 (FY23)', revenue: 68900, revenueGrowth: -8.7, grossProfit: 37400, grossMargin: 54.3, operatingIncome: 29400, operatingMargin: 42.6, netIncome: 26800, netMargin: 38.9, eps: 5.17, cfo: 41200, capex: 30400, fcf: 10800, fcfMargin: 15.7, totalCash: 48500, totalDebt: 31000, netDebt: -17500, sharesOutstanding: 5186 }
    ],
    { growthStage1: 18.5, growthStage2: 9.0, terminalGrowth: 2.8, wacc: 9.2, beta: 1.25 },
    { evToEbitda: 17.5, peTTM: 29.2, forwardPE: 21.4, pegRatio: 1.05, priceToFCF: 54.8, dividendYield: 1.25, roic: 32.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 23.3 },
    {
      bullCase: '全世界所有最顶级的芯片（苹果A18、英伟达H100/Blackwell、AMD）必须由它代工制造，全球没有第二家能做，享有绝对的定价权，芯片代工年年提价客户还只能求着要产能。',
      bearCase: '地缘政治摩擦风险导致外资给的估值打折，海外建厂（美国/德国）成本高昂。',
      catalysts: ['2nm 制程明年量产订单再次被抢光', 'CoWoS 高级芯片封装产能翻倍'],
      fairValueRange: [180, 230]
    },
    {
      recommendedBuyPrice: 170.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 $192.5 处于【估值非常公道】的区间（公允价在 $205 左右），前瞻市盈率才 21 倍，比美股很多科技股便宜得多！【在 $170 以下是无脑买入击球区】，现价适合作为压舱底资产长期分批买入。'
    }
  ),

  // 4. 0700.HK (腾讯控股)
  createGlobalStock(
    '0700.HK',
    '腾讯控股 (Tencent)',
    'Greater China',
    'HKEX',
    '通信与互联网',
    '国民级社交霸主与全球最大游戏帝国',
    'HKD',
    418.2,
    1.65,
    512,
    [
      { year: '2024 (FY24E)', revenue: 86500, revenueGrowth: 9.8, grossProfit: 45200, grossMargin: 52.3, operatingIncome: 26800, operatingMargin: 31.0, netIncome: 21500, netMargin: 24.9, eps: 2.32, cfo: 31000, capex: 6500, fcf: 24500, fcfMargin: 28.3, totalCash: 62000, totalDebt: 45000, netDebt: -17000, sharesOutstanding: 9350 },
      { year: '2023 (FY23)', revenue: 78800, revenueGrowth: 10.1, grossProfit: 37800, grossMargin: 48.0, operatingIncome: 22600, operatingMargin: 28.7, netIncome: 16200, netMargin: 20.6, eps: 1.72, cfo: 24500, capex: 3400, fcf: 21100, fcfMargin: 26.8, totalCash: 58000, totalDebt: 48000, netDebt: -10000, sharesOutstanding: 9520 }
    ],
    { growthStage1: 11.0, growthStage2: 6.0, terminalGrowth: 2.5, wacc: 9.5, beta: 0.95 },
    { evToEbitda: 14.8, peTTM: 21.5, forwardPE: 16.8, pegRatio: 1.1, priceToFCF: 20.8, dividendYield: 1.1, roic: 21.0 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 11.5 },
    {
      bullCase: '微信 13 亿中国人每天离不开，视频号广告变现疯狂增长且毛利极高；海外游戏收入连续大涨，公司承诺每年掏出超 1000 亿港元在市场上买自家股票注销，相当于每天都在给股东发大红包。',
      bearCase: '国内互联网进入存量成熟期，暴增时代结束；潜在政策监管审视。',
      catalysts: ['千亿港元持续回购注销', '热门爆款手游海外全面爆发'],
      fairValueRange: [420, 520]
    },
    {
      recommendedBuyPrice: 380.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 418 港元很合理，公允内在价值约 470 港元！【低于 380 港元属于无脑捡便宜区】。天天有千亿回购托底，只要跌破 400 港元就可以放心闭眼加仓。'
    }
  ),

  // 5. BABA (阿里巴巴)
  createGlobalStock(
    'BABA',
    '阿里巴巴 (Alibaba Group)',
    'Greater China',
    'NYSE / HKEX',
    '可选消费与云计算',
    '电商与中国最大云计算龙头',
    'USD',
    114.5,
    3.42,
    225,
    [
      { year: '2024 (FY24)', revenue: 130353, revenueGrowth: 8.3, grossProfit: 49200, grossMargin: 37.7, operatingIncome: 15640, operatingMargin: 12.0, netIncome: 11100, netMargin: 8.5, eps: 5.62, cfo: 25200, capex: 4800, fcf: 20400, fcfMargin: 15.6, totalCash: 85000, totalDebt: 25000, netDebt: -60000, sharesOutstanding: 1970 },
      { year: '2023 (FY23)', revenue: 126490, revenueGrowth: 2.0, grossProfit: 46800, grossMargin: 37.0, operatingIncome: 14500, operatingMargin: 11.5, netIncome: 10400, netMargin: 8.2, eps: 5.15, cfo: 28800, capex: 6200, fcf: 22600, fcfMargin: 17.9, totalCash: 78000, totalDebt: 23000, netDebt: -55000, sharesOutstanding: 2020 }
    ],
    { growthStage1: 6.0, growthStage2: 3.5, terminalGrowth: 2.0, wacc: 9.8, beta: 0.95 },
    { evToEbitda: 8.2, peTTM: 14.2, forwardPE: 10.5, pegRatio: 0.92, priceToFCF: 11.0, dividendYield: 2.1, roic: 14.8 },
    { rating: 'Narrow Moat (狭窄护城河)', spread: 5.0 },
    {
      bullCase: '账面净现金高达近 600 亿美元（相当于公司市值的 27% 全是白花花的纯现金！），前瞻市盈率只有 10 倍，便宜到了泥土里；阿里云重回双位数增长，港股通南向资金源源不断抄底买入。',
      bearCase: '拼多多和抖音电商仍在抢占部分市场份额。',
      catalysts: ['南向资金通过港股通大额持续加仓', '淘天商业化变现软件服务费全量收取'],
      fairValueRange: [135, 185]
    },
    {
      recommendedBuyPrice: 130.0,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 $114.5 是【全场最超值的深度折价资产】！内在公允价值高达 $158，【只要在 $130 以下买入都是占大便宜】，极具安全边际，非常值得重点配置！'
    }
  ),

  // 6. ASML (阿斯麦)
  createGlobalStock(
    'ASML',
    '阿斯麦 (ASML Holding)',
    'Europe',
    'Euronext / NASDAQ',
    '信息技术',
    '全球独家 EUV 光刻机物理垄断',
    'EUR',
    785.4,
    -1.08,
    318,
    [
      { year: '2024 (FY24E)', revenue: 30500, revenueGrowth: 10.5, grossProfit: 15550, grossMargin: 51.0, operatingIncome: 9450, operatingMargin: 31.0, netIncome: 7800, netMargin: 25.6, eps: 19.8, cfo: 9200, capex: 2100, fcf: 7100, fcfMargin: 23.3, totalCash: 7200, totalDebt: 4800, netDebt: -2400, sharesOutstanding: 395 },
      { year: '2023 (FY23)', revenue: 27559, revenueGrowth: 30.2, grossProfit: 14144, grossMargin: 51.3, operatingIncome: 9042, operatingMargin: 32.8, netIncome: 7839, netMargin: 28.4, eps: 19.9, cfo: 5410, capex: 2190, fcf: 3220, fcfMargin: 11.7, totalCash: 7000, totalDebt: 4600, netDebt: -2400, sharesOutstanding: 395 }
    ],
    { growthStage1: 14.5, growthStage2: 7.5, terminalGrowth: 2.5, wacc: 8.5, beta: 1.2 },
    { evToEbitda: 28.5, peTTM: 39.6, forwardPE: 28.2, pegRatio: 1.6, priceToFCF: 44.8, dividendYield: 0.9, roic: 42.0 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 33.5 },
    {
      bullCase: '全世界所有尖端芯片（台积电、英特尔、三星）想要造出来，必须买它一台价值 3.5 亿美元的高级 EUV 光刻机！地球上没有任何第二家公司能造出来，属于真正的物理级垄断。',
      bearCase: '对华出口管制限制部分出货；芯片周期复苏偶尔出现阶段性波动。',
      catalysts: ['High-NA 顶级新一代光刻机量产出货', '全球芯片大厂先进制程军备竞赛'],
      fairValueRange: [750, 930]
    },
    {
      recommendedBuyPrice: 720.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 785 欧元属于合理区间（公允价在 830 欧元左右）。如果它因为短期消息面错杀跌破【720 欧元】，那就是千载难逢的躺赚击球区，闭眼买入！'
    }
  ),

  // 7. NOVO (诺和诺德)
  createGlobalStock(
    'NOVO',
    '诺和诺德 (Novo Nordisk)',
    'Europe',
    'CPH / NYSE',
    '医疗健康',
    '减肥神药 GLP-1 与代谢疾病绝对霸主',
    'USD',
    118.2,
    1.28,
    528,
    [
      { year: '2024 (FY24E)', revenue: 41500, revenueGrowth: 24.5, grossProfit: 35100, grossMargin: 84.6, operatingIncome: 18200, operatingMargin: 43.9, netIncome: 14500, netMargin: 34.9, eps: 3.25, cfo: 17200, capex: 6500, fcf: 10700, fcfMargin: 25.8, totalCash: 6200, totalDebt: 4500, netDebt: -1700, sharesOutstanding: 4460 },
      { year: '2023 (FY23)', revenue: 33300, revenueGrowth: 31.2, grossProfit: 28200, grossMargin: 84.7, operatingIncome: 14900, operatingMargin: 44.7, netIncome: 12100, netMargin: 36.3, eps: 2.70, cfo: 14800, capex: 3800, fcf: 11000, fcfMargin: 33.0, totalCash: 5800, totalDebt: 4100, netDebt: -1700, sharesOutstanding: 4480 }
    ],
    { growthStage1: 16.5, growthStage2: 8.0, terminalGrowth: 2.6, wacc: 8.2, beta: 0.65 },
    { evToEbitda: 26.2, peTTM: 36.4, forwardPE: 28.5, pegRatio: 1.4, priceToFCF: 49.3, dividendYield: 1.35, roic: 68.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 60.3 },
    {
      bullCase: 'Wegovy 与司美格鲁肽减肥药火遍全球富人圈，毛利率高达惊人的 85%，不仅能减肥还能降低心脏病发作风险，成为全球有钱人的终身复购消费品。',
      bearCase: '礼来 (Eli Lilly) 同样出色的减肥药正在抢夺市场份额；医保谈判降价压力。',
      catalysts: ['无菌灌装新工厂产能全开彻底解决缺货', '口服减肥药临床试验大获成功'],
      fairValueRange: [115, 150]
    },
    {
      recommendedBuyPrice: 105.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 $118.2 比较公道（内在价值在 $132 左右）。【适合投资的绝佳买入价在 $105 以下】，现价适合轻仓底仓持有。'
    }
  ),

  // 8. 600519 (贵州茅台)
  createGlobalStock(
    '600519',
    '贵州茅台 (Moutai)',
    'Greater China',
    'SSE',
    '主要消费',
    '中国白酒与顶级社交硬通货',
    'CNY',
    1545.0,
    1.44,
    275,
    [
      { year: '2024 (FY24E)', revenue: 173000, revenueGrowth: 15.0, grossProfit: 159000, grossMargin: 92.0, operatingIncome: 118000, operatingMargin: 68.2, netIncome: 86000, netMargin: 49.7, eps: 68.5, cfo: 92000, capex: 8000, fcf: 84000, fcfMargin: 48.5, totalCash: 195000, totalDebt: 0, netDebt: -195000, sharesOutstanding: 1256 },
      { year: '2023 (FY23)', revenue: 150560, revenueGrowth: 18.0, grossProfit: 138500, grossMargin: 92.0, operatingIncome: 102500, operatingMargin: 68.1, netIncome: 74734, netMargin: 49.6, eps: 59.5, cfo: 66500, capex: 6500, fcf: 60000, fcfMargin: 39.8, totalCash: 172000, totalDebt: 0, netDebt: -172000, sharesOutstanding: 1256 }
    ],
    { growthStage1: 10.0, growthStage2: 5.5, terminalGrowth: 2.5, wacc: 8.2, beta: 0.75 },
    { evToEbitda: 14.2, peTTM: 22.5, forwardPE: 19.5, pegRatio: 1.5, priceToFCF: 23.0, dividendYield: 3.5, roic: 38.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 30.3 },
    {
      bullCase: '92% 变态级毛利率，账面躺着近 2000 亿纯现金且一分钱负债都没有，飞天茅台具备社交面子刚需属性，承诺未来三年每年分红率不低于 75%，堪称 A 股最强现金奶牛。',
      bearCase: '商务宴请减少可能导致市场批发价短暂倒挂；年轻人白酒消费习惯培养。',
      catalysts: ['每年大额特别现金分红发放', '直销专卖店与 i茅台APP 收入持续创高'],
      fairValueRange: [1650, 2100]
    },
    {
      recommendedBuyPrice: 1450.0,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 1545 元是过去 3 年极其少见的历史估值底部！公允内在价值在 1850 元以上，【跌破 1500 元就是白捡钱】，3.5% 的纯股息分红比存银行利息高得多，非常值得逢低买入！'
    }
  ),

  // 9. AAPL (苹果公司)
  createGlobalStock(
    'AAPL',
    '苹果 (Apple Inc)',
    'US',
    'NASDAQ',
    '信息技术',
    '全球消费电子与数字服务巨无霸',
    'USD',
    228.4,
    0.85,
    3471,
    [
      { year: '2024 (FY24)', revenue: 391035, revenueGrowth: 2.0, grossProfit: 180683, grossMargin: 46.2, operatingIncome: 123216, operatingMargin: 31.5, netIncome: 93736, netMargin: 24.0, eps: 6.08, cfo: 118254, capex: 9450, fcf: 108804, fcfMargin: 27.8, totalCash: 65100, totalDebt: 101000, netDebt: 35900, sharesOutstanding: 15200 },
      { year: '2023 (FY23)', revenue: 383285, revenueGrowth: -2.8, grossProfit: 169148, grossMargin: 44.1, operatingIncome: 114301, operatingMargin: 29.8, netIncome: 96995, netMargin: 25.3, eps: 6.13, cfo: 110543, capex: 10959, fcf: 99584, fcfMargin: 26.0, totalCash: 62482, totalDebt: 111088, netDebt: 48606, sharesOutstanding: 15550 }
    ],
    { growthStage1: 7.5, growthStage2: 5.0, terminalGrowth: 2.8, wacc: 8.2, beta: 1.05 },
    { evToEbitda: 25.6, peTTM: 37.5, forwardPE: 30.2, pegRatio: 2.8, priceToFCF: 31.9, dividendYield: 0.44, roic: 54.2 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 46.0 },
    {
      bullCase: '全世界有 22 亿台活跃 iPhone 和 Mac，用户离不开苹果生态；高毛利的服务业务（App Store、iCloud、Apple Pay）一年净收几百亿美元，苹果每年掏出 1000 亿美元在股市回购股票。',
      bearCase: '硬件手机换代创新变慢；反垄断监管。',
      catalysts: ['Apple Intelligence 换机大潮爆发', '千亿美元股票回购注销持续推进'],
      fairValueRange: [185, 235]
    },
    {
      recommendedBuyPrice: 195.0,
      verdict: '🔴 观望等待回踩 (切忌追高)',
      guideText: '【大白话投资建议】：现价 $228.4 偏贵了，公允身价在 $205 左右。【适合投资的安全买入价在 $195 以下】。现在不要追高，耐心等大盘回调再捡便宜！'
    }
  ),

  // 10. MSFT (微软)
  createGlobalStock(
    'MSFT',
    '微软 (Microsoft)',
    'US',
    'NASDAQ',
    '信息技术',
    '全球企业软件与云计算第一霸主',
    'USD',
    418.5,
    1.12,
    3110,
    [
      { year: '2024 (FY24)', revenue: 245122, revenueGrowth: 15.7, grossProfit: 171018, grossMargin: 69.8, operatingIncome: 109433, operatingMargin: 44.6, netIncome: 88136, netMargin: 36.0, eps: 11.80, cfo: 118548, capex: 44476, fcf: 74072, fcfMargin: 30.2, totalCash: 75545, totalDebt: 77200, netDebt: 1655, sharesOutstanding: 7430 },
      { year: '2023 (FY23)', revenue: 211915, revenueGrowth: 6.9, grossProfit: 146052, grossMargin: 68.9, operatingIncome: 88523, operatingMargin: 41.8, netIncome: 72361, netMargin: 34.1, eps: 9.68, cfo: 87582, capex: 28107, fcf: 59475, fcfMargin: 28.1, totalCash: 111255, totalDebt: 79900, netDebt: -31355, sharesOutstanding: 7460 }
    ],
    { growthStage1: 14.5, growthStage2: 8.0, terminalGrowth: 3.0, wacc: 8.8, beta: 1.18 },
    { evToEbitda: 24.1, peTTM: 35.5, forwardPE: 28.5, pegRatio: 2.1, priceToFCF: 42.0, dividendYield: 0.78, roic: 28.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 19.7 },
    {
      bullCase: '全世界所有公司上班都必须用 Windows、Office、Teams 和 Azure 云计算，客户黏性强到根本换不掉；抢先投资 OpenAI，AI Copilot 变现走在最前列。',
      bearCase: '每年搞 AI 算力中心花掉近 500 亿美元资本支出，压低自由现金流。',
      catalysts: ['Azure AI 云收入增速持续超预期', 'Office Copilot 订阅渗透率翻倍'],
      fairValueRange: [380, 465]
    },
    {
      recommendedBuyPrice: 385.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 $418.5 估值基本合理（内在公允价值在 $435 左右），【低于 $385 属于舒服的击球区】。属于值得拿住 5 年的优质核心资产，适合小幅定投。'
    }
  ),

  // 11. GOOGL (谷歌)
  createGlobalStock(
    'GOOGL',
    '谷歌 (Alphabet Inc)',
    'US',
    'NASDAQ',
    '通信与互联网',
    '全球搜索引擎霸主与安卓系统',
    'USD',
    172.8,
    0.85,
    2150,
    [
      { year: '2024 (FY24E)', revenue: 350000, revenueGrowth: 14.0, grossProfit: 199500, grossMargin: 57.0, operatingIncome: 112000, operatingMargin: 32.0, netIncome: 95000, netMargin: 27.1, eps: 7.65, cfo: 115000, capex: 48000, fcf: 67000, fcfMargin: 19.1, totalCash: 110000, totalDebt: 30000, netDebt: -80000, sharesOutstanding: 12400 },
      { year: '2023 (FY23)', revenue: 307394, revenueGrowth: 8.7, grossProfit: 174320, grossMargin: 56.7, operatingIncome: 84293, operatingMargin: 27.4, netIncome: 73795, netMargin: 24.0, eps: 5.80, cfo: 101746, capex: 32251, fcf: 69495, fcfMargin: 22.6, totalCash: 110916, totalDebt: 29853, netDebt: -81063, sharesOutstanding: 12700 }
    ],
    { growthStage1: 12.5, growthStage2: 6.5, terminalGrowth: 2.8, wacc: 8.6, beta: 1.05 },
    { evToEbitda: 17.5, peTTM: 23.5, forwardPE: 19.2, pegRatio: 1.15, priceToFCF: 31.0, dividendYield: 0.45, roic: 31.2 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 22.6 },
    {
      bullCase: 'YouTube 视频与 Google 搜索垄断全球数字广告命脉，自研 TPU 芯片大大降低 AI 算力成本，账面净现金高达 800 亿美元，估值在科技巨头中最便宜。',
      bearCase: '美国司法部反垄断诉讼审查；ChatGPT 等对话式 AI 对传统搜索界面的冲击。',
      catalysts: ['Gemini 2.0 模型全线赋能搜索变现', '谷歌云 (Google Cloud) 利润率大幅跃升'],
      fairValueRange: [165, 205]
    },
    {
      recommendedBuyPrice: 158.0,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 $172.8 是美股七大科技巨头中最划算的标的之一！内在公允价值在 $192 左右，【在 $158 以下属于极具安全边际的黄金击球区】，非常值得逢低投资！'
    }
  ),

  // 12. AMZN (亚马逊)
  createGlobalStock(
    'AMZN',
    '亚马逊 (Amazon.com)',
    'US',
    'NASDAQ',
    '可选消费与云计算',
    '全球电商霸主与最大云服务 AWS',
    'USD',
    196.4,
    1.08,
    2050,
    [
      { year: '2024 (FY24E)', revenue: 630000, revenueGrowth: 11.2, grossProfit: 302000, grossMargin: 48.0, operatingIncome: 65000, operatingMargin: 10.3, netIncome: 48000, netMargin: 7.6, eps: 4.60, cfo: 112000, capex: 60000, fcf: 52000, fcfMargin: 8.3, totalCash: 88000, totalDebt: 135000, netDebt: 47000, sharesOutstanding: 10500 },
      { year: '2023 (FY23)', revenue: 574785, revenueGrowth: 11.8, grossProfit: 270046, grossMargin: 47.0, operatingIncome: 36852, operatingMargin: 6.4, netIncome: 30425, netMargin: 5.3, eps: 2.90, cfo: 84946, capex: 52729, fcf: 32217, fcfMargin: 5.6, totalCash: 86780, totalDebt: 140000, netDebt: 53220, sharesOutstanding: 10400 }
    ],
    { growthStage1: 15.0, growthStage2: 8.0, terminalGrowth: 2.8, wacc: 9.0, beta: 1.15 },
    { evToEbitda: 18.5, peTTM: 42.5, forwardPE: 30.5, pegRatio: 1.35, priceToFCF: 39.4, dividendYield: 0.0, roic: 18.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 9.5 },
    {
      bullCase: 'AWS 稳坐全球云计算第一把交椅，高毛利的站内电商广告业务每年狂赚 500 亿美元，区域履约中心降本增效让营业利润翻倍。',
      bearCase: '零售业务受整体消费影响，物流资本开支庞大。',
      catalysts: ['AWS 云收入在 AI 推动下重新加速到 20%+', '广告与 Prime 会员订阅费持续涨价'],
      fairValueRange: [180, 230]
    },
    {
      recommendedBuyPrice: 175.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 $196.4 处于合理价位（内在价值在 $210 左右）。【跌到 $175 以下适合大笔买入】，现价可小额定投。'
    }
  ),

  // 13. MC.PA (路威酩轩 LVMH)
  createGlobalStock(
    'MC.PA',
    '路威酩轩 (LVMH)',
    'Europe',
    'Euronext Paris',
    '可选消费',
    '全球第一大顶级奢侈品帝国',
    'EUR',
    685.0,
    1.11,
    342,
    [
      { year: '2024 (FY24E)', revenue: 86200, revenueGrowth: 0.5, grossProfit: 59500, grossMargin: 69.0, operatingIncome: 22800, operatingMargin: 26.5, netIncome: 15200, netMargin: 17.6, eps: 30.5, cfo: 19800, capex: 6200, fcf: 13600, fcfMargin: 15.8, totalCash: 12500, totalDebt: 24000, netDebt: 11500, sharesOutstanding: 500 },
      { year: '2023 (FY23)', revenue: 86153, revenueGrowth: 8.8, grossProfit: 59200, grossMargin: 68.8, operatingIncome: 22802, operatingMargin: 26.5, netIncome: 15174, netMargin: 17.6, eps: 30.3, cfo: 18400, capex: 5400, fcf: 13000, fcfMargin: 15.1, totalCash: 11200, totalDebt: 22000, netDebt: 10800, sharesOutstanding: 502 }
    ],
    { growthStage1: 7.5, growthStage2: 5.0, terminalGrowth: 2.2, wacc: 8.0, beta: 0.85 },
    { evToEbitda: 14.5, peTTM: 22.4, forwardPE: 19.8, pegRatio: 2.2, priceToFCF: 25.1, dividendYield: 2.05, roic: 22.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 14.5 },
    {
      bullCase: 'LV、Dior、Tiffany 等 75 家百年顶级品牌，对全球超级富豪具有不可替代的身份象征力，年年自主提价抵御通胀。',
      bearCase: '普通中产阶级奢侈品消费降级。',
      catalysts: ['欧美降息后全球富豪高端消费复苏', '顶级皮具价格再度上涨'],
      fairValueRange: [650, 820]
    },
    {
      recommendedBuyPrice: 620.0,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 685 欧元属于合理区间（公允价在 730 欧元左右）。【在 620 欧元以下属于打折买奢侈品龙头的黄金点位】。'
    }
  ),

  // 14. 7203.T (丰田汽车)
  createGlobalStock(
    '7203.T',
    '丰田汽车 (Toyota)',
    'Japan & APAC',
    'Tokyo Stock Exchange',
    '汽车制造',
    '全球汽车工业王者与油电混动霸主',
    'JPY',
    2780.0,
    0.65,
    265,
    [
      { year: '2024 (FY24)', revenue: 450953, revenueGrowth: 21.4, grossProfit: 95200, grossMargin: 21.1, operatingIncome: 53529, operatingMargin: 11.9, netIncome: 49449, netMargin: 11.0, eps: 365.0, cfo: 48000, capex: 21000, fcf: 27000, fcfMargin: 6.0, totalCash: 95000, totalDebt: 120000, netDebt: 25000, sharesOutstanding: 13500 },
      { year: '2023 (FY23)', revenue: 371542, revenueGrowth: 18.4, grossProfit: 68500, grossMargin: 18.4, operatingIncome: 27250, operatingMargin: 7.3, netIncome: 24513, netMargin: 6.6, eps: 179.5, cfo: 38000, capex: 19000, fcf: 19000, fcfMargin: 5.1, totalCash: 88000, totalDebt: 115000, netDebt: 27000, sharesOutstanding: 13600 }
    ],
    { growthStage1: 5.0, growthStage2: 3.0, terminalGrowth: 1.8, wacc: 7.2, beta: 0.8 },
    { evToEbitda: 6.5, peTTM: 7.6, forwardPE: 8.2, pegRatio: 0.8, priceToFCF: 9.8, dividendYield: 3.2, roic: 14.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 7.3 },
    {
      bullCase: '纯电车销量放缓，丰田的油电混动 (HEV) 卖到脱销供不应求，年赚 5 万亿日元现金，市盈率才 7 倍出头，还发 3.2% 股息。',
      bearCase: '日元大幅升值带来汇兑损失；中国市场面临国产新能源竞争。',
      catalysts: ['全固态电池商业化进展', '日本东证市值管理大额回购注销'],
      fairValueRange: [2900, 3600]
    },
    {
      recommendedBuyPrice: 2500.0,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 2780 日元极度便宜！市盈率才 7 倍多，公允价值在 3200 日元以上，【低于 2600 日元以下闭眼买入】，每年安稳吃高分红！'
    }
  ),

  // 15. 1155.KL (Maybank - 马来亚银行)
  createGlobalStock(
    '1155.KL',
    '马来亚银行 (Maybank)',
    'Malaysia',
    'Bursa Malaysia (KLSE)',
    '金融与银行',
    '马来西亚第一大银行与高股息龙头',
    'MYR',
    10.40,
    0.78,
    27.8, // USD Billions
    [
      { year: '2024 (FY24E)', revenue: 32000, revenueGrowth: 9.5, grossProfit: 18500, grossMargin: 57.8, operatingIncome: 13200, operatingMargin: 41.2, netIncome: 9800, netMargin: 30.6, eps: 0.81, cfo: 14200, capex: 850, fcf: 13350, fcfMargin: 41.7, totalCash: 65000, totalDebt: 45000, netDebt: -20000, sharesOutstanding: 12100 },
      { year: '2023 (FY23)', revenue: 29200, revenueGrowth: 12.0, grossProfit: 16800, grossMargin: 57.5, operatingIncome: 12100, operatingMargin: 41.4, netIncome: 9350, netMargin: 32.0, eps: 0.77, cfo: 12800, capex: 780, fcf: 12020, fcfMargin: 41.1, totalCash: 60000, totalDebt: 42000, netDebt: -18000, sharesOutstanding: 12050 }
    ],
    { growthStage1: 6.5, growthStage2: 4.0, terminalGrowth: 2.5, wacc: 7.8, beta: 0.75 },
    { evToEbitda: 9.5, peTTM: 12.8, forwardPE: 11.5, pegRatio: 1.4, priceToFCF: 9.4, dividendYield: 6.5, roic: 11.8 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 4.0 },
    {
      bullCase: '马来西亚第一大国民银行，资本充足率极高；股息率常年稳定在 6.5% 以上，银行利息收入丰厚，外资热钱重返大马市场必买第一权重股。',
      bearCase: '大马国内信贷需求若随全球贸易放缓而出现微幅走弱。',
      catalysts: ['半年期大额现金股息派发 (Dividend DRP)', '外资对马股金融板块净流入加速'],
      fairValueRange: [10.0, 12.2]
    },
    {
      recommendedBuyPrice: 9.80,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 RM 10.40 估值非常稳健，公允身价在 RM 11.20 左右！【在 RM 9.80 以下属于闭眼买入吃高股息的黄金坑】。银行定存利息才 3% 出头，持有 Maybank 每年稳拿 6.5% 现金分红，堪称大马打工人的终极养老收租神器！'
    }
  ),

  // 16. 5347.KL (Tenaga Nasional - 国家能源 TNB)
  createGlobalStock(
    '5347.KL',
    '国家能源 (Tenaga Nasional / TNB)',
    'Malaysia',
    'Bursa Malaysia (KLSE)',
    '公用事业',
    '马来西亚国家电网独家垄断与AI算力供电最大赢家',
    'MYR',
    14.30,
    1.13,
    18.5,
    [
      { year: '2024 (FY24E)', revenue: 58000, revenueGrowth: 11.5, grossProfit: 16500, grossMargin: 28.4, operatingIncome: 8800, operatingMargin: 15.2, netIncome: 4500, netMargin: 7.8, eps: 0.78, cfo: 13500, capex: 9500, fcf: 4000, fcfMargin: 6.9, totalCash: 16000, totalDebt: 55000, netDebt: 39000, sharesOutstanding: 5800 },
      { year: '2023 (FY23)', revenue: 53066, revenueGrowth: 4.3, grossProfit: 14800, grossMargin: 27.9, operatingIncome: 7800, operatingMargin: 14.7, netIncome: 2770, netMargin: 5.2, eps: 0.48, cfo: 11200, capex: 8900, fcf: 2300, fcfMargin: 4.3, totalCash: 14500, totalDebt: 54000, netDebt: 39500, sharesOutstanding: 5780 }
    ],
    { growthStage1: 8.5, growthStage2: 5.0, terminalGrowth: 2.2, wacc: 7.5, beta: 0.8 },
    { evToEbitda: 7.2, peTTM: 18.2, forwardPE: 14.5, pegRatio: 1.1, priceToFCF: 20.7, dividendYield: 3.5, roic: 8.5 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 1.0 },
    {
      bullCase: 'AI 的尽头是电力！微软、英伟达、万国数据在柔佛狂建 AI 数据中心，全国用电量暴涨，TNB 独家垄断输电供电，资本回报率受到政府 IBR 监管机制保底，现金流如自来水。',
      bearCase: '国际煤炭与天然气发电原料成本波动；政府电价补贴账期。',
      catalysts: ['柔佛数据中心新机房集中通电并网', '绿色能源可再生能源出口新加坡高溢价落地'],
      fairValueRange: [13.5, 17.0]
    },
    {
      recommendedBuyPrice: 13.20,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 RM 14.30 估值合理（内在公允身价在 RM 16.00 左右）。柔佛 AI 数据中心大爆发是未来 5 年不可逆的超级红利，【跌到 RM 13.20 以下是重仓买入区】，现价适合作为核心公用事业资产长期定投！'
    }
  ),

  // 17. 1023.KL (Public Bank - 大众银行)
  createGlobalStock(
    '1023.KL',
    '大众银行 (Public Bank)',
    'Malaysia',
    'Bursa Malaysia (KLSE)',
    '金融与银行',
    '全马资产质量最高、坏账率极低的华人零售银行标杆',
    'MYR',
    4.50,
    0.67,
    19.8,
    [
      { year: '2024 (FY24E)', revenue: 27500, revenueGrowth: 8.2, grossProfit: 14200, grossMargin: 51.6, operatingIncome: 9200, operatingMargin: 33.5, netIncome: 6900, netMargin: 25.1, eps: 0.355, cfo: 11000, capex: 400, fcf: 10600, fcfMargin: 38.5, totalCash: 42000, totalDebt: 25000, netDebt: -17000, sharesOutstanding: 19410 },
      { year: '2023 (FY23)', revenue: 25400, revenueGrowth: 18.0, grossProfit: 13100, grossMargin: 51.5, operatingIncome: 8500, operatingMargin: 33.4, netIncome: 6650, netMargin: 26.1, eps: 0.342, cfo: 9800, capex: 380, fcf: 9420, fcfMargin: 37.0, totalCash: 39000, totalDebt: 24000, netDebt: -15000, sharesOutstanding: 19410 }
    ],
    { growthStage1: 5.5, growthStage2: 3.5, terminalGrowth: 2.2, wacc: 7.2, beta: 0.7 },
    { evToEbitda: 8.8, peTTM: 12.6, forwardPE: 11.8, pegRatio: 1.6, priceToFCF: 8.2, dividendYield: 4.8, roic: 12.4 },
    { rating: 'Wide Moat (宽阔护城河)', spread: 5.2 },
    {
      bullCase: '郑鸿标创办的传奇银行，坏账贷款率低至不可思议的 0.5%（全马最干净资产负债表），房贷与车贷零售客户忠诚度极高，派息率超过 55%，长期稳如泰山。',
      bearCase: '净息差竞争激烈，缺乏海外激进扩张弹性。',
      catalysts: ['大股东股权合理传承信托方案彻底落地消除悬念', '特别股息加码派发'],
      fairValueRange: [4.4, 5.2]
    },
    {
      recommendedBuyPrice: 4.15,
      verdict: '🟢 强烈买入 (极度划算)',
      guideText: '【大白话投资建议】：现价 RM 4.50 属于极度安全的击球区间（公允价在 RM 5.00 左右）！【跌破 RM 4.20 就是当传家宝买入的时刻】。坏账率极低，每年近 5% 的稳定现金股息，风雨不倒。'
    }
  ),

  // 18. 0166.KL (Inari Amertron - 益纳利美昌)
  createGlobalStock(
    '0166.KL',
    '益纳利美昌 (Inari Amertron)',
    'Malaysia',
    'Bursa Malaysia (KLSE)',
    '科技与半导体',
    '大马半导体封测 (OSAT) 龙头与苹果射频芯片供应链',
    'MYR',
    3.10,
    1.64,
    2.7,
    [
      { year: '2024 (FY24)', revenue: 1580, revenueGrowth: 14.5, grossProfit: 460, grossMargin: 29.1, operatingIncome: 380, operatingMargin: 24.1, netIncome: 340, netMargin: 21.5, eps: 0.091, cfo: 480, capex: 120, fcf: 360, fcfMargin: 22.8, totalCash: 1950, totalDebt: 50, netDebt: -1900, sharesOutstanding: 3750 },
      { year: '2023 (FY23)', revenue: 1380, revenueGrowth: -11.0, grossProfit: 390, grossMargin: 28.2, operatingIncome: 330, operatingMargin: 23.9, netIncome: 295, netMargin: 21.3, eps: 0.079, cfo: 420, capex: 110, fcf: 310, fcfMargin: 22.4, totalCash: 1820, totalDebt: 60, netDebt: -1760, sharesOutstanding: 3730 }
    ],
    { growthStage1: 12.0, growthStage2: 6.5, terminalGrowth: 2.5, wacc: 8.5, beta: 1.15 },
    { evToEbitda: 18.5, peTTM: 34.0, forwardPE: 24.5, pegRatio: 1.4, priceToFCF: 32.2, dividendYield: 2.8, roic: 18.5 },
    { rating: 'Narrow Moat (狭窄护城河)', spread: 10.0 },
    {
      bullCase: '博通 (Broadcom) 与苹果 iPhone 射频模块核心封测伙伴，账面躺着近 20 亿马币纯净现金几乎无负债，AI 手机天线与光模块封装新业务放量。',
      bearCase: '对单一主要客户（博通/苹果）营收依赖度高；智能手机出货淡季波动。',
      catalysts: ['iPhone AI 换机周期推高射频芯片用量', '光通信 CPO 先进封装新生产线投入商用'],
      fairValueRange: [2.9, 3.8]
    },
    {
      recommendedBuyPrice: 2.75,
      verdict: '🟡 分批定投 / 合理持有',
      guideText: '【大白话投资建议】：现价 RM 3.10 属于合理价位（公允身价在 RM 3.50 左右）。账面现金极其充沛，【跌破 RM 2.80 是非常舒适的安全建仓区】，适合看好科技半导体周期的投资者分批配置。'
    }
  )
];

// Merge crafted detailed profiles with all remaining registry stocks
const registryStocks = getAllRegistryStocks();
const craftedTickers = new Set(CRAFTED_STOCKS.map(s => s.ticker.toUpperCase()));

const rawCombinedList = [
  ...CRAFTED_STOCKS,
  ...registryStocks.filter(s => !craftedTickers.has(s.ticker.toUpperCase()))
];

const seenTickers = new Set<string>();
export const INITIAL_STOCKS: StockResearchProfile[] = rawCombinedList.filter(s => {
  const upper = s.ticker.toUpperCase();
  if (seenTickers.has(upper)) return false;
  seenTickers.add(upper);
  return true;
});


