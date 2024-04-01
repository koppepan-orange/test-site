function showOutput() {
    const input = document.getElementById('inputText').value;
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // 前の出力をクリアする
  
    let redirectUrl;
    if (input.includes('yabaikoppepandesu')) {
      redirectUrl = 'https://true-koppepan-orenge.github.io/test_site_yabai/';
    } else if(input.includes('yamiyamikoppepandesu')){
      redirectUrl = 'https://true-koppepan-orenge.github.io/test_site_yamiyami/';
    } else {
      'パスワードが違います。';
    }
  
    const link = document.createElement('a');
    link.href = redirectUrl;
    link.textContent = 'success!';
    link.target = '_blank'; // 新しいタブで開く
    outputDiv.appendChild(link);
  }
