import React, { useState, useEffect, useMemo } from 'react';
import { 
  Flame, 
  RefreshCw, 
  Search, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Calendar, 
  Filter, 
  Bell, 
  ExternalLink, 
  Share2, 
  Check, 
  Coins, 
  Landmark, 
  Zap, 
  Clock 
} from 'lucide-react';
import { NewsItem } from '../types/trade';

type NewsCategory = 'all' | 'high' | 'commodities' | 'forex' | 'central_bank' | 'crypto';

const INITIAL_LIVE_NEWS: NewsItem[] = [
  {
    id: 'n-1',
    title: '美联储鲍威尔讲话释放鹰中偏鸽信号：不急于激进降息，数据依赖依然是核心准绳',
    content: '鲍威尔在最新的经济俱乐部论坛中表示，美国劳动力市场正在逐步恢复供需平衡，通胀虽然稳步下行但核心服务业通胀黏性依然需保持警惕。利率决策将继续逐次会议根据实时数据灵活评估。',
    time: '2分钟前',
    source: '彭博财经 (Bloomberg)',
    category: 'central_bank',
    importance: 'high',
    sentiment: 'neutral',
    impactAsset: 'DXY / 美元指数'
  },
  {
    id: 'n-2',
    title: '现货黄金 (XAUUSD) 欧盘强势拉升突破关键阻力位，地缘局势升温引发避险买盘涌入',
    content: '伦敦金现报强势站上 2915 美元/盎司关口，日内涨超 1.2%。多家华尔街头部对冲基金与主权财富基金近期持续增持贵金属ETF头寸以对冲宏观债务扩张压力。',
    time: '8分钟前',
    source: '路透社 (Reuters)',
    category: 'commodities',
    importance: 'high',
    sentiment: 'bullish',
    impactAsset: 'XAUUSD / 现货黄金'
  },
  {
    id: 'n-3',
    title: '欧洲央行行长拉加德：若通胀确认朝向2%目标收敛，未来几个月或将进一步调整政策利率',
    content: '拉加德在法兰克福新闻发布会上强调，欧洲经济动能依旧偏弱，制造业PMI虽然呈现微幅反弹但商业信贷需求依然低迷，降息周期有望延续。',
    time: '19分钟前',
    source: '欧洲央行官方快讯 (ECB)',
    category: 'forex',
    importance: 'medium',
    sentiment: 'bearish',
    impactAsset: 'EURUSD / 欧元兑美元'
  },
  {
    id: 'n-4',
    title: '美国初请失业金人数录得 21.8 万人，略低于市场预期值 22.4 万人',
    content: '初请失业金人数表明美国企业裁员潮并未显著恶化，劳动力市场呈现温和降温态势，数据公布后美元指数小幅反弹 15 点，美债收益率温和上涨。',
    time: '34分钟前',
    source: '美国劳工部 (BLS)',
    category: 'macro',
    importance: 'medium',
    sentiment: 'bullish',
    impactAsset: 'DXY / 美债收益率'
  },
  {
    id: 'n-5',
    title: '比特币 (BTC) 持续在 $94,000 区间高位整固，机构现货 ETF 单日录得超 4 亿美元净流入',
    content: '贝莱德 IBIT 与富达 FBTC 机构买盘势头强劲，链上数据显示长期持有者 (LTH) 筹码抛压处于年内极低水位，市场静待下一个宏观流动性突破催化剂。',
    time: '45分钟前',
    source: 'CoinDesk',
    category: 'crypto',
    importance: 'medium',
    sentiment: 'bullish',
    impactAsset: 'BTCUSD'
  },
  {
    id: 'n-6',
    title: 'WTI 原油受中东航道与供给端不确定性扰动，日内反弹上探 74.50 美元阻力位',
    content: 'OPEC+ 代表表示正在密切监控全球原油实际供需基本面，目前没有提前增产的迫切性，原油波动率指数触及近两周高位。',
    time: '1小时前',
    source: '道琼斯通讯社 (DJ)',
    category: 'commodities',
    importance: 'medium',
    sentiment: 'bullish',
    impactAsset: 'USOIL / 美原油'
  },
  {
    id: 'n-7',
    title: '日本央行行长植田和男：若薪资与服务价格持续正循环，将适时考虑进一步小幅加息',
    content: '美元兑日元 (USDJPY) 短线剧烈下挫 60 点跌破 153.20 水位，日本财务省再次警告外汇市场单边过度投机波动不利于实体经济。',
    time: '1小时前',
    source: '日经新闻 (Nikkei)',
    category: 'forex',
    importance: 'high',
    sentiment: 'bearish',
    impactAsset: 'USDJPY / 美元兑日元'
  },
  {
    id: 'n-8',
    title: '英国央行最新货币政策纪要：服务业通胀放缓慢于预期，年内降息节奏将极为审慎',
    content: '英镑兑美元 (GBPUSD) 守稳 1.2850 关口，英国国债收益率随之攀升，交易员削减了对英国央行今年降息总幅度的押注。',
    time: '2小时前',
    source: '金融时报 (FT)',
    category: 'forex',
    importance: 'low',
    sentiment: 'bullish',
    impactAsset: 'GBPUSD / 英镑兑美元'
  }
];

// High-impact economic calendar events
const ECONOMIC_CALENDAR_EVENTS = [
  { time: '周三 20:30', name: '美国核心 CPI 月率 (Core CPI MoM)', forecast: '0.3%', previous: '0.3%', impact: 'high' },
  { time: '周四 20:30', name: '美国当周初请失业金人数', forecast: '22.0万', previous: '21.8万', impact: 'medium' },
  { time: '周四 22:00', name: '美联储主席鲍威尔在参议院听证会作证', forecast: '政策讲话', previous: '-', impact: 'high' },
  { time: '周五 20:30', name: '美国非农就业人数变化 (NFP)', forecast: '17.5万', previous: '14.2万', impact: 'high' },
  { time: '周五 20:30', name: '美国失业率 (Unemployment Rate)', forecast: '4.2%', previous: '4.3%', impact: 'high' }
];

export const NewsView: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(INITIAL_LIVE_NEWS);
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Auto-refresh simulation to bring live breaking pulses
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Prepend a dynamic fresh wire item
      const freshHeadlines = [
        {
          title: '突发快讯：现货黄金短线突破 2920 美元，多头资金在纽约早盘前发力增仓',
          source: '华尔街见闻',
          category: 'commodities' as const,
          importance: 'high' as const,
          sentiment: 'bullish' as const,
          impactAsset: 'XAUUSD'
        },
        {
          title: '美联储利率期货定价显示：交易员预计下次FOMC降息25个基点的概率升至 78.5%',
          source: '芝加哥商业交易所 (CME FedWatch)',
          category: 'central_bank' as const,
          importance: 'high' as const,
          sentiment: 'neutral' as const,
          impactAsset: 'DXY / 美债'
        },
        {
          title: '离岸人民币 (USDCNH) 短线快速走高 80 点，央行中间价释放稳定汇率强信号',
          source: '路透社',
          category: 'forex' as const,
          importance: 'medium' as const,
          sentiment: 'bearish' as const,
          impactAsset: 'USDCNH'
        }
      ];

      const pick = freshHeadlines[Math.floor(Math.random() * freshHeadlines.length)];
      const freshItem: NewsItem = {
        id: `fresh-${Date.now()}`,
        title: pick.title,
        content: '实时数据流抓取完毕，流动性池与关键宏观指标正在持续变动中。',
        time: '刚刚 (Live)',
        source: pick.source,
        category: pick.category,
        importance: pick.importance,
        sentiment: pick.sentiment,
        impactAsset: pick.impactAsset
      };

      setNews(prev => [freshItem, ...prev.filter(n => n.id !== freshItem.id)]);
      setLastRefreshed(new Date());
      setIsRefreshing(false);
    }, 600);
  };

  // Poll for simulated new flash updates every 45s
  useEffect(() => {
    const timer = setInterval(() => {
      handleRefresh();
    }, 45000);
    return () => clearInterval(timer);
  }, []);

  // Filtered news
  const filteredNews = useMemo(() => {
    return news.filter(item => {
      // Category match
      if (selectedCategory === 'high' && item.importance !== 'high') return false;
      if (selectedCategory === 'commodities' && item.category !== 'commodities') return false;
      if (selectedCategory === 'forex' && item.category !== 'forex') return false;
      if (selectedCategory === 'central_bank' && item.category !== 'central_bank') return false;
      if (selectedCategory === 'crypto' && item.category !== 'crypto') return false;

      // Search match
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(term);
        const inContent = item.content?.toLowerCase().includes(term);
        const inSource = item.source.toLowerCase().includes(term);
        const inAsset = item.impactAsset?.toLowerCase().includes(term);
        if (!inTitle && !inContent && !inSource && !inAsset) return false;
      }

      return true;
    });
  }, [news, selectedCategory, searchTerm]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-10">
      
      {/* Top Header / Live Stream Control Bar */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>全球实时财经快讯与要闻直播</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                LIVE 7x24
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            聚合路透社、彭博社、央行政策动向与全球宏观流动性事件，毫秒级捕捉市场异动催化剂
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <div className="text-right text-xs font-mono text-slate-400 hidden sm:block">
            上次刷新: <strong className="text-slate-300">{lastRefreshed.toLocaleTimeString()}</strong>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#141c2c] hover:bg-[#1b263b] border border-[#23314c] text-xs font-medium text-slate-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? '拉取最新快讯...' : '立即刷新'}</span>
          </button>
        </div>
      </div>

      {/* Economic Calendar Strip: High Impact Events This Week */}
      <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-[#182233]">
          <div className="font-semibold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span>重点宏观财经日历 (High-Impact Economic Calendar)</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            提示：高影响级数据发布时请警惕点差扩大与滑点风险
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ECONOMIC_CALENDAR_EVENTS.map((event, idx) => (
            <div 
              key={idx}
              className="p-2.5 rounded-lg bg-[#0e131d] border border-[#192233] flex flex-col justify-between hover:border-[#22314d] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>{event.time}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                    event.impact === 'high' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {event.impact === 'high' ? '🔴 极高影响' : '🟡 中度影响'}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {event.name}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 pt-1 border-t border-[#172030]">
                <span>预测: <strong className="text-slate-200">{event.forecast}</strong></span>
                <span>前值: <span className="text-slate-400">{event.previous}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all' as NewsCategory, label: '全部快讯' },
            { id: 'high' as NewsCategory, label: '🔴 重磅突发' },
            { id: 'commodities' as NewsCategory, label: '🪙 黄金/原油' },
            { id: 'forex' as NewsCategory, label: '💱 外汇/美元' },
            { id: 'central_bank' as NewsCategory, label: '🏦 央行利率' },
            { id: 'crypto' as NewsCategory, label: '🚀 加密货币' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === tab.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                  : 'bg-[#101622] text-slate-400 hover:text-slate-200 border border-[#1b2336] hover:bg-[#141c2b]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px] max-w-xs w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索快讯关键词、品种如 XAUUSD..."
            className="w-full bg-[#101622] border border-[#1b2336] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* News Feed Stream List */}
      <div className="space-y-3">
        {filteredNews.length === 0 ? (
          <div className="bg-[#101622] border border-[#1b2336] rounded-xl p-12 text-center text-slate-400 space-y-2">
            <Globe className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="text-sm font-semibold text-slate-200">未找到符合条件的快讯报道</div>
            <p className="text-xs text-slate-500">尝试更换搜索词或清除分类筛选器</p>
          </div>
        ) : (
          filteredNews.map(item => {
            const isHigh = item.importance === 'high';
            const isBullish = item.sentiment === 'bullish';
            const isBearish = item.sentiment === 'bearish';

            return (
              <div 
                key={item.id}
                className={`bg-[#101622] border rounded-xl p-4 sm:p-5 transition-all hover:border-[#22314d] ${
                  isHigh ? 'border-amber-500/30 bg-[#121927]/60' : 'border-[#1b2336]'
                }`}
              >
                {/* Meta bar: Time, Source, Tags, Sentiment */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400 font-medium">{item.source}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Impact Asset Tag */}
                    {item.impactAsset && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#141e30] text-cyan-300 border border-cyan-500/30">
                        {item.impactAsset}
                      </span>
                    )}

                    {/* Sentiment Tag */}
                    {item.sentiment && (
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 ${
                        isBullish 
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                          : isBearish 
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-slate-700/30 text-slate-400'
                      }`}>
                        {isBullish ? <TrendingUp className="w-3 h-3" /> : isBearish ? <TrendingDown className="w-3 h-3" /> : null}
                        <span>{isBullish ? '偏多头' : isBearish ? '偏空头' : '中性'}</span>
                      </span>
                    )}

                    {/* Importance badge */}
                    {isHigh && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                        重磅要闻
                      </span>
                    )}
                  </div>
                </div>

                {/* News Title */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>

                {/* News Body / Content */}
                {item.content && (
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.content}
                  </p>
                )}

                {/* Footer copy action */}
                <div className="flex items-center justify-end gap-2 mt-3 pt-2.5 border-t border-[#162032] text-xs text-slate-400">
                  <button
                    onClick={() => handleCopy(item.id, `${item.title}\n${item.content || ''}`)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">已复制快讯</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3 h-3" />
                        <span>复制快讯内容</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
