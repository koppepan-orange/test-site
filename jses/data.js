const wordData = [
    {
        slang: false,
        sentence: false,
        attribute: "food fruit",
        description: "何よりも美味しい果物。\n異論は認めない。",
        sender: "koppepan_orange",
        speech: "名詞",
        ja: "りんご",
        en: "apple"
    },
    {
        slang: false,
        sentence: false,
        attribute: "song",
        description: "アブソリュート←おすすめ",
        sender: "koppepan_orange",
        speech: "副詞",
        ja: "絶対に",
        en: "absolute"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "酷い有様やね...みたいな",
        sender: "koppepan_orange",
        speech: "形容詞",
        ja: "ひどい",
        en: "terrible"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "釣り竿によく使われるやつ\n\"惹きつける\"とは違うのぜ",
        sender: "koppepan_orange",
        speech: "動詞",
        ja: "引きつける",
        en: "lure"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "あの猫は人々を惹きつける〜みたいな感じ\nattoractionで\"アトラクション\"\n\n\"引きつける\"とは違うのぜ",
        sender: "koppepan_orange",
        speech: "動詞",
        ja: "惹かれる",
        en: "attracted"
    },
    {
        slang: true,
        sentence: false,
        attribute: "cute",
        description: "\"甘えん坊な\",\"かわいい\"とも訳される",
        sender: "koppepan_orange",
        speech: "形容詞",
        ja: "私の大好きな",
        en: "my cirsty"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "でんでんで伝説が始まる...",
        sender: "koppepan_orange",
        speech: "形容詞",
        ja: "伝説の",
        en: "fabled"
    },
    {
        slang: false,
        sentence: false,
        attribute: "back",
        description: "stealが\"盗む\"なので\nbackをつけると逆的な感じなのかもしれない。",
        sender: "koppepan_orange",
        speech: "動詞",
        ja: "盗み返す",
        en: "steal back"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "\"の\"はいらないです\nguessと似てるのは偶然",
        sender: "koppepan_orange",
        speech: "形容詞",
        ja: "気持ちの悪い",
        en: "gross"
    },
    {
        slang: true,
        sentence: true,
        attribute: "daily",
        description: "使いやすい文\nワティフアイライキｪット？",
        sender: "koppepan_orange",
        speech: "-",
        ja: "私が気に入ったらどうする？",
        en: "what if i like it?"
    },
    {
        slang: false,
        sentence: false,
        attribute: "tomas",
        description: "トーマスとかチャーリーとか",
        sender: "koppepan_orange",
        speech: "名詞",
        ja: "機関車",
        en: "locomotive"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "\"代替案\"的な用法も可",
        sender: "koppepan_orange",
        speech: "名詞",
        ja: "代わり",
        en: "alternate"
    },
    {
        slang: false,
        sentence: false,
        attribute: "koyuki",
        description: "無作為に、同様に等しいとする確率で、ともいう\n私はこれが大好きです",
        sender: "koppepan_orange",
        speech: "副詞",
        ja: "ランダムに",
        en: "randomly"
    },
    {
        slang: false,
        sentence: false,
        attribute: "",
        description: "解雇された\"状態\" というのを表す",
        sender: "koppepan_orange",
        speech: "形容詞",
        ja: "解雇された",
        en: "fired"
    },
  {
    attribute: "building",
    description: "何らかの施設を表すやつ。\nfactrioとはなんの関係もないので注意",
    en: "facility",
    ja: "施設",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "名詞"
  },
  {
    attribute: "none",
    description: "あれは絶対猫だ みたいな用法",
    en: "definite",
    ja: "絶対",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "形容詞"
  },
  {
    attribute: "daily",
    description: "yikes...みたいな感じに使う\nやばい!!とかきゃっ!!みたいな用法もあるラシスオレンジ",
    en: "yikes",
    ja: "やれやれ",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "感嘆符"
  },
  {
    attribute: "none",
    description: "天体観測の\"oh yeah ah\"とは違うのです しゅびっ",
    en: "oh yeah what",
    ja: "ああ、そうだ",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "-"
  },
  {
    attribute: "battle",
    description: "討伐!!という意味に近い \"打ち負かす\"かも\nとなるとソウルビートってダブルミーニング？",
    en: "beat",
    ja: "倒す",
    sender: "koppepan_orange",
    sentence: false,
    slang: false,
    speech: "動詞"
  },
  {
    attribute: "none",
    description: "actually, that's true.みたいに使われがち\n↑こういうやつはほとんど嘘",
    en: "actually",
    ja: "実は",
    sender: "koppepan_orange",
    sentence: false,
    slang: false,
    speech: "副詞"
  },
  {
    attribute: "none",
    description: "なんてことだ...... とか 大変なことになってしまった...みたいな感じ\n惨状を見たときにいいがち",
    en: "oh what the heck",
    ja: "なんてこったい",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "-"
  },
  {
    attribute: "vase",
    description: "強欲な壺 [0]\n使用時、カードを2枚引く",
    en: "greedy",
    ja: "欲深い",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "形容詞"
  },
  {
    attribute: "greedy",
    description: "強欲な壺ぐらいでしか効かん言葉\n壺 ←形そのまま過ぎ",
    en: "vase",
    ja: "壺",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "名詞"
  },
  {
    attribute: "rengo",
    description: "多分ingじゃなくても良い",
    en: "running into ~",
    ja: "~に衝突する",
    sender: "koppepan_orange",
    sentence: false,
    slang: false,
    speech: "動詞"
  },
  {
    attribute: "battle",
    description: "圧倒的に戦士とかののセリフだけど\nなんとアイドルのセリフです",
    en: "how's this!!",
    ja: "これでどうだああああああ！！！！",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "daily",
    description: "めちゃ使いやすいのでおすすめ\ntoのあとになにか入れてもいいし、入れなくても良い",
    en: "I didn't mean to",
    ja: "そんなつもりじゃなかったんだ",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "arknights",
    description: "使う機会は0に等しいです\nあバトル中とかだったら全然あるわ",
    en: "I bury him here",
    ja: "彼らをここに埋葬してあげましょう",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "daily",
    description: "超使いやすいしわかりやすいやつ\nごまかしにも使えるのでおすすめ",
    en: "there we go",
    ja: "さあ行こう",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "daily",
    description: "映画とかでよく聞くセリフ\nアイガディｯト",
    en: "I got it",
    ja: "了解した",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "pokémon",
    description: "文ではあるがほぼ単語みたいな扱いを受けている\n体感0.6倍 いまひとつは0.3倍とか",
    en: "it works",
    ja: "こうかあり",
    sender: "koppepan_orange",
    sentence: false,
    slang: true,
    speech: "-"
  },
  {
    attribute: "none",
    description: "ほぼほぼ動詞だけど文なので違います\nKeep attacking toで\"攻撃を続けろ\"",
    en: "keep going that way",
    ja: "そのまま進み続ける",
    sender: "koppepan_orange",
    sentence: true,
    slang: false,
    speech: "-"
  },
  {
    attribute: "none",
    description: "fellaはスラングで\"男\"を表す\nでも多分この文はどっちでも表せると思う ワンチャン良くない",
    en: "who’s this fella",
    ja: "こいつは誰だ",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "-"
  },
  {
    attribute: "daily",
    description: "終わったーーーーー的な用法\nit is hopelessでも同じ",
    en: "lost it already",
    ja: "もうだめだ",
    sender: "koppepan_orange",
    sentence: true,
    slang: true,
    speech: "-"
  },
  {
    attribute: "none",
    description: "\"困らせる\"の意味もあるから動詞\nあまりよくわからない",
    en: "embarrass",
    ja: "恥ずかしい",
    sender: "koppepan_orange",
    sentence: false,
    slang: false,
    speech: "動詞"
  }
]

const bookData = [
    {
        title: "test",
        sender: "koppepan_orange",
        description: "内容？ないよ？",
        body: "誰も見れんしょこれ",
        usedAI: false,
        yokunai: false
    }
]
