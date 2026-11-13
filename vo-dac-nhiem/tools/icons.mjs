// Vẽ biểu tượng ứng dụng từ logo SVG (cần Playwright).  node tools/icons.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
import { LOGO } from "../js/icons.js";
const b = await chromium.launch();
const p = await b.newPage();
for (const n of [192, 512]) {
  await p.setViewportSize({ width: n, height: n });
  await p.setContent(`<body style="margin:0;background:#0b0d0a;display:grid;place-items:center;height:100vh">${LOGO.replace("<svg", `<svg width="${n * 0.82}" height="${n * 0.82}"`)}</body>`);
  await p.screenshot({ path: `assets/img/icon-${n}.png` });
}
await b.close();
