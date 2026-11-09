const toggleSwitch = document.querySelector('#checkbox');
const logo = document.getElementById('dynamicLogo');
const stickyNotesProject = document.getElementById('stickyNotesProject');
const timerBanner = document.getElementById('timerBanner');
const timerText = document.getElementById('timerText');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }    
}

const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleSwitch.checked = false;
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitch.checked = true;
}

toggleSwitch.addEventListener('change', switchTheme);

function updateLogoColor() {
    const hour = new Date().getHours();
    if (logo) {
        logo.style.color = (hour >= 20 || hour < 6) ? '#cccccc' : '#ffffff';
    }
}

const DURATION_24H = 24 * 60 * 60 * 1000;
let endTime = localStorage.getItem('stickyNotesEndTime');

if (!endTime) {
    endTime = Date.now() + DURATION_24H;
    localStorage.setItem('stickyNotesEndTime', endTime);
} else {
    endTime = parseInt(endTime, 10);
}

function updateTimer() {
    const now = Date.now();
    const distance = endTime - now;

    if (distance <= 0) {
        stickyNotesProject.style.display = 'block';
        timerBanner.classList.add('released');
        timerText.textContent = "Wydano: Sticky Notes! (Kliknij tutaj, aby otworzyć)";
        timerBanner.style.cursor = 'pointer';
        timerBanner.onclick = () => {
            window.open('https://monykpl.github.io/Sticky-Notes/', '_blank');
        };
    } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerText.textContent = `Wkrótce (Sticky Notes): ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

function triggerConfetti() {
    const colors = ['#00f2ea', '#ef4444', '#eab308', '#22c55e', '#ffffff'];
    const particleCount = 50;

    function createParticle(x, y) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.width = '8px';
        el.style.height = '8px';
        el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        el.style.borderRadius = '50%';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '99999';
        document.body.appendChild(el);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed - 2;
        let opacity = 1;

        const anim = setInterval(() => {
            const currentLeft = parseFloat(el.style.left);
            const currentTop = parseFloat(el.style.top);
            el.style.left = (currentLeft + vx) + 'px';
            el.style.top = (currentTop + vy) + 'px';
            vy += 0.2;
            opacity -= 0.02;
            el.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(anim);
                el.remove();
            }
        }, 20);
    }

    for (let i = 0; i < particleCount; i++) {
        createParticle(20, 20);
        createParticle(window.innerWidth - 20, 20);
    }
}

document.querySelectorAll('.sticky-trigger').forEach(el => {
    el.addEventListener('click', () => {
        triggerConfetti();
    });
});

updateLogoColor();
updateTimer();

setInterval(updateLogoColor, 60000);
setInterval(updateTimer, 1000);
