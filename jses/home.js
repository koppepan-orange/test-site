//#region Login
function homeLogin(){
    console.log('home「ログインされたで」')
    firebase.database().ref(`users/${username}/icon`).once("value").then((snapshot) => {
        const img = document.querySelector('#profile .icon');
        if(snapshot.exists()){
            img.src = snapshot.val();
        }else{
            img.src = 'assets/sozais/none.png';
        }
    })
}
function homeLogout(){
    console.log('home「ログアウトされたで」')
    document.querySelector('#profile .icon').src = 'assets/sozais/none.png';
}
//home
//#region リンクたちの動き
const Links = {
    'memo':{
        'memosi': {
            id: 'memosi',
            name: 'memo-site',
            href: 'https://koppepan-orange.github.io/test-site/memo.html',
            iframable:1,
            description: 'メモができるサイト。まじで有能<br>ずっと開いてたほうが楽で良き<br>私はゲーム制作の案メモにしてます'
        },
        'files':{
            id: 'files',
            name: 'file-site',
            href: 'https://forest-inlet.github.io/tools/fileTransfer?koppepanorange',
            iframable:1,
            description: 'ファイルを送受信できるサイトです！！<br>まじですごいと思う<br>あ友達作です'
        },
        'browserMemo': {
            id: 'browserMemo',
            name: 'ブラウザメモ帳',
            href: 'http://www.drpartners.jp/tools/browser-memocho.html',
            iframable: 1,
            description: 'メモができるサイト。保有量が大きい'
        },
        'memoWeb': {
            id: 'memoWeb',
            name: 'メモweb',
            href: 'https://memo.onl.jp/?koppepan23',
            iframable:0,
            description: '昔使ってたところ。<br>今はmemo.html使ってるけどね'
        },
        'fileWeb': {
            id: 'fileWeb',
            name: 'ファイルweb',
            href: 'https://file.onl.jp/?koppepan23',
            iframable:0,
            description: 'これは有用ちゃん<br>ファイルを送受信できる<br>そのうち作りたい.....'
        },
        'writebox': {
            id: 'writebox',
            name: 'writebox',
            href: 'https://write-box.appspot.com/',
            iframable:0,
            description: '簡単にhtmlのテストができるサイト<br>けどjsとcssは無効'
        },
    },
    'tool':{
        'tools': {
            id: 'tools',
            name: 'tool-site',
            href: 'https://koppepan-orange.github.io/test-site/tools.html',
            iframable:1,
            description: 'んー..あんまり実用的じゃない子<br>遊び目的。ほぼ<br>けど偏差値とかも測れるよ'
        },
        'books': {
            id: 'books',
            name: 'book-site',
            href: 'https://koppepan-orange.github.io/test-site/books.html',
            iframable:1,
            description: '本が読める子<br>作者は匿名なのでhiddenにでも送ってくれたら載せますよ'
        },
        'hidden': {
            id: 'hidden',
            name: 'hidden-site',
            href: 'https://koppepan-orange.github.io/test-site/hidden.html',
            iframable:1,
            description: '匿名で投稿できるサイト！！！！<br>管理者しか見れないんで<br>定期的にEventは確認して欲しいね'
        },
        'dropbox': {
            id: 'dropbox',
            name: 'dropbox',
            href: 'https://www.dropbox.com/home',
            iframable:0,
            description: '単純に優秀な子<br>ファイルWebよりも持続性が高い<br>ログイン必須'
        },
        'anagram': {
            id: 'anagram',
            name: 'アナグラム生成機',
            href: 'https://anagram.httqs.com/',
            iframable:1,
            description: 'アナグラムを生成してくれる子<br>武器とかの名前はこいつに頼ってもいいかも'
        },
        'roulette': {
            id: 'roulette',
            name: 'ルーレット等生成機',
            href: 'https://jp.piliapp.com/random/wheel/',
            iframable:1,
            description: '名の通り感。<br>他にも乱数とかもいける<br>暇つぶしできるかもね'
        },
        'colorSite': {
            id: 'colorSite',
            name: 'カラーサイト',
            href: 'https://www.color-site.com/',
            iframable:1,
            description: '色の種類を調べれるサイト<br>まじで優秀<br>rgbにも対応'
        },
        'mediaEdit': {
            id: 'mediaEdit',
            name: 'mp3、mp4編集サイト',
            href: 'https://123apps.com/ja/',
            iframable:1,
            description: '動画→音ができるサイト<br>いつも愛用させていただいております<br>かんしゃ〜'
        },
    },
    'make':{
        'scratch': {
            id: 'scratch',
            name: 'scratch',
            href: 'https://scratch.mit.edu/users/koppepan_orange/',
            iframable:0,
            description: '言わずもがな<br>前はここで作ってた..っていう名残<br>でもやってほしい'
        },
        'flat': {
            id: 'flat',
            name: 'flat',
            href: 'https://flat.io/ja',
            iframable:0,
            description: '音楽が比較的簡単に作れるサイト<br>ログイン必須'
        },
        'musescore': {
            id: 'musescore',
            name: 'musescore',
            href: 'https://musescore.com/user/41107809',
            iframable:0,
            description: '楽譜を調べれるサイト<br>人気な曲はありがちだけど<br>そんなそんなな曲はないことが多い'
        },
        'pixnote': {
            id: 'pixnote',
            name: 'pixnote',
            href: 'https://pixnote.net/',
            iframable:1,
            description: '簡単にドット絵が描けるサイト<br>まじで良い<br>ほんとに'
        },
        'pixlate': {
            id: 'pixlate',
            name: 'pixlate',
            href: 'https://www.pixilart.com/koppepanorange',
            iframable:0,
            description: 'ドット絵が描けるサイト2<br>ちょっと複雑だけど自由度は高め'
        },
        'thirtyDollar': {
            id: 'thirtyDollar',
            name: 'thirty dollar',
            href: 'https://thirtydollar.website/',
            iframable:0,
            description: '効果音で音楽を作れるサイト<br>internet overdoseやってる人もいたね'
        },
    },
    'study':{
        'meibo': {
            id: 'meibo',
            name: 'meibo-site',
            href: 'https://true-koppepan-orange.github.io/sub_test-site/meibo_site',
            iframable:1,
            description: '学校の人の一覧を見れるサイト<br>ぜんーーーぜんいないのは内緒のお話'
        },
        'duolingo': {
            id: 'duolingo',
            name: 'duolingo',
            href: 'https://www.duolingo.com/profile/koppepan_orange',
            iframable:0,
            description: '言語が学べるサイト<br>ﾁｮｳﾕｰﾒｲ!ﾔﾊﾞｵ'
        },
        'sushiDa': {
            id: 'sushiDa',
            name: '寿司打',
            href: 'http://typingx0.net/sushida/',
            iframable:0,
            description: 'タイピング競いの定番<br私は苦手です'
        },
        'ankey': {
            id: 'ankey',
            name: 'ankey',
            href: 'https://ankey.io/@koppepanorange',
            iframable:0,
            description: '歌詞とか色々でタイピングができるサイト<br>楽しい<br>好き'
        },
    },
    'sns':{
        'chatSite': {
            id: 'chatSite',
            name: 'chat-site',
            href: 'https://koppepan-orange.github.io/test-site/chat.html',
            iframable:1,
            description: '人と話せるサイト<br>なんJスタイル<br>サイドバーからtwitter2が見れるよ'
        },
        'reddit': {
            id: 'reddit',
            name: 'reddit',
            href: 'https://www.reddit.com/user/koppepan_orange/',
            iframable:0,
            description: '外国掲示板定番のやつ<br>英語しかない<br>絵はほとんど転載<br>まあ常時喧嘩してるtwitterよりはマシ'
        },
        'github': {
            id: 'github',
            name: 'github',
            href: 'https://github.com/koppepan-orange',
            iframable:0,
            description: 'ほんとにいつもありがとね...<br>このサイトもあなたのおかげです'
        },
        'discord': {
            id: 'discord',
            name: 'discord',
            href: 'https://discord.com/channels/@me',
            iframable:0,
            description: 'いつもありがとな、ほんとに<br>感謝してるぜ👍🏻'
        },
        'chatWeb': {
            id: 'chatWeb',
            name: 'チャットweb',
            href: 'https://chat.onl.jp/?koppepan23',
            iframable:0,
            description: 'ちゃんと喋れるいいサイト<br>けどchat.htmlの方が良い'
        },
        'pixiv': {
            id: 'pixiv',
            name: 'pixiv',
            href: 'https://www.pixiv.net/users/93550041',
            iframable:0,
            description: '絵が見れるサイト<br>twitterよりも民度が良い<br>絵師さんの巣窟'
        },
        'twitch': {
            id: 'twitch',
            name: 'twitch',
            href: 'https://www.twitch.tv/koppepan_orange',
            iframable:0,
            description: '配信が見れるサイト<br>いつかはしてみたいねぇ....'
        },
        'instagram': {
            id: 'instagram',
            name: 'instagram',
            href: 'https://www.instagram.com/koppepan_orange/',
            iframable:0,
            description: '2番目に好きなSNS<br>けど最近投稿できてない...'
        },
        'twitter': {
            id: 'twitter',
            name: 'twitter',
            href: 'https://twitter.com/koppepan_orange',
            iframable:0,
            description: '日本で最も人気なSNS<br>色んな界隈が入り混じってて良いけど<br>気抜いたら関係ないやつらが流れ込んでくるのが難点<br>好きだけどね'
        },
        'youtube': {
            id: 'youtube',
            name: 'youtube',
            href: 'https://www.youtube.com/channel/UCFvmwWDRrVqM22icC7QLx1w',
            iframable:0,
            description: '言わずもがな〜な動画投稿サイト<br>たまーーーに投稿してる<br>のばまんさんはおすすめ'
        },
        'litLink': {
            id: 'litLink',
            name: 'lit.link',
            href: 'https://lit.link/koppepanorange',
            iframable:0,
            description: '私についてまとめてあるサイト<br>けど多分このサイトだけで事足りる'
        },
        'kiite': {
            id: 'kiite',
            name: 'kiite',
            href: 'https://kiite.jp/user/koppapan_orange',
            iframable:0,
            description: '音楽が広告なしで見れるサイト<br>ボカロのみ<br>けどニコ動基盤だから学校では無理<br>ガッデム..ってやつ？<br>ベアさんといよわさんはおすすめ'
        },
        'magicalDraw': {
            id: 'magicalDraw',
            name: 'MagicalDraw',
            href: 'https://draw.kuku.lu/pchat.php?hash=898857247',
            iframable:0,
            description: '俗にいう"絵チャ"<br>友達と合作ができる<br>楽しい'
        },
    },
    'game':{
        'gameSite': {
            id: 'gameSite',
            name: 'game-site',
            href: 'https://koppepan-orange.github.io/game-site/welcome.html',
            iframable:1,
            description: 'ゲームができるサイト<br>まじで楽しい<br>clicker-of-mugenはおすすめ<br>cardは未完成だけど絵見て欲しい'
        },
        'musicSite': {
            id: 'musicSite',
            name: 'music-site',
            href: 'https://koppepan-orange.github.io/test-site/music-site.html',
            iframable:1,
            description: '全然できてない<br>kiite-cafeみたいなサイト作ろうとしたんだけどむずい'
        },
        'cybercode': {
            id: 'cybercode',
            name: 'cybercodeonline',
            href: 'https://cybercodeonline.com',
            iframable:0,
            description: '硬派で古き良きMMORPG<br>まじで楽しい..いや人によるかも<br>AFKが充実してて好き'
        },
        'browserGame': {
            id: 'browserGame',
            name: 'browsergame',
            href: 'https://sdin.jp/browser/',
            iframable:0,
            description: '色んなゲームで遊べるサイト<br>カジノ系列もあるよ<br>確かブロック貫通'
        },
        'arealMe': {
            id: 'arealMe',
            name: 'ARealMe',
            href: 'https://www.arealme.com/',
            iframable:0,
            description: '色んなテストができるサイト<br>クリック速度とか反射神経とか<br>テストサイトではないです。'
        },
        'unityroom': {
            id: 'unityroom',
            name: 'unityroom',
            href: 'https://unityroom.com/new_arrivals',
            iframable:0,
            description: '色んな人の作ったゲームで遊べるサイト<br>"ゆめきゃわ"みたいなやつはおすすめ'
        }
    },
};
let iframenow = 0;
Object.keys(Links).forEach(type => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = type;
    details.appendChild(summary);
    details.id = `${type}tachi`;
    document.querySelector('#links').appendChild(details);

    Object.keys(Links[type]).forEach(key => {
        const link = Links[type][key];
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        a.className = 'hasd';
        a.target = '_blank';
        a.setAttribute('data-description', link.description);

        if(link.iframable == 1){
            a.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                if(iframenow == 0){
                    iframenow = 1;//なぜか反応してない。Links['memos']の形にするべき？
                    const iframe = document.querySelector('#iframe');
                    iframe.style.display = 'block';
                    iframe.src = link.href;
                }else{
                    iframenow = 0;
                    const iframe = document.querySelector('#iframe');
                    iframe.style.display = 'none';
                }
            })
        }
        document.getElementById(`${type}tachi`).appendChild(a);
        document.getElementById(`${type}tachi`).appendChild(document.createElement('br'));
    });
    document.getElementById(`${type}tachi`).appendChild(document.createElement('br'));
})
//#endregion
//#region iframeのお話
let Iframes = {
    'bing':{
        id:'bing',
        name:'bing.com',
        src:'https://www.bing.com/search?q=%e6%86%b6%e8%89%af%e3%82%89%e3%81%af%e4%bb%8a%e3%81%af%e7%bd%b7%e3%82%89%e3%82%80%e5%ad%90%e6%b3%a3%e3%81%8f%e3%82%89%e3%82%80%e3%81%9d%e3%82%8c%e3%81%9d%e3%81%ae%e6%af%8d%e3%82%82%e6%88%91%e3%82%92%e5%be%85%e3%81%a4%e3%82%89%e3%82%80%e3%81%9d&qs=RQ&pq=%e6%86%b6%e8%89%af%e3%82%89%e3%81%af%e4%bb%8a%e3%81%af%e7%bd%b7%e3%82%89%e3%82%80%e5%ad%90%e6%b3%a3%e3%81%8f%e3%82%89%e3%82%80%e3%81%9d%e3%82%8c%e3%81%9d%e3%81%ae&sc=4-18&cvid=BDF68943856B40AC93BF5E6E4207F06D&FORM=QBRE&sp=1&ghc=1&lq=0',
    },
    'bing_trans':{
        id:'bing_trans',
        name:'bing-trans',
        src:'https://www.bing.com/translator?from=&to=ja&setlang=ja',
    },
    // 'deepAI':{
    //     id:'deepAI',
    //     name:'deep.ai',
    //     src:'https://deepai.org/chat',
    // },
    'talkAI':{
        id:'talkAI',
        name:'talk.ai',
        src:'https://talkai.info/ja/chat/',
    }
    
}
let NowLinkframe = 1;
function LinkframeGo(){
    document.getElementById(`Linkframe${NowLinkframe}`).setAttribute('data-src', document.getElementById("LinkInput").value);
    document.getElementById(`Linkframe${NowLinkframe}`).src = document.getElementById("LinkInput").value;
    NicoNicoText('うぇいとふぉあな〜う'); //好きな言葉ランキング上位"wait for now"
}
document.querySelector('#LinkSelect').addEventListener('change', event =>{
    NowLinkframe = event.target.value;
    let Link = `Linkframe${NowLinkframe}`;

    document.querySelector('#Linkframe1').style.display = 'none';
    document.querySelector('#Linkframe2').style.display = 'none';
    document.querySelector('#Linkframe3').style.display = 'none';
    document.querySelector('#Linkframe4').style.display = 'none';

    document.getElementById(Link).style.display = 'block';

    document.querySelector('#LinkInput').value = document.getElementById(`Linkframe${NowLinkframe}`).getAttribute('data-src');
})

document.querySelector('#linkSite .iframe-full').addEventListener('click', event => {
    event.preventDefault();
    console.log('clicked~~~'+NowLinkframe);
    document.querySelector(`#Linkframe${NowLinkframe}`).requestFullscreen();
    //iframe.webkitRequestFullscreen();
})
//#endregion


let numberOfMemo = 4;
document.addEventListener('DOMContentLoaded', () => {
    numberOfMemo = +getLocalStorage("numberOfMemo")??4;
    console.log(`メモの数は${numberOfMemo}個やで`);
    for(let i = 1; i <= numberOfMemo; i++){
        let memo = getLocalStorage(`memo${i}`);
        let memoElement = memoCreate(memo, i);
        document.querySelector('#memos').appendChild(memoElement);
    }
    let memoAdd = memoAddCreate();
    document.querySelector('#memos').appendChild(memoAdd);


    
    const iframes = getLocalStorage("iframes")??['bing', 'bing_trans', 'deepAI'];
    iframes.forEach(iframe => {
        const details = document.createElement("details");

        const summary = document.createElement("summary");
        summary.textContent = Iframes[iframe].name;

        const button = document.createElement("button");
        button.className = "iframe-button";
        button.dataset.id = `Iframe-${iframe}`;
        button.textContent = "full";

        const br = document.createElement("br");

        const iframeElement = document.createElement("iframe");
        iframeElement.dataset.id = `Iframe-${iframe}`;
        iframeElement.className = "iframe-frame";
        iframeElement.src = Iframes[iframe].src;

        details.appendChild(summary);
        details.appendChild(button);
        details.appendChild(br);
        details.appendChild(iframeElement);

        document.getElementById("iframes").appendChild(details); // 追加したい要素に変更して
    })
    
    
    
    
    
    

});

//#region memo
const bodyTextarea = document.querySelector('#memo-text');
const titleInput = document.querySelector('#memo-title');
const searchButton = document.querySelector('#memo-search');

titleInput.addEventListener('keydown', function(e) {
    if (e.key === "Enter") {
        e.preventDefault(); // 改行を防ぐ
    }
})

bodyTextarea.addEventListener('input', () => {
    if(username !== 'no name'){
        const title = titleInput.innerText.trim();
        const body = bodyTextarea.innerText;
        database.ref(`users/${username}/memo/${title}`).update({body:body});
    }
});

searchButton.addEventListener('click', () => {
    if(username !== 'no name'){
        const title = titleInput.innerText;
        database.ref(`users/${username}/memo/${title}`).once('value').then((snapshot) => {
            bodyTextarea.innerText = snapshot.val()?.body || '';
        });
    }else{
        bodyTextarea.innerText = 'ログインしてね！！  話はそれからだよ☆'
    }
});


function memoCreate(memo,i){
    let memoElement = document.createElement('div');
    memoElement.className = 'memo';
    memoElement.id = `memo${i}`;
    memoElement.setAttribute('data-num', i);

    let title = document.createElement('div');
    title.className = 'm-title';
    title.innerText = `memo${i}`;
    title.setAttribute('contenteditable', 'true');
    memoElement.appendChild(title);

    let text = document.createElement('div');
    text.className = 'm-text';
    text.innerText = memo??'';
    text.setAttribute('contenteditable', 'true');
    memoElement.appendChild(text);

    let deleteButton = document.createElement('div');
    deleteButton.className = 'm-delete';
    deleteButton.innerText = 'M';
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(`memo${i}`);
        memoElement.remove();

        document.querySelectorAll('.memo').forEach(memo => {
            let memoNum = +memo.getAttribute('data-num')
            if(memoNum > i){
                memo.setAttribute('data-num', memoNum - 1);
                memo.querySelector('.m-title').innerText = `memo${memoNum-1}`;
                memo.querySelector('.m-text').innerText = getLocalStorage(`memo${memoNum}`);
                setLocalStorage(`memo${memoNum-1}`, getLocalStorage(`memo${memoNum}`));
            }
        });
        
        numberOfMemo = +numberOfMemo - 1;
        setLocalStorage("numberOfMemo", +numberOfMemo);
    });
    memoElement.appendChild(deleteButton);

    memoElement.addEventListener('input', ele => {
        setLocalStorage(`memo${i}`, document.getElementById(`memo${i}`).querySelector('.m-text').innerText);
    });

    return memoElement;
}
function memoAddCreate(){
    const memoAdd = document.createElement('div');
    memoAdd.className = 'm-add';
    memoAdd.id = 'memoAdd';
    memoAdd.innerText = '+';
    memoAdd.addEventListener('click', () => {
        memoAdd.remove();
        numberOfMemo = +numberOfMemo + 1;
        setLocalStorage("numberOfMemo", +numberOfMemo);
        let memoElement = memoCreate('', numberOfMemo);
        document.querySelector('#memos').appendChild(memoElement);  
        let memoAdd2 = memoAddCreate();
        document.querySelector('#memos').appendChild(memoAdd2);
    })
    return memoAdd;
}

//#endregion
//#region tools
let input
let words = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ']
function Toggle(){
    switch(document.querySelector('#ToggleButton').textContent){
        case 'more':
            document.querySelector('#ToggleButton').textContent = 'less'
            words = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ'];
            break
        case 'less':
            document.querySelector('#ToggleButton').textContent = 'more'
            words = ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ','ァ','ィ','ゥ','ェ','ォ','ッ','ャ','ュ','ョ','ー'];
            break
    }
}
function Activate(){
    input = document.querySelector('#Input').value
    if(input == ''||input <= 0){document.querySelector('#OutPut').textContent = '死ね'}
    else{
    let output = [];
    document.querySelector('#OutPut').innerHTML = ''
    for(let i = 0; i < 10; i++){
        for(let i = 0; i < input; i++){
            output.push(words[Math.floor(Math.random() * words.length)])
        }
        document.querySelector('#OutPut').innerHTML += output.join('')+'<br>';
        output = [];
    }
    }
}
//HensatiSagasuYatu = HEN
let HENpoint = 0;
let HENave = 0;
let HENx = 0;
let HENy = 0;
let HENanswer = 0;
function  HENsum(){
    HENpoint = document.getElementById("HENPoint").value;
    HENave = document.getElementById("HENAve").value;
    HENx = HENpoint - HENave;
    HENy = HENx / 18 * 10; //18の部分は変更可能。得点分布だから一点集中なら1とかなんじゃないかな
    HENanswer = Math.floor(HENy + 50);
    document.getElementById("HENAnswer").textContent = '偏差値は' + HENanswer + 'です';
}
//CountGame = COUNT
let COUNTx = 0;
let COUNTope = 0;
let COUNTgamebar = 0;
const COUNTgamebars = ['##@','####@','######@','########@','##########@','############@','##############@'];
const COUNTTips = ['パン工場〜','だから愛だよ','ひとえに、愛だよ','うにょ〜ん','異議あり!','ウロボロスの弟、ウヌボロス','もろたで四輪工藤','小籠包と小論文のハーフ、ショウロンプォゥン','なんだかすごそう建武の新政',"しのごの言わずにoh no, you know it's a pizza"];
function COUNTGameStart(){
    COUNTgamebar = COUNTgamebars[Math.floor(Math.random() * COUNTgamebars.length)];
    document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
    document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
    COUNTx = COUNTgamebar.length - 1;
    document.getElementById("COUNTLog").textContent = 'gamestart!今回は' + COUNTx + 'の長さです!!';
    COUNTope = 1;
}
async function COUNTMove1(){
    if(COUNTope == 1){
    COUNTope = 0;
    document.getElementById("COUNTButton").innerHTML = '';
    document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
    if (COUNTgamebar.length == 1){
    COUNTGameOver();
    COUNTope = 0;
    } else {
        COUNTgamebar = COUNTgamebar.slice( 1 );
        document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
        COUNTx -= 1;
        document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
        await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
        COUNTope = 1;
        document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
    }
    }
    }
async function COUNTMove2(){
    if(COUNTope == 1){
    COUNTope = 0;
    document.getElementById("COUNTButton").innerHTML = '';
    if (COUNTgamebar.length == 1){
    COUNTope = 0;
    COUNTGameOver();
    } else {
    COUNTgamebar = COUNTgamebar.slice( 1 );
    document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
    COUNTx -= 1;
    document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
    await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
    if (COUNTgamebar.length == 1){
        COUNTope = 0;
        COUNTGameOver();
    } else {
        COUNTgamebar = COUNTgamebar.slice( 1 );
        document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
        COUNTx -= 1;
        document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
        await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
        COUNTope = 1;
        document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
        }
    }
    }
    }
function COUNTGameOver(){
    document.getElementById("COUNTLog").textContent = 'gameover!';
    document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTGameReset()">reset</button>';
    }
function COUNTGameReset(){
    document.getElementById("COUNTGameBar").textContent = '';
    document.getElementById("COUNTLog").textContent = COUNTTips[Math.floor(Math.random() * COUNTTips.length)];
    document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTGameStart()">start</button>';
    COUNTx = 0;
    }
//RaceGame = RACE
let RACEgamenow = 0;
let RACEtimer = 0;
let RACEnumber = ['one', 'two', 'three', 'four'];
let RACEtime = {
    one: 1000,
    two: 1000,
    three: 1000,
    four: 1000
};
let RACEloc = {
    one: 0,
    two: 0,
    three: 0,
    four: 0
};
let RACEgamebar = {
    one: ['@', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '='],
    two: ['@', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '='],
    three: ['@', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '='],
    four: ['@', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '=', '='],
};
let RACEcode = {
    one: 0,
    two: 0,
    three: 0,
    four: 0
};
let RACEcodelist = {
    one: ['a', 'a', 'a', 'a', 'e', 'b', 'b', 'c'],//最善の策(?)
    two: ['a', 'a', 'a', 'a', 'a', 'b', 'b', 'b'],//慎重者の指輪
    three: ['e', 'e', 'b', 'b', 'b', 'b', 'c', 'c'],//大博打
    four: ['a', 'a', 'a', 'a', 'b', 'b', 'd', 'd'] //害悪鳥
}; // a..前進 b..後退 c..スタン(自分) d..スタン(!自分) e..加速
let RACEstanother = {
    one: 0,
    two: 0,
    three: 0,
    four: 0
};

function delay(ms) {return new Promise(resolve => setTimeout(resolve, ms));}//awaitのやつ

function RACEtekiou(){
    document.querySelector('#RACEoutput-one').textContent   = RACEgamebar['one'].join('');
    document.querySelector('#RACEoutput-two').textContent   = RACEgamebar['two'].join('');
    document.querySelector('#RACEoutput-three').textContent = RACEgamebar['three'].join('');
    document.querySelector('#RACEoutput-four').textContent  = RACEgamebar['four'].join('');
}
function RACEmove(num, code) {
    switch (code) {
        case 'a':
            RACEgamebar[num][RACEloc[num]] = '=';
            RACEgamebar[num][RACEloc[num] + 1] = '@';
            break;
        case 'b':
            if (RACEloc[num] > 0) {
                RACEgamebar[num][RACEloc[num]] = '=';
                RACEgamebar[num][RACEloc[num] - 1] = '@';
            }
            break;
        case 'c':
            RACEgamebar[num][RACEloc[num]] = '=';
            RACEgamebar[num][RACEloc[num] + 3] = '@';
            break;
    }
}

function RACEbarup(num, angle) {
    RACEloc[num] = RACEgamebar[num].indexOf('@');
    if (angle == 1) {
        RACEmove(num, 'a');
    } else if (angle == 2) {
        RACEmove(num, 'b');
    } else if (angle == 3) {
        RACEmove(num, 'c');
    }
    RACEtekiou();            
    if (RACEgamebar[num].indexOf('@') == RACEgamebar[num].length - 1) {
        RACEgamenow = 0;
        document.querySelector('#RACElog').textContent = num + 'の勝利！！わーー！！！';
    }
}

async function RACEgamestart() {
    RACEgamenow = 1;
    RACEbarup('one', 0); RACEbarup('two', 0); RACEbarup('three', 0); RACEbarup('four', 0);
    RACEtimer = 3;
    document.querySelector('#RACElog').textContent = RACEtimer;
    await delay(300);
    RACEtimer = 2;
    document.querySelector('#RACElog').textContent = RACEtimer;
    await delay(300);
    RACEtimer = 1;
    document.querySelector('#RACElog').textContent = RACEtimer;
    await delay(300);
    RACEtimer = 'Start!';
    document.querySelector('#RACElog').textContent = RACEtimer;
    await delay(300);
    RACEtimer = 0;
    document.querySelector('#RACElog').textContent = '';
    RACELoopct = setInterval(RACEchangerandom, 100); // ゲーム終了時に処理を止める用
    await delay(500);
    RACEgameloop('one'); RACEgameloop('two'); RACEgameloop('three'); RACEgameloop('four');
}

async function RACEgameloop(num) {
    if (RACEgamenow == 1) {
        RACEcode[num] = RACEcodelist[num][Math.floor(Math.random() * RACEcodelist[num].length)];//いつものランダムのやつ
        switch (RACEcode[num]) {
            case 'a':
                RACEbarup(num, 1);
                break;
            case 'b':
                RACEbarup(num, 2);
                break;
            case 'c':
                RACEgamebar[num][RACEgamebar[num].indexOf('@')] = '囧';
                RACEtekiou();
                await delay(1000);
                RACEgamebar[num][RACEgamebar[num].indexOf('囧')] = '@';
                RACEtekiou();
                break;
            case 'd':
                await RACEstanOthers(num);
                break;
            case 'e':
                RACEbarup(num, 3);
                break;
        }
        if (RACEstanother[num] == 1) return;
        setTimeout(() => RACEgameloop(num), RACEtime[num]);
    }
}

function RACEchangerandom() {
    RACEtime.one = Math.floor(Math.random() * 1000) + 500; // 500~1500
    RACEtime.two = Math.floor(Math.random() * 1000) + 500; // 500~1500
    RACEtime.three = Math.floor(Math.random() * 1000) + 500; // 500~1500
    RACEtime.four = Math.floor(Math.random() * 1000) + 500; // 500~1500
    RACEloc['one'] = RACEgamebar['one'].indexOf('@');
    RACEloc['two'] = RACEgamebar['two'].indexOf('@');
    RACEloc['three'] = RACEgamebar['three'].indexOf('@');
    RACEloc['four'] = RACEgamebar['four'].indexOf('@');
}

async function RACEstanOthers(num) {
    let others = RACEnumber.filter(n => n !== num);
    RACEstanother[others[0]] = 1;
    RACEstanother[others[1]] = 1;
    RACEstanother[others[2]] = 1;
    document.querySelector('#RACElog').textContent = 'スタンしています！';
    await delay(1500);
    RACEstanother[others[0]] = 0;
    RACEstanother[others[1]] = 0;
    RACEstanother[others[2]] = 0;
    document.querySelector('#RACElog').textContent = '';
    RACEgameloop(others[0]);
    RACEgameloop(others[1]);
    RACEgameloop(others[2]);
}
//RengaGame = RG
let count = 0;
let startTime;
let duration = 5000;
document.querySelector('#start-btn').addEventListener('click', () => {
    count = 0;
    startTime = Date.now();
    document.querySelector('#result').textContent = 'pless Enter(nandomo)';
    document.querySelector('#start-btn').style.display = 'none';
    document.addEventListener('keyup', countRensha);
    setTimeout(() => {
        document.removeEventListener('keyup', countRensha);
        document.querySelector('#result').textContent = `結果: ${count} 回`;
        document.querySelector('#start-btn').style.display = 'block';
    }, duration);
});
function countRensha(event) {if (event.key === 'Enter') {count++;}}
function RENDAchange(time) {
    document.getElementById(`RENDABUTTON${duration}`).style.color = '#000000';
    document.getElementById(`RENDABUTTON${time}`).style.color = '#23aa23';
    duration = time;
}
//CookingGame = CG
let CGx = 0;
let CGy = 0;
let CGAllow = 0;
let CGArea = document.querySelector('#CookingGameArea');
let CGList = document.querySelector('#CookingGameList');
let CGLog = document.querySelector('#CookingGameLog');
let CGStart = document.querySelector('#CookingGameStart');
let CGListArray = [];
let CGListArrayAppear = [];
let CGListArrays = [
    ['1','4','2','3','5','4','2','3','4','6'],
    ['3','6','4','2','5','5','6','1','3','2'],
    ['2','1','3','5','4','3','5','6','2','4'],
    ['5','4','6','3','2','2','3','5','6','1'],
    ['6','3','5','1','4','1','5','3','4','2'],
    ['4','2','1','6','3','6','1','4','3','5'],
    ['5','6','3','4','2','4','3','6','5','1'],
    ['3','5','6','2','1','2','6','5','3','4']
];

CGArea.style.display = 'none';
async function Start(){
    CGStart.style.display = 'none'
    CGArea.style.display = 'block'
    CGListArray = CGListArrays[Math.floor(Math.random() * CGListArrays.length)]
    CGListArrayAppear = ['0','0','0','0','0','0','0','0','0','0']
    let firstHalf = CGListArrayAppear.slice(0, CGListArrayAppear.length / 2);
    let secondHalf = CGListArrayAppear.slice(CGListArrayAppear.length / 2);
    CGList.innerHTML = firstHalf.join(',') + '<br>' + secondHalf.join(',');
    CGx = 0;CGy = 0;
    CGLog.textContent = '色付いたやつを覚えてね〜？';
    for(nanka of CGListArray){
        document.querySelector('#CookingGameChoose-' + nanka).style.backgroundColor = 'yellow';
        await delay(800);
        document.querySelector('#CookingGameChoose-' + nanka).style.backgroundColor = 'aliceblue';
    }
    CGLog.textContent = 'じゃ〜〜〜ど〜ぞ！';
    CGAllow = 1

}
function CookingGameChoeese(num){
    if(CGAllow == 1){
        if(CGListArray.indexOf(num) >= 0){
        CGx = CGListArray.indexOf(num);
        CGListArray[CGx] = '0';
        CGListArrayAppear[CGx] = num;
        let firstHalf = CGListArrayAppear.slice(0, CGListArrayAppear.length / 2);
        let secondHalf = CGListArrayAppear.slice(CGListArrayAppear.length / 2);
        CGList.innerHTML = firstHalf.join(',') + '<br>' + secondHalf.join(',');
        CGLog.textContent = 'ナーイス！！';
    } else {
        CGLog.innerHTML = `あいミス〜〜〜〜〜乙〜〜〜〜〜〜〜〜〜<br>あ、これ答えね(0は正解したとこ)<br>${CGListArray.join(',')}`;
        CGAllow = 0;
    }
    }
}
//#endregion
//#region profile
document.querySelector('#profile .icon').addEventListener("click", () => {
    document.querySelector('#profile .fileInput').click();
});
document.querySelector('#profile .fileInput').addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file){return;}

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = async () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const size = 100;
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0, size, size);

            // Base64エンコード（PNG形式）
            const base64String = canvas.toDataURL("image/png");

            // Realtime Databaseに保存
            firebase.database().ref(`users/${username}/icon`).set(base64String);

            document.querySelector('#profile .icon').src = base64String;
        };
    };
});

//#endregion
