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

