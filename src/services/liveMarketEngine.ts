export interface LiveMarketTick {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
  direction: 'up' | 'down' | 'neutral';
  high24h?: number;
  low24h?: number;
  volume?: string;
}

type MarketListener = (ticks: Record<string, LiveMarketTick>) => void;

class LiveMarketEngine {
  private listeners: Set<MarketListener> = new Set();
  private timer: any = null;
  private isRunning: boolean = true;
  private intervalMs: number = 2500; // 2.5-second live refresh
  private activeSymbolFocus: string | null = null;

  private currentPrices: Record<string, LiveMarketTick> = {
    // Macro benchmarks
    'US10Y': { symbol: 'US10Y', price: 4.12, change: -0.04, changePercent: -0.96, timestamp: new Date().toLocaleTimeString(), direction: 'neutral', high24h: 4.18, low24h: 4.10, volume: '1.2M' },
    'TIPS10Y': { symbol: 'TIPS10Y', price: 1.82, change: -0.03, changePercent: -1.62, timestamp: new Date().toLocaleTimeString(), direction: 'neutral', high24h: 1.86, low24h: 1.81, volume: '850K' },
    'DXY': { symbol: 'DXY', price: 101.45, change: -0.25, changePercent: -0.25, timestamp: new Date().toLocaleTimeString(), direction: 'neutral', high24h: 101.90, low24h: 101.30, volume: '4.5B' },
    'VIX': { symbol: 'VIX', price: 15.2, change: -0.65, changePercent: -4.10, timestamp: new Date().toLocaleTimeString(), direction: 'neutral', high24h: 16.4, low24h: 15.1, volume: '920K' },
    'XAUUSD': { symbol: 'XAUUSD', price: 2914.5, change: 18.2, changePercent: 0.63, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 2922.0, low24h: 2895.0, volume: '480K' },
    'WTI': { symbol: 'WTI', price: 71.80, change: 0.45, changePercent: 0.63, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 72.40, low24h: 70.90, volume: '320K' },
    'NAS100': { symbol: 'NAS100', price: 20850, change: 165.0, changePercent: 0.80, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 20920, low24h: 20680, volume: '580K' },
    'USDJPY': { symbol: 'USDJPY', price: 151.85, change: -0.32, changePercent: -0.21, timestamp: new Date().toLocaleTimeString(), direction: 'down', high24h: 152.60, low24h: 151.40, volume: '1.8B' },
    'BTCUSD': { symbol: 'BTCUSD', price: 94800, change: 1420, changePercent: 1.52, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 96200, low24h: 93100, volume: '65K' },

    // 🇲🇾 马股 (Bursa Malaysia / KLSE)
    '1155.KL': { symbol: '1155.KL', price: 10.40, change: 0.08, changePercent: 0.78, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 10.48, low24h: 10.32, volume: '14.2M' },
    '5347.KL': { symbol: '5347.KL', price: 14.30, change: 0.16, changePercent: 1.13, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 14.42, low24h: 14.12, volume: '9.8M' },
    '1023.KL': { symbol: '1023.KL', price: 4.50, change: 0.03, changePercent: 0.67, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 4.54, low24h: 4.46, volume: '18.5M' },
    '1295.KL': { symbol: '1295.KL', price: 8.15, change: 0.10, changePercent: 1.24, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 8.22, low24h: 8.04, volume: '12.6M' },
    '0166.KL': { symbol: '0166.KL', price: 3.10, change: 0.05, changePercent: 1.64, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 3.16, low24h: 3.04, volume: '8.4M' },
    '6742.KL': { symbol: '6742.KL', price: 3.65, change: 0.07, changePercent: 1.95, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 3.72, low24h: 3.56, volume: '22.1M' },
    '5183.KL': { symbol: '5183.KL', price: 5.40, change: -0.04, changePercent: -0.74, timestamp: new Date().toLocaleTimeString(), direction: 'down', high24h: 5.48, low24h: 5.36, volume: '4.8M' },
    '4715.KL': { symbol: '4715.KL', price: 4.10, change: 0.06, changePercent: 1.49, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 4.15, low24h: 4.02, volume: '7.2M' },
    '5225.KL': { symbol: '5225.KL', price: 7.20, change: 0.05, changePercent: 0.70, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 7.26, low24h: 7.12, volume: '3.6M' },
    '5398.KL': { symbol: '5398.KL', price: 8.80, change: 0.12, changePercent: 1.38, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 8.90, low24h: 8.65, volume: '6.1M' },
    '6947.KL': { symbol: '6947.KL', price: 3.55, change: 0.04, changePercent: 1.14, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 3.60, low24h: 3.50, volume: '5.2M' },
    '7113.KL': { symbol: '7113.KL', price: 1.15, change: 0.02, changePercent: 1.77, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 1.18, low24h: 1.12, volume: '35.4M' },
    '8869.KL': { symbol: '8869.KL', price: 4.90, change: 0.08, changePercent: 1.66, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 4.96, low24h: 4.80, volume: '4.2M' },
    '5296.KL': { symbol: '5296.KL', price: 2.10, change: 0.02, changePercent: 0.96, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 2.14, low24h: 2.06, volume: '8.9M' },

    // 🇺🇸 美股 (US Mega-Caps)
    'NVDA': { symbol: 'NVDA', price: 138.50, change: 3.32, changePercent: 2.45, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 140.20, low24h: 135.10, volume: '48.5M' },
    'AAPL': { symbol: 'AAPL', price: 228.40, change: 1.92, changePercent: 0.85, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 230.10, low24h: 226.50, volume: '38.2M' },
    'MSFT': { symbol: 'MSFT', price: 418.50, change: 4.65, changePercent: 1.12, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 421.00, low24h: 414.20, volume: '18.4M' },
    'TSLA': { symbol: 'TSLA', price: 254.20, change: -3.80, changePercent: -1.47, timestamp: new Date().toLocaleTimeString(), direction: 'down', high24h: 260.50, low24h: 251.80, volume: '62.0M' },
    'AMZN': { symbol: 'AMZN', price: 196.40, change: 2.10, changePercent: 1.08, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 198.20, low24h: 194.00, volume: '28.1M' },
    'GOOGL': { symbol: 'GOOGL', price: 172.80, change: 1.45, changePercent: 0.85, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 174.50, low24h: 171.10, volume: '22.5M' },
    'META': { symbol: 'META', price: 585.00, change: 8.50, changePercent: 1.47, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 589.20, low24h: 578.00, volume: '14.8M' },
    'AMD': { symbol: 'AMD', price: 152.00, change: 2.80, changePercent: 1.88, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 154.50, low24h: 148.60, volume: '32.4M' },
    'PLTR': { symbol: 'PLTR', price: 42.50, change: 0.85, changePercent: 2.04, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 43.40, low24h: 41.20, volume: '44.8M' },
    'BRK.B': { symbol: 'BRK.B', price: 460.00, change: 1.80, changePercent: 0.39, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 462.50, low24h: 457.80, volume: '3.2M' },

    // 🇨🇳 港股与 A 股 (Greater China)
    'TSM': { symbol: 'TSM', price: 192.50, change: 4.20, changePercent: 2.23, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 194.80, low24h: 189.50, volume: '16.2M' },
    '0700.HK': { symbol: '0700.HK', price: 418.20, change: 6.80, changePercent: 1.65, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 422.00, low24h: 412.00, volume: '28.4M' },
    '9988.HK': { symbol: '9988.HK', price: 98.50, change: 2.40, changePercent: 2.50, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 99.80, low24h: 96.20, volume: '38.0M' },
    'BABA': { symbol: 'BABA', price: 114.50, change: 3.80, changePercent: 3.42, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 116.20, low24h: 111.50, volume: '19.5M' },
    '600519': { symbol: '600519', price: 1545.0, change: 22.0, changePercent: 1.44, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 1560.0, low24h: 1530.0, volume: '4.8M' },
    '1211.HK': { symbol: '1211.HK', price: 285.00, change: 5.40, changePercent: 1.93, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 288.60, low24h: 279.00, volume: '8.6M' },
    '3690.HK': { symbol: '3690.HK', price: 185.00, change: 3.80, changePercent: 2.10, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 188.00, low24h: 181.20, volume: '14.2M' },

    // 🇪🇺 欧洲与日本亚太 (Europe & APAC)
    'ASML': { symbol: 'ASML', price: 785.40, change: -8.60, changePercent: -1.08, timestamp: new Date().toLocaleTimeString(), direction: 'down', high24h: 798.00, low24h: 780.00, volume: '1.4M' },
    'NOVO': { symbol: 'NOVO', price: 118.20, change: 1.50, changePercent: 1.28, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 119.80, low24h: 116.50, volume: '4.2M' },
    'MC.PA': { symbol: 'MC.PA', price: 685.00, change: 7.50, changePercent: 1.11, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 692.00, low24h: 678.00, volume: '820K' },
    'SAP': { symbol: 'SAP', price: 215.00, change: 2.20, changePercent: 1.03, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 217.40, low24h: 212.60, volume: '1.1M' },
    '7203.T': { symbol: '7203.T', price: 2780.0, change: 18.0, changePercent: 0.65, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 2810.0, low24h: 2760.0, volume: '18.4M' },
    '6758.T': { symbol: '6758.T', price: 3100.0, change: 35.0, changePercent: 1.14, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 3140.0, low24h: 3065.0, volume: '6.8M' },
    '7974.T': { symbol: '7974.T', price: 8200.0, change: 95.0, changePercent: 1.17, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 8280.0, low24h: 8110.0, volume: '3.4M' },
    '005930.KS': { symbol: '005930.KS', price: 58500.0, change: 800.0, changePercent: 1.39, timestamp: new Date().toLocaleTimeString(), direction: 'up', high24h: 59200.0, low24h: 57600.0, volume: '12.8M' }
  };

  constructor() {
    this.start();
  }

  public start() {
    if (this.timer) clearInterval(this.timer);
    this.isRunning = true;
    this.timer = setInterval(() => {
      this.generateTicks();
    }, this.intervalMs);
  }

  public stop() {
    if (this.timer) clearInterval(this.timer);
    this.isRunning = false;
  }

  public setFocusSymbol(symbol: string | null) {
    this.activeSymbolFocus = symbol ? symbol.toUpperCase() : null;
  }

  /**
   * Ensures that ANY stock searched or resolved by the user is added to the real-time quote feed
   */
  public ensureTicker(symbol: string, initialPrice: number, changePercent: number = 1.25) {
    const key = symbol.toUpperCase();
    if (!this.currentPrices[key]) {
      const isNegative = Math.random() > 0.6;
      const chgPct = isNegative ? -Math.abs(changePercent) : Math.abs(changePercent);
      const chg = Math.round((initialPrice * (chgPct / 100)) * 100) / 100;
      this.currentPrices[key] = {
        symbol: key,
        price: initialPrice,
        change: chg,
        changePercent: chgPct,
        timestamp: new Date().toLocaleTimeString(),
        direction: chgPct >= 0 ? 'up' : 'down',
        high24h: Math.round(initialPrice * 1.02 * 100) / 100,
        low24h: Math.round(initialPrice * 0.98 * 100) / 100,
        volume: `${(Math.floor(Math.random() * 20) + 5).toFixed(1)}M`
      };
      this.notify();
    }
  }

  public getStatus() {
    return {
      isRunning: this.isRunning,
      intervalMs: this.intervalMs,
      ticksCount: Object.keys(this.currentPrices).length,
      lastUpdated: new Date().toLocaleTimeString()
    };
  }

  public getCurrentTicks(): Record<string, LiveMarketTick> {
    return { ...this.currentPrices };
  }

  public subscribe(listener: MarketListener): () => void {
    this.listeners.add(listener);
    // emit immediately
    listener({ ...this.currentPrices });
    return () => {
      this.listeners.delete(listener);
    };
  }

  private generateTicks() {
    const updated = { ...this.currentPrices };
    const symbols = Object.keys(updated);

    // Pick 4 to 8 random symbols to tick
    const countToUpdate = Math.floor(Math.random() * 5) + 4;
    for (let i = 0; i < countToUpdate; i++) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      this.updateSingleSymbol(updated, sym);
    }

    // Always tick the focused symbol if one is selected by the user!
    if (this.activeSymbolFocus && updated[this.activeSymbolFocus]) {
      this.updateSingleSymbol(updated, this.activeSymbolFocus);
    }

    this.currentPrices = updated;
    this.notify();
  }

  private updateSingleSymbol(updated: Record<string, LiveMarketTick>, sym: string) {
    const current = updated[sym];
    if (!current) return;

    // Realistic micro-fluctuation (-0.25% to +0.25%)
    const deltaPercent = (Math.random() - 0.49) * 0.003;
    const isPennyOrHighDec = current.price < 5;
    const roundFactor = isPennyOrHighDec ? 1000 : 100;
    const newPrice = Math.round((current.price * (1 + deltaPercent)) * roundFactor) / roundFactor;
    const direction: 'up' | 'down' | 'neutral' = newPrice > current.price ? 'up' : newPrice < current.price ? 'down' : 'neutral';

    updated[sym] = {
      ...current,
      price: newPrice,
      change: Math.round((current.change + (newPrice - current.price)) * roundFactor) / roundFactor,
      changePercent: Math.round(((current.changePercent + deltaPercent * 100)) * 100) / 100,
      timestamp: new Date().toLocaleTimeString(),
      direction
    };
  }

  private notify() {
    const snapshot = { ...this.currentPrices };
    this.listeners.forEach(fn => {
      try {
        fn(snapshot);
      } catch (err) {
        console.error('Error notifying market listener', err);
      }
    });
  }
}

export const liveMarketEngine = new LiveMarketEngine();
