const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const heartsContainer = document.getElementById('hearts');
let yesBtnSize = 1;

// Create floating hearts background
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 300);

noBtn.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    
    // Ensure No button is below Yes button
    const yesRect = yesBtn.getBoundingClientRect();
    if (randomY < yesRect.bottom && 
        randomX < yesRect.right && 
        randomX + noBtn.offsetWidth > yesRect.left) {
        randomY = yesRect.bottom + 10;
    }
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    yesBtnSize *= 1.1;
    yesBtn.style.transform = `scale(${yesBtnSize})`;

createGif();
createGif();
createGif();

});

yesBtn.addEventListener('click', () => {
    const celebrationContainer = document.getElementById('celebrationContainer');
    celebrationContainer.style.display = 'flex';
    
    for(let i = 0; i < 40; i++) {
        createHeart();
    }
});


function createGif() {
    const pleaseGif = document.createElement('img');
    pleaseGif.src = 'Assets/cat-begging.gif';
    pleaseGif.alt = 'Please';
    pleaseGif.className = 'please-gif';
    
    const randomGifX = Math.random() * (window.innerWidth - 100);
    const randomGifY = Math.random() * (window.innerHeight - 100);
    
    pleaseGif.style.position = 'absolute'; 
    pleaseGif.style.left = randomGifX + 'px';
    pleaseGif.style.top = randomGifY + 'px';
    
    document.body.appendChild(pleaseGif);
}



