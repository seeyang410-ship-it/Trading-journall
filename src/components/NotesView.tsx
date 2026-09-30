import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Pin, 
  Save, 
  Check, 
  Copy, 
  FileText, 
  Tag, 
  Folder, 
  Calendar, 
  Clock, 
  ListTodo, 
  Sparkles, 
  Download,
  AlertCircle
} from 'lucide-react';
import { NotebookNote } from '../types/trade';

const STORAGE_NOTES_KEY = 'tradelog_user_notes_v2';

const CATEGORIES = [
  '全部',
  '交易思路',
  '复盘顿悟',
  '系统军规',
  '每周规划',
  '心态警醒',
  '随想草稿'
];

const DEFAULT_INITIAL_NOTES: NotebookNote[] = [
  {
    id: 'note-1',
    title: '我的交易系统不可违背的核心军规',
    content: `1. 绝不在未确认盈亏比 >= 1:2.0 的情况下轻率开仓。
2. 任何订单入场同时必须设死硬止损 (Hard SL)，绝不允许扛单或在被套时后移止损。
3. 单笔订单最大亏损严格控制在总账户资金的 1% - 1.5% 以内。
4. 单日连续亏损达到 2 笔，立即关机离开屏幕，强制执行冷却期，绝不开启报复性交易 (Revenge Trading)。
5. 重大财经数据 (如非农 NFP、CPI、美联储决议) 发布前后 15 分钟内不执行新入场。`,
    category: '系统军规',
    isPinned: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    tags: ['军规', '风控', '纪律']
  },
  {
    id: 'note-2',
    title: '黄金与美元指数走势深度推演思考',
    content: `近期观察要点：
- 黄金在 2900 整数关口上方承接力非常强，每次假跌破都伴随迅速收针（Liquidity Sweep），显示有大型机构在逢低吸筹。
- 美元指数处于反弹阻力区域，一旦美债收益率掉头向下，贵金属很可能启动新一波单边多头主升浪。
- 操作策略：保持耐心，等待美盘回调测试关键 FVG（合理价值缺口）再跟随做多，绝不盲目追高。`,
    category: '交易思路',
    isPinned: false,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    tags: ['黄金', 'DXY', '推演']
  },
  {
    id: 'note-3',
    title: '关于“耐心”与“出手机会”的复盘顿悟',
    content: `交易不是每天都必须操作的体力活，而是一名狙击手的等待游戏。

回顾过去的失败交易，80% 以上都发生在震荡行情中因为无聊而随意进场的“垃圾交易”。
市场 70% 的时间在整理，只有 30% 呈现高确定性的趋势。学会空仓、管住双手，本身就是一种极具价值的超额收益能力。`,
    category: '复盘顿悟',
    isPinned: false,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    tags: ['心态', '等待', '顿悟']
  }
];

export const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<NotebookNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_NOTES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_INITIAL_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(() => {
    return notes[0]?.id || '';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Active note instance
  const activeNote = useMemo(() => {
    return notes.find(n => n.id === activeNoteId) || notes[0] || null;
  }, [notes, activeNoteId]);

  // Save notes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [notes]);

  // Create new note
  const handleCreateNote = () => {
    const newNote: NotebookNote = {
      id: `note-${Date.now()}`,
      title: '未命名笔记',
      content: '',
      category: selectedCategory === '全部' ? '随想草稿' : selectedCategory,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  };

  // Update active note title or content
  const handleUpdateActiveNote = (fields: Partial<NotebookNote>) => {
    if (!activeNote) return;
    setNotes(prev => prev.map(n => {
      if (n.id === activeNote.id) {
        return {
          ...n,
          ...fields,
          updatedAt: new Date().toISOString()
        };
      }
      return n;
    }));
  };

  // Delete active note
  const handleDeleteNote = (id: string) => {
    if (confirm('确认删除这篇笔记吗？此操作无法撤销。')) {
      const remaining = notes.filter(n => n.id !== id);
      setNotes(remaining);
      if (remaining.length > 0) {
        setActiveNoteId(remaining[0].id);
      } else {
        setActiveNoteId('');
      }
    }
  };

  // Toggle pin
  const handleTogglePin = () => {
    if (!activeNote) return;
    handleUpdateActiveNote({ isPinned: !activeNote.isPinned });
  };

  // Copy note content
  const handleCopyNote = () => {
    if (!activeNote) return;
    const text = `${activeNote.title}\n\n${activeNote.content}`;
    navigator.clipboard.writeText(text);
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 1500);
  };

  // Insert quick template text
  const insertTemplate = (prefix: string) => {
    if (!activeNote) return;
    const current = activeNote.content;
    const addition = current ? `\n${prefix}` : prefix;
    handleUpdateActiveNote({ content: current + addition });
  };

  // Filter and sort notes (pinned first, then newest updated)
  const filteredNotes = useMemo(() => {
    return notes
      .filter(n => {
        if (selectedCategory !== '全部' && n.category !== selectedCategory) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const inTitle = n.title.toLowerCase().includes(q);
          const inContent = n.content.toLowerCase().includes(q);
          const inCategory = n.category.toLowerCase().includes(q);
          if (!inTitle && !inContent && !inCategory) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
  }, [notes, selectedCategory, searchQuery]);

  return (
    <div className="max-w-[1520px] mx-auto space-y-4 pb-10">
      
      {/* Top Banner */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              交易随笔与灵感笔记本 (Trader's Notebook)
            </h2>
            <p className="text-xs text-slate-400">
              随时记录盘面思考、突发顿悟、宏观推演与纪律自查，自动保存在本地
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateNote}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>新建笔记</span>
        </button>
      </div>

      {/* Main 2-Column Notebook Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[640px]">
        
        {/* Left Column: Note List & Filters (4 cols on lg) */}
        <div className="lg:col-span-4 bg-[#101622] border border-[#1b2336] rounded-xl p-3 sm:p-4 flex flex-col space-y-3">
          
          {/* Search bar */}
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索笔记标题或内容..."
              className="w-full bg-[#141b29] border border-[#20293d] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Category Tag Pills */}
          <div className="flex flex-wrap items-center gap-1 pb-2 border-b border-[#182233]">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#151e2e]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notes list item scroll container */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[560px] pr-1">
            {filteredNotes.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                没有找到相关笔记
              </div>
            ) : (
              filteredNotes.map(n => {
                const isActive = n.id === activeNote?.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => setActiveNoteId(n.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-left space-y-1 ${
                      isActive
                        ? 'bg-[#162032] border-emerald-500/50 shadow-md'
                        : 'bg-[#131926] border-[#1d273a] hover:border-[#2b3c58] hover:bg-[#151c2a]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px]">
                        {n.title || '未命名笔记'}
                      </h4>
                      {n.isPinned && (
                        <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 shrink-0">
                          <Pin className="w-3 h-3 fill-emerald-400" />
                          <span>置顶</span>
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {n.content ? n.content.replace(/[#*`>-]/g, '').trim() : '（空白内容）'}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-[#0d121c] text-slate-400">
                        {n.category}
                      </span>
                      <span>{new Date(n.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column: Note Editor Canvas (8 cols on lg) */}
        <div className="lg:col-span-8 bg-[#101622] border border-[#1b2336] rounded-xl flex flex-col overflow-hidden">
          
          {activeNote ? (
            <>
              {/* Editor Top Toolbar */}
              <div className="flex flex-wrap items-center justify-between p-3 sm:px-5 sm:py-3 border-b border-[#182233] bg-[#121824] gap-2">
                
                {/* Left tools: Category picker & Quick templates */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={activeNote.category}
                    onChange={(e) => handleUpdateActiveNote({ category: e.target.value })}
                    className="bg-[#172132] border border-[#23314c] rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-semibold focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c !== '全部').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Formatting quick actions */}
                  <div className="hidden sm:flex items-center gap-1 border-l border-[#1f2c44] pl-2 text-xs text-slate-400">
                    <button
                      type="button"
                      onClick={() => insertTemplate('### 关键小结：\n')}
                      className="px-2 py-0.5 rounded bg-[#172132] hover:text-white hover:bg-[#1d2a40] transition-colors"
                      title="插入标题"
                    >
                      标题
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTemplate('- [ ] 进场前待办检查：\n')}
                      className="px-2 py-0.5 rounded bg-[#172132] hover:text-white hover:bg-[#1d2a40] transition-colors"
                      title="插入清单"
                    >
                      待办
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTemplate('> 核心警醒：绝不在关键阻力位盲目开多。\n')}
                      className="px-2 py-0.5 rounded bg-[#172132] hover:text-white hover:bg-[#1d2a40] transition-colors"
                      title="插入警醒引用"
                    >
                      警醒
                    </button>
                  </div>
                </div>

                {/* Right tools: Pin, Copy, Delete */}
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={handleTogglePin}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors ${
                      activeNote.isPinned
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-[#172132] text-slate-400 border-[#23314c] hover:text-white'
                    }`}
                  >
                    <Pin className={`w-3.5 h-3.5 ${activeNote.isPinned ? 'fill-emerald-400' : ''}`} />
                    <span>{activeNote.isPinned ? '已置顶' : '置顶'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyNote}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#172132] border border-[#23314c] text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSuccess ? '已复制' : '复制全文'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteNote(activeNote.id)}
                    className="p-1 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors ml-1"
                    title="删除笔记"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Title Input */}
              <div className="p-4 sm:px-6 sm:pt-5 pb-2">
                <input
                  type="text"
                  value={activeNote.title}
                  onChange={(e) => handleUpdateActiveNote({ title: e.target.value })}
                  placeholder="笔记标题..."
                  className="w-full bg-transparent text-lg sm:text-xl font-bold text-white placeholder:text-slate-600 focus:outline-none tracking-tight"
                />
              </div>

              {/* Content Textarea */}
              <div className="flex-1 p-4 sm:px-6 pt-1 flex flex-col">
                <textarea
                  value={activeNote.content}
                  onChange={(e) => handleUpdateActiveNote({ content: e.target.value })}
                  placeholder="在此自由书写您的交易随笔、复盘思考、行情推演或心理日记..."
                  className="w-full flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed font-sans min-h-[380px]"
                />
              </div>

              {/* Editor Bottom Status Bar */}
              <div className="p-3 sm:px-6 border-t border-[#182233] bg-[#0d121c] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Check className="w-3 h-3" />
                    <span>已自动保存至本地</span>
                  </span>
                  <span>字数: {activeNote.content.length} 字符</span>
                </div>

                <div>
                  最后修改: {new Date(activeNote.updatedAt).toLocaleTimeString()}
                </div>
              </div>

            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400 space-y-3">
              <FileText className="w-10 h-10 text-slate-600" />
              <div className="text-sm font-semibold text-slate-300">尚未选择任何笔记</div>
              <button
                onClick={handleCreateNote}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              >
                新建第一篇笔记
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
