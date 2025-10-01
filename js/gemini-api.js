// Google Gemini API連携

// APIキーを設定（本番環境では環境変数を使用推奨）
const GEMINI_API_KEY = 'AIzaSyAO5RadalZrXKVjHNHftHDHiRjk1nGxMUk';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Gemini APIでタロット占い結果を生成
 * @param {Object} guardianData - 守護者情報
 * @param {Array} selectedCards - 選択されたカード配列
 * @param {string} genre - 占いジャンル
 * @returns {Promise<Object>} - 占い結果オブジェクト
 */
async function generateAITarotReading(guardianData, selectedCards, genre, isPremium = false) {
    try {
        // プロンプトを構築（無料版 or 有料版）
        const prompt = isPremium 
            ? buildPremiumTarotPrompt(guardianData, selectedCards, genre)
            : buildFreeTarotPrompt(guardianData, selectedCards, genre);
        
        // API呼び出し
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // レスポンスから結果を抽出
        const generatedText = data.candidates[0].content.parts[0].text;

        // デバッグ: 実際のレスポンスを確認
        console.log('Gemini生成テキスト:', generatedText);
        console.log('API Response Full:', data);

        // 結果をパース
        return parseGeminiResponse(generatedText);
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw error;
    }
}

/**
 * タロット占い用のプロンプトを構築
 * @param {Object} guardianData - 守護者データ
 * @param {Array} selectedCards - 選択されたカード
 * @param {string} genre - 占いジャンル
 * @returns {string} - 構築されたプロンプト
 */
 

    /**
 * 有料版：詳細な占い結果プロンプト（450-600文字）
 */
function buildPremiumTarotPrompt(guardianData, selectedCards, genre) {
    // ジャンル別の位置説明
    const positionTexts = getPositionTexts(genre);
    
    // 守護者情報と性格特性
    let guardianInfo;
    let personalityPrompt;
    
    if (!guardianData || guardianData.type === 'no_diagnosis') {
        guardianInfo = '守護者タイプ: 未診断\n性格特性: まだ判明していない未知の可能性';
        personalityPrompt = 'まだ守護者が判明していないあなたですが、誰にでも共通する普遍的な人間の心理に基づいて';
    } else {
        guardianInfo = `守護者タイプ: ${guardianData.name}\n性格特性: ${guardianData.traits ? guardianData.traits.join('、') : ''}\n性格の説明: ${guardianData.description || ''}`;
        
        // 性格タイプ別の「あるある」パターン
        const personalityPatterns = {
            'dawn_ruby_fox': '新しいことに飛びつきやすいあなたは、「これ面白そう！」って始めたものの、途中で飽きちゃうことありませんか？',
            'dusk_ruby_fox': '人の本質を見抜くあなたは、表面的な付き合いに虚しさを感じること、ありませんか？',
            'ascending_hawk': '高い目標を掲げるあなたは、「もっと頑張らなきゃ」ってプレッシャーを感じてませんか？',
            'soaring_hawk': '俯瞰で物事を見るあなたは、周りが近視眼的に見えてイライラすること、ありませんか？',
            'pack_wolf': 'チームを大事にするあなたは、一人で決断するのが不安になること、ありませんか？',
            'lone_wolf': '一人が好きなあなたは、「協調性がない」って言われて傷つくこと、ありませんか？',
            'young_deer': '成長意欲が強いあなたは、「まだまだ自分はダメだ」って焦ること、ありませんか？',
            'deep_deer': '人の気持ちに敏感なあなたは、疲れてても「大丈夫」って言っちゃうこと、ありませんか？',
            'guardian_bear': '責任感が強いあなたは、全部背負い込んで一人で抱え込むこと、ありませんか？',
            'resting_bear': 'マイペースなあなたは、周りに急かされるとストレス感じませんか？',
            'dancing_butterfly': '自由を求めるあなたは、ルールや縛りに窮屈さを感じませんか？',
            'dreaming_butterfly': '想像の世界が好きなあなたは、現実とのギャップに落ち込むこと、ありませんか？'
        };
        
        const typePattern = personalityPatterns[guardianData.type] || '';
        personalityPrompt = `${typePattern} そんなあなただからこそ`;
    }
    
    // カード情報（カード名は表示しない）
    const cardInfo = selectedCards.map((card, index) => 
        `${index + 1}枚目「${positionTexts[index]}」のカード: ${card.meaning}（${card.upright}）`
    ).join('\n');
    
    // ジャンル別のメッセージ調整
    const genreText = getGenreText(genre);
    const genreSpecificPrompt = getGenreSpecificPrompt(genre);
    
    return `あなたは「当たる！」と評判のプロのタロット占い師です。相談者の心を見抜き、具体的で説得力のある鑑定をしてください。

【相談者の性格】
${guardianInfo}

【選択されたカード（参考情報）】
${cardInfo}

【占いテーマ】
${genreText}

以下の形式で回答してください：
---
状況の読み解き:
---
今後の展開:
---
アドバイス:
---

【重要な指示】

1. 状況の読み解き（150-200文字）
   - カード1枚目の内容
   - 冒頭で心情を言い当てる（コールドリーディング）
   ${personalityPrompt}、カードはこう語っています。
   - 性格タイプ特有の悩みを具体的に指摘
   - 現在の状況を具体的なシチュエーションで描写

2. 今後の展開（150-200文字）
   - カード2枚目の内容
   ${genreSpecificPrompt}
   - 具体的なシチュエーション（職場・恋愛・人間関係など）
   - タイミングを明示（「今週中に」「来週あたり」など）
   - 日常の小さなサインを提示

3. アドバイス（150-200文字）
   - カード3枚目の内容
   - 背中を押す具体的な行動提案
   - 守護者タイプに合わせた最適なアプローチ
   - ポジティブで希望が持てる締めくくり

4. 文体は親しみやすい敬語（丁寧すぎない、優しい語り口）
   - 「〜のでは？」「〜ではないでしょうか」「〜なんです」
   - 「〜してみてください」「〜かもしれません」「〜なようです」
   - ただし堅苦しくならないよう、時々「〜ですよね」「〜なんですよね」も使う

5. カード名は絶対に出力しない

6. 文字数
   - 状況の読み解き：150-200文字
   - 今後の展開：150-200文字
   - アドバイス：150-200文字
   - 合計450-600文字

7. 冒頭の書き出し方
   - 守護者名は書かない（タイトルに既に表示されているため）
   - いきなり性格の特徴や心情の言い当てから始める`;
}

/**
 * 無料版：ライトな占い結果プロンプト（250-300文字）
 */
function buildFreeTarotPrompt(guardianData, selectedCards, genre) {
    const positionTexts = getPositionTexts(genre);
    
    // 守護者情報
    let personalityHint = '';
    if (guardianData && guardianData.type !== 'no_diagnosis') {
        const personalityPatterns = {
            'dawn_ruby_fox': '新しいことに飛びつきやすい',
            'dusk_ruby_fox': '人の本質を見抜く',
            'ascending_hawk': '高い目標を掲げる',
            'soaring_hawk': '俯瞰で物事を見る',
            'pack_wolf': 'チームを大事にする',
            'lone_wolf': '一人が好き',
            'young_deer': '成長意欲が強い',
            'deep_deer': '人の気持ちに敏感',
            'guardian_bear': '責任感が強い',
            'resting_bear': 'マイペース',
            'dancing_butterfly': '自由を求める',
            'dreaming_butterfly': '想像の世界が好き'
        };
        personalityHint = personalityPatterns[guardianData.type] || '';
    }
    
    // カード情報（1枚目と2枚目のみ使用）
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];
    const card3 = selectedCards[2];
    
    const cardInfo = `
1枚目「${positionTexts[0]}」: ${card1.meaning}（${card1.upright}）
2枚目「${positionTexts[1]}」: ${card2.meaning}（${card2.upright}）
3枚目「${positionTexts[2]}」: ${card3.meaning}（${card3.upright}）
`;
    
    const genreText = getGenreText(genre);
    
    return `あなたはプロのタロット占い師です。簡潔でわかりやすい鑑定をしてください。

【相談者の性格ヒント】
${personalityHint ? `性格: ${personalityHint}な傾向` : '性格タイプ未診断'}

【選択されたカード】
${cardInfo}

【占いテーマ】
${genreText}

以下の形式で回答してください：
---
運勢と展開:
---
アドバイス:
---

【重要な指示】

1. 運勢と展開（150-200文字）
   - カード1枚目と2枚目の内容を統合
   - 性格の特徴を軽く触れつつ、現在の状況と今後の展開を要点のみ
   - 「〜のでは？」「〜かもしれません」など親しみやすい敬語
   - 具体的なシチュエーションを1-2個含める

2. アドバイス（80-100文字）
   - カード3枚目の内容
   - 具体的な行動提案を1-2個
   - 背中を押すポジティブなメッセージ
   - 「〜してみてください」「〜すると良いですよ」

3. 文体
   - 親しみやすい敬語（堅苦しくない）
   - サクッと読める、要点を絞った表現
   - カード名は絶対に出さない

4. 文字数厳守
   - 運勢と展開：150-200文字
   - アドバイス：80-100文字
   - 合計250-300文字以内`;
}


/**
 * ジャンル別の具体的プロンプト
 */
function getGenreSpecificPrompt(genre) {
    const prompts = {
        'today_fortune': '今日の出来事や人間関係での具体的なシーンを描写してください。',
        'love_single': '相手の行動や気持ち、今後の展開を具体的に。「あの人」の態度の変化、連絡のタイミング、距離の縮まり方など。',
        'love_couple': 'パートナーの心理状態、関係性の変化、二人の未来を具体的に。最近の些細な変化にも触れて。',
        'love_reunion': '相手の今の状況、心境の変化、復縁の可能性を現実的に。焦らず、ステップを示して。',
        'work_fortune': '職場での人間関係、評価、チャンス、注意点を具体的に。上司・同僚・部下との関わり方など。',
        'relationship': '周囲の人たちとの関係性、誤解、和解、新しい出会いなどを具体的に。'
    };
    
    return prompts[genre] || prompts['today_fortune'];
}

/**
 * ジャンル別の位置テキストを取得
 * @param {string} genre - 占いジャンル
 * @returns {Array} - 位置テキスト配列
 */
function getPositionTexts(genre) {
    const positionMap = {
        'today_fortune': ['今日の状況', '今日の展開', '今日のアドバイス'],
        'love_single': ['お相手の状況', '今後の関係性', 'アドバイス'],
        'love_couple': ['パートナーの状況', '今後の関係性', 'アドバイス'],
        'love_reunion': ['お相手の状況', '復縁の可能性', 'アドバイス'],
        'work_fortune': ['現在の環境', '今後の展開', 'アドバイス'],
        'relationship': ['現在の状況', '今後の展開', 'アドバイス']
    };
    
    return positionMap[genre] || positionMap['today_fortune'];
}

/**
 * ジャンル別のテーマテキストを取得
 * @param {string} genre - 占いジャンル
 * @returns {string} - テーマテキスト
 */
function getGenreText(genre) {
    const genreMap = {
        'today_fortune': '今日の運勢',
        'love_single': '片思いの恋愛運',
        'love_couple': 'カップルの恋愛運',
        'love_reunion': '復縁運',
        'work_fortune': '仕事運',
        'relationship': '人間関係運'
    };
    
    return genreMap[genre] || '今日の運勢';
}

/**
 * Gemini APIのレスポンスを解析（無料版・有料版対応）
 */
function parseGeminiResponse(responseText, isPremium = false) {
    try {
        console.log('解析対象テキスト:', responseText);
        
        if (isPremium) {
            // 有料版：3項目
            return parsePremiumResponse(responseText);
        } else {
            // 無料版：2項目
            return parseFreeResponse(responseText);
        }
        
    } catch (error) {
        console.error('Response parsing error:', error);
        return {
            situation: '',
            development: '',
            advice: '今日もあなたらしく過ごしてくださいね。'
        };
    }
}

/**
 * 無料版レスポンスのパース
 */
function parseFreeResponse(responseText) {
    let fortuneAndDevelopment = '';
    let advice = '';
    
    // パターン1: 「運勢と展開:」で検索
    const match1 = responseText.match(/運勢と展開[：:]\s*\n---([\s\S]*?)---\s*アドバイス[：:]\s*\n---([\s\S]*?)(?=\n---|$)/);
    if (match1) {
        fortuneAndDevelopment = match1[1].trim();
        advice = match1[2].trim();
    } else {
        // フォールバック: ---で分割
        const parts = responseText.split('---').filter(p => p.trim());
        if (parts.length >= 2) {
            fortuneAndDevelopment = parts[0].replace(/運勢と展開[：:]/g, '').trim();
            advice = parts[1].replace(/アドバイス[：:]/g, '').trim();
        }
    }
    
    // 改行整形
    const formattedFortune = formatText(fortuneAndDevelopment);
    const formattedAdvice = formatText(advice);
    
    return {
        fortuneAndDevelopment: formattedFortune || '穏やかな一日になりそうです。',
        advice: formattedAdvice || '自分らしく過ごしてくださいね。'
    };
}

/**
 * 有料版レスポンスのパース
 */
function parsePremiumResponse(responseText) {
    let situation = '';
    let development = '';
    let advice = '';
    
    // 新しいパターンに対応：「---\n状況の読み解き:\n---\n内容\n---」形式
    const sections = responseText.split('---').map(s => s.trim()).filter(s => s);
    
    console.log('分割されたセクション数:', sections.length);
    console.log('セクション内容:', sections);
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        // 「状況の読み解き:」を含むセクションの次が本文
        if (section.includes('状況の読み解き')) {
            if (i + 1 < sections.length) {
                situation = sections[i + 1];
                console.log('状況の読み解き:', situation.substring(0, 50));
            }
        }
        // 「今後の展開:」を含むセクションの次が本文
        else if (section.includes('今後の展開')) {
            if (i + 1 < sections.length) {
                development = sections[i + 1];
                console.log('今後の展開:', development.substring(0, 50));
            }
        }
        // 「アドバイス:」を含むセクションの次が本文
        else if (section.includes('アドバイス')) {
            if (i + 1 < sections.length) {
                advice = sections[i + 1];
                console.log('アドバイス:', advice.substring(0, 50));
            }
        }
    }
    
    // 改行整形
    const formattedSituation = formatText(situation);
    const formattedDevelopment = formatText(development);
    const formattedAdvice = formatText(advice);
    
    return {
        situation: formattedSituation || '現在の状況を見つめ直す時期のようです。',
        development: formattedDevelopment || '良い変化が訪れそうです。',
        advice: formattedAdvice || '自分を信じて進んでください。'
    };
}

/**
 * テキストを読みやすく整形
 */
function formatText(text) {
    return text
        .replace(/。  /g, '。<br><br>')
        .replace(/。([あ-ん])/g, '。<br>$1')
        .replace(/ね。/g, 'ね。<br><br>')
        .replace(/よ。/g, 'よ。<br><br>')
        .replace(/です。/g, 'です。<br><br>');
}





