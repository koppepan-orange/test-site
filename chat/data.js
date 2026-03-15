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
    // rawは配列です。
    {
        name:'log',
        func:function(raw){
            let [, ...text] = raw;
            console.log(text.join(' '));
            nicoText('君、もしやデバッガーだね..?')
            return 0;
        }
    },
    {
        name:'clear',
        func:function(raw){
            let [, num, room = ''] = raw;
            if(nanF.clear(num, room)) return 1;
            nicoText('すべてのメッセージが消去されました。');
            return 0;    
        }
    },
    {
        name:'delete',
        func:function(raw){
            let [, room = ''] = raw;
            if(nanC.officials.includes(room)) return tobiText(nanC.inpuD, '公式ルームは消去できません');
            nanF.delete(room);
            nicoText('ルームが消去されました。');
            return 0;
        }
    },
    {
        name:'reload',
        func:function(raw){
            window.location.reload();   
            return 0;
        }
    },
    {
        name:'online',
        func:function(raw){
            usersRef.update({
                status: 'online'
            });
            return 0;
        }
    },
    {
        name:'offline',
        func:function(raw){
            usersRef.update({
                status:'offline'
            });
            return 0;
        }
    },
    {
        name:'balance',
        func:function(raw){
            load();
            nicoText(`now: ${userData.euro}$`)
            return 0;
        }
    },
    {
        name:'nico',
        func:function(raw){
            nicoText(raw);
            return 0;
        }
    },
    {
        name:'rename',
        func:function(raw){
            nickname = raw;
            return 0;
        }
    },
    {
        name:'nanj',
        func:function(raw){
            AnonymousName = raw;
            return 0;
        }
    },
    {
        name:'ban',
        func:function(raw){
            database.ref(`users/${raw}`).update({
                banned:1
            })
            nicoText('Nice Job!')
            return 0;
        }
    },
    {
        name:'unban',
        func:function(raw){
            database.ref(`users/${raw}`).update({
                banned:0
            })
            nicoText('Good Job!')
            return 0;
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