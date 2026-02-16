// ============================================
// 运势签数据 — 马年特色 + 个性化
// ============================================

export const FORTUNE_RANKS = ['上上签', '上签', '上签', '中上签', '中上签', '中签', '中签', '中签', '中下签', '下签'];

export const FORTUNE_POEMS = [
    { poem: '骏马奔腾万里程，春风得意踏花行。\n前途似锦光明路，功成名就在今生。', rank: '上上签' },
    { poem: '东风送暖入屠苏，千门万户曈曈日。\n总把新桃换旧符，马年事事皆如意。', rank: '上上签' },
    { poem: '龙马精神展宏图，金鞭策马向前途。\n一帆风顺达彼岸，万事亨通乐自如。', rank: '上签' },
    { poem: '春回大地万象新，马蹄声声报佳音。\n贵人相助逢时运，否极泰来转乾坤。', rank: '上签' },
    { poem: '策马扬鞭意气高，鹏程万里任逍遥。\n凤鸣朝阳添祥瑞，福禄双全乐陶陶。', rank: '上签' },
    { poem: '天马行空志四方，风云际会展锋芒。\n功名利禄皆可得，稳中求进步步强。', rank: '中上签' },
    { poem: '云中骏马跃龙门，时来运转贵人寻。\n且把心安付日月，花开自有蝶来临。', rank: '中上签' },
    { poem: '良马识途不迷路，静心修行自有途。\n春来秋去循天道，守得云开见月明。', rank: '中签' },
    { poem: '万马齐喑待东风，蛰伏之时莫心空。\n韬光养晦增才学，一朝得志冲天聪。', rank: '中签' },
    { poem: '老马识途心自明，行稳致远步从容。\n勿贪急进需沉稳，水到渠成事自成。', rank: '中签' },
    { poem: '千里之行始足下，积跬步以致千里。\n马年虽有小波折，柳暗花明又一村。', rank: '中签' },
    { poem: '伯乐有眼识千里，怀才不遇莫忧心。\n耐心等待风云起，终有飞腾展翅时。', rank: '中下签' },
    { poem: '塞翁失马焉知非福，\n逆境之中藏转机。\n守正待时心勿急，\n否极泰来在后期。', rank: '中下签' },
];

// 12 生肖 × 马年运势
export const ZODIAC_FORTUNES = {
    '鼠': {
        overall: '★★★☆☆',
        summary: '马年对鼠而言需多加谨慎，但贵人运不错。保持低调，稳中求进，下半年运势回升。',
        career: '职场需谨慎处理人际关系，避免与人争锋，心态平和则事半功倍。',
        wealth: '正财稳定，偏财运一般。投资需保守，量入为出为宜。',
        love: '感情上需多沟通，已婚者注重家庭和谐，单身者可多参加社交。',
        health: '注意肠胃保养，少食生冷。适量运动，保持好心情。',
    },
    '牛': {
        overall: '★★★★☆',
        summary: '马年牛人运势稳健上升，贵人助力明显。踏实肯干终有回报，事业财运皆可期。',
        career: '工作中有贵人相助，可大胆展现实力。有跳槽或晋升的好机会。',
        wealth: '财运渐入佳境，正财偏财皆有收获。适合稳健投资。',
        love: '桃花运旺盛，已婚者感情甜蜜，单身者有望脱单。',
        health: '身体康健，但别忽略小毛病。保持规律作息。',
    },
    '虎': {
        overall: '★★★★☆',
        summary: '虎马相合，马年虎人运势昌盛！事业如虎添翼，财运亨通，贵人运极佳。',
        career: '事业发展迅猛，领导力突出。有创业或主导重要项目的机会。',
        wealth: '财运旺盛，收入增长可观。可适当拓展投资渠道。',
        love: '感情顺利，有甜蜜邂逅。已婚者家庭美满和谐。',
        health: '精力充沛，但注意劳逸结合，避免过度透支。',
    },
    '兔': {
        overall: '★★★☆☆',
        summary: '马年兔人运势平稳，需避开锋芒，以柔克刚。下半年运势优于上半年。',
        career: '工作中注重团队协作，不宜独断专行。学习新技能会有意外收获。',
        wealth: '财运平平，宜节约开支。避免借贷和高风险投资。',
        love: '感情中注重真诚沟通，不宜过于敏感多疑。',
        health: '注意睡眠质量，学会减压放松。',
    },
    '龙': {
        overall: '★★★★★',
        summary: '龙马精神！马年龙人运势大旺，万事如意，财源广进，贵人连连！',
        career: '事业飞龙在天，升职加薪可期。创业者迎来黄金发展期。',
        wealth: '财运亨通，正财偏财双丰收。投资眼光精准，收益可观。',
        love: '桃花朵朵开，感情甜蜜。已婚者有添丁之喜。',
        health: '身体素质佳，心情舒畅自然健康。',
    },
    '蛇': {
        overall: '★★★★☆',
        summary: '蛇马相合，马年蛇人运势顺遂。智慧加持，事业有成，感情和美。',
        career: '才华得以施展，有望被赏识提拔。适合钻研技术或创新项目。',
        wealth: '财运不错，善于理财者收益丰厚。适合长期投资规划。',
        love: '感情运良好，有深度交流的好姻缘。已婚者关系更加紧密。',
        health: '总体健康，注意保护视力和颈椎。',
    },
    '马': {
        overall: '★★★★☆',
        summary: '本命年！马年马人需佩戴红色饰物化解太岁。虽有挑战，但挺过去便是飞跃。',
        career: '本命年变动较多，保持冷静应对。有贵人暗中相助，危中有机。',
        wealth: '财运起伏，需谨慎理财。下半年财运明显好于上半年。',
        love: '感情上有考验，真心相待方能长久。单身者年底有好姻缘。',
        health: '本命年注意安全，多做体检。佩戴红色物件有助化煞。',
    },
    '羊': {
        overall: '★★★★★',
        summary: '马羊六合！马年羊人运势极佳，贵人运最强，事业爱情双丰收的一年！',
        career: '事业一路高歌，有强大贵人提携。是升职、创业的最佳时机。',
        wealth: '财运极旺，意想不到的收入来源。适合大胆投资。',
        love: '感情运势金极，甜蜜幸福的一年。单身者将遇到命中注定的人。',
        health: '身心愉悦，精力旺盛。保持运动习惯更佳。',
    },
    '猴': {
        overall: '★★★☆☆',
        summary: '马年猴人需低调行事，避免锋芒太露。韬光养晦，待时而动。',
        career: '职场中小人暗涌，需谨慎言行。多做事少说话是上策。',
        wealth: '财运一般，守财为主。慎防被骗或冲动消费。',
        love: '感情中需多包容理解，避免因小事争吵。',
        health: '注意呼吸系统，少去人多嘈杂的地方。',
    },
    '鸡': {
        overall: '★★★☆☆',
        summary: '马年鸡人运势中等偏上，贵人运不差但需主动把握。有付出就有回报。',
        career: '工作勤勉有目共睹，但晋升需要更多耐心。年底有好消息。',
        wealth: '正财稳定，偏财运一般。适合稳健的储蓄计划。',
        love: '感情运平稳，多花时间陪伴另一半。单身者可通过朋友介绍。',
        health: '注意饮食均衡，少食辛辣刺激的食物。',
    },
    '狗': {
        overall: '★★★★☆',
        summary: '马狗相合！马年狗人运势稳步上升，忠厚之德终得善报，事业稳健。',
        career: '职场表现稳健，有升职加薪的好机会。团队协作力突出。',
        wealth: '财运渐佳，勤俭持家积少成多。年中有意外之财。',
        love: '感情和谐稳定，已婚者家庭温馨。单身者有温暖邂逅。',
        health: '身体健康，但注意关节保养和保暖。',
    },
    '猪': {
        overall: '★★★★☆',
        summary: '马年猪人运势不错，心态乐观带来好运。享受生活的同时事业也有进展。',
        career: '工作中保持乐观积极，人缘好自然机会多。适合拓展人脉。',
        wealth: '财运良好，生活富足。有增加被动收入的机会。',
        love: '桃花运旺，感情生活丰富多彩。真心对待必有回应。',
        health: '注意体重管理，控制饮食加强运动。',
    },
};

// 幸运元素
export const LUCKY_COLORS = ['中国红', '帝王金', '翡翠绿', '宝石蓝', '紫气东来', '珍珠白', '琥珀橙'];
export const LUCKY_NUMBERS = [3, 6, 8, 9, 16, 18, 28, 36, 68, 88, 99, 168];
export const LUCKY_DIRECTIONS = ['正东', '正南', '东南', '正北', '西南'];
export const LUCKY_FLOWERS = ['牡丹', '梅花', '兰花', '桃花', '荷花', '菊花', '百合'];

// ============ 天干地支 & 五行 ============
const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const WUXING_MAP = { '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水' };
const ZODIAC_LIST = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

// 五行相生相克
const WUXING_SHENG = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
const WUXING_KE = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };

/**
 * 根据出生年份获取生肖
 */
export function getZodiacFromYear(year) {
    // 1900年是鼠年
    const index = (year - 1900) % 12;
    return ZODIAC_LIST[index >= 0 ? index : index + 12];
}

/**
 * 根据出生年份获取天干地支 & 五行
 */
export function getGanZhi(year) {
    const ganIndex = (year - 4) % 10;
    const zhiIndex = (year - 4) % 12;
    const gan = TIAN_GAN[ganIndex >= 0 ? ganIndex : ganIndex + 10];
    const zhi = DI_ZHI[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12];
    const wuxing = WUXING_MAP[gan];
    return { gan, zhi, ganZhi: `${gan}${zhi}`, wuxing };
}

/**
 * 五行与马年(丙午·火)的互动分析
 */
function getWuxingAnalysis(userWuxing) {
    const maWuxing = '火'; // 2026丙午年属火
    if (userWuxing === maWuxing) {
        return { relation: '比和', desc: '与马年五行相同，力量加倍！气场强盛，但需注意火旺过盛，宜静心养性。', boost: 1 };
    }
    if (WUXING_SHENG[userWuxing] === maWuxing) {
        return { relation: '相生（你生马年）', desc: `${userWuxing}生${maWuxing}，你的能量滋养马年运势。付出有回报，但要适度，避免过度消耗自身。`, boost: 0.5 };
    }
    if (WUXING_SHENG[maWuxing] === userWuxing) {
        return { relation: '相生（马年生你）', desc: `${maWuxing}生${userWuxing}，马年为你带来滋养！贵人运旺，事业财运皆有助力，是大有可为的一年。`, boost: 2 };
    }
    if (WUXING_KE[userWuxing] === maWuxing) {
        return { relation: '相克（你克马年）', desc: `${userWuxing}克${maWuxing}，你对马年有掌控力。事业上能主导局面，但需谨防树大招风。`, boost: 0.8 };
    }
    if (WUXING_KE[maWuxing] === userWuxing) {
        return { relation: '相克（马年克你）', desc: `${maWuxing}克${userWuxing}，马年对你有压制。需低调行事，化解冲突，逢凶可化吉。`, boost: -0.5 };
    }
    return { relation: '中和', desc: '五行平衡，运势稳定。', boost: 0 };
}

/**
 * 根据姓名笔画生成个性化建议
 */
function getNameAdvice(name) {
    if (!name) return null;

    // 简化笔画计算（使用字符编码模拟）
    let strokeSum = 0;
    for (let i = 0; i < name.length; i++) {
        strokeSum += name.charCodeAt(i);
    }
    const nameNum = strokeSum % 10;

    const advices = [
        { trait: '聪明果断', tip: '马年宜主动出击，把握先机。贵人在东方，多向东方发展！' },
        { trait: '温柔细腻', tip: '马年适合深耕细作，感情事业双丰收。多穿暖色调衣物增运。' },
        { trait: '刚毅坚韧', tip: '马年你的韧性将发挥大作用，挺过上半年，下半年必有大成！' },
        { trait: '灵动聪慧', tip: '马年思维活跃，创意无限！适合创新创业，贵人就在朋友圈中。' },
        { trait: '稳重大气', tip: '马年沉稳是你最大的优势，领导力突显。下半年有重要晋升机会。' },
        { trait: '乐观豁达', tip: '马年你的正能量感染身边人，人缘旺则百事兴！多帮助他人必有福报。' },
        { trait: '敏锐洞察', tip: '马年直觉特别准，投资理财多信自己的判断。春季是最佳行动期。' },
        { trait: '勤勉踏实', tip: '马年一分耕耘一分收获，坚持的人终将胜出！秋冬财运最旺。' },
        { trait: '创意丰富', tip: '马年是你大放异彩的时候！艺术、创作、表达方面有意外惊喜。' },
        { trait: '重情重义', tip: '马年贵人运极佳，你的真诚会换来真心回报。家庭和睦是最大财富。' },
    ];

    return { ...advices[nameNum], nameNum: nameNum + 1 };
}

/**
 * 计算年龄段运势加成
 */
function getAgeAdvice(birthYear) {
    const age = 2026 - birthYear;
    if (age <= 18) return { ageGroup: '少年', advice: '学业运势旺盛，马年是积累知识、培养爱好的绝佳时期。多读书、多运动！' };
    if (age <= 30) return { ageGroup: '青年', advice: '事业起步期遇马年助力，大胆追梦！适合跳槽、创业或学习新技能。' };
    if (age <= 45) return { ageGroup: '壮年', advice: '马年事业进入收获期，稳中求进。注意工作与家庭的平衡，身体是革命的本钱。' };
    if (age <= 60) return { ageGroup: '中年', advice: '马年沉稳致远，经验是最大财富。子女运好，家庭和美。适当投资理财积累养老。' };
    return { ageGroup: '长者', advice: '马年健康平安最重要，享受天伦之乐。保持乐观心态，广场舞跳起来！' };
}

/**
 * 根据生肖、姓名、出生日期综合抽签
 */
export function drawFortune(zodiac, name = '', birthday = '') {
    // 构建个性化种子
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const seed = hashString(dateStr + zodiac + name + birthday);

    const poemIndex = seed % FORTUNE_POEMS.length;
    const fortune = FORTUNE_POEMS[poemIndex];
    const zodiacFortune = ZODIAC_FORTUNES[zodiac] || ZODIAC_FORTUNES['马'];

    // 基础结果
    const result = {
        number: (seed % 108) + 1,
        rank: fortune.rank,
        poem: fortune.poem,
        zodiac,
        zodiacFortune,
        luckyColor: LUCKY_COLORS[seed % LUCKY_COLORS.length],
        luckyNumber: LUCKY_NUMBERS[seed % LUCKY_NUMBERS.length],
        luckyDirection: LUCKY_DIRECTIONS[seed % LUCKY_DIRECTIONS.length],
        luckyFlower: LUCKY_FLOWERS[seed % LUCKY_FLOWERS.length],
        // 个性化字段
        personalized: false,
        name: name || null,
        birthday: birthday || null,
        ganZhi: null,
        wuxing: null,
        wuxingAnalysis: null,
        nameAdvice: null,
        ageAdvice: null,
    };

    // 如果有出生日期，添加个性化内容
    if (birthday) {
        const birthYear = new Date(birthday).getFullYear();
        const ganZhiInfo = getGanZhi(birthYear);
        const wuxingAnalysis = getWuxingAnalysis(ganZhiInfo.wuxing);
        const ageAdvice = getAgeAdvice(birthYear);

        result.personalized = true;
        result.ganZhi = ganZhiInfo;
        result.wuxing = ganZhiInfo.wuxing;
        result.wuxingAnalysis = wuxingAnalysis;
        result.ageAdvice = ageAdvice;

        // 五行加成可能调整签的级别
        if (wuxingAnalysis.boost >= 2 && fortune.rank === '中签') {
            result.rank = '中上签';
        }
    }

    // 如果有姓名，添加姓名分析
    if (name) {
        result.personalized = true;
        result.nameAdvice = getNameAdvice(name);
    }

    return result;
}

/** Simple string hash */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}
