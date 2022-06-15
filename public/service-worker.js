/* eslint-disable no-restricted-globals */

const cacheFiles = ["index.html", "logo192.png", "logo512.png"];
const cacheName = "trarec";

self.addEventListener("install", (event) => {
  caches.open(cacheName).then((cache) => cache.addAll(cacheFiles));
});

self.addEventListener("activate", (event) => {
  // Processing after installation is complete
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (resp) {
        return (
          resp ||
          fetch(event.request).then(function (response) {
            let responseClone = response.clone();
            caches.open(cacheName).then(function (cache) {
              if (!event.request.url.startsWith("http")) return;
              cache.put(event.request, responseClone);
            });
            return response;
          })
        );
      })
      .catch(function () {
        return caches.match("logo.svg");
      })
  );
});
