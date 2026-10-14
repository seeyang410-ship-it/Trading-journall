import { AssetDriverProfile } from '../types/macro';

export const ALL_COMMODITIES_DATA: AssetDriverProfile[] = [
  {
    symbol: 'WTI',
    assetName: '美原油连续 (WTI Crude Oil)',
    plainTitle: '世界工业血液与车轮上的基础能源 (美原油)',
    category: '大宗商品',
    subCategory: '基础能源与地缘博弈',
    currentPrice: 71.80,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 68,
    coreDriverThesis: 'OPEC+ 闲置产能压顶 ＋ 美国战略石油储备 (SPR) 70 美元保底 ＋ 地缘局势脉冲。',
    plainLanguageThesis: '原油涨跌就像上下两块钢板：上面有沙特俄罗斯每天几百万桶闲置产能，一涨就开闸甩卖；下面有美国政府承诺 70 美元以下大量回购原油填满国家战略油库。两头封死，形成坚固箱体。',
    plainActionSummary: '【操作指南】：70 美元附近不杀跌做多，78-82 美元逢高减仓，箱体区间高抛低吸。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$69.00 - $74.50',
        coreLogic: '短期受 EIA 周度原油库存与红海航运地缘扰动，日内围绕 71 美元上下震荡。',
        keyTriggers: ['EIA 周度商业原油库存变动', '中东突发冲突消息面', '非农就业反映的汽油消费'],
        actionTactics: '靠近 $69-$70 分批做多，$74 上方分批减仓，严格止损 $67.50。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$67.00 - $78.00',
        coreLogic: 'OPEC+ 逐步退出自愿减产节奏与全球制造业补库需求博弈，维持宽幅箱体拉锯。',
        keyTriggers: ['OPEC+ 部长级监督会议决议', '美国页岩油开采盈亏平衡线上移'],
        actionTactics: '适合中线波段交易者在区间下轨耐心布局。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$60.00 - $75.00',
        coreLogic: '全球交通电气化与风光电能替代，全球石油消费见顶平原期临近。',
        keyTriggers: ['电动汽车与商用混动渗透率突破 40%', '国际能源署 (IEA) 峰值需求报告'],
        actionTactics: '长线不宜把原油当成长线价值投资标的，仅适合波段对冲。'
      }
    },
    driverComponents: [
      { name: 'OPEC+ 闲置产能大水阀', weight: 40, value: '450万桶/天随时可开', impact: 'Negative', description: '压制油价暴涨空间。', plainMeaning: '仓库里存货很多，价格一高沙特就抢着卖。' },
      { name: '美国国家战略油库托底', weight: 35, value: '70美元回购承诺', impact: 'Positive', description: '封杀油价深度破位空间。', plainMeaning: '跌破70美元美国政府自己买，形成天然地板。' },
      { name: '新能源车与电能替代', weight: 25, value: '汽油消费弹性弱化', impact: 'Negative', description: '长期需求增长乏力。', plainMeaning: '路上跑的电车变多，汽油需求没以前那么猛。' }
    ],
    keyCatalysts: ['OPEC+ 部长级会议声明', '美国能源部采购 SPR 招标'],
    institutionalPositioning: { cotNetLongContracts: 198000, etfFlow7dUSD: '-$65M', retailSentiment: '52% 中立震荡' }
  },
  {
    symbol: 'BRENT',
    assetName: '布伦特原油连续 (Brent Crude)',
    plainTitle: '全球国际海上现货贸易与欧佩克定价基石 (布油)',
    category: '大宗商品',
    subCategory: '基础能源与海上现货贸易',
    currentPrice: 75.40,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 68,
    coreDriverThesis: '欧洲与中东实物原油贴水 ＋ 霍尔木兹海峡地缘运输风险 ＋ 跨大西洋与美油溢价。',
    plainLanguageThesis: '全世界三分之二的现货原油贸易都是按布伦特原油来定价的！由于它开采在北海且通过油轮海运，因此对红海油轮受袭、中东地缘冲突的敏感度比美国本土 WTI 更强烈，通常保持 3-4 美元的安全溢价。',
    plainActionSummary: '【操作指南】：73-74 美元企稳做多，79-82 美元逢高止盈，关注中东航道动向。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$73.50 - $78.50',
        coreLogic: '短期受欧洲西北部炼油厂利润与中东原油官方售价 (OSP) 支撑，在 75 美元形成均衡点。',
        keyTriggers: ['沙特阿美每月对亚洲买家公布的 OSP 升贴水', '红海油轮受袭地缘快讯'],
        actionTactics: '回踩 $74 做多，反弹至 $78 获利了结，止损 $72.50。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$71.00 - $82.00',
        coreLogic: '欧佩克减产执行率与非欧佩克（美加巴西圭亚那）增产之间的博弈主导中期走势。',
        keyTriggers: ['国际能源署 (IEA) 月度石油市场报告', '苏伊士运河通行费与保费变化'],
        actionTactics: '区间网格高抛低吸，不盲目单边追多。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$65.00 - $80.00',
        coreLogic: '全球能源结构向低碳化加速转型，大油气公司将资本开支转投绿电与天然气，石油消费中枢长线下移。',
        keyTriggers: ['全球炼厂原油加工量见顶', '新兴市场商用车电动化'],
        actionTactics: '长线作为通胀风险对冲工具，不宜重仓单向持有。'
      }
    },
    driverComponents: [
      { name: '沙特阿美亚洲官方售价 (OSP)', weight: 45, value: 'OSP 维持小幅升水', impact: 'Positive', description: '产油国维持现货价格坚挺。', plainMeaning: '沙特不肯大降价卖油，现货成本有底线。' },
      { name: '非欧佩克增产对冲', weight: 35, value: '美洲非OPEC年增超 120 万桶', impact: 'Negative', description: '圭亚那等新产地放量。', plainMeaning: '美洲很多新油田在开足马力抽油。' },
      { name: '欧洲炼油厂开工裂解差', weight: 20, value: '柴油裂解差温和回落', impact: 'Neutral', description: '下游终端需求保持平稳。', plainMeaning: '加油站柴油汽油卖得平稳，没有暴增。' }
    ],
    keyCatalysts: ['沙特阿美月度 OSP 公布', 'IEA 石油供需平衡表修正'],
    institutionalPositioning: { cotNetLongContracts: 172000, etfFlow7dUSD: '-$38M', retailSentiment: '50% 震荡' }
  },
  {
    symbol: 'NATGAS',
    assetName: '纽约天然气连续 (US Natural Gas)',
    plainTitle: '清洁供暖与 AI 数据中心发电气化大宗 (天然气)',
    category: '大宗商品',
    subCategory: '清洁供暖与AI数据中心电厂气化',
    currentPrice: 2.85,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 78,
    coreDriverThesis: '美国液化天然气 (LNG) 出口码头陆续投产 ＋ 燃气电厂为 AI 数据中心供电 ＋ 暖冬后库存去化。',
    plainLanguageThesis: '天然气是波动率极大的“寡妇制造者”，但底层正在迎来革命性逆转！随着美国多个大型 LNG 液化出口码头竣工，廉价的美国天然气将被源源不断运往欧洲和亚洲赚取高额差价；而且微软谷歌等 AI 数据中心为保证 24 小时不间断用电，大量与燃气电厂签订直供电长约。',
    plainActionSummary: '【操作指南】：2.50-2.65 美元区域分批建立多头底仓，目标看至 3.20-3.50 美元。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2.70 - $3.15',
        coreLogic: '短期受气温制冷用电与工业需求拉动，EIA 周度地下储气库注气量不及预期，多头蓄势反弹。',
        keyTriggers: ['EIA 周四晚间官方天然气库存报告', 'NOAA 8-14 天气温展望模型'],
        actionTactics: '回踩 $2.75 企稳买多，突破 $3.00 止盈减半，止损设在 $2.60。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2.80 - $3.60',
        coreLogic: '自由港 LNG 与 Golden Pass 出口终端负荷提升，日均出口量突破 150 亿立方英尺，抽走本土过剩库存。',
        keyTriggers: ['美湾新建 LNG 出口终端调试注气', '冬季拉尼娜冷冬预期发酵'],
        actionTactics: '波段持有，逢深跌补仓，博弈四季度与冬季供暖旺季溢价。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$3.20 - $4.80',
        coreLogic: '作为淘汰煤炭与弥补绿电不稳定的“基荷电源”，燃气轮机是欧美 AI 算力电力中心的首选过渡方案。',
        keyTriggers: ['科技巨头直购独立燃气电厂电力订单落地', '全球 LNG 贸易长协签订'],
        actionTactics: '作为低估值清洁过渡能源的战略看涨期权配置。'
      }
    },
    driverComponents: [
      { name: '美湾 LNG 液化出口终端放量', weight: 45, value: '日出口突破 140 亿立方英尺', impact: 'Positive', description: '将本土廉价气卖向全球。', plainMeaning: '油轮一船一船拉到欧洲亚洲高价卖，本土供给被吸走。' },
      { name: 'AI 算力数据中心燃气发电', weight: 35, value: '燃气电厂负荷率大增', impact: 'Positive', description: 'AI 电力首选燃气轮机。', plainMeaning: '给AI计算机供电离不开天然气发电机。' },
      { name: '伴生气副产增加压制', weight: 20, value: '二叠纪油田副产天然气充足', impact: 'Negative', description: '抽原油顺带采出大量气。', plainMeaning: '采油送气，导致部分地区供气源源不断。' }
    ],
    keyCatalysts: ['EIA 周度储气库库存超预期去库', '欧洲冬季气温预测急冻'],
    institutionalPositioning: { cotNetLongContracts: 52000, etfFlow7dUSD: '+$74M', retailSentiment: '62% 偏多' }
  },
  {
    symbol: 'COPPER',
    assetName: '美精铜连续 (HG Copper)',
    plainTitle: '全球经济健康晴雨表与AI算力电网命门 (铜博士)',
    category: '大宗商品',
    subCategory: '工业基本金属与电气化基石',
    currentPrice: 4.42,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 82,
    coreDriverThesis: '全球电网升级改造 ＋ AI 数据中心电力设施翻倍 ＋ 南美大型铜矿供给扰动频繁。',
    plainLanguageThesis: '铜被称为“铜博士”，因为它是唯一懂全球宏观经济的金属。无论是风电、太阳能、电动车，还是耗电惊人的 AI GPU 数据中心，必须用海量铜缆输电。世界老矿山品位正在下降，新矿开发需8-10年，结构性供应缺口极大。',
    plainActionSummary: '【操作指南】：逢经济担忧急跌时分批买入，作为把握全球电气化和AI电网的高胜率筹码。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$4.30 - $4.65',
        coreLogic: '短期受主要经济体基建提振及电网招标订单支撑，上海与伦敦显性库存处于去库周期。',
        keyTriggers: ['LME/SHFE 铜仓单库存周度变化', '全球制造业采购经理指数 (PMI)'],
        actionTactics: '回踩 $4.32-$4.38 均线支撑位吸纳，突破 $4.55 追多，目标 $4.65。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$4.50 - $5.10',
        coreLogic: '欧美电网全面老化进入换线改造周期，大型科技公司数据中心用电负荷以 30% 增速暴增，用铜量井喷。',
        keyTriggers: ['智利第一量子与自由港铜矿谈判进展', '欧美电网升级基建法案拨款执行'],
        actionTactics: '中长线趋势做多，每次回踩 50 日均线都是补仓机会。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$5.20 - $6.50',
        coreLogic: '全球超级露天矿山品位从 2% 降至 0.6% 以下，全球探明新铜矿耗费极长周期，结构性硬缺口无可逆转。',
        keyTriggers: ['全球铜矿精炼加工费 (TC/RC) 暴跌至负值', 'AI 算力电力瓶颈迫使电网巨额投资'],
        actionTactics: '大宗商品中长期基本面最为强劲的品种之一，可战略性长持。'
      }
    },
    driverComponents: [
      { name: '全球电网及AI中心用铜', weight: 45, value: '年增超 250 万吨需求', impact: 'Positive', description: '新能源与算力中心电网必须耗铜。', plainMeaning: '搞AI和绿能，离不开大把铜线。' },
      { name: '南美矿山老龄化品位下降', weight: 35, value: '智利秘鲁矿产频频受限', impact: 'Positive', description: '开采成本大幅抬升。', plainMeaning: '好挖的矿挖得差不多了，成本越来越高。' },
      { name: '传统地产开工疲软牵制', weight: 20, value: '建筑用铜增速平缓', impact: 'Neutral', description: '部分抵消工业高增长。', plainMeaning: '盖普通房子用铜慢了，但被电网补齐。' }
    ],
    keyCatalysts: ['智利国家铜业公司季报产量', '英伟达科技巨头电网用铜公告'],
    institutionalPositioning: { cotNetLongContracts: 72000, etfFlow7dUSD: '+$110M', retailSentiment: '66% 偏多' }
  },
  {
    symbol: 'ALUMINUM',
    assetName: '伦敦铝连续 (LME Aluminum)',
    plainTitle: '轻量化汽车车身、航空航天与高耗能电解金属 (铝)',
    category: '大宗商品',
    subCategory: '工业基本金属与汽车轻量化',
    currentPrice: 2620.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 74,
    coreDriverThesis: '中国电解铝 4500 万吨产能天花板锁死 ＋ 氧化铝原料成本暴涨 ＋ 汽车轻量化用铝。',
    plainLanguageThesis: '电解铝本质上是“凝固的电力”。炼一吨铝需要消耗上万度电！全球最大产地中国设定了 4,500 万吨的绝对产能天花板严禁新增；同时上游几内亚和澳洲的铝土矿和氧化铝严重短缺，原材料成本急剧推高铝价底部。',
    plainActionSummary: '【操作指南】：2,500 美元成本强支撑做多，目标看至 2,800-3,000 美元。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$2,550 - $2,720 /吨',
        coreLogic: '氧化铝现货价格飙涨引发冶炼厂成本倒挂，LME 仓单显性库存处于近年低位。',
        keyTriggers: ['氧化铝期货即期合约溢价', '几内亚铝土矿发运周报'],
        actionTactics: '回踩 $2,580 顺势做多，突破 $2,680 加仓，止损设在 $2,520。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$2,650 - $2,950 /吨',
        coreLogic: '汽车轻量化（一体化压铸车身）和光伏铝合金边框需求高速增长，电解铝供给刚性支撑。',
        keyTriggers: ['全球新能源汽车单车用铝量提升', '欧洲低碳绿铝采购溢价扩大'],
        actionTactics: '波段持有，顺应供给刚性做多。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$2,800 - $3,400 /吨',
        coreLogic: '碳中和政策下全球高耗能电解铝扩产几乎停滞，清洁能源水电铝形成结构性溢价。',
        keyTriggers: ['碳税关税 (CBAM) 对高碳铝加征壁垒', '航空航天铝锂合金需求爆发'],
        actionTactics: '战略性长持绿铝产业链资产。'
      }
    },
    driverComponents: [
      { name: '氧化铝原料供给瓶颈', weight: 45, value: '几内亚矿石发运受限', impact: 'Positive', description: '原材料暴涨封杀下跌空间。', plainMeaning: '造铝的土变贵了，生产成本硬核推高。' },
      { name: '4500万吨中国产能天花板', weight: 35, value: '政策红线严禁新增产能', impact: 'Positive', description: '全球最大供给国锁死上限。', plainMeaning: '国家不让再建新厂，供给没有增量。' },
      { name: '传统建筑门窗用铝疲软', weight: 20, value: '房地产竣工降速', impact: 'Negative', description: '传统门窗消费拖累。', plainMeaning: '盖房子装窗户用铝少了一点。' }
    ],
    keyCatalysts: ['几内亚政局与矿石出口政策', '氧化铝现货报价创新高'],
    institutionalPositioning: { cotNetLongContracts: 42000, etfFlow7dUSD: '+$48M', retailSentiment: '60% 乐观' }
  },
  {
    symbol: 'TIN',
    assetName: '伦敦锡连续 (LME Tin)',
    plainTitle: '芯片晶圆焊点胶水与大马传统核心优势金属 (锡)',
    category: '大宗商品',
    subCategory: '半导体芯片焊锡与关键矿产',
    currentPrice: 31200.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
    coreDriverThesis: '缅甸佤邦曼相矿区停产禁令 ＋ 印尼 RKAB 采矿配额审批迟缓 ＋ 半导体先进制程焊锡放量。',
    plainLanguageThesis: '锡被称为“电子工业的胶水”！任何一块手机主板、显卡、AI 芯片，每一个针脚都必须用锡膏焊接。全球前两大产区印尼和缅甸因环保政策与内战频频断产；而马来西亚曾是全球最大锡矿国，如今拥有全球第三大精炼锡厂 (MSC)，半导体繁荣直接推高锡价。',
    plainActionSummary: '【操作指南】：30,000 美元整数关口坚决做多，博弈印尼与缅甸供给收缩弹射行情。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$30,500 - $33,000 /吨',
        coreLogic: 'LME 锡库存降至极低水平，印尼私人冶炼厂出口配额积压，现货升水持续飙升。',
        keyTriggers: ['印尼能源矿产部月度出口核准吨数', '缅甸佤邦矿山复工验收通知'],
        actionTactics: '回踩 $30,800 做多，突破 $32,000 顺势加仓，止损设在 $29,800。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$32,000 - $38,000 /吨',
        coreLogic: '全球消费电子与汽车芯片排产回升，单块 AI 服务器主板焊锡用量达到普通服务器 3 倍以上。',
        keyTriggers: ['台积电与英伟达芯片出货量指引', '大马冶炼厂 MSC 精炼锡出货'],
        actionTactics: '中线波段持有多头，享受半导体周期复苏红利。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$35,000 - $48,000 /吨',
        coreLogic: '全球成熟锡矿品位衰减严重，新发现矿床多位于偏远动荡地区，长周期硬缺口显著。',
        keyTriggers: ['全球探明可采储量寿命跌破 15 年', '光伏焊带光伏锡丝爆发'],
        actionTactics: '战略性超配锡资源相关上市公司与现货头寸。'
      }
    },
    driverComponents: [
      { name: '缅甸与印尼供给双重阻断', weight: 50, value: '全球超 45% 供应受阻', impact: 'Positive', description: '两大核心产地政策断供。', plainMeaning: '两个最大的矿区不给挖也不给卖，现货极度紧张。' },
      { name: 'AI 算力主板焊锡用量暴增', weight: 35, value: '单卡用锡量翻倍提升', impact: 'Positive', description: '高端芯片焊接不可替代。', plainMeaning: '显卡和AI芯片越来越多，焊锡消耗根本停不下来。' },
      { name: '传统马口铁镀锡板降速', weight: 15, value: '食品罐头用锡平稳', impact: 'Neutral', description: '传统包装领域增长乏力。', plainMeaning: '装鱼装肉的铁罐头用锡不多了，但电子用锡补上了。' }
    ],
    keyCatalysts: ['缅甸佤邦采矿解禁与否官方通告', '印尼锡锭出口月报'],
    institutionalPositioning: { cotNetLongContracts: 8500, etfFlow7dUSD: '+$22M', retailSentiment: '72% 坚定看多' }
  },
  {
    symbol: 'NICKEL',
    assetName: '伦敦镍连续 (LME Nickel)',
    plainTitle: '不锈钢骨架与三元高镍动力电池关键金属 (镍)',
    category: '大宗商品',
    subCategory: '不锈钢与三元动力电池金属',
    currentPrice: 15850.0,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 65,
    coreDriverThesis: '印尼红土镍矿湿法冶炼 (HPAL) 产能井喷 ＋ 磷酸铁锂挤占三元电池份额 ＋ 俄镍交割博弈。',
    plainLanguageThesis: '镍曾因“青山控股史诗级逼空”闻名全球。如今印尼采用中资先进的高压酸浸 (HPAL) 技术，把原本难提炼的红土镍矿大量变成低成本电池级硫酸镍，导致全球短期出现结构性过剩；但 15,000 美元已逼近澳洲等高成本矿山的关停生死线。',
    plainActionSummary: '【操作指南】：15,000-15,500 美元成本底座做多，反弹至 17,500 美元减仓。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$15,200 - $16,500 /吨',
        coreLogic: '印尼镍矿配额审批放缓抑制过度抛压，不锈钢下游排产稳定，在 1.55 万美元寻底。',
        keyTriggers: ['印尼 RKAB 采矿许可审批进度', 'LME 亚洲仓库中国品牌注册交割量'],
        actionTactics: '靠近 $15,300 买多，靠近 $16,400 获利减仓。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$15,000 - $17,800 /吨',
        coreLogic: '西方海外硫化镍矿山（澳洲必和必拓等）因成本倒挂大面积减产停产，供需过剩逐步收窄。',
        keyTriggers: ['海外高成本矿山关停公告', '印尼考虑对镍生铁征收出口税'],
        actionTactics: '波段箱体低吸，等待供给端去产能自发修复。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$16,500 - $22,000 /吨',
        coreLogic: '三元高镍电池在高端长续航乘用车与固态电池中具备能量密度绝对优势，长期出清后迎来戴维斯双击。',
        keyTriggers: ['半固态/全固态高镍电池装车量产', '印尼高品位红土镍矿储量消耗预警'],
        actionTactics: '周期底部左侧逐步定投配置优质镍业资产。'
      }
    },
    driverComponents: [
      { name: '印尼 HPAL 湿法产能暴增', weight: 45, value: '印尼占全球镍产出超 55%', impact: 'Negative', description: '全球供给大幅充裕。', plainMeaning: '印尼工厂又快又好，市场上镍货源充足。' },
      { name: '海外矿山 1.5 万美元成本线', weight: 35, value: '必和必拓暂停西澳镍矿业务', impact: 'Positive', description: '倒逼西方高成本产能出清。', plainMeaning: '跌破成本后西方老矿场主动关门，阻止价格深跌。' },
      { name: '不锈钢基建制造业底仓', weight: 20, value: '70% 镍用于传统不锈钢', impact: 'Positive', description: '传统工业需求平稳造底。', plainMeaning: '制造厨具、工厂机械管道必须用不锈钢，需求有底。' }
    ],
    keyCatalysts: ['印尼能矿部政策声明', '必和必拓西澳镍业务重组报告'],
    institutionalPositioning: { cotNetLongContracts: 14000, etfFlow7dUSD: '-$10M', retailSentiment: '46% 筑底观望' }
  },
  {
    symbol: 'IRONORE',
    assetName: '铁矿石连续 (Iron Ore 62% Fe)',
    plainTitle: '全球钢铁工业骨骼与澳洲巴西矿业巨头印钞机 (铁矿石)',
    category: '大宗商品',
    subCategory: '黑色系钢铁原料与基建晴雨表',
    currentPrice: 104.5,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 65,
    coreDriverThesis: '四大矿山极低现金开采成本 ＋ 中国万亿超长期国债与城中村基建改造 ＋ 钢厂铁水产量拉锯。',
    plainLanguageThesis: '力拓、必和必拓从澳洲西澳挖一吨铁矿石的现金成本只要 20 美元，但卖给全球钢厂却能卖 100 多美元！中国是世界最大的钢铁制造国，每年消耗全世界 70% 的海运铁矿石。100 美元是全球中小高成本矿山的盈亏生死线。',
    plainActionSummary: '【操作指南】：95-100 美元强成本线做多，110-115 美元上方逢高止盈，不恋战。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$98.00 - $108.50 /吨',
        coreLogic: '港口到港量平稳，钢厂日均铁水产量维持在 230 万吨中枢，100 美元关口存在高成本矿山挺价护盘。',
        keyTriggers: ['主要港口铁矿石周度疏港量与库存', '唐山等主产区钢厂高炉开工率'],
        actionTactics: '靠近 $99-$101 做多，反弹至 $107 止盈，止损 $96。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '$92.00 - $112.00 /吨',
        coreLogic: '中国基建与制造业设备更新对冲房地产下行，几内亚西芒杜超级铁矿投产前夕维持相持震荡。',
        keyTriggers: ['专项债发行与基建项目开工提速', '澳洲矿山季度发运目标冲量'],
        actionTactics: '区间高抛低吸，以 100 美元为中轴进行波段交易。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '$80.00 - $105.00 /吨',
        coreLogic: '几内亚西芒杜 (Simandou) 每年 1.2 亿吨高品位低成本铁矿石 2026-2027 年投产，全球海运铁矿将面临新一轮超级供给冲击。',
        keyTriggers: ['西芒杜铁路与深水港口完工通车', '电炉废钢短流程替代高炉长流程'],
        actionTactics: '长线逢高做空或套期保值，不长期囤积多头。'
      }
    },
    driverComponents: [
      { name: '100美元非主流高成本矿底座', weight: 40, value: '破百关口中小矿山面临停产', impact: 'Positive', description: '成本支撑极其明确。', plainMeaning: '跌破100美元很多小矿山亏本停工，供给自然减少。' },
      { name: '四大矿山极低开采成本', weight: 35, value: '澳洲力拓现金成本仅 $22/吨', impact: 'Negative', description: '巨头利润丰厚有降价空间。', plainMeaning: '澳洲大矿山成本极低，只要赚钱就拼命多挖多卖。' },
      { name: '高炉生铁日产韧性', weight: 25, value: '日均铁水产量保持 230 万吨', impact: 'Positive', description: '制造业出口与汽车造船拉动。', plainMeaning: '造船、造车和家电钢材需求稳健。' }
    ],
    keyCatalysts: ['港口铁矿石去库数据', '中国超长期特别国债下拨使用'],
    institutionalPositioning: { cotNetLongContracts: 22000, etfFlow7dUSD: '-$15M', retailSentiment: '48% 观望' }
  },
  {
    symbol: 'LITHIUM',
    assetName: '电池级碳酸锂连续 (Lithium Carbonate)',
    plainTitle: '新能源白色石油与动力/储能电池终极核心元素 (锂)',
    category: '大宗商品',
    subCategory: '新能源储能与动力电池白色石油',
    currentPrice: 78500.0,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 75,
    coreDriverThesis: '由 60 万泡沫暴跌至 7 万触及全球高成本锂辉石/锂云母停产线 ＋ 全球储能大电池装机暴涨 ＋ 周期底部大出清。',
    plainLanguageThesis: '锂被称为“21 世纪的白色石油”。之前锂价从 60 万元/吨断崖式暴跌到 7-8 万元，几乎把澳洲和中国的很多矿山打得亏损停产。物极必反！随着风光电站强制配储能电池、AI 数据中心巨型储能爆发，锂价在 7.5 万元铁底迎来不可逆的周期反转！',
    plainActionSummary: '【操作指南】：7.5-7.8 万元/吨是历史上难得一见的周期大底部，分批长线定投，赔率极高。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '75,000 - 84,000 元/吨',
        coreLogic: '动力电池大厂逢低长协锁量，冶炼厂挺价惜售，在 7.8 万元构建坚固双重底。',
        keyTriggers: ['广期所碳酸锂期货仓单注销', '正极材料厂月度排产计划'],
        actionTactics: '回踩 76,000 企稳做多，反弹至 83,000 止盈减半，止损设在 73,500。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '82,000 - 105,000 元/吨',
        coreLogic: '澳洲锂矿巨头（如皮尔巴拉、Mt Cattlin）宣布减产停产，供给过剩快速收窄，旺季补库引爆反弹。',
        keyTriggers: ['澳洲锂精矿季度拍卖价格跳涨', '全球大型储能项目招标并网'],
        actionTactics: '右侧加仓做多，中线目标上看 10 万元关口。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '100,000 - 160,000 元/吨',
        coreLogic: '全球交通电气化与风光可再生能源配储不可逆，低成本盐湖扩产放缓，合理成本中枢在 10-12 万元。',
        keyTriggers: ['固态电池规模化商用对锂用量增厚', '南美锂三角资源国有化政策'],
        actionTactics: '作为新能源革命中最核心的大宗周期底部资产长线重配。'
      }
    },
    driverComponents: [
      { name: '全球矿山现金成本底线', weight: 45, value: '7.5万元跌破锂云母成本', impact: 'Positive', description: '矿企亏损被迫停产检修。', plainMeaning: '价格太低矿山开工就亏本，纷纷停产保价。' },
      { name: '大型储能电站爆发式增长', weight: 35, value: '全球储能电池增速超 60%', impact: 'Positive', description: '储能接棒电车成为新增长极。', plainMeaning: '不仅电动车用电池，电网存电也疯狂抢电池。' },
      { name: '南美低成本盐湖持续放量', weight: 20, value: '智利阿根廷盐湖成本低', impact: 'Negative', description: '压制价格回到暴利时代。', plainMeaning: '南美抽盐水制锂成本低，不会再涨到60万的天价。' }
    ],
    keyCatalysts: ['广期所碳酸锂交割结算报告', '宁德时代储能超级大单签约'],
    institutionalPositioning: { cotNetLongContracts: 38000, etfFlow7dUSD: '+$62M', retailSentiment: '62% 周期底部看多' }
  },
  {
    symbol: 'URANIUM',
    assetName: '天然铀精矿连续 (U3O8 Uranium)',
    plainTitle: '全球核能文艺复兴与零碳超级基荷能源燃料 (天然铀)',
    category: '大宗商品',
    subCategory: '零碳基荷核能与战略关键矿产',
    currentPrice: 82.50,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 84,
    coreDriverThesis: '科技七巨头锁定核电供电 AI ＋ 美欧禁止进口俄罗斯浓缩铀 ＋ 哈萨克斯坦产量受限。',
    plainLanguageThesis: '微软、亚马逊、谷歌接连砸下重金重启关闭的核电站（如三里岛核电站），因为只有核电能 24 小时 365 天不刮风不下雨地给 AI 超算中心供电！核电站的燃料就是铀矿。世界最大产地哈萨克斯坦因硫酸短缺减产，美欧立法严禁进口俄铀，供不应求极其严峻。',
    plainActionSummary: '【操作指南】：核能大牛市长达数年，80 美元附近长线分批建仓，锁定全球能源转型核心。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '$79.00 - $88.00 /磅',
        coreLogic: '核电公用事业公司开启年度长协补库谈判，现货市场可流通 U3O8 极度匮乏。',
        keyTriggers: ['TradeTech/UxC 每周现货价格指数', '美国能源部 (DOE) 浓缩铀国产化采购推进'],
        actionTactics: '回踩 $80 顺势买多，止损设在 $76 下方。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '$85.00 - $110.00 /磅',
        coreLogic: '哈萨克斯坦国家原子能公司大幅下调 2025 年产量预期，欧美公用事业买家恐慌性加价抢单。',
        keyTriggers: ['哈原工 (Kazatomprom) 季报减产确认', '多国小型模块化反应堆 (SMR) 审批获准'],
        actionTactics: '坚定持有现货信托 (如 Sprott Uranium Trust) 或头部采矿商。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '$100.00 - $150.00 /磅',
        coreLogic: 'COP28 联合国气候大会超过 20 国誓言将全球核电装机容量翻 3 倍，结构性硬缺口将贯穿至 2035 年。',
        keyTriggers: ['全球新建核反应堆突破 60 座', '科技巨头入股第四代核聚变/裂变项目'],
        actionTactics: '作为未来 10 年确定性最高的清洁能源超级商品长线超配。'
      }
    },
    driverComponents: [
      { name: '全球核电站扩建与重启潮', weight: 45, value: '微软等科技巨头直购核电', impact: 'Positive', description: 'AI 电力首选零碳稳定核电。', plainMeaning: '科技大厂包场核电站，燃料需求成倍增长。' },
      { name: '哈萨克斯坦矿端生产瓶颈', weight: 35, value: '占全球产量 43% 减产', impact: 'Positive', description: '提炼用硫酸短缺难以增产。', plainMeaning: '世界最大的产铀国缺化工厂原料，挖不出更多的铀。' },
      { name: '欧美对俄浓缩铀禁令生效', weight: 20, value: '供应链被迫重塑脱钩', impact: 'Positive', description: '推高西方自由市场溢价。', plainMeaning: '不让买俄罗斯的货，欧美只能去市场上高价抢。' }
    ],
    keyCatalysts: ['UxC 周度现货价格公布', '哈原工年度生产指引下修'],
    institutionalPositioning: { cotNetLongContracts: 19500, etfFlow7dUSD: '+$85M', retailSentiment: '75% 极度看好' }
  }
];
