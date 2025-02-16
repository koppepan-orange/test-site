//こまごめピペット
//#region DOM
document.addEventListener('DOMContentLoaded', () => {
    moveAnotherDimension();
    autoLogin();   
});
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
        })
        document.getElementById(ele.target.dataset.name).style.display = 'block';
        ele.target.src = `assets/icons/${doko[key].name}1.png`;
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

function login(){
    document.querySelector('#login').style.opacity = 0;
    document.querySelector('#login').style.userSelect = 'none';
    document.querySelector('#login-button').style.display = 'none';
    document.querySelector('#expbar').style.display = 'block';

    setLocalStorage("banned", 0);
    usersRef = database.ref('users/'+username);

    usersRef.once('value', function(snapshot){
        if(snapshot.exists()){
            const userData = snapshot.val();
            level = userData.level??1;
            exp = userData.exp??0;
            maxexp = level*25+25;
            updateUI();
        }
    });

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
    username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

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

document.querySelector('#logout').addEventListener('click', () => {
    NicoNicoText("ログアウトしました");
    username = 'no name';removeLocalStorage("username");
    document.querySelector('#Username').textContent = username;
    document.querySelector('#Level').textContent = `Lv:#ERROR!`;
    document.querySelector('#expbar').style.display = 'none';
    document.querySelector('#login-button').style.display = 'block';
    sideMenu.style.left = '-255px';

    document.querySelector('#username').value = '';
    document.querySelector('#password').value = '';

    window.homeLogout();
    window.commuLogout();
})

window.addEventListener('beforeunload', () => {
    usersRef.once('value').then(function(snapshot) {
        if(snapshot.exists()){
            usersRef.update({
                status: 'offline'
            });
        }
    })
});
//#endregion
//#region expとか
let exp = 0;
let level = 1;
let maxexp = 50;
let expbar = document.querySelector('#exp');
let exptext = document.querySelector('#exptext');
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
}
//#endregion
