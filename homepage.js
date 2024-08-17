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
const COUNTTips = ['パン工場〜','だから愛だよ','ひとえに、愛だよ','うにょ〜ん','異議あり!','ウロボロスの弟、ウヌボロス','もろたで四輪工藤','小籠包と小論文のハーフ、ショウロンプォゥン','なんだかすごそう建武の新政','しのごの言わずにoh no, you know it's a pizza'];
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

function RACEdelay(ms) {return new Promise(resolve => setTimeout(resolve, ms));}//awaitのやつ

function RACEtekiou(){
    document.getElementById('RACEoutput-one').textContent   = RACEgamebar['one'].join('');
    document.getElementById('RACEoutput-two').textContent   = RACEgamebar['two'].join('');
    document.getElementById('RACEoutput-three').textContent = RACEgamebar['three'].join('');
    document.getElementById('RACEoutput-four').textContent  = RACEgamebar['four'].join('');
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
        document.getElementById('RACElog').textContent = num + 'の勝利！！わーー！！！';
    }
}

async function RACEgamestart() {
    RACEgamenow = 1;
    RACEbarup('one', 0); RACEbarup('two', 0); RACEbarup('three', 0); RACEbarup('four', 0);
    RACEtimer = 3;
    document.getElementById('RACElog').textContent = RACEtimer;
    await RACEdelay(300);
    RACEtimer = 2;
    document.getElementById('RACElog').textContent = RACEtimer;
    await RACEdelay(300);
    RACEtimer = 1;
    document.getElementById('RACElog').textContent = RACEtimer;
    await RACEdelay(300);
    RACEtimer = 'Start!';
    document.getElementById('RACElog').textContent = RACEtimer;
    await RACEdelay(300);
    RACEtimer = 0;
    document.getElementById('RACElog').textContent = '';
    RACELoopct = setInterval(RACEchangerandom, 100); // ゲーム終了時に処理を止める用
    await RACEdelay(500);
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
                await RACEdelay(1000);
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
    document.getElementById('RACElog').textContent = 'スタンしています！';
    await RACEdelay(1500);
    RACEstanother[others[0]] = 0;
    RACEstanother[others[1]] = 0;
    RACEstanother[others[2]] = 0;
    document.getElementById('RACElog').textContent = '';
    RACEgameloop(others[0]);
    RACEgameloop(others[1]);
    RACEgameloop(others[2]);
}
//RengaGame = RG
let count = 0;
let startTime;
let duration = 5000;
document.getElementById('start-btn').addEventListener('click', () => {
    count = 0;
    startTime = Date.now();
    document.getElementById('result').textContent = 'pless Enter(nandomo)';
    document.getElementById('start-btn').style.display = 'none';
    document.addEventListener('keyup', countRensha);
    setTimeout(() => {
        document.removeEventListener('keyup', countRensha);
        document.getElementById('result').textContent = `結果: ${count} 回`;
        document.getElementById('start-btn').style.display = 'block';
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
let CGArea = document.getElementById('CookingGameArea');
let CGList = document.getElementById('CookingGameList');
let CGLog = document.getElementById('CookingGameLog');
let CGStart = document.getElementById('CookingGameStart');
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
function delay(ms){return new Promise(resolve => setTimeout(resolve, ms));}
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
        document.getElementById('CookingGameChoose-' + nanka).style.backgroundColor = 'yellow';
        await delay(800);
        document.getElementById('CookingGameChoose-' + nanka).style.backgroundColor = 'aliceblue';
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