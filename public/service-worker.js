/* eslint-disable no-restricted-globals */

const cacheFiles = ["index.html", "logo192.png", "logo512.png"];
const cacheName = "trarec-v1";

self.addEventListener("install", (event) => {
  // キャッシュの更新
  caches.open(cacheName).then((cache) => cache.addAll(cacheFiles));
});

self.addEventListener("activate", (event) => {
  // 古いキャッシュを削除
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          return key !== cacheName ? caches.delete(key) : null;
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    console.log("offline...");
  }

  event.respondWith(
    caches.match(event.request).then(function (resp) {
      return (
        resp ||
        fetch(event.request).then(function (response) {
          // let responseClone = response.clone();
          // caches.open(cacheName).then(function (cache) {
          //   if (!event.request.url.startsWith("http")) return;
          //   cache.put(event.request, responseClone);
          // });
          return response;
        })
      );
    })
  );
});
