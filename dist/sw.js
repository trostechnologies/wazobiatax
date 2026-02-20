const CACHE_NAME = "wazobia-v1";
const urlsToCache = [
  "/", 
  "/index.html",
  // "/assets/logo-B1M8zBma.png",
  "/assets/index-BS8sXXEf.css",
  // "/assets/index-B9TTyRFC.js",
  "/assets/index-DXzJCFna.js"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((networkResponse) => {
          // Cache new requests dynamically
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          // Navigation fallback for SPA routes
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return new Response(
            "You are offline. Please check your internet connection.",
            { status: 503, statusText: "Offline" }
          );
        })
    })
  );
});