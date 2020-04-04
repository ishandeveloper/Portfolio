const staticCacheName = 'site-static-v1';
const assets = [
    '/Portfolio/',
    '/Portfolio/index.html',
    '/Portfolio/contact.html',
    '/Portfolio/legal.html',
    '/Portfolio/work.html',
    '/Portfolio/404.html',
    '/style.css',
    '/Portfolio/assets/img/mobile.png',
    '/Portfolio/assets/img/favicon.png',
    'https://fonts.googleapis.com/css?family=Lato:300,400,700'
];
// install event
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});
// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});
// When we change the name we could have multiple cache, to avoid that we need to delet the old cache, so with this function we check the key that is our cache naming, if it is different from the actual naming we delete it, in this way we will always have only the last updated cache.
// fetch event
self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});