// 占い結果シェア機能

/**
 * 占い結果の画像を生成してシェアする
 */
async function shareResultWithImage() {
    try {
        // 現在の占い結果データを取得
        const guardianData = JSON.parse(localStorage.getItem('guardianResult') || '{}');
        const resultText = document.getElementById('personalized-fortune')?.innerHTML || '';
        const genreTitle = document.getElementById('result-title')?.textContent || '';
        
        // 画像生成
        const imageBlob = await generateShareImage(guardianData, genreTitle, resultText);
        
        // シェア処理
        await shareImage(imageBlob, guardianData, genreTitle);
        
    } catch (error) {
        console.error('シェアエラー:', error);
        // フォールバック：テキストのみシェア
        shareTextOnly();
    }
}

/**
 * Canvas APIで占い結果の画像を生成
 */
async function generateShareImage(guardianData, genre, resultText) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // キャンバスサイズ設定（X向け横長）
    canvas.width = 800;
    canvas.height = 400;
    
    // 背景を描画
    drawBackground(ctx, canvas.width, canvas.height);
    
    // 左側：守護者画像エリア
    await drawGuardianSection(ctx, guardianData);
    
    // 右側：テキスト情報
    drawTextSection(ctx, guardianData, genre, resultText);
    
    // ロゴ・クレジット
    drawLogo(ctx, canvas.width, canvas.height);
    
    // Canvas を Blob に変換
    return new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 0.9);
    });
}

/**
 * 背景を描画
 */
function drawBackground(ctx, width, height) {
    // グラデーション背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#c2dada');
    gradient.addColorStop(1, '#b0d0d0');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 白い半透明オーバーレイ
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);
}

/**
 * 守護者セクションを描画（左側）
 */
async function drawGuardianSection(ctx, guardianData) {
    const sectionWidth = 250;
    const sectionHeight = 400;
    
    // 守護者エリア背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, sectionWidth, sectionHeight);
    
    // 守護者画像または絵文字を描画（中央配置）
    const centerY = sectionHeight / 2; // 200px（中央）
    
    if (guardianData.type && typeof guardianImages !== 'undefined' && guardianImages[guardianData.type]) {
        try {
            await drawGuardianImage(ctx, guardianImages[guardianData.type], sectionWidth, centerY - 60);
        } catch (error) {
            console.log('画像読み込みエラー:', error);
            drawGuardianEmoji(ctx, guardianData, sectionWidth, centerY - 30);
        }
    } else {
        drawGuardianEmoji(ctx, guardianData, sectionWidth, centerY - 30);
    }
    
    // 守護者名（画像の下に配置）
    if (guardianData.name) {
        ctx.font = 'bold 18px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(`守護者：${guardianData.name}`, sectionWidth / 2, centerY + 80);
        
        // ふりがな
        if (guardianData.furigana) {
            ctx.font = '12px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(`(${guardianData.furigana})`, sectionWidth / 2, centerY + 100);
        }
    }
}

/**
 * 守護者画像を描画
 */
function drawGuardianImage(ctx, imageSrc, sectionWidth, centerY) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function() {
            // 画像を円形にクリップ（サイズ拡大：60→80）
            ctx.save();
            ctx.beginPath();
            ctx.arc(sectionWidth / 2, centerY, 80, 0, 2 * Math.PI);
            ctx.clip();
            
            // 画像を描画（サイズ拡大：120→160）
            ctx.drawImage(img, sectionWidth / 2 - 80, centerY - 80, 160, 160);
            ctx.restore();
            resolve();
        };
        img.onerror = function() {
            resolve();
        };
        img.src = imageSrc;
    });
}

/**
 * 守護者絵文字を描画
 */
function drawGuardianEmoji(ctx, guardianData, sectionWidth, centerY) {
    ctx.font = '100px serif';  // 80px → 100px
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(guardianData.emoji || '🌟', sectionWidth / 2, centerY);
}

/**
 * テキストセクションを描画（右側）
 */
function drawTextSection(ctx, guardianData, genre, resultText) {
    const startX = 270;
    const maxWidth = 510;
    let currentY = 60;
    
    // ジャンルタイトル
ctx.font = 'bold 24px sans-serif';
ctx.textAlign = 'left';
// 背景を描画
const titleWidth = ctx.measureText(`${genre}を占ったよ！`).width + 30;
ctx.fillStyle = '#dacc89';
ctx.fillRect(startX - 15, currentY - 24, titleWidth, 36);
// テキストを描画
ctx.fillStyle = 'white';
ctx.fillText(`${genre}を占ったよ！`, startX, currentY);
currentY += 40;
    
    // 占い結果を取得
    const result = getShareResult();
    
    // 「運勢と展開」セクション
ctx.font = 'bold 14px sans-serif';
ctx.fillStyle = 'white';
ctx.fillText('＜運勢と展開＞', startX, currentY);
currentY += 25;
    
    ctx.font = '13px sans-serif';
    ctx.fillStyle = 'white';
    const fortuneLines = wrapText(ctx, result.fortuneAndDevelopment, maxWidth);
    const maxFortuneLines = 6; // 最大6行
    for (let i = 0; i < Math.min(fortuneLines.length, maxFortuneLines); i++) {
        ctx.fillText(fortuneLines[i], startX, currentY);
        currentY += 20;
    }
    
    currentY += 10;
    
    // 「アドバイス」セクション
ctx.font = 'bold 14px sans-serif';
ctx.fillStyle = 'white';
ctx.fillText('＜アドバイス＞', startX, currentY);
currentY += 25;
    
    ctx.font = '13px sans-serif';
    ctx.fillStyle = 'white';
    const adviceLines = wrapText(ctx, result.advice, maxWidth);
    const maxAdviceLines = 4; // 最大4行
    for (let i = 0; i < Math.min(adviceLines.length, maxAdviceLines); i++) {
        ctx.fillText(adviceLines[i], startX, currentY);
        currentY += 20;
    }
    
    // 続きを読むメッセージ
    if (fortuneLines.length > maxFortuneLines || adviceLines.length > maxAdviceLines) {
        currentY += 15;
        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText('※続きはアプリでご確認ください', startX, currentY);
    }
}

/**
 * 占い結果テキストを要約
 */
function summarizeResultText(text) {
    // HTMLタグを除去
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // 最初の2-3文を抜粋
    const sentences = cleanText.split('。');
    const summary = sentences.slice(0, 3).join('。') + '。';
    
    // 長すぎる場合は切り詰め
    return summary.length > 150 ? summary.substring(0, 147) + '...' : summary;
}

/**
 * 複数行テキストを描画
 */
function drawMultilineText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split('');
    let line = '';
    let currentY = y;
    
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i];
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && line !== '') {
            ctx.fillText(line, x, currentY);
            line = words[i];
            currentY += lineHeight;
            
            // 最大行数制限
            if (currentY > y + (lineHeight * 10)) {
                ctx.fillText(line + '...', x, currentY);
                break;
            }
        } else {
            line = testLine;
        }
    }
    
    if (line !== '') {
        ctx.fillText(line, x, currentY);
    }
}

/**
 * テキストを指定幅で折り返し
 */
function wrapText(ctx, text, maxWidth) {
    const words = text.split('');
    const lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
        const testLine = currentLine + words[i];
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = words[i];
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine !== '') {
        lines.push(currentLine);
    }
    
    return lines;
}

/**
 * シェア用の占い結果を取得
 */
function getShareResult() {
    const fortuneElement = document.getElementById('personalized-fortune');
    if (!fortuneElement) {
        return {
            fortuneAndDevelopment: '占い結果が見つかりません',
            advice: 'アプリでご確認ください'
        };
    }
    
    const html = fortuneElement.innerHTML;
    
    // セクションごとに分割
    const sections = html.split(/<h4[^>]*>/);
    
    let fortuneAndDevelopment = '';
    let advice = '';
    
    for (let section of sections) {
        if (section.includes('運勢と展開')) {
            const content = section.split('</h4>')[1];
            if (content) {
                fortuneAndDevelopment = content.replace(/<[^>]*>/g, '').trim();
            }
        } else if (section.includes('アドバイス')) {
            const content = section.split('</h4>')[1];
            if (content) {
                advice = content.replace(/<[^>]*>/g, '').replace(/プレミアム版.*$/s, '').trim();
            }
        }
    }
    
    return {
        fortuneAndDevelopment: fortuneAndDevelopment || '占い結果をご確認ください',
        advice: advice || 'アプリでご確認ください'
    };
}

/**
 * ロゴ・クレジットを描画
 */
function drawLogo(ctx, width, height) {
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('森の守護者とタロット占い', width - 20, height - 20);
}

/**
 * 生成した画像をシェア
 */
async function shareImage(imageBlob, guardianData, genre) {
    const shareText = `私の守護者は「${guardianData.name || '???'}」！\n${genre}を占ってもらいました✨\n\n森の守護者とタロット占い`;
    
    if (navigator.share && navigator.canShare) {
        // Web Share API対応の場合
        const file = new File([imageBlob], 'tarot-result.png', { type: 'image/png' });
        
        try {
            await navigator.share({
                title: '占い結果',
                text: shareText,
                files: [file]
            });
        } catch (error) {
            if (error.name !== 'AbortError') {
                // シェアがキャンセルされた以外のエラー
                fallbackShare(imageBlob, shareText);
            }
        }
    } else {
        // フォールバック
        fallbackShare(imageBlob, shareText);
    }
}

/**
 * フォールバック：画像ダウンロード + クリップボード
 */
function fallbackShare(imageBlob, shareText) {
    // 画像をダウンロード
    const url = URL.createObjectURL(imageBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tarot-result.png';
    a.click();
    URL.revokeObjectURL(url);
    
    // テキストをクリップボードにコピー
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('画像をダウンロードしました！\nシェア用テキストをクリップボードにコピーしました。');
        }).catch(() => {
            alert('画像をダウンロードしました！\n以下のテキストをコピーしてシェアしてください：\n\n' + shareText);
        });
    } else {
        alert('画像をダウンロードしました！\n以下のテキストをコピーしてシェアしてください：\n\n' + shareText);
    }
}

/**
 * テキストのみシェア（フォールバック）
 */
function shareTextOnly() {
    const guardianData = JSON.parse(localStorage.getItem('guardianResult') || '{}');
    const shareText = `私の守護者は「${guardianData.name || '???'}」でした！\n\n森の守護者とタロット占いで診断してみてね✨`;
    
    if (navigator.share) {
        navigator.share({
            title: '森の守護者診断結果',
            text: shareText,
        });
    } else {
        // クリップボードにコピー
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('シェア用テキストをクリップボードにコピーしました！');
            });
        } else {
            alert('シェア機能に対応していません');
        }
    }
}



