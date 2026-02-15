"""
AI新年贺 — FastAPI 后端
春节祝福生成 / AI春联 / 运势解读
"""
import os
import json
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from openai import OpenAI

load_dotenv()

# ============ Config ============
API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com")
MODEL_NAME = os.getenv("MODEL_NAME", "deepseek-chat")

client = OpenAI(api_key=API_KEY, base_url=BASE_URL) if API_KEY and API_KEY != "your_api_key_here" else None

# ============ FastAPI App ============
app = FastAPI(title="AI新年贺 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============ Models ============
class GreetingRequest(BaseModel):
    target: str  # 拜年对象
    style: str   # 风格
    extra: str = ""  # 特殊要求

class CoupletRequest(BaseModel):
    theme: str   # 主题
    style: str   # 风格
    industry: str = ""  # 行业

class FortuneRequest(BaseModel):
    zodiac: str  # 生肖
    question: str = ""  # 问题

# ============ Prompts ============
SYSTEM_PROMPT = """你是一位精通中国传统文化的AI新年祝福大师，擅长为2026丙午马年撰写各类春节祝福内容。
你的风格温暖、喜庆、文采斐然。你了解中国春节的所有传统习俗和马年的文化寓意。
请在回复中融入马年元素（如"马到成功"、"龙马精神"、"一马当先"等）。
当前时间：{now}"""

GREETING_PROMPT = """请为以下场景生成3条马年拜年祝福语：

拜年对象：{target}
风格要求：{style}
{extra_section}

要求：
1. 每条祝福语独立成段，编号1-3
2. 融入2026马年元素和吉祥话
3. 适当使用emoji增添喜庆氛围
4. 根据对象调整敬语和称谓
5. 每条 {length_hint}
6. 风格说明：
   - 正式：措辞得体，适合正式发送
   - 文艺：富有诗意，引经据典
   - 幽默：风趣幽默，让人会心一笑
   - 古风：古典文言风格，雅致优美
   - 网络：网络热词潮语，年轻活泼

请直接输出3条祝福语，不要输出其他内容。每条之间空一行。"""

COUPLET_PROMPT = """请为以下场景创作一副马年春联：

主题：{theme}
风格：{style}
{industry_section}

要求：
1. 上联和下联字数相同（7字或9字）
2. 平仄相对，对仗工整
3. 横批4个字
4. 融入马年元素
5. 风格说明：
   - 传统：经典对联风格，字字珠玑
   - 现代：融入当代元素，新颖别致
   - 趣味：幽默有趣，让人莞尔
6. 输出格式必须严格按照JSON：
{{"upper": "上联内容", "lower": "下联内容", "hengpi": "横批内容"}}

请只输出JSON，不要输出任何其他内容。"""

# ============ Endpoints ============
@app.get("/api/health")
async def health_check():
    return {"status": "ok", "api_configured": client is not None, "year": "2026马年"}

@app.post("/api/greeting")
async def generate_greeting(req: GreetingRequest):
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    now = datetime.now().strftime("%Y年%m月%d日")

    extra_section = f"特殊要求：{req.extra}" if req.extra else "无特殊要求"
    length_hint = "50-80字" if req.style in ["正式", "古风"] else "40-70字"

    prompt = GREETING_PROMPT.format(
        target=req.target,
        style=req.style,
        extra_section=extra_section,
        length_hint=length_hint,
    )

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(now=now)},
                {"role": "user", "content": prompt},
            ],
            temperature=0.9,
            max_tokens=1000,
        )

        content = response.choices[0].message.content.strip()
        # Parse numbered greetings
        greetings = []
        current = []
        for line in content.split('\n'):
            line = line.strip()
            if not line:
                if current:
                    greetings.append(' '.join(current))
                    current = []
                continue
            # Remove numbering
            if line and line[0].isdigit() and (line[1] == '.' or line[1] == '、' or line[1] == ')'):
                if current:
                    greetings.append(' '.join(current))
                    current = []
                line = line[2:].strip()
            current.append(line)

        if current:
            greetings.append(' '.join(current))

        if not greetings:
            greetings = [content]

        return {"greetings": greetings[:3]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/couplet")
async def generate_couplet(req: CoupletRequest):
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    now = datetime.now().strftime("%Y年%m月%d日")
    industry_section = f"行业/场景：{req.industry}" if req.industry else "无特定行业"

    prompt = COUPLET_PROMPT.format(
        theme=req.theme,
        style=req.style,
        industry_section=industry_section,
    )

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(now=now)},
                {"role": "user", "content": prompt},
            ],
            temperature=0.8,
            max_tokens=300,
        )

        content = response.choices[0].message.content.strip()

        # Try to parse JSON
        # Find JSON in the response
        start = content.find('{')
        end = content.rfind('}') + 1
        if start != -1 and end > start:
            data = json.loads(content[start:end])
            return data
        else:
            raise ValueError("No JSON found in response")

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse couplet")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/fortune")
async def generate_fortune_reading(req: FortuneRequest):
    """Optional: AI-enhanced fortune reading"""
    if not client:
        raise HTTPException(status_code=503, detail="API key not configured")

    now = datetime.now().strftime("%Y年%m月%d日")

    prompt = f"""请为属{req.zodiac}的人解读一段马年运势，要求：
1. 结合2026丙午马年的五行属性
2. 分析：综合运势、事业运、财运、感情运、健康运
3. 给出开运建议
4. 语气神秘又温暖
{f'用户特别想了解：{req.question}' if req.question else ''}"""

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(now=now)},
                {"role": "user", "content": prompt},
            ],
            temperature=0.85,
            max_tokens=800,
        )

        return {"reading": response.choices[0].message.content.strip()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============ Static Files (Production) ============
STATIC_DIR = Path(__file__).parent.parent / "static"
if STATIC_DIR.exists():
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")

    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        """Serve frontend SPA - catch all non-API routes"""
        file_path = STATIC_DIR / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)
        return FileResponse(STATIC_DIR / "index.html")

# ============ Run ============
if __name__ == "__main__":
    import uvicorn
    print("🐴 AI新年贺后端启动中...")
    print(f"   API Key: {'已配置 ✅' if client else '未配置 ❌ (前端将使用演示模式)'}")
    uvicorn.run(app, host="0.0.0.0", port=8901)
