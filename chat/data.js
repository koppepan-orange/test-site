let Style = {
    iPhone:{ //16
        "width": "393px",
    },
    tekiou: function() {
        for (let section in this) {
            if (section == 'apply') continue;
            for (let key in this[section]) {
                document.documentElement.style
                    .setProperty(`--${section}-${key}`, this[section][key]);
            }
        }
    }
}


let Commands = [
    {
        name:'save',
        process:function(message){
            load();
            nicoText('君、もしやデバッガーだね..?')
            return null;
        }
    },
    {
        name:'clear',
        process:function(message){
            database.ref('rooms/'+room).remove();
            setTimeout(displayAllMessages, 200);
            nicoText('すべてのメッセージが消去されました。');
            nicoText('あなたがやったのです。反省してね♡')
            nicoText('草');nicoText('草');
            return null;    
        }
    },
    {
        name:'reload',
        process:function(message){
            window.location.reload();   
            return null;
        }
    },
    {
        name:'online',
        process:function(message){
            usersRef.update({
                status: 'online'
            });
            return null;
        }
    },
    {
        name:'offline',
        process:function(message){
            usersRef.update({
                status:'offline'
            });
            return null;
        }
    },
    {
        name:'balance',
        process:function(message){
            load();
            nicoText(`now: ${userData.euro}$`)
            return null;
        }
    },
    {
        name:'nico',
        process:function(message){
            nicoText(message);
            return null;
        }
    },
    {
        name:'rename',
        process:function(message){
            nickname = message;
            return null;
        }
    },
    {
        name:'nanj',
        process:function(message){
            AnonymousName = message;
            return null;
        }
    },
    {
        name:'ban',
        process:function(message){
            database.ref(`users/${message}`).update({
                banned:1
            })
            nicoText('Nice Job!')
            return null;
        }
    },
    {
        name:'unban',
        process:function(message){
            database.ref(`users/${message}`).update({
                banned:0
            })
            nicoText('Good Job!')
            return null;
        }
    }
];


const Stamps = [
    {
        name:"ok",
        img:"jine_1"
    },
    {
        name:"最高か",
        img:"jine_2"
    },
    {
        name:"ぴえん",
        img:"jine_3"
    },
    {
        name:"わりとどうでもいい",
        img:"jine_4"
    },
    {
        name:"ごめん",
        img:"jine_5"
    },
    {
        name:"無事終了",
        img:"jine_6"
    },
    {
        name:"LOVE",
        img:"jine_7"
    },
    {
        name:"sorena",
        img:"jine_8"
    },
    {
        name:"How Nice",
        img:"hownice_pig"
    },
    {
        name:"これすき",
        img:"koresuki"
    },
    {
        name:"おひたし",
        img:"ohitasi"
    },
    {
        name:"宇宙猫",
        img:"spacecat"
    },
    {
        name:"病気ね",
        img:"youaresick"
    },
    {
        name:"なんの参考にもならんと思うが",
        img:"nasanao"
    },
    {
        name:"うおお",
        img:"4coma_high"
    },
    {
        name:"ああ。",
        img:"4coma_low"
    },
    {
        name:"maxwell-hop",
        img:"maxwell_hop",
        gif:1
    },
    {
        name:"maxwell-spin",
        img:"maxwell_spin",
        gif:1
    },
    {
        name:"こにちゃ",
        img:"hello_kiyo"
    },
    {
        name:"おやすみ",
        img:"goodnight"
    },
]