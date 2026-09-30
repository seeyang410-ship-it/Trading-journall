import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Percent, 
  Scale, 
  ShieldAlert, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar as CalendarIcon,
  Layers,
  BarChart3,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { Trade, MT5Account } from '../types/trade';
import { 
  calculateSummary, 
  getDailyPnLMap, 
  getBreakdownBySetup, 
  getBreakdownBySymbol,
  getBreakdownByDirection,
  getBreakdownByDayOfWeek
} from '../services/analytics';
import { EquityTrendChart } from './EquityTrendChart';
import { PeriodPerformanceSummary } from './PeriodPerformanceSummary';

interface DashboardViewProps {
  trades: Trade[];
  account: MT5Account | null;
  onSelectDay: (dateStr: string) => void;
  onSelectTrade: (trade: Trade) => void;
  onOpenEditCapital?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  trades,
  account,
  onSelectDay,
  onSelectTrade,
  onOpenEditCapital
}) => {
  const [selectedMonth, setSelectedMonth] = useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [chartTimeframe, setChartTimeframe] = useState<'7D' | '30D' | '90D'>('30D');
  const [breakdownTab, setBreakdownTab] = useState<'setup' | 'symbol' | 'direction' | 'weekday'>('setup');
  
  const initialCap = account?.initialBalance || 10000;
  // Compute metrics
  const summary = useMemo(() => calculateSummary(trades, initialCap), [trades, initialCap]);
  const dailyPnLMap = useMemo(() => getDailyPnLMap(trades), [trades]);
  const liveBalance = initialCap + summary.netProfit;

  // Breakdowns
  const setupBreakdown = useMemo(() => getBreakdownBySetup(trades), [trades]);
  const symbolBreakdown = useMemo(() => getBreakdownBySymbol(trades), [trades]);
  const directionBreakdown = useMemo(() => getBreakdownByDirection(trades), [trades]);
  const weekdayBreakdown = useMemo(() => getBreakdownByDayOfWeek(trades), [trades]);

  // Calendar calculations
  const year = selectedMonth.getFullYear();
  const month = selectedMonth.getMonth(); // 0-indexed

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    
    // Day of week: 0 is Sun, 1 is Mon. We want Monday as index 0
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const weeks: Array<Array<{ date: string; dayNumber: number; inMonth: boolean }>> = [];
    let currentWeek: Array<{ date: string; dayNumber: number; inMonth: boolean }> = [];

    // Helper to format local date without UTC timezone shift
    const formatLocalDate = (y: number, m: number, d: number) => {
      const mm = String(m + 1).padStart(2, '0');
      const dd = String(d).padStart(2, '0');
      return `${y}-${mm}-${dd}`;
    };

    // Preceding padding days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;

    for (let i = 0; i < startDayOfWeek; i++) {
      const prevDay = prevMonthLastDay - startDayOfWeek + 1 + i;
      const dateStr = formatLocalDate(prevYear, prevMonth, prevDay);
      currentWeek.push({ date: dateStr, dayNumber: prevDay, inMonth: false });
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatLocalDate(year, month, day);
      currentWeek.push({ date: dateStr, dayNumber: day, inMonth: true });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Trailing days
    if (currentWeek.length > 0) {
      let nextMonthDay = 1;
      const nextYear = month === 11 ? year + 1 : year;
      const nextMonth = month === 11 ? 0 : month + 1;

      while (currentWeek.length < 7) {
        const dateStr = formatLocalDate(nextYear, nextMonth, nextMonthDay);
        currentWeek.push({ date: dateStr, dayNumber: nextMonthDay, inMonth: false });
        nextMonthDay++;
      }
      weeks.push(currentWeek);
    }

    return weeks;
  }, [year, month]);

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  // Month P&L stats
  const monthStats = useMemo(() => {
    let profit = 0;
    let count = 0;
    let wins = 0;
    trades.forEach(t => {
      const d = new Date(t.closeTime);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const net = t.profit + t.commission + t.swap;
        profit += net;
        count++;
        if (net > 0) wins++;
      }
    });
    return {
      profit: Math.round(profit * 100) / 100,
      count,
      winRate: count > 0 ? Math.round((wins / count) * 100) : 0
    };
  }, [trades, year, month]);

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-16">
      
      {/* 1. Header Metrics Row (Anti-Slop, High-Density, Tabular Figures) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Net P&L Card */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>累计净盈亏</span>
            <span className={`text-[11px] font-mono ${summary.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {summary.netProfit >= 0 ? '+' : ''}{((summary.netProfit / (account?.initialBalance || 100000)) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${summary.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {summary.netProfit >= 0 ? '+' : ''}${summary.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              总盈利 ${summary.grossProfit.toLocaleString('en-US', { minimumFractionDigits: 0 })} · 亏损 ${summary.grossLoss.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Win Rate Card */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>胜率 (Win Rate)</span>
            <Percent className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
              {summary.winRate}%
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              <span className="text-emerald-400">{summary.winningTrades} 胜</span> · <span className="text-rose-400">{summary.losingTrades} 负</span> · {summary.breakevenTrades} 平
            </div>
          </div>
        </div>

        {/* Profit Factor Card */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>利润因子 (PF)</span>
            <Scale className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tracking-tight">
              {summary.profitFactor.toFixed(2)}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              盈亏比 {summary.winLossRatio.toFixed(2)} : 1
            </div>
          </div>
        </div>

        {/* Avg Trade Card */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>平均单笔盈亏</span>
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="mt-2">
            <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${summary.avgTrade >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {summary.avgTrade >= 0 ? '+' : ''}${summary.avgTrade.toFixed(1)}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              均胜 +${summary.avgWin.toFixed(0)} · 均亏 -${summary.avgLoss.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Max Drawdown Card */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>最大回撤 (Max DD)</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400 tracking-tight">
              -{summary.maxDrawdownPercent}%
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
              回撤金额 ${summary.maxDrawdown.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </div>
          </div>
        </div>

        {/* Current Balance / Account Net Worth */}
        <div className="bg-[#101622] border border-[#1b2336] rounded-lg p-3.5 flex flex-col justify-between group">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>账户净值 (Equity)</span>
            {onOpenEditCapital && (
              <button
                type="button"
                onClick={onOpenEditCapital}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-sans font-semibold underline cursor-pointer"
              >
                修改本金
              </button>
            )}
          </div>
          <div className="mt-2">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight">
              ${liveBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center justify-between">
              <span>初始本金: ${initialCap.toLocaleString()}</span>
              {onOpenEditCapital && (
                <button
                  type="button"
                  onClick={onOpenEditCapital}
                  className="text-emerald-400/80 hover:text-emerald-300 text-[10px] ml-1"
                >
                  (点击调整)
                </button>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* 2. Dedicated Section: Periodic Performance Summary (一星期 · 一个月 · 三个月 · 半年 · 一年) */}
      <PeriodPerformanceSummary
        trades={trades}
        account={account}
        onOpenNewTrade={() => onSelectDay(new Date().toISOString().slice(0, 10))}
      />

      {/* 3. Middle Section: Calendar P&L Heatmap + Cumulative Equity Curve */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column: Iconic TradeZella Calendar Heatmap (7 cols on xl) */}
        <div className="xl:col-span-7 bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-col">
          
          {/* Calendar Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1a2336]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#141b29] border border-[#222d42] text-emerald-400">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                  <span>盈亏日历热力图</span>
                  <span className="text-xs text-slate-400 font-normal">P&L Calendar</span>
                </h2>
                <div className="text-xs text-slate-400 mt-0.5">
                  点击任意交易日可查看当日交易列表及复盘记录
                </div>
              </div>
            </div>

            {/* Month Navigator & Summary */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-[#141b29] px-2.5 py-1 rounded border border-[#20293d]">
                <span className="text-slate-400">本月:</span>
                <span className={`font-semibold ${monthStats.profit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {monthStats.profit >= 0 ? '+' : ''}${monthStats.profit.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                </span>
                <span className="text-slate-400">({monthStats.count} 单 · {monthStats.winRate}% 胜率)</span>
              </div>

              <div className="flex items-center gap-1 bg-[#141b29] p-0.5 rounded-lg border border-[#20293d]">
                <button
                  onClick={() => setSelectedMonth(new Date(year, month - 1, 1))}
                  className="p-1 text-slate-400 hover:text-white hover:bg-[#1e273a] rounded transition-colors"
                  title="上一月"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-medium text-slate-200 font-mono">
                  {year}年 {monthNames[month]}
                </span>
                <button
                  onClick={() => setSelectedMonth(new Date(year, month + 1, 1))}
                  className="p-1 text-slate-400 hover:text-white hover:bg-[#1e273a] rounded transition-colors"
                  title="下一月"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Day Labels */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center text-xs font-medium text-slate-400">
            <div>周一</div>
            <div>周二</div>
            <div>周三</div>
            <div>周四</div>
            <div>周五</div>
            <div className="text-slate-400">周六</div>
            <div className="text-slate-400">周日</div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-1.5 sm:space-y-2 flex-1">
            {calendarDays.map((week, wIdx) => {
              // Calculate weekly P&L
              let weekPnL = 0;
              let weekTrades = 0;
              week.forEach(day => {
                const pnlData = dailyPnLMap.get(day.date);
                if (pnlData) {
                  weekPnL += pnlData.netProfit;
                  weekTrades += pnlData.tradesCount;
                }
              });

              return (
                <div key={wIdx} className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {week.map((cell, cIdx) => {
                    const dayData = dailyPnLMap.get(cell.date);
                    const hasTrades = !!dayData && dayData.tradesCount > 0;
                    const isProfit = hasTrades && dayData.netProfit > 0;
                    const isLoss = hasTrades && dayData.netProfit < 0;
                    const isBreakeven = hasTrades && dayData.netProfit === 0;

                    // Color intensity logic based on magnitude
                    let bgStyle = 'bg-[#121824] hover:bg-[#172030] border-[#1d273a]';
                    let textPnlColor = 'text-slate-400';

                    if (isProfit) {
                      bgStyle = dayData.netProfit > 2000 
                        ? 'bg-emerald-950/40 hover:bg-emerald-900/50 border-emerald-500/40' 
                        : 'bg-emerald-950/20 hover:bg-emerald-900/30 border-emerald-600/20';
                      textPnlColor = 'text-emerald-400';
                    } else if (isLoss) {
                      bgStyle = Math.abs(dayData.netProfit) > 1000
                        ? 'bg-rose-950/40 hover:bg-rose-900/50 border-rose-500/40'
                        : 'bg-rose-950/20 hover:bg-rose-900/30 border-rose-600/20';
                      textPnlColor = 'text-rose-400';
                    }

                    return (
                      <button
                        key={`${wIdx}-${cIdx}-${cell.date}`}
                        onClick={() => onSelectDay(cell.date)}
                        disabled={!hasTrades}
                        className={`group relative min-h-[64px] sm:min-h-[76px] p-1.5 sm:p-2 rounded-lg border text-left flex flex-col justify-between transition-all ${bgStyle} ${
                          !cell.inMonth ? 'opacity-30' : 'opacity-100'
                        } ${hasTrades ? 'cursor-pointer hover:scale-[1.02] shadow-sm' : 'cursor-default'}`}
                      >
                        {/* Day number & trade count indicator */}
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[11px] sm:text-xs font-mono font-medium text-slate-400 group-hover:text-slate-200">
                            {cell.dayNumber}
                          </span>
                          {hasTrades && (
                            <span className="text-[10px] font-mono text-slate-400 bg-[#0d121c] px-1 rounded">
                              {dayData.tradesCount}单
                            </span>
                          )}
                        </div>

                        {/* P&L amount & win rate preview */}
                        {hasTrades ? (
                          <div className="mt-1">
                            <div className={`text-xs sm:text-sm font-bold font-mono tracking-tight truncate ${textPnlColor}`}>
                              {dayData.netProfit >= 0 ? '+' : ''}${Math.round(dayData.netProfit).toLocaleString('en-US')}
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-0.5">
                              <span>{Math.round((dayData.wins / dayData.tradesCount) * 100)}% 胜率</span>
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-400/40 font-mono select-none">—</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Calendar Footnote with legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-[#1a2336] gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/30 border border-emerald-500/50" />
                <span>盈利日</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-500/30 border border-rose-500/50" />
                <span>亏损日</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#141b29] border border-[#20293d]" />
                <span>无交易</span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              数据源: 实盘平仓流水与交易日志
            </div>
          </div>

        </div>

        {/* Right Column: Recharts-based 30-Day Equity Curve Chart (5 cols on xl) */}
        <div className="xl:col-span-5 bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Chart Header & Timeframe Switcher */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#1a2336]">
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>过去30天账户净值增长折线图 (Recharts)</span>
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  基于 Recharts 绘制的账户净值复利走势与增长曲线
                </div>
              </div>

              {/* Timeframe Buttons */}
              <div className="flex items-center p-0.5 bg-[#141b29] rounded-lg border border-[#20293d]">
                {(['7D', '30D', '90D'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                      chartTimeframe === tf 
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tf === '7D' ? '7天' : tf === '30D' ? '30天' : '90天'}
                  </button>
                ))}
              </div>
            </div>

            {/* Recharts Equity Trend Component */}
            <div className="w-full">
              <EquityTrendChart
                trades={trades}
                initialBalance={account?.initialBalance || 10000}
                days={chartTimeframe === '7D' ? 7 : chartTimeframe === '90D' ? 90 : 30}
              />
            </div>
          </div>

          {/* Quick Metrics Footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#1a2336] text-center">
            <div className="bg-[#141a27] p-2 rounded border border-[#1e273a]">
              <div className="text-[11px] text-slate-400">单笔最大盈利</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-emerald-400 mt-0.5">
                +${summary.largestWin.toLocaleString()}
              </div>
            </div>
            <div className="bg-[#141a27] p-2 rounded border border-[#1e273a]">
              <div className="text-[11px] text-slate-400">单笔最大亏损</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-rose-400 mt-0.5">
                -${summary.largestLoss.toLocaleString()}
              </div>
            </div>
            <div className="bg-[#141a27] p-2 rounded border border-[#1e273a]">
              <div className="text-[11px] text-slate-400">综合收益评分</div>
              <div className="text-xs sm:text-sm font-bold font-mono text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>{summary.profitabilityScore} / 100</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Bottom Multi-Dimensional Analysis Tabs (Setup, Symbol, Long/Short, Weekday) */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5">
        
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1a2336]">
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              多维度盈利归因与执行分析
            </h3>
            <div className="text-xs text-slate-400 mt-0.5">
              识别最具优势的交易模式与潜在风控短板
            </div>
          </div>

          {/* Segmented Controller (allowed as interactive filter) */}
          <div className="flex items-center gap-1 p-1 bg-[#141b29] rounded-lg border border-[#20293d]">
            <button
              onClick={() => setBreakdownTab('setup')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                breakdownTab === 'setup' ? 'bg-[#1e293d] text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              按入场策略 (Setup)
            </button>
            <button
              onClick={() => setBreakdownTab('symbol')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                breakdownTab === 'symbol' ? 'bg-[#1e293d] text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              按交易品种 (Symbol)
            </button>
            <button
              onClick={() => setBreakdownTab('direction')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                breakdownTab === 'direction' ? 'bg-[#1e293d] text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              多空对比 (Long vs Short)
            </button>
            <button
              onClick={() => setBreakdownTab('weekday')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                breakdownTab === 'weekday' ? 'bg-[#1e293d] text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              交易星期偏好
            </button>
          </div>
        </div>

        {/* Tab Content Tables */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1e273a] text-slate-400 font-medium">
                <th className="py-2.5 px-3">分类维度</th>
                <th className="py-2.5 px-3 text-right">交易笔数</th>
                <th className="py-2.5 px-3 text-right">胜率</th>
                <th className="py-2.5 px-3 text-right">累计净盈亏</th>
                <th className="py-2.5 px-3 text-right">利润因子 (PF)</th>
                <th className="py-2.5 px-3">胜率可视化</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#172030] font-mono">
              {trades.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                    <div className="text-xs text-slate-300">暂无交易归因统计</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      录入真实订单后，系统将在此自动生成入场策略、品种与星期维度的胜率及盈亏比
                    </div>
                  </td>
                </tr>
              ) : (
                (breakdownTab === 'setup' ? setupBreakdown :
                 breakdownTab === 'symbol' ? symbolBreakdown :
                 breakdownTab === 'direction' ? directionBreakdown : weekdayBreakdown).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#141b29] transition-colors">
                    <td className="py-3 px-3 font-sans font-medium text-slate-200">
                      {row.category}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-300">
                      {row.tradesCount} 笔
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={row.winRate >= 60 ? 'text-emerald-400 font-semibold' : row.winRate < 40 ? 'text-rose-400 font-semibold' : 'text-slate-200'}>
                        {row.winRate}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`font-semibold ${row.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.netProfit >= 0 ? '+' : ''}${row.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-300">
                      {row.profitFactor.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 min-w-[140px]">
                      <div className="w-full bg-[#1b2436] rounded-full h-2 overflow-hidden flex">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, row.winRate)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
