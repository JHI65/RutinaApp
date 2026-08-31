const CACHE = "mesa-rutina-v5";
const BASE = new URL("./", self.location).pathname;
const ARCHIVOS = [BASE, BASE+"index.html", BASE+"manifest.json", BASE+"icono.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// La API de GitHub y las fuentes nunca se cachean como página.
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).host === "api.github.com") return;

  // El HTML: red primero, caché si no hay cobertura.
  if (req.mode === "navigate") {
    e.respondWith(fetch(req)
      .then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(BASE, c)); return r; })
      .catch(() => caches.match(BASE).then(r => r || caches.match(BASE+"index.html"))));
    return;
  }
  // El resto: caché primero.
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
    if (res.ok && new URL(req.url).origin === self.location.origin)
      { const c = res.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return res;
  }).catch(() => r)));
});
