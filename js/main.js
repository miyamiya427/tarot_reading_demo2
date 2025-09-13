// メイン制御
let currentGenre = '';

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    console.log('森の守護者とタロット占いアプリが読み込まれました');
    checkExistingGuardian();
});

// ページ切り替え
function showPage(pageNumber) {
    // 即座にスクロールリセット
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    console.log('Attempting to show page:', pageNumber);
    
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page${pageNumber}`);
    console.log('Target page element:', targetPage);
    
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page activated successfully');
    } else {
        console.error('Page element not found for page:', pageNumber);
    }
    
    // 追加のスクロールリセット
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
   // 追加の強制スクロール処理
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }, 50);
    
    // さらなる強制処理
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
    
    // ページ2（メニュー）表示時に守護神をチェック
    if (pageNumber === 2) {
        checkExistingGuardian();
    }
    
    // 各ページで必要な質問を読み込み
    if (pageNumber === 3) {
        loadQuestions(diagnosisQuestions, 'questions-container');
    } else if (pageNumber === 9) {
        // ジャンル選択画面の初期化処理
        updateGenreTitle();
        // ページ9専用のスクロール処理
        setTimeout(() => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
        }, 150);
    } else if (pageNumber === 10) {
        // シャッフル画面の初期化
        setTimeout(() => {
            startShuffleAnimation();
        }, 100);
    } else if (pageNumber === 11) {
        // カード選択画面の初期化
        setTimeout(() => {
            initializeCardSelection();
        }, 500);
    }
}

// ジャンル選択画面のタイトル更新
function updateGenreTitle() {
    // 必要に応じて処理を追加
}

// 保存された守護神をチェック
function checkExistingGuardian() {
    const savedResult = localStorage.getItem('guardianResult');
    if (savedResult) {
        const guardianData = JSON.parse(savedResult);
        
        // 守護神表示エリアを表示
        document.getElementById('existing-guardian').style.display = 'block';
        document.getElementById('current-guardian-emoji').textContent = guardianData.emoji;
        document.getElementById('current-guardian-name').textContent = guardianData.name;
        
        // 日付をフォーマット
        const date = new Date(guardianData.timestamp);
        const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日に診断`;
        document.getElementById('current-guardian-date').textContent = dateString;
        
        // ボタンのテキストを変更
        const guardianButton = document.querySelector('button[onclick="showPage(3)"]');
        guardianButton.textContent = '守護神を再診断する';
        
        // 動物絵文字を非表示にする
        const animalIcons = document.querySelector('.animal-icons');
        if (animalIcons) {
            animalIcons.style.display = 'none';
        }
    }
}

// 結果をシェア
function shareResult() {
    const guardianName = document.getElementById('result-name').textContent;
    const guardianEmoji = document.getElementById('result-emoji').textContent;
    const shareText = `私の守護者は「${guardianEmoji} ${guardianName}」でした！\n\n森の守護者とタロット占いで診断してみてね✨`;
    
    if (navigator.share) {
        navigator.share({
            title: '森の守護者診断結果',
            text: shareText,
        });
    } else {
        // フォールバック：クリップボードにコピー
        navigator.clipboard.writeText(shareText).then(() => {
            alert('結果をクリップボードにコピーしました！');
        }).catch(() => {
            alert('シェア機能に対応していません');
        });
    }
}