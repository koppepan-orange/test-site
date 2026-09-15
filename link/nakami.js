// #region main
let mainD = document.getElementById('main');
let mainC = {
    spa: null,
    
    mvlsD: document.getElementById('movlis'),
     mvlsLD: document.querySelector('#movlis .list'),
    mvlsi: 0
}
let mainF = {};
mainF.move = (to) => {
    if(mainC.spa == to) return console.log('どういうわけか もう そこにいる');
	if(!to) return console.error(`せんぱ〜い？${to}ってどこですか〜？笑`);
	
	for(let a of Spaces) document.getElementById(a.name).classList.remove('show');
    document.getElementById(to).classList.add('show');
    mainC.spa = to;

    history.replaceState(null, "", `?${to}`);
}

mainF.load = () => {
    for(let spa of Spaces){
        let div = document.getElementById(spa.name);
        if(!div) continue;

        div.style.zIndex = spa.rank;
        div.style.background = spa.back;
    }
}

//#region movlis
for(let n of Spaces){
    let li = document.createElement('div');
    li.textContent = n.name;
    li.className = 'item';

    li.addEventListener('click', () => mainF.move(n.name));

    mainC.mvlsLD.appendChild(li);
}
document.addEventListener('keydown', (e) => {
    if(e.key != 'm' || mainC.mvlsi) return;
    mainC.mvlsD.style.left = `${OBS.mx - mainC.mvlsD.offsetWidth/2}px`;
    mainC.mvlsD.style.top = `${OBS.my}px`;
    mainC.mvlsD.classList.add('tog');
    mainC.mvlsi = 1;
})
document.addEventListener('keyup',e => {
    if(e.key != 'm') return;
    mainC.mvlsD.classList.remove('tog');
    mainC.mvlsi = 0;
})
//#endregion

//#endregion main

function findGeneric(list, type, name, extraCheck = null){
    let data;
    if(extraCheck) data = extraCheck(list, name);
     else data = list.find(a => a.name == name || a.jpnm == name);
    if(data) return data;
    
    console.log(`[find] ${type}で、「${name}」っていうものはないらしいです`);
    return 0;
}
// const findKaris = (name) => findGeneric(Karis, "Karis", name);

// #region over
let oveD = document.getElementById("over");
let oveC = {
    Ds:{
        list:oveD.querySelector(".list"),
    }

}
let oveF = {};

oveF.load = () => {
    let listD = oveC.Ds["list"];
    for(let spa of Spaces){
        let div = El("div", `bt ${spa.name}`);
         div.textContent = spa.name;
        //  div.style.background = spa.back;
         div.style.background = Style.ki["back"];
        div.addEventListener("click", () => {
            mainF.move(spa.name);
        });
        listD.appendChild(div);
    }
}
// #endregion

// #region link
let linD = document.getElementById("link");
let linC = {
    Ds:{
        main:linD.querySelector(".main"),
        upp:linD.querySelector(".upper"),
    },

    theme: 0,
    themes:[
        { "back": "#7ab3f0", "bor": "#1f79b9", "aima": "#4d96d5" },
        { "back": "#b2b2b2", "bor": "#2b2b2b", "aima": "#6f6f6f" },
    ]
}
let linF = {};

linF.load = (code = 0) => {
    let main = linC.Ds["main"];
     main.innerHTML = "";
    for(let link of Links){
        if(link.no) continue;
        let mode = Style.link["mode"];

        let url;
         if(link.url.startsWith("https")) url = new URL(link.url).hostname;
        let img = El("img", link.name); //El(type, className, children): ヘルパー関数。つまりはcreateElement
        if(url) img.src = `https://www.google.com/s2/favicons?domain=${url}&sz=32`
        else img.src = "../icon.ico";
		 img.onerror = () => img.src = "assets/systems/error.png";

        let label = El("div", "label");
        label.textContent = link.name;

        let div = El("div", "item", [img, label]);
		div.addEventListener("pointerover", () => {
			main.querySelectorAll(".item").forEach(d => d.classList.remove("focus"));
			div.classList.add("focus");
		});
        div.addEventListener("click", () => {
            if(link.tag.length && link.tag.includes("自社")) window.open(link.url, "_self");
            else window.open(link.url, "_blank");
        });

        if(mode == 2){
            let tags = El("div", "tags", link.tag.map(a => {
                let t = El("div", "tag");
                t.textContent = `#${a}`;
                return t;
            }));
            div.appendChild(tags);
        }

        main.appendChild(div);

        let ipw = +Style.iPhone["width"].slice(0, -2);
        let wid = (ipw*0.9-25*(mode-1)) / mode;
        let siz = (wid)/ link.name.length;
         label.style.fontSize = `${Math.min(siz, 12)}px`;
    }

    if(!code) return;

    // let flips = ["theme", "mood"]
    let ds = linC.Ds["upp"].querySelectorAll(".flip");
    for(let d of ds){
        d.addEventListener("click", () => {
            d.classList.toggle("tog");

            if(d.classList.contains("mood")) linF.modeChange();
            if(d.classList.contains("theme")) linF.themeChange();
        })
    }

}
linF.modeChange = (code = 0) => {
    let next = fl(Style.link["mode"], [2, 3]);
     if(code) next = code;
    Style.link["mode"] = next;
    Style.tekiou();

    linF.load();
}
linF.themeChange = (code = -1) => {
    let arr = linC.themes;
    let next = linC.theme + 1;
     if(0 <= code) next = code;
     if(arr.length-1 < next) next = 0;
    
    linC.theme = next;
    Style["ki"] = arr[next];
    Style.tekiou();
}
// #endregion

//#region start
function start(){
    Style.tekiou();
    OBS.load();

    mainF.load();
    oveF.load();
    linF.load(1);

    let hash = location.hash.replace("?", "");
    let space = Spaces.find(a => a.name == hash);
    if(!space) space = Spaces.find(a => a.sho);
    mainF.move(space.name);
}
//#endregion

//#region DOM
let LoadOfWait = async() => await loaF.load();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", init);
}
else init();

async function init() {
    await LoadOfWait();
}
//#endregion

