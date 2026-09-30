import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { Trade } from '../types/trade';

interface EquityTrendChartProps {
  trades: Trade[];
  initialBalance: number;
  days?: number;
}

export const EquityTrendChart: React.FC<EquityTrendChartProps> = ({
  trades,
  initialBalance,
  days = 30
}) => {
  // Generate daily points for the past `days` days
  const chartData = useMemo(() => {
    const now = new Date();
    const dataPoints: Array<{
      date: string;
      fullDate: string;
      equity: number;
      returnPercent: number;
      dailyPnL: number;
      tradesCount: number;
      hasTrade: boolean;
    }> = [];

    // Group trades by date YYYY-MM-DD
    const tradesByDate = new Map<string, { net: number; count: number }>();
    trades.forEach(t => {
      const d = t.closeTime ? t.closeTime.slice(0, 10) : t.openTime.slice(0, 10);
      const net = (t.profit || 0) + (t.commission || 0) + (t.swap || 0);
      const cur = tradesByDate.get(d) || { net: 0, count: 0 };
      tradesByDate.set(d, {
        net: cur.net + net,
        count: cur.count + 1
      });
    });

    // Compute cumulative profit from prior trades before the window
    const windowStart = new Date(now.getTime() - (days - 1) * 24 * 60 * 60 * 1000);
    windowStart.setHours(0, 0, 0, 0);

    let runningEquity = initialBalance;
    trades.forEach(t => {
      const tDate = new Date(t.closeTime || t.openTime);
      if (tDate < windowStart) {
        runningEquity += ((t.profit || 0) + (t.commission || 0) + (t.swap || 0));
      }
    });

    for (let i = days - 1; i >= 0; i--) {
      const targetDate = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const y = targetDate.getFullYear();
      const m = String(targetDate.getMonth() + 1).padStart(2, '0');
      const d = String(targetDate.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${d}`;
      const displayLabel = `${m}/${d}`;

      const dayActivity = tradesByDate.get(dateStr);
      const dayNet = dayActivity ? dayActivity.net : 0;
      const dayCount = dayActivity ? dayActivity.count : 0;

      runningEquity += dayNet;

      const returnPct = initialBalance > 0 
        ? ((runningEquity - initialBalance) / initialBalance) * 100 
        : 0;

      dataPoints.push({
        date: displayLabel,
        fullDate: dateStr,
        equity: Math.round(runningEquity * 100) / 100,
        returnPercent: Math.round(returnPct * 100) / 100,
        dailyPnL: Math.round(dayNet * 100) / 100,
        tradesCount: dayCount,
        hasTrade: dayCount > 0
      });
    }

    return dataPoints;
  }, [trades, initialBalance, days]);

  const minVal = useMemo(() => {
    const equities = chartData.map(d => d.equity);
    const min = Math.min(...equities, initialBalance);
    return Math.floor((min * 0.99) / 100) * 100;
  }, [chartData, initialBalance]);

  const maxVal = useMemo(() => {
    const equities = chartData.map(d => d.equity);
    const max = Math.max(...equities, initialBalance);
    return Math.ceil((max * 1.01) / 100) * 100;
  }, [chartData, initialBalance]);

  const latestEquity = chartData[chartData.length - 1]?.equity ?? initialBalance;
  const thirtyDayChange = latestEquity - initialBalance;
  const thirtyDayPercent = initialBalance > 0 ? (thirtyDayChange / initialBalance) * 100 : 0;
  const peakEquity = Math.max(...chartData.map(d => d.equity), initialBalance);
  const totalWindowTrades = chartData.reduce((acc, d) => acc + d.tradesCount, 0);

  return (
    <div className="w-full flex flex-col justify-between select-none">
      {/* 30-Day Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between text-xs mb-3 font-mono gap-y-1">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div>
            <span className="text-slate-400">近{days}天净利: </span>
            <span className={`font-bold ${thirtyDayChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {thirtyDayChange >= 0 ? '+' : ''}${thirtyDayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-[11px] ml-1">
                ({thirtyDayPercent >= 0 ? '+' : ''}{thirtyDayPercent.toFixed(2)}%)
              </span>
            </span>
          </div>
          <div className="hidden sm:inline">
            <span className="text-slate-400">峰值净值: </span>
            <span className="text-slate-200 font-semibold">${peakEquity.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-400">
          基准本金: <span className="text-slate-300">${initialBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* Recharts Area + Line Container */}
      <div className="w-full h-[230px] sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 12, right: 12, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="rechartsEquityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#172236" strokeDasharray="3 3" vertical={false} />

            <XAxis
              dataKey="date"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#1e293b' }}
              interval="preserveStartEnd"
              fontFamily="JetBrains Mono, monospace"
            />

            <YAxis
              domain={[minVal, maxVal]}
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}`}
              fontFamily="JetBrains Mono, monospace"
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0b0f17]/95 border border-[#223049] rounded-lg p-2.5 shadow-2xl text-xs font-mono backdrop-blur-md z-50">
                      <div className="text-slate-400 text-[11px] mb-1 font-medium">{data.fullDate}</div>
                      <div className="text-emerald-400 font-bold text-sm tracking-tight">
                        账户净值: ${data.equity.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-slate-300 text-[11px] mt-1 flex items-center justify-between gap-4">
                        <span>较初始增长:</span>
                        <span className={data.returnPercent >= 0 ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                          {data.returnPercent >= 0 ? '+' : ''}{data.returnPercent.toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-slate-300 text-[11px] mt-0.5 flex items-center justify-between gap-4">
                        <span>当日单日盈亏:</span>
                        <span className={data.dailyPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {data.dailyPnL >= 0 ? '+' : ''}${data.dailyPnL.toFixed(2)}
                        </span>
                      </div>
                      {data.tradesCount > 0 ? (
                        <div className="text-cyan-400 text-[10px] mt-1 pt-1 border-t border-[#1a2336]">
                          ✓ 当日平仓成交: {data.tradesCount} 笔订单
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[10px] mt-1 pt-1 border-t border-[#1a2336]">
                          当日未开平仓
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <ReferenceLine
              y={initialBalance}
              stroke="#475569"
              strokeDasharray="4 4"
              label={{ value: '本金基准线', fill: '#64748b', fontSize: 10, position: 'insideTopLeft' }}
            />

            {/* Gradient Area under the line */}
            <Area
              type="monotone"
              dataKey="equity"
              stroke="none"
              fillOpacity={1}
              fill="url(#rechartsEquityGrad)"
            />

            {/* Crisp Main Equity Line */}
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.hasTrade) {
                  return (
                    <circle
                      key={`dot-${payload.fullDate}`}
                      cx={cx}
                      cy={cy}
                      r={3.5}
                      fill="#10b981"
                      stroke="#0b0f17"
                      strokeWidth={1.5}
                    />
                  );
                }
                return null;
              }}
              activeDot={{ r: 6, fill: '#34d399', stroke: '#0a0d14', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {totalWindowTrades === 0 && (
        <div className="mt-2 text-center text-[11px] text-slate-400 bg-[#0d121c] py-1.5 px-3 rounded border border-[#172030]">
          💡 提示：近{days}天暂无已平仓订单，折线显示初始本金基准。导入 MT5 报表或记账后将自动绘制净值增长轨迹。
        </div>
      )}
    </div>
  );
};
