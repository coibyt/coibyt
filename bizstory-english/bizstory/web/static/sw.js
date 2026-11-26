/* Service worker: lưu vỏ ứng dụng để mở nhanh/ngoại tuyến. Không chặn file âm thanh (giữ nguyên Range request). */
const CACHE = "bizstory-v2";
const SHELL = ["./", "index.html", "style.css", "app.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || /\.(mp3|m4a)$/.test(u.pathname) || u.pathname.includes("/api/")) return;
  // mạng trước, lỗi mạng thì dùng bản đã lưu
  e.respondWith(fetch(e.request).then((r) => { const c = r.clone(); if (r.ok) caches.open(CACHE).then((x) => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
