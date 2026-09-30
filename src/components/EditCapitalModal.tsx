import React, { useState } from 'react';
import { X, DollarSign, Wallet, Check, Save } from 'lucide-react';
import { MT5Account } from '../types/trade';

interface EditCapitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: MT5Account | null;
  onSaveCapital: (newInitialBalance: number, newAccountName?: string) => void;
  totalNetProfit?: number;
}

export const EditCapitalModal: React.FC<EditCapitalModalProps> = ({
  isOpen,
  onClose,
  account,
  onSaveCapital,
  totalNetProfit = 0
}) => {
  if (!isOpen || !account) return null;

  const [initialBalance, setInitialBalance] = useState<number>(account.initialBalance || 10000);
  const [accountName, setAccountName] = useState<string>(account.accountName || '我的实盘账本');

  const projectedCurrentBalance = initialBalance + totalNetProfit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialBalance < 0) {
      alert('初始本金不能为负数');
      return;
    }
    onSaveCapital(initialBalance, accountName.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#101622] border border-[#1f2a3f] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1a2336] bg-[#101622]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                设置/修改账户资金
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                自定义您的起始初始资金与账本信息
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#192233] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">账本名称</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="例如: 我的实盘账本"
              required
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1 flex items-center justify-between">
              <span>起始本金规模 (Initial Balance) *</span>
              <span className="text-[11px] text-slate-400 font-normal">支持随时修改</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-emerald-400">$</span>
              <input
                type="number"
                min="0"
                step="any"
                value={initialBalance}
                onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg pl-8 pr-3 py-2 text-sm font-mono font-bold text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[11px] text-slate-400">快速填入:</span>
              {[1000, 5000, 10000, 25000, 50000, 100000].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setInitialBalance(val)}
                  className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors ${
                    initialBalance === val 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold' 
                      : 'bg-[#141b29] text-slate-400 border-[#20293d] hover:text-white'
                  }`}
                >
                  ${val.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time projection preview */}
          <div className="p-3 bg-[#0d121c] rounded-xl border border-[#172030] space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>设定初始本金:</span>
              <span className="text-white">${initialBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>手动平仓已记录净收益:</span>
              <span className={totalNetProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {totalNetProfit >= 0 ? '+' : ''}${totalNetProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="pt-1.5 border-t border-[#1b2538] flex items-center justify-between font-bold">
              <span className="text-slate-200">更新后当前净值 (Equity):</span>
              <span className="text-emerald-400 text-sm">
                ${projectedCurrentBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#1a2336]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>保存并应用</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
