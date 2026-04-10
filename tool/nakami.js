//#region komagome
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
};

async function nicoText(mes){
    console.log(`[nico] ${mes}`);
    let div = document.createElement('div');
    div.textContent = mes;
    div.className = 'nicotext';
    document.querySelector('body').appendChild(div);

    let wid = div.offsetWidth;
    div.style.top = `calc(${random(0, 100)}vh - 20px)`;
    div.style.right = `-${wid}px`;

    requestAnimationFrame(() => div.style.right = `${window.innerWidth + wid}px`);
    
    await delay(5000); 
    div.remove();
};
function tobiText(youso, mes){
    let el = youso;
    if(typeof el == 'string') el = document.querySelector(youso);
    if(!el) return console.error('せんぱ〜い？この要素壊れてますよ〜〜？');

    console.log(`[tobi] ${mes}`);

    let rect = el.getBoundingClientRect();
    let left = rect.left + window.scrollX + rect.width / 2;
    let top = rect.top + window.scrollY + rect.height / 2;

    let node = document.createElement('div');
    node.className = 'tobitext';
    node.innerText = mes;
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
    console.log(`[copy] ${text}`);
    navigator.clipboard.writeText(text)
}
async function kirameki(div0, zukey = 'star', n = 20, time = 2000, col){
    let taioued = ['star', 'heart'];
    if(!taioued.includes(zukey)) return console.log(`図形が対応していません。現在対応しているのは[${taioued.join(', ')}]だけであります。`);
    let rect = div0.getBoundingClientRect();
    let cenX = rect.left + rect.width / 2 + window.scrollX;
    let cenY = rect.top + rect.height / 2 + window.scrollY;

    let divs = [];
    for(let i=0; i<n; i++){
        let div = document.createElement('div');
        div.className = `kirameki p_${zukey}`;
        // 初期は中央にpxで置く（CSS側で position:absolute を想定）
        div.style.left = `${cenX}px`;
        div.style.top = `${cenY}px`;
        if(zukey == 'star') div.style.transform = `rotate(${Math.random() * 360}deg)`;
        if(col) div.style.background = col;
        document.body.appendChild(div);
        divs.push(div);
    }

    divs.forEach(div => {
        let angle = Math.random() * 2 * Math.PI;
        let speed = Math.random() * 2 + 1;
        let velocityX = Math.cos(angle) * speed;
        let velocityY = Math.sin(angle) * speed;

        let start = performance.now();
        function animate(now){
            let elapsed = now - start;
            if(elapsed >= time){
                div.remove();
                return;
            }
            // 滑らかなイージング
            let t = elapsed / time;
            let e = 1 - Math.pow(1 - t, 3);
            // 少し拡散するように速度を掛ける
            div.style.left = `${cenX + velocityX * (elapsed / 16)}px`;
            div.style.top = `${cenY + velocityY * (elapsed / 16)}px`;
            div.style.opacity = String(1 - t);
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    });
}
function El(tag, cls, children = []){
    let e = document.createElement(tag);
    if(cls) e.className = cls;
    children.forEach(c => e.appendChild(c));
    return e;
}
function awase(div, max = 28, code = "innerText"){
    if(max == 0) max = 28; //skipと仮定する
    if(!code) return console.error(`せんぱ〜い..? ${code}なんていうよくわからないものは使わないでくださ〜い笑`);

    let wid = div.clientWidth;
    let len = div[code].length;
     if(len == 0) return;
    let px = wid/len;
     if(max < px) px = max;
    div.style.fontSize = `${px}px`;
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
    let end2 = sta2 + row - 1;
    if(end2 > end) end2 = end;

    let arr = [];
    for(let i = sta2; i <= end2; i++) arr.push(i);

    return arr;
};
function arraySelect(array){
    let select = Math.floor(Math.random()*array.length);
    return array[select];
};
function arrayToggle(array, name){
    let array2 = copy(array);
    let index = array2.indexOf(name);
    if(index == -1) array2.push(name);
    else array2.splice(index, 1);
    
    return array2;
}
function arrayShuffle(array){
    let ato = copy(array);
    for(let i=(ato.length-1); i>0; i--){
        let i2 = Math.floor(Math.random() * (i + 1));
        [ato[i], ato[i2]] = [ato[i2], ato[i]];
    };
    return ato;
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
    let res = Object.prototype.hasOwnProperty.call(obj, key)
    if(res) return 1;
    return 0;
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
function hit(num){
    return +(Math.random()*100 <= num);
    //例:num == 20 → randomが20以内なら1, elseなら0を返す
};
function roll(n, m){
    let res = 0;
    for(let i=0; i<n; i++) res += random(1, m);

    if(3 < m && res == n*m) console.log('ファンブル！');
    if(3 < m && res == n) console.log('クリティカル！');
    return res;
    //例:n = 1, m = 100 => 100面ダイスを1回振った出目の合計を返す
}
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
    for(let a of Object.keys(optcou)){
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
// LocalStorage(Data) => lsd
function lsdSet(name, value){
    if(Array.isArray(value) ||
       typeof value == 'object') value = JSON.stringify(value);
    localStorage.setItem(name, value || "");
};
function lsdGet(name){
    let res = localStorage.getItem(name);
    if(res) res = JSON.parse(res);
    else return null;
    return res;
};
function lsdRem(name){
    localStorage.removeItem(name);
}
function lsdShow(){
    let itemCount = localStorage.length;
    console.error(`-- LocalStorageのアイテム数: ${itemCount} --`);
    for(let i = 0; i < itemCount; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        // nicoText(`キー: ${key}, 値: ${value}`);
        console.log(`キー: ${key}, 値: ${value}`);
    }
    console.error(`-- 以上 --`);
}

function irohaHo(color){
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
function irohaMix(c1, c2, ratio = 0.5){
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
function irohaRan(){
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    let ato = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
    return ato;
};
function irohaDark(color) {
    color = color.replace('#', '');
    if (color.length === 3) color = color.split('').map(x => x + x).join('');
    
    let r = parseInt(color.slice(0, 2), 16);
    let g = parseInt(color.slice(2, 4), 16);
    let b = parseInt(color.slice(4, 6), 16);

    // 相対輝度の近似計算
    // 0.2126 * R + 0.7152 * G + 0.0722 * B
    let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    
    return luma < 128; // 暗い色ならtrue
}

function timeDiff(kako){
    if(typeof kako == 'number') kako = kako.toString();
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
function timeToshow(date){ //見る用
    if(!date) console.error('日付がありませんぜ旦那！');
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}
function timeTodata(date = new Date()){ //データ保存用
    if(!date) date = new Date(), console.warn('あなた、日付を入れ忘れてるわよ');
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let time = `${year}${month}${day}${hours}${minutes}`;
    return +time;
}

function cursorSelect(){
    let selected = window.getSelection();
    let res = '';
    if(0 >= selected.rangeCount) return '';

    res = selected.toString();
    return res;
}
function cursorEnd(){
    let selected = window.getSelection();
    if(0 >= selected.rangeCount) return 1;
    selected.collapseToEnd();
    return 0;
}
function cursorActive(){
    let el = document.activeElement;
    let res = 0;
    if(el.tagName == 'INPUT') res = 1;
    if(el.tagName == 'TEXTAREA') res = 2; //改行可
    if(el.isContentEditable) res = 1;
    return res;
}
function cursorHas(){
    let selected = window.getSelection();
    let text = selected.toString();
    if(text.length <= 0) return 0;
    return text;
}
function cursorRect(){
    let selection = window.getSelection();
    if(selection.rangeCount == 0) return 0;
    
    let range = selection.getRangeAt(0);
    return range.getBoundingClientRect();
}

async function error(text = 'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'){
    await logText(text);
    await delay(2000);
    // window.open('about:blank', '_self').close();
};
//#endregion
//#region log&text
let logD = document.getElementById('log');
let logC = {
    mainD: logD.querySelector('.main'),
    togD: logD.querySelector('.opener'),
    textD: logD.querySelector('.text'),
    autoDelay: 1,
    skipText: 0,
    clearText: 0,
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
        let sym = 0;
        for(let c of logC.colors){
            if(raw[i] == c.sym && raw[i + 1] == c.sym){
                console.log(`→${raw[i]}← 発見！ ${c.name}色です`);
                color = color ? null : c.col;
                i++;
                sym = 1;
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
    requestAnimationFrame(logF.waitfor);

    if(logC.ing) return;
    let raw = logC.queue.shift();
    // console.log(`${raw}を送信します`);
    // console.log(`残り: (${len - 1})[${logC.queue}]`);
    await logText(raw);
};
async function logText(raw){
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
    logC.clearT = 0;

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
                    logC.skipT = 0;
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
                logText_log(logC.textD.innerHTML);
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
                    logC.clearT = 1;
                    logC.skipT = 0
                    logC.ing = 0;
                    resolve('end');
                });
            }
        };
        type();
    });
};
document.addEventListener('keydown', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = 1;
});
document.addEventListener('keyup', (e) => {
    if(e.key === 'z' || e.key === 'Enter') logC.skipT = 0;
});
document.addEventListener('click', () => {
    logC.skipT = 1;
    setTimeout(() => logC.skipT = 0, 50); // 一時的にスキップを有効化
});

logF.tog = (code = NaN) => {
    if(isNaN(code)){
        logD.classList.toggle('tog');
        logC.togD.textContent = logD.classList.contains('tog') ? '<' : '>';
    }
    else{
        if(code == 1){
            logD.classList.add('tog');
            logC.togD.textContent = '<';
        };
        if(code == 0){
            logD.classList.remove('tog');
            logC.togD.textContent = '>';
        };
    }

    let isTog = logD.classList.contains('tog');
    let isHid = logD.classList.contains('hid');
    if(isTog && isHid) logF.woah(0);
};
logC.togD.addEventListener('click', logF.tog);

logF.woah = (code = NaN) => {
    if(isNaN(code)){
        logD.classList.toggle('hid');
    }
    else{
        if(code == 1) logD.classList.add('hid');
        if(code == 0) logD.classList.remove('hid');
    }

    let isTog = logD.classList.contains('tog');
    let isHid = logD.classList.contains('hid');
    if(isTog && isHid) logF.tog(0);
};

function logText_log(text){
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
//#region OBS
let OBS = {
    keys: {},
    cling: 0,
    cring: 0,
    mx: 0,
    my: 0
}

OBS.KeysA = (e) => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    OBS.keys[key] = 1;
};
OBS.KeysR = (e) => {
    let key = e.key.toLowerCase();
    if(e.key == ' ') key = 'space';
    OBS.keys[key] = 0;
};

OBS.PonD = (e) => {
    if(e.buttons == 0) OBS.cling = 1;
    if(e.buttons == 2) OBS.cring = 1;
};
OBS.PonU = (e) => {
    if(e.buttons == 0) OBS.cling = 0;
    if(e.buttons == 2) OBS.cring = 0;
};
OBS.ponC = (e) => {
    if(e.buttons == 0) OBS.cling = 0;
    if(e.buttons == 2) OBS.cring = 0;
};
OBS.PonB = () => {
    OBS.cling = 0;
    OBS.cring = 0;
}

OBS.Mouse = (e) => {
    OBS.mx = e.clientX;
    OBS.my = e.clientY;
};


OBS.Paste = (event) => {
    // プレーンペーストに強制的にするやつ？
    event.preventDefault();
    let text = event.clipboardData.getData("text/plain");
    let selection = window.getSelection();
    if(!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    selection.collapseToEnd();
};

OBS.load = () => {
    let sts = {
        "Keys": 1,
        "Mouse": 1,
        "Click": 1,
        "Paste": 0,
    }

    if(sts["Keys"]){
        window.addEventListener('keydown', OBS.KeysA);
        window.addEventListener('keyup', OBS.KeysR);
    }

    if(sts["Mouse"]){
        window.addEventListener('mousemove', OBS.Mouse);
    }

    if(sts["Click"]){
        window.addEventListener('pointerdown', OBS.PonD);
        window.addEventListener('pointerup', OBS.PonU);
        window.addEventListener('pointercancel', OBS.ponC);
        window.addEventListener('blur', OBS.PonB);
    }

    if(sts["Paste"]){
        window.addEventListener('paste', OBS.Paste);
    }
}

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
    systems:['error'],
}
loaC.imgT = Object.values(loaC.imgL).reduce((a,b) => a + b.length, 0);

loaC.souL = {
    // se:['error'],
    // bgm:[],
}
loaC.souT = Object.values(loaC.souL).reduce((a,b) => a + b.length, 0);

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
                sound.loop = 1;
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
        let clone = proto.cloneNode(1);
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
//#endregion
//#region 幸せになれる隠しコマンドがあるらしい
let secrates = [
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
]
document.addEventListener('keydown', async function(e){
    let key = e.key.toLowerCase();
    if(key == 'escape') loop = 0;

    if(document.activeElement.tagName == 'INPUT') return;
    if(document.activeElement.tagName == 'TEXTAREA') return;

    for(let sec of secrates){
        let nke = sec.arr[sec.ind];
        // console.log(`必要は${nke}、押されたは${key}！`);
        if(key == nke){
            sec.ind += 1;
            if(sec.ind == sec.arr.length && sec.limit){
                console.log(`${sec.name}発動！！[${sec.arr.join(' ')}]`);
                sec.ind = 0;
                let res = await sec.func();
                if(!res && sec.limit != 'n') sec.limit -= 1;
            }
        }
        else sec.ind = 0;
    }
})
//#endregion


// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0
}
mainC.spas = [ //classはspace想定、shoは1つだけ
    // { name:'home', rank:2, back:'#f0f8ff', sho:1 }, 
];
let mainF = {};
mainF.move = (to) => {
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of mainC.spas) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
}

mainF.load = () => {
    for(let spa of mainC.spas){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
    }
}

//#region movlis
for(let n of mainC.spas){
    let li = document.createElement('div');
    li.textContent = n.name;
    li.className = 'item';

    li.addEventListener('click', () => mainF.move(n.name));

    mainC.mvlsLD.appendChild(li);
}
document.addEventListener('keydown', (e) => {
    if(e.key != 'm' || mainC.mvlsi) return;
    mainC.mvlsD.style.left = `${OBS.mx - mainC.mvlsD.offsetWidth/2}px`;
    mainC.mvlsD.style.top = `${OBS.my}px`;
    mainC.mvlsD.classList.add('tog');
    mainC.mvlsi = 1;
})
document.addEventListener('keyup', e => {
    if(e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
})
//#endregion

//#endregion main


//#region 文字数カウント
let countD = document.querySelector('#zatta .textcount');
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
let ransD = document.querySelector('#zatta .ransele');
let ransC = {
    oyaD: ransD.querySelector('.oya'),
    texD: ransD.querySelector('.oya .text'),
    impI: ransD.querySelector('.input'),
    ing: 0
}
let ransF = {};
ransF.act = async() => {
    if(ransC.ing) return nicoText('少々お待ちを〜');
    let val0 = ransC.impI.value;
    if(!val0) return tobiText(ransC.texD, '文字が入力されていないですよ〜？');
    
    let val = val0.split('\n').filter(v => v.trim() !== '');
    if(val.length == 0) return tobiText(ransC.texD, 'えっと〜..できれば空行のみはやめてほしくってぇ...');
    if(val.length == 1) tobiText(ransC.texD, '単語が一つしかないんで、ランダムに選ばれても同じですよ〜？');

    ransC.ing = 1;
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
    kirameki(ransC.texD, 'star');
    ransC.ing = 0;
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
let anagD = document.querySelector('#zatta .anagram');
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

let henD = document.querySelector('#zatta .hen');
let henC = {
    valI: henD.querySelector('.input'),
    aveI: henD.querySelector('.average'),
    outI: henD.querySelector('.output'),
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
let rannmD = document.querySelector('#zatta .rannm');
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

let beeGD = document.querySelector('#zatta .bee-game');
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
    div2.querySelector('.img').src = `assets/images/raceGCs/${name}.png`;
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
                 img.src = `assets/images/raceGCs/${who.data.name}_sd.png`;
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


//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();



    mainF.move('zatta');
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else LoadOfWait();

async function init() {
    await LoadOfWait();
    start();
}
//#endregion
