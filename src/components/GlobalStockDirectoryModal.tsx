import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  X, 
  Zap, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { GlobalRegion } from '../types/equity';
import { GLOBAL_STOCK_REGISTRY, GlobalSearchItem } from '../data/globalStockDirectory';

interface GlobalStockDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (ticker: string) => void;
}

export const GlobalStockDirectoryModal: React.FC<GlobalStockDirectoryModalProps> = ({
  isOpen,
  onClose,
  onSelectStock
}) => {
  const [activeRegion, setActiveRegion] = useState<'All' | GlobalRegion>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GLOBAL_STOCK_REGISTRY.filter(item => {
      const matchReg = activeRegion === 'All' || item.region === activeRegion;
      if (!matchReg) return false;
      if (!q) return true;
      return (
        item.ticker.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q) ||
        item.exchange.toLowerCase().includes(q) ||
        item.ticker.toLowerCase().replace('.kl', '').replace('.hk', '').replace('.t', '').replace('.pa', '').includes(q)
      );
    });
  }, [activeRegion, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-[#0e1626] border border-[#22334d] rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1d2a40] bg-[#111a2d] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>全球股票全市场代码大全与估值库</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
                  收录 {GLOBAL_STOCK_REGISTRY.length}+ 深度模型
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 font-sans">
                涵盖马股 (Bursa)、美股标普500/纳指、港股与中国A股、欧洲蓝筹、日本与亚太龙头。支持输入全球任意股票即刻测算！
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#172235] hover:bg-[#202e47] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Dynamic Resolver Bar */}
        <div className="p-4 bg-[#121c2e] border-b border-[#1e2c42] space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索全球任意股票代码/名称（如 1155, Maybank, TNB, 5248, Inari, NVDA, TSLA, 腾讯, 茅台, ASML, 丰田）..."
              className="w-full bg-[#0a101d] border border-[#202e44] focus:border-cyan-400 rounded-xl pl-10 pr-28 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
            />
            {searchQuery.trim() && (
              <button
                onClick={() => {
                  onSelectStock(searchQuery.trim());
                  onClose();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>即刻测算</span>
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {(['All', 'Malaysia', 'US', 'Greater China', 'Europe', 'Japan & APAC'] as const).map(reg => {
              const active = activeRegion === reg;
              const count = GLOBAL_STOCK_REGISTRY.filter(item => reg === 'All' ? true : item.region === reg).length;
              return (
                <button
                  key={reg}
                  onClick={() => setActiveRegion(reg)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                    active 
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-md' 
                      : 'bg-[#152033] border-[#202e46] text-slate-300 hover:border-[#2a3c5a] hover:text-white'
                  }`}
                >
                  <span>
                    {reg === 'All' ? '🌐 全部全球' :
                     reg === 'Malaysia' ? '🇲🇾 马股 (Bursa)' :
                     reg === 'US' ? '🇺🇸 美股 (NYSE/NASDAQ)' :
                     reg === 'Greater China' ? '🇨🇳 港股与中国A股' :
                     reg === 'Europe' ? '🇪🇺 欧洲核心' : '🇯🇵 日本亚太新加坡'}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    active ? 'bg-slate-950/30 text-slate-950 font-black' : 'bg-[#1b273d] text-cyan-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stock List Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          <div className="text-xs text-slate-400 font-sans flex items-center justify-between">
            <span>当前展示: <strong className="text-cyan-300 font-mono">{filteredItems.length}</strong> 只股票标的</span>
            <span className="text-[11px] text-slate-400">点击任意卡片即刻调取完整财报、折现模型与买入指南</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map(item => {
              return (
                <div
                  key={item.ticker}
                  onClick={() => {
                    onSelectStock(item.ticker);
                    onClose();
                  }}
                  className="p-3.5 bg-[#121b2d] hover:bg-[#18243c] border border-[#1f2c44] hover:border-cyan-400/80 rounded-2xl cursor-pointer transition-all flex flex-col justify-between space-y-2.5 shadow-sm group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-white group-hover:text-cyan-300 transition-colors">
                          {item.ticker}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1c273c] text-cyan-300 font-sans">
                          {item.region}
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-bold ${
                        item.verdict.includes('强烈买入') ? 'bg-emerald-500/20 text-emerald-400' :
                        item.verdict.includes('分批定投') ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {item.verdict.includes('强烈买入') ? '极度划算' : item.verdict.includes('分批定投') ? '合理定投' : '观望回踩'}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-200 mt-1 font-sans">
                      {item.name}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 font-sans">
                      {item.sector}
                    </p>
                  </div>

                  {/* Price & Target Bar */}
                  <div className="pt-2 border-t border-[#1a2538] flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400">现价 / 市盈率</div>
                      <div className="font-mono font-bold text-white">
                        {item.currency} ${item.currentPrice.toFixed(2)} <span className="text-[10px] text-slate-400">({item.pe}x)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-400 font-bold">建议买入安全价</div>
                      <div className="font-mono font-extrabold text-emerald-400">
                        &lt; {item.currency} ${item.buyTarget.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#1a2538]/60 flex items-center justify-between text-[11px] text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>内在公允估值: {item.currency} ${item.fairValue.toFixed(2)}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="p-8 text-center bg-[#111929] rounded-2xl border border-cyan-500/30 space-y-3">
              <Globe className="w-8 h-8 text-cyan-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">
                未在预设精选库中找到 "{searchQuery}"
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                系统全市场估值引擎支持全球任意上市企业代码（包含美股全部股票、马股 0001-9999 全部代码、港股通及 A 股）。点击下方按钮，系统将立即全网检索并生成完整财报与估值模型！
              </p>
              <button
                onClick={() => {
                  onSelectStock(searchQuery.trim());
                  onClose();
                }}
                className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all inline-flex items-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>立即为 "{searchQuery.toUpperCase()}" 运行全套估值测算</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#101726] border-t border-[#1d2a40] flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>所有估值模型基于折现自由现金流 (DCF) ＋ 奥特曼 Z-Score ＋ 皮氏 F-Score 严谨测算</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1b263b] hover:bg-[#253552] text-white rounded-xl transition-colors font-bold"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};
