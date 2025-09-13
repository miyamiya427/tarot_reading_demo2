// 12タイプ診断の判定ロジック

// 30問の配点設定（各問題の選択肢とスコア配分）


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

// 配点設定の整理
const questionScoring = {};
diagnosisQuestions.forEach(q => {
    questionScoring[q.id] = {
        A: q.options.A.scores,
        B: q.options.B.scores,
        C: q.options.C.scores
    };
});

// タイブレイク用の優先順位
const tieBreakOrder = ['ruby_fox', 'sapphire_hawk', 'silver_wolf', 'emerald_deer', 'gold_bear', 'rainbow_butterfly'];

/**
 * 30問3択の回答から12タイプを判定する関数
 * @param {Object} answers - 回答データ {1: 'A', 2: 'B', 3: 'C', ...}
 * @returns {Object} - 判定結果
 */
function diagnose12Types(answers) {
    // Step 1: 回答数チェック
    if (Object.keys(answers).length !== 30) {
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
    for (let questionId = 1; questionId <= 30; questionId++) {
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
    if (scoreDifference >= 5) {
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

// 30問3択診断：質問データと配点設定

const diagnosisQuestions = [
    {
        id: 1,
        text: "朝起きた時の気分は？",
        options: {
            A: { text: "今日は何しよう？ワクワクする！", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "今日もいい一日にしよう♪", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "とりあえず二度寝したい...", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 2,
        text: "友達と過ごす理想の時間は？",
        options: {
            A: { text: "みんなでワイワイ盛り上がる！", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "少人数でまったりおしゃべり", scores: ['emerald_deer', 'gold_bear'] },
            C: { text: "一緒にいるけど各自好きなことしてる", scores: ['sapphire_hawk', 'rainbow_butterfly'] }
        }
    },
    {
        id: 3,
        text: "新しい環境（クラス・職場・サークル）では？",
        options: {
            A: { text: "積極的に「よろしく！」って話しかける", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "様子見つつ、徐々に仲良くなっていく", scores: ['emerald_deer', 'sapphire_hawk'] },
            C: { text: "必要最小限の人とだけ関わればOK", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 4,
        text: "休日の理想的な過ごし方は？",
        options: {
            A: { text: "外におでかけ！アクティブに過ごす", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "大切な人とのんびり過ごす", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "家でダラダラ、自分時間を満喫", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 5,
        text: "何かを決める時に一番大事なのは？",
        options: {
            A: { text: "直感！「なんかいい感じ」かどうか", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "みんな（家族・友達）はどう思うか", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "失敗しない安全な選択かどうか", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 6,
        text: "理想の毎日は？",
        options: {
            A: { text: "毎日違うことして刺激的に！", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "大好きな人たちとの時間がたっぷり", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "穏やかで安定したルーティン", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 7,
        text: "ストレス溜まった時は？",
        options: {
            A: { text: "気分転換に外出！新しいことする", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "信頼できる人に「聞いて聞いて」する", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "ひとりになってゆっくり考える", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 8,
        text: "自分の長所だと思うのは？",
        options: {
            A: { text: "フットワークの軽さとチャレンジ精神", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "人との関わり方、空気読むのが得意", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "継続力があって責任感が強い", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 9,
        text: "買い物する時は？",
        options: {
            A: { text: "「これだ！」って直感で即決", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "友達や家族と「どっちがいい？」って相談", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "しっかり比較検討してから購入", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 10,
        text: "人生で一番大切なことは？",
        options: {
            A: { text: "自由でいること、可能性を広げること", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "愛情深い関係、人とのつながり", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "安心できること、着実な成長", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 11,
        text: "グループ活動だと？",
        options: {
            A: { text: "「こんなのどう？」ってアイデア出しまくる", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "みんなの意見まとめる調整役", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "自分の得意なところで確実に貢献", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 12,
        text: "友達が落ち込んでる時は？",
        options: {
            A: { text: "「一緒に解決しよう！」って行動派", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "まずは「大丈夫？」ってじっくり聞く", scores: ['emerald_deer', 'gold_bear'] },
            C: { text: "そばにいて、必要な時にサポート", scores: ['sapphire_hawk', 'rainbow_butterfly'] }
        }
    },
    {
        id: 13,
        text: "人と話す時に心がけてることは？",
        options: {
            A: { text: "楽しい雰囲気にすること！", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "相手の気持ちに寄り添うこと", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "嘘つかない、正直でいること", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 14,
        text: "初めて会う人とは？",
        options: {
            A: { text: "「何してるの？」って積極的に質問", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "相手が話しやすそうな空気作り", scores: ['emerald_deer', 'rainbow_butterfly'] },
            C: { text: "自然な流れでゆっくり親しくなる", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 15,
        text: "みんなで意見が分かれた時は？",
        options: {
            A: { text: "「もっといい方法ない？」って議論する", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "「みんなが納得できる案は？」って調整", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "冷静に状況整理して客観的に判断", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 16,
        text: "よく相談されるのは？",
        options: {
            A: { text: "新しいことへの挑戦について", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "恋愛や人間関係の悩み", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "将来の計画や現実的な問題", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 17,
        text: "好きになりやすいタイプは？",
        options: {
            A: { text: "一緒にいて楽しい、刺激的な人", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "優しくて思いやりがある人", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "安心できて信頼できる人", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 18,
        text: "デートで行きたいのは？",
        options: {
            A: { text: "話題の新スポット！まだ行ったことない所", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "ゆっくり話せるカフェや静かな場所", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "お互いの趣味を楽しめる場所", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 19,
        text: "大切な人との関係で重要なのは？",
        options: {
            A: { text: "お互いを刺激し合える関係", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "深い信頼と理解で結ばれた絆", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "長続きする安定した関係", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 20,
        text: "人間関係に疲れた時は？",
        options: {
            A: { text: "一人で好きなことして気分転換", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "本当に大切な人とだけ過ごす", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "しばらく人付き合い控えて充電", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 21,
        text: "10年後の理想の自分は？",
        options: {
            A: { text: "いろんな経験積んで成長してる自分", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "大切な人に囲まれて幸せな自分", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "安定した生活基盤で充実してる自分", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 22,
        text: "新しいこと始める時は？",
        options: {
            A: { text: "とりあえずやってみる！走りながら考える", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "信頼できる人に「どう思う？」って相談", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "しっかり準備してリスク把握してから", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 23,
        text: "大きな壁にぶつかった時は？",
        options: {
            A: { text: "「別のやり方試してみよう」って挑戦", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "周りの人と「一緒に頑張ろう」って協力", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "一歩ずつ着実に解決していく", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 24,
        text: "理想の環境（学校・職場・バイト先など）は？",
        options: {
            A: { text: "変化があって新しいことに挑戦できる", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "チームワーク良くて人間関係が温かい", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "安定してて自分のペースで成長できる", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 25,
        text: "「成功」って何だと思う？",
        options: {
            A: { text: "自分の可能性を最大限発揮すること", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "大切な人たちと幸せをシェアすること", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "目標達成して安心できる生活を送ること", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 26,
        text: "学びや成長については？",
        options: {
            A: { text: "幅広くいろんなことに興味持って学びたい", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "人との関わりの中で成長していきたい", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "専門分野を深めて確実にレベルアップ", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 27,
        text: "将来が不安になった時は？",
        options: {
            A: { text: "とりあえず行動して不安を吹き飛ばす", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "信頼できる人に話して安心したい", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "計画見直して準備をしっかりする", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 28,
        text: "人生で一番避けたいのは？",
        options: {
            A: { text: "変化のない退屈でマンネリな日々", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "一人ぼっちで誰ともつながってない状況", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "不安定で明日がどうなるかわからない状況", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 29,
        text: "社会の役に立つなら？",
        options: {
            A: { text: "新しいアイデアで革新を起こしたい", scores: ['ruby_fox', 'sapphire_hawk'] },
            B: { text: "人と人をつなぐコミュニティを作りたい", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "基盤となる仕組みやシステムを支えたい", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    },
    {
        id: 30,
        text: "最終的に一番大切にしたいのは？",
        options: {
            A: { text: "自分らしく自由に生きた証拠", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "愛する人たちとの絆と思い出", scores: ['silver_wolf', 'emerald_deer'] },
            C: { text: "安心して過ごせる環境と人間関係", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    }
];

// 配点設定の整理（実装時に使用）
const questionScoring = {};
diagnosisQuestions.forEach(q => {
    questionScoring[q.id] = {
        A: q.options.A.scores,
        B: q.options.B.scores,
        C: q.options.C.scores
    };
});

// 各タイプの出現頻度チェック（バランス調整用）
function analyzeTypeBalance() {
    const typeCount = {
        ruby_fox: 0,
        sapphire_hawk: 0,
        silver_wolf: 0,
        emerald_deer: 0,
        gold_bear: 0,
        rainbow_butterfly: 0
    };
    
    questions30.forEach(q => {
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

// バランスチェック実行
// analyzeTypeBalance();


// 使用例
/*
const answers = {
    1: 'A', 2: 'B', 3: 'C', 4: 'A', 5: 'B',
    6: 'C', 7: 'A', 8: 'B', 9: 'C', 10: 'A',
    // ... 30問分
};

const result = diagnose12Types(answers);
const displayData = formatDiagnosisResult(result);
saveDiagnosisResult(result);

console.log(displayData);
*/