let dealervalue = 0
let playervalue = 0
let increase = 0
let Bturn = 1

function Breset(){
    dealervalue = 0
    playervalue = 0
    Bturn = 1
    document.getElementById('Blog').textContent = 'game...start!!';
    tekiou()
    window.setTimeout(start, 1000)
}
async function start(){
    x = dealervalue
    dealervalue += Math.floor(Math.random() * 10) + 1;
    increase = dealervalue - x
    document.getElementById('Blog').textContent = 'dealerは' + increase + 'のカードを引きました！';
    tekiou()
}
function tekiou(){
    document.getElementById('PlayerValue').textContent = playervalue;
    document.getElementById('DealerValue').textContent = dealervalue;
}
function hit(){
    if(Bturn == 1){
    if(playervalue !== 21){
    x = playervalue
    playervalue += Math.floor(Math.random() * 10) + 1;
    increase = playervalue - x
    }
    tekiou()
    document.getElementById('Blog').textContent = 'playerは' + increase + 'のカードを引きました！';
    if(playervalue > 21){
        window.setTimeout(youlose(), 500)
    }
    }
    }
function stand(){
    Bturn = 2
    window.setTimeout(dealerBturn(), 500)
}
function dealerBturn(){
    x = dealervalue
    dealervalue += Math.floor(Math.random() * 10) + 1;
    increase = dealervalue - x
    tekiou()
    document.getElementById('Blog').textContent = 'dealerは' + increase + 'のカードを引きました！';
    if(dealervalue < 17){
    window.setTimeout(dealerBturn, 1000)
    } else if(dealervalue > 21){
        window.setTimeout(youwin(), 1500)
    } else if(dealervalue > playervalue){
        window.setTimeout(youlose(), 1500)
    } else if(dealervalue < playervalue){
        window.setTimeout(youwin(), 1500)
    } else if(dealervalue == playervalue){
        window.setTimeout(draw(), 1500)
    } else {
        document.getElementById('Blog').textContent = 'どうやってここまで？';
    }
}
function youlose(){
    Bturn = 3
    tekiou()
    document.getElementById('Blog').textContent = 'youlose...';
}
function youwin(){
    Bturn = 3
    tekiou()
    document.getElementById('Blog').textContent = 'youwin! utageja---!';
}
function draw(){
    Bturn = 3
    tekiou()
    document.getElementById('Blog').textContent = 'dra..push!!';
}
