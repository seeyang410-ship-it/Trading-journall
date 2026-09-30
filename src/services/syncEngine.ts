import { Trade, MT5Account, DailyJournalEntry, PlaybookStrategy } from '../types/trade';

export interface AppStatePayload {
  version: string;
  timestamp: string;
  accounts: MT5Account[];
  trades: Trade[];
  journals: DailyJournalEntry[];
  playbooks?: PlaybookStrategy[];
  activeAccountId: string;
  deviceId: string;
  deviceType: 'desktop' | 'mobile';
}

const STORAGE_KEY = 'alphalog_manual_clean_v5';
const SYNC_CHANNEL_NAME = 'alphalog_cross_tab_sync';

export class SyncEngine {
  private channel: BroadcastChannel | null = null;
  private onRemoteUpdateCallback: ((state: Partial<AppStatePayload>) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
        this.channel.onmessage = (event) => {
          if (event.data && this.onRemoteUpdateCallback) {
            this.onRemoteUpdateCallback(event.data);
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported in this context', e);
      }
    }
  }

  public subscribeRemoteUpdate(callback: (state: Partial<AppStatePayload>) => void) {
    this.onRemoteUpdateCallback = callback;
  }

  public async saveToLocal(state: AppStatePayload) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Notify other open tabs/windows
      if (this.channel) {
        this.channel.postMessage(state);
      }
      // Also push to server-side sync API so phone can pull
      fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      }).catch(() => {
        // Silent catch for offline or static hosting
      });
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }

  public async fetchServerState(): Promise<AppStatePayload | null> {
    try {
      const res = await fetch('/api/sync');
      if (res.ok) {
        const data = await res.json();
        if (data.state && data.state.trades) {
          return data.state as AppStatePayload;
        }
      }
    } catch (e) {
      // offline or not supported
    }
    return null;
  }

  public loadFromLocal(): AppStatePayload | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as AppStatePayload;
      }
    } catch (e) {
      console.error('Failed to parse state from localStorage', e);
    }
    return null;
  }

  public exportBackupJson(state: AppStatePayload): string {
    return JSON.stringify(state, null, 2);
  }

  public importBackupJson(jsonString: string): AppStatePayload {
    const parsed = JSON.parse(jsonString);
    if (!parsed.trades || !Array.isArray(parsed.trades)) {
      throw new Error('无效的备份文件结构');
    }
    return parsed as AppStatePayload;
  }

  public generatePairingCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'TZ-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    code += '-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}

export const syncEngine = new SyncEngine();
