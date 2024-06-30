function showOutput() {
    const input = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // 前の出力をクリアする
  
    let redirectUrl;
    if(input.includes('gakkoudaisuki')) {
      redirectUrl = 'https://true-koppepan-orange.github.io/sub_test_site/meibo_site';
    } else if(input.includes('gamegasitaidesu')) {
      redirectUrl = 'https://koppepan-orange-game.github.io/game_daisuki/welcome_page.html';
    } else {
      'パスワードが違います。';
    }
  
    const link = document.createElement('a');
    link.href = redirectUrl;
    link.textContent = 'success!';
    link.target = '_blank'; // 新しいタブで開く
    outputDiv.appendChild(link);
}
