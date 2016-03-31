var staticVersion = 'flight-v2';

self.addEventListener('install', (event)=> {
    event.waitUntil(
        caches.open(staticVersion)
            .then((cache)=> {
                return cache.addAll([
                    '/',
                    'scripts/main.js',
                    'scripts/main.js.map',
                    'scripts/libs/firebase.js',
                    'scripts/libs/jquery.min.js',
                    'scripts/libs/jquery-ui.min.js',
                    'scripts/libs/materialize.min.js',
                    'scripts/libs/react.min.js',
                    'scripts/libs/react-dom.min.js',
                    'styles/app.css',
                    'styles/jquery-ui.min.css',
                    'styles/materialize.min.css'
                ])
            })
    )
});

self.addEventListener('fetch', (event)=> {
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