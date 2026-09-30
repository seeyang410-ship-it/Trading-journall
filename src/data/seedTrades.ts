import { Trade, MT5Account, DailyJournalEntry, PlaybookStrategy } from '../types/trade';

export const INITIAL_MT5_ACCOUNTS: MT5Account[] = [
  {
    id: 'acc-main-live',
    accountNumber: '880192',
    broker: '自主手动记账',
    server: '本地账本',
    accountName: '我的自主实盘账本',
    currency: 'USD',
    leverage: 100,
    initialBalance: 10000,
    currentBalance: 10000,
    equity: 10000,
    margin: 0,
    freeMargin: 10000,
    isConnected: false,
    lastSyncTime: new Date().toISOString(),
    syncType: 'manual_statement'
  }
];

export const INITIAL_PLAYBOOKS: PlaybookStrategy[] = [
  {
    id: 'pb-1',
    name: 'Order Block / FVG',
    description: '机构订单块与合理价值缺口结合入场，寻找高时间框架关键流动性被掠夺后的强反转确认。',
    rules: [
      '在H4/H1识别关键高低点被扫取 (Liquidity Sweep)',
      '在M5/M1寻找市场结构破坏 (Market Structure Shift) 产生排挤缺口 (FVG)',
      '挂限价单或等待价格回踩FVG 50%水位 (CE) 并放置止损于保护性高低点',
      '目标锁定对立侧外部流动性池，严格保证最低 1:2.5 盈亏比'
    ],
    recommendedSessions: ['伦敦盘 (08:00 - 11:30 GMT)', '纽约早盘 (13:30 - 16:30 GMT)'],
    targetRR: '1:2.5 - 1:4.0',
    timeframes: ['H4', 'H1', 'M5', 'M1']
  },
  {
    id: 'pb-2',
    name: 'Liquidity Sweep',
    description: '扫荡亚洲盘或前一日高低点虚假突破，配合突破后急剧收针形成的流动性猎杀反转模型。',
    rules: [
      '标记亚洲盘高低点 (Asian Range High/Low) 与前一日高低点 (PDH/PDL)',
      '在伦敦或纽约盘开盘后观察突破假动作',
      '观察是否有假突破快速回抽至区间内 (Turtle Soup)',
      '入场并以猎杀极值为防守，止盈看向区间中线或反向边界'
    ],
    recommendedSessions: ['伦敦盘开盘 (08:00 GMT)', '纽约盘开盘 (13:30 GMT)'],
    targetRR: '1:2.0 - 1:3.5',
    timeframes: ['H1', 'M15', 'M5']
  },
  {
    id: 'pb-3',
    name: 'Breakout & Retest',
    description: '关键水平供需区或重要结构高低点有效放量突破后，等待首次回抽确认支阻互换进行顺势跟随。',
    rules: [
      '确认多根大实体K线清晰打破关键结构阻力或支撑',
      '成交量显著放大，随后以缩量弱势回踩支阻互换位',
      '在回踩位出现拒绝影线 (Rejection Wick) 后顺势开仓',
      '止损置于回踩波谷外侧，止盈顺延趋势延伸位'
    ],
    recommendedSessions: ['纽约开盘后趋势确立期 (14:30 - 17:00 GMT)'],
    targetRR: '1:2.0 - 1:3.0',
    timeframes: ['H1', 'M15']
  },
  {
    id: 'pb-4',
    name: 'London Open Breakout',
    description: '伦敦开盘动能突破模型，捕捉欧盘资金入场引发的第一个主导单边趋势。',
    rules: [
      '计算亚洲时段 (00:00 - 07:00 GMT) 的振幅，振幅过大则放弃',
      '伦敦开盘前15分钟观察价格测试方向',
      '若突破亚盘极值且回踩不破，顺势建立突破仓位',
      '纽约开盘前锁定大部分利润，规避美盘反向扫盘风险'
    ],
    recommendedSessions: ['伦敦早盘 (07:45 - 10:30 GMT)'],
    targetRR: '1:2.0 - 1:3.0',
    timeframes: ['M15', 'M5']
  },
  {
    id: 'pb-5',
    name: 'Trend Pullback',
    description: '在EMA 20/50多头或空头排列的多周期顺势回撤入场，追求高胜率的顺应大趋势机会。',
    rules: [
      'H4与H1周期均线呈现多头/空头强发散状态',
      '价格出现逆势回调至20 EMA或动态斐波那契50%-61.8%折返位',
      '出现看涨/看跌吞没K线确认继续推进',
      '跟踪止损沿着趋势高低点不断推进'
    ],
    recommendedSessions: ['伦敦盘', '纽约盘'],
    targetRR: '1:2.0 - 1:4.0',
    timeframes: ['H4', 'H1', 'M15']
  },
  {
    id: 'pb-6',
    name: 'Range Mean-Reversion',
    description: '在宏观震荡行情中，利用RSI超买超卖与布林带边界进行均值回归套利。',
    rules: [
      '确认市场在过去48小时无单边大事件，处于清晰矩形整理通道',
      '触及通道上沿结合RSI>70开空；触及通道下沿结合RSI<30开多',
      '目标位为区间价值中枢 (VWAP / POC)',
      '突破区间边界立即止损离场，绝不抗单'
    ],
    recommendedSessions: ['亚洲盘', '纽约午盘 (17:00 - 20:00 GMT)'],
    targetRR: '1:1.5 - 1:2.0',
    timeframes: ['M15', 'M30']
  }
];

// Completely clean: Zero example/mock trades
export const INITIAL_TRADES: Trade[] = [];

// Completely clean: Zero example journal entries
export const INITIAL_JOURNALS: DailyJournalEntry[] = [];
