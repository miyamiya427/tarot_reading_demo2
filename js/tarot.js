// タロット占い機能
function startTarotReading(genre) {
    currentGenre = genre;
    selectedTarotCards = [];
    shuffleStartTime = Date.now();
    coordinateSeed = 0;
    totalHesitationTime = 0;
    
    showPage(10);
}

// タロット占い用の変数
let shuffleStartTime = 0;
let shuffleDuration = 0;
let coordinateSeed = 0;
let totalHesitationTime = 0;
let cardSelectionStartTime = 0;
let selectedTarotCards = [];

// カード選択関連の変数
let shuffledCardOrder = [];
let currentCardStep = 1;
let selectedCardIds = [];
let selectedCardForCurrentStep = null;

// タロットカードデータ（78枚）
const tarotCards = [
    // 大アルカナ（22枚）
    { id: 0, name: "愚者", emoji: "🃏", meaning: "新しい始まり、冒険心", upright: "自由、可能性、直感", reversed: "無謀、優柔不断" },
    { id: 1, name: "魔術師", emoji: "🎩", meaning: "意志の力、創造性", upright: "創造力、技術、集中力", reversed: "悪用、欺瞞" },
    { id: 2, name: "女教皇", emoji: "🔮", meaning: "直感と知恵", upright: "直感、神秘性、内なる声", reversed: "秘密、隠し事" },
    { id: 3, name: "女帝", emoji: "👑", meaning: "豊かさと創造", upright: "豊かさ、母性、創造性", reversed: "依存、創造性の停滞" },
    { id: 4, name: "皇帝", emoji: "👨‍💼", meaning: "権威と安定", upright: "権威、安定、規律", reversed: "横暴、支配欲" },
    { id: 5, name: "教皇", emoji: "⛪", meaning: "伝統と教え", upright: "伝統、教育、精神的指導", reversed: "反抗、独断" },
    { id: 6, name: "恋人", emoji: "💕", meaning: "愛と選択", upright: "愛、調和、価値観の一致", reversed: "不調和、誤った選択" },
    { id: 7, name: "戦車", emoji: "🏎️", meaning: "意志と克服", upright: "勝利、意志力、前進", reversed: "暴走、自制心の欠如" },
    { id: 8, name: "力", emoji: "💪", meaning: "内なる強さ", upright: "勇気、忍耐、優しい力", reversed: "弱さ、自信喪失" },
    { id: 9, name: "隠者", emoji: "🕯️", meaning: "内省と導き", upright: "内省、精神的探求、導き", reversed: "孤独、現実逃避" },
    { id: 10, name: "運命の輪", emoji: "🎡", meaning: "運命と変化", upright: "運命、チャンス、転機", reversed: "悪循環、停滞" },
    { id: 11, name: "正義", emoji: "⚖️", meaning: "公正と均衡", upright: "公正、バランス、真実", reversed: "不正、偏見" },
    { id: 12, name: "吊された男", emoji: "🙃", meaning: "犠牲と洞察", upright: "犠牲、洞察、新しい視点", reversed: "無駄な犠牲、停滞" },
    { id: 13, name: "死神", emoji: "💀", meaning: "終わりと再生", upright: "変化、終了、再生", reversed: "停滞、変化への恐れ" },
    { id: 14, name: "節制", emoji: "🍷", meaning: "調和とバランス", upright: "調和、節制、癒し", reversed: "不調和、過剰" },
    { id: 15, name: "悪魔", emoji: "😈", meaning: "束縛と欲望", upright: "束縛、物質主義、誘惑", reversed: "解放、覚醒" },
    { id: 16, name: "塔", emoji: "🗼", meaning: "破壊と解放", upright: "突然の変化、破壊、解放", reversed: "内なる変化、危機回避" },
    { id: 17, name: "星", emoji: "⭐", meaning: "希望と癒し", upright: "希望、癒し、インスピレーション", reversed: "失望、方向性の喪失" },
    { id: 18, name: "月", emoji: "🌙", meaning: "幻想と不安", upright: "直感、幻想、不安", reversed: "真実の発覚、恐怖の克服" },
    { id: 19, name: "太陽", emoji: "☀️", meaning: "成功と喜び", upright: "成功、喜び、活力", reversed: "一時的な失敗、喜びの遅れ" },
    { id: 20, name: "審判", emoji: "📯", meaning: "復活と覚醒", upright: "復活、覚醒、新しいスタート", reversed: "後悔、自己批判" },
    { id: 21, name: "世界", emoji: "🌍", meaning: "完成と統合", upright: "達成、完成、統合", reversed: "未完成、目標の見直し" },
    
    // 小アルカナ - ワンド（棒）
    { id: 22, name: "ワンドのエース", emoji: "🔥", meaning: "新しい情熱、創造力", upright: "新しい始まり、創造性、情熱", reversed: "創造性の停滞、方向性の迷い" },
    { id: 23, name: "ワンドの2", emoji: "⚡", meaning: "計画と展望", upright: "未来の計画、個人的な力", reversed: "計画の遅れ、内なる調和の欠如" },
    { id: 24, name: "ワンドの3", emoji: "🌟", meaning: "拡張と先見性", upright: "拡張、先見の明、リーダーシップ", reversed: "計画の遅れ、先見性の欠如" },
    { id: 25, name: "ワンドの4", emoji: "🎉", meaning: "調和と安定", upright: "調和、安定、お祝い", reversed: "調和の欠如、内なる緊張" },
    { id: 26, name: "ワンドの5", emoji: "⚔️", meaning: "競争と対立", upright: "競争、争い、不一致", reversed: "内なる争い、競争の回避" },
    { id: 27, name: "ワンドの6", emoji: "👑", meaning: "勝利と認知", upright: "勝利、公的な認知、自信", reversed: "遅れた勝利、自信の欠如" },
    { id: 28, name: "ワンドの7", emoji: "🛡️", meaning: "挑戦と勇気", upright: "挑戦、勇気、粘り強さ", reversed: "圧倒、不安、降参" },
    { id: 29, name: "ワンドの8", emoji: "💨", meaning: "迅速な行動", upright: "迅速な行動、進歩、変化", reversed: "遅れ、フラストレーション、停滞" },
    { id: 30, name: "ワンドの9", emoji: "💪", meaning: "強さと警戒", upright: "強さ、勇気、粘り強さ", reversed: "偏執、疑い、警戒心" },
    { id: 31, name: "ワンドの10", emoji: "📊", meaning: "重荷と責任", upright: "重荷、責任、努力", reversed: "責任の委任、燃え尽き症候群" },
    
    // 小アルカナ - カップ（聖杯）
    { id: 32, name: "カップのエース", emoji: "💧", meaning: "新しい愛、感情", upright: "新しい関係、愛、直感", reversed: "失われた愛、感情の抑制" },
    { id: 33, name: "カップの2", emoji: "💕", meaning: "パートナーシップ", upright: "統一、パートナーシップ、相互の魅力", reversed: "緊張した関係、不調和" },
    { id: 34, name: "カップの3", emoji: "🎊", meaning: "友情と祝福", upright: "友情、共同体、お祝い", reversed: "過度のパーティ、ゴシップ" },
    { id: 35, name: "カップの4", emoji: "😔", meaning: "瞑想と不満", upright: "瞑想、熟考、不満", reversed: "退屈、求めるものを見つける" },
    { id: 36, name: "カップの5", emoji: "😢", meaning: "失望と悲しみ", upright: "失望、悲しみ、後悔", reversed: "個人的な挫折、自己許し" },
    { id: 37, name: "カップの6", emoji: "🌸", meaning: "懐古と無邪気", upright: "懐古、子供時代、無邪気", reversed: "現在に生きる、新しい経験" },
    { id: 38, name: "カップの7", emoji: "💭", meaning: "選択と幻想", upright: "幻想、選択、願望思考", reversed: "現実的な選択、意志決定" },
    { id: 39, name: "カップの8", emoji: "🚶", meaning: "失望と放棄", upright: "失望、放棄、引きこもり", reversed: "失望からの回復、新たな関心" },
    { id: 40, name: "カップの9", emoji: "😌", meaning: "満足と願いの実現", upright: "満足、感情的な安定、贅沢", reversed: "内面的な幸福、精神的な満足" },
    { id: 41, name: "カップの10", emoji: "👨‍👩‍👧‍👦", meaning: "感情的な満足", upright: "感情的な満足、幸福、調和", reversed: "離れた家族、価値観の相違" },
    
    // 小アルカナ - ソード（剣）
    { id: 42, name: "ソードのエース", emoji: "⚔️", meaning: "精神的な力", upright: "精神的な力、勝利、明瞭性", reversed: "混乱、破壊的な力" },
    { id: 43, name: "ソードの2", emoji: "🤷", meaning: "困難な選択", upright: "困難な選択、優柔不断", reversed: "混乱、情報過多" },
    { id: 44, name: "ソードの3", emoji: "💔", meaning: "悲しみと分離", upright: "悲しみ、分離、裏切り", reversed: "個人的な悲しみ、内なる悲しみ" },
    { id: 45, name: "ソードの4", emoji: "😴", meaning: "休息と沈思", upright: "休息、沈思、孤独", reversed: "不安、復活、活動の再開" },
    { id: 46, name: "ソードの5", emoji: "😠", meaning: "敗北と失望", upright: "敗北、失望、裏切り", reversed: "個人的な挫折、復讐" },
    { id: 47, name: "ソードの6", emoji: "⛵", meaning: "移行と旅", upright: "移行、変化、旅", reversed: "個人的な移行、抵抗" },
    { id: 48, name: "ソードの7", emoji: "🔓", meaning: "盗みと欺瞞", upright: "盗み、欺瞞、狡猾さ", reversed: "詐欺師、復讐、自己欺瞞" },
    { id: 49, name: "ソードの8", emoji: "🔒", meaning: "束縛と制限", upright: "束縛、制限、囚われ", reversed: "自己制限、内なる批判" },
    { id: 50, name: "ソードの9", emoji: "😰", meaning: "絶望と悪夢", upright: "絶望、悪夢、不安", reversed: "内なる苦悩、恥、罪悪感" },
    { id: 51, name: "ソードの10", emoji: "⚡", meaning: "破滅と終わり", upright: "破滅、終わり、崩壊", reversed: "復活、回復、生き残り" },
    
    // 小アルカナ - ペンタクル（金貨）
    { id: 52, name: "ペンタクルのエース", emoji: "💰", meaning: "物質的な機会", upright: "物質的な機会、発現", reversed: "失われた機会、お金に対する貪欲" },
   { id: 53, name: "ペンタクルの2", emoji: "⚖️", meaning: "バランスと適応性", upright: "バランス、適応性、時間管理", reversed: "不均衡、混乱した優先順位" },
    { id: 54, name: "ペンタクルの3", emoji: "🔨", meaning: "協力と建設", upright: "協力、建設、チームワーク", reversed: "不調和、競争" },
    { id: 55, name: "ペンタクルの4", emoji: "💎", meaning: "物質的な安定", upright: "物質的な安定、保安", reversed: "貪欲、物質主義" },
    { id: 56, name: "ペンタクルの5", emoji: "🏚️", meaning: "物質的な問題", upright: "物質的な問題、貧困", reversed: "精神的な貧困、孤立" },
    { id: 57, name: "ペンタクルの6", emoji: "🤝", meaning: "寛大さと共有", upright: "寛大さ、共有、コミュニティ", reversed: "利己主義、借金" },
    { id: 58, name: "ペンタクルの7", emoji: "🌱", meaning: "長期的な視点", upright: "長期的な視点、忍耐、投資", reversed: "結果への不安、忍耐の欠如" },
    { id: 59, name: "ペンタクルの8", emoji: "🔧", meaning: "技能と勤勉", upright: "技能、勤勉、熟達", reversed: "完璧主義、仕事中毒" },
    { id: 60, name: "ペンタクルの9", emoji: "🏡", meaning: "物質的な豊かさ", upright: "物質的な豊かさ、贅沢、自立", reversed: "過度な出費、価値への疑問" },
    { id: 61, name: "ペンタクルの10", emoji: "👪", meaning: "富と家族", upright: "富、家族、達成", reversed: "金融損失、家族の問題" },
    
    // コートカード
    { id: 62, name: "ワンドのペイジ", emoji: "👦", meaning: "熱心な学習者", upright: "熱心な学習者、探求", reversed: "不注意、遅れた学習" },
    { id: 63, name: "ワンドのナイト", emoji: "🏇", meaning: "衝動的な行動", upright: "衝動的な行動、冒険", reversed: "無謀、怒り" },
    { id: 64, name: "ワンドのクイーン", emoji: "👸", meaning: "自信と決断力", upright: "自信、決断力、独立", reversed: "利己主義、復讐心" },
    { id: 65, name: "ワンドのキング", emoji: "👑", meaning: "自然なリーダー", upright: "自然なリーダー、ビジョン", reversed: "無謀、独裁的" },
    { id: 66, name: "カップのペイジ", emoji: "🧚", meaning: "創造的なメッセージ", upright: "創造的なメッセージ、直感的な学習", reversed: "感情的な未熟さ" },
    { id: 67, name: "カップのナイト", emoji: "🌊", meaning: "ロマンス主義者", upright: "ロマンス主義者、魅力", reversed: "気分屋、非現実的" },
    { id: 68, name: "カップのクイーン", emoji: "🔮", meaning: "思いやりと直感", upright: "思いやり、平静、直感", reversed: "感情的な不安定" },
    { id: 69, name: "カップのキング", emoji: "🌙", meaning: "感情的なバランス", upright: "感情的なバランス、思いやり", reversed: "感情的な操作" },
    { id: 70, name: "ソードのペイジ", emoji: "📝", meaning: "好奇心旺盛", upright: "好奇心、警戒", reversed: "スパイ、秘密" },
    { id: 71, name: "ソードのナイト", emoji: "⚡", meaning: "勇敢で衝動的", upright: "勇敢、衝動的", reversed: "無謀、不注意" },
    { id: 72, name: "ソードのクイーン", emoji: "🗡️", meaning: "鋭い知性", upright: "鋭い知性、明瞭な思考", reversed: "冷酷、苦味" },
    { id: 73, name: "ソードのキング", emoji: "⚖️", meaning: "知的な権威", upright: "知的な権威、真実", reversed: "独裁的、操作的" },
    { id: 74, name: "ペンタクルのペイジ", emoji: "📚", meaning: "勤勉な学生", upright: "勤勉な学生、新しいアイデア", reversed: "学習の欠如、進歩なし" },
    { id: 75, name: "ペンタクルのナイト", emoji: "🐎", meaning: "勤勉と責任感", upright: "勤勉、責任感、日常", reversed: "怠惰、無責任" },
    { id: 76, name: "ペンタクルのクイーン", emoji: "🌻", meaning: "実用的で気配り", upright: "実用的、気配り、財政的な安定", reversed: "金銭的な依存" },
   { id: 77, name: "ペンタクルのキング", emoji: "💼", meaning: "財政的な成功", upright: "財政的な成功、経営能力", reversed: "貪欲、物質主義" }
];

function startTarotReading(genre) {
    currentGenre = genre;
    selectedTarotCards = [];
    shuffleStartTime = Date.now();
    coordinateSeed = 0;
    totalHesitationTime = 0;
    
    showPage(10);
}

function stopShuffle() {
    // シャッフル停止時間を記録
    shuffleDuration = Date.now() - shuffleStartTime;
    
    // カード選択画面に移行
    showPage(11);
}

function selectCard(cardIndex) {
    // 選択されたカードを記録
    selectedCardForCurrentStep = cardIndex;
    
    // 全カードの選択状態をリセット
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.style.borderColor = 'transparent';
        card.style.transform = 'scale(1)';
    });
    
    // 選択されたカードを強調表示
    const selectedCardElement = document.querySelector(`[data-card-index="${cardIndex}"]`);
    if (selectedCardElement) {
        selectedCardElement.style.borderColor = '#dacc89';
        selectedCardElement.style.borderWidth = '3px';
        selectedCardElement.style.transform = 'scale(1.1)';
        selectedCardElement.style.zIndex = '20';
    }
    
    // ボタンが存在する場合のみ処理
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.style.opacity = '1';
        nextButton.style.pointerEvents = 'auto';
    }
}

function confirmCardSelection() {
    if (selectedCardForCurrentStep === null) return;
    
    // 選択時間を記録
    const selectionTime = Date.now() - cardSelectionStartTime;
    totalHesitationTime += selectionTime;
    
    // カードIDを保存
    selectedCardIds.push(selectedCardForCurrentStep);
    
    // 選択状態をリセット
    selectedCardForCurrentStep = null;
    
    if (currentCardStep < 3) {
        // 次のカードへ
        currentCardStep++;
        cardSelectionStartTime = Date.now();
        updateCardSelectionTitle();
        displayCards();
    } else {
        // 3枚選択完了 → 結果画面へ
        showTarotResult();
    }
}

function shuffleCards() {
    // 78枚のカードをシャッフル
    shuffledCardOrder = [];
    for (let i = 0; i < 78; i++) {
        shuffledCardOrder.push(i);
    }
    
    // Fisher-Yatesアルゴリズムでシャッフル
    for (let i = shuffledCardOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCardOrder[i], shuffledCardOrder[j]] = [shuffledCardOrder[j], shuffledCardOrder[i]];
    }
}

function initializeCardSelection() {
    currentCardStep = 1;
    selectedCardIds = [];
    cardSelectionStartTime = Date.now();
    
    // カードをシャッフル
    shuffleCards();
    
    // カードタイトルを更新
    updateCardSelectionTitle();
    
    // カードを表示
    displayCards();
}

function updateCardSelectionTitle() {
    // ジャンル別のタイトル設定
    const titleSets = {
        'today_fortune': [
            "１．＜今日の運勢＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今日の展開＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ],
        'love_single': [
            "１．＜お相手の今の状況＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今後の関係性＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ],
        'love_couple': [
            "１．＜パートナーの今の状況＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今後の関係性＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ],
        'love_reunion': [
            "１．＜お相手の今の状況＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今後の関係性＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ],
        'work_fortune': [
            "１．＜今の環境＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今後の展開＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ],
        'relationship': [
            "１．＜今の状況＞を占います。<br>直感でカードを一枚選んでください。",
            "２．＜今後の展開＞を占います。<br>直感でカードを一枚選んでください。",
            "３．＜アドバイス＞を占います。<br>直感でカードを一枚選んでください。"
        ]
    };
    
    const titles = titleSets[currentGenre] || titleSets['today_fortune'];
    document.getElementById('card-selection-title').innerHTML = titles[currentCardStep - 1];
}


function displayCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    // カードグリッドコンテナ（縦2列の横スクロール）
    const cardsGrid = document.createElement('div');
    cardsGrid.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 200px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 25px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    margin: 110px auto 20px auto;
    justify-content: center;
    max-width: 100%;
    box-sizing: border-box;
`;
    
    // 上列のカードコンテナ
    const topRow = document.createElement('div');
    topRow.style.cssText = `
        display: flex;
        gap: 12px;
        flex: 1;
        justify-content: flex-start;
        min-width: 2340px;
    `;
    
    // 下列のカードコンテナ  
    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = `
        display: flex;
        gap: 12px;
        flex: 1;
        justify-content: flex-start;
        min-width: 2340px;
    `;
    
    // シャッフルされた78枚のカードを上下2列に配置
    shuffledCardOrder.forEach((cardIndex, i) => {
        const card = document.createElement('div');
        card.className = 'tarot-card';
        card.style.cssText = `
    width: 55px;
    height: 70px;
    background-image: url('images/card-back.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    flex-shrink: 0;
    min-width: 55px;
`;
        card.setAttribute('data-card-index', cardIndex);
        card.onclick = () => selectCard(cardIndex);
        
        // 偶数番目は上列、奇数番目は下列
        if (i % 2 === 0) {
            topRow.appendChild(card);
        } else {
            bottomRow.appendChild(card);
        }
    });
    
    cardsGrid.appendChild(topRow);
    cardsGrid.appendChild(bottomRow);

    // カードグリッドを包むコンテナを作成
    const cardContainer = document.createElement('div');
    cardContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        padding: 0 10px;
        box-sizing: border-box;
    `;

    cardContainer.appendChild(cardsGrid);
    container.appendChild(cardContainer);

    // スクロール位置を中央に設定
    setTimeout(() => {
        const maxScroll = cardsGrid.scrollWidth - cardsGrid.clientWidth;
        cardsGrid.scrollLeft = maxScroll / 2 - 20; // 中央より20px左
    }, 100);

    // 次へボタン
    const nextButton = document.createElement('button');
    nextButton.textContent = '次へ';
    nextButton.id = 'next-button';
    nextButton.style.cssText = `
        background: #7894ab;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 0px auto 20px auto;
        display: block;
        white-space: nowrap;
        opacity: 0.5;
        pointer-events: none;
        position: relative;
        z-index: 1;
        text-align: center;
        width: 100px;
    `;
    nextButton.onclick = () => confirmCardSelection();
    cardContainer.appendChild(nextButton);
}

function showTarotResult() {
    // ジャンル別のタイトルを設定
    const titleMap = {
        'today_fortune': '今日の運勢',
        'love_single': '恋愛運（片思い）',
        'love_couple': '恋愛運（カップル）',
        'love_reunion': '恋愛運（復縁）',
        'work_fortune': '仕事運',
        'relationship': '人間関係運'
    };
    
    const title = titleMap[currentGenre] || '今日の運勢';
    document.getElementById('result-title').textContent = title;
    
    // 選択されたカードの情報を表示
    displaySelectedCards();
    
    // 守護神との統合メッセージを生成
    generateIntegratedReading();
    
    // データをスプレッドシートに送信
    sendDataToSheet();
    
    // 結果画面に移行
    showPage(12);
}

    // 選択されたカードの情報を表示
    displaySelectedCards();
    
    // 守護神との統合メッセージを生成
    generateIntegratedReading();
    
    // データをスプレッドシートに送信
    sendDataToSheet();
    
    // 結果画面に移行
    showPage(12);
}

// 選択されたカードを表示する関数
function displaySelectedCards() {
    const cardPositions = ['今日の状況', '今日の展開', '今日のアドバイス'];
    
    selectedCardIds.forEach((cardId, index) => {
        const card = tarotCards[cardId];
        const cardElement = document.getElementById(`card-${index + 1}`);
        const isReversed = determineCardOrientation(index);
        
        if (cardElement && card) {
            cardElement.querySelector('.card-emoji').textContent = card.emoji;
            cardElement.querySelector('.card-name').textContent = card.name + (isReversed ? ' (逆位置)' : '');
            cardElement.querySelector('.card-position').textContent = cardPositions[index];
        }
    });
}

// カードの正位置・逆位置を判定する関数
function determineCardOrientation(cardIndex) {
    // ユーザーの直感データを使用して正位置・逆位置を決定
    const seed = shuffleDuration + (cardIndex * 1000) + totalHesitationTime;
    const random = (seed * 9301 + 49297) % 233280;
    
    // 約50%の確率で逆位置
    return (random % 100) < 50;
}

// カードの解釈を取得する関数
function getCardInterpretation(card, isReversed) {
    return isReversed ? card.reversed : card.upright;
}

// 守護神とタロットカードを統合した読み解きを生成
// 守護神とタロットカードを統合した読み解きを生成
async function generateIntegratedReading() {
    // 保存された守護神情報を取得
    const savedGuardian = localStorage.getItem('guardianResult');
    let guardianData = null;
    
    if (savedGuardian) {
        guardianData = JSON.parse(savedGuardian);
    }
    
    // 選択されたカードの基本情報
    const selectedCards = selectedCardIds.map(id => tarotCards[id]);
    
    // Loading表示
    document.getElementById('guardian-message').textContent = '占い結果を生成中...';
    document.getElementById('daily-fortune').textContent = 'AIが分析中です。しばらくお待ちください...';
    
    try {
        // Gemini APIで占い結果を生成
        console.log('AI生成開始...', { guardianData, selectedCards, currentGenre });
        const result = await generateAITarotReading(guardianData, selectedCards, currentGenre);
        console.log('AI生成完了:', result);
        
        // 結果を表示
        document.getElementById('guardian-message').textContent = result.guardianMessage;
        document.getElementById('daily-fortune').textContent = result.fortune;
        
    } catch (error) {
        console.error('AI生成エラー:', error);
        
        // エラー時はフォールバック（既存の固定メッセージ）
        console.log('フォールバック処理開始...');
        const guardianMessage = generateGuardianMessage(guardianData, selectedCards);
        document.getElementById('guardian-message').textContent = guardianMessage;
        
        const dailyFortune = generateDailyFortune(selectedCards, guardianData);
        document.getElementById('daily-fortune').textContent = dailyFortune;
        
        // ユーザーにエラーを通知（オプション）
        setTimeout(() => {
            const currentMessage = document.getElementById('guardian-message').textContent;
            document.getElementById('guardian-message').textContent = 
                currentMessage + ' ※一時的にAI機能が利用できないため、基本メッセージを表示しています。';
        }, 1000);
    }
}

// 守護神からのメッセージを生成
function generateGuardianMessage(guardianData, cards) {
    if (!guardianData) {
        return "守護神診断を受けると、より詳細なメッセージを受け取れます。";
    }
    
    // 12タイプから基本タイプに変換
let guardianType = Object.keys(guardianTypes12).find(key => 
    guardianTypes12[key].name === guardianData.name
);

// 12タイプを6タイプに変換
if (guardianType) {
    if (guardianType.includes('ruby_fox')) guardianType = 'ruby_fox';
    else if (guardianType.includes('sapphire_hawk')) guardianType = 'sapphire_hawk';
    else if (guardianType.includes('silver_wolf')) guardianType = 'silver_wolf';
    else if (guardianType.includes('emerald_deer')) guardianType = 'emerald_deer';
    else if (guardianType.includes('gold_bear')) guardianType = 'gold_bear';
    else if (guardianType.includes('rainbow_butterfly')) guardianType = 'rainbow_butterfly';
}
    
    const firstCard = cards[0];
    const isReversed = determineCardOrientation(0);
    
    return generateGuardianSpecificMessage(guardianType, firstCard, isReversed);
}

// 守護神タイプ別の専用メッセージ
function generateGuardianSpecificMessage(guardianType, card, isReversed) {
    // 12タイプから基本タイプに変換
    let baseType = null;
    if (guardianType) {
        if (guardianType.includes('ruby_fox')) baseType = 'ruby_fox';
        else if (guardianType.includes('sapphire_hawk')) baseType = 'sapphire_hawk';
        else if (guardianType.includes('silver_wolf')) baseType = 'silver_wolf';
        else if (guardianType.includes('emerald_deer')) baseType = 'emerald_deer';
        else if (guardianType.includes('gold_bear')) baseType = 'gold_bear';
        else if (guardianType.includes('rainbow_butterfly')) baseType = 'rainbow_butterfly';
    }

    const messages = {
        ruby_fox: {
            upright: `あなたの守護者が新しい冒険への扉を開く合図を示しています。「${card.name}」は変化を恐れずに進む時です。`,
            reversed: `あなたの守護者が慎重さを促しています。「${card.name}」の逆位置は立ち止まって考える時です。`
        },
        sapphire_hawk: {
            upright: `あなたの守護者が高い視点から物事を捉える大切さを示しています。「${card.name}」は長期的な目標に向かう時です。`,
            reversed: `あなたの守護者が方向性の見直しを提案しています。「${card.name}」の逆位置は理想と現実のバランスを取る時です。`
        },
        silver_wolf: {
            upright: `あなたの守護者が仲間との協力の大切さを示しています。「${card.name}」は信頼関係を深める時です。`,
            reversed: `あなたの守護者が独立の重要さを伝えています。「${card.name}」の逆位置は自分と向き合う時です。`
        },
        emerald_deer: {
            upright: `あなたの守護者が癒しと成長の力を示しています。「${card.name}」は自分らしいペースで進む時です。`,
            reversed: `あなたの守護者が休息の必要性を示しています。「${card.name}」の逆位置は無理をせず労る時です。`
        },
        gold_bear: {
            upright: `あなたの守護者が安定した基盤の大切さを示しています。「${card.name}」は慎重に歩みを進める時です。`,
            reversed: `あなたの守護者が柔軟性の大切さを教えています。「${card.name}」の逆位置は新しいアプローチの時です。`
        },
        rainbow_butterfly: {
            upright: `あなたの守護者が創造性を輝かせる時だと示しています。「${card.name}」は美しい変化の時です。`,
            reversed: `あなたの守護者が内なる美しさに気づくよう促しています。「${card.name}」の逆位置は内面充実の時です。`
        }
    };

    const guardianMessages = messages[baseType] || messages.ruby_fox;
    return isReversed ? guardianMessages.reversed : guardianMessages.upright;
}

// 今日の運勢を生成
function generateDailyFortune(cards) {
    const situation = cards[0];  // 今日の状況
    const development = cards[1]; // 今日の展開
    const advice = cards[2];     // 今日のアドバイス
    
    return `今日の状況は「${situation.name}」が示す${situation.meaning}となりそうです。「${development.name}」の影響で${development.meaning}が期待できます。「${advice.name}」のアドバイスとして、${advice.upright}を心がけることで、より良い一日を過ごせるでしょう。`;
}

// ページ10表示時にシャッフルアニメーションを開始
function startShuffleAnimation() {
    const shuffleImage = document.getElementById('shuffle-image');
    if (shuffleImage) {
        let shuffleFrames = ['images/shuffle1.png', 'images/shuffle2.png', 'images/shuffle3.png'];
        let currentFrame = 0;
        
        const interval = setInterval(() => {
            shuffleImage.src = shuffleFrames[currentFrame];
            currentFrame = (currentFrame + 1) % shuffleFrames.length;
        }, 500);
        
        // アニメーション停止のためにintervalを保存
        window.shuffleInterval = interval;
    }
}

// スプレッドシートにデータを送信
async function sendDataToSheet() {
    try {
        // 守護神情報を取得
        const savedGuardian = localStorage.getItem('guardianResult');
        let guardianData = null;
        if (savedGuardian) {
            guardianData = JSON.parse(savedGuardian);
        }
        
        // 選択されたカード情報
        const selectedCards = selectedCardIds.map(id => tarotCards[id]);
        
        // 送信データを作成
        const data = {
            dataType: 'tarot',
            guardianType: guardianData ? guardianData.type || 'unknown' : 'no_diagnosis',
            guardianName: guardianData ? guardianData.name || '未診断' : '未診断',
            genre: currentGenre || 'unknown',
            card1: selectedCards[0] ? selectedCards[0].name : '',
            card2: selectedCards[1] ? selectedCards[1].name : '',
            card3: selectedCards[2] ? selectedCards[2].name : '',
            userAgent: navigator.userAgent,
            ip: 'クライアント側',
            memo: ''
        };
        
        // Google Apps Scriptに送信
        const response = await fetch('https://script.google.com/macros/s/AKfycbxTTfzDOm_-QB4MvFJN1BfPf-RR9Fasq8mZl7SKwIs2jPQ--sJmQsp9AWTshrRfDeQAuQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('データ送信完了:', data);
    } catch (error) {
        console.log('データ送信エラー:', error);
    }
}