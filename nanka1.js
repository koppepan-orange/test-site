function showOutput() {
    const input = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // 前の出力をクリアする
  
    let redirectUrl;
    if (input.includes('yabaikoppepandesu')) {
      redirectUrl = 'https://true-koppepan-orange.github.io/test_site_yabai/';
    } else if(input.includes('yamiyamikoppepandesu')){
      redirectUrl = 'https://true-koppepan-orange.github.io/test_site_yamiyami/';
    } else if(input.includes('gakkoudaisuki')) {
      redirectUrl = 'https://true-koppepan-orange.github.io/test_site_meibo/';
    }　else if(input.includes('ge-mugasitaidesu')) {
      redirectUrl = 'https://true-koppepan-orange.github.io/test_site_game/';
    }　else if(input.includes('hongayomitaidesu')) {
      redirectUrl = 'https://true-koppepan-orange.github.io/test_site_book/';
    }　else if(input.includes('override')) {
      redirectUrl = 'https://koppepan-orange.github.io/test_site/over_ride.html';
    }　else {
      'パスワードが違います。';
    }
  
    const link = document.createElement('a');
    link.href = redirectUrl;
    link.textContent = 'success!';
    link.target = '_blank'; // 新しいタブで開く
    outputDiv.appendChild(link);
  }
