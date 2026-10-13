/** Light offline shell for repeat visits. */
const CACHE = 'nostalmanac-v2';
const SHELL = [
  './',
  './index.html',
  './css/style.css',
  './css/v1990.css',
  './css/gameshow.css',
  './css/a11y.css',
  './js/app.js',
  './manifest.webmanifest',
  './assets/world-toon.jpg',
  './assets/world-movie.jpg',
  './assets/world-jam.jpg',
  './assets/world-cart.jpg',
  './assets/world-fad.jpg',
  './assets/og-share.svg',
  './audio/silence.wav',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).then((res) => {
      if (res.ok && /\.(css|js|wav|svg|jpg|webmanifest|html)$/.test(url.pathname)) {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, clone));
      }
      return res;
    }).catch(() => hit)),
  );
});
