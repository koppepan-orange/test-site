//#region komagome
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
};
async function nicoText(mes){
    const newDiv = document.createElement('div');
    newDiv.textContent = mes;
    newDiv.className = 'nicotext';
    newDiv.style.top = `calc(${random(0, 100)}vh - 20px)`;
    newDiv.style.right = '0px';
    document.querySelector('body').appendChild(newDiv);

    requestAnimationFrame(() => {
    newDiv.style.right = `${window.innerWidth + newDiv.offsetWidth}px`; //なんか電車の問題解いてるみたいだね
    });
    
    await delay(2000); 
    newDiv.remove();
};
function kaijou(num){
    if(num == 0) return 0;
    if(num == 1) return 1;
    return num * kaijou(num - 1);
}
function arraySelect(array){
    let select = Math.floor(Math.random()*array.length);
    return array[select];
};
function arrayShuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
    const i2 = Math.floor(Math.random() * (i + 1));
    [array[i], array[i2]] = [array[i2], array[i]];
    }
    return array;
};
function arraySize(array){
    let res = new Set(array).size;
    return res;
};
function arraycountCnt(array){
    const counts = {};
    for (let value of array) {
    counts[value] = (counts[value] || 0) + 1;
    }
    return counts;
}
function arrayMult(array){
    return array.reduce((a, v) => a * v, 1);
}
function arrayGacha(array,probability){
    if(array.length != probability.length) throw new Error("長さがあってないっす！先輩、ちゃんとチェックした方がいいっすよ〜？");
    const total = probability.reduce((sum, p) => sum + p, 0);
    let random = Math.random() * total;
    for (let i = 0; i < array.length; i++) {
        if(random < probability[i]) return array[i];
        random -= probability[i];
    }
};
function hask(obj, key){
    let res = obj.hasOwnProperty(key);
    res = res ? 1 : 0;
    return res;
}
function copy(moto) {
    if(Array.isArray(moto)){
        let arr = [];
        for (let i = 0; i < moto.length; i++) {
            arr.push(copy(moto[i]));
        }
        return arr;
    }
    else if(moto != null && typeof moto == 'object'){
        let obj = {};
        for (let key in moto) {
            if (moto.hasOwnProperty(key)) {
            obj[key] = copy(moto[key]);
            }
        }
        return obj;
    }
    else {
        return moto;
    }
}
function probability(num){
    return Math.random()*100 <= num;
    //例:num == 20 → randomが20以内ならtrue,elseならfalseを返す
};
function random(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(num);
};
function fl(val, arr = [0, 1]){
    let res = val == arr[0] ? arr[1] : arr[0];
    return res;
}

function anagramSaySay(text, loop = 10, bet = '<br>'){
    let menjo = 0;
    let len = text.length;
    if(len < 4) menjo = 1, console.log('長さが3以下なんで最大6っす');
    
    let optout = text.split('');
    let optcou = arraycountCnt(optout);
    let optvals = [];
    for(a of Object.keys(optcou)){
        let b = optcou[a];
        b = kaijou(b);
        optvals.push(b);
    }
    let optmat = arrayMult(optvals);
    let cal = (kaijou(len) / optmat) - 1;

    let loopen = loop;
    console.log(`総数:${cal} 回数:${loopen}`);
    if(cal < loopen) menjo = 1;
    
    let reses = [];
    while(loopen > 0){
        loopen -= 1;
        let res = arrayShuffle(optout).join(''); 
        if(reses.includes(res)){loopen += 1; continue}
        
        if(res == text && !menjo){loopen += 1; continue;}

        if(res == text && menjo && reses.length < cal){loopen += 1; continue}
        else if(res == text && menjo) res = '[重複エラー]';

        reses.push(res);
    }
    
    return reses.join(bet);
}
function setLocalStorage(name, value) {
    localStorage.setItem(name, value || "");
}
function getLocalStorage(name) {
    return localStorage.getItem(name);
}
let r = {
    and: function(lef, rig){
        if(lef && rig) return 1
        return 0
    },
    or: function(lef, rig){
        if(lef || rig) return 1
        return 0
    },
    xor: function(lef, rig){
        console.log('排他的論理和発動！！')
        let l = lef ? 1 : 0
        let r = rig ? 1 : 0
        if(l != r) return 1
        return 0
    },
    not: function(lef){
        if(lef) return 0
        return 1
    },
    nand: function(lef, rig){
        if(lef && rig) return 0
        return 1
    },
    nor: function(lef, rig){
        if(lef || rig) return 0
        return 1
    },
    xnor: function(lef, rig){
        console.log('逆排他的論理和発動！！')
        let l = lef ? 1 : 0
        let r = rig ? 1 : 0
        if(l != r) return 0
        return 1
    }
}
async function error(){
    addtext('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    await delay(2000);
    // window.open('about:blank', '_self').close();
}
function hoshoku(color) {
    color = color.replace(/^#/, ''); // #付きなら取る

    if(color.length != 6) return console.log('カラーコードは6桁、ですよ〜？楽しないでくださいね〜♪')

    // RGB分解
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    // 補色：255から引く
    const compR = (255 - r).toString(16).padStart(2, '0');
    const compG = (255 - g).toString(16).padStart(2, '0');
    const compB = (255 - b).toString(16).padStart(2, '0');

    return `#${compR}${compG}${compB}`;
}
function mixshoku(c1, c2, ratio = 0.5) {
    const toRGB = c => {
        c = c.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const n = parseInt(c, 16);
        return [n >> 16, (n >> 8) & 255, n & 255];
    };

    const [r1, g1, b1] = toRGB(c1);
    const [r2, g2, b2] = toRGB(c2);

    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);

    return (
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
    );
}
//#endregion
//#region log&text
let textDiv = document.querySelector('#text');
let autoDelay = 1;
let skipText = false; // スキップフラグ
let clearText = false; // テキスト消去フラグ
let textShowing = 0;

function colorcheck(rawtext) {
    const text = [];
    let isRed = false; // ** で囲まれた部分かどうか
    let isPink = false; // && で囲まれた部分かどうか
    let isBlue = false; // ^^ で囲まれた部分かどうか

    for(let i = 0; i < rawtext.length; i++){
        if(rawtext[i] == "*" && rawtext[i + 1] == "*"){
            isRed = !isRed; // 状態を切り替える
            i++; // 次の * をスキップ
        }else if(rawtext[i] == "&" && rawtext[i + 1] == "&"){
            isPink = !isPink;
            i++; // 次の & をスキップ
        }else if(rawtext[i] == "^" && rawtext[i + 1] == "^"){
            isBlue = !isBlue;
            i++;
        }else{
            let color = null;
            if(isRed) color = 'red';
            if(isPink) color = 'pink';
            if(isBlue) color = 'blue';
            text.push({
                char: rawtext[i],
                color: color
            });
        }
    }
    return text;
}

let queueAddtext = [];
let loopAddtext = 0;
async function waitforAddtext(){
    let len = queueAddtext.length;

    if(len == 0) loopAddtext = 0;
    else loopAddtext = 1;

    if(!loopAddtext) return console.log('loopがないんでしゅーりょー');
    requestAnimationFrame(waitforAddtext);

    if(textShowing) return console.log('文字表示されたんでスキップ');
    
    let raw = queueAddtext.shift();
    // console.log(`${raw}を送信します`);
    // console.log(`残り: (${len - 1})[${queueAddtext}]`);
    await addtext(raw);
}
async function addtext(raw){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');

    if(textShowing){
        queueAddtext.push(raw);

        if(!loopAddtext) waitforAddtext();
        return;
    }
    
    textShowing = 1;
    text = colorcheck(raw);
    textDiv.innerHTML = ""; // 中身をリセット
    textDiv.style.display = "block"; // 表示
    let index = 0;
    clearText = false; // 消去フラグをリセット

    return new Promise((resolve) => {
        async function type() {
                if (index < text.length) {
                if (skipText) {
                    // スキップ処理
                    while (index < text.length) {
                            const span = document.createElement("span");
                            span.textContent = text[index].char;
                            if (text[index].color) {
                            span.classList.add(`color-${text[index].color}`);
                            }
                            textDiv.appendChild(span);
                            index++;
                    }
                    index = text.length; // 全ての文字を表示済みにする
                    skipText = false;
                    setTimeout(type, 10);
                } else {
                    // 通常の文字表示
                    const span = document.createElement("span");
                    span.textContent = text[index].char;
                    if (text[index].color) {
                            span.classList.add(`color-${text[index].color}`);
                    }
                    textDiv.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
                } else {
                addlog(textDiv.innerHTML);
                const waitTime = autoDelay * 1000;
                const timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                const userAction = new Promise(resolve => {
                    function waitToClear(event) {
                            if (event.type === 'click' || event.key === 'z' || event.key === 'Enter') {
                            document.removeEventListener('click', waitToClear);
                            document.removeEventListener('keydown', waitToClear);
                            resolve();
                            }
                    }
                    document.addEventListener('click', waitToClear);
                    document.addEventListener('keydown', waitToClear);
                });

                Promise.race([timeout, userAction]).then(() => {
                    textDiv.textContent = "";
                    textDiv.style.display = "none";
                    clearText = true;
                    skipText = false
                    textShowing = 0;
                    resolve('end'); // Promiseを解決
                });
                }
        }
        type();
    });
}
document.addEventListener('keydown', (e) => {
    if(e.key === 'z' || e.key === 'Enter'){
        skipText = true;
    }
});

document.addEventListener('keyup', (e) => {
    if(e.key === 'z' || e.key === 'Enter'){
        skipText = false;
    }
});

document.addEventListener('click', () => {
    skipText = true;
    setTimeout(() => skipText = false, 50); // 一時的にスキップを有効化
});

let logOOmoto = document.querySelector('#log');
let log = document.querySelector('#log .log');
let logOpener = document.querySelector('#log .opener');
let log_open = (code) => {
    if((!logOOmoto.classList.contains('tog') || code == 'o') && code != 'c'){
        logOOmoto.classList.add('tog');
        logOpener.textContent = '<';

    }else{
        logOOmoto.classList.remove('tog');
        logOpener.textContent = '>';
    }
}
logOpener.addEventListener('click', log_open);

function addlog(text){
    log.innerHTML += text + '<br>';
    log.scrollTop = log.scrollHeight;
}
//#endregion
//#region description
let movableDescription = document.getElementById('movableDescription');
document.addEventListener('mousemove', (e) => {
    movableDescription.style.left = `${e.clientX + 10}px`;
    movableDescription.style.top = `${e.clientY + 10}px`;
});
document.addEventListener('mouseover', (e) => {
    const descTarget = e.target.closest('[data-description]');
    if (descTarget) {
        const desc = descTarget.dataset.description;
        movableDescription.innerHTML = desc;
        movableDescription.style.display = 'block';
    }
});
document.addEventListener('mouseout', (e) => {
    const descTarget = e.target.closest('[data-description]');
    if (descTarget) {
        movableDescription.innerHTML = '';
        movableDescription.style.display = 'none';
    }
});
//#endregion
//#region draggable
document.addEventListener('mousedown', e => {
    // const descTarget = e.target.closest('[data-description]');
    let div = e.target;
    
    if(!div.classList.contains('draggable')) return;
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;
    
    function onMouseMove(e) {
        div.style.left = `${e.clientX - offsetX}px`;
        div.style.top = `${e.clientY - offsetY}px`;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
//#endregion 
//#region tk
class tk{
    constructor(type, x = 'half', y = 'half', w = window.innerWidth/2, h = window.innerWidth/2){
        let youso = document.createElement(type);
        youso.className = `tk ${type}`;

        let yoko = ['x', 'w'];
        for(let n of yoko){
            if(typeof eval(n) != 'string' || typeof eval(n) == 'string' && !eval(n).endsWith('%')) continue;
            let num = eval(n).slice(0, -1);
            eval(n) = num * window.innerWidth / 100;
        }

        let tate = ['y', 'h'];
        for(let n of tate){
            if(typeof eval(n) != 'string' || typeof eval(n) == 'string' && !eval(n).endsWith('%')) continue;
            let num = eval(n).slice(0, -1);
            eval(n) = num * window.innerHeight / 100;
        }

        console.log(x, y, w, h);

        youso.style.width = `${w}px`;
        youso.style.height = `${h}px`;

        youso.style.left = `${x}px`;
        youso.style.top = `${y}px`;
        
        if(x == 'half' && y == 'half') youso.classList.add('cenXY');
         else if(x == 'half') youso.classList.add('cenX');
         else if(y == 'half') youso.classList.add('cenY');

        this.youso = youso;
    };

    attrAdd(dict = 'none'){
        if(dict == 'none') return;
        
        if(typeof dict == 'string'){
            //attr: nanka
            let [key, val] = dict.split(':');
             key = key.trim();
             val = val.trim();
            this.youso.setAttribute(key, val);
            return 0;
        }

        if(typeof dict != 'object') return 1;

        for(let key in dict) this.youso.setAttribute(key, dict[key]);

        return 0;
    }

    styleAdd(dict){
        for(let key in dict) this.youso.style[key] = dict[key];
    }

    classAdd(name){this.youso.classList.add(name)};
    classRem(name){this.youso.classList.remove(name)};
    classTog(name){this.youso.classList.toggle(name)};
    classHas(name){
        let is = this.youso.classList.contains(name);
        return is;
    }

    evAdd(type, func){
        this.youso.addEventListener(type, func);
    }

    yousoAdd(youso){
        this.youso.appendChild(youso);
    }

    append(){
        document.body.appendChild(this.youso);
    };

    remove(){
        this.youso.remove();
    };
}

function tkTest(){
    let mono = new tk('div', 'half', 'half');
    mono.classAdd('draggable');
    mono.styleAdd({background: '#f0f8ff'});

    let mono2 = new tk('div', 'half', 'half');
    mono2.styleAdd({background: '#cfe9ff'});

    mono.yousoAdd(mono2.div);

    mono.evAdd('click', function(){
        nicoText('clicked');
    });

    mono.append();
}

//#endregion
//#region observer
let keys = {}
document.addEventListener('keydown', e => {
let key = e.key.toLowerCase();
if(e.key == ' ') key = 'space';
keys[key] = true;
});
document.addEventListener('keyup', e => {
let key = e.key.toLowerCase();
if(e.key == ' ') key = 'space';
keys[key] = false;
});

let clicking = false;
document.addEventListener('mousedown', () => clicking = true);
document.addEventListener('mouseup', () => clicking = false);
//#endregion


//#region 文字数カウント
let countD = document.querySelector('#main .textcount');
let countC = {
    inI: countD.querySelector('.in'),
    outD: countD.querySelector('.out')
}
countC.inI.addEventListener('input', () => {
    let text = countC.inI.value;
    let count = text.length;
    let size = arraySize(text.split(''))
    countC.outD.textContent = `文字数${count} 種類${size}`;
});
//#endregion

//#region アナグラム生成器
let anagD = document.querySelector('#main .anagram');
let anagC = {
    inD: anagD.querySelector('.in'),
    outD: anagD.querySelector('.out'),
    senD: anagD.querySelector('.send')
}
anagC.senD.addEventListener('click', () => {
    let text = anagC.inD.value;
    let res = anagramSaySay(text, 10, '<br>');
    anagC.outD.innerHTML = res;
});
//#endregion

//#region 偏差値計算するやつ
let henC = {
    valI: document.querySelector('#main .hen .input'),
    aveI: document.querySelector('#main .hen .average'),
    outI: document.querySelector('#main .hen .output'),
};
let henF = {};
henF.process = () => {
    let [val, ave] = [+henC.valI.value, +henC.aveI.value];
    if(isNaN(val) || isNaN(ave)) return 1;
    let bun = 18; //これは変更可能。得点分布だから一点集中なら1とかなんじゃないかな
    let res = Math.round(((val-ave) / bun*10) + 50)

    henC.outI.value = res;
    return 0;
}
henC.valI.addEventListener('input', henF.process);
henC.aveI.addEventListener('input', henF.process);
//#endregion

//#region カタカナランダム言葉生成器
let rannmD = document.querySelector('#main .rannm');
let rannmC = {
    togB: rannmD.querySelector('.toggle'),
    tog: 'stan',
    togL: [
        {
            name: 'stan',
            color: '#b5d9ff',
            desc: 'もっともオーソドックス',
            words: ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ']
        },
        {
            name: 'more',
            color: '#ffddcc',
            desc: '切れ音や長音、小文字を含むやつ',
            words: ['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト','ナ','ニ','ヌ','ネ','ノ','ハ','ヒ','フ','ヘ','ホ','マ','ミ','ム','メ','モ','ヤ','ユ','ヨ','ラ','リ','ル','レ','ロ','ワ','ヲ','ン','ガ','ギ','グ','ゲ','ゴ','ザ','ジ','ズ','ゼ','ゾ','ダ','ヂ','ヅ','デ','ド','バ','ビ','ブ','ベ','ボ','パ','ピ','プ','ペ','ポ','ァ','ィ','ゥ','ェ','ォ','ッ','ャ','ュ','ョ','ー'] 
        },
    ],

    actB: rannmD.querySelector('.active'),
    inpI: rannmD.querySelector('.input'),
    outD: rannmD.querySelector('.output'),
    ove: 0,
    oveB: rannmD.querySelector('.over'),
}
rannmC.togB.addEventListener('click', () => {
    let val = rannmC.togB.textContent;
    let arr = rannmC.togL.map(a => a.name);
    // console.log(arr);
    let valn = arr.indexOf(val);
    let ele = rannmC.togL[valn];
    let nexn = (valn + 1) % rannmC.togL.length;
    let nexele = rannmC.togL[nexn];

    rannmC.tog = nexele.name;
    rannmC.togB.textContent = nexele.name;
    rannmC.togB.style.backgroundColor = nexele.color;
    rannmC.togB.setAttribute('data-description', nexele.desc);
})
rannmC.oveB.addEventListener('click', () => {
    // console.log(`${rannmC.ove} => ${fl(rannmC.ove)}`);
    rannmC.ove = fl(rannmC.ove);
    if(rannmC.ove == 1) rannmC.oveB.style.backgroundColor = '#a2ffa8';
    if(rannmC.ove == 0) rannmC.oveB.style.backgroundColor = '#c4c4c4';
})
rannmC.actB.addEventListener('click', () => {
    let ele = rannmC.togL.find(a => a.name == rannmC.tog);
    let words = ele.words;
    let val = rannmC.inpI.value
    if(val == '' || val <= 0) return nicoText('スーパーマリオさんしね');

    let outputs = [];
    rannmC.outD.innerHTML = '';    
    for(let i=0; i<10; i++){
        if(rannmC.ove == 0){
            let res = arrayShuffle(words).slice(0, val);
            res = res.join('');
            if(outputs.includes(res)){
                i -= 1;
                continue;
            }
            outputs.push(res);
        }   
        if(rannmC.ove == 1){
            let res = [];
            for(let i = 0; i < val; i++){
                let ares = arraySelect(words);
                res.push(ares);
            }
            res = res.join('');
            if(outputs.includes(res)){
                i -= 1;
                continue;
            }
            outputs.push(res);
        }
    }
    rannmC.outD.innerHTML = outputs.join('<br>');
})
//#endregion

//#region マリパのハチの巣のやつ

let beeGD = document.querySelector('#main .bee-game');
let beeGC = {
    now: 0,
    ing: 0,
    turn: 0,
    who: 1,
    bar: [],
    barL: [2,14],
    
    barD: beeGD.querySelector('.bar'),
    logD: beeGD.querySelector('.log'),
    startD: beeGD.querySelector('.start'),
    b1D: beeGD.querySelector('.buttons .b1'),
    b2D: beeGD.querySelector('.buttons .b2'),
}
let beeGF = {};
beeGF.logres = () => {
    beeGC.logD.innerHTML = '';
}
beeGC.logD.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    beeGF.logres();
});

beeGF.logadd = (text) => {
    let span = document.createElement('span');
    span.textContent = text;
    beeGC.logD.appendChild(span);

    beeGC.logD.scrollTop = beeGC.logD.scrollHeight;
}

beeGF.finish = (who) => {
    beeGC.now = 0;
    beeGF.logadd('ゲームフィニッシュド！');
    beeGF.logadd(`プレイヤー${who}の勝ち`);
    beeGD.classList.remove('play');
}

beeGF.tekiou = () => {
    let who = beeGC.who;
    beeGD.classList.remove('w1', 'w2');

    beeGC.barD.textContent = beeGC.bar.join('');
    if(beeGC.bar.length == 0){
        let who = beeGC.who;
        let rwho = fl(who, [1,2]);
        beeGD.classList.add(`w${rwho}`);
        beeGF.finish(rwho);
        return 1;
    }

    beeGD.classList.add(`w${who}`);

    return 0;
}
beeGF.ing = (val) => {
    if(val == 0) beeGD.classList.remove('ing');
    if(val == 1) beeGD.classList.add('ing'); 
}
beeGF.next = () => {
    if(beeGC.bar.length == 0) return;
    if(beeGC.bar.length == 1){
        beeGF.logadd(`${fl(beeGC.who, [1,2])}の確負け`);
    }

    beeGC.turn += 1;
    // beeGC.who = beeGC.who == 1 ? 2 : 1;
    beeGC.who = fl(beeGC.who, [1,2])
    if(beeGF.tekiou()) return;
}
beeGF.start = () => {
    if(beeGC.now) return;

    beeGC.now = 1;
    beeGC.turn = 0;
    beeGC.who = 2;

    beeGC.bar = [];
    let num = random(...beeGC.barL);
    for(let i=0; i<num; i++) beeGC.bar.push('#');
    beeGC.bar.push('@');
    if(beeGF.tekiou()) return;

    beeGF.logadd(`スタート！長さは${num}です！`);
    beeGD.classList.add('play');

    beeGF.next();
}
beeGC.startD.addEventListener('click', beeGF.start);

beeGF.take = async(n = 1) => {
    if(beeGC.ing) return;
    if(!beeGC.now) return;
    
    beeGF.ing(1)
    for(let i=0; i<n; i++){
        // beeGC.barの最初の要素を消す
        beeGC.bar.shift();
        if(beeGF.tekiou()) return 1; //だいぶ無茶だけど、0じゃないものが帰ってきたら終わらせる
        await delay(500);
    }
    beeGF.ing(0)

    // ここにきたと言うことは、そのターンは無事終了
    beeGF.next()
}
beeGC.b1D.addEventListener('click', () => beeGF.take(1));
beeGC.b2D.addEventListener('click', () => beeGF.take(2));

//#endregion

//#region 田中のレースのあれ

/*
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
//#endregion

*/

let raceGD = document.querySelector('.race-game');
let raceGC = {
    now: 0,
    time: 0,
    timer: null, //eventListener
    loop: 0,
    players: [],
    leng: 14,

    pssl: 0, //selectで選んでいるか
    psid: 0, //selectで誰のを選んでいるか

    title: raceGD.querySelector('.title'),
     startD: raceGD.querySelector('.title .start'),
    junbee: raceGD.querySelector('.junbee'),
     listD: raceGD.querySelector('.junbee .list'),
     seleD: raceGD.querySelector('.junbee .selected'),
     goD: raceGD.querySelector('.junbee .go'),
    kaijou: raceGD.querySelector('.kaijou'),
     playersD: raceGD.querySelector('.kaijou .players'),
     logD: raceGD.querySelector('.kaijou .log'),
     timeD: raceGD.querySelector('.kaijou .time'),
     endD: raceGD.querySelector('.end'),
}
raceGC.Players = [ //data
    {
        name:'alice',
        jpnm: '青春アリス',
        delay: 600,
        sei:[],
        acts: [
            [0],
            [0],
            ['進む', 1],
            ['進む', 1],
            ['進む', 1],
            ['進む', 2],
        ],
        epm:80, //epのmax
        epa:10, //epのadd(回復)量（基本妨害を受けた時に回復する）
        lastwordn: '華やかなお茶会',
        lastwordp: async() => {
            //全員を強制スタン(自分含む)、しばらくした後その後全員、進む時に+1されるバフを付与

        }
    },

    {
        name:'bob', //もうアークナイツのあいつしか思い浮かばんのやが
        jpnm: 'ボブ・サック',
        delay: 900,
        sei:['スタン無効'],
        acts: [
            [0,0],
            ['進む', 1],
            ['進む', 1],
        ],
    },

    // {
    //     name:'charlie',
    //     jpnm: 'チョコ工場',
    //     delay: 600,
    //     sei:[]
    // },

]
let raceGF = {};
raceGF.logres = () => {
    raceGC.logD.innerHTML = '';
}
raceGC.logD.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    raceGF.logres();
});
raceGF.logadd = (text) => {
    let span = document.createElement('span');
    span.textContent = text;
    raceGC.logD.appendChild(span);

    raceGC.logD.scrollTop = raceGC.logD.scrollHeight;
}
raceGF.error = (text) => {
    raceGF.logadd('エラード！！！');
    raceGF.logadd(text);
    nicoText('エラード！！')
    nicoText(text)
    
    raceGF.end();
}


raceGF.start = async() => {
    if(raceGC.now) return;
    raceGC.now = 1;

    raceGD.classList.add('play');
    raceGD.classList.add('phase1');

    raceGF.pload();
}
raceGC.startD.addEventListener('click', raceGF.start);

raceGF.pload =() => {
    let div0 = raceGC.listD;
    div0.innerHTML = '';
    for(let item of raceGC.Players){
        let div = document.createElement('div');
        div.className = `item ${item.name}`;
        div.textContent = item.name;
        
        div.addEventListener('click', () => {
            if(raceGC.pssl) return;

            raceGF.pkime(raceGC.psid, item.name);
        })

        div0.appendChild(div);
    }

    raceGC.psid = 0;
    raceGC.pssl = 1;
    raceGD.classList.add('kimeing');
}
raceGF.pkime = (id, name) => {
    let div2 = raceGC.seleD.querySelector(`.sele.w${id}`);
    div2.dataset.name = name;
    div2.classList.add('kimed');

    raceGC.pssl = 0;
    raceGD.classList.remove('kimeing');
}

raceGF.pmake = (name) => {
    let data = raceGC.Players.find(p => p.name == name);
    if(!data) return 'no name';
    let player = {
        name,
        pos: 0,
        bar: [],
        buffs: [],
        inc: {},
        data: copy(data),
    }
    for(let i=0; i<raceGC.leng; i++) player.bar.push('=');
    player.bar[0] = '@';

    return player;
}

raceGF.goaway = async() => {
    if(!raceGC.now) return;

    let charge = [];
    raceGC.players = []; //4人
    for(let i=0; i<4; i++){
        let sdiv = raceGC.seleD.querySelector(`.sele.w${i}`);
        let name = sdiv.dataset.name;
        let player = raceGF.pmake(name);
        if(player == 'no name') return raceGF.error(`${name}という選手は存在しないです！！`);
        player.id = i;
        player.div = raceGC.playersD.querySelector(`.player.w${i}`);
        player.sdiv = sdiv;

        raceGC.players.push(player);

        charge.push(() => raceGF.loop(i));
    }

    raceGD.classList.remove('phase1');
    raceGD.classList.add('phase2');

    raceGC.loop = 1;
    raceGF.timer('reset')
    raceGF.timer('start');
    await Promise.all(charge.map(f => f()));
}
raceGC.goD.addEventListener('click', raceGF.goaway);


raceGF.timer = (code) => {
    if(!code) return console.log('codeがないですわ〜〜！！')
    switch(code){
        case 'start':{
            raceGC.timer = setInterval(() => {
                raceGC.time += 1;
                raceGF.tekiou()
            }, 1000);
            break;
        }

        case 'stop':{
            if(raceGC.timer) clearInterval(raceGC.timer);
            break;
        }

        case 'reset':{
            if(raceGC.timer) clearInterval(raceGC.timer);
            raceGC.time = 0;
            break;
        }
    }
}

raceGF.loop = async(id) => {
    if(!raceGC.loop) return;
    let who = raceGC.players.find(p => p.id == id);
    let act = arraySelect(who.data.acts);
    // if(!act) return raceGF.error(`${who.name}の行動aが不正です..`);
    let [key, ...val] = act;
    if(key == 0) IamVerySmartAndTensaiHuman_NiceToMeetYou = 1; //これの意味はないです。そのうち待機したら系を作るとしたらの温床で残してる
    if(key == '進む') await raceGF.move(id, val[0], '+');
    if(key == '戻る') await raceGF.move(id, val[0], '-');
    if(key == '状態') raceGF.buffadd(...val), await delay(who.data.delay);

    requestAnimationFrame(() => raceGF.loop(id));
}
raceGF.tekiou = () => {
    if(!raceGC.loop) return 1;

    // time
    let [hun, byo] = [raceGC.time%60, Math.floor(raceGC.time/60)]
        .map(a => a.toFixed(0).padStart(2, '0')); //初めて自ら改行したわ
    raceGC.timeD.textContent = `${byo}:${hun}`;


    for(let who of raceGC.players){
        who.bar.fill('=');
        who.bar[who.pos] = '@';
        who.div.textContent = who.bar.join('');

        //buff
        for(let buff of who.buffs){
            if(buff.time <= raceGC.time) raceGF.buffrem(who.id, buff.name);
        }
    }

    // 終了？
    if(raceGC.players.every(p => p.pos >= raceGC.leng-1)){
        raceGF.finish();
        return 1;
    }

    return 0;
}

raceGF.inc = (id, key, val, code = 'set') => {
    let who = raceGC.players.find(p => p.id == id);

    if(!hask(who.inc, key)) who.inc[key] = 0;
    if(code == 'set') who.inc[key] = val;
    if(code == 'add') who.inc[key] += val;
}

raceGF.move = async(id, num, code = '+') => {
    if(!raceGC.loop) return 1;
    let who = raceGC.players.find(p => p.id == id);
    // if(!who) return nicoText(`${who}番目の選手は存在しないです..`);

    if(hask(who.inc, '移動')) num += who.inc['移動'];

    for(let i=0; i<num; i++){
        if(code == '+') who.pos += 1;
        if(code == '-') who.pos -= 1;
        if(who.pos < 0) who.pos = 0;
        if(raceGC.leng <= who.pos) who.pos = raceGC.leng-1;

        raceGF.tekiou();
        await delay(who.data.delay);
    }

    return 0;
}

raceGF.buffhas = (buffs, buff) => {
    return buffs.find(a => a.name == buff);
}
raceGF.buffadd = (id, tid, buff, time) => {
    if(!raceGC.loop) return 1;
    let who = raceGC.players.find(p => p.id == id);
    let are = raceGC.players.find(p => p.id == tid);

    if(hask(who.inc, '与バフ')) time += who.inc['与バフ'];

    if(raceGF.buffhas(are.buffs, buff)) raceGF.buffrem(tid, buff);

    let mono = {
        name: buff,
        time: raceGC.time + time
    }
    are.buffs.push(mono);

    raceGF.tekiou();
    return 0;
}
raceGF.buffrem = (id, buff) => {
    if(!raceGC.loop) return 1;
    let who = raceGC.players.find(p => p.id == id);
    
    if(!raceGF.buffhas(who.buffs, buff)) return 0;
    let idx = who.buffs.findIndex(a => a.name == buff);
    who.buffs.splice(idx, 1);
    raceGF.tekiou();

    return 0;
}

raceGF.finish = () => {
    raceGC.loop = 0;
    raceGF.timer('stop');

    let ended = [];
    for(let who of raceGC.players) if(who.pos == raceGC.leng-1) ended.push(who);
    
    raceGF.logadd('レースエンデド！');
    if(ended.length == 1) raceGF.logadd(`${ended[0].name}の勝利！`);
    if(ended.length > 1) raceGF.logadd(`引き分け！ ${ended.map(a => a.name).join('と')}は同着でした！！`);
    if(ended.length == 4) raceGF.logadd(`奇跡！！`); //WiiPartyのあれ

    raceGD.classList.remove('phase2');
    raceGD.classList.add('phase3')
}

raceGF.end = () => {
    raceGC.loop = 0;
    raceGF.timer('stop');

    raceGD.classList.remove('phase2');
    raceGD.classList.remove('phase3');
    raceGD.classList.remove('play');

    raceGC.now = 0;
}
raceGC.endD.addEventListener('click', raceGF.end);
// #endregion

// #region 連打するやつ
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
//#endregion

//#region WiiPartyのコックのあれ
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

