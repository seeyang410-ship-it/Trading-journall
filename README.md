# 📈 AlphaLog 领航者 - 智能量化交易日志与资产分析终端

<div align="center">

![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)
![Vite](https://img.shields.io/badge/Vite-8.0+-purple.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg)

**专业级实盘外汇、大宗商品、加密货币交易日志系统，支持纯自主手动记账、深度多周期复盘、实时全球宏观快讯与交易员随笔笔记本。**

</div>

---

## 🌟 核心特性 (Key Features)

### 1. 📊 量化数据看板 (Quantitative Dashboard)
- **核心风险与收益指标**：自动计算胜率 (Win Rate)、利润因子 (Profit Factor)、期望回报 (Expectancy)、平均盈亏比、最大回撤 (Max Drawdown)。
- **TradeZella 风格月度日历热力图**：直观展示每日累计净盈亏，点击任意日期即可穿透查看当天每一笔平仓明细与心态复盘。
- **动态资金曲线 (Equity Curve)**：清晰追踪账户资金演进趋势与回撤深度。
- **四大维度策略分解**：按交易模型 (Setup)、交易品种 (Symbol)、持仓方向 (Buy/Sell)、星期周期 (Day of Week) 深度归因。

### 2. 🗓️ 多周期深度复盘矩阵 (Multi-Period Performance)
- **五大复盘周期自由切换**：
  - 🗓️ **一星期**（近 7 天）短线节奏与损益
  - 🗓️ **一个月**（近 30 天）月度目标与执行力
  - 🗓️ **三个月**（近 90 天）季度策略稳定性
  - 🗓️ **半年**（近 180 天）半年复利与抗风险度
  - 🗓️ **一年**（近 365 天）年度综合量化表现
- **五周期横向对照矩阵**：一键横向展开表格，直观比对跨周期增长性。

### 3. ✍️ 100% 纯自主手动记账与本金设定 (Manual Trading Journal)
- **纯净空白账本**：零多余模拟干扰，所有数据均由您亲手录入。
- **自定义初始本金规模**：支持随时设置并调整您的起始本金（如 $1,000 / $5,000 / $10,000 等），账户净值根据您的真实平仓订单动态联动。
- **订单深度复盘**：
  - 进出场价格、手数、盈亏、佣金、隔夜利息、手续费。
  - 支持**多张图表复盘截图上传**（进场图、出场图）。
  - 执行质量评分、心理情绪状态（冷静、焦虑、FOMO、冲动）、失误归因（追高、提前平仓、扛单等）。

### 4. 📰 7×24 小时实时财经新闻与宏观日历 (Live Financial Wire)
- **毫秒级快讯推送**：覆盖路透社、彭博社、各国央行利率决议、非农就业 NFP、CPI 通胀等全球宏观快讯。
- **多资产分类筛选**：全部快讯、🔴 重磅突发、🪙 黄金/原油、💱 外汇/美元、🏦 央行利率、🚀 加密货币。
- **重点宏观日历**：实时展示当周最重要财经事件（预测值 vs 前值）。
- **多空情绪标定**：自动标注偏多头、偏空头或中性，支持一键复制快讯文本。

### 5. 📝 交易随笔与灵感笔记本 (Trader's Notebook)
- **自由书写画布**：类似 Notion / Apple Notes 体验，随手记录盘中思考、策略推演、系统军规与心理日记。
- **标签与分类管理**：系统军规、交易思路、复盘顿悟、每周规划、心态警醒、随想草稿。
- **核心笔记置顶 📌**：将不可违背的风控原则置顶显示。
- **毫秒级本地自动保存**：所有笔记均持久化保存在用户浏览器本地，安全私密，不上传任何第三方服务器。

### 6. 📥 批量报表导入与跨端同步 (Import & Sync)
- **MT5 / Excel 报表导入**：支持一键上传 MetaTrader 5导出的 HTML / CSV 交易报表，秒级解析。
- **多独立账户管理**：支持切换与新建不同经纪商或策略的独立交易账本。

---

## 🛠️ 技术栈 (Tech Stack)

- **前端框架**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **样式方案**: [Tailwind CSS 4](https://tailwindcss.com/)
- **图表库**: [Recharts](https://recharts.org/)
- **图标库**: [Lucide React](https://lucide.dev/)
- **数据持久化**: 纯前端 LocalStorage / IndexedDB（零第三方隐私泄露）

---

## 🚀 本地运行与开发指南 (Getting Started)

### 前置环境需求
- [Node.js](https://nodejs.org/) >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 1. 克隆代码仓库
```bash
git clone https://github.com/<your-username>/alphalog-trading-journal.git
cd alphalog-trading-journal
```

### 2. 安装依赖
```bash
npm install
# 或者
pnpm install
```

### 3. 启动本地开发服务
```bash
npm run dev
```
打开浏览器访问：`http://localhost:3000`

### 4. 构建生产环境产物
```bash
npm run build
```
构建产物将输出在 `dist/` 文件夹中。

### 5. 本地预览生产构建产物
```bash
npm run preview
```

---

## 🌐 推荐部署平台 (Deployment)

该项目是纯前端单页应用 (SPA)，可零成本一键部署在任何现代静态托管平台：

### 1. Vercel
直接导入 GitHub 仓库，Framework Preset 选择 **Vite**，点击 Deploy 即可。

### 2. GitHub Pages
1. 在仓库的 **Settings** -> **Pages** 中，选择 **GitHub Actions** 作为部署源。
2. 只要将代码推送到 `main` 分支，即可通过 GitHub Actions 自动构建发布。

### 3. Cloudflare Pages / Netlify
连接仓库，设置构建命令为 `npm run build`，输出目录为 `dist` 即可。

---

## 🔒 隐私与安全性声明 (Privacy & Security)

- **完全本地化**：所有交易订单、账户本金、复盘截图与随笔笔记均默认保存在用户的本地浏览器缓存中。
- **无账户强制依赖**：打开即可使用，不需要注册外部账户或绑定手机号码。

---

## 📄 开源许可证 (License)

本项目采用 [MIT License](LICENSE) 开源许可证。
