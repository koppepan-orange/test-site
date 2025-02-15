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
    word: true,
    attribute: "food fruit",
    description: "何よりも美味しい果物。\n異論は認めない。",
    sender: "koppepan_orange",
    speech: "名詞",
    ja: "りんご",
    en: "apple"
}

//#region 検索
document.querySelector('#search-area').addEventListener('keydown', async (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault(); // フォームのリロードを防ぐ

    let englishsearch = document.querySelector('#search-area').innerText.trim().toLowerCase();
    if (!englishsearch) return;

    let englishsRef = database.ref('english');

    // Firebase からデータ取得
    let firebaseData = await englishsRef.orderByChild('en').startAt(englishsearch).endAt(englishsearch + "\uf8ff").once('value');
    let firebaseResults = firebaseData.exists() ? Object.values(firebaseData.val()) : [];

    // data.js の `wordData` を検索
    let localResults = wordData.filter(word => word.en.toLowerCase().startsWith(englishsearch));

    // Firebase + data.js のデータを結合
    let combinedResults = [...firebaseResults, ...localResults];

    let resultList = document.querySelector('#search-result');
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

            resultList.appendChild(listItem);
        });
    } else {
        resultList.innerText = '該当なし';
    }
});


//#endregion

//#region 投稿
document.querySelector('#post-send').addEventListener('click', (event) => {
    event.preventDefault(); // フォームのリロードを防ぐ

    let en = document.querySelector('#post-en textarea').value.trim();
    let ja = document.querySelector('#post-ja textarea').value.trim();
    let speech = document.querySelector('#post-speech textarea').value.trim();
    let attribute = document.querySelector('#post-attribute textarea').value.trim();
    let description = document.querySelector('#post-description textarea').value.trim();
    let slang = document.querySelector('#post-slang').checked;
    let word = document.querySelector('#post-word').checked;


    if(!en || !ja || !speech || !attribute || !description){
        NicoNicoText('要素が足りません');
        return;
    };

    let englishsRef = database.ref('english');

    englishsRef.orderByChild('word').equalTo(word).once('value', snapshot => {
        if(!snapshot.exists()){
            englishsRef.push({
                en:en,
                ja:ja,
                speech:speech,
                attribute:attribute,
                sender:username,
                description:description,
                word: word,
                slang: slang
            })
            document.querySelector('#post-cancel').click();
            NicoNicoText('Nice Job!!');
            exp += 10;
            updateUI();
        }else{
            NicoNicoText('その単語はすでに存在します');
            return;
        }
    })
});


function forceAdd(word, trans, speech, sender, description){
    let englishsRef = database.ref('english');
    englishsRef.push({
        word:word,
        trans:trans,
        speech:speech,
        sender:sender,
        description:description
    })
}
//#endregion


//#endregion
