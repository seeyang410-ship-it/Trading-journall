export type MacroRegimeType = 
  | '全球大放水与经济复苏 (央行水库开闸，买资产容易赚钱)' 
  | '温和金发女孩时代 (通胀下来了，经济没崩溃，最好的投资环境)' 
  | '过热晚期 (东西太贵，央行准备关水龙头加息)' 
  | '滞胀警报 (东西在涨价，经济却不行，最折磨人)' 
  | '萧条与衰退 (大家都不敢花钱，现金为王)';

export type RiskSentimentType = '积极进取 (大胆买入好资产)' | '谨慎观望 (多看少动，挑选打折货)' | '全面防守 (捂住钱包，多留现金)';

export interface CentralBankLiquidity {
  date: string;
  fedTotalAssets: number; // in Trillions, e.g. 7.12
  tgaBalance: number; // in Billions, e.g. 750
  rrpBalance: number; // in Billions, e.g. 280
  netLiquidity: number; // Fed Assets - TGA - RRP in Trillions
  netLiquidityChange30d: number; // in Billions
  ecbBalanceEUR: number; // Trillions
  pbocLiquidityCNY: number; // Trillions
  bojBalanceJPY: number; // Trillions
  globalM2YoY: number; // % e.g. 6.8
  plainExplanation: {
    poolStatus: string;
    flowDirection: string;
    whatItMeansForYou: string;
  };
}

export interface MacroIndicator {
  id: string;
  name: string;
  plainTitle: string; // 大白话名称
  category: 'Rates' | 'Liquidity' | 'Risk' | 'Commodities' | 'FX';
  currentValue: number;
  unit: string;
  change24h: number;
  change30d: number;
  benchmarkLevel: number;
  implication: string;
  plainAnalogy: string; // 生活化比喻
  plainHowToRead: string; // 普通人怎么看
  plainActionAdvice: string; // 普通人操作建议
  status: 'Bullish' | 'Bearish' | 'Neutral' | 'Extreme Alert';
  chartHistory: number[]; // 15-20 historical points
}

// 宏观与大宗商品各大分类 (涵盖五大商品分类、期货市场、全球外汇、指数与加密)
export type MacroAssetCategory = 
  | '能源商品'
  | '贵金属' 
  | '农产品'
  | '软商品'
  | '畜牧肉类'
  | '期货市场' 
  | '大宗商品' 
  | '加密货币' 
  | '外汇' 
  | '指数';

// 期货交易所合约规格
export interface FuturesContractSpecs {
  exchange: string; // e.g. 'BMD (马来西亚衍生品交易所)' | 'CBOT / CME' | 'NYMEX' | 'ICE' | 'LME' | 'SGX'
  contractSize: string; // e.g. '25 公吨 / 手'
  tickSize: string; // e.g. '1 令吉 / 吨 (25 MYR/手)'
  settlementType: string; // e.g. '实物交割 (Physical Delivery)' | '现金结算 (Cash Settlement)'
  marginRequirement: string; // e.g. '约 5,500 - 6,500 令吉 / 手'
  tradingHours: string; // e.g. '日盘 10:30-12:30, 14:30-18:00; 夜盘 21:00-23:30 (大马时间)'
  basisStatus?: string; // e.g. '现货升水 Backwardation (现货紧缺)' | '期货升水 Contango'
}

// 全生命周期推导模型 (Full Lifecycle Derivation Model)
export interface CommodityLifecycleDerivation {
  lifecycleStage: string; // e.g. '阶段③：树龄老化与供给硬约束期' | '阶段②：资本开支达峰与产能释放期' | '阶段①：勘探与早期资本投入期' | '阶段④：替代品威胁与技术迭代期'
  inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)' | '主动补库存 (景气扩张·主升浪加码)' | '被动补库存 (需求见顶·高位滞销警惕)' | '主动去库存 (价格坍塌·甩卖出清寻底)';
  inventoryCycleDescription: string; // 详尽库存周期推导
  supplyBottleneck: string; // 供给与产能瓶颈 (如老龄化树龄、矿山品位衰退、新矿审批需7-10年)
  demandTransformation: string; // 需求端转型与超级周期驱动力 (如印尼B40生柴强制掺混、电网绿色重构、AI算力中心电力需求)
  costFloorAndCeiling: {
    cashCostFloor: string; // 现金完全成本底线 (跌破引发矿山减产与企业破产，绝对估值底)
    profitMarginCeiling: string; // 暴利与替代品压制顶 (超过引发下游需求破坏与国家宏观干预)
  };
  policyAndGeopoliticalMoat: string; // 核心地缘与国际政策护城河 (如欧盟 EUDR 零毁林、OPEC 配额、美国 SPR、出口禁令)
}

// 细分多时间跨度分析：短期 vs 中长期 vs 长期
export interface HorizonAnalysis {
  timeframeName: string; // e.g. '短期 (1~4周)' | '中长期 (1~6个月)' | '长期 (6个月~3年以上)'
  timeframeDuration: string; // e.g. '1~4周'
  bias: '看多 (Bullish)' | '看空 (Bearish)' | '震荡 (Range/Neutral)';
  targetRange: string; // e.g. '$2,880 - $2,960'
  coreLogic: string; // 大白话核心驱动逻辑与第一性原理
  keyTriggers: string[]; // 核心催化剂与风险点
  actionTactics: string; // 普通人具体实战与仓位操作建议
}

export interface AssetDriverProfile {
  symbol: string;
  assetName: string;
  plainTitle: string;
  category: MacroAssetCategory; // 贵金属 | 大宗商品 | 加密货币 | 外汇 | 指数
  subCategory: string; // 细分种类：黄金避险、工业贵金属、能源大宗、工业基础金属、粮食农产品、主流公链、智能合约、G10主流货币对、亚太套息、美股核心指数、亚太及新兴股指、宏观流动性基准
  currentPrice: number;
  directionBias: string; // e.g. 'BULLISH (强劲看多)' | 'BEARISH (逢高看空)' | 'RANGE (震荡分化)'
  biasConfidence: number; // 0-100%
  coreDriverThesis: string;
  plainLanguageThesis: string; // 详尽大白话原理解释
  plainActionSummary: string; // 普通人一句话操作指南
  
  // 细分 短期、中长期、长期 宏观分析体系
  horizonAnalyses: {
    shortTerm: HorizonAnalysis;   // 短期 (1~4周): 突发数据、日线波动、情绪与支撑阻力
    mediumTerm: HorizonAnalysis;  // 中长期 (1~6个月): 央行降息加息路径、供需库存拐点、季度财报
    longTerm: HorizonAnalysis;    // 长期 (6个月~3年以上): 去美元化、主权债务膨胀、法币购买力稀释、科技变革与超级大宗周期
  };

  driverComponents: {
    name: string;
    weight: number; // %
    value: string;
    impact: 'Positive' | 'Negative' | 'Neutral';
    description: string;
    plainMeaning: string; // 大白话解释
  }[];
  keyCatalysts: string[];
  institutionalPositioning: {
    cotNetLongContracts?: number;
    etfFlow7dUSD?: string;
    retailSentiment?: string;
  };
  
  // 全生命周期推导模型与期货规格
  lifecycleDerivation?: CommodityLifecycleDerivation;
  futuresContractSpecs?: FuturesContractSpecs;
}
