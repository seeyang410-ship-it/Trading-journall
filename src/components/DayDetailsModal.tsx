import React from 'react';
import { X, Calendar, TrendingUp, TrendingDown, BookOpen, ArrowRight } from 'lucide-react';
import { Trade, DailyJournalEntry } from '../types/trade';

interface DayDetailsModalProps {
  dateStr: string | null;
  onClose: () => void;
  trades: Trade[];
  journal?: DailyJournalEntry;
  onSelectTrade: (trade: Trade) => void;
  onNavigateToJournal: (dateStr: string) => void;
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  dateStr,
  onClose,
  trades,
  journal,
  onSelectTrade,
  onNavigateToJournal
}) => {
  if (!dateStr) return null;

  const dayTrades = trades.filter(t => {
    const d = t.closeTime ? t.closeTime.slice(0, 10) : t.openTime.slice(0, 10);
    return d === dateStr;
  });

  const netDayPnL = dayTrades.reduce((acc, t) => acc + (t.profit + t.commission + t.swap), 0);
  const wins = dayTrades.filter(t => (t.profit + t.commission + t.swap) > 0).length;
  const losses = dayTrades.filter(t => (t.profit + t.commission + t.swap) < 0).length;
  const winRate = dayTrades.length > 0 ? Math.round((wins / dayTrades.length) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#101622] border border-[#1f2a3f] rounded-xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a2336] sticky top-0 bg-[#101622] z-10">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-mono">
              {dateStr} 交易复盘与流水
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Day P&L Summary Strip */}
        <div className="p-4 bg-[#141b29] border-b border-[#1a2336] grid grid-cols-3 gap-2 text-center font-mono">
          <div>
            <div className="text-[11px] text-slate-400 font-sans">当日净盈亏</div>
            <div className={`text-base font-bold mt-0.5 ${netDayPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {netDayPnL >= 0 ? '+' : ''}${netDayPnL.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-sans">当日胜率</div>
            <div className="text-base font-bold text-white mt-0.5">
              {winRate}%
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-sans">执行笔数</div>
            <div className="text-base font-bold text-slate-200 mt-0.5">
              {dayTrades.length} 单 ({wins}胜 / {losses}负)
            </div>
          </div>
        </div>

        {/* Trade List */}
        <div className="p-4 space-y-2 flex-1">
          <div className="text-xs font-semibold text-slate-300 mb-2">当日成交订单明细:</div>
          {dayTrades.length === 0 ? (
            <div className="text-xs text-slate-400 py-6 text-center">
              当日无平仓订单
            </div>
          ) : (
            dayTrades.map(t => {
              const net = t.profit + t.commission + t.swap;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    onClose();
                    onSelectTrade(t);
                  }}
                  className="p-3 rounded-lg bg-[#131926] hover:bg-[#172032] border border-[#1d273a] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-mono">{t.symbol}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        t.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {t.type} {t.volume}L
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">#{t.ticket}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 font-sans">
                      {t.setup} · {t.pips >= 0 ? `+${t.pips}` : t.pips} pips
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className={`font-bold text-sm ${net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {net >= 0 ? '+' : ''}${net.toFixed(2)}
                    </div>
                    {t.rrRatio && (
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {t.rrRatio > 0 ? `+${t.rrRatio}R` : `${t.rrRatio}R`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Day's Journal Excerpt & Link */}
        {journal && (
          <div className="p-4 bg-[#0e131d] border-t border-[#1a2336] text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-300 mb-1">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>当日复盘摘录</span>
              </span>
              <span className="font-mono text-amber-400">纪律打分: {journal.disciplineScore} ★</span>
            </div>
            <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed">
              {journal.postMarketReview || journal.lessonsLearned || '当日未填写详细复盘'}
            </p>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#1a2336] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onNavigateToJournal(dateStr);
            }}
            className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>前往编辑当日心智日记</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1a2438] text-slate-200 border border-[#20293d] transition-colors"
          >
            关闭
          </button>
        </div>

      </div>
    </div>
  );
};
