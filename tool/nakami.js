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
function tobiText(youso, mes, config = {}) {
    let {
        mode = "booba", //booba(楕円)かkiki(トゲトゲ)
        back = "#2b2b2b",
    } = config;

    let el = youso;
    if(typeof el == "string") el = document.querySelector(youso);
    if(!el) return console.error('せんぱ〜い？この要素壊れてますよ〜〜？');

    console.log(`[tobi] ${mes}`);

    let rect = el.getBoundingClientRect();
    let left = rect.left + (window.scrollX+rect.width/2);
    let top = rect.top + (window.scrollY+rect.height/2);

    let div = document.createElement('div');
    div.className = `tobitext ${mode}`;
    div.innerText = mes;

    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
    div.style.setProperty('---back', back);
    div.style.color = "#2b2b2b";
    if(irohaDark(back)) div.style.color = "#ffffff";

    if(mode == 'kiki'){
        let points = [];
        let n = 18; //トゲの数
        for (let i=0; i<n; i++) {
            let angle = (i/n) * 360;
            let rad = (angle*Math.PI) / 180;
            let radius = 15 + Math.random()*10;
             if(i%2 == 0) radius = 45 + Math.random()*10;

            let x = 50 + radius*Math.cos(rad);
            let y = 50 + radius*Math.sin(rad);
            points.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
        }
        div.style.clipPath = `polygon(${points.join(', ')})`;
    }

    document.body.appendChild(div);

    // 動くよ
    let duration = 1200;
    let distance = -48;
    let jitter = (Math.random() - 0.5) * 10;
    let start = performance.now();
    let easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function frame(now){
        let t = Math.min(1, (now - start) / duration);
        let e = easeOutCubic(t);
        let tsY = distance * e;
        let tsX = jitter * (1 - e);
        div.style.transform = `translate(-50%, -50%) translateY(${tsY}px) translateX(${tsX}px)`;
        div.style.opacity = String(0.8 * (1 - t));
        if(t < 1) requestAnimationFrame(frame);
        else div.remove();
    };

    requestAnimationFrame(frame);
}
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
    if(num == 0) return 1;
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
function jouyo(A, B){
    let Q = Math.floor(A / B);
    let R = A % B;
    let res = {Q, R}
    
    return res;
}
function ketasu(num){
    if(num == 0) return 1;
    num = Math.abs(num);
    let res = Math.floor(Math.log10(num))+1;
    return res;
}
function whethPoint(num){
    let str = num.toString();
    if(0 <= str.indexOf('.')) return true;
    
    return false;
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
function randomF(min, max, keta = 0){
    if(max < min) [min, max] = [max, min];

    let scale = 10 ** keta;
    let num = Math.floor(
        Math.random() * ((max - min) * scale + 1)
    ) + min * scale;

    return num / scale;
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

function cardDraw(val0 = 0, suit0 = 0){
    let val = random(1, 13);
    let suit = arraySelect(['♡', '♤', '♢', '♧']);
    if(val0) val = val0;
    if(suit0) suit = suit0;
    
    let hyou = val;
    if(val == 1)  hyou = 'A';
    if(val == 10) hyou = 'X';
    if(val == 11) hyou = 'J';
    if(val == 12) hyou = 'Q';
    if(val == 13) hyou = 'K';
    
    let card = {    
        suit,
        val,
        num: hyou
    }

    return card;
}
function cardCalc(arr, code = 0){
    // code: bj == 1が11にもなる
    if(!Array.isArray(arr)) return console.error('えっと...ごめん！これ配列じゃないと計算できないっ！！'), 0;
    
    let sum = 0;
    let As = 0;

    for(let card of arr){
        if(card.hide) continue;
        let v = card.val;
        if(code == "bj"){
            if(10 <= v) v = 10; //bjなら10に矯正
            if(v == 1) As++;
        }
        sum += v;
    }

    if(code == "bj"){
        while(21 < sum && 0 < As){
            sum -= 10; //特殊すぎる
            As--;
        }
    }

    return sum;
}
function cardUnwrap(arr){
    for(let card of arr){
        if(card.hide) card.hide = 0;
    }
    return arr;
}

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
    skipT: 0,
    clearT: 0,
    loopT: 0,
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
    if(logC.ing ||
        logC.queue.length == 0) return;

    let raw0 = logC.queue.shift();
    // console.log(`${raw0[0]}を送信します`);
    await logText(...raw0);
};
async function logText(raw, code = ""){
    if(!raw) return console.log('「内容が？内容が〜〜？ないよ〜〜〜つってwwww直せ」');
    if(typeof raw != 'string') raw = String(raw);

    if(logC.ing){
        logC.queue.push([raw, code]);

        logF.waitfor();
        return;
    };
    
    logC.ing = 1;
    let text = logF.cc(raw);
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
                    type();
                }else{
                    let span = document.createElement("span");
                    span.textContent = text[index].char;
                    if(text[index].color) span.style.color = text[index].color;
                    logC.textD.appendChild(span);

                    index++;
                    setTimeout(type, 80); // 次の文字を表示する間隔
                }
            }else{
                let das = `[${code}] `;
                das += logC.textD.innerHTML;
                logText_log(das);
                let waitTime = logC.autoDelay * 1000;
                
                let cleanupListeners = () => {};
                let timeout = new Promise(resolveTimeout => {
                    let timer = setTimeout(() => {
                        cleanupListeners();
                        resolveTimeout();
                    }, waitTime);
                    
                    cleanupListeners = () => clearTimeout(timer);
                });

                let userAction = new Promise(resolveUser => {

                    function waitToClear(event){
                        if(event.type === 'click' || event.key === 'z' || event.key === 'Enter'){
                            document.removeEventListener('click', waitToClear);
                            document.removeEventListener('keydown', waitToClear);
                            cleanupListeners();
                            resolveUser();
                        }
                    }
                    document.addEventListener('click', waitToClear);
                    document.addEventListener('keydown', waitToClear);

                    let oldCleanup = cleanupListeners;
                    cleanupListeners = () => {
                        oldCleanup();
                        document.removeEventListener('click', waitToClear);
                        document.removeEventListener('keydown', waitToClear);
                    };
                });

                Promise.race([timeout, userAction]).then(() => {
                    logC.textD.textContent = "";
                    logC.textD.style.display = "none";
                    logC.clearT = 1;
                    logC.skipT = 0
                    logC.ing = 0;
                    resolve('end');

                    logF.waitfor();
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
//#region Timer
class Timer{
    constructor(k = 0, d = 1){
        // k:開始数 d:増加量
        if(typeof k != "number" || typeof d != "number") return;
        this.time = k;
        this.d = d;

        this.ev = null;


        let div = document.createElement("div");
        div.id = "timer";
         let num = document.createElement("div");
         div.appendChild(num);
        div.addEventListener('click', () => {div.classList.toggle("tog")})
        div.addEventListener("contextmenu", e => {
            e.preventDefault();
            div.classList.remove("show");
        })
        this.div = div;
        this.numD = num;

        // let div0 = document.body;
        let div0 = mainD;
        div0.appendChild(div);
        this.tekiou();
    }

    tekiou(){
        let time = this.time;
        let [hun, byo] = [time%60, Math.floor(time/60)]
            .map(a => a.toFixed(0).padStart(2, "0")); //初めて自ら改行したわ
        this.numD.textContent = `${byo}:${hun}`;
    }

    start(){
        if(this.ev) return;
        this.ev = setInterval(() => {
            this.time += this.d;
            this.tekiou()
        }, 1000);
    }
    stop(){
        if(this.ev){
            clearInterval(this.ev);
            this.ev = null;
        }
        this.tekiou();
    }
    reset(){
        this.time = 0;
        this.tekiou();
    }

    kite(){
        this.div.classList.add("show");
    }
    kiero(){
        this.div.classList.remove("show");
    }

    share(){
        this.div.remove();
    }
}
// #endregion
//#region tk
class tk{
    constructor(type, x = 'half', y = 'half', w = window.innerWidth/2, h = window.innerWidth/2){
        let youso = document.createElement(type);
        youso.className = `tk ${type}`;

        let contex = {x, y, w, h};

        let yoko = ['x', 'w'];
        for(let n of yoko){
            // console.log(n);
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
//#region CheckBox feat.Slider
class Checkbox {
    constructor(
        name = "テキストを入力してください",
        kitei = 0,
        func = 0,
        data = 0
    ){
        this.name = name;
        this.kitei = kitei;
        this.func = func;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        }
        this.data = data; //固有。func用だったりするのかも

        this.make();
        // ここでこいつをreturnしたらinstanceが消える(このclassの他の関数を作れなくなる)
    }
    make(){
        let div = document.createElement('div');
        div.className = 'checkbox';
        if(this.kitei) div.classList.add('tog');
        div.dataset.cl = this.kitei; //0がoff..のはず

        let [cBack, cBacked] = [this.data.back, this.data.backed];
        div.style.setProperty('--back', cBack);
            div.style.setProperty('--back-col', irohaHo(cBack));
        div.style.setProperty('--backed', cBacked);
            div.style.setProperty('--backed-col', irohaHo(cBacked));
        
        let text = document.createElement('div');
        text.className = 'text';
        text.textContent = this.name;
        div.appendChild(text);

        let clcl = async () => {
            div.dataset.cl = fl(div.dataset.cl);
            div.classList.toggle('tog', div.dataset.cl == 1);

            if(this.func) this.func();
        };
        div.addEventListener('click', clcl);

        this.div = div;
    };

    append(parent){
        parent.appendChild(this.div);
    }
};

class Slider {
    constructor(
        name = "テキストを入力してくださ",
        kitei = 50,
        func = 0,
        data = 0
    ){
        this.name = name;
        this.kitei = kitei;
        this.func = func;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        }
        this.data = data;

        this.make();
    }

    make(){
        let div = document.createElement('div');
        div.className = `slider ${this.name}`;
        
        let text = document.createElement('div');
        text.className = 'label';
        text.textContent = `${this.name}:`;
        div.appendChild(text);
        
        let range = document.createElement('input')
        range.type = "range"
        range.min = 0;
        range.max = 100;
        range.value = this.kitei;
        range.step = 1;
        range.addEventListener('input', (e) => {
            let val = e.target.value;
            let [A, B] = [this.data.back, this.data.backed];
            /*
            // 全体変え
            let per = val / 100;
            let mix = irohaMix(A, B, per);
            range.style.setProperty('--tsuma', irohaHo(mix));
            range.style.background = mix;
            */

            // つまみの位置で変え
            let per = val;
            let mix = irohaMix(A, B, 0.5);
            range.style.setProperty('--tsuma', mix);
            range.style.background = `
                linear-gradient(to right,
                    ${A} 0%,
                    ${A} ${per - 10}%,
                    ${mix} ${per}%,
                    ${B} ${per + 10}%,
                    ${B} 100%
                )
            `;


            if(this.func) this.func(val);
        })
        div.appendChild(range);

        this.div = div;
        this.range = range;
    }

    append(parent){
        parent.appendChild(this.div);
        this.range.dispatchEvent(new Event('input'));
    }
}
// #endregion
//#region takushiSen
class TakushiSen {
    constructor(choices, mode = "tate", data = 0) {
        this.choices = choices; // [{name, img}, {name, img}, ...]
        this.mode = mode;

        if(!data) data = {
            back: '#b2b2b2',
            backed: '#2b2b2b'
        };
        this.data = data;

        this.make();
    }

    make() {
        let div = document.createElement('div');
        div.className = `mode ${this.mode}`;
        
        let [b, bEd] = [this.data.back, this.data.backed];
        div.style.setProperty('--botan', b);
        div.style.setProperty('--botan-col', irohaHo(b));
        div.style.setProperty('--botan-ed', bEd);
        div.style.setProperty('--botan-col-ed', irohaHo(bEd));

        this.choices.forEach(ma => {
            let [name, gazou] = [ma.name, ma.img];
            if(typeof ma === 'string') name = ma;

            let item = document.createElement('div');
            item.className = `item ${name}`;
            item.textContent = name;
            item.dataset.name = name;

            // 画像があるならば
            if(gazou){
                let img = document.createElement('img');
                img.src = gazou;
                item.appendChild(img);
            }
            div.appendChild(item);
        });

        this.div = div;
        return div;
    }

    // ここがメイン！await で待ち受けるやつ
    async select(parent) {
        return new Promise(resolve => {
            let div = this.make();
            parent.appendChild(div);

            div.addEventListener('click', (e) => {
                let target = e.target.closest('.item');
                if (target) {
                    div.remove();
                    resolve(target.dataset.name);
                }
            });
        });
    }
}
//#endregion
//#region Tenshee
class Tenshee {
    // 天使なカノジョ です(??)
    constructor(){
        this.resolved = 0;
    }

    reset(){
        tensheeC.now = "";
        tensheeC.max = 0;
        tensheeC.mode = "";
        this.tekiou();
    }

    plzinput(max = 0, mode = 0){
        if(tensheeC.ing) return;
        tensheeC.ing = 1;
        this.reset();

        if(max) tensheeC.max = max;
        if(mode) tensheeC.mode = mode;
        tensheeD.classList.add('show');
        return new Promise((resolve) => {
            this.resolved = resolve;
        });
    }

    tekiou(){
        let disp = tensheeC.dispD;
        let now = tensheeC.now;

        if(tensheeC.mode == "pass") disp.textContent = '*'.repeat(now.length);
        else disp.textContent = now;
    }

    num(num){
        let now = tensheeC.now;
        let max = tensheeC.max;
        if(max != 0 && now.length >= max) return;
        
        now += num;
        tensheeC.now = now;
        this.tekiou();
    }

    del(){
        let now = tensheeC.now;
        if(now == "") return;

        now = now.slice(0, -1);
        tensheeC.now = now;
        this.tekiou();
    }

    confirm(){
        tensheeD.classList.remove('show');
        let now = tensheeC.now;
        console.log(`天カノ結果:: ${now}`)
        if(now == "") console.error('入力されてないっすね');
        if(this.resolved){
            this.resolved(now);
            this.resolved = 0;
            tensheeC.ing = 0;
        }
    }
}
let tensheeD = document.getElementById('tenshee');
let tensheeC = {
    ing: 0,
    now: "",
    dispD: tensheeD.querySelector('.disp')
}
let tensheeF = {};
const tenshee = new Tenshee();
tensheeD.querySelectorAll('.bt').forEach(bt => {
    bt.addEventListener('click', () => {
        if(bt.classList.contains('num')) tenshee.num(bt.dataset.num)
        if(bt.classList.contains('del')) tenshee.del();
        if(bt.classList.contains('ok')) tenshee.confirm();
    });
})

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
        "Context": 1,
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

    if(sts["Context"]){
        window.addEventListener('contextmenu', e => e.preventDefault());
    }
}

//#endregion
//#region fonts
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
loaC.souT = Object.values(Sounds).reduce((a,b) => a + b.length, 0);

loaF.load = async() => {
    console.log("loadを開始しました。少々お待ちください");

    loaC.imgT = 0;
    let MaaSorehaSoretoshite = (mono) => {
        for(let key in mono){
            if(key == 'すべて') continue;

            let val = mono[key];
            if(Array.isArray(val)){
                loaC.imgT += val.length;
            }
            else if(val && typeof val == 'object'){
                MaaSorehaSoretoshite(val);
            }
        }
    };
    MaaSorehaSoretoshite(Images);

    if(await loaF.loadI()) return 1;
    return 0;
}

/*
// 元のカタチ
loaF.loadI = async() => {
    let kasan = () => {
        loaC.imgD++;
        if(loaC.imgD == loaC.imgT) loaF.loadS();
    }

    if(loaC.imgT == 0) return loaF.loadS();
    for(let belong in Images){
        images[belong] = {};

        for(let name of Images[belong]){
            let img = new Image();
            img.src = `assets/images/${belong}/${name}.png`;
            img.onload = kasan;
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
*/
loaF.loadI = async() => {
    if(loaC.imgT == 0) return loaF.loadS();

    let kasan = () => {
        loaC.imgD += 1;
        if(loaC.imgD == loaC.imgT) loaF.loadS();
    }

    let loaloa = async(arr, route) => {
        let srcBase = "assets/images/" + route.join("/") + "/";

        let tar = images;
        for(let r of route){
            if(!tar[r]) tar[r] = {};
            tar = tar[r];
        }

        arr.forEach(mono => {
            let img = new Image();
            img.src = `${srcBase}${mono}.png`;
            
            img.onload = () => {
                tar[mono] = img;
                kasan();
            };

            img.onerror = () => {
                console.error(`Image ${srcBase}${mono}.png failed to load.`);
                loaC.erd += 1;
                
                if(loaC.erd > 50) {
                    console.error('さすがにやりすぎbonus');
                    return;
                }
                
                img.src = `assets/images/systems/error.png`;
                tar[mono] = img;
                kasan();
            };
        });
    }

    // 再帰的に掘り進む
    let loaloa0 = async(mono, route = []) => {
        for(let key in mono){
            if(key == "すべて") continue; //"すべて"はスキップ

            let val = mono[key];
            if(!val) continue;

            route.push(key); //追加

            if(Array.isArray(val)){
                loaloa(val, [...route]);
            }
            else if(typeof val == 'object'){
                await loaloa0(val, route); //さらなる深みへ
            }
            
            route.pop(); //階層を戻す
        }
    }

    await loaloa0(Images);
}

loaF.loadS = async() => {
    let kasan = () => {
        loaC.souD += 1;
        if(loaC.souD == loaC.souT) loaF.end();
    }
    
    if(loaC.souT == 0) return loaF.end();
    for(let belong in Sounds){
        sounds[belong] = {};

        for(let name of Sounds[belong]){
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
    souF.volume(50);
    start();
}

let souC = {
    se: 0.5,
    bgm: 0.5,
    nowBgm: null
}
let souF = {};
souF.play = (name) => {
    console.log("ん")
    if(!sounds[name]) return souF.play('error');
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
    }
    else if(proto.dataset.type == 'se'){
        console.log("se")
        let clone = proto.cloneNode(1);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', ()=> {
            try{clone.src = '';}catch(e){}
        });
        clone.play().catch(e => console.warn('SE 再生エラー', e));
    }
}

souF.play = (name) => {
    let proto = null;
    let category = null;

    for(let belong in sounds){
        if(sounds[belong][name]){
            proto = sounds[belong][name];
            category = belong;
            break;
        }
    }

    if(!proto){
        if(name != 'error') return souF.play('error');
        else return;
    }

    if(proto.dataset.type === 'bgm'){
        if(souC.nowBgm){
            for(let belong in sounds){
                if(sounds[belong][souC.nowBgm]){
                    let oldBgm = sounds[belong][souC.nowBgm];
                    if(!oldBgm.paused){
                        oldBgm.pause();
                        oldBgm.currentTime = 0;
                    }
                    break;
                }
            }
        }

        proto.volume = souC.bgm;
        proto.play().catch(e => console.warn('BGM 再生エラー', e));
        souC.nowBgm = name;
    }else{
        let clone = proto.cloneNode(true);
        clone.volume = souC.se;
        clone.dataset.type = 'se';
        clone.addEventListener('ended', () => {clone.src = ""});
        clone.play().catch(e => console.warn('SE 再生エラー', e));
    }
}
souF.stop = () => {
    Object.keys(sounds).forEach(k => {
        try{
            sounds[k].pause();
            sounds[k].currentTime = 0;
        }catch(e){}
    });
    souC.nowBgm = null;
    document.querySelectorAll('audio,video').forEach(el => { el.pause(); el.currentTime = 0; });
}
souF.volume = (code, val) => {
    if(typeof code == 'number' && typeof val == 'undefined') val = code, code = 'both';
    if(typeof val !== 'number') return console.error('val は数値にして');
    let v = val;
    if(v > 1) v = Math.max(0, Math.min(1, v/100)); // 0-100 指定を 0-1 に
    v = Math.max(0, Math.min(1, v));

    if(code == 'se' || code == 'both'){
        souC.se = v;

        for(let belong in sounds){
            for(let name in sounds[belong]){
                let sound = sounds[belong][name];
                if(sound.dataset.type == 'se'){
                    sound.volume = souC.se;
                }
            }
        }
    }

    if(code == 'bgm' || code == 'both'){
        souC.bgm = v;

        for(let belong in sounds){
            for(let name in sounds[belong]){
                let sound = sounds[belong][name];
                if(sound.dataset.type == 'bgm'){
                    sound.volume = souC.bgm;
                }
            }
        }

        if(souC.nowBgm && sounds.bgm[souC.nowBgm]){
            sounds.bgm[souC.nowBgm].volume = souC.bgm;
        }
    }

    console.log(`[soundVolume] se:${souC.se} bgm:${souC.bgm}`);
}

//#endregion
//#region 幸せになれる隠しコマンドがあるらしい
const secrateses = [];
function secratesP(key){
    secrateses.push(key);

    let lenlen = Secrates.sort((a,b) => b.arr.length - a.arr.length);
    let len = lenlen[0].arr.length;
    secrateses.splice(0, secrateses.length - len);
    
    secratesC();
}
async function secratesC(){
    for(let sec of Secrates){
        if(sec.limit == 0) continue;

        let len = sec.arr.length;
        if(secrateses.length < len) continue;

        let tail = secrateses.slice(-len);

        if(tail.join() == sec.arr.join()){
            console.log(`${sec.name}発動！！[${sec.arr.join(' ')}]`);
            let res = await sec.func();
            if(!res && sec.limit != 'n') sec.limit -= 1;
        }
    }
}
document.addEventListener('keydown', async function(e){
    let key = e.key.toLowerCase();
    if(key == 'escape') loop = 0;

    if(document.activeElement.tagName == 'INPUT') return;
    if(document.activeElement.tagName == 'TEXTAREA') return;

    secratesP(key);
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
let mainF = {};
mainF.move = (to) => {
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of Spaces) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
    mainC.spa = to;
}

mainF.load = () => {
    for(let spa of Spaces){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
    }
}

//#region movlis
for(let n of Spaces){
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


// #region tools
let tooD = document.getElementById("tools");
let tooC = {};
let tooF = {};

//#region 偏差値計算するやつ
let henD = document.querySelector('#tools .hen');
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

//#region 文字数カウント
let countD = document.querySelector('#tools .textcount');
let countC = {
    labD: countD.querySelector('.label'),
    inI: countD.querySelector('.in'),
    outD: countD.querySelector('.out'),
    hiro: 0
}
countC.labD.addEventListener('click', () => {
    countC.hiro = fl(countC.hiro);
    countD.classList.toggle('hiro', countC.hiro);
})
countC.inI.addEventListener('input', () => {
    let text = countC.inI.value;
    let count = text.length;
    let size = arraySize(text.split(''));
    countC.outD.textContent = `文字数${count} 種類${size}`;
});
//#endregion

//#region ランダムな文字を抽出するやつ -arraySelect-
let ransD = document.querySelector('#tools .ransele');
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
let anagD = document.querySelector('#tools .anagram');
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

//#region カタカナランダム言葉生成器
let rannmD = document.querySelector('#tools .rannm');
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

// #endregion


// #region asobs
let asoD = document.getElementById("asobs");
let asoC = {

}
let asoF = {};

// #region ロシアのあれをするやつ
let royaD = document.getElementById("royal");
let royaC = {
    numD: royaD.querySelector(".rest .num"),
    maxD: royaD.querySelector(".rest .max"),
    hitD: royaD.querySelector(".bts .hit"),
    resD: royaD.querySelector(".bts .res"),

    max: 0,
    now: 0,
    rest: [],
}
let royaF = {};

royaF.update = () => {
    royaC.numD.innerText = num;
    royaC.maxD.innerText = `/${max}`;
}

royaF.res = () => {
    royaD.classList.remove("dead");

    max = random(4, 10);
    num = max;
    
    rest = [];
    for(let i=0; i<max; i++) rest.push(0);
    rest[0] = 1;
    arrayShuffle(rest);

    update();
}
royaC.resD.addEventListener("click", royaF.res);

royaF.hit = () => {
    if(rest.length < 1) return;

    let len = rest.length;
    let r = random(0, len-1);
    let atai = rest[r];
    
    num -= 1;
    rest.splice(r, 1);
    
    if(atai == 1) return shot();

    update();
}
royaC.hitD.addEventListener("click", royaF.hit);

royaF.shot = () => {
    // ffcfcf
    royaD.classList.add("dead");
}
// #endregion

//#region マリパのハチの巣のやつ
let beeGD = document.querySelector('#asobs .bee-game');
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
let raceGD = document.querySelector('#asobs .race-game');
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

let renGD = document.querySelector("#asobs .renda-game");
let renGC = {
    now: 0,
    count: 0,
}
let renGF = {};
//#endregion

//#region WiiPartyのコックのあれ
let cooD = document.querySelector("#asobs .cookgame")
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


// #endregion

//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();

    let hash = location.hash.replace('#', '');
    let space = Spaces.find(s => s.name == hash);
    if(!space) space = Spaces[0];
    mainF.move(space.name);
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
