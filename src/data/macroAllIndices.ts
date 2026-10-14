import { AssetDriverProfile } from '../types/macro';

export const ALL_INDICES_DATA: AssetDriverProfile[] = [
  {
    symbol: 'NAS100',
    assetName: '纳斯达克 100 指数 (US Tech 100)',
    plainTitle: '全球顶级科技革命与 AI 垄断巨头核心资产 (纳指)',
    category: '指数',
    subCategory: '全球AI革命与科技巨头垄断利润',
    currentPrice: 20850,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 86,
    coreDriverThesis: '科技巨头惊人的现金造血能力 ＋ AI 算力与应用端资本开支持续扩张 ＋ 贴现率下行提振估值。',
    plainLanguageThesis: '纳斯达克 100 汇聚了全世界最能赚钱的 100 家科技巨头（英伟达、微软、苹果、谷歌等）。这些巨头账上全是真金白银现金，不受高利息影响；而现在美债利息在回落，利息越低，科技公司未来的利润折算到今天就越值钱，大牛市趋势极强。',
    plainActionSummary: '【操作指南】：坚信科技创新生产力，回踩 20 日均线分批加仓，顺势做多。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '20,400 - 21,300',
        coreLogic: '主要科技巨头财报展现超预期盈利造血能力，日线沿上升通道稳步推进，逢小级别调整均被机构大口低吸。',
        keyTriggers: ['龙头财报盈利指引', '半导体交货周期与订单能见度', '美债长端利率走势'],
        actionTactics: '回踩 20,500-20,600 顺势做多，突破 21,000 追多，止损设在 20,200 下方。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '20,800 - 23,000',
        coreLogic: '美联储步入降息周期大幅释放估值贴现空间，AI 商业化变现从基础设施延伸至企业级软件与自动化消费端，净利润增速领先标普500。',
        keyTriggers: ['美联储议息会议确认降息步伐', '大型科技公司自由现金流再创新高', 'AI 商业化回报率 (ROI) 验证'],
        actionTactics: '中长线以定投或持有为主，逢大盘回调 5% 以上坚决加大买入力度。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '23,000 - 28,000',
        coreLogic: '人类第四次工业革命（人工智能与算力）的核心载体，全球顶尖企业垄断全球利润分红，长期复合年化回报卓越。',
        keyTriggers: ['AGI 通用人工智能落地', '全球全行业生产力跨越式提升'],
        actionTactics: '任何家庭资产配置里最不可或缺的进攻型核心资产，长期无视短期颠簸。'
      }
    },
    driverComponents: [
      { name: '科技巨头超强自由现金流', weight: 45, value: '七巨头现金流超 4000 亿美元', impact: 'Positive', description: '真金白银造血与疯狂回购。', plainMeaning: '这些公司不仅垄断世界，手里还握着花不完的现金。' },
      { name: '美债利率回落估值释放', weight: 35, value: '10Y 国债收益率 4.12%', impact: 'Positive', description: '贴现率下调直接推升公允身价。', plainMeaning: '借钱便宜了，未来的科技利润现在更值钱。' },
      { name: 'AI 投资回报率短期质疑', weight: 20, value: '资本开支巨大需业绩兑现', impact: 'Neutral', description: '需警惕阶段性杀估值洗盘。', plainMeaning: '花了那么多钱买显卡，需要不断拿出业绩证明。' }
    ],
    keyCatalysts: ['英伟达/微软季度财报', '美联储降息声明'],
    institutionalPositioning: { cotNetLongContracts: 142000, etfFlow7dUSD: '+$2.4B', retailSentiment: '74% 积极乐观' }
  },
  {
    symbol: 'SPX500',
    assetName: '标普 500 指数 (S&P 500)',
    plainTitle: '全球最强大经济体五百家顶级旗舰企业资产底座 (标普)',
    category: '指数',
    subCategory: '全球股票资产配置核心基准',
    currentPrice: 5980.5,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 85,
    coreDriverThesis: '美国企业每股收益 (EPS) 创历史新高 ＋ 企业大额回购股票 ＋ 全球被动指数基金定投水流。',
    plainLanguageThesis: '标普 500 是全世界最著名的“巴菲特滚雪球工具”！汇聚了美国最好的 500 家大企业。全美几千万上班族的 401(k) 退休养老金每个月雷打不动扣款买入标普，提供了全世界最坚硬的逢跌买盘；加上降息周期让工业、银行和消费全面复苏，大盘趋势极度稳健。',
    plainActionSummary: '【操作指南】：全球长跑冠军资产，逢回调 3% 无脑定投加仓，长期持有。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '5,880 - 6,080 点',
        coreLogic: '财报季整体超预期比例超 75%，企业在静默期结束后重新启动数千亿美元股票回购，逢低承接盘极强。',
        keyTriggers: ['标普成分股每季度利润总额', '美国 ISM 制造业与服务业景气指数'],
        actionTactics: '回踩 5,900 点多头介入，突破 6,000 点持有，止损 5,820。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '6,000 - 6,400 点',
        coreLogic: '盈利增长动力由科技单轮驱动扩散至金融、工业、医疗全行业百花齐放，软着陆变为再加速繁荣。',
        keyTriggers: ['美联储实现经济无衰退软着陆', '华尔街自上而下大幅上调全年 EPS 预测'],
        actionTactics: '以月度定投为主，中长线享受复利抬升。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '6,500 - 7,500 点',
        coreLogic: '美国资本市场优胜劣汰自我净化机制（弱者剔除、强者晋级），长期年化复合收益率 9%-10% 的财富基石。',
        keyTriggers: ['全球资本持续流入美股优质股权'],
        actionTactics: '任何全球资产配置组合里最核心的压舱石，占据 30%-40% 仓位。'
      }
    },
    driverComponents: [
      { name: '全球养老金被动买盘流水线', weight: 45, value: '每月数百亿美元定期进场', impact: 'Positive', description: '源源不断的被动买盘。', plainMeaning: '全世界退休金每月自动扣款买它，跌下来就有人接。' },
      { name: '美国企业回购注销股票', weight: 35, value: '年回购总额突破 1 万亿美元', impact: 'Positive', description: '真金白银减少流通股推高股价。', plainMeaning: '大公司把自己股票买回注销，每股分到的利润更多。' },
      { name: '席勒市盈率 (CAPE) 估值偏高', weight: 20, value: 'CAPE 约 35 处于历史偏贵区间', impact: 'Neutral', description: '偶有中度估值回调消化。', plainMeaning: '虽然贵，但只要利润一直涨就能消化估值。' }
    ],
    keyCatalysts: ['标普 500 季度整体盈利增幅', '美联储利率点阵图确认软着陆'],
    institutionalPositioning: { cotNetLongContracts: 185000, etfFlow7dUSD: '+$3.8B', retailSentiment: '72% 坚定看多' }
  },
  {
    symbol: 'US2000',
    assetName: '罗素 2000 小盘股指数 (Russell 2000)',
    plainTitle: '美国降息最大受益者与实体中小企业复苏弹性总龙头 (罗素)',
    category: '指数',
    subCategory: '美股中小盘周期与降息超高弹性',
    currentPrice: 2340.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
    coreDriverThesis: '中小企业浮动利率债务极高在降息时利息支出减半 ＋ 地区性银行与并购重组爆发 ＋ 补涨轮动。',
    plainLanguageThesis: '大科技巨头手里握着大把现金，而罗素 2000 里的 2000 家中小企业过去被 5.5% 的高利息压得喘不过气来（近一半债务是浮动利息）。现在只要美联储一降息，中小企业的还债利息瞬间减半，利润直接翻倍，弹性远超大盘股！',
    plainActionSummary: '【操作指南】：降息周期里最具爆发力品种，回踩 2,250 点做多，目标看至 2,600 点。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '2,280 - 2,420 点',
        coreLogic: '短期受通胀降温和中小盘风格轮动推动，资金由巨头科技向低估值小盘股大迁徙。',
        keyTriggers: ['美国小企业信心指数 (NFIB)', '地区性银行财报净息差'],
        actionTactics: '回踩 2,300 点果断做多，止损设在 2,230，目标看 2,400。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '2,380 - 2,700 点',
        coreLogic: '美联储连续降息 100-150 个基点后，中小企业再融资压力全面缓解，兼并收购 (M&A) 潮引爆小盘股股价腾飞。',
        keyTriggers: ['中小企业借贷利率下行超 1%', '私募股权与企业并购数量翻倍'],
        actionTactics: '波段重配，博弈大盘股向中小盘股的风格大切换。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '2,500 - 3,200 点',
        coreLogic: '美国本土再工业化与供应链回流，本土实体小企业迎来长周期景气重塑。',
        keyTriggers: ['美国国内实体投资与厂房建设投产'],
        actionTactics: '作为牛市主升浪中捕捉超额弹性利润的进攻型利器。'
      }
    },
    driverComponents: [
      { name: '浮动债务利息支出断崖式减少', weight: 50, value: '近 45% 债务为浮动利率', impact: 'Positive', description: '降息直接转化成净利润。', plainMeaning: '利息一降，以前拿去还银行的利息直接变成自己利润。' },
      { name: '估值相对大盘股处于历史低位', weight: 30, value: '相对标普比价处 20 年低谷', impact: 'Positive', description: '补涨空间巨大。', plainMeaning: '小盘股便宜得像白菜，补涨空间极大。' },
      { name: '部分僵尸企业盈利较差', weight: 20, value: '约 30% 成分股未盈利', impact: 'Negative', description: '必须依赖指数整体贝塔对冲。', plainMeaning: '部分小公司经营一般，不能瞎买单个，要买整体指数。' }
    ],
    keyCatalysts: ['美联储降息声明落地', '美国零售与小企业月度指数向好'],
    institutionalPositioning: { cotNetLongContracts: 32000, etfFlow7dUSD: '+$680M', retailSentiment: '75% 极度看涨小盘股' }
  },
  {
    symbol: 'KLCI',
    assetName: '富时大马吉隆坡综合指数 (FTSE Bursa KLCI)',
    plainTitle: '东南亚经济特区政策红利与外资建厂共振 (马股大盘)',
    category: '指数',
    subCategory: '柔新特区红利与高息蓝筹',
    currentPrice: 1612.5,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 78,
    coreDriverThesis: '柔佛-新加坡经济特区 (JS-SEZ) 落地 ＋ 全球科技巨头齐聚大马建 AI 数据中心 ＋ 政治政局稳定与外资净买入。',
    plainLanguageThesis: '大马股市正在经历十年一遇的“黄金发展期”！一方面柔佛特区打通新加坡资金通道，微软、英伟达、亚马逊砸下几百亿在柔佛雪兰莪建 AI 数据中心；另一方面大马银行、公用事业派息率高达 5%-6%，极受外资青睐。',
    plainActionSummary: '【操作指南】：逢大盘回踩 1,600 点支撑分批布局，重点关注高股息蓝筹与特区基建龙头。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '1,595 - 1,635 点',
        coreLogic: '1,600 点整数关口有国家主权基金 (EPF/KWAP) 坚实支撑，外资月度持续录得净买入。',
        keyTriggers: ['外国直接投资签约落地', '国家银行利率决议'],
        actionTactics: '在 1,600 点附近分批吸纳 Maybank、TNB 等核心资产，止损 1,580。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '1,620 - 1,720 点',
        coreLogic: '推进大型基础设施建设，大马成为全球跨国科技大厂供应链首选避风港。',
        keyTriggers: ['柔新经济特区协议签署', '柔佛数据中心并网发电'],
        actionTactics: '中线持有，目标看高至 1,680-1,720 点。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '1,750 - 1,900 点',
        coreLogic: '大马由传统资源国向半导体封装测试和区域绿色算力中心升级，国民财富与企业盈利双重驱动。',
        keyTriggers: ['东南亚半导体枢纽确立', '令吉汇率稳步升值'],
        actionTactics: '本土资产配置的核心基石，享受高股息复利与资本利得双重回报。'
      }
    },
    driverComponents: [
      { name: '全球科技巨头直接投资 (FDI)', weight: 40, value: '超 160 亿美元落地', impact: 'Positive', description: '数据中心与电力设施大单爆发。', plainMeaning: '英伟达谷歌带大笔美元来大马投资。' },
      { name: '政局稳定与改革执行力', weight: 35, value: '政策延续性高', impact: 'Positive', description: '外资评级机构上调主权展望。', plainMeaning: '政策不朝令夕改，外资最看重的稳定环境。' },
      { name: '全球贸易周期波动', weight: 25, value: '外贸需求波动', impact: 'Neutral', description: '需留意全球经济周期对出口的影响。', plainMeaning: '需留意全球经济周期对出口的影响。' }
    ],
    keyCatalysts: ['柔新特区协议签署', '国家半导体战略资金到位'],
    institutionalPositioning: { cotNetLongContracts: 38000, etfFlow7dUSD: '+$82M', retailSentiment: '70% 信心恢复' }
  },
  {
    symbol: 'CHINA50',
    assetName: '富时中国 A50 指数 (FTSE China A50)',
    plainTitle: '世界第二大经济体五十大核心龙头与政策逆转看多总开关 (A50)',
    category: '指数',
    subCategory: '中国核心资产与宏观政策逆转红利',
    currentPrice: 13450.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '中国央行创设互换便利 (SFISF) 与回购再贷款定向放水进股市 ＋ 财政超常规支持化债 ＋ 外资极低配置回补。',
    plainLanguageThesis: '中国股市迎来历史性制度拐点！央行破天荒开通了“印钞机直通股市”的工具（允许证券公司拿股票去央行换钱继续买股票，首期几千亿上不封顶）；全球外资对中国资产的配置权重处于历史冰点，只要宏观政策态度一坚决，外资回补带来的上涨极其凶悍！',
    plainActionSummary: '【操作指南】：12,800-13,000 点坚决做多，博弈中国超级资产重估与外资回流大潮。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '13,100 - 14,200 点',
        coreLogic: '政策组合拳持续细化落地，两融资金与公募资金仓位回升，在 13,200 点构建坚固支撑。',
        keyTriggers: ['中央政治局会议与经济工作会议定调', '央行互换便利第二期额度启用'],
        actionTactics: '回踩 13,200 顺势做多，突破 13,800 加仓，止损设在 12,700。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '13,500 - 15,800 点',
        coreLogic: '地方政府隐性债务化解释放地方投资活力，实体经济 CPI 与 PPI 触底回升，高息红利央国企与消费龙头业绩修复。',
        keyTriggers: ['全国人大常委会财政增发额度公布', '社会融资规模与 M1 增速触底回暖'],
        actionTactics: '中线坚定持有多头，享受宏观政策底到业绩底的双击。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '15,000 - 18,500 点',
        coreLogic: '中国高端制造（电动车、光伏、电池、造船、半导体）全球竞争力确立，A50 作为最能赚钱的核心资产长期重估。',
        keyTriggers: ['中国企业全球出海跨国利润占比翻倍', '养老金入市长期资金沉淀'],
        actionTactics: '全球资产配置中不可或缺的超低估值、极高安全边际的看涨期权。'
      }
    },
    driverComponents: [
      { name: '央行定向股票流动性工具', weight: 45, value: '互换便利 ＋ 股票回购再贷款', impact: 'Positive', description: '央行给股市注入真金白银活水。', plainMeaning: '国家银行给大公司借钱买自家股票，托底态度坚决。' },
      { name: '外资极低配置回补动能', weight: 35, value: '外资配置比例处于历史 1% 分位', impact: 'Positive', description: '稍微加仓就能推升巨大涨幅。', plainMeaning: '老外手里几乎空仓，随便买一点就能把指数买上天。' },
      { name: '国内有效需求修复节奏', weight: 20, value: '居民储蓄待释放', impact: 'Neutral', description: '需要看到楼市止跌与消费持续。', plainMeaning: '需要老百姓有钱敢花钱，经济活力真正转起来。' }
    ],
    keyCatalysts: ['重要宏观政策会议公报', '外资通过互联互通单日大举净流入'],
    institutionalPositioning: { cotNetLongContracts: 45000, etfFlow7dUSD: '+$1.2B', retailSentiment: '78% 情绪彻底反转' }
  },
  {
    symbol: 'DXY',
    assetName: '美元指数 (US Dollar Index)',
    plainTitle: '全球法定纸币霸权与流动性松紧总阀门 (美元指数)',
    category: '指数',
    subCategory: '全球宏观引力常数与美元信用基准',
    currentPrice: 101.45,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 80,
    coreDriverThesis: '美联储步入全面降息周期 ＋ 美国双赤字膨胀 ＋ 全球去美元化外汇储备多元化。',
    plainLanguageThesis: '美元指数相当于全世界所有资产的“地心引力”。美元走强，全球资产都被按在地上；美元走弱，资金就会从美元流出来，黄金、股票、大宗商品、加密货币就会欢呼大涨。现在美联储正在降息，美元引力正在减弱，对所有投资品都是重大利好！',
    plainActionSummary: '【操作指南】：美元大趋势看跌，每次反弹受阻都是做空美元、做多风险资产的机会。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '100.80 - 102.50',
        coreLogic: '短期受非农数据与核心通胀韧性博弈影响，在 101-102 区间进行多空争夺。',
        keyTriggers: ['美联储官员表态', '美国零售销售数据'],
        actionTactics: '反弹至 102.20 上方逢高做空，跌破 101.00 加速下探。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '98.50 - 102.00',
        coreLogic: '随着美联储连续降息，美国无风险利差优势消退，全球套利资金流出美元体系，中枢下移至 100 整数关口下方。',
        keyTriggers: ['美联储降息进入中性利率阶段', '欧洲经济触底收窄欧美增速差'],
        actionTactics: '中线做空美元指数，或在非美资产中顺势做多。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '92.00 - 98.00',
        coreLogic: '美国财政债务超过 36 万亿美元并以每年近 2 万亿速度扩张，美元占全球央行外汇储备比例由 70% 降至 58% 并继续下滑，美元长期信用面临侵蚀。',
        keyTriggers: ['去美元化本币结算占比突破 30%', '海外央行净抛售美债'],
        actionTactics: '坚定将纸币资产转换为黄金、优质股权等真实抗通胀硬资产。'
      }
    },
    driverComponents: [
      { name: '美联储利率步入降息通道', weight: 45, value: '降息预期明确', impact: 'Negative', description: '美元利息优势不再。', plainMeaning: '存美元没有高息了，钱开始往外流。' },
      { name: '美国财政与贸易双赤字', weight: 35, value: '赤字占 GDP 逼近 7%', impact: 'Negative', description: '信用扩张过度稀释法币价值。', plainMeaning: '借的债太多，纸币不可避免越来越毛。' },
      { name: '避险情绪在极端危机时的脉冲', weight: 20, value: '全球美元结算惯性', impact: 'Positive', description: '极端危机时仍有短暂流动性挤兑。', plainMeaning: '遇到特大危机时大家依然短时间抢美元防身。' }
    ],
    keyCatalysts: ['美联储点阵图指引', '美国非农就业报告'],
    institutionalPositioning: { cotNetLongContracts: -15000, etfFlow7dUSD: '-$180M', retailSentiment: '48% 迷茫' }
  },
  {
    symbol: 'US10Y',
    assetName: '美债10年期基准收益率 (US 10-Year Treasury Yield)',
    plainTitle: '全球一切金融资产的无风险定价基石 (美债十年期利息)',
    category: '指数',
    subCategory: '宏观贴现率与全球借贷利率之母',
    currentPrice: 4.12,
    directionBias: 'BEARISH (看跌利率 / 收益率下行)',
    biasConfidence: 84,
    coreDriverThesis: '通胀从 9% 大关稳定回落至 2.5% 区间 ＋ 美联储降息预期牵引 ＋ 期限溢价中枢下移。',
    plainLanguageThesis: '美债 10 年期收益率是全世界所有投资品的“折现率之母”！买房贷款、企业发债、股票估值，全都是基于它加利息的。当美债利息从 5% 降到 4% 时，所有借钱的人成本下降，未来钱变值钱，科技股和房产就会大涨。',
    plainActionSummary: '【操作指南】：4.30%-4.40% 坚决做空收益率（做多美国长债 TLT），锁定高胜率降息红利。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '4.05% - 4.25%',
        coreLogic: '短期受月度通胀数据与财政部国债拍卖需求强弱影响，在 4.10%-4.15% 窄幅震荡。',
        keyTriggers: ['美国月度 CPI/PPI 数据', '财政部 10 年期国债拍卖投标倍数'],
        actionTactics: '利率反弹至 4.25% 做空收益率，目标看 4.05%，防守 4.35%。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '3.60% - 4.10%',
        coreLogic: '美联储持续将联邦基金基准利率降至 3.5% 中性水平，带动长端国债利率中枢稳步下移。',
        keyTriggers: ['失业率上升破 4.3%', '联储点阵图确认长期中性利率回落'],
        actionTactics: '中线持有多头国债资产，享受资本利得与票息双重收益。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '震荡 (Range/Neutral)',
        targetRange: '3.50% - 4.50%',
        coreLogic: '结构性高赤字和再通胀风险使得利率很难回到零利率时代，长期稳定在 3.5%-4.0% 新常态。',
        keyTriggers: ['美国长期财政发债供应洪峰', '全球央行美债持仓结构重塑'],
        actionTactics: '在利率降至 3.5% 附近时获利减持长债，转入硬资产。'
      }
    },
    driverComponents: [
      { name: '美联储基准利率降息路径', weight: 45, value: '降息预期推动长端向下', impact: 'Negative', description: '直接拉低全曲线收益率。', plainMeaning: '央行降息，国债利息跟着下调。' },
      { name: '美国财政部天量发债供给', weight: 35, value: '每年数万亿新发美债', impact: 'Positive', description: '债券太多卖不掉会抬升利息。', plainMeaning: '政府借钱太多发太多债，利息降得没那么快。' },
      { name: '全球机构与主权买盘需求', weight: 20, value: '全球养老金资产负债匹配刚需', impact: 'Negative', description: '逢高锁息买盘极其庞大。', plainMeaning: '4% 以上很多人抢着买来吃利息，压低利率。' }
    ],
    keyCatalysts: ['美联储议息决议', '美国劳工部失业率数据'],
    institutionalPositioning: { cotNetLongContracts: 54000, etfFlow7dUSD: '+$420M', retailSentiment: '68% 偏向看跌利率' }
  },
  {
    symbol: 'GER40',
    assetName: '德国 DAX 40 指数 (Germany 40)',
    plainTitle: '欧洲工业母机与跨国制造旗舰超级航母 (德国DAX)',
    category: '指数',
    subCategory: '欧洲工业母机与跨国制造旗舰',
    currentPrice: 19450.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '欧洲央行加速降息刺激信贷 ＋ 德国跨国巨头 80% 营收来自海外避开本土疲软 ＋ 军工防务与高端工业重估。',
    plainLanguageThesis: '很多人以为德国经济不好 DAX 就会跌，其实大错特错！德国 DAX 40 里的跨国巨头（SAP、西门子、安联、莱茵金属）超过 80% 的利润来自全球（美国、中国、亚太），本土经济放缓反而逼迫欧央行大幅降息，借钱成本骤降，直接推升股市创下历史新高！',
    plainActionSummary: '【操作指南】：回踩 19,000 点均线做多，中长线看多欧洲最高质量工业股权。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '19,100 - 19,800 点',
        coreLogic: '欧央行连续降息提振估值，科技龙头 SAP 与工业龙头财报超预期支撑指数沿五日线上攻。',
        keyTriggers: ['欧洲央行政策决议', '德国 IFO 商业景气指数'],
        actionTactics: '回踩 19,250 企稳做多，止损 18,950。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '19,500 - 21,500 点',
        coreLogic: '实际利率加速走低，全球国防防务开支激增与工业自动化转型激活戴维斯双击。',
        keyTriggers: ['北约成员国防务预算占 GDP 提至 2.5%+', '欧洲能源中枢持续下移'],
        actionTactics: '波段持有，逢回调加仓。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '21,000 - 25,000 点',
        coreLogic: '欧洲最具竞争力的硬科技与精工制造龙头长期全球市场份额扩张。',
        keyTriggers: ['全球工业自动化与电气化全面普及'],
        actionTactics: '长线作为全球多元配置的核心底座。'
      }
    },
    driverComponents: [
      { name: '跨国巨头全球化营收韧性', weight: 45, value: '80% 利润来自德国本土以外', impact: 'Positive', description: '不受德国本土宏观拖累。', plainMeaning: '这些公司全球赚钱，全世界生意好就行。' },
      { name: '欧央行降息流动性释放', weight: 35, value: '宽松周期加速推进', impact: 'Positive', description: '压低无风险折现率。', plainMeaning: '欧洲央行大幅降息，股市估值自然抬高。' },
      { name: '欧洲传统汽车转型阵痛', weight: 20, value: '大众奔驰面临新能源竞争', impact: 'Neutral', description: '传统车企拖累部分权重。', plainMeaning: '德国传统油车受冲击，但被软件和工业龙头对冲。' }
    ],
    keyCatalysts: ['欧央行政策利率决议', 'SAP 与西门子季度财报'],
    institutionalPositioning: { cotNetLongContracts: 35000, etfFlow7dUSD: '+$340M', retailSentiment: '72% 积极乐观' }
  },
  {
    symbol: 'NIKKEI225',
    assetName: '日经 225 指数 (Nikkei 225)',
    plainTitle: '日本走出三十年通缩陷阱与东京证交所公司治理改革 (日经)',
    category: '指数',
    subCategory: '走出失落三十年与巴菲特重仓之选',
    currentPrice: 38850.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 84,
    coreDriverThesis: '走出 30 年通缩迎来自主温和通胀 ＋ 东京证券交易所强制提高市净率 (PBR>1) 回购注销 ＋ 巴菲特等全球外资重仓。',
    plainLanguageThesis: '日经 225 正在经历世纪级别的大重估！过去 30 年日本企业不敢涨价不敢投资，现在工资物价螺旋上涨走出通缩；东京证交所规定市净率低于 1 的破净公司必须拿出真金白银分红回购，巴菲特连续数年发债疯狂买入日本五大商社，全球资金蜂拥而至！',
    plainActionSummary: '【操作指南】：回踩 37,500-38,000 区域长线建仓，目标突破 42,000 点。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '37,800 - 39,800 点',
        coreLogic: '短期受日元汇率升值引发的出口企业获利盘回吐拉扯，围绕 38,500 蓄势筑底。',
        keyTriggers: ['日元对美元 USDJPY 汇率波动', '日本央行货币政策表态'],
        actionTactics: '回踩 38,000 顺势接多，跌破 37,200 止损。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '39,000 - 43,500 点',
        coreLogic: '春斗薪资连续大幅提升激活居民消费内需，企业账面现金大量转化为回购分红。',
        keyTriggers: ['春斗劳资薪资涨幅再破 5%', '外资月度净买入日股规模创新高'],
        actionTactics: '波段持有，顺应日本国家级牛市大趋势。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '43,000 - 55,000 点',
        coreLogic: '半导体材料制造设备核心优势确立，日本家庭储蓄通过新 NISA 计划大举入市。',
        keyTriggers: ['新 NISA 免税投资账户资金入市规模翻番'],
        actionTactics: '作为亚洲顶级核心资产长期重配。'
      }
    },
    driverComponents: [
      { name: '东京证交所东证改革红利', weight: 45, value: '企业回购金额创历史新高', impact: 'Positive', description: '逼迫企业吐出现金回报股东。', plainMeaning: '官方逼着上市公司分红回购，股价被动抬升。' },
      { name: '日本脱离通缩名义 GDP 扩张', weight: 35, value: '物价与工资良性螺旋', impact: 'Positive', description: '企业获得商品自主提价权。', plainMeaning: '东西可以涨价了，企业利润变多了。' },
      { name: '日元快速升值对出口抑制', weight: 20, value: '日元升值压缩海外利润换算', impact: 'Negative', description: '日元过快升值会引发短暂下蹲。', plainMeaning: '日元涨太快丰田等出口企业利润折算会缩水。' }
    ],
    keyCatalysts: ['日本春斗薪资谈判结果', '日本央行货币政策声明'],
    institutionalPositioning: { cotNetLongContracts: 48000, etfFlow7dUSD: '+$520M', retailSentiment: '76% 极其看好' }
  },
  {
    symbol: 'HSI',
    assetName: '香港恒生指数 (Hang Seng Index)',
    plainTitle: '全球离岸中国超级核心资产与估值历史大修复总阵地 (恒指)',
    category: '指数',
    subCategory: '离岸中国核心资产与估值大修复',
    currentPrice: 20680.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 85,
    coreDriverThesis: '中国全面宏观流动性托底 ＋ 南向资金 (港股通) 万亿真金白银持续扫货 ＋ 极低市盈率与超高股息率双击。',
    plainLanguageThesis: '港股恒生指数汇聚了腾讯、阿里、美团等全中国最能造血的互联网科技霸主，以及工行、建行、中移动等 7%-8% 股息率的央企现金奶牛！过去几年外资过度恐慌抛售，导致恒指跌成了全球最便宜的资产。现在南向资金每天几十亿南下扫货，估值修复空间极大！',
    plainActionSummary: '【操作指南】：20,000 点大关支撑坚如磐石，回调即是做多良机，目标看 23,000-25,000 点。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '20,200 - 21,800 点',
        coreLogic: '在 20,000 整数心理关口换手充分，美联储降息改善香港金管局流动性，南下资金持续净流入。',
        keyTriggers: ['港股通每日净买入金额', '科技龙头单日大宗股票回购'],
        actionTactics: '回踩 20,300 顺势加仓，突破 21,200 追多，止损 19,800。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '21,500 - 24,500 点',
        coreLogic: '中国宏观财政协同政策刺激实体预期回暖，互联网平台巨头利润增速重回两位数并加大回购注销。',
        keyTriggers: ['主要互联网巨头季度业绩全线超预期', '外资对冲基金空头头寸平仓'],
        actionTactics: '中线持有多头，享受估值修复与企业盈利双重增长。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '24,000 - 30,000 点',
        coreLogic: '超级离岸人民币财富管理枢纽确立，全球资本不可或缺的中国核心科技资产总门户。',
        keyTriggers: ['人民币柜台交易全面活跃', '全球资管巨头重新调高中国仓位配置'],
        actionTactics: '极具性价比与安全边际的全球组合进攻核心。'
      }
    },
    driverComponents: [
      { name: '南向资金万亿级天量买盘', weight: 45, value: '港股通年净买入超 6000 亿港元', impact: 'Positive', description: '国内长线资金锁定港股定价权。', plainMeaning: '国内大基金每天源源不断南下买光便宜筹码。' },
      { name: '科技巨头疯狂真金白银回购', weight: 35, value: '腾讯阿里年回购超千亿港币', impact: 'Positive', description: '注销股份直接推升每股身价。', plainMeaning: '公司自己每天拿出上亿现金把股票买回烧掉。' },
      { name: '地缘政治与外资撤离惯性', weight: 20, value: '地缘博弈阶段性情绪波动', impact: 'Neutral', description: '带来低买高卖的波动赔率。', plainMeaning: '老外偶有情绪波动抛售，正好给出超低买点。' }
    ],
    keyCatalysts: ['重要宏观政策会议公报', '腾讯/阿里/美团财报与回购指引'],
    institutionalPositioning: { cotNetLongContracts: 56000, etfFlow7dUSD: '+$880M', retailSentiment: '78% 信心澎湃' }
  },
  {
    symbol: 'STI',
    assetName: '新加坡海峡时报指数 (Straits Times Index)',
    plainTitle: '全球最强防御与超高分红避风港 (新加坡海指)',
    category: '指数',
    subCategory: '亚洲AAA评级与超高分红避风港',
    currentPrice: 3740.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '星展/华侨/大华三大银行高分红 ＋ 亚洲顶级 AAA 主权信用避风港 ＋ 全球家族办公室入驻新加坡。',
    plainLanguageThesis: '新加坡海指 (STI) 是全世界最适合“躺平收息”的指数！成分股主要由新加坡三大银行（DBS、OCBC、UOB）和优质商业地产信托 (REITs) 构成，平均股息率高达 5% 以上；新加坡拥有全世界唯一的亚洲 AAA 主权评级，全球富豪把钱存进新加坡，推升海指创下多年新高！',
    plainActionSummary: '【操作指南】：稳健投资者的天堂，回踩 3,650 点安心做多收息，防守性极强。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '3,680 - 3,800 点',
        coreLogic: '三大银行净利息收入维持高位，季末派发丰厚股息，逢回调即获长线主权资金强力承接。',
        keyTriggers: ['星展银行 DBS 季度分红除息', '新加坡 MAS 宏观报告'],
        actionTactics: '回踩 3,700 逢低买入，止损 3,640。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '3,750 - 4,000 点',
        coreLogic: '降息周期促使房产信托 REITs 融资利息成本大幅走低，资本重估提振海指攻破 3,900 点大关。',
        keyTriggers: ['美联储连续降息提振 REITs 净资产值', '新加坡财富管理 AUM 再创新高'],
        actionTactics: '长线配置高股息组合。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '3,900 - 4,500 点',
        coreLogic: '亚洲家族办公室与跨国企业财资中心首选，资产安全性世界第一梯队。',
        keyTriggers: ['全球高净值财富持续聚集新加坡'],
        actionTactics: '任何保守稳健资产组合的绝佳底仓。'
      }
    },
    driverComponents: [
      { name: '三大国民银行高达 5.5% 现金股息', weight: 45, value: '稳健丰厚的现金流回报', impact: 'Positive', description: '极具长线吸引力。', plainMeaning: '银行每年真金白银给股东发 5% 以上现金利息。' },
      { name: '全球财富避险与家族办公室入驻', weight: 35, value: '数千家家办落地新加坡', impact: 'Positive', description: '带来稳定的增量资本。', plainMeaning: '全世界富豪带着真金白银来新加坡买资产。' },
      { name: '全球外贸航运周期波动', weight: 20, value: '高度外向型开放经济体', impact: 'Neutral', description: '受全球经贸周期轻度影响。', plainMeaning: '全球贸易放缓时略有扰动，但金融属性更强。' }
    ],
    keyCatalysts: ['三大银行财报及年度分红预案', '新加坡金管局金融发展报告'],
    institutionalPositioning: { cotNetLongContracts: 17000, etfFlow7dUSD: '+$75M', retailSentiment: '70% 极具信心' }
  }
];
