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

// 12タイプの詳細情報
const guardianTypes12 = {
    'dawn_ruby_fox': {
        name: '暁紅の狐',
        furigana: 'ぎょっこうのきつね',
        emoji: '🦊🌅',
        catchphrase: 'エネルギッシュな革新者',
        traits: ['変化', '直感', '行動力'],
        description: '朝日のようにエネルギッシュで、新しいことに挑戦するのが大好き。直感力が鋭く、「面白そう！」と思ったら即行動。周りを明るくする太陽のような存在。',
        advice: 'あなたの行動力は素晴らしい武器です。時には立ち止まって計画を練ることで、さらに大きな成果を得られるでしょう。'
    },
    'dusk_ruby_fox': {
        name: '宵紅の狐',
        furigana: 'よいべにのきつね', 
        emoji: '🦊🌙',
        catchphrase: '神秘的な賢者',
        traits: ['直感', '洞察', '神秘性'],
        description: '夕暮れのように静かで神秘的。人の心を見抜く洞察力があり、本質を見極めるのが得意。一人の時間を大切にし、深く考える知的な存在。',
        advice: 'あなたの深い洞察力は貴重な才能です。時には直感を信じて大胆に行動することで、新たな可能性が開けるでしょう。'
    },
    'ascending_hawk': {
        name: '昇天の鷹',
        furigana: 'しょうてんのたか',
        emoji: '🦅🌅', 
        catchphrase: '野心的なリーダー',
        traits: ['理想', '向上心', '実行力'],
        description: '高い理想を掲げ、それに向かって着実に進む努力家。リーダーシップがあり、周りを引っ張る力強さを持つ。成功への強い意欲がある。',
        advice: 'あなたの向上心は周りを良い方向に導きます。時には肩の力を抜いて、プロセスを楽しむことも大切です。'
    },
    'soaring_hawk': {
        name: '翔月の鷹',
        furigana: 'しょうげつのたか',
        emoji: '🦅🌙',
        catchphrase: '哲学的な思索者', 
        traits: ['俯瞰', '哲学', '長期思考'],
        description: '物事を俯瞰的に捉え、長期的な視点で考える哲学者タイプ。静かな環境で深く思索することを好み、本質的な価値を追求する。',
        advice: 'あなたの深い思考力は貴重な財産です。考えるだけでなく、小さな一歩から行動に移すことで理想が現実になります。'
    },
    'pack_wolf': {
        name: '群銀の狼',
        furigana: 'ぐんぎんのおおかみ',
        emoji: '🐺🌅',
        catchphrase: 'チームビルダー',
        traits: ['協調', 'リーダーシップ', '仲間思い'],
        description: 'チームワークを何より大切にし、みんなで成功することに喜びを感じる。仲間を守る強さと、チームをまとめるリーダーシップを併せ持つ。',
        advice: 'あなたの協調性は組織の宝です。時には自分の意見もしっかり主張することで、より良いチームが作れるでしょう。'
    },
    'lone_wolf': {
        name: '孤月の狼',
        furigana: 'こげつのおおかみ',
        emoji: '🐺🌙',
        catchphrase: '一匹狼の強者',
        traits: ['独立', '強さ', '選択的信頼'],
        description: '一人で行動することを好み、自分の信念を貫く強さを持つ。少数の深い友情を大切にし、本当に信頼できる人には深い忠誠心を示す。',
        advice: 'あなたの独立性は大きな強みです。時には信頼できる人に頼ることで、さらに大きな力を発揮できるでしょう。'
    },
    'young_deer': {
        name: '若翠の鹿',
        furigana: 'じゃくすいのしか',
        emoji: '🦌🌅',
        catchphrase: '希望の使者',
        traits: ['成長', '希望', '前向き'],
        description: '若葉のように常に成長し続け、周りに希望を与える存在。新しいことを学ぶのが好きで、失敗を恐れずに挑戦する前向きさを持つ。',
        advice: 'あなたの純粋さと成長意欲は周りを明るくします。自分のペースを大切にしながら、着実に歩んでいきましょう。'
    },
    'deep_deer': {
        name: '深翠の鹿',
        furigana: 'しんすいのしか',
        emoji: '🦌🌙',
        catchphrase: '心の癒し手',
        traits: ['癒し', '包容力', '深い共感'],
        description: '深い森のように静かで包容力があり、疲れた心を癒す力を持つ。相手の気持ちを深く理解し、時間をかけてじっくりと支える優しさがある。',
        advice: 'あなたの癒しの力は本当に貴重です。自分自身も大切にして、心のバランスを保つことを忘れずに。'
    },
    'guardian_bear': {
        name: '守金の熊',
        furigana: 'しゅきんのくま',
        emoji: '🐻🌅',
        catchphrase: '頼れる守護者',
        traits: ['保護', '責任感', '行動力'],
        description: '大切な人を守るためなら何でもする強さを持つ。責任感が強く、困っている人を見過ごせない正義感のある頼れる存在。',
        advice: 'あなたの守る力は多くの人の支えになっています。時には自分も守られることを許して、リラックスしましょう。'
    },
    'resting_bear': {
        name: '憩金の熊',
        furigana: 'けいきんのくま',
        emoji: '🐻🌙',
        catchphrase: '安らぎの提供者',
        traits: ['安定', '平和', 'じっくり型'],
        description: 'ゆったりとした時間の流れを大切にし、周りに安心感を与える存在。急がず焦らず、着実に物事を進める落ち着きがある。',
        advice: 'あなたの安定感は周りの人にとって心の支えです。時には新しい挑戦も楽しんでみると、新たな一面が発見できるでしょう。'
    },
    'dancing_butterfly': {
        name: '舞虹の蝶',
        furigana: 'ぶこうのちょう',
        emoji: '🦋🌅',
        catchphrase: '華やかな芸術家',
        traits: ['表現', '美', '自由'],
        description: '美しいものを愛し、自分自身も美しく表現することを大切にする芸術家タイプ。自由で創造的、周りを華やかにする魅力がある。',
        advice: 'あなたの創造性と美的センスは世界を彩ります。時には現実的な面も大切にすることで、夢がより確実に形になります。'
    },
    'dreaming_butterfly': {
        name: '夢虹の蝶',
        furigana: 'むこうのちょう',
        emoji: '🦋🌙',
        catchphrase: '幻想的な創造者',
        traits: ['想像', '内省', '神秘'],
        description: '豊かな想像力を持ち、内なる美しさを大切にする夢想家。静かな環境で創造活動に集中し、幻想的で独創的な作品を生み出す。',
        advice: 'あなたの豊かな想像力は貴重な才能です。夢を現実に変える小さな行動を積み重ねることで、理想の世界が手に入ります。'
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