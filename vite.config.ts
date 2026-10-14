import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// In-memory store for real MT5 incoming webhook deals and cross-device sync
const inMemoryDeals: any[] = [];
let latestCloudSyncState: any = null;

function apiBackendPlugin(): Plugin {
  return {
    name: 'alphalog-backend-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // MT5 Webhook receiver endpoint
        if (req.url === '/api/mt5/webhook' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              inMemoryDeals.unshift({
                ...data,
                receivedAt: new Date().toISOString()
              });
              if (inMemoryDeals.length > 200) inMemoryDeals.pop();
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, message: 'Deal received', ticket: data.ticket }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // Endpoint to poll latest MT5 deals received
        if (req.url === '/api/mt5/deals' && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, deals: inMemoryDeals }));
          return;
        }

        // Cross-device cloud sync: save
        if (req.url === '/api/sync' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              latestCloudSyncState = JSON.parse(body);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
            } catch (err: any) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // Cross-device cloud sync: fetch
        if (req.url === '/api/sync' && req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, state: latestCloudSyncState }));
          return;
        }

        // Global Market Financial Data API: Search symbols
        if (req.url?.startsWith('/api/market/search') && req.method === 'GET') {
          const parsedUrl = new URL(req.url, 'http://localhost');
          const query = (parsedUrl.searchParams.get('q') || '').trim();
          if (!query) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, count: 0, results: [] }));
            return;
          }

          fetch(`https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=20&newsCount=0`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          })
            .then(r => r.json())
            .then(data => {
              const quotes = data.quotes || [];
              const results = quotes.map((item: any) => ({
                symbol: item.symbol,
                name: item.shortname || item.longname || item.symbol,
                exchange: item.exchDisp || item.exchange || 'GLOBAL',
                type: item.quoteType || item.typeDisp || 'EQUITY',
                sector: item.sector || item.industry || item.sectorDisp || '',
                score: item.score || 0
              }));
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true, count: results.length, results }));
            })
            .catch(err => {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message, results: [] }));
            });
          return;
        }

        // Global Market Financial Data API: Quotes
        if (req.url?.startsWith('/api/market/quote') && req.method === 'GET') {
          const parsedUrl = new URL(req.url, 'http://localhost');
          const symbolsStr = (parsedUrl.searchParams.get('symbols') || '').trim();
          const symbols = symbolsStr.split(',').map(s => s.trim()).filter(Boolean);

          if (symbols.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, quotes: {} }));
            return;
          }

          Promise.all(symbols.map(async sym => {
            try {
              const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
              });
              const d = await r.json();
              const meta = d.chart?.result?.[0]?.meta;
              if (meta && meta.regularMarketPrice !== undefined) {
                const prev = meta.chartPreviousClose || meta.previousClose || meta.regularMarketPrice;
                const price = meta.regularMarketPrice;
                const change = price - prev;
                const changePct = prev > 0 ? (change / prev) * 100 : 0;
                return {
                  symbol: sym,
                  price: price,
                  prevClose: prev,
                  change: Math.round(change * 1000) / 1000,
                  changePercent: Math.round(changePct * 100) / 100,
                  high24h: meta.regularMarketDayHigh || price,
                  low24h: meta.regularMarketDayLow || price,
                  currency: meta.currency || 'USD',
                  exchangeName: meta.exchangeName || '',
                  volume: meta.regularMarketVolume ? `${(meta.regularMarketVolume / 1000).toFixed(1)}K` : 'N/A'
                };
              }
              return null;
            } catch {
              return null;
            }
          })).then(results => {
            const quotesMap: Record<string, any> = {};
            results.forEach(resItem => {
              if (resItem) quotesMap[resItem.symbol] = resItem;
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, quotes: quotesMap }));
          }).catch(err => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message, quotes: {} }));
          });
          return;
        }

        // Global Market Financial Data API: Candles
        if (req.url?.startsWith('/api/market/candles') && req.method === 'GET') {
          const parsedUrl = new URL(req.url, 'http://localhost');
          const symbol = (parsedUrl.searchParams.get('symbol') || 'AAPL').trim();
          const interval = (parsedUrl.searchParams.get('interval') || '15m').trim();
          const range = (parsedUrl.searchParams.get('range') || '2d').trim();

          fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${encodeURIComponent(interval)}&range=${encodeURIComponent(range)}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
          })
            .then(r => r.json())
            .then(data => {
              const resObj = data.chart?.result?.[0];
              const timestamps = resObj?.timestamp || [];
              const quotes = resObj?.indicators?.quote?.[0] || {};
              const meta = resObj?.meta || {};

              const candles: any[] = [];
              for (let i = 0; i < timestamps.length; i++) {
                const o = quotes.open?.[i];
                const h = quotes.high?.[i];
                const l = quotes.low?.[i];
                const c = quotes.close?.[i];
                const v = quotes.volume?.[i] || 0;
                if (o != null && h != null && l != null && c != null) {
                  const d = new Date(timestamps[i] * 1000);
                  const timeStr = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
                  candles.push({
                    time: timeStr,
                    timestamp: timestamps[i] * 1000,
                    open: Math.round(o * 100) / 100,
                    high: Math.round(h * 100) / 100,
                    low: Math.round(l * 100) / 100,
                    close: Math.round(c * 100) / 100,
                    volume: v
                  });
                }
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                success: true,
                symbol,
                currency: meta.currency || 'USD',
                exchange: meta.exchangeName || '',
                candles
              }));
            })
            .catch(err => {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: err.message, candles: [] }));
            });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  // Dynamically adapt base path for GitHub Pages (e.g. /Trading-journall/) or relative in local dev
  let base = process.env.VITE_BASE_PATH ||
    (process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/` : './');

  if (base && base !== './') {
    if (!base.startsWith('/')) base = '/' + base;
    if (!base.endsWith('/')) base = base + '/';
    base = base.replace(/\/+/g, '/');
  }

  return {
    base,
    plugins: [react(), tailwindcss(), apiBackendPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

