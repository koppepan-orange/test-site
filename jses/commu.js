//#region document
const Nanj = document.querySelector('#nanj');
const Twitter2 = document.querySelector('#twitter2');
const Jine = document.querySelector('#jine');
const roomSelect = document.querySelector('#room-select');
//#endregion
//#region Login
function commuLogin(){
    console.log('commu「ログインしてくれてありがとう鳩」')
    Nanj.style.display = 'flex';
    room = roomSelect.value;
    nickname = username;
    selectRoom();
    selectTweetsroom();
}
function commuLogout(){
    Nanj.style.display = 'none';
    Twitter2.style.display = 'none';
    Jine.style.display = 'none';
    room = 1;
    nickname = '';   
}
let room = 1;
let nickname = 'no name';
let AnonymousName = "/nanj 名前 で変えられるよ!!!!";
let maxMessage = 20;
let userData = null;
//#endregion
//#region nanj
let sendButton = document.querySelector('#send-button');
let MessageIn = document.querySelector('#message-input');
let Messages = document.querySelector('#messages');
room = roomSelect.value; //1
let messagesRef = database.ref('rooms/' + room + '/messages');

MessageIn.addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
    if(!e.shiftKey){
        e.preventDefault();
        sendButton.click();
    }else{
        MessageIn.value += '<br>'
    }
}
});

let stampawait = 0;
function sendStamp(num){//data-typeにpngとgif設定しといて Stampsで管理していつも通りAppendCHildで
    if(stampawait == 1){return};if(room == 'debug'){return};
    let Musername = username;
    let Mtext = `<img src='assets/stamps/${num}.png' width="80" height="80"/>`;
    if(num == 'maxwell1'||num == `maxwell2`){
        Mtext = `<img src='assets/stamps/${num}.gif' width="80" height="80"/>`;
    };
    messagesRef.push({
        text: Mtext,
        nickname: nickname,
        username: Musername,
        timestamp: formatDate(new Date())
    });
    stampawait = 1;
    window.setTimeout(StampAwait, 100);//10s
}
function StampAwait(){stampawait = 0;}

const Commands = {
    'save':{
        name:'save',
        process:function(message){
            load();
            NicoNicoText('君、もしやデバッガーだね..?')
            return null;
        }
    },
    'clear':{
        name:'clear',
        process:function(message){
            database.ref('rooms/'+room).remove();
            setTimeout(displayAllMessages, 200);
            NicoNicoText('すべてのメッセージが消去されました。');
            NicoNicoText('あなたがやったのです。反省してね♡')
            NicoNicoText('草');NicoNicoText('草');
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
    'balance':{
        name:'balance',
        process:function(message){
            load();
            NicoNicoText(`now: ${userData.euro}$`)
            return null;
        }
    },
    'nico':{
        name:'nico',
        process:function(message){
            NicoNicoText(message);
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
            NicoNicoText('Nice Job!')
            return null;
        }
    },
    'unban':{
        name:'unban',
        process:function(message){
            database.ref(`users/${message}`).update({
                banned:0
            })
            NicoNicoText('Good Job!')
            return null;
        }
    }
};

let MessageSendE;
function selectRoom(){
    messagesRef.off();
    sendButton.removeEventListener('click', MessageSendE);
    room = roomSelect.value;
    messagesRef = database.ref('rooms/' + room + '/messages');
    document.querySelector('#messages').innerHTML = '';

    // メッセージ送信
    MessageSendE = sendButton.addEventListener('click', async function(){
        let message = MessageIn.value;
        let Musername = username;
        if(message.trim() !== ''){
            //commands
            if (message.startsWith('/')) {
                let matched = Object.keys(Commands).some(command => {
                    if (message.startsWith(`/${command}`)) {
                        let mes = message.replace(`/${command} `, '');
                        let result = Commands[command].process(mes);
                        console.log(result, !result);
                        if(!result){
                            MessageIn.value = '';
                            return true;
                        }
                        return true;
                    }
                    return false;
                });
            
                if(!matched){
                    NicoNicoText('多分なんかコマンドミスってるで、君')
                    console.log('多分なんかコマンドミスってるで、君')
                }else{
                    return;
                }
            }

            messagesRef.push({
                text: message,
                nickname: nickname,
                username: username,
                timestamp: formatDate(new Date())
            });
            MessageIn.value = '';
            
            
        }
    });

    // 新しいメッセージが追加された時のみ、そのメッセージを追加表示
    messagesRef.on('child_added', async function(snapshot){
        let uRef = database.ref(`users/${username}/banned`)
        uRef.on('value', function(ss) {
            //uRef = ss.val();
            uRef = 0; //一旦のやつ
            if(uRef == 1){ 
                NicoNicoText('エラーが発生しました。')
                document.querySelector('#username').value = '';
                document.querySelector('#password').value = '';
                menuToggle.style.display = 'none';
                nanjContainer.style.display = 'none';
                document.querySelector('#Login').style.display = 'block';
                document.querySelector('#room-select').style.display = 'none';
            }else{
                let messageData = snapshot.val();
                let messageElement = makeNanjPost(messageData,snapshot.key);
                messageElement.setAttribute('data-dokosan','追加の読み込み')
                let existing = document.querySelector(`#messages .message[data-key="${snapshot.key}"]`);
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
        let roomSelect = document.querySelector('#room-select');
        room = roomSelect.value;
        document.querySelector('#messages').innerHTML = '';

        // データベースから全てのメッセージを取得
        messagesRef.once('value', function(pealentsnapshot) {
            pealentsnapshot.forEach(function(snapshot) {
                let uRef = database.ref(`users/${username}/banned`)
                uRef.on('value', function(ss) {
                    uRef = ss.val();
                    if(uRef == 1){
                        NicoNicoText('エラーが発生しました。')
                        document.querySelector('#username').value = '';
                        document.querySelector('#password').value = '';
                        menuToggle.style.display = 'none';
                        nanjContainer.style.display = 'none';
                        document.querySelector('#Login').style.display = 'block';
                        document.querySelector('#room-select').style.display = 'none';
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
            NicoNicoText(`送信者:${Musername}`);
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

        if(username == messageData.username){
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
//#region twitter2
const tweets = document.querySelector('#tweets');
let troom = 'home';
let tweetsRef = database.ref('tweets/1');
let treplyRef = database.ref('tweets');
let treplyMode = 0;

let TAdd
function selectTweetsroom(){
    removeEventListener('child_added', TAdd);
    tweets.innerHTML = '';
    troom = 'home'; //
    tweetsRef = database.ref(`tweets/${troom}`);
    usersRef = database.ref('users/'+username);
    tweetsRef.once('value', function(snapshot){
        displayAllTweets();
    });


    TAdd = tweetsRef.on('child_added', async function(snapshot){
        let messageData = snapshot.val();
        let messageElement = makeTwitter2Post(messageData,snapshot.key, 1)

        tweets.insertBefore(messageElement, tweets.firstChild);
    });
}
document.querySelector('#t-make-button').addEventListener('click', () => {//一方通行の色恋にしてもいいかも　
    const zone = document.querySelector('#t-make-zone')
    if(zone.style.bottom === '0px'){
        zone.style.bottom = '-600px';
    }else{
        zone.style.bottom = '0px';
    }
});
document.querySelector('#t-make-send').addEventListener('click', () => {
    const Text = document.querySelector('#t-make-text').innerText;
    if(treplyMode == 0){
        let newPush = tweetsRef.push({
            text: Text,
            username: username,
            timestamp: formatDate(new Date()),
            time: formatTime(new Date()),
            layer: 1,
            heart:{
                'null':true
            },
            reply:{
                '-KorE8NUl1DeSU4':{
                    text:'null',
                    username:'null',
                    timestamp:'2009/09/22 00:00:00',
                    time:20090922000000,
                    heart:{
                        'null':true,
                    }
                }
            }
        });
        let key = newPush.key;
        newPush.update({
            key: key
        })
    }else{
        let newPush = treplyRef.push({
            text: Text,
            username: username,
            timestamp: formatDate(new Date()),
            time: formatTime(new Date()),
            prevkey: keepKey,
            layer: 2,
            heart:{
                'null':true
            },
            reply:{
                '-KorE8NUl1DeSU4':{
                    text:'null',
                    username:'null',
                    timestamp:'2009/09/22 00:00:00',
                    time:20090922000000,
                    heart:{
                        'null':true,
                    }
                }
            }
        });
        let key = newPush.key;
        newPush.update({
            key: key
        })
    }
    document.querySelector('#t-make-text').value = '';
    const zone = document.querySelector('#t-make-zone');
    zone.style.bottom = '-600px';
    treplyMode = 0;
})
document.querySelector('#t-make-cancel').addEventListener('click', () => {
    const zone = document.querySelector('#t-make-zone')
    zone.style.bottom = '-600px';
    document.querySelector('#t-make-text').value = '';
    treplyMode = 0;
})

let keepKey = null;
let keepLayer = null;
function makeTwitter2Post(messageData, key, layer){
    let messageElement = document.createElement('div');
    messageElement.className = 'tweet';
    if(layer == 2){
        messageElement.className += ' reply';
    }
    messageElement.setAttribute('data-key', key);

    let userElement = document.createElement('div');
    userElement.className = 'header';

    let iconElement = document.createElement('img');
    iconElement.className = 'icon';
    firebase.database().ref(`users/${messageData.username}/icon`).once("value").then((snapshot) => {
        if(snapshot.exists()){
            iconElement.src = snapshot.val();
        }else{
            iconElement.src = 'assets/sozais/none.png';
        }
    });
    userElement.appendChild(iconElement);

    messageElement.appendChild(userElement);

    let column = document.createElement('div');
    column.className = 'column';

    let contentElement = document.createElement('div');
    contentElement.className = 'content';
    if(layer == 1){
        contentElement.addEventListener('click', contentClicked);
        function contentClicked(){
            keepKey = key;
            
            let newTweetroom = document.createElement('div');
            newTweetroom.className = 'tweets-2';

            let back = document.createElement('div');
            back.className = 't-tweet-back';
            back.innerText = '←'
            back.addEventListener('click', () => {
                newTweetroom.style.opacity = 0;
                document.querySelector('#twitter2').removeChild(newTweetroom);
            });
            newTweetroom.appendChild(back);

            let motono = document.createElement('div');
            motono.className = 't-tweet-motono';

            // let copiedTweet = messageElement.cloneNode(true); //コピーするやつ
            // copiedTweet.removeEventListener('click', contentClicked);
            // motono.appendChild(copiedTweet);
            motono.innerHTML = messageElement.outerHTML;
            motono.querySelector('.tweet').classList.add('motono');

            newTweetroom.appendChild(motono);

            let replies = document.createElement('div');
            replies.className = 't-tweet-replies';
            
            database.ref(`tweets/${troom}/${key}/reply`).once("value").then((snapshot) => {
                if(snapshot.exists()){
                    snapshot.forEach((snapshoten) => {
                        let reply = snapshoten.val();
                        if(reply.key != '-KorE8NUl1DeSU4' && reply.username != 'null'){
                            let replyElement = makeTwitter2Post(reply, snapshoten.key, 2);
                            replies.appendChild(replyElement);   
                        }else{
                            console.log('てか、ただのnullじゃないですか！', snapshoten.val().key);
                        }
                    });
                }
            });

            // if(replies.children.length > 0){
                newTweetroom.appendChild(replies);
            // }

            document.querySelector('#twitter2').appendChild(newTweetroom);
            newTweetroom.style.opacity = 1;
        }
    }

    let usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = messageData.username;//クリックされたらその人のみに〜みたいなのあり
    contentElement.appendChild(usernameElement);

    let timestampElement = document.createElement('span');
    timestampElement.className = 'timestamp';
    timestampElement.textContent = '　'+timeDifference(messageData.time.toString());
    contentElement.appendChild(timestampElement);

    let brElement = document.createElement('br');
    contentElement.appendChild(brElement);

    let textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.innerText = messageData.text;
    contentElement.appendChild(textElement);

    column.appendChild(contentElement);

    let evaluationElement = document.createElement('div');
    evaluationElement.className = 'evaluation';

    let heartElement = document.createElement('div');
    heartElement.className = 'eval heart';

    // カウントを取得
    let updateHeartDisplay = (snapshot) => {
        let heartData = snapshot.val() || {}; 
        let count = Object.values(heartData).length - 1; // null分を引く
        heartElement.textContent = '♡ ' + Math.max(0, count);
        heartElement.style.color = (username in heartData) ? 'red' : 'black';
    };
    let heartRef = database.ref(`tweets/${troom}/${key}/heart`);
    if(layer == 2){
        heartRef = database.ref(`tweets/${troom}/${keepKey}/reply/${key}/heart`);
    }
    heartRef.on('value', updateHeartDisplay);
    heartElement.addEventListener('click', async function () {
        heartRef.once('value', function(snapshot) {
            let heartData = snapshot.val() || {};
            if (username in heartData) {
                heartRef.child(username).remove();
            } else {
                heartRef.child(username).set(true);
            }
        });
    });
    evaluationElement.appendChild(heartElement);

    if(layer == 1){
        let replyElement = document.createElement('span');
        replyElement.className = 'eval reply';
        replyElement.textContent = '→';
        replyElement.addEventListener('click', async function(){
            treplyRef = database.ref(`tweets/${troom}/${key}/reply`);
            treplyMode = 1;
            // keepLayer = 2;
            messageElement.click();
            document.querySelector('#t-make-text').innerText = '';
            const zone = document.querySelector('#t-make-zone');
            zone.style.bottom = '0px';
        });
        evaluationElement.appendChild(replyElement);
    }

    if(layer == 2){
        let mentionElement = document.createElement('span');
        mentionElement.className = 'eval mention';
        mentionElement.textContent = '→';
        mentionElement.addEventListener('click', async function(){
            document.querySelector('#t-make-text').innerText = `@${messageData.username}`;
            const zone = document.querySelector('#t-make-zone');
            zone.style.bottom = '0px';
        });
        evaluationElement.appendChild(mentionElement);
    }

    column.appendChild(evaluationElement);

    messageElement.appendChild(column);

    return messageElement;
}

function displayAllTweets(){
    document.querySelector('#tweets').innerHTML = '';

    // データベースから全てのメッセージを取得
    tweetsRef.once('value', function(pealentsnapshot){
        pealentsnapshot.forEach(function(snapshot){
            let messageData = snapshot.val();
            let messageElement = makeTwitter2Post(messageData,snapshot.key, 1)
            tweets.insertBefore(messageElement, tweets.firstChild);
        });
    });
}


function timeDifference(pastTimestamp) {
    const now = new Date(); // 現在時刻
    const pastDate = new Date(
        pastTimestamp.slice(0, 4),
        pastTimestamp.slice(4, 6) - 1,
        pastTimestamp.slice(6, 8),
        pastTimestamp.slice(8, 10),
        pastTimestamp.slice(10, 12)
    );

    const diffMs = now - pastDate; // ミリ秒の差分
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // 分に変換
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 時間に変換
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 日に変換
    const diffMonths = (now.getFullYear() - pastDate.getFullYear()) * 12 + now.getMonth() - pastDate.getMonth(); // 月差分計算
    const diffYears = now.getFullYear() - pastDate.getFullYear(); // 年差分計算

    // 条件分岐で返す
    if (diffMinutes < 60) {
        return `${diffMinutes}分前`;
    } else if (diffHours < 24) {
        return `${diffHours}時間前`;
    } else if (diffDays < 30) { // 30日未満なら「日」
        return `${diffDays}日前`;
    } else if (diffMonths < 12) { // 12ヶ月未満なら「月」
        return `${diffMonths}ヶ月前`;
    } else { // それ以上なら「年」
        return `${diffYears}年前`;
    }
}


//#endregion
//#region jine

//#endregion
