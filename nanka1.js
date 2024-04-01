function showOutput() {
    // 入力フォームの値を取得
    const input = document.getElementById('inputText').value;
  
    // 入力値に応じた処理
    let output;
    if (input.includes('koppepandesu')) {
      output = 'success!';
    } else if (input.includes('Gmailmal888')) {
      output = 'a';
    } else {
    output = 'パスワードが違います。';
    }
  
    // 結果を表示
    document.getElementById('output').textContent = output;
  }