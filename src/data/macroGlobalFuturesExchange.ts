import { AssetDriverProfile } from '../types/macro';

/**
 * ============================================================================
 * 全球期货市场专属大宗商品与全衍生品核心数据库 (Global Futures Exchange Instruments)
 * 涵盖：
 * - 🇲🇾 BMD (马来西亚衍生品交易所: FCPO, FGLD, FPKO)
 * - 🇺🇸 CME / CBOT (芝加哥商品与期货交易所: 玉米, 大豆, 豆油, 豆粕, 小麦, 活牛, 育肥牛, 瘦肉猪)
 * - 🇺🇸 NYMEX / COMEX (纽约商业与商品交易所: WTI原油, 天然气, 取暖油, 汽油, 黄金GC, 白银SI, 铜HG, 铂金)
 * - 🇬🇧/🇺🇸 ICE (洲际交易所: 布伦特原油, 纽约可可, 阿拉比卡咖啡, 罗布斯塔咖啡, 11号原糖, 棉花2号, 橙汁)
 * - 🇬🇧 LME (伦敦金属交易所: 伦铜, 伦铝, 伦镍, 伦锡, 伦锌)
 * - 🇸🇬 SGX (新加坡交易所: 62% 铁矿石指数掉期, TSR20 橡胶期货)
 * ============================================================================
 */

export const GLOBAL_FUTURES_EXCHANGE_DATA: AssetDriverProfile[] = [
  // =========================================================================
  // 1. 🇲🇾 BMD (马来西亚衍生品交易所)
  // =========================================================================
  {
    symbol: 'BMD_FCPO',
    assetName: 'BMD 棕榈油期货主力合约 (Crude Palm Oil Futures)',
    plainTitle: '全球热带油脂定价王座与生物柴油核心期货 (BMD 棕油主力)',
    category: '期货市场',
    subCategory: 'BMD 马来西亚衍生品交易所',
    currentPrice: 4860.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 89,
    coreDriverThesis: '印尼 B40 生柴强制掺混吞噬出口配额 ＋ 马印老龄化树龄退化单产见顶 ＋ 季风降雨扰动。',
    plainLanguageThesis: '大马衍生品交易所 (BMD) 的 FCPO 是全世界交易量最大、最具流动性的植物油期货主力合约！全球食品加工（方便面、巧克力、烘焙）和印尼汽车生物柴油离不开棕油。印尼实施 B40 政策将大量原油就地转化为车用柴油，导致全球出口断崖式减少，大宗食用油供需极其紧张。',
    plainActionSummary: '【操作指南】：逢 MPOB 月报前震荡低吸做多，关注 4,600-4,700 令吉强支撑。',
    futuresContractSpecs: {
      exchange: 'BMD (马来西亚衍生品交易所)',
      contractSize: '25 公吨 / 手',
      tickSize: '1 令吉 / 吨 (25 MYR/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 6,000 令吉 / 手',
      tradingHours: '日盘 10:30-12:30, 14:30-18:00; 夜盘 21:00-23:30 (大马时间)',
      basisStatus: '强劲现货升水 Backwardation'
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
        coreLogic: '短期受季风季洪涝影响鲜果串采摘运输、MPOB 月度官方库存下降驱动。',
        keyTriggers: ['MPOB 每月10日官方产销报告', 'ITS / AmSpec 前20天出口环比数据', '大连豆油联动'],
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
      { name: '印尼强制推行 B40 生柴', weight: 45, value: '年锁死超 1200 万吨现货', impact: 'Positive', description: '国内自用截留大量出口。', plainMeaning: '印尼自己拿去开车烧掉了，不肯卖给外国。' },
      { name: '种植园树龄老龄化严重', weight: 35, value: '新开垦面积接近零增长', impact: 'Positive', description: '老树单产逐年下滑。', plainMeaning: '树太老结不出果子，树林又不能随便砍伐扩建。' },
      { name: '印度大豆油替代博弈', weight: 20, value: '豆棕价差倒挂制约买盘', impact: 'Neutral', description: '过贵时买家稍微减少采购。', plainMeaning: '太贵的时候印度买家会部分少买点，形成短线压力。' }
    ],
    keyCatalysts: ['MPOB 官方月度产销库存报告', '印尼政府调高出口关税参考价'],
    institutionalPositioning: { cotNetLongContracts: 52000, etfFlow7dUSD: '+$110M', retailSentiment: '75% 强烈看多' }
  },
  {
    symbol: 'BMD_FGLD',
    assetName: 'BMD 黄金期货合约 (Bursa Malaysia Gold Futures)',
    plainTitle: '令吉计价黄金风险对冲与东盟实物交割基准 (大马黄金期货)',
    category: '期货市场',
    subCategory: 'BMD 马来西亚衍生品交易所',
    currentPrice: 388.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 91,
    coreDriverThesis: '国际现货黄金牛市联动 ＋ 马币令吉汇率折算 ＋ 本地伊斯兰金融与财富避险配置。',
    plainLanguageThesis: '大马衍生品交易所 (BMD) 推出的以令吉结算的黄金期货合约！对于东南亚与马来西亚投资者而言，既能完全享受国际黄金暴涨的红利，又能规避美元兑换手续费和外汇管制风险，是本地机构对冲通胀的最佳利器。',
    plainActionSummary: '【操作指南】：顺应国际现货黄金 (XAUUSD) 大牛市节奏，逢低以令吉做多持仓。',
    futuresContractSpecs: {
      exchange: 'BMD (马来西亚衍生品交易所)',
      contractSize: '100 克 / 手 (99.99% 纯金)',
      tickSize: '0.05 令吉 / 克 (5 MYR/手)',
      settlementType: '现金结算 (基于伦敦金现货定盘价折算令吉)',
      marginRequirement: '约 1,800 令吉 / 手',
      tradingHours: '日盘 09:00-18:00; 夜盘 21:00-23:30 (大马时间)',
      basisStatus: '紧贴国际现货'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：全球主权法币泛滥与硬资产价值重塑期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '大马本地珠宝金店与银行实物金条需求持续旺盛，散户与机构积极配置保值。',
      supplyBottleneck: '全球原生金矿品位持续走低，开采提炼能耗与环保成本逐年递增。',
      demandTransformation: '伊斯兰金融合规黄金资产配置比重提升，成为多元化对冲法币波动的必选底仓。',
      costFloorAndCeiling: {
        cashCostFloor: '280 令吉/克 (折合国际矿山完全开采成本垫)',
        profitMarginCeiling: '500 令吉/克 (对标国际金价 3500 美元时的令吉折算中枢)'
      },
      policyAndGeopoliticalMoat: '马来西亚国家银行 (BNM) 健全的伊斯兰教法金融合规框架保障。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '380.0 - 398.0 令吉/克',
        coreLogic: '跟随 COMEX 黄金及美元兑令吉汇率波动，维持多头震荡上行格局。',
        keyTriggers: ['国际黄金 XAUUSD 突破 2900 美元', '美元兑令吉 USDMYR 汇率波动'],
        actionTactics: '回踩 382 令吉做多，止损 375，目标看 395。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '390.0 - 430.0 令吉/克',
        coreLogic: '美联储持续降息削弱美债收益率，全球资金加速涌入黄金 ETF 与现货市场。',
        keyTriggers: ['美联储连续降息两次确认', '全球央行购金总量公布'],
        actionTactics: '以波段持仓为主，逢调整果断加仓。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '430.0 - 520.0 令吉/克',
        coreLogic: '去美元化浪潮与全球主权债务扩张，黄金长期购买力大幅跑赢法币现金。',
        keyTriggers: ['国际金价迈向 3500 美元大关', '主权财富基金提升黄金储备'],
        actionTactics: '作为本地长期对抗通胀与资产保值的核心压舱石配置。'
      }
    },
    driverComponents: [
      { name: '国际现货黄金长周期牛市', weight: 60, value: '全球去美元化与央行狂购', impact: 'Positive', description: '直接决定基本价格。', plainMeaning: '全世界黄金都在大涨，大马黄金跟着水涨船高。' },
      { name: '美元兑令吉汇率联动', weight: 25, value: '汇率变动提供折算双向弹性', impact: 'Neutral', description: '令吉若贬值则金价额外受利好。', plainMeaning: '令吉如果贬值，本地黄金换算出来更贵。' },
      { name: '东盟本地避险实物需求', weight: 15, value: '大马金铺实物金条供不应求', impact: 'Positive', description: '提供坚挺现货支撑。', plainMeaning: '本地老百姓买金条金饰意愿很强。' }
    ],
    keyCatalysts: ['国际金价 XAUUSD 每日定盘价', '国家银行 BNM 汇率公布'],
    institutionalPositioning: { cotNetLongContracts: 15000, etfFlow7dUSD: '+$28M', retailSentiment: '80% 积极看多' }
  },

  // =========================================================================
  // 2. 🇺🇸 COMEX / NYMEX (纽约商品交易所与商业交易所)
  // =========================================================================
  {
    symbol: 'COMEX_GC',
    assetName: 'COMEX 黄金期货主力合约 (Gold Futures GC)',
    plainTitle: '华尔街与全球最高流动性黄金纸黄金交易中心 (COMEX 黄金)',
    category: '期货市场',
    subCategory: 'COMEX / CME 纽约商品交易所',
    currentPrice: 2928.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 95,
    coreDriverThesis: 'CFTC 机构投机多头持仓暴增 ＋ 美联储降息周期流动性外溢 ＋ 实物仓单交割提货意愿强。',
    plainLanguageThesis: 'COMEX 的 GC 合约是全世界机构对冲、投机、交割黄金最核心的战场！每天成交量高达数千亿美元。欧美大型对冲基金在此布下重兵，只要美联储开始降息放水，华尔街投行就会在此疯狂建仓黄金多单。',
    plainActionSummary: '【操作指南】：顺应大趋势做多，依托 20 日均线逢低建多，止损设在关键整数关口下方。',
    futuresContractSpecs: {
      exchange: 'COMEX / CME (纽约商品交易所)',
      contractSize: '100 金衡盎司 / 手',
      tickSize: '0.10 美元/盎司 (10 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 11,500 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '微幅升水 Contango'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：高品位矿山枯竭与地缘储备不可逆期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: 'COMEX 注册合格仓单（Eligible & Registered）去化明显，实物提现需求强劲。',
      supplyBottleneck: '全球原生金矿品位持续下降，南非与北美老矿山维持生产成本居高不下。',
      demandTransformation: '全球宏观基金将黄金作为对冲欧美主权债务不可逆膨胀的第一选择。',
      costFloorAndCeiling: {
        cashCostFloor: '$1,900 / 盎司 (全球头部黄金矿业巨头 AISC 完全边际成本)',
        profitMarginCeiling: '$3,800 / 盎司 (历史极端对标主权信用稀释估值极限)'
      },
      policyAndGeopoliticalMoat: '美国商品期货交易委员会 (CFTC) 严格的大额持仓报告 (COT) 监管体系。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2,890 - $2,980',
        coreLogic: '短期受美联储议息会议降息预期发酵，日线形成阶梯式上升形态。',
        keyTriggers: ['美国 CPI/PCE 月率', '非农就业新增人数', 'CFTC 投机净多头变动'],
        actionTactics: '回踩 $2,900 整数关口分批多，止损 $2,870，目标 $2,965。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2,950 - $3,250',
        coreLogic: '美联储持续降息，全球实际利率跌入深度负区间，黄金 ETF 被动买盘持续爆发。',
        keyTriggers: ['全球黄金 ETF 持仓恢复至历史高点', '美联储点阵图指引'],
        actionTactics: '波段持有为主，在季度性回调 3-5% 时加大头寸。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3,300 - $4,200',
        coreLogic: '全球主权信用货币价值稀释不可逆，黄金超级大牛市延续。',
        keyTriggers: ['美国国债利息支出超越国防预算', '全球央行黄金储备超越美元国债'],
        actionTactics: '核心战略资产，长期坚定超配。'
      }
    },
    driverComponents: [
      { name: '华尔街机构 CFTC 净多头', weight: 45, value: '投机多头持仓创 2 年新高', impact: 'Positive', description: '大资金单边做多共识。', plainMeaning: '大基金都在买黄金多头合约，资金面极其强大。' },
      { name: '美债实际利率持续回落', weight: 35, value: '10Y TIPS 收益率跌穿 1.8%', impact: 'Positive', description: '持有非生息资产机会成本骤降。', plainMeaning: '存银行和买美债利息少了，大笔钱转向黄金。' },
      { name: '美元指数阶段性反弹扰动', weight: 20, value: 'DXY 在 103-105 区间波动', impact: 'Neutral', description: '可能造成日线级别技术性回踩。', plainMeaning: '美元短线冲高时，黄金可能会被动技术性回调。' }
    ],
    keyCatalysts: ['CFTC 每周五公布的 Commitment of Traders (COT) 持仓报告', '美联储 FOMC 决议'],
    institutionalPositioning: { cotNetLongContracts: 278000, etfFlow7dUSD: '+$340M', retailSentiment: '82% 极度看好' }
  },
  {
    symbol: 'COMEX_SI',
    assetName: 'COMEX 白银期货主力合约 (Silver Futures SI)',
    plainTitle: '光伏太阳能刚需与高弹性贵金属暴涨先锋 (COMEX 白银)',
    category: '期货市场',
    subCategory: 'COMEX / CME 纽约商品交易所',
    currentPrice: 32.85,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 87,
    coreDriverThesis: '全球光伏 TOPCon/异质结银浆消耗爆发 ＋ 连续 4 年实物硬赤字 ＋ 金银比历史极值均值回归。',
    plainLanguageThesis: '白银是所有金属中导电性和导热性最好的元素！现在的太阳能光伏板每一块都必须刷上厚厚的银浆（耗银量大幅飙升）；而全球白银作为铅锌矿副产品，开采无法随意扩产。白银已经连续四年出现供不应求的硬缺口，一旦补涨爆发，弹性往往是黄金的 2-3 倍！',
    plainActionSummary: '【操作指南】：31.5-32.0 美元坚决做多，博弈金银比由 88 修复至 70 带来的超额收益。',
    futuresContractSpecs: {
      exchange: 'COMEX / CME (纽约商品交易所)',
      contractSize: '5,000 金衡盎司 / 手',
      tickSize: '0.005 美元/盎司 (25 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 8,500 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '极度紧俏'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：地面地上存量彻底消耗与伴生矿产量瓶颈期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '伦敦金银市场协会 (LBMA) 与 COMEX 可售白银库存连续三年净流出，显性库存告急。',
      supplyBottleneck: '全球逾 70% 白银为铅、锌、铜矿山的副产品，无法因白银涨价而独立盲目单独开采。',
      demandTransformation: '全球太阳能光伏电池年耗银量已突破 1.6 亿盎司，占全球总供应量比例逼近 20%。',
      costFloorAndCeiling: {
        cashCostFloor: '$22.00 - $24.00 / 盎司 (原生独立银矿现金完全生产成本线)',
        profitMarginCeiling: '$50.00 - $60.00 / 盎司 (1980/2011年两次历史历史大逼仓顶点)'
      },
      policyAndGeopoliticalMoat: '世界白银协会 (The Silver Institute) 发布的全球战略工业矿产报告。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$32.00 - $34.50',
        coreLogic: '短期受伦敦现货借贷利率 (Silver Lease Rate) 飙升、空头回补驱动。',
        keyTriggers: ['COMEX 注册仓单跌破 3000 万盎司', '光伏组件月度排产计划'],
        actionTactics: '回踩 $32.20 分批接多，止损设在 $31.00，目标看 $34.20。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$34.00 - $40.00',
        coreLogic: '黄金确立主升浪后，市场投机资金将大举涌入金银比套利，推升白银展现惊人弹性。',
        keyTriggers: ['金银比由 88 跌破 80', '全球白银 ETF 连续净买入'],
        actionTactics: '中线重仓持有，享受比黄金更猛烈的贝塔杠杆效应。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$40.00 - $55.00',
        coreLogic: '全球绿色低碳电气化导致实物白银不可逆消耗，长期结构性供需赤字无法解决。',
        keyTriggers: ['全球地面白银工业可售库存耗尽', '光伏与新能源车用银达峰'],
        actionTactics: '战略性重配品种，历史上每轮商品大牛市白银皆有翻倍行情。'
      }
    },
    driverComponents: [
      { name: '光伏新能源工业需求刚性', weight: 45, value: '太阳能耗银突破 1.6 亿盎司', impact: 'Positive', description: '用掉就无法低成本回收。', plainMeaning: '光伏板刷了银浆就封死在玻璃里，消耗是实打实的。' },
      { name: '金银比极端偏离均值修复', weight: 35, value: '比率在 88 处于历史高估区', impact: 'Positive', description: '强烈的补涨向均值 70 靠拢。', plainMeaning: '白银相对黄金太便宜了，资金必然冲进来买白银。' },
      { name: '高波动率带来的短线洗盘', weight: 20, value: '日内振幅经常超过 3%', impact: 'Neutral', description: '需控制杠杆避免被震荡扫损。', plainMeaning: '白银脾气暴躁上蹿下跳，做交易仓位不能过重。' }
    ],
    keyCatalysts: ['世界白银协会年度全球供需赤字报告', 'COMEX 白银交割仓库月报'],
    institutionalPositioning: { cotNetLongContracts: 48000, etfFlow7dUSD: '+$125M', retailSentiment: '78% 期待暴涨' }
  },
  {
    symbol: 'COMEX_HG',
    assetName: 'COMEX 高级期铜主力合约 (Copper HG Futures)',
    plainTitle: '全球铜博士衍生品核心流动性池与跨市套利基准 (COMEX 铜)',
    category: '期货市场',
    subCategory: 'COMEX / CME 纽约商品交易所',
    currentPrice: 4.42,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 85,
    coreDriverThesis: '全球矿山粗炼费 TC 跌入负值 ＋ 算力中心变压器铜母排 ＋ 冶炼厂联合减产挺价。',
    plainLanguageThesis: 'COMEX 的铜期货合约（代码 HG）是全世界交易量最大、与伦敦金属交易所 (LME) 联动的全球铜定价核心。无论是中国进口洋山铜、还是美国本地汽车工厂线缆，都紧盯 COMEX 铜报价。',
    plainActionSummary: '【操作指南】：4.30 美元附近坚决做多，目标 4.60-4.80 美元。',
    futuresContractSpecs: {
      exchange: 'COMEX / CME (纽约商品交易所)',
      contractSize: '25,000 磅 / 手',
      tickSize: '0.0005 美元/磅 (12.5 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 5,800 美元 / 手',
      tradingHours: '北京时间 06:00 - 次日 05:00',
      basisStatus: '极度逼仓升水'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：老旧矿山开采品位断崖式下降期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '欧美与亚洲精炼铜现货升水居高不下，冶炼厂原料库存天数降至警戒线。',
      supplyBottleneck: '巴拿马矿山持续关闭、第一量子与英美资源下调年度产量指引。',
      demandTransformation: '全球电网扩容、高压特高压直流输电与 AI 超级算力集群铜排需求井喷。',
      costFloorAndCeiling: {
        cashCostFloor: '$3.80 / 磅 (刺激全球新铜矿立项建设的最低全周期保本线)',
        profitMarginCeiling: '$5.50 / 磅 (下游企业毛利承受极限)'
      },
      policyAndGeopoliticalMoat: '美国关键矿产清单 (Critical Minerals) 与国防生产法补贴本土铜冶炼。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$4.30 - $4.60',
        coreLogic: '短期受现货精矿极端紧缺、大型冶炼厂季度检修消息提振。',
        keyTriggers: ['中国铜原料谈判小组 (CSPT) 现货指导价', 'LME 与 COMEX 跨市套利价差'],
        actionTactics: '回踩 $4.35 分批多，止损 $4.22，目标 $4.58。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$4.50 - $5.20',
        coreLogic: '全球流动性大宽松落地，下游线缆和变压器制造订单集中交付。',
        keyTriggers: ['美联储与欧洲央行降息外溢', '新能源装机并网超预期'],
        actionTactics: '坚定多头持仓，逢大盘下蹲加多。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$5.00 - $6.50',
        coreLogic: '铜是绿色工业与智能化社会的物理硬约束，长期超级大周期无可撼动。',
        keyTriggers: ['全球精铜硬缺口突破 300 万吨', '跨国矿企并购溢价创历史新高'],
        actionTactics: '大宗商品中长期资产配置首选品种。'
      }
    },
    driverComponents: [
      { name: '全球铜精矿冶炼处理费归零', weight: 45, value: 'TC 跌破 5 美元极端缺矿', impact: 'Positive', description: '逼迫冶炼厂联合停产。', plainMeaning: '没有铜矿石可炼，工厂被迫停工，供给直接减少。' },
      { name: '算力中心与高压电网抢购', weight: 35, value: '变压器交付周期长达 2 年', impact: 'Positive', description: '下游刚需不计成本采购。', plainMeaning: '做变压器和电网必须用好铜，价格再贵也得买。' },
      { name: '全球宏观经济复苏节奏', weight: 20, value: '欧美制造业景气度温和回升', impact: 'Positive', description: '提供稳健基本面底座。', plainMeaning: '全球工厂开工恢复，铜的基本盘很稳。' }
    ],
    keyCatalysts: ['ICSG 国际铜研究组供需月报', '智利 Codelco 产量公布'],
    institutionalPositioning: { cotNetLongContracts: 65000, etfFlow7dUSD: '+$160M', retailSentiment: '74% 积极看多' }
  },

  // =========================================================================
  // 3. 🇬🇧 LME (伦敦金属交易所 London Metal Exchange)
  // =========================================================================
  {
    symbol: 'LME_AH',
    assetName: 'LME 伦铝 3 月期铝 (LME Primary Aluminium 3M)',
    plainTitle: '电力凝固金属与汽车轻量化绿色铝材 (伦敦期铝)',
    category: '期货市场',
    subCategory: 'LME 伦敦金属交易所',
    currentPrice: 2620.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '氧化铝现货价格历史新高 ＋ 几内亚铝土矿发运扰动 ＋ 新能源汽车以铝代钢。',
    plainLanguageThesis: '电解铝被称为“凝固的电力”，因为生产一吨铝要消耗 1.35 万度电！全世界每辆电动汽车底盘、电池包外壳、光伏边框都大量使用铝。由于非洲几内亚铝土矿发生不可抗力导致原材料暴涨，电解铝生产成本大幅抬升，封死了铝价下跌空间。',
    plainActionSummary: '【操作指南】：2,550-2,580 美元是全球电解铝现金成本线，逢低做多胜率极高。',
    futuresContractSpecs: {
      exchange: 'LME (伦敦金属交易所)',
      contractSize: '25 公吨 / 手',
      tickSize: '0.50 美元/吨 (12.5 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 4,500 美元 / 手',
      tradingHours: '伦敦时间 01:00 - 19:00 (北京时间 09:00 - 次日 03:00)',
      basisStatus: '平水微升'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段③：电力能源配额天花板与原料短缺期',
      inventoryCyclePhase: '主动补库存 (景气扩张·主升浪加码)',
      inventoryCycleDescription: '中国 4500 万吨电解铝产能红线已触碰天花板，LME 亚洲仓库库存持续去化。',
      supplyBottleneck: '高耗能属性导致全球几乎无法再审批新建燃煤电解铝厂，云南水电受枯水期减产制约。',
      demandTransformation: '每辆纯电汽车用铝量突破 250 公斤，光伏电站边框支架年消耗铝超 400 万吨。',
      costFloorAndCeiling: {
        cashCostFloor: '2,350 - 2,450 美元/吨 (氧化铝原料+工业电力完全生产成本底)',
        profitMarginCeiling: '3,200 - 3,500 美元/吨 (极端能源危机时的高位天花板)'
      },
      policyAndGeopoliticalMoat: '欧盟碳边境调节机制 (CBAM) 对高碳排放铝征收严苛碳关税。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2,580 - $2,720',
        coreLogic: '短期受氧化铝现货价格创历史新高、原料成本倒逼电解铝冶炼厂挺价驱动。',
        keyTriggers: ['几内亚铝土矿海运发货量统计', 'LME 注销仓单占比变化'],
        actionTactics: '回踩 $2,590 分批做多，止损 $2,520，目标 $2,700。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2,650 - $2,950',
        coreLogic: '全球光伏装机并网旺季与新能源汽车产量爬坡，拉动工业铝型材采购。',
        keyTriggers: ['主要产铝省份枯水期电力调度政策', '欧洲铝冶炼厂复产进度'],
        actionTactics: '波段持有，逢大宗商品回调顺势低吸。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$2,800 - $3,500',
        coreLogic: '全球碳中和背景下电解铝供给绝对刚性，轻量化消费驱动长期价值中枢上移。',
        keyTriggers: ['全球绿电铝溢价形成行业统一标准', '铝代铜在低压电缆领域普及率'],
        actionTactics: '工业基础金属中兼具成本刚性与稳定需求的优质长牛品种。'
      }
    },
    driverComponents: [
      { name: '氧化铝原料价格暴涨推升成本', weight: 45, value: '原材料价格处于历史高位', impact: 'Positive', description: '直接锁死冶炼成本底座。', plainMeaning: '做铝的原料贵得飞起，铝价根本跌不下来。' },
      { name: '中国 4500 万吨产能红线封顶', weight: 35, value: '政策禁止盲目新增电解槽', impact: 'Positive', description: '供给端丧失增长弹性。', plainMeaning: '国家规定不能随便建新铝厂，产能被锁死了。' },
      { name: '传统建筑门窗用铝需求萎缩', weight: 20, value: '房地产新开工对冲部分工业增量', impact: 'Negative', description: '平滑部分涨幅。', plainMeaning: '盖房子做窗户用铝减少，稍微抵消了电车用铝的暴增。' }
    ],
    keyCatalysts: ['国际铝业协会 (IAI) 全球原铝日产数据', '几内亚矿业部出口通报'],
    institutionalPositioning: { cotNetLongContracts: 42000, etfFlow7dUSD: '+$68M', retailSentiment: '65% 乐观' }
  },
  {
    symbol: 'LME_NI',
    assetName: 'LME 伦镍 3 月期货 (LME Primary Nickel 3M)',
    plainTitle: '三元动力电池与不锈钢高端特钢命脉 (伦敦期镍)',
    category: '期货市场',
    subCategory: 'LME 伦敦金属交易所',
    currentPrice: 15850.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 71,
    coreDriverThesis: '印尼红土镍矿 MHP/冰镍放量过剩 ＋ 1.5 万美元现金成本支撑 ＋ 欧美高纯一级镍结构分化。',
    plainLanguageThesis: '镍是制造高镍三元动力电池（让电动车跑 800 公里的关键）和不锈钢的核心金属。过去两年印尼依靠中资火法高冰镍与高压酸浸 (HPAL) 技术实现了产能大爆发，导致全球二级镍过剩；但跌到 1.5-1.6 万美元后，澳洲和欧美高成本镍矿纷纷倒闭减产，价格在此探底筑底。',
    plainActionSummary: '【操作指南】：15,000-15,500 美元是全球矿业现金成本密集区，逢极度超跌可小仓位试多。',
    futuresContractSpecs: {
      exchange: 'LME (伦敦金属交易所)',
      contractSize: '6 公吨 / 手',
      tickSize: '5.00 美元/吨 (30 美元/手)',
      settlementType: '实物交割 (Physical Delivery)',
      marginRequirement: '约 6,200 美元 / 手',
      tradingHours: '伦敦时间 01:00 - 19:00',
      basisStatus: '低位贴水 Contango'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段④：产能大规模释放后的成本倒挂出清期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: 'LME 注册仓库库存从极低水平恢复至 15 万吨上方，现货供应从缺货转向宽松。',
      supplyBottleneck: '印尼政府收紧采矿配额 (RKAB) 审批节奏，控制矿石过度开采流向市场。',
      demandTransformation: '磷酸铁锂 (LFP) 电池挤占部分三元份额，但军工航空特钢与海外储能对纯镍需求稳固。',
      costFloorAndCeiling: {
        cashCostFloor: '14,500 - 15,200 美元/吨 (印尼红土镍矿湿法 MHP 综合现金成本底线)',
        profitMarginCeiling: '21,000 - 23,000 美元/吨 (超过将诱发全球封存产能重启)'
      },
      policyAndGeopoliticalMoat: '印尼计划筹建类似 OPEC 的镍矿输出国组织以掌控全球定价权。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$15,400 - $16,400',
        coreLogic: '短期受印尼 RKAB 审批进度推迟传闻及不锈钢钢厂节前刚需备货拉锯。',
        keyTriggers: ['印尼能矿部 (ESDM) 配额发放进度', '不锈钢无锡佛山现货库存'],
        actionTactics: '靠近 $15,500 分批接多，反弹至 $16,300 止盈，箱体操作。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$15,000 - $17,500',
        coreLogic: '印尼新增投产爬坡与非印尼高成本矿企破产停产博弈，价格进入磨底阶段。',
        keyTriggers: ['全球主要矿山正式减产通报', '欧美对印尼镍碳足迹关税限制'],
        actionTactics: '耐心中线等待底部结构确认，不急于追涨。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$17,000 - $22,000',
        coreLogic: '出清完成后供需重新趋向健康平衡，能源转型与航空航天特种合金驱动长期复合增长。',
        keyTriggers: ['高镍固态电池商业化', '全球三元材料装机复苏'],
        actionTactics: '适合作为左侧左底反转观察标的，逢极端砸盘分批收集。'
      }
    },
    driverComponents: [
      { name: '印尼红土镍矿低成本产能充沛', weight: 45, value: '印尼供给占全球超 55%', impact: 'Negative', description: '压制现货涨价高度。', plainMeaning: '印尼矿产太多了，一涨价工厂就大量出货。' },
      { name: '1.5 万美元全球矿企成本红线', weight: 35, value: '澳洲加拿大矿山亏损减产', impact: 'Positive', description: '封杀继续暴跌空间。', plainMeaning: '跌到这里国外很多矿山扛不住亏损关停了，形成托底。' },
      { name: '印尼政府配额管控调控意图', weight: 20, value: 'RKAB 审批收紧调节供给节奏', impact: 'Positive', description: '防止矿价过度踩踏。', plainMeaning: '印尼政府开始踩刹车，控制开采许可证发放。' }
    ],
    keyCatalysts: ['国际镍研究组织 (INSG) 供需报告', '印尼能矿部官方政策声明'],
    institutionalPositioning: { cotNetLongContracts: 14000, etfFlow7dUSD: '-$15M', retailSentiment: '46% 谨慎胶着' }
  },

  // =========================================================================
  // 4. 🇸🇬 SGX (新加坡交易所)
  // =========================================================================
  {
    symbol: 'SGX_FEF',
    assetName: 'SGX 新加坡铁矿石指数掉期期货 (TSI Iron Ore CFR China)',
    plainTitle: '世界钢铁工业骨架与国际大宗海上贸易晴雨表 (SGX 铁矿石)',
    category: '期货市场',
    subCategory: 'SGX 新加坡交易所',
    currentPrice: 104.50,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 73,
    coreDriverThesis: '四大矿山低开采成本高发运 ＋ 100 美元非主流矿山停产底线 ＋ 宏观财政发债基建托底。',
    plainLanguageThesis: '铁矿石是全世界吨位最大的散货海运大宗商品！新加坡交易所 (SGX) 的铁矿石掉期期货是全球对冲基金和跨国钢铁巨头交易铁矿石最主要、最敏感的国际盘。淡水河谷、力拓、必和必拓在澳洲和巴西挖一吨矿成本只要 20-30 美元，但跌破 100 美元时，印度和中国国产贫矿就会大面积亏损停产。',
    plainActionSummary: '【操作指南】：98-102 美元坚决做多，112-118 美元逢高止盈，坚决执行波段震荡纪律。',
    futuresContractSpecs: {
      exchange: 'SGX (新加坡交易所)',
      contractSize: '100 公吨 / 手',
      tickSize: '0.01 美元/吨 (1 美元/手)',
      settlementType: '现金结算 (基于 Fastmarkets MB TSI 62% 指数)',
      marginRequirement: '约 1,600 美元 / 手',
      tradingHours: '新加坡时间 07:25 - 20:00, 20:30 - 次日 04:45 (全天近 21 小时连续交易)',
      basisStatus: '近月平水微贴'
    },
    lifecycleDerivation: {
      lifecycleStage: '阶段②：四大矿山产能成熟稳定与高现金分红期',
      inventoryCyclePhase: '主动去库存 (价格坍塌·甩卖出清寻底)',
      inventoryCycleDescription: '中国主要沿海港口铁矿石库存维持在 1.5 亿吨高位，钢厂维持按需采购原则。',
      supplyBottleneck: '西澳皮尔巴拉铁路运力饱和，几内亚西芒杜 (Simandou) 巨型铁矿石项目投产尚需至 2026 年底。',
      demandTransformation: '电炉短流程炼钢废钢替代比例缓慢爬坡，传统长流程高炉铁水产量维持 230-240 万吨/日刚性。',
      costFloorAndCeiling: {
        cashCostFloor: '$95 - $100 / 吨 (非主流高成本矿山与中国国产矿完全开采离岸保本线)',
        profitMarginCeiling: '$125 - $135 / 吨 (超过将引发钢厂大面积亏损与监管部门政策窗口指导)'
      },
      policyAndGeopoliticalMoat: '中国矿产资源集团 (CMRG) 联合集采谈判机制与港口发运调控。'
    },
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$100.0 - $108.5',
        coreLogic: '短期受钢厂周度日均铁水产量回升及重大会议财政发债刺激政策预期提振。',
        keyTriggers: ['Mysteel 每周五钢厂日均铁水产量与港口库存', '澳洲巴西周度铁矿发运总量'],
        actionTactics: '回踩 $101.5 做多，止损 $97.5，目标 $107.0。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$95.0 - $115.0',
        coreLogic: '季节性北方雨季与冬季环保限产博弈，宽幅箱体拉锯特征鲜明。',
        keyTriggers: ['地方政府专项债与超长期特别国债实物工作量落地', '四大矿山季度产量报告'],
        actionTactics: '箱体下轨耐心低吸，反弹至上轨果断离场，不恋战。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$80.0 - $105.0',
        coreLogic: '几内亚西芒杜 1.2 亿吨高品位低成本铁矿未来集中入市，打破全球寡头垄断，长期中枢下移。',
        keyTriggers: ['西芒杜矿山跨境铁路全线贯通试运营', '全球粗钢表观消费见顶'],
        actionTactics: '不宜长期死多锁仓，只做区间逢低反弹与波段对冲。'
      }
    },
    driverComponents: [
      { name: '100 美元非主流矿山停产底线', weight: 45, value: '跌破百元边际矿山主动关停', impact: 'Positive', description: '天然的物理成本支撑底。', plainMeaning: '低于100美元很多小矿山亏得吐血，自然停产减供。' },
      { name: '港口库存处于 1.5 亿吨高位', weight: 35, value: '堆场存货充沛压制现货弹性', impact: 'Negative', description: '限制价格单边持续暴涨。', plainMeaning: '码头港口堆满了矿石，钢厂不缺现货用。' },
      { name: '财政赤字与万亿级基建专项债', weight: 20, value: '重大水利与管网基建托底钢材', impact: 'Positive', description: '稳固实物需求下限。', plainMeaning: '国家发债搞大基建大工程，钢筋用量有保障。' }
    ],
    keyCatalysts: ['Mysteel 官方铁水产量与港口疏港量', 'SGX 新加坡交易所掉期结算价报告'],
    institutionalPositioning: { cotNetLongContracts: 31000, etfFlow7dUSD: '+$22M', retailSentiment: '48% 迷茫中立' }
  }
];
