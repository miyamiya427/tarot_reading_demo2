// 12タイプ診断の判定ロジック

// 基本6タイプから12タイプへの変換マップ
const typeMapping = {
    // 朝タイプ（積極的・外向的・スコア差大）
    'ruby_fox_morning': 'dawn_ruby_fox',
    'sapphire_hawk_morning': 'ascending_hawk', 
    'silver_wolf_morning': 'pack_wolf',
    'emerald_deer_morning': 'young_deer',
    'gold_bear_morning': 'guardian_bear',
    'rainbow_butterfly_morning': 'dancing_butterfly',
    
    // 夜タイプ（内省的・内向的・スコア差小）
    'ruby_fox_evening': 'dusk_ruby_fox',
    'sapphire_hawk_evening': 'soaring_hawk',
    'silver_wolf_evening': 'lone_wolf', 
    'emerald_deer_evening': 'deep_deer',
    'gold_bear_evening': 'resting_bear',
    'rainbow_butterfly_evening': 'dreaming_butterfly'
};

// 守護者画像マッピング
const guardianImages = {
    'dawn_ruby_fox': 'images/guardians/dawn_fox.png',
    'dusk_ruby_fox': 'images/guardians/dusk_fox.png',
    'ascending_hawk': 'images/guardians/ascend_hawk.png',
    'soaring_hawk': 'images/guardians/moon_hawk.png',
    'pack_wolf': 'images/guardians/pack_wolf.png',
    'lone_wolf': 'images/guardians/lone_wolf.png',
    'young_deer': 'images/guardians/young_deer.png',
    'deep_deer': 'images/guardians/deep_deer.png',
    'guardian_bear': 'images/guardians/guard_bear.png',
    'resting_bear': 'images/guardians/rest_bear.png',
    'dancing_butterfly': 'images/guardians/dance_butterfly.png',
    'dreaming_butterfly': 'images/guardians/dream_butterfly.png'
};

// 12タイプの詳細情報（改善版）
const guardianTypes12 = {
    'dawn_ruby_fox': {
        name: '暁紅の狐',
        furigana: 'ぎょっこうのきつね',
        emoji: '🦊🌅',
        catchphrase: 'エネルギッシュな革新者',
        traits: ['変化', '直感', '行動力'],
        description: '朝日のようなエネルギーを持つあなたは、退屈を極度に嫌うタイプです。毎日を同じように過ごすことはできず、常に「次は何をしよう」と新しい刺激を求めています。直感が研ぎ澄まされており、「何か面白そう」と思ったことはすぐに行動に移す実行力の持ち主です。周囲からは「いつも明るい」「ポジティブ」と見られることが多く、あなたの熱量に感化される人も少なくありません。\n\nただし、この行動力には弱点があります。計画性に欠けることが多く、一度始めた事も途中で飽きてしまう傾向があります。また、スピード重視のため、細かなミスを見落とすこともあるでしょう。周囲からは「落ち着きがない」「浮気性」と思われることもあります。成長のカギは、あなたの行動力を尊重しながらも「立ち止まって計画を立てる力」を身につけることです。その時間を「退屈」ではなく「準備の興奮」と捉え直すことで、あなたの才能はさらに開花するでしょう。',
        advice: ''
    },
    'dusk_ruby_fox': {
        name: '宵紅の狐',
        furigana: 'よいべにのきつね',
        emoji: '🦊🌙',
        catchphrase: '神秘的な賢者',
        traits: ['直感', '洞察', '神秘性'],
        description: '静寂の中で自分の世界に入るあなたは、一見するとおとなしく見えるかもしれません。しかし内面には深い洞察力と鋭い直感が備わっており、人の本質を見抜く力を持っています。一人の時間を大切にし、その中で思考を深め、物事の本質的な価値を追求するタイプです。会話は少なめですが、発言する時は的確で、周囲を納得させる力を持っています。\n\nあなたの課題は、この深い思考が時に「行動の足かせ」になることです。完璧に理解してからでなければ行動できず、そのため機会を逃すことがあります。また、一人の世界に入りすぎて、周囲から距離を感じられることもあるでしょう。周囲からは「謎めいている」「何を考えているかわからない」と思われることもあります。成長のカギは、あなたの深い思考を信じながらも、時には「不完全な状態で行動する勇気」を持つことです。その小さな一歩が、新たな可能性を開きます。',
        advice: ''
    },
    'ascending_hawk': {
        name: '昇天の鷹',
        furigana: 'しょうてんのたか',
        emoji: '🦅🌅',
        catchphrase: '野心的なリーダー',
        traits: ['理想', '向上心', '実行力'],
        description: '目標を掲げたら、それに向かって着実に進む野心家があなたです。高い理想を持ち、現実的な計画を立てて実行する力を備えています。周囲を巻き込み、チーム全体をリードする自然なリーダーシップが特徴で、部下や後輩からの信頼も厚いでしょう。「できる人」という評価を得ることが多く、責任ある立場を任されることも多いはずです。\n\nしかし、この完璧さへの追求は、あなた自身にプレッシャーをかけることになります。常に「上を目指す」ため、現在の達成に満足することが難しく、休む間もなく次のステップを見ています。また、高い基準を持つがゆえに、それに達しない人や状況にいらだちを感じることもあります。周囲からは「厳しい」「いつも忙しそう」と思われるかもしれません。成長のカギは、達成のプロセスそのものを楽しむこと、そして「完璧でない自分」を許容することです。その時間こそが、真の強さを育みます。',
        advice: ''
    },
    'soaring_hawk': {
        name: '翔月の鷹',
        furigana: 'しょうげつのたか',
        emoji: '🦅🌙',
        catchphrase: '哲学的な思索者',
        traits: ['俯瞰', '哲学', '長期思考'],
        description: '高い視点から人生を俯瞰できるあなたは、物事を深く考える哲学者タイプです。目の前の出来事だけでなく、その背景や長期的な影響を考える力を持っており、周囲からは「先を見ている」と評価されることが多いでしょう。一人の静かな環境で思索することを好み、その中から独創的なアイデアや洞察が生まれます。\n\nただし、このような長期的思考の持ち主には、実行力が伴わないという課題があります。完璧に理解・計画してからでなければ行動できず、そのため実現までに時間がかかることがあります。また、思考が複雑になりすぎて、周囲には説明が難しくなることもあります。周囲からは「優秀だけど現実的ではない」「決断が遅い」と思われることもあるでしょう。成長のカギは、あなたの深い思考を保ちながらも「70点で行動する勇気」を持つことです。その不完全さの中にこそ、学びと成長が隠れています。',
        advice: ''
    },
    'pack_wolf': {
        name: '群銀の狼',
        furigana: 'ぐんぎんのおおかみ',
        emoji: '🐺🌅',
        catchphrase: 'チームビルダー',
        traits: ['協調', 'リーダーシップ', '仲間思い'],
        description: 'チームの中心にいることに喜びを感じるあなたは、仲間を大切にする協調タイプです。チーム全体の成功を個人の成功よりも優先させ、メンバーの意見をまとめ、方向性を統一する力を持っています。面倒見が良く、困っている仲間を放っておけない人間味あふれる存在でしょう。リーダーシップはありますが、専制的ではなく「皆で一緒に進む」という姿勢が特徴です。\n\nしかし、この協調性が時に自分の意見を後回しにさせることになります。仲間を優先するあまり、自分の個性や意見が埋没してしまうことがあります。また、周囲の評価が気になりすぎて、正しい判断よりも「みんなが納得する判断」を選ぶ傾向もあります。周囲からは「いい人」「八方美人」と思われることもあるでしょう。成長のカギは、仲間を大切にしながらも「自分の意見をしっかり主張する勇気」を持つことです。その時、あなたは本当の意味でチームに貢献することができます。',
        advice: ''
    },
    'lone_wolf': {
        name: '孤月の狼',
        furigana: 'こげつのおおかみ',
        emoji: '🐺🌙',
        catchphrase: '一匹狼の強者',
        traits: ['独立', '強さ', '選択的信頼'],
        description: 'あなたは「一人で完結する」ことを好む独立心の強いタイプです。グループ活動では周囲に合わせるより、自分のペースや判断を優先する傾向があります。人付き合いは広く浅くより、心から信頼できる少数の人との深い関係を大切にしており、その人たちには驚くほどの忠誠心と思いやりを示します。\n\n仕事や学業では、誰かに頼ることよりも自分で解決策を見つけることに満足感を感じるでしょう。ただし、この強みは時に「完璧主義」や「孤立」につながることがあります。周囲からは「冷たい」「距離がある」と思われることもありますが、実際はそうではなく、単に深い関係を求めているだけです。\n\n注意したい点は、本当に必要な時に人に頼ることが難しくなる傾向です。また、信頼していない人の意見は聞き入れなくなるため、視野が狭くなる可能性も。成長のカギは「信頼できる人への依存」を悪いことと考えず、「適切な時に頼る勇気」を持つことです。完璧な一人狼より、時に仲間を頼れる一匹狼の方が、人生はずっと豊かになります。',
        advice: ''
    },
    'young_deer': {
        name: '若翠の鹿',
        furigana: 'じゃくすいのしか',
        emoji: '🦌🌅',
        catchphrase: '希望の使者',
        traits: ['成長', '希望', '前向き'],
        description: '常に成長を求め、新しいことに挑戦することにワクワクしているあなたは、若々しい感性の持ち主です。失敗を恐れず「やってみよう」と挑戦する前向きさが特徴で、周囲にも希望と元気を与えます。学ぶ意欲が高く、新しい分野に飛び込む行動力も素晴らしいでしょう。人生の可能性を信じ、限界を決めずに進む姿勢が、周囲の人たちにも良い影響を与えています。\n\nしかし、この前向きさゆえの課題もあります。時に現実を見落とし、理想と現実のギャップに直面した時、落ち込みが大きくなることがあります。また、「いつも元気」という周囲のイメージから、自分が弱さを見せることが難しくなることもあるでしょう。周囲からは「素朴」「未熟」と見られることもあります。成長のカギは、あなたの前向きさを大切にしながらも「失敗や後退も含めた成長」を受け入れることです。完璧でない歩みの中にこそ、真の強さが育ちます。',
        advice: ''
    },
    'deep_deer': {
        name: '深翠の鹿',
        furigana: 'しんすいのしか',
        emoji: '🦌🌙',
        catchphrase: '心の癒し手',
        traits: ['癒し', '包容力', '深い共感'],
        description: '深い森のような包容力を持つあなたは、相手の気持ちを深く理解し、寄り添う力を持っています。疲れた人や悩んでいる人の心を自然と癒し、相手が心を開きやすくなる安心感があります。感受性が高く、他人の感情や空気を敏感に察知し、その場にふさわしい対応ができる思慮深さが特徴です。周囲からは「落ち着いている」「心が広い」と信頼されることが多いでしょう。\n\nただし、この共感力の高さが時に自分の心を消耗させることになります。他人の感情に同調しすぎて、自分の境界線が曖昧になることがあります。また、相手のために尽くしすぎて、自分のケアを後回しにしてしまう傾向があるでしょう。周囲からは「親切すぎる」「利用されやすい」と見られることもあります。成長のカギは、他者への思いやりを保ちながらも「自分自身も大切にすること」です。自分を満たすことで、初めて他者への贈り物も生まれるのです。',
        advice: ''
    },
    'guardian_bear': {
        name: '守金の熊',
        furigana: 'しゅきんのくま',
        emoji: '🐻🌅',
        catchphrase: '頼れる守護者',
        traits: ['保護', '責任感', '行動力'],
        description: '大切な人を守ることに喜びと使命感を感じるあなたは、責任感の強い頼れる存在です。困っている人を見過ごせず、その人のために行動する正義感を持っています。リーダーシップがあり、判断が早く、決めたことは確実に実行する実行力を備えています。周囲からは「あの人がいれば大丈夫」と安心感を与える存在として認識されているでしょう。\n\nしかし、この「守る」という使命感が時に重くなることがあります。常に周囲のために尽くすため、自分の疲れや限界を認識しないまま進んでしまうことがあります。また、「自分がいなくてはならない」という固定観念から、休息や委譲が難しくなることもあります。周囲からは「頼りすぎられている」と感じることもあるでしょう。成長のカギは、あなたの守る力を大切にしながらも「自分も守られることを許す」ことです。時には誰かに頼る勇気を持つことで、真の強さが生まれます。',
        advice: ''
    },
    'resting_bear': {
        name: '憩金の熊',
        furigana: 'けいきんのくま',
        emoji: '🐻🌙',
        catchphrase: '安らぎの提供者',
        traits: ['安定', '平和', 'じっくり型'],
        description: 'ゆったりとした時間の流れを大切にするあなたは、自分のペースを守りながら、周囲に安定感をもたらす存在です。急かされることなく、着実に物事を進める落ち着きが特徴で、長期的な視点で行動することができます。周囲にも穏やかさが伝染し、あなたの近くにいるだけで人々は安心できるでしょう。焦らず、無理なく自分のペースを貫く姿勢は、実は大きな強みです。\n\nしかし、この落ち着きが時に「受動的」「変化への抵抗」と見られることがあります。新しい環境や急激な変化に対応するのが苦手で、周囲に「保守的」と思われることもあります。また、行動が遅いため、機会を逃すこともあるでしょう。周囲からは「のんびりしている」「スピード感がない」と評価されることもあります。成長のカギは、あなたのペースを大切にしながらも「時には変化に身を任せる柔軟性」を持つことです。その時、新たな可能性が見えてくるはずです。',
        advice: ''
    },
    'dancing_butterfly': {
        name: '舞虹の蝶',
        furigana: 'ぶこうのちょう',
        emoji: '🦋🌅',
        catchphrase: '華やかな芸術家',
        traits: ['表現', '美', '自由'],
        description: '美しいものを愛し、自分自身も美しく表現することに価値を感じるあなたは、創造性あふれる芸術家タイプです。自由さを大切にし、既成概念にとらわれない独自の表現方法を持っています。周囲を華やかにする魅力があり、あなたがいるだけで場が明るくなるでしょう。美的感覚に優れ、その世界観に惹かれる人も多いはずです。\n\nただし、この自由さと創造性が時に「現実離れ」につながることがあります。理想と現実のギャップに直面した時、挫折感が大きくなることもあります。また、自分の美的価値観を優先するあまり、他者の意見や現実的な制約を軽視することもあるでしょう。周囲からは「気まぐれ」「実用性に欠ける」と思われることもあります。成長のカギは、あなたの創造性と美的感覚を保ちながらも「現実的な基盤を作る力」を身につけることです。その土台こそが、夢を形にする力になるのです。',
        advice: ''
    },
    'dreaming_butterfly': {
        name: '夢虹の蝶',
        furigana: 'むこうのちょう',
        emoji: '🦋🌙',
        catchphrase: '幻想的な創造者',
        traits: ['想像', '内省', '神秘'],
        description: '豊かな想像力を持つあなたは、内なる世界の美しさを大切にする夢想家です。静かな環境で創造活動に集中し、幻想的で独創的な作品を生み出す力を持っています。他の人には見えない視点や感性を持っており、その独特な世界観に魅了される人も多いでしょう。感受性が高く、細かなニュアンスや美しさを感じ取ることができます。\n\nしかし、この内なる世界への没入が時に現実との乖離につながることがあります。外の世界との接点が少なくなり、孤立気味になることもあります。また、現実的な行動力に欠けるため、素晴らしいアイデアがあっても形にすることが難しいこともあります。周囲からは「変わっている」「現実的ではない」と思われることもあるでしょう。成長のカギは、あなたの豊かな想像力を大切にしながらも「小さな一歩で現実に変える行動力」を身につけることです。その時、夢は初めて形となり、世界を彩るのです。',
        advice: ''
    }
};

// タイブレイク用の優先順位
const tieBreakOrder = ['ruby_fox', 'sapphire_hawk', 'silver_wolf', 'emerald_deer', 'gold_bear', 'rainbow_butterfly'];

/**
 * 90問3択の回答から12タイプを判定する関数
 * @param {Object} answers - 回答データ {1: 'A', 2: 'B', 3: 'C', ...}
 * @returns {Object} - 判定結果
 */
function diagnose12Types(answers) {
    // Step 1: 回答数チェック
    if (Object.keys(answers).length !== 90) {
        throw new Error('全ての質問に回答してください');
    }
    
    // Step 2: 基本6タイプのスコア計算
    const scores = {
        ruby_fox: 0,
        sapphire_hawk: 0,
        silver_wolf: 0,
        emerald_deer: 0,
        gold_bear: 0,
        rainbow_butterfly: 0
    };
    
    // 各回答をスコアに反映
    for (let questionId = 1; questionId <= 90; questionId++) {
        const answer = answers[questionId];
        const questionScore = questionScoring[questionId];
        
        if (questionScore && questionScore[answer]) {
            const types = questionScore[answer];
            types.forEach(type => {
                scores[type] += 1;
            });
        }
    }
    
    // Step 3: スコアを降順でソート
    const sortedScores = Object.entries(scores).sort((a, b) => {
        if (b[1] === a[1]) {
            // 同点の場合はタイブレイク順序で判定
            return tieBreakOrder.indexOf(a[0]) - tieBreakOrder.indexOf(b[0]);
        }
        return b[1] - a[1];
    });
    
    const firstType = sortedScores[0][0];
    const firstScore = sortedScores[0][1];
    const secondScore = sortedScores[1][1];
    
    // Step 4: 朝・夜タイプの判定
    const scoreDifference = firstScore - secondScore;

    let finalType;
    if (scoreDifference >= 8) {
        // スコア差が大きい → 朝タイプ（積極的・外向的）
        finalType = typeMapping[firstType + '_morning'];
    } else {
        // スコア差が小さい → 夜タイプ（内省的・内向的）
        finalType = typeMapping[firstType + '_evening'];
    }
    
    // Step 5: 結果オブジェクトの作成
    const guardian = guardianTypes12[finalType];
    
    return {
        type: finalType,
        guardian: guardian,
        scores: scores,
        scoreDifference: scoreDifference,
        isEveningType: scoreDifference < 5,
        debugInfo: {
            sortedScores: sortedScores,
            firstType: firstType,
            firstScore: firstScore,
            secondScore: secondScore
        }
    };
}

/**
 * 診断結果を表示用データに変換
 * @param {Object} result - diagnose12Types()の結果
 * @returns {Object} - 表示用データ
 */
function formatDiagnosisResult(result) {
    const guardian = result.guardian;
    
    return {
        name: guardian.name,
        furigana: guardian.furigana,
        emoji: guardian.emoji,
        catchphrase: guardian.catchphrase,
        traits: guardian.traits,
        description: guardian.description,
        advice: guardian.advice,
        type: result.type,
        isEveningType: result.isEveningType
    };
}

/**
 * 診断結果をlocalStorageに保存
 * @param {Object} result - 診断結果
 */
function saveDiagnosisResult(result) {
    const guardianData = {
        name: result.guardian.name,
        furigana: result.guardian.furigana,
        emoji: result.guardian.emoji,
        catchphrase: result.guardian.catchphrase,
        traits: result.guardian.traits,
        description: result.guardian.description,
        advice: result.guardian.advice,
        type: result.type,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('guardianResult', JSON.stringify(guardianData));
}

// === 診断質問データ（90問） ===
const diagnosisQuestions = [
    { id: 1, text: "朝起きた時の気分は？", options: { A: { text: "今日は何しよう？ワクワクする！", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "今日もいい一日にしよう♪", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "とりあえず二度寝したい...", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 2, text: "友達と過ごす理想の時間は？", options: { A: { text: "みんなでワイワイ盛り上がる！", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "少人数でまったりおしゃべり", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "一緒にいるけど各自好きなことしてる", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 3, text: "新しい環境（クラス・職場・サークル）では？", options: { A: { text: "積極的に「よろしく！」って話しかける", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "様子見つつ、徐々に仲良くなっていく", scores: ['emerald_deer', 'sapphire_hawk'] }, C: { text: "必要最小限の人とだけ関わればOK", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 4, text: "休日の理想的な過ごし方は？", options: { A: { text: "外におでかけ！アクティブに過ごす", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "大切な人とのんびり過ごす", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "家でダラダラ、自分時間を満喫", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 5, text: "何かを決める時に一番大事なのは？", options: { A: { text: "直感！「なんかいい感じ」かどうか", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "みんな（家族・友達）はどう思うか", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "失敗しない安全な選択かどうか", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 6, text: "理想の毎日は？", options: { A: { text: "毎日違うことして刺激的に！", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大好きな人たちとの時間がたっぷり", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "穏やかで安定したルーティン", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 7, text: "ストレス溜まった時は？", options: { A: { text: "気分転換に外出！新しいことする", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "信頼できる人に「聞いて聞いて」する", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "ひとりになってゆっくり考える", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 8, text: "自分の長所だと思うのは？", options: { A: { text: "フットワークの軽さとチャレンジ精神", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "人との関わり方、空気読むのが得意", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "継続力があって責任感が強い", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 9, text: "買い物する時は？", options: { A: { text: "「これだ！」って直感で即決", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "友達や家族と「どっちがいい？」って相談", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "しっかり比較検討してから購入", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 10, text: "人生で一番大切なことは？", options: { A: { text: "自由でいること、可能性を広げること", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "愛情深い関係、人とのつながり", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安心できること、着実な成長", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 11, text: "グループ活動だと？", options: { A: { text: "「こんなのどう？」ってアイデア出しまくる", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "みんなの意見まとめる調整役", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "自分の得意なところで確実に貢献", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 12, text: "友達が落ち込んでる時は？", options: { A: { text: "「一緒に解決しよう！」って行動派", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "まずは「大丈夫？」ってじっくり聞く", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "そばにいて、必要な時にサポート", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 13, text: "人と話す時に心がけてることは？", options: { A: { text: "楽しい雰囲気にすること！", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "相手の気持ちに寄り添うこと", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "嘘つかない、正直でいること", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 14, text: "初めて会う人とは？", options: { A: { text: "「何してるの？」って積極的に質問", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "相手が話しやすそうな空気作り", scores: ['emerald_deer', 'rainbow_butterfly'] }, C: { text: "自然な流れでゆっくり親しくなる", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 15, text: "みんなで意見が分かれた時は？", options: { A: { text: "「もっといい方法ない？」って議論する", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "「みんなが納得できる案は？」って調整", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "冷静に状況整理して客観的に判断", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 16, text: "よく相談されるのは？", options: { A: { text: "新しいことへの挑戦について", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "恋愛や人間関係の悩み", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "将来の計画や現実的な問題", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 17, text: "好きになりやすいタイプは？", options: { A: { text: "一緒にいて楽しい、刺激的な人", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "優しくて思いやりがある人", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安心できて信頼できる人", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 18, text: "デートで行きたいのは？", options: { A: { text: "話題の新スポット！まだ行ったことない所", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "ゆっくり話せるカフェや静かな場所", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "お互いの趣味を楽しめる場所", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 19, text: "大切な人との関係で重要なのは？", options: { A: { text: "お互いを刺激し合える関係", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "深い信頼と理解で結ばれた絆", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "長続きする安定した関係", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 20, text: "人間関係に疲れた時は？", options: { A: { text: "一人で好きなことして気分転換", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "本当に大切な人とだけ過ごす", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "しばらく人付き合い控えて充電", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 21, text: "10年後の理想の自分は？", options: { A: { text: "いろんな経験積んで成長してる自分", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人に囲まれて幸せな自分", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定した生活基盤で充実してる自分", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 22, text: "新しいこと始める時は？", options: { A: { text: "とりあえずやってみる！走りながら考える", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "信頼できる人に「どう思う？」って相談", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "しっかり準備してリスク把握してから", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 23, text: "大きな壁にぶつかった時は？", options: { A: { text: "「別のやり方試してみよう」って挑戦", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "周りの人と「一緒に頑張ろう」って協力", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "一歩ずつ着実に解決していく", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 24, text: "理想の環境（学校・職場・バイト先など）は？", options: { A: { text: "変化があって新しいことに挑戦できる", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "チームワーク良くて人間関係が温かい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定してて自分のペースで成長できる", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 25, text: "「成功」って何だと思う？", options: { A: { text: "自分の可能性を最大限発揮すること", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "大切な人たちと幸せをシェアすること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "目標達成して安心できる生活を送ること", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 26, text: "学びや成長については？", options: { A: { text: "幅広くいろんなことに興味持って学びたい", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "人との関わりの中で成長していきたい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "専門分野を深めて確実にレベルアップ", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 27, text: "将来が不安になった時は？", options: { A: { text: "とりあえず行動して不安を吹き飛ばす", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "信頼できる人に話して安心したい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "計画見直して準備をしっかりする", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 28, text: "人生で一番避けたいのは？", options: { A: { text: "変化のない退屈でマンネリな日々", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "一人ぼっちで誰ともつながってない状況", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "不安定で明日がどうなるかわからない状況", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 29, text: "社会の役に立つなら？", options: { A: { text: "新しいアイデアで革新を起こしたい", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "人と人をつなぐコミュニティを作りたい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "基盤となる仕組みやシステムを支えたい", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 30, text: "最終的に一番大切にしたいのは？", options: { A: { text: "自分らしく自由に生きた証拠", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "愛する人たちとの絆と思い出", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安心して過ごせる環境と人間関係", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 31, text: "プロジェクトや課題に取り組む時は？", options: { A: { text: "「面白そう！」と思ったらすぐ取りかかる", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "仲間と相談しながら進める", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "計画を立ててから着実に進める", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 32, text: "初対面の人との会話は？", options: { A: { text: "共通の話題を見つけて盛り上げる", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "相手のペースに合わせて話す", scores: ['emerald_deer', 'rainbow_butterfly'] }, C: { text: "必要なことだけ話す", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 33, text: "困っている人を見かけたら？", options: { A: { text: "「大丈夫？」とすぐに声をかける", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "様子を見て、必要そうなら手伝う", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "本人が助けを求めてきたら対応", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 34, text: "自分の意見と周りの意見が違う時は？", options: { A: { text: "「こういう考え方もあるよ」と積極的に主張", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "両方の良いところを取り入れる", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "無理に合わせず、自分の考えを貫く", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 35, text: "休日に友達から突然の誘い、どうする？", options: { A: { text: "「いいね！行こう！」と即答", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "予定を確認してから返事する", scores: ['emerald_deer', 'sapphire_hawk'] }, C: { text: "基本的に断る、一人の時間が大事", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 36, text: "仕事や勉強でミスをした時は？", options: { A: { text: "すぐ切り替えて次に進む", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "周りに謝って、関係修復を優先", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "原因を分析して同じミスをしないようにする", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 37, text: "自己紹介で何を話す？", options: { A: { text: "趣味や最近ハマってることを熱く語る", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "周りとの共通点を見つけやすい話題", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "必要最低限の情報のみ", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 38, text: "予定がキャンセルになった時は？", options: { A: { text: "「チャンス！」と別のことを始める", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "他の友達を誘ってみる", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "ゆっくり休めると安心する", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 39, text: "リーダーを任されたら？", options: { A: { text: "「やってみよう！」と積極的に引き受ける", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "不安だけど、みんなのために頑張る", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "できればサポート役がいい", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 40, text: "知らない場所に行く時は？", options: { A: { text: "冒険気分でワクワクする", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "一緒に行く人がいれば安心", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "事前にルートや情報を調べる", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 41, text: "「幸せ」って何だと思う？", options: { A: { text: "自由に生きて、やりたいことをやること", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人と一緒にいられること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定した生活と心の平穏", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 42, text: "感動した時の反応は？", options: { A: { text: "「すごい！」と声に出して表現する", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "じーんと心に染みて、涙が出そうになる", scores: ['emerald_deer', 'rainbow_butterfly'] }, C: { text: "静かに心の中で噛みしめる", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 43, text: "人に褒められた時は？", options: { A: { text: "素直に「ありがとう！」と喜ぶ", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "照れながらも嬉しい", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "謙遜するか、あまり表に出さない", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 44, text: "落ち込んだ時、何で元気になる？", options: { A: { text: "好きなことをして気分転換", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "誰かと話して共感してもらう", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "一人で時間をかけて立ち直る", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 45, text: "「成長」って何だと思う？", options: { A: { text: "新しいことができるようになること", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "人との関わりで学ぶこと", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "継続して少しずつレベルアップすること", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 46, text: "大事な決断をする時、何を優先する？", options: { A: { text: "自分の気持ちとワクワク感", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "周りの人への影響", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "現実的なメリット・デメリット", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 47, text: "自分の感情をどう扱う？", options: { A: { text: "そのまま素直に表現する", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "相手の気持ちも考えながら伝える", scores: ['emerald_deer', 'rainbow_butterfly'] }, C: { text: "冷静になるまで抑える", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 48, text: "「居心地がいい」と感じるのは？", options: { A: { text: "自由で縛られない環境", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "温かくて安心できる人間関係", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "静かで落ち着いた空間", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 49, text: "人生で後悔したくないことは？", options: { A: { text: "やりたいことをやらなかった", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人を大事にしなかった", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "計画を立てずに失敗した", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 50, text: "自分にとって「自由」とは？", options: { A: { text: "好きなことを好きなようにできること", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人と一緒にいられること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "心配事がなく安心できること", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 51, text: "5年後、どんな自分でいたい？", options: { A: { text: "いろんな経験をして成長してる", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "大切な人たちと良い関係を築いてる", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定した生活基盤を作ってる", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 52, text: "時間の使い方で大事なのは？", options: { A: { text: "今を楽しむこと", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人と過ごすこと", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "将来のために計画的に使うこと", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 53, text: "老後はどう過ごしたい？", options: { A: { text: "まだまだ新しいことに挑戦してたい", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "家族や友人に囲まれて穏やかに", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "趣味を楽しみながらのんびりと", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 54, text: "お金の使い方は？", options: { A: { text: "経験や思い出に使いたい", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "大切な人のために使いたい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "将来のために貯めたい", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 55, text: "「豊かさ」って何だと思う？", options: { A: { text: "選択肢があって自由なこと", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "愛する人と一緒にいられること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "心配なく暮らせること", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 56, text: "理想の住まいは？", options: { A: { text: "交通便利で刺激的な街", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "友人や家族が近くにいる場所", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "静かで落ち着いた環境", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 57, text: "新しいスキルを学ぶなら？", options: { A: { text: "興味を持ったもの全部", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "人の役に立つスキル", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "専門性を高められるもの", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 58, text: "朝と夜、どっちが好き？", options: { A: { text: "朝！エネルギッシュにスタート", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "どちらも好き、人といる時間が大事", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "夜、静かに自分の時間を過ごす", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 59, text: "SNSとの付き合い方は？", options: { A: { text: "積極的に発信して交流する", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "見る専門、たまにコメント", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "ほとんど見ない、マイペース", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 60, text: "人生で一番大切にしたいものは？", options: { A: { text: "自分らしさと可能性", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "人との絆と愛情", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定と平和な日々", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 61, text: "好きな人ができたとき、あなたは？", options: { A: { text: "すぐに気づかれるくらいアプローチしちゃう", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "相手の反応を見ながら、ゆっくり距離を詰める", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "自分の気持ちをひっそり温めておく", scores: ['sapphire_hawk', 'rainbow_butterfly'] } } },
    { id: 62, text: "付き合ってからのデート、どんなのが理想？", options: { A: { text: "毎回新しい場所で新しい経験を共有したい", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "いつもの場所でのんびり過ごすのが好き", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "互いの世界観を楽しめる自由な時間", scores: ['rainbow_butterfly', 'silver_wolf'] } } },
    { id: 63, text: "相手と価値観が違うことが判明した時は？", options: { A: { text: "相手を変えようと説得する", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "相手の考えを理解しようと歩み寄る", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "その違いを受け入れて、個性として尊重する", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 64, text: "浮気や裏切りを感じたとき、あなたは？", options: { A: { text: "すぐに相手に直談判する", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "ショックで落ち込み、一人で考え込む", scores: ['emerald_deer', 'rainbow_butterfly'] }, C: { text: "冷静に状況を判断してから行動する", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 65, text: "好きな人との距離が遠くなったと感じたら？", options: { A: { text: "とにかく相手に気を引かせようとする", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "相手に気づいてもらえるまで待つ", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "相手の気持ちを確認して、話し合う", scores: ['silver_wolf', 'sapphire_hawk'] } } },
    { id: 66, text: "恋愛で最も大事にしたいのは？", options: { A: { text: "刺激と興奮、一緒にいて楽しいこと", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "信頼と安定、長く一緒にいたいと思える関係", scores: ['gold_bear', 'silver_wolf'] }, C: { text: "成長と向上、相手とともに高まること", scores: ['sapphire_hawk', 'emerald_deer'] } } },
    { id: 67, text: "相手の欠点を発見したとき、あなたは？", options: { A: { text: "すぐに指摘して改善させようとする", scores: ['sapphire_hawk', 'silver_wolf'] }, B: { text: "その欠点も含めて愛そうとする", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "その欠点こそが相手の個性だと受け入れる", scores: ['rainbow_butterfly', 'ruby_fox'] } } },
    { id: 68, text: "長く付き合ってマンネリを感じたら？", options: { A: { text: "新しいデートプランをどんどん提案する", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "相手と話し合って、関係を見直す", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "そのマンネリの中に安心感を感じる", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 69, text: "別れが頭をよぎったとき、あなたは？", options: { A: { text: "その場で相手に伝える", scores: ['ruby_fox', 'silver_wolf'] }, B: { text: "一人で何度も考えて悩む", scores: ['rainbow_butterfly', 'emerald_deer'] }, C: { text: "冷静に状況を分析してから決断する", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 70, text: "理想の結婚相手のタイプは？", options: { A: { text: "一緒にいて楽しく、新しい世界を見せてくれる人", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "安定感があり、一緒にいて安心できる人", scores: ['gold_bear', 'emerald_deer'] }, C: { text: "一緒に目標に向かって頑張れる人", scores: ['sapphire_hawk', 'silver_wolf'] } } },
    { id: 71, text: "相手の友人や家族との関係は大事？", options: { A: { text: "相手との関係が良ければそれでいい", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "相手の周囲との関係も大切にしたい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "必要最小限の付き合いで十分", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 72, text: "相手が仕事で失敗したとき、あなたは？", options: { A: { text: "すぐに励ましに行く", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "相手が落ち着くまで見守る", scores: ['gold_bear', 'rainbow_butterfly'] }, C: { text: "原因を分析して、アドバイスする", scores: ['sapphire_hawk', 'ruby_fox'] } } },
    { id: 73, text: "恋愛で妥協できない点は？", options: { A: { text: "相手の行動力と決断力", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "相手の思いやりと誠実さ", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "相手の独立性と自由さ", scores: ['rainbow_butterfly', 'gold_bear'] } } },
    { id: 74, text: "付き合う前に相手を試すような行動をする？", options: { A: { text: "する、相手の反応を見たい", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "しない、誠実に向き合いたい", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "必要に応じてする", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 75, text: "恋愛で最も怖いことは？", options: { A: { text: "相手に依存されることや、窮屈に感じること", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "相手に裏切られることや、孤独になること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "失敗や、間違った判断をすること", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 76, text: "仕事を選ぶ時に一番大事なのは？", options: { A: { text: "やりがいと成長できるか", scores: ['sapphire_hawk', 'emerald_deer'] }, B: { text: "安定性と福利厚生", scores: ['gold_bear', 'silver_wolf'] }, C: { text: "自由度と裁量", scores: ['ruby_fox', 'rainbow_butterfly'] } } },
    { id: 77, text: "仕事でストレスを感じたら？", options: { A: { text: "気分転換に外出や新しいことをする", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "信頼できる人に相談する", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "一人になって考え込む", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 78, text: "理想の職場環境は？", options: { A: { text: "チームワークが良く、一体感がある", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "個人の役割が明確で、自由度がある", scores: ['ruby_fox', 'rainbow_butterfly'] }, C: { text: "安定していて、ルールが明確", scores: ['gold_bear', 'sapphire_hawk'] } } },
    { id: 79, text: "上司のタイプでモチベーションが変わる？", options: { A: { text: "非常に変わる、上司次第で全てが決まる", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "ある程度は変わるが、自分でコントロール可能", scores: ['sapphire_hawk', 'ruby_fox'] }, C: { text: "あまり変わらない、仕事は仕事", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 80, text: "失敗したときの対処法は？", options: { A: { text: "すぐに改善策を実行する", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "周りに相談して、一緒に解決する", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "原因を分析して、次に活かす", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 81, text: "キャリアアップで重視するのは？", options: { A: { text: "給料や地位の上昇", scores: ['sapphire_hawk', 'gold_bear'] }, B: { text: "やりがいと成長", scores: ['ruby_fox', 'emerald_deer'] }, C: { text: "自由度と時間的余裕", scores: ['rainbow_butterfly', 'silver_wolf'] } } },
    { id: 82, text: "仕事で誰かに相談するとき、あなたは？", options: { A: { text: "困ったことがあると、すぐに誰かに声をかける", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "自分で考えてから、必要に応じて相談する", scores: ['sapphire_hawk', 'ruby_fox'] }, C: { text: "自分で解決できるまで、相談しない", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 83, text: "同僚との関係で大事にしたいのは？", options: { A: { text: "深い友情と信頼", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "プロフェッショナルな距離", scores: ['gold_bear', 'sapphire_hawk'] }, C: { text: "適度な距離で、相手のペースを尊重", scores: ['ruby_fox', 'rainbow_butterfly'] } } },
    { id: 84, text: "忙しい時期をどう乗り切る？", options: { A: { text: "チーム全体で支え合う", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "一人で集中してこなす", scores: ['ruby_fox', 'rainbow_butterfly'] }, C: { text: "計画的に優先順位をつけて対応", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 85, text: "新しいプロジェクトが始まったとき、あなたは？", options: { A: { text: "新しい可能性にワクワクする", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "チーム全体の目標を意識する", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "リスクを評価して慎重に進める", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 86, text: "仕事で最も避けたいのは？", options: { A: { text: "つまらなくて単調な業務", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "一人で孤立することや、チーム外されること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "失敗や、責任を問われること", scores: ['sapphire_hawk', 'gold_bear'] } } },
    { id: 87, text: "リーダーシップを任されたら？", options: { A: { text: "チーム全体を引っ張る、まとめ役になる", scores: ['silver_wolf', 'sapphire_hawk'] }, B: { text: "各自の役割を尊重しつつ、サポートする", scores: ['emerald_deer', 'gold_bear'] }, C: { text: "できれば個の裁量で進めたい", scores: ['ruby_fox', 'rainbow_butterfly'] } } },
    { id: 88, text: "年上の上司や先輩とうまくやるには？", options: { A: { text: "相手の考えや価値観を理解しようとする", scores: ['silver_wolf', 'emerald_deer'] }, B: { text: "自分の意見は主張しつつ、相手を尊重", scores: ['ruby_fox', 'sapphire_hawk'] }, C: { text: "仕事のルールに従って、淡々と進める", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 89, text: "成功に必要な最も大事な要素は？", options: { A: { text: "行動力と決断力", scores: ['ruby_fox', 'sapphire_hawk'] }, B: { text: "人間関係と信頼", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "計画性と継続力", scores: ['gold_bear', 'rainbow_butterfly'] } } },
    { id: 90, text: "仕事の最終的な目標は？", options: { A: { text: "自分の可能性を最大限発揮すること", scores: ['ruby_fox', 'rainbow_butterfly'] }, B: { text: "社会や周りの人に貢献すること", scores: ['silver_wolf', 'emerald_deer'] }, C: { text: "安定した生活と着実な成長", scores: ['gold_bear', 'sapphire_hawk'] } } }
];

// 配点設定の整理
const questionScoring = {};
diagnosisQuestions.forEach(q => {
    questionScoring[q.id] = {
        A: q.options.A.scores,
        B: q.options.B.scores,
        C: q.options.C.scores
    };
});

// 各タイプの出現頻度チェック
function analyzeTypeBalance() {
    const typeCount = {
        ruby_fox: 0,
        sapphire_hawk: 0,
        silver_wolf: 0,
        emerald_deer: 0,
        gold_bear: 0,
        rainbow_butterfly: 0
    };
    
    diagnosisQuestions.forEach(q => {
        Object.values(q.options).forEach(option => {
            option.scores.forEach(type => {
                typeCount[type]++;
            });
        });
    });
    
    console.log("各タイプの出現回数:", typeCount);
    console.log("総ポイント数:", Object.values(typeCount).reduce((a, b) => a + b, 0));
    return typeCount;
}