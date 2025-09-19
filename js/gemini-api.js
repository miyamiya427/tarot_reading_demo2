// Google Gemini API連携

// APIキーを設定（本番環境では環境変数を使用推奨）
const GEMINI_API_KEY = 'AIzaSyDwFhTWxJk9Mv8SjNEi7fkiIbzbYp3VJ8s';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

/**
 * Gemini APIでタロット占い結果を生成
 * @param {Object} guardianData - 守護者情報
 * @param {Array} selectedCards - 選択されたカード配列
 * @param {string} genre - 占いジャンル
 * @returns {Promise<Object>} - 占い結果オブジェクト
 */
async function generateAITarotReading(guardianData, selectedCards, genre) {
    try {
        // プロンプトを構築
        const prompt = buildTarotPrompt(guardianData, selectedCards, genre);
        
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
function buildTarotPrompt(guardianData, selectedCards, genre) {
    // ジャンル別の位置説明
    const positionTexts = getPositionTexts(genre);
    
    // 守護者情報と性格特性
    const guardianInfo = guardianData ? 
        `守護者タイプ: ${guardianData.name}\n性格特性: ${guardianData.traits ? guardianData.traits.join('、') : ''}\n性格の説明: ${guardianData.description || ''}` : 
        '守護者タイプ: 未診断';
    
    // カード情報（カード名は表示しない）
    const cardInfo = selectedCards.map((card, index) => 
        `${index + 1}枚目「${positionTexts[index]}」のカード: ${card.meaning}（${card.upright}）`
    ).join('\n');
    
    // ジャンル別のメッセージ調整
    const genreText = getGenreText(genre);
    
    return `あなたは親しみやすく優しいタロット占い師です。相談者の性格タイプを深く理解し、その人の性格特性に寄り添った個別のメッセージを提供してください。

【相談者の性格】
${guardianInfo}

【選択されたカード（参考情報）】
${cardInfo}

【占いテーマ】
${genreText}

以下の形式で回答してください：
---
個別鑑定結果: 
---

【重要な指示】
1. 性格特性を必ず考慮した寄り添い型メッセージ
   - 「あなたの○○な性格から、こう感じてしまうかもしれませんが...」
   - 「普段○○なところがあるあなたですが...」
   - 「○○を大切にするあなたらしい考え方で...」

2. 性格別のアプローチ
   - 内向的な人：「一人の時間も大切にしながら...」「自分のペースで...」
   - 外向的な人：「いつものように積極的に...」「周りの人と一緒に...」
   - 慎重な人：「無理をせず着実に...」「よく考えてから行動することで...」
   - 行動的な人：「思い切って新しいことに...」「直感を信じて...」

3. 文体は親しみやすく温かく
   - 「〜かもしれません」→「〜かも」
   - 「〜してください」→「〜してみて」
   - 「〜ではないでしょうか」→「〜なのでは？」

4. 内容は励ましと理解を込めて
   - 性格の特徴を肯定的に捉える
   - 弱みも「それがあなたの優しさ」的に表現
   - 具体的すぎず、幅広い状況に当てはまる表現

5. カード名は絶対に出力しない
   - タロットカード名は一切使わない

6. 文字数制限
   - 個別鑑定結果: 250-350文字

7. 必ず守護者タイプ名を冒頭で言及
   - 「○○を守護者にもつあなたは...」から始める`;

【相談者の性格】
${guardianInfo}

【選択されたカード（参考情報）】
${cardInfo}

【占いテーマ】
${genreText}

以下の形式で回答してください：
---
個別鑑定結果: 
---

【重要な指示】
1. 性格特性を必ず考慮したアドバイスにする
   - 内向的な人には「少しずつ」「自分のペースで」
   - 外向的な人には「積極的に」「チャレンジして」
   - 慎重な人には「無理をしないで」
   - 行動的な人には「思い切って」

2. 文体は親しみやすく
   - 「〜かもしれません」→「〜かも」
   - 「〜してください」→「〜してみて」
   - 「〜ではないでしょうか」→「〜なのでは？」
   - 適度にですます調も混ぜる

3. 内容は具体的すぎず汎用的に
   - 「今日は新しい出会いがある」→「素敵な出会いがありそう」
   - 「上司と対立する」→「人間関係で少し気を使う場面があるかも」

4. カード名は絶対に出力しない
   - ペンタクルの8、ソードの3などの表記は一切使わない

5. 守護者名や設定的な冒頭は不要
   - 「深翠の鹿さん、」「守護者より」「森の中で」などの表現は使わない
   - いきなり本題のメッセージから始める

6. 文字数制限
   - 守護者メッセージ: 80-120文字
   - 総合運勢: 150-200文字

7. 前向きで希望を与える内容にする`;
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
 * Gemini APIのレスポンスを解析
 * @param {string} responseText - APIからのレスポンステキスト
 * @returns {Object} - パースされた結果オブジェクト
 */
function parseGeminiResponse(responseText) {
    try {
        // レスポンステキストから守護者メッセージと総合運勢を抽出
        const lines = responseText.split('\n');
        let guardianMessage = '';
        let fortune = '';
        
        for (const line of lines) {
            if (line.includes('個別鑑定結果:')) {
    personalizedFortune = line.split(':')[1]?.trim() || '';
}
        }
        
        // フォールバック: 見つからない場合は全体テキストを分割
        if (!guardianMessage || !fortune) {
            const parts = responseText.split('---');
            if (parts.length >= 2) {
                const content = parts[1] || parts[0];
                const contentLines = content.split('\n').filter(line => line.trim());
                
                guardianMessage = contentLines[0]?.replace(/^[^:]*:/, '').trim() || responseText.substring(0, 100);
                fortune = contentLines[1]?.replace(/^[^:]*:/, '').trim() || responseText.substring(100, 300);
            } else {
                // 最終フォールバック
                guardianMessage = responseText.substring(0, 120);
                fortune = responseText.substring(120, 300);
            }
        }
        
        return {
            guardianMessage: guardianMessage || '今日もあなたらしく過ごしてくださいね。',
            fortune: fortune || '今日は新しい発見がありそうです。前向きに過ごしましょう。'
        };
        
    } catch (error) {
        console.error('Response parsing error:', error);
        return {
            guardianMessage: '今日もあなたらしく過ごしてくださいね。',
            fortune: '今日は新しい発見がありそうです。前向きに過ごしましょう。'
        };
    }
}