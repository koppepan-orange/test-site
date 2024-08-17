let count = 0;
let startTime;
let duration = 5000;
document.getElementById('start-btn').addEventListener('click', () => {
    count = 0;
    startTime = Date.now();
    document.getElementById('result').textContent = 'pless Enter(nandomo)';
    document.getElementById('start-btn').style.display = 'none';
    document.addEventListener('keyup', countRensha);
    setTimeout(() => {
        document.removeEventListener('keyup', countRensha);
        document.getElementById('result').textContent = `結果: ${count} 回`;
        document.getElementById('start-btn').style.display = 'block';
    }, duration);
});
function countRensha(event) {if (event.key === 'Enter') {count++;}}
function RENDAchange(time) {
    document.getElementById(`RENDABUTTON${duration}`).style.color = '#000000';
    document.getElementById(`RENDABUTTON${time}`).style.color = '#23aa23';
    duration = time;
}
