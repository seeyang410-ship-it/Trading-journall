import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Filter, 
  Search, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Flame, 
  Globe2, 
  DollarSign, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Bell, 
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import { EconomicEvent, EconomicEventImpact, EconomicRegion, EconomicCategory } from '../types/calendar';
import { INITIAL_ECONOMIC_EVENTS } from '../data/economicCalendarData';

interface EconomicCalendarViewProps {
  onLogTradeFromCalendar?: (prefill: { symbol: string; type: 'BUY' | 'SELL'; setup: string; notes: string }) => void;
}

export const EconomicCalendarView: React.FC<EconomicCalendarViewProps> = ({ onLogTradeFromCalendar }) => {
  const [events, setEvents] = useState<EconomicEvent[]>(INITIAL_ECONOMIC_EVENTS);
  const [dateFilter, setDateFilter] = useState<'today' | 'tomorrow' | 'this_week' | 'all'>('all');
  const [impactFilter, setImpactFilter] = useState<'ALL' | EconomicEventImpact>('ALL');
  const [regionFilter, setRegionFilter] = useState<'ALL' | EconomicRegion>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | EconomicCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(INITIAL_ECONOMIC_EVENTS[0]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter logic
  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      // Date filter
      if (dateFilter === 'today' && e.dateStr !== '2026-10-14') return false;
      if (dateFilter === 'tomorrow' && e.dateStr !== '2026-10-15') return false;
      if (dateFilter === 'this_week' && !(e.dateStr >= '2026-10-14' && e.dateStr <= '2026-10-18')) return false;

      // Impact filter
      if (impactFilter !== 'ALL' && e.impact !== impactFilter) return false;

      // Region filter
      if (regionFilter !== 'ALL' && e.countryCode !== regionFilter) return false;

      // Category filter
      if (categoryFilter !== 'ALL' && e.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = e.title.toLowerCase().includes(q) || e.titleEn.toLowerCase().includes(q);
        const matchCountry = e.countryName.toLowerCase().includes(q) || e.countryCode.toLowerCase().includes(q);
        const matchAssets = e.affectedAssets.some(a => a.toLowerCase().includes(q));
        if (!matchTitle && !matchCountry && !matchAssets) return false;
      }

      return true;
    });
  }, [events, dateFilter, impactFilter, regionFilter, categoryFilter, searchQuery]);

  // Today's upcoming high-impact event for countdown header
  const upcomingHighImpact = useMemo(() => {
    return events.find(e => e.impact === 'HIGH' && e.surpriseStatus === 'PENDING') || events[0];
  }, [events]);

  const getImpactBadge = (impact: EconomicEventImpact) => {
    switch (impact) {
      case 'HIGH':
        return {
          label: '3星·极高风险',
          badge: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          dot: 'bg-rose-500'
        };
      case 'MEDIUM':
        return {
          label: '2星·中度影响',
          badge: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          dot: 'bg-amber-500'
        };
      case 'LOW':
        return {
          label: '1星·常规参考',
          badge: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
          dot: 'bg-slate-400'
        };
    }
  };

  const getCategoryLabel = (category: EconomicCategory) => {
    switch (category) {
      case 'CENTRAL_BANK': return '央行决议';
      case 'INFLATION': return '物价通胀';
      case 'EMPLOYMENT': return '就业数据';
      case 'GDP_GROWTH': return 'GDP增速';
      case 'PMI_BUSINESS': return 'PMI景气';
      case 'RETAIL_CONSUMER': return '零售消费';
      case 'ENERGY_TRADE': return '能源贸易';
    }
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto text-slate-100">
      
      {/* 1. Header Banner & Live Status */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#0a0f1d] border border-[#1e293b] p-6 lg:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <CalendarIcon className="w-3.5 h-3.5" />
                全球宏观经济日历 (Global Economic Calendar)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                实时数据直连
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>全球重大宏观经济事件追踪</span>
              <span className="text-xs font-mono font-normal text-slate-400 px-2.5 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50">
                本地时间: {currentTime || '实时更新中'}
              </span>
            </h1>
            
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              实时追踪美联储 (Fed)、欧洲央行 (ECB)、日本央行 (BOJ) 及中英马等主要经济体的核心利率决议、CPI 通胀、非农就业与景气度 PMI，提供机构级交易影响深度拆解。
            </p>
          </div>

          {/* Quick Highlight Card */}
          {upcomingHighImpact && (
            <div className="shrink-0 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 lg:w-80 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="flex items-center gap-1 text-rose-400 font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  今日重点聚焦
                </span>
                <span className="font-mono text-slate-300">{upcomingHighImpact.timeStr}</span>
              </div>
              <div className="text-sm font-bold text-white mb-1.5 truncate">
                {upcomingHighImpact.countryFlag} {upcomingHighImpact.title}
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {upcomingHighImpact.marketImplication}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <span className="text-[11px] text-slate-500 font-mono">
                  前值: {upcomingHighImpact.previous} | 预测: {upcomingHighImpact.forecast || '--'}
                </span>
                <button
                  onClick={() => setSelectedEvent(upcomingHighImpact)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5"
                >
                  查看拆解 <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Filter Bar */}
      <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-4 space-y-3.5">
        
        {/* Top Row: Date filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Date range pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setDateFilter('today')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === 'today'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              📅 今天 (Today)
            </button>
            <button
              onClick={() => setDateFilter('tomorrow')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === 'tomorrow'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              明天 (Tomorrow)
            </button>
            <button
              onClick={() => setDateFilter('this_week')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === 'this_week'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              本周核心 (This Week)
            </button>
            <button
              onClick={() => setDateFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                dateFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              全部重大事件
            </button>
          </div>

          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索事件、国家代码或关联品种 (如 CPI, 非农, FOMC, XAUUSD)..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Bottom Row: Region & Impact badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          
          {/* Country / Region selector */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> 地区:
            </span>
            {[
              { id: 'ALL', label: '全部' },
              { id: 'US', label: '🇺🇸 美国' },
              { id: 'CN', label: '🇨🇳 中国' },
              { id: 'EU', label: '🇪🇺 欧元区' },
              { id: 'UK', label: '🇬🇧 英国' },
              { id: 'JP', label: '🇯🇵 日本' },
              { id: 'MY', label: '🇲🇾 马来西亚' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRegionFilter(r.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  regionFilter === r.id
                    ? 'bg-slate-200 text-slate-950 font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Impact Level selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> 重要度:
            </span>
            <button
              onClick={() => setImpactFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg ${
                impactFilter === 'ALL'
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setImpactFilter('HIGH')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                impactFilter === 'HIGH'
                  ? 'bg-rose-500 text-white'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20'
              }`}
            >
              🔴 3星重磅
            </button>
            <button
              onClick={() => setImpactFilter('MEDIUM')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                impactFilter === 'MEDIUM'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20'
              }`}
            >
              🟡 2星中度
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Content Grid: Events Table & Event Detail Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Events List Table (8 cols) */}
        <div className="lg:col-span-8 bg-[#0c121e] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>经济数据发布日程</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-medium">
                  {filteredEvents.length} 项事件
                </span>
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              点击条目查看专业拆解与受影响资产
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <AlertCircle className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm">暂无符合当前筛选条件的经济事件</p>
              <button 
                onClick={() => { setDateFilter('all'); setImpactFilter('ALL'); setRegionFilter('ALL'); setSearchQuery(''); }}
                className="mt-3 text-xs text-cyan-400 hover:underline"
              >
                重置所有筛选器
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/60 max-h-[720px] overflow-y-auto">
              {filteredEvents.map(evt => {
                const impactInfo = getImpactBadge(evt.impact);
                const isSelected = selectedEvent?.id === evt.id;

                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEvent(evt)}
                    className={`p-4 transition-all cursor-pointer hover:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected ? 'bg-cyan-950/20 border-l-4 border-cyan-400 pl-3' : ''
                    }`}
                  >
                    {/* Left: Time, Flag, Category & Title */}
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                          {evt.dateStr.slice(5)} {evt.timeStr}
                        </span>
                        <span className="text-sm">{evt.countryFlag}</span>
                        <span className="text-xs text-slate-400 font-medium">{evt.countryName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {getCategoryLabel(evt.category)}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${impactInfo.badge}`}>
                          {impactInfo.label}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-white truncate hover:text-cyan-300">
                        {evt.title}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>关联品种:</span>
                        <div className="flex items-center gap-1 flex-wrap">
                          {evt.affectedAssets.slice(0, 4).map(asset => (
                            <span key={asset} className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-slate-800/90 text-cyan-300">
                              {asset}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actual vs Forecast vs Previous */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800/50">
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase">今值</div>
                          <div className={`font-bold text-sm ${
                            evt.actual 
                              ? evt.surpriseStatus === 'BEAT' 
                                ? 'text-emerald-400' 
                                : evt.surpriseStatus === 'MISS'
                                ? 'text-rose-400'
                                : 'text-white'
                              : 'text-slate-500'
                          }`}>
                            {evt.actual !== null && evt.actual !== undefined ? evt.actual : '未公布'}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase">预测</div>
                          <div className="text-slate-300 font-medium">
                            {evt.forecast || '--'}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-slate-500 uppercase">前值</div>
                          <div className="text-slate-400">
                            {evt.previous}
                          </div>
                        </div>
                      </div>

                      {evt.actual && (
                        <div className="flex items-center gap-1 text-[11px] font-medium">
                          {evt.surpriseStatus === 'BEAT' && (
                            <span className="text-emerald-400 flex items-center gap-0.5">
                              <TrendingUp className="w-3 h-3" /> 高于预期
                            </span>
                          )}
                          {evt.surpriseStatus === 'MISS' && (
                            <span className="text-rose-400 flex items-center gap-0.5">
                              <TrendingDown className="w-3 h-3" /> 低于预期
                            </span>
                          )}
                          {evt.surpriseStatus === 'INLINE' && (
                            <span className="text-slate-400 flex items-center gap-0.5">
                              <Minus className="w-3 h-3" /> 符合预期
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: Selected Event In-Depth Macro Analysis & One-Click Trade Log (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {selectedEvent ? (
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-5 space-y-5 sticky top-20 shadow-xl">
              
              {/* Event Header */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    {selectedEvent.countryFlag} {selectedEvent.countryName} · {getCategoryLabel(selectedEvent.category)}
                  </span>
                  <span className="font-mono text-cyan-400 font-semibold">
                    {selectedEvent.dateStr} {selectedEvent.timeStr}
                  </span>
                </div>
                
                <h3 className="text-lg font-extrabold text-white leading-snug">
                  {selectedEvent.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {selectedEvent.titleEn}
                </p>
              </div>

              {/* Data Comparison Card */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-center">
                <div>
                  <div className="text-[11px] text-slate-400 mb-0.5">公布值 (Actual)</div>
                  <div className="text-base font-extrabold text-cyan-400 font-mono">
                    {selectedEvent.actual !== null && selectedEvent.actual !== undefined ? selectedEvent.actual : '待发布'}
                  </div>
                </div>
                <div className="border-x border-slate-800">
                  <div className="text-[11px] text-slate-400 mb-0.5">市场预测 (Consensus)</div>
                  <div className="text-base font-extrabold text-slate-200 font-mono">
                    {selectedEvent.forecast || '--'}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 mb-0.5">前值 (Previous)</div>
                  <div className="text-base font-extrabold text-slate-400 font-mono">
                    {selectedEvent.previous}
                  </div>
                </div>
              </div>

              {/* Macro & Market Implication */}
              <div className="space-y-3">
                <div className="p-3.5 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-1.5">
                  <div className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    机构级宏观影响拆解
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedEvent.marketImplication}
                  </p>
                </div>

                <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-1.5">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    分析师交易指引
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedEvent.tradingTip}
                  </p>
                </div>
              </div>

              {/* Affected Assets & One-click Log Trade */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-xs font-semibold text-slate-400">主要联动品种:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedEvent.affectedAssets.map(asset => (
                    <button
                      key={asset}
                      onClick={() => {
                        if (onLogTradeFromCalendar) {
                          onLogTradeFromCalendar({
                            symbol: asset,
                            type: 'BUY',
                            setup: `宏观数据驱动交易 (${selectedEvent.title})`,
                            notes: `基于经济数据【${selectedEvent.title}】发布。市场影响解读：${selectedEvent.marketImplication}`
                          });
                        }
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-slate-800 hover:bg-cyan-500/20 text-slate-200 hover:text-cyan-300 border border-slate-700/80 transition-colors"
                      title="点击以此标的记账"
                    >
                      <span>{asset}</span>
                      <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                    </button>
                  ))}
                </div>

                {onLogTradeFromCalendar && (
                  <button
                    onClick={() => {
                      onLogTradeFromCalendar({
                        symbol: selectedEvent.affectedAssets[0] || 'XAUUSD',
                        type: 'BUY',
                        setup: `宏观数据驱动交易 (${selectedEvent.title})`,
                        notes: `基于经济数据【${selectedEvent.title}】发布。市场影响解读：${selectedEvent.marketImplication}`
                      });
                    }}
                    className="w-full mt-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    以此事件逻辑快速记账
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-[#0c121e] border border-[#1e293b] rounded-2xl p-6 text-center text-slate-400">
              <Info className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-xs">请在左侧日程列表中选择一项事件查看详细拆解</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
