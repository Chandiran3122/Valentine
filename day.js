function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = `<i class="fas fa-heart" style="color: ${['#ff85a2', '#ffb7c5', '#e6e6fa'][Math.floor(Math.random() * 3)]}"></i>`;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 400);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Enable smooth scroll for the whole window
document.documentElement.style.scrollBehavior = 'smooth';

// Slideshow removed as it was replaced by a static grid in the merge.

const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
let musicPlaying = false;

function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.classList.replace('fa-pause', 'fa-music');
    } else {
        bgMusic.play().catch(() => { });
        musicIcon.classList.replace('fa-music', 'fa-pause');
    }
    musicPlaying = !musicPlaying;
}

// Auto-play music on first user interaction
let musicStarted = false;
function startMusicOnInteraction() {
    if (!musicStarted && !musicPlaying) {
        musicStarted = true;
        toggleMusic();
        // Remove event listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('scroll', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
    }
}

// Add event listeners for user interaction
document.addEventListener('click', startMusicOnInteraction);
document.addEventListener('scroll', startMusicOnInteraction);
document.addEventListener('keydown', startMusicOnInteraction);

// Also try to autoplay when page loads (may be blocked by browser)
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!musicPlaying) {
            bgMusic.play().then(() => {
                musicPlaying = true;
                musicIcon.classList.replace('fa-music', 'fa-pause');
                musicStarted = true;
            }).catch(() => {
                // Autoplay blocked, will wait for user interaction
                console.log('Autoplay blocked. Music will start on first interaction.');
            });
        }
    }, 500);
});

// UPDATED: Show Valentine overlay then scroll to Our Story section
function revealJourney() {
    const overlay = document.getElementById('valentineOverlay');
    const btn = document.getElementById('heroClickBtn');
    const target = document.getElementById('journey');

    createSparkles(btn);

    // Show the Valentine's Day overlay
    overlay.classList.add('show');
    createPetals(100);

    if (!musicPlaying) toggleMusic();

    // After 5 seconds, hide overlay and scroll to Our Story section
    setTimeout(() => {
        overlay.classList.remove('show');
        createPetals(20);

        // Scroll to Our Story section
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }, 5000); // Show overlay for 5 seconds
}

function openMail(el) { el.classList.toggle('open'); if (el.classList.contains('open')) createSparkles(el); }

function nextStage(stageNum) {
    for (let i = 0; i <= 5; i++) {
        const stage = document.getElementById(`stage-${i}`);
        if (stage) stage.classList.add('hidden');
    }
    const currentStage = document.getElementById(`stage-${stageNum}`);
    currentStage.classList.remove('hidden');
    createSparkles(currentStage);

    if (stageNum === 0) {
        document.getElementById('progressBar').style.width = '0%';
        document.getElementById('progressText').innerText = '0%';
    }

    if (stageNum === 1) startLoading();
    else if (stageNum === 2) startMessages();
}

function startLoading() {
    let progress = 0;
    const bar = document.getElementById('progressBar');
    const text = document.getElementById('progressText');
    const interval = setInterval(() => {
        progress += Math.random() * 2;
        if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(() => nextStage(2), 1000); }
        bar.style.width = progress + '%';
        text.innerText = Math.floor(progress) + '%';
    }, 50);
}

function startMessages() {
    const display = document.getElementById('messageDisplay');
    const messages = ["Checking my heart rate...", "It beats for you only. ❤️", "Checking my dreams...", "You are in every one of them. ✨", "One more thing..."];
    let i = 0;
    const interval = setInterval(() => {
        if (i < messages.length) { display.innerText = messages[i]; createSparkles(display); i++; }
        else { clearInterval(interval); nextStage(3); }
    }, 2500);
}

function moveNoBtn() {
    const btn = document.getElementById('noBtn');
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * (window.innerWidth - 150) + 'px';
    btn.style.top = Math.random() * (window.innerHeight - 150) + 'px';
    btn.innerText = "You can't click this! 😂";
}

function finalCelebration() { nextStage(4); createPetals(150); }

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.style.width = (Math.random() * 10 + 5) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.top = (rect.top + window.scrollY + rect.height / 2 + (Math.random() - 0.5) * 250) + 'px';
        sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 250) + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

function createPetals(count) {
    for (let i = 0; i < count; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.width = (Math.random() * 15 + 15) + 'px';
        petal.style.height = (Math.random() * 15 + 15) + 'px';
        petal.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 6000);
    }
}
