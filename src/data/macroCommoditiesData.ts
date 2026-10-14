import { AssetDriverProfile } from '../types/macro';

export const COMMODITIES_ASSETS: AssetDriverProfile[] = [
  {
    symbol: 'WTI',
    assetName: '美原油连续 (WTI Crude Oil)',
    plainTitle: '世界工业血液与车轮上的基础能源 (美原油)',
    category: '大宗商品',
    subCategory: '工业基础能源与地缘博弈',
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
    subCategory: '全球原油海上现货定价基准',
    currentPrice: 75.40,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 68,
    coreDriverThesis: '欧洲与中东实物原油贴水 ＋ 霍尔木兹海峡地缘运输风险 ＋ 跨大西洋与美油溢价 (Brent-WTI Spread)。',
    plainLanguageThesis: '全世界三分之二的现货原油贸易都是按布伦特原油来定价的！由于它开采在北海且通过油轮海运，因此对红海胡塞武装袭击油轮、中东地缘冲突的敏感度比美国本土 WTI 更强烈，通常保持 3-4 美元的安全溢价。',
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
        keyTriggers: ['EIA 周四晚间官方天然气库存报告', 'NOAA 8-14 天气温展望模型 (GFS/ECMWF)'],
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
    subCategory: '“铜博士”全球电气化与AI电网',
    currentPrice: 4.42,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 80,
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
    assetName: '伦敦铝连续期货 (LME Aluminum)',
    plainTitle: '轻量化汽车车身、航空航天与高耗能电解金属 (铝)',
    category: '大宗商品',
    subCategory: '高耗能绿色转型与轻量化金属',
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
  }
];
