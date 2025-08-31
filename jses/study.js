//#region document
//#endregion
//#region DOM
//#endregion
//#region login
function studyLogin(){
    console.log('study「こちらstudy、ログインを確認した」')
}
//#endregion
//#region en
document.querySelector('#en #post-make-button').addEventListener('click', () => {
    document.querySelector('#en #post-area').style.right = '0px';
});
document.querySelector('#en #post-cancel').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#en #post-area').style.right = 'calc(-90% - 24px)';
    document.querySelector('#en #post-en textarea').value = '';
    document.querySelector('#en #post-ja textarea').value = '';
    document.querySelector('#en #post-speech textarea').value = '';
    document.querySelector('#en #post-attribute textarea').value = '';
    document.querySelector('#en #post-description textarea').value = '';
})


//wordData←これを使え
let kari = {
    slang: false,
    sentence: true,
    attribute: "food fruit",
    description: "何よりも美味しい果物。\n異論は認めない。",
    sender: "koppepan_orange",
    speech: "名詞",
    ja: "りんご",
    en: "apple"
}

//#region 検索
document.querySelector('#en #search-area').addEventListener('keydown', async (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault(); // フォームのリロードを防ぐ

    let englishsearch = document.querySelector('#en #search-area').innerText.trim().toLowerCase();
    if (!englishsearch) return;

    let englishsRef = database.ref('kari/english');

    // Firebase からデータ取得
    let firebaseData = await englishsRef.orderByChild('en').startAt(englishsearch).endAt(englishsearch + "\uf8ff").once('value');
    let firebaseResults = firebaseData.exists() ? Object.values(firebaseData.val()) : [];

    // data.js の `wordData` を検索
    let localResults = wordData.filter(word => word.en.toLowerCase().startsWith(englishsearch));

    // Firebase + data.js のデータを結合
    let combinedResults = [...firebaseResults, ...localResults];

    let resultList = document.querySelector('#en #search-result');
    resultList.innerHTML = ''; // 検索結果をクリア
    resultList.style.display = 'block';

    if (combinedResults.length > 0) {
        combinedResults.forEach(user => {
            let listItem = document.createElement('div');
            listItem.className = 'search-result-item';
            let attribute = user.attribute ? `(${user.attribute})` : '';
            listItem.innerHTML = `
                <span class="search-result-en">${user.en}</span>   <span class="search-result-speech">[${user.speech}]</span><br>
                <span class="search-result-ja">${user.ja}</span>   <span class="search-result-attribute">${attribute}</span>
            `;
            if (user.description) {
                let descriptionEle = document.createElement('div');
                descriptionEle.className = 'search-result-description';
                descriptionEle.innerText = user.description;
                listItem.appendChild(descriptionEle);
            }

            listItem.setAttribute('data-speech', user.speech);
            listItem.setAttribute('data-attribute', user.attribute);
            listItem.setAttribute('data-slang', user.slang);
            listItem.setAttribute('data-sentence', user.sentence);

            resultList.appendChild(listItem);
        });

        updateNarrowOptions(combinedResults);
    } else {
        resultList.innerText = '該当なし';
    }
});


//#endregion

//#region 投稿
document.querySelector('#en #post-send').addEventListener('click', (event) => {
    event.preventDefault(); // フォームのリロードを防ぐ

    let en = document.querySelector('#en #post-en textarea').value.trim();
    let ja = document.querySelector('#en #post-ja textarea').value.trim();
    let speech = document.querySelector('#en #post-speech textarea').value.trim();
    let attribute = document.querySelector('#en #post-attribute textarea').value.trim();
    let description = document.querySelector('#en #post-description textarea').value.trim();
    let slang = document.querySelector('#en #post-slang').checked;
    let sentence = document.querySelector('#en #post-sentence').checked;


    if(!en || !ja || !speech || !attribute || !description){
        nicoText('要素が足りません');
        return;
    };

    let englishsRef = database.ref('kari/english');

    englishsRef.orderByChild('en').equalTo(en).once('value', snapshot => {
        if(!snapshot.exists()){
            englishsRef.push({
                en:en, //apple
                ja:ja, //りんご
                speech:speech, //名詞
                attribute:attribute, //food fruit
                sender:username, //koppepan_orange
                description:description, //何よりも美味しい果物
                sentence: sentence, //false
                slang: slang //false
            })
            document.querySelector('#en #post-cancel').click();
            nicoText('Nice Job!!');
            exp += 10;
            updateUI();
            save();
        }else{
            nicoText('その単語はすでに存在します');
            return;
        }
    })
});
//#endregion
//#region narrow
const searchNarrow = document.querySelector('#en #search-narrow');
const narrowApplyButton = document.querySelector('#en #narrow-apply');

let selectedAttributes = new Set();

let Narrows = {
    'slang':{
        name:'スラング',
        type:'built-in',
    },
    'sentence':{
        name:'文',
        type:'built-in',
    },

    'food':{
        name:'food',
        type:'attribute',
    },
    'fruit':{
        name:'fruit',
        type:'attribute',
    },
    'vegetable':{
        name:'vegetable',
        type:'attribute',
    },
    'song':{
        name:'song',
        type:'attribute',
    },
    'tomas':{
        name:'tomas',
        type:'attribute',
    },
    'koyuki':{
        name:'koyuki',
        type:'attribute',
    },
    'daily':{
        name:'daily',
        type:'attribute',
    },

    '名詞':{
        name:'名詞',
        type:'speech',
    },
    '形容詞':{
        name:'形容詞',
        type:'speech',
    },
    '動詞':{
        name:'動詞',
        type:'speech',
    },
    '副詞':{
        name:'副詞',
        type:'speech',
    },
    '助詞':{
        name:'助詞',
        type:'speech',
    },
    '助動詞':{
        name:'助動詞',
        type:'speech',
    },
    '接続詞':{
        name:'接続詞',
        type:'speech',
    },
}

// Narrow オプション生成
function updateNarrowOptions(results) {
    searchNarrow.style.display = 'flex';
    let uniqueAttributes = new Set();
    let uniqueSpeeches = new Set();

    //常設
    uniqueAttributes.add('slang');
    uniqueAttributes.add('sentence');

    results.forEach(entry => {
        let attribute = entry.attribute;
        if(attribute){
            attribute.split(' ').forEach(attr => uniqueAttributes.add(attr));
        }

        let speech = entry.speech;
        if(speech){
            speech.split(' ').forEach(attr => uniqueSpeeches.add(attr));
        }
    });

    let narrowOptionsContainer = document.querySelector('#en #narrow-options');
    narrowOptionsContainer.innerHTML = '';

    uniqueAttributes.forEach(attr => {
        let button = document.createElement('button');
        button.className = 'narrow-option';
        button.setAttribute('data-type', 'attribute');
        button.innerText = attr;
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
        narrowOptionsContainer.appendChild(button);
    });

    uniqueSpeeches.forEach(attr => {
        let button = document.createElement('button');
        button.className = 'narrow-option';
        button.setAttribute('data-type', 'speech');
        button.innerText = attr;
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
        narrowOptionsContainer.appendChild(button);
    });

    if(uniqueAttributes.size == 0){
        searchNarrow.style.display = 'none';
    }
}

// 絞り込み処理
document.querySelector('#en #narrow-apply').addEventListener('click', () => {
    let selectedAttributes = Array.from(document.querySelectorAll('#en .narrow-option.active')).map(btn => {
        let type = btn.getAttribute('data-type');
        let narrow = btn.innerText;
        let matomete = {
            type: type,
            narrow: narrow
        }
        return matomete;
    });

    let allResults = document.querySelectorAll('#en .search-result-item');

    allResults.forEach(item => {
        item.style.display = 'block';
    });

    if(selectedAttributes.length === 0){
        return;
    }

    //console.log('selectedAttributes:', selectedAttributes);
    //console.log(allResults);

    selectedAttributes.forEach(iroiro => {
        let type = iroiro.type;
        let narrow = iroiro.narrow;

        allResults.forEach(item => {
            let hasattribute = item.getAttribute('data-attribute');
            let hasspeech = item.getAttribute('data-speech');
            let slang = item.getAttribute('data-slang');
            let sentence = item.getAttribute('data-sentence');
            
            /**
            console.log(`
                narrow:${narrow}
                type:${type}
                hasattribute:${hasattribute}
                hasspeech:${hasspeech}
                slang:${slang}
                sentence:${sentence}
            `);
            */

            if(type == 'attribute'){
                if(!hasattribute.includes(narrow)){
                    item.style.display = 'none';
                }
            }else if(type == 'speech'){
                if(!hasspeech.includes(narrow)){
                    item.style.display = 'none';
                }
            }else if(narrow == 'slang' && slang == "false"){
                item.style.display = 'none';
            }else if(narrow == 'sentence' && sentence == "false"){
                item.style.display = 'none';
            }
        });
    });
});
//#endregion
//#endregion


//#endregion
//#region tips

//#endregion
