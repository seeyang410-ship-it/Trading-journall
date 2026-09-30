import React, { useState } from 'react';
import { X, BookMarked, Plus, DollarSign } from 'lucide-react';
import { MT5Account } from '../types/trade';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: MT5Account) => void;
}

export const AddAccountModal: React.FC<AddAccountModalProps> = ({
  isOpen,
  onClose,
  onAddAccount
}) => {
  if (!isOpen) return null;

  const [accountName, setAccountName] = useState('实盘交易账本');
  const [currency, setCurrency] = useState('USD');
  const [initialBalance, setInitialBalance] = useState<number>(10000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) {
      alert('请输入账本名称');
      return;
    }

    const newAcc: MT5Account = {
      id: `acc-${Date.now()}`,
      accountNumber: Math.floor(100000 + Math.random() * 900000).toString(),
      broker: '手动记账',
      server: '本地存储',
      accountName: accountName.trim(),
      currency,
      leverage: 100,
      initialBalance,
      currentBalance: initialBalance,
      equity: initialBalance,
      margin: 0,
      freeMargin: initialBalance,
      isConnected: false,
      lastSyncTime: new Date().toISOString(),
      syncType: 'manual_statement'
    };

    onAddAccount(newAcc);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-[#101622] border border-[#1f2a3f] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1a2336] bg-[#101622]">
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              新建自主交易账本
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
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">账本名称</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="例如: 实盘主账本, 模拟考核仓, 小资金测试仓"
              required
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">初始本金金额</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-xs font-mono text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="any"
                value={initialBalance}
                onChange={(e) => setInitialBalance(parseFloat(e.target.value) || 0)}
                required
                className="w-full bg-[#141b29] border border-[#20293d] rounded-lg pl-7 pr-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">作为净值增长折线图与盈亏统计的基准初始资金</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">基准计价货币</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="USD">USD - 美元 ($)</option>
              <option value="CNY">CNY - 人民币 (¥)</option>
              <option value="EUR">EUR - 欧元 (€)</option>
              <option value="GBP">GBP - 英镑 (£)</option>
            </select>
          </div>

          <div className="p-3 bg-[#0d121c] rounded-lg border border-[#172030] text-[11px] text-slate-400 leading-relaxed">
            💡 本平台为<strong>完全纯自主手动记账模式</strong>，无任何第三方接口连接。所有开平仓记录与复盘截图均保存在本地，安全私密。
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
              <Plus className="w-3.5 h-3.5" />
              <span>创建账本</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
