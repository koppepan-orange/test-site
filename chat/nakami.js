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
function tobiText(youso, mes){
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
function copytext(text){
    navigator.clipboard.writeText(text);
}
function El(tag, cls, children = []){
    let e = document.createElement(tag);
    if(cls) e.className = cls;
    children.forEach(c => e.appendChild(c));
    return e;
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
function arrayShuffle(array){
    for(let i=(array.length-1); i>0; i--){
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
function copy(moto){
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
function probb(num){
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
    await logF.addtext(text);
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
function timeDifference(kako){
    let now = new Date();
    let past = new Date(
        kako.slice(0, 4),
        kako.slice(4, 6) - 1,
        kako.slice(6, 8),
        kako.slice(8, 10),
        kako.slice(10, 12)
    );

    let diff = now - past;
    let d = {
        minute:Math.floor(diff / (1000 * 60)),
        hour:Math.floor(diff / (1000 * 60 * 60)),
        day:Math.floor(diff / (1000 * 60 * 60 * 24)),
        month:(now.getFullYear() - past.getFullYear()) * 12 + now.getMonth() - past.getMonth(),
        year:now.getFullYear() - past.getFullYear()
    };

    if(d.minute < 60){
        return `${d.minute}分前`;
    }else if(d.hour < 24){
        return `${d.hour}時間前`;
    }else if(d.day < 30){
        return `${d.day}日前`; //30日未満なら「日」
    }else if(d.month < 12){
        return `${d.month}ヶ月前`; //12ヶ月未満なら「月」
    }else{
        return `${d.year}年前`; //それ以上なら「年」
    }
}
//#endregion
//#region log&text
let logD = document.getElementById('log');
let logC = {
    mainD: logD.querySelector('.main'),
    togD: logD.querySelector('.opener'),
    textD: logD.querySelector('.text'),
    autoDelay: 1,
    skipText: false,
    clearText: false,
    loopText: 0,
    ing: 0,
    queue: []
}
logC.colors = [
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
let logF = {};

logF.cc = (raw) => {
    let text = [];
    let color = null;

    for(let i = 0; i < raw.length; i++){
        let sym = false;
        for(let c of logC.colors){
            if(raw[i] == c.sym && raw[i + 1] == c.sym){
                console.log(`→${raw[i]}← 発見！ ${c.name}色です`);
                color = color ? null : c.col;
                i++;
                sym = true;
                break;
            }
        };
        if(sym) continue;

        text.push({
            char: raw[i],
            color: color
        });
    }
    return text;
};

logF.waitfor = async() => {
    let len = logC.queue.length;

    if(len == 0) logC.loopText = 0;
    else logC.loopText = 1;

    if(!logC.loopText) return;
    requestAnimationFrame(waitforAddtext);

    if(logC.ing) return;
    let raw = logC.queue.shift();
    // console.log(`${raw}を送信します`);
    // console.log(`残り: (${len - 1})[${logC.queue}]`);
    await logF.addtext(raw);
};
logF.addtext = async(raw) => {
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');
    if(typeof raw != 'string') raw = String(raw);

    if(logC.ing){
        logC.queue.push(raw);

        if(!logC.loopText) logF.waitfor();
        return;
    };
    
    logC.ing = 1;
    text = logF.cc(raw);
    logC.textD.innerHTML = "";
    logC.textD.style.display = "block";
    logC.clearT = false;

    let index = 0;
    return new Promise((resolve) => {
        async function type(){
            if(index < text.length){
                if(logC.skipT){
                    while(index < text.length){
                        let span = document.createElement("span");
                        span.textContent = text[index].char;
                        if(text[index].color) span.style.color = text[index].color;
                        logC.textD.appendChild(span);

                        index++;
                    }
                    index = text.length;
                    logC.skipT = false;
                    setTimeout(type, 10);
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.style.color = text[index].color;
                    logC.textD.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                logF.addlog(logC.textD.innerHTML);
                let waitTime = logC.autoDelay * 1000;
                let timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                let userAction = new Promise(resolve => {

                    function waitToClear(event){
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
                    logC.textD.textContent = "";
                    logC.textD.style.display = "none";
                    logC.clearT = true;
                    logC.skipT = false
                    logC.ing = 0;
                    resolve('end');
                });
            }
        };
        type();
    });
};
document.addEventListener('keydown', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = true;
});
document.addEventListener('keyup', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = false;
});
document.addEventListener('click', () => {
    logC.skipT = true;
    setTimeout(() => logC.skipT = false, 50); // 一時的にスキップを有効化
});

logF.tog = (code = NaN) => {
    jump:{
        if(!isNaN(code)) break jump;

        logD.classList.toggle('tog');
        logC.togD.textContent = logD.classList.contains('tog') ? '<' : '>';
        return;
    };

    if(code == 1){
        logD.classList.add('tog');
        logC.togD.textContent = '<';
    };
    if(code == 0){
        logD.classList.remove('tog');
        logC.togD.textContent = '>';
    };

};
logC.togD.addEventListener('click', logF.tog);

logF.addlog = (text) => {
    logC.mainD.innerHTML += text + '<br>';
    logC.mainD.scrollTop = logC.mainD.scrollHeight;
};
//#endregion
//#region description
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
    
    while(div && !div.classList.contains('draggable')){
        if(div.tagName == 'BODY') return; //戻りすぎね
        div = div.parentElement;
    }

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
//#endregion //#region tk
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
let Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'cube12', type:'ttf'}
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

    let el = document.createElement('style');
    el.id = id;
    el.type = 'text/css';
    el.appendChild(document.createTextNode(css));
    document.head.appendChild(el);
}
fontsLoad();
//#endregion
//#region images & sounds
let images = {};
let sounds = {};
let loaC = {
    imgT: 0, imgD: 0,
    souT: 0, souD: 0,
    erd: 0
}
let loaF = {};
loaC.imgL = {
    // systems:['error'],
}
loaC.imgT = Object.values(loaC.imgL).length;

loaC.souL = {
    // se:['error'],
    // bgm:[],
}
loaC.souT = Object.values(loaC.souL).length;

loaF.load = async() => {
    if(await loaF.loadI()) return 1;
    return 0;
}
loaF.loadI = async() => {
    let kasan = () => {
        loaC.imgD++;
        if(loaC.imgD == loaC.imgT) loaF.loadS();
    }

    if(loaC.imgT == 0) return loaF.loadS();
    for(let belong in loaC.imgL){
        images[belong] = {};

        for(let name of loaC.imgL[belong]){
            let img = new Image();
            img.src = `assets/images/${belong}/${name}.png`;
            img.onload = kasan();
            img.onerror = () => {
                console.error(`Image assets/images/${belong}/${name}.png failed to load.`);
                loaC.erd += 1;
                 if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
                img.src = `assets/images/systems/error.png`;
                kasan();
            };
            
            images[belong][name] = img;
        }   
    }
}

loaF.loadS = async() => {
    let kasan = () => {
        loaC.souD += 1;
        if(loaC.souD == loaC.souT) loaF.end();
    }
    
    if(loaC.souT == 0) return loaF.end();
    for(let belong in loaC.souL){
        sounds[belong] = {};

        for(let name of loaC.souL[belong]){
            let sound = new Audio();
            sound.preload = 'auto';
            sound.src = `assets/sounds/${belong}/${name}.mp3`;
            if(belong == 'bgm'){
                sound.loop = true;
                sound.dataset.type = 'bgm';
                sound.volume = souC.bgm;
            }
            if(belong == 'se'){
                sound.dataset.type = 'se';
                sound.volume = souC.se;
            }
            sound.addEventListener('canplaythrough', () => {
                kasan();
            }, {once: 1});
            sound.onerror = () => {
                console.error(`Sound assets/sounds/${belong}/${name} failed to load.`);
                loaC.erd += 1;
                 if(loaC.erd > 20) return console.error('さすがにやりすぎbonus'), 1;
                sound.src = `assets/sounds/se/error.mp3`;
                kasan();
            };

            sounds[belong][name] = sound;
        }
    };
}
loaF.end = () => {
    console.log(`images & sounds loaded! (error: ${loaC.erd})`);
    start();
}

let souC = {
    se: 0.5,
    bgm: 0.5,
    nowBgm: null
}
function soundPlay(name){
    if(!sounds[name]) return soundPlay('error');
    let proto = sounds[name];

    if(proto.dataset.type == 'bgm'){
        if(souC.nowBgm == name && !proto.paused) return;
        if(souC.nowBgm && sounds[souC.nowBgm] && !sounds[souC.nowBgm].paused){
            sounds[souC.nowBgm].pause();
            sounds[souC.nowBgm].currentTime = 0;
        }
        proto.volume = souC.bgm;
        proto.play().catch(e => console.warn('BGM 再生エラー', e));
        souC.nowBgm = name;
    }else{
        let clone = proto.cloneNode(true);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', ()=> {
            try{clone.src = '';}catch(e){}
        });
        clone.play().catch(e => console.warn('SE 再生エラー', e));
    }
}
function soundStop(){
    Object.keys(sounds).forEach(k => {
        try{
            sounds[k].pause();
            sounds[k].currentTime = 0;
        }catch(e){}
    });
    souC.nowBgm = null;
    document.querySelectorAll('audio,video').forEach(el => { el.pause(); el.currentTime = 0; });
}
function soundVolume(code, val){
    if(typeof code == 'number' && typeof val == 'undefined') val = code, code = 'both';
    if(typeof val !== 'number') return console.error('val は数値にして');
    let v = val;
    if(v > 1) v = Math.max(0, Math.min(1, v/100)); // 0-100 指定を 0-1 に
    v = Math.max(0, Math.min(1, v));

    if(code == 'se' || code == 'both'){
        souC.se = v;
        for(k in sounds) if(sounds[k].dataset.type == 'se') sounds[k].volume = souC.se;
    }
    if(code == 'bgm' || code == 'both'){
        souC.bgm = v;
        for(k in sounds) if(sounds[k].dataset.type == 'bgm') sounds[k].volume = souC.bgm;
        if(souC.nowBgm && sounds[souC.nowBgm]) sounds[souC.nowBgm].volume = souC.bgm;
    }

    console.log(`[soundVolume] se:${souC.se} bgm:${souC.bgm}`);
}
soundVolume(50);

document.addEventListener('DOMContentLoaded', async() => await loaF.load());
//#endregion





//#region document
let comD = document.getElementById('commu');
let comC = {
}
//#endregion

//#region update
function update(){
    
    
}
//#endregion

//#region Login
let logiD = document.getElementById('login');
function autoLogin(){
    username = getLocalStorage("username");
    if(username){
        console.log("自動ログインしました");
        usersRef = database.ref(`users/${username}`);
        rontoRef = database.ref(`users/${username}/rontoConnect`);
        nicoText('wait for now...')
        login();
    }else{
        console.log("ログインしてください");
        loginD.classList.add('appe')
    }
}
function login(){
    nickname = username;
}
function commuLogout(){
    room = 1;
    nickname = '';   
}
let room = 1;
let nickname = 'no name';
let AnonymousName = "/nanj 名前 で変えられるよ!!!!";
let maxMessage = 20;
let userData = null;
//#endregion

//#region nanj
let nanD = document.getElementById('nanj');
let nanC = {
    room: "hub",
}
let sendButton = document.getElementById('send-button');
let MessageIn = document.getElementById('message-input');
let Messages = document.getElementById('messages');
let messagesRef = database.ref(`rooms/${room}/messages`);

MessageIn.addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
    if(!e.shiftKey){
        e.preventDefault();
        sendButton.click();
    }else{
        MessageIn.value += '<br>'
    }
}
});


/*

messagesRef.push({
    text: Mtext,
    nickname: nickname,
    username: Musername,
    timestamp: formatDate(new Date())
});

messagesRef.push({
    text: message,
    nickname: nickname,
    username: username,
    timestamp: formatDate(new Date())
}); 

messagesRef.on('child_added', async function(snapshot){
    let messageData = snapshot.val();
    let messageElement = makeNanjPost(messageData,snapshot.key)
    Messages.appendChild(messageElement);
});

*/



//#region twitter2
let twiD = document.getElementById('twitter2');

let tweets = document.getElementById('tweets');
let troom = 'home';
let tweetsRef = database.ref('tweets/1');
let treplyRef = database.ref('tweets');
let treplyMode = 0;

let TAdd
function selectTweetsroom(){
    removeEventListener('child_added', TAdd);
    tweets.innerHTML = '';
    troom = 'home'; //
    tweetsRef = database.ref(`tweets/${troom}`);
    usersRef = database.ref('users/'+username);
    tweetsRef.once('value', function(snapshot){
        displayAllTweets();
    });


    TAdd = tweetsRef.on('child_added', async function(snapshot){
        let messageData = snapshot.val();
        let messageElement = makeTwitter2Post(messageData,snapshot.key, 1)

        tweets.insertBefore(messageElement, tweets.firstChild);
    });
}
document.getElementById('t-make-button').addEventListener('click', () => {//一方通行の色恋にしてもいいかも　
    let zone = document.getElementById('t-make-zone')
    if(zone.style.bottom === '0px'){
        zone.style.bottom = '-600px';
    }else{
        zone.style.bottom = '0px';
    }
});
document.getElementById('t-make-send').addEventListener('click', () => {
    let Text = document.getElementById('t-make-text').innerText;
    if(treplyMode == 0){
        let newPush = tweetsRef.push({
            text: Text,
            username: username,
            timestamp: formatDate(new Date()),
            time: formatTime(new Date()),
            layer: 1,
            heart:{
                'null':true
            },
            reply:{
                'null':{
                    text:'null',
                    username:'null',
                    timestamp:'2009/09/22 00:00:00',
                    time:20090922000000,
                    heart:{
                        'null':true,
                    }
                }
            }
        });
        let key = newPush.key;
        newPush.update({
            key: key
        })
    }else{
        let newPush = treplyRef.push({
            text: Text,
            username: username,
            timestamp: formatDate(new Date()),
            time: formatTime(new Date()),
            prevkey: keepKey,
            layer: 2,
            heart:{
                'null':true
            },
            reply:{
                '-KorE8NUl1DeSU4':{
                    text:'null',
                    username:'null',
                    timestamp:'2009/09/22 00:00:00',
                    time:20090922000000,
                    heart:{
                        'null':true,
                    }
                }
            }
        });
        let key = newPush.key;
        newPush.update({
            key: key
        })
    }
    document.getElementById('t-make-text').value = '';
    let zone = document.getElementById('t-make-zone');
    zone.style.bottom = '-600px';
    treplyMode = 0;
})
document.getElementById('t-make-cancel').addEventListener('click', () => {
    let zone = document.getElementById('t-make-zone')
    zone.style.bottom = '-600px';
    document.getElementById('t-make-text').value = '';
    treplyMode = 0;
})

let keepKey = null;
let keepLayer = null;
function makeTwitter2Post(messageData, key, layer){
    let messageElement = document.createElement('div');
    messageElement.className = 'tweet';
    if(layer == 2){
        messageElement.className += ' reply';
    }
    messageElement.setAttribute('data-key', key);

    let userElement = document.createElement('div');
    userElement.className = 'header';

    let iconElement = document.createElement('img');
    iconElement.className = 'icon';
    firebase.database().ref(`users/${messageData.username}/icon`).once("value").then((snapshot) => {
        if(snapshot.exists()){
            iconElement.src = snapshot.val();
        }else{
            iconElement.src = 'assets/sozais/none.png';
        }
    });
    userElement.appendChild(iconElement);

    messageElement.appendChild(userElement);

    let column = document.createElement('div');
    column.className = 'column';

    let contentElement = document.createElement('div');
    contentElement.className = 'content';
    if(layer == 1){
        contentElement.addEventListener('click', contentClicked);
        function contentClicked(){
            keepKey = key;
            
            let newTweetroom = document.createElement('div');
            newTweetroom.className = 'tweets-2';

            let back = document.createElement('div');
            back.className = 't-tweet-back';
            back.innerText = '←'
            back.addEventListener('click', () => {
                newTweetroom.style.opacity = 0;
                document.getElementById('twitter2').removeChild(newTweetroom);
            });
            newTweetroom.appendChild(back);

            let motono = document.createElement('div');
            motono.className = 't-tweet-motono';

            // let copiedTweet = messageElement.cloneNode(true); //コピーするやつ
            // copiedTweet.removeEventListener('click', contentClicked);
            // motono.appendChild(copiedTweet);
            motono.innerHTML = messageElement.outerHTML;
            motono.querySelector('.tweet').classList.add('motono');

            newTweetroom.appendChild(motono);

            let replies = document.createElement('div');
            replies.className = 't-tweet-replies';
            
            database.ref(`tweets/${troom}/${key}/reply`).once("value").then((snapshot) => {
                if(snapshot.exists()){
                    snapshot.forEach((snapshoten) => {
                        let reply = snapshoten.val();
                        if(reply.key != '-KorE8NUl1DeSU4' && reply.username != 'null'){
                            let replyElement = makeTwitter2Post(reply, snapshoten.key, 2);
                            replies.appendChild(replyElement);   
                        }else{
                            console.log('てか、ただのnullじゃないですか！', snapshoten.val().key);
                        }
                    });
                }
            });

            // if(replies.children.length > 0){
                newTweetroom.appendChild(replies);
            // }

            document.getElementById('twitter2').appendChild(newTweetroom);
            newTweetroom.style.opacity = 1;
        }
    }

    let usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = messageData.username;//クリックされたらその人のみに〜みたいなのあり
    contentElement.appendChild(usernameElement);

    let timestampElement = document.createElement('span');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = '　'+timeDifference(messageData.time.toString());
    contentElement.appendChild(timestampElement);

    let brElement = document.createElement('br');
    contentElement.appendChild(brElement);

    let textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerText = messageData.text;
    contentElement.appendChild(textElement);

    column.appendChild(contentElement);

    let evaluationElement = document.createElement('div');
    evaluationElement.className = 'evaluation';

    let heartElement = document.createElement('div');
    heartElement.className = 'eval heart';

    // カウントを取得
    let updateHeartDisplay = (snapshot) => {
        let heartData = snapshot.val() || {}; 
        let count = Object.values(heartData).length - 1; // null分を引く
        heartElement.textContent = '♡ ' + Math.max(0, count);
        heartElement.style.color = (username in heartData) ? 'red' : 'black';
    };
    let heartRef = database.ref(`tweets/${troom}/${key}/heart`);
    if(layer == 2){
        heartRef = database.ref(`tweets/${troom}/${keepKey}/reply/${key}/heart`);
    }
    heartRef.on('value', updateHeartDisplay);
    heartElement.addEventListener('click', async function () {
        heartRef.once('value', function(snapshot) {
            let heartData = snapshot.val() || {};
            if (username in heartData) {
                heartRef.child(username).remove();
            } else {
                heartRef.child(username).set(true);
            }
        });
    });
    evaluationElement.appendChild(heartElement);

    if(layer == 1){
        let replyElement = document.createElement('span');
        replyElement.className = 'eval reply';
        replyElement.textContent = '→';
        replyElement.addEventListener('click', async function(){
            treplyRef = database.ref(`tweets/${troom}/${key}/reply`);
            treplyMode = 1;
            // keepLayer = 2;
            messageElement.click();
            document.getElementById('t-make-text').innerText = '';
            let zone = document.getElementById('t-make-zone');
            zone.style.bottom = '0px';
        });
        evaluationElement.appendChild(replyElement);
    }

    if(layer == 2){
        let mentionElement = document.createElement('span');
        mentionElement.className = 'eval mention';
        mentionElement.textContent = '→';
        mentionElement.addEventListener('click', async function(){
            document.getElementById('t-make-text').innerText = `@${messageData.username}`;
            let zone = document.getElementById('t-make-zone');
            zone.style.bottom = '0px';
        });
        evaluationElement.appendChild(mentionElement);
    }

    column.appendChild(evaluationElement);

    messageElement.appendChild(column);

    return messageElement;
}

function displayAllTweets(){
    document.getElementById('tweets').innerHTML = '';

    // データベースから全てのメッセージを取得
    tweetsRef.once('value', function(pealentsnapshot){
        pealentsnapshot.forEach(function(snapshot){
            let messageData = snapshot.val();
            let messageElement = makeTwitter2Post(messageData,snapshot.key, 1)
            tweets.insertBefore(messageElement, tweets.firstChild);
        });
    });
}




//#endregion
//#region jine
let jinD = document.getElementById('jine');

//#endregion




//#region start
function start(){
    Style.tekiou();
}
//#endregion
