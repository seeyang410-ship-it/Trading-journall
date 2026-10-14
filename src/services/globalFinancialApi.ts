import { GLOBAL_STOCK_REGISTRY } from '../data/globalStockDirectory';
import { COMPREHENSIVE_MACRO_ASSETS } from '../data/macroAssetDrivers';
import { Candle, generateCandlesForSymbol } from './marketData';

export interface GlobalSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: string; // EQUITY, ETF, CURRENCY, CRYPTOCURRENCY, FUTURE, INDEX, etc.
  sector?: string;
  region?: string;
  score?: number;
}

export interface WatchlistSymbol {
  symbol: string;
  name: string;
  exchange: string;
  category: 'Stocks' | 'Forex' | 'Crypto' | 'Commodities' | 'Indices';
  price: number;
  prevClose: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume: string;
  currency: string;
  addedAt: string;
  digits?: number;
  isCustom?: boolean;
}

const WATCHLIST_STORAGE_KEY = 'alphalog_global_watchlist_v1';

export const DEFAULT_GLOBAL_WATCHLIST: WatchlistSymbol[] = [
  {
    symbol: 'NVDA',
    name: '英伟达 (NVIDIA Corporation)',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 138.25,
    prevClose: 135.40,
    change: 2.85,
    changePercent: 2.10,
    high24h: 139.80,
    low24h: 134.90,
    volume: '54.2M',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: 'AAPL',
    name: '苹果 (Apple Inc.)',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 242.60,
    prevClose: 240.80,
    change: 1.80,
    changePercent: 0.75,
    high24h: 244.10,
    low24h: 239.95,
    volume: '48.1M',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: '0700.HK',
    name: '腾讯控股 (Tencent Holdings)',
    exchange: 'HKEX (香港交易所)',
    category: 'Stocks',
    price: 423.40,
    prevClose: 418.20,
    change: 5.20,
    changePercent: 1.24,
    high24h: 426.00,
    low24h: 416.80,
    volume: '28.9M',
    currency: 'HKD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: 'SHEL.L',
    name: '壳牌石油 (Shell PLC)',
    exchange: 'LSE (伦敦证券交易所)',
    category: 'Stocks',
    price: 2680.00,
    prevClose: 2655.00,
    change: 25.00,
    changePercent: 0.94,
    high24h: 2695.00,
    low24h: 2645.00,
    volume: '14.5M',
    currency: 'GBp',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: '1155.KL',
    name: '马来亚银行 (Maybank)',
    exchange: 'Bursa KLSE (马来西亚吉隆坡证券交易所)',
    category: 'Stocks',
    price: 9.98,
    prevClose: 9.92,
    change: 0.06,
    changePercent: 0.60,
    high24h: 10.04,
    low24h: 9.90,
    volume: '11.8M',
    currency: 'MYR',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: 'ASML.AS',
    name: '阿斯麦光刻机 (ASML Holding)',
    exchange: 'Euronext Amsterdam (泛欧交易所)',
    category: 'Stocks',
    price: 742.80,
    prevClose: 731.50,
    change: 11.30,
    changePercent: 1.55,
    high24h: 748.20,
    low24h: 728.00,
    volume: '2.1M',
    currency: 'EUR',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: 'XAUUSD',
    name: '现货伦敦金 (Gold / USD)',
    exchange: 'Global OTC / COMEX',
    category: 'Commodities',
    price: 2912.40,
    prevClose: 2884.20,
    change: 28.20,
    changePercent: 0.98,
    high24h: 2921.50,
    low24h: 2880.10,
    volume: '280.5K',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  },
  {
    symbol: 'BTC-USD',
    name: '比特币 (Bitcoin / USD)',
    exchange: 'Global Crypto',
    category: 'Crypto',
    price: 95480.00,
    prevClose: 93800.00,
    change: 1680.00,
    changePercent: 1.79,
    high24h: 96950.00,
    low24h: 93400.00,
    volume: '42.8K',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 1
  },
  {
    symbol: 'EURUSD=X',
    name: '欧元 / 美元 (EUR/USD)',
    exchange: 'Forex Spot',
    category: 'Forex',
    price: 1.0842,
    prevClose: 1.0825,
    change: 0.0017,
    changePercent: 0.16,
    high24h: 1.0865,
    low24h: 1.0818,
    volume: '95.2K',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 4
  },
  {
    symbol: 'CL=F',
    name: 'WTI 原油期货 (Crude Oil)',
    exchange: 'NYMEX',
    category: 'Commodities',
    price: 71.45,
    prevClose: 70.80,
    change: 0.65,
    changePercent: 0.92,
    high24h: 72.10,
    low24h: 70.40,
    volume: '65.2K',
    currency: 'USD',
    addedAt: '2026-01-01T00:00:00Z',
    digits: 2
  }
];

// Helper to deduce asset category
export function deduceCategory(typeStr: string, symbol: string): 'Stocks' | 'Forex' | 'Crypto' | 'Commodities' | 'Indices' {
  const s = symbol.toUpperCase();
  const t = (typeStr || '').toUpperCase();

  if (s.includes('BTC') || s.includes('ETH') || s.includes('SOL') || t.includes('CRYPTO')) {
    return 'Crypto';
  }
  if (s.includes('=X') || s.endsWith('USD') && (s.startsWith('EUR') || s.startsWith('GBP') || s.startsWith('USD') || s.startsWith('AUD')) || t.includes('CURRENCY')) {
    return 'Forex';
  }
  if (s.includes('GC=F') || s.includes('CL=F') || s.includes('SI=F') || s.includes('XAU') || s.includes('XAG') || s.includes('OIL') || s.includes('COPPER') || t.includes('COMMODITY')) {
    return 'Commodities';
  }
  if (s.startsWith('^') || s.includes('NAS') || s.includes('SPX') || s.includes('US30') || t.includes('INDEX')) {
    return 'Indices';
  }
  return 'Stocks';
}

class GlobalFinancialApiService {
  private watchlist: WatchlistSymbol[] = [];
  private searchCache = new Map<string, GlobalSearchResult[]>();

  constructor() {
    this.initWatchlist();
  }

  private initWatchlist() {
    if (typeof window === 'undefined') {
      this.watchlist = [...DEFAULT_GLOBAL_WATCHLIST];
      return;
    }
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.watchlist = parsed;
          return;
        }
      }
    } catch {
      // Fallback
    }
    this.watchlist = [...DEFAULT_GLOBAL_WATCHLIST];
    this.persistWatchlist();
  }

  public getWatchlist(): WatchlistSymbol[] {
    return [...this.watchlist];
  }

  public persistWatchlist(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(this.watchlist));
      } catch (e) {
        console.error('Failed to save watchlist to localStorage:', e);
      }
    }
  }

  public addToWatchlist(item: {
    symbol: string;
    name: string;
    exchange: string;
    type?: string;
    price?: number;
    currency?: string;
    change?: number;
    changePercent?: number;
  }): WatchlistSymbol {
    const existing = this.watchlist.find(w => w.symbol.toUpperCase() === item.symbol.toUpperCase());
    if (existing) {
      return existing;
    }

    const category = deduceCategory(item.type || '', item.symbol);
    const price = item.price || 100;
    const prevClose = item.change ? price - item.change : price;
    const change = item.change || 0;
    const changePercent = item.changePercent || 0;

    const newSymbol: WatchlistSymbol = {
      symbol: item.symbol,
      name: item.name || item.symbol,
      exchange: item.exchange || 'GLOBAL',
      category,
      price,
      prevClose,
      change,
      changePercent,
      high24h: Math.round((price * 1.018) * 100) / 100,
      low24h: Math.round((price * 0.982) * 100) / 100,
      volume: '15.4K',
      currency: item.currency || 'USD',
      addedAt: new Date().toISOString(),
      digits: price < 5 ? 4 : price < 50 ? 3 : 2,
      isCustom: true
    };

    this.watchlist = [newSymbol, ...this.watchlist];
    this.persistWatchlist();
    return newSymbol;
  }

  public removeFromWatchlist(symbol: string): void {
    this.watchlist = this.watchlist.filter(w => w.symbol.toUpperCase() !== symbol.toUpperCase());
    this.persistWatchlist();
  }

  public isWatchlisted(symbol: string): boolean {
    return this.watchlist.some(w => w.symbol.toUpperCase() === symbol.toUpperCase());
  }

  public updateQuoteInWatchlist(symbol: string, partial: Partial<WatchlistSymbol>): void {
    this.watchlist = this.watchlist.map(w => {
      if (w.symbol.toUpperCase() === symbol.toUpperCase()) {
        return { ...w, ...partial };
      }
      return w;
    });
    this.persistWatchlist();
  }

  /**
   * Search global markets using financial data API with fallback to internal extensive registry
   */
  public async searchGlobalSymbols(query: string): Promise<GlobalSearchResult[]> {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const cacheKey = trimmed.toLowerCase();
    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey)!;
    }

    const results: GlobalSearchResult[] = [];

    // 1. Try backend financial data API proxy
    try {
      const res = await fetch(`/api/market/search?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          data.results.forEach((r: any) => {
            results.push({
              symbol: r.symbol,
              name: r.name,
              exchange: r.exchange,
              type: r.type,
              sector: r.sector,
              score: r.score
            });
          });
        }
      }
    } catch {
      // Backend request error
    }

    // 2. Also search offline catalog for Chinese queries or local match guarantee
    const lowerQ = trimmed.toLowerCase();
    
    // Check in GLOBAL_STOCK_REGISTRY
    GLOBAL_STOCK_REGISTRY.forEach(stk => {
      if (
        stk.ticker.toLowerCase().includes(lowerQ) ||
        stk.name.toLowerCase().includes(lowerQ) ||
        (stk.sector && stk.sector.toLowerCase().includes(lowerQ))
      ) {
        if (!results.some(r => r.symbol.toUpperCase() === stk.ticker.toUpperCase())) {
          results.push({
            symbol: stk.ticker,
            name: stk.name,
            exchange: stk.exchange || stk.region || 'Equities',
            type: 'EQUITY',
            sector: stk.sector,
            region: stk.region
          });
        }
      }
    });

    // Check in COMPREHENSIVE_MACRO_ASSETS (Commodities, Forex, Crypto)
    COMPREHENSIVE_MACRO_ASSETS.forEach(m => {
      if (
        m.symbol.toLowerCase().includes(lowerQ) ||
        m.assetName.toLowerCase().includes(lowerQ) ||
        m.plainTitle.toLowerCase().includes(lowerQ)
      ) {
        if (!results.some(r => r.symbol.toUpperCase() === m.symbol.toUpperCase())) {
          results.push({
            symbol: m.symbol,
            name: m.assetName,
            exchange: m.category || 'Macro Asset',
            type: m.category === '外汇' ? 'CURRENCY' : m.category === '加密货币' ? 'CRYPTOCURRENCY' : 'COMMODITY',
            sector: m.plainTitle
          });
        }
      }
    });

    this.searchCache.set(cacheKey, results.slice(0, 25));
    return results.slice(0, 25);
  }

  /**
   * Fetch live quotes for multiple symbols from financial data API
   */
  public async fetchLiveQuotes(symbols: string[]): Promise<Record<string, Partial<WatchlistSymbol>>> {
    if (symbols.length === 0) return {};

    try {
      const res = await fetch(`/api/market/quote?symbols=${encodeURIComponent(symbols.join(','))}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.quotes) {
          return data.quotes;
        }
      }
    } catch {
      // Return empty if offline or fetch failed
    }

    return {};
  }

  /**
   * Fetch real historical candles for candlestick charts from financial data API
   */
  public async fetchCandles(symbol: string, timeframe: 'M1' | 'M5' | 'M15' | 'H1' | 'D1'): Promise<Candle[]> {
    let interval = '15m';
    let range = '2d';

    if (timeframe === 'M1') {
      interval = '1m';
      range = '1d';
    } else if (timeframe === 'M5') {
      interval = '5m';
      range = '1d';
    } else if (timeframe === 'M15') {
      interval = '15m';
      range = '3d';
    } else if (timeframe === 'H1') {
      interval = '60m';
      range = '5d';
    } else if (timeframe === 'D1') {
      interval = '1d';
      range = '1mo';
    }

    try {
      const res = await fetch(`/api/market/candles?symbol=${encodeURIComponent(symbol)}&interval=${interval}&range=${range}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.candles) && data.candles.length >= 10) {
          const rawCandles: Candle[] = data.candles;
          
          // Calculate technical indicators
          // 1. EMA 20
          const k20 = 2 / (20 + 1);
          let ema20 = rawCandles[0].close;
          rawCandles.forEach((c, idx) => {
            if (idx === 0) {
              c.ema20 = ema20;
            } else {
              ema20 = c.close * k20 + ema20 * (1 - k20);
              c.ema20 = Math.round(ema20 * 100) / 100;
            }
          });

          // 2. RSI 14
          let gains = 0;
          let losses = 0;
          for (let i = 1; i < rawCandles.length; i++) {
            const diff = rawCandles[i].close - rawCandles[i - 1].close;
            if (i <= 14) {
              if (diff >= 0) gains += diff;
              else losses += Math.abs(diff);
              rawCandles[i].rsi = 50;
            } else {
              const avgGain = (gains / 14) * 13 + (diff > 0 ? diff : 0);
              const avgLoss = (losses / 14) * 13 + (diff < 0 ? Math.abs(diff) : 0);
              gains = avgGain / 14;
              losses = avgLoss / 14;
              const rs = losses === 0 ? 100 : gains / losses;
              rawCandles[i].rsi = Math.round((100 - (100 / (1 + rs))) * 10) / 10;
            }
          }

          return rawCandles;
        }
      }
    } catch {
      // Fallback to generator
    }

    // High quality synthetic fallback based on base price
    const currentItem = this.watchlist.find(w => w.symbol.toUpperCase() === symbol.toUpperCase());
    const basePrice = currentItem?.price || 100;
    return generateCandlesForSymbol(symbol, basePrice, 38);
  }
}

export const globalFinancialApi = new GlobalFinancialApiService();
