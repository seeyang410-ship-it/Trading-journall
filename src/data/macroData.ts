import { CentralBankLiquidity, MacroIndicator, AssetDriverProfile, MacroRegimeType, RiskSentimentType } from '../types/macro';

export const CURRENT_MACRO_REGIME: {
  regime: MacroRegimeType;
  sentiment: RiskSentimentType;
  summary: string;
  fedActionBias: string;
  topTrades: string[];
} = {
  regime: '温和金发女孩时代 (通胀下来了，经济没崩溃，最好的投资环境)',
  sentiment: '积极进取 (大胆买入好资产)',
  summary: '【大白话总论】：现在是难得的“投资好年景”！物价通胀终于降下来了，但全球经济并没有发生大崩盘；美联储（世界央行之首）已经正式拧开水龙头开始逐步降息放水。世界上的流动资金正在慢慢变多，这种时候手里拿着现金只会被通胀慢慢吃掉，逢低把钱换成“抗贬值的黄金”和“真正能大把赚钱的全球科技巨头”是胜率最高的选择。',
  fedActionBias: '开启逐步降息周期 (预计每次会议降息 1 到 2 档，给市场持续补充活钱)',
  topTrades: [
    '逢价格回调分批买入黄金 (XAUUSD)：全球央行都在狂囤黄金，实际利息越低黄金越值钱',
    '闭眼挑选大打折、手里有大笔现金的全球核心科技龙头 (如英伟达、台积电、微软、腾讯)',
    '远离高负债、赚不到真金白银现金流的垃圾概念小盘股'
  ]
};

export const INITIAL_CENTRAL_BANK_LIQUIDITY: CentralBankLiquidity = {
  date: new Date().toISOString().slice(0, 10),
  fedTotalAssets: 7.02, // Trillion USD
  tgaBalance: 785.4, // Billion USD
  rrpBalance: 245.2, // Billion USD
  netLiquidity: 5.989, // Fed Total Assets - TGA - RRP = 7.02 - 0.7854 - 0.2452
  netLiquidityChange30d: 84.6, // Billion USD net injected
  ecbBalanceEUR: 6.45,
  pbocLiquidityCNY: 42.1,
  bojBalanceJPY: 752.0,
  globalM2YoY: 6.4,
  plainExplanation: {
    poolStatus: '水池水位：近 6 万亿美元活钱（处在温和回升安全期）',
    flowDirection: '近30天水龙头动向：净注入放水 +846 亿美元（开闸补水）',
    whatItMeansForYou: '只要水龙头不突然关掉抽水，全球股市和黄金就不容易发生毁灭性崩盘，每次大跌都是给你打折上车的机会。'
  }
};

export const MACRO_KEY_INDICATORS: MacroIndicator[] = [
  {
    id: 'us10y_yield',
    name: '美债10年期基准收益率 (US 10Y)',
    plainTitle: '全世界借钱利息的标杆 (美国10年国债利息)',
    category: 'Rates',
    currentValue: 4.12,
    unit: '%',
    change24h: -0.04,
    change30d: -0.28,
    benchmarkLevel: 4.50,
    implication: '全球资产定价之锚，长端收益率回落大幅缓解科技股估值贴现压力',
    plainAnalogy: '【生活比喻】：好比全世界的“基准房贷利率”。利息越高，企业借钱扩张成本越贵，大家越想把钱存银行吃利息，股票就没人买；利息越低，存银行没意思，大家就会把钱拿去买股票和黄金。',
    plainHowToRead: '【怎么看】：这个数字从 4.5% 降到 4.12% 是特大利好！说明借钱变便宜了，对纳斯达克、科技股和所有投资品都是大推力。',
    plainActionAdvice: '【该怎么做】：利息处于回落趋势，科技股每次跌都是上车买点，不要恐慌割肉。',
    status: 'Bullish',
    chartHistory: [4.45, 4.42, 4.38, 4.35, 4.30, 4.28, 4.25, 4.20, 4.18, 4.15, 4.12]
  },
  {
    id: 'tips10y_real_rate',
    name: '美国10年期实际利率 (10Y TIPS Yield)',
    plainTitle: '扣除通胀后存在银行的“真实利息” (黄金的核心命脉)',
    category: 'Rates',
    currentValue: 1.82,
    unit: '%',
    change24h: -0.03,
    change30d: -0.22,
    benchmarkLevel: 2.20,
    implication: '黄金核心驱动指标。实际利率与黄金价格呈现极其显著的负相关性',
    plainAnalogy: '【生活比喻】：黄金放在家里是不会像母鸡下蛋一样生利息的。如果你把钱存银行扣掉物价涨幅之后还能净赚大把利息，那谁还买黄金？但只要这个“真实利息”往下跌，说明存银行钱越来越毛，大家就会疯抢黄金保值！',
    plainHowToRead: '【怎么看】：目前真实利息只有 1.82% 且还在走低，这就解释了为什么金价能一路创出历史新高！两者是绝对的翘翘板。',
    plainActionAdvice: '【该怎么做】：只要这个数字不反弹超过 2.2%，黄金的多头大趋势就非常安全，逢低买黄金赢面极大。',
    status: 'Bullish',
    chartHistory: [2.15, 2.10, 2.05, 2.00, 1.95, 1.92, 1.88, 1.85, 1.82]
  },
  {
    id: 'yield_curve_spread',
    name: '美债 10Y - 2Y 利差倒挂/陡峭化',
    plainTitle: '全球经济健康体温计 (长短借钱利差倒挂与纠偏)',
    category: 'Rates',
    currentValue: 0.18,
    unit: '%',
    change24h: 0.02,
    change30d: 0.24,
    benchmarkLevel: 0.00,
    implication: '利差已成功由倒挂转向正向陡峭化，标志宏观周期正式步入降息宽松初期',
    plainAnalogy: '【生活比喻】：去银行借10年钱，利息理应比借2年贵对吧？之前世界倒过来了，借2年的利息竟然比借10年还贵（叫利差倒挂），说明经济发高烧快进重症室了。现在这个数字终于变成正数 (+0.18%)，代表体温退烧正常了！',
    plainHowToRead: '【怎么看】：倒挂解除说明央行已经开始下狠手降息放水救经济了，最惊险的硬着陆警报暂时解除。',
    plainActionAdvice: '【该怎么做】：市场从提心吊胆转向正常投资阶段，可以逐步加大权益资产仓位。',
    status: 'Neutral',
    chartHistory: [-0.45, -0.35, -0.20, -0.10, -0.02, 0.05, 0.12, 0.15, 0.18]
  },
  {
    id: 'dxy_dollar_index',
    name: '美元信用指数 (DXY Index)',
    plainTitle: '美元到底在升值还是贬值 (世界通货强弱标尺)',
    category: 'FX',
    currentValue: 101.45,
    unit: '点',
    change24h: -0.25,
    change30d: -1.80,
    benchmarkLevel: 104.0,
    implication: '美元指数疲软释放非美货币与大宗商品上涨弹性，改善全球跨境流动性',
    plainAnalogy: '【生活比喻】：美元是全世界做买卖的公认筹码。美元越强势升值，其他国家换美元越困难，生意就越难做；美元贬值走软，全世界的大宗商品（黄金、原油、铜，因为是用美元定价的）就会自然而然涨价。',
    plainHowToRead: '【怎么看】：从 104 跌到 101.45，说明美元在温和贬值，这给全球股市和以黄金为首的资产腾出了巨大上涨空间。',
    plainActionAdvice: '【该怎么做】：美元走弱期间，不要大量死持美元现金，换成抗通胀的优质资产更划算。',
    status: 'Bullish',
    chartHistory: [104.5, 103.8, 103.2, 102.8, 102.5, 102.0, 101.8, 101.45]
  },
  {
    id: 'vix_volatility',
    name: 'CBOE 标普恐慌波动率指数 (VIX)',
    plainTitle: '股市大赌场心跳测谎仪 (恐慌波动指数)',
    category: 'Risk',
    currentValue: 15.2,
    unit: '',
    change24h: -0.65,
    change30d: -3.4,
    benchmarkLevel: 20.0,
    implication: 'VIX 处于 15 低位温和区间，机构对冲卖压有限，市场风险偏好稳固',
    plainAnalogy: '【生活比喻】：好比大风大浪预警。低于 15 说明风平浪静，大家都在甲板上吃烧烤跳舞；超过 25 说明开始刮狂风暴雨；如果飙到 35 以上说明全场吓尿了都在抢救生圈。',
    plainHowToRead: '【怎么看】：现在只有 15.2，非常平静，没有任何主力机构在大规模恐慌抛售。',
    plainActionAdvice: '【该怎么做】：顺应平稳的多头趋势做交易；如果某天它突然暴涨到 30 以上，那才是大跌抄底的绝佳机会。',
    status: 'Bullish',
    chartHistory: [22.4, 20.1, 18.5, 17.2, 16.8, 16.0, 15.6, 15.2]
  },
  {
    id: 'copper_gold_ratio',
    name: '铜金比 (Copper / Gold Ratio)',
    plainTitle: '实干打螺丝搞建设 vs 挖防空洞避险逃命',
    category: 'Commodities',
    currentValue: 1.54,
    unit: '',
    change24h: 0.01,
    change30d: 0.05,
    benchmarkLevel: 1.60,
    implication: '工业铜 vs 避险金比值微幅反弹，显示全球制造业初现复苏再补库苗头',
    plainAnalogy: '【生活比喻】：铜是工厂造电线、造电动车必须用的实干金属；金是天下大乱时大家买来藏在床底下的保命金。铜比金跑得快，说明大家都在拼命建工厂赚钱；金比铜跑得快，说明大家都在防备战争和危机。',
    plainHowToRead: '【怎么看】：比值稳步回升，说明全球工厂开工率还过得去，实体经济没有熄火。',
    plainActionAdvice: '【该怎么做】：实体制造业逐步企稳，可以同时配置工业龙头股与黄金，攻守兼备。',
    status: 'Neutral',
    chartHistory: [1.42, 1.45, 1.48, 1.50, 1.51, 1.53, 1.54]
  },
  {
    id: 'hyg_credit_spread',
    name: '高收益垃圾债信用利差 (HYG Spread)',
    plainTitle: '借钱给差生公司的利息罚金 (企业会不会成批暴雷)',
    category: 'Risk',
    currentValue: 312,
    unit: 'bps',
    change24h: -4,
    change30d: -28,
    benchmarkLevel: 400,
    implication: '利差收窄至历史低位区间，企业无违约系统性危机，信贷流动性畅通',
    plainAnalogy: '【生活比喻】：借钱给清华好学生（苹果微软）利息很低；借钱给混混差生，你必须收很高的额外利息当风险补偿。如果这个利息罚金很低，说明银行觉得连差生都不会暴雷，市场极度安全！',
    plainHowToRead: '【怎么看】：利差只有 312 点（远低于 400 警戒线），说明全球大金融机构非常乐观，没有闻到任何企业破产倒闭潮的味道。',
    plainActionAdvice: '【该怎么做】：不用害怕系统性金融危机，放心投资优秀企业。',
    status: 'Bullish',
    chartHistory: [360, 350, 342, 335, 328, 320, 316, 312]
  },
  {
    id: 'global_m2_supply',
    name: '全球主要央行 M2 同比增速',
    plainTitle: '全世界钞票印刷机转动的速度 (全球法币印钱速度)',
    category: 'Liquidity',
    currentValue: 6.4,
    unit: '% YoY',
    change24h: 0.0,
    change30d: 1.2,
    benchmarkLevel: 5.0,
    implication: '全球法币供应量重新加速上行，是比特币与黄金长周期牛市的根本底座',
    plainAnalogy: '【生活比喻】：所有法定纸币都在无休止地印。当全球印钞机以每年 6.4% 的速度狂吐钞票时，物价和硬资产价格就会被动抬高，这就是为什么买好房、买黄金、买比特币长期只涨不跌的根本原因。',
    plainHowToRead: '【怎么看】：增速已经从去年的 2% 飙到了 6.4%，纸币稀释正在提速！',
    plainActionAdvice: '【该怎么做】：千万不要傻傻存死期现金，一定要持有稀缺核心资产来对冲印钞稀释。',
    status: 'Bullish',
    chartHistory: [2.1, 3.2, 4.0, 4.8, 5.3, 5.9, 6.2, 6.4]
  }
];

export const ASSET_CORE_DRIVERS: AssetDriverProfile[] = [
  {
    symbol: 'XAUUSD',
    assetName: '现货黄金 (Spot Gold)',
    plainTitle: '人类传承5000年的抗贬值终极硬通货 (黄金)',
    category: 'Commodities',
    currentPrice: 2914.5,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 88,
    coreDriverThesis: '黄金不是靠几条技术均线涨的，它的背后只有三个硬道理：真实利息走低（存银行不香了）、全世界央行抢着去美元化囤黄金、以及全世界政府欠的债太多只能印钱稀释。',
    plainLanguageThesis: '【大白话核心解释】：很多散户以为买黄金是看图表金叉死叉，这是大错特错！黄金真正的引力常数有三个：第一，美国实际利息在下降，大家存银行跑不赢通胀，就会把钱换成黄金；第二，中国、中东等各大国央行，担心哪天被制裁没收美债，正在每个月疯狂用几十吨几十吨的现金狂买黄金搬回国库（谁砸盘央行就大口吃掉）；第三，美国国债已经欠了 36 万亿美元根本还不起，最后只能印钞票稀释，黄金就是反抗纸币贬值的最强护甲！',
    plainActionSummary: '【普通人操作指南】：黄金逢大跌就是天上掉馅饼，每次回踩关键支撑位闭眼分批做多，千万不要去顶着大趋势逆势做空！',
    driverComponents: [
      {
        name: '实际利率下行 (存银行不划算了)',
        weight: 35,
        value: '1.82% 持续下探',
        impact: 'Positive',
        description: '持有黄金的隐性机会成本大大降低，资金源源不断从美债货币基金逃出来买黄金。',
        plainMeaning: '存在银行的钱利息变少，大家觉得存银行亏了，不如买黄金踏实。'
      },
      {
        name: '全球央行组团爆买黄金 (去美元化底座)',
        weight: 30,
        value: '连续 14 个季度年超千吨',
        impact: 'Positive',
        description: '世界各大央行连续三年抢购黄金，形成极度坚固的现货底座。',
        plainMeaning: '连国家中央银行都在疯狂囤黄金防身，谁敢大规模做空？'
      },
      {
        name: '世界各国欠债太多，纸币必定大贬值',
        weight: 20,
        value: '美债破 36 万亿美元',
        impact: 'Positive',
        description: '法币信用债务无底洞膨胀，黄金是对抗纸币稀释的终极保单。',
        plainMeaning: '纸币每天都在被偷偷印发变毛，只有黄金不能凭空印出来。'
      },
      {
        name: '地缘战争与不可预测冲突频发',
        weight: 15,
        value: '中东/东欧冲突常态化',
        impact: 'Positive',
        description: '全球富豪与家办基金必须在保险箱里放 10% 的实体金条防备极端黑天鹅。',
        plainMeaning: '大炮一响，黄金万两。'
      }
    ],
    keyCatalysts: [
      '美联储公布降息决议，宣布进一步降息',
      '世界黄金协会公布季度报告：央行再次增持创历史新高',
      '美国通胀数据超预期回落，债券利息继续跳水'
    ],
    institutionalPositioning: {
      cotNetLongContracts: 268400,
      etfFlow7dUSD: '+$420M (机构疯狂申购黄金ETF)',
      retailSentiment: '72% 坚定看多'
    }
  },
  {
    symbol: 'WTI',
    assetName: '美原油连续 (Crude Oil)',
    plainTitle: '世界工业血液与车轮上的能源 (原油)',
    category: 'Commodities',
    currentPrice: 71.8,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 62,
    coreDriverThesis: '原油处于“上方有中东产油国大批待复产产能压顶，下方有美国政府 70 美元兜底托市”的宽幅震荡博弈中。',
    plainLanguageThesis: '【大白话核心解释】：原油既涨不到天上去，也跌不穿地心。为什么涨不上天？因为沙特等 OPEC+ 产油国手里还闲着每天 450 万桶产能，只要油价敢涨到 85 美元，他们就会立刻开闸多卖油赚钱，瞬间把价格压回来；为什么跌不下去？因为美国政府官方承诺，只要油价跌到 70 美元以下，就会出巨资买原油填满自己的国家战略油库，形成了天然的水泥地板。',
    plainActionSummary: '【普通人操作指南】：跌到 68-70 美元附近小仓位做多，涨到 78-82 美元附近坚决止盈平仓，不做死多头，箱体高抛低吸。',
    driverComponents: [
      {
        name: 'OPEC+ 随时准备复产的大水阀',
        weight: 40,
        value: '450万桶/天闲置产能',
        impact: 'Negative',
        description: '沙特阿拉伯和俄罗斯随时可以增加抽油量，死死按住油价暴涨空间。',
        plainMeaning: '卖家仓库里还堆着大量现货，价格一高他们就抢着甩卖。'
      },
      {
        name: '全球工厂开工率与汽车用油需求',
        weight: 30,
        value: '制造业弱复苏 + 新能源车替代',
        impact: 'Neutral',
        description: '电动车渗透率提升，导致全球汽油消费弹性不如过去十年猛烈。',
        plainMeaning: '开电车的人越来越多，烧汽油的需求没有以前那么饥渴了。'
      },
      {
        name: '美国政府 70 美元国策兜底',
        weight: 30,
        value: '$68-$72 价格区间抄底吸筹',
        impact: 'Positive',
        description: '美国能源部在 70 美元下方公开招标买油，锁死下跌空间。',
        plainMeaning: '跌到 70 美元以下有美国政府当大买家帮你兜底。'
      }
    ],
    keyCatalysts: [
      'OPEC+ 产油国闭门部长级会议决定是否推迟复产',
      '每周三晚上公布的美国原油库存增减数据',
      '中东霍尔木兹海峡油轮运输安全突发事件'
    ],
    institutionalPositioning: {
      cotNetLongContracts: 142000,
      etfFlow7dUSD: '-$65M (资金短线观望)',
      retailSentiment: '51% 犹豫不决'
    }
  },
  {
    symbol: 'NAS100',
    assetName: '纳斯达克100指数 (Nasdaq 100)',
    plainTitle: '全球最顶尖科技印钞机天团 (纳斯达克指数)',
    category: 'Equities',
    currentPrice: 20850,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
    coreDriverThesis: '由“美联储降息带来的估值扩张 ＋ 英伟达/微软/苹果真实的 AI 巨额盈利落地”双涡轮增压驱动。',
    plainLanguageThesis: '【大白话核心解释】：纳斯达克装的是全世界最聪明、最赚钱的一批公司（微软、苹果、英伟达、谷歌、亚马逊、Meta）。这些公司不是炒概念，每年加起来能赚大几千亿美元真金白银！现在美联储开始降息，市场上多出来的钱首先就会流向这些现金流极强、能把 AI 变现的龙头股。而且这些巨头每年还会掏出近 1 万亿美元在市场上直接把自己公司的股票买回来注销，相当于天天在给股价托底。',
    plainActionSummary: '【普通人操作指南】：纳指是普通人分享全球科技红利的最好工具，遇到 3%-5% 的阶段性暴跌回调，就是给你打折送钱的加仓机会！',
    driverComponents: [
      {
        name: '美国国债利息回落 (估值折现天花板打开)',
        weight: 35,
        value: '4.12% 稳步下行',
        impact: 'Positive',
        description: '科技公司的利润都在未来，利息越低，未来的巨额利润折算到今天就越值钱。',
        plainMeaning: '借钱利息下降，科技股的估值倍数自然往上猛涨。'
      },
      {
        name: '巨头真实的吸金造血能力 (EPS增长)',
        weight: 35,
        value: '科技板块净利润预增 18.2%',
        impact: 'Positive',
        description: 'AI 算力卖给全球千行百业，兑现为货真价实的净利润与自由现金流。',
        plainMeaning: '不是讲故事，是真金白银每季度多赚几百亿美元。'
      },
      {
        name: '巨头万亿美元级股票回购计划',
        weight: 30,
        value: '年化近 10000 亿美元回购',
        impact: 'Positive',
        description: '苹果、谷歌等巨头把赚来的现金直接在股市里买入并销毁自家股票。',
        plainMeaning: '市场上的股票越来越少，每股含金量自然越来越高。'
      }
    ],
    keyCatalysts: [
      '英伟达、微软最新季度财报公布',
      '美联储主席鲍威尔在议息会议上的讲话信号',
      '美国大型科技企业财报季指引'
    ],
    institutionalPositioning: {
      cotNetLongContracts: 198000,
      etfFlow7dUSD: '+$1.2B (机构疯狂加仓 QQQ)',
      retailSentiment: '66% 乐观看多'
    }
  },
  {
    symbol: 'USDJPY',
    assetName: '美元/日元 (USD/JPY)',
    plainTitle: '借便宜日元买美债的全球套息游戏 (美日汇率)',
    category: 'Forex',
    currentPrice: 151.85,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 74,
    coreDriverThesis: '美国在逐步降息，日本在逐步加息，两国的利息差距正在不可逆地缩小，借日元套利的游戏快玩不下去了。',
    plainLanguageThesis: '【大白话核心解释】：过去两年，全世界华尔街基金玩了一个很爽的游戏：找日本银行借利息几乎为 0% 的日元，换成美元存到美国拿 5% 的利息，躺赚 5% 的利差（这叫套息交易），所以日元被狂卖疯狂贬值。但现在剧本反转了：美国开始降息，日本物价涨了不得不加息，两边的利差从 5% 缩窄到 3% 多！一旦利差没了，借日元的人就必须赶紧把美元换回日元还债，就会引发日元暴涨、美日汇率暴跌！',
    plainActionSummary: '【普通人操作指南】：美日反弹到 153-155 区域是极佳的做空点（即做多日元），中长期看好日元升值。',
    driverComponents: [
      {
        name: '美日两国国债利息差距持续缩小',
        weight: 45,
        value: '利差从 4.8% 收窄至 3.6%',
        impact: 'Negative',
        description: '去美国吃利息的吸引力越来越低，资金开始有动机卖美元买回日元。',
        plainMeaning: '赚利差的暴利时代结束了，大家准备收摊撤退。'
      },
      {
        name: '日本央行结束负利率后缓慢加息',
        weight: 30,
        value: '日本薪资增长创 30 年最高',
        impact: 'Negative',
        description: '日本经济摆脱通缩，央行行长植田和男有底气在年内继续加息。',
        plainMeaning: '日本利息往上走，日元变得越来越值钱。'
      },
      {
        name: '套息交易踩踏平仓的黑天鹅炸弹',
        weight: 25,
        value: '全球避险时日元极速暴拉',
        impact: 'Negative',
        description: '一旦全球股市出现突发暴跌，借日元的资金会恐慌性平仓还日元。',
        plainMeaning: '只要金融市场一慌，日元就会像火箭一样暴涨。'
      }
    ],
    keyCatalysts: [
      '日本央行公布加息政策决议',
      '美国非农就业数据疲软促使美联储降息预期升温',
      '日本财务省官员发出外汇干预警告'
    ],
    institutionalPositioning: {
      cotNetLongContracts: -45000,
      etfFlow7dUSD: '空头仓位正在大面积恐慌回补',
      retailSentiment: '58% 散户逆势做多被套'
    }
  },
  {
    symbol: 'BTCUSD',
    assetName: '比特币 (Bitcoin)',
    plainTitle: '数字黄金与全球超级流动性海绵 (比特币)',
    category: 'Crypto',
    currentPrice: 94800,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '全球法定纸币 M2 疯狂扩张 ＋ 华尔街合规现货 ETF 每天被动吸筹买光市场流通币 ＋ 减半后每天新挖出来的供应量腰斩。',
    plainLanguageThesis: '【大白话核心解释】：比特币的大逻辑就一句话：它是全世界吸水能力最强、弹性最大的“超级数字海绵”！只要全球各大央行又开始印钱放水（M2 增速回升），那些无处可去的钱就会疯狂涌入比特币。更要命的是，现在贝莱德、富达这些掌控几十万亿美元的华尔街大庄家发行了合规 ETF，欧美养老金和富豪只要点一下鼠标就能配置，每天在市场上吸筹几千枚，而交易所里长期持有者根本不卖，形成了史无前例的“抢货逼空”。',
    plainActionSummary: '【普通人操作指南】：顺应大牛市周期，任何 10% 级别的阶段性急跌洗盘都是黄金坑，拿住现货不要被轻易洗下车。',
    driverComponents: [
      {
        name: '全球法定纸币印钱增速反弹',
        weight: 40,
        value: 'M2 同比增速升至 6.4%',
        impact: 'Positive',
        description: '历史数据表明，全球货币供应量 M2 拐头向上是比特币爆发的最强燃料。',
        plainMeaning: '外面的纸钱越多，总量恒定只有2100万枚的比特币就越珍贵。'
      },
      {
        name: '华尔街现货 ETF 每天在市场上抢货',
        weight: 35,
        value: '贝莱德 IBIT 资产超 450 亿美元',
        impact: 'Positive',
        description: '正规金融大军入场，开启被动指数配置源源不断的买盘。',
        plainMeaning: '华尔街正规军每天都在用大卡车把可交易的比特币拉走锁进金库。'
      },
      {
        name: '交易所可售现货筹码跌破冰点',
        weight: 25,
        value: '跌至 6 年来最低存量',
        impact: 'Positive',
        description: '长期信仰者只买不卖，市场上真正能拿出来卖的现货极其稀缺。',
        plainMeaning: '想买的人排长队，肯卖的人寥寥无几，价格只能往上飞。'
      }
    ],
    keyCatalysts: [
      '美国加密友好监管法案和主权战略储备法案推进',
      '全球主权财富基金（如阿布扎比、挪威）配置试点',
      '全球降息周期全面加速'
    ],
    institutionalPositioning: {
      cotNetLongContracts: 42000,
      etfFlow7dUSD: '+$1.8B (周净流入刷新纪录)',
      retailSentiment: '78% 极度贪婪'
    }
  }
];
