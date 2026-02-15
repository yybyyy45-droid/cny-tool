# 🧧 AI新年贺 — 2026马年春节AI祝福工具

> AI驱动的一站式春节祝福生成器：拜年祝福语 · AI春联 · 马年运势签

## ✨ 功能特色

- 🧧 **AI拜年祝福语** — 根据对象/风格智能生成，支持6种风格
- 🏮 **AI春联生成** — 上联+下联+横批，书法排版展示
- 🐴 **马年运势签** — 108签数据库，每日一签
- 🎆 **烟花粒子特效** — 沉浸式春节氛围
- 📱 **响应式设计** — 手机/电脑自适应
- 💡 **Demo模式** — 无需API Key也可完整运行

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动前端开发服务器
npm run dev

# 启动后端（可选，Demo模式无需后端）
cd server && pip install -r requirements.txt
python app.py
```

## 🔑 环境变量（可选）

```env
DEEPSEEK_API_KEY=your_api_key_here
```

不配置API Key时，工具自动降级为Demo模式，使用内置祝福语模板。

## 🛠️ 技术栈

- **前端**: Vite + Vanilla JS + CSS3 动画
- **后端**: Python FastAPI + DeepSeek API
- **部署**: Zeabur / Cloudflare Pages

## 📜 License

MIT
