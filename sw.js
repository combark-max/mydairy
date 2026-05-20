       1 const CACHE_NAME = 'cozy-diary-v1';
       2 const ASSETS = [
       3   './index.html',
       4   './manifest.json',
       5   './icon-192.png',
       6   './icon-512.png'
       7 ];
       8
       9 self.addEventListener('install', (e) => {
      10   e.waitUntil(
      11     caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
      12   );
      13 });
      14
      15 self.addEventListener('fetch', (e) => {
      16   e.respondWith(