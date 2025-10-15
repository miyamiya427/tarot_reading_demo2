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
        const currentEmojiElement = document.getElementById('current-guardian-emoji');
        const guardianImage = guardianImages[guardianData.type];

        if (guardianImage) {
            currentEmojiElement.innerHTML = `<img src="${guardianImage}" alt="${guardianData.name}">`;
        } else {
            currentEmojiElement.textContent = guardianData.emoji;
        }
        document.getElementById('current-guardian-name').innerHTML = `
    <div class="furigana" style="font-size: 12px; font-weight: normal;">${guardianData.furigana}</div>
    ${guardianData.name}
`;
        
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
    shareResultWithImage();
}

// モーダル機能
function openModal(type) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    
    let content = '';
    
    if (type === 'news') {
        content = `
            <h2>📢 お知らせ</h2>
            <div class="news-item">
                <div class="news-date">2025年1月15日</div>
                <p>プレミアム版リリース予定！より詳しい鑑定結果をお届けします。</p>
            </div>
            <div class="news-item">
                <div class="news-date">2025年1月10日</div>
                <p>恋愛運（復縁）ジャンルを追加しました。</p>
            </div>
            <div class="news-item">
                <div class="news-date">2025年1月5日</div>
                <p>アプリをリリースしました！</p>
            </div>
        `;
    } else if (type === 'types') {
        content = `
            <h2>🦊 性格タイプ一覧</h2>
            <p style="text-align: center; font-size: 13px; color: #6c757d; margin-bottom: 20px;">
                性格診断を受けると、あなたがどのタイプか分かります！
            </p>
            <div class="type-grid">
                <div class="type-item">
                    <h3>🦊 暁紅の狐 / 宵紅の狐</h3>
                    <p>エネルギッシュな革新者 / 神秘的な賢者</p>
                </div>
                <div class="type-item">
                    <h3>🦅 昇天の鷹 / 翔月の鷹</h3>
                    <p>野心的なリーダー / 哲学的な思索者</p>
                </div>
                <div class="type-item">
                    <h3>🐺 群銀の狼 / 孤月の狼</h3>
                    <p>チームビルダー / 一匹狼の強者</p>
                </div>
                <div class="type-item">
                    <h3>🦌 若翠の鹿 / 深翠の鹿</h3>
                    <p>希望の使者 / 心の癒し手</p>
                </div>
                <div class="type-item">
                    <h3>🐻 守金の熊 / 憩金の熊</h3>
                    <p>頼れる守護者 / 安らぎの提供者</p>
                </div>
                <div class="type-item">
                    <h3>🦋 舞虹の蝶 / 夢虹の蝶</h3>
                    <p>華やかな芸術家 / 幻想的な創造者</p>
                </div>
            </div>
        `;
    } else if (type === 'about') {
        content = `
            <h2>🔮 タロット占いとは</h2>
            <p>
                タロット占いは、78枚のカードから直感で選んだカードの意味を読み解くことで、今のあなたの状況や未来へのアドバイスを得る占術です。
            </p>
            <p>
                <strong>📍 直感が大切</strong><br>
                カードを選ぶ際は、考えすぎず「なんとなく気になる」という直感を信じてください。その直感こそが、あなたの無意識からのメッセージです。
            </p>
            <p>
                <strong>📍 スリーカードスプレッド</strong><br>
                このアプリでは3枚のカードを使います。それぞれ「現状」「展開」「アドバイス」を表し、過去・現在・未来を読み解きます。
            </p>
            <p>
                <strong>📍 AIリーディング</strong><br>
                選ばれたカードを、あなたの性格タイプに合わせてAIが読み解きます。一般的な解釈だけでなく、あなたに最適なメッセージをお届けします。
            </p>
        `;
    }
    
    body.innerHTML = content;
    overlay.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('active');
}
