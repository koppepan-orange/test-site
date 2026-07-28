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

const Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'papyrus', type:'ttf'},
    {src:'cube12', type:'ttf'},
    {src:'hackgen', type:'ttf'},
];

const Images = {
    systems:['error'],
}

const Sounds = {
    // se:['error'],
    // bgm:[],
}

const Secrates = [
    {
        ind:0,
        name:'koppepan',
        arr:['k','o','p','p','e','p','a','n'],
        limit:3,
        func: async function(){
            nicoText('なんにも起こらない＝ヨーン');
        }
    },
    {
        ind:0,
        name:'re',
        arr:['r','e'],
        limit:1,
        func: async function(){
            let img = document.createElement('img');
            img.id = 'hakaisatsu';
            img.src = 'assets/images/systems/hakai_1.png'
            img.dataset.phase = 1;
            document.querySelector('body').appendChild(img);

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rere',
        arr:['r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return;

            img.src = 'assets/images/systems/hakai_2.png'
            img.dataset.phase = 2;

            setTimeout(() => {
                img.remove();
                this.ind = 0;
                this.limit = 1;
            }, 3000)

            return 0;
        }
    },
    {
        ind:0,
        name:'rerere',
        arr:['r','e','r','e','r','e'],
        limit:1,
        func: async function(){
            let img = document.getElementById('hakaisatsu');
            if(!img) return 1;
            console.log(img.dataset.phase);
            if(img.dataset.phase != '2') return 1;
            location.reload();
        }
    },
    {
        ind:0,
        name:'wawawwa',
        arr:['w','a','w','a','w','w','a'],
        limit:'n',
        func: async function(){
            staF.resetP();
        }
    }
]

const Spaces = [
    { name:'tools', rank:2, back:'#ffffff', sho:1 },
    { name:'asobs', rank:2, back:'#ffffff' },
];





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

