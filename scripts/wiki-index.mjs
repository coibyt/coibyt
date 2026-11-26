// Rebuilds src/content/wiki/<locale>/index.ts from the article files beside it
// (one file per Academy lesson: <lesson-slug>.ts with a default export), and checks every article.
//   node scripts/wiki-index.mjs                 rebuild the indexes and check everything
//   node scripts/wiki-index.mjs --check [slug…] check only (writes nothing); with slugs, only those lesson files
// Checked: the file compiles, required fields, slug rules and collisions, meta lengths, pictures on disk,
// unique anchors, links that lead somewhere, and the length of the text.
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const checkOnly = args[0] === "--check";
const only = checkOnly ? args.slice(1) : [];
const NAMES = { vi: "VI_ARTICLES", en: "EN_ARTICLES", fi: "FI_ARTICLES" };
const CATEGORIES = ["nail", "lash", "hair", "spa", "safety", "salon", "marketing", "booking", "tips"];
const ident = (file) => "a_" + file.replace(/\.ts$/, "").replace(/[^a-zA-Z0-9]/g, "_");
const read = (p) => readFileSync(join(root, p), "utf8").replace(/\r\n/g, "\n");

// Academy lessons that have a video (a wiki article needs one), from the curriculum files.
const lessons = new Set();
for (const f of ["curriculum.ts", "craft.ts", "tositeo.ts", "babelisa.ts", "moja.ts"]) {
  const src = read(`src/lib/academy/${f}`);
  for (const m of src.matchAll(/\n  \{\n    slug: "([^"]+)",/g)) {
    const end = src.indexOf("\n  },\n", m.index);
    if (!/video: null/.test(src.slice(m.index, end))) lessons.add(m[1]);
  }
  // moja.ts builds its lessons with L("slug", …): every one listed in its VIDEOS table has a video.
  if (f === "moja.ts") for (const m of src.matchAll(/^ {2}"([a-z0-9-]+)": \[\d+, "[\d-]+"\],$/gm)) lessons.add(m[1]);
}
const chapters = read("src/lib/wiki/categories.ts");
const sitePaths = /^\/(|business|search|app|academy|academy\/khoa-hoc\/[a-z0-9-]+|loyalty-lite|salon-check|salon-quiz|tools\/price-list|tools\/qr-poster|help\/getting-started(#[a-z0-9-]+)?|support|directory|wiki|b\/moja-beauty)$/;

let problems = 0;
const tmp = mkdtempSync(join(tmpdir(), "wiki-index-"));

for (const [locale, name] of Object.entries(NAMES)) {
  const dir = join(root, "src/content/wiki", locale);
  const files = existsSync(dir)
    ? readdirSync(dir)
        .filter((f) => f.endsWith(".ts") && f !== "index.ts")
        .sort()
    : [];
  const chapterSlugs = new Set([...chapters.matchAll(/slug: l3\("([^"]+)", "([^"]+)", "([^"]+)"\)/g)].map((m) => m[{ vi: 1, en: 2, fi: 3 }[locale]]));
  const slugs = new Map();
  for (const f of files) {
    const id = f.replace(/\.ts$/, "");
    const say = [];
    const warn = (msg) => say.push(msg);
    let a;
    try {
      const out = ts.transpileModule(readFileSync(join(dir, f), "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }, reportDiagnostics: true });
      const errors = (out.diagnostics ?? []).filter((d) => d.category === ts.DiagnosticCategory.Error);
      if (errors.length) throw new Error(ts.flattenDiagnosticMessageText(errors[0].messageText, " "));
      const js = join(tmp, `${locale}-${id}.mjs`);
      writeFileSync(js, out.outputText);
      a = (await import(pathToFileURL(js).href)).default;
      if (!a || typeof a !== "object") throw new Error("no default export");
    } catch (e) {
      warn(`does not compile: ${e.message}`);
    }
    if (a) {
      if (slugs.has(a.slug)) warn(`slug "${a.slug}" is also used by ${slugs.get(a.slug)}`);
      slugs.set(a.slug, f);
    }
    if (a && (!only.length || only.includes(id))) {
      const texts = [];
      const pics = [];
      const anchors = [];
      if (a.locale !== locale) warn(`locale is "${a.locale}"`);
      if (a.lesson !== id) warn(`lesson "${a.lesson}" does not match the file name`);
      if (!lessons.has(a.lesson)) warn(`"${a.lesson}" is not an Academy lesson with a video`);
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug ?? "")) warn(`slug "${a.slug}" must be ascii kebab-case`);
      if ((a.slug ?? "").length > 60) warn(`slug is ${a.slug.length} characters (keep it under 60)`);
      if (chapterSlugs.has(a.slug)) warn(`slug "${a.slug}" is a chapter slug`);
      if (!CATEGORIES.includes(a.category)) warn(`unknown category "${a.category}"`);
      for (const k of ["title", "metaTitle", "metaDescription", "keyword", "excerpt", "published", "updated"]) if (!a[k] || typeof a[k] !== "string") warn(`${k} is missing`);
      if ((a.metaTitle ?? "").length > 65) warn(`metaTitle is ${a.metaTitle.length} characters (keep it to about 60)`);
      const d = (a.metaDescription ?? "").length;
      if (d < 125 || d > 162) warn(`metaDescription is ${d} characters (aim for 140–158)`);
      if (!Array.isArray(a.keywords) || a.keywords.length < 3) warn("needs at least 3 secondary keywords");
      if (!Array.isArray(a.takeaways) || a.takeaways.length < 3 || a.takeaways.length > 6) warn("takeaways: 3–6 points");
      if (!Array.isArray(a.intro) || a.intro.length < 1 || a.intro.length > 3) warn("intro: 1–3 paragraphs");
      if (!Array.isArray(a.sections) || a.sections.length < 3) warn("needs at least 3 sections");
      if (!Array.isArray(a.faq) || a.faq.length < 4) warn("needs at least 4 FAQ pairs");
      if (!a.hero?.src) warn("hero picture is missing");
      else pics.push(a.hero);
      texts.push(...(a.intro ?? []), ...(a.takeaways ?? []), a.excerpt ?? "");
      for (const s of a.sections ?? []) {
        anchors.push(s.id);
        if (!s.title) warn(`section ${s.id}: no title`);
        for (const b of s.blocks ?? []) {
          const keys = Object.keys(b).filter((k) => ["p", "h3", "ul", "ol", "img", "note", "table"].includes(k));
          if (keys.length !== 1) warn(`section ${s.id}: a block must have exactly one of p/h3/ul/ol/img/note/table`);
          if (b.p) texts.push(b.p);
          if (b.h3) texts.push(b.h3);
          if (b.ul) texts.push(...b.ul);
          if (b.ol) texts.push(...b.ol);
          if (b.note) texts.push(b.note, b.title ?? "");
          if (b.table) {
            texts.push(...b.table.rows.flat());
            for (const r of b.table.rows) if (r.length !== b.table.head.length) warn(`section ${s.id}: a table row has ${r.length} cells for ${b.table.head.length} columns`);
          }
          if (b.img) pics.push(b.img);
        }
      }
      if (a.howTo) {
        anchors.push(a.howTo.id ?? "cac-buoc");
        if (a.howTo.after && !(a.sections ?? []).some((s) => s.id === a.howTo.after)) warn(`howTo.after "${a.howTo.after}" is not a section id`);
        if (!Array.isArray(a.howTo.steps) || a.howTo.steps.length < 3) warn("howTo needs at least 3 steps");
        for (const st of a.howTo.steps ?? []) {
          texts.push(st.name, st.text);
          if (st.image) pics.push(st.image);
        }
        texts.push(a.howTo.lead ?? "", ...(a.howTo.supplies ?? []));
      }
      for (const f2 of a.faq ?? []) texts.push(f2.q, f2.a);
      for (const id2 of anchors) {
        if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id2 ?? "")) warn(`anchor "${id2}" must be ascii kebab-case`);
        if (["faq", "tom-tat", "video"].includes(id2)) warn(`anchor "${id2}" is reserved by the page`);
      }
      if (new Set(anchors).size !== anchors.length) warn("two sections share an anchor id");
      const seenPics = new Set();
      for (const p of pics) {
        if (!p.alt || p.alt.length < 15) warn(`picture ${p.src}: alt text is missing or too short`);
        if (!existsSync(join(root, "public", p.src))) warn(`picture ${p.src} is missing in public/`);
        if (seenPics.has(p.src)) warn(`picture ${p.src} is used twice`);
        seenPics.add(p.src);
      }
      if (pics.length < 4) warn(`only ${pics.length} pictures (use 5–10)`);
      // Picture files of this article live in public/wiki/<lesson>/ (shared by its translations); none may be left unused.
      const folder = join(root, "public/wiki", a.lesson);
      if (existsSync(folder) && locale === "vi")
        for (const file of readdirSync(folder)) if (!seenPics.has(`/wiki/${a.lesson}/${file}`)) warn(`picture file public/wiki/${a.lesson}/${file} is not used (delete it or use it)`);
      const all = texts.join("\n");
      for (const m of all.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
        const href = m[2];
        if (href.startsWith("lesson:")) {
          if (!lessons.has(href.slice(7))) warn(`link ${href}: no such lesson`);
          else if (href.slice(7) === a.lesson) warn(`link ${href} points at the article's own lesson`);
        } else if (href.startsWith("/")) {
          if (!sitePaths.test(href)) warn(`link ${href} is not a known site path (use lesson:<slug> for lessons)`);
        } else if (!/^https:\/\//.test(href)) warn(`link ${href}: use a site path, lesson:<slug> or an https URL`);
      }
      for (const r of a.related ?? []) {
        if (!lessons.has(r)) warn(`related "${r}" is not a lesson slug`);
        if (r === a.lesson) warn("related lists the article itself");
      }
      if (/—/.test(all + a.title + a.metaTitle + a.metaDescription)) warn("contains an em dash (—); use a comma, colon or full stop");
      if (/\*\*[^*]*$/m.test(all.replace(/\*\*[^*]+\*\*/g, ""))) warn("an unclosed ** bold mark");
      const words = all.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/\s+/).filter(Boolean).length;
      if (words < (locale === "vi" ? 1100 : 750)) warn(`only ${words} words`);
      if (a.keyword && !(a.intro?.[0] ?? "").toLowerCase().includes(a.keyword.toLowerCase())) warn("the first paragraph does not contain the main keyword");
      if (!say.length && only.length) console.log(`  ok ${locale}/${f}: ${words} words, ${pics.length} pictures, /wiki/${a.slug}`);
    }
    if (say.length) {
      problems += say.length;
      console.warn(`${locale}/${f}`);
      for (const m of say) console.warn("  ! " + m);
    }
  }
  if (!checkOnly) {
    const out = [
      "// Generated by scripts/wiki-index.mjs from the article files in this folder. Do not edit.",
      'import type { WikiArticle } from "@/lib/wiki/types";',
      ...files.map((f) => `import ${ident(f)} from "./${f.replace(/\.ts$/, "")}";`),
      "",
      `export const ${name}: WikiArticle[] = [${files.map(ident).join(", ")}];`,
      "",
    ].join("\n");
    writeFileSync(join(dir, "index.ts"), out);
  }
  console.log(`${locale}: ${files.length} articles`);
}
rmSync(tmp, { recursive: true, force: true });
console.log(problems ? `${problems} problem(s) to fix` : "no problems");
