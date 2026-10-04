import React from 'react';
import { 
  LayoutDashboard, 
  ListOrdered, 
  TrendingUp, 
  BookOpen, 
  RefreshCw, 
  Plus, 
  Upload, 
  Smartphone,
  ChevronDown,
  Trash2,
  Sparkles,
  ShieldCheck,
  DollarSign,
  Newspaper,
  StickyNote,
  Globe2,
  Building2
} from 'lucide-react';
import { MT5Account } from '../types/trade';

export type TabType = 'dashboard' | 'macro' | 'equity' | 'journal' | 'news' | 'notes';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  accounts: MT5Account[];
  activeAccount: MT5Account | null;
  onSelectAccount: (account: MT5Account) => void;
  onOpenNewTrade: () => void;
  onOpenImport: () => void;
  onClearDemoData: () => void;
  onOpenAddAccountModal: () => void;
  onOpenEditCapital?: () => void;
  isSyncing?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  accounts,
  activeAccount,
  onSelectAccount,
  onOpenNewTrade,
  onOpenImport,
  onClearDemoData,
  onOpenAddAccountModal,
  onOpenEditCapital,
  isSyncing = false
}) => {
  const [accountDropdownOpen, setAccountDropdownOpen] = React.useState(false);

  const navLinks = [
    { id: 'dashboard' as TabType, label: '量化看板', icon: LayoutDashboard },
    { id: 'macro' as TabType, label: '全球宏观', icon: Globe2 },
    { id: 'equity' as TabType, label: '股票估值', icon: Building2 },
    { id: 'journal' as TabType, label: '交易日志', icon: BookOpen },
    { id: 'news' as TabType, label: '实时快讯', icon: Newspaper },
    { id: 'notes' as TabType, label: '投研Note', icon: StickyNote },
  ];

  return (
    <>
      {/* Top Header - Desktop & Tablet */}
      <header className="sticky top-0 z-30 w-full bg-[#0b0e14]/95 backdrop-blur-md border-b border-[#1a2233] px-4 lg:px-8 py-3">
        <div className="max-w-[1520px] mx-auto flex items-center justify-between gap-4">
          
          {/* Zone 1: Brand title & Account Switcher */}
          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left focus-visible:outline-none group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-cyan-950/40 group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-sm font-mono tracking-tighter">α</span>
              </div>
              <div>
                <span className="text-base font-bold tracking-tight text-white block">
                  AlphaLog <span className="text-emerald-400 font-semibold text-xs ml-0.5">领航者</span>
                </span>
              </div>
            </button>

            {/* Account Selector Dropdown */}
            {activeAccount && (
              <div className="relative">
                <button
                  onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#131926] hover:bg-[#1a2336] border border-[#222c42] text-xs transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium text-slate-200 truncate max-w-[140px]">
                    {activeAccount.accountName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {accountDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-[#121824] border border-[#222d42] rounded-xl shadow-2xl py-1.5 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                      <span>我的自主记账本</span>
                      <span className="text-emerald-400 font-mono">{accounts.length} 个账本</span>
                    </div>
                    {accounts.map(acc => (
                      <button
                        key={acc.id}
                        onClick={() => {
                          onSelectAccount(acc);
                          setAccountDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#1a2336] transition-colors ${acc.id === activeAccount.id ? 'bg-[#182338] text-emerald-400 font-medium' : 'text-slate-300'}`}
                      >
                        <div className="truncate">
                          <div>{acc.accountName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">本金: ${acc.initialBalance.toLocaleString()}</div>
                        </div>
                        <div className="text-right font-mono text-[11px] text-slate-300">
                          ${acc.currentBalance.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                        </div>
                      </button>
                    ))}
                    
                    <div className="border-t border-[#1e283d] my-1" />
                    
                    {onOpenEditCapital && (
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          onOpenEditCapital();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-cyan-300 hover:bg-[#1a2336] flex items-center gap-1.5 font-medium"
                      >
                        <DollarSign className="w-3.5 h-3.5" /> 设置/修改本金规模
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setAccountDropdownOpen(false);
                        onOpenAddAccountModal();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-emerald-400 hover:bg-[#1a2336] flex items-center gap-1.5 font-medium"
                    >
                      <Plus className="w-3.5 h-3.5" /> 新建独立交易账本
                    </button>

                    <div className="border-t border-[#1e283d] my-1" />

                    <div className="px-2 py-1">
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          if (confirm('确认清空当前账户的所有交易记录并重置账本吗？')) {
                            onClearDemoData();
                          }
                        }}
                        className="w-full text-left px-2 py-1 text-[11px] text-slate-400 hover:text-rose-400 hover:bg-[#1a2336] rounded flex items-center gap-1.5 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-rose-400" />
                        <span>清空交易记录 (重置空白账本)</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#162033] text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#121824]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Live Pulse & Actions (Import Data + New Trade) */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-bold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE STREAM 3s</span>
            </div>

            <button
              onClick={onOpenImport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-[#131926] hover:bg-[#1a2336] border border-[#222c42] text-slate-200 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">导入数据</span>
            </button>

            <button
              onClick={onOpenNewTrade}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>记录交易</span>
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Thumb-friendly PWA experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0e14]/95 backdrop-blur-lg border-t border-[#1a2233] px-2 py-1.5 flex items-center justify-around">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
