# test_site
<html lang="en-US">
<!-- この下から、私のプログラム!!!がんばたよ！！！！ -->
  <head>
    <meta charset="UTF-8">
    <title>test_site</title>
  </head>
  <body bgcolor="#f9d793" link="#009D5B" vlink="#F68B1F">
         <h2><p align="center">Koppepan Orange's site</p></h2>
         <p align="center">ここは何でもあるサイト！！<i>ゆっくりしていってね！！</i></p>
<hr noshade="true" />
  <!-- この下、メニーサイトゾーンです!!単純ですが、めちゃ便利です！！！！ -->
        <p align="center">よく使うサイトたち
            <details><summary>memos</summary><a href="http://www.drpartners.jp/tools/browser-memocho.htm">ブラウザメモ帳</a>
            <br><a href="https://memo.onl.jp/?koppepan23">メモweb</a>
            <br><a href="https://file.onl.jp/?koppepan23">ファイルweb</a>
            <br><a href="https://write-box.appspot.com/">writebox</a></details>
            <br><details><summary>tools</summary><a href="https://anagram.httqs.com/">アナグラム生成機</a>
            <br><a href="https://jp.piliapp.com/random/wheel/">ルーレット等生成機</a>
            <br><a href="https://www.color-site.com/">カラーサイト</a>
            <br><a href="https://123apps.com/ja/">mp3、mp4編集サイト</a></details>
            <br><details><summary>makes</summary><a href="https://scratch.mit.edu/users/koppepan_orange/">scratch</a>
            <br><a href="https://flat.io/ja">flat</a>
            <br><a href="https://musescore.com/user/41107809">musescore</a>
            <br><a href="https://pixnote.net/">pixnote</a>
            <br><a href="https://www.pixilart.com/koppepanorange">pixlate</a>
            <br><a href="https://thirtydollar.website/">thirty dollar</a></details>
            <br><details><summary>studies</summary><a href="https://www.duolingo.com/profile/koppepan_orange">duolingo</a>
            <br><a href="http://typingx0.net/sushida/">寿司打</a>
            <br><a href="https://ankey.io/@koppepanorange">ankey</a></details>
            <br><details><summary>SNSes</summary><a href="https://www.reddit.com/user/koppepan_orange/">reddit</a>
            <br><a href="https://github.com/koppepan-orange">github</a>
            <br><a href="https://discord.com/channels/@me">discord</a>
            <br><a href="https://chat.onl.jp/?koppepan23">チャットweb</a>
            <br><a href="https://www.pixiv.net/users/93550041">pixiv</a>
            <br><a href="https://www.twitch.tv/koppepan_orange">twitch</a>
            <br><a href="https://www.instagram.com/koppepan_orange/">instagram</a>
            <br><a href="https://www.threads.net/@koppepan_orange">threads</a>
            <br><a href="https://twitter.com/koppepan_orange">twitter</a>
            <br><a href="https://www.youtube.com/channel/UCFvmwWDRrVqM22icC7QLx1w">youtube</a>
            <br><a href="https://lit.link/koppepanorange">lit.link</a>
            <br><a href="https://kiite.jp/user/koppapan_orange">kiite</a>
            <br><a href="https://draw.kuku.lu/pchat.php?hash=898857247">MagicalDraw</a></details>
            <br><details><summary>games</summary><a href="https://cybercodeonline.com">cybercodeonline</a>
            <br><a href="https://sdin.jp/browser/">browsergame</a>
            <br><a href="https://www.arealme.com/">ARealMe</a>
            <br><a href="https://unityroom.com/new_arrivals">unityroom</a></details></p>
  <!-- この下、メモです!!初期の私のがんばりです！！！！ -->
        <p align="center">メモ
            <form>
                <input type="text" size="30" />
                (1)
                <br />
                <textarea rows="12" cols="35"></textarea>
                <br /><br />
                <input type="text" size="30" />
                (2)
                <br />
                <textarea rows="10" cols="35"></textarea></form></p>
  <!-- この下、足つかないよゾーンです!!優しい友達に教えてもらいました！！！！神!!!! -->
         <p align="center">web-site-corps
            <details><summary>bing.com</summary><br><iframe width="100%" height="1000" src="https://www.bing.com/?cc=jp"></iframe></details>
            <details><summary>lit.link</summary><br><iframe width="100%" height="500" src="https://lit.link/koppepanorange"></iframe></details>
            <a href="">sentences</a>
        </p>
  <!-- この下、合言葉ゾーンです!!AIにちょっと頼りました...！！！！ -->
        <p align="center">合言葉<br>(404=合言葉が違う)
        <br><input type="text" id="inputText" placeholder="write here">
        <button onclick="showOutput()">送信</button>
        <p id="output"></p>
        <script src="nanka1.js"></script></p>
  <!-- この下、クリッカーです!!AIよりもコンパクトにできました！！！！ -->
      <p align="center">clicker
          <pre id="ClickerValue">0</pre>
            <button id="increment" onclick="clickerincrease()">+</button>
            <script>
              let count = 0
              function clickerincrease(){
              count += 1;
              document.getElementById('ClickerValue').textContent = count;
              }
            </script>
      </p>
      <details><summary>Game-Center</summary>
        <p align="center" class="blackjack">Count Game Desu
          <br><span id="COUNTGameBar"></span>
          <br><br><span id="COUNTButton"><button onclick="COUNTGameStart()">start</button></span>
          <br><br><span id="COUNTLog"></span>
          <script>
            let COUNTx = 0;
            let COUNTope = 0;
            let COUNTgamebar = 0;
            const COUNTgamebars = ['##@','####@','######@','########@','##########@','############@','##############@'];
            const COUNTTips = ['パン工場〜','だから愛だよ','ひとえに、愛だよ','うにょ〜ん','異議あり!','ウロボロスの弟、ウヌボロス','もろたで四輪工藤','小籠包と小論文のハーフ、ショウロンプォゥン','なんだかすごそう建武の新政'];
          function COUNTGameStart(){
            COUNTgamebar = COUNTgamebars[Math.floor(Math.random() * COUNTgamebars.length)];
            document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
            document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
            COUNTx = COUNTgamebar.length - 1;
            document.getElementById("COUNTLog").textContent = 'gamestart!今回は' + COUNTx + 'の長さです!!';
            COUNTope = 1;
          }
    async function COUNTMove1(){
            if(COUNTope == 1){
            COUNTope = 0;
            document.getElementById("COUNTButton").innerHTML = '';
            document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
            if (COUNTgamebar.length == 1){
            COUNTGameOver();
            COUNTope = 0;
            } else {
              COUNTgamebar = COUNTgamebar.slice( 1 );
              document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
              COUNTx -= 1;
              document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
              await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
              COUNTope = 1;
              document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
            }
            }
          }
    async function COUNTMove2(){
            if(COUNTope == 1){
            COUNTope = 0;
            document.getElementById("COUNTButton").innerHTML = '';
            if (COUNTgamebar.length == 1){
            COUNTope = 0;
            COUNTGameOver();
            } else {
            COUNTgamebar = COUNTgamebar.slice( 1 );
            document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
            COUNTx -= 1;
            document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
            await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
            if (COUNTgamebar.length == 1){
              COUNTope = 0;
              COUNTGameOver();
            } else {
              COUNTgamebar = COUNTgamebar.slice( 1 );
              document.getElementById("COUNTGameBar").textContent = COUNTgamebar;
              COUNTx -= 1;
              document.getElementById("COUNTLog").textContent = '1が取り除かれ,残りは' + COUNTx + '個になりました!';
              await new Promise(COUNTresolve => setTimeout(COUNTresolve, 300));
              COUNTope = 1;
              document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTMove1()">1</button>   <button onclick="COUNTMove2()">2</button>';
              }
            }
            }
          }
          function COUNTGameOver(){
            document.getElementById("COUNTLog").textContent = 'gameover!';
            document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTGameReset()">reset</button>';
            }
          function COUNTGameReset(){
            document.getElementById("COUNTGameBar").textContent = '';
            document.getElementById("COUNTLog").textContent = COUNTTips[Math.floor(Math.random() * COUNTTips.length)];
            document.getElementById("COUNTButton").innerHTML = '<button onclick="COUNTGameStart()">start</button>';
            COUNTx = 0;
            }
          </script>
        </p>
      </details>
