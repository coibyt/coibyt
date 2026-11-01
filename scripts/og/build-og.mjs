// node scripts/og/build-og.mjs — renders the social share images (Open
// Graph, 1200x630) to public/og/varaaai-<locale>.jpg: the link preview on
// Facebook, Messenger, Zalo, Telegram, WhatsApp, X and LinkedIn. Drawn in
// HTML at 2x and downscaled for crisp text. Needs Chrome and ffmpeg.
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"));
const repo = path.resolve(here, "../..");
const asset = (f) => pathToFileURL(path.join(here, f)).href;
const LOGO = pathToFileURL(path.join(repo, "public/icons/icon-512.png")).href;

// Every site language; any locale missing here falls back to English.
const COPY = JSON.parse(fs.readFileSync(path.join(here, "copy.json"), "utf8"));

function html(t) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{position:relative;font-family:'Be Vietnam Pro',sans-serif;color:#fff;background:linear-gradient(135deg,#140e1f 0%,#241a36 45%,#3a2b57 100%)}
.glow{position:absolute;border-radius:50%;filter:blur(90px)}
.serif{font-family:'Playfair Display',Georgia,serif}
.brand{position:absolute;left:64px;top:56px;display:flex;align-items:center;gap:16px}
.brand img{width:64px;height:64px;border-radius:18px;box-shadow:0 14px 30px -10px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.12)}
.brand .name{font-size:38px;font-weight:800;letter-spacing:-.01em}
.brand .name b{color:#c9b3f2}
.brand .dom{font-size:15px;font-weight:600;letter-spacing:.24em;color:#e8d3a6;margin-top:2px}
.eyebrow{font-size:17px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#e8d3a6;display:flex;align-items:center;gap:14px}
.eyebrow:before{content:"";width:40px;height:2px;background:linear-gradient(90deg,#e8d3a6,#c99a3f)}
h1{font-size:70px;line-height:1.04;font-weight:700;letter-spacing:-.01em;margin-top:18px}
h1 em{font-style:italic;background:linear-gradient(90deg,#f3e2bb,#d9b25c);-webkit-background-clip:text;color:transparent;padding-right:6px}
.chips{display:flex;gap:10px;margin-top:30px}
.chip{padding:10px 18px;border-radius:999px;font-size:19px;font-weight:600;background:rgba(255,255,255,.08);border:1px solid rgba(232,211,166,.35)}
.photo{position:absolute;right:56px;top:56px;width:440px;height:518px;border-radius:34px;overflow:hidden;box-shadow:0 40px 80px -30px rgba(0,0,0,.8),0 0 0 2px rgba(232,211,166,.45)}
.photo img{width:100%;height:100%;object-fit:cover}
.photo:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(20,14,31,0) 55%,rgba(20,14,31,.55) 100%)}
.card{position:absolute;display:flex;align-items:center;gap:14px;padding:16px 20px;border-radius:22px;background:rgba(255,255,255,.96);color:#1f182d;box-shadow:0 24px 50px -18px rgba(0,0,0,.65)}
.tick{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,#34c38f,#0e9f6e);display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;font-weight:800}
.card .t{font-size:20px;font-weight:800}
.card .s{font-size:15px;font-weight:600;color:#6b6380;margin-top:2px}
.stars{color:#f5b041;font-size:22px;letter-spacing:2px}
.big{font-size:34px;font-weight:800;line-height:1}
.cta{position:absolute;left:64px;bottom:54px;display:flex;align-items:center;gap:12px;padding:15px 28px;border-radius:999px;font-size:22px;font-weight:800;color:#1f182d;background:linear-gradient(90deg,#f0dcae,#d9b25c 55%,#b9852d);box-shadow:0 18px 36px -14px rgba(217,178,92,.85)}
.cta span{font-weight:600;color:#3d2c12;opacity:.85}
/* Arabic and Hebrew: the whole layout mirrors. */
body.rtl .brand{left:auto;right:64px;flex-direction:row-reverse}
body.rtl #copy{left:auto;right:64px;text-align:right}
body.rtl .cta{left:auto;right:64px}
body.rtl .photo{right:auto;left:56px}
body.rtl .c1{left:auto!important;right:640px}
body.rtl .c2{right:auto!important;left:30px}
</style></head><body class="${t.rtl ? "rtl" : ""}" dir="${t.rtl ? "rtl" : "ltr"}">
<div class="glow" style="width:520px;height:520px;left:-120px;top:-160px;background:rgba(98,79,137,.55)"></div>
<div class="glow" style="width:460px;height:460px;left:360px;bottom:-260px;background:rgba(201,154,63,.28)"></div>
<div class="brand"><img src="${LOGO}"><div><div class="name">Varaa<b>Ai</b></div><div class="dom">VARAAAI.COM</div></div></div>
<div id="copy" style="position:absolute;left:64px;top:170px;width:600px">
  <div class="eyebrow">${t.eyebrow}</div>
  <h1 class="serif">${t.title}</h1>
  <div class="chips">${t.chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
</div>
<div class="cta">✦ ${t.cta} <span>· varaaai.com</span></div>
<div class="photo"><img src="${asset("nails.jpg")}" style="object-position:58% 50%"></div>
<div class="card c1" style="left:640px;top:112px"><div class="tick">✓</div><div><div class="t">${t.booked}</div><div class="s">${t.bookedSub}</div></div></div>
<div class="card c2" style="right:30px;bottom:44px"><div class="tick" style="background:linear-gradient(135deg,#8b76b9,#40325c);font-size:22px">🔔</div><div><div class="t">${t.remind}</div><div class="s">${t.remindSub}</div></div></div>
<script>
// Shrink whatever doesn't fit — long German, Finnish or Hungarian words.
document.fonts.ready.then(() => {
  const fit = (el, maxW, maxH, min) => { let f = parseFloat(getComputedStyle(el).fontSize); while (f > min && (el.scrollWidth > maxW || el.offsetHeight > maxH)) { f -= 1; el.style.fontSize = f + "px"; } };
  const eb = document.querySelector(".eyebrow"); eb.style.whiteSpace = "nowrap"; fit(eb, 560, 30, 11);
  const h1 = document.querySelector("h1"); h1.style.whiteSpace = "nowrap"; fit(h1, 600, 240, 30);
  const chips = document.querySelector(".chips"); chips.style.flexWrap = "nowrap";
  let cf = 19; while (cf > 12 && chips.scrollWidth > 600) { cf -= 1; chips.querySelectorAll(".chip").forEach((c) => { c.style.fontSize = cf + "px"; c.style.padding = (cf * 0.5) + "px " + (cf * 0.85) + "px"; }); }
  document.querySelectorAll(".card").forEach((c) => fit(c.querySelector(".t"), 280, 60, 12));
  document.body.dataset.ready = "1";
});
</script>
</body></html>`;
}

const out = path.join(repo, "public/og");
fs.mkdirSync(out, { recursive: true });
const PORT = 9700 + Math.floor(Math.random() * 90);
const profile = path.join(here, ".chrome");
const chrome = spawn("C:/Program Files/Google/Chrome/Application/chrome.exe", ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let i = 0; i < 60 && !target; i++) { await sleep(300); try { target = (await fetch(`http://127.0.0.1:${PORT}/json`).then((r) => r.json())).find((t) => t.type === "page"); } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let n = 0; const pending = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const i = ++n; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1200, height: 630, deviceScaleFactor: 2, mobile: false });

try {
  // `node build-og.mjs de fi` renders only those languages.
  const only = process.argv.slice(2);
  for (const [locale, t] of Object.entries(COPY)) {
    if (only.length && !only.includes(locale)) continue;
    const file = path.join(here, `og-${locale}.html`);
    fs.writeFileSync(file, html(t));
    await send("Page.navigate", { url: pathToFileURL(file).href });
    for (let i = 0; i < 80; i++) {
      await sleep(250);
      const r = await send("Runtime.evaluate", { expression: "document.body.dataset.ready==='1' && [...document.images].every(i=>i.complete)", returnByValue: true });
      if (r.result?.result?.value) break;
    }
    await sleep(400);
    const shot = await send("Page.captureScreenshot", { format: "png" });
    const png = path.join(here, `og-${locale}@2x.png`);
    fs.writeFileSync(png, Buffer.from(shot.result.data, "base64"));
    const jpg = path.join(out, `varaaai-${locale}.jpg`);
    spawnSync("ffmpeg", ["-loglevel", "error", "-y", "-i", png, "-vf", "scale=1200:630:flags=lanczos", "-q:v", "2", jpg]);
    fs.rmSync(png); fs.rmSync(file);
    console.log("wrote", path.relative(repo, jpg), Math.round(fs.statSync(jpg).size / 1024), "KB");
  }
} finally {
  ws.close();
  spawnSync("taskkill", ["/F", "/T", "/PID", String(chrome.pid)]);
}
process.exit(0);
