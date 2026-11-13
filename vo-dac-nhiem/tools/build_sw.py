#!/usr/bin/env python3
"""Sinh sw.js: lưu sẵn giao diện + nội dung + ảnh để chơi khi không có mạng; video và giọng được lưu khi phát lần đầu.
   python3 tools/build_sw.py   (chạy lại mỗi khi đổi file để cập nhật phiên bản)"""
import hashlib, json, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
shell = ["./", "index.html", "manifest.webmanifest", "css/app.css", *sorted(str(p.relative_to(ROOT)) for p in (ROOT / "js").glob("*.js")),
         *sorted(str(p.relative_to(ROOT)) for p in (ROOT / "content").glob("*.json")),
         *sorted(str(p.relative_to(ROOT)) for p in (ROOT / "assets/voice").glob("*/manifest.json")),
         *sorted(str(p.relative_to(ROOT)) for p in (ROOT / "assets/img").rglob("*") if p.is_file()),
         "assets/sfx/silence.mp3", "assets/video/coach-idle.mp4", "assets/video/coach-talk.mp4"]
h = hashlib.sha1()
for f in shell[1:]:
    h.update(f.encode()); h.update((ROOT / f).read_bytes())
ver = h.hexdigest()[:10]
(ROOT / "sw.js").write_text(f"""// Sinh tự động bởi tools/build_sw.py — đừng sửa tay.
const VERSION = "{ver}";
const SHELL = {json.dumps(shell, indent=0)};
self.addEventListener("install", (e) => {{
  e.waitUntil(caches.open("shell-" + VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
}});
self.addEventListener("activate", (e) => {{
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("shell-") && k !== "shell-" + VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
}});
self.addEventListener("fetch", (e) => {{
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const media = /\\/assets\\/(video|voice)\\//.test(url.pathname);
  if (media && req.headers.has("range")) {{
    // video: dùng bản đã lưu nếu có, trả nguyên tệp (trình duyệt tự xử lý)
    e.respondWith(caches.match(url.pathname.endsWith(".mp4") ? req.url : req, {{ ignoreSearch: true }}).then((hit) => hit || fetch(req)));
    return;
  }}
  e.respondWith(
    caches.match(req, {{ ignoreSearch: true }}).then((hit) => {{
      if (hit) return hit;
      return fetch(req).then((res) => {{
        if (res.ok && (media || url.origin !== location.origin)) {{
          const copy = res.clone();
          caches.open(media ? "media-v1" : "fonts-v1").then((c) => c.put(req, copy));
        }}
        return res;
      }}).catch(() => caches.match("index.html"));
    }})
  );
}});
""")
print("sw.js", ver, len(shell), "files")
