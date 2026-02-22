//#region komagome
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
};
async function nicoText(mes){
    let newDiv = document.createElement('div');
    newDiv.textContent = mes;
    newDiv.className = 'nicotext';
    newDiv.style.top = `calc(${random(0, 100)}vh - 20px)`;
    newDiv.style.right = '0px';
    document.querySelector('body').appendChild(newDiv);

    requestAnimationFrame(() => newDiv.style.right = `${window.innerWidth + newDiv.offsetWidth}px`);
    
    await delay(2000); 
    newDiv.remove();
};
function tobiText(youso, mes) {
    let el = youso;
    if(typeof el == 'string') el = document.querySelector(youso);
    if(!el) return console.error('せんぱ〜い？この要素壊れてますよ〜〜？');

    let rect = el.getBoundingClientRect();
    let left = rect.left + window.scrollX + rect.width / 2;
    let top = rect.top + window.scrollY + rect.height / 2;

    let node = document.createElement('div');
    node.className = 'tobitext';
    node.textContent = mes;
    node.style.top = `${top}px`;
    node.style.left = `${left}px`;

    document.body.appendChild(node);

    let duration = 1200;
    let distance = -48;
    let jitter = (Math.random() - 0.5) * 10;

    let start = performance.now();

    let easeOutCubic = (t) => {return 1 - Math.pow(1 - t, 3)};

    function frame(now){
        let t = Math.min(1, (now - start) / duration);
        let e = easeOutCubic(t);
        let tsY = distance * e;
        let tsX = jitter * (1 - e);
        node.style.transform = `translate(-50%, -50%) translateY(${tsY}px) translateX(${tsX}px)`;
        node.style.opacity = String(1 - t);
        if(t < 1) requestAnimationFrame(frame);
        else node.remove();
    };

    requestAnimationFrame(frame);
};
async function kirameki(div0, zukey = 'star', n = 20, time = 2000, col){
    //heart!!!!!!!!!
    let taioued = ['star', 'heart'];
    // if(!taioued.includes(zukey)) return console.log(`図形が対応していません。現在対応しているのは[${taioued.join(', ')}だけあります。`);
    let rect = div0.getBoundingClientRect();
    let cenX = rect.left + rect.width / 2;
    let cenY = rect.top + rect.height / 2;

    let divs = [];
    for(let i=0; i<n; i++){
        let div = document.createElement('div');
        div.className = `kirameki p_${zukey}`;
        div.style.top = `${Math.random() * 100}%`;
        div.style.left = `${Math.random() * 100}%`;
        div.style.transform = `rotate(${Math.random() * 360}deg)`;
        div.style.background = col;
        document.body.appendChild(div);
        divs.push(div);
    }

    divs.forEach(div => {
        let angle = Math.random() * 2 * Math.PI;
        let speed = Math.random() * 2 + 1;
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;

        let lifeTime = 0;
        let maxLifeTime = time;

        function animate(){
            lifeTime += 16; // 約60fpsで更新
            if(lifeTime >= maxLifeTime){
                div.remove();
                return;
            }

            velocityY += 0.01; // 重力
            div.style.left = `${cenX + velocityX * (lifeTime / 16)}px`;
            div.style.top = `${cenY + velocityY * (lifeTime / 16)}px`;
            div.style.opacity = String(1 - lifeTime / maxLifeTime);

            requestAnimationFrame(animate);
        }
        animate();
    })
}
function kaijou(num){
    if(num == 0) return 0;
    if(num == 1) return 1;
    return num * kaijou(num - 1);
};
function kaikyu(sta, end, row, val){
    if(typeof sta != 'number' || typeof end != 'number' || typeof row != 'number' || typeof val != 'number') return console.error('えっと、できれば..引数は全て数字にして欲しい...です......');
    if(row <= 0) return console.error(`row${row}でしたけど...大丈夫ですか？`);
    if(sta > end) return console.error('え、えっと...多分、逆です......');
    if(val < sta || val > end) return console.error('こ、この値..枠から外れてます....');

    let kari = Math.floor((val-sta) / row);
    let sta2 = sta + kari*row;
    let end2 = sta + row-1;
    if(end2 > end) end2 = end;

    let arr = [];
    for(let i = sta2; i <= end2; i++) arr.push(i);

    return arr;
};
function arraySelect(array){
    let select = Math.floor(Math.random()*array.length);
    return array[select];
};
function arrayShuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        let i2 = Math.floor(Math.random() * (i + 1));
        [array[i], array[i2]] = [array[i2], array[i]];
    };
    return array;
};
function arraySize(array){
    let res = new Set(array).size;
    return res;
};
function arrayCount(array){
    let counts = {};
    for(let value of array){
        counts[value] = (counts[value] || 0) + 1;
    };
    return counts;
};
function arrayMult(array){
    return array.reduce((a, v) => a * v, 1);
};
function arrayGacha(array, prob){
    if(array.length != prob.length) throw new Error("長さがあってないっす！先輩、ちゃんとチェックした方がいいっすよ〜？");
    let total = prob.reduce((sum, p) => sum + p, 0);
    let random = Math.random() * total;
    for (let i = 0; i < array.length; i++){
        if(random < prob[i]) return array[i];
        random -= prob[i];
    };
};
function hask(obj, key){
    let res = obj.hasOwnProperty(key);
    res = res ? 1 : 0;
    return res;
};
function copy(moto) {
    if(Array.isArray(moto)){
        let arr = [];
        for(let i = 0; i < moto.length; i++){
            arr.push(copy(moto[i]));
        }
        return arr;
    }else if(moto != null && typeof moto == 'object'){
        let obj = {};
        for(let key in moto){
            if(moto.hasOwnProperty(key)){
                obj[key] = copy(moto[key]);
            }
        };
        return obj;
    }else{
        return moto;
    };
};
function probability(num){
    return Math.random()*100 <= num;
    //例:num == 20 → randomが20以内ならtrue,elseならfalseを返す
};
function random(min, max){
    if(max < min) [min, max] = [max, min];
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(num);
};
function fl(val, arr = [0, 1]){
    let res = val == arr[0] ? arr[1] : arr[0];
    return res;
};
function anagramSaySay(text, loop = 10, bet = '<br>'){
    let menjo = 0;
    let len = text.length;
    if(len < 4) menjo = 1, console.log('長さが3以下なんで最大6っす');
    
    let optout = text.split('');
    let optcou = arrayCount(optout);
    let optvals = [];
    for(a of Object.keys(optcou)){
        let b = optcou[a];
        b = kaijou(b);
        optvals.push(b);
    };
    let optmat = arrayMult(optvals);
    let cal = (kaijou(len) / optmat) - 1;

    let loopen = loop;
    // console.log(`総数:${cal} 回数:${loopen}`);
    if(cal < loopen) menjo = 1;
    
    let reses = [];
    while(loopen > 0){
        loopen -= 1;
        let res = arrayShuffle(optout).join(''); 
        if(reses.includes(res)){loopen += 1; continue};
        
        if(res == text && !menjo){loopen += 1; continue;}

        if(res == text && menjo && reses.length < cal){loopen += 1; continue}
        else if(res == text && menjo) res = '[重複エラー]';

        reses.push(res);
    };
    
    return reses.join(bet);
};
function anagramCan(mae, ato){
    if(mae.length != ato.length) return 0;

    let count = {};
    for(let ch of mae) count[ch] = (count[ch] || 0) + 1;

    for(let ch of ato){
        if(!count[ch]) return 0;
        count[ch] -= 1;
    };

    return 1;
};
function setLocalStorage(name, value){
    localStorage.setItem(name, value || "");
};
function getLocalStorage(name){
    return localStorage.getItem(name);
};
async function error(text = 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'){
    addtext(text);
    await delay(2000);
    // window.open('about:blank', '_self').close();
};
function hoshoku(color){
    color = color.replace(/^#/, '');

    if(color.length != 6) return console.log('カラーコードは6桁、ですよ〜？楽しないでくださいね♪');

    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    let compR = (255 - r).toString(16).padStart(2, '0');
    let compG = (255 - g).toString(16).padStart(2, '0');
    let compB = (255 - b).toString(16).padStart(2, '0');

    let ato = `#${compR}${compG}${compB}`;

    return ato;
};
function mixshoku(c1, c2, ratio = 0.5){
    let toRGB = c => {
        c = c.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        let n = parseInt(c, 16);
        return [n >> 16, (n >> 8) & 255, n & 255];
    };

    let [r1, g1, b1] = toRGB(c1);
    let [r2, g2, b2] = toRGB(c2);

    let r = Math.round(r1 + (r2 - r1) * ratio);
    let g = Math.round(g1 + (g2 - g1) * ratio);
    let b = Math.round(b1 + (b2 - b1) * ratio);

    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

    return ato;
};
function ranshoku(){
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return ato;
};
//#endregion
//#region log&text
let textDiv = document.querySelector('#text');
let autoDelay = 1;
let skipText = false;
let clearText = false;
let textShowing = 0;

function colorcheck(rawtext) {
    let text = [];
    let color = null;
    let colors = [
        {
            name: 'red',
            sym: '*',
            col: '#ff4040'
        },
        {
            name: 'pink',
            sym: '&',
            col: '#ff80bf'
        },
        {
            name: 'yell',
            sym: '^',
            col: '#ffff40'
        }
    ];

    for(let i = 0; i < rawtext.length; i++){
        let sym = false;
        for(let c of colors){
            if(rawtext[i] == c.sym && rawtext[i + 1] == c.sym){
                console.log(`→${rawtext[i]}← 発見！ ${c.name}色です`);
                color = color ? null : c.col;
                i++;
                sym = true;
                break;
            }
        };

        if(sym) continue;
        if(color) console.log(color);
        text.push({
            char: rawtext[i],
            color: color
        });
    }
    return text;
};

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
};
async function addtext(raw){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');

    if(textShowing){
        queueAddtext.push(raw);

        if(!loopAddtext) waitforAddtext();
        return;
    };
    
    textShowing = 1;
    text = colorcheck(raw);
    textDiv.innerHTML = "";
    textDiv.style.display = "block";
    let index = 0;
    clearText = false;

    return new Promise((resolve) => {
        async function type(){
            if(index < text.length){
                if(skipText){
                    while (index < text.length) {
                        let span = document.createElement("span");
                        span.textContent = text[index].char;
                        if(text[index].color) span.classList.add(`color-${text[index].color}`);
                        textDiv.appendChild(span);

                        index++;
                    }
                    index = text.length;
                    skipText = false;
                    setTimeout(type, 10);
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.classList.add(`color-${text[index].color}`);
                    textDiv.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                addlog(textDiv.innerHTML);
                let waitTime = autoDelay * 1000;
                let timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                let userAction = new Promise(resolve => {
                    function waitToClear(event) {
                        if(event.type === 'click' || event.key === 'z' || event.key === 'Enter'){
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
                    resolve('end');
                });
            }
        };
        type();
    });
};
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
let log_open = (code = NaN) => {
    jump:{
        if(!isNaN(code)) break jump;

        logOOmoto.classList.toggle('tog');
        logOpener.textContent = logOOmoto.classList.contains('tog') ? '<' : '>';
        return;
    };

    if(code == 1){
        logOOmoto.classList.add('tog');
        logOpener.textContent = '<';
    };
    if(code == 0){
        logOOmoto.classList.remove('tog');
        logOpener.textContent = '>';
    };

};
logOpener.addEventListener('click', log_open);

function addlog(text){
    log.innerHTML += text + '<br>';
    log.scrollTop = log.scrollHeight;
};
//#endregion
//#region description
/*
要素に、data-descriptionをつけると、その要素にホバーした時に指定した文字列を表示させられます。
ステータスとかバフの詳しい説明用とかに良き
*/
let mobileDesc = document.getElementById('mobileDesc');
document.addEventListener('mousemove', (e) => {
    mobileDesc.style.left = `${e.clientX + 10}px`;
    mobileDesc.style.top = `${e.clientY + 10}px`;
});
document.addEventListener('mouseover', (e) => {
    let descTarget = e.target.closest('[data-description]');
    if(descTarget){
        let desc = descTarget.dataset.description;
        mobileDesc.innerText = desc;
        mobileDesc.classList.add('show');
    }
});
document.addEventListener('mouseout', (e) => {
    let descTarget = e.target.closest('[data-description]');
    if(descTarget){
        mobileDesc.innerText = '';
        mobileDesc.classList.remove('show');
    }
});
//#endregion
//#region draggable
document.addEventListener('mousedown', e => {
    // let descTarget = e.target.closest('[data-description]');
    let div = e.target;
    
    if(!div.classList.contains('draggable')) return;
    offsetX = e.clientX - div.getBoundingClientRect().left;
    offsetY = e.clientY - div.getBoundingClientRect().top;
    
    function onMouseMove(e){
        div.style.left = `${e.clientX - offsetX}px`;
        div.style.top = `${e.clientY - offsetY}px`;
    };

    function onMouseUp(){
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});
//#endregion 
//#region tk
class tk{
    constructor(type, x = 'half', y = 'half', w = window.innerWidth/2, h = window.innerWidth/2){
        let youso = document.createElement(type);
        youso.className = `tk ${type}`;

        let contex = {x, y, w, h};

        let yoko = ['x', 'w'];
        for(let n of yoko){
            console.log(n), console.log(eval(n));
            if(typeof contex[n] != 'string' || typeof contex[n] == 'string' && !contex[n].endsWith('%')) continue;
            let num = contex[n].slice(0, -1);
            contex[n] = num * window.innerWidth / 100;
        }

        let tate = ['y', 'h'];
        for(let n of tate){
            if(typeof contex[n] != 'string' || typeof contex[n] == 'string' && !contex[n].endsWith('%')) continue;
            let num = contex[n].slice(0, -1);
            contex[n] = num * window.innerHeight / 100;
        }

        console.log(contex);

        youso.style.width = `${contex.x}px`;
        youso.style.height = `${contex.h}px`;

        youso.style.left = `${contex.x}px`;
        youso.style.top = `${contex.y}px`;
        
        if(contex.x == 'half' && contex.y == 'half') youso.classList.add('cenXY');
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
//#region alertD
class alertD{
    constructor(text, elses = {}){
        this.text = text;
        for(let key in elses) this[key] = elses[key];
        /*
            back: 背景色
            barc: barの色
            time: 消えるまでの時間[s]
            data-...: data-...をそのままsetAttribute
        */

        this.datas = [];
        //data-を
        for(let key in elses){
            if(!key.startsWith('data-')) continue;
            this.datas.push({key: key, val: elses[key]});
        }
    };
    x(aru){
        this.x = aru;
    };
    appear(){
        let back = this.back || '#ffffff';
        let barc = this.barc || '#80ff80';

        let div = document.createElement('div');
        div.classList.add('alertD');
        div.style.background = back;
        div.style.boxShadow = `${hoshoku(back)} 5px 5px 20px`;

        let row = document.createElement('div');
        row.classList.add('row');
         let icon = document.createElement('div');
         icon.classList.add('icon');
         icon.style.background = barc;
         icon.style.color = back;
         icon.textContent = '！';
         row.appendChild(icon);

         let text = document.createElement('div');
         text.innerText = this.text;
         text.style.color = hoshoku(back);
         row.appendChild(text);
        div.appendChild(row);

        let x = document.createElement('div');
        x.className = 'x';
        x.innerText = '×';
        x.style.color = hoshoku(back);
        x.addEventListener('click', () => this.delete());
        div.appendChild(x);
        
        let bar = document.createElement('div');
        bar.classList.add('bar');
         let inner = document.createElement('div');
         inner.classList.add('inner');
         inner.style.background = barc;
         bar.appendChild(inner);
        div.appendChild(bar);

        //data
        for(let data of this.datas){
            div.setAttribute(data.key, data.val);
        }

        document.body.appendChild(div);
        this.div = div;

        setTimeout(() => {
            div.classList.add('show');
        }, 100);

        // pointerが乗ってる間はthis.loopを0にする
        div.addEventListener('pointerenter', () => this.loop = 0);
        div.addEventListener('pointerleave', () => this.loop = 1);

        let time = 0;
        let limit = 500;
         if(this.time) limit = this.time*100;
        this.loop = 1;
        this.interval = setInterval(() => {
            if(this.loop) time++;
            inner.style.width = `${time/limit*100}%`;
            
            if(time == limit) this.delete();
        }, 10);
    };
    delete(){
        clearInterval(this.interval);
        let div = this.div;
        div.classList.remove('show');
        setTimeout(() => div.remove(), 1000);
    };
};
//#endregion
//#region observer
let keys = {};
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
let cricking = false;
document.addEventListener('pointerdown', (e) => {
    if(e.buttons == 0) clicking = true;
    if(e.buttons == 2) cricking = true;
});
document.addEventListener('pointerup', (e) => {
    if(e.buttons == 0) clicking = false;
    if(e.buttons == 2) cricking = false;
});
document.addEventListener('pointercancel', (e) => {
    if(e.buttons == 0) clicking = false;
    if(e.buttons == 2) cricking = false;
});
window.addEventListener('blur', () => {clicking = cricking = false});

let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
//#endregion
//#region fonts
const Fonts = [
    {src:'corporate', type:'otf'},
    {src:'kaimetsu', type:'otf'},
    {src:'kurundeco', type:'otf'},
    {src:'starrysky', type:'otf'},
    {src:'comicsans', type:'ttf'},
    {src:'cube12', type:'ttf'},
    {src:'genjuu', type:'ttf'},
    {src:'hangyaku', type:'ttf', weight:'700'},
    {src:'kurobara', type:'ttf'},
    {src:'marukoius', type:'ttf'},
    {src:'novamono', type:'ttf'},
    {src:'papyrus', type:'ttf'},
    {src:'pricedown', type:'ttf'},
    {src:'misaki', type:'ttf'},
    {src:'webdings', type:'ttf'},
    {src:'wingdings', type:'ttf'},
    {src:'wingdings2', type:'ttf'},
    {src:'wingdings3', type:'ttf'},
    {src:'ancientpersia', type:'ttf'},
    {src:'bodoniornaments', type:'ttf'},
    {src:'poprumcute', type:'otf'},
    {src:'craft', type:'otf'},
    {src:'nyashi', type:'ttf'},
    {src:'cinecaption226', type:'ttf'},
    {src:'addheart2', type:'ttf'},
    {src:'myHeart', type:'otf'},
    {src:'akmy_prince', type:'ttf'},
    {src:'adorableLady', type:'ttf'},
    {src:'adorableDoll', type:'ttf'}
];
function fontsLoad(){
    let id = "font_load_css";
    let existing = document.getElementById(id);
    if(existing) existing.remove();

    let css = Fonts.map(f => {
        let src = `url('../assets/fonts/${f.src}.${f.type}')`;
        let weight = f.weight ?? 'normal';
        return `@font-face{
            font-family:'${f.src}';
            src: ${src};
            font-weight: ${weight};
            font-style: normal;
            font-display: swap;
        }`;
    }).join('\n');

    const el = document.createElement('style');
    el.id = id;
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
}
fontsLoad();
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

//#region ランダムな文字を抽出するやつ -arraySelect-
let ransD = document.querySelector('#main .ransele');
let ransC = {
    oyaD: ransD.querySelector('.oya'),
    texD: ransD.querySelector('.oya .text'),
    impI: ransD.querySelector('.input'),
}
let ransF = {};
ransF.act = async() => {
    let val0 = ransC.impI.value;
    if(!val0) return tobiText(ransC.texD, '文字が入力されていないですよ〜？');
    
    let val = val0.split('\n').filter(v => v.trim() !== '');
    if(val.length == 0) return tobiText(ransC.texD, 'えっと〜..できれば空行のみはやめてほしくってぇ...');
    if(val.length == 1) tobiText(ransC.texD, '文字が一つしかないんで、ランダムに選ばれても同じですよ〜？');

    // console.log(val)
    let res = arraySelect(val);
    let ippo = 50;
    let wait = 1000;
    for(let i=0; i<wait/ippo; i++){ //でんでけでけでけ〜〜
        let temp = arraySelect(val);
        ransC.texD.textContent = temp;
        await delay(ippo);
    }
    ransC.texD.textContent = res; //ぽん
    kirameki(ransC.texD, 'star')
}

ransC.oyaD.addEventListener('click', ransF.act);
ransC.texD.addEventListener('click', ransF.act);
ransC.texD.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if(!ransC.texD.textContent) return;
    navigator.clipboard.writeText(ransC.texD.textContent);
    tobiText(ransC.texD, 'コピーしました！');
});
//#endregion

//#region アナグラム生成器
let anagD = document.querySelector('#main .anagram');
let anagC = {
    inD: anagD.querySelector('.in'),
    outD: anagD.querySelector('.out'),
    senD: anagD.querySelector('.send'),
    sageD: anagD.querySelector('.sage'),
    stogD: anagD.querySelector('.sage .opener'),
    kiraD: anagD.querySelector('.sage .kira'),
}
anagC.senD.addEventListener('click', () => {
    anagC.outD.innerHTML = '';

    let text = anagC.inD.value;
    let ress = anagramSaySay(text, 10, ',').split(',');
    // console.log(ress.length)

    let kira = anagC.kiraD.value, cankira = 0;
    if(kira) cankira = anagramCan(text, kira);
    if(kira && !cankira && anagC.sageD.classList.contains('tog')) tobiText(anagC.kiraD, 'できませんわ〜！')

    let oyaoya = document.createDocumentFragment(); //一括追加用の偽親要素を作成するやつ
    for(let a of ress){
        let div = document.createElement('div');
        div.classList.add('item');
        div.textContent = a;
        
        if(cankira && a == kira) div.classList.add('kira');

        div.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(a);
            tobiText(div, 'コピーしました！')
        })
        oyaoya.appendChild(div);
    }
    anagC.outD.appendChild(oyaoya); //innerHTML = arr.join('');みたいなもん
});
anagC.stogD.addEventListener('click', () => {
    anagC.sageD.classList.toggle('tog');
})
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
rannmC.togB.click();
rannmC.oveB.addEventListener('click', () => {
    // console.log(`${rannmC.ove} => ${fl(rannmC.ove), [0,1]}`);
    rannmC.ove = fl(rannmC.ove, [0,1]);
    if(rannmC.ove == 1) rannmC.oveB.style.backgroundColor = '#a2ffa8';
    if(rannmC.ove == 0) rannmC.oveB.style.backgroundColor = '#c4c4c4';
})
rannmC.oveB.click();
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
    beeGC.ing = val;
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

    beeGF.logadd('ーーーーーーーーーーーーーーー')
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
        await delay(400);
    }
    beeGF.ing(0)

    // beeGF.logadd(`${beeGC.who}のターン完了`)
    beeGF.next()
}
beeGC.b1D.addEventListener('click', () => beeGF.take(1));
beeGC.b2D.addEventListener('click', () => beeGF.take(2));

//#endregion

//#region 田中のレースのあれ

let raceGD = document.querySelector('.race-game');
let raceGC = {
    now: 0,
    time: 0,
    timer: null, //eventListener
    loop: 0,
    loging: 0,
    lognum: 0,
    players: [],
    leng: 18,

    pssl: 0, //selectで選んでいるか
    psid: 0, //selectで誰のを選んでいるか
    psev: null, //selectの謎関数
    psdv: null, //selectしているdiv

    title: raceGD.querySelector('.title'),
     startD: raceGD.querySelector('.title .start'),
    junbee: raceGD.querySelector('.junbee'),
     listD: raceGD.querySelector('.junbee .list'),
     seleD: raceGD.querySelector('.junbee .selected'),
     goD: raceGD.querySelector('.junbee .go'),
    kaijou: raceGD.querySelector('.kaijou'),
     seshD: raceGD.querySelector('.kaijou .senshus'),
     logD: raceGD.querySelector('.kaijou .log'),
     timerD: raceGD.querySelector('.kaijou .timer'),
     timeD: raceGD.querySelector('.kaijou .timer .time'),
     endD: raceGD.querySelector('.end'),
}
raceGC.Players = [ //data
    // a b c d e f g h i j k l m n o p q r s t u v w x y z
    {
        able: 1,
        name:'alice',
        jpnm:'青春アリス',
        moto:'#コンパス',
        delay: 500,
        sei:[],
        acts: [
            [0],
            [0],
            ['進む', 1],
            ['進む', 1],
            ['進む', 1],
            ['進む', 2],
        ],

        P:{
            name:'なし',
            if:'',
            func:() => {}
        },

        //epのmaxは360
        epa:5, //epのadd(回復)量（基本妨害を受けた時に回復する）
        E:{
            name:'華やかなお茶会',
            func:async() => {
                //全員を強制スタン(自分含む)、しばらくした後その後全員、進む時に+1されるバフを付与
            }
        },
    },

    {
        able: 1,
        name:'bob', //もうアークナイツのあいつしか思い浮かばんのやが
        jpnm:'ビッグ・ボブ',
        moto:'アークナイツ',
        desc:"重装備ゆえに動きが遅い。\nしかしその分スタン耐性がある",
        delay: 1200,
        sei:['スタン無効'],
        acts: [
            [0],
            ['進む', 1],
            ['進む', 1],
        ],

        P:{
            name:'なし',
            if:'状態付与←_スタン',
            func:() => {
                
            }
        },
    },

    {
        able: 0,
        name:'clockboy',
        jpnm:'クロックボーイ',
        moto:'崩壊・スターレイル',
        desc:"",
        delay: 200,
        sei:[],
        acts:[
            ['進む', 1],
            ['進む', 1],
        ],

        P:{
            name:'パニック',
            if:'状態解除←_スタン',
            func:() => {
                //自身のdelayを+400
                raceGF.buffadd('me', 'fast', 5, 400);
            }
        },

        epa:2
    },

    {
        able: 1,
        name:'highlander',
        jpnm:'HIGH5LANDER',
        moto:'ブルーアーカイブ',
        desc:"法定速度以上だが脱線はしない列車。\n高速で動くがたまに事故るぞ！",
        delay: 200,
        sei:[],
        acts:[
            ['進む', 1],
            ['進む', 1],
            ['状態', 'me', 'スタン', 10],
        ],

        P:{
            name:'パニック',
            if:'状態解除←_スタン',
            func:() => {
                //自身のdelayを+400
                raceGF.buffadd('me', '無効_スタン', 4);
                raceGF.buffadd('me', 'slow', 4, 300);
            }
        },


    },

    // digda（ディグダ）[ポケモン]
    // e（）[]
    // feater（エフイーター）[アークナイツ] 元被り。
    // greg(ory)（グレッグ）[ヘイ・デイ]
     // gregorius（グレゴリオ）[ブルーアーカイブ]でもいいかも？
    // h（）[]
    // i（）[]
    // john(遠吠え) [作曲家さん]歌の名前/歌詞で 主軸定めが吉
    // kris(クリス) [デルタルーン]殺す
    // teto(テト)[ボーカロイド] オーバーライド Pのifが「状態付与←-悪」(デバフをつけられたら)になるやつ
     // chihiro(チヒロ)[ブルーアーカイブ]にオーバーライドさせてもいいかも？
    // wonka(ウォンカ) [洋画]チョコ


]
raceGC.Buffs = [
    {
        name:'スタン',
        efs:{
            '不可_行動':1
        }
    }
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
    let span = document.createElement('div');
    span.className = 'span';
    span.textContent = text;
    raceGC.logD.appendChild(span);

    raceGC.logD.scrollTop = raceGC.logD.scrollHeight;
    raceGC.lognum += 1000;
    raceGF.logope();    
}
raceGF.logope = async() => {
    if(raceGC.loging) return;

    raceGC.loging = 1;
    raceGC.logD.classList.remove('tog');
    for(let i=0; i<raceGC.lognum; i+=10){
        await delay(10);
    }
    raceGC.loging = 0;
    raceGC.logD.classList.add('tog');
}
raceGC.logD.addEventListener('click', () => raceGC.logD.classList.toggle('tog'));

raceGF.error = (text) => {
    let arr = ['エラード！！！', text];
    for(let a of arr){
        raceGF.logadd(a);
        nicoText(a);
        console.error(a);
    }
    
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

// #region 怒涛のp-rush
raceGF.pload = () => {
    let div0 = raceGC.listD;
    div0.innerHTML = '';

    //上のリスト
    let arr0 = raceGC.Players.filter(a => a.able);
    let arr = copy(arr0);
    arr.push({name:'random'});
    for(let item of arr){
        let div = document.createElement('div');
        div.className = `item ${item.name}`;
        div.dataset.name = item.name;
        // div.textContent = item.name;
        
        div.addEventListener('click', () => {
            if(!raceGC.pssl) return;

            raceGF.pkimed(raceGC.psid, item.name);
        })

        div0.appendChild(div);
    }

    //選ぶコマ
    for(let i=0; i<4; i++){
        let div = document.createElement('div');
        div.className = `raceG-lect w${i}`;
        div.dataset.name = '未選択';
        div.textContent = `${i+1}P`

        div.addEventListener('click', () => {
            if(raceGC.pssl) return;
            raceGF.pkime(i);
        })

        let ranD = raceGC.listD.querySelector(`.item.random`);
        ranD.appendChild(div);
    }

    for(let i=0; i<4; i++){
        let div = document.createElement('div');
        div.className = `sele w${i}`;
        div.dataset.name = '未選択';
        
        let img = document.createElement('img');
        img.className = 'img';
        div.appendChild(img);
        
        let text = document.createElement('div');
        text.className = 'text';
        text.textContent = '未選択';
        div.appendChild(text);
        
        raceGC.seleD.appendChild(div);

        if(i) raceGF.pkimed(i, 'random');
    }

    raceGF.pkime(0)
}

raceGF.pkime = (id) => {
    if(raceGC.pssl) return;

    raceGC.psid = id;
    raceGD.classList.add('kimeing');
    setTimeout(() => raceGC.pssl = 1, 10);

    let div = document.querySelector(`.raceG-lect.w${id}`);
    div.classList.add('moving');
    let onmove = (e) => {
        div.style.left = `${e.clientX}px`;
        div.style.top = `${e.clientY}px`;
    }
    document.addEventListener('mousemove', onmove);

    raceGC.psev = onmove;
    raceGC.psdv = div;
}
raceGF.pkimed = (id, name) => {
    let div0 = raceGC.listD.querySelector(`.item.${name}`);
    let div = document.querySelector(`.raceG-lect.w${id}`);
    div.classList.remove('moving');
    div.remove();
    div0.appendChild(div);
    
    let div2 = raceGC.seleD.querySelector(`.sele.w${id}`);
    div2.dataset.name = name;
    div2.classList.add('kimed');

    div2.dataset.name = name;
    div2.querySelector('.img').src = `resources/raceGCs/${name}.png`;
    div2.querySelector('.text').textContent = name;

    raceGC.pssl = 0;
    raceGD.classList.remove('kimeing');
}

raceGF.pmake = (name) => {
    let data = raceGC.Players.find(p => p.name == name);
    if(!data) return 'no name';
    data = copy(data);

    let player = {
        name,
        pos: 0,
        looped: 0,
        delay: data.delay,
        bar: [],
        buffs: [],
        inc: {},
        data: data,
    }

    for(let i=0; i<raceGC.leng; i++) player.bar.push('=');
    player.bar[0] = '@';

    return player;
}
// #endregion

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
raceGC.timerD.addEventListener('click', () => raceGC.timerD.classList.toggle('tog'));

raceGF.goaway = async() => {
    if(!raceGC.now) return;

    raceGC.players = []; //4人
    for(let i=0; i<4; i++){
        let sdiv = raceGC.seleD.querySelector(`.sele.w${i}`);
        let name = sdiv.dataset.name;
         if(name == 'random') name = arraySelect(raceGC.Players.filter(a => a.able)).name;
        let player = raceGF.pmake(name);
        if(player == 'no name') return raceGF.error(`[goaway] (${i})${name}という選手は存在しないです！！`);
        player.id = i;
        player.div = raceGC.seshD.querySelector(`.sesh.w${i}`);
        player.sdiv = sdiv;

        raceGC.players.push(player);
    }
    

    raceGD.classList.remove('phase1');
    raceGD.classList.add('phase2');

    raceGF.timer('reset');
    await raceGF.hazime();
    await delay(10)
    raceGF.yame();
    await delay(1490);
    let count0 = 3, wait = 1000, ed = 0;
    for(let i=count0; 0<i; i--){
        for(let i2=0; i2<random(1,8); i2++){
            raceGF.logadd(`${i}...${".".repeat(ed)}`);
            await delay(wait);
            ed += 1;
        }

        ed = 0;
    }
    raceGC.logD.classList.add('tog');
    raceGF.hazime(1);
}
raceGC.goD.addEventListener('click', raceGF.goaway);

raceGF.hazime = async(code=0) => {
    if(raceGC.loop) return;
    let charge = [];
    for(let i=0; i<4; i++) charge.push(() => raceGF.loop(i));
    
    raceGC.loop = 1;
    raceGF.timer('start');
    if(code) await Promise.all(charge.map(f => f()));
}
raceGF.yame = (code=0) => {
    if(!raceGC.loop) return;
    raceGC.loop = 0;
    raceGF.timer('stop');
}
document.addEventListener('keydown', (e) => {
    let key = e.key.toLowerCase();
    if(key == 'k'){
        if(raceGC.loop) raceGF.yame();
        else raceGF.hazime();
    }
});

raceGF.happen = async(what, id, tid) => {
	if(!raceGC.loop) return;

    let list = [];
    if(what.startsWith('状態')){
        //状態解除←_スタン
        let name = what.substr(6);
        
        list.push(what.substr(0,2));
        list.push(what.substr(0,4));
        list.push(what.substr(0,5));

        let list2 = copy(list);
        list2.map(a => a += `_${name}`);
        list = list.concat(list2);
        console.log(list)
    }

    for(let i=0; i<4; i++){
        let who = raceGF.who(i);
        if(list.includes(who.data.P.if)) await who.data.P.func();
    }

    return 0;
}

raceGF.who = (id) => raceGC.players.find(p => p.id == id);

raceGF.tekiou = async() => {

    if(!raceGC.loop) return 1;


    // time
    let [hun, byo] = [raceGC.time%60, Math.floor(raceGC.time/60)]
        .map(a => a.toFixed(0).padStart(2, '0')); //初めて自ら改行したわ
    raceGC.timeD.textContent = `${byo}:${hun}`;


    for(let who of raceGC.players){
        who.div.innerHTML = '';

        //画像載せない、昔ver row
        // let hito = document.createElement('div');
        // hito.className = 'hito';
        // hito.textContent = '||';

        // let atto = document.createElement('div');
        // atto.className = 'atto';
        // atto.textContent = '@';

        // who.bar.fill('=');
        // who.bar[who.pos] = '@';
        // for(let n of who.bar){
        //     if(n == '=') who.div.appendChild(hito.cloneNode(true));
        //     if(n == '@') who.div.appendChild(atto.cloneNode(true));
        // }

        // 画像というかイメージ載せる、新ver column
        for(let i=0; i<raceGC.leng; i++){
            let div = document.createElement('div');
            div.className = `load l${i}`;
             let span = document.createElement('span');
             span.textContent = '||';
             div.appendChild(span)

            if(i == who.pos){
                div.classList.add('iru')
                let koma = document.createElement('div');
                koma.className = 'koma';
                 let img = document.createElement('img');
                 img.src = `resources/raceGCs/${who.data.name}_sd.png`;
                 koma.appendChild(img);
                div.appendChild(koma);
            }
            else div.classList.remove('iru')

            who.div.appendChild(div);
        }

        
        //buff
        for(let buff of who.buffs){
            if(buff.time == "null") continue;
            if(buff.time <= raceGC.time){
                raceGF.buffrem(who.id, who.id, buff.name)
                console.log(`[${who.id}] ${buff.name} 削除`)
            };
        }

    }
    
    // 終了？
    if(raceGC.players.some(p => p.pos >= raceGC.leng-1)){
        raceGF.finish();
        return 1;
    }

    return 0;
}

raceGF.loop = async(id, huka0=0) => {
    if(!raceGC.loop) return;
    let who = raceGF.who(id);

    let wait = copy(who.delay);
    let huka = 0;
    if(huka0) huka = 1;

    for(let buff of who.buffs){
        let name = buff.name;
        if(!raceGF.buff(name)) continue;
        if(raceGF.buffis(name, '不可_行動')) huka = 1;

        if(raceGF.buffis(name, 'slow')) wait += buff.val;
        if(raceGF.buffis(name, 'fast')) wait -= buff.val;
    }
    
    // console.log(`${who.name}(${id})様はdelayバフをお持ちになられているので、delayに${wait}ms追加しますね`);
	
	if(await raceGF.happen("開始", id)) return 1;

    jump:{
        if(huka) break jump;
        // console.log(`[${id}] jumpしませんでした`)

        let act = copy(arraySelect(who.data.acts));
        // if(!act) return raceGF.error(`${who.name}の行動aが不正です..`);
        let [key, ...val] = act; //このact、たまに最後の要素が"強"になる。強ならば、強制、スタンされてたり不可だったりしても絶対動ける
        // console.log(`[${key}] (${id})${val.join(', ')}`);
        if(key == 0 && await raceGF.happen("待機", id)) return 1;
        if(key == '進む') await raceGF.move(id, val[0], '+');
        if(key == '戻る') await raceGF.move(id, val[0], '-');
        if(key == '状態') raceGF.buffadd(id, ...val);
    }

    await delay(wait);
	
	if(huka && await raceGF.happen("行動できズ", id)) return 1;

    raceGF.tekiou()

    who.looped += 1;
    requestAnimationFrame(() => raceGF.loop(id));
}

raceGF.inc = (id, key, val, code = 'set') => {
    // 移動とか、付バフ/被バフとか
    let who = raceGF.who(id);

    if(!hask(who.inc, key)) who.inc[key] = 0;
    if(code == 'set') who.inc[key] = val;
    if(code == 'add') who.inc[key] += val;
}

raceGF.move = async(id, num, code = '+') => {
    if(!raceGC.loop) return 1;
    let who = raceGF.who(id);
    // if(!who) return nicoText(`${who}番目の選手は存在しないです..`);

    if(hask(who.inc, '移動')) num += who.inc['移動'];
	
	if(await raceGF.happen("移動", id)) return 1;

    for(let i=0; i<num; i++){
        if(code == '+') who.pos += 1;
        if(code == '-') who.pos -= 1;
        if(who.pos < 0) who.pos = 0;
        if(raceGC.leng <= who.pos) who.pos = raceGC.leng-1;
        raceGF.tekiou();
		
		if(await raceGF.happen("移動ing", id)) return 1;
		
        if(i+1 < num) await delay(who.delay);
    }
	
	if(raceGF.happen("移動ed", id)) return 1;

    return 0;
}

raceGF.buff = (name) => {
    let data = raceGC.Buffs.find(a => a.name == name);
    if(data) return data;
    
    return 0;
}
raceGF.buffhas = (id, name) => {
    let who = raceGF.who(id);
    let sore = who.buffs.find(a => a.name == name);
    if(sore) return sore;

    return 0;
}

raceGF.buffis = (name, code) => {
    let data = raceGC.Buffs.find(a => a.name == name);
    if(!data) return 0;
    
    for(let key in data.efs) if(key == code) return data.efs[key];

    return 0;
}
raceGF.buffadd = (id, tid, name, time, val, force, yuuhatsu) => {
    if(!raceGC.loop) return 1;
    console.log(`[buffadd] ${id} ${tid} ${name} ${time} ${val}`);

    if(tid == 'me') tid = id;
    let who = raceGF.who(id);
    let are = raceGF.who(tid);

    time += raceGC.time;
    // console.log(`[${name}] ${raceGC.time} => ${time}`);

    val = val ?? 0;

    if(raceGF.buffhas(tid, name)){
        let sore = are.buffs.find(a => a.name == name);
        let dou = 0;
        if(val > sore.val) dou = 1;
        if(time > sore.time && val == sore.val) dou = 1;
        if(time == 'null') dou = 1;

        if(dou) raceGF.buffrem(tid, tid, name, 1, 0);
        else return 1;
    }

    let mono = {
        name: name,
        time,
        val
    }
    if(time == 'null') mono.time = "null";

    // console.log(mono)
    are.buffs.push(mono);

    raceGF.tekiou();
    return 0;
}
raceGF.buffrem = async(id, tid, name, force=0, yuuhatsu=1) => {
    if(!raceGC.loop) return 1;
    let who = raceGF.who(id);
    
    if(!raceGF.buffhas(id, name)) return 0;
    let idx = who.buffs.findIndex(a => a.name == name);
    who.buffs.splice(idx, 1);
    raceGF.tekiou();

    if(id != tid){
        raceGF.happen(`状態解除→_${name}`, id, tid);
        raceGF.happen(`状態解除←_${name}`, tid, id);
    }
    
    return 0;
}

raceGF.ef = (code, time, id, tid) => {
    //エフェクト出すやつ
    if(!raceGC.loop) return 1;
    let who = raceGF.who(id);
    let koma = who.div.querySelector(`.load.iru .koma`);

    let div = document.createElement('div');
    div.className = `ef ${code}`;
    koma.appendChild(div);
    // setTimeout(() => div.remove(), time);
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

//#region 連打するやつ

// let count = 0;
// let startTime;
// let duration = 5000;
// document.querySelector('#start-btn').addEventListener('click', () => {
//     count = 0;
//     startTime = Date.now();
//     document.querySelector('#result').textContent = 'pless Enter(nandomo)';
//     document.querySelector('#start-btn').style.display = 'none';
//     document.addEventListener('keyup', countRensha);
//     setTimeout(() => {
//         document.removeEventListener('keyup', countRensha);
//         document.querySelector('#result').textContent = `結果: ${count} 回`;
//         document.querySelector('#start-btn').style.display = 'block';
//     }, duration);
// });
// function countRensha(event) {if (event.key === 'Enter') {count++;}}
// function RENDAchange(time) {
//     document.getElementById(`RENDABUTTON${duration}`).style.color = '#000000';
//     document.getElementById(`RENDABUTTON${time}`).style.color = '#23aa23';
//     duration = time;
// }

let renGD = document.getElementById('renda-game');
let renGC = {
    now: 0,
    count: 0,
}
let renGF = {};
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

