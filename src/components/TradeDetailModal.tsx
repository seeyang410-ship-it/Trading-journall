import React, { useState, useRef } from 'react';
import { 
  X, 
  Trash2, 
  Clock, 
  Tag, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  Maximize2, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Trade } from '../types/trade';

interface TradeDetailModalProps {
  trade: Trade | null;
  onClose: () => void;
  onDelete: (id: string) => void;
  onUpdateTrade?: (updated: Trade) => void;
}

export const TradeDetailModal: React.FC<TradeDetailModalProps> = ({
  trade,
  onClose,
  onDelete,
  onUpdateTrade
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!trade) return null;

  const net = (trade.profit || 0) + (trade.commission || 0) + (trade.swap || 0);
  const isWin = net > 0;
  const isLoss = net < 0;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请上传有效的图片文件 (PNG, JPG, WebP)');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const updated: Trade = {
        ...trade,
        chartUrl: dataUrl
      };
      if (onUpdateTrade) {
        onUpdateTrade(updated);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      alert('读取图片失败，请重试');
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    e.target.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          handleImageFile(file);
          break;
        }
      }
    }
  };

  const handleRemoveImage = () => {
    if (confirm('确认删除此笔交易的图表截图吗？')) {
      const updated: Trade = {
        ...trade,
        chartUrl: undefined
      };
      if (onUpdateTrade) {
        onUpdateTrade(updated);
      }
    }
  };

  const handleTogglePositionStatus = () => {
    if (!onUpdateTrade) return;
    const newStatus = trade.positionStatus === 'HOLDING' ? 'CLOSED' : 'HOLDING';
    const updated: Trade = {
      ...trade,
      positionStatus: newStatus,
      closeTime: newStatus === 'HOLDING' ? '' : (trade.closeTime || new Date().toISOString())
    };
    onUpdateTrade(updated);
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm"
        onPaste={handlePaste}
      >
        <div className="bg-[#101622] border border-[#1f2a3f] rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1a2336] sticky top-0 bg-[#101622] z-10">
            <div className="flex items-center gap-3">
              <div className={`px-2 py-1 rounded-lg font-mono font-bold text-xs ${
                trade.type === 'BUY' 
                  ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
              }`}>
                {trade.type}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span>{trade.symbol}</span>
                  <span className="text-xs text-slate-400 font-sans font-normal">#{trade.ticket}</span>
                </h3>
              </div>
              <div>
                {trade.positionStatus === 'HOLDING' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400 border border-blue-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                    <span>持仓中 (Open)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
                    <Check className="w-3 h-3 text-slate-400" />
                    <span>已平仓 (Closed)</span>
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Big P&L Hero Card */}
          <div className="p-5 bg-[#141b29] border-b border-[#1a2336] flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400">净成交收益 (Net P&L)</div>
              <div className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight mt-1 ${
                isWin ? 'text-emerald-400' : isLoss ? 'text-rose-400' : 'text-slate-200'
              }`}>
                {net >= 0 ? '+' : ''}${net.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                毛利 ${trade.profit.toFixed(2)} · 手续费 ${trade.commission.toFixed(2)} · 隔夜利息 ${trade.swap.toFixed(2)}
              </div>
            </div>

            <div className="text-right font-mono">
              {trade.rrRatio && (
                <div>
                  <div className="text-xs text-slate-400">盈亏比收益率</div>
                  <div className={`text-xl font-bold mt-1 ${trade.rrRatio > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {trade.rrRatio > 0 ? `+${trade.rrRatio.toFixed(2)}R` : `${trade.rrRatio.toFixed(2)}R`}
                  </div>
                </div>
              )}
              <div className="text-xs text-slate-400 mt-1">
                盈亏点数: <strong className={trade.pips >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {trade.pips >= 0 ? `+${trade.pips}` : trade.pips} pips
                </strong>
              </div>
            </div>
          </div>

          {/* Position Status Notice / Action Bar */}
          {trade.positionStatus === 'HOLDING' ? (
            <div className="mx-5 mt-4 p-3.5 bg-blue-950/30 border border-blue-500/40 rounded-xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></span>
                <div>
                  <div className="text-xs font-bold text-blue-300">当前订单为「持仓中」</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">平仓价当前为最新参考价，盈亏为当前浮动盈亏</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTogglePositionStatus}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>标记为已平仓</span>
              </button>
            </div>
          ) : (
            <div className="mx-5 mt-3 flex justify-end">
              <button
                type="button"
                onClick={handleTogglePositionStatus}
                className="text-[11px] text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                <span>重新转为「持仓中」状态</span>
              </button>
            </div>
          )}

          {/* Detailed Spec Grid */}
          <div className="p-5 space-y-4 flex-1">
            
            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="bg-[#131926] p-2.5 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px]">交易手数</div>
                <div className="text-slate-200 font-bold mt-0.5">{trade.volume.toFixed(2)} Lots</div>
              </div>
              <div className="bg-[#131926] p-2.5 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px]">入场开仓价</div>
                <div className="text-slate-200 font-bold mt-0.5">{trade.openPrice.toLocaleString()}</div>
              </div>
              <div className="bg-[#131926] p-2.5 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px]">出场平仓价</div>
                <div className="text-slate-200 font-bold mt-0.5">{trade.closePrice.toLocaleString()}</div>
              </div>
              <div className="bg-[#131926] p-2.5 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px]">自评打分</div>
                <div className="text-amber-400 font-bold mt-0.5">{'★'.repeat(trade.rating || 5)}</div>
              </div>
            </div>

            {/* Time & Stop/Target */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="bg-[#131926] p-3 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>开仓与平仓时间</span>
                </div>
                <div className="text-slate-300">开: {new Date(trade.openTime).toLocaleString()}</div>
                <div className="text-slate-300 mt-0.5">平: {new Date(trade.closeTime).toLocaleString()}</div>
              </div>

              <div className="bg-[#131926] p-3 rounded-lg border border-[#1d273a]">
                <div className="text-slate-400 text-[11px] mb-1">预设止损与目标位</div>
                <div className="text-slate-300">止损 (SL): {trade.stopLoss ? trade.stopLoss.toLocaleString() : '未设硬止损'}</div>
                <div className="text-slate-300 mt-0.5">止盈 (TP): {trade.takeProfit ? trade.takeProfit.toLocaleString() : '未设固定止盈'}</div>
              </div>
            </div>

            {/* Setup & Psychology Section */}
            <div className="bg-[#131926] p-3.5 rounded-lg border border-[#1d273a] space-y-2">
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>战术策略模型:</span>
                <span className="font-mono text-emerald-400">{trade.setup || '自由交易'}</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                <div>
                  <span className="text-slate-400">心态标记: </span>
                  <span className="font-medium text-slate-200">{trade.emotions?.join(', ') || '正常执行'}</span>
                </div>
                <div>
                  <span className="text-slate-400">失误标记: </span>
                  <span className={trade.mistakes?.[0] !== 'None (Disciplined)' ? 'text-amber-400 font-medium' : 'text-emerald-400'}>
                    {trade.mistakes?.join(', ') || '无违规'}
                  </span>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* IMAGE UPLOAD & CHART SCREENSHOT SECTION                   */}
            {/* ========================================================= */}
            <div className="bg-[#131926] p-4 rounded-xl border border-[#1d273a] space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>复盘图表截图 (Chart Screenshot)</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {trade.chartUrl && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-2.5 py-1 text-[11px] text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded transition-colors"
                    >
                      删除图片
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded bg-[#1c273c] hover:bg-[#253552] text-cyan-300 border border-[#2b3c5c] transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{trade.chartUrl ? '更换截图' : '上传图片'}</span>
                  </button>
                </div>
              </div>

              {trade.chartUrl ? (
                /* Uploaded Image Preview */
                <div className="relative group rounded-xl overflow-hidden border border-[#243350] bg-[#0b0f17]">
                  <img
                    src={trade.chartUrl}
                    alt="Trade Chart Screenshot"
                    className="w-full max-h-[320px] object-contain mx-auto cursor-zoom-in group-hover:opacity-95 transition-opacity"
                    onClick={() => setLightboxOpen(true)}
                  />
                  
                  <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/70 hover:bg-black/90 text-white text-[11px] backdrop-blur-md border border-white/20 transition-all"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>查看大图</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Dropzone */
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#243350] hover:border-cyan-500/60 bg-[#0e1422] hover:bg-[#121a2d] cursor-pointer transition-all group text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#182338] group-hover:bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-2 transition-transform group-hover:scale-110">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    点击选择图片，或支持从剪贴板按 Ctrl+V 直接粘贴
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    支持 PNG, JPG, WebP 格式的 TradingView / 走势图截图
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            {trade.notes && (
              <div className="bg-[#0e131d] p-3.5 rounded-lg border border-[#1c263b]">
                <div className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                  <span>复盘笔记与执行心得</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {trade.notes}
                </p>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1a2336] flex items-center justify-between">
            <button
              onClick={() => {
                if (confirm('确认从日志中删除这笔订单记录吗？')) {
                  onDelete(trade.id);
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>删除订单</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1a2438] text-slate-200 border border-[#20293d] transition-colors cursor-pointer"
            >
              关闭
            </button>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for Full Resolution Screenshot */}
      {lightboxOpen && trade.chartUrl && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <img
            src={trade.chartUrl}
            alt="Full Chart"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
