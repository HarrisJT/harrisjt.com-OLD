'use strict';

const version = 'v2.020::';
const staticCacheName = version + 'static';
const pagesCacheName = version + 'pages';
const imagesCacheName = version + 'images';
const offlinePages = [
  '/harrisjt.com/',
  '/harrisjt.com//about/',
  '/harrisjt.com//deeptunnelmke/',
  '/harrisjt.com//feelthebern/',
  '/harrisjt.com//portfolios/',
  '/harrisjt.com//technoscope/',
];

function updateStaticCache() {
  return caches.open(staticCacheName).then(cache => {
    cache.addAll([
      '/harrisjt.com/_include/img/awards/cosmopolitan.png',
      '/harrisjt.com/_include/img/awards/elle.png',
      '/harrisjt.com/_include/img/awards/mic.png',
      '/harrisjt.com/_include/img/awards/msnbc.png',
      '/harrisjt.com/_include/img/awards/newyorktimes.png',
      '/harrisjt.com/_include/img/awards/wallstreetjournal.png',
      '/harrisjt.com/_include/img/awards/wired.png',
      '/harrisjt.com/_include/img/deeptunnelmke/colors-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/fonts-dtm.png',
      '/harrisjt.com/_include/img/deeptunnelmke/gallery-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/gallery-open-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/home-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/homefull-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/interior1-dtm.jpg',
      '/harrisjt.com/_include/img/deeptunnelmke/logo-dtm.png',
      '/harrisjt.com/_include/img/deeptunnelmke/macmockup-dtm.png',
      '/harrisjt.com/_include/img/deeptunnelmke/overview-screenshot-dtm.jpg',
      '/harrisjt.com/_include/img/feelthebern/photobooth-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/colors-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/flyers-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/fonts-ftb.png',
      '/harrisjt.com/_include/img/feelthebern/graffiti-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/home-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/logo-ftb.png',
      '/harrisjt.com/_include/img/feelthebern/macmockup-ftb.png',
      '/harrisjt.com/_include/img/feelthebern/overview-screenshot-ftb.jpg',
      '/harrisjt.com/_include/img/feelthebern/phonemockup-homepage-ftb.png',
      '/harrisjt.com/_include/img/feelthebern/phonemockup-interior-ftb.png',
      '/harrisjt.com/_include/img/portfolios/firstabout-port.jpg',
      '/harrisjt.com/_include/img/portfolios/firstcolors-port.jpg',
      '/harrisjt.com/_include/img/portfolios/firstcontact-port.jpg',
      '/harrisjt.com/_include/img/portfolios/firsthome-hover-port.gif',
      '/harrisjt.com/_include/img/portfolios/firsthome-port.jpg',
      '/harrisjt.com/_include/img/portfolios/fonts-port.png',
      '/harrisjt.com/_include/img/portfolios/home-port.gif',
      '/harrisjt.com/_include/img/portfolios/logo-port.jpg',
      '/harrisjt.com/_include/img/portfolios/macmockup-port.png',
      '/harrisjt.com/_include/img/portfolios/overview-screenshot-port.jpg',
      '/harrisjt.com/_include/img/portfolios/secondabout-port.jpg',
      '/harrisjt.com/_include/img/portfolios/secondcolors-port.jpg',
      '/harrisjt.com/_include/img/portfolios/secondcontact-port.jpg',
      '/harrisjt.com/_include/img/portfolios/secondhome-hover-port.gif',
      '/harrisjt.com/_include/img/portfolios/secondhome-port.jpg',
      '/harrisjt.com/_include/img/portfolios/thirdhome-hover-port.gif',
      '/harrisjt.com/_include/img/technoscope/about-tech.jpg',
      '/harrisjt.com/_include/img/technoscope/colors-tech.jpg',
      '/harrisjt.com/_include/img/technoscope/fonts-tech.png',
      '/harrisjt.com/_include/img/technoscope/home-tech.jpg',
      '/harrisjt.com/_include/img/technoscope/logo-tech.png',
      '/harrisjt.com/_include/img/technoscope/macmockup-tech.png',
      '/harrisjt.com/_include/img/technoscope/post-tech.jpg',
      '/harrisjt.com/_include/img/about.jpg',
      '/harrisjt.com/_include/img/share-buttons.svg',
      '/harrisjt.com/_include/icon.png',
      '/harrisjt.com/404.html',
    ]);
    return cache.addAll([
      '/harrisjt.com/',
      '/harrisjt.com/_include/js/main.js',
      '/harrisjt.com/_include/css/main.css',
      '/harrisjt.com/_include/img/arrow.svg',
      '/harrisjt.com/_include/img/logo.svg',
      '/harrisjt.com/about/',
      '/harrisjt.com/portfolios/',
      '/harrisjt.com/contact/',
      '/harrisjt.com/feelthebern/',
      '/harrisjt.com/deeptunnelmke/',
      '/harrisjt.com/technoscope/',
      '/harrisjt.com/offline.html',
      '/harrisjt.com/404.html',
    ]);
  });
}

function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then(cache => cache.put(request, response));
}

// Limit the number of items in a specified cache.
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0]).then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys().then(keys => {
    return Promise.all(keys
        .filter(key => key.indexOf(version) !== 0)
        .map(key => caches.delete(key))
    );
  });
}

self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches().then(() => self.clients.claim()));
});

self.addEventListener('message', event => {
  if (event.data.command == 'trimCaches') {
    trimCache(pagesCacheName, 35);
    trimCache(imagesCacheName, 20);
  }
});

self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Ignore requests to some directories
  // if (request.url.indexOf('/dir') !== -1 || request.url.indexOf('/dir') !== -1) {
  //   return;
  // }

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // For HTML requests, try the network first, fall back to the cache, finally the offline page
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    event.respondWith(fetch(request).then(response => {
          // NETWORK
          // Stash a copy of this page in the pages cache
          let copy = response.clone();
          if (offlinePages.includes(url.pathname) || offlinePages.includes(url.pathname + '/')) {
            stashInCache(staticCacheName, request, copy);
          } else {
            stashInCache(pagesCacheName, request, copy);
          }

          return response;
        }).catch(() => {
          // CACHE or FALLBACK
          return caches.match(request).then(response => response || caches.match('/offline.html'));
        })
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(caches.match(request).then(response => {
        // CACHE
        return response || fetch(request).then(response => {
              // NETWORK
              // If the request is for an image, stash a copy of this image in the images cache
              if (request.headers.get('Accept').indexOf('image') !== -1) {
                let copy = response.clone();
                stashInCache(imagesCacheName, request, copy);
              }

              return response;
            }).catch(() => {
              // OFFLINE
              // If the request is for an image, show an offline placeholder
              if (request.headers.get('Accept').indexOf('image') !== -1) {
                return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {
                  headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'no-store',
                  },
                });
              }
              // If the request is for a page, show an offline message
              if (request.headers.get('Accept').indexOf('text/html') !== -1) {
                return caches.match('/offline.html');
              }
            });
      })
  );
});
