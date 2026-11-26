/* Service worker: app shell and lesson data work offline. Audio is stored separately by the page
   (Cache "nghe-audio-v1") and played from a blob, so it is not handled here. */
const SHELL = "nghe-shell-v1";
const DATA = "nghe-data-v1";
const PRECACHE = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./brand/emblem.jpg", "./brand/hero.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => ![SHELL, DATA, "nghe-audio-v1"].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(req, cacheName) {
  const c = await caches.open(cacheName);
  try {
    const r = await fetch(req);
    if (r.ok) c.put(req, r.clone());
    return r;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
}
async function staleWhileRevalidate(req, cacheName) {
  const c = await caches.open(cacheName);
  const hit = await c.match(req);
  const net = fetch(req).then((r) => {
    if (r.ok || r.type === "opaque") c.put(req, r.clone());
    return r;
  }).catch(() => hit);
  return hit || net;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.pathname.endsWith(".mp3") || req.headers.has("range")) return; // audio: handled by the page
  if (req.mode === "navigate") {
    e.respondWith(networkFirst(req, SHELL).catch(() => caches.match("./index.html")));
    return;
  }
  if (url.pathname.endsWith(".json") || url.pathname.endsWith(".vtt") || url.pathname.endsWith(".srt")) {
    e.respondWith(networkFirst(req, DATA));
    return;
  }
  if (url.origin === location.origin || url.host.endsWith("fonts.googleapis.com") || url.host.endsWith("fonts.gstatic.com")) {
    e.respondWith(staleWhileRevalidate(req, SHELL));
  }
});
