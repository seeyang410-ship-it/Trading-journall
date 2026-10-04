export interface MacroMarketNews {
  id: string;
  time: string;
  category: 'CentralBank' | 'Rates' | 'Geopolitics' | 'Commodities' | 'Crypto';
  title: string;
  source: string;
  urgency: 'BREAKING (重磅突发)' | 'IMPORTANT (重要)' | 'WATCH (常规关注)';
  plainTranslation: string; // 大白话核心翻译
  marketImpacts: {
    asset: string;
    bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    effectTitle: string;
    plainReason: string;
  }[];
  actionGuide: string; // 普通人具体操作动作
}

export const INITIAL_MACRO_NEWS: MacroMarketNews[] = [
  {
    id: 'news-1',
    time: '12分钟前',
    category: 'CentralBank',
    title: '美联储鲍威尔讲话强调：降息周期路径确定，通胀正顺利回归 2% 目标区间',
    source: '彭博终端实时要闻 (Bloomberg)',
    urgency: 'BREAKING (重磅突发)',
    plainTranslation: '【大白话翻译】：世界最大央行行长亲自表态——“以后借钱利息会越来越便宜，我们不会再突然加息搞紧缩了，大家放心花钱和投资吧！”',
    marketImpacts: [
      {
        asset: '现货黄金 (XAUUSD)',
        bias: 'BULLISH',
        effectTitle: '强力利多 🟢',
        plainReason: '降息意味着存在银行吃利息变亏，全世界避险资金加速从美债逃出抢购黄金。'
      },
      {
        asset: '美股科技龙头 / 纳斯达克 (NAS100)',
        bias: 'BULLISH',
        effectTitle: '强力利多 🟢',
        plainReason: '科技巨头借钱扩张成本骤降，远期估值上限彻底打开，推动英伟达、微软等大涨。'
      },
      {
        asset: '美元指数 (DXY)',
        bias: 'BEARISH',
        effectTitle: '利空走弱 🔴',
        plainReason: '美元利息吸引力下降，资金流出美国，美元汇率走软。'
      },
      {
        asset: '比特币 (BTCUSD)',
        bias: 'BULLISH',
        effectTitle: '放水受益 🟢',
        plainReason: '全球流动性闸门打开，作为高弹性数字资产，比特币买盘持续增加。'
      }
    ],
    actionGuide: '【操作指引】：黄金多头继续拿稳，不要逆势做空；遇到科技股急跌是极佳的逢低建仓机会。'
  },
  {
    id: 'news-2',
    time: '28分钟前',
    category: 'Rates',
    title: '美国最新非农就业新增大幅降温，失业率微升至 4.2%：彻底打消再加息顾虑，99% 概率确认年内连续降息',
    source: '美国劳工部 (BLS) / 路透社',
    urgency: 'BREAKING (重磅突发)',
    plainTranslation: '【大白话翻译】：美国企业招工变慢了，打工人找工作没有以前那么抢手。这对经济虽然微凉，但对金融市场是特大喜讯！因为美联储最怕工资涨得太凶引发恶性通胀；现在招聘降温，美联储就彻底放心了，必须加快开闸降息救市！',
    marketImpacts: [
      {
        asset: '美国10年期国债收益率',
        bias: 'BEARISH',
        effectTitle: '跳水回落 🟢',
        plainReason: '降息预期彻底拉满，国债利息大幅走低，借钱成本大幅减轻。'
      },
      {
        asset: '现货黄金 (XAUUSD)',
        bias: 'BULLISH',
        effectTitle: '火上浇油 🟢',
        plainReason: '就业降温推升降息码率，黄金无息资产吸引力瞬间爆棚。'
      },
      {
        asset: '全球核心股票资产',
        bias: 'BULLISH',
        effectTitle: '放水估值托底 🟢',
        plainReason: '“坏消息变成好消息”，降息水龙头打开让股票估值获得坚实支撑。'
      }
    ],
    actionGuide: '【操作指引】：宏观环境正在进入“降息早期牛市”，手里拿着过量现金最容易被印钞稀释，趁每次回调分批配置核心资产。'
  },
  {
    id: 'news-3',
    time: '45分钟前',
    category: 'Rates',
    title: '美国 10 年期实际利率 (TIPS) 跌破 1.80% 关口，创下近 8 个月新低',
    source: '芝加哥商业交易所 (CME Group)',
    urgency: 'IMPORTANT (重要)',
    plainTranslation: '【大白话翻译】：扣掉物价涨幅之后，把钱存在美国的真实收益已经跌破 1.8%。存银行越来越不划算，大资金开始加速出逃寻找能跑赢通胀的硬资产。',
    marketImpacts: [
      {
        asset: '现货黄金 (XAUUSD)',
        bias: 'BULLISH',
        effectTitle: '超级发动机 🟢',
        plainReason: '真实利率与黄金是绝对的反向指标，真实利息一破位，黄金大机构主力立刻加仓推升金价。'
      },
      {
        asset: '纳斯达克 100 科技股',
        bias: 'BULLISH',
        effectTitle: '估值扩张 🟢',
        plainReason: '贴现率下行，科技巨头远期赚的巨额利润折现到今天更值钱。'
      },
      {
        asset: '美元存款',
        bias: 'BEARISH',
        effectTitle: '吸引力下降 🔴',
        plainReason: '持有无风险美元现金收益跑不赢通胀，资金被迫流入风险市场。'
      }
    ],
    actionGuide: '【操作指引】：这是对黄金最硬核的基本面确认信号！不用看任何短期指标，坚定看多黄金主升浪。'
  },
  {
    id: 'news-4',
    time: '1小时前',
    category: 'CentralBank',
    title: '日本央行行长植田和男表态：若物价走势符合预期将继续加息，全球套息交易拉响风控预警',
    source: '日经新闻 (Nikkei) / 东京外汇市场',
    urgency: 'IMPORTANT (重要)',
    plainTranslation: '【大白话翻译】：日本物价涨了，日本央行可能还要把利息往上加！那些过去借便宜日元买美股和美债的国际大基金，一旦发现日元利息变贵，就会恐慌卖掉美股换回日元还钱。',
    marketImpacts: [
      {
        asset: '美元/日元 (USDJPY)',
        bias: 'BEARISH',
        effectTitle: '高位承压 🔴',
        plainReason: '美日两国利息差距缩窄，资金开始抛售美元、买回日元还贷。'
      },
      {
        asset: '美股高估值投机股',
        bias: 'BEARISH',
        effectTitle: '短线抽水波动 🔴',
        plainReason: '全球套息资金撤资还款，会造成美股盘中短暂剧烈回调洗盘。'
      },
      {
        asset: '避险日元',
        bias: 'BULLISH',
        effectTitle: '升值走强 🟢',
        plainReason: '套息平仓资金疯狂抢购日元现货还债，日元汇率被动暴拉。'
      }
    ],
    actionGuide: '【操作指引】：美元兑日元逢反弹至 153-155 区间适合逢高做空；若美股因此出现短线急跌暴跌，切忌恐慌割肉，反而是绝佳捡便宜低吸的机会。'
  },
  {
    id: 'news-5',
    time: '2小时前',
    category: 'Commodities',
    title: '中东地缘局势升级与霍尔木兹海峡油轮护航警报，OPEC+ 宣布维持现行减产政策至年底',
    source: '路透社国际能源快讯 (Reuters)',
    urgency: 'IMPORTANT (重要)',
    plainTranslation: '【大白话翻译】：中东运输航道又不太平，产油国联盟 OPEC+ 决定先不增产卖油，继续收紧抽油阀门，防止油价暴跌。',
    marketImpacts: [
      {
        asset: '美原油与布伦特油 (WTI / Brent)',
        bias: 'BULLISH',
        effectTitle: '短线支撑 🟢',
        plainReason: '地缘战争风险溢价加上产油国不增产，牢牢锁住 70 美元下方的下跌空间。'
      },
      {
        asset: '全球航空航运业',
        bias: 'BEARISH',
        effectTitle: '成本上升 🔴',
        plainReason: '燃油成本支出增加，短期挤压客运航司的季度净利润率。'
      },
      {
        asset: '现货黄金 (XAUUSD)',
        bias: 'BULLISH',
        effectTitle: '避险提振 🟢',
        plainReason: '中东局势紧张催生全球富豪家办基金避险保买盘。'
      }
    ],
    actionGuide: '【操作指引】：原油短线在 70 美元附近有强支撑，但涨到 80 美元附近抛压很重，建议区间内低吸高抛，不盲目追单。'
  },
  {
    id: 'news-6',
    time: '3小时前',
    category: 'CentralBank',
    title: '欧洲央行 (ECB) 宣布年内第三次降息 25 个基点，行长拉加德称经济下行风险需政策托底',
    source: '法兰克福欧洲央行发布会',
    urgency: 'WATCH (常规关注)',
    plainTranslation: '【大白话翻译】：欧洲经济复苏无力，欧洲央行继续降息放水刺激经济，全球各大主要央行已经形成全面降息宽松的大合唱！',
    marketImpacts: [
      {
        asset: '欧元/美元 (EUR/USD)',
        bias: 'NEUTRAL',
        effectTitle: '短期震荡 🟡',
        plainReason: '欧美央行双双开启降息，两边利差维持平衡，汇率宽幅拉锯。'
      },
      {
        asset: '欧洲跨国核心巨头 (ASML / LVMH)',
        bias: 'BULLISH',
        effectTitle: '信贷改善 🟢',
        plainReason: '低利率降低欧洲企业融资成本，提振高端消费与制造业设备升级。'
      }
    ],
    actionGuide: '【操作指引】：全球各大经济体同步降息，印证“金发女孩放水周期”确立，大方向拥抱核心资产。'
  }
];
