// sw.js - Updated for Netlify compatibility
const CACHE_NAME = 'gospel-springs-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Gospel%20springs%20logo.jpg',
  '/styles.css',
  '/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
