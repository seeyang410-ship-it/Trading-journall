import { MarketQuote } from '../types/trade';

export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema20?: number;
  ema50?: number;
  rsi?: number;
}

export const INITIAL_QUOTES: MarketQuote[] = [
  {
    symbol: 'XAUUSD',
    name: '现货黄金 (Gold / USD)',
    category: 'Commodities',
    bid: 2908.40,
    ask: 2908.75,
    price: 2908.55,
    prevClose: 2884.20,
    change: 24.35,
    changePercent: 0.84,
    high24h: 2916.50,
    low24h: 2880.10,
    volume: '248.5K',
    spread: 3.5,
    digits: 2,
    history: [2885, 2889, 2892, 2888, 2894, 2901, 2899, 2904, 2908, 2912, 2909, 2914, 2908.5]
  },
  {
    symbol: 'NAS100',
    name: '纳斯达克 100 指数 (US Tech)',
    category: 'Indices',
    bid: 21482.00,
    ask: 21483.50,
    price: 21482.75,
    prevClose: 21350.00,
    change: 132.75,
    changePercent: 0.62,
    high24h: 21560.00,
    low24h: 21310.00,
    volume: '185.2K',
    spread: 1.5,
    digits: 1,
    history: [21360, 21390, 21420, 21400, 21450, 21490, 21470, 21510, 21530, 21510, 21482]
  },
  {
    symbol: 'EURUSD',
    name: '欧元 / 美元 (Euro)',
    category: 'Forex',
    bid: 1.08420,
    ask: 1.08428,
    price: 1.08424,
    prevClose: 1.08250,
    change: 0.00174,
    changePercent: 0.16,
    high24h: 1.08640,
    low24h: 1.08180,
    volume: '94.1K',
    spread: 0.8,
    digits: 5,
    history: [1.0826, 1.0830, 1.0835, 1.0832, 1.0840, 1.0848, 1.0845, 1.0852, 1.0842]
  },
  {
    symbol: 'BTCUSD',
    name: '比特币 (Bitcoin / USD)',
    category: 'Crypto',
    bid: 95480.00,
    ask: 95495.00,
    price: 95488.50,
    prevClose: 93800.00,
    change: 1688.50,
    changePercent: 1.80,
    high24h: 96950.00,
    low24h: 93400.00,
    volume: '42.8K',
    spread: 15.0,
    digits: 1,
    history: [93900, 94200, 94600, 94400, 95100, 95800, 95400, 96200, 95900, 95488]
  },
  {
    symbol: 'US30',
    name: '道琼斯工业指数 (Wall Street)',
    category: 'Indices',
    bid: 42810.00,
    ask: 42812.50,
    price: 42811.25,
    prevClose: 42680.00,
    change: 131.25,
    changePercent: 0.31,
    high24h: 42950.00,
    low24h: 42620.00,
    volume: '112.4K',
    spread: 2.5,
    digits: 1,
    history: [42690, 42720, 42760, 42740, 42790, 42840, 42820, 42870, 42811]
  },
  {
    symbol: 'GBPUSD',
    name: '英镑 / 美元 (Cable)',
    category: 'Forex',
    bid: 1.28820,
    ask: 1.28831,
    price: 1.28825,
    prevClose: 1.28450,
    change: 0.00375,
    changePercent: 0.29,
    high24h: 1.29150,
    low24h: 1.28380,
    volume: '76.8K',
    spread: 1.1,
    digits: 5,
    history: [1.2848, 1.2855, 1.2862, 1.2858, 1.2870, 1.2885, 1.2880, 1.2895, 1.2882]
  },
  {
    symbol: 'USDJPY',
    name: '美元 / 日元 (Ninja)',
    category: 'Forex',
    bid: 152.120,
    ask: 152.132,
    price: 152.126,
    prevClose: 152.650,
    change: -0.524,
    changePercent: -0.34,
    high24h: 152.850,
    low24h: 151.720,
    volume: '88.5K',
    spread: 1.2,
    digits: 3,
    history: [152.62, 152.50, 152.42, 152.30, 152.18, 152.05, 152.25, 152.12]
  },
  {
    symbol: 'USOIL',
    name: 'WTI 原油 (Crude Oil)',
    category: 'Commodities',
    bid: 71.45,
    ask: 71.49,
    price: 71.47,
    prevClose: 70.80,
    change: 0.67,
    changePercent: 0.95,
    high24h: 72.10,
    low24h: 70.40,
    volume: '65.2K',
    spread: 0.04,
    digits: 2,
    history: [70.85, 71.05, 71.18, 71.10, 71.35, 71.60, 71.42, 71.55, 71.47]
  }
];

export interface TradingSession {
  name: string;
  city: string;
  openUtc: number; // UTC hour
  closeUtc: number;
  isOpen: boolean;
  isPeakOverlap?: boolean;
}

export function getCurrentMarketSessions(): TradingSession[] {
  const now = new Date();
  const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60;

  const isBetween = (current: number, start: number, end: number) => {
    if (start < end) {
      return current >= start && current < end;
    }
    // Crosses midnight
    return current >= start || current < end;
  };

  const londonOpen = isBetween(utcHours, 8, 16.5);
  const nyOpen = isBetween(utcHours, 13.5, 21);
  const tokyoOpen = isBetween(utcHours, 0, 9);
  const sydneyOpen = isBetween(utcHours, 21, 6);

  return [
    {
      name: '伦敦时段 (London)',
      city: 'London',
      openUtc: 8,
      closeUtc: 16.5,
      isOpen: londonOpen,
      isPeakOverlap: londonOpen && nyOpen
    },
    {
      name: '纽约时段 (New York)',
      city: 'New York',
      openUtc: 13.5,
      closeUtc: 21,
      isOpen: nyOpen,
      isPeakOverlap: londonOpen && nyOpen
    },
    {
      name: '东京时段 (Tokyo)',
      city: 'Tokyo',
      openUtc: 0,
      closeUtc: 9,
      isOpen: tokyoOpen
    },
    {
      name: '悉尼时段 (Sydney)',
      city: 'Sydney',
      openUtc: 21,
      closeUtc: 6,
      isOpen: sydneyOpen
    }
  ];
}

// Generate realistic candlestick bars with moving averages and RSI
export function generateCandlesForSymbol(symbol: string, currentPrice: number, count = 40): Candle[] {
  const candles: Candle[] = [];
  const baseTime = Date.now() - (count * 15 * 60 * 1000);
  let price = currentPrice * 0.985;
  const volatility = currentPrice * 0.0025;

  for (let i = 0; i < count; i++) {
    const timestamp = baseTime + (i * 15 * 60 * 1000);
    const date = new Date(timestamp);
    const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    
    const delta = (Math.random() - 0.47) * volatility;
    const open = price;
    const close = i === count - 1 ? currentPrice : open + delta;
    const high = Math.max(open, close) + Math.random() * volatility * 0.6;
    const low = Math.min(open, close) - Math.random() * volatility * 0.6;
    const volume = Math.floor(100 + Math.random() * 400);

    candles.push({
      time: timeStr,
      timestamp,
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100,
      volume
    });

    price = close;
  }

  // Calculate EMA 20
  const k20 = 2 / (20 + 1);
  let ema20 = candles[0].close;
  candles.forEach((c, idx) => {
    if (idx === 0) {
      c.ema20 = ema20;
    } else {
      ema20 = c.close * k20 + ema20 * (1 - k20);
      c.ema20 = Math.round(ema20 * 100) / 100;
    }
  });

  // Calculate RSI 14
  let gains = 0;
  let losses = 0;
  for (let i = 1; i < candles.length; i++) {
    const diff = candles[i].close - candles[i - 1].close;
    if (i <= 14) {
      if (diff >= 0) gains += diff;
      else losses += Math.abs(diff);
      candles[i].rsi = 50;
    } else {
      const avgGain = (gains / 14) * 13 + (diff > 0 ? diff : 0);
      const avgLoss = (losses / 14) * 13 + (diff < 0 ? Math.abs(diff) : 0);
      gains = avgGain / 14;
      losses = avgLoss / 14;
      const rs = losses === 0 ? 100 : gains / losses;
      candles[i].rsi = Math.round((100 - (100 / (1 + rs))) * 10) / 10;
    }
  }

  return candles;
}
