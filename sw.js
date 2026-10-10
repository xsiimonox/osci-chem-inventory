const CACHE_NAME = 'reef-storage-tools-cache-v3644-release';
const CORE_ASSETS = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/css/workspace-ui.css',
  './assets/css/design-system.css',
  './assets/css/phyto-scoop.css',
  './assets/js/app.js',
  './assets/js/phyto-holder-preview-data.js',
  './assets/js/phyto-scoop.js',
  './assets/models/PhytoCoral_SpoolHolder.stl',
  './assets/js/workspace-ui.js',
  './assets/js/theme.js',
  './assets/js/lighting-sim.js',
  './assets/js/sangokai-calculations.js',
  './assets/js/sangokai-product-catalog.js',
  './manifest.json',
  './version.json',
  './assets/img/icon.png',
  './assets/img/badman.svg',
  './anleitung.html',
  './privacy.html',
  './impressum.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => Promise.allSettled(
      CORE_ASSETS.map((asset) => cache.add(asset))
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
        .catch(async () => {
          const releaseCache = await caches.open(CACHE_NAME);
          // Versioned URLs share the core assets of this release when offline.
          const cached = await releaseCache.match(e.request) || await releaseCache.match(e.request, { ignoreSearch: true });
          if (cached) return cached;
          if (e.request.mode === 'navigate') return caches.match('./index.html');
          return new Response('', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)
      .then((response) => {
        if (isSameOrigin && response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
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
