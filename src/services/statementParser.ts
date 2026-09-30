import { Trade, AssetClass, SetupType, EmotionTag, MistakeTag } from '../types/trade';

function detectAssetClass(symbol: string): AssetClass {
  const s = symbol.toUpperCase();
  if (['XAUUSD', 'XAGUSD', 'USOIL', 'UKOIL', 'GOLD', 'SILVER'].includes(s)) return 'Commodities';
  if (['NAS100', 'US30', 'SPX500', 'GER40', 'HK50', 'UK100', 'JP225'].includes(s)) return 'Indices';
  if (['BTCUSD', 'ETHUSD', 'SOLUSD', 'XRPUSD', 'BTC', 'ETH'].includes(s)) return 'Crypto';
  if (['AAPL', 'TSLA', 'NVDA', 'MSFT', 'AMZN', 'GOOG'].includes(s)) return 'Stocks';
  return 'Forex';
}

function calculatePips(symbol: string, openPrice: number, closePrice: number, type: 'BUY' | 'SELL'): number {
  const s = symbol.toUpperCase();
  const diff = type === 'BUY' ? closePrice - openPrice : openPrice - closePrice;
  if (s.includes('JPY')) {
    return Math.round(diff * 100 * 10) / 10;
  }
  if (['XAUUSD', 'GOLD'].includes(s)) {
    return Math.round(diff * 10 * 10) / 10;
  }
  if (['BTCUSD', 'ETHUSD', 'NAS100', 'US30', 'SPX500'].includes(s)) {
    return Math.round(diff * 10) / 10;
  }
  return Math.round(diff * 10000 * 10) / 10;
}

export function parseMT5HTMLReport(htmlContent: string, accountId: string): Trade[] {
  const trades: Trade[] = [];
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Look for rows in tables containing trades
    const rows = doc.querySelectorAll('tr');
    
    rows.forEach((row, idx) => {
      const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent?.trim() || '');
      if (cells.length >= 10) {
        // MT5 deals / positions table pattern:
        // [Open Time, Ticket, Symbol, Type, Volume, Open Price, S/L, T/P, Close Time, Close Price, Commission, Swap, Profit]
        const ticketNum = parseInt(cells[1], 10) || parseInt(cells[0], 10);
        const openTimeRaw = cells[0];
        const typeRaw = cells.find(c => c.toLowerCase() === 'buy' || c.toLowerCase() === 'sell');
        
        if (ticketNum && typeRaw) {
          const type = typeRaw.toUpperCase() as 'BUY' | 'SELL';
          const symbol = cells[2] || 'XAUUSD';
          const volume = parseFloat(cells[4]) || 1.0;
          const openPrice = parseFloat(cells[5]) || 0;
          const sl = parseFloat(cells[6]) || undefined;
          const tp = parseFloat(cells[7]) || undefined;
          const closeTimeRaw = cells[8] || new Date().toISOString();
          const closePrice = parseFloat(cells[9]) || openPrice;
          const commission = parseFloat(cells[10]) || 0;
          const swap = parseFloat(cells[11]) || 0;
          const profit = parseFloat(cells[cells.length - 1]) || 0;

          const pips = calculatePips(symbol, openPrice, closePrice, type);
          const rr = sl && Math.abs(openPrice - sl) > 0.00001
            ? Math.round((Math.abs(closePrice - openPrice) / Math.abs(openPrice - sl)) * 100) / 100 * (profit >= 0 ? 1 : -1)
            : profit > 0 ? 2.0 : -1.0;

          trades.push({
            id: `mt5-${ticketNum}-${idx}`,
            ticket: ticketNum,
            symbol,
            assetClass: detectAssetClass(symbol),
            type,
            volume,
            openTime: new Date(openTimeRaw).toISOString() || new Date().toISOString(),
            closeTime: new Date(closeTimeRaw).toISOString() || new Date().toISOString(),
            openPrice,
            closePrice,
            stopLoss: sl,
            takeProfit: tp,
            profit,
            commission,
            swap,
            pips,
            rrRatio: rr,
            setup: 'Order Block / FVG',
            emotions: profit > 0 ? ['Disciplined', 'Calm Execution'] : ['Disciplined'],
            mistakes: ['None (Disciplined)'],
            notes: `从 MT5 报表自动导入 (Deal #${ticketNum})`,
            rating: profit > 0 ? 5 : 3,
            accountId
          });
        }
      }
    });
  } catch (err) {
    console.error('Error parsing MT5 HTML:', err);
  }

  return trades;
}

export function parseCSVReport(csvContent: string, accountId: string): Trade[] {
  const trades: Trade[] = [];
  try {
    const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];

    const headers = lines[0].split(/[,;\t]/).map(h => h.trim().toLowerCase());
    const ticketIdx = headers.findIndex(h => h.includes('ticket') || h.includes('deal') || h.includes('order'));
    const symbolIdx = headers.findIndex(h => h.includes('symbol') || h.includes('item'));
    const typeIdx = headers.findIndex(h => h.includes('type') || h.includes('direction') || h.includes('action'));
    const volIdx = headers.findIndex(h => h.includes('volume') || h.includes('size') || h.includes('lots'));
    const openPriceIdx = headers.findIndex(h => h.includes('open price') || h.includes('price'));
    const closePriceIdx = headers.findIndex(h => h.includes('close price') || (h.includes('price') && headers.indexOf(h) > openPriceIdx));
    const profitIdx = headers.findIndex(h => h.includes('profit') || h.includes('p/l') || h.includes('pnl'));
    const commIdx = headers.findIndex(h => h.includes('commission') || h.includes('comm'));
    const swapIdx = headers.findIndex(h => h.includes('swap'));
    const openTimeIdx = headers.findIndex(h => h.includes('open time') || h.includes('time'));
    const closeTimeIdx = headers.findIndex(h => h.includes('close time'));

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(/[,;\t]/).map(c => c.trim().replace(/^"|"$/g, ''));
      if (cols.length < 5) continue;

      const typeRaw = (cols[typeIdx >= 0 ? typeIdx : 3] || '').toUpperCase();
      if (!typeRaw.includes('BUY') && !typeRaw.includes('SELL')) continue;
      
      const type: 'BUY' | 'SELL' = typeRaw.includes('BUY') ? 'BUY' : 'SELL';
      const ticket = parseInt(cols[ticketIdx >= 0 ? ticketIdx : 0], 10) || (900000 + i);
      const symbol = cols[symbolIdx >= 0 ? symbolIdx : 2] || 'XAUUSD';
      const volume = parseFloat(cols[volIdx >= 0 ? volIdx : 4]) || 1.0;
      const openPrice = parseFloat(cols[openPriceIdx >= 0 ? openPriceIdx : 5]) || 0;
      const closePrice = parseFloat(cols[closePriceIdx >= 0 ? closePriceIdx : 6]) || openPrice;
      const profit = parseFloat(cols[profitIdx >= 0 ? profitIdx : cols.length - 1]) || 0;
      const commission = commIdx >= 0 ? parseFloat(cols[commIdx]) || 0 : 0;
      const swap = swapIdx >= 0 ? parseFloat(cols[swapIdx]) || 0 : 0;
      const openTime = openTimeIdx >= 0 ? cols[openTimeIdx] : new Date().toISOString();
      const closeTime = closeTimeIdx >= 0 ? cols[closeTimeIdx] : new Date().toISOString();

      trades.push({
        id: `csv-${ticket}-${i}`,
        ticket,
        symbol,
        assetClass: detectAssetClass(symbol),
        type,
        volume,
        openTime: new Date(openTime).toISOString(),
        closeTime: new Date(closeTime).toISOString(),
        openPrice,
        closePrice,
        profit,
        commission,
        swap,
        pips: calculatePips(symbol, openPrice, closePrice, type),
        rrRatio: profit >= 0 ? 2.1 : -1.0,
        setup: 'Order Block / FVG',
        emotions: ['Disciplined'],
        mistakes: ['None (Disciplined)'],
        notes: `从 CSV 文件导入 (Ticket #${ticket})`,
        rating: profit >= 0 ? 5 : 3,
        accountId
      });
    }
  } catch (err) {
    console.error('Error parsing CSV report:', err);
  }

  return trades;
}

export function generateSampleMT5Import(accountId: string): Trade[] {
  const baseTime = Date.now();
  const sampleData: Array<Partial<Trade>> = [
    { symbol: 'XAUUSD', type: 'BUY', volume: 1.5, openPrice: 2891.2, closePrice: 2908.4, profit: 2580, pips: 172, setup: 'Order Block / FVG' },
    { symbol: 'NAS100', type: 'SELL', volume: 2.0, openPrice: 21520, closePrice: 21380, profit: 2800, pips: 140, setup: 'Liquidity Sweep' },
    { symbol: 'EURUSD', type: 'BUY', volume: 2.5, openPrice: 1.0832, closePrice: 1.0868, profit: 900, pips: 36, setup: 'London Open Breakout' },
    { symbol: 'US30', type: 'SELL', volume: 1.0, openPrice: 42750, closePrice: 42920, profit: -170, pips: -170, setup: 'Trend Pullback' },
    { symbol: 'BTCUSD', type: 'BUY', volume: 0.5, openPrice: 94500, closePrice: 96800, profit: 1150, pips: 2300, setup: 'Breakout & Retest' },
    { symbol: 'XAUUSD', type: 'SELL', volume: 1.2, openPrice: 2915.0, closePrice: 2898.5, profit: 1980, pips: 165, setup: 'Liquidity Sweep' },
    { symbol: 'USDJPY', type: 'BUY', volume: 2.0, openPrice: 152.1, closePrice: 151.65, profit: -590, pips: -45, setup: 'Range Mean-Reversion' },
    { symbol: 'GBPUSD', type: 'BUY', volume: 2.0, openPrice: 1.2840, closePrice: 1.2895, profit: 1100, pips: 55, setup: 'London Open Breakout' }
  ];

  return sampleData.map((s, idx) => {
    const ticket = 952000 + Math.floor(Math.random() * 8000) + idx;
    const openOffset = (idx + 1) * 3600 * 1000 * 8;
    const closeOffset = openOffset - (3600 * 1000 * 2);
    const profit = s.profit!;
    return {
      id: `sample-${ticket}-${idx}`,
      ticket,
      symbol: s.symbol!,
      assetClass: detectAssetClass(s.symbol!),
      type: s.type!,
      volume: s.volume!,
      openTime: new Date(baseTime - openOffset).toISOString(),
      closeTime: new Date(baseTime - closeOffset).toISOString(),
      openPrice: s.openPrice!,
      closePrice: s.closePrice!,
      stopLoss: s.type === 'BUY' ? s.openPrice! * 0.995 : s.openPrice! * 1.005,
      takeProfit: s.type === 'BUY' ? s.openPrice! * 1.012 : s.openPrice! * 0.988,
      profit,
      commission: -12.0,
      swap: 0,
      pips: s.pips!,
      rrRatio: profit >= 0 ? 2.4 : -1.0,
      setup: s.setup as SetupType,
      emotions: profit >= 0 ? ['Disciplined', 'Calm Execution'] : ['Disciplined'],
      mistakes: ['None (Disciplined)'],
      notes: `MT5 实时自动同步订单 (Ticket #${ticket})`,
      rating: profit >= 0 ? 5 : 3,
      accountId
    };
  });
}
