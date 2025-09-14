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
    
    // 守護者情報
    const guardianInfo = guardianData ? 
        `守護者タイプ: ${guardianData.name}\n特性: ${guardianData.traits ? guardianData.traits.join('、') : ''}` : 
        '守護者タイプ: 未診断';
    
    // カード情報
    const cardInfo = selectedCards.map((card, index) => 
        `${index + 1}枚目「${positionTexts[index]}」: ${card.name} - ${card.meaning}`
    ).join('\n');
    
    // ジャンル別のメッセージ調整
    const genreText = getGenreText(genre);
    
    return `あなたは経験豊富なタロットリーダーです。以下の情報を基に、温かく希望に満ちたメッセージを生成してください。

【相談者情報】
${guardianInfo}

【選択されたカード】
${cardInfo}

【占いテーマ】
${genreText}

以下の形式で回答してください：
---
守護者メッセージ: あなたの守護者からの具体的なメッセージ（80-120文字）
総合運勢: 3枚のカードから読み取れる総合的な運勢とアドバイス（150-200文字）
---

注意点：
- 具体的で実用的なアドバイスを含める
- 前向きで希望を与える内容にする
- 守護者の特性を活かしたメッセージにする
- 日本語で自然な文体で書く`;
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
            if (line.includes('守護者メッセージ:') || line.includes('守護者からのメッセージ:')) {
                guardianMessage = line.split(':')[1]?.trim() || '';
            }
            if (line.includes('総合運勢:') || line.includes('総合的な運勢:')) {
                fortune = line.split(':')[1]?.trim() || '';
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