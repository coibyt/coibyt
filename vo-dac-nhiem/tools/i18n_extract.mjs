// Tách toàn bộ chữ tiếng Việt của game thành bộ nguồn để dịch: content/i18n/vi/{ui,lines,tracks,lessons,force}.json
//   node tools/i18n_extract.mjs
// Bản dịch ngôn ngữ khác nằm ở content/i18n/<mã>/ với ĐÚNG cấu trúc này (kiểm tra bằng tools/i18n_check.py <mã>).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const rd = (f) => JSON.parse(fs.readFileSync(path.join(ROOT, f), "utf8"));
const out = path.join(ROOT, "content/i18n/vi");
fs.mkdirSync(out, { recursive: true });
const wr = (f, o) => fs.writeFileSync(path.join(out, f), JSON.stringify(o, null, 1) + "\n");

// ---- ui.json là bản gốc viết tay (content/i18n/vi/ui.json), không sinh lại ở đây.

// ---- lời thoại ở các màn hình
wr("lines.json", rd("content/lines-vi.json"));

// ---- các nhánh
const cat = rd("content/tracks-vi.json");
const tracks = {};
for (const t of cat.tracks) tracks[t.id] = { title: t.title, sub: t.sub, ...(t.preview ? { preview: t.preview } : {}) };
wr("tracks.json", tracks);

// ---- bài học (chỉ phần chữ)
const lessons = {};
for (const l of rd("content/track-tay-khong.json").lessons) {
  const steps = {};
  for (const s of l.steps) {
    const drill = { label: s.drill.label, say: s.drill.say };
    if (s.drill.calls) drill.calls = s.drill.calls;
    steps[s.id] = { title: s.title, say: s.say, cues: s.cues, mistakes: s.mistakes, drill };
  }
  lessons[l.id] = {
    title: l.title, sub: l.sub, intro: l.intro, safety: l.safety, outro: l.outro, home: l.home,
    steps, quiz: l.quiz.map((q) => ({ q: q.q, a: q.a, why: q.why })),
  };
}
wr("lessons.json", lessons);

// ---- nhãn mũi tên hướng lực
const force = {};
for (const [clip, cues] of Object.entries(rd("content/force-vi.json"))) if (Array.isArray(cues)) force[clip] = cues.map((c) => c.l);
wr("force.json", force);

const size = fs.readdirSync(out).reduce((n, f) => n + fs.statSync(path.join(out, f)).size, 0);
console.log("content/i18n/vi:", fs.readdirSync(out).join(", "), Math.round(size / 1024), "KB");
