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

// Shows a real OS-level notification for a server-sent push — e.g. "a
// customer wants to talk to you" (see src/lib/push.ts). The payload is
// plain JSON: { title, body, url, tag?, urgent? }.
self.addEventListener("push", (event) => {
  let data = { title: "VaraaAi.Com", body: "" };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    // Non-JSON payload — fall back to the default title/body above.
  }
  // If the app/dashboard is still open in the background, tell it too, so
  // its own loud booking alarm rings (see src/components/booking-alarm.tsx).
  const tellPages = data.urgent
    ? self.clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((clients) => clients.forEach((c) => c.postMessage({ type: "varaaai-booking-alarm" })))
    : Promise.resolve();
  event.waitUntil(
    Promise.all([tellPages, self.registration.showNotification(data.title, {
      body: data.body,
      icon: "/icons/icon-192.png",
      badge: "/icons/icon-192.png",
      data: { url: data.url || "/" },
      // A new booking for today should be impossible to miss: it stays on
      // screen until tapped, vibrates hard and re-alerts even if an older
      // one is still showing.
      tag: data.tag || undefined,
      renotify: !!data.tag,
      requireInteraction: !!data.urgent,
      // The server may send the vibration pattern of the ringtone the admin chose.
      vibrate: Array.isArray(data.vibrate) ? data.vibrate : data.urgent ? [600, 200, 600, 200, 600, 200, 1200] : [200, 100, 200],
      silent: false,
    })])
  );
});

// Focuses an already-open tab on that URL if one exists, otherwise opens a
// new one — standard "jump to the relevant page" notification-click pattern.
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url === url && "focus" in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    })
  );
});
