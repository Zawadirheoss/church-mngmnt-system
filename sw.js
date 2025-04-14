// Precached core files
const CACHE_NAME = 'gospel-v3';
const PRECACHE_URLS = [
  '/',
  'index.html',
  'Gospel springs logo.jpg',
];

// Install: Cache critical resources
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          PRECACHE_URLS.map(url => {
            return fetch(url)
              .then(res => {
                if (res.ok) return cache.put(url, res.clone());
                console.warn(`Failed to cache ${url}: ${res.status}`);
                return Promise.resolve();
              })
              .catch(err => console.warn(`Skipped ${url}:`, err));
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch: Cache-first with network fallback
self.addEventListener('fetch', (e) => {
  if (e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      caches.match(e.request)
        .then(cached => cached || fetch(e.request))
    );
  }
});
