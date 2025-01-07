//#region sidemenu
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
menuToggle.addEventListener('click', () => {
    if(sideMenu.style.left === '0px'){
        sideMenu.style.left = '-250px';
    }else{
        sideMenu.style.left = '0px';
    }
});

//#endregion
//#region hasd
document.addEventListener('mousemove', (e) => {
    const HasDescription = document.getElementById('description');
    HasDescription.style.left = `${e.clientX + 10}px`;
    HasDescription.style.top = `${e.clientY + 10}px`;
});

document.addEventListener('mouseover', (e) => {
    if(e.target.classList.contains('hasd')){
        const description = e.target.dataset.description;
        document.getElementById('description').innerHTML = description;
        document.getElementById('description').style.display = 'block';
    }
});

document.addEventListener('mouseout', (e) => {
    if(e.target.classList.contains('hasd')){
        document.getElementById('description').innerHTML = '';
        document.getElementById('description').style.display = 'none';
    }
});

//#endregion
//#region haspopup
const popup = document.getElementById('mpopup');
document.querySelectorAll('.mpopup').forEach(element => {
    element.addEventListener('mouseover', () => {
        const description = apperUIs[element.id]?.haspopup??'none';
        popup.innerHTML = description;
        popup.style.display = 'block';
    });
    element.addEventListener('mouseout', () => {
        popup.innerHTML = '';
        popup.style.display = 'none';
    });
});

const cpopup = document.getElementById('cpopup');
let cpopupNow = 0;
document.querySelectorAll('.cpopup').forEach(element => {
    element.addEventListener('click', () => {
        if(cpopupNow == 0){
            const description = apperUIs[element.id]?.cpopup??'none';
            cpopup.innerHTML = description;
            cpopup.style.display = 'block';
            cpopupNow = 1;
        }else{
            cpopup.innerHTML = '';
            cpopup.style.display = 'none';
            cpopupNow = 0;
        }
    });
})
//#endregion
//#region hastxt

//const cpopup = document.getElementById('cpopup');
//let cpopupNow = 0;
document.querySelectorAll('.hastxt').forEach((element) => {
    addEventListener('click', (event) => {
        element.addEventListener('click', (event) => {
            if(cpopupNow == 0){
                let name = event.target.getAttribute('data-name');
                console.log(name+'が発動しましたぜぇい')
                fetch(`assets/txts/${name}.txt`)
                .then(response => response.text())
                .then(data => {cpopup.innerText = data;})
                .catch(error => console.error('Error:', error));
                cpopup.style.display = 'block';
                cpopupNow = 1;
            }else{
                cpopup.innerHTML = '';
                cpopup.style.display = 'none';
                cpopupNow = 0;
            }
        })
    })
})
//#endregion
