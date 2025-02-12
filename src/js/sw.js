// Instalação do SW e cache dos arquivos
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./src/css/style.css",
        "./src/js/script.js",
        "./src/icons/css/all.min.css",
        "./src/img/favicon-16x16.png",
        "./src/img/favicon-32x32.png",
        "./src/img/favicon-192x192.png",
        "./src/img/favicon-512x512.png",
        "./src/font/LexendGiga-VariableFont_wght.woff2"
      ]);
    })
  );
});

// Intercepta a requisição para servir o cache se existir
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});