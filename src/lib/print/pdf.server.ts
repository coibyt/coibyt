/** Draws laid-out print-tool pages (see ops.ts) into a print-quality PDF.
 *
 * Text is shaped with HarfBuzz — the same engine browsers use — and every
 * glyph is written as a vector outline, so Vietnamese diacritics, Thai and
 * Khmer stacking, Arabic joining and right-to-left order, Devanagari
 * conjuncts and CJK all come out exactly as in the preview, with nothing
 * left for the printer's or viewer's own fonts to get wrong. */
import { readFile } from "fs/promises";
import path from "path";
import PDFDocument from "pdfkit";
import bidiFactory from "bidi-js";
import { isRtl, type FontFamily, type Op, type Page } from "./ops";
import { qrMatrix } from "./qr";

type HB = typeof import("harfbuzzjs");
type HbFace = InstanceType<HB["Face"]>;
type HbFont = InstanceType<HB["Font"]>;

const FONT_DIR = path.join(process.cwd(), "public", "fonts", "price-list");

const FILES = {
  sans: "NotoSans",
  serif: "PlayfairDisplay",
  thai: "NotoSansThai",
  khmer: "NotoSansKhmer",
  arabic: "NotoSansArabic",
  hebrew: "NotoSansHebrew",
  deva: "NotoSansDevanagari",
  sc: "NotoSansSC",
  jp: "NotoSansJP",
  kr: "NotoSansKR",
  emoji: "NotoEmoji",
} as const;
type FontKey = keyof typeof FILES;

interface LoadedFace {
  key: FontKey;
  face: HbFace;
  unicodes: Set<number>;
  fonts: Map<number, HbFont>;
  minW: number;
  maxW: number;
}

let hbPromise: Promise<HB> | null = null;
const faces = new Map<FontKey, Promise<LoadedFace>>();

function loadHb() {
  hbPromise ??= import("harfbuzzjs");
  return hbPromise;
}

function loadFace(key: FontKey): Promise<LoadedFace> {
  let p = faces.get(key);
  if (!p) {
    p = (async () => {
      const hb = await loadHb();
      const data = await readFile(path.join(FONT_DIR, `${FILES[key]}.ttf`));
      const face = new hb.Face(new hb.Blob(new Uint8Array(data)));
      const axes = face.getAxisInfos();
      const wght = axes.wght;
      return {
        key,
        face,
        unicodes: new Set(face.collectUnicodes()),
        fonts: new Map(),
        minW: wght?.min ?? 400,
        maxW: wght?.max ?? 400,
      };
    })();
    p.catch(() => faces.delete(key));
    faces.set(key, p);
  }
  return p;
}

async function fontAt(f: LoadedFace, weight: number): Promise<HbFont> {
  const w = Math.max(f.minW, Math.min(f.maxW, weight));
  let font = f.fonts.get(w);
  if (!font) {
    const hb = await loadHb();
    font = new hb.Font(f.face);
    if (f.maxW > f.minW) font.setVariations([new hb.Variation("wght", w)]);
    f.fonts.set(w, font);
  }
  return font;
}

function chainFor(family: FontFamily, lang: string): FontKey[] {
  const cjk: FontKey[] = lang === "ja" ? ["jp", "sc", "kr"] : lang === "ko" ? ["kr", "sc", "jp"] : ["sc", "jp", "kr"];
  return [family === "serif" ? "serif" : "sans", "sans", "thai", "khmer", "arabic", "hebrew", "deva", ...cjk, "emoji"];
}

// Characters that shouldn't force a font switch on their own: spaces,
// digits, punctuation, combining marks, joiners and variation selectors.
const NEUTRAL = /[\s\d.,:;!?()[\]{}'"«»„“”‘’\-–—+%/&*#@·•|~=<>_]|[̀-ͯ​-‏︀-️]/u;

interface ShapedRun {
  font: HbFont;
  upem: number;
  level: number;
  glyphs: { codepoint: number; xAdvance: number; xOffset: number; yOffset: number }[];
  width: number;
}

const bidi = bidiFactory();

async function shapeLine(text: string, family: FontFamily, weight: number, lang: string): Promise<{ runs: ShapedRun[]; width: number }> {
  const hb = await loadHb();
  const chain = chainFor(family, lang);
  const loaded = await Promise.all(chain.map((k) => loadFace(k)));
  const { levels } = bidi.getEmbeddingLevels(text, isRtl(lang) ? "rtl" : "ltr");

  type RunSpec = { face: LoadedFace; level: number; text: string };
  const specs: RunSpec[] = [];
  let cu = 0;
  for (const ch of Array.from(text)) {
    const cp = ch.codePointAt(0)!;
    const level = levels[cu];
    cu += ch.length;
    const last = specs[specs.length - 1];
    let face = loaded.find((f) => f.unicodes.has(cp)) ?? loaded[0];
    if (last && NEUTRAL.test(ch) && last.face.unicodes.has(cp)) face = last.face;
    if (last && last.face === face && last.level === level) last.text += ch;
    else specs.push({ face, level, text: ch });
  }

  const runs: ShapedRun[] = [];
  for (const s of specs) {
    const font = await fontAt(s.face, weight);
    const buf = new hb.Buffer();
    buf.addText(s.text);
    buf.guessSegmentProperties();
    buf.setDirection(s.level % 2 ? hb.Direction.RTL : hb.Direction.LTR);
    hb.shape(font, buf);
    const glyphs = buf.getGlyphInfosAndPositions().map((g) => ({
      codepoint: g.codepoint,
      xAdvance: g.xAdvance ?? 0,
      xOffset: g.xOffset ?? 0,
      yOffset: g.yOffset ?? 0,
    }));
    runs.push({ font, upem: s.face.face.upem, level: s.level, glyphs, width: glyphs.reduce((w, g) => w + g.xAdvance, 0) / s.face.face.upem });
  }

  // Unicode bidi rule L2 at run granularity: reverse every maximal sequence
  // of runs at or above each level, from the highest level down to 1.
  let order = runs;
  const maxLevel = Math.max(0, ...runs.map((r) => r.level));
  for (let lvl = maxLevel; lvl >= 1; lvl--) {
    const out: ShapedRun[] = [];
    let i = 0;
    while (i < order.length) {
      if (order[i].level >= lvl) {
        let j = i;
        while (j < order.length && order[j].level >= lvl) j++;
        out.push(...order.slice(i, j).reverse());
        i = j;
      } else out.push(order[i++]);
    }
    order = out;
  }
  return { runs: order, width: order.reduce((w, r) => w + r.width, 0) };
}

const n = (v: number) => (Math.round(v * 100) / 100).toString();

/** Each distinct glyph outline becomes one PDF form XObject, written once
 * and placed wherever that glyph appears — far smaller and faster than
 * repeating the outline for every letter. Keyed per document. */
class GlyphForms {
  private forms = new Map<string, { name: string; ref: PDFKit.PDFKitReference } | null>();
  private fontIds = new Map<HbFont, number>();
  constructor(private doc: PDFKit.PDFDocument) {}

  get(font: HbFont, gid: number) {
    let fid = this.fontIds.get(font);
    if (fid === undefined) this.fontIds.set(font, (fid = this.fontIds.size));
    const key = `${fid}:${gid}`;
    if (this.forms.has(key)) return this.forms.get(key)!;
    const cmds = font.glyphToJson(gid);
    if (!cmds.length) {
      this.forms.set(key, null);
      return null;
    }
    let cx = 0;
    let cy = 0;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const grow = (x: number, y: number) => {
      minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y);
    };
    const ops: string[] = [];
    for (const c of cmds) {
      const v = c.values;
      if (c.type === "M") {
        ops.push(`${n(v[0])} ${n(v[1])} m`);
        [cx, cy] = [v[0], v[1]];
        grow(cx, cy);
      } else if (c.type === "L") {
        ops.push(`${n(v[0])} ${n(v[1])} l`);
        [cx, cy] = [v[0], v[1]];
        grow(cx, cy);
      } else if (c.type === "Q") {
        // PDF has no quadratic curves — convert exactly to a cubic.
        const [qx, qy, x, y] = v;
        ops.push(`${n(cx + (2 / 3) * (qx - cx))} ${n(cy + (2 / 3) * (qy - cy))} ${n(x + (2 / 3) * (qx - x))} ${n(y + (2 / 3) * (qy - y))} ${n(x)} ${n(y)} c`);
        grow(qx, qy);
        [cx, cy] = [x, y];
        grow(cx, cy);
      } else if (c.type === "C") {
        ops.push(`${v.map(n).join(" ")} c`);
        grow(v[0], v[1]);
        grow(v[2], v[3]);
        [cx, cy] = [v[4], v[5]];
        grow(cx, cy);
      } else if (c.type === "Z") {
        ops.push("h");
      }
    }
    ops.push("f");
    const ref = this.doc.ref({
      Type: "XObject",
      Subtype: "Form",
      BBox: [Math.floor(minX) - 1, Math.floor(minY) - 1, Math.ceil(maxX) + 1, Math.ceil(maxY) + 1],
    });
    ref.end(ops.join(" "));
    const form = { name: `G${this.forms.size}`, ref };
    this.forms.set(key, form);
    return form;
  }
}

async function drawText(doc: PDFKit.PDFDocument, forms: GlyphForms, op: Extract<Op, { t: "text" }>) {
  const { runs, width } = await shapeLine(op.text, op.family, op.weight, op.lang);
  const w = width * op.size;
  let pen = op.align === "left" ? op.x : op.align === "right" ? op.x - w : op.x - w / 2;
  doc.fillColor(op.color);
  const xobjects = (doc.page as unknown as { xobjects: Record<string, PDFKit.PDFKitReference> }).xobjects;
  const content: string[] = [];
  for (const r of runs) {
    const scale = op.size / r.upem;
    for (const g of r.glyphs) {
      const form = forms.get(r.font, g.codepoint);
      if (form) {
        xobjects[form.name] ??= form.ref;
        content.push(`q ${scale.toFixed(6)} 0 0 ${(-scale).toFixed(6)} ${n(pen + g.xOffset * scale)} ${n(op.y - g.yOffset * scale)} cm /${form.name} Do Q`);
      }
      pen += g.xAdvance * scale;
    }
  }
  if (content.length) (doc as unknown as { addContent: (s: string) => void }).addContent(content.join(" "));
}

function drawQr(doc: PDFKit.PDFDocument, op: Extract<Op, { t: "qr" }>) {
  const { size, dark } = qrMatrix(op.data, op.ec);
  const cell = op.size / size;
  doc.rect(op.x, op.y, op.size, op.size).fill(op.bg);
  doc.fillColor(op.fg);
  // One path for all dark modules, merged per row run — fewer, cleaner shapes.
  for (let r = 0; r < size; r++) {
    let c = 0;
    while (c < size) {
      if (!dark(r, c)) {
        c++;
        continue;
      }
      let e = c;
      while (e < size && dark(r, e)) e++;
      doc.rect(op.x + c * cell, op.y + r * cell, (e - c) * cell + 0.01, cell + 0.01);
      c = e;
    }
  }
  doc.fill(op.fg);
}

type Doc = PDFKit.PDFDocument;

function paintShape(doc: Doc, fill?: string, stroke?: string, lw?: number, dash?: [number, number]) {
  if (dash) doc.dash(dash[0], { space: dash[1] });
  if (fill && stroke) doc.lineWidth(lw ?? 1).fillAndStroke(fill, stroke);
  else if (fill) doc.fill(fill);
  else if (stroke) doc.lineWidth(lw ?? 1).stroke(stroke);
  if (dash) doc.undash();
}

async function drawOps(doc: Doc, forms: GlyphForms, ops: Op[], logo: Buffer | null) {
  for (const op of ops) {
    if (op.t === "rect") {
      if (op.r) doc.roundedRect(op.x, op.y, op.w, op.h, op.r);
      else doc.rect(op.x, op.y, op.w, op.h);
      paintShape(doc, op.fill, op.stroke, op.lw, op.dash);
    } else if (op.t === "circle") {
      doc.circle(op.cx, op.cy, op.r);
      paintShape(doc, op.fill, op.stroke, op.lw, op.dash);
    } else if (op.t === "line") {
      doc.save();
      doc.moveTo(op.x1, op.y1).lineTo(op.x2, op.y2).lineWidth(op.lw).lineCap("round");
      if (op.dash) doc.dash(op.dash[0], { space: op.dash[1] });
      doc.stroke(op.color);
      doc.undash();
      doc.restore();
    } else if (op.t === "path") {
      doc.save();
      doc.translate(op.x, op.y);
      doc.scale(op.scale);
      doc.lineCap("round").lineJoin("round");
      doc.path(op.d);
      paintShape(doc, op.fill, op.stroke, op.lw);
      doc.restore();
    } else if (op.t === "image") {
      if (logo) doc.image(logo, op.x, op.y, { width: op.w, height: op.h });
    } else if (op.t === "qr") {
      drawQr(doc, op);
    } else if (op.t === "text") {
      await drawText(doc, forms, op);
    } else if (op.t === "group") {
      doc.save();
      doc.translate(op.dx ?? 0, op.dy ?? 0);
      if (op.rotate) doc.rotate(op.rotate, { origin: [op.cx ?? 0, op.cy ?? 0] });
      if (op.clip) doc.circle(op.clip.cx, op.clip.cy, op.clip.r).clip();
      await drawOps(doc, forms, op.ops, logo);
      doc.restore();
    }
  }
}

/** Draws laid-out pages (see ops.ts) into a print-quality PDF. */
export async function renderPdf(pages: Page[], logo: Buffer | null, title: string): Promise<Buffer> {
  const doc = new PDFDocument({ autoFirstPage: false, margin: 0, info: { Title: title, Creator: "VaraaAi.com", Producer: "VaraaAi.com" } });
  const chunks: Buffer[] = [];
  doc.on("data", (c: Buffer) => chunks.push(c));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
  });

  const forms = new GlyphForms(doc);
  for (const page of pages) {
    doc.addPage({ size: [page.w, page.h], margin: 0 });
    doc.rect(0, 0, page.w, page.h).fill(page.bg);
    await drawOps(doc, forms, page.ops, logo);
  }
  doc.end();
  return done;
}
