import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navigation, TabType } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { TradingJournalView } from './components/TradingJournalView';
import { NewsView } from './components/NewsView';
import { NotesView } from './components/NotesView';
import { NewTradeModal } from './components/NewTradeModal';
import { DayDetailsModal } from './components/DayDetailsModal';
import { TradeDetailModal } from './components/TradeDetailModal';
import { ImportModal } from './components/ImportModal';
import { AddAccountModal } from './components/AddAccountModal';
import { EditCapitalModal } from './components/EditCapitalModal';
import { Trade, MT5Account, DailyJournalEntry, PlaybookStrategy } from './types/trade';
import { INITIAL_MT5_ACCOUNTS, INITIAL_TRADES, INITIAL_JOURNALS, INITIAL_PLAYBOOKS } from './data/seedTrades';
import { syncEngine, AppStatePayload } from './services/syncEngine';

export default function App() {
  const [accounts, setAccounts] = useState<MT5Account[]>(INITIAL_MT5_ACCOUNTS);
  const [activeAccountId, setActiveAccountId] = useState<string>(INITIAL_MT5_ACCOUNTS[0].id);
  const [trades, setTrades] = useState<Trade[]>(INITIAL_TRADES);
  const [journals, setJournals] = useState<DailyJournalEntry[]>(INITIAL_JOURNALS);
  const [playbooks, setPlaybooks] = useState<PlaybookStrategy[]>(INITIAL_PLAYBOOKS);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Modals state
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isEditCapitalOpen, setIsEditCapitalOpen] = useState(false);
  const [selectedDayModal, setSelectedDayModal] = useState<string | null>(null);
  const [selectedTradeModal, setSelectedTradeModal] = useState<Trade | null>(null);
  const [newTradePrefill, setNewTradePrefill] = useState<Partial<Trade> | undefined>(undefined);

  // Active account instance
  const activeAccount = useMemo(() => {
    return accounts.find(a => a.id === activeAccountId) || accounts[0] || null;
  }, [accounts, activeAccountId]);

  // Trades of the active account
  const accountTrades = useMemo(() => {
    return trades.filter(t => t.accountId === activeAccountId);
  }, [trades, activeAccountId]);

  // Total net profit of current account trades
  const totalNetProfit = useMemo(() => {
    return accountTrades.reduce((acc, t) => acc + ((t.profit || 0) + (t.commission || 0) + (t.swap || 0)), 0);
  }, [accountTrades]);

  // Load state from local storage or cloud server on mount
  useEffect(() => {
    const initSync = async () => {
      // 1. Try local storage first
      const saved = syncEngine.loadFromLocal();
      if (saved && saved.trades) {
        // Filter out legacy mock demo records
        const userTrades = (saved.trades || []).filter(t => 
          !t.id.startsWith('mock-') && 
          t.ticket !== 982104 && 
          t.ticket !== 982105 && 
          t.ticket !== 982106
        );
        setAccounts(saved.accounts || INITIAL_MT5_ACCOUNTS);
        setActiveAccountId(saved.activeAccountId || INITIAL_MT5_ACCOUNTS[0].id);
        setTrades(userTrades);
        setJournals(saved.journals || INITIAL_JOURNALS);
        if (saved.playbooks && saved.playbooks.length > 0) {
          setPlaybooks(saved.playbooks);
        }
        return;
      }

      // 2. If nothing in local storage, pull from cloud backend
      const serverState = await syncEngine.fetchServerState();
      if (serverState && serverState.trades) {
        const userTrades = (serverState.trades || []).filter(t => 
          !t.id.startsWith('mock-') && 
          t.ticket !== 982104 && 
          t.ticket !== 982105
        );
        setAccounts(serverState.accounts || INITIAL_MT5_ACCOUNTS);
        setActiveAccountId(serverState.activeAccountId || INITIAL_MT5_ACCOUNTS[0].id);
        setTrades(userTrades);
        setJournals(serverState.journals || INITIAL_JOURNALS);
        if (serverState.playbooks && serverState.playbooks.length > 0) {
          setPlaybooks(serverState.playbooks);
        }
      }
    };

    initSync();
  }, []);

  // Construct current app state payload
  const currentPayload: AppStatePayload = useMemo(() => ({
    version: '3.0.0',
    timestamp: new Date().toISOString(),
    accounts,
    trades,
    journals,
    playbooks,
    activeAccountId,
    deviceId: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 'mobile_device' : 'desktop_workstation') : 'device_node',
    deviceType: typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop'
  }), [accounts, trades, journals, playbooks, activeAccountId]);

  // Save to sync engine (local storage + broadcast channel + server API)
  useEffect(() => {
    syncEngine.saveToLocal(currentPayload);
  }, [currentPayload]);

  // Subscribe to remote updates across tabs
  useEffect(() => {
    syncEngine.subscribeRemoteUpdate((remote) => {
      if (remote.trades) setTrades(remote.trades);
      if (remote.accounts) setAccounts(remote.accounts);
      if (remote.journals) setJournals(remote.journals);
      if (remote.playbooks) setPlaybooks(remote.playbooks);
      if (remote.activeAccountId) setActiveAccountId(remote.activeAccountId);
    });
  }, []);

  // Handlers
  const handleSaveTrade = (newTrade: Trade) => {
    setTrades(prev => {
      const idx = prev.findIndex(t => t.id === newTrade.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newTrade;
        return copy;
      }
      return [newTrade, ...prev];
    });

    // Update active account balance
    if (activeAccount) {
      const net = newTrade.profit + newTrade.commission + newTrade.swap;
      setAccounts(prev => prev.map(a => a.id === activeAccountId ? {
        ...a,
        currentBalance: Math.round((a.currentBalance + net) * 100) / 100,
        equity: Math.round((a.equity + net) * 100) / 100,
        lastSyncTime: new Date().toISOString()
      } : a));
    }
  };

  const handleDeleteTrade = (tradeId: string) => {
    setTrades(prev => prev.filter(t => t.id !== tradeId));
  };

  const handleImportTrades = (newTrades: Trade[]) => {
    setTrades(prev => {
      const existingTickets = new Set(prev.map(t => t.ticket));
      const filtered = newTrades.filter(t => !existingTickets.has(t.ticket));
      return [...filtered, ...prev];
    });

    // Update active account balance with newly imported trades
    const addedProfit = newTrades.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
    if (activeAccount) {
      setAccounts(prev => prev.map(a => a.id === activeAccountId ? {
        ...a,
        currentBalance: Math.round((a.currentBalance + addedProfit) * 100) / 100,
        equity: Math.round((a.equity + addedProfit) * 100) / 100,
        lastSyncTime: new Date().toISOString()
      } : a));
    }
  };

  const handleSaveJournal = (entry: DailyJournalEntry) => {
    setJournals(prev => {
      const idx = prev.findIndex(j => j.date === entry.date);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = entry;
        return copy;
      }
      return [entry, ...prev];
    });
  };

  const handleUpdateAccount = (updated: MT5Account) => {
    setAccounts(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleAddAccount = (newAcc: MT5Account) => {
    setAccounts(prev => [newAcc, ...prev]);
    setActiveAccountId(newAcc.id);
  };

  const handleRestoreAppState = (restored: AppStatePayload) => {
    setAccounts(restored.accounts);
    setTrades(restored.trades);
    setJournals(restored.journals);
    setActiveAccountId(restored.activeAccountId);
  };

  const handleClearDemoData = () => {
    setTrades([]);
    if (activeAccount) {
      setAccounts(prev => prev.map(a => a.id === activeAccountId ? {
        ...a,
        currentBalance: a.initialBalance,
        equity: a.initialBalance
      } : a));
    }
  };

  const handleNavigateToJournal = (dateStr: string) => {
    setActiveTab('journal');
  };

  const handleAddPlaybook = (newPb: PlaybookStrategy) => {
    setPlaybooks(prev => [newPb, ...prev]);
  };

  const handleDeletePlaybook = (id: string) => {
    setPlaybooks(prev => prev.filter(p => p.id !== id));
  };

  const handleResetDefaultPlaybooks = () => {
    setPlaybooks(INITIAL_PLAYBOOKS);
  };

  const handleSaveCapital = (newInitialBalance: number, newAccountName?: string) => {
    setAccounts(prev => prev.map(a => {
      if (a.id === activeAccountId) {
        const currentBalance = newInitialBalance + totalNetProfit;
        return {
          ...a,
          accountName: newAccountName || a.accountName,
          initialBalance: newInitialBalance,
          currentBalance,
          equity: currentBalance
        };
      }
      return a;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accounts={accounts}
        activeAccount={activeAccount}
        onSelectAccount={(acc) => setActiveAccountId(acc.id)}
        onOpenNewTrade={() => {
          setNewTradePrefill(undefined);
          setIsNewTradeOpen(true);
        }}
        onOpenImport={() => setIsImportOpen(true)}
        onClearDemoData={handleClearDemoData}
        onOpenAddAccountModal={() => setIsAddAccountOpen(true)}
        onOpenEditCapital={() => setIsEditCapitalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 px-4 lg:px-8 py-5">
        {activeTab === 'dashboard' && (
          <DashboardView
            trades={accountTrades}
            account={activeAccount}
            onSelectDay={(d) => setSelectedDayModal(d)}
            onSelectTrade={(t) => setSelectedTradeModal(t)}
            onOpenEditCapital={() => setIsEditCapitalOpen(true)}
          />
        )}

        {activeTab === 'journal' && (
          <TradingJournalView
            trades={accountTrades}
            onSelectTrade={(t) => setSelectedTradeModal(t)}
            onDeleteTrade={handleDeleteTrade}
            onOpenNewTrade={() => {
              setNewTradePrefill(undefined);
              setIsNewTradeOpen(true);
            }}
            journals={journals}
            onSaveJournal={handleSaveJournal}
            playbooks={playbooks}
            onAddPlaybook={handleAddPlaybook}
            onDeletePlaybook={handleDeletePlaybook}
            onResetDefaultPlaybooks={handleResetDefaultPlaybooks}
          />
        )}

        {activeTab === 'news' && (
          <NewsView />
        )}

        {activeTab === 'notes' && (
          <NotesView />
        )}
      </main>

      {/* Modals */}
      <NewTradeModal
        isOpen={isNewTradeOpen}
        onClose={() => setIsNewTradeOpen(false)}
        onSaveTrade={handleSaveTrade}
        accountId={activeAccountId}
        initialData={newTradePrefill}
        availableSetups={playbooks.map(p => p.name)}
      />

      <ImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImportTrades={handleImportTrades}
        accountId={activeAccountId}
      />

      <AddAccountModal
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        onAddAccount={handleAddAccount}
      />

      <EditCapitalModal
        isOpen={isEditCapitalOpen}
        onClose={() => setIsEditCapitalOpen(false)}
        account={activeAccount}
        onSaveCapital={handleSaveCapital}
        totalNetProfit={totalNetProfit}
      />

      <DayDetailsModal
        dateStr={selectedDayModal}
        onClose={() => setSelectedDayModal(null)}
        trades={accountTrades}
        journal={journals.find(j => j.date === selectedDayModal)}
        onSelectTrade={(t) => setSelectedTradeModal(t)}
        onNavigateToJournal={handleNavigateToJournal}
      />

      <TradeDetailModal
        trade={selectedTradeModal}
        onClose={() => setSelectedTradeModal(null)}
        onDelete={handleDeleteTrade}
        onUpdateTrade={(updated) => {
          handleSaveTrade(updated);
          setSelectedTradeModal(updated);
        }}
      />

    </div>
  );
}
