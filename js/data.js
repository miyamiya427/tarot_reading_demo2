// 守護者タイプ情報（12タイプ対応）
const guardianTypes = {
    // 朝タイプ（積極的・外向的）
    akatsuki_ruby_fox: {
        name: "暁紅の狐",
        emoji: "🦊",
        traits: ["直感", "変化", "積極性"],
        description: "朝の光のように輝く、積極的で直感的な自由な魂",
        interpretation: "新しい挑戦を恐れず、直感を信じて積極的に行動することで道が開けるでしょう。"
    },
    yoi_ruby_fox: {
        name: "宵紅の狐",
        emoji: "🦊",
        traits: ["直感", "変化", "思慮深さ"],
        description: "夕暮れのように穏やかで、思慮深く変化を受け入れる魂",
        interpretation: "内なる直感を大切にし、慎重に変化を受け入れることで成長できるでしょう。"
    },
    akatsuki_sapphire_hawk: {
        name: "暁蒼の鷹",
        emoji: "🦅",
        traits: ["理想", "俯瞰", "行動力"],
        description: "高い理想に向かって積極的に行動する指導者的な魂",
        interpretation: "大きな視点と高い理想を持ち、積極的にリーダーシップを発揮してください。"
    },
    yoi_sapphire_hawk: {
        name: "宵蒼の鷹",
        emoji: "🦅",
        traits: ["理想", "俯瞰", "思慮深さ"],
        description: "静かに全体を見渡し、理想に向かって着実に歩む賢者",
        interpretation: "物事を俯瞰的に捉え、長期的な視点で理想に向かって進んでください。"
    },
    akatsuki_silver_wolf: {
        name: "暁銀の狼",
        emoji: "🐺",
        traits: ["絆", "協調", "リーダーシップ"],
        description: "仲間を率いて共に前進する、積極的なチームリーダー",
        interpretation: "強いリーダーシップで仲間を導き、絆を深めながら共に成長してください。"
    },
    yoi_silver_wolf: {
        name: "宵銀の狼",
        emoji: "🐺",
        traits: ["絆", "協調", "支援"],
        description: "仲間を静かに支え、深い絆を大切にする優しい魂",
        interpretation: "チームワークを大切にし、信頼関係を深めることで力を発揮できるでしょう。"
    },
    akatsuki_emerald_deer: {
        name: "暁翠の鹿",
        emoji: "🦌",
        traits: ["癒し", "成長", "活発さ"],
        description: "周囲に癒しをもたらしながら、活発に成長し続ける魂",
        interpretation: "自然体でありながら積極的に成長し、周囲に良い影響を与えてください。"
    },
    yoi_emerald_deer: {
        name: "宵翠の鹿",
        emoji: "🦌",
        traits: ["癒し", "成長", "穏やかさ"],
        description: "穏やかで優しく、着実な成長を重視する癒しの魂",
        interpretation: "自分のペースで着実に成長し、周囲に安らぎをもたらしてください。"
    },
    akatsuki_gold_bear: {
        name: "暁金の熊",
        emoji: "🐻",
        traits: ["安定", "保護", "積極性"],
        description: "積極的に安定を築き、大切な人を守る頼れる存在",
        interpretation: "強いリーダーシップで安定した基盤を築き、周囲を守ってください。"
    },
    yoi_gold_bear: {
        name: "宵金の熊",
        emoji: "🐻",
        traits: ["安定", "保護", "堅実さ"],
        description: "静かに安定を守り、堅実に歩み続ける守護者",
        interpretation: "慎重で堅実なアプローチで、安定した基盤を築いてください。"
    },
    akatsuki_rainbow_butterfly: {
        name: "暁虹の蝶",
        emoji: "🦋",
        traits: ["変容", "美", "創造性"],
        description: "美しい変化を積極的に創造する、芸術的で自由な魂",
        interpretation: "創造性を積極的に発揮し、美しい変化を恐れずに追求してください。"
    },
    yoi_rainbow_butterfly: {
        name: "宵虹の蝶",
        emoji: "🦋",
        traits: ["変容", "美", "内省"],
        description: "静かに内なる美しさを追求し、深い変容を重ねる魂",
        interpretation: "内面の美しさを大切にし、ゆっくりと深い変化を楽しんでください。"
    }
};

// 30問3択診断データ
const diagnosisQuestions = [
    {
        id: 1,
        text: "朝起きた時の気分は？",
        options: {
            A: { text: "今日は何をしようかワクワクする", scores: ['ruby_fox', 'rainbow_butterfly'] },
            B: { text: "今日一日を大切に過ごそうと思う", scores: ['emerald_deer', 'silver_wolf'] },
            C: { text: "しっかり計画通りに進めようと思う", scores: ['gold_bear', 'sapphire_hawk'] }
        }
    },
    {
        id: 2,
        text: "友達と過ごす理想の時間は？",
        options: {
            A: { text: "みんなでワイワイ盛り上がる", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "少人数で深く話し合う", scores: ['emerald_deer', 'sapphire_hawk'] },
            C: { text: "それぞれが好きなことをして一緒にいる", scores: ['rainbow_butterfly', 'gold_bear'] }
        }
    },
    {
        id: 3,
        text: "新しい環境での過ごし方は？",
        options: {
            A: { text: "積極的に話しかけて友達を作る", scores: ['ruby_fox', 'silver_wolf'] },
            B: { text: "様子を見ながら徐々に馴染んでいく", scores: ['emerald_deer', 'sapphire_hawk'] },
            C: { text: "自分のペースで必要な人とだけ関わる", scores: ['gold_bear', 'rainbow_butterfly'] }
        }
    }
    // ... 残り27問は後で追加
];