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
async function tousa(moto, key, d, n, wait = 0, s = 0){
    // type:: kouならi<n madeならwhileでif抜け
	let a = moto[key]; //初項
	if(a != 0 && (!a || typeof a != "number")) return console.error("..それ数字じゃないです...."), 1;
	if(d == 0) return console.error("む、むむ無限が..見えますっ...."), 1;
	
	if(!wait) wait = 10;
	if(s) n = (s-a)/d; //うわがき ほんとは等差数列の和の公式を使いたかった
    if(n < 0) d = -d;
    n = Math.ceil(Math.abs(n));
	
    for(let i=0; i<n; i++){
        await delay(wait);
        moto[key] += d;
    }
}
async function touhi(moto, key, r, n, wait = 0, s = 0){
    // type:: kouならi<n madeならwhileでif抜け
	let a = moto[key]; //初項
	if(a != 0 && (!a || typeof a != "number")) return console.error("..それ数字じゃないです...."), 1;
    if(a == 0) return console.error("初項0の等比数列、、？"), 0;
	if(r == 0) return console.error("...これは何？"), 0;
    if(r == 1) return console.error("あ、あの...これも無限が見えます..."), 1;
	
	if(!wait) wait = 10;
	if(s) n = Math.log(s/a) / Math.log(r); //うわがき ほんとは等比数列の和の公式を使いたかった
    if(n < 0) r = 1/r;
    n = Math.ceil(Math.abs(n));
	
    for(let i=0; i<n; i++){
        await delay(wait);
        moto[key] *= r;
    }
}
function dogma(matu, shiki, k = 1){
    let res = 0;

    for(let i = k; i <= matu; i++){
        res += shiki(i);
        console.log(i, shiki(i));
    }

    return res;
}
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
    if(!res) return null;
    try{
        res = JSON.parse(res);
        return res;
    }catch(e){
        return res;
    };
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
    // {src:'comicsans', type:'ttf'},
];
function fontsLoad(){
    let id = "font_load_css";
    let existing = document.getElementById(id);
    if(existing) existing.remove();

    let css = Fonts.map(f => {
        let src = `url('assets/fonts/${f.src}.${f.type}')`;
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
    systems:['error'],
}
loaC.imgT = Object.values(loaC.imgL).reduce((a,b) => a + b.length, 0);

loaC.souL = {
    // se:['error'],
    // bgm:[],
}
loaC.souT = Object.values(loaC.souL).reduce((a,b) => a + b.length, 0);

loaF.load = async() => {
    console.log("loadを開始しました。少々お待ちください");
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
    soundVolume(50);
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


//#region swipe
let page = 'home';
let pagen = 0;
let Pages = ['home', 'memo', 'tool', 'login', 'chat'];
let pagenMax = Pages.length - 1;
let pMoving = 0;

let startX, startY, endX, endY;
document.addEventListener("touchstart", (e) => {
    if(pMoving) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});
document.addEventListener("touchend", (e) => {
    if(pMoving) return;
    endX = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if(30 < diffX) swiped(-1); //l
    if(diffX < -30) swiped(1); //r
});

document.addEventListener("keydown", e => {
    if(pMoving) return;
    let key = e.key;
    if (!e.shiftKey && (key === "ArrowRight" || key === "ArrowLeft")) return;

    if (key === "ArrowRight") swiped(1);
    if (key === "ArrowLeft") swiped(-1);
});

function swiped(code){
    //-1 = l, 1 = r
    //console.log(`${pagen} => ${Pages[pagen + code]}`);
    if(pagen + code < 0) return;
    if(pagen + code > Pages.length-1) return;
    pagen += code;
    console.log(`${page} => ${Pages[pagen]}`);
    pageChange(code);
}
function pageAdd(name, att = null){
    //["mae", code]
    if(att == null) att = [null, null]
    if(att[0] == 'mae'){
        n = pageGet(att[1]);
        if (n != -1) Pages.splice(n - 1, 0, name);
    }
    if(att[0] == 'sel'){
        n = pageGet(att[1]);
        if (n != -1) Pages.splice(n, 0, name);
    }
    if(att[0] == 'ato'){
        n = pageGet(att[1]);
        if (n != -1) Pages.splice(n + 1, 0, name);
    }
    if(att[0] == null){
        Pages.push(name);
    }
}
function pageGet(name){
    let n = Pages.indexOf(name);
    if(n != -1) return n;
    else return console.log(`${name}は存在しねぇぜ`);
}
function pageDel(name){
    let n = Pages.indexOf(name);
    if(n != -1) Pages.splice(n, 1);
}
async function pageChange(code){
    //-1 = l, 1 = r
    pMoving = 1;
    let moto = page;
    page = Pages[pagen];
    let dir = 0;
    if(code == -1) dir = 'left';
    if(code == 1) dir = 'right';
    let ndir = dir == 'left' ? 'right' : 'left';

    let mdiv = document.getElementById(moto);
    mdiv.style[ndir] = '';
    let ndiv = document.getElementById(page);
    ndiv.style[ndir] = '';
    ndiv.style.opacity = '0';
    ndiv.style[dir] = '-100vw';
    ndiv.style.opacity = '1';

    //console.log(`ndir.. m(${mdiv.style.left}, ${mdiv.style.right}) n(${ndiv.style.left}, ${ndiv.style.right})`);
    
    requestAnimationFrame(() => {
        mdiv.style[dir] = '100vw';
        ndiv.style[dir] = '0px';
    });    

    await delay(500);

    mdiv.style.opacity = '0';
    pMoving = 0;
}


let pagC = {
    now: 0,
    page: "home",
    list:[
        // 'home', 'memo', 'tool', 'login', 'chat'
        {
            name: 'home',
            col: "#f0f8ff"
        },
        {
            name: 'memo',
            col: "#f8f6ff"
        },
        {
            name: 'tool',
            col: "#fffaf3"
        },
        {
            name: 'login',
            col: "#b5dcff"
        },
        {
            name: 'chat',
            col: "#eeffe7"
        }
    ]
}

//#endregion page

// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0
}
mainC.spas = [ //classはspace想定、shoは1つだけ
    { name:'home', rank:2, back:'#f0f8ff', sho:1 }, 
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
document.addEventListener('keyup',e => {
    if(e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
})
//#endregion

//#endregion main


//#region home

//#region リンクたちの動き
const Links = {
    'memo':[
        {
            name: 'file-site',
            href: 'https://forest-inlet.github.io/tools/fileTransfer?koppepanorange',
            iframable:1,
            description: 'ファイルを送受信できるサイトです！！<br>まじですごいと思う<br>あ友達作です'
        },
        {
            name: 'メモweb',
            href: 'https://memo.onl.jp/?Koppepan23',
            iframable:0,
            description: '昔使ってたところ。<br>今はmemo.html使ってるけどね'
        },
        {
            name: 'ファイルweb',
            href: 'https://file.onl.jp/?Koppepan23',
            iframable:0,
            description: 'これは有用ちゃん<br>ファイルを送受信できる<br>そのうち作りたい.....'
        },
        {
            name: 'writebox',
            href: 'https://write-box.appspot.com/',
            iframable:0,
            description: '簡単にhtmlのテストができるサイト<br>けどjsとcssは無効'
        },
    ],
    'tool':[
        {
            name: 'dropbox',
            href: 'https://www.dropbox.com/home',
            iframable:0,
            description: '単純に優秀な子<br>ファイルWebよりも持続性が高い<br>ログイン必須'
        },
        {
            name: 'ルーレット等生成機',
            href: 'https://jp.piliapp.com/random/wheel/',
            iframable:1,
            description: '名の通り感。<br>他にも乱数とかもいける<br>暇つぶしできるかもね'
        },
        {
            name: 'カラーサイト',
            href: 'https://www.color-site.com/',
            iframable:1,
            description: '色の種類を調べれるサイト<br>まじで優秀<br>rgbにも対応'
        },
        {
            name: 'mp3、mp4編集サイト',
            href: 'https://123apps.com/ja/',
            iframable:1,
            description: '動画→音ができるサイト<br>いつも愛用させていただいております<br>かんしゃ〜'
        },
    ],
    'make':[
        {
            name: 'scratch',
            href: 'https://scratch.mit.edu/users/koppepan_orange/',
            iframable:0,
            description: '言わずもがな<br>前はここで作ってた..っていう名残<br>でもやってほしい'
        },
        {
            name: 'flat',
            href: 'https://flat.io/ja',
            iframable:0,
            description: '音楽が比較的簡単に作れるサイト<br>ログイン必須'
        },
        {
            name: 'musescore',
            href: 'https://musescore.com/user/41107809',
            iframable:0,
            description: '楽譜を調べれるサイト<br>人気な曲はありがちだけど<br>そんなそんなな曲はないことが多い'
        },
        {
            name: 'pixnote',
            href: 'https://pixnote.net/',
            iframable:1,
            description: '簡単にドット絵が描けるサイト<br>まじで良い<br>ほんとに'
        },
        {
            name: 'pixlate',
            href: 'https://www.pixilart.com/koppepanorange',
            iframable:0,
            description: 'ドット絵が描けるサイト2<br>ちょっと複雑だけど自由度は高め'
        },
        {
            name: 'thirty dollar',
            href: 'https://thirtydollar.website/',
            iframable:0,
            description: '効果音で音楽を作れるサイト<br>internet overdoseやってる人もいたね'
        },
    ],
    'study':[
        {
            name: 'studies-site',
            href: '../studies/',
            iframable:0,
            description: '色々学べる。良いぞよジャブフ'
        },
        {
            name: 'duolingo',
            href: 'https://www.duolingo.com/profile/koppepan_orange',
            iframable:0,
            description: '言語が学べるサイト<br>ﾁｮｳﾕｰﾒｲ!ﾔﾊﾞｵ'
        },
        {
            name: '寿司打',
            href: 'http://typingx0.net/sushida/',
            iframable:0,
            description: 'タイピング競いの定番<br私は苦手です'
        },
        {
            name: 'ankey',
            href: 'https://ankey.io/@koppepanorange',
            iframable:0,
            description: '歌詞とか色々でタイピングができるサイト<br>楽しい<br>好き'
        },
    ],
    'sns':[
        {
            name: 'chat-site',
            href: 'chat.html',
            iframable:1,
        },
        {
            name: 'reddit',
            href: 'https://www.reddit.com/user/koppepan_orange/',
            iframable:0,
            description: '外国掲示板定番のやつ<br>英語しかない<br>絵はほとんど転載<br>まあ常時喧嘩してるtwitterよりはマシ'
        },
        {
            name: 'github',
            href: 'https://github.com/koppepan-orange',
            iframable:0,
            description: 'ほんとにいつもありがとね...<br>このサイトもあなたのおかげです'
        },
        {
            name: 'discord',
            href: 'https://discord.com/channels/@me',
            iframable:0,
            description: 'いつもありがとな、ほんとに<br>感謝してるぜ👍🏻'
        },
        {
            name: 'チャットweb',
            href: 'https://chat.onl.jp/?koppepan23',
            iframable:0,
            description: 'ちゃんと喋れるいいサイト<br>けどchat.htmlの方が良い'
        },
        {
            name: 'pixiv',
            href: 'https://www.pixiv.net/users/93550041',
            iframable:0,
            description: '絵が見れるサイト<br>twitterよりも民度が良い<br>絵師さんの巣窟'
        },
        {
            name: 'twitch',
            href: 'https://www.twitch.tv/koppepan_orange',
            iframable:0,
            description: '配信が見れるサイト<br>いつかはしてみたいねぇ....'
        },
        {
            name: 'instagram',
            href: 'https://www.instagram.com/koppepan_orange/',
            iframable:0,
            description: '2番目に好きなSNS<br>けど最近投稿できてない...'
        },
        {
            name: 'twitter',
            href: 'https://twitter.com/koppepan_orange',
            iframable:0,
            description: '日本で最も人気なSNS<br>色んな界隈が入り混じってて良いけど<br>気抜いたら関係ないやつらが流れ込んでくるのが難点<br>好きだけどね'
        },
        {
            name: 'youtube',
            href: 'https://www.youtube.com/channel/UCFvmwWDRrVqM22icC7QLx1w',
            iframable:0,
            description: '言わずもがな〜な動画投稿サイト<br>たまーーーに投稿してる<br>のばまんさんはおすすめ'
        },
        {
            name: 'lit.link',
            href: 'https://lit.link/koppepanorange',
            iframable:0,
            description: '私についてまとめてあるサイト<br>けど多分このサイトだけで事足りる'
        },
        {
            name: 'kiite',
            href: 'https://kiite.jp/user/koppapan_orange',
            iframable:0,
            description: '音楽が広告なしで見れるサイト<br>ボカロのみ<br>けどニコ動基盤だから学校では無理<br>ガッデム..ってやつ？<br>ベアさんといよわさんはおすすめ'
        },
        {
            name: 'MagicalDraw',
            href: 'https://draw.kuku.lu/pchat.php?hash=898857247',
            iframable:0,
            description: '俗にいう"絵チャ"<br>友達と合作ができる<br>楽しい'
        },
    ],
    'game':[
        {
            name: 'game-site',
            // href: 'https://koppepan-orange.github.io/game-site/',
            href: 'https://game.koppepan-orange.com/',
            iframable:1,
        },
        {
            name: 'cybercodeonline',
            href: 'https://cybercodeonline.com',
            iframable:0,
            description: '硬派で古き良きMMORPG<br>まじで楽しい..いや人によるかも<br>AFKが充実してて好き'
        },
        {
            name: 'browsergame',
            href: 'https://sdin.jp/browser/',
            iframable:0,
            description: '色んなゲームで遊べるサイト<br>カジノ系列もあるよ<br>確かブロック貫通'
        },
        {
            name: 'ARealMe',
            href: 'https://www.arealme.com/',
            iframable:0,
            description: '色んなテストができるサイト<br>クリック速度とか反射神経とか<br>テストサイトではないです。'
        },
        {
            name: 'unityroom',
            href: 'https://unityroom.com/new_arrivals',
            iframable:0,
            description: '色んな人の作ったゲームで遊べるサイト<br>"ゆめきゃわ"みたいなやつはおすすめ'
        }
    ],
};

Object.keys(Links).forEach(type => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = type;
    details.appendChild(summary);
    details.id = `${type}tachi`;
    document.querySelector('#home .links').appendChild(details);

    for(let link of Links[type]){
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.name;
        a.className = 'hasd';
        a.target = '_blank';
        a.setAttribute('data-description', link.description);

        a.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            //リンクをコピーさせる
            navigator.clipboard.writeText(link.href);
            nicoText('リンクをコピーしました');
        })
        
        document.getElementById(`${type}tachi`).appendChild(a);
        document.getElementById(`${type}tachi`).appendChild(document.createElement('br'));
    };
    document.getElementById(`${type}tachi`).appendChild(document.createElement('br'));
});
//#endregion

//#region rakuraku-memo
let numberOfMemo = 4;
function memoRead(){
    numberOfMemo = +lsdGet("numberOfMemo")??4;
    console.log(`メモの数は${numberOfMemo}個やで`);
    for(let i = 1; i <= numberOfMemo; i++){
        let memo = lsdGet(`memo${i}`);
        let memodiv = memoCreate(memo, i);
        document.querySelector('#home .memos').appendChild(memodiv);
    }
    let memoAdd = memoAddCreate();
    document.querySelector('#home .memos').appendChild(memoAdd);
}
function memoCreate(memo, i, code = 0){
    if(code){
        memo = {
            title: `untitled`,
            text: '',
        }
    }
    let div = document.createElement('div');
    div.className = 'memo';
    div.id = `memo${i}`;
    //dataにメモ名も保存..頼んだ
    div.dataset.num = i;

    let title = document.createElement('div');
    title.className = 'title';
    title.innerText = memo?.title??'error';
    title.setAttribute('contenteditable', 'true');
    div.appendChild(title);

    let text = document.createElement('div');
    text.className = 'text';
    text.innerText = memo?.text??'error';
    text.setAttribute('contenteditable', 'true');
    div.appendChild(text);

    let deleteButton = document.createElement('div');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'M';
    deleteButton.addEventListener('click', () => {
        localStorage.removeItem(`memo${i}`);
        div.remove();

        document.querySelectorAll('.memo').forEach(memo => {
            let memoNum = +memo.getAttribute('data-num')
            if(memoNum > i){
                memo.setAttribute('data-num', memoNum - 1);
                memo.querySelector('.title').innerText = `memo${memoNum-1}`;
                memo.querySelector('.text').innerText = lsdGet(`memo${memoNum}`);
                lsdSet(`memo${memoNum-1}`, lsdGet(`memo${memoNum}`));
            }
        });
        
        numberOfMemo = +numberOfMemo - 1;
        lsdSet("numberOfMemo", +numberOfMemo);
    });
    div.appendChild(deleteButton);

    div.addEventListener('input', () => {
        lsdSet(`memo${i}`, {
            num: i,
            title: document.getElementById(`memo${i}`).querySelector('.title').innerText,
            text: document.getElementById(`memo${i}`).querySelector('.text').innerText
        });
    });

    return div;
}
function memoAddCreate(){
    const memoAdd = document.createElement('div');
    memoAdd.className = 'add';
    memoAdd.id = 'memoAdd';
    memoAdd.innerText = '+';
    memoAdd.addEventListener('click', () => {
        memoAdd.remove();
        numberOfMemo = +numberOfMemo + 1;
        lsdSet("numberOfMemo", +numberOfMemo);
        let memodiv = memoCreate('', numberOfMemo, 1);
        document.querySelector('#home .memos').appendChild(memodiv);  
        let memoAdd2 = memoAddCreate();
        document.querySelector('#home .memos').appendChild(memoAdd2);
    })
    return memoAdd;
}
//#endregion

//#endregion home

//#region memo
const bodyTextarea = document.querySelector('#memo .text');
const titleInput = document.querySelector('#memo .title');
const searchButton = document.querySelector('#memo .search');

titleInput.addEventListener('keydown', (e) => {
    if(e.key == "Enter"){
        e.preventDefault();
        searchButton.click();
    }
})

bodyTextarea.addEventListener('input', () => {
    if(User.truth !== 'no name'){
        const title = titleInput.innerText.trim();
        const body = bodyTextarea.innerText;
        database.ref(`users/${User.truth}/memo/${title}`).update({body:body});
    }
});

searchButton.addEventListener('click', () => {
    if(User.truth !== 'no name'){
        const title = titleInput.innerText;
        database.ref(`users/${User.truth}/memo/${title}`).once('value').then((snapshot) => {
            bodyTextarea.innerText = snapshot.val()?.body || '';
        });
    }else{
        bodyTextarea.innerText = 'ログインしてね！！  話はそれからだよ☆'
    }
});
//#endregion memo

//#region tool

//#region 文字数カウント
let Cou = {
    inI: document.querySelector('#tool .TextCount').querySelector('.in'),
    outD: document.querySelector('#tool .TextCount').querySelector('.out'),
}
Cou.inI.addEventListener('input', () => {
    let text = Cou.inI.value;
    let count = text.length;
    let size = arraySize(text.split(''))
    Cou.outD.textContent = `文字数${count} 種類${size}`;
});
//#endregion

//#region アナグラム生成器
let Anag = {
    inI: document.querySelector('#tool .Anagram .in'),
    outD: document.querySelector('#tool .Anagram .out'),
    sendB: document.querySelector('#tool .Anagram .send')
}
Anag.sendB.addEventListener('click', () => {
    let text = Anag.inI.value;
    let res = anagramSaySay(text, 10, '<br>');
    Anag.outD.innerHTML = res;
});
function anagramSaySay(text, loop = 10, bet = '<br>'){
    let menjo = 0;
    let len = text.length;
    // if(len < 4) menjo = 1, console.log('長さが3以下なんで最大6っす');
    
    let optout = text.split('');
    let optcou = arrayCount(optout);
    let optvals = [];
    for(a of Object.keys(optcou)){
        let b = optcou[a];
        b = kaijou(b); //bの階乗、b!
        optvals.push(b);
    }
    let optmat = arrayMult(optvals); //階乗したもの同士をそれぞれを掛け合わさせる
    let cal = (kaijou(len) / optmat) - 1;

    let loopen = loop;
    console.log(`総数:${cal} 回数:${loopen}`);
    if(cal < loopen) menjo = 1;
    
    let reses = [];
    while(loopen > 0){
        loopen -= 1;
        let res = arrayShuffle(optout).join(''); //continueは{}外せないのじゃ
        if(reses.includes(res)){loopen += 1; continue} 
        
        if(res == text && !menjo){loopen += 1; continue;}

        if(res == text && menjo && reses.length < cal){loopen += 1; continue}
        else if(res == text && menjo) res = '!--[重複エラー]--';

        //なんか小ネタを仕込むならここ
        if(text == 'undertale' && res == 'deltarune'){
            let tex = 'deltarune, undertaleのアナグラム説検証成功！！！';
            console.log(tex);
            res = `<span style="color: #;">${tex}</span>`;
        }

        reses.push(res);
    }
    
    return reses.join(bet);
}
//#endregion

//#region 偏差値計算するやつ
let Hen = {
    valI: document.querySelector('#tool .Hen .input'),
    aveI: document.querySelector('#tool .Hen .average'),
    outD: document.querySelector('#tool .Hen .output'),
    process: function(){
        let val = +Hen.valI.value;
        let ave = +Hen.aveI.value;
        let res = ((val - ave) / 18 * 10) + 50;
        //18の部分は変更可能。得点分布だから一点集中なら1とかなんじゃないかな
        res = Math.round(res);
        Hen.outD.value = res;
    }
};
Hen.valI.addEventListener('input', Hen.process);
Hen.aveI.addEventListener('input', Hen.process);
//#endregion

//#region カタカナランダム言葉生成器
let RanKana = {
    togB: document.querySelector('#tool .RanKana .toggle'),
    tog: 'stan',
    togs: [
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
    actB: document.querySelector('#tool .RanKana .active'),
    inpI: document.querySelector('#tool .RanKana .input'),
    outD: document.querySelector('#tool .RanKana .output'),
    ove: 0,
    oveB: document.querySelector('#tool .RanKana .over'),
}
RanKana.togB.addEventListener('click', () => {
    let val = RanKana.togB.textContent;
    let arr = RanKana.togs.map(a => a.name);
    // console.log(arr);
    let valn = arr.indexOf(val);
    let ele = RanKana.togs[valn];
    let nexn = (valn + 1) % RanKana.togs.length;
    let nexele = RanKana.togs[nexn];

    RanKana.tog = nexele.name;
    RanKana.togB.textContent = nexele.name;
    RanKana.togB.style.backgroundColor = nexele.color;
    RanKana.togB.setAttribute('data-description', nexele.desc);
})
RanKana.oveB.addEventListener('click', () => {
    // console.log(RanKana.ove)
    if(RanKana.ove == 0){
        RanKana.ove = 1;
        RanKana.oveB.style.backgroundColor = '#a2ffa8';
    }else{
        RanKana.ove = 0;
        RanKana.oveB.style.backgroundColor = '#c4c4c4';
    }
})
RanKana.actB.addEventListener('click', () => {
    let ele = RanKana.togs.find(a => a.name == RanKana.tog);
    let words = ele.words;
    let val = RanKana.inpI.value
    if(val == '' || val <= 0) return nicoText('死ね');

    let outputs = [];
    RanKana.outD.innerHTML = '';    
    for(let i = 0; i < 10; i++){
        if(RanKana.ove == 0){
            let res = arrayShuffle(words).slice(0, val);
            res = res.join('');
            if(outputs.includes(res)){
                i -= 1;
                continue;
            }
            outputs.push(res);
        }   
        if(RanKana.ove == 1){
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
    RanKana.outD.innerHTML = outputs.join('<br>');
})
//#endregion

//#region マリパのハチの巣のやつ
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
//#endregion

//#region 田中のレースのあれ
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

//#region 連打するやつ
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

//#endregion tool


//#region ワルシャワログイン機構
let logiD = document.getElementById('login');
let logiC = {
    nameI: logiD.querySelector('.username'),
    passI: logiD.querySelector('.password'),
    senD: logiD.querySelector('.send'),
	tog:1,

    noname: 'no name',

    acsD: logiD.querySelector('.acs'),
     acsBD: logiD.querySelector('.acs .tog'),
     acsLD: logiD.querySelector('.acs .list'),
    acsC: {
        tog: 0,
    },
    acsF: {},
}
let logiF = {};
logiF.updateUI = () => {
    // sidemenuにnameを表示？
};

let firebaseConfig = {
    apiKey: "AIzaSyBN5V_E6PzwlJn7IwVsluKIWNIyathhxj0",
    authDomain: "koppepan-orange.firebaseapp.com",
    databaseURL: "https://koppepan-orange-default-rtdb.firebaseio.com",
    projectId: "koppepan-orange",
    storageBucket: "koppepan-orange.appspot.com",
    messagingSenderId: "730150198097",
    appId: "1:730150198097:web:076a074a3d406053155170",
    measurementId: "G-MYKJWD203Z"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let User = {
    truth: logiC.noname,
    idora: logiC.noname,
    ref: null,
    data: null,
}


logiF.auto = () => {
    let name = lsdGet("username");
    // console.log(name)
    if(name){
        nicoText("自動ログインしました");
        login(name);
    }
    else nicoText("ログインしてください");
}

logiF.lsdHozon = (name, pass) => {
    console.log(`${name}をlsdに保存しま〜す`)
    lsdSet("username", name);

    let arr = logiF.lsdList();
    arr = arr.filter(a => a.name != name);

    arr.push({
        name:name,
        pass:pass
    });
    lsdSet('accounts', arr);
}
logiF.lsdRHozon = (name) => {
    lsdRem("username");
    let arr = logiF.lsdList();
    arr = arr.filter(a => a.name != name);
    lsdSet('accounts', arr);
}
logiF.lsdList = () => {
    let arr = lsdGet('accounts');
    if(!arr) arr = [];
    return arr;
}

async function login(name){
    User.truth = name;
    User.ref = database.ref(`users/${name}`);
    User.idora = name;
    await delay(50);
    // update();
    
    //load 2
    logiD.style.display = 'none';
    pageDel('login');

    logiF.updateUI();
}
function logout(){
    User.truth = logiC.noname;
    User.idora = logiC.noname;
    User.ref = null;
    User.data = null;

    lsdRem("username");
    logiC.nameI.value = '';
    logiC.passI.value = '';
    
    window.location.reload();
}

logiF.going = () => {
    let name = logiC.nameI.value;
    let pass = logiC.passI.value;
    if(name == '' || pass == '') return;
    console.log(`username => ${name}`)
    console.log(`password => ${pass}`)
    
    let success = () => {
        nicoText('ようこそ');
        logiF.lsdHozon(name, pass);
        login(name);
    }

    let kariRef = database.ref(`users/${name}`);
    kariRef.once('value', function(snapshot){
        if(snapshot.exists()){
            console.log("存在するってよ！！")
            if(snapshot.val().password == pass) success();
            else tobiText(logiC.senD, "パスワードまたはユーザー名が間違っています"); //ふぅぅわかりにくいねぇ！
        }else{
            console.log("存在しないってよ！！")
            let usersRef = database.ref(`users/${name}`);
            usersRef.update({
                password:pass,
                blocked: ['null'],
            })
            success();
        }
    })
}
logiC.senD.addEventListener('click', logiF.going);


logiC.acsF.tog = (co = NaN) => {
    if(logiC.acsLD.innerHTML == '') return;

    if(typeof co != 'number') co = fl(logiC.acsC.tog);

    if(co == 1) logiC.acsD.classList.add('tog');
    if(co == 0) logiC.acsD.classList.remove('tog');
    logiC.acsC.tog = co;
}
logiC.acsBD.addEventListener('click', logiC.acsF.tog);

logiC.acsF.load = async() => {
    logiC.acsLD.innerHTML = '';
    
    let arr = logiF.lsdList();
    if(!arr.length) return;

    for(let ac of arr){
        let warn = 0;
        //今のpassと、ac.pass(過去ログイン時のpass)が違えばcontinue
        let acRef = database.ref(`users/${ac.name}`);
        let snash = await acRef.once('value'); 
        if(!snash.exists() || snash.val().password != ac.pass) warn = 1;

        let div = El('div', 'item');
    
        let name = El('div', 'name');
        name.textContent = ac.name;
        name.addEventListener('click', () => {
            if(warn) tobiText(name, "パスワードが変更されています。\n再度ログインしてください");

            logiC.nameI.value = ac.name;
            if(!warn) logiC.passI.value = ac.pass;
            logiC.acsF.tog(0);
        })
        div.appendChild(name);

        let del = El('div', 'del');
        del.textContent = "×";
        del.addEventListener('click', () => {
            logiF.lsdRHozon(ac.name);
            logiC.acsF.load();
        })
        div.appendChild(del);

        let warnD = El('div', 'warn');
        warnD.textContent = "！";
        if(warn) div.appendChild(warnD);


        logiC.acsLD.appendChild(div);
    }
    
}
//#endregion


//#region chat
let nickname = 'no name';
let AnonymousName = "はじめまして名無しです";
let maxMessage = 20;
let userData = null;

let sendButton = document.querySelector('#send-button');
let MessageIn = document.querySelector('#message-input');
let Messages = document.querySelector('#messages');
let roomSelect = document.querySelector('#room-select');
let room = roomSelect.value; //1
let messagesRef = database.ref(`rooms/${room}/messages`);

//rakuraku-memoのeditableを見習って
MessageIn.addEventListener('keypress', function(e) {
    if(e.key == 'Enter'){
        e.preventDefault();
        if(!e.shiftKey){
            sendButton.click();
        }else{
            MessageIn.value += '<br>';
        }
    }
});

let stampawait = 0;
function stampRead(){
    Stamps.forEach(a => {
        let name = a.name;
        let type = a.type;
        let src = `assets/stamps/${name}.${type}`;
        let div = document.createElement('div');
        div.className = 'item';
        div.addEventListener('click', () => {
            if(stampawait == 1) return;
            if(room == 'debug') return;
            let Musername = User.truth;
            let Mtext = `<img src='${src}' width="80" height="80"/>`;
            messagesRef.push({
                text: Mtext,
                nickname: nickname,
                username: Musername,
                timestamp: formatDate(new Date())
            });
            stampawait = 1;
            window.setTimeout(StampAwait, 100);//10s
        })

        let img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
        document.getElementById('stamps').appendChild(div);
    })
}
function StampAwait(){stampawait = 0;}

let Commands = {
    'clear':{
        name:'clear',
        process:function(message){
            database.ref('rooms/'+room).remove();
            setTimeout(displayAllMessages, 200);
            nicoText('すべてのメッセージが消去されました。');
            nicoText('あなたがやったのです。反省してね♡')
            nicoText('草');nicoText('草');
            return null;    
        }
    },
    'reload':{
        name:'reload',
        process:function(message){
            window.location.reload();   
            return null;
        }
    },
    'online':{
        name:'online',
        process:function(message){
            usersRef.update({
                status: 'online'
            });
            return null;
        }
    },
    'offline':{
        name:'offline',
        process:function(message){
            usersRef.update({
                status:'offline'
            });
            return null;
        }
    },
    'nico':{
        name:'nico',
        process:function(message){
            nicoText(message);
            return null;
        }
    },
    'rename':{
        name:'rename',
        process:function(message){
            nickname = message;
            return null;
        }
    },
    'nanj':{
        name:'nanj',
        process:function(message){
            AnonymousName = message;
            return null;
        }
    },
    'ban':{
        name:'ban',
        process:function(message){
            database.ref(`users/${message}`).update({
                banned:1
            })
            nicoText('Nice Job!')
            return null;
        }
    },
    'unban':{
        name:'unban',
        process:function(message){
            database.ref(`users/${message}`).update({
                banned:0
            })
            nicoText('Good Job!')
            return null;
        }
    }
};

let MessageSendE;
function selectRoom(){
    messagesRef.off();
    sendButton.removeEventListener('click', MessageSendE);
    room = roomSelect.value;
    messagesRef = database.ref(`rooms/${room}/messages`);
    Messages.innerHTML = '';

    // メッセージ送信
    MessageSendE = sendButton.addEventListener('click', async function(){
        let message = MessageIn.value;
        let Musername = User.truth;
        if(message.trim() !== ''){
            //commands
            if (message.startsWith('/')) {
                let matched = Object.keys(Commands).some(command => {
                    if (message.startsWith(`/${command}`)) {
                        let mes = message.replace(`/${command} `, '');
                        let result = Commands[command].process(mes);
                        // console.log(result, !result);
                        if(!result){
                            MessageIn.value = '';
                            return true;
                        }
                        return true;
                    }
                    return false;
                });
            
                if(!matched){
                    nicoText('多分なんかコマンドミスってるで、君')
                }else{
                    return;
                }
            }

            messagesRef.push({
                text: message,
                nickname: nickname,
                username: Musername,
                timestamp: formatDate(new Date())
            });
            MessageIn.value = '';   
        }
    });

    // 新しいメッセージが追加された時のみ、そのメッセージを追加表示
    messagesRef.on('child_added', async function(snapshot){
        let uRef = database.ref(`users/${User.truth}/banned`)
        uRef.on('value', function(ss) {
            //uRef = ss.val();
            uRef = 0; //一旦のやつ
            if(uRef == 1){ 
                nicoText('エラーが発生しました。')
                logout();
            }else{
                let messageData = snapshot.val();
                let messageElement = makeNanjPost(messageData,snapshot.key);
                messageElement.setAttribute('data-dokosan','追加の読み込み')
                let existing = Messages.querySelector(`.message[data-key="${snapshot.key}"]`);
                if(existing){
                    console.log("重複してますね...このバグ治したい:", snapshot.key);
                    return;
                }
                Messages.appendChild(messageElement);

                messagesRef.on('value', function(snapshot) {
                    if (snapshot.numChildren() > maxMessage) {
                        let firstMessageKey = Object.keys(snapshot.val())[0];
                        messagesRef.child(firstMessageKey).remove();
                    }
                });

                Messages.scrollTop = Messages.scrollHeight;
            }
        });
    });

    messagesRef.once('value', function(snapshot) {
        displayAllMessages();
    });    
}
function displayAllMessages(){
    room = roomSelect.value;
    Messages.innerHTML = '';

    // データベースから全てのメッセージを取得
    messagesRef.once('value', function(pealentsnapshot) {
        pealentsnapshot.forEach(function(snapshot) {
            let uRef = database.ref(`users/${User.truth}/banned`)
            uRef.on('value', function(ss) {
                uRef = ss.val();
                if(uRef == 1){
                    nicoText('エラーが発生しました。')
                    logout()
                }else{
                    let messageData = snapshot.val();
                    
                    let messageElement = makeNanjPost(messageData,snapshot.key)
                    messageElement.setAttribute('data-dokosan','最初の読み込み')
                    let existing = document.querySelector(`#messages .message[data-key="${snapshot.key}"]`);
                    if(existing){
                        console.log("重複してますね...このバグ治したい:");
                        return;
                    }
                    Messages.appendChild(messageElement);

                    messagesRef.on('value', function(snapshot) {
                        if (snapshot.numChildren() > maxMessage) {
                            let firstMessageKey = Object.keys(snapshot.val())[0];
                            messagesRef.child(firstMessageKey).remove();
                        }
                    });

                    Messages.scrollTop = Messages.scrollHeight;
                }
            });
        });
    });
}


function makeNanjPost(messageData,key){
    let messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.setAttribute('data-key', key);

    let Musername = messageData.username;
    let Mnickname = messageData.nickname;
    let Mtimestamp = messageData.timestamp;
    let Mtext = messageData.text;

    if(room == 'Anonymous-1' || room == 'Anonymous-2' || room == 'Anonymous-3'){
        Mnickname = AnonymousName;
    }

    let usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = Mnickname
    usernameElement.addEventListener('contextmenu', event => {
        event.preventDefault();
        nicoText(`送信者:${Musername}`);
    })
    messageElement.appendChild(usernameElement);

    let timestampElement = document.createElement('span');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = '  —' + Mtimestamp;
    messageElement.appendChild(timestampElement);

    let copyButton = document.createElement('button');
    copyButton.textContent = '❐';
    copyButton.addEventListener('click', function(){
        navigator.clipboard.writeText(Mtext);
    });
    messageElement.appendChild(copyButton);

    if(User.truth == messageData.username){
        let editButton = document.createElement('button');
        editButton.textContent = '✎';
        editButton.addEventListener('click', function(){
            Mtext = prompt('メッセージを編集', Mtext);//MessageIn.value;
            textElement.innerHTML = Mtext;
            const ImadakeRef = database.ref('rooms/'+room+'/messages/'+snapshot.key);
            ImadakeRef.update(messageData);
            setTimeout(displayAllMessages, 200);
        });
        messageElement.appendChild(editButton);
    }

    let brElement = document.createElement('br');
    messageElement.appendChild(brElement);

    let textElement = document.createElement('div');
    textElement.innerHTML = Mtext;
    messageElement.appendChild(textElement);

    return messageElement;
}
//#endregion


//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();

    memoRead();
    RanKana.togB.click();
    RanKana.oveB.click();
    stampRead();
    logiF.auto()
    logiC.acsF.load();


    // mainF.move('home');
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
