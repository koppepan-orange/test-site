(function(global) {
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function copy(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(copy);
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = copy(obj[key]);
            }
        }
        return result;
    }

    function arraySelect(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function arrayShuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    document.addEventListener('mousemove', (e) => {
        const HasDescription = document.getElementById('movabledescription');
        if (HasDescription) {
            HasDescription.style.left = `${e.clientX + 10}px`;
            HasDescription.style.top = `${e.clientY + 10}px`;
        }
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('hasd')) {
            const movabledescription = e.target.dataset.description;
            const descElement = document.getElementById('movabledescription');
            if (descElement) {
                descElement.innerHTML = movabledescription;
                descElement.style.display = 'block';
            }
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.classList.contains('hasd')) {
            const descElement = document.getElementById('movabledescription');
            if (descElement) {
                descElement.innerHTML = '';
                descElement.style.display = 'none';
            }
        }
    });

    async function NicoNicoText(mes) {
        const newDiv = document.createElement('div');
        newDiv.textContent = mes;
        newDiv.style = `
            position: absolute;
            top: ${Math.random() * 100}vh;
            right: 0;
            background-color: rgba(228, 249, 255, 0.563);
            color: #000000;
            font-size: 20px;
        `;
        document.body.appendChild(newDiv);
        let speed = 10;
        for (let i = 0; window.innerWidth > i * speed; i++) {
            let val = i * speed;
            newDiv.style.right = `${val}px`;
            await delay(50);
        }
        newDiv.remove();
    }

    global.MyLibrary = { delay, copy, arraySelect, arrayShuffle, NicoNicoText };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = global.MyLibrary;
    }
})(this);