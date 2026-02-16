// ============================================
// AI新年贺 — 主应用逻辑
// ============================================
import { drawFortune, getZodiacFromYear } from './fortune.js';
import { FireworksCanvas } from './particles.js';

// ============ State ============
const state = {
    currentTab: 'greeting',
    greetingTarget: '长辈',
    greetingStyle: '正式',
    coupletTheme: '事业',
    coupletStyle: '传统',
    zodiac: '马',
    fortuneName: '',
    fortuneBirthday: '',
    isGenerating: false,
};

let fireworks;

// ============ Demo Data ============
const DEMO_GREETINGS = {
    '长辈': {
        '正式': [
            '🧧 值此新春佳节之际，恭祝您马年大吉，身体康健，福寿绵长！愿新的一年里，万事称心如意，阖家幸福安康！马到成功，吉祥如意！🐴✨',
            '🏮 马年新春，谨向您致以最诚挚的祝福！愿您在新的一年里，精神矍铄，笑口常开，儿孙绕膝享天伦。祝您马年行大运，福气满满！🎊',
            '🎆 新春佳节，恭祝福安！马年伊始，愿您身如不老松，心似长流水，岁岁常欢愉，年年皆胜意。马到功成，万事亨通！💛',
        ],
        '文艺': [
            '🌸 春风骏马踏花来，万里晴空瑞气开。愿您的马年如诗如画，每一天都充满温暖与希望。岁月从不败美人，愿时光温柔以待。🐴🌿',
            '📜 一年好景君须记，最是马年春意浓。愿您在新的春天里，与花同语，与月同辉，心中有梦，眼里有光。马年安康！🎋',
            '🎐 银花火树照新年，骏马奔腾报春还。愿您的生活似春水流长，温暖如初阳。马年吉祥，诸事顺遂！✨🌺',
        ],
        '幽默': [
            '😄 马年到了！祝您老当益壮，越活越年轻，跳广场舞跳到C位！身体倍儿棒，吃嘛嘛香，打麻将场场自摸！马上有钱，马上有福！🐴💰',
            '🤣 新年好！祝您马年里：血压不高，血糖不高，只有您在我心目中的地位高！腿脚利索，思维敏捷，麻将牌技更上一层楼！🏮😎',
            '😆 马年大吉！愿您新的一年：早上不用闹钟响，晚上安睡到天亮。想吃啥就吃啥，想去哪就去哪。手机玩得比年轻人还溜！🐴🎉',
        ],
        '古风': [
            '📜 丙午马年，春回大地。恭贺长辈安泰，福比东海，寿比南山。愿岁月如歌，流年似锦。一马当先，万象更新。叩首拜年！🐴🏮',
            '🎋 瑞雪兆丰年，骏马奔新春。谨以此心，恭祝尊长：鹤寿松龄，福禄双全。马年伊始，诸事遂意，四季平安！✨📿',
            '🌙 岁在丙午，春临门庭。恭祝长辈：体泰安康，神清气爽。愿如松柏常青，似明月长明。马年纳福，大吉大利！🏮🐴',
        ],
        '网络': [
            '🔥 马年来了！祝您YYDS（永远的神）！身体健康满格💯，快乐无限buff叠加！每天都是精神小伙/小妹！马上暴富，一路长虹！🐴🚀',
            '💫 新年快乐！祝您马年i了i了：i健康、i快乐、i长寿！遥遥领先所有同龄人！人生赢家本人！马上有一切！🐴✌️',
            '🎊 给您拜年啦！祝您马年继续整活，越来越6！心态永远年轻，朋友圈点赞量暴增！绝绝子的新一年！🐴🎆',
        ],
    },
    '领导': {
        '正式': [
            '🧧 尊敬的领导，值此马年新春，恭祝您新年快乐，万事如意！感谢您一年来的悉心指导与关怀。愿您在新的一年里，事业更上一层楼，马到成功！🐴💼',
            '🏮 马年将至，向您致以最诚挚的新春祝福！感恩您的领导与栽培，愿新的一年里您春风得意，宏图大展，带领团队再创佳绩！🎊✨',
            '🎆 新春大吉！祝领导马年身体康健，工作顺意！在您的英明领导下，我们必将策马扬鞭，勇往直前，共创辉煌！🐴🌟',
        ],
    },
    '同事': {
        '正式': [
            '🧧 新年好呀！马年来了，祝你工作顺利，升职加薪！愿我们继续携手并进，马到成功！来年一起搞事业！🐴💪',
            '🏮 马年快乐！感谢这一年的并肩作战，愿新的一年你事业飞升，钱包鼓鼓！咱们一起策马奔腾，冲冲冲！🎊🚀',
            '🎆 Happy 马年！祝你KPI轻松达标，年终奖翻倍！新的一年，愿我们一起马不停蹄，再创辉煌！🐴✨',
        ],
    },
    '朋友': {
        '正式': [
            '🧧 马年快乐！愿你新的一年里，事事顺心，天天开心！友谊长存，马年大吉！一起策马奔腾，去看更大的世界！🐴🌍',
            '🏮 新年好！祝你马年行大运，心想事成！愿我们的友谊像骏马一样，跑得更远、更长！新春快乐！🎊💛',
            '🎆 马年大吉！祝你新年暴富、暴美、暴开心！愿你的马年每一天都精彩万分！朋友，新年快乐！🐴🎉',
        ],
    },
    '客户': {
        '正式': [
            '🧧 尊敬的客户，马年新春将至，恭祝您新年快乐，生意兴隆！感谢您一直以来的信任与支持，愿我们在新的一年里携手共赢，马到成功！🐴💼',
            '🏮 值此新春佳节，谨向您致以最诚挚的祝福！愿您马年事业蒸蒸日上，财源广进！期待继续为您提供优质服务！🎊✨',
            '🎆 马年大吉！祝您及贵公司新年快乐，万事亨通！愿我们的合作如骏马奔腾，勇往直前，再创新高！🐴🌟',
        ],
    },
    '恋人': {
        '正式': [
            '💕 马年快乐，亲爱的！愿新的一年里，我们的爱情像骏马一样自由奔放，甜蜜如初。有你在身边，每一天都是好日子。马年爱你更多！🐴💝',
            '🌹 新年快乐宝贝！马年到了，愿我们一起策马奔向更美好的未来。你是我最好的新年礼物，爱你就像爱春天一样！🐴💕',
            '💝 马年第一天，想告诉你：谢谢你这一年的陪伴。新的一年里，我要更爱你，牵着你的手，骑着爱情的骏马奔向幸福！🐴✨',
        ],
    },
};

const DEMO_COUPLETS = {
    '事业': {
        '传统': { upper: '骏马奔腾开锦绣', lower: '春风浩荡展宏图', hengpi: '马到成功' },
        '现代': { upper: '代码千行铸辉煌', lower: '创新万点谱华章', hengpi: '极速飞马' },
        '趣味': { upper: '加班加到马都累', lower: '涨薪涨到梦里飞', hengpi: '马上暴富' },
    },
    '家庭': {
        '传统': { upper: '合家欢乐迎新岁', lower: '满堂春光庆马年', hengpi: '阖家欢乐' },
        '现代': { upper: '智能生活添便利', lower: '幸福家园享天伦', hengpi: '其乐融融' },
        '趣味': { upper: '爸妈催婚声声急', lower: '孩儿装聋步步慢', hengpi: '来年再说' },
    },
    '财运': {
        '传统': { upper: '马踏金阶财运旺', lower: '春临福地喜事多', hengpi: '财源滚滚' },
        '现代': { upper: '基金股票齐飘红', lower: '存款余额节节高', hengpi: '一马当先' },
        '趣味': { upper: '花呗白条今日清', lower: '工资奖金月月增', hengpi: '马上有钱' },
    },
    '健康': {
        '传统': { upper: '体健身强如骏马', lower: '心宽气顺似春风', hengpi: '龙马精神' },
        '现代': { upper: '早睡早起精神爽', lower: '勤练勤跑体魄强', hengpi: '活力满满' },
        '趣味': { upper: '体检报告全正常', lower: '保险续费可以停', hengpi: '百毒不侵' },
    },
    '学业': {
        '传统': { upper: '策马扬鞭攀学峰', lower: '挥毫泼墨写华章', hengpi: '金榜题名' },
        '现代': { upper: '编程算法无人敌', lower: '论文发表双一流', hengpi: '学霸本马' },
        '趣味': { upper: '考试全靠前排抄', lower: '作业全凭AI帮', hengpi: '低调低调' },
    },
};

// ============ Init ============
document.addEventListener('DOMContentLoaded', () => {
    fireworks = new FireworksCanvas('fireworks-canvas');
    initTabNavigation();
    initChipGroups();
    initButtons();
    initFortuneInputs();
});

// ============ Tab Navigation ============
function initTabNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            if (tab === state.currentTab) return;

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
            const target = document.getElementById(`tab-${tab}`);
            if (target) target.classList.add('active');

            state.currentTab = tab;
        });
    });
}

// ============ Chip Groups ============
function initChipGroups() {
    // Generic chip group handler
    setupChipGroup('target-chips', (val) => { state.greetingTarget = val; });
    setupChipGroup('style-chips', (val) => { state.greetingStyle = val; });
    setupChipGroup('couplet-theme-chips', (val) => { state.coupletTheme = val; });
    setupChipGroup('couplet-style-chips', (val) => { state.coupletStyle = val; });
    setupChipGroup('zodiac-chips', (val) => { state.zodiac = val; });
}

function setupChipGroup(groupId, onChange) {
    const group = document.getElementById(groupId);
    if (!group) return;

    group.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            onChange(chip.dataset.value);
        });
    });
}

// ============ Buttons ============
function initButtons() {
    // Greeting
    document.getElementById('btn-gen-greeting')?.addEventListener('click', handleGenerateGreeting);
    document.getElementById('btn-copy-greeting')?.addEventListener('click', copyGreetingAll);
    document.getElementById('btn-regen-greeting')?.addEventListener('click', handleGenerateGreeting);

    // Couplet
    document.getElementById('btn-gen-couplet')?.addEventListener('click', handleGenerateCouplet);
    document.getElementById('btn-copy-couplet')?.addEventListener('click', copyCouplet);
    document.getElementById('btn-regen-couplet')?.addEventListener('click', handleGenerateCouplet);

    // Fortune
    document.getElementById('btn-shake-fortune')?.addEventListener('click', handleShakeFortune);
    document.getElementById('btn-copy-fortune')?.addEventListener('click', copyFortune);
    document.getElementById('btn-reshake')?.addEventListener('click', handleShakeFortune);
}

// ============ Greeting Generation ============
async function handleGenerateGreeting() {
    if (state.isGenerating) return;
    state.isGenerating = true;

    const genBtn = document.getElementById('btn-gen-greeting');
    genBtn.disabled = true;
    showLoading();

    const extra = document.getElementById('greeting-extra')?.value?.trim() || '';

    try {
        // Try API first
        const response = await fetch('/api/greeting', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                target: state.greetingTarget,
                style: state.greetingStyle,
                extra,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            displayGreetings(data.greetings);
        } else {
            throw new Error('API unavailable');
        }
    } catch {
        // Demo mode
        showDemoGreetings();
    } finally {
        hideLoading();
        genBtn.disabled = false;
        state.isGenerating = false;
        fireworks?.burst(3);
    }
}

function showDemoGreetings() {
    const targetGreetings = DEMO_GREETINGS[state.greetingTarget];
    let greetings;

    if (targetGreetings && targetGreetings[state.greetingStyle]) {
        greetings = targetGreetings[state.greetingStyle];
    } else if (targetGreetings) {
        // Get the first available style for this target
        const firstStyle = Object.keys(targetGreetings)[0];
        greetings = targetGreetings[firstStyle];
    } else {
        greetings = DEMO_GREETINGS['朋友']['正式'];
    }

    displayGreetings(greetings);
}

function displayGreetings(greetings) {
    const container = document.getElementById('greeting-cards');
    const resultArea = document.getElementById('greeting-result');

    container.innerHTML = '';
    greetings.forEach((text, index) => {
        const card = document.createElement('div');
        card.className = 'greeting-card';
        card.innerHTML = `
      <div class="card-index">${index + 1}</div>
      <div class="card-text">${text}</div>
      <div class="card-copy">
        <button onclick="navigator.clipboard.writeText(this.closest('.greeting-card').querySelector('.card-text').textContent.trim()); showToastMsg('已复制第${index + 1}条祝福 🧧')">📋 复制这条</button>
      </div>
    `;
        container.appendChild(card);

        // Stagger animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    resultArea.classList.remove('hidden');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyGreetingAll() {
    const cards = document.querySelectorAll('.greeting-card .card-text');
    const allText = Array.from(cards).map((c, i) => `${i + 1}. ${c.textContent.trim()}`).join('\n\n');
    navigator.clipboard.writeText(allText).then(() => showToastMsg('已复制全部祝福 🧧'));
}

// ============ Couplet Generation ============
async function handleGenerateCouplet() {
    if (state.isGenerating) return;
    state.isGenerating = true;

    const genBtn = document.getElementById('btn-gen-couplet');
    genBtn.disabled = true;
    showLoading();

    const industry = document.getElementById('couplet-industry')?.value?.trim() || '';

    try {
        const response = await fetch('/api/couplet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                theme: state.coupletTheme,
                style: state.coupletStyle,
                industry,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            displayCouplet(data);
        } else {
            throw new Error('API unavailable');
        }
    } catch {
        showDemoCouplet();
    } finally {
        hideLoading();
        genBtn.disabled = false;
        state.isGenerating = false;
        fireworks?.burst(3);
    }
}

function showDemoCouplet() {
    const themeData = DEMO_COUPLETS[state.coupletTheme];
    const couplet = themeData
        ? (themeData[state.coupletStyle] || Object.values(themeData)[0])
        : DEMO_COUPLETS['事业']['传统'];

    displayCouplet(couplet);
}

function displayCouplet(couplet) {
    const resultArea = document.getElementById('couplet-result');
    const hengpi = document.querySelector('#couplet-hengpi .couplet-text');
    const upper = document.querySelector('#couplet-upper .couplet-text');
    const lower = document.querySelector('#couplet-lower .couplet-text');

    // Animate text appearing character by character
    hengpi.textContent = '';
    upper.textContent = '';
    lower.textContent = '';

    resultArea.classList.remove('hidden');

    typewriterCouplet(hengpi, couplet.hengpi, 150, () => {
        typewriterCouplet(upper, couplet.upper, 200, () => {
            typewriterCouplet(lower, couplet.lower, 200);
        });
    });

    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function typewriterCouplet(element, text, delay, callback) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
            callback?.();
        }
    }, delay);
}

function copyCouplet() {
    const hengpi = document.querySelector('#couplet-hengpi .couplet-text').textContent;
    const upper = document.querySelector('#couplet-upper .couplet-text').textContent;
    const lower = document.querySelector('#couplet-lower .couplet-text').textContent;

    const text = `横批：${hengpi}\n上联：${upper}\n下联：${lower}`;
    navigator.clipboard.writeText(text).then(() => showToastMsg('春联已复制 🏮'));
}

// ============ Fortune Inputs ============
function initFortuneInputs() {
    const nameInput = document.getElementById('fortune-name');
    const birthdayInput = document.getElementById('fortune-birthday');

    nameInput?.addEventListener('input', (e) => {
        state.fortuneName = e.target.value.trim();
    });

    birthdayInput?.addEventListener('change', (e) => {
        state.fortuneBirthday = e.target.value;
        if (e.target.value) {
            const year = new Date(e.target.value).getFullYear();
            const autoZodiac = getZodiacFromYear(year);
            state.zodiac = autoZodiac;

            // Highlight the correct zodiac chip
            const chips = document.querySelectorAll('#zodiac-chips .chip');
            chips.forEach(chip => {
                chip.classList.toggle('active', chip.dataset.value === autoZodiac);
            });

            // Show hint
            const hint = document.getElementById('zodiac-auto-hint');
            if (hint) hint.textContent = `（已根据出生年自动选择：${autoZodiac}）`;
        }
    });
}

// ============ Fortune Drawing ============
async function handleShakeFortune() {
    if (state.isGenerating) return;
    state.isGenerating = true;

    const btn = document.getElementById('btn-shake-fortune');
    btn.classList.add('shaking');
    btn.disabled = true;

    // Shake animation + delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    btn.classList.remove('shaking');

    const fortune = drawFortune(state.zodiac, state.fortuneName, state.fortuneBirthday);
    displayFortune(fortune);

    btn.disabled = false;
    state.isGenerating = false;
    fireworks?.burst(5);
}

function displayFortune(fortune) {
    const resultArea = document.getElementById('fortune-result');
    const rank = document.getElementById('fortune-rank');
    const number = document.getElementById('fortune-number');
    const poem = document.getElementById('fortune-poem');
    const details = document.getElementById('fortune-details');
    const lucky = document.getElementById('fortune-lucky');

    // 如果有姓名，显示在签号旁
    const namePrefix = fortune.name ? `${fortune.name}的` : '';
    rank.textContent = fortune.rank;
    number.textContent = `${namePrefix}第 ${fortune.number} 签`;
    poem.textContent = fortune.poem;

    const zf = fortune.zodiacFortune;
    let detailsHTML = `
    <div class="fortune-detail-item"><span class="fortune-detail-label">🐴 生肖</span><span class="fortune-detail-value">${fortune.zodiac} · 马年运势 ${zf.overall}</span></div>
    <div class="fortune-detail-item"><span class="fortune-detail-label">📝 总运</span><span class="fortune-detail-value">${zf.summary}</span></div>
    <div class="fortune-detail-item"><span class="fortune-detail-label">💼 事业</span><span class="fortune-detail-value">${zf.career}</span></div>
    <div class="fortune-detail-item"><span class="fortune-detail-label">💰 财运</span><span class="fortune-detail-value">${zf.wealth}</span></div>
    <div class="fortune-detail-item"><span class="fortune-detail-label">💕 感情</span><span class="fortune-detail-value">${zf.love}</span></div>
    <div class="fortune-detail-item"><span class="fortune-detail-label">💪 健康</span><span class="fortune-detail-value">${zf.health}</span></div>
  `;

    // 个性化部分：五行分析
    if (fortune.ganZhi) {
        detailsHTML += `
        <div class="fortune-section-divider">🔮 五行命理分析</div>
        <div class="fortune-detail-item"><span class="fortune-detail-label">📅 命格</span><span class="fortune-detail-value">${fortune.ganZhi.ganZhi}年 · 五行属${fortune.wuxing}</span></div>
        <div class="fortune-detail-item"><span class="fortune-detail-label">⚡ 马年互动</span><span class="fortune-detail-value">${fortune.wuxingAnalysis.relation}</span></div>
        <div class="fortune-detail-item"><span class="fortune-detail-label">📖 解读</span><span class="fortune-detail-value">${fortune.wuxingAnalysis.desc}</span></div>
        `;
    }

    // 个性化部分：年龄段建议
    if (fortune.ageAdvice) {
        detailsHTML += `
        <div class="fortune-detail-item"><span class="fortune-detail-label">🎯 ${fortune.ageAdvice.ageGroup}运势</span><span class="fortune-detail-value">${fortune.ageAdvice.advice}</span></div>
        `;
    }

    // 个性化部分：姓名分析
    if (fortune.nameAdvice) {
        detailsHTML += `
        <div class="fortune-section-divider">✨ ${fortune.name}的专属解读</div>
        <div class="fortune-detail-item"><span class="fortune-detail-label">🏷️ 命数特质</span><span class="fortune-detail-value">${fortune.nameAdvice.trait}（姓名灵数${fortune.nameAdvice.nameNum}）</span></div>
        <div class="fortune-detail-item"><span class="fortune-detail-label">💡 开运锦囊</span><span class="fortune-detail-value">${fortune.nameAdvice.tip}</span></div>
        `;
    }

    details.innerHTML = detailsHTML;

    lucky.innerHTML = `
    <span class="lucky-tag">🎨 幸运色：${fortune.luckyColor}</span>
    <span class="lucky-tag">🔢 幸运数：${fortune.luckyNumber}</span>
    <span class="lucky-tag">🧭 贵人方位：${fortune.luckyDirection}</span>
    <span class="lucky-tag">🌸 幸运花：${fortune.luckyFlower}</span>
  `;

    resultArea.classList.remove('hidden');
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function copyFortune() {
    const rank = document.getElementById('fortune-rank').textContent;
    const number = document.getElementById('fortune-number').textContent;
    const poem = document.getElementById('fortune-poem').textContent;
    const details = document.getElementById('fortune-details').textContent;
    const lucky = Array.from(document.querySelectorAll('.lucky-tag')).map(t => t.textContent).join(' | ');

    const text = `🐴 马年运势签 ${number}\n${rank}\n\n${poem}\n\n${details.trim()}\n\n${lucky}`;
    navigator.clipboard.writeText(text).then(() => showToastMsg('运势已复制 🐴'));
}

// ============ UI Helpers ============
function showLoading() {
    document.getElementById('loading-overlay')?.classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay')?.classList.add('hidden');
}

function showToastMsg(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 2000);
}

// Expose to inline onclick handlers
window.showToastMsg = showToastMsg;
