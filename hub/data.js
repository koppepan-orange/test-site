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

const Fonts = [
    {src:'comicsans', type:'ttf'},
    {src:'papyrus', type:'ttf'},
    {src:'hangyaku', type:'ttf'},
    {src:'cube12', type:'ttf'},
    {src:'genjuu', type:'ttf'},
    {src:'kaimetsu', type:'otf'},
    {src:'hackgen', type:'ttf'},
    {src:'wingdings', type:'ttf'},
    {src:'wingdings2', type:'ttf'},
    {src:'wingdings3', type:'ttf'},
    {src:'kurundeco', type:'otf'},
    {src:'starrysky', type:'otf'},
    {src:'kurobara', type:'ttf'},
    {src:'marukoius', type:'ttf'},
    {src:'novamono', type:'ttf'},
    {src:'pricedown', type:'ttf'},
    {src:'corporate', type:'otf'},
];

const Images = {
    systems:['error'],
}

const Sounds = {
    // se:['error'],
    // bgm:[],
}

const Spaces = [
    { name:'home', rank:2, back:'#f0f8ff', sho:1 },
];

