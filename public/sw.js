// Minimal service worker, needed only so Chrome/Edge/Android treat the site
// as an installable app (a registered worker with a fetch handler is part of
// their installability criteria). It never caches anything — this is a
// dynamic, session-based booking app, so serving a stale cached page to a
// signed-in user would be worse than no offline support at all.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
