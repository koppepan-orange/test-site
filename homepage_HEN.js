let HENpoint = 0;
let HENave = 0;
let HENx = 0;
let HENy = 0;
let HENanswer = 0;
function  HENsum(){
  HENpoint = document.getElementById("HENPoint").value;
  HENave = document.getElementById("HENAve").value;
  HENx = HENpoint - HENave;
  HENy = HENx / 18 * 10; //18の部分は変更可能。得点分布だから一点集中なら1とかなんじゃないかな
  HENanswer = Math.floor(HENy + 50);
  document.getElementById("HENAnswer").textContent = '偏差値は' + HENanswer + 'です';
}
