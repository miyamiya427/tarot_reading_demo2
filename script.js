
        // 詳細診断の回答を保存する変数
        let detailedAnswers = {};

        // 性格診断データ（10問）
        const basicQuestions = [
            {
                question: "新しい環境に入った時、あなたは？",
                optionA: "積極的に行動して変化を楽しむ",
                scoreA: "ruby_fox",
                optionB: "全体の様子を観察してから動く",
                scoreB: "sapphire_hawk"
            },
            {
                question: "友人との関係で大切にするのは？",
                optionA: "深いつながりと信頼関係",
                scoreA: "silver_wolf",
                optionB: "お互いの成長を支え合うこと",
                scoreB: "emerald_deer"
            },
            {
                question: "困った時、どう対処する？",
                optionA: "安全で確実な方法を選ぶ",
                scoreA: "gold_bear",
                optionB: "創造的で新しい解決策を探す",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "理想の休日は？",
                optionA: "直感で決めた場所へ冒険",
                scoreA: "ruby_fox",
                optionB: "高い場所から景色を眺める",
                scoreB: "sapphire_hawk"
            },
            {
                question: "チームワークにおいて？",
                optionA: "みんなの結束を大切にする",
                scoreA: "silver_wolf",
                optionB: "個々の個性を活かそうとする",
                scoreB: "emerald_deer"
            },
            {
                question: "大きな決断をする時は？",
                optionA: "慎重に計画を立ててから",
                scoreA: "gold_bear",
                optionB: "心が動く方向を信じる",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "あなたの強みは？",
                optionA: "素早い判断と適応力",
                scoreA: "ruby_fox",
                optionB: "物事を俯瞰して見る力",
                scoreB: "sapphire_hawk"
            },
            {
                question: "人間関係で重視するのは？",
                optionA: "仲間との深い絆",
                scoreA: "silver_wolf",
                optionB: "相手の気持ちに寄り添うこと",
                scoreB: "emerald_deer"
            },
            {
                question: "ストレス解消法は？",
                optionA: "安心できる場所でゆっくり",
                scoreA: "gold_bear",
                optionB: "新しい体験や美しいものに触れる",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "人生で大切にしたいのは？",
                optionA: "変化と成長のある人生",
                scoreA: "ruby_fox",
                optionB: "安定と調和のある人生",
                scoreB: "gold_bear"
            }
        ];

        // 詳細診断データ（30問を3つの10問ずつに分割）
        const detailedQuestions1 = [
            {
                question: "朝起きた時の気分は？",
                optionA: "今日は何が起こるか楽しみ",
                scoreA: "ruby_fox",
                optionB: "今日の計画を整理したい",
                scoreB: "sapphire_hawk"
            },
            {
                question: "初対面の人との会話では？",
                optionA: "相手のことを深く知りたい",
                scoreA: "silver_wolf",
                optionB: "相手が話しやすい雰囲気を作る",
                scoreB: "emerald_deer"
            },
            {
                question: "買い物をする時は？",
                optionA: "必要なものを確実に購入",
                scoreA: "gold_bear",
                optionB: "直感で気に入ったものを選ぶ",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "旅行の計画は？",
                optionA: "行き当たりばったりで楽しむ",
                scoreA: "ruby_fox",
                optionB: "事前にしっかりリサーチ",
                scoreB: "sapphire_hawk"
            },
            {
                question: "友人が悩んでいる時は？",
                optionA: "一緒に解決策を考える",
                scoreA: "silver_wolf",
                optionB: "まずは話を聞いて共感する",
                scoreB: "emerald_deer"
            },
            {
                question: "お金の使い方は？",
                optionA: "将来のために堅実に貯蓄",
                scoreA: "gold_bear",
                optionB: "心を豊かにするものに投資",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "映画を選ぶなら？",
                optionA: "スリルのあるアクション",
                scoreA: "ruby_fox",
                optionB: "壮大なスケールの作品",
                scoreB: "sapphire_hawk"
            },
            {
                question: "グループ活動では？",
                optionA: "チーム全体のことを考える",
                scoreA: "silver_wolf",
                optionB: "一人一人に気を配る",
                scoreB: "emerald_deer"
            },
            {
                question: "部屋の雰囲気は？",
                optionA: "機能的で整理整頓された空間",
                scoreA: "gold_bear",
                optionB: "美しく個性的な空間",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "目標に向かう時は？",
                optionA: "柔軟に方向転換しながら",
                scoreA: "ruby_fox",
                optionB: "長期的視点で着実に進む",
                scoreB: "sapphire_hawk"
            }
        ];

        const detailedQuestions2 = [
            {
                question: "理想のデートは？",
                optionA: "予想のつかないサプライズ",
                scoreA: "ruby_fox",
                optionB: "二人で過ごせる特別な場所",
                scoreB: "sapphire_hawk"
            },
            {
                question: "パートナーに求めるのは？",
                optionA: "深い信頼関係",
                scoreA: "silver_wolf",
                optionB: "互いの成長を支え合える関係",
                scoreB: "emerald_deer"
            },
            {
                question: "恋愛での悩みは？",
                optionA: "相手に依存しすぎてしまう",
                scoreA: "gold_bear",
                optionB: "自由でいたい気持ちとのバランス",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "好きになるタイプは？",
                optionA: "一緒にいて刺激的な人",
                scoreA: "ruby_fox",
                optionB: "尊敬できる高い理想を持つ人",
                scoreB: "sapphire_hawk"
            },
            {
                question: "関係が深まる瞬間は？",
                optionA: "困った時に支え合った時",
                scoreA: "silver_wolf",
                optionB: "相手の優しさに触れた時",
                scoreB: "emerald_deer"
            },
            {
                question: "将来への不安は？",
                optionA: "安定した関係を築けるか",
                scoreA: "gold_bear",
                optionB: "お互いの個性を保てるか",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "喧嘩した時は？",
                optionA: "すぐに話し合いたい",
                scoreA: "ruby_fox",
                optionB: "冷静になってから向き合う",
                scoreB: "sapphire_hawk"
            },
            {
                question: "大切な記念日は？",
                optionA: "二人だけの時間を重視",
                scoreA: "silver_wolf",
                optionB: "心温まる思い出作り",
                scoreB: "emerald_deer"
            },
            {
                question: "相手の浮気を知ったら？",
                optionA: "関係の見直しを真剣に考える",
                scoreA: "gold_bear",
                optionB: "まずは自分の気持ちを整理",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "恋愛で成長するのは？",
                optionA: "新しい自分を発見した時",
                scoreA: "ruby_fox",
                optionB: "より大きな愛を感じた時",
                scoreB: "sapphire_hawk"
            }
        ];

        const detailedQuestions3 = [
            {
                question: "理想の職場環境は？",
                optionA: "変化に富んだ刺激的な環境",
                scoreA: "ruby_fox",
                optionB: "高い目標に向かえる環境",
                scoreB: "sapphire_hawk"
            },
            {
                question: "チームでの役割は？",
                optionA: "メンバーをまとめる調整役",
                scoreA: "silver_wolf",
                optionB: "皆をサポートする縁の下の力持ち",
                scoreB: "emerald_deer"
            },
            {
                question: "仕事のストレスは？",
                optionA: "安定性への不安",
                scoreA: "gold_bear",
                optionB: "創造性が発揮できない時",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "新しいプロジェクトでは？",
                optionA: "積極的にアイデアを提案",
                scoreA: "ruby_fox",
                optionB: "全体像を把握してから参加",
                scoreB: "sapphire_hawk"
            },
            {
                question: "同僚との関係は？",
                optionA: "深い友情を築きたい",
                scoreA: "silver_wolf",
                optionB: "互いを尊重し合う関係",
                scoreB: "emerald_deer"
            },
            {
                question: "キャリアの考え方は？",
                optionA: "着実にステップアップ",
                scoreA: "gold_bear",
                optionB: "自分らしさを大切に",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "会議での発言は？",
                optionA: "思いついたらすぐに発言",
                scoreA: "ruby_fox",
                optionB: "全体を考えた建設的な意見",
                scoreB: "sapphire_hawk"
            },
            {
                question: "職場の人間関係で大切なのは？",
                optionA: "お互いの信頼関係",
                scoreA: "silver_wolf",
                optionB: "相手への思いやり",
                scoreB: "emerald_deer"
            },
            {
                question: "働く上でのモチベーションは？",
                optionA: "安心して働ける環境",
                scoreA: "gold_bear",
                optionB: "自己表現できる喜び",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "将来の目標は？",
                optionA: "常に新しいことに挑戦し続ける",
                scoreA: "ruby_fox",
                optionB: "多くの人に信頼される存在になる",
                scoreB: "sapphire_hawk"
            }
        ];

        const detailedQuestions4 = [
            {
                question: "人生の目標は？",
                optionA: "常に新しいことに挑戦し続ける",
                scoreA: "ruby_fox",
                optionB: "多くの人に信頼される存在になる",
                scoreB: "sapphire_hawk"
            },
            {
                question: "困難に直面した時は？",
                optionA: "仲間と協力して乗り越える",
                scoreA: "silver_wolf",
                optionB: "自分なりのペースで解決する",
                scoreB: "emerald_deer"
            },
            {
                question: "成功の定義は？",
                optionA: "安定した基盤を築くこと",
                scoreA: "gold_bear",
                optionB: "自由に自分を表現できること",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "10年後の自分は？",
                optionA: "予想もつかない場所にいる",
                scoreA: "ruby_fox",
                optionB: "理想に向かって着実に進歩している",
                scoreB: "sapphire_hawk"
            },
            {
                question: "大切な人を失った時は？",
                optionA: "みんなで支え合って乗り越える",
                scoreA: "silver_wolf",
                optionB: "時間をかけて心を癒す",
                scoreB: "emerald_deer"
            },
            {
                question: "老後の過ごし方は？",
                optionA: "安心できる環境でゆっくり",
                scoreA: "gold_bear",
                optionB: "新しい趣味や創作活動",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "人生で学びたいことは？",
                optionA: "様々な経験から得る知恵",
                scoreA: "ruby_fox",
                optionB: "深い専門知識や哲学",
                scoreB: "sapphire_hawk"
            },
            {
                question: "社会に貢献するなら？",
                optionA: "チームワークで課題解決",
                scoreA: "silver_wolf",
                optionB: "個々のニーズに寄り添う支援",
                scoreB: "emerald_deer"
            },
            {
                question: "理想の世界は？",
                optionA: "変化を受け入れる柔軟な社会",
                scoreA: "ruby_fox",
                optionB: "美しさと調和に満ちた世界",
                scoreB: "rainbow_butterfly"
            },
            {
                question: "最後に大切にしたいのは？",
                optionA: "信頼できる仲間との絆",
                scoreA: "silver_wolf",
                optionB: "自分らしく生きた証",
                scoreB: "emerald_deer"
            }
        ];

        // 守護者タイプ情報
        const guardianTypes = {
            ruby_fox: { 
                name: "紅玉の狐", 
                emoji: "🦊", 
                traits: ["直感", "変化", "機敏さ"],
                description: "変化を恐れず直感で進む自由な魂",
                interpretation: "カードの示す変化を前向きに受け入れ、直感を信じて行動することで道が開けるでしょう。新しい挑戦を恐れず、自分の感覚を信じて進んでください。"
            },
            sapphire_hawk: { 
                name: "蒼天の鷹", 
                emoji: "🦅", 
                traits: ["理想", "俯瞰", "高い目標"],
                description: "全体を見渡し高い理想を追求する賢者",
                interpretation: "物事を俯瞰的に捉え、高い理想に向かって着実に歩むことで成功を掴めるでしょう。大きな視点を持ち、長期的な目標に向かって進んでください。"
            },
            silver_wolf: { 
                name: "銀月の狼", 
                emoji: "🐺", 
                traits: ["絆", "協調", "忠誠心"],
                description: "人とのつながりを大切にする仲間思い",
                interpretation: "人間関係や協力関係を重視し、信頼できる仲間と共に困難を乗り越えることができるでしょう。チームワークを大切にし、絆を深めてください。"
            },
            emerald_deer: { 
                name: "翠林の鹿", 
                emoji: "🦌", 
                traits: ["癒し", "成長", "穏やかさ"],
                description: "自然体で着実な成長を重視する優しい魂",
                interpretation: "焦らず自分のペースで成長し、周囲に癒しと安らぎをもたらす存在となるでしょう。自然体でいることで、真の力を発揮できます。"
            },
            gold_bear: { 
                name: "金剛の熊", 
                emoji: "🐻", 
                traits: ["安定", "保護", "堅実さ"],
                description: "安定と安全を基盤に行動する守護者",
                interpretation: "慎重で堅実なアプローチを取り、安定した基盤を築くことで長期的な成功を得られるでしょう。着実な歩みを続けることが大切です。"
            },
            rainbow_butterfly: { 
                name: "虹彩の蝶", 
                emoji: "🦋", 
                traits: ["変容", "美", "自由"],
                description: "美しい変化と自由を愛する芸術的な魂",
                interpretation: "創造性と美的感覚を活かし、自由な発想で新たな可能性を見出すことができるでしょう。変化を楽しみ、美しさを追求してください。"
            }
        };

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
        loadQuestions(basicQuestions, 'questions-container');
    } else if (pageNumber === 4) {
        loadQuestions(detailedQuestions1, 'questions-container-detailed1');
    } else if (pageNumber === 5) {
                loadQuestions(detailedQuestions2, 'questions-container-detailed2');
            } else if (pageNumber === 6) {
                loadQuestions(detailedQuestions3, 'questions-container-detailed3');
           } else if (pageNumber === 7) {
                loadQuestions(detailedQuestions4, 'questions-container-detailed4');
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

        // 質問を読み込み
        function loadQuestions(questions, containerId) {
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
                    <div class="question-text">${questionNumber}. ${q.question}</div>
                    <div class="answer-options">
                        <label class="option-label" onclick="selectOption(this, '${containerId}_${index}', 'A', '${q.scoreA}')">
                            <input type="radio" name="${containerId}_q${index}" value="A" data-score="${q.scoreA}">
                            ${q.optionA}
                        </label>
                        <label class="option-label" onclick="selectOption(this, '${containerId}_${index}', 'B', '${q.scoreB}')">
                            <input type="radio" name="${containerId}_q${index}" value="B" data-score="${q.scoreB}">
                            ${q.optionB}
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
        function completeDiagnosis(isDetailed) {
            const scores = {};
            
            // 基本診断の10問のスコア
            const basicForm = document.getElementById('questions-container');
            const basicRadios = basicForm.querySelectorAll('input[type="radio"]:checked');
            
            if (basicRadios.length < 10) {
                alert('基本診断の全ての質問にお答えください。');
                return;
            }
            
            basicRadios.forEach(radio => {
                const score = radio.dataset.score;
                scores[score] = (scores[score] || 0) + 1;
            });
            
            if (isDetailed) {
                // 詳細診断の回答をスコアに追加
                const detailedCount = Object.keys(detailedAnswers).length;
                if (detailedCount < 40) { // 詳細診断は40問
                    alert('詳細診断の全ての質問にお答えください。');
                    return;
                }
                
                Object.values(detailedAnswers).forEach(answer => {
                    const score = answer.score;
                    scores[score] = (scores[score] || 0) + 1;
                });
            }
            
            // 最高スコアの守護者を決定
            const maxScore = Math.max(...Object.values(scores));
            const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
            const guardian = guardianTypes[resultType];
            
            // 結果画面に表示
            showResult(guardian);
        }

        // 結果を表示
        function showResult(guardian) {
            // 診断結果をlocalStorageに保存
            const guardianData = {
                name: guardian.name,
                emoji: guardian.emoji,
                traits: guardian.traits,
                description: guardian.description,
                interpretation: guardian.interpretation,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('guardianResult', JSON.stringify(guardianData));
            
            document.getElementById('result-emoji').textContent = guardian.emoji;
            document.getElementById('result-name').textContent = guardian.name;
            document.getElementById('result-traits').textContent = guardian.traits.join('・');
            document.getElementById('result-description').textContent = guardian.description;
            document.getElementById('result-interpretation').textContent = guardian.interpretation;
            
            showPage(8); // 結果ページを表示
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

        // タロット占い関数群
        function generateTarotSeed() {
            let combinedSeed = 
                shuffleDuration +           
                coordinateSeed +           
                totalHesitationTime +      
                (Date.now() % 10000);      
            
            return combinedSeed;
        }

        function selectRandomCards(seed) {
            let random1 = (seed * 9301 + 49297) % 233280;
            let random2 = (random1 * 9301 + 49297) % 233280;
            let random3 = (random2 * 9301 + 49297) % 233280;
            
            let card1 = random1 % 22; // 大アルカナ22枚から選択
            let card2 = random2 % 22;
            let card3 = random3 % 22;
            
            // 同じカードを避ける処理
            while (card2 === card1) {
                random2 = (random2 * 9301 + 49297) % 233280;
                card2 = random2 % 22;
            }
            while (card3 === card1 || card3 === card2) {
                random3 = (random3 * 9301 + 49297) % 233280;
                card3 = random3 % 22;
            }
            
            return [card1, card2, card3];
        }

       function startTarotReading(genre) {
    currentGenre = genre;
    selectedTarotCards = [];
    shuffleStartTime = Date.now();
    coordinateSeed = 0;
    totalHesitationTime = 0;
    
    showPage(10);
}

       function stopShuffle() {
    // シャッフル停止時間を記録
    shuffleDuration = Date.now() - shuffleStartTime;
    
    // カード選択画面に移行
    showPage(11);
}

// カード選択関連の変数
let shuffledCardOrder = []; // シャッフルされたカードの順番
        let currentCardStep = 1; // 1:今日の状況, 2:今日の展開, 3:アドバイス
        let selectedCardIds = []; // 選択されたカードのID

        // カード選択の状態を管理する変数
let selectedCardForCurrentStep = null;

function selectCard(cardIndex) {
    // 選択されたカードを記録
    selectedCardForCurrentStep = cardIndex;
    
    // 全カードの選択状態をリセット
    document.querySelectorAll('.tarot-card').forEach(card => {
        card.style.borderColor = 'transparent';
        card.style.transform = 'scale(1)';
    });
    
    // 選択されたカードを強調表示
    const selectedCardElement = document.querySelector(`[data-card-index="${cardIndex}"]`);
    if (selectedCardElement) {
        selectedCardElement.style.borderColor = '#B0E0E6';
        selectedCardElement.style.borderWidth = '3px';
        selectedCardElement.style.transform = 'scale(1.1)';
        selectedCardElement.style.zIndex = '20';
    }
    
    // ボタンが存在する場合のみ処理
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.style.opacity = '1';
        nextButton.style.pointerEvents = 'auto';
    }
}

function confirmCardSelection() {
    if (selectedCardForCurrentStep === null) return;
    
    // 選択時間を記録
    const selectionTime = Date.now() - cardSelectionStartTime;
    totalHesitationTime += selectionTime;
    
    // カードIDを保存
    selectedCardIds.push(selectedCardForCurrentStep);
    
    // 選択状態をリセット
    selectedCardForCurrentStep = null;
    
    if (currentCardStep < 3) {
        // 次のカードへ
        currentCardStep++;
        cardSelectionStartTime = Date.now();
        updateCardSelectionTitle();
        displayCards();
    } else {
        // 3枚選択完了 → 結果画面へ
        showTarotResult();
    }
}

function shuffleCards() {
    // 78枚のカードをシャッフル
    shuffledCardOrder = [];
    for (let i = 0; i < 78; i++) {
        shuffledCardOrder.push(i);
    }
    
    // Fisher-Yatesアルゴリズムでシャッフル
    for (let i = shuffledCardOrder.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCardOrder[i], shuffledCardOrder[j]] = [shuffledCardOrder[j], shuffledCardOrder[i]];
    }
}

function initializeCardSelection() {
    currentCardStep = 1;
    selectedCardIds = [];
    cardSelectionStartTime = Date.now();
    
    // カードをシャッフル
    shuffleCards();
    
    // カードタイトルを更新
    updateCardSelectionTitle();
    
    // カードを表示
    displayCards();
}

function updateCardSelectionTitle() {
    const titles = [
        "１．＜今日の状況＞を占います。<br>直感でカードを一枚選んでください。",
        "２．＜今日の展開＞を占います。<br>直感でカードを一枚選んでください。", 
        "３．＜今日のアドバイス＞を占います。<br>直感でカードを一枚選んでください。"
    ];
    
    document.getElementById('card-selection-title').innerHTML = titles[currentCardStep - 1];
}

function displayCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    // テキスト要素は削除
    
    // 3. カードグリッドコンテナ（縦2列の横スクロール）
    const cardsGrid = document.createElement('div');
    cardsGrid.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 200px;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 25px 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    margin: 110px auto 20px auto;
    justify-content: center;
    max-width: 100%;
    box-sizing: border-box;
`;
    
    // 上列のカードコンテナ
    const topRow = document.createElement('div');
    topRow.style.cssText = `
        display: flex;
        gap: 12px;
        flex: 1;
        justify-content: flex-start;
        min-width: 2340px;
    `;
    
    // 下列のカードコンテナ  
    const bottomRow = document.createElement('div');
    bottomRow.style.cssText = `
        display: flex;
        gap: 12px;
        flex: 1;
        justify-content: flex-start;
        min-width: 2340px;
    `;
    
    // シャッフルされた78枚のカードを上下2列に配置
    shuffledCardOrder.forEach((cardIndex, i) => {
        const card = document.createElement('div');
        card.className = 'tarot-card';
        card.style.cssText = `
            width: 55px;
            height: 70px;
            background: linear-gradient(135deg, #4a6fa5, #6a8fc5);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 22px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            flex-shrink: 0;
            min-width: 55px;
        `;
        card.textContent = '🂠';
        card.setAttribute('data-card-index', cardIndex);
        card.onclick = () => selectCard(cardIndex);
        
        // ホバー効果
        card.onmouseover = () => {
            if (selectedCardForCurrentStep !== cardIndex) {
                card.style.transform = 'scale(1.1)';
                card.style.borderColor = 'white';
                card.style.zIndex = '10';
            }
        };
        card.onmouseout = () => {
            if (selectedCardForCurrentStep !== cardIndex) {
                card.style.transform = 'scale(1)';
                card.style.borderColor = 'transparent';
                card.style.zIndex = '1';
            }
        };
        
        // 偶数番目は上列、奇数番目は下列
        if (i % 2 === 0) {
            topRow.appendChild(card);
        } else {
            bottomRow.appendChild(card);
        }
    });
    
    cardsGrid.appendChild(topRow);
cardsGrid.appendChild(bottomRow);

// カードグリッドを包むコンテナを作成
const cardContainer = document.createElement('div');
cardContainer.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;
`;

cardContainer.appendChild(cardsGrid);
container.appendChild(cardContainer);

// スクロール位置を中央に設定
setTimeout(() => {
    const maxScroll = cardsGrid.scrollWidth - cardsGrid.clientWidth;
    cardsGrid.scrollLeft = maxScroll / 2 - 20; // 中央より20px左
}, 100);

// 次へボタン
const nextButton = document.createElement('button');
    nextButton.textContent = '次へ';
    nextButton.id = 'next-button';
    nextButton.style.cssText = `
        background: #4a6fa5;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: -20px auto 20px auto;
        display: block;
        white-space: nowrap;
        opacity: 0.5;
        pointer-events: none;
        position: relative;
        z-index: 1;
        text-align: center;
        width: 100px;
    `;
    nextButton.onclick = () => confirmCardSelection();
    cardContainer.appendChild(nextButton);
}
        
function selectTopCard() {
    // ランダムにカードを選択（78枚から）
    const randomCardIndex = Math.floor(Math.random() * 78);
    
    // 選択時間を記録
    const selectionTime = Date.now() - cardSelectionStartTime;
    totalHesitationTime += selectionTime;
    
    // カードIDを保存
    selectedCardIds.push(randomCardIndex);
    
    // カードめくりアニメーション
    animateCardFlip();
    
    // 0.5秒後に次のステップへ
    setTimeout(() => {
        if (currentCardStep < 3) {
            // 次のカードへ
            currentCardStep++;
            cardSelectionStartTime = Date.now();
            updateCardSelectionTitle();
            displayCards(); // デッキを再表示
        } else {
            // 3枚選択完了 → 結果画面へ
            showTarotResult();
        }
    }, 500);
}

function animateCardFlip() {
    const topCard = document.querySelector('.deck-card[style*="z-index: 20"]');
    if (topCard) {
        // カードをめくるアニメーション
        topCard.style.transform = 'rotate(180deg) translate(100px, -50px) scale(0.8)';
        topCard.style.opacity = '0';
        
        // 選択されたカードの情報を一瞬表示
        const selectedCard = tarotCards[selectedCardIds[selectedCardIds.length - 1]];
        topCard.innerHTML = `
            <div style="font-size: 12px; text-align: center; line-height: 1.2;">
                ${selectedCard.emoji}<br>
                <span style="font-size: 8px;">${selectedCard.name}</span>
            </div>
        `;
    }
}

function showTarotResult() {
    // 選択されたカードの情報を表示
    displaySelectedCards();
    
    // 守護神との統合メッセージを生成
    generateIntegratedReading();
    
    // 結果画面に移行
    showPage(12);
}

// 選択されたカードを表示する関数
function displaySelectedCards() {
    const cardPositions = ['今日の状況', '今日の展開', '今日のアドバイス'];
    
    selectedCardIds.forEach((cardId, index) => {
        const card = tarotCards[cardId];
        const cardElement = document.getElementById(`card-${index + 1}`);
        const isReversed = determineCardOrientation(index);
        
        if (cardElement && card) {
            cardElement.querySelector('.card-emoji').textContent = card.emoji;
            cardElement.querySelector('.card-name').textContent = card.name + (isReversed ? ' (逆位置)' : '');
            cardElement.querySelector('.card-position').textContent = cardPositions[index];
        }
    });
}

// カードの正位置・逆位置を判定する関数
function determineCardOrientation(cardIndex) {
    // ユーザーの直感データを使用して正位置・逆位置を決定
    const seed = shuffleDuration + (cardIndex * 1000) + totalHesitationTime;
    const random = (seed * 9301 + 49297) % 233280;
    
    // 約50%の確率で逆位置
    return (random % 100) < 50;
}

// カードの解釈を取得する関数
function getCardInterpretation(card, isReversed) {
    return isReversed ? card.reversed : card.upright;
}

// 守護神とタロットカードを統合した読み解きを生成
function generateIntegratedReading() {
    // 保存された守護神情報を取得
    const savedGuardian = localStorage.getItem('guardianResult');
    let guardianData = null;
    
    if (savedGuardian) {
        guardianData = JSON.parse(savedGuardian);
    }
    
    // 選択されたカードの基本情報
    const selectedCards = selectedCardIds.map(id => tarotCards[id]);
    
    // 守護神メッセージを生成
    const guardianMessage = generateGuardianMessage(guardianData, selectedCards);
    document.getElementById('guardian-message').textContent = guardianMessage;
    
    // 今日の運勢を生成
    const dailyFortune = generateDailyFortune(selectedCards, guardianData);
    document.getElementById('daily-fortune').textContent = dailyFortune;
}

// 守護神からのメッセージを生成
function generateGuardianMessage(guardianData, cards) {
    if (!guardianData) {
        return "守護神診断を受けると、より詳細なメッセージを受け取れます。";
    }
    
    const guardianType = Object.keys(guardianTypes).find(key => 
        guardianTypes[key].name === guardianData.name
    );
    
    const firstCard = cards[0];
    const isReversed = determineCardOrientation(0);
    
    return generateGuardianSpecificMessage(guardianType, firstCard, isReversed);
}

// 守護神タイプ別の専用メッセージ
function generateGuardianSpecificMessage(guardianType, card, isReversed) {
    const messages = {
        ruby_fox: {
            upright: `紅玉の狐があなたの直感を讃えています。「${card.name}」は新しい冒険への扉を開く合図です。あなたの素早い判断力を信じて、変化を恐れずに進んでください。`,
            reversed: `紅玉の狐が慎重さを促しています。「${card.name}」の逆位置は、一度立ち止まって状況を見極める時です。焦らず、内なる声に耳を傾けましょう。`
        },
        sapphire_hawk: {
            upright: `蒼天の鷹があなたの理想を支えています。「${card.name}」は高い視点から物事を捉える大切さを示しています。長期的な目標に向かって着実に歩んでください。`,
            reversed: `蒼天の鷹が方向性の見直しを提案しています。「${card.name}」の逆位置は、理想と現実のバランスを取る時期です。柔軟性を持って調整していきましょう。`
        },
        silver_wolf: {
            upright: `銀月の狼があなたの絆を大切にしています。「${card.name}」は仲間との協力が成功の鍵であることを示しています。信頼関係を深めて共に前進しましょう。`,
            reversed: `銀月の狼が独立性の重要さを伝えています。「${card.name}」の逆位置は、時には一人の時間も必要だと示しています。自分自身と向き合う時間を作りましょう。`
        },
        emerald_deer: {
            upright: `翠林の鹿があなたの優しさを称賛しています。「${card.name}」は癒しと成長の力を表しています。自分らしいペースで、着実に前進していきましょう。`,
            reversed: `翠林の鹿が休息の必要性を示しています。「${card.name}」の逆位置は、無理をせず自分を労る時です。心と体の声に耳を傾けてください。`
        },
        gold_bear: {
            upright: `金剛の熊があなたの堅実さを支えています。「${card.name}」は安定した基盤の上に成功を築くことを示しています。慎重かつ確実に歩みを進めましょう。`,
            reversed: `金剛の熊が柔軟性の大切さを教えています。「${card.name}」の逆位置は、時には新しいアプローチが必要だと示しています。変化を恐れず挑戦してください。`
        },
        rainbow_butterfly: {
            upright: `虹彩の蝶があなたの創造性を輝かせています。「${card.name}」は美しい変化と自由な発想の時です。芸術的な感性を活かして新しい可能性を探求しましょう。`,
            reversed: `虹彩の蝶が内なる美しさに気づくよう促しています。「${card.name}」の逆位置は、外的な変化よりも内面の充実が大切な時です。自分の本質と向き合いましょう。`
        }
    };
    
    const guardianMessages = messages[guardianType] || messages.ruby_fox;
    return isReversed ? guardianMessages.reversed : guardianMessages.upright;
}

// 今日の運勢を生成
function generateDailyFortune(cards) {
    const situation = cards[0];  // 今日の状況
    const development = cards[1]; // 今日の展開
    const advice = cards[2];     // 今日のアドバイス
    
    return `今日の状況は「${situation.name}」が示す${situation.meaning}となりそうです。「${development.name}」の影響で${development.meaning}が期待できます。「${advice.name}」のアドバイスとして、${advice.upright}を心がけることで、より良い一日を過ごせるでしょう。`;
}
                                                                                                            
// ページ10表示時にシャッフルアニメーションを開始
function startShuffleAnimation() {
    const shuffleImage = document.getElementById('shuffle-image');
    if (shuffleImage) {
        let shuffleFrames = ['images/shuffle1.png', 'images/shuffle2.png', 'images/shuffle3.png'];
        let currentFrame = 0;
        
        const interval = setInterval(() => {
            shuffleImage.src = shuffleFrames[currentFrame];
            currentFrame = (currentFrame + 1) % shuffleFrames.length;
        }, 500);
        
        // アニメーション停止のためにintervalを保存
        window.shuffleInterval = interval;
    }
}
        
        // 初期化
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

        // タロット占い関連の変数
        let selectedCards = [];
        let currentGenre = '';

        // タロットカードデータ（78枚）
const tarotCards = [
    // 大アルカナ（22枚）
    { id: 0, name: "愚者", emoji: "🃏", meaning: "新しい始まり、冒険心", upright: "自由、可能性、直感", reversed: "無謀、優柔不断" },
    { id: 1, name: "魔術師", emoji: "🎩", meaning: "意志の力、創造性", upright: "創造力、技術、集中力", reversed: "悪用、欺瞞" },
    { id: 2, name: "女教皇", emoji: "🔮", meaning: "直感と知恵", upright: "直感、神秘性、内なる声", reversed: "秘密、隠し事" },
    { id: 3, name: "女帝", emoji: "👑", meaning: "豊かさと創造", upright: "豊かさ、母性、創造性", reversed: "依存、創造性の停滞" },
    { id: 4, name: "皇帝", emoji: "👨‍💼", meaning: "権威と安定", upright: "権威、安定、規律", reversed: "横暴、支配欲" },
    { id: 5, name: "教皇", emoji: "⛪", meaning: "伝統と教え", upright: "伝統、教育、精神的指導", reversed: "反抗、独断" },
    { id: 6, name: "恋人", emoji: "💕", meaning: "愛と選択", upright: "愛、調和、価値観の一致", reversed: "不調和、誤った選択" },
    { id: 7, name: "戦車", emoji: "🏎️", meaning: "意志と克服", upright: "勝利、意志力、前進", reversed: "暴走、自制心の欠如" },
    { id: 8, name: "力", emoji: "💪", meaning: "内なる強さ", upright: "勇気、忍耐、優しい力", reversed: "弱さ、自信喪失" },
    { id: 9, name: "隠者", emoji: "🕯️", meaning: "内省と導き", upright: "内省、精神的探求、導き", reversed: "孤独、現実逃避" },
    { id: 10, name: "運命の輪", emoji: "🎡", meaning: "運命と変化", upright: "運命、チャンス、転機", reversed: "悪循環、停滞" },
    { id: 11, name: "正義", emoji: "⚖️", meaning: "公正と均衡", upright: "公正、バランス、真実", reversed: "不正、偏見" },
    { id: 12, name: "吊された男", emoji: "🙃", meaning: "犠牲と洞察", upright: "犠牲、洞察、新しい視点", reversed: "無駄な犠牲、停滞" },
    { id: 13, name: "死神", emoji: "💀", meaning: "終わりと再生", upright: "変化、終了、再生", reversed: "停滞、変化への恐れ" },
    { id: 14, name: "節制", emoji: "🍷", meaning: "調和とバランス", upright: "調和、節制、癒し", reversed: "不調和、過剰" },
    { id: 15, name: "悪魔", emoji: "😈", meaning: "束縛と欲望", upright: "束縛、物質主義、誘惑", reversed: "解放、覚醒" },
    { id: 16, name: "塔", emoji: "🗼", meaning: "破壊と解放", upright: "突然の変化、破壊、解放", reversed: "内なる変化、危機回避" },
    { id: 17, name: "星", emoji: "⭐", meaning: "希望と癒し", upright: "希望、癒し、インスピレーション", reversed: "失望、方向性の喪失" },
    { id: 18, name: "月", emoji: "🌙", meaning: "幻想と不安", upright: "直感、幻想、不安", reversed: "真実の発覚、恐怖の克服" },
    { id: 19, name: "太陽", emoji: "☀️", meaning: "成功と喜び", upright: "成功、喜び、活力", reversed: "一時的な失敗、喜びの遅れ" },
    { id: 20, name: "審判", emoji: "📯", meaning: "復活と覚醒", upright: "復活、覚醒、新しいスタート", reversed: "後悔、自己批判" },
    { id: 21, name: "世界", emoji: "🌍", meaning: "完成と統合", upright: "達成、完成、統合", reversed: "未完成、目標の見直し" },
    
    // 小アルカナ - ワンド（棒）
    { id: 22, name: "ワンドのエース", emoji: "🔥", meaning: "新しい情熱、創造力", upright: "新しい始まり、創造性、情熱", reversed: "創造性の停滞、方向性の迷い" },
    { id: 23, name: "ワンドの2", emoji: "⚡", meaning: "計画と展望", upright: "未来の計画、個人的な力", reversed: "計画の遅れ、内なる調和の欠如" },
    { id: 24, name: "ワンドの3", emoji: "🌟", meaning: "拡張と先見性", upright: "拡張、先見の明、リーダーシップ", reversed: "計画の遅れ、先見性の欠如" },
    { id: 25, name: "ワンドの4", emoji: "🎉", meaning: "調和と安定", upright: "調和、安定、お祝い", reversed: "調和の欠如、内なる緊張" },
    { id: 26, name: "ワンドの5", emoji: "⚔️", meaning: "競争と対立", upright: "競争、争い、不一致", reversed: "内なる争い、競争の回避" },
    { id: 27, name: "ワンドの6", emoji: "👑", meaning: "勝利と認知", upright: "勝利、公的な認知、自信", reversed: "遅れた勝利、自信の欠如" },
    { id: 28, name: "ワンドの7", emoji: "🛡️", meaning: "挑戦と勇気", upright: "挑戦、勇気、粘り強さ", reversed: "圧倒、不安、降参" },
    { id: 29, name: "ワンドの8", emoji: "💨", meaning: "迅速な行動", upright: "迅速な行動、進歩、変化", reversed: "遅れ、フラストレーション、停滞" },
    { id: 30, name: "ワンドの9", emoji: "💪", meaning: "強さと警戒", upright: "強さ、勇気、粘り強さ", reversed: "偏執、疑い、警戒心" },
    { id: 31, name: "ワンドの10", emoji: "📊", meaning: "重荷と責任", upright: "重荷、責任、努力", reversed: "責任の委任、燃え尽き症候群" },
    
    // 小アルカナ - カップ（聖杯）
    { id: 32, name: "カップのエース", emoji: "💧", meaning: "新しい愛、感情", upright: "新しい関係、愛、直感", reversed: "失われた愛、感情の抑制" },
    { id: 33, name: "カップの2", emoji: "💕", meaning: "パートナーシップ", upright: "統一、パートナーシップ、相互の魅力", reversed: "緊張した関係、不調和" },
    { id: 34, name: "カップの3", emoji: "🎊", meaning: "友情と祝福", upright: "友情、共同体、お祝い", reversed: "過度のパーティ、ゴシップ" },
    { id: 35, name: "カップの4", emoji: "😔", meaning: "瞑想と不満", upright: "瞑想、熟考、不満", reversed: "退屈、求めるものを見つける" },
    { id: 36, name: "カップの5", emoji: "😢", meaning: "失望と悲しみ", upright: "失望、悲しみ、後悔", reversed: "個人的な挫折、自己許し" },
    { id: 37, name: "カップの6", emoji: "🌸", meaning: "懐古と無邪気", upright: "懐古、子供時代、無邪気", reversed: "現在に生きる、新しい経験" },
    { id: 38, name: "カップの7", emoji: "💭", meaning: "選択と幻想", upright: "幻想、選択、願望思考", reversed: "現実的な選択、意志決定" },
    { id: 39, name: "カップの8", emoji: "🚶", meaning: "失望と放棄", upright: "失望、放棄、引きこもり", reversed: "失望からの回復、新たな関心" },
    { id: 40, name: "カップの9", emoji: "😌", meaning: "満足と願いの実現", upright: "満足、感情的な安定、贅沢", reversed: "内面的な幸福、精神的な満足" },
    { id: 41, name: "カップの10", emoji: "👨‍👩‍👧‍👦", meaning: "感情的な満足", upright: "感情的な満足、幸福、調和", reversed: "離れた家族、価値観の相違" },
    
    // 小アルカナ - ソード（剣）
    { id: 42, name: "ソードのエース", emoji: "⚔️", meaning: "精神的な力", upright: "精神的な力、勝利、明瞭性", reversed: "混乱、破壊的な力" },
    { id: 43, name: "ソードの2", emoji: "🤷", meaning: "困難な選択", upright: "困難な選択、優柔不断", reversed: "混乱、情報過多" },
    { id: 44, name: "ソードの3", emoji: "💔", meaning: "悲しみと分離", upright: "悲しみ、分離、裏切り", reversed: "個人的な悲しみ、内なる悲しみ" },
    { id: 45, name: "ソードの4", emoji: "😴", meaning: "休息と沈思", upright: "休息、沈思、孤独", reversed: "不安、復活、活動の再開" },
    { id: 46, name: "ソードの5", emoji: "😠", meaning: "敗北と失望", upright: "敗北、失望、裏切り", reversed: "個人的な挫折、復讐" },
    { id: 47, name: "ソードの6", emoji: "⛵", meaning: "移行と旅", upright: "移行、変化、旅", reversed: "個人的な移行、抵抗" },
    { id: 48, name: "ソードの7", emoji: "🔓", meaning: "盗みと欺瞒", upright: "盗み、欺瞞、狡猾さ", reversed: "詐欺師、復讐、自己欺瞞" },
    { id: 49, name: "ソードの8", emoji: "🔒", meaning: "束縛と制限", upright: "束縛、制限、囚われ", reversed: "自己制限、内なる批判" },
    { id: 50, name: "ソードの9", emoji: "😰", meaning: "絶望と悪夢", upright: "絶望、悪夢、不安", reversed: "内なる苦悩、恥、罪悪感" },
    { id: 51, name: "ソードの10", emoji: "⚡", meaning: "破滅と終わり", upright: "破滅、終わり、崩壊", reversed: "復活、回復、生き残り" },
    
    // 小アルカナ - ペンタクル（金貨）
    { id: 52, name: "ペンタクルのエース", emoji: "💰", meaning: "物質的な機会", upright: "物質的な機会、発現", reversed: "失われた機会、お金に対する貪欲" },
   { id: 53, name: "ペンタクルの2", emoji: "⚖️", meaning: "バランスと適応性", upright: "バランス、適応性、時間管理", reversed: "不均衡、混乱した優先順位" },
    { id: 54, name: "ペンタクルの3", emoji: "🔨", meaning: "協力と建設", upright: "協力、建設、チームワーク", reversed: "不調和、競争" },
    { id: 55, name: "ペンタクルの4", emoji: "💎", meaning: "物質的な安定", upright: "物質的な安定、保安", reversed: "貪欲、物質主義" },
    { id: 56, name: "ペンタクルの5", emoji: "🏚️", meaning: "物質的な問題", upright: "物質的な問題、貧困", reversed: "精神的な貧困、孤立" },
    { id: 57, name: "ペンタクルの6", emoji: "🤝", meaning: "寛大さと共有", upright: "寛大さ、共有、コミュニティ", reversed: "利己主義、借金" },
    { id: 58, name: "ペンタクルの7", emoji: "🌱", meaning: "長期的な視点", upright: "長期的な視点、忍耐、投資", reversed: "結果への不安、忍耐の欠如" },
    { id: 59, name: "ペンタクルの8", emoji: "🔧", meaning: "技能と勤勉", upright: "技能、勤勉、熟達", reversed: "完璧主義、仕事中毒" },
    { id: 60, name: "ペンタクルの9", emoji: "🏡", meaning: "物質的な豊かさ", upright: "物質的な豊かさ、贅沢、自立", reversed: "過度な出費、価値への疑問" },
    { id: 61, name: "ペンタクルの10", emoji: "👪", meaning: "富と家族", upright: "富、家族、達成", reversed: "金融損失、家族の問題" },
    
    // コートカード
    { id: 62, name: "ワンドのペイジ", emoji: "👦", meaning: "熱心な学習者", upright: "熱心な学習者、探求", reversed: "不注意、遅れた学習" },
    { id: 63, name: "ワンドのナイト", emoji: "🏇", meaning: "衝動的な行動", upright: "衝動的な行動、冒険", reversed: "無謀、怒り" },
    { id: 64, name: "ワンドのクイーン", emoji: "👸", meaning: "自信と決断力", upright: "自信、決断力、独立", reversed: "利己主義、復讐心" },
    { id: 65, name: "ワンドのキング", emoji: "👑", meaning: "自然なリーダー", upright: "自然なリーダー、ビジョン", reversed: "無謀、独裁的" },
    { id: 66, name: "カップのペイジ", emoji: "🧚", meaning: "創造的なメッセージ", upright: "創造的なメッセージ、直感的な学習", reversed: "感情的な未熟さ" },
    { id: 67, name: "カップのナイト", emoji: "🌊", meaning: "ロマンス主義者", upright: "ロマンス主義者、魅力", reversed: "気分屋、非現実的" },
    { id: 68, name: "カップのクイーン", emoji: "🔮", meaning: "思いやりと直感", upright: "思いやり、平静、直感", reversed: "感情的な不安定" },
    { id: 69, name: "カップのキング", emoji: "🌙", meaning: "感情的なバランス", upright: "感情的なバランス、思いやり", reversed: "感情的な操作" },
    { id: 70, name: "ソードのペイジ", emoji: "📝", meaning: "好奇心旺盛", upright: "好奇心、警戒", reversed: "スパイ、秘密" },
    { id: 71, name: "ソードのナイト", emoji: "⚡", meaning: "勇敢で衝動的", upright: "勇敢、衝動的", reversed: "無謀、不注意" },
    { id: 72, name: "ソードのクイーン", emoji: "🗡️", meaning: "鋭い知性", upright: "鋭い知性、明瞭な思考", reversed: "冷酷、苦味" },
    { id: 73, name: "ソードのキング", emoji: "⚖️", meaning: "知的な権威", upright: "知的な権威、真実", reversed: "独裁的、操作的" },
    { id: 74, name: "ペンタクルのペイジ", emoji: "📚", meaning: "勤勉な学生", upright: "勤勉な学生、新しいアイデア", reversed: "学習の欠如、進歩なし" },
    { id: 75, name: "ペンタクルのナイト", emoji: "🐎", meaning: "勤勉と責任感", upright: "勤勉、責任感、日常", reversed: "怠惰、無責任" },
    { id: 76, name: "ペンタクルのクイーン", emoji: "🌻", meaning: "実用的で気配り", upright: "実用的、気配り、財政的な安定", reversed: "金銭的な依存" },
   { id: 77, name: "ペンタクルのキング", emoji: "💼", meaning: "財政的な成功", upright: "財政的な成功、経営能力", reversed: "貪欲、物質主義" }
];

        
        // タロット占い用の新しい変数
        
        let shuffleStartTime = 0;
        let shuffleDuration = 0;
        let coordinateSeed = 0;
        let totalHesitationTime = 0;
        let cardSelectionStartTime = 0;
        let selectedTarotCards = [];

     
        
        // 初期化
        document.addEventListener('DOMContentLoaded', function() {
            console.log('森の守護者とタロット占いアプリが読み込まれました');
            checkExistingGuardian();

            // タロット占い関数群
        function generateTarotSeed() {
            let combinedSeed = 
                shuffleDuration +           
                coordinateSeed +           
                totalHesitationTime +      
                (Date.now() % 10000);      
            
            return combinedSeed;
        }

        function selectRandomCards(seed) {
            let random1 = (seed * 9301 + 49297) % 233280;
            let random2 = (random1 * 9301 + 49297) % 233280;
            let random3 = (random2 * 9301 + 49297) % 233280;
            
            let card1 = random1 % 22;
            let card2 = random2 % 22;
            let card3 = random3 % 22;
            
            while (card2 === card1) {
                random2 = (random2 * 9301 + 49297) % 233280;
                card2 = random2 % 22;
            }
            while (card3 === card1 || card3 === card2) {
                random3 = (random3 * 9301 + 49297) % 233280;
                card3 = random3 % 22;
            }
            
            return [card1, card2, card3];
        }
            
        });
