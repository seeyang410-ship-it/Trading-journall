import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Scale, 
  Target, 
  BarChart3, 
  Layers, 
  Clock, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { Trade, MT5Account } from '../types/trade';

export type TimeHorizon = '1W' | '1M' | '3M' | '6M' | '1Y';

interface HorizonConfig {
  id: TimeHorizon;
  label: string;
  days: number;
  description: string;
}

const HORIZONS: HorizonConfig[] = [
  { id: '1W', label: '一星期', days: 7, description: '过去 7 天交易表现与周度复盘' },
  { id: '1M', label: '一个月', days: 30, description: '过去 30 天月度交易总结与执行评估' },
  { id: '3M', label: '三个月', days: 90, description: '过去 90 天季度量化表现与策略检验' },
  { id: '6M', label: '半年', days: 180, description: '过去 180 天半年度资金复利与抗回撤能力' },
  { id: '1Y', label: '一年', days: 365, description: '过去 365 天年度交易系统与全周期稳健度' },
];

interface PeriodPerformanceSummaryProps {
  trades: Trade[];
  account: MT5Account | null;
  onOpenNewTrade?: () => void;
}

interface PeriodMetrics {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  breakevenTrades: number;
  winRate: number;
  grossProfit: number;
  grossLoss: number;
  netProfit: number;
  profitFactor: number;
  avgWin: number;
  avgLoss: number;
  winLossRatio: number;
  avgTrade: number;
  largestWin: number;
  largestLoss: number;
  totalVolume: number;
  returnOnCapitalPercent: number;
  initialCapitalAtPeriod: number;
  endingCapitalAtPeriod: number;
}

export const PeriodPerformanceSummary: React.FC<PeriodPerformanceSummaryProps> = ({
  trades,
  account,
  onOpenNewTrade
}) => {
  const [selectedHorizon, setSelectedHorizon] = useState<TimeHorizon>('1M');
  const [viewMode, setViewMode] = useState<'detail' | 'matrix'>('detail');

  const baseCapital = account?.initialBalance || 10000;

  // Compute metrics for any given day range
  const computeMetricsForDays = (days: number): PeriodMetrics => {
    const now = new Date();
    const cutoffTime = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const periodTrades = trades.filter(t => {
      const tradeTime = new Date(t.closeTime || t.openTime);
      return tradeTime >= cutoffTime;
    });

    const totalTrades = periodTrades.length;
    if (totalTrades === 0) {
      return {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        breakevenTrades: 0,
        winRate: 0,
        grossProfit: 0,
        grossLoss: 0,
        netProfit: 0,
        profitFactor: 0,
        avgWin: 0,
        avgLoss: 0,
        winLossRatio: 0,
        avgTrade: 0,
        largestWin: 0,
        largestLoss: 0,
        totalVolume: 0,
        returnOnCapitalPercent: 0,
        initialCapitalAtPeriod: baseCapital,
        endingCapitalAtPeriod: baseCapital
      };
    }

    let grossProfit = 0;
    let grossLoss = 0;
    let winningTrades = 0;
    let losingTrades = 0;
    let breakevenTrades = 0;
    let largestWin = 0;
    let largestLoss = 0;
    let totalVolume = 0;

    periodTrades.forEach(t => {
      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
      totalVolume += (t.volume || 0);

      if (net > 0) {
        winningTrades++;
        grossProfit += net;
        if (net > largestWin) largestWin = net;
      } else if (net < 0) {
        losingTrades++;
        grossLoss += Math.abs(net);
        if (net < largestLoss) largestLoss = net;
      } else {
        breakevenTrades++;
      }
    });

    const netProfit = grossProfit - grossLoss;
    const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 99 : 0;
    const avgWin = winningTrades > 0 ? grossProfit / winningTrades : 0;
    const avgLoss = losingTrades > 0 ? grossLoss / losingTrades : 0;
    const winLossRatio = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? 99 : 0;
    const avgTrade = totalTrades > 0 ? netProfit / totalTrades : 0;
    const returnOnCapitalPercent = baseCapital > 0 ? Math.round((netProfit / baseCapital) * 1000) / 10 : 0;

    return {
      totalTrades,
      winningTrades,
      losingTrades,
      breakevenTrades,
      winRate,
      grossProfit: Math.round(grossProfit * 100) / 100,
      grossLoss: Math.round(grossLoss * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      profitFactor: Math.round(profitFactor * 100) / 100,
      avgWin: Math.round(avgWin * 100) / 100,
      avgLoss: Math.round(avgLoss * 100) / 100,
      winLossRatio: Math.round(winLossRatio * 100) / 100,
      avgTrade: Math.round(avgTrade * 100) / 100,
      largestWin: Math.round(largestWin * 100) / 100,
      largestLoss: Math.round(largestLoss * 100) / 100,
      totalVolume: Math.round(totalVolume * 100) / 100,
      returnOnCapitalPercent,
      initialCapitalAtPeriod: baseCapital,
      endingCapitalAtPeriod: Math.round((baseCapital + netProfit) * 100) / 100
    };
  };

  // Metrics for active selected horizon
  const currentConfig = HORIZONS.find(h => h.id === selectedHorizon) || HORIZONS[1];
  const activeMetrics = useMemo(() => computeMetricsForDays(currentConfig.days), [trades, currentConfig.days, baseCapital]);

  // Precompute metrics for all 5 horizons for matrix view
  const allHorizonsData = useMemo(() => {
    return HORIZONS.map(h => ({
      config: h,
      metrics: computeMetricsForDays(h.days)
    }));
  }, [trades, baseCapital]);

  return (
    <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 space-y-4">
      
      {/* Top Header & Horizon Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1a2336]">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              周期业绩多维度总结 (一星期 · 一个月 · 三个月 · 半年 · 一年)
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            多时间窗口系统化复盘：跟踪不同持仓周期与时间跨度下的胜率、盈亏比与净值增长
          </p>
        </div>

        {/* View Mode & Horizon Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* 5 Horizons Pill Buttons */}
          <div className="flex items-center p-0.5 bg-[#141b29] rounded-lg border border-[#20293d]">
            {HORIZONS.map(h => {
              const isSelected = selectedHorizon === h.id && viewMode === 'detail';
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    setSelectedHorizon(h.id);
                    setViewMode('detail');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {h.label}
                </button>
              );
            })}
          </div>

          {/* Matrix view toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'matrix' ? 'detail' : 'matrix')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              viewMode === 'matrix'
                ? 'bg-[#1e293d] text-cyan-300 border-cyan-500/40'
                : 'bg-[#141b29] text-slate-300 border-[#20293d] hover:bg-[#1a2336]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>五周期横向对比</span>
            </span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: DETAIL CARDS FOR ACTIVE HORIZON */}
      {viewMode === 'detail' && (
        <div className="space-y-4">
          
          {/* Subheader info banner */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 bg-[#131926] px-3.5 py-2 rounded-lg border border-[#1c263b]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">【{currentConfig.label}总结】</span>
              <span>{currentConfig.description}</span>
            </div>
            <div className="font-mono text-slate-400">
              周期样本订单: <strong className="text-white">{activeMetrics.totalTrades}</strong> 笔
            </div>
          </div>

          {/* If 0 trades in this period */}
          {activeMetrics.totalTrades === 0 ? (
            <div className="p-8 text-center bg-[#0d121c] border border-[#172030] rounded-xl space-y-2">
              <BarChart3 className="w-8 h-8 text-slate-500 mx-auto" />
              <div className="text-sm font-semibold text-slate-200">
                过去 {currentConfig.days} 天（{currentConfig.label}）暂无已平仓交易记录
              </div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                您可以在「交易日志」中手动记录开平仓订单，系统将自动汇总生成该周期的胜率、盈亏比与收益率分析。
              </p>
              {onOpenNewTrade && (
                <div className="pt-2">
                  <button
                    onClick={onOpenNewTrade}
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow"
                  >
                    手动记录一笔交易
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Top 4 Hero Metric Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                
                {/* 1. Net Profit */}
                <div className="bg-[#141b29] border border-[#20293d] rounded-xl p-3.5">
                  <div className="text-slate-400 text-xs flex items-center justify-between">
                    <span>{currentConfig.label}累计净收益</span>
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className={`text-xl sm:text-2xl font-bold font-mono tracking-tight mt-1.5 ${
                    activeMetrics.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {activeMetrics.netProfit >= 0 ? '+' : ''}${activeMetrics.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    本金收益率: <strong className={activeMetrics.returnOnCapitalPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {activeMetrics.returnOnCapitalPercent >= 0 ? '+' : ''}{activeMetrics.returnOnCapitalPercent}%
                    </strong>
                  </div>
                </div>

                {/* 2. Win Rate */}
                <div className="bg-[#141b29] border border-[#20293d] rounded-xl p-3.5">
                  <div className="text-slate-400 text-xs flex items-center justify-between">
                    <span>{currentConfig.label}执行胜率</span>
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight mt-1.5">
                    {activeMetrics.winRate}%
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    <span className="text-emerald-400 font-semibold">{activeMetrics.winningTrades} 胜</span> · <span className="text-rose-400 font-semibold">{activeMetrics.losingTrades} 负</span> · {activeMetrics.breakevenTrades} 平
                  </div>
                </div>

                {/* 3. Profit Factor */}
                <div className="bg-[#141b29] border border-[#20293d] rounded-xl p-3.5">
                  <div className="text-slate-400 text-xs flex items-center justify-between">
                    <span>利润因子 (PF)</span>
                    <Scale className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tracking-tight mt-1.5">
                    {activeMetrics.profitFactor.toFixed(2)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    平均单笔回报: ${activeMetrics.avgTrade >= 0 ? `+${activeMetrics.avgTrade}` : activeMetrics.avgTrade}
                  </div>
                </div>

                {/* 4. Capital Growth */}
                <div className="bg-[#141b29] border border-[#20293d] rounded-xl p-3.5">
                  <div className="text-slate-400 text-xs flex items-center justify-between">
                    <span>期末账户资产规模</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight mt-1.5">
                    ${activeMetrics.endingCapitalAtPeriod.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    基准本金: ${activeMetrics.initialCapitalAtPeriod.toLocaleString()}
                  </div>
                </div>

              </div>

              {/* Secondary Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                <div className="p-3 rounded-lg bg-[#0e131d] border border-[#192233]">
                  <div className="text-slate-400 text-[11px]">平均盈利单 (Avg Win)</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">
                    +${activeMetrics.avgWin.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0e131d] border border-[#192233]">
                  <div className="text-slate-400 text-[11px]">平均亏损单 (Avg Loss)</div>
                  <div className="text-rose-400 font-bold text-sm mt-0.5">
                    -${activeMetrics.avgLoss.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0e131d] border border-[#192233]">
                  <div className="text-slate-400 text-[11px]">最大单笔盈利</div>
                  <div className="text-emerald-400 font-bold text-sm mt-0.5">
                    +${activeMetrics.largestWin.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-[#0e131d] border border-[#192233]">
                  <div className="text-slate-400 text-[11px]">最大单笔亏损</div>
                  <div className="text-rose-400 font-bold text-sm mt-0.5">
                    ${activeMetrics.largestLoss.toLocaleString()}
                  </div>
                </div>
              </div>
            </>
          )}

        </div>
      )}

      {/* VIEW MODE 2: FIVE-HORIZON CROSS COMPARISON MATRIX TABLE */}
      {viewMode === 'matrix' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400">
            📊 <strong className="text-white">五大周期纵览对比矩阵</strong>：全面检视从一星期到一年的交易成长性与抗风险能力
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#1b2336] bg-[#0c1017]">
            <table className="w-full text-left text-xs whitespace-nowrap">
              <thead className="bg-[#141b29] border-b border-[#1f2b42] text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">周期跨度</th>
                  <th className="py-3 px-4">总订单数</th>
                  <th className="py-3 px-4">胜率</th>
                  <th className="py-3 px-4">累计净收益</th>
                  <th className="py-3 px-4">收益率 (%)</th>
                  <th className="py-3 px-4">利润因子 (PF)</th>
                  <th className="py-3 px-4">均胜 / 均亏</th>
                  <th className="py-3 px-4">单笔最大盈利</th>
                  <th className="py-3 px-4">单笔最大亏损</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#172030] font-mono">
                {allHorizonsData.map(({ config, metrics }) => {
                  const isPositive = metrics.netProfit >= 0;
                  return (
                    <tr 
                      key={config.id}
                      className="hover:bg-[#141b29] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedHorizon(config.id);
                        setViewMode('detail');
                      }}
                    >
                      <td className="py-3 px-4 font-bold text-white font-sans flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>{config.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({config.days}天)</span>
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        {metrics.totalTrades} 笔
                      </td>

                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          metrics.winRate >= 50 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : metrics.totalTrades > 0 
                            ? 'bg-amber-500/20 text-amber-400' 
                            : 'text-slate-400'
                        }`}>
                          {metrics.totalTrades > 0 ? `${metrics.winRate}%` : '-'}
                        </span>
                      </td>

                      <td className={`py-3 px-4 font-bold ${
                        metrics.totalTrades === 0 
                          ? 'text-slate-400' 
                          : isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {metrics.totalTrades === 0 ? '$0.00' : `${isPositive ? '+' : ''}$${metrics.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                      </td>

                      <td className={`py-3 px-4 font-bold ${
                        metrics.totalTrades === 0 
                          ? 'text-slate-400' 
                          : metrics.returnOnCapitalPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {metrics.totalTrades === 0 ? '0.0%' : `${metrics.returnOnCapitalPercent >= 0 ? '+' : ''}${metrics.returnOnCapitalPercent}%`}
                      </td>

                      <td className="py-3 px-4 text-cyan-300">
                        {metrics.totalTrades > 0 ? metrics.profitFactor.toFixed(2) : '-'}
                      </td>

                      <td className="py-3 px-4 text-slate-300 text-[11px]">
                        {metrics.totalTrades > 0 ? `+$${metrics.avgWin.toFixed(0)} / -$${metrics.avgLoss.toFixed(0)}` : '-'}
                      </td>

                      <td className="py-3 px-4 text-emerald-400">
                        {metrics.totalTrades > 0 ? `+$${metrics.largestWin.toFixed(0)}` : '-'}
                      </td>

                      <td className="py-3 px-4 text-rose-400">
                        {metrics.totalTrades > 0 ? `-$${Math.abs(metrics.largestLoss).toFixed(0)}` : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
