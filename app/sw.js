var staticVersion = 'flight-v2';

self.addEventListener('install', (event)=> {
    event.waitUntil(
        caches.open(staticVersion)
            .then((cache)=> {
                return cache.addAll([
                    '/',
                    'scripts/all.js',
                    'scripts/main.js',
                    'scripts/main.js.map',
                    'styles/app.css',
                    'styles/libs.css'
                ])
            })
    )
});

self.addEventListener('fetch', (event)=> {
    let requestUrl = new URL(event.request.url);

    /*if (requestUrl.origin === location.origin) {
        if (requestUrl.pathName === '/') {
            event.respondWith(caches.match('/skeleton'));
        }
    }*/

    event.respondWith(
        caches.match(event.request).then((response)=> {
            if (response) return response;
            return fetch(event.request);
        })
    )
});

self.addEventListener('activate', (event)=> {
    event.waitUntil(
        caches.keys().then((cacheNames)=> {
            return Promise.all(
                cacheNames
                    .filter((cacheName)=> {
                        return cacheName.startsWith('flight-') && cacheName !== staticVersion;
                    })
                    .map((cacheName)=> {
                        return caches.delete(cacheName);
                    })
            )
        })
    )
});