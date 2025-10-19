// 占い結果シェア機能

/**
 * 占い結果の画像を生成してシェアする
 */
async function shareResultWithImage() {
    try {
        // 現在の占い結果データを取得
        const guardianData = JSON.parse(localStorage.getItem('guardianResult') || '{}');
        
        // 現在表示されているページを判定
        const page8 = document.getElementById('page8');
        const page12 = document.getElementById('page12');
        
        let genreTitle = '';
        let resultText = '';
        
        // ページ8（性格診断結果）が表示されている場合
        if (page8 && page8.classList.contains('active')) {
            genreTitle = '';  // 性格診断なのでgenreは空
            resultText = '';
        }
        // ページ12（占い結果）が表示されている場合
        else if (page12 && page12.classList.contains('active')) {
            genreTitle = document.getElementById('result-title')?.textContent || '';
            resultText = document.getElementById('personalized-fortune')?.innerHTML || '';
        }
        
        console.log('現在のページ:', page8?.classList.contains('active') ? 'ページ8（性格診断）' : 'ページ12（占い結果）');
        console.log('genreTitle:', genreTitle);
        
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
    
    // デバッグ用：genreの値を確認
    console.log('genre の値:', genre);
    console.log('genre のタイプ:', typeof genre);
    console.log('genre が空か:', !genre || genre === '');
    
    // キャンバスサイズ設定（X向け横長・高解像度）
    canvas.width = 1600;
    canvas.height = 800;
    
    // 背景を描画
    drawBackground(ctx, canvas.width, canvas.height);
    
    // genreが空なら性格診断用、あれば占い結果用
    if (!genre || genre === '' || genre.trim() === '') {
        // 性格診断結果用のデザイン
        await drawGuardianDiagnosisImage(ctx, canvas.width, canvas.height, guardianData);
    } else {
        // 占い結果用のデザイン
        await drawGuardianSection(ctx, guardianData);
        drawTextSection(ctx, guardianData, genre, resultText);
    }
    
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
    const sectionWidth = 500;  // 250 → 500
    const sectionHeight = 800;  // 400 → 800
    
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
    ctx.font = 'bold 36px sans-serif';  // 18 → 36
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(`守護者：${guardianData.name}`, sectionWidth / 2, centerY + 160);  // 80 → 160
    
    // ふりがな
    if (guardianData.furigana) {
        ctx.font = '24px sans-serif';  // 12 → 24
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText(`(${guardianData.furigana})`, sectionWidth / 2, centerY + 200);  // 100 → 200
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
            ctx.arc(sectionWidth / 2, centerY, 160, 0, 2 * Math.PI);  // 80 → 160
            ctx.clip();

            // 画像を描画
            ctx.drawImage(img, sectionWidth / 2 - 160, centerY - 160, 320, 320);  // すべて2倍
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
    ctx.font = '200px serif';  // 100 → 200
ctx.textAlign = 'center';
ctx.fillStyle = 'white';
ctx.fillText(guardianData.emoji || '🌟', sectionWidth / 2, centerY);
}

/**
 * テキストセクションを描画（右側）
 */
function drawTextSection(ctx, guardianData, genre, resultText) {
    const startX = 540;  // 270 → 540
    const maxWidth = 1020;  // 510 → 1020
    let currentY = 120;  // 60 → 120
    
    // ジャンルタイトル
ctx.font = 'bold 48px sans-serif';  // 24 → 48
ctx.textAlign = 'left';
// 背景を描画
const titleWidth = ctx.measureText(`${genre}を占ったよ！`).width + 60;  // 30 → 60
ctx.fillStyle = '#dacc89';
ctx.fillRect(startX - 30, currentY - 48, titleWidth, 72);  // すべて2倍
// テキストを描画
ctx.fillStyle = 'white';
ctx.fillText(`${genre}を占ったよ！`, startX, currentY);
currentY += 80;  // 40 → 80
    
    // 占い結果を取得
    const result = getShareResult();
    
    // 「運勢と展開」セクション
ctx.font = 'bold 28px sans-serif';  // 14 → 28
ctx.fillStyle = 'white';
ctx.fillText('＜運勢と展開＞', startX, currentY);
currentY += 50;  // 25 → 50

ctx.font = '26px sans-serif';  // 13 → 26
ctx.fillStyle = 'white';
const fortuneLines = wrapText(ctx, result.fortuneAndDevelopment, maxWidth);
const maxFortuneLines = 6; // 最大6行
for (let i = 0; i < Math.min(fortuneLines.length, maxFortuneLines); i++) {
    ctx.fillText(fortuneLines[i], startX, currentY);
    currentY += 40;  // 20 → 40
}

currentY += 20;  // 10 → 20

// 「アドバイス」セクション
ctx.font = 'bold 28px sans-serif';  // 14 → 28
ctx.fillStyle = 'white';
ctx.fillText('＜アドバイス＞', startX, currentY);
currentY += 50;  // 25 → 50

ctx.font = '26px sans-serif';  // 13 → 26
ctx.fillStyle = 'white';
const adviceLines = wrapText(ctx, result.advice, maxWidth);
const maxAdviceLines = 4; // 最大4行
for (let i = 0; i < Math.min(adviceLines.length, maxAdviceLines); i++) {
    ctx.fillText(adviceLines[i], startX, currentY);
    currentY += 40;  // 20 → 40
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
                // HTMLタグを除去し、「もっと詳しい～」以降も削除
                fortuneAndDevelopment = content
                    .replace(/<[^>]*>/g, '')
                    .replace(/もっと詳しい.*$/s, '')
                    .replace(/プレミアム版.*$/s, '')
                    .trim();
            }
        } else if (section.includes('アドバイス')) {
            const content = section.split('</h4>')[1];
            if (content) {
                // HTMLタグを除去し、「もっと詳しい～」以降も削除
                advice = content
                    .replace(/<[^>]*>/g, '')
                    .replace(/もっと詳しい.*$/s, '')
                    .replace(/プレミアム版.*$/s, '')
                    .trim();
            }
        }
    }
    
    return {
        fortuneAndDevelopment: fortuneAndDevelopment || '占い結果をご確認ください',
        advice: advice || 'アプリでご確認ください'
    };
}

/**
 * 性格診断結果用の画像を描画
 */
async function drawGuardianDiagnosisImage(ctx, width, height, guardianData) {
    const centerX = width / 2;
    
    // 左側：守護者画像
    const leftSectionWidth = 500;
    const centerY = height / 2;
    
    // 守護者エリア背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, leftSectionWidth, height);
    
    // 守護者画像または絵文字を描画
    if (guardianData.type && typeof guardianImages !== 'undefined' && guardianImages[guardianData.type]) {
        try {
            await drawGuardianImage(ctx, guardianImages[guardianData.type], leftSectionWidth, centerY - 60);
        } catch (error) {
            drawGuardianEmoji(ctx, guardianData, leftSectionWidth, centerY - 30);
        }
    } else {
        drawGuardianEmoji(ctx, guardianData, leftSectionWidth, centerY - 30);
    }
    
    // 守護者名（画像の下）
    if (guardianData.name) {
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(`守護者：${guardianData.name}`, leftSectionWidth / 2, centerY + 160);
        
        if (guardianData.furigana) {
            ctx.font = '24px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillText(`(${guardianData.furigana})`, leftSectionWidth / 2, centerY + 200);
        }
    }
    
    // 右側：テキスト情報
    const startX = 540;
    const maxWidth = 1020;
    let currentY = 100;
    
    // タイトル
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'left';
    const titleText = `${guardianData.name}だったよ！`;
    const titleWidth = ctx.measureText(titleText).width + 60;
    ctx.fillStyle = '#dacc89';
    ctx.fillRect(startX - 30, currentY - 48, titleWidth, 72);
    ctx.fillStyle = 'white';
    ctx.fillText(titleText, startX, currentY);
    currentY += 100;
    
    // キャッチフレーズ
    ctx.font = 'bold 32px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText(`《 ${guardianData.catchphrase} 》`, startX, currentY);
    currentY += 70;
    
    // 特徴（箇条書き）
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('＜このタイプの特徴＞', startX, currentY);
    currentY += 50;
    
    ctx.font = '26px sans-serif';
    const traits = guardianData.traits || [];
    traits.forEach((trait, index) => {
        ctx.fillText(`・${trait}`, startX, currentY);
        currentY += 45;
    });
    
    currentY += 30;
    
    // 説明文（一部のみ）
    const description = guardianData.description || '';
    const shortDesc = description.substring(0, 100) + '...';
    const descLines = wrapText(ctx, shortDesc, maxWidth);
    descLines.slice(0, 3).forEach(line => {
        ctx.fillText(line, startX, currentY);
        currentY += 40;
    });
    
    currentY += 40;
    
    // URL案内
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('もっと詳しく見たい人はコチラ▼', startX, currentY);
    currentY += 50;
    
    ctx.font = '24px sans-serif';
    ctx.fillStyle = '#dacc89';
    ctx.fillText('https://miyamiya427.github.io/tarot_reading_demo2/', startX, currentY);
}

/**
 * ロゴ・クレジットを描画
 */
function drawLogo(ctx, width, height) {
    ctx.font = '28px sans-serif';  // 14 → 28
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillText('森の守護者とタロット占い', width - 40, height - 40);  // 20 → 40
}

/**
 * 生成した画像をシェア
 */
async function shareImage(imageBlob, guardianData, genre) {
    // 性格診断か占い結果かでテキストを変える
    let shareText;
    if (!genre || genre === '') {
        // 性格診断の場合
        shareText = `「森の守護者とタロット占い」で性格診断してみたよ！
私は＜${guardianData.name}＞だったよ！
あなたも診断してみてね✨

#森の守護者とタロット占い #森の守護者診断 #${guardianData.name || '???'} #性格診断 #タロット占い`;
    } else {
        // 占い結果の場合
        shareText = `「森の守護者とタロット占い」で＜${genre}＞を占ってみたよ！
性格タイプ診断もできるからみんなもやってみて！

#森の守護者とタロット占い #森の守護者診断 #${guardianData.name || '???'} #${genre} #タロット占い`;
    }
    
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
    const genreTitle = document.getElementById('result-title')?.textContent || '今日の運勢';
    const shareText = `「森の守護者とタロット占い」で＜${genreTitle}＞を占ってみたよ！
性格タイプ診断もできるからみんなもやってみて！

#森の守護者とタロット占い #森の守護者診断 #${guardianData.name || '???'} #${genreTitle} #タロット占い`;

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



