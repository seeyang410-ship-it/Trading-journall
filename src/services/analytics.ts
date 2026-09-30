import { Trade } from '../types/trade';

export interface PerformanceSummary {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  breakevenTrades: number;
  winRate: number; // percentage (0-100)
  netProfit: number;
  grossProfit: number;
  grossLoss: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
  avgTrade: number;
  winLossRatio: number;
  largestWin: number;
  largestLoss: number;
  maxDrawdown: number;
  maxDrawdownPercent: number;
  totalCommission: number;
  totalSwap: number;
  profitabilityScore: number;
}

export interface DayPnL {
  date: string; // YYYY-MM-DD
  netProfit: number;
  tradesCount: number;
  wins: number;
  losses: number;
  trades: Trade[];
}

export interface EquityPoint {
  date: string;
  time: string;
  equity: number;
  balance: number;
  cumulativeProfit: number;
  tradeId?: string;
  symbol?: string;
}

export interface CategoryBreakdown {
  category: string;
  tradesCount: number;
  winRate: number;
  netProfit: number;
  profitFactor: number;
  avgRR?: number;
}

export function calculateSummary(trades: Trade[], initialBalance = 100000): PerformanceSummary {
  if (!trades.length) {
    return {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      breakevenTrades: 0,
      winRate: 0,
      netProfit: 0,
      grossProfit: 0,
      grossLoss: 0,
      profitFactor: 0,
      avgWin: 0,
      avgLoss: 0,
      avgTrade: 0,
      winLossRatio: 0,
      largestWin: 0,
      largestLoss: 0,
      maxDrawdown: 0,
      maxDrawdownPercent: 0,
      totalCommission: 0,
      totalSwap: 0,
      profitabilityScore: 0,
    };
  }

  let winningTrades = 0;
  let losingTrades = 0;
  let breakevenTrades = 0;
  let grossProfit = 0;
  let grossLoss = 0;
  let largestWin = 0;
  let largestLoss = 0;
  let totalCommission = 0;
  let totalSwap = 0;

  trades.forEach(t => {
    const net = t.profit + t.commission + t.swap;
    totalCommission += t.commission;
    totalSwap += t.swap;

    if (net > 0.01) {
      winningTrades++;
      grossProfit += net;
      if (net > largestWin) largestWin = net;
    } else if (net < -0.01) {
      losingTrades++;
      grossLoss += Math.abs(net);
      if (net < largestLoss) largestLoss = net;
    } else {
      breakevenTrades++;
    }
  });

  const totalTrades = trades.length;
  const netProfit = grossProfit - grossLoss;
  const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 99.9 : 0;
  const avgWin = winningTrades > 0 ? grossProfit / winningTrades : 0;
  const avgLoss = losingTrades > 0 ? grossLoss / losingTrades : 0;
  const avgTrade = totalTrades > 0 ? netProfit / totalTrades : 0;
  const winLossRatio = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? 99.9 : 0;

  // Max Drawdown calculation
  const sorted = [...trades].sort((a, b) => new Date(a.closeTime).getTime() - new Date(b.closeTime).getTime());
  let runningBalance = initialBalance;
  let peak = initialBalance;
  let maxDD = 0;
  let maxDDPercent = 0;

  for (const t of sorted) {
    runningBalance += (t.profit + t.commission + t.swap);
    if (runningBalance > peak) {
      peak = runningBalance;
    } else {
      const dd = peak - runningBalance;
      const ddPct = peak > 0 ? (dd / peak) * 100 : 0;
      if (dd > maxDD) maxDD = dd;
      if (ddPct > maxDDPercent) maxDDPercent = ddPct;
    }
  }

  // Composite profitability score (0-100)
  const score = Math.min(100, Math.max(0, Math.round((winRate * 0.4) + (Math.min(profitFactor, 3) / 3 * 35) + (Math.min(winLossRatio, 3) / 3 * 25))));

  return {
    totalTrades,
    winningTrades,
    losingTrades,
    breakevenTrades,
    winRate: Math.round(winRate * 10) / 10,
    netProfit: Math.round(netProfit * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    grossLoss: Math.round(grossLoss * 100) / 100,
    profitFactor: Math.round(profitFactor * 100) / 100,
    avgWin: Math.round(avgWin * 100) / 100,
    avgLoss: Math.round(avgLoss * 100) / 100,
    avgTrade: Math.round(avgTrade * 100) / 100,
    winLossRatio: Math.round(winLossRatio * 100) / 100,
    largestWin: Math.round(largestWin * 100) / 100,
    largestLoss: Math.round(largestLoss * 100) / 100,
    maxDrawdown: Math.round(maxDD * 100) / 100,
    maxDrawdownPercent: Math.round(maxDDPercent * 10) / 10,
    totalCommission: Math.round(totalCommission * 100) / 100,
    totalSwap: Math.round(totalSwap * 100) / 100,
    profitabilityScore: score,
  };
}

export function getDailyPnLMap(trades: Trade[]): Map<string, DayPnL> {
  const map = new Map<string, DayPnL>();

  trades.forEach(t => {
    const d = t.closeTime ? t.closeTime.slice(0, 10) : t.openTime.slice(0, 10);
    const net = t.profit + t.commission + t.swap;
    
    if (!map.has(d)) {
      map.set(d, {
        date: d,
        netProfit: 0,
        tradesCount: 0,
        wins: 0,
        losses: 0,
        trades: []
      });
    }

    const current = map.get(d)!;
    current.netProfit += net;
    current.tradesCount += 1;
    if (net > 0) current.wins += 1;
    else if (net < 0) current.losses += 1;
    current.trades.push(t);
  });

  return map;
}

export function getEquityCurve(trades: Trade[], initialBalance = 100000): EquityPoint[] {
  const sorted = [...trades].sort((a, b) => new Date(a.closeTime).getTime() - new Date(b.closeTime).getTime());
  
  if (sorted.length === 0) {
    return [{
      date: new Date().toISOString().slice(0, 10),
      time: '00:00',
      equity: initialBalance,
      balance: initialBalance,
      cumulativeProfit: 0
    }];
  }

  let runningProfit = 0;
  const points: EquityPoint[] = [];

  // Start point
  const firstDate = sorted[0].openTime.slice(0, 10);
  points.push({
    date: firstDate,
    time: '00:00',
    equity: initialBalance,
    balance: initialBalance,
    cumulativeProfit: 0
  });

  sorted.forEach(t => {
    const net = t.profit + t.commission + t.swap;
    runningProfit += net;
    const dt = new Date(t.closeTime);
    points.push({
      date: t.closeTime.slice(0, 10),
      time: `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`,
      equity: Math.round((initialBalance + runningProfit) * 100) / 100,
      balance: Math.round((initialBalance + runningProfit) * 100) / 100,
      cumulativeProfit: Math.round(runningProfit * 100) / 100,
      tradeId: t.id,
      symbol: t.symbol
    });
  });

  return points;
}

export function getBreakdownBySetup(trades: Trade[]): CategoryBreakdown[] {
  const groups: Record<string, Trade[]> = {};
  trades.forEach(t => {
    const key = t.setup || '未归类';
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  return Object.entries(groups).map(([category, list]) => {
    const wins = list.filter(t => (t.profit + t.commission + t.swap) > 0).length;
    const net = list.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossWin = list.filter(t => (t.profit + t.commission + t.swap) > 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossLoss = Math.abs(list.filter(t => (t.profit + t.commission + t.swap) < 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0));
    const pf = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? 99.9 : 0;
    
    return {
      category,
      tradesCount: list.length,
      winRate: Math.round((wins / list.length) * 100),
      netProfit: Math.round(net * 100) / 100,
      profitFactor: Math.round(pf * 100) / 100
    };
  }).sort((a, b) => b.netProfit - a.netProfit);
}

export function getBreakdownBySymbol(trades: Trade[]): CategoryBreakdown[] {
  const groups: Record<string, Trade[]> = {};
  trades.forEach(t => {
    const key = t.symbol;
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });

  return Object.entries(groups).map(([category, list]) => {
    const wins = list.filter(t => (t.profit + t.commission + t.swap) > 0).length;
    const net = list.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossWin = list.filter(t => (t.profit + t.commission + t.swap) > 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossLoss = Math.abs(list.filter(t => (t.profit + t.commission + t.swap) < 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0));
    const pf = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? 99.9 : 0;

    return {
      category,
      tradesCount: list.length,
      winRate: Math.round((wins / list.length) * 100),
      netProfit: Math.round(net * 100) / 100,
      profitFactor: Math.round(pf * 100) / 100
    };
  }).sort((a, b) => b.netProfit - a.netProfit);
}

export function getBreakdownByDirection(trades: Trade[]): CategoryBreakdown[] {
  const longs = trades.filter(t => t.type === 'BUY');
  const shorts = trades.filter(t => t.type === 'SELL');

  const calc = (name: string, list: Trade[]): CategoryBreakdown => {
    if (!list.length) return { category: name, tradesCount: 0, winRate: 0, netProfit: 0, profitFactor: 0 };
    const wins = list.filter(t => (t.profit + t.commission + t.swap) > 0).length;
    const net = list.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossWin = list.filter(t => (t.profit + t.commission + t.swap) > 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossLoss = Math.abs(list.filter(t => (t.profit + t.commission + t.swap) < 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0));
    const pf = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? 99.9 : 0;
    return {
      category: name,
      tradesCount: list.length,
      winRate: Math.round((wins / list.length) * 100),
      netProfit: Math.round(net * 100) / 100,
      profitFactor: Math.round(pf * 100) / 100
    };
  };

  return [calc('多头 (Long / Buy)', longs), calc('空头 (Short / Sell)', shorts)];
}

export function getBreakdownByDayOfWeek(trades: Trade[]): CategoryBreakdown[] {
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const dayBuckets: Record<number, Trade[]> = { 1: [], 2: [], 3: [], 4: [], 5: [] };

  trades.forEach(t => {
    const d = new Date(t.closeTime).getDay();
    if (dayBuckets[d]) {
      dayBuckets[d].push(t);
    }
  });

  return [1, 2, 3, 4, 5].map(d => {
    const list = dayBuckets[d] || [];
    if (!list.length) return { category: dayNames[d], tradesCount: 0, winRate: 0, netProfit: 0, profitFactor: 0 };
    const wins = list.filter(t => (t.profit + t.commission + t.swap) > 0).length;
    const net = list.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossWin = list.filter(t => (t.profit + t.commission + t.swap) > 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    const grossLoss = Math.abs(list.filter(t => (t.profit + t.commission + t.swap) < 0).reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0));
    const pf = grossLoss > 0 ? grossWin / grossLoss : grossWin > 0 ? 99.9 : 0;
    return {
      category: dayNames[d],
      tradesCount: list.length,
      winRate: Math.round((wins / list.length) * 100),
      netProfit: Math.round(net * 100) / 100,
      profitFactor: Math.round(pf * 100) / 100
    };
  });
}
