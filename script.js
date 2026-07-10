const toggleSwitch = document.querySelector('#checkbox');
const logo = document.getElementById('dynamicLogo');

// Obsługa zmiany motywu
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

function updateLogoColor() {
    const hour = new Date().getHours();
    if (hour >= 20 || hour < 6) {
        logo.style.color = "#cccccc";
    } else {
        logo.style.color = "#ffffff";
    }
}

updateLogoColor();
setInterval(updateLogoColor, 60000);
