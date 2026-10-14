import { CentralBankLiquidity, MacroIndicator, AssetDriverProfile, MacroRegimeType, RiskSentimentType } from '../types/macro';
import { COMPREHENSIVE_MACRO_ASSETS } from './macroAssetDrivers';

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

export const ASSET_CORE_DRIVERS: AssetDriverProfile[] = COMPREHENSIVE_MACRO_ASSETS;
