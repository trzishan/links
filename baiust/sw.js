// sw.js
const CACHE_NAME = 'v1_static_cache';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css'
];

// Install Event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching static assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(error => {
      console.error('Cache install failed:', error);
      throw error;
    })
  );
});

// sw.js
// Activate Event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});



// sw.js
// Fetch Event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached file if found, otherwise fetch from network
      return cachedResponse || fetch(event.request);
    })
  );
});
