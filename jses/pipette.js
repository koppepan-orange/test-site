//こまごめピペット
//#region DOM
document.addEventListener('DOMContentLoaded', () => {
    moveAnotherDimension();
    autoLogin();   
});
//#endregion
//#region upperUIとsideMenu
const upperUI = document.getElementById('upperUI');

const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
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


let cpopup = document.getElementById('cpopup');
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
    document.getElementById('body').style.fontFamily = document.getElementById('font-select').value;
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
            open:'H',
            close:'H'
        },
        'memo':{
            name:'memo',
            initial:0,
            open:'2',
            close:'2'
        },
        'tools':{
            name:'tools',
            initial:0,
            open:'@',
            close:'@'
        }
    },

    'Commu':{
        'nanj':{
            name:'nanj',
            initial:1,
            open:"_",
            close:'_'
        },
        'twitter2':{
            name:'twitter2',
            initial:0,
            open:')',
            close:')'
        },
        'jine':{
            name:'jine',
            initial:0,
            open:'^',
            close:'^'
        }
    },

    'Anonymous':{
        'answer':{
            name:'answer',//以下通知あるよver 使用未定
            initial:1,
            open:'.',// /
            close:'-'// ,
        },
        'question':{
            name:'question',
            initial:0,
            open:'?',
            close:'!'
        },
    }
}

document.addEventListener('click', ele => {
    if(ele.target.classList.contains('tab')){
        let doko = Tabs[ele.target.dataset.doko]
        let key = ele.target.dataset.name
        Object.keys(doko).forEach(tab => {
            document.getElementById(tab).style.display = 'none';
            document.getElementById(`${tab}-tab`).textContent = doko[tab].close;
        })
        document.getElementById(ele.target.dataset.name).style.display = 'block';
        ele.textContent = doko[key].open;
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
        const tabElement = document.createElement("div");
        tabElement.className = "tab";
        tabElement.id = `${tab}-tab`;
        if(Tabs[doko][tab].initial == 1){
            tabElement.textContent = Tabs[doko][tab].open;   
        }else{
            tabElement.textContent = Tabs[doko][tab].close;
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
document.getElementById('wdcheck').addEventListener('click', () => {
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
document.getElementById('login-button').addEventListener('click', () => {
    if(document.getElementById('login').style.opacity == 0){
        document.getElementById('login').style.opacity = 1;
    }else{
        document.getElementById('login').style.opacity = 0;
    }
})
function login(){
    document.getElementById('login').style.opacity = 0;
    document.getElementById('login-button').style.display = 'none';
    document.getElementById('expbar').style.display = 'block';

    usersRef = database.ref('users/'+username);

    usersRef.once('value', function(snapshot){
        if(snapshot.exists()){
            const userData = snapshot.val();
            level = userData.level??1;
            exp = userData.exp??0;
            maxexp = level*25+25;
            updateUI();
        }
    })
}

document.getElementById('login-login').addEventListener('click', () => {
    username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let kariusersRef = database.ref(`users/${username}`);
    kariusersRef.once('value', function(snapshot){
        if(snapshot.exists()){
            if(snapshot.val().password == password){
                setLocalStorage("username", username)
                login();
            }
        }else{
            let usersRef = database.ref(`users/${username}`);
            usersRef.update({
                password:password,
                banned: 0,
                blocked: [],
            })
            NicoNicoText('ようこそ');
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

document.getElementById('logout').addEventListener('click', () => {
    username = 'no name';removeLocalStorage("username");
    document.getElementById('Username').textContent = username;
    document.getElementById('Level').textContent = `Lv:#ERROR!`;
    document.getElementById('expbar').style.display = 'none';
    document.getElementById('login-button').style.display = 'block';
    sideMenu.style.left = '-255px';

    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
})
//#endregion
//#region expとか
let exp = 0;
let level = 1;
let maxexp = 50;
let expbar = document.getElementById('exp');
let exptext = document.getElementById('exptext');
function updateUI(){
    if(exp >= maxexp){
        exp -= maxexp;
        level += 1;
        maxexp += 25;
    }
    expbar.style.width = `${exp/maxexp*100}%`;
    exptext.innerText = `${exp}/${maxexp}`
    document.getElementById('Username').textContent = username;
    document.getElementById('Level').textContent = `Lv:${level}`;
}
//#endregion
