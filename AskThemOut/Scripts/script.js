const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const heartsContainer = document.getElementById('hearts');
let yesBtnSize = 1;

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heartsContainer.appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 80);
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}


const name = getQueryParam('name');


if (name) {
    document.getElementById('namePlaceholder').textContent = name;
} else {
  
    document.getElementById('namePlaceholder').textContent = 'Cutie';
}


noBtn.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;
    
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    
    const yesRect = yesBtn.getBoundingClientRect();
    if (randomY < yesRect.bottom && 
        randomX < yesRect.right && 
        randomX + noBtn.offsetWidth > yesRect.left) {
        randomY = yesRect.bottom + 10;
    }
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    yesBtnSize *= 1.5;
    yesBtn.style.transform = `scale(${yesBtnSize})`;

    createGif();
    createGif();
    createGif();
});

yesBtn.addEventListener('click', () => {
    const celebrationContainer = document.getElementById('celebrationContainer');
    celebrationContainer.style.display = 'flex';

    const audio = document.getElementById('background-music');
    audio.muted = false;  
    audio.play();         
   
    for (let i = 0; i < 40; i++) {
        createHeart();
    }

    triggerConfetti();

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

function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    myConfetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        myConfetti.reset();
    }, 5000);
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.innerHTML = `
        <div class="balloon-string"></div>
        <div class="balloon-heart">❤️</div>
    `;
    balloon.style.left = Math.random() * 100 + 'vw';
    document.body.appendChild(balloon);
    
    setTimeout(() => balloon.remove(), 10000);
}

function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.innerHTML = '⭐';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    document.body.appendChild(star);
    
    setTimeout(() => {
        star.style.opacity = '0';
        setTimeout(() => star.remove(), 1000);
    }, 2000);
}

yesBtn.addEventListener('mouseover', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'mini-heart';
            heart.innerHTML = '💖';
            heart.style.left = (yesBtn.offsetLeft + Math.random() * yesBtn.offsetWidth) + 'px';
            heart.style.top = (yesBtn.offsetTop + Math.random() * yesBtn.offsetHeight) + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 1000);
        }, i * 100);
    }
});

const loveMeter = document.createElement('div');
loveMeter.className = 'love-meter';
loveMeter.innerHTML = `
    <div class="meter-fill"></div>
    <div class="meter-text">Love Level</div>
    <div class="love-message"></div>
`;
document.body.appendChild(loveMeter);

const loveMessages = [
    { threshold: 20, message: "Come closer! 🥺", color: "#FF69B4" },
    { threshold: 40, message: "Getting warmer! 💝", color: "#FF1493" },
    { threshold: 60, message: "You're making my heart flutter! 💓", color: "#C71585" },
    { threshold: 80, message: "So close to love! 💘", color: "#FF0066" },
    { threshold: 100, message: "You know you want to! 💖", color: "#FF0000" }
];

document.addEventListener('mousemove', (e) => {
    const yesBtnRect = yesBtn.getBoundingClientRect();

    const isInsideButton =
        e.clientX >= yesBtnRect.left &&
        e.clientX <= yesBtnRect.right &&
        e.clientY >= yesBtnRect.top &&
        e.clientY <= yesBtnRect.bottom;

    let loveLevel;

    if (isInsideButton) {
        loveLevel = 100;
    } else {
        const distanceToLeftEdge = Math.abs(e.clientX - yesBtnRect.left);
        const distanceToRightEdge = Math.abs(e.clientX - yesBtnRect.right);
        const distanceToTopEdge = Math.abs(e.clientY - yesBtnRect.top);
        const distanceToBottomEdge = Math.abs(e.clientY - yesBtnRect.bottom);

        const minDistanceX = Math.min(distanceToLeftEdge, distanceToRightEdge);
        const minDistanceY = Math.min(distanceToTopEdge, distanceToBottomEdge);
        const distanceToButton = Math.hypot(minDistanceX, minDistanceY);

        const maxDistance = Math.min(
            Math.hypot(window.innerWidth, window.innerHeight) / 2,
            300
        );

        loveLevel = 100 - (Math.min(distanceToButton, maxDistance) / maxDistance * 100);

        if (distanceToButton < 50) {
            const proximityBonus = (50 - distanceToButton) / 2;
            loveLevel = Math.min(100, loveLevel + proximityBonus);
        }
    }

    loveLevel = Math.max(0, Math.min(100, loveLevel));

    document.querySelector('.meter-fill').style.width = `${loveLevel}%`;

    const messageElement = document.querySelector('.love-message');
    for (let i = loveMessages.length - 1; i >= 0; i--) {
        if (loveLevel >= loveMessages[i].threshold) {
            messageElement.textContent = loveMessages[i].message;
            messageElement.style.color = loveMessages[i].color;
            break;
        }
    }
});

setInterval(createBalloon, 2000);
setInterval(createStar, 1000);