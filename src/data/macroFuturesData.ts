import { AssetDriverProfile } from '../types/macro';

export const FUTURES_MARKET_ASSETS: AssetDriverProfile[] = [
  // =========================================================================
  // 🌾 期货市场 (Futures Market - 农产品软商品、油脂与工业期货)
  // =========================================================================
  {
    symbol: 'FCPO',
    assetName: '马来西亚棕榈油期货 (BMD Crude Palm Oil)',
    plainTitle: '全球植物油脂定价王座与生物柴油核心期货 (大马棕油)',
    category: '期货市场',
    subCategory: '全球植物油定价基准与生物柴油',
    currentPrice: 4860.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 86,
    coreDriverThesis: '印尼 B40 生物柴油强制掺混抽走出口配额 ＋ 大马油棕树龄老化劳工短缺导致产量见顶 ＋ 厄尔尼诺/拉尼娜极端降雨扰动。',
    plainLanguageThesis: '大马衍生品交易所 (BMD) 的 FCPO 是全世界交易量最大的棕榈油期货合约！全球食品加工（方便面、巧克力、烘焙）和印尼汽车生物柴油离不开棕油。印尼实施 B40 政策将大量原油就地转化为车用柴油，导致全球出口断崖式减少，大宗食用油供需极其紧张。',
    plainActionSummary: '【操作指南】：逢马来西亚棕榈油局 (MPOB) 月报前震荡低吸做多，关注 4,600-4,700 令吉强支撑。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '4,720 - 5,050 令吉/吨',
        coreLogic: '短期受季风季节降雨阻碍果串采摘、MPOB 月度库存超预期下滑驱动，现货贴水转为升水，多头动能强劲。',
        keyTriggers: ['MPOB 每月10日公布官方产销库存', '船运调查机构 ITS/AmSpec 前 15/20 天出口环比数据', '大连豆油期货夜盘联动'],
        actionTactics: '回踩 4,750-4,800 区域逢低做多，突破 5,000 关口减仓止盈，防守止损设在 4,680。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '4,600 - 5,300 令吉/吨',
        coreLogic: '印尼 B40 生柴政策实质性消耗超 1200 万吨棕榈油，造成东南亚原棕油净出口缺口，大豆油与菜籽油对棕油的溢价大幅收窄甚至倒挂。',
        keyTriggers: ['印尼能源部正式执行 B40 掺混检查', '印度与中国中秋国庆双节备货买盘', '原油价格波动推升生物燃料溢价'],
        actionTactics: '中线波段逢调整 5% 以上加多，目标直指 5,200 令吉历史高位区间。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '4,500 - 5,800 令吉/吨',
        coreLogic: '欧盟零毁林法案 (EUDR) 限制新垦种植园面积，马印两国树龄超过 20 年的退化老树占比超 30%，全球棕油供给面临不可逆的单产下滑天花板。',
        keyTriggers: ['全球生物航空煤油 (SAF) 与绿氢柴油需求放量', '马印翻种补贴执行进度落后'],
        actionTactics: '棕榈油已由低价大众植物油转变为具有能源属性的战略刚需，适合在大宗商品投资组合中长线保持超配。'
      }
    },
    driverComponents: [
      { name: '印尼生物柴油 B40 锁死出口', weight: 45, value: '年吞噬超 1200 万吨现货', impact: 'Positive', description: '国内强制烧柴油截留大量出口。', plainMeaning: '印尼自己拿去开车烧掉了，不肯轻易卖给外国。' },
      { name: '马印种植园树龄老龄化', weight: 35, value: '新开垦面积接近零增长', impact: 'Positive', description: '老树单产逐年退化。', plainMeaning: '树太老结不出果子，树林又不能随便砍伐扩建。' },
      { name: '印度与中国进口替代博弈', weight: 20, value: '豆棕价差倒挂制约', impact: 'Neutral', description: '价格太贵时买家部分转向大豆油。', plainMeaning: '太贵的时候买家会稍微少买点，形成短线压力。' }
    ],
    keyCatalysts: ['MPOB 官方月报超预期去库', '印尼政府调高出口关税参考价', '原油大涨推高生柴掺混利润'],
    institutionalPositioning: { cotNetLongContracts: 48500, etfFlow7dUSD: '+$95M', retailSentiment: '72% 坚定看多' }
  },
  {
    symbol: 'SOYBEAN',
    assetName: '美大豆连续期货 (CBOT Soybean)',
    plainTitle: '全球蛋白质饲料之王与中美农产品经贸晴雨表 (大豆)',
    category: '期货市场',
    subCategory: '全球蛋白油脂大宗之王',
    currentPrice: 1020.5,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 70,
    coreDriverThesis: '南美巴西创纪录丰产压顶 ＋ 美国农业部 (USDA) 供需平衡表压榨需求韧性 ＋ 宏观经贸博弈。',
    plainLanguageThesis: '芝加哥期货交易所 (CBOT) 美大豆是全球农产品期货的定海神针。大豆压榨后得到“豆粕”（养猪鸡鸭必不可少的蛋白饲料）和“豆油”（日常炒菜油）。现在巴西大豆连续丰收让粮仓爆满，但美国国内生物柴油压榨需求旺盛，使得大豆在 1,000 美分关口形成强烈支撑。',
    plainActionSummary: '【操作指南】：1,000 美分整数心理关口做多，反弹至 1,080-1,100 美分止盈，不盲目猜大单边。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '990 - 1,060 美分/蒲式耳',
        coreLogic: '短期受美豆出口检验周报与巴西大豆收割进度压制，价格在 1,000 美分大关进行反复多空筑底拉锯。',
        keyTriggers: ['USDA 周度出口销售报告', '巴西马托格罗索州降雨与收割进度', '大豆压榨利润率 (Crush Margin)'],
        actionTactics: '在 1,000 美分下方轻仓买多，反弹至 1,050 上方逐步减仓，止损设在 975。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '1,020 - 1,150 美分/蒲式耳',
        coreLogic: '北美春播面积与夏季关键灌浆期天气炒作窗口将至，任何干旱减产预期都将引发空头平仓与量化资金猛烈拉升。',
        keyTriggers: ['USDA 6月底种植面积重估报告', '中西部作物巡查 (Pro Farmer Crop Tour)', '南美出口贴水由负转正'],
        actionTactics: '在北半球夏季天气炒作期到来前建立低位多头底仓，捕捉天气升水行情。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '900 - 1,100 美分/蒲式耳',
        coreLogic: '巴西农业机械化与塞拉多土地灌溉面积年年扩张，南美大豆生产成本持续压低，全球蛋白质供给进入周期性大充裕阶段。',
        keyTriggers: ['巴西大豆年产量突破 1.7 亿吨新纪录', '全球养殖饲料配比低蛋白技术推广'],
        actionTactics: '长线不宜死多，高位反弹受阻时适合布局中远期空单锁定利润。'
      }
    },
    driverComponents: [
      { name: '巴西大豆南美超级丰收', weight: 45, value: '巴西产超 1.6 亿吨压顶', impact: 'Negative', description: '全球市场充斥南美低价货源。', plainMeaning: '巴西农民收割机日夜轰鸣，大豆多到仓库放不下。' },
      { name: '美国可再生柴油压榨刚需', weight: 35, value: '国内压榨量刷历史纪录', impact: 'Positive', description: '本土豆油需求兜底。', plainMeaning: '美国自己把大豆压成油烧环保柴油，内需很硬。' },
      { name: '中美农产品贸易采购节拍', weight: 20, value: '采购季节性转移', impact: 'Neutral', description: '下半年订单重回美湾港口。', plainMeaning: '中国买家的采购节奏决定短线脉冲。' }
    ],
    keyCatalysts: ['USDA 每月世界农业供需报告 (WASDE)', '美国国家海洋局 (NOAA) 夏季天气预测', '中国大规模采购美豆现货'],
    institutionalPositioning: { cotNetLongContracts: -35000, etfFlow7dUSD: '-$42M', retailSentiment: '46% 偏空观望' }
  },
  {
    symbol: 'CORN',
    assetName: '美玉米连续期货 (CBOT Corn)',
    plainTitle: '全球饲料主粮工业乙醇燃料基石 (美玉米)',
    category: '期货市场',
    subCategory: '饲料主粮与生物乙醇能源燃料',
    currentPrice: 432.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 68,
    coreDriverThesis: '全球饲料刚需支撑 ＋ 美国乙醇汽油掺混比率 ＋ 乌克兰黑海出口走廊地缘博弈。',
    plainLanguageThesis: '玉米是现代农业的“碳水化合物总能量之王”。美国生产的玉米超三分之一被拿去做生物乙醇加进汽车汽油里，另外超一半拿去养牛养猪。400 美分是美国农场主的种植成本底线，跌破 420 美分通常迎来农场惜售与政策托底。',
    plainActionSummary: '【操作指南】：410-420 美分成本线下沿做多，460 美分上方分批止盈，区间波段操作。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '420 - 450 美分/蒲式耳',
        coreLogic: '农场主挺价惜售对抗低粮价，乙醇加工厂利润丰厚保持满负荷开工，现货基差稳步走强。',
        keyTriggers: ['EIA 周度乙醇产量与库存数据', '密西西比河谷驳船运费与出口装船量'],
        actionTactics: '回踩 425 美分附近小仓位买多，止损放在 412。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '435 - 495 美分/蒲式耳',
        coreLogic: '夏季北半球授粉期高温干旱风险，加上美国环保署 (EPA) 推进夏季 E15 乙醇汽油销售豁免，消费端具备强弹性。',
        keyTriggers: ['美国生长期关键作物优良率公布', '欧盟饲料小麦受灾转购玉米'],
        actionTactics: '中线逢回调布局多单，博弈夏季授粉期天气溢价。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '390 - 480 美分/蒲式耳',
        coreLogic: '转基因种子抗旱抗虫技术大幅提升单产，全球玉米种植成本中枢下降，大周期处于供应充裕区间。',
        keyTriggers: ['转基因玉米全球推广面积增长', '工业深加工淀粉糖替代需求饱和'],
        actionTactics: '高位坚决套期保值或逢高做空，不长期死守多单。'
      }
    },
    driverComponents: [
      { name: '美国农场主种植成本底线', weight: 40, value: '410 美分完全生产成本', impact: 'Positive', description: '跌穿成本引发惜售护盘。', plainMeaning: '太便宜了农民宁愿把玉米囤在自家铁筒仓里不卖。' },
      { name: '汽油强制掺混生物乙醇', weight: 35, value: '超 1.3 亿吨玉米进炼油厂', impact: 'Positive', description: '能源属性牢牢锁死三分之一产出。', plainMeaning: '加汽油必须加玉米提炼的乙醇，刚需极度稳定。' },
      { name: '全球期末库存充沛压顶', weight: 25, value: '库存消费比处在健康高位', impact: 'Negative', description: '抑制单边暴涨高度。', plainMeaning: '世界大粮仓里粮食存量较多，不缺粮。' }
    ],
    keyCatalysts: ['WASDE 季度作物库存报告', '美国 EPA 乙醇授权政策发布', '密西西比河航道通行报告'],
    institutionalPositioning: { cotNetLongContracts: -48000, etfFlow7dUSD: '-$18M', retailSentiment: '48% 中性' }
  },
  {
    symbol: 'COCOA',
    assetName: '纽约可可期货连续 (ICE Cocoa)',
    plainTitle: '西非极端干旱减产引爆的百年超级大宗牛市 (可可)',
    category: '期货市场',
    subCategory: '西非干旱超级牛市与巧克力原料',
    currentPrice: 8650.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 84,
    coreDriverThesis: '科特迪瓦和加纳双寡头占全球可可豆 60% 产出 ＋ 树龄老化肿枝病毒肆虐 ＋ 烘焙糖果巨头抢现货逼空。',
    plainLanguageThesis: '可可是近两年全球涨幅最夸张的期货品种！全球巧克力的原料可可豆，超过 60% 出产自西非两个国家。由于几十年来缺乏翻种、树木老朽感染绝症病毒，加上暴雨干旱交替，连续三年出现毁灭性减产。好时、雀巢等国际糖果大厂为了维持工厂运转，在期货市场疯狂扫货抢交割，暴涨数倍成为大宗奇迹。',
    plainActionSummary: '【操作指南】：波动率极大极度凶悍，不可重仓赌单边，逢深幅下蹲回调做多，严控风险。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$8,100 - $9,400 /吨',
        coreLogic: '主产区中期作物到港量惨淡，但高币值迫使部分欧美巧克力厂商推迟采购，短线在 8,500-9,000 美元剧烈震荡。',
        keyTriggers: ['科特迪瓦港口每周可可豆到港量 (Port Arrivals)', 'ICE 交易所认证仓单库存'],
        actionTactics: '回踩 $8,200-$8,400 尝试轻仓多单，止损设在 $7,900 下方，反弹至 $9,200 快速分批止盈。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$8,800 - $11,500 /吨',
        coreLogic: '可可树从栽种到结豆需要 4-5 年漫长周期，西非病虫害毁掉的产能不能在短期内凭空变出，全球结构性硬赤字难以弥合。',
        keyTriggers: ['西非主产国提高产地农户收购保底价', '跨国巧克力巨头产品提价与可可脂替代品研发进度'],
        actionTactics: '逢中期利空洗盘深幅下蹲时买入，中线坚定看多可可超级供需缺口。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$7,000 - $12,000 /吨',
        coreLogic: '厄瓜多尔、巴西等新产区需数年才能扩产接棒，全球巧克力消费需求刚性，可可价格中枢已完成历史性永久跃迁。',
        keyTriggers: ['欧盟森林保护法规 (EUDR) 对可可供应链合规审查', '新耐病毒杂交树苗大面积成活率'],
        actionTactics: '作为全球软商品超级周期的核心龙头进行波段对冲配置。'
      }
    },
    driverComponents: [
      { name: '西非双寡头主产国灾难性绝收', weight: 55, value: '科特迪瓦与加纳减产超 35%', impact: 'Positive', description: '病树毁林导致结构性供给瘫痪。', plainMeaning: '树病死了，根本结不出果子，短期神仙也救不了。' },
      { name: '跨国糖果巨头刚性抢货逼空', weight: 30, value: '现货升水创历史极限', impact: 'Positive', description: '停工损失远大于高价买豆。', plainMeaning: '工厂停产一天亏几千万，雀巢好时硬着头皮也得抢豆子。' },
      { name: '下游消费者面对提价缩减消费', weight: 15, value: '巧克力单品减量涨价', impact: 'Negative', description: '消费端开始显露价格反噬。', plainMeaning: '巧克力太贵了，消费者偶尔少吃一盒。' }
    ],
    keyCatalysts: ['国际可可组织 (ICCO) 供需缺口评估修正', '西非季风干旱旱情加剧', '可可现货交割逼空'],
    institutionalPositioning: { cotNetLongContracts: 14200, etfFlow7dUSD: '+$68M', retailSentiment: '78% 极度亢奋' }
  },
  {
    symbol: 'COFFEE',
    assetName: '纽约咖啡连续期货 (ICE Arabica Coffee)',
    plainTitle: '全球打工人每日清醒提神药剂与巴西干旱原料期货 (咖啡)',
    category: '期货市场',
    subCategory: '巴西干旱减产与烘焙原料期货',
    currentPrice: 288.4,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
    coreDriverThesis: '巴西米纳斯吉拉斯干旱削弱阿拉比卡咖啡树开花 ＋ 越南罗布斯塔咖啡减产联动 ＋ 全球现货库存跌至近二十年最低点。',
    plainLanguageThesis: '咖啡豆是全世界交易量仅次于原油的大宗商品之一！主要分为高级阿拉比卡豆（星巴克手冲用）和罗布斯塔豆（速溶与深烘意式用）。世界最大咖啡产国巴西遭遇历史罕见高温干旱，导致咖啡树开花后坐果率极低；而第二大产国越南同样缺水，两大多头主力共振推高咖啡期货创多年新高。',
    plainActionSummary: '【操作指南】：咖啡大牛市特征明显，在 270-280 美分强支撑逢低买入，切忌做空。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '275 - 310 美分/磅',
        coreLogic: '短期受欧洲港口认证库存持续去库与巴西出口商惜售支撑，日线呈均线多头排列。',
        keyTriggers: ['巴西主要咖啡产区降雨卫星监测图', 'ICE 认证阿拉比卡咖啡豆库存报告'],
        actionTactics: '回踩 280 美分逢低做多，突破 300 整数关口减仓，防守设在 272。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '280 - 340 美分/磅',
        coreLogic: '巴西 2025/26 年度产量预期因前期开花期受损大幅下修，全球大型咖啡烘焙巨头开启防御性锁价抢购。',
        keyTriggers: ['巴西国家商品供应公司 (Conab) 官方减产修正', '欧洲零毁林监管法案对产地资质审核'],
        actionTactics: '波段持有，顺应天气减产逻辑做多，目标看至 320-340 美分。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '240 - 350 美分/磅',
        coreLogic: '中国及亚太新兴市场现磨咖啡人均饮用杯数以年均 15% 复合爆发，全球气候变暖导致适宜种植海拔不断萎缩，长期供需紧平衡常态化。',
        keyTriggers: ['亚洲年轻一代人均咖啡消费翻倍', '高海拔咖啡产地极端气候频发'],
        actionTactics: '作为对冲生活成本上升与气候大宗通胀的绝佳抗性资产。'
      }
    },
    driverComponents: [
      { name: '巴西主产区干旱伤害坐果率', weight: 50, value: '巴西米纳斯吉拉斯降雨减少 40%', impact: 'Positive', description: '开花坐果率遭受永久损伤。', plainMeaning: '天不下雨，咖啡树开不出花结不出果。' },
      { name: '全球交易所认证库存见底', weight: 30, value: '欧洲现货库存创 20 年低点', impact: 'Positive', description: '现货流通缓冲垫极薄。', plainMeaning: '仓库里没存货，一买就只能到交易所抢期货。' },
      { name: '速溶豆与现磨豆价差修复', weight: 20, value: '越南罗布斯塔价格暴涨带动', impact: 'Positive', description: '低端豆暴涨反哺高档豆。', plainMeaning: '便宜豆子涨飞了，好豆子跟着水涨船高。' }
    ],
    keyCatalysts: ['Conab 巴西咖啡产量报告', '欧洲绿色通关法案细节落地', 'ICE 认证库存跌破 60 万袋'],
    institutionalPositioning: { cotNetLongContracts: 38200, etfFlow7dUSD: '+$55M', retailSentiment: '74% 积极看多' }
  }
];
