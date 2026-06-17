/**
 * 🧪 Labor & Chemikalien Management - Core Application Script
 * Beinhaltet: Tab-Navigation, Mobile-Menu, Theme-Engine & Party-Mode
 */

document.addEventListener('DOMContentLoaded', () => {
    // === DOM ELEMENTE GENERIEREN / ABGREIFEN ===
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const tabButtons = document.querySelectorAll('.nav-links button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Theme & Party-Mode Elemente
    const themeSelect = document.getElementById('themeSelect');
    // Sucht den Schalter für den Disko-Modus (nimmt den ersten Switch in der App)
    const partyToggle = document.querySelector('.switch input');

    // === 1. NAVIGATION & TAB-SYSTEM ===
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] 
                               || button.dataset.tab; // Flexibler Fallback für Tab-Steuerung
                
                if (targetTab) {
                    switchTab(targetTab);
                } else {
                    // Fallback, falls inline onclicks genutzt werden:
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                }
                
                // Schließt das mobile Menü automatisch nach Klick auf einen Tab
                closeMobileMenu();
            });
        });
    }

    function switchTab(tabId) {
        tabButtons.forEach(btn => {
            const btnTarget = btn.getAttribute('onclick')?.includes(tabId) || btn.dataset.tab === tabId;
            btn.classList.toggle('active', btnTarget);
        });

        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }

    // === 2. MOBILE HAMBURGER MENÜ ===
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', openMobileMenu);
    }
    if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMobileMenu);

    function openMobileMenu() {
        navMenu.classList.add('open');
        if (menuBackdrop) menuBackdrop.classList.add('open');
    }

    function closeMobileMenu() {
        if (navMenu) navMenu.classList.remove('open');
        if (menuBackdrop) menuBackdrop.classList.remove('open');
    }

    // === 3. PREMIUM THEME ENGINE ===
    function applyTheme(themeName) {
        // Entfernt alle vorherigen Themes restlos vom Body
        document.body.classList.remove('theme-girl', 'theme-ocean', 'theme-cyberpunk', 'theme-autumn');
        
        // Aktiviert das neue Theme (außer beim Standard-Darkmode)
        if (themeName && themeName !== 'default') {
            document.body.classList.add(`theme-${themeName}`);
        }
    }

    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const selectedTheme = e.target.value;
            applyTheme(selectedTheme);
            localStorage.setItem('selectedAppTheme', selectedTheme);
        });
    }

    // === 4. FUTURISTIC DISKO / PARTY MODE ===
    if (partyToggle) {
        partyToggle.addEventListener('change', (e) => {
            const isParty = e.target.checked;
            document.body.classList.toggle('party-mode', isParty);
            localStorage.setItem('partyModeActive', isParty);
        });
    }

    // === 5. INITIALISIERUNG BEIM START (Speicherstände laden) ===
    const savedTheme = localStorage.getItem('selectedAppTheme') || 'default';
    const savedPartyMode = localStorage.getItem('partyModeActive') === 'true';

    // Theme wiederherstellen
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
    applyTheme(savedTheme);

    // Party-Modus wiederherstellen
    if (partyToggle) {
        partyToggle.checked = savedPartyMode;
        document.body.classList.toggle('party-mode', savedPartyMode);
    }

    // === 6. INTERAKTIONEN (Ein- / Auslagern Dummy-Event-Handler) ===
    // Diese Sektion sorgt dafür, dass deine Buttons klicken können ohne Fehler zu werfen
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-in')) {
            console.log('Einlagern-Prozess gestartet für Karte...');
            // Hier kann deine spezifische Einlagerungs-Logik rein
        }
        if (e.target.classList.contains('btn-out')) {
            console.log('Auslagern-Prozess gestartet für Karte...');
            // Hier kann deine spezifische Auslagerungs-Logik rein
        }
    });
});
