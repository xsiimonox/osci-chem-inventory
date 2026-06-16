// Ein minimaler Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Installiert');
});

self.addEventListener('fetch', (e) => {
    // Hier könnte man später Dateien für den Offline-Modus laden
});