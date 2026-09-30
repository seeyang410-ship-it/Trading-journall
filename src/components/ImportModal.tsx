import React, { useRef } from 'react';
import { X, Upload, Zap, FileSpreadsheet, CheckCircle2, AlertCircle } from 'lucide-react';
import { Trade } from '../types/trade';
import { parseMT5HTMLReport, parseCSVReport, generateSampleMT5Import } from '../services/statementParser';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTrades: (trades: Trade[]) => void;
  accountId: string;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImportTrades,
  accountId
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        let imported: Trade[] = [];

        if (file.name.endsWith('.htm') || file.name.endsWith('.html')) {
          imported = parseMT5HTMLReport(text, accountId);
        } else if (file.name.endsWith('.csv')) {
          imported = parseCSVReport(text, accountId);
        }

        if (imported.length > 0) {
          onImportTrades(imported);
          onClose();
        } else {
          setErrorMsg('未检测到有效的已平仓交易订单。请确认报表格式为 HTML 或 CSV 格式。');
        }
      } catch (err: any) {
        setErrorMsg('解析文件时出错: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleInjectSample = () => {
    const sample = generateSampleMT5Import(accountId);
    onImportTrades(sample);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#101622] border border-[#1f2a3f] rounded-xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1a2336] bg-[#101622]">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              导入交易报表数据 (HTML / CSV)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          
          {/* Option 1: File Upload */}
          <div>
            <div className="text-xs font-semibold text-slate-200 mb-1.5">
              1. 导入 MT5 Detailed Statement 报告文件 (.html / .htm / .csv)
            </div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-5 rounded-xl border-2 border-dashed border-[#232f46] hover:border-emerald-500/50 bg-[#131926] hover:bg-[#172032] cursor-pointer transition-all text-center group"
            >
              <FileSpreadsheet className="w-8 h-8 text-emerald-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-medium text-slate-200">
                点击选择或拖拽文件至此
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                支持 MetaTrader 5 导出的历史成交明细报表与 CSV 数据
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".htm,.html,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/30 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* MT5 Export Instructions */}
          <div className="pt-2 border-t border-[#1a2336] text-xs text-slate-300 space-y-1.5">
            <div className="font-semibold text-slate-200">如何从 MetaTrader 5 导出报表:</div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-400 leading-relaxed">
              <li>打开电脑端 MT5，在下方工具箱切换到「历史 (History)」标签页。</li>
              <li>在订单列表上点击鼠标右键，选择「报告 (Report)」 → 「HTML」或「XML/CSV」。</li>
              <li>保存生成的 <code className="text-emerald-400 font-mono">DetailedStatement.htm</code> 文件并直接拖拽到上方即可完成秒级解析导入。</li>
            </ol>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1a2336] bg-[#0d121c] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            关闭
          </button>
        </div>

      </div>
    </div>
  );
};
