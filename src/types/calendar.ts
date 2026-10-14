export type EconomicEventImpact = 'HIGH' | 'MEDIUM' | 'LOW';

export type EconomicRegion = 'US' | 'EU' | 'UK' | 'CN' | 'JP' | 'AU' | 'MY' | 'CA' | 'GLOBAL';

export type EconomicCategory = 
  | 'CENTRAL_BANK'     // 央行利率决议 / 货币政策
  | 'INFLATION'        // 通胀指标 (CPI / PCE / PPI)
  | 'EMPLOYMENT'       // 就业数据 (非农 / 失业率)
  | 'GDP_GROWTH'       // GDP 与经济增速
  | 'PMI_BUSINESS'     // 采购经理人指数 (PMI)
  | 'RETAIL_CONSUMER'  // 零售销售 / 消费者信心
  | 'ENERGY_TRADE';    // 原油储备 / 贸易帐

export interface EconomicEvent {
  id: string;
  datetime: string; // ISO string e.g. 2026-10-14T12:30:00Z
  dateStr: string;  // e.g. 2026-10-14
  timeStr: string;  // e.g. 20:30 (Beijing/Singapore Time)
  countryCode: EconomicRegion;
  countryName: string;
  countryFlag: string;
  title: string;
  titleEn: string;
  category: EconomicCategory;
  impact: EconomicEventImpact;
  actual?: string | number | null;
  forecast?: string | number | null;
  previous: string | number;
  unit: string;
  surpriseStatus?: 'BEAT' | 'MISS' | 'INLINE' | 'PENDING';
  marketImplication: string; // 对资产市场影响说明
  tradingTip: string; // 交易分析师建议
  affectedAssets: string[]; // 关联受影响品种，如 ['XAUUSD', 'EURUSD', 'US10Y', 'NQ']
}

export interface EconomicCalendarFilter {
  dateRange: 'today' | 'tomorrow' | 'this_week' | 'next_week' | 'all';
  impact: 'ALL' | EconomicEventImpact;
  region: 'ALL' | EconomicRegion;
  category: 'ALL' | EconomicCategory;
  searchQuery: string;
}
