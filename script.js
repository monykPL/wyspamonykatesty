const toggleSwitch = document.querySelector('#checkbox');
const logo = document.getElementById('dynamicLogo');

// 1. Obsługa trybu ciemnego
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// 2. Logika koloru napisu WyspaMonyka zależna od godziny
function updateLogoColor() {
    const hour = new Date().getHours();
    
    // Przyjmijmy, że noc jest od 20:00 do 6:00
    if (hour >= 20 || hour < 6) {
        logo.style.color = "#cccccc"; // Ciemny biały (szarawy) w nocy
    } else {
        logo.style.color = "#ffffff"; // Czysty biały w dzień
    }
}

// Uruchom przy starcie i sprawdzaj co minutę
updateLogoColor();
setInterval(updateLogoColor, 60000);
