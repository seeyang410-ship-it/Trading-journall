import { AssetDriverProfile } from '../types/macro';

export const ALL_FOREX_DATA: AssetDriverProfile[] = [
  {
    symbol: 'USDJPY',
    assetName: '美元/日元 (USD/JPY)',
    plainTitle: '全球套息交易 (Carry Trade) 总开关与避险货币 (美日)',
    category: '外汇',
    subCategory: '全球套息交易命脉与避险货币',
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
    subCategory: '全球最大外汇流动性对与欧美利差',
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
    symbol: 'GBPUSD',
    assetName: '英镑/美元 (GBP/USD)',
    plainTitle: '英国央行抗高粘性通胀与伦敦老牌金融城货币 (镑美)',
    category: '外汇',
    subCategory: 'G10主流货币与欧洲跨大西洋利差',
    currentPrice: 1.2950,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 72,
    coreDriverThesis: '英国服务业通胀极度粘性迫使英国央行 (BOE) 慢速降息 ＋ 英国与欧美利差优势 ＋ 新政府财政整顿。',
    plainLanguageThesis: '英国的物价和服务业工资涨幅比美国欧洲更难打下来！英国央行不敢轻易大降息，导致英镑的官方利息甚至一度比美元还硬气；加上伦敦作为全球最大的外汇交易中心，英镑在非美货币中表现出极强的韧性。',
    plainActionSummary: '【操作指南】：1.2800 强支撑买多，反弹至 1.3200-1.3300 获利了结。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '1.2850 - 1.3120',
        coreLogic: '英国核心服务业通胀率维持在 5% 附近，英国央行委员鹰派表态支撑英镑多头在 1.29 蓄势。',
        keyTriggers: ['英国国家统计局月度工资与失业率', '英国央行 MPC 货币政策会议票数分布'],
        actionTactics: '回踩 1.2880 做多，突破 1.3050 加仓，止损设在 1.2800。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '1.3000 - 1.3500',
        coreLogic: '美联储降息步伐快于英国央行，美英利差倒挂加深，支撑镑美汇率走出向上斜率。',
        keyTriggers: ['英美利差中枢上移', '新工党政府财政预算案平稳落地'],
        actionTactics: '波段持有，逢回调均线买入。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '1.3200 - 1.4000',
        coreLogic: '摆脱脱欧后最初的政治动荡期，英国与欧盟确立新型实用合作框架，英镑历史低估值回补。',
        keyTriggers: ['英国与欧盟达成新一轮贸易便利化协议'],
        actionTactics: '战略性分散配置一部分英镑头寸。'
      }
    },
    driverComponents: [
      { name: '英国服务业薪资通胀顽固', weight: 45, value: '薪资年增近 5%', impact: 'Positive', description: '逼迫英国央行保持高利率。', plainMeaning: '英国涨工资太猛，央行不敢随便降息，英镑利息值钱。' },
      { name: '美英利差优势阶段性确立', weight: 35, value: '英债收益率高于德法国债', impact: 'Positive', description: '欧洲资金涌入伦敦赚息差。', plainMeaning: '在欧洲买英国债券利息最高，吸引外资买英镑。' },
      { name: '英国公共债务高企掣肘', weight: 20, value: '国债占 GDP 接近 100%', impact: 'Negative', description: '限制财政刺激空间。', plainMeaning: '政府借钱也很多，不敢随便乱搞大规模减税。' }
    ],
    keyCatalysts: ['英国央行利率决议', '英国每月 CPI 核心数据公布'],
    institutionalPositioning: { cotNetLongContracts: 38000, etfFlow7dUSD: '+$42M', retailSentiment: '60% 偏多' }
  },
  {
    symbol: 'AUDUSD',
    assetName: '澳元/美元 (AUD/USD)',
    plainTitle: '全球矿产大宗资源晴雨表与中国经贸联动大宗货币 (澳美)',
    category: '外汇',
    subCategory: '大宗商品货币与全球经济先行指标',
    currentPrice: 0.6580,
    directionBias: 'BULLISH (强劲看多)',
    biasConfidence: 74,
    coreDriverThesis: '澳洲矿产品（铁矿石、煤炭、锂矿）出口结汇 ＋ 澳洲联储 (RBA) 坚持鹰派不轻易降息 ＋ 中国刺激内需。',
    plainLanguageThesis: '澳元是全世界最纯粹的“大宗商品与资源货币”！澳大利亚地下全是铁矿石、黄金、天然气和锂矿。中国一旦出台大规模基建和财政刺激，全球原材料暴涨，澳元就会第一个坐火箭；而且澳洲联储态度强硬，坚决抗通胀不降息。',
    plainActionSummary: '【操作指南】：0.6450-0.6500 黄金底部做多，目标看至 0.6850-0.7000。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看多 (Bullish)',
        targetRange: '0.6520 - 0.6720',
        coreLogic: '澳洲劳动力市场极度紧俏，失业率维持在 4% 低位，澳洲联储行长表态短期内绝不降息。',
        keyTriggers: ['澳洲月度就业人口增长', '铁矿石现货到岸价'],
        actionTactics: '回踩 0.6550 做多，突破 0.6650 加仓，止损设在 0.6480。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看多 (Bullish)',
        targetRange: '0.6650 - 0.7050',
        coreLogic: '中国万亿特别国债资金全面下拨带动矿石采购，全球工业金属需求复苏带动澳元走出顺周期牛市。',
        keyTriggers: ['主要贸易国基建开工率跳升', '美联储持续降息压低美元指数'],
        actionTactics: '顺应全球大宗商品周期中线做多澳元。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '0.7000 - 0.7600',
        coreLogic: '澳洲作为全球未来 20 年关键能源转型金属（锂、稀土、铜、铀）超级供应国，长线身价稳步重估。',
        keyTriggers: ['全球能源转型绿色矿产长期采购长约落地'],
        actionTactics: '作为对冲全球大宗商品通胀的最佳外汇货币资产。'
      }
    },
    driverComponents: [
      { name: '澳洲联储 RBA 鹰派利率立场', weight: 45, value: '基准利率 4.35% 坚挺不降', impact: 'Positive', description: '利息维持在主要非美发达国高位。', plainMeaning: '澳洲央行死活不降息，吸引全球资金存澳元。' },
      { name: '中国钢铁与矿石出口顺差', weight: 35, value: '铁矿石长期提供数百亿美元结汇', impact: 'Positive', description: '大宗商品贸易硬支柱。', plainMeaning: '只要大矿山开机卖矿，就有源源不断的美元换成澳元。' },
      { name: '全球股市风险偏好波动', weight: 20, value: '高贝塔风险货币', impact: 'Neutral', description: '大盘恐慌时容易短暂跟随下杀。', plainMeaning: '股市大跌时大家容易暂时抛弃澳元，但反弹也最猛。' }
    ],
    keyCatalysts: ['澳洲联储利率决议会议纪要', '中国重要经济刺激政策出台'],
    institutionalPositioning: { cotNetLongContracts: 18000, etfFlow7dUSD: '+$28M', retailSentiment: '62% 偏多' }
  },
  {
    symbol: 'USDMYR',
    assetName: '美元/马来西亚令吉 (USD/MYR)',
    plainTitle: '东南亚跨国数据中心外资涌入与国行稳健货币标杆 (美马)',
    category: '外汇',
    subCategory: '东南亚核心货币与外商投资热土',
    currentPrice: 4.4350,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 76,
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
  {
    symbol: 'USDCNH',
    assetName: '美元/离岸人民币 (USD/CNH)',
    plainTitle: '世界第二大经济体与去美元化贸易清算核心大国货币 (美离)',
    category: '外汇',
    subCategory: '大国经贸博弈与主权跨境本币清算',
    currentPrice: 7.2450,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 70,
    coreDriverThesis: '中国央行逆周期因子与离岸人民币流动性抽紧 ＋ 中美利差分化 ＋ 外贸出口巨额真金白银结汇。',
    plainLanguageThesis: '人民币汇率的定海神针在中国央行手里！央行每天公布的中间价“逆周期因子”死死封住了恶意做空的投机客；中国每年拥有高达近万亿美元的巨额贸易顺差，企业年底必须换回人民币发工资交税。中美利差收窄后，人民币升值弹性很大。',
    plainActionSummary: '【操作指南】：7.28-7.30 区域坚决做空美离（看涨人民币），7.15-7.18 获利止盈。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '7.2100 - 7.2750',
        coreLogic: '央行中间价持续释放强监管维稳信号，离岸央票发行吸收多余流动性，在 7.25 附近多空均衡。',
        keyTriggers: ['每日中间价与即期汇率偏离度', '香港离岸人民币 HIBOR 拆借利率'],
        actionTactics: '靠近 7.27 做空，靠近 7.22 止盈，止损 7.31。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '7.1200 - 7.2500',
        coreLogic: '国内财政与降准降息政策协同发力修复实体预期，美联储降息促使积压未结汇的数千亿美元外贸顺差集中结汇。',
        keyTriggers: ['中国月度贸易顺差结汇率提升', '美中长端利差倒挂收窄至 150bp 以内'],
        actionTactics: '波段看多人民币，顺应政策底与外贸结汇周期。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '6.8000 - 7.1500',
        coreLogic: '人民币在金砖国家、中东石油贸易本币结算份额持续扩大，从单纯贸易结算货币向全球储备资产跃升。',
        keyTriggers: ['跨境人民币支付系统 (CIPS) 交易额年增 30%', '海外主权基金增持人民币资产'],
        actionTactics: '坚定将优质中国核心股权资产与人民币作为全球多元分散底座。'
      }
    },
    driverComponents: [
      { name: '央行逆周期因子强硬维稳', weight: 45, value: '政策底线清晰明确', impact: 'Negative', description: '严厉打击恶意做空套利。', plainMeaning: '央行工具箱里牌很多，坚决不让人民币失控贬值。' },
      { name: '全球制造产业链巨额顺差', weight: 35, value: '年贸易顺差近万亿美元', impact: 'Negative', description: '真金白银实物出海支撑。', plainMeaning: '全世界买中国商品付的全是外汇，结汇底子厚。' },
      { name: '中美短期绝对利差压制', weight: 20, value: '利差仍在 180bp 左右', impact: 'Positive', description: '资金短期仍有吃美元高息倾向。', plainMeaning: '存美元利息稍微高一点点，制约快速大幅升值。' }
    ],
    keyCatalysts: ['央行降准降息政策落地', '出口企业年底集中结汇潮'],
    institutionalPositioning: { cotNetLongContracts: 28000, etfFlow7dUSD: '+$65M', retailSentiment: '60% 稳中看升' }
  },
  {
    symbol: 'DXY',
    assetName: '美元指数 (US Dollar Index)',
    plainTitle: '全球资产定价之锚与流动性潮汐总开关 (美元指数)',
    category: '外汇',
    subCategory: '全球法币基准与流动性定价之锚',
    currentPrice: 104.25,
    directionBias: 'RANGE (震荡偏弱)',
    biasConfidence: 75,
    coreDriverThesis: '美联储步入降息周期 ＋ 美国财政赤字高企稀释法币购买力 ＋ 全球央行去美元化储备多元化。',
    plainLanguageThesis: '美元指数是全球所有资产的“地心引力”！美元强，大宗商品、非美货币和新兴市场股票就容易跌；美元走弱，资金就会如潮水般涌向黄金、原油、比特币和全球股市。',
    plainActionSummary: '【操作指南】：反弹至 105.50-106.00 区域逢高建立非美多头与黄金多头。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '103.50 - 105.80',
        coreLogic: '短期美国非农就业数据与黏性通胀引发降息预期拉扯，多空在 104 整数关口反复争夺。',
        keyTriggers: ['美国核心 PCE 通胀月率', '非农就业新增人数'],
        actionTactics: '105.20 以上做空美元，103.60 附近获利平仓。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '100.50 - 103.50',
        coreLogic: '随着美联储继续降息并向中性利率靠拢，美国经济相对例外论溢价消退，美元利差优势逐步收敛。',
        keyTriggers: ['美联储点阵图下移', '欧日央行政策分化收紧'],
        actionTactics: '战略性逢高减持美元资产，增持实物硬资产与非美货币。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '95.00 - 100.00',
        coreLogic: '美国 36 万亿美元国债利息支出沉重，长期必须通过法币贬值化解债务压力，全球储备货币霸权缓慢松动。',
        keyTriggers: ['金砖多边跨境支付清算扩大', '全球央行外汇储备美元占比降破 55%'],
        actionTactics: '长期配置黄金与生产性硬资产对冲法币信用贬值。'
      }
    },
    driverComponents: [
      { name: '美联储利率下行周期', weight: 45, value: '基准利率逐步调降', impact: 'Negative', description: '美元无风险收益率下滑。', plainMeaning: '存美元的利息变少了，资金不再疯狂抢购美元。' },
      { name: '美国天量债务财政稀释', weight: 35, value: '年赤字超 1.8 万亿美元', impact: 'Negative', description: '信用评级和购买力受损。', plainMeaning: '美国政府借债太多，不得不印更多钞票来填坑。' },
      { name: '全球地缘动荡避险属性', weight: 20, value: '关键时刻避险回流', impact: 'Positive', description: '突发黑天鹅时全球资金依然本能抢购美元。', plainMeaning: '一旦打仗或危机，大家第一反应还是换美元现金保命。' }
    ],
    keyCatalysts: ['美联储 FOMC 利率决议声明', '美国财政部季度发债计划 (QRA)'],
    institutionalPositioning: { cotNetLongContracts: 12000, etfFlow7dUSD: '-$120M', retailSentiment: '55% 观望' }
  },
  {
    symbol: 'USDCHF',
    assetName: '美元/瑞郎 (USD/CHF)',
    plainTitle: '欧洲大陆终极硬通货与全球避险防波堤 (美瑞)',
    category: '外汇',
    subCategory: '经典欧洲避险货币与瑞士法郎流动性',
    currentPrice: 0.8845,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 76,
    coreDriverThesis: '瑞士央行通胀管理卓越 ＋ 瑞士法郎传统黄金避险信用 ＋ 美瑞利差走向收窄。',
    plainLanguageThesis: '瑞士法郎是全球最稳健的纸币！瑞士国家几乎没有巨额国债，还有巨额黄金和外汇储备做后盾。每当地缘危机爆发或全球股市暴跌，全球富豪首选把钱换成瑞士法郎存进瑞士银行避险。',
    plainActionSummary: '【操作指南】：反弹至 0.8950-0.9020 分批沽空美瑞，目标下看 0.8650。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '0.8750 - 0.8920',
        coreLogic: '中东与地缘局势频发，欧洲避险资本持续涌入瑞郎资产。',
        keyTriggers: ['瑞士央行 SNB 利率决议', '欧洲地缘局势最新动态'],
        actionTactics: '逢反弹遇阻开空，止损 0.8980。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '0.8500 - 0.8800',
        coreLogic: '美联储降息缩减美瑞利差，长期资本固化在超稳健主权避险资产。',
        keyTriggers: ['美联储连续降息', '瑞士核心 CPI 稳定区间'],
        actionTactics: '长线空单底仓持有。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '0.8200 - 0.8600',
        coreLogic: '全球主权信用货币评级普遍下行背景下，瑞郎作为超低负债法币的相对稀缺性凸显。',
        keyTriggers: ['全球主权债务危机评级下调'],
        actionTactics: '长期多头配置瑞士资产。'
      }
    },
    driverComponents: [
      { name: '瑞士超低国家负债率与黄金支撑', weight: 45, value: '国家负债率仅约 38%', impact: 'Negative', description: '全球最健康的资产负债表。', plainMeaning: '瑞士不乱印钱，法郎含金量极高。' },
      { name: '美瑞利差逐步压制', weight: 35, value: '利差收窄预期兑现', impact: 'Negative', description: '做多美元吃息诱因下降。', plainMeaning: '美元利息下滑促使资本回流瑞郎。' },
      { name: '瑞士央行口头干预防止瑞郎过强', weight: 20, value: '警惕出口企业承压', impact: 'Positive', description: '瑞士央行偶尔抛瑞郎买外币遏制过快升值。', plainMeaning: '瑞郎太贵会导致瑞士手表巧克力不好卖，央行偶尔会按一按。' }
    ],
    keyCatalysts: ['瑞士央行通胀评估报告', '欧洲宏观避险事件'],
    institutionalPositioning: { cotNetLongContracts: -22000, etfFlow7dUSD: '+$80M', retailSentiment: '63% 逢低买入瑞郎' }
  },
  {
    symbol: 'USDCAD',
    assetName: '美元/加元 (USD/CAD)',
    plainTitle: '北美原油大动脉与大宗商品货币对 (美加)',
    category: '外汇',
    subCategory: '能源大宗商品货币与北美经贸周期',
    currentPrice: 1.3860,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 72,
    coreDriverThesis: '加拿大央行降息进度 ＋ WTI 原油价格直接联动 ＋ 北美自由贸易协定博弈。',
    plainLanguageThesis: '加元是典型的“石油货币”！加拿大向美国大量出口原油和天然气，当油价暴涨时，加拿大赚得盆满钵满，加元大涨（USDCAD 下跌）；当加拿大央行降息快于美联储、或者原油受挫时，加元承压。',
    plainActionSummary: '【操作指南】：油价反弹叠加 1.3950 高位阻力时逢高做空 USDCAD。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '1.3780 - 1.3980',
        coreLogic: '加拿大央行降息步伐激进但已部分反映在汇价中，原油在 70 美元附近筑底支撑加元。',
        keyTriggers: ['WTI 原油周度走势', '加拿大月度 CPI 及失业率'],
        actionTactics: '1.3950 上方轻仓试空，1.3790 附近接多。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '1.3450 - 1.3800',
        coreLogic: '美国后续降息补足利差劣势，大宗商品周期回暖助力加元价值回归。',
        keyTriggers: ['OPEC+ 减产挺价落实', '北美汽车与能源供应链数据'],
        actionTactics: '波段布局空单。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '1.3000 - 1.3500',
        coreLogic: '加拿大丰富的水电、稀土、锂矿与油砂资源在全球能源与制造业供应链重构中受益。',
        keyTriggers: ['全球能源与关键矿产战略协议落地'],
        actionTactics: '大宗牛市中坚定持有资源国货币资产。'
      }
    },
    driverComponents: [
      { name: '全球 WTI 原油价格走势', weight: 45, value: '加元原油贸易顺差依存度极高', impact: 'Negative', description: '油价涨则加元强。', plainMeaning: '加拿大卖石油赚大钱，油价一涨加元就值钱。' },
      { name: '美加央行政策利差', weight: 35, value: '加拿大先行降息 50bp', impact: 'Positive', description: '短期利差偏向美元。', plainMeaning: '加拿大为了保房地产先降息了，加元短期利息吃亏。' },
      { name: '北美贸易保护主义关税风险', weight: 20, value: '潜在关税威胁博弈', impact: 'Positive', description: '可能对部分加国商品出口构成压力。', plainMeaning: '美国若搞贸易壁垒，加元短期易受惊吓。' }
    ],
    keyCatalysts: ['加拿大央行利率决议', 'EIA 原油库存报告'],
    institutionalPositioning: { cotNetLongContracts: -35000, etfFlow7dUSD: '-$40M', retailSentiment: '58% 看跌加元' }
  },
  {
    symbol: 'GBPJPY',
    assetName: '英镑/日元 (GBP/JPY)',
    plainTitle: '外汇市场剧烈波动之王与全球风险偏好超级放大器 (镑日)',
    category: '外汇',
    subCategory: '高波动套息交叉盘与全球风险偏好放大器',
    currentPrice: 196.80,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 80,
    coreDriverThesis: '日英超大利差支撑进入尾声 ＋ 日本央行加息提速 ＋ 全球风险资产去杠杆多头踩踏。',
    plainLanguageThesis: 'GBP/JPY 在华尔街被交易员戏称为“庞然恶龙 (The Beast)”！因为它的波动率是普通货币对的 3 到 5 倍。过去几年因为英镑利息 5% 而日元接近 0%，全球对冲基金疯狂借日元买英镑。一旦风吹草动日元加息，庞大的多头踩踏平仓能让它一天暴跌 500 点！',
    plainActionSummary: '【操作指南】：反弹至 198-200 区域重拳做空，破位 193 顺势追空，单笔止损务必带好。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '192.00 - 198.50',
        coreLogic: '上方 198-200 是密集成交套牢盘阻力区，英国央行降息预期升温而日本鹰派抬头。',
        keyTriggers: ['英国央行 MPC 票型分布', '日央行利率决议及言论'],
        actionTactics: '197.50-198.80 分批建空仓，第一止盈位 193.50。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '185.00 - 193.00',
        coreLogic: '全球套息资本撤退，英国经济增长乏力逼迫英国央行加速降息。',
        keyTriggers: ['英国 CPI 跌入 2% 区间', '日元空头头寸全面回补'],
        actionTactics: '中期坚定持有镑日空单，顺应套息反转大浪潮。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '175.00 - 185.00',
        coreLogic: '历史均值回归，极端利差失衡走向纠偏。',
        keyTriggers: ['全球金融周期去杠杆大潮'],
        actionTactics: '大周期空头配置。'
      }
    },
    driverComponents: [
      { name: '日英利差拐点反转', weight: 45, value: '日央行加息 vs 英央行降息', impact: 'Negative', description: '套息交易利润空间崩塌。', plainMeaning: '原来借日元买英镑躺赚 5% 的游戏彻底玩不转了。' },
      { name: '全球股市与风险偏好联动', weight: 35, value: '高贝塔避险属性敏锐', impact: 'Negative', description: '一旦市场大跌资金瞬间抛售英镑买回日元。', plainMeaning: '大盘一跳水，镑日跌得比谁都狠。' },
      { name: '英国通胀韧性提供短期支撑', weight: 20, value: '服务业通胀偏高', impact: 'Positive', description: '让英国央行降息稍微瞻前顾后。', plainMeaning: '英国服务业工资还没完全降下来，降息节奏稍慢。' }
    ],
    keyCatalysts: ['日本央行加息行动', '英国核心服务业通胀公布'],
    institutionalPositioning: { cotNetLongContracts: -48000, etfFlow7dUSD: '-$60M', retailSentiment: '72% 盲目做多' }
  },
  {
    symbol: 'EURJPY',
    assetName: '欧元/日元 (EUR/JPY)',
    plainTitle: '欧洲经济一体化与日本货币政策正常化历史碰撞 (欧日)',
    category: '外汇',
    subCategory: '主流流动性交叉盘与套息交易解体',
    currentPrice: 164.50,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 78,
    coreDriverThesis: '欧洲央行因经济增长停滞抢跑降息 ＋ 日本央行逆势加息 ＋ 套息多头平仓潮。',
    plainLanguageThesis: '欧洲经济（尤其是德国工业）熄火逼迫欧央行连续降息，而日本走出通缩开始加息。两相挤压下，借日元买欧元的对冲基金正在排队关仓，EUR/JPY 正在走向周期性见顶回落。',
    plainActionSummary: '【操作指南】：反弹至 166.00-167.50 区域做空，破位 162.00 加仓，目标 158.00。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '161.50 - 165.80',
        coreLogic: '欧央行降息预期板上钉钉，日元平仓盘在 165 上方构成密集卖压。',
        keyTriggers: ['欧元区 PMI 制造业景气度', '日本央行货币政策指引'],
        actionTactics: '165.20-166.00 分批做空，止损 167.20。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '155.00 - 162.00',
        coreLogic: '欧日利差大幅收窄至 150bp 以内，套息资本撤退形成自我强化的平仓雪崩。',
        keyTriggers: ['欧央行累计降息 100bp', '日本通胀持续达标'],
        actionTactics: '中线波段持有空单。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '145.00 - 155.00',
        coreLogic: '欧洲经济结构性老龄化与竞争力挑战，汇率向长期购买力平价 (PPP) 均值回归。',
        keyTriggers: ['全球去全球化供应链格局重塑'],
        actionTactics: '逢高战略性做空。'
      }
    },
    driverComponents: [
      { name: '欧日政策利差加速倒向收窄', weight: 50, value: '欧降日升双向挤压', impact: 'Negative', description: '利差诱惑几乎归零。', plainMeaning: '欧洲利息在掉，日本利息在涨，借日元买欧元不赚钱了。' },
      { name: '欧洲实体制造业疲软', weight: 30, value: '德国经济陷入停滞边缘', impact: 'Negative', description: '欧元基本面缺乏内生增长支撑。', plainMeaning: '欧洲工厂订单不足，欧元基本面虚弱。' },
      { name: '全球避险情绪冲击', weight: 20, value: '日元天然避险资金回流', impact: 'Negative', description: '地缘恐慌时日元买盘激增。', plainMeaning: '一旦出事资金就买日元还贷。' }
    ],
    keyCatalysts: ['欧洲央行管理委员会决议', '日本春斗工资增长确认'],
    institutionalPositioning: { cotNetLongContracts: -52000, etfFlow7dUSD: '+$95M', retailSentiment: '66% 抄底做多' }
  },
  {
    symbol: 'USDSGD',
    assetName: '美元/新加坡元 (USD/SGD)',
    plainTitle: '东南亚金融中心与全球高净值财富避风港 (美新)',
    category: '外汇',
    subCategory: '亚洲核心金融中心与新加坡金管局(MAS)货币走廊',
    currentPrice: 1.3280,
    directionBias: 'BEARISH (稳步看空)',
    biasConfidence: 82,
    coreDriverThesis: '全球家族办公室与高净值资本源源不断涌入新加坡 ＋ 新加坡金管局 (MAS) 强新币升值走廊防通胀 ＋ 美元走弱。',
    plainLanguageThesis: '新加坡是亚洲的“瑞士”！全球富豪和跨国跨国总部都在排队把钱存进新加坡，新币需求源源不断。更关键的是，新加坡央行不调利息，而是直接调控汇率（让新币稳步升值来抵御海外通胀），所以美新常年处于极度坚挺的下行通道中！',
    plainActionSummary: '【操作指南】：反弹至 1.3400-1.3480 做空 USDSGD，目标看跌至 1.3100 甚至跌破 1.30。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '1.3200 - 1.3350',
        coreLogic: '新加坡金管局维持 S$NEER 名义有效汇率升值坡度不变，美元反弹均遇强劲结汇与财富入驻买盘。',
        keyTriggers: ['MAS 货币政策半年报告', '新加坡月度非石油出口 (NODX)'],
        actionTactics: '1.3320 以上开空，止损 1.3420。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '1.3000 - 1.3250',
        coreLogic: '美联储利率下行，新加坡作为顶级 AAA 主权信用国家吸引全球战略性避险多头。',
        keyTriggers: ['全球家族办公室注册数量再创新高', '美新利差倒挂收敛'],
        actionTactics: '长线坚定做多新元（做空 USDSGD）。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '1.2600 - 1.3000',
        coreLogic: '亚洲财富管理与金融结算超级枢纽地位不可动摇，新币成为全球最优质法币之一。',
        keyTriggers: ['亚洲本币跨国清算中心落地新加坡'],
        actionTactics: '资产配置将新元作为核心抗风险货币底仓。'
      }
    },
    driverComponents: [
      { name: '全球财富资本净流入新加坡', weight: 45, value: '资产管理总规模 (AUM) 连年增长', impact: 'Negative', description: '真金白银换新币买资产。', plainMeaning: '全球富豪的钱源源不断流进新加坡，推升新币汇率。' },
      { name: 'MAS 强硬货币走廊升值政策', weight: 35, value: '维持汇率升值倾角抗通胀', impact: 'Negative', description: '政策导向力挺新元坚挺。', plainMeaning: '新加坡央行白纸黑字要求新币升值来对抗进口物价上涨。' },
      { name: '全球贸易景气度周期波动', weight: 20, value: '高度外向型港口贸易经济体', impact: 'Neutral', description: '受全球航运贸易周期轻微扰动。', plainMeaning: '若全球贸易萧条，可能短期轻微影响外贸增长。' }
    ],
    keyCatalysts: ['新加坡金管局 MAS 议息声明', '新加坡季度 GDP 增长数据'],
    institutionalPositioning: { cotNetLongContracts: 19000, etfFlow7dUSD: '+$55M', retailSentiment: '65% 稳健看涨新币' }
  },
  {
    symbol: 'AUDJPY',
    assetName: '澳元/日元 (AUD/JPY)',
    plainTitle: '全球风险偏好与大宗商品套息风向标 (澳日)',
    category: '外汇',
    subCategory: '高波动套息交叉盘与全球风险偏好放大器',
    currentPrice: 99.80,
    directionBias: 'RANGE (震荡分化)',
    biasConfidence: 75,
    coreDriverThesis: '澳洲矿业大宗商品出口与维持 4.35% 高利率 ＋ 日本央行加息对抗套息交易。',
    plainLanguageThesis: 'AUD/JPY 是全球交易员最爱的“风险情绪温度计”！全球经济繁荣、股市大涨、铜铁矿涨价时，资金借 0% 利率日元买 4.35% 的澳元吃利息，AUDJPY 就会飙涨；一旦发生地缘恐慌或日元加息，套息资金火速撤退。',
    plainActionSummary: '【操作指南】：96.50-97.50 企稳做多，反弹至 102.50-104.00 止盈或反手试空。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '98.00 - 101.50',
        coreLogic: '短期受全球股市风险情绪及铁矿石价格波动牵制，围绕 100 整数大关震荡拉锯。',
        keyTriggers: ['全球主要股市风险偏好', '铁矿石与铜价走势', '日本央行货币政策指引'],
        actionTactics: '回踩 98.20 附近低吸，逼近 101.50 获利减半。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '94.00 - 102.00',
        coreLogic: '日本央行加息压缩套息利差，但澳洲资源出口韧性提供底部支撑。',
        keyTriggers: ['澳洲联储 RBA 议息决议', '中澳双边贸易商品采购量'],
        actionTactics: '区间波段操作，依托 95 关口防守。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '95.00 - 110.00',
        coreLogic: '全球绿色基建与新能源上游对澳洲锂、稀土、铜、铀等战略矿产长期依赖。',
        keyTriggers: ['全球能源转型对关键矿物长期采购合同'],
        actionTactics: '长线逢深幅回调时分批建仓。'
      }
    },
    driverComponents: [
      { name: '全球工业大宗商品价格景气度', weight: 45, value: '矿产资源高位运行', impact: 'Positive', description: '直接拉动澳元现汇买盘。', plainMeaning: '矿石卖得好，换澳元资金多。' },
      { name: '日元利率正常化与套息平仓', weight: 35, value: '日央行加息收紧流动性', impact: 'Negative', description: '压制套息杠杆头寸。', plainMeaning: '日元利息涨了，借钱套利成本变贵。' },
      { name: '中澳贸易全面回暖与经贸便利', weight: 20, value: '各项关税壁垒基本消除', impact: 'Positive', description: '提供结汇基本盘。', plainMeaning: '中澳贸易顺畅，澳元底气足。' }
    ],
    keyCatalysts: ['澳洲联储 RBA 利率决议', '日本央行加息决议', '全球制造业 PMI'],
    institutionalPositioning: { cotNetLongContracts: 14000, etfFlow7dUSD: '+$35M', retailSentiment: '58% 中性偏多' }
  },
  {
    symbol: 'EURGBP',
    assetName: '欧元/英镑 (EUR/GBP)',
    plainTitle: '欧洲大陆与英伦海峡经贸基本面对决 (欧镑)',
    category: '外汇',
    subCategory: '高波动套息交叉盘与欧洲区域利差',
    currentPrice: 0.8350,
    directionBias: 'RANGE (震荡偏弱)',
    biasConfidence: 74,
    coreDriverThesis: '欧洲央行降息快于英国央行 ＋ 英国服务业粘性通胀推升英镑息差 ＋ 欧陆工业复苏迟缓。',
    plainLanguageThesis: 'EUR/GBP 是欧洲两大经济体的天平。英国的物价和服务业工资更难降下来，英国央行被迫维持较高利息；而欧洲央行为了拯救德国工业早已先行连续降息。这使得英镑利息明显高于欧元，EUR/GBP 长期处于承压走弱通道。',
    plainActionSummary: '【操作指南】：反弹至 0.8420-0.8480 逢高沽空，目标看 0.8250-0.8300。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '0.8280 - 0.8420',
        coreLogic: '欧央行降息预期完全定型，英债收益率高于德债收益率，资金流向英伦三岛。',
        keyTriggers: ['欧元区及英国月度 CPI 对比', '欧英央行议息声明'],
        actionTactics: '反弹至 0.8390 开空，止损 0.8460。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '0.8200 - 0.8450',
        coreLogic: '欧英利差持续维持在 75-100bp 倒挂水平，压制 EUR/GBP 中枢。',
        keyTriggers: ['英国财政预算案执行效果', '德国制造业新订单拐点'],
        actionTactics: '波段持有空单。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '震荡 (Range/Neutral)',
        targetRange: '0.8200 - 0.8800',
        coreLogic: '地缘毗邻与贸易互相依存，汇率长期围绕购买力平价箱体波动。',
        keyTriggers: ['欧英经贸合作深化协议'],
        actionTactics: '跌破 0.8250 后逐步止盈。'
      }
    },
    driverComponents: [
      { name: '欧英官方利差倒挂', weight: 50, value: '英镑利率高于欧元 100bp+', impact: 'Negative', description: '推升英镑相对吸引力。', plainMeaning: '存英镑利息比存欧元高不少。' },
      { name: '欧洲核心经济体景气度偏弱', weight: 30, value: '德国经济增速徘徊零附近', impact: 'Negative', description: '拖累欧元基本面。', plainMeaning: '欧洲大陆经济引擎熄火。' },
      { name: '脱欧后贸易摩擦边际钝化', weight: 20, value: '新务实合作推进', impact: 'Neutral', description: '政治黑天鹅风险降温。', plainMeaning: '双方经贸关系逐步走向务实稳定。' }
    ],
    keyCatalysts: ['欧洲央行利率决议', '英国央行 MPC 利率决议'],
    institutionalPositioning: { cotNetLongContracts: -24000, etfFlow7dUSD: '-$45M', retailSentiment: '62% 试图抄底欧元' }
  },
  {
    symbol: 'USDTHB',
    assetName: '美元/泰铢 (USD/THB)',
    plainTitle: '东南亚旅游业复苏与区域外贸关键新兴货币 (美泰)',
    category: '外汇',
    subCategory: '亚洲与新兴市场外汇货币对',
    currentPrice: 34.20,
    directionBias: 'BEARISH (逢高看空)',
    biasConfidence: 73,
    coreDriverThesis: '全球入境旅游收入暴增 ＋ 泰国经常账户重回顺差 ＋ 黄金储备与外资回流。',
    plainLanguageThesis: '泰铢是东南亚最有韧性的货币之一！泰国拥有庞大的国际旅游业，每年数千万国际旅客带着美元、欧元在泰国消费换泰铢；同时泰国老百姓热衷买卖实物黄金，当国际金价大涨且美元走弱时，泰铢升值动能极其充足。',
    plainActionSummary: '【操作指南】：反弹至 34.80-35.20 做空 USDTHB，看泰铢升值至 33.00。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '33.80 - 34.60',
        coreLogic: '旅游旺季外汇收入结算高峰，泰国央行维持汇率平稳偏强走势。',
        keyTriggers: ['泰国月度旅游入境人数', '泰国经常账户收支报告'],
        actionTactics: '34.50 附近开空，止损 35.00。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '32.80 - 34.20',
        coreLogic: '美联储持续降息引导美元资产流出，东南亚新兴市场本币普遍反弹走强。',
        keyTriggers: ['美联储降息频次', '全球旅游业消费景气度'],
        actionTactics: '中长线看好泰铢升值。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '31.50 - 33.50',
        coreLogic: '东盟区域内一体化贸易与制造业外包转移促进泰国长期外贸顺差。',
        keyTriggers: ['区域全面经济伙伴关系协定 (RCEP) 红利'],
        actionTactics: '外贸企业逢高结汇。'
      }
    },
    driverComponents: [
      { name: '跨国旅游外汇流入', weight: 45, value: '年游客超 3500 万人次', impact: 'Negative', description: '真金白银结汇换泰铢。', plainMeaning: '外国游客疯狂来泰国花钱换泰铢。' },
      { name: '经常账户由逆转顺', weight: 35, value: '顺差稳步扩大', impact: 'Negative', description: '基本面稳健。', plainMeaning: '国家外贸和旅游开始净赚钱了。' },
      { name: '泰国国内政局与财政刺激争议', weight: 20, value: '数字钱包补贴刺激消费', impact: 'Neutral', description: '提振内需但增加财政赤字。', plainMeaning: '政府发钱促消费，经济有托底。' }
    ],
    keyCatalysts: ['泰国央行 BOT 利率决议', '泰国季度 GDP 及入境统计'],
    institutionalPositioning: { cotNetLongContracts: 11000, etfFlow7dUSD: '+$22M', retailSentiment: '60% 看好泰铢' }
  },
  {
    symbol: 'USDINR',
    assetName: '美元/印度卢比 (USD/INR)',
    plainTitle: '全球增长最快新兴大国与央行严厉外汇干预货币 (美印)',
    category: '外汇',
    subCategory: '亚洲与新兴市场外汇货币对',
    currentPrice: 84.40,
    directionBias: 'RANGE (央行强力控盘)',
    biasConfidence: 78,
    coreDriverThesis: '印度央行 (RBI) 动用超 7000 亿美元外储强力维稳 ＋ 印度经济 7% 强劲增速 ＋ 进口原油赤字。',
    plainLanguageThesis: '印度卢比几乎是全世界被央行“管得最严”的货币！印度央行手里囤着 7000 亿美元外汇储备，只要有人敢投机做空卢比，央行就直接抛美元砸盘维稳；同时印度经济增速全球名列前茅，但因大量进口石油存在贸易赤字，汇率呈现极其狭窄的微幅爬坡走势。',
    plainActionSummary: '【操作指南】：波动率被央行死死压制，适合低风险套利或逢 84.80 高位轻仓试空。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '83.90 - 84.60',
        coreLogic: '印度央行外汇管理工具箱坚决熨平一切波动，日内波动通常不足 10 个基点。',
        keyTriggers: ['印度央行干预买卖汇率动态', '印度月度外汇储备总额更新'],
        actionTactics: '窄幅区间交易，84.50 附近做空，84.10 止盈。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '震荡 (Range/Neutral)',
        targetRange: '83.50 - 84.80',
        coreLogic: '外资通过印度股市及国债指数纳入 (JPMorgan EM Index) 持续流入，对冲原油贸易赤字。',
        keyTriggers: ['全球新兴市场指数被动买入规模', '原油现货进口价格'],
        actionTactics: '适合低杠杆套息持有。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '震荡 (Range/Neutral)',
        targetRange: '82.00 - 86.00',
        coreLogic: '人口红利与制造业代工崛起提供长远造血底盘。',
        keyTriggers: ['印度制造业出口占 GDP 比重提升'],
        actionTactics: '长线配置印度优质资产。'
      }
    },
    driverComponents: [
      { name: '印度央行巨额外汇储备维稳', weight: 50, value: '外储破 7000 亿美元创纪录', impact: 'Negative', description: '随时出手平抑做空狂潮。', plainMeaning: '央行手里子弹极多，谁也打不穿它的防线。' },
      { name: '原油进口引发的贸易逆差', weight: 30, value: '85% 原油依赖进口', impact: 'Positive', description: '给卢比带来天然汇流流失压力。', plainMeaning: '买石油花太多外汇，限制卢比升值。' },
      { name: '外资大举增持印度国债和股票', weight: 20, value: '纳入摩根大通新兴国债指数', impact: 'Negative', description: '被动资金每月稳定买入。', plainMeaning: '国际大基金被动扣款买印度资产。' }
    ],
    keyCatalysts: ['印度央行 RBI 双月利率决议', '印度月度贸易收支统计'],
    institutionalPositioning: { cotNetLongContracts: 15000, etfFlow7dUSD: '+$85M', retailSentiment: '55% 稳定中立' }
  },
  {
    symbol: 'USDMXN',
    assetName: '美元/墨西哥比索 (USD/MXN)',
    plainTitle: '全球最火爆高息套息货币与近岸外包红利 (美墨)',
    category: '外汇',
    subCategory: '拉美高息套息货币与近岸外包',
    currentPrice: 20.35,
    directionBias: 'RANGE (震荡套息)',
    biasConfidence: 74,
    coreDriverThesis: '墨西哥央行 10% 以上高利率 ＋ 美国制造业近岸外包 ＋ 政治与关税不确定性。',
    plainLanguageThesis: '墨西哥比索是全球外汇交易员最爱的超高利息货币（利息超 10%），只要美国经济没崩，大家就借低息美元去买高息比索吃利息。但一旦特朗普关税政策抬头，比索就会剧烈波动。',
    plainActionSummary: '【操作指南】：20.80-21.20 逢高做空 USDMXN 吃利息，跌至 19.50 止盈。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '震荡 (Range/Neutral)',
        targetRange: '19.80 - 20.80',
        coreLogic: '关税叙事与高额利差收益拉锯。',
        keyTriggers: ['墨西哥央行议息决议', '美国关税声明'],
        actionTactics: '区间网格套利。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '18.80 - 19.90',
        coreLogic: '美联储持续降息，美墨利差维持在 600 基点以上，套息交易热度不减。',
        keyTriggers: ['墨西哥外商直接投资 FDI 创纪录数据'],
        actionTactics: '中线做空 USDMXN，收取每日正隔夜利息。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看多 (Bullish)',
        targetRange: '18.00 - 20.50',
        coreLogic: '北美自由贸易区一体化与全球供应链近岸重构。',
        keyTriggers: ['美国近岸外包投资落地规模'],
        actionTactics: '长线配置高息拉美优质资产。'
      }
    },
    driverComponents: [
      { name: '墨西哥央行双位数基准利差', weight: 45, value: '政策利率超 10.25%', impact: 'Negative', description: '提供全球顶级套息安全垫。', plainMeaning: '每天躺着收高利息。' },
      { name: '北美自由贸易协议近岸外包', weight: 35, value: '全球制造厂迁往墨西哥', impact: 'Negative', description: '源源不断带来外汇投资流入。', plainMeaning: '大工厂都在墨西哥建厂换比索。' },
      { name: '地缘政治与美国关税税率风险', weight: 20, value: '关税政策博弈', impact: 'Positive', description: '关税威胁引发阶段性比索急跌。', plainMeaning: '美国说要加关税，比索就吓跌一下。' }
    ],
    keyCatalysts: ['墨西哥央行 Banxico 政策声明', '美国关税执行细则'],
    institutionalPositioning: { cotNetLongContracts: 38000, etfFlow7dUSD: '+$110M', retailSentiment: '62% 偏多比索' }
  },
  {
    symbol: 'USDZAR',
    assetName: '美元/南非兰特 (USD/ZAR)',
    plainTitle: '全球贵金属资源商品货币与高贝塔新兴汇率 (美兰)',
    category: '外汇',
    subCategory: '非洲第一大资源商品货币',
    currentPrice: 17.85,
    directionBias: 'BEARISH (逢高看空/兰特升值)',
    biasConfidence: 72,
    coreDriverThesis: '黄金铂金等大宗矿产暴涨 ＋ 南非联合政府政治企稳 ＋ 美联储降息周期。',
    plainLanguageThesis: '南非是全球最大的黄金和铂族贵金属生产国。当黄金历史新高、铂金走强时，南非大宗矿产出口大发横财，推升南非兰特汇率，USDZAR 倾向于逢高下跌。',
    plainActionSummary: '【操作指南】：反弹至 18.20-18.50 分批做空 USDZAR，目标看 17.20。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '17.40 - 18.20',
        coreLogic: '黄金历史新高带来强劲商品贸易顺差。',
        keyTriggers: ['黄金白银现货价格走势'],
        actionTactics: '逢高沽空。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '16.80 - 17.60',
        coreLogic: '电力危机 Eskom 逐步缓解，制造业复苏。',
        keyTriggers: ['南非矿业产出月度报告'],
        actionTactics: '波段持有空单。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '16.00 - 17.50',
        coreLogic: '全球能源转型与战略贵金属长期超级周期。',
        keyTriggers: ['全球氢能与催化剂对铂族金属需求'],
        actionTactics: '战略性参与大宗资源货币重估。'
      }
    },
    driverComponents: [
      { name: '全球黄金与铂金价格超级牛市', weight: 45, value: '贵金属大宗繁荣', impact: 'Negative', description: '矿业出口收入暴增直接利多兰特。', plainMeaning: '金子卖得越贵，南非赚得越多。' },
      { name: '美联储降息全球资金流向高息新兴市场', weight: 35, value: '南非利率 8.00%', impact: 'Negative', description: '高息资本套利流入。', plainMeaning: '热钱涌入南非吃高息。' },
      { name: '南非国内电力与铁路运输基建瓶颈', weight: 20, value: '港口物流受限', impact: 'Positive', description: '制约矿石快速运出。', plainMeaning: '火车不通畅影响出货速度。' }
    ],
    keyCatalysts: ['南非储备银行 SARB 利率决议', '黄金价格新高'],
    institutionalPositioning: { cotNetLongContracts: 12000, etfFlow7dUSD: '+$45M', retailSentiment: '58% 看好' }
  },
  {
    symbol: 'USDKRW',
    assetName: '美元/韩元 (USD/KRW)',
    plainTitle: '全球半导体周期与亚太出口贸易晴雨表 (美韩)',
    category: '外汇',
    subCategory: '亚洲高科技与半导体出口货币',
    currentPrice: 1395.0,
    directionBias: 'BEARISH (逢高看空/韩元升值)',
    biasConfidence: 76,
    coreDriverThesis: 'HBM 存储芯片出口暴增 ＋ 三星SK海力士盈利暴涨 ＋ 韩国国民年金汇率对冲。',
    plainLanguageThesis: '韩国被称为全球经济的“金丝雀”。当 AI 大爆发带动存储芯片需求飞涨，韩国出口顺差就会急速膨胀，外资大买韩国股票，韩元汇率将迎来补涨升值，USD/KRW 将从 1400 高位向下回落。',
    plainActionSummary: '【操作指南】：1410-1420 区域做空 USD/KRW，中线看回 1320-1340。',
    horizonAnalyses: {
      shortTerm: {
        timeframeName: '短期分析 (1~4周)',
        timeframeDuration: '1~4周',
        bias: '看空 (Bearish)',
        targetRange: '1370 - 1415',
        coreLogic: '1400 关口韩国央行多次口头与实质干预，阻力极大。',
        keyTriggers: ['韩国前20日出口数据', '美日韩财长联合汇率声明'],
        actionTactics: '逢高做空。'
      },
      mediumTerm: {
        timeframeName: '中长期分析 (1~6个月)',
        timeframeDuration: '1~6个月',
        bias: '看空 (Bearish)',
        targetRange: '1310 - 1360',
        coreLogic: '高带宽内存 HBM 订单饱满，经常账户盈余大幅飙升。',
        keyTriggers: ['韩国央行 BOK 利率政策', '英伟达对韩企采购'],
        actionTactics: '波段持有做空仓位。'
      },
      longTerm: {
        timeframeName: '长期战略分析 (6个月~3年以上)',
        timeframeDuration: '6个月~3年以上',
        bias: '看空 (Bearish)',
        targetRange: '1250 - 1320',
        coreLogic: '全球 AI 硬件繁荣周期与造船高附加值订单交付潮。',
        keyTriggers: ['全球存储芯片超级周期'],
        actionTactics: '长线坚定看好亚洲先进制造汇率。'
      }
    },
    driverComponents: [
      { name: '全球半导体与 AI 存储出口超级周期', weight: 50, value: '月度半导体出口增超 40%', impact: 'Negative', description: '强劲顺差支撑韩元购买力。', plainMeaning: '全世界都在抢买韩国的 AI 存储芯片。' },
      { name: '韩国央行 1400 关键汇率心理防线干预', weight: 30, value: '外储与平准基金联防', impact: 'Negative', description: '坚决防止韩元非理性失速贬值。', plainMeaning: '央行在 1400 布下重兵，不准美元再涨。' },
      { name: '韩国国内散户大举美股投资资本外流', weight: 20, value: '蚂蚁军团买入美股', impact: 'Positive', description: '居民换美元出海买英伟达特斯拉。', plainMeaning: '韩国年轻人爱买美股，买走了一批美元。' }
    ],
    keyCatalysts: ['韩国海关进出口贸易初值', '韩国央行议息声明'],
    institutionalPositioning: { cotNetLongContracts: 22000, etfFlow7dUSD: '+$70M', retailSentiment: '64% 看多韩元' }
  }
];


