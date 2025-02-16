//#region document
//#booksdregion
//#region DOM
//#booksdregion
//#region login
function pixelenLogin(){
    console.log('pixelen「ん、ログイン完了」')
}
//#booksdregion
//#region books
document.querySelector('#books #post-make-button').addEventListener('click', () => {
    document.querySelector('#books #post-area').style.right = '0px';
});
document.querySelector('#books #post-cancel').addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#books #post-area').style.right = 'calc(-90% - 24px)';
    document.querySelector('#books #post-books textarea').value = '';
    document.querySelector('#books #post-ja textarea').value = '';
    document.querySelector('#books #post-speech textarea').value = '';
    document.querySelector('#books #post-attribute textarea').value = '';
    document.querySelector('#books #post-description textarea').value = '';
})


//#region 検索
document.querySelector('#books #search-area').addEventListener('keydown', async (event) => {
    if (event.key !== 'Enter') return;
    event.preventDefault(); // フォームのリロードを防ぐ

    let booksearch = document.querySelector('#books #search-area').innerText.trim().toLowerCase();
    if (!booksearch) return;

    let booksRef = database.ref('kari/books');

    // Firebase からデータ取得
    let firebaseData = await booksRef.orderByChild('books').startAt(booksearch).endAt(booksearch + "\uf8ff").once('value');
    let firebaseResults = firebaseData.exists() ? Object.values(firebaseData.val()) : [];

    // data.js の `bookData` を検索
    let localResults = bookData.filter(word => word.title.toLowerCase().startsWith(booksearch));

    // Firebase + data.js のデータを結合
    let combinedResults = [...firebaseResults, ...localResults];

    let resultList = document.querySelector('#books #search-result');
    resultList.innerHTML = ''; // 検索結果をクリア
    resultList.style.display = 'block';

    if (combinedResults.length > 0) {
        combinedResults.forEach(user => {
            let listItem = document.createElement('div');
            listItem.className = 'search-result-item';
            let attribute = user.attribute ? `(${user.attribute})` : '';
            listItem.innerHTML = `
                <span class="search-result-title">${user.title}</span> <span class="search-result-attribute">(${attribute})</span><br>
                <span class="search-result-body">${user.description}</span>
            `;

            listItem.setAttribute('data-attribute', user.attribute);
            listItem.setAttribute('data-usedAI', user.usedAI);
            listItem.setAttribute('data-yokunai', user.yokunai);

            resultList.appendChild(listItem);
        });

        updateNarrowOptionsBooks(combinedResults);
    } else {
        resultList.innerText = '該当なし';
    }
});


//#booksdregion

//#region 投稿
document.querySelector('#books #post-send').addEventListener('click', (event) => {
    event.preventDefault();

    let title = document.querySelector('#books #post-title textarea').value.trim();
    let body = document.querySelector('#books #post-body textarea').value.trim();
    let usedAI = document.querySelector('#books #post-usedAI').checked;
    let yokunai = document.querySelector('#books #post-yokunai').checked; //よくない の方ね


    if(!title || !body || !usedAI || !yokunai){
        NicoNicoText('要素が足りません');
        return;
    };

    let bookRef = database.ref('kari/books');

    bookRef.orderByChild('title').equalTo(title).once('value', snapshot => {
        if(!snapshot.exists()){
            bookRef.push({
                title:title,
                body:body,
                sender:username
            })
            document.querySelector('#books #post-cancel').click();
            NicoNicoText('Good book!!');
            exp += 20;
            updateUI();
        }else{
            NicoNicoText('そのタイトルはすでに使用されています');
            return;
        }
    })
});
//#booksdregion

//#region narrow
const searchNarrowbook = document.querySelector('#books #search-narrow');
const narrowApplyButtonbook = document.querySelector('#books #narrow-apply');


function extractAttributes() {
    let uniqueAttributes = new Set();
    booksData.forEach(book => {
        if(book.attribute){
            book.attribute.forEach(genre => uniqueAttributes.add(genre));
        }
    });
    return Array.from(uniqueAttributes);
}

// Narrow オプション生成
function updateNarrowOptionsBooks(results) {
    searchNarrowbook.style.display = 'flex';
    let uniqueAttributes = new Set();

    //常設
    uniqueAttributes.add('usedAI');
    uniqueAttributes.add('yokunai');

    results.forEach(entry => {
        let attribute = entry.attribute;
        if(attribute){
            attribute.split(' ').forEach(attr => uniqueAttributes.add(attr));
        }
    });

    let narrowOptionsContainer = document.querySelector('#books #narrow-options');
    narrowOptionsContainer.innerHTML = '';

    uniqueAttributes.forEach(attr => {
        let button = document.createElement('button');
        button.className = 'narrow-option';
        button.innerText = attr;
        button.addEventListener('click', () => {
            button.classList.toggle('active');
        });
        narrowOptionsContainer.appendChild(button);
    });


    if(uniqueAttributes.size == 0){
        searchNarrowbook.style.display = 'none';
    }
}

// 絞り込み処理
document.querySelector('#books #narrow-apply').addEventListener('click', () => {
    let selectedAttributes = Array.from(document.querySelectorAll('#books .narrow-option.active')).map(btn => btn.innerText);

    let allResults = document.querySelectorAll('#books .search-result-item');

    if(selectedAttributes.length === 0){
        allResults.forEach(item => {
            item.style.display = 'block';
        });
        return;
    }

    allResults.forEach(item => {
        item.style.display = 'block';
    });

    selectedAttributes.forEach(narrow => {
        let type
        if(narrow == 'usedAI' || narrow == 'yokunai'){
            type = 'built-in';
        }else{
            type = 'attribute';
        }

        allResults.forEach(item => {
            let hasattribute = item.getAttribute('data-attribute');
            let usedAI = item.getAttribute('data-usedAI');
            let yokunai = item.getAttribute('data-yokunai');
            
            /**
            console.log(`
                narrow:${narrow}
                type:${type}
                hasattribute:${hasattribute}
                hasspeech:${hasspeech}
                usedAI:${usedAI}
                yokunai:${yokunai}
            `*/

            if(type == 'attribute'){
                if(!hasattribute.includes(narrow)){
                    item.style.display = 'none';
                }
            }else if(narrow == 'usedAI' && usedAI == "false"){
                item.style.display = 'none';
            }else if(narrow == 'yokunai' && yokunai == "false"){
                item.style.display = 'none';
            }
        });
    });
});
//#booksdregion



//#booksdregion
