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

export interface AssetDriverProfile {
  symbol: string;
  assetName: string;
  plainTitle: string;
  category: 'Commodities' | 'Forex' | 'Equities' | 'Crypto';
  currentPrice: number;
  directionBias: 'BULLISH (强劲看多)' | 'BEARISH (逢高看空)' | 'RANGE (震荡分化)';
  biasConfidence: number; // 0-100%
  coreDriverThesis: string;
  plainLanguageThesis: string; // 详尽大白话原理解释
  plainActionSummary: string; // 普通人一句话操作指南
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
}
