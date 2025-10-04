//#region Login
async function homeLogin(){
    console.log('home「ログインされたで」')
    moveAnotherDimension();
    firebase.database().ref(`users/${username}/icon`).once("value").then((snapshot) => {
        const img = document.querySelector('#profile .icon');
        if(snapshot.exists()){
            img.src = snapshot.val();
        }else{
            img.src = 'assets/sozais/none.png';
        }
    })

    
    let noticesRef = database.ref('kari/notices');
    let firebaseData = await noticesRef.once('value');
    let firebaseResults = firebaseData.exists() ? Object.values(firebaseData.val()) : [];
    let localResults = noticeData;
    let combinedResults = [...firebaseResults, ...localResults];

    NList.innerHTML = '';
    combinedResults.forEach(noti => {
        let item = makeNotice(noti);
        NList.appendChild(item);
    });

    noticesRef.on('child_added', (snapshot) => {
        let noti = snapshot.val();
        let item = makeNotice(noti);
        let existing = document.querySelector(`#notice .list .item[data-key="${snapshot.key}"]`);
        if(existing){
            console.log("重複を確認");
            return;
        }
        NList.appendChild(item);
    });     
}

function homeLogout(){
    console.log('home「ログアウトされたで」')
    document.querySelector('#profile .icon').src = 'assets/sozais/none.png';
}
//#endregion


//#region upperUIとsideMenu
const upperUI = document.querySelector('#upperUI');

const menuToggle = document.querySelector('#menuToggle');
const sideMenu = document.querySelector('#sideMenu');
menuToggle.addEventListener('click', () => {
    if(sideMenu.style.left === '0px'){
        sideMenu.style.left = '-255px';
    }else{
        sideMenu.style.left = '0px';
    }
});

document.querySelector(".smart-phone").addEventListener("click", function () {
    document.querySelectorAll(".smart-icon:not(.smart-phone)").forEach(icon => {
        icon.classList.toggle("hidden");
    });
});


let cpopup = document.querySelector('#cpopup');
let cpopupNow = 0;
document.querySelectorAll('.hastxt').forEach((element) => {
    addEventListener('click', (event) => {
        element.addEventListener('click', (event) => {
            if(cpopupNow == 0){
                let name = event.target.getAttribute('data-name');
                console.log(name+'が発動しましたぜぇい')
                fetch(`assets/txts/${name}.txt`)
                .then(response => response.text())
                .then(data => {cpopup.innerText = data;})
                .catch(error => console.error('Error:', error));
                cpopup.style.display = 'block';
                cpopupNow = 1;
            }else{
                cpopup.innerHTML = '';
                cpopup.style.display = 'none';
                cpopupNow = 0;
            }
        })
    })
})

//change-font
function changeFont(){
    document.querySelector('#body').style.fontFamily = document.querySelector('#font-select').value;
}

//toggle
document.querySelectorAll('.toggles').forEach((element) => {
    element.addEventListener('change', (event) => {
        if(event.target.checked){
            document.getElementById(event.target.getAttribute('data-name')).style.display = 'block';
        }else{
            document.getElementById(event.target.getAttribute('data-name')).style.display = 'none';
        }
    })
})

//#endregion
//#region tabs
const Tabs = {
    'Home':{
        'home':{
            name:'home',
            initial:1,
        },
        'memo':{
            name:'memo',
            initial:0,
        },
        'tools':{
            name:'tools',
            initial:0,
        },
        'profile':{
            name:'profile',
            initial:0,
        }
    },

    'Commu':{
        'nanj':{
            name:'nanj',
            initial:1,
        },
        'twitter2':{
            name:'twitter2',
            initial:0,
        },
        'jine':{
            name:'jine',
            initial:0,
        }
    },

    'Anonymous':{
        'question':{
            name:'question',
            initial:1,
        },
    },

    'Study':{
        'en':{
            name:'en',
            initial:1,
        },
        'tips':{
            name:'tips',
            initial:0,
        }
    },

    'Pixelen':{
        'books':{
            name:'books',
            initial:1,
        }
    }
}

document.addEventListener('click', ele => {
    if(ele.target.classList.contains('tab')){
        let doko = Tabs[ele.target.dataset.doko]
        let key = ele.target.dataset.name
        Object.keys(doko).forEach(tab => {
            document.getElementById(tab).style.display = 'none';
            document.getElementById(`${tab}-tab`).src = `assets/icons/${doko[tab].name}2.png`;
            Tabs[ele.target.dataset.doko][tab].initial = 0;
        })
        document.getElementById(ele.target.dataset.name).style.display = 'block';
        ele.target.src = `assets/icons/${key}1.png`;
        Tabs[ele.target.dataset.doko][key].initial = 1;
    }
})

//#endregion
//#region dimension
document.querySelectorAll('.c-dimension').forEach(ele => {
    ele.addEventListener('click', () => {
        doko = ele.dataset.doko;
        document.querySelectorAll('.tab').forEach(tab => {tab.remove()})
        moveAnotherDimension();
    })
})
function moveAnotherDimension(){
    Object.keys(Tabs).forEach(d => {
        document.getElementById(d).style.display = 'none';
    })
    Object.keys(Tabs[doko]).forEach(tab => {
        const tabElement = document.createElement("img");
        tabElement.className = "tab";
        tabElement.id = `${tab}-tab`;
        if(Tabs[doko][tab].initial == 1){
            tabElement.src = `assets/icons/${Tabs[doko][tab].name}1.png`
        }else{
            tabElement.src = `assets/icons/${Tabs[doko][tab].name}2.png`;
        }
        tabElement.dataset.doko = doko;
        tabElement.dataset.name = Tabs[doko][tab].name;
        document.getElementById("tabs").appendChild(tabElement);
    })
    document.getElementById(doko).style.display = 'block';
}
//#endregion
//#region wingdings特殊機構のお話
let wdnow = 0;
document.querySelector('#wdcheck').addEventListener('click', () => {
if(wdnow == 0){
wdnow = 1;
document.querySelectorAll('.wd').forEach(element => {
element.style.display = 'inline';
})
}else{
wdnow = 0;
document.querySelectorAll('.wd').forEach(element => {
element.style.display = 'none';
})
}
})
//#endregion

//#region expとか
let exp = 0;
let level = 1;
let maxexp = 50;
let euro = 0;
let expbar = document.querySelector('#exp');
let exptext = document.querySelector('#exptext');
let overHiraku = () => {location.href = 'over.html'};
expbar.addEventListener('click', overHiraku);
exptext.addEventListener('click', overHiraku);
function updateUI(){
    if(exp >= maxexp){
        exp -= maxexp;
        level += 1;
        maxexp += 25;
    }
    expbar.style.width = `${exp/maxexp*100}%`;
    exptext.innerText = `${exp}/${maxexp}`
    document.querySelector('#Username').textContent = username;
    document.querySelector('#Level').textContent = `Lv:${level}`;
    document.querySelector('#Euro').textContent = `${euro}€`;
}
function save(){
    usersRef.update({
        level:level,
        exp:exp,
        euro:euro
    })
}
//#endregion
//#region login-bonus
document.querySelector('#login-bonus').addEventListener('click', () => {
    let now = new Date();
    let day = String(now.getDate()).padStart(2, '0');

    usersRef.once('value', snapshot => {
        let data = snapshot.val();
        console.log(`今までのログイン[${data.logined??'何もないよ（笑)'}]に${day}は入ってるかな〜？`); //ラッキースターは誰かな〜？
        
        if(!data.logined || day == 1){
            usersRef.update({
                logined: [day],
                continued: 1
            })
            console.log('今月初のログインらしい')
            loginBonus(1);
        }else{
            if(!data.logined.includes(day)){
                let last = data.logined.slice(-1)[0];
                if(last == day - 1){
                    data.continued += 1;
                }else{
                    data.continued = 1;
                }
                data.logined.push(day);
                usersRef.update({
                    logined: data.logined,
                    continued: data.continued
                })   
                console.log('受け取れたね、めでたいね')
                loginBonus(data.continued);
            }else{
                nicoText(`受取済みやで！！`);
            }
        }
    })
})
const LoginBonuses = [50,80,100,150,200,250,300]
function loginBonus(continued){
    let bonus
    if(continued < 7){
        bonus = LoginBonuses[continued-1];
    }else{
        bonus = LoginBonuses[6];
    }
    euro += bonus;
    nicoText(`連続ログイン${continued}回目`)
    nicoText(`ログインボーナス！${bonus}€をゲットだぜ！！！`);
    updateUI();
    save();
}
//#endregion
//#region notice
const Notice = document.querySelector('#notice');
const NList = document.querySelector('#notice .list');
const NShow = document.querySelector('#notice .show');
const NX = document.querySelector('#notice .x');
function makeNotice(noti){
    let item = document.createElement('div');
    item.className = 'item';
    item.innerText = noti.title;
    item.setAttribute('data-key', noti.key);
    item.addEventListener('click', () => {
        NList.style.display = 'none';
        NShow.style.display = 'block';
        NShow.querySelector('.title').innerText = noti.title;
        NShow.querySelector('.body').innerText = noti.body;
    });
    return item;
}
document.querySelector('#notice-button').addEventListener('click', () => {
    Notice.style.display = 'block';
    NList.style.display = 'block';
    NShow.style.display = 'none';
    NX.style.display = 'block';
})
document.querySelector('#notice .x').addEventListener('click', () => {
    Notice.style.display = 'none';
    NList.style.display = 'block';
    NShow.style.display = 'none';
    NX.style.display = 'none';
})
document.querySelector('#notice .show .back').addEventListener('click', () => {
    NList.style.display = 'block';
    NShow.style.display = 'none';
    NX.style.display = 'block';
})
//#endregion


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
            href: 'https://memo.onl.jp/?Koppepan23',
            iframable:0,
            description: '昔使ってたところ。<br>今はmemo.html使ってるけどね'
        },
        'fileWeb': {
            id: 'fileWeb',
            name: 'ファイルweb',
            href: 'https://file.onl.jp/?Koppepan23',
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
            href: 'https://koppepan-orange.github.io/game-site/home.html',
            iframable:1,
            description: 'ゲームができるサイト<br>まじで楽しい<br>clicker-of-mugenはおすすめ<br>cardは未完成だけど絵見て欲しい'
        },
        'musicSite': {
            id: 'musicSite',
            name: 'music-site',
            href: 'https://koppepan-orange.github.io/test-site/music.html',
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
//#region home-memoのお話
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
//#region iframeのお話

let NowLinkframe = 1;
function LinkframeGo(){
    document.getElementById(`Linkframe${NowLinkframe}`).setAttribute('data-src', document.getElementById("LinkInput").value);
    document.getElementById(`Linkframe${NowLinkframe}`).src = document.getElementById("LinkInput").value;
    nicoText('うぇいとふぉあな〜う'); //好きな言葉ランキング上位"wait for now"
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

document.querySelector('#linkSite .full').addEventListener('click', event => {
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


    
    
    
    
    
    
    

});

//#region memo
const bodyTextarea = document.querySelector('#memo .text');
const titleInput = document.querySelector('#memo .title');
const searchButton = document.querySelector('#memo .search');

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



//#endregion

//#region tools

//#region まだ初心者だったころの。要改善
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
