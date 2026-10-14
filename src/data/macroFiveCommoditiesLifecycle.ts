import { AssetDriverProfile } from '../types/macro';

/**
 * ============================================================================
 * 全球五大商品大类 ＆ 全生命周期推导 ＆ 全球期货市场大宗商品核心数据库
 * 
 * 严格按照国际大宗商品与衍生品交易所金融学标准划分五大类：
 * 1. ⚡ 能源商品 (Energy Commodities: WTI, Brent, NatGas, Heating Oil, Gasoline, Coal, Uranium)
 * 2. 🪙 贵金属与工业战略金属 (Precious & Industrial & Strategic Metals: Gold, Silver, Platinum, Palladium, Copper, Aluminum, Tin, Nickel, Zinc, Lithium, Iron Ore, Rare Earth)
 * 3. 🌾 农产品与主粮谷物 (Agricultural Grains & Feed: Soybeans, Corn, Wheat, Soyoil, Soymeal, Rice, Oats, Canola)
 * 4. ☕ 软商品与经济作物 (Soft Commodities: Palm Oil FCPO, Coffee Arabica, Robusta, Cocoa, Sugar #11, Cotton #2, Rubber TSR20, Orange Juice, Lumber)
 * 5. 🥩 畜牧与肉类商品 (Livestock & Meats: Live Cattle, Feeder Cattle, Lean Hogs, Milk)
 * 6. 📈 全球期货市场专属大宗 (Futures Exchange Contracts: BMD, CME/CBOT, NYMEX, ICE, LME, SGX)
 * ============================================================================
 */

export const FIVE_COMMODITIES_AND_FUTURES_DATA: AssetDriverProfile[] = [
  // =========================================================================
  // 第一大类：⚡ 能源商品 (Energy Commodities)
  // =========================================================================
  {
    symbol: 'WTI',
    assetName: '美原油连续 (WTI Crude Oil)',
    plainTitle: '世界工业血液与车轮上的基础能源 (美轻质原油)',
    category: '能源商品',
    subCategory: '基础能源与地缘博弈',
    currentPrice: 71.80,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 72,
    coreDriverThesis: 'OPEC+ 450万桶/日闲置产能压制高位 ＋ 美国战略石油储备 (SPR) 70 美元保底 ＋ 中东红海地缘溢价。',
    plainLanguageThesis: '原油涨跌就像上下两块厚钢板：上面有沙特与俄罗斯每天数百万桶随时可开闸的闲置产能，一冲高就面临增产甩卖；下面有美国政府承诺 70 美元附近持续回购补充国家战略油库。两头封死，形成坚固的箱体震荡。',
    plainActionSummary: '【操作指南】：70 美元附近不杀跌逢低做多，78-82 美元逢高止盈，坚决执行区间波段战术。',
    futuresContractSpecs: {
      exchange: 'NYMEX / CME (纽约商业交易所)',
      contractSize: '1,000 桶 / 手',
      tickSize: '0.01 美元/桶 (10 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 6,200 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '轻度升水 Contango (近月贴水远月)'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：页岩油资本开支纪律化与存量老化期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '美国炼厂开工率高位徘徊，但全球制造业补库动能分化，商业原油库存处于过去5年均值区间，未现极端堆积或见底。',
      supplyBottleneck: '美国二叠纪盆地优质甜点油井打井成本持续抬升，华尔街股东强制要求分红回购，拒绝盲目再融资暴打井。',
      demandTransformation: '全球乘用车电动化与混动化长期削减汽油消费，但石化化工与航空煤油刚性消费托底。',
      costFloorAndCeiling: {
        cashCostFloor: '$60 - $65 / 桶 (美国页岩油新井全周期边际成本与财政平衡线)',
        profitMarginCeiling: '$85 - $90 / 桶 (超过将引发欧美恶性二次通胀并促成白宫施压抛储增产)'
      },
      policyAndGeopoliticalMoat: 'OPEC+ 联合部长级监督委员会 (JMMC) 产量配额与美国能源部 SPR 战略采购招标法案。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$69.00 - $74.50',
        coreLogic: '短期受 EIA 周度商业原油库存去化速度、中东突发袭击地缘消息扰动，日内围绕 71 美元拉锯。',
        keyTriggers: ['EIA 周三原油与汽油库存报告', '霍尔木兹海峡航运安全态势', '美元指数反弹力度'],
        actionTactics: '回踩 $69.50-$70.20 分批接多，$74 上方分批减仓，严格防守止损设在 $68.00。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$67.00 - $78.00',
        coreLogic: 'OPEC+ 逐季评估退出自愿减产计划，与非 OPEC（圭亚那、巴西、美国）微幅增产博弈。',
        keyTriggers: ['OPEC+ 正式增产决议执行度', '全球主要经济体降息外溢刺激制造业复苏'],
        actionTactics: '依托宽幅箱体下轨耐心低吸，不参与突破追高。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$60.00 - $75.00',
        coreLogic: '全球交通电气化加速渗透，IEA 预测全球原油消费达峰平原期已近在咫尺。',
        keyTriggers: ['全球新能源汽车渗透率突破 45%', '跨国石油巨头能源转型资本开支'],
        actionTactics: '不宜作为长期买入锁仓标的，仅适合作为宏观通胀对冲波段配置。'
      }
    },
    driverComponents: [
      { name: 'OPEC+ 闲置产能水阀', weight: 40, value: '450万桶/日随时可增', impact: 'Negative', description: '压制暴涨空间。', plainMeaning: '中东大油库满仓，一涨就开闸抢份额。' },
      { name: '美国国家战略油库托底', weight: 35, value: '70美元刚性回购', impact: 'Positive', description: '封杀深跌空间。', plainMeaning: '跌破70美国政府自己拿麻袋进场买。' },
      { name: '新能源电车替代效应', weight: 25, value: '汽油消费弹性弱化', impact: 'Negative', description: '长期压制估值。', plainMeaning: '电车越来越多，汽油需求不再狂飙。' }
    ],
    keyCatalysts: ['OPEC+ 部长级监督会议', '美国战略石油储备招标公布'],
    institutionalPositioning: { cotNetLongContracts: 198000, etfFlow7dUSD: '-$65M', retailSentiment: '52% 中立震荡' }
  },
  {
    symbol: 'BRENT',
    assetName: '布伦特原油连续 (Brent Crude)',
    plainTitle: '全球海上现货原油贸易定价基石 (北海布伦特)',
    category: '能源商品',
    subCategory: '海上航运与国际基准油',
    currentPrice: 75.40,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 74,
    coreDriverThesis: '全球逾 65% 现货原油贸易基准 ＋ 红海与地中海海运溢价 ＋ 欧洲炼厂采购偏好。',
    plainLanguageThesis: '全世界大部分国际油轮运输的原油都按照布伦特原油定价。由于中东油轮绕行好望角运输成本上升，布油相对美油常年维持 3-5 美元的航运与品级升水。',
    plainActionSummary: '【操作指南】：密切关注与 WTI 价差，价差超过 5 美元做空布油做多美油跨品种套利。',
    futuresContractSpecs: {
      exchange: 'ICE (欧洲洲际交易所)',
      contractSize: '1,000 桶 / 手',
      tickSize: '0.01 美元/桶 (10 美元/手)',
      settlementType: '现金结算 (Cash Settlement)',
      marginRequirement: '约 6,800 美元 / 手',
      tradingHours: '北京时间 07:00 - 次日 06:00',
      basisStatus: '贴水升水转换'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：北海老油田自然递减与品级调整期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '欧洲工业能源需求维持弱平衡，海上浮仓库存低位运行。',
      supplyBottleneck: '英国北海盆地税费高企导致钻井投资骤降，现货交割需引入美国 WTI Midland 原油补充。',
      demandTransformation: '欧洲重工业绿色低碳转型与炼厂产能关闭，削弱区域原油加工量。',
      costFloorAndCeiling: {
        cashCostFloor: '$65 / 桶 (深海钻井全周期现金开采成本线)',
        profitMarginCeiling: '$90 / 桶 (欧洲央行通胀容忍天花板)'
      },
      policyAndGeopoliticalMoat: 'G7 对俄原油 60 美元价格上限监管法案与欧盟碳关税机制。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$73.00 - $78.50',
        coreLogic: '受红海胡塞武装对油轮袭扰风险与欧美成品油裂解价差收窄制约。',
        keyTriggers: ['苏伊士运河通行油轮载重吨数', '欧洲柴油库存报告'],
        actionTactics: '回踩 $73.50 做多，目标 $77.50，止损 $72.00。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$70.00 - $82.00',
        coreLogic: '地缘政治突发断供风险溢价与全球降息刺激需求回升共振。',
        keyTriggers: ['中东地缘实质性停火或升级协议', '亚洲巨头民营大炼化采购开工'],
        actionTactics: '中线高抛低吸，以区间下轨布局多单为主。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$65.00 - $80.00',
        coreLogic: '非 OPEC+ 供给边际替代扩大，全球原油总产能在 2030 年前面临轻度过剩。',
        keyTriggers: ['圭亚那与巴西海上深水油田日产破 400 万桶', '全球新能源重卡商业化'],
        actionTactics: '大周期高抛为主，逢大宗商品暴涨至 90 美元上方清空现货持仓。'
      }
    },
    driverComponents: [
      { name: '全球现货国际贸易基准', weight: 45, value: '65% 贸易结算以此定价', impact: 'Positive', description: '全球流动性最佳。', plainMeaning: '世界大多数油轮以布伦特标尺结账。' },
      { name: '红海航运地缘阻隔', weight: 35, value: '运费增加 1.5 美元/桶', impact: 'Positive', description: '绕行成本转嫁现货。', plainMeaning: '绕远路油费人工大增，推升售价。' },
      { name: '欧洲工业衰退需求疲软', weight: 20, value: '欧洲制造业 PMI 仍在荣枯线下方', impact: 'Negative', description: '抑制消费增长。', plainMeaning: '欧洲工厂开工不足，买油意愿不强。' }
    ],
    keyCatalysts: ['国际海事安全通报', 'IEA 国际能源署全球原油月报'],
    institutionalPositioning: { cotNetLongContracts: 215000, etfFlow7dUSD: '-$42M', retailSentiment: '51% 胶着' }
  },
  {
    symbol: 'NATGAS',
    assetName: '美天然气连续 (Henry Hub Natural Gas)',
    plainTitle: '清洁能源过渡先锋与 AI 算力中心发电心脏 (天然气)',
    category: '能源商品',
    subCategory: '电力燃料与清洁过渡',
    currentPrice: 2.85,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
    coreDriverThesis: '美国 LNG 液体出口码头新产线点火 ＋ AI 数据中心天量燃气发电负荷 ＋ 气田钻机主动减产。',
    plainLanguageThesis: '天然气是暴涨暴跌的“寡妇制造者”，但底层逻辑已发生质变：过去美国天然气多到只能在油田烧掉，现在科技巨头（亚马逊、微软、谷歌）建 AI 算力中心，风光发电不稳定，只能用天然气发电机 24 小时供电！加上向欧洲出口的液化天然气 (LNG) 船队猛增，天然气走出历史泥潭。',
    plainActionSummary: '【操作指南】：2.50-2.60 美元区间是各大气田开采成本生命线，逢低坚决建仓多单。',
    futuresContractSpecs: {
      exchange: 'NYMEX / CME (纽约商业交易所)',
      contractSize: '10,000 百万英热单位 (MMBtu) / 手',
      tickSize: '0.001 美元/MMBtu (10 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 4,800 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '深贴水向平水修复'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段①：低气价出清钻机 ➔ 需求爆发拐点期',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: '地下储气库库存从历史极度偏高向 5 年均值快速收敛，严冬取暖与夏季空调制冷双峰驱动。',
      supplyBottleneck: '阿巴拉契亚山脉与海恩斯维尔盆地跨州管道审批困难，伴生气扩建受环保法规限制。',
      demandTransformation: '全球 AI 芯片算力中心 2026-2030 年新增天然气发电需求预计超 30 亿立方英尺/日。',
      costFloorAndCeiling: {
        cashCostFloor: '$2.20 - $2.40 / MMBtu (全美最便宜干气井现金开采保本底线)',
        profitMarginCeiling: '$4.50 - $5.50 / MMBtu (超过将促成停产气井全量恢复)'
      },
      policyAndGeopoliticalMoat: '美国能源部 (DOE) 恢复审批准许新的液化天然气 (LNG) 出口项目出口配额。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2.70 - $3.25',
        coreLogic: '短期受北美气温寒潮预警及 EIA 周四地下储气库注气量超预期偏低驱动。',
        keyTriggers: ['NOAA 全美 8-14 天天气预报冷空气路径', '自由港 (Freeport) LNG 出口负荷率'],
        actionTactics: '回踩 $2.75 分批低吸做多，止损 $2.55，目标看 $3.15。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$3.00 - $4.20',
        coreLogic: 'Plaquemines LNG 新增出口产能投产，直接抽走每天 20 亿立方英尺过剩现货供给。',
        keyTriggers: ['路易斯安那州大型出口码头商业通气', '主要产气商季度资本开支维持低位'],
        actionTactics: '波段持有，突破 3.50 美元锁定部分利润。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3.50 - $5.50',
        coreLogic: '欧洲彻底切断俄罗斯管道气依赖，全球 LNG 海运贸易超级牛市不可逆转。',
        keyTriggers: ['欧洲天然气长期长协锁定率', 'AI 算力电力负荷实际落地数据'],
        actionTactics: '天然气已由区域垃圾副产品进化为全球清洁战略硬通货，战略长配。'
      }
    },
    driverComponents: [
      { name: '全球液化天然气出口激增', weight: 45, value: '年新增出口超 2500 万吨', impact: 'Positive', description: '打通向欧美高价区输送通道。', plainMeaning: '美国本地用不完的便宜气，坐船卖去欧洲赚大钱。' },
      { name: 'AI 数据中心燃气自备电厂', weight: 35, value: '科技巨头批量采购燃气轮机', impact: 'Positive', description: '基荷电力不可替代。', plainMeaning: '算力中心不能停电，只能买天然气发电机自给自足。' },
      { name: '页岩油伴生气副产供应', weight: 20, value: '原油钻井附带产生天然气', impact: 'Negative', description: '对气价产生被动稀释。', plainMeaning: '采石油顺带喷出来的气体，不要钱也得卖。' }
    ],
    keyCatalysts: ['EIA 周度天然气地下库存变动报告', '美国国家气象局 NOAA 极地涡旋警报'],
    institutionalPositioning: { cotNetLongContracts: 72000, etfFlow7dUSD: '+$88M', retailSentiment: '68% 极度看好' }
  },
  {
    symbol: 'URANIUM',
    assetName: '铀精矿黄饼连续 (Uranium U3O8)',
    plainTitle: '零碳基荷核电核心燃料与主权能源复兴之锚 (金属铀)',
    category: '能源商品',
    subCategory: '零碳基荷核能燃料',
    currentPrice: 82.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 89,
    coreDriverThesis: '欧美重启封存核电站 ＋ 微软/亚马逊长协包下核电厂直供 AI ＋ 哈萨克斯坦硫酸短缺减产。',
    plainLanguageThesis: '世界上最干净、能够 24 小时满功率发电的就是核能！科技巨头（如微软与三哩岛核电站签订 20 年独家供电合同）为了驱动 AI 大模型，全球争抢核电。而全球前两大产铀巨头（哈原工与卡梅科）因采矿关键原料硫酸短缺连续下调产量，现货市场无货可卖。',
    plainActionSummary: '【操作指南】：核能是 10 年级别能源超级周期，回踩 78-80 美元坚决长线买入锁仓。',
    futuresContractSpecs: {
      exchange: 'CME / NYMEX (纽约商业交易所)',
      contractSize: '250 磅 U3O8 / 手',
      tickSize: '0.05 美元/磅 (12.5 美元/手)',
      settlementType: '实物仓单提货 (Physical Delivery)',
      marginRequirement: '约 3,200 美元 / 手',
      tradingHours: '纽约时间 18:00 - 次日 17:00',
      basisStatus: '长协现货双升水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段①：十年熊市矿山废弃 ➔ 新建周期长达 8-10 年',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: '欧美核电运营商历史超额存货已彻底耗尽，采购官员从过去的“观望比价”全面转变为“抢先锁仓长协”。',
      supplyBottleneck: '哈萨克斯坦地浸法采矿面临全球硫酸断供，加拿大麦克阿瑟河高品位矿山扩产缓慢。',
      demandTransformation: '全球在建与拟建核反应堆超 60 座，SMR 小型模块化核反应堆获美英主权基金百亿补贴。',
      costFloorAndCeiling: {
        cashCostFloor: '$65 / 磅 (刺激全球绿地新矿山勘探建设的最低财务 IRR 平衡线)',
        profitMarginCeiling: '$140 / 磅 (历史上福岛核事故前的极端投机峰值)'
      },
      policyAndGeopoliticalMoat: '美国国会正式立法通过《禁止进口俄罗斯铀法案》，全面封杀俄制浓缩铀进入北美。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$80.00 - $88.50',
        coreLogic: '现货市场成交清淡，少量公用事业采购询价即可推升现货经纪报价跳涨。',
        keyTriggers: ['UxC / TradeTech 现货评估周报', '哈原工三季度实际交付量'],
        actionTactics: '回踩 $81 分批布局，不追单日暴涨，以持有现货或 ETF 为主。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$85.00 - $105.00',
        coreLogic: '欧美电力公司年度采购季启动，长协合同价格中枢向 90 美元上方全面上移。',
        keyTriggers: ['美英欧核能增产法案拨款落地', '科技巨头新的直连核电站 PPA 协议签署'],
        actionTactics: '中线捂紧筹码，目标看破 100 美元关口。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$100.00 - $150.00',
        coreLogic: 'COP28 联合国气候大会确立 2050 年全球核能发电总量翻三倍的目标，供需硬缺口长达十年。',
        keyTriggers: ['小型模块化反应堆 (SMR) 获得商业运营牌照', '全球战略铀储备建立'],
        actionTactics: '作为未来 5 年能源转型确定性最高的核心战略资产长跑。'
      }
    },
    driverComponents: [
      { name: '全球核能翻倍与AI直连发电', weight: 45, value: '微软/谷歌签订长期核电协议', impact: 'Positive', description: '顶级商业信用担保。', plainMeaning: '科技巨头点名只要核能供电，电厂抢着买铀。' },
      { name: '开采原料硫酸结构性短缺', weight: 35, value: '哈萨克斯坦采掘遭遇瓶颈', impact: 'Positive', description: '矿石在地下融化不出来。', plainMeaning: '没有硫酸冲洗矿石就挖不出铀，产量被动下降。' },
      { name: '美国立法切断俄罗斯进口', weight: 20, value: '封杀俄罗斯 24% 浓缩供应', impact: 'Positive', description: '加剧西方现货供给抢夺。', plainMeaning: '不准买俄罗斯货，欧美只能高价疯抢西方现货。' }
    ],
    keyCatalysts: ['UxC 官方铀现货报价', '美国能源部低浓缩铀 HALEU 研发补贴清单'],
    institutionalPositioning: { cotNetLongContracts: 41000, etfFlow7dUSD: '+$140M', retailSentiment: '85% 坚定看多' }
  },

  // =========================================================================
  // 第二大类：🪙 贵金属与工业战略金属 (Precious & Industrial & Strategic Metals)
  // =========================================================================
  {
    symbol: 'XAUUSD',
    assetName: '现货黄金 (Spot Gold)',
    plainTitle: '人类五千年抗通胀硬通货与去美元化之王 (现货黄金)',
    category: '贵金属',
    subCategory: '实物避险与央行信用之锚',
    currentPrice: 2914.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 94,
    coreDriverThesis: '全球央行持续买金去美元化 ＋ 实际利率下行周期 ＋ 欧美主权债务雪球不可逆稀释。',
    plainLanguageThesis: '黄金不是靠图表K线涨跌的，而是靠“真金白银的需求”：全球央行都在狂囤黄金防范美元制裁，加之美国国债已破 36 万亿美元，法币贬值不可逆。',
    plainActionSummary: '【操作指南】：大趋势坚定看多，短期每次回踩支撑位都是上车时机，不盲目追高，顺势做多。',
    futuresContractSpecs: {
      exchange: 'COMEX / CME (纽约商品交易所)',
      contractSize: '100 金衡盎司 / 手',
      tickSize: '0.10 美元/盎司 (10 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 11,000 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '期现平水微升'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：高品位矿山枯竭与地缘储备不可逆期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '中国、印度、中东多国央行连续数季度净增持，全球金条金币现货溢价维持高位。',
      supplyBottleneck: '全球原生金矿平均入选品位从 20 年前的 5g/t 暴跌至目前的 1.1g/t，全维持成本 AISC 突破 1400 美元。',
      demandTransformation: '金砖国家贸易本币结算及储备资产多元化，打破过去“美债收益率涨黄金必跌”的旧范式。',
      costFloorAndCeiling: {
        cashCostFloor: '$1,850 - $1,950 / 盎司 (全球头部金矿 AISC 完全开采成本线与边际安全垫)',
        profitMarginCeiling: '$3,500 - $4,000 / 盎司 (对标美债利息支出占财政收入 30% 估值中枢)'
      },
      policyAndGeopoliticalMoat: '国际清算银行巴塞尔协议 III (Basel III) 正式将实物黄金列为零风险 Tier 1 一级核心资产。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2,880 - $2,960',
        coreLogic: '短期受美联储降息频次指引及中东地缘政治摩擦驱动，日线沿 20 日均线稳步上推。',
        keyTriggers: ['美国核心 PCE 通胀月率', '非农时薪增速', '中东突发事件避险买盘'],
        actionTactics: '回踩 $2,880-$2,900 分批接多，止损设在 $2,860，目标直指 $2,950。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2,900 - $3,200',
        coreLogic: '全球实际利率 (10Y TIPS) 回落，持有非生息实物黄金的机会成本大幅削弱。',
        keyTriggers: ['美联储议息会议降息决议', '西方黄金 ETF 资金净流入规模放量'],
        actionTactics: '以逢低定投加仓为主，不轻易在牛市主升浪中全额做空。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3,200 - $4,000',
        coreLogic: '法币信用不可逆泛滥与国际货币体系重塑，黄金作为终极无违约风险资产超级大周期。',
        keyTriggers: ['美国主权债务突破 40 万亿美元', '全球外汇储备中黄金占比超越欧元'],
        actionTactics: '任何家庭或机构宏观对冲投资组合中必须底仓配置 15%-25%。'
      }
    },
    driverComponents: [
      { name: '全球央行购金去美元化', weight: 45, value: '连续3年净购金超 1000 吨', impact: 'Positive', description: '形成终极硬底座。', plainMeaning: '多国央行不要美债只要黄金，金条运回本国。' },
      { name: '美国国债不可逆膨胀稀释', weight: 35, value: '美债突破 36 万亿美元', impact: 'Positive', description: '法币信用对冲刚需。', plainMeaning: '纸币每天都在被稀释印钞，黄金越存越稀缺。' },
      { name: '实际利率宽松预期下行', weight: 20, value: '美联储步入降息周期', impact: 'Positive', description: '降低持有非生息黄金成本。', plainMeaning: '存银行利息降了，买黄金的人自然多了。' }
    ],
    keyCatalysts: ['世界黄金协会 (WGC) 官方季度供需白皮书', '美联储 FOMC 利率点阵图'],
    institutionalPositioning: { cotNetLongContracts: 265000, etfFlow7dUSD: '+$310M', retailSentiment: '78% 乐观' }
  },
  {
    symbol: 'COPPER',
    assetName: '高级期铜连续 (High Grade Copper)',
    plainTitle: '全球宏观经济体温计与新能源电气化命脉 (铜博士)',
    category: '贵金属',
    subCategory: '工业制造与电网基建',
    currentPrice: 4.42,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 84,
    coreDriverThesis: '电网绿色重构与 AI 算力电力母线 ＋ 智利/秘鲁老矿山品位衰退 ＋ 环保关停巴拿马大矿。',
    plainLanguageThesis: '铜被称为“铜博士”，因为它是唯一能准确诊断世界经济景气度的金属。现代工业所有发电机、电线电缆、电动汽车电机、AI 算力中心变压器必须用铜！然而全球主要铜矿开采了上百年，矿石品位极度下降，新矿从发现到投产需要 12-15 年，供需面临世纪性断层。',
    plainActionSummary: '【操作指南】：4.20-4.30 美元区间是全球矿业边际投产成本线，逢回调果断低吸做多。',
    futuresContractSpecs: {
      exchange: 'COMEX / CME (亦有 LME 伦铜)',
      contractSize: '25,000 磅 / 手',
      tickSize: '0.0005 美元/磅 (12.5 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 5,800 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '极度紧俏升水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：老旧矿山开采品位断崖式下降期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '中国保税区与上海期货交易所显性库存稳步去化，LME 注册仓单跌破历史警戒线。',
      supplyBottleneck: '全球第一大铜矿智利 Escondida 品位降至 0.5% 以下，巴拿马 Cobre Panama 矿山停产抽走 40 万吨现货。',
      demandTransformation: '每辆电动汽车用铜量是燃油车的 4 倍，一座 1GW 的 AI 超级数据中心需消耗近 5 万吨铜。',
      costFloorAndCeiling: {
        cashCostFloor: '$3.80 - $4.00 / 磅 (刺激全球深井地下铜矿开发的最低全成本红线)',
        profitMarginCeiling: '$5.50 - $6.20 / 磅 (超过将引发铝代铜技术替代与下游线缆企业抵制)'
      },
      policyAndGeopoliticalMoat: '智利提高铜矿开采特许权使用费 (Mining Royalty) 法律及全球 ESG 环保审批。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$4.30 - $4.65',
        coreLogic: '中国电网投资提速，下游铜杆开工率上升，冶炼厂粗炼费 (TC/RC) 暴跌至零美元逼迫冶炼厂联合减产。',
        keyTriggers: ['铜精矿现货 TC 费用指引', 'LME 铜注销仓单占比', '中国制造业 PMI'],
        actionTactics: '回踩 $4.35 分批多，止损 $4.20，目标 $4.60。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$4.50 - $5.20',
        coreLogic: '全球央行协同降息刺激全球制造业与新能源装机，供需缺口将在下半年集中爆发。',
        keyTriggers: ['智利国家铜业公司 (Codelco) 产量修复不及预期', 'AI 算力电力基础设施招标放量'],
        actionTactics: '逢波段回调加大持仓，长线多单坚定持有。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$5.20 - $7.00',
        coreLogic: '国际铜业协会预测 2030 年全球精炼铜供应缺口将达 500 万吨，大宗超级周期无可替代。',
        keyTriggers: ['全球能源转型法律强制要求', '全球主要铜矿山资本开支见顶'],
        actionTactics: '宏观大宗投资组合中排名前三的核心进攻品种，长线复利空间巨大。'
      }
    },
    driverComponents: [
      { name: '全球铜矿冶炼加工费归零', weight: 45, value: 'TC 跌破 5 美元/吨极端缺矿', impact: 'Positive', description: '冶炼厂无米下锅被迫减产。', plainMeaning: '矿石太少冶炼厂抢着赔钱干活，最终只能关停。' },
      { name: 'AI 算力中心与绿色电网', weight: 35, value: '用铜需求年均复合增长 7%', impact: 'Positive', description: '新旧动能双击。', plainMeaning: '造算力中心和风光电网要消耗海量的铜电线。' },
      { name: '中国房地产新开工低迷', weight: 20, value: '传统建筑水管电缆需求弱化', impact: 'Negative', description: '部分抵消工业增量。', plainMeaning: '房子建得少了，传统盖楼用铜有所减少。' }
    ],
    keyCatalysts: ['国际铜业研究组织 (ICSG) 供需月报', '智利铜业委员会 (Cochilco) 产量报告'],
    institutionalPositioning: { cotNetLongContracts: 68000, etfFlow7dUSD: '+$185M', retailSentiment: '75% 极度看好' }
  },
  {
    symbol: 'LITHIUM',
    assetName: '电池级碳酸锂连续 (Lithium Carbonate)',
    plainTitle: '动力电池能量核心与轻量化白色石油 (碳酸锂)',
    category: '贵金属',
    subCategory: '新能源战略金属',
    currentPrice: 78500.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 70,
    coreDriverThesis: '高成本锂云母与非洲非洲手采矿出清停产 ＋ 动力电池储能装机高增长 ＋ 盐湖提锂低成本托底。',
    plainLanguageThesis: '碳酸锂是锂电池不可或缺的灵魂，过去三年经历了一场从 60 万吨暴跌到 7 万吨的超级过山车！如今价格已经跌破中国江西锂云母矿的现金开采成本（8-9 万元/吨），大量小矿山被迫停产关门，供需正在经历极其痛苦的左侧出清与筑底。',
    plainActionSummary: '【操作指南】：7.2-7.5 万元是全产业链现金成本绝对底线，中长线投资者可开始左侧定投。',
    futuresContractSpecs: {
      exchange: 'GFEX (广期所) / CME (微型)',
      contractSize: '1 吨 / 手',
      tickSize: '50 元/吨 (50 CNY/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 12,000 人民币 / 手',
      tradingHours: '北京时间 09:00 - 15:00',
      basisStatus: '现货贴水收窄'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段④：上一轮产能过剩出清与成本倒挂减产期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '电池厂与正极材料厂维持极限低库存（维持 7-10 天安全库存），拒绝盲目囤货。',
      supplyBottleneck: '南美盐湖提锂虽成本极低（3-4 万元），但环保扩产受水资源配额严格审查，建设周期超 4 年。',
      demandTransformation: '全球储能电站（ESS）招标装机爆发式增长 50% 以上，逐渐接棒纯电车成为需求第二增长极。',
      costFloorAndCeiling: {
        cashCostFloor: '70,000 - 75,000 元/吨 (江西低品位锂云母与澳洲精矿现金生产成本线)',
        profitMarginCeiling: '110,000 - 130,000 元/吨 (超过将诱发全球封存矿山迅速复产)'
      },
      policyAndGeopoliticalMoat: '智利国家锂业战略（公私合营国有化）与美国《通胀削减法案》(IRA) 本土化供应链限制。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '75,000 - 84,000 元/吨',
        coreLogic: '短期受下游正极材料厂月初刚需补库及大厂减产消息面提振，维持低位震荡整理。',
        keyTriggers: ['广期所周度注册仓单变动', '江西主流锂盐厂检修停产通知'],
        actionTactics: '靠近 7.5 万元分批试多，反弹至 8.3 万元上方减仓，不盲目追涨。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '72,000 - 95,000 元/吨',
        coreLogic: '高成本供给产能逐步出清，储能旺季抢装拉动供需拐点初现。',
        keyTriggers: ['全球高成本矿山正式破产重整案例', '固态电池材料验证进展'],
        actionTactics: '适合中长线资金以定投方式在 7.5-8 万元区间收集廉价筹码。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '90,000 - 130,000 元/吨',
        coreLogic: '能源转型与全社会储能电气化必经之路，供需再平衡后价格向合理工业品利润中枢回归。',
        keyTriggers: ['全球新能源乘用车销量突破 2500 万辆', '储能系统单瓦时成本破 0.3 元'],
        actionTactics: '经历残酷洗盘后的战略反转标的，具备 2-3 倍弹性潜力。'
      }
    },
    driverComponents: [
      { name: '高成本锂云母矿山停产出清', weight: 45, value: '亏损导致行业减产 15%', impact: 'Positive', description: '封杀继续下跌空间。', plainMeaning: '挖一吨亏两万，很多小老板熬不住关门停产了。' },
      { name: '全球储能装机天量增长', weight: 35, value: '大型储能项目增速超 55%', impact: 'Positive', description: '弥补电车增速放缓。', plainMeaning: '太阳能风能电站需要海量储能大电池存电。' },
      { name: '南美低成本盐湖新增产能', weight: 20, value: '南美盐湖成本仅 4 万元/吨', impact: 'Negative', description: '限制价格暴涨上限。', plainMeaning: '智利阿根廷盐湖成本极低，产量慢慢在增加。' }
    ],
    keyCatalysts: ['SMM 上海有色网电池级碳酸锂报价', '澳大利亚 Pilbara 锂精矿拍卖结果'],
    institutionalPositioning: { cotNetLongContracts: 18000, etfFlow7dUSD: '+$25M', retailSentiment: '45% 悲观分歧' }
  },

  // =========================================================================
  // 第三大类：🌾 农产品与主粮谷物 (Agricultural Grains & Feed)
  // =========================================================================
  {
    symbol: 'SOYBEAN',
    assetName: '美大豆连续期货 (CBOT Soybean)',
    plainTitle: '全球蛋白质饲料之王与中美农产品经贸晴雨表 (美大豆)',
    category: '农产品',
    subCategory: '农产油脂与大宗蛋白',
    currentPrice: 1020.50,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 75,
    coreDriverThesis: '南美巴西创纪录大丰产压低成本 ＋ 生物柴油用豆油强制掺混托底 ＋ 中美采购节奏博弈。',
    plainLanguageThesis: '大豆是全人类养殖肉类（猪、鸡、牛）最关键的蛋白质饲料！全世界大豆主要看两大粮仓：美国和巴西。今年巴西气候良好，大豆收割创下历史新高；但美国农业部强制推行生物柴油，榨油需求极其旺盛，大豆价格在 1000 美分整数关口形成了坚固铁底。',
    plainActionSummary: '【操作指南】：1000 美分以下是美国农户种植成本线，下轨做多胜率极高，1080 美分止盈。',
    futuresContractSpecs: {
      exchange: 'CBOT / CME (芝加哥期货交易所)',
      contractSize: '5,000 蒲式耳 / 手 (约 136 吨)',
      tickSize: '0.25 美分/蒲式耳 (12.5 美元/手)',
      settlementType: '实物仓单交割 (Physical Delivery)',
      marginRequirement: '约 2,800 美元 / 手',
      tradingHours: '北京时间 09:00 - 14:15, 20:30 - 次日 02:20',
      basisStatus: '平水微贴'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段②：南美扩产与全球大丰产峰值期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '全球大豆期末库存消费比达到 32% 历史偏高区间，南美港口贴水跌至低谷。',
      supplyBottleneck: '巴西马托格罗索州运输公路升级完毕，桑托斯港吞吐瓶颈大幅缓解。',
      demandTransformation: '生物航空煤油 (SAF) 与可再生柴油 (RD) 推动压榨厂将豆油价值提升，豆粕蛋白需求维持刚性。',
      costFloorAndCeiling: {
        cashCostFloor: '950 - 980 美分/蒲式耳 (美国中西部农场租地+化肥农药种子完全种植成本)',
        profitMarginCeiling: '1,200 - 1,280 美分/蒲式耳 (超过将导致全球大面积增种扩垦)'
      },
      policyAndGeopoliticalMoat: '美国农业部 (USDA) 农场补贴法案与中美经贸农业采购协议执行进度。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '990 - 1,045 美分/蒲式耳',
        coreLogic: '短期受美豆出口检验周报、中国采购订单放量及南美播种进度扰动。',
        keyTriggers: ['USDA 周一出口检验数据', '中国中粮/中储粮采购询盘公布'],
        actionTactics: '回踩 1,000 美分整数关口轻仓做多，止损 975，目标 1,040。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '1,010 - 1,120 美分/蒲式耳',
        coreLogic: '美国大豆压榨利润高企拉动现货消耗，拉尼娜气候对南美大豆灌浆期形成潜在减产威胁。',
        keyTriggers: ['USDA 供需月报 WASDE 下调单产', '阿根廷干旱天气炒作'],
        actionTactics: '逢波段回调加多，博弈拉尼娜天气升水溢价。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '1,050 - 1,250 美分/蒲式耳',
        coreLogic: '全球人口增长与发展中国家肉蛋奶消费升级，支撑全球蛋白粕年均 3% 刚性消费复合增速。',
        keyTriggers: ['生物燃料强制掺混比例由 10% 提升至 15%', '化肥核心原料钾肥磷肥通胀'],
        actionTactics: '大宗农产品周期底部明朗，适合作为农产品组合中的基石仓位配置。'
      }
    },
    driverComponents: [
      { name: '美国农户种植完全成本线', weight: 45, value: '1000 美分形成刚性财务地板', impact: 'Positive', description: '低于此价农户惜售入库。', plainMeaning: '跌破1000美分美国农民亏本，宁可放粮仓也不卖。' },
      { name: '可再生生物柴油政策倾斜', weight: 35, value: '美豆油压榨需求年增 8%', impact: 'Positive', description: '榨油利润极其丰厚。', plainMeaning: '豆油拿去提炼环保柴油，工厂疯狂收购大豆。' },
      { name: '巴西大豆创纪录丰产压顶', weight: 20, value: '巴西大豆产量突破 1.6 亿吨', impact: 'Negative', description: '全球货源极度充沛。', plainMeaning: '南美地大物博大丰收，仓库里货很多。' }
    ],
    keyCatalysts: ['USDA 每月公布的 WASDE 世界农业供需预测月报', 'CFTC 大豆持仓报告'],
    institutionalPositioning: { cotNetLongContracts: 38000, etfFlow7dUSD: '+$45M', retailSentiment: '56% 中性偏多' }
  },
  {
    symbol: 'CORN',
    assetName: 'CBOT 美玉米连续 (CBOT Corn)',
    plainTitle: '全球能量饲料霸主与燃料乙醇工业命脉 (玉米连续)',
    category: '农产品',
    subCategory: '能量饲料与工业深加工',
    currentPrice: 432.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 74,
    coreDriverThesis: '美国中西部超级单产丰收 ＋ 40% 玉米进入燃料乙醇汽油掺混 ＋ 420 美分成本铁底。',
    plainLanguageThesis: '玉米是全世界喂猪喂鸡最主要的能量饲料，更是美国车用乙醇汽油（E10）的核心原料。美国每天有四成玉米被送进酒精厂发酵做成汽油添加剂。420 美分是美国衣阿华州农场的种植保本底线，跌到这里农户惜售不卖。',
    plainActionSummary: '【操作指南】：415-425 美分坚决做多，450-465 美分逢高兑现，区间波段操作。',
    futuresContractSpecs: {
      exchange: 'CBOT / CME (芝加哥期货交易所)',
      contractSize: '5,000 蒲式耳 / 手 (约 127 吨)',
      tickSize: '0.25 美分/蒲式耳 (12.5 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 1,800 美元 / 手',
      tradingHours: '北京时间 09:00 - 14:15, 20:30 - 次日 02:20',
      basisStatus: '微幅贴水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段②：农业机械化种业升级与高单产释放期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '全美收割完毕，商业农场筒仓满载，现货基差处于季节性偏弱区间。',
      supplyBottleneck: '密西西比河水位枯水期影响驳船驳运运费，造成内陆现货堆积。',
      demandTransformation: '全球航空可持续燃料 (SAF) 正在测试玉米淀粉路线，打开未来长周期工业需求想象空间。',
      costFloorAndCeiling: {
        cashCostFloor: '410 - 425 美分/蒲式耳 (美国农场直接现金投入保本线)',
        profitMarginCeiling: '520 - 550 美分/蒲式耳 (超过将引发下游养殖亏损与深加工开工下调)'
      },
      policyAndGeopoliticalMoat: '美国可再生燃料标准 (RFS) 强制要求全美汽油掺混 10% 燃料乙醇。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '420 - 445 美分/蒲式耳',
        coreLogic: '短期受全美收割尾声、乙醇周度产量上升及墨西哥大宗采购订单支撑。',
        keyTriggers: ['EIA 周度燃料乙醇产量与库存报告', '每周美国农业部出口销售'],
        actionTactics: '回踩 425 美分低吸做多，止损 412，目标 442。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '435 - 480 美分/蒲式耳',
        coreLogic: '春播季节农户因玉米比价劣势改种大豆，导致新季玉米种植意向面积预期缩减。',
        keyTriggers: ['3月底 USDA 种植意向报告 (Prospective Plantings)', '黑海粮食外运通道地缘风险'],
        actionTactics: '中线持有，在种植意向报告发布前完成多头建仓。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '450 - 550 美分/蒲式耳',
        coreLogic: '全球工业深加工（聚乳酸PLA可降解塑料、玉米淀粉糖）渗透率扩张，长期价值中枢稳步上抬。',
        keyTriggers: ['全球生猪养殖产能恢复存栏扩张', '国际原油暴涨拉动生物乙醇溢价'],
        actionTactics: '作为低估值、高安全边际的安全防御型大宗商品配置。'
      }
    },
    driverComponents: [
      { name: '40% 玉米强制用于汽油掺混', weight: 45, value: '燃料乙醇消费极度刚性', impact: 'Positive', description: '政策锁死天量工业需求。', plainMeaning: '美国开车加油必须掺10%玉米酒精，需求绝不会归零。' },
      { name: '美国农场现金成本硬支撑', weight: 35, value: '420 美分化肥种子成本线', impact: 'Positive', description: '跌穿将促发全美大减产。', plainMeaning: '再跌农民就不干了，下个季度少种玉米改种豆。' },
      { name: '乌克兰与巴西二季玉米出口', weight: 20, value: '南美二茬玉米弥补全球缺口', impact: 'Negative', description: '压制国际买盘溢价。', plainMeaning: '巴西一年能收两次玉米，国际竞争货源多。' }
    ],
    keyCatalysts: ['USDA 供需月报 WASDE', 'EIA 燃料乙醇周报'],
    institutionalPositioning: { cotNetLongContracts: 22000, etfFlow7dUSD: '+$18M', retailSentiment: '50% 胶着观望' }
  },

  // =========================================================================
  // 第四大类：☕ 软商品与经济作物 (Soft Commodities & Plantations)
  // =========================================================================
  {
    symbol: 'FCPO',
    assetName: '马来西亚棕榈油期货 (BMD Crude Palm Oil)',
    plainTitle: '全球热带油脂定价王座与生物柴油核心期货 (大马棕油)',
    category: '软商品',
    subCategory: '热带农产与生物柴油',
    currentPrice: 4860.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 88,
    coreDriverThesis: '印尼 B40 生柴强制掺混吞噬出口配额 ＋ 马印老龄化树龄退化产量见顶 ＋ 季风降雨扰动。',
    plainLanguageThesis: '大马衍生品交易所 (BMD) 的 FCPO 是全世界交易量最大的热带植物油期货合约！全球食品加工（方便面、巧克力、烘焙）和印尼汽车生物柴油离不开棕油。印尼实施 B40 政策将大量原油就地转化为车用柴油，导致全球出口断崖式减少，大宗食用油供需极其紧张。',
    plainActionSummary: '【操作指南】：逢马来西亚棕榈油局 (MPOB) 月报前震荡低吸做多，关注 4,600-4,700 令吉强支撑。',
    futuresContractSpecs: {
      exchange: 'BMD (马来西亚衍生品交易所 / Bursa Malaysia Derivatives)',
      contractSize: '25 公吨 / 手',
      tickSize: '1 令吉 / 吨 (25 MYR/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 6,000 令吉 / 手',
      tradingHours: '日盘 10:30-12:30, 14:30-18:00; 夜盘 21:00-23:30 (大马时间)',
      basisStatus: '强劲现货升水 Backwardation (现货极度紧俏)'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：油棕树龄严重老化（超20年）与新开垦归零期',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: '大马与印尼两大产区港口库存处于过去 4 年低位，印度排灯节与中国双节备货持续消耗现货。',
      supplyBottleneck: '欧盟零毁林法案 (EUDR) 严禁新开垦原始热带雨林，种植园无法扩建，翻种新树需 4 年才能初产。',
      demandTransformation: '印尼作为全球第一大产国，其国内 B40 生柴计划年强制消耗超 1200 万吨，直接抹去全球可贸易净出口。',
      costFloorAndCeiling: {
        cashCostFloor: '3,200 - 3,500 令吉/吨 (大马优质种植园综合完全生产成本线)',
        profitMarginCeiling: '5,500 - 6,000 令吉/吨 (倒挂过大将引发印度大买家转向大豆油替代)'
      },
      policyAndGeopoliticalMoat: '印尼贸易部与财政部每月动态调整出口关税 (Export Levy/Tax) 及国内市场义务 (DMO)。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '4,750 - 5,080 令吉/吨',
        coreLogic: '短期受季风季洪涝影响鲜果串 (FFB) 采摘运输、MPOB 月度官方库存下降驱动。',
        keyTriggers: ['MPOB 每月 10 日官方产销报告', '船运调查机构 ITS / AmSpec 前 20 天出口环比数据', '大连豆油联动'],
        actionTactics: '回踩 4,780-4,820 令吉区间做多，突破 5,000 减半仓止盈，防守止损设在 4,700。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '4,650 - 5,400 令吉/吨',
        coreLogic: '印尼 B40 正式落地审查，东南亚原棕油出口供应持续处于硬紧平衡状态。',
        keyTriggers: ['印尼能源部全面推行 B40 检查', '全球原油走强推升生物燃料溢价'],
        actionTactics: '中线顺应多头大趋势，不轻易逆势开空，回调均是低吸点。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '4,800 - 6,200 令吉/吨',
        coreLogic: '全球植物油脂面积天花板封死，棕榈油由廉价食用油跃升为战略能源大宗。',
        keyTriggers: ['航空可持续航空燃料 (SAF) 认证棕榈基', '马印老树淘汰率超 30%'],
        actionTactics: '大宗商品中长期阿尔法收益最强品种之一，建议战略重配。'
      }
    },
    driverComponents: [
      { name: '印尼强制推行 B40 生物柴油', weight: 45, value: '年锁死超 1200 万吨现货', impact: 'Positive', description: '国内自用截留大量出口。', plainMeaning: '印尼自己拿去开车烧掉了，不肯卖给外国。' },
      { name: '种植园树龄老龄化严重', weight: 35, value: '新开垦面积接近零增长', impact: 'Positive', description: '老树单产逐年下滑。', plainMeaning: '树太老结不出果子，树林又不能随便砍伐扩建。' },
      { name: '印度大豆油替代博弈', weight: 20, value: '豆棕价差倒挂制约买盘', impact: 'Neutral', description: '过贵时买家稍微减少采购。', plainMeaning: '太贵的时候印度买家会部分少买点，形成短线压力。' }
    ],
    keyCatalysts: ['MPOB 官方月度产销库存报告', '印尼政府调高出口关税参考价'],
    institutionalPositioning: { cotNetLongContracts: 52000, etfFlow7dUSD: '+$110M', retailSentiment: '75% 强烈看多' }
  },
  {
    symbol: 'COCOA',
    assetName: '纽约可可连续期货 (ICE Cocoa)',
    plainTitle: '西非极端干旱与巧克力奢侈化超级牛市 (纽约可可)',
    category: '软商品',
    subCategory: '热带软商品与消费甜品',
    currentPrice: 8650.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 86,
    coreDriverThesis: '科特迪瓦与加纳占全球 60% 供给 ＋ 枝梢肿胀病疫情摧毁树根 ＋ 现货逼仓结构性缺货。',
    plainLanguageThesis: '可可是近两年全球涨幅最夸张的大宗商品（曾一年暴涨超三倍突破 1 万美元）！全世界六成以上的可可豆都产自西非两个小国（科特迪瓦和加纳）。由于数十年来可可树遭到致死性“黑荚病”和“枝梢肿胀病毒”肆虐，加上极端干旱，大批种植园彻底绝收。欧洲巧克力巨头只能在现货市场以天价抢购仓单。',
    plainActionSummary: '【操作指南】：高波动性品种，单边大牛市底色未变，建议回踩支撑分批做多，严格控制仓位。',
    futuresContractSpecs: {
      exchange: 'ICE (纽约洲际交易所) / 伦敦 ICE',
      contractSize: '10 公吨 / 手',
      tickSize: '1 美元/吨 (10 美元/手)',
      settlementType: '实物仓单提货 (Physical Delivery)',
      marginRequirement: '约 9,500 美元 / 手',
      tradingHours: '北京时间 16:45 - 次日 01:30',
      basisStatus: '历史极度逼仓升水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：疫病大爆发导致树种永久灭失与老龄化期',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: '欧洲与北美各大港口可可豆注册仓单跌至 40 年最低点，现货升水创历史奇迹。',
      supplyBottleneck: '染病树木必须连根拔除并休耕 3-5 年才能重新栽种，新树苗到挂果采摘需要整整 5 年。',
      demandTransformation: '全球巧克力消费端虽涨价，但消费者单价敏感度低，加工厂停工成本远大于高价采购原料。',
      costFloorAndCeiling: {
        cashCostFloor: '4,500 - 5,500 美元/吨 (西非政府调高农户农门保底收购价后的新底座)',
        profitMarginCeiling: '10,500 - 12,000 美元/吨 (历史上逼仓极限天花板)'
      },
      policyAndGeopoliticalMoat: '科特迪瓦与加纳可可联合委员会对出口强制征收“生活收入差异溢价 (LID)”每吨 400 美元。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$8,200 - $9,200',
        coreLogic: '西非主要港口周度到港量同比暴跌 25%，跨国粮商为满足现货交割不得不持续溢价扫货。',
        keyTriggers: ['科特迪瓦港口每周可可豆到货量统计', '欧洲磨豆量 (European Grindings) 季报'],
        actionTactics: '回踩 $8,300 做多，止损设在 $7,800，目标看 $9,100。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$8,500 - $10,500',
        coreLogic: '2024/2025 新季中期作物减产已成定局，全球可可供需连续第四年录得巨大硬赤字。',
        keyTriggers: ['国际可可组织 (ICCO) 全球供需赤字修正', '欧美巧克力品牌全面提价通知'],
        actionTactics: '顺势做多，遇急跌洗盘均是难得加仓上车点。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$7,500 - $11,000',
        coreLogic: '气候变暖导致西非适宜种植可可的高海拔湿润区域永久萎缩，低价时代一去不复返。',
        keyTriggers: ['厄尔尼诺与拉尼娜极端气候轮替', '南美厄瓜多尔新增替代产能投产进度'],
        actionTactics: '软商品超级周期经典案例，维持长期资产超配。'
      }
    },
    driverComponents: [
      { name: '西非可可树严重病害与老化', weight: 50, value: '枝梢肿胀病导致不可逆减产', impact: 'Positive', description: '树死了没法瞬间长出来。', plainMeaning: '大批树木生病枯死，重新种要等整整五年。' },
      { name: '交易所实物可售仓单枯竭', weight: 30, value: '注册库存处于数十年低点', impact: 'Positive', description: '现货逼仓动能充沛。', plainMeaning: '市场上根本借不到现货交割，空头只能认赔买单。' },
      { name: '高价格对终端口味需求抑制', weight: 20, value: '巧克力制造商缩减纯可可含量', impact: 'Negative', description: '部分减少配方添加。', plainMeaning: '太贵了工厂只能少放点可可多放点糖。' }
    ],
    keyCatalysts: ['ICCO 国际可可组织供需评估报告', '西非主产区周度到港数据'],
    institutionalPositioning: { cotNetLongContracts: 29000, etfFlow7dUSD: '+$75M', retailSentiment: '70% 亢奋看多' }
  },
  {
    symbol: 'COFFEE',
    assetName: '阿拉比卡咖啡连续 (ICE Coffee C)',
    plainTitle: '全球打工人续命刚需与精品咖啡抗旱牛市 (阿拉比卡咖啡)',
    category: '软商品',
    subCategory: '热带饮品与都市消费',
    currentPrice: 288.40,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 85,
    coreDriverThesis: '巴西米纳斯吉拉斯州罕见干旱减产 ＋ 越南罗布斯塔咖啡减产外溢 ＋ 欧美烘焙商抢货。',
    plainLanguageThesis: '全世界写字楼每天喝的现磨咖啡就是阿拉比卡咖啡豆！全球近一半的阿拉比卡产自巴西。过去一年巴西遭遇了 70 年来最严重的高温干旱，咖啡树开花期遭遇火灾和落花，收成断崖式下滑。加上越南的平价罗布斯塔咖啡也因干旱减产，全球咖啡豆处于抢货狂欢中。',
    plainActionSummary: '【操作指南】：260-270 美分是强支撑平台，逢深度回调果断做多，目标直指 320 美分。',
    futuresContractSpecs: {
      exchange: 'ICE (纽约洲际交易所)',
      contractSize: '37,500 磅 / 手 (约 250 包 60公斤袋)',
      tickSize: '0.05 美分/磅 (18.75 美元/手)',
      settlementType: '实物仓单提货 (Physical Delivery)',
      marginRequirement: '约 6,500 美元 / 手',
      tradingHours: '北京时间 16:15 - 次日 01:30',
      basisStatus: '强升水 Backwardation'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：干旱脱水与花期受损导致产能断层期',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: 'ICE 交易所认证合格仓单跌至不到 80 万袋的历史脆弱警戒线。',
      supplyBottleneck: '巴西咖啡树灌浆受损后，树势修剪 (Pruning) 恢复需要整整两年。',
      demandTransformation: '全球精品咖啡连锁（星巴克、瑞幸、皮爷）在亚洲新兴市场以每年上万家门店疯狂扩张。',
      costFloorAndCeiling: {
        cashCostFloor: '180 - 200 美分/磅 (巴西机械化大农场全成本底线)',
        profitMarginCeiling: '330 - 350 美分/磅 (超过将引发下游烘焙商提价抵制)'
      },
      policyAndGeopoliticalMoat: '欧盟零毁林法案 (EUDR) 要求从 2025 年起每一批进口咖啡豆都具备卫星 GPS 原产地认证。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '275 - 305 美分/磅',
        coreLogic: '短期受巴西国家商品供应公司 (Conab) 下调产量预估、当地干旱少雨天气驱动。',
        keyTriggers: ['Conab 官方巴西作物勘测报告', '索玛特天气监测雨量预报'],
        actionTactics: '回踩 280 美分分批建多，止损 265，目标 300 整数关。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '280 - 330 美分/磅',
        coreLogic: '欧洲买家为应对 EUDR 政策生效提前大批量锁仓抢购合规现货，现货溢价狂飙。',
        keyTriggers: ['欧盟议会对 EUDR 执行宽限期的最终表决', '越南早熟豆开采价格'],
        actionTactics: '波段持有，突破 300 美分后上移止盈点。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '250 - 350 美分/磅',
        coreLogic: '全球气候波动常态化与第三世界都市白领咖啡消费习惯固化，推动大宗中枢长线上升。',
        keyTriggers: ['全球变暖导致咖啡适种面积减少 50%', '亚洲人均咖啡消费杯数翻倍'],
        actionTactics: '具备极强抗通胀与独立行情特性的软商品明珠，逢大回调坚定建仓。'
      }
    },
    driverComponents: [
      { name: '巴西主产区遭遇历史性干旱', weight: 45, value: '降水量较常年偏低 40%', impact: 'Positive', description: '开花期枯死导致坐果率骤降。', plainMeaning: '天公不下雨，咖啡树直接干死落花，结不出豆子。' },
      { name: '欧盟零毁林法案追溯溢价', weight: 35, value: 'EUDR 导致合规现货抢购', impact: 'Positive', description: '非合规豆无法进入欧洲。', plainMeaning: '欧洲买咖啡要查户口查卫星图，能进欧洲的豆子被哄抢。' },
      { name: '全球都市白领咖啡刚需', weight: 20, value: '全球年消费超 1.7 亿袋', impact: 'Positive', description: '消费粘性极高几无弹性。', plainMeaning: '上班族每天都要喝咖啡续命，涨点钱照样天天买。' }
    ],
    keyCatalysts: ['Conab 巴西农业部咖啡产量评估', 'ICE 认证咖啡仓单周报'],
    institutionalPositioning: { cotNetLongContracts: 34000, etfFlow7dUSD: '+$52M', retailSentiment: '72% 乐观' }
  },

  // =========================================================================
  // 第五大类：🥩 畜牧与肉类商品 (Livestock & Meats)
  // =========================================================================
  {
    symbol: 'LIVE_CATTLE',
    assetName: '活牛期货连续 (CME Live Cattle)',
    plainTitle: '肉类消费皇冠与全美牛群存栏历史低谷 (活牛连续)',
    category: '畜牧肉类',
    subCategory: '畜牧牲畜与高蛋白肉类',
    currentPrice: 188.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 87,
    coreDriverThesis: '全美肉牛存栏跌至 1951 年以来 73 年最低纪录 ＋ 牧场干旱导致母牛提前屠宰 ＋ 消费强劲。',
    plainLanguageThesis: '牛肉是全世界最难在短期内快速扩产的肉类！生一头小牛需要母牛怀胎 9 个多月，再育肥 18 个月才能出栏，整个繁育周期需要将近 3 年。由于过去三年美国西南部遭遇大旱，牧草干枯，牧场主养不起只能把能生小牛的母牛全卖了宰掉，导致全美牛群数量跌到了 70 年来的历史最低点！',
    plainActionSummary: '【操作指南】：肉牛处于史诗级供给真空期，回踩 182-184 美分果断做多，目标 200 美分。',
    futuresContractSpecs: {
      exchange: 'CME (芝加哥商业交易所)',
      contractSize: '40,000 磅 / 手 (约 18 吨)',
      tickSize: '0.025 美分/磅 (10 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 2,500 美元 / 手',
      tradingHours: '北京时间 22:30 - 次日 03:05',
      basisStatus: '高位紧平衡升水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段①：能繁母牛存栏见底 ➔ 重建牛群需要整整 3 年',
      inventoryCyclePhase: '被动去库存 (需求复苏·暴击做多点)',
      inventoryCycleDescription: '育肥场待出栏大牛数量持续走低，屠宰厂收购价格每周刷新历史高位。',
      supplyBottleneck: '肉牛生物学周期极其漫长，从留种母牛配种到最终牛排上桌至少需要 30-36 个月。',
      demandTransformation: '高蛋白低脂肪健康饮食理念普及，美国及亚洲中产阶层对原切牛排消费展现惊人粘性。',
      costFloorAndCeiling: {
        cashCostFloor: '165 - 170 美分/磅 (育肥场玉米精料+架子牛采购完全成本线)',
        profitMarginCeiling: '210 - 220 美分/磅 (超过将引发消费者部分转向鸡肉与猪肉替代)'
      },
      policyAndGeopoliticalMoat: '美国农业部食品安全检验局 (FSIS) 严苛的牛肉检验检疫与牧场可追溯标准。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '185.0 - 193.5 美分/磅',
        coreLogic: '短期受全美每周五育肥牛现货拍卖竞价走高、节假日牛肉烧烤消费拉动。',
        keyTriggers: ['USDA 周五牛群饲养报告 (Cattle on Feed)', '全美盒装牛肉切割批发价 (Boxed Beef Cutout)'],
        actionTactics: '回踩 186 美分逢低做多，止损 182，目标看 192。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '188.0 - 202.0 美分/磅',
        coreLogic: '牧场主开始保留青年母牛（Heifer）用于扩大配种，直接导致市场上短期可屠宰的肉牛进一步断崖式减少。',
        keyTriggers: ['牧场青年母牛留存率突破 40%', '饲料玉米价格低位降低育肥成本'],
        actionTactics: '顺势做多，享受母牛留种阶段特有的“越扩产短期越缺肉”的做多红利。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '190.0 - 220.0 美分/磅',
        coreLogic: '全美牛群规模重建至少要持续至 2027-2028 年，长期牛肉供给中枢居高不下。',
        keyTriggers: ['全美牛群普查报告确认存栏拐点', '全球优质牧草草场恢复情况'],
        actionTactics: '农牧产品中胜率与确定性最高的长牛品种，适合作为资产配置利器。'
      }
    },
    driverComponents: [
      { name: '73 年来最低肉牛存栏', weight: 50, value: '全美牛群规模降至 1951 年水平', impact: 'Positive', description: '供给端物理性极度短缺。', plainMeaning: '全美国的牛少到了70年最低纪录，真金白银缺牛。' },
      { name: '长达3年的生物繁殖周期', weight: 30, value: '怀胎9月育肥18月无法拔苗助长', impact: 'Positive', description: '产能无法瞬间补充。', plainMeaning: '机器能加班造，小牛必须妈妈怀胎慢慢生慢慢长。' },
      { name: '禽肉猪肉替代效应', weight: 20, value: '牛排价格太贵部分转买鸡肉', impact: 'Negative', description: '高价对销量的反噬。', plainMeaning: '牛肉太贵的时候部分家庭会多买点鸡肉代替。' }
    ],
    keyCatalysts: ['USDA 官方 Cattle on Feed 月报', '全美现金活牛实际成交价报告'],
    institutionalPositioning: { cotNetLongContracts: 46000, etfFlow7dUSD: '+$38M', retailSentiment: '70% 乐观' }
  },
  {
    symbol: 'LEAN_HOGS',
    assetName: '瘦肉猪连续期货 (CME Lean Hogs)',
    plainTitle: '全球大众肉类消费支柱与猪周期产能博弈 (瘦肉猪连续)',
    category: '畜牧肉类',
    subCategory: '畜牧牲畜与高蛋白肉类',
    currentPrice: 84.50,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 72,
    coreDriverThesis: '能繁母猪生产效能提升 ＋ 饲料玉米豆粕成本走低 ＋ 季节性烧烤消费淡旺季。',
    plainLanguageThesis: '猪肉是世界上最普及的平民肉类，其涨跌由著名的“猪周期”主导。一头母猪一年能生两窝、每窝 10-12 头小猪，只要半年就能出栏，所以猪的周期比牛快得多。当前由于饲料便宜、母猪产仔率提升，供给处于平稳充沛状态。',
    plainActionSummary: '【操作指南】：78-80 美分做多，88-92 美分逢高减仓，波段区间对待。',
    futuresContractSpecs: {
      exchange: 'CME (芝加哥商业交易所)',
      contractSize: '40,000 磅 / 手 (约 18 吨)',
      tickSize: '0.025 美分/磅 (10 美元/手)',
      settlementType: '现金结算 (Cash Settlement 基于 CME 瘦肉猪指数)',
      marginRequirement: '约 1,900 美元 / 手',
      tradingHours: '北京时间 22:30 - 次日 03:05',
      basisStatus: '季节性基差波动'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段②：集约化养殖与单产窝仔数（PSY）提升期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '规模化养殖场依靠基因育种和自动化温控，每窝成活小猪数达 11.5 头历史高位。',
      supplyBottleneck: '冬季非洲猪瘟 (ASF) 及蓝耳病疫情防控增加防疫洗消成本。',
      demandTransformation: '预制菜、培根香肠等深加工占比提升，平滑了生鲜肉的季节性消费波动。',
      costFloorAndCeiling: {
        cashCostFloor: '72 - 76 美分/磅 (现代化养殖场饲料+仔猪分摊保本底线)',
        profitMarginCeiling: '95 - 105 美分/磅 (超过将引发农户压栏惜售和二次育肥)'
      },
      policyAndGeopoliticalMoat: '加州第 12 号提案 (Proposition 12) 强制要求母猪养殖面积合规认证方可在加州销售。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '81.0 - 87.5 美分/磅',
        coreLogic: '短期受屠宰场日度屠宰量及周度猪肉出口（对墨西哥、日本）订单拉动。',
        keyTriggers: ['CME 瘦肉猪现货指数每日走势', 'USDA 周度猪肉出口销售'],
        actionTactics: '靠近 82 美分接多，86.5 美分止盈，快进快出。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '82.0 - 92.0 美分/磅',
        coreLogic: '春夏季户外野餐烧烤旺季来临，培根与排骨消费需求呈现确定性季节性反弹。',
        keyTriggers: ['全美生猪季度存栏报告 (Hogs and Pigs)', '夏季屠宰体重季节性下降'],
        actionTactics: '春季逢回调布局多单，博弈夏季传统消费旺季溢价。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '震荡 (Range/Neutral)',
        targetRange: '75.0 - 95.0 美分/磅',
        coreLogic: '规模化集团养殖平抑猪周期振幅，价格长期围绕全行业饲料边际成本中枢波动。',
        keyTriggers: ['饲料原料玉米大豆种植面积波动', '跨国生猪养殖龙头市占率扩张'],
        actionTactics: '适合作为波动率套利与跨期价差套利品种，不建议超长线无脑死多。'
      }
    },
    driverComponents: [
      { name: '低饲料成本支撑利润', weight: 45, value: '玉米大豆低位使养殖有利可图', impact: 'Neutral', description: '刺激适度扩产。', plainMeaning: '饲料便宜养猪赚钱，猪场不会大幅杀母猪。' },
      { name: '夏季传统烧烤消费旺季', weight: 35, value: '培根香肠消费季节性跳涨', impact: 'Positive', description: '每年二季度提振明显。', plainMeaning: '夏天老美喜欢户外烧烤聚餐，猪肉消费暴增。' },
      { name: '疫病与环保加州提案合规', weight: 20, value: 'Prop 12 提高养殖场准入门槛', impact: 'Positive', description: '淘汰落后小散户。', plainMeaning: '猪圈必须足够大不然不给卖，小散户被挤出市场。' }
    ],
    keyCatalysts: ['USDA 季度 Hogs and Pigs 生猪存栏调查报告', 'CME 瘦肉猪官方结算指数'],
    institutionalPositioning: { cotNetLongContracts: 19000, etfFlow7dUSD: '+$12M', retailSentiment: '52% 中立震荡' }
  }
];
