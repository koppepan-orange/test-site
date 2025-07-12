(function(global) {
    //#region komagome
    function delay(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
    async function NicoNicoText(mes){
        const newDiv = document.createElement('div');
        newDiv.textContent = mes;
        newDiv.style = `
        position: absolute;
        top: ${Math.random()*100}vh;
        right: 0;
        background-color: rgba(228, 249, 255, 0.563);
        color: #000000;
        font-size: 50px;
        `
        document.querySelector('body').appendChild(newDiv);
        //let speed = (Math.random()*100+1)*0.1;
        //let speed = mes.toString().length*2 
        speed = 2;
        for(let i = 0; window.innerWidth > i*speed; i++){
            let val = i*speed;
            newDiv.style.right = `${val}px`
            await delay(5);
        }
        newDiv.remove();
    };
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
    //#endregion
    //#region log&text
    let textDiv = document.querySelector('#text');
    let autoDelay = 1;
    let skipText = false; // スキップフラグ
    let clearText = false; // テキスト消去フラグ
    let textShowing = 0;

    function colorcheck(rawtext) {
        const text = [];
        let isRed = false; // ** で囲まれた部分かどうか
        let isPink = false; // && で囲まれた部分かどうか
        let isBlue = false; // ^^ で囲まれた部分かどうか

        for(let i = 0; i < rawtext.length; i++){
            if(rawtext[i] === "*" && rawtext[i + 1] === "*"){
                isRed = !isRed; // 状態を切り替える
                i++; // 次の * をスキップ
            }else if(rawtext[i] === "&" && rawtext[i + 1] === "&"){
                isPink = !isPink;
                i++; // 次の & をスキップ
            }else if(rawtext[i] === "^" && rawtext[i + 1] === "^"){
                isBlue = !isBlue;
                i++;
            }else{
                text.push({ char: rawtext[i], color: isRed ? "red" : isPink ? "pink" : isBlue ? "blue" : null });
            }
        }
        return text;
    }

    async function addtext(text){
        textShowing = 1;
        text = colorcheck(text);
        textDiv.innerHTML = ""; // 中身をリセット
        textDiv.style.display = "block"; // 表示
        let index = 0;
        clearText = false; // 消去フラグをリセット

        return new Promise((resolve) => {
            async function type() {
                    if (index < text.length) {
                    if (skipText) {
                        // スキップ処理
                        while (index < text.length) {
                                const span = document.createElement("span");
                                span.textContent = text[index].char;
                                if (text[index].color) {
                                span.classList.add(`color-${text[index].color}`);
                                }
                                textDiv.appendChild(span);
                                index++;
                        }
                        index = text.length; // 全ての文字を表示済みにする
                        skipText = false;
                        setTimeout(type, 10);
                    } else {
                        // 通常の文字表示
                        const span = document.createElement("span");
                        span.textContent = text[index].char;
                        if (text[index].color) {
                                span.classList.add(`color-${text[index].color}`);
                        }
                        textDiv.appendChild(span);

                        index++;
                        setTimeout(type, 80); // 次の文字を表示する間隔
                    }
                    } else {
                    addlog(textDiv.innerHTML);
                    const waitTime = autoDelay * 1000;
                    const timeout = new Promise(resolve => setTimeout(resolve, waitTime));
                    const userAction = new Promise(resolve => {
                        function waitToClear(event) {
                                if (event.type === 'click' || event.key === 'z' || event.key === 'Enter') {
                                document.removeEventListener('click', waitToClear);
                                document.removeEventListener('keydown', waitToClear);
                                resolve();
                                }
                        }
                        document.addEventListener('click', waitToClear);
                        document.addEventListener('keydown', waitToClear);
                    });

                    Promise.race([timeout, userAction]).then(() => {
                        textDiv.textContent = "";
                        textDiv.style.display = "none";
                        clearText = true;
                        skipText = false
                        textShowing = 0;
                        resolve('end'); // Promiseを解決
                    });
                    }
            }
            type();
        });
    }
    document.addEventListener('keydown', (event) => {
        if(event.key === 'z' || event.key === 'Enter'){
            skipText = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        if(event.key === 'z' || event.key === 'Enter'){
            skipText = false;
        }
    });

    document.addEventListener('click', () => {
        skipText = true;
        setTimeout(() => skipText = false, 50); // 一時的にスキップを有効化
    });

    let logOOmoto = document.querySelector('#log');
    let log = document.querySelector('#log .log');
    let logOpener = document.querySelector('#log .opener');
    logOpener.addEventListener('click', function(){
        if(logOOmoto.style.right == '-300px'){
            logOOmoto.style.right = '0px';
            logOpener.textContent = '>';
        }else{
            logOOmoto.style.right = '-300px';
            logOpener.textContent = '<';
        }
    });
    function addlog(text){
        log.innerHTML += text + '<br>';
        log.scrollTop = log.scrollHeight;
    }
    //#endregion
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

})(this);