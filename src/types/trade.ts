export type TradeType = 'BUY' | 'SELL';
export type PositionStatus = 'HOLDING' | 'CLOSED';
export type AssetClass = 'Forex' | 'Indices' | 'Commodities' | 'Crypto' | 'Stocks';

export type SetupType = string;

export type EmotionTag = 
  | 'Disciplined'
  | 'Calm Execution'
  | 'FOMO'
  | 'Revenge Trade'
  | 'Hesitant'
  | 'Greedy'
  | 'Over-Confident';

export type MistakeTag = 
  | 'None (Disciplined)'
  | 'Moved Stop Loss'
  | 'Early Exit'
  | 'Over-Leveraged'
  | 'Chased Entry'
  | 'Violated Trading Plan'
  | 'Trading in High-Impact News';

export interface Trade {
  id: string;
  ticket: number;
  symbol: string;
  assetClass: AssetClass;
  type: TradeType;
  volume: number; // Lots
  openTime: string; // ISO 8601
  closeTime: string; // ISO 8601
  openPrice: number;
  closePrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number; // Net USD P&L
  commission: number;
  swap: number;
  pips: number;
  rrRatio?: number; // Risk to reward achieved
  setup: SetupType;
  emotions: EmotionTag[];
  mistakes: MistakeTag[];
  notes?: string;
  rating?: number; // 1 to 5 stars
  chartUrl?: string;
  accountId: string;
  positionStatus?: PositionStatus; // 'HOLDING' (持仓中) | 'CLOSED' (已平仓)
  macroDriver?: string; // 宏观第一性原理驱动归因
}

export interface MT5Account {
  id: string;
  accountNumber: string;
  broker: string;
  server: string;
  accountName: string;
  currency: string;
  leverage: number;
  initialBalance: number;
  currentBalance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  isConnected: boolean;
  lastSyncTime: string;
  syncType: 'webhook_ea' | 'investor_api' | 'manual_statement';
  apiToken?: string;
}

export interface DailyJournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  preMarketPlan: string;
  postMarketReview: string;
  disciplineScore: number; // 1 - 5
  mood: 'Focused' | 'Neutral' | 'Anxious' | 'Euphoric' | 'Frustrated';
  rulesFollowed: boolean;
  lessonsLearned: string;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  category: AssetClass;
  bid: number;
  ask: number;
  price: number;
  prevClose: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  spread: number;
  history: number[]; // Sparkline 20 points
  digits: number;
}

export interface PlaybookStrategy {
  id: string;
  name: SetupType;
  description: string;
  rules: string[];
  recommendedSessions: string[];
  targetRR: string;
  timeframes: string[];
}

export interface NotebookNote {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned?: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  time: string;
  source: string;
  category: 'forex' | 'commodities' | 'crypto' | 'central_bank' | 'macro';
  importance: 'high' | 'medium' | 'low';
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  impactAsset?: string;
  url?: string;
}
