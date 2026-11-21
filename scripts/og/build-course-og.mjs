// node scripts/og/build-course-og.mjs [slug…] — renders the link-preview banner of every
// Academy course page (1200x630) to public/og/khoa-hoc/<slug>-<locale>.jpg.
// The copy comes from scripts/og/course-copy.json (written by
// `npx tsx scripts/og/course-copy.ts`); the photo is the course banner in
// public/academy/khoa-hoc/<slug>.jpg. Needs Chrome and ffmpeg.
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"));
const repo = path.resolve(here, "../..");
const LOGO = pathToFileURL(path.join(repo, "public/icons/icon-512.png")).href;
const COPY = JSON.parse(fs.readFileSync(path.join(here, "course-copy.json"), "utf8"));
const esc = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function html(slug, t) {
  const photo = pathToFileURL(path.join(repo, `public/academy/khoa-hoc/${slug}.jpg`)).href;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{position:relative;font-family:'Be Vietnam Pro',sans-serif;color:#fff;background:#140e1f}
.bg{position:absolute;inset:0;background:url("${photo}") 72% center/cover no-repeat}
.shade{position:absolute;inset:0;background:linear-gradient(90deg,#140e1f 0%,rgba(20,14,31,.94) 38%,rgba(20,14,31,.55) 62%,rgba(20,14,31,0) 82%)}
.shade2{position:absolute;inset:auto 0 0 0;height:200px;background:linear-gradient(0deg,rgba(20,14,31,.75),rgba(20,14,31,0))}
.serif{font-family:'Playfair Display',Georgia,serif}
.brand{position:absolute;left:64px;top:50px;display:flex;align-items:center;gap:16px}
.brand img{width:58px;height:58px;border-radius:17px;box-shadow:0 14px 30px -10px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.12)}
.brand .name{font-size:33px;font-weight:800}
.brand .name b{color:#c9b3f2}
.brand .dom{font-size:13px;font-weight:600;letter-spacing:.24em;color:#e8d3a6;margin-top:2px}
.eyebrow{font-size:17px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#e8d3a6;display:inline-flex;align-items:center;gap:14px;white-space:nowrap}
.eyebrow:before{content:"";width:40px;height:2px;flex:none;background:linear-gradient(90deg,#e8d3a6,#c99a3f)}
h1{font-size:62px;line-height:1.08;font-weight:700;margin-top:20px;text-wrap:balance}
h1 em{font-style:italic;background:linear-gradient(90deg,#f3e2bb,#d9b25c);-webkit-background-clip:text;color:transparent;padding-right:6px}
.chips{display:flex;gap:10px;margin-top:28px;flex-wrap:nowrap}
.chip{padding:9px 17px;border-radius:999px;font-size:18px;font-weight:600;white-space:nowrap;background:rgba(255,255,255,.1);border:1px solid rgba(232,211,166,.4)}
.chip.free{background:#10b981;border-color:#10b981;color:#fff;font-weight:800}
.cta{position:absolute;left:64px;bottom:50px;display:flex;align-items:center;gap:12px;padding:15px 28px;border-radius:999px;font-size:22px;font-weight:800;color:#1f182d;white-space:nowrap;background:linear-gradient(90deg,#f0dcae,#d9b25c 55%,#b9852d);box-shadow:0 18px 36px -14px rgba(217,178,92,.85)}
</style></head><body>
<div class="bg"></div><div class="shade"></div><div class="shade2"></div>
<div class="brand"><img src="${LOGO}"><div><div class="name">Varaa<b>Ai</b></div><div class="dom">VARAAAI.COM/ACADEMY</div></div></div>
<div id="copy" style="position:absolute;left:64px;top:158px;width:640px">
  <div class="eyebrow">${esc(t.eyebrow)}</div>
  <h1 class="serif">${esc(t.title)}${t.accent ? `<br><em>${esc(t.accent)}</em>` : ""}</h1>
  <div class="chips">${t.chips.map((c, i) => `<span class="chip${i === 0 ? " free" : ""}">${esc(c)}</span>`).join("")}</div>
</div>
<div class="cta">▶ ${esc(t.cta)}</div>
<script>
document.fonts.ready.then(() => {
  const fit = (el, maxW, maxH, min) => { let f = parseFloat(getComputedStyle(el).fontSize); while (f > min && (el.scrollWidth > maxW || el.offsetHeight > maxH)) { f -= 1; el.style.fontSize = f + "px"; } };
  fit(document.querySelector(".eyebrow"), 640, 30, 11);
  fit(document.querySelector("h1"), 640, 205, 30);
  const chips = document.querySelector(".chips");
  let cf = 18; while (cf > 12 && chips.scrollWidth > 640) { cf -= 1; chips.querySelectorAll(".chip").forEach((c) => { c.style.fontSize = cf + "px"; c.style.padding = (cf * 0.5) + "px " + (cf * 0.9) + "px"; }); }
  document.body.dataset.ready = "1";
});
</script>
</body></html>`;
}

const out = path.join(repo, "public/og/khoa-hoc");
fs.mkdirSync(out, { recursive: true });
const PORT = 9700 + Math.floor(Math.random() * 90);
const profile = path.join(here, ".chrome");
// Chrome: $CHROME_PATH, else the usual Windows install, else a Linux Chrome/Chromium
// (the cloud's pre-installed one is /opt/pw-browsers/chromium).
const win = process.platform === "win32";
const CHROMES = [
  process.env.CHROME_PATH,
  ...(win
    ? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
    : ["/opt/pw-browsers/chromium", "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]),
].filter(Boolean);
const chromePath = CHROMES.find((p) => fs.existsSync(p));
if (!chromePath) throw new Error(`Chrome not found; set CHROME_PATH. Tried: ${CHROMES.join(", ")}`);
const flags = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`];
if (!win && process.getuid?.() === 0) flags.push("--no-sandbox"); // Chrome refuses to run as root with the sandbox on
const chrome = spawn(chromePath, [...flags, "about:blank"]);
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
  // Optional course slugs as arguments render only those banners.
  const only = process.argv.slice(2);
  for (const [slug, langs] of Object.entries(COPY)) {
    if (only.length && !only.includes(slug)) continue;
    for (const [locale, t] of Object.entries(langs)) {
      const file = path.join(here, `course-${slug}-${locale}.html`);
      fs.writeFileSync(file, html(slug, t));
      await send("Page.navigate", { url: pathToFileURL(file).href });
      for (let i = 0; i < 80; i++) {
        await sleep(250);
        const r = await send("Runtime.evaluate", { expression: "document.body.dataset.ready==='1' && [...document.images].every(i=>i.complete)", returnByValue: true });
        if (r.result?.result?.value) break;
      }
      await sleep(500);
      const shot = await send("Page.captureScreenshot", { format: "png" });
      const png = path.join(here, `course-${slug}-${locale}@2x.png`);
      fs.writeFileSync(png, Buffer.from(shot.result.data, "base64"));
      const jpg = path.join(out, `${slug}-${locale}.jpg`);
      spawnSync("ffmpeg", ["-loglevel", "error", "-y", "-i", png, "-vf", "scale=1200:630:flags=lanczos", "-q:v", "3", jpg]);
      fs.rmSync(png); fs.rmSync(file);
      console.log("wrote", path.relative(repo, jpg), Math.round(fs.statSync(jpg).size / 1024), "KB");
    }
  }
} finally {
  ws.close();
  if (win) spawnSync("taskkill", ["/F", "/T", "/PID", String(chrome.pid)]);
  else chrome.kill("SIGKILL");
}
process.exit(0);
