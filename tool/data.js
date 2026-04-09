let Style = {
    iPhone:{ //16
        "width": "393px",
    },
    tekiou: function() {
        for (let section in this) {
            if (section == 'apply') continue;
            for (let key in this[section]) {
                document.documentElement.style
                    .setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}


let Keihins = [
    {
        rare:'UR',
        list: ['アルレッキーノ','ブダミンゴ','青のリバースカード','火竜の逆鱗']
    },
    {
        rare:'SSR',
        list: ['黄金の床','5000¢','魔界の主役は我々だ! 2巻','ワイヤレスイヤホンの右','ダイヤのJカード']
    },
    {
        rare:'SR',
        list: ['ベノム 2巻','ジャムの乗ったクッキー','猫さんのぬいぐるみ','千載一遇カード','ルイージのAmibo']
    },
    {
        rare:'R',
        list: ['バッグ・クロージャー','USB Gen3.5 Type-CのコードをUSB Gen3.5 Type-Aのコードに変換する装置','透明な丸いアクリル']
    },
    {
        rare:'N',
        list: ['その辺に落ちてたくし','色付きガラスのかけら','アイロンビーズで作った剣','日焼け止め']
    },
    {
        rare:'GS',
        list:['ベノム 1巻','赤のスキップカード','雌火竜の逆鱗','魔界の主役は我々だ! 19巻','ワイヤレスイヤホンの左','ハートのエースカード','肩たたき券','1ルピア(約0.01円)','20万円の車(タタ「ナノ」)']
    }
]

