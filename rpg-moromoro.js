let playerhealth = 0;
let playermaxhealth = 0;
let playerattack = 1;
let playerdefense = 0;
let playerexp = 0;
let playerbuff = 0;
let playerpower = 1;
let playershell = 1;
let playermp = 0;
let enemyhealth = 0;
let enemymaxhealth = 0;
let enemydebuff = 0;
let playerlevel = 1;
let enemylevel = 1;
let turn = 0;
let phase = 0;
let x = 0;
let y = 0;
let z = 0;
let damage = 0;
let magic1 = 0;
let magic2 = 0;
let magic3 = 0;
let learnedmagic = 0;
let learnmagic = 0;
let potion = 3;
let bomb = 3;
let skipcard = 3;
let enemyname = 0;
let enemynames =  ["ピンクな先輩", "ブルーな後輩", "過激派のハッカー", "反旗を翻したアンドロイド", "腐敗した落武者", "アスピリン中毒者",
                   "彷徨わない亡霊", "地上の月兎", "悠々自適なクラス委員", "大胆不敵な問題児", "兎角のシルバージャグラー", "デスブリンガー・ナース",
                   "古書館の魔術師", "トラブルメーカーな天才少女", "誰もが恐れる風紀委員長", "自称清楚系超天才病弱美少女ハッカー",
                   "大量発生中のツインテ", "ああああ"];
                   // 名前の元!紹介! 1行目-cybercodeonline 2行目-東方ロストワード 3行目-ブルーアーカイブ 4行目-スプラトゥーン3 & 勇者あるある

function tekiou(){
    document.getElementById('EnemyHealth').textContent = enemyhealth;
    document.getElementById('PlayerHealth').textContent = playerhealth;
}
function bufftekiou(){
    if(enemydebuff == 0){document.getElementById('EnemyDebuff').textContent = ' ';}
    if(enemydebuff == 1){document.getElementById('EnemyDebuff').textContent = 'poison';}
    if(enemydebuff == 2){document.getElementById('EnemyDebuff').textContent = 'deadly poison';}
    if(playerbuff == 0){document.getElementById('PlayerBuff').textContent = ' ';}
    if(playerbuff == 1){document.getElementById('PlayerBuff').textContent = 'power';}
    if(playerbuff == 2){document.getElementById('PlayerBuff').textContent = 'morepower';}
    if(playerbuff == 3){document.getElementById('PlayerBuff').textContent = 'shell';}
    if(playerbuff == 4){document.getElementById('PlayerBuff').textContent = 'moreshell';}
    if(playerbuff == 5){document.getElementById('PlayerBuff').textContent = 'luck';}
    if(playerbuff == 6){document.getElementById('PlayerBuff').textContent = 'great luck';}
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
} // 遅延やってみたかったの
function reset() {
    turn = 0;
    playerhealth = 0;
    playermaxhealth = 0;
    playerattack = 1;
    playerdefense = 0;
    playerexp = 0;
    playerbuff = 0;
    playerpower = 1;
    playershell = 1;
    enemydebuff = 0;
    enemyhealth = 0;
    enemymaxhealth = 0;
    playerlevel = 1;
    enemylevel = 1;
    saydefeats = ['playerは力尽きた...残念だったネ!にはははは〜!!', 'playerは..まけました', '残念だったね!すごい惜しかったね!!', 'まけちゃったか..ねぇ、もう一回、やってみない?'];
    x = 0;
    y = 0;
    magic1 = 0;
    magic2 = 0;
    magic3 = 0;
    learnedmagic = 0;
    potion = 3;
    bomb = 3;
    skipcard = 3;
    document.getElementById('Rlog').textContent = 'ゲーム開始です！！';
    window.setTimeout(start,1000)
}
function start(){
    playerhealth = 10;
    playermaxhealth = 10;
    playermp = 10;
    enemyhealth = 5;
    enemymaxhealth = 5;
    enemyname = enemynames[Math.floor(Math.random() * enemynames.length)];
    document.getElementById("EnemyName").textContent = enemyname;
    tekiou();
    document.getElementById('EnemyLevel').textContent = enemylevel;
    document.getElementById('PlayerLevel').textContent = playerlevel;
    document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
    document.getElementById('EnemyMaxHealth').textContent = enemymaxhealth;
    playerturn();
}
function playerturn() {
    if (turn !== 3){
    turn = 1;}
    phase = 1;
    document.getElementById('Rlog').textContent = 'あなたのターンです！';
    document.getElementById('Rselect1').textContent = 'attack';
    document.getElementById('Rselect2').textContent = 'magic';
    document.getElementById('Rselect3').textContent = 'tools';
    document.getElementById('Rback').textContent = 'pass';
}
// 選択ボタン
function Rselect1(){
    if (phase == 1) {
        document.getElementById('Rlog').textContent = 'どうやって攻撃する？';
        document.getElementById('Rselect1').textContent = 'slash';
        document.getElementById('Rselect2').textContent = 'double slash';
        document.getElementById('Rselect3').textContent = 'slash of light';
        document.getElementById('Rback').textContent = 'back';
        phase = 2;
    } else if (phase == 2) {
        disappear()
        document.getElementById('Rlog').textContent = 'playerの攻撃!';
        window.setTimeout(slash, 1000)
    } else if (phase == 3) {
        disappear()
        if (magic1 !== 0){
            z = magic1
            magic()
        } else {
            document.getElementById('Rlog').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    } else if (phase == 4) {
        disappear()
        if (potion > 0) {
            document.getElementById('Rlog').textContent = 'playerはpotionを使用した!!';
            window.setTimeout(Potion, 1000)
        } else {
            document.getElementById('Rlog').textContent = 'not enough potion...';
            window.setTimeout(playerturn, 1000)
        }
    } else if (phase == 5){
        disappear()
        playerattack += 1
        document.getElementById('Rlog').textContent = '攻撃力が上がった!';
        window.setTimeout(nextenemy,1000)
    } else if (phase == 6){
        disappear()
        document.getElementById('Rlog').textContent = magic1 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic1 = learnmagic
        window.setTimeout(nextenemy,1000)
    }
}
function Rselect2(){
    if (phase == 1) {
        document.getElementById('Rlog').textContent = 'どうする？';
        document.getElementById('Rselect1').textContent = magic1;
        document.getElementById('Rselect2').textContent = magic2;
        document.getElementById('Rselect3').textContent = magic3;
        document.getElementById('Rback').textContent = 'back';
        phase = 3;
    } else if (phase == 2) {
        disappear()
        document.getElementById('Rlog').textContent = 'playerの攻撃!!';
        window.setTimeout(doubleslash, 1000)
    } else if (phase == 3) {
        disappear()
        if (magic2 !== 0){
            z = magic2
            magic()
        } else {
            document.getElementById('Rlog').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    } else if (phase == 4) {
        disappear()
        if (bomb > 0) {
            document.getElementById('Rlog').textContent = 'playerはbombを使用した!!';
            window.setTimeout(Bomb, 1000)
        } else {
            document.getElementById('Rlog').textContent = 'not enough bomb...';
            window.setTimeout(playerturn, 1000)
        }
        
    } else if (phase == 5){
        disappear()
        phase = 0;
        playerdefense += 1
        document.getElementById('Rlog').textContent = '防御力が上がった!';
        window.setTimeout(nextenemy, 1000)
    } else if (phase == 6){
        disappear()
        document.getElementById('Rlog').textContent = magic2 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic2 = learnmagic
        window.setTimeout(nextenemy, 1000)
    }
}
function Rselect3(){
    if (phase == 1) {
        document.getElementById('Rlog').textContent = 'どうやって攻撃する？';
        document.getElementById('Rselect1').textContent = 'potion x' + potion;
        document.getElementById('Rselect2').textContent = 'bomb x' + bomb;
        document.getElementById('Rselect3').textContent = 'skipcard x' + skipcard;
        document.getElementById('Rback').textContent = 'back';
        phase = 4;
    } else if (phase == 2) {
        disappear()
        document.getElementById('Rlog').textContent = 'playerの一閃!!';
        window.setTimeout(slashoflight, 1000)
    } else if (phase == 3) {
        disappear()
        if (magic3 !== 0){
            z = magic3
            magic()
        } else {
            document.getElementById('Rlog').textContent = 'you dont have magic...';
            window.setTimeout(playerturn, 1000)
        }
    } else if (phase == 4) {
        disappear()
        if (skipcard > 0) {
            document.getElementById('Rlog').textContent = 'playerはskipcardを使用した!!';
            window.setTimeout(Skipcard, 1000)
        } else {
            document.getElementById('Rlog').textContent = 'not enough skipcard...';
            window.setTimeout(playerturn, 1000)
        }
    } else if (phase == 5){
        phase = 0;
        if (learnedmagic == 1){
            learnmagic = 'heal'
        } else if (learnedmagic == 2){
            learnmagic = 'power'
        } else if (learnedmagic == 3){
            learnmagic = 'shell'
        } else if (learnedmagic == 4){
            learnmagic = 'poison'
        } else if (learnedmagic == 5){
            learnmagic = 'healer than'
        } else if (learnedmagic == 6){
            learnmagic = 'luck'
        } else if (learnedmagic == 7){
            learnmagic = 'more power'
        } else if (learnedmagic == 8){
            learnmagic = 'more shell'
        } else if (learnedmagic == 9){
            learnmagic = 'deadly poison'
        } else if (learnedmagic == 10){
            learnmagic = 'the healest'
        } else if (learnedmagic == 11){
            learnmagic = 'greatluck'
        } else {
            learnmagic = 'random'
            document.getElementById('Rlog').textcontent = '魔法は見つからなかった...しかしrandomを思いついた!';
            playersutefuri()
        }
        document.getElementById('Rlog').textContent = learnmagic + 'を見つけた!!';
        document.getElementById('Rselect1').textContent = magic1;
        document.getElementById('Rselect2').textContent = magic2;
        document.getElementById('Rselect3').textContent = magic3;
        document.getElementById('Rback').textContent = 'pass';
        phase = 6;
    } else if (phase == 6){
    disappear()
        document.getElementById('Rlog').textContent = magic3 + 'を忘れ、' + learnmagic + 'を覚えた!!';
        magic3 = learnmagic
        window.setTimeout(nextenemy, 1000)
    }
}
// 一個選択肢を戻るやつ
function Rback(){
    if (phase == 1){
    disappear()
        enemieturn();
    } else if (phase == 2){
        playerturn();
    } else if (phase == 3) {
        playerturn();
    } else if (phase == 4) {
        playerturn();
    } else if (phase == 5) {
    disappear()
        phase = 0;
        enemylevel += 1
        document.getElementById('Rlog').textContent = 'enemyのレベルが上がった!';
        window.setTimeout(nextenemy, 1000)
    } else if(phase == 6){
        window.setTimeout(enemyorplayer, 1000)
    }
    
}
function disappear(){
    document.getElementById('Rselect1').textContent = ' ';
    document.getElementById('Rselect2').textContent = ' ';
    document.getElementById('Rselect3').textContent = ' ';
    document.getElementById('Rback').textContent = '';
    phase = 'null';
}
// playerの攻撃たち
// playerの斬撃攻撃
function slash() {
    y = enemyhealth
    enemyhealth -= (playerattack * playerpower);
    damage = y - enemyhealth;
    document.getElementById('Rlog').textContent = enemyname + 'に' + damage + 'のダメージ!';
    if (enemyhealth < 0){
        enemyhealth = 0
    }
    if (enemyhealth == 0){
        window.setTimeout(killedenemy, 1000)
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
async function doubleslash() {
    x = Math.floor(Math.random() * 3);
        if (x == 0){
            damage = 0
        } else {
            y = enemyhealth
            enemyhealth -= playerattack * 1 * playerpower;
            damage = y - enemyhealth;
        }
    if (damage == 0){
        document.getElementById('Rlog').textContent = 'miss! ダメージを与えられない!';
    } else {
    document.getElementById('Rlog').textContent = enemyname + 'に' + damage + 'のダメージ!';
    if (enemyhealth < 0){
        enemyhealth = 0
    }
    }
    tekiou();
    if (enemyhealth == 0){
        window.setTimeout(killedenemy, 1000)
    } else {
        x = Math.floor(Math.random() * 3);
        if (x == 0){
            damage = 0
        } else {
            y = enemyhealth
            enemyhealth -= playerattack * 1 * playerpower;
            damage = y - enemyhealth;
        }
        if (damage == 0){
            await delay(1000);
            document.getElementById('Rlog').textContent = 'miss! ダメージを与えられない!';
        } else {
            await delay(1000);
            document.getElementById('Rlog').textContent = enemyname + 'に' + damage + 'のダメージ!';
                if (enemyhealth < 0){
                    enemyhealth = 0
                }
                if (enemyhealth == 0){
                    window.setTimeout(killedenemy, 1000)
                }   
                tekiou();
        }
        window.setTimeout(enemyorplayer, 1000)
    }
}
function slashoflight() {
    x = Math.floor(Math.random() * 3);
    if (x == 0) {
        y = enemyhealth
        enemyhealth -= playerattack * 3 * playerpower;
        damage = y - enemyhealth;
        document.getElementById('Rlog').textContent = enemyname + 'に' + damage + 'のダメージ!';
        if (enemyhealth < 0){
            enemyhealth = 0
        }
        if (enemyhealth == 0){
            window.setTimeout(killedenemy, 1000)
        }
        tekiou();   
    } else {
        document.getElementById('Rlog').textContent = 'miss! ダメージを与えられない!';
    }
    window.setTimeout(enemyorplayer, 1000)
}
// playerの魔法
// 魔法の一覧です
// heal　20%回復
// power　attack 1.5倍 code:1
// shell　defence 1.5倍 code:3
// poison　敵に毒を付与　毎ターン5%ダメージ code:1
// healerthan　40%回復
// luck　ターン終了時、1/5の確率でターン継続 code:5
// morepower　attack 2倍 code:2
// moreshell defence 2倍 code:4
// deadlypoison　敵に毒を付与　毎ターン10%ダメージ code:2
// thehealest　60%回復
// greatluck　ターン終了後、1/2の確率でターン継続 code:6
function magic() {
    if (playermp > 0){
    if (z == 'heal') {
        Heal();
    } else if (z == 'power') {
        Power();
    } else if (z == 'shell') {
        Shell();
    } else if (z == 'poison') {
        Poison();
    } else if (z == 'healer than') {
        Healerthan();
    } else if (z == 'luck') {
        Luck();
    } else if (z == 'more power') {
        Morepower();
    } else if (z == 'more shell') {
        Moreshell();
    } else if (z == 'deadly poison') {
        Deadlypoison();
    } else if (z == 'the healest') {
        Thehealest();
    } else if (z == 'greatluck') {
        Greatluck();
    } else if (z == 'random') {
        Random();
    }
    playermp -= 1;
    } else {
        document.getElementById('Rlog').textContent = 'not enough mp...';
        window.setTimeout(playerturn, 1000)
    }
}
function Heal() {
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.2)
    y = playerhealth - x;
    document.getElementById('Rlog').textContent = 'playerはhealを唱え、' + y + '回復した!';
    if (playerhealth > playermaxhealth) {
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Power() {
    playerbuff = 1
    playerpower = 1.5
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはpowerを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Shell() {
    playerbuff = 3
    playershell = 1.5
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはshellを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Poison() {
    enemydebuff = 1
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはpoisonを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Healerthan() {
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.4)
    y = playerhealth - x;
    document.getElementById('Rlog').textContent = 'playerはhealer thanを唱え、' + y + '回復した!!';
    if (playerhealth > playermaxhealth) {
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Luck() {
    playerbuff = 5
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはluckを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Morepower() {
    playerbuff = 2
    playerpower = 2
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはmore powerを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Moreshell() {
    playerbuff = 4
    playershell = 2
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはmore shellを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Deadlypoison() {
    enemydebuff = 2
    bufftekiou()
    document.getElementById('Rlog').textContent = 'playerはdeadly poisonを唱えた!';
    window.setTimeout(enemyorplayer, 1000)
}
function Thehealest() {
    x = playerhealth
    playerhealth += Math.round(playermaxhealth * 0.6)
    y = playerhealth - x;
    document.getElementById('Rlog').textContent = 'playerはthe healestを唱え、' + y + '回復した!!!';
    if (playerhealth > playermaxhealth) {
        playerhealth = playermaxhealth;
    }
    tekiou();
    window.setTimeout(enemyorplayer, 1000)
}
function Greatluck() {
    playerbuff = 6

}
async function Random(){
    document.getElementById('Rlog').textContent = '.........';
    await delay(1000);
    x = Math.floor(Math.random() * 11)
    if (x == 0){
        document.getElementById('Rlog').textContent = 'healが出た!';
        window.setTimeout(Heal, 1000)
    } else if (x == 1){
        document.getElementById('Rlog').textContent = 'powerが出た!';
        window.setTimeout(Power, 1000)
    } else if (x == 2){
        document.getElementById('Rlog').textContent = 'shellが出た!';
        window.setTimeout(Shell, 1000)
    } else if (x == 3){
        document.getElementById('Rlog').textContent = 'poisonが出た!';
        window.setTimeout(Poison, 1000)
    } else if (x == 4){
        document.getElementById('Rlog').textContent = 'healer thanが出た!';
        window.setTimeout(Healerthan, 1000)
    } else if (x == 5){
        document.getElementById('Rlog').textContent = 'luckが出た!';
        window.setTimeout(Luck, 1000)
    } else if (x == 6){
        document.getElementById('Rlog').textContent = 'more powerが出た!';
        window.setTimeout(Morepower, 1000)
    } else if (x == 7){
        document.getElementById('Rlog').textContent = 'more shellが出た!';
        window.setTimeout(Moreshell, 1000)
    } else if (x == 8){
        document.getElementById('Rlog').textContent = 'deadly poisonが出た!';
        window.setTimeout(Deadlypoison, 1000)
    } else if (x == 9){
        document.getElementById('Rlog').textContent = 'the healestが出た!';
        window.setTimeout(Thehealest, 1000)
    } else if (x == 10){
        document.getElementById('Rlog').textContent = 'greatluckが出た!';
        window.setTimeout(Greatluck, 1000)
    }
}

// playerの道具
function Potion() {
    playerhealth = playermaxhealth
    tekiou();
    document.getElementById('Rlog').textContent = '　　　全　　　回　　　復　　　';
    potion -= 1;
    window.setTimeout(playerturn, 1000)
}
function Bomb() {
    enemyhealth = 0;
    tekiou();
    document.getElementById('Rlog').textContent = '黒より黒く闇より暗き漆黒に我が深紅の混淆を望みたも..エ、エクスプロージョン!';
    bomb -= 1;
    window.setTimeout(killedenemy, 1000)
}
function Skipcard() {
    turn = 3;
    document.getElementById('Rlog').textContent = 'カードを仕込みました!';
    skipcard -= 1;
    window.setTimeout(playerturn, 1000)
}
// enemieturnまでの道のり
function enemyorplayer(){
    if (turn == 1){
        y = 1;
        if (playerbuff == 5){y = Math.floor(Math.random() * 5);}
        if (playerbuff == 6){y = Math.floor(Math.random() * 3);}
        if (y == 0){
            document.getElementById('Rlog').textContent = 'Lucky♪';
            window.setTimeout(playerturn, 1000)
        } else {enemieturn()}
        } else if (turn == 3) {
            document.getElementById('Rlog').textContent = 'スキップ!!!';
            window.setTimeout(playerturn, 1000)
            turn = 1;
        }
}
// enemyの手続き
function enemieturn() {
    turn = 2;
    document.getElementById('Rlog').textContent = '敵のターンです！';
    window.setTimeout(enemyattack, 1000)
}
async function enemyattack() {
    x = playerhealth
    x -= enemylevel;
    x += playerdefense * playershell
    damage = playerhealth - x;
    if (damage < 0){damage = 0;}
    playerhealth -= damage;
    document.getElementById('Rlog').textContent = 'playerに' + damage + 'のダメージ!';
    if (playerhealth < 0){
        playerhealth = 0
    }
    if (playerhealth == 0){
        defeat();
        turn = 0;
    }
    tekiou();
    if (turn == 2){
    if (enemydebuff == 1) {
        x = enemyhealth;
        enemyhealth -= enemymaxhealth * 0.05
        enemyhealth = Math.floor(enemyhealth)
        if (enemyhealth < 0){enemyhealth = 0}
        y = x - enemyhealth;
    } else if (enemydebuff == 2) {
        x = enemyhealth;
        enemyhealth -= enemymaxhealth * 0.1
        enemyhealth = Math.floor(enemyhealth)
        if (enemyhealth < 0){enemyhealth = 0}
        y = x - enemyhealth;
    }
    if (enemydebuff !== 0){
        await delay(1000); // 2秒間の遅延
        document.getElementById('Rlog').textContent = enemyname + 'は毒で' + y + 'のダメージ!';
    }
    tekiou();
    if (enemyhealth < 0){
        enemyhealth = 0
    }
    if (enemyhealth == 0){
        window.setTimeout(killedenemy, 1000)
    } else {
        window.setTimeout(playerturn, 1000)
    }
}
}
// ゲームの判定のお話
function killedenemy() {
    turn = 0;
    x = playerexp
    playerexp += enemylevel;
    y = playerexp - x;
    document.getElementById('Rlog').textContent = enemyname + 'を倒した!';
    window.setTimeout(expget, 1000)
}
function expget(){
    document.getElementById('Rlog').textContent = y + 'の経験値を奪った!';
    window.setTimeout(playerlevelup, 1000)
}
function playerlevelup(){
    if (playerexp >= playerlevel){
        playerlevel += 1;
        playerexp = 0;
        learnedmagic += 1
        playermaxhealth += 1;
        playerhealth = playermaxhealth;
        document.getElementById('PlayerLevel').textContent = playerlevel;
        document.getElementById('PlayerHealth').textContent = playerhealth;
        document.getElementById('PlayerMaxHealth').textContent = playermaxhealth;
        document.getElementById('Rlog').textContent = 'レベルアップ!!';
        window.setTimeout(playersutefuri, 1000)
    } else window.setTimeout(nextenemy, 1000)
}
function nextenemy() {
    playermp = 
    playerbuff = 0;
    playerpower = 1;
    playershell = 1;
    enemydebuff = 0;
    bufftekiou()
    enemylevel += (Math.floor(Math.random() * 3) - 1);
    if (enemylevel < 1){enemylevel = 1}
    enemymaxhealth += 1;
    enemyhealth = enemymaxhealth;
    enemyname = enemynames[Math.floor(Math.random() * enemynames.length)];
    document.getElementById("EnemyName").textContent = enemyname;
    document.getElementById('Rlog').textContent = enemyname + 'が現れた!';
    document.getElementById('EnemyLevel').textContent = enemylevel;
    document.getElementById('EnemyMaxHealth').textContent = enemymaxhealth;
    tekiou();
    window.setTimeout(playerturn, 750)
}
function playersutefuri(){
    document.getElementById('Rlog').textContent = 'どの能力を上げますか?';
    document.getElementById('Rselect1').textContent = 'attack';
    document.getElementById('Rselect2').textContent = 'defense';
    document.getElementById('Rselect3').textContent = 'magic';
    document.getElementById('Rback').textContent = 'enemy';
    phase = 5;
}
let saydefeat = 0;
let saydefeats = ['playerは力尽きた...残念だったネ!ﾆﾊﾊﾊﾊ!!', 'playerは..まけました', '残念だったね!すごい惜しかったね!!', 'まけちゃったか..ねぇ、もう一回、やってみない?'];
function defeat() {
    if (playerlevel < 3){saydefeats = ['あはは..負けちゃいましたね....防御力を上げると良いですよ!', 'あはは..負けちゃいましたね....double slashは運要素も少ないので強いですよ!', 'あはは..負けちゃいましたね....魔法にターン数制限はありません!いっぱい使っちゃいましょう!'];}
    document.getElementById('Rlog').textContent = saydefeats[Math.floor(Math.random() * saydefeats.length)];
    window.setTimeout(reset, 2000)
}
function RStatusAppear() {
    document.getElementById('RStatus').textContent = '攻撃力:' + playerattack + '   防御力:' + playerdefense + '   経験値:' + playerexp;
    window.setTimeout(RStatusDisappear, 5000)
}
function RStatusDisappear() {
    document.getElementById('RStatus').textContent = '';
}