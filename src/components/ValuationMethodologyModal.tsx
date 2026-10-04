import React from 'react';
import { 
  Scale, 
  Target, 
  ShieldCheck, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  X, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  PieChart,
  Layers,
  Award,
  Zap,
  Info
} from 'lucide-react';

interface ValuationMethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValuationMethodologyModal: React.FC<ValuationMethodologyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-[#0f1524] border border-[#23324d] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative font-sans my-auto text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 bg-[#0f1524]/95 backdrop-blur-md border-b border-[#1f2b42] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>全球股票估值方法论与目标价格推导大白话手册</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 font-mono font-bold">
                  小白也能懂
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                彻底搞懂：这三个价格到底是怎么算出来的？为什么能保卫本金安全？
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#162032] hover:bg-[#1d2b42] border border-[#23324d] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-7 text-xs sm:text-sm">
          
          {/* Section 1: 第一性原理——买股票到底在买什么？ */}
          <div className="space-y-3 bg-gradient-to-r from-blue-950/30 via-[#121929] to-cyan-950/20 p-5 rounded-2xl border border-blue-500/30">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4" />
              <span>第一性原理：买股票到底是在买什么？(巴菲特的根本真理)</span>
            </div>
            
            <p className="leading-relaxed text-slate-300">
              在金融界，很多人把股票当成彩票代码或者几根跳动的K线，这是大错特错的！
            </p>
            
            <div className="p-4 bg-[#0d1320] rounded-xl border border-[#1b263b] space-y-2">
              <div className="font-bold text-white text-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>【终极生活比喻：买一套收租的公寓或一只会下蛋的母鸡】</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                你买一套投资公寓，这套房子的真实价值绝不是取决于今天中介挂牌喊什么价，而是取决于<strong>未来几十年你总共能收到多少租金（扣掉物业维修成本折现到今天）</strong>。<br/>
                同样地，买一家公司的股票，它的真实内在身价，就等于<strong>这家公司在未来的岁月里，总共能为你赚回多少真金白银能揣进兜里的“自由现金流”！</strong>
              </p>
            </div>
          </div>

          {/* Section 2: 自由现金流折现 (DCF) 模型大白话拆解 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base border-b border-[#1b253b] pb-2">
              <Scale className="w-5 h-5 text-emerald-400" />
              <span>模型一：自由现金流折现 (DCF) 是怎么把公司的身价算出来的？</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1e2a42] space-y-2">
                <div className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[11px]">1</span>
                  <span>基期自由现金流 (FCF: 真实的造血活钱)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  为什么不看“净利润”？因为净利润很容易通过赊账、假应收账款来做假账。自由现金流是<strong>经营收到的现金减去建厂房买设备等所有资本开支</strong>之后，真正能发给股东、能存进银行的硬通货！
                </p>
              </div>

              <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1e2a42] space-y-2">
                <div className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-[11px]">2</span>
                  <span>预测未来 10 年能赚多少钱 (两阶段增长)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  前 5 年（高速期）：根据行业景气度和护城河预测增速（如英伟达 28%、大马银行 6%）；后 5 年（成熟期）：随着体量变大，增速逐步放缓回归常态。
                </p>
              </div>

              <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1e2a42] space-y-2">
                <div className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-[11px]">3</span>
                  <span>把未来的钱折算回今天 (折现率 WACC)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  10 年后的 100 块钱，因为通胀和存银行的利息，在今天可能只值 60 块。我们用加权资本成本 (WACC) 作为尺子，把未来 10 年赚的每一笔钱，科学折合成“今天值多少钱”。
                </p>
              </div>

              <div className="bg-[#131b29] p-4 rounded-2xl border border-[#1e2a42] space-y-2">
                <div className="font-bold text-purple-400 text-xs flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-[11px]">4</span>
                  <span>永续终值 (10年之后的永久价值)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  10 年之后公司并不会关门，按跟全球经济 GDP 差不多的保守速度 (2%~2.5%) 永远持续产生收益，这部分折现构成了企业坚实的底座。
                </p>
              </div>

            </div>

            {/* Formula summary */}
            <div className="p-3 bg-[#0d1422] rounded-xl border border-[#182338] text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-white">★ 终极内在身价计算公式：</span>
              <span className="font-mono text-cyan-300 bg-[#141d2e] px-2.5 py-1 rounded-lg">
                每股公允内在价值 ＝ (10年现金流折现 ＋ 永续终值现值 － 净负债) ÷ 总股本
              </span>
            </div>
          </div>

          {/* Section 3: 相对估值乘数怎么配合 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base border-b border-[#1b253b] pb-2">
              <PieChart className="w-5 h-5 text-blue-400" />
              <span>模型二：相对估值乘数 (PE / EV-EBITDA / 股息率) 怎么配合辅助？</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              DCF 折现算出的是绝对身价，而相对估值乘数则是看跟同行业伙伴比是便宜还是贵：
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-[#131a29] p-3.5 rounded-xl border border-[#1c273d]">
                <strong className="text-white block mb-1">动态市盈率 (P/E)</strong>
                <p className="text-slate-400 text-[11px]">
                  相当于“几年回本”。比如 12 倍 PE 代表按当前赚钱速度需要 12 年回本。低于历史平均说明便宜。
                </p>
              </div>
              <div className="bg-[#131a29] p-3.5 rounded-xl border border-[#1c273d]">
                <strong className="text-white block mb-1">市现率 (P/FCF)</strong>
                <p className="text-slate-400 text-[11px]">
                  价格比上真实自由现金流。比单纯看净利润更严苛，排除了折旧摊销和存货积压的水分。
                </p>
              </div>
              <div className="bg-[#131a29] p-3.5 rounded-xl border border-[#1c273d]">
                <strong className="text-white block mb-1">年度股息率 (Dividend Yield)</strong>
                <p className="text-slate-400 text-[11px]">
                  每年直接打到银行账户的硬现金分红。像马股 Maybank (6.5%) 和 Public Bank (4.8%)，股息直接高于定存，天然形成防暴跌安全底。
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: 核心解答：这三个价格到底是怎么定出来的？ */}
          <div className="space-y-4 bg-gradient-to-br from-[#0c1424] via-[#101b30] to-[#0c1322] p-5 rounded-2xl border-2 border-emerald-500/40 shadow-xl">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base border-b border-[#1f2d47] pb-3">
              <Target className="w-5 h-5 text-emerald-400" />
              <span>最核心的疑问：系统显示的三个关键价格，到底是怎么定出来的？</span>
            </div>

            <div className="space-y-3.5">
              
              {/* Target 1 */}
              <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>🟢 适合本金买入的安全价格 (安全击球区) ＝ 公允身价打 75折~80折</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold font-mono">
                    折扣率 75% - 80%
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>【大白话逻辑】：</strong>这是格雷厄姆与巴菲特的<strong>“安全边际”理论</strong>。假设一家公司公允值 $100，我们绝不在 $100 匆忙出手，而是一定要等到打折到 $75~$80 以下才买入！<br/>
                  <strong>为什么？</strong>因为未来没有人能 100% 预测准确，若遇上行业危机或经济低迷，<strong>这多出来的 20%~25% 折扣就是保护你本金的防弹衣</strong>！即便未来盈利打点折扣，你因为买得足够便宜，亏钱概率依然微乎其微！
                </p>
              </div>

              {/* Target 2 */}
              <div className="bg-[#141e30] p-4 rounded-xl border border-[#23324d] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-white text-xs sm:text-sm flex items-center gap-2">
                    <Scale className="w-4 h-4 text-cyan-400" />
                    <span>🔵 估算每股真实内在身价 (公允价值中枢) ＝ 100% 理论公允值</span>
                  </span>
                  <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-bold font-mono">
                    合理价值 100%
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>【大白话逻辑】：</strong>这是结合 DCF 贴现和同业估值得出的公正身价。不占便宜也不吃亏。在这个价位附近买入，长期来看你能获得与企业业绩增长基本一致的合理年化回报（一般年化 10%~15%）。
                </p>
              </div>

              {/* Target 3 */}
              <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-500/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-rose-400 text-xs sm:text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>🔴 严重透支的高危泡沫价 ＝ 公允身价上浮 30%~35% 以上</span>
                  </span>
                  <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold font-mono">
                    溢价 &gt; 135%
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>【大白话逻辑】：</strong>当市场情绪极度狂热、散户蜂拥而入时，股价往往会被推到远超合理身价 35% 以上的高度。此时公司未来 3 到 5 年的利润已经被透支干净了！在这个位置追高买入，属于<strong>纯纯的给主力接盘</strong>，一旦财报稍微不及预期，就会引发剧烈踩踏暴跌！
                </p>
              </div>

            </div>
          </div>

          {/* Section 5: 排雷双保镖 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-sm sm:text-base border-b border-[#1b253b] pb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>双重安全排雷保镖：Altman Z 与 Piotroski F 是干什么用的？</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#121929] p-4 rounded-xl border border-[#1e2a40] space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">🛡️ Altman Z-Score (破产风险排雷)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  专门检测这家公司<strong>未来两年会不会突然借债还不上而破产倒闭</strong>！通过营运资金、留存收益、EBIT息税前利润、市值负债比和资产周转率 5 项严苛指标计算。得分超过 2.99 分进入绝对安全区，确保证券本金绝不打水漂。
                </p>
              </div>

              <div className="bg-[#121929] p-4 rounded-xl border border-[#1e2a40] space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-cyan-400">💎 Piotroski F-Score (造血质量体检)</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  九项全能体检！专门查验这家公司的<strong>赚钱能力是在变好还是在走下坡路</strong>。核查赚的钱是不是真现金、毛利率有没有下滑、管理层有没有趁高位滥发新股稀释散户股权（7-9 分属于全球最顶级的白马优质资产）。
                </p>
              </div>
            </div>
          </div>

          {/* Section 6: 普通人实战资金管理指南 */}
          <div className="p-4 bg-emerald-950/20 rounded-2xl border border-emerald-500/30 space-y-2">
            <div className="font-bold text-emerald-400 text-xs flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>给普通投资者的实战资金管理锦囊 (大白话)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              即使系统给出了安全买入价，也<strong>切忌一次性把所有存款一把梭哈</strong>！<br/>
              明智的机构投资者都是分批建仓：
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
              <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1e283d] text-center">
                <span className="text-emerald-400 font-bold block">① 首次回踩安全线</span>
                <span className="text-slate-300 text-[11px]">建仓 30% 底仓，不恐慌</span>
              </div>
              <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1e283d] text-center">
                <span className="text-cyan-400 font-bold block">② 遇黑天鹅二次砸盘</span>
                <span className="text-slate-300 text-[11px]">逢低补仓 40%，摊低成本</span>
              </div>
              <div className="bg-[#101726] p-2.5 rounded-lg border border-[#1e283d] text-center">
                <span className="text-amber-400 font-bold block">③ 预留 30% 现金</span>
                <span className="text-slate-300 text-[11px]">作为防御备用金，永远不被动</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0d1422] border-t border-[#1b253b] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-950/40"
          >
            我完全看懂了，返回查看当前股票估值
          </button>
        </div>

      </div>
    </div>
  );
};
