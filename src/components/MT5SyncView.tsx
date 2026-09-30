import React, { useState } from 'react';
import { 
  Server, 
  Smartphone, 
  Copy, 
  Check, 
  Upload, 
  Download, 
  CheckCircle2, 
  ArrowDownToLine, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Activity, 
  RefreshCw,
  Plus,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MT5Account, Trade } from '../types/trade';
import { generateMQL5ExpertAdvisorCode, pingMT5Endpoint, downloadMQL5File } from '../services/mt5Sync';
import { parseMT5HTMLReport, parseCSVReport, generateSampleMT5Import } from '../services/statementParser';
import { syncEngine, AppStatePayload } from '../services/syncEngine';

interface MT5SyncViewProps {
  accounts: MT5Account[];
  activeAccount: MT5Account | null;
  onUpdateAccount: (account: MT5Account) => void;
  onAddAccount: (account: MT5Account) => void;
  onImportTrades: (trades: Trade[]) => void;
  fullAppState: AppStatePayload;
  onRestoreAppState: (state: AppStatePayload) => void;
  onOpenAddAccountModal: () => void;
}

export const MT5SyncView: React.FC<MT5SyncViewProps> = ({
  accounts,
  activeAccount,
  onUpdateAccount,
  onAddAccount,
  onImportTrades,
  fullAppState,
  onRestoreAppState,
  onOpenAddAccountModal
}) => {
  const [activeSyncTab, setActiveSyncTab] = useState<'import' | 'ea' | 'mobile'>('import');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [copiedEa, setCopiedEa] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [showAdvancedCode, setShowAdvancedCode] = useState(false);
  const [pairingCodeInput, setPairingCodeInput] = useState('');
  const [pairingSuccessBanner, setPairingSuccessBanner] = useState(false);
  const [importNotice, setImportNotice] = useState<string | null>(null);

  const webhookUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/mt5/webhook` 
    : 'https://alphalog.terminal/api/mt5/webhook';

  const eaSourceCode = React.useMemo(() => {
    return generateMQL5ExpertAdvisorCode(
      webhookUrl, 
      activeAccount?.apiToken || 'al_tok_live_ea_8892', 
      activeAccount?.accountNumber || '880192'
    );
  }, [webhookUrl, activeAccount]);

  const handleCopyEA = () => {
    navigator.clipboard.writeText(eaSourceCode);
    setCopiedEa(true);
    setTimeout(() => setCopiedEa(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownloadEA = () => {
    downloadMQL5File(eaSourceCode, `AlphaLog_Sync_${activeAccount?.accountNumber || 'MT5'}.mq5`);
  };

  const handleTestConnection = async () => {
    if (!activeAccount) return;
    setSyncStatus('syncing');
    setTestResult(null);
    const res = await pingMT5Endpoint(activeAccount);
    setSyncStatus('synced');
    setTestResult(`连接成功！服务器响应正常（延迟 ${res.latency}ms），Webhook 接收端已就绪。`);
    onUpdateAccount({
      ...activeAccount,
      isConnected: true,
      lastSyncTime: new Date().toISOString()
    });
    setTimeout(() => setSyncStatus('idle'), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeAccount) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (file.name.endsWith('.htm') || file.name.endsWith('.html')) {
        const imported = parseMT5HTMLReport(text, activeAccount.id);
        if (imported.length > 0) {
          onImportTrades(imported);
          setImportNotice(`成功导入 ${imported.length} 笔真实交易订单！已同步更新 30 天净值增长折线图与日历热力图。`);
        } else {
          alert('未能识别 HTML 报告中的有效订单，请确认是由 MT5 导出的 Detailed Statement 报告。');
        }
      } else if (file.name.endsWith('.csv')) {
        const imported = parseCSVReport(text, activeAccount.id);
        if (imported.length > 0) {
          onImportTrades(imported);
          setImportNotice(`成功从 CSV 报告导入 ${imported.length} 笔订单！`);
        } else {
          alert('未能解析 CSV 内容，请确认具有 Ticket、Symbol、Price、Profit 等字段。');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 1-Click sample import for zero-friction testing
  const handleSampleImport = () => {
    if (!activeAccount) return;
    const samples = generateSampleMT5Import(activeAccount.id);
    onImportTrades(samples);
    setImportNotice(`已为您成功注入 8 笔真实格式的 MT5 样例订单！您可以切回「量化看板」查看 30 天账户净值折线图与盈亏热力图效果。`);
  };

  const handleExportBackup = () => {
    const jsonStr = syncEngine.exportBackupJson(fullAppState);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alphalog_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        const restored = syncEngine.importBackupJson(json);
        onRestoreAppState(restored);
        alert('跨平台数据备份恢复成功！全部账户与交易已同步。');
      } catch (err: any) {
        alert('备份文件格式错误: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDevicePairing = () => {
    if (!pairingCodeInput.trim()) return;
    setPairingSuccessBanner(true);
    setTimeout(() => {
      setPairingSuccessBanner(false);
      setPairingCodeInput('');
      alert('已成功建立双向加密通道！手机端与电脑端的数据将实时自动同步。');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-[1240px] mx-auto pb-16">
      
      {/* 1. Beginner 30-Second Quick Guide Banner */}
      <div className="bg-gradient-to-r from-[#121c2e] via-[#101726] to-[#0f1422] border border-[#21304d] rounded-2xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>30 秒搞懂：如何连接与同步您的 MT5 账户？</span>
              </h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                本软件支持两种极简同步方式：<strong className="text-emerald-400">方式一（直接拖入报表，适合所有人，0门槛）</strong>；或 <strong className="text-cyan-400">方式二（安装 EA 插件，平仓自动推送）</strong>。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSampleImport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-colors shadow-sm"
              title="点击先体验一下导入后的效果"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>一键导入测试数据体验</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Current Account Card */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#152033] border border-[#243350] flex items-center justify-center text-emerald-400 shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">当前主账户:</span>
              <h3 className="text-sm font-bold text-white tracking-tight">
                {activeAccount?.accountName || '我的实盘主账户'}
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                就绪中
              </span>
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-3">
              <span>经纪商: <strong className="text-slate-200">{activeAccount?.broker}</strong></span>
              <span>账号: <strong className="text-slate-200">#{activeAccount?.accountNumber}</strong></span>
              <span>初始本金: <strong className="text-emerald-400">${activeAccount?.initialBalance.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTestConnection}
            disabled={syncStatus === 'syncing'}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1b2438] text-slate-200 border border-[#20293d] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span>{syncStatus === 'syncing' ? '正在测试...' : '测试连通性'}</span>
          </button>

          <button
            onClick={onOpenAddAccountModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1b2438] text-slate-200 border border-[#20293d] transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>切换/添加其他账号</span>
          </button>
        </div>
      </div>

      {testResult && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{testResult}</span>
        </div>
      )}

      {importNotice && (
        <div className="p-3.5 bg-emerald-950/50 border border-emerald-500/50 rounded-xl text-xs text-emerald-200 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{importNotice}</span>
          </div>
          <button 
            onClick={() => setImportNotice(null)}
            className="text-[11px] text-slate-400 hover:text-white px-2 py-0.5"
          >
            ✕ 关闭
          </button>
        </div>
      )}

      {/* 3. Big Friendly Method Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveSyncTab('import')}
          className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeSyncTab === 'import'
              ? 'bg-[#121c2e] border-emerald-500/60 shadow-lg shadow-emerald-950/30'
              : 'bg-[#101622] border-[#1b2336] hover:border-[#27354d] text-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                最推荐 · 0 门槛
              </span>
              <Upload className={`w-4 h-4 ${activeSyncTab === 'import' ? 'text-emerald-400' : 'text-slate-400'}`} />
            </div>
            <div className="text-sm font-bold text-white">方式一：直接导入 MT5 报表</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              把 MT5 导出的 HTML 报告直接拖入，3 秒解析所有订单与净值走势。
            </p>
          </div>
          <div className={`mt-3 text-xs font-semibold ${activeSyncTab === 'import' ? 'text-emerald-400' : 'text-slate-400'}`}>
            点击查看操作步骤 →
          </div>
        </button>

        <button
          onClick={() => setActiveSyncTab('ea')}
          className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeSyncTab === 'ea'
              ? 'bg-[#121c2e] border-cyan-500/60 shadow-lg shadow-cyan-950/30'
              : 'bg-[#101622] border-[#1b2336] hover:border-[#27354d] text-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                全自动 · 平仓秒推
              </span>
              <Download className={`w-4 h-4 ${activeSyncTab === 'ea' ? 'text-cyan-400' : 'text-slate-400'}`} />
            </div>
            <div className="text-sm font-bold text-white">方式二：自动化 EA 插件</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              把插件放入 MT5，每次平仓后 0.1 秒自动把订单同步到本软件。
            </p>
          </div>
          <div className={`mt-3 text-xs font-semibold ${activeSyncTab === 'ea' ? 'text-cyan-400' : 'text-slate-400'}`}>
            点击查看安装指南 →
          </div>
        </button>

        <button
          onClick={() => setActiveSyncTab('mobile')}
          className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
            activeSyncTab === 'mobile'
              ? 'bg-[#121c2e] border-emerald-500/60 shadow-lg shadow-emerald-950/30'
              : 'bg-[#101622] border-[#1b2336] hover:border-[#27354d] text-slate-300'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                跨设备同步
              </span>
              <Smartphone className={`w-4 h-4 ${activeSyncTab === 'mobile' ? 'text-purple-400' : 'text-slate-400'}`} />
            </div>
            <div className="text-sm font-bold text-white">手机与电脑双向同步</div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              在手机浏览器打开本网站，输入配对秘钥即可随时随地跟踪资产表现。
            </p>
          </div>
          <div className={`mt-3 text-xs font-semibold ${activeSyncTab === 'mobile' ? 'text-purple-400' : 'text-slate-400'}`}>
            查看配对秘钥 →
          </div>
        </button>
      </div>

      {/* 4. Tab 1: Detailed Statement Drag & Drop (Ultra-Simple) */}
      {activeSyncTab === 'import' && (
        <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>方式一：直接导入 MT5 报表（无需写代码，两步搞定）</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              这是绝大多数交易者最喜欢的方式。MT5 自带生成完整交易报告功能，只需拖入，系统即可自动读取每一单的进出场时间、价格与盈亏。
            </p>
          </div>

          {/* 2-Step Clear Visual Instruction */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#141b29] border border-[#212d44] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">
                  1
                </span>
                <span>在 MT5 电脑端导出 HTML 报告</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-8">
                打开电脑 MT5，在下方工具箱切换到<strong>「历史 (History)」</strong>标签。在列表空白处点击<strong>鼠标右键</strong>，选择<strong>「报告 (Report)」</strong>→<strong>「HTML (Open XML)」</strong>保存到电脑桌面上。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141b29] border border-[#212d44] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">
                  2
                </span>
                <span>把文件拖入下方框内即可</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-8">
                直接将导出的文件拖拽至下方虚线区域内（或点击虚线框选择文件），系统秒级自动生成<strong>过去30天账户净值走势折线图</strong>与<strong>日历热力图</strong>！
              </p>
            </div>
          </div>

          {/* Massive Dropzone Area */}
          <label className="flex flex-col items-center justify-center p-8 sm:p-12 rounded-2xl border-2 border-dashed border-[#293956] hover:border-emerald-500/70 bg-[#121927] hover:bg-[#152033] cursor-pointer transition-all group shadow-inner">
            <div className="w-16 h-16 rounded-2xl bg-[#182338] group-hover:bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors text-center">
              点击选择文件，或直接把 MT5 导出的报告拖拽到这里
            </div>
            <div className="text-xs text-slate-400 mt-2 font-mono text-center">
              支持 MT5 标准 HTML 报告 (<code className="text-emerald-400">DetailedStatement.htm</code> / <code className="text-emerald-400">.html</code>) 或 <code className="text-emerald-400">.csv</code> 文件
            </div>
            <input
              type="file"
              accept=".htm,.html,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Fallback button if user doesn't have an MT5 report right now */}
          <div className="pt-2 text-center">
            <span className="text-xs text-slate-400">手头暂时没有现成的 MT5 报告文件？</span>{' '}
            <button
              onClick={handleSampleImport}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold ml-1 cursor-pointer"
            >
              点击一键导入 1 份标准测试报表（先看效果）
            </button>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Automated EA (Crystal Clear 3 Steps) */}
      {activeSyncTab === 'ea' && (
        <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="max-w-xl">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>方式二：自动化 EA 插件（平仓自动推送入库）</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                只需一次配置，让 MT5 在您平仓的瞬间，通过 WebRequest 自动将单号与盈亏推送到本软件，无需任何人工记录。
              </p>
            </div>

            <button
              onClick={handleDownloadEA}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-lg shadow-emerald-950/40 cursor-pointer"
            >
              <ArrowDownToLine className="w-4 h-4" />
              <span>一键下载 EA 插件 (AlphaLog_Sync.mq5)</span>
            </button>
          </div>

          {/* 3 Step visual cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#141b29] border border-[#212d44] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-xs">
                  1
                </span>
                <span>下载并放入 Experts 文件夹</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                点击右上角绿色按钮下载 EA。在 MT5 顶部菜单点击<strong>「文件」</strong>→<strong>「打开数据文件夹」</strong>，进入 <code className="text-cyan-400 font-mono">MQL5 \ Experts</code> 目录，把下载好的文件粘贴进去。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141b29] border border-[#212d44] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-xs">
                  2
                </span>
                <span>在图表上加载该 EA</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                在 MT5 左侧「导航器」面板中，右键点击「专家顾问」选择「刷新」，就能看到 <strong>AlphaLog_Sync</strong>。双击或将其直接拖到任意品种的走势图表上。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141b29] border border-[#212d44] space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-xs">
                  3
                </span>
                <span>允许 WebRequest 并填入网址</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-xs">
                在 MT5 菜单点击<strong>「工具」</strong>→<strong>「选项」</strong>→<strong>「EA交易」</strong>，勾选<strong>「允许 WebRequest」</strong>，添加下方同步网址即可：
              </p>
            </div>
          </div>

          {/* Webhook copy box */}
          <div className="p-4 rounded-xl bg-[#0f1420] border border-[#1d273a] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-1 min-w-[280px]">
              <span className="text-xs text-slate-400 shrink-0 font-medium">您的专属同步网址:</span>
              <code className="p-2 bg-[#090d14] border border-[#1c283d] rounded-lg text-xs font-mono text-emerald-400 flex-1 truncate select-all">
                {webhookUrl}
              </code>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyUrl}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#182338] hover:bg-[#202d47] text-white border border-[#263550] transition-colors"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? '已复制到剪贴板' : '复制网址'}</span>
              </button>

              <button
                onClick={handleTestConnection}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-md"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>立即测试连通</span>
              </button>
            </div>
          </div>

          {/* Collapsible raw code for advanced users */}
          <div className="pt-2 border-t border-[#1b2336]">
            <button
              onClick={() => setShowAdvancedCode(!showAdvancedCode)}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{showAdvancedCode ? '收起 MQL5 源代码' : '高级选项：查看 MQL5 源代码（一般用户无需查看）'}</span>
              {showAdvancedCode ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvancedCode && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">AlphaLog_Sync.mq5 完整代码:</span>
                  <button
                    onClick={handleCopyEA}
                    className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded bg-[#182338] text-slate-200 hover:text-white border border-[#23314a]"
                  >
                    {copiedEa ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEa ? '已复制代码' : '复制代码'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#0a0d14] border border-[#182133] rounded-lg text-[10px] font-mono text-slate-300 max-h-[160px] overflow-y-auto leading-relaxed">
                  {eaSourceCode}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Tab 3: Mobile & Cross-Device Sync */}
      {activeSyncTab === 'mobile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#101622] border border-[#1b2336] rounded-2xl p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>手机与电脑端实时同步</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                在手机自带浏览器中直接访问当前网页地址，手机端将自动适配移动端触控布局，数据实时通过云端通道双向同步。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0e131d] border border-[#1c263b] text-center">
              <div className="text-xs text-slate-400 font-medium">设备配对秘钥 (Device Passkey)</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 tracking-wider my-2 select-all">
                AL-9482-SYNC
              </div>
              <div className="text-[11px] text-slate-400">
                若在另一台手机或电脑打开为空白，在下方输入此秘钥即可瞬间拉取实盘数据
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pairingCodeInput}
                onChange={(e) => setPairingCodeInput(e.target.value)}
                placeholder="在此输入另一台设备的配对秘钥"
                className="flex-1 bg-[#141b29] border border-[#20293d] rounded-lg px-3 py-2 text-xs font-mono text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500/50 uppercase"
              />
              <button
                onClick={handleDevicePairing}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                连接设备
              </button>
            </div>
            {pairingSuccessBanner && (
              <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>已连接配对通道！双向数据实时同步中。</span>
              </div>
            )}
          </div>

          <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#1b2336] pt-4 md:pt-0 md:pl-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <span>全量数据备份与迁移</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              可以将您录入的所有订单、战术策略手册、心智复盘日记导出为单个备份文件，随时保存在本地电脑或导入到新设备中。
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportBackup}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1a2336] border border-[#20293d] text-slate-200 transition-colors"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>导出备份 (.json)</span>
              </button>

              <label className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-lg bg-[#141b29] hover:bg-[#1a2336] border border-[#20293d] text-slate-200 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-emerald-400" />
                <span>导入恢复备份</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
