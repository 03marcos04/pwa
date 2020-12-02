// asginar nombre y version de la cache
const CACHE_NAME = 'v1_cache_marco_pwa';

// ficheros a cachear en la aplicacion
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/twitter.png',
    './img/instagram.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];

// evento install
// instalacion del service Worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                })
                .catch(err => {
                    console.log('no se ha registrado el cache', err);
                })
        })
        .catch(err => {
            console.log('error al abrir cache ', err);
        })
    );
});

// evento activate
// que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhiteList = [
        CACHE_NAME
    ];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        // borrar los elementos que no necesitamos
                        return cache.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            // activar cache
            self.clients.claim();
        })
    )
});

// evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                // devuelvo datos desde cache
                return res;
            }
            return fetch(e.request);
        })
    );
});