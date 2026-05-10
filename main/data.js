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


let Stamps = [
    {
        name:'1',
        type:'png',
    },
    {
        name:'2',
        type:'png',
    },
    {
        name:'3',
        type:'png',
    },
    {
        name:'4',
        type:'png',
    },
    {
        name:'5',
        type:'png',
    },
    {
        name:'6',
        type:'png',
    },
    {
        name:'7',
        type:'png',
    },
    {
        name:'8',
        type:'png',
    },
    {
        name:'hownice',
        type:'png',
    },
    {
        name:'koresuki',
        type:'png',
    },
    {
        name:'ohitashi',
        type:'png',
    },
    {
        name:'spacecat',
        type:'png',
    },
    {
        name:'youaresick',
        type:'png',
    },
    {
        name:'nasanao',
        type:'png',
    },
    {
        name:'4coma1',
        type:'png',
    },
    {
        name:'4coma2',
        type:'png',
    },
    {
        name:'maxwell1',
        type:'gif',
    },
    {
        name:'maxwell2',
        type:'gif',
    },
    {
        name:'hello',
        type:'png',
    },
    {
        name:'gdng',
        type:'png',
    }
]
