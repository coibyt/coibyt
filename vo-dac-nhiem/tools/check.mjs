// Kiểm tra tự động: đi qua mọi màn hình ở cỡ điện thoại và máy tính, chụp ảnh, ghi lỗi.
// node tools/check.mjs <url> <thư-mục-ảnh>
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [url = "http://127.0.0.1:8765/", out = "shots"] = process.argv.slice(2);
const b = await chromium.launch({ args: ["--autoplay-policy=no-user-gesture-required"] });
const errors = [];
for (const [name, vp] of [["phone", { width: 390, height: 844 }], ["desk", { width: 1366, height: 768 }]]) {
  const ctx = await b.newContext({ viewport: vp, deviceScaleFactor: 1, serviceWorkers: "block" });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errors.push(`${name} pageerror: ${e.message}`));
  p.on("console", (m) => { if (m.type() === "error") errors.push(`${name} console: ${m.text()}`); });
  p.on("requestfailed", (r) => { if (!r.url().includes("welcome-sync")) errors.push(`${name} failed: ${r.url()}`); });
  const shot = (n) => p.screenshot({ path: `${out}/${name}-${n}.png` });
  // trang tải lại thì màn "chạm để vào" hiện lại (đúng thiết kế): chạm qua trước khi thao tác
  const gate = async () => { await p.waitForTimeout(300); if (await p.$(".tapgate")) await p.click(".tapgate"); };
  await p.goto(url);
  await p.waitForTimeout(1200); await shot("01-start");
  await p.click("#c1"); await p.click("#c2"); await p.click("#startBtn");
  await p.evaluate(() => { const k = "soi-taiga.v1"; const s = JSON.parse(localStorage.getItem(k)); s.settings = { ...(s.settings || {}), autoTeach: false }; localStorage.setItem(k, JSON.stringify(s)); });
  await p.waitForTimeout(3500); await shot("02-welcome");
  await p.click("#startBtn"); await p.waitForTimeout(2500); await shot("03-home");
  await p.goto(url + "#/track/tay-khong"); await gate(); await p.waitForTimeout(400);
  if (await p.$(".tapgate")) await p.click(".tapgate");
  await p.waitForTimeout(2500); await shot("04-track");
  await p.goto(url + "#/lesson/tk1"); await gate(); await p.waitForTimeout(2500); await shot("05-lesson");
  await p.goto(url + "#/play/tk1/1"); await gate(); await p.waitForTimeout(4000); await shot("06-play");
  await p.click(".cue"); await p.click("#bDrill"); await p.waitForTimeout(500); await shot("07-drill");
  await p.click("#dg"); await p.waitForTimeout(6000); await shot("08-drilling"); await p.click("#dx");
  await p.goto(url + "#/quiz/tk1"); await gate(); await p.waitForTimeout(5200);
  for (let i = 0; i < 4; i++) {
    await gate(); await p.waitForSelector(".opt:not([disabled])");
    const ok = await p.evaluate(() => 0);
    await p.click(`.opt[data-i="${i === 1 ? 1 : i === 3 ? 1 : 0}"]`);
    await p.waitForTimeout(700);
    if (i === 0) await shot("09-quiz");
    await p.click("#qn");
  }
  await p.waitForTimeout(2500); await shot("10-result");
  await p.goto(url + "#/drills"); await gate(); await p.waitForTimeout(1500); await shot("11-drills");
  await p.goto(url + "#/me"); await gate(); await p.waitForTimeout(1500); await shot("12-me");
  await p.goto(url + "#/track/ngu-trang"); await gate(); await p.waitForTimeout(1500); await shot("13-locked-track");
  // giả lập đã học xong cả nhánh → bản đồ có vạch Cơ bản/Nâng cao và bài thi tốt nghiệp
  await p.evaluate(() => {
    const k = "soi-taiga.v1"; const s = JSON.parse(localStorage.getItem(k));
    for (let i = 1; i <= 15; i++) s.lessons["tk" + i] = { seen: [0, 1, 2, 3, 4], done: true, stars: 3, best: 4 };
    localStorage.setItem(k, JSON.stringify(s));
  });
  await p.goto(url + "#/track/tay-khong"); await gate(); await p.reload(); await p.waitForTimeout(600);
  if (await p.$(".tapgate")) await p.click(".tapgate");
  await p.waitForTimeout(800); await shot("14-track-adv");
  await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(400); await shot("15-track-exam");
  await p.goto(url + "#/exam/tay-khong"); await gate(); await p.waitForTimeout(5500);
  for (let i = 0; i < 10; i++) {
    await gate(); await p.waitForSelector(".opt:not([disabled])");
    await p.click('.opt[data-i="0"]'); await p.waitForTimeout(300); await p.click("#qn");
  }
  await p.waitForTimeout(1500); await shot("16-exam-result");
  await ctx.close();
}
await b.close();
console.log(errors.length ? errors.join("\n") : "no errors");
