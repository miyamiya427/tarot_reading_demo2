// 性格診断機能

// 詳細診断の回答を保存する変数
let detailedAnswers = {};

// 質問を読み込み
function loadQuestions(questions, containerId) {
    // データが空の場合は待機
    if (!questions || questions.length === 0) {
        setTimeout(() => loadQuestions(questions, containerId), 1000);
        return;
    }
    
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        // 詳細診断の場合は質問番号を調整
        let questionNumber = index + 1;
        if (containerId === 'questions-container-detailed1') {
            questionNumber = index + 11; // 11-20問目
        } else if (containerId === 'questions-container-detailed2') {
            questionNumber = index + 21; // 21-30問目
        } else if (containerId === 'questions-container-detailed3') {
            questionNumber = index + 31; // 31-40問目
        } else if (containerId === 'questions-container-detailed4') {
            questionNumber = index + 41; // 41-50問目
        }
        
        questionDiv.innerHTML = `
<div class="question-text">${questionNumber}. ${q.text}</div>
<div class="answer-options">
    <label class="option-label" onclick="selectOption(this, '${containerId}_${index}', 'A', '${q.options.A.scores.join(",")}')">
        <input type="radio" name="${containerId}_q${index}" value="A" data-score="${q.options.A.scores.join(",")}">
        ${q.options.A.text}
    </label>
    <label class="option-label" onclick="selectOption(this, '${containerId}_${index}', 'B', '${q.options.B.scores.join(",")}')">
        <input type="radio" name="${containerId}_q${index}" value="B" data-score="${q.options.B.scores.join(",")}">
        ${q.options.B.text}
    </label>
    <label class="option-label" onclick="selectOption(this, '${containerId}_${index}', 'C', '${q.options.C.scores.join(",")}')">
        <input type="radio" name="${containerId}_q${index}" value="C" data-score="${q.options.C.scores.join(",")}">
        ${q.options.C.text}
    </label>
</div>
`;
        container.appendChild(questionDiv);
    });
}

// 選択肢の選択処理
function selectOption(label, questionId, option, score) {
    // 同じ質問の他の選択肢から selected クラスを削除
    const questionDiv = label.closest('.question-item');
    const allOptions = questionDiv.querySelectorAll('.option-label');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // 選択された選択肢に selected クラスを追加
    label.classList.add('selected');
    
    // ラジオボタンを選択状態にする
    const radio = label.querySelector('input[type="radio"]');
    radio.checked = true;
    
    // 詳細診断の場合は回答を保存
    if (questionId.includes('detailed')) {
        detailedAnswers[questionId] = {
            option: option,
            score: score
        };
    }
}

// 診断完了
function completeDiagnosis() {
    // 回答を収集
    const answers = {};
    const basicForm = document.getElementById('questions-container');
    const basicRadios = basicForm.querySelectorAll('input[type="radio"]:checked');
    
    if (basicRadios.length < 60) {
    alert('全ての質問にお答えください。');
    return;
}
    
    // 回答をanswersオブジェクトに格納
    basicRadios.forEach((radio, index) => {
        answers[index + 1] = radio.value; // A, B, C
    });
    
    try {
        // 新しい判定ロジックを使用
        const result = diagnose12Types(answers);
        const displayData = formatDiagnosisResult(result);
        saveDiagnosisResult(result);
        
        // デバッグ用ログ出力
        console.log('=== 診断結果詳細 ===');
        console.log('各タイプのスコア:', result.scores);
        console.log('最終タイプ:', result.type);
        console.log('スコア差:', result.scoreDifference);
        console.log('夜タイプ判定:', result.isEveningType);
        console.log('デバッグ情報:', result.debugInfo);
        console.log('====================');
        
        // 結果を表示
        showResult(displayData);
        
    } catch (error) {
        console.error('診断エラー:', error);
        alert('診断処理でエラーが発生しました。');
    }
}

// 結果を表示
function showResult(displayData) {
    // 診断結果は既にsaveDiagnosisResult()で保存済み
    
    const resultEmojiElement = document.getElementById('result-emoji');
    const guardianImage = guardianImages[displayData.type];

    if (guardianImage) {
        resultEmojiElement.innerHTML = `<img src="${guardianImage}" alt="${displayData.name}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">`;
    } else {
        resultEmojiElement.textContent = displayData.emoji;
    }
    
    document.getElementById('result-name').innerHTML = `
    <div class="furigana">${displayData.furigana}</div>
    ${displayData.name}
`;
    document.getElementById('result-traits').textContent = displayData.traits.join('・');
    document.getElementById('result-description').textContent = displayData.description;
    document.getElementById('result-interpretation').textContent = displayData.advice;
    
    // 診断結果データを送信
    sendDiagnosisDataToSheet(displayData);
    
    showPage(8); // 結果ページを表示
}

// 診断結果をスプレッドシートに送信
async function sendDiagnosisDataToSheet(displayData) {
    try {
        // スコア情報を取得（実装されている場合）
        const scores = {
            rubyFoxScore: 0,
            sapphireHawkScore: 0,
            silverWolfScore: 0,
            emeraldDeerScore: 0,
            goldBearScore: 0,
            rainbowButterflyScore: 0
        };
        
        // 送信データを作成
        const data = {
            dataType: 'diagnosis',
            guardianType: displayData.type || 'unknown',
            guardianName: displayData.name || 'unknown',
            rubyFoxScore: scores.rubyFoxScore,
            sapphireHawkScore: scores.sapphireHawkScore,
            silverWolfScore: scores.silverWolfScore,
            emeraldDeerScore: scores.emeraldDeerScore,
            goldBearScore: scores.goldBearScore,
            rainbowButterflyScore: scores.rainbowButterflyScore,
            userAgent: navigator.userAgent,
            memo: ''
        };
        
        // Google Apps Scriptに送信
        const response = await fetch('https://script.google.com/macros/s/AKfycbxTTfzDOm_-QB4MvFJN1BfPf-RR9Fasq8mZl7SKwIs2jPQ--sJmQsp9AWTshrRfDeQAuQ/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        console.log('診断データ送信完了:', data);
    } catch (error) {
        console.log('診断データ送信エラー:', error);
    }

}
