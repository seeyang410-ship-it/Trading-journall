import { AssetDriverProfile } from '../types/macro';

export const EXPANDED_CRYPTO_FX_INDICES_ASSETS: AssetDriverProfile[] = [
  // =========================================================================
  // 🪙 加密货币 (Crypto - 主流与高弹性公链基建)
  // =========================================================================
  {
    symbol: 'BTCUSD',
    assetName: '比特币 (Bitcoin)',
    plainTitle: '数字黄金与全球超级流动性海绵 (比特币)',
    category: '加密货币',
    subCategory: '数字黄金与全球M2流动性蓄水池',
    currentPrice: 94800,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 85,
    coreDriverThesis: '全球法币 M2 增速重回扩张 ＋ 华尔街现货 ETF 被动买光存量 ＋ 减半后每日新增供应腰斩。',
    plainLanguageThesis: '比特币是全球吸水能力最强的“超级数字海绵”！只要各国央行开始降息印钱（M2 回升），水就会流进比特币。贝莱德等正规大基金每天在市场上扫货几千枚，而长期信仰者死不卖币，造就了结构性抢货挤空行情。',
    plainActionSummary: '【操作指南】：顺应大周期牛市，逢 10% 级别的急跌洗盘都是黄金坑，拿稳现货不被震下车。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$92,000 - $105,000',
        coreLogic: '10 万美元整数关口聚集了极大的心理博弈和短线期权未平仓量。站稳 9.5 万美元后多头意图冲击 10 万大关。',
        keyTriggers: ['美国现货 ETF 单日资金净流入', '合约全网多空爆仓比率', '纳指联动'],
        actionTactics: '回踩 $91,000-$93,000 区域分批接多，突破 10 万关口后警惕剧烈洗盘。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$95,000 - $130,000',
        coreLogic: '主权基金与养老金开始制定战略配置政策，交易所可售存量跌破 6 年低谷。',
        keyTriggers: ['美国战略比特币储备法案审议进展', '全球央行 M2 同比增速攀升'],
        actionTactics: '中线持币待涨，遇宏观黑天鹅下蹲均是加仓良机。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$150,000 - $250,000',
        coreLogic: '对齐实物黄金 18 万亿美元市值的长期价值追赶，对抗法币信用贬值。',
        keyTriggers: ['比特币总市值超越全球主要法币 M0', '主权结算采纳'],
        actionTactics: '战略性冷钱包定投储存。'
      }
    },
    driverComponents: [
      { name: '全球 M2 纸币印钞扩张', weight: 40, value: 'M2 拐头向上一路走高', impact: 'Positive', description: '比特币对流动性极度敏感。', plainMeaning: '外面的纸钱越多，总量2100万枚的比特币越贵。' },
      { name: '华尔街现货 ETF 持续吸筹', weight: 35, value: '贝莱德等 ETF 资产狂飙', impact: 'Positive', description: '传统资金通道彻底打通。', plainMeaning: '华尔街正规军每天都在开大卡车拉走筹码。' },
      { name: '交易所流通币枯竭', weight: 25, value: '跌破近 6 年新低', impact: 'Positive', description: '长期持有者惜售锁仓。', plainMeaning: '想买的人排队，肯卖的人寥寥无几。' }
    ],
    keyCatalysts: ['美国现货 ETF 周度流入创新高', '战略储备法案推进', '全球大降息'],
    institutionalPositioning: { cotNetLongContracts: 42000, etfFlow7dUSD: '+$1.8B', retailSentiment: '78% 极度贪婪' }
  },
  {
    symbol: 'ETHUSD',
    assetName: '以太坊 (Ethereum)',
    plainTitle: '去中心化金融结算公链与现实资产代币化底层 (以太坊)',
    category: '加密货币',
    subCategory: '全球去中心化金融公链结算层',
    currentPrice: 3420.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 76,
    coreDriverThesis: '传统金融资产代币化 (RWA) 核心载体 ＋ Layer2 扩容落地 ＋ 质押生息抗通胀。',
    plainLanguageThesis: '如果比特币是数字黄金，那以太坊就是“数字石油与世界金融电网”！华尔街机构发行国债基金、稳定币结算，90% 都在以太坊网络上运行。持有以太坊还能享受 3%-4% 的质押分红。',
    plainActionSummary: '【操作指南】：汇率比触底反弹，逢回踩定投，爆发力有望在中后期超越比特币。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$3,250 - $3,680',
        coreLogic: '以太坊对比特币汇率比正在历史大支撑位筑底，现货 ETF 持续吸引机构套利买盘。',
        keyTriggers: ['以太坊现货 ETF 净申购数据', 'Gas 消耗回暖'],
        actionTactics: '回踩 $3,300 积极建仓，突破 $3,500 顺势持有，止损 $3,180。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$3,800 - $4,800',
        coreLogic: '贝莱德 BUIDL 基金等现实资产规模暴增，以太坊作为顶级安全公链成为不可替代的第一选择。',
        keyTriggers: ['全网质押率突破 30% 锁死流动性', '传统证券上链潮'],
        actionTactics: '配合质押生息长期持有，目标指向历史前高 $4,800。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$5,000 - $8,000',
        coreLogic: '全球金融基础设施底层结算公链，数万亿美元传统资产上链推动销毁与价值捕获。',
        keyTriggers: ['主流投行全面采纳公链发行证券', '统一加密会计准则落地'],
        actionTactics: '作为 Web3 和去中心化金融的核心头寸进行战略储备。'
      }
    },
    driverComponents: [
      { name: 'RWA 现实世界资产上链', weight: 40, value: '贝莱德华尔街重点布局', impact: 'Positive', description: '传统金融拥抱以太坊。', plainMeaning: '华尔街大行把国债和基金搬到以太坊上结算。' },
      { name: '质押锁仓带来天然现金流', weight: 35, value: '年化 3.2% 收益率', impact: 'Positive', description: '生息资产受青睐。', plainMeaning: '不仅能涨，放着还能天天领利息。' },
      { name: 'Layer2 费用分流效应', weight: 25, value: '主网手续费偏低', impact: 'Neutral', description: '需应用层进一步繁荣。', plainMeaning: '小钱转移便宜了，需要更多大项目入场。' }
    ],
    keyCatalysts: ['以太坊质押 ETF 审批预期', '贝莱德推出代币化新产品'],
    institutionalPositioning: { cotNetLongContracts: 18500, etfFlow7dUSD: '+$340M', retailSentiment: '65% 乐观' }
  },
  {
    symbol: 'SOLUSD',
    assetName: '索拉纳 (Solana)',
    plainTitle: '高并发每秒数万笔交易的华尔街硅谷新宠公链 (SOL)',
    category: '加密货币',
    subCategory: '高性能Web3消费级基础设施',
    currentPrice: 188.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '纳斯达克级极速撮合交易链 ＋ 现货 ETF 申请推进 ＋ 链上 DEX 交易量超越以太坊。',
    plainLanguageThesis: '如果以太坊像一艘装甲厚重的银行金库大邮轮（慢但极安全），索拉纳就是贴地飞行的“F1 超级方程式赛车”！转账只要一秒钟且手续费不到一分钱，吸引了全球最活跃的散户交易和支付企业 Visa 接入，成为华尔街对冲基金最爱的成长公链。',
    plainActionSummary: '【操作指南】：回踩 $175-$180 强支撑买多，牛市公链高弹性首选。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$178.00 - $215.00',
        coreLogic: '链上每日活跃地址数刷新历史高位，现货 ETF 审批传闻吸引投机买盘涌入。',
        keyTriggers: ['SEC 对 Solana 现货 ETF 审议时间表', 'DeFi TVL 总锁仓量变动'],
        actionTactics: '回踩 $180 附近企稳介入，突破 $200 顺势加仓，止损设在 $170。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$220.00 - $320.00',
        coreLogic: 'Firedancer 独立验证节点客户端主网上线将 TPS 提升至数十万，彻底消除宕机隐患，吸引机构级别订单流。',
        keyTriggers: ['Firedancer 主网全面部署', 'Shopify 与 Stripe 聚合支付集成'],
        actionTactics: '中线波段持有，目标挑战历史新高 $260 并上看 $300。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$350.00 - $600.00',
        coreLogic: '全球互联网与实体金融消费级 Web3 落地第一阵地，承接全球数亿零售用户的微支付与链上交互。',
        keyTriggers: ['全球跨国支付巨头接入作为结算通道', '去中心化物理基础设施 (DePIN) 爆发'],
        actionTactics: '作为加密进攻型资产的核心组合成分。'
      }
    },
    driverComponents: [
      { name: '极速低廉的链上用户体验', weight: 45, value: '每秒处理超 3000 笔真实交易', impact: 'Positive', description: '手续费低于 0.001 美元。', plainMeaning: '转账秒到账而且几乎免费，散户和项目方最爱用。' },
      { name: '华尔街现货 ETF 预期', weight: 35, value: '头部资管提交申报', impact: 'Positive', description: '复制比特币以太坊资金通道。', plainMeaning: '正规基金准备发 ETF，买盘预期强劲。' },
      { name: '历史节点稳定性担忧', weight: 20, value: '技术持续迭代修复', impact: 'Neutral', description: '新客户端旨在终结宕机。', plainMeaning: '过去曾停机维护过，现在换了新技术基本解决。' }
    ],
    keyCatalysts: ['Solana 现货 ETF 进展', 'Firedancer 节点主网上线'],
    institutionalPositioning: { cotNetLongContracts: 26000, etfFlow7dUSD: '+$88M', retailSentiment: '80% 极度看多' }
  },
  {
    symbol: 'XRPUSD',
    assetName: '瑞波币 (Ripple / XRP)',
    plainTitle: '跨国银行即时跨境清算与法律合规监管胜利之王 (瑞波币)',
    category: '加密货币',
    subCategory: '跨国银行即时清算网络与合规先锋',
    currentPrice: 2.45,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 78,
    coreDriverThesis: '与美国 SEC 监管诉讼全面落地清障 ＋ 银行间按需流动性 (ODL) 跨境即时清算 ＋ RLUSD 稳定币发布。',
    plainLanguageThesis: '瑞波币瞄准的是世界银行间几万亿美元的跨境电汇痛点（SWIFT 电汇要等两三天且扣几十美元手续费）。瑞波让跨国转账 3 秒搞定！随着美国司法彻底判定 XRP 在二级市场不是非法证券，历史枷锁砸碎，老牌银行纷纷恢复合作。',
    plainActionSummary: '【操作指南】：2.20-2.30 美元支撑位做多，突破历史前高动能充足。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2.15 - $2.85',
        coreLogic: '诉讼利空彻底出尽，多国现货 ETF 申请与主权稳定币储备消息引发巨量成交。',
        keyTriggers: ['Ripple 官方 RLUSD 稳定币监管获批', '各大加密交易所重新上架衍生品'],
        actionTactics: '回踩 $2.25 附近吸纳，突破 $2.60 追涨，止损设在 $2.05。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2.50 - $4.20',
        coreLogic: '欧美及亚太商业银行采用 RippleNet 进行法定货币走廊即时结算，锁仓现货流动性。',
        keyTriggers: ['G20 跨国快速支付试点采纳', '美国 XRP 现货 ETF 上市交易'],
        actionTactics: '中线顺应监管红利持有，上看历史前高 $3.80。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3.50 - $7.00',
        coreLogic: '升级传统老旧 SWIFT 国际清算网络，成为跨国央行数字货币 (CBDC) 的桥梁中继资产。',
        keyTriggers: ['多国央行直接采用 Ripple 账本测试 CBDC', '全球外汇结算通道全面普及'],
        actionTactics: '作为合规跨境金融革命的核心资产进行配置。'
      }
    },
    driverComponents: [
      { name: '司法与监管诉讼彻底胜诉', weight: 45, value: '非证券地位获法律确立', impact: 'Positive', description: '机构资金入场无后顾之忧。', plainMeaning: '官司彻底打赢了，正规金融大军可以放手买。' },
      { name: '跨国银行即时结算刚需', weight: 35, value: '全球合作金融机构超 300 家', impact: 'Positive', description: '替代繁琐传统电汇。', plainMeaning: '银行跨国转账3秒落袋，省时又省手续费。' },
      { name: '创始人托管账户定期释放', weight: 20, value: '每月托管释放部分解锁', impact: 'Negative', description: '一定程度上增加市场供应。', plainMeaning: '官方每月有部分锁定筹码解锁进入流通。' }
    ],
    keyCatalysts: ['SEC 正式撤销上诉文件', 'RLUSD 纽约金融服务局审批通过'],
    institutionalPositioning: { cotNetLongContracts: 32000, etfFlow7dUSD: '+$140M', retailSentiment: '76% 极度亢奋' }
  },

  // =========================================================================
  // 💱 外汇货币对 (Forex - G10 与亚太核心商品货币)
  // =========================================================================
  {
    symbol: 'USDJPY',
    assetName: '美元/日元 (USD/JPY)',
    plainTitle: '全球套息交易 (Carry Trade) 总开关与避险货币 (美日)',
    category: '外汇',
    subCategory: '全球套息交易 (Carry Trade) 命脉',
    currentPrice: 151.85,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 82,
    coreDriverThesis: '美日利差走向收窄 ＋ 日本央行 (BOJ) 开启加息正常化 ＋ 全球套息交易平仓反扑。',
    plainLanguageThesis: '过去两年全球都在借几乎零利息的日元，换成美元去吃 5% 高利息（叫套息交易）。现在美联储在降息（美元利息变少），而日本央行在加息（日元利息变高），利差一收窄，借日元的人就要被逼还钱买回日元，日元汇率面临升值，USDJPY 逢高做空胜率极高！',
    plainActionSummary: '【操作指南】：反弹至 153-155 区域坚决做空，目标看跌至 145-140。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '148.50 - 153.20',
        coreLogic: '短期受日本央行行长鹰派讲话扰动，日元空头平仓压力骤增，反弹动能逐步耗尽。',
        keyTriggers: ['日本东京核心 CPI', '财务省汇率干预警告', '美债长端利率走势'],
        actionTactics: '逢反弹至 152.80-153.50 分批开空，止损 155.00，目标看 150.00。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '142.00 - 150.00',
        coreLogic: '美联储持续降息，日本央行因国内薪资上涨持续推高基准利率，美日利差收窄推动套息资本回流。',
        keyTriggers: ['日本春斗薪资谈判涨幅结果', '美联储连续降息两次以上'],
        actionTactics: '波段持有空单，跌破 149 关键支撑后顺势加仓，目标 144。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '130.00 - 140.00',
        coreLogic: '日本彻底摆脱三十年通缩陷阱，央行超宽松货币政策终结，日元作为全球第一避险货币进行估值历史性纠偏。',
        keyTriggers: ['日本通胀稳定在 2% 以上', '全球资金由美元回流亚洲'],
        actionTactics: '长线逢高建立做空 USDJPY 头寸，防范宏观动荡的最佳避险工具。'
      }
    },
    driverComponents: [
      { name: '美日主权利差大幅收窄', weight: 45, value: '利差收窄超 150 个基点', impact: 'Negative', description: '做多美元日元套息不再划算。', plainMeaning: '存美元没那么多利息了，借日元成本变贵了。' },
      { name: '日本央行货币政策正常化', weight: 35, value: '逐步加息至 0.5% 以上', impact: 'Negative', description: '推升日元购买力。', plainMeaning: '日本央行开始涨利息，推高日元价值。' },
      { name: '避险情绪引爆平仓踩踏', weight: 20, value: '套息平仓加速', impact: 'Negative', description: '大盘一跌资金疯狂买回日元。', plainMeaning: '市场一慌大家都买回日元还债。' }
    ],
    keyCatalysts: ['日本央行加息决议', '美国降息决议出炉'],
    institutionalPositioning: { cotNetLongContracts: -85000, etfFlow7dUSD: '+$210M', retailSentiment: '62% 盲目抄底美日' }
  },
  {
    symbol: 'EURUSD',
    assetName: '欧元/美元 (EUR/USD)',
    plainTitle: '全球最大流动性货币对与欧美利差晴雨表 (欧美)',
    category: '外汇',
    subCategory: '全球最大流动性货币对与欧美利差',
    currentPrice: 1.0842,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 65,
    coreDriverThesis: '欧洲央行降息防衰退 ＋ 美联储同步步入降息周期 ＋ 俄乌地缘局势溢价。',
    plainLanguageThesis: '欧元是美元指数 (DXY) 里权重占 57.6% 的绝对大哥。欧洲经济疲软迫使欧央行抢跑降息，但美国降息也在路上，两边都在放水，导致欧元汇率在 1.06 到 1.10 之间反复来回震荡。',
    plainActionSummary: '【操作指南】：大周期箱体对待，1.07 附近做多，1.10 附近做空，不盲目看单边。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '1.0750 - 1.0920',
        coreLogic: '受欧洲 PMI 与美国通胀数据牵制，汇率在 1.0800 均线附近反复拉锯。',
        keyTriggers: ['欧洲央行行长讲话', '德国制造业新订单', '美国 CPI'],
        actionTactics: '高抛低吸，靠近 1.0780 做多，靠近 1.0920 做空。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '1.0650 - 1.1100',
        coreLogic: '欧洲经济增速滞后于美国，但美国财政赤字限制美元长远强势，预计维持在 1.07-1.11 区间拉锯。',
        keyTriggers: ['欧央行与美联储降息频次对比', '欧洲能源成本变化'],
        actionTactics: '适合外汇波段量化网格交易，严守支撑阻力位。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '1.1000 - 1.1800',
        coreLogic: '美元指数长周期见顶回落，长期去美元化背景下欧元作为第二大储备货币被动获得配置支持。',
        keyTriggers: ['欧洲财政一体化债券推进', '全球去中心化多极货币结算发展'],
        actionTactics: '长线逢低持有欧元作为美元资产的分散平衡。'
      }
    },
    driverComponents: [
      { name: '欧美央行货币政策同步宽松', weight: 45, value: '两边利差保持相对动态平衡', impact: 'Neutral', description: '利差变化不大，维持相持平衡。', plainMeaning: '两边都在降息，谁也不比谁强多少。' },
      { name: '德国工业与欧洲能源成本', weight: 35, value: '制造业弱复苏', impact: 'Negative', description: '工业竞争力仍需修复。', plainMeaning: '欧洲工厂成本高，拖累欧元。' },
      { name: '美元指数长周期下行压力', weight: 20, value: '美债赤字压力大', impact: 'Positive', description: '美元贬值利好欧元被动走高。', plainMeaning: '美元一旦跌，欧元就会被动抬升。' }
    ],
    keyCatalysts: ['欧央行例行利率决议', '德国 IFO 景气指数'],
    institutionalPositioning: { cotNetLongContracts: 45000, etfFlow7dUSD: '+$15M', retailSentiment: '50% 势均力敌' }
  },
  {
    symbol: 'USDMYR',
    assetName: '美元/马来西亚令吉 (USD/MYR)',
    plainTitle: '东南亚跨国数据中心外资涌入与国行稳健货币标杆 (美马)',
    category: '外汇',
    subCategory: '东南亚AI数据中心外资与国行中性利率',
    currentPrice: 4.4350,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 75,
    coreDriverThesis: '跨国科技巨头直接投资 (FDI) 美元结汇为马币 ＋ 马来西亚国家银行 (BNM) 维持 3.00% 稳健利率不降息 ＋ 出口贸易顺差。',
    plainLanguageThesis: '大马令吉正在迎来强势翻身仗！美联储在降息（美元收益率走低），而大马国行坚持不降息（利差大幅缩小）；更重要的是，微软、英伟达在柔佛建数据中心砸入上百亿美元，进入大马必须换成令吉买地雇人，源源不断的外汇买盘让令吉非常抗跌。',
    plainActionSummary: '【操作指南】：反弹至 4.48-4.50 附近结汇或逢高做空，中长线看好令吉升值至 4.25-4.30。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '4.4100 - 4.4650',
        coreLogic: '外资主权基金增持大马政府债券 (MGS)，本地进出口商积极结汇，4.45 关口面临较强压制。',
        keyTriggers: ['大马每月贸易顺差公布', '外资买入大马国债月度统计'],
        actionTactics: '反弹至 4.45 上方换汇买入令吉，跌破 4.42 顺势下探。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '4.3200 - 4.4500',
        coreLogic: '柔新经济特区项目全面开工推进，外商直接投资实际落地资金加速结汇，大马 GDP 保持 5% 稳健增长。',
        keyTriggers: ['柔新经济特区最终协议签署', '大马央行维持 OPR 3.00% 决议声明'],
        actionTactics: '外贸企业建议逢高锁定汇率，中线看好令吉走强。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '4.1500 - 4.3500',
        coreLogic: '东南亚半导体高阶封测与绿色数字算力中心枢纽确立，令吉长期基本面价值回升。',
        keyTriggers: ['国家半导体战略第一阶段达标', '全球供应链近岸外包增量'],
        actionTactics: '长期持有优质令吉计价核心资产，享受汇率与资本双重增值。'
      }
    },
    driverComponents: [
      { name: '跨国数据中心巨额外资落地', weight: 45, value: '直接投资超 160 亿美元', impact: 'Negative', description: '美元源源不断兑换为马币。', plainMeaning: '外资巨头带美元来大马投资，推升令吉需求。' },
      { name: '美马利差显著收窄', weight: 35, value: '美联储连续降息', impact: 'Negative', description: '存美元超额利息诱惑消退。', plainMeaning: '美元利息下来了，资金愿意留在大马赚稳健利息。' },
      { name: '全球贸易关税摩擦潜在扰动', weight: 20, value: '全球贸易保护主义抬头', impact: 'Positive', description: '可能短期抑制部分出口。', plainMeaning: '若全球贸易受阻，可能短暂引发汇率波动。' }
    ],
    keyCatalysts: ['大马央行 OPR 议息声明', '柔佛外资大厂投产并网仪式'],
    institutionalPositioning: { cotNetLongContracts: 15000, etfFlow7dUSD: '+$45M', retailSentiment: '68% 乐观' }
  },

  // =========================================================================
  // 📈 指数与宏观基准 (Indices & Macro Benchmarks)
  // =========================================================================
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
    symbol: 'KLCI',
    assetName: '富时大马吉隆坡综合指数 (FTSE Bursa KLCI)',
    plainTitle: '东南亚经济特区政策红利与外资建厂共振 (马股大盘)',
    category: '指数',
    subCategory: '柔佛经济特区政策红利与外资建厂',
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
    symbol: 'DXY',
    assetName: '美元指数 (US Dollar Index)',
    plainTitle: '全球法定纸币霸权与流动性松紧总阀门 (美元指数)',
    category: '指数',
    subCategory: '全球美元霸权与金融收紧/宽松总闸门',
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
  }
];
