const toggleSwitch = document.querySelector("#checkbox");
const logo = document.getElementById("dynamicLogo");
const stickyWork = document.getElementById("stickyNotesWork");
const stickySelected = document.getElementById("stickyNotesSelected");
const releaseButton = document.getElementById("stickyReleaseButton");
const releaseLabel = document.getElementById("releaseLabel");
const releaseCountdown = document.getElementById("releaseCountdown");

const STICKY_NOTES_URL = "https://monykpl.github.io/Sticky-Notes/";
const STICKY_NOTES_RELEASE_AT = new Date("2026-11-10T11:34:13+01:00").getTime();

let stickyNotesReleased = false;
let confettiStarted = false;

function switchTheme(event) {
    document.documentElement.setAttribute("data-theme", event.target.checked ? "dark" : "light");
}

if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchTheme);
}

function updateLogoColor() {
    if (!logo) return;
    const hour = new Date().getHours();
    logo.style.color = hour >= 20 || hour < 6 ? "#cccccc" : "#ffffff";
}

function formatCountdown(milliseconds) {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map(value => String(value).padStart(2, "0")).join(":");
}

function updateStickySelection() {
    if (!stickyWork || !stickySelected) return;
    stickyWork.classList.toggle("selected", stickySelected.checked);
}

function launchConfetti() {
    if (confettiStarted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    confettiStarted = true;

    const colors = ["#e32935", "#ffbd2e", "#00b8d9", "#6bcB77", "#9b5de5", "#ffffff"];

    ["left", "right"].forEach(side => {
        for (let index = 0; index < 42; index += 1) {
            const piece = document.createElement("span");
            const isLeft = side === "left";
            const drift = isLeft ? 45 + Math.random() * 230 : -(45 + Math.random() * 230);

            piece.className = "confetti-piece";
            piece.style.left = isLeft
                ? Math.random() * 7 + "vw"
                : 93 + Math.random() * 7 + "vw";
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.width = 5 + Math.random() * 6 + "px";
            piece.style.height = 8 + Math.random() * 10 + "px";
            piece.style.animationDelay = Math.random() * 0.9 + "s";
            piece.style.setProperty("--drift", drift + "px");
            document.body.appendChild(piece);
            window.setTimeout(() => piece.remove(), 6000);
        }
    });
}

function publishStickyNotes() {
    if (stickyNotesReleased) return;
    stickyNotesReleased = true;

    if (stickyWork) stickyWork.hidden = false;
    if (releaseButton) releaseButton.disabled = false;
    if (releaseLabel) releaseLabel.textContent = "Wydano: Sticky Notes";
    if (releaseCountdown) releaseCountdown.textContent = "";

    updateStickySelection();
    launchConfetti();
}

function updateReleaseCountdown() {
    const remaining = STICKY_NOTES_RELEASE_AT - Date.now();

    if (remaining <= 0) {
        publishStickyNotes();
        return;
    }

    if (releaseCountdown) {
        releaseCountdown.textContent = formatCountdown(remaining);
    }
}

if (stickySelected) {
    stickySelected.addEventListener("change", updateStickySelection);
}

if (releaseButton) {
    releaseButton.addEventListener("click", () => {
        if (!stickyNotesReleased || Date.now() < STICKY_NOTES_RELEASE_AT) return;

        if (stickySelected) {
            stickySelected.checked = true;
            updateStickySelection();
        }

        window.open(STICKY_NOTES_URL, "_blank", "noopener,noreferrer");
    });
}

updateLogoColor();
window.setInterval(updateLogoColor, 60000);

if (Date.now() >= STICKY_NOTES_RELEASE_AT) {
    publishStickyNotes();
} else {
    updateReleaseCountdown();
    window.setInterval(updateReleaseCountdown, 1000);
}
