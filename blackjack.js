let dealervalue = 0
let playervalue = 0
let x = 0
let increase = 0
let turn = 1

function reset(){
    dealervalue = 0
    playervalue = 0
    turn = 1
    document.getElementById('log').textContent = 'game...start!!';
    tekiou()
    window.setTimeout(start, 1000)
}
async function start(){
    x = dealervalue
    dealervalue += Math.floor(Math.random() * 10) + 1;
    increase = dealervalue - x
    document.getElementById('log').textContent = 'dealerは' + increase + 'のカードを引きました！';
    tekiou()
}
function tekiou(){
    document.getElementById('PlayerValue').textContent = playervalue;
    document.getElementById('DealerValue').textContent = dealervalue;
}
function hit(){
    if(turn == 1){
    if(playervalue !== 21){
    x = playervalue
    playervalue += Math.floor(Math.random() * 10) + 1;
    increase = playervalue - x
    }
    tekiou()
    document.getElementById('log').textContent = 'playerは' + increase + 'のカードを引きました！';
    if(playervalue > 21){
        window.setTimeout(youlose(), 500)
    }
    }
    }
function stand(){
    turn = 2
    window.setTimeout(dealerturn(), 500)
}
function dealerturn(){
    x = dealervalue
    dealervalue += Math.floor(Math.random() * 10) + 1;
    increase = dealervalue - x
    tekiou()
    document.getElementById('log').textContent = 'dealerは' + increase + 'のカードを引きました！';
    if(dealervalue < 17){
    window.setTimeout(dealerturn, 1000)
    } else if(dealervalue > 21){
        window.setTimeout(youwin(), 1500)
    } else if(dealervalue > playervalue){
        window.setTimeout(youlose(), 1500)
    } else if(dealervalue < playervalue){
        window.setTimeout(youwin(), 1500)
    } else if(dealervalue == playervalue){
        window.setTimeout(draw(), 1500)
    } else {
        document.getElementById('log').textContent = 'どうやってここまで？';
    }
}
function youlose(){
    turn = 3
    tekiou()
    document.getElementById('log').textContent = 'youlose...';
}
function youwin(){
    turn = 3
    tekiou()
    document.getElementById('log').textContent = 'youwin! utageja---!';
}
function draw(){
    turn = 3
    tekiou()
    document.getElementById('log').textContent = 'dra..push!!';
}