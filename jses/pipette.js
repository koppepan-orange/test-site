//こまごめピペット

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
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
function arraySize(array){
    let res = new Set(array).size;
    return res;
};
function arrayCount(array){
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
    if(array.length !== probability.length){throw new Error("長さがあってないっす！先輩、ちゃんとチェックした方がいいっすよ〜？");}
    const total = probability.reduce((sum, p) => sum + p, 0);
    let random = Math.random() * total;
    for (let i = 0; i < array.length; i++) {
    if(random < probability[i]){
    return array[i];
    }
    random -= probability[i];
    }
};
function hask(obj, key){
let res = obj.hasOwnProperty(key);
res = res ? 1 : 0;
return res;
}
function copy(obj){
    if (obj === null || typeof obj !== 'object') {
    return obj; // 基本型はそのまま返す
    }
    if (Array.isArray(obj)) {
    return obj.map(copy); // 配列の各要素を再帰コピー
    }
    const result = {};
    for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        result[key] = copy(obj[key]); // オブジェクトのプロパティを再帰コピー
    }
    }
    return result;
};
function probability(num){
    return Math.random()*100 <= num;
    //例:num == 20 → randomが20以内ならtrue,elseならfalseを返す
};
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
async function error(){
    addtext('errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    await delay(2000);
    window.open('about:blank', '_self').close();
}
function hoshoku(color) {
    color = color.replace(/^#/, ''); // #付きなら取る

    if(color.length != 6) return console.log('カラーコードは6、ですよ〜？楽しないでくださいね〜♪')

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
//#endregion

function displayLocalStorage() {
    const itemCount = localStorage.length;
    for (let i = 0; i < itemCount; i++) {
        const key = localStorage.key(i); // キーを取得
        const value = localStorage.getItem(key); // 値を取得
        nicoText(`キー: ${key}, 値: ${value}`);
    }
}

function removeLocalStorage(name){
    localStorage.removeItem(name);
}


document.addEventListener("paste", event => {
    event.preventDefault(); // デフォルトのペーストを防ぐ
    let text = (event.clipboardData || window.clipboardData).getData("Text"); // プレーンテキスト取得
    document.execCommand("insertText", false, text); // プレーンテキストを挿入
});

function formatDate(date){ //見る用
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}
function formatTime(date){ //データ保存用
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const time = `${year}${month}${day}${hours}${minutes}`;
    return +time;
}

document.querySelectorAll('.hasp').forEach(ele => {
    ele.classList.add('showp');
    ele.addEventListener('focus', () => ele.classList.remove('showp'));
    ele.addEventListener('blur', () => {
        if (!ele.textContent.trim()) {
            ele.classList.add('showp');
        }
    });
})

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


let doko = 'Home'


//#region DOM
document.addEventListener('DOMContentLoaded', async() => {
    autoLogin();

    

});
//#endregion
//#region animation?
function vibrate(element) {
    element.classList.add('vibable');

    setTimeout(() => {
        element.classList.remove('vibable');
    }, 500);
}
//#endregion

//#region firebaseのいざこざ
const firebaseConfig = {
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
var database = firebase.database();
let username = 'no name';
let usersRef = null;

//#endregion

//#region ログイン機構
document.querySelector('#login-button').addEventListener('click', () => {
    if(document.querySelector('#login').style.opacity == 0){
        document.querySelector('#login').style.opacity = 1;
        document.querySelector('#login').style.userSelect = 'auto';
        document.querySelector('#login').style.pointerEvents = 'all';
    }else{
        document.querySelector('#login').style.opacity = 0;
        document.querySelector('#login').style.userSelect = 'none';
        document.querySelector('#login').style.pointerEvents = 'none';
    }
})

async function login(){
    setLocalStorage("banned", 0);
    usersRef = database.ref(`users/${username}`);
    
    if(Iam == 'chat') chatLogin();
    if(Iam != 'home') return;

    usersRef.once('value', function(snapshot){
        if(snapshot.exists()){
            const userData = snapshot.val();
            level = userData.level??1;
            exp = userData.exp??0;
            euro = userData.euro??0;
            maxexp = level*25+25;
            updateUI();
        }
    });

    await delay(500);
    document.querySelector('#login').style.opacity = 0;
    document.querySelector('#login').style.userSelect = 'none';
    document.querySelector('#login-button').style.display = 'none';
    document.querySelector('#expbar').style.display = 'block';
    updateUI();

    usersRef.update({
        status: 'online'
    });

    window.homeLogin();
    window.commuLogin();
    window.anonymousLogin();
    window.studyLogin();
    window.pixelenLogin();
}

document.querySelector('#login-login').addEventListener('click', () => {
    console.log('押されたよ！')
    username = document.querySelector('#username').value;
    console.log(`usernameはこれ！=> ${username}`)
    let password = document.querySelector('#password').value;
    console.log(`passwordはこれ！=> ${password}`)
    let kariusersRef = database.ref(`users/${username}`);
    console.log("kariusersRefはこれ！↓")
    console.log(kariusersRef)
    x = 1
    kariusersRef.once('value', function(snapshot){
        console.log("存在するってよ！！")
        if(snapshot.exists()){
            if(snapshot.val().password == password){
                setLocalStorage("username", username)
                login();
            }
        }else{
            console.log("存在しないってよ！！")
            let usersRef = database.ref(`users/${username}`);
            usersRef.update({
                password:password,
                banned: 0,
                blocked: [],
            })
            nicoText('ようこそ');
            setLocalStorage("username", username)
            login();
        }
    })
})

function autoLogin(){
    username = getLocalStorage("username");
    if(username){
        console.log("自動ログインしました");
        login();
    }else{
        console.log("ログインしてください");
        username = 'no name';
    }
}

document.querySelector('#logout').addEventListener('click', () => {
    nicoText("ログアウトしました");
    username = 'no name';removeLocalStorage("username");
    document.querySelector('#Username').textContent = username;
    document.querySelector('#Level').textContent = `Lv:#ERROR!`;
    document.querySelector('#Euro').textContent = '0€'
    document.querySelector('#expbar').style.display = 'none';
    document.querySelector('#login-button').style.display = 'block';
    sideMenu.style.left = '-255px';

    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';

    window.homeLogout();
    window.commuLogout();
})

window.addEventListener('beforeunload', () => {
    if(!usersRef) return;
    usersRef.once('value').then(function(snapshot) {
        if(snapshot.exists()){
            usersRef.update({
                status: 'offline'
            });
        }
    })
});
//#endregion