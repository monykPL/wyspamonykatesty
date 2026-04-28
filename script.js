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

// Kolor logo zależny od godziny
function updateLogoColor() {
    const hour = new Date().getHours();
    // Noc: 20:00 - 06:00
    if (hour >= 20 || hour < 6) {
        logo.style.color = "#cccccc"; // Ciemny biały
    } else {
        logo.style.color = "#ffffff"; // Biały
    }
}

updateLogoColor();
setInterval(updateLogoColor, 60000);
