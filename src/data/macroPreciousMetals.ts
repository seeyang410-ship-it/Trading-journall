import { AssetDriverProfile } from '../types/macro';

export const PRECIOUS_METALS_ASSETS: AssetDriverProfile[] = [
  {
    symbol: 'XAUUSD',
    assetName: '现货黄金 (Spot Gold)',
    plainTitle: '人类传承五千年的抗通胀硬通货 (黄金)',
    category: '贵金属',
    subCategory: '实物避险与去美元化之王',
    currentPrice: 2914.5,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 90,
    coreDriverThesis: '全球央行持续买金去美元化 ＋ 实际利率下行 ＋ 欧美主权债务雪球不可逆。',
    plainLanguageThesis: '黄金不是靠图表K线涨跌的，而是靠“真金白银的需求”：全球央行都在狂囤黄金防范美元制裁，加之美国国债已破 36 万亿美元，法币贬值不可逆。',
    plainActionSummary: '【操作指南】：大趋势坚定看多，短期每次回踩支撑位都是上车时机，不盲目追高，顺势做多。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2,880 - $2,950',
        coreLogic: '短期受美联储降息预期及中东地缘政治情绪驱动，日线呈阶梯式震荡上行。需警惕非农超预期带来的阶段性获利回吐。',
        keyTriggers: ['美国月度 CPI/PCE 数据公布', '非农就业与时薪增速', '中东地缘冲突溢价波动'],
        actionTactics: '若回踩 $2,880-$2,900 整数关口可轻仓布局多单，突破 $2,930 顺势加仓，止损置于 $2,860 下方。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2,900 - $3,100',
        coreLogic: '美联储持续推进降息周期，欧美央行跟随宽松。全球实际利率 (TIPS) 持续回落，大幅削减持有非生息资产的机会成本。',
        keyTriggers: ['美联储议息会议点阵图指引', '全球黄金 ETF 净流入加速', '美国财政赤字与发债规模扩张'],
        actionTactics: '以月度定投或波段逢低吸纳为主，在季度性回调 3%-5% 时加大配置权重，目标看高至 $3,050-$3,100。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3,200 - $3,800',
        coreLogic: '逆全球化与去美元化大浪潮。金砖国家与全球央行外汇储备多元化，纸币信用不可逆稀释，黄金开启超级大周期。',
        keyTriggers: ['金砖国家新支付体系与黄金挂钩', '美国债务利息占财政收入超 30%', '全球主权信贷危机'],
        actionTactics: '底仓配置 10%-15% 实物金或无杠杆现货，忽略短期噪音长线持有。'
      }
    },
    driverComponents: [
      { name: '全球央行月度购金潮', weight: 35, value: '连续超千吨/年', impact: 'Positive', description: '中东与新兴市场央行持续将外汇储备置换为黄金现货。', plainMeaning: '国家央行每天在大口吃进，现货底座极度坚实。' },
      { name: '实际利率持续回落', weight: 30, value: '1.82% 下行中', impact: 'Positive', description: '存银行抗通胀吸引力下降，资金外溢至黄金。', plainMeaning: '银行利息越来越少，买黄金保值更踏实。' },
      { name: '主权债务不可持续', weight: 20, value: '美债破 36 万亿', impact: 'Positive', description: '纸币滥发推动硬资产重定价。', plainMeaning: '钞票越印越多，黄金越显稀缺。' },
      { name: '地缘局势避险需求', weight: 15, value: '常态化风险溢价', impact: 'Positive', description: '资金寻求最高安全等级资产。', plainMeaning: '防备黑天鹅的最佳保险单。' }
    ],
    keyCatalysts: ['美联储降息声明', '世界黄金协会季度买入报告', '地缘局势突发升级'],
    institutionalPositioning: { cotNetLongContracts: 268400, etfFlow7dUSD: '+$420M', retailSentiment: '72% 坚定看多' }
  },
  {
    symbol: 'XAGUSD',
    assetName: '现货白银 (Spot Silver)',
    plainTitle: '贵金属弹性放大器与光伏工业核心金属 (白银)',
    category: '贵金属',
    subCategory: '工业光伏刚需与贵金属高弹性',
    currentPrice: 32.85,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 84,
    coreDriverThesis: '黄金比价修复 ＋ 全球光伏新能源产业结构性缺银 ＋ 供给端矿产受限。',
    plainLanguageThesis: '白银兼具“货币避险”与“工业消耗”双重属性。太阳能光伏板对白银的消耗爆发式增长，而地表白银库存连续四年供不应求。金银比一旦从 88 高位回归，白银弹性远超黄金。',
    plainActionSummary: '【操作指南】：波动率是黄金 2 倍，回踩均线分批低吸，切忌重仓追高。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$31.80 - $33.60',
        coreLogic: '短期在 $32-$33 区间展开多空拉锯，受 COMEX 显性库存与美元指数牵制。',
        keyTriggers: ['COMEX 白银库存变动', '美元指数强弱', '太阳能组件厂商月度采购'],
        actionTactics: '箱体震荡操作，$32 附近做多，$33.50 附近分批落袋。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$34.00 - $38.00',
        coreLogic: '全球工业用银连续四年出现硬赤字，伦敦金银市场协会 LBMA 库存创多年新低。',
        keyTriggers: ['世界白银协会年度赤字报告', '光伏 N 型 TOPCon 电池排产翻倍', '金银比率由 88 回落至 75'],
        actionTactics: '波段持有，以金银比回落为核心买入信号，目标看至 $36 以上。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$40.00 - $50.00',
        coreLogic: '白银开采 70% 作为铅锌铜伴生矿，独立新矿开发极难，长期面临历史性重估。',
        keyTriggers: ['地上存量实物白银耗尽', 'AI 电网与新能源车双重消耗'],
        actionTactics: '长线配置低费率白银 ETF 或实物银币。'
      }
    },
    driverComponents: [
      { name: '光伏电池用银爆发', weight: 40, value: '年消耗超 1.8 亿盎司', impact: 'Positive', description: '新技术单瓦银浆用量提升。', plainMeaning: '造光伏板必须耗真银，替代极难。' },
      { name: '金银比率均值回归', weight: 30, value: '比率 ~88 处于高位', impact: 'Positive', description: '相对黄金明显偏便宜。', plainMeaning: '补涨空间巨大。' },
      { name: '矿端供应刚性受限', weight: 30, value: '原生矿品位下滑', impact: 'Positive', description: '伴生矿产量无法快速释放。', plainMeaning: '想多挖也挖不出来。' }
    ],
    keyCatalysts: ['金银比跌破 80 触发量化涌入', '光伏旺季补库采购'],
    institutionalPositioning: { cotNetLongContracts: 58200, etfFlow7dUSD: '+$145M', retailSentiment: '68% 乐观' }
  },
  {
    symbol: 'XPTUSD',
    assetName: '现货铂金 (Spot Platinum)',
    plainTitle: '氢能质子膜电解槽与汽车尾气净化贵金属 (铂金)',
    category: '贵金属',
    subCategory: '清洁氢能工业与汽车催化剂',
    currentPrice: 985.20,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 75,
    coreDriverThesis: '南非矿区电力断供减产 ＋ 混动车销售旺盛带动催化剂用量 ＋ 氢能质子膜长期重估。',
    plainLanguageThesis: '铂金比黄金还要稀有 30 倍，但现价只有黄金的三分之一。随着混动车销量超越纯电车，汽车尾气净化用铂金需求大增，且 72% 产出集中在电力频频瘫痪的南非。',
    plainActionSummary: '【操作指南】：千元关口附近耐心中长线逢低吸纳，赔率极高。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$950 - $1,020',
        coreLogic: '在 $980-$1,000 关键心理关口反复磨底，受欧洲汽车产销节奏影响显著。',
        keyTriggers: ['欧洲汽车协会月度销量', '南非兰特汇率与矿工谈判'],
        actionTactics: '跌破 $960 企稳做多，逼近 $1,020 分批止盈。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$1,020 - $1,150',
        coreLogic: '汽车催化剂中铂金替代昂贵钯金，南非深井矿山因电力短缺减产，供应缺口扩大。',
        keyTriggers: ['南非国家电力公司负荷削减', '混动车市场份额突破 25%'],
        actionTactics: '逢低分批建仓，目标上看 $1,100。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$1,200 - $1,400',
        coreLogic: '氢燃料电池车与绿氢 PEM 电解槽核心催化剂，战略清洁能源重估。',
        keyTriggers: ['中欧美大型绿氢项目落地', '铂金对黄金历史折扣修复'],
        actionTactics: '作为左侧逆向价值投资品种耐心中长线持有。'
      }
    },
    driverComponents: [
      { name: '南非矿区供应脆弱', weight: 45, value: '南非占全球产出 72%', impact: 'Positive', description: '停电罢工频发。', plainMeaning: '产地极度集中，一停电价格就跳涨。' },
      { name: '混动车用量增加', weight: 35, value: 'PHEV 单车用铂增多', impact: 'Positive', description: '混动车排气净化刚需。', plainMeaning: '混动大卖带动车厂采购。' },
      { name: '氢能远期空间', weight: 20, value: 'PEM 电解槽关键金属', impact: 'Positive', description: '未来十年的催化剂。', plainMeaning: '绿色氢能不可或缺的技术卡位。' }
    ],
    keyCatalysts: ['南非矿业产量季报', '丰田混动新车发布'],
    institutionalPositioning: { cotNetLongContracts: 24500, etfFlow7dUSD: '+$28M', retailSentiment: '55% 中性' }
  },
  {
    symbol: 'XPDUSD',
    assetName: '现货钯金 (Spot Palladium)',
    plainTitle: '燃油汽油车尾气净化催化剂与极度稀缺稀贵金属 (钯金)',
    category: '贵金属',
    subCategory: '传统燃油催化与极度稀缺贵金属',
    currentPrice: 1045.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 65,
    coreDriverThesis: '俄罗斯诺里尔斯克镍业出口限制博弈 ＋ 传统燃油车存量需求 ＋ 纯电渗透率压制。',
    plainLanguageThesis: '钯金过去曾暴涨至 $3,000 比黄金还贵一倍，主因是汽油车必须用它做尾气净化催化剂，且俄罗斯占全球产量 40%。由于车厂改用较便宜的铂金替代，钯金经历暴跌洗礼，目前在 $1,000 成本线附近寻求大底支撑。',
    plainActionSummary: '【操作指南】：$980-$1,020 强成本支撑线轻仓博反弹，不长线死扛。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$980 - $1,100',
        coreLogic: '在千元大关上下窄幅拉锯，空头止盈平仓与车厂按需补库形成弱平衡。',
        keyTriggers: ['俄罗斯诺镍出口物流制裁动向', '欧美传统燃油车排产'],
        actionTactics: '靠近 $1,000 做多，$1,080-$1,100 止盈，严格止损 $960。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$950 - $1,200',
        coreLogic: '全球燃油车销量平稳抵消部分纯电替代效应，俄罗斯供应扰动时容易引发现货挤仓。',
        keyTriggers: ['欧美对俄罗斯贵金属制裁法案审议', '南非副产钯金减产'],
        actionTactics: '波段箱体交易为主，不追单边涨势。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$800 - $1,150',
        coreLogic: '汽车电气化大趋势不可逆转，传统纯燃油车终将逐步萎缩，工业催化长期需求逐步衰减。',
        keyTriggers: ['全球禁售纯燃油车法规推进', '回收钯金供应增加'],
        actionTactics: '仅适合战术反弹交易，不适合作为财富储备标的。'
      }
    },
    driverComponents: [
      { name: '俄罗斯主产国出口限制', weight: 45, value: '俄罗斯供应占全球 40%', impact: 'Positive', description: '地缘政治突发溢价。', plainMeaning: '俄罗斯一旦限产限运，现货立竿见影。' },
      { name: '铂金替代与电动车替代', weight: 40, value: '纯电车完全不需要钯金', impact: 'Negative', description: '长期需求天花板压顶。', plainMeaning: '电车不用排气管，钯金长线需求减少。' },
      { name: '矿山现金开采成本支撑', weight: 15, value: '$950 综合成本线', impact: 'Positive', description: '跌穿成本矿山将主动停采。', plainMeaning: '跌到950以下矿山亏钱，会主动减少供应。' }
    ],
    keyCatalysts: ['俄罗斯诺镍集团销售策略公布', '欧美传统汽车库存变动'],
    institutionalPositioning: { cotNetLongContracts: -8500, etfFlow7dUSD: '-$12M', retailSentiment: '45% 偏空' }
  }
];
