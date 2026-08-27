const CACHE_NAME = 'reef-storage-tools-cache-v34106-release';
const ASSETS = [
  './',
  './index.html',
  './anleitung.html',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/lighting-sim.js',
  './assets/js/sangokai-data.js',
  './manifest.json',
  './version.json',
  './assets/img/icon.png',
  './assets/img/badman.svg',
  './privacy.html',
  './impressum.html',
  './ANLEITUNG.md',
  './docs-assets/uebersicht.png',
  './docs-assets/lager.png',
  './docs-assets/trace.png',
  './docs-assets/tools-dosierung.png',
  './docs-assets/tools-salz-adsorber.png',
  './docs-assets/tools-mischen.png',
  './docs-assets/logbuch.png',
  './docs-assets/korallen.png',
  './docs-assets/wareneingang.png',
  './docs-assets/einstellungen-cloud.png',
  './wave/demo.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => Promise.allSettled(
      ASSETS.map((asset) => cache.add(asset))
    ))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isFreshAsset =
    e.request.mode === 'navigate' ||
    ['document', 'script', 'style', 'manifest'].includes(e.request.destination) ||
    url.pathname.endsWith('/version.json');

  if (isSameOrigin && isFreshAsset) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => {
      if (e.request.mode === 'navigate') return caches.match('./index.html');
      return new Response('', { status: 503, statusText: 'Offline' });
    }))
  );
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});
