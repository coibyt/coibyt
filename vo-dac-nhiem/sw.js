// Sinh tự động bởi tools/build_sw.py — đừng sửa tay.
const VERSION = "8ad9fbb903";
const SHELL = [
"./",
"index.html",
"manifest.webmanifest",
"css/app.css",
"js/app.js",
"js/audio.js",
"js/i18n.js",
"js/icons.js",
"js/store.js",
"content/lines-vi.json",
"content/track-tay-khong.json",
"content/tracks-vi.json",
"assets/voice/vi/manifest.json",
"assets/img/bg-tall.webp",
"assets/img/bg-wide.webp",
"assets/img/coach-idle.webp",
"assets/img/coach.webp",
"assets/img/cover-ban-sung.webp",
"assets/img/cover-da-ngoai.webp",
"assets/img/cover-the-luc.webp",
"assets/img/icon-192.png",
"assets/img/icon-512.png",
"assets/img/ivan.webp",
"assets/img/katya.webp",
"assets/img/kf/tk1-1.webp",
"assets/img/kf/tk1-2.webp",
"assets/img/kf/tk1-3.webp",
"assets/img/kf/tk1-4.webp",
"assets/img/kf/tk1-5.webp",
"assets/img/kf/tk2-1.webp",
"assets/img/kf/tk2-2.webp",
"assets/img/kf/tk2-3.webp",
"assets/img/kf/tk2-4.webp",
"assets/img/kf/tk2-5.webp",
"assets/img/kf/tk2-6.webp",
"assets/img/kf/tk3-1.webp",
"assets/img/kf/tk3-2.webp",
"assets/img/kf/tk3-3.webp",
"assets/img/kf/tk3-4.webp",
"assets/img/kf/tk3-5.webp",
"assets/img/kf/tk4-1.webp",
"assets/img/kf/tk4-2.webp",
"assets/img/kf/tk4-3.webp",
"assets/img/kf/tk4-4.webp",
"assets/img/kf/tk4-5.webp",
"assets/img/kf/tk4-6.webp",
"assets/img/kf/tk5-1.webp",
"assets/img/kf/tk5-2.webp",
"assets/img/kf/tk5-3.webp",
"assets/img/kf/tk5-4.webp",
"assets/img/kf/tk5-5.webp",
"assets/img/kf/tk5-6.webp",
"assets/img/kf/tk6-1.webp",
"assets/img/kf/tk6-2.webp",
"assets/img/kf/tk6-3.webp",
"assets/img/kf/tk6-4.webp",
"assets/img/kf/tk6-5.webp",
"assets/img/kf/tk7-1.webp",
"assets/img/kf/tk7-2.webp",
"assets/img/kf/tk7-3.webp",
"assets/img/kf/tk7-4.webp",
"assets/img/kf/tk7-5.webp",
"assets/img/kf/tk8-1.webp",
"assets/img/kf/tk8-2.webp",
"assets/img/kf/tk8-3.webp",
"assets/img/kf/tk8-4.webp",
"assets/img/kf/tk8-5.webp",
"assets/sfx/silence.mp3",
"assets/video/coach-idle.mp4",
"assets/video/coach-talk.mp4"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("shell-" + VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("shell-") && k !== "shell-" + VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const media = /\/assets\/(video|voice)\//.test(url.pathname);
  if (media && req.headers.has("range")) {
    // video: dùng bản đã lưu nếu có, trả nguyên tệp (trình duyệt tự xử lý)
    e.respondWith(caches.match(url.pathname.endsWith(".mp4") ? req.url : req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok && (media || url.origin !== location.origin)) {
          const copy = res.clone();
          caches.open(media ? "media-v1" : "fonts-v1").then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match("index.html"));
    })
  );
});
