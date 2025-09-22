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

2. 文体は親しみやすく温かく
   - 「〜かもしれません」→「〜かも」
   - 「〜してください」→「〜してみて」
   - 「〜ではないでしょうか」→「〜なのでは？」

3. 内容は励ましと理解を込めて
   - 性格の特徴を肯定的に捉える
   - 具体的すぎず、幅広い状況に当てはまる表現

4. カード名は絶対に出力しない

5. 文字数制限: 個別鑑定結果 250-350文字

6. 必ず守護者タイプ名を冒頭で言及
   - 「○○を守護者にもつあなたは...」から始める

7. 以下の要素を含む詳細な鑑定結果
   - 現在の状況分析 (50-80文字)
   - 今後の展開予想 (80-120文字)  
   - 具体的なアドバイス (100-150文字)
   - 励ましのメッセージ (50-80文字)

8. 総文字数: 400-500文字程度

9. 読みやすさの配慮
   - 2-3文ごとに必ず改行する
   - 段落の間は空行を入れる
   - 長い文章は避けて短文にする`;
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
        console.log('解析対象テキスト:', responseText);
        
        // 複数のパターンで検索
        let personalizedFortune = '';
        
        // パターン1: 「個別鑑定結果:」で検索 - 複数行対応
const match1 = responseText.match(/個別鑑定結果[：:]\s*\n---([\s\S]*?)(?=\n---|$)/);
if (match1) {
    personalizedFortune = match1[1].trim();
} else {
    // フォールバック: ---の後の内容を全て取得
    const parts = responseText.split('---');
    if (parts.length >= 3) {
        personalizedFortune = parts[2].trim();
    }
}
        
        // パターン2: 見つからない場合は全文を使用
if (!personalizedFortune) {
    // ---で区切られている場合
    const parts = responseText.split('---');
    if (parts.length >= 3) {
        personalizedFortune = parts[2].replace(/個別鑑定結果[：:]/g, '').trim();
    } else {
        // 最後の手段：全文の最初の部分を使用
        personalizedFortune = responseText.trim();
    }
}
        
        // 読みやすくするために改行を追加
const formattedFortune = personalizedFortune
    .replace(/。  /g, '。<br><br>')      // 文末の後に改行
    .replace(/。([あ-ん])/g, '。<br>$1')  // ひらがなの前で改行
    .replace(/ね。/g, 'ね。<br><br>')     // 「ね。」の後に改行
    .replace(/よ。/g, 'よ。<br><br>')     // 「よ。」の後に改行
    .replace(/です。/g, 'です。<br><br>') // 「です。」の後に改行
    || '今日もあなたらしく過ごしてくださいね。';

return {
    personalizedFortune: formattedFortune
};
        
    } catch (error) {
        console.error('Response parsing error:', error);
        return {
            personalizedFortune: '今日もあなたらしく過ごしてくださいね。'
        };
    }
}



