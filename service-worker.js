self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('watzmann').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/style.css',
        '/app.js'
      ]);
    })
  );
});
