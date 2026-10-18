/** Lays a PosterDoc out as print pages (see lib/print/ops.ts), in PDF points.
 * Runs in the browser with real font metrics; the same pages are drawn by
 * the canvas renderer (preview, PNG) and the server PDF renderer. */
import { POSTER_FORMATS, type PosterDoc, type Season } from "./types";
import { isRtl, type Align, type FontFamily, type Measure, type Op, type Page } from "@/lib/print/ops";
import { fitText, wrapText } from "@/lib/print/text";
import { mix, onColor, readable } from "@/lib/print/color";
import { qrMatrix } from "@/lib/print/qr";

/** Words printed on the poster itself, per display language. */
export interface PosterLabels {
  presets: [string, string, string];
  sub: string;
  review: string;
  footer: string;
}

// ------------------------------------------------------------ icons (24u)

const ICONS = {
  clock: "M 2 12 A 10 10 0 1 0 22 12 A 10 10 0 1 0 2 12 Z M 12 6 L 12 12 L 16 14",
  phone:
    "M 22 16.9 L 22 19.9 A 2 2 0 0 1 19.8 21.9 A 19.8 19.8 0 0 1 11.2 18.8 A 19.5 19.5 0 0 1 5.2 12.8 A 19.8 19.8 0 0 1 2.1 4.2 A 2 2 0 0 1 4.1 2 L 7.1 2 A 2 2 0 0 1 9.1 3.7 A 12.8 12.8 0 0 0 9.8 6.5 A 2 2 0 0 1 9.4 8.6 L 8.1 9.9 A 16 16 0 0 0 14.1 15.9 L 15.4 14.6 A 2 2 0 0 1 17.5 14.2 A 12.8 12.8 0 0 0 20.3 14.9 A 2 2 0 0 1 22 16.9 Z",
  wifi: "M 2 8.8 A 15 15 0 0 1 22 8.8 M 5 12.9 A 10 10 0 0 1 19 12.9 M 8.5 16.4 A 5 5 0 0 1 15.5 16.4 M 12 20 L 12.01 20",
  tag: "M 12.6 2.6 A 2 2 0 0 0 11.2 2 L 4 2 A 2 2 0 0 0 2 4 L 2 11.2 A 2 2 0 0 0 2.6 12.6 L 11.3 21.3 A 2.4 2.4 0 0 0 14.7 21.3 L 21.3 14.7 A 2.4 2.4 0 0 0 21.3 11.3 Z M 7.5 6.5 A 1 1 0 1 0 7.5 8.5 A 1 1 0 1 0 7.5 6.5 Z",
};

/** A five-point star as a closed path, radius 12, centred at 12,12. */
function starPath() {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 11.5 : 4.8;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M ${pts.join(" L ")} Z`;
}
const STAR = starPath();

// ------------------------------------------------------------ themes

interface Theme {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  card: string;
  cardBorder: string;
  title: FontFamily;
  titleWeight: number;
}

function themeFor(doc: PosterDoc): Theme {
  const c = doc.color;
  if (doc.template === "luxury") {
    const bg = "#0f0d0b";
    return { bg, ink: "#f6efe3", muted: "#bcae98", accent: readable(c, bg, 3), card: "#ffffff", cardBorder: readable(c, bg, 3), title: "serif", titleWeight: 700 };
  }
  if (doc.template === "pastel") {
    const bg = mix(c, "#ffffff", 0.86);
    return { bg, ink: "#2a2431", muted: "#6a6172", accent: readable(c, bg, 3), card: "#ffffff", cardBorder: mix(c, "#ffffff", 0.45), title: "sans", titleWeight: 800 };
  }
  if (doc.template === "seasonal") {
    if (doc.season === "christmas") {
      const bg = "#0f3b2e";
      return { bg, ink: "#fffaf0", muted: "#cfe3d6", accent: readable(c, bg, 3), card: "#ffffff", cardBorder: "#d9b45b", title: "serif", titleWeight: 700 };
    }
    if (doc.season === "blackfriday") {
      const bg = "#0a0a0a";
      return { bg, ink: "#ffffff", muted: "#a6a6a6", accent: readable(c, bg, 3), card: "#ffffff", cardBorder: readable(c, bg, 3), title: "sans", titleWeight: 800 };
    }
    const bg = "#b3121b";
    return { bg, ink: "#fff7e0", muted: "#ffd9a8", accent: readable(c, bg, 2.5), card: "#ffffff", cardBorder: "#f6c453", title: "serif", titleWeight: 700 };
  }
  const bg = "#ffffff";
  return { bg, ink: "#16191d", muted: "#5f6670", accent: readable(c, bg, 3), card: "#ffffff", cardBorder: mix(c, "#ffffff", 0.7), title: "sans", titleWeight: 800 };
}

// ------------------------------------------------------------ decorations

function snowflake(ops: Op[], x: number, y: number, s: number, color: string) {
  ops.push({
    t: "path",
    d: "M 0 -10 L 0 10 M -8.66 -5 L 8.66 5 M -8.66 5 L 8.66 -5 M 0 -10 L -2.5 -12.5 M 0 -10 L 2.5 -12.5 M 0 10 L -2.5 12.5 M 0 10 L 2.5 12.5",
    x,
    y,
    scale: s / 20,
    stroke: color,
    lw: 1.6,
  });
}

function lantern(ops: Op[], x: number, top: number, s: number, body: string, gold: string) {
  // string, caps, body with ribs, tassel
  ops.push({ t: "line", x1: x, y1: top, x2: x, y2: top + s * 0.35, color: gold, lw: s * 0.03 });
  ops.push({ t: "rect", x: x - s * 0.18, y: top + s * 0.35, w: s * 0.36, h: s * 0.08, r: s * 0.02, fill: gold });
  ops.push({
    t: "path",
    d: "M 0 0 C 12 0 16 8 16 16 C 16 24 12 32 0 32 C -12 32 -16 24 -16 16 C -16 8 -12 0 0 0 Z",
    x,
    y: top + s * 0.43,
    scale: s / 32,
    fill: body,
  });
  ops.push({ t: "path", d: "M 0 0 C 6 6 6 26 0 32 M 0 0 C -6 6 -6 26 0 32 M 0 0 L 0 32", x, y: top + s * 0.43, scale: s / 32, stroke: gold, lw: 0.8 });
  ops.push({ t: "rect", x: x - s * 0.18, y: top + s * 1.42, w: s * 0.36, h: s * 0.08, r: s * 0.02, fill: gold });
  for (const dx of [-0.08, 0, 0.08]) ops.push({ t: "line", x1: x + dx * s, y1: top + s * 1.5, x2: x + dx * s, y2: top + s * 1.85, color: gold, lw: s * 0.025 });
}

function maiFlower(ops: Op[], x: number, y: number, r: number, petal: string, center: string) {
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
    ops.push({ t: "circle", cx: x + Math.cos(a) * r * 0.62, cy: y + Math.sin(a) * r * 0.62, r: r * 0.48, fill: petal });
  }
  ops.push({ t: "circle", cx: x, cy: y, r: r * 0.32, fill: center });
}

function decorate(ops: Op[], doc: PosterDoc, T: Theme, W: number, H: number, round = false) {
  const u = Math.min(W, H) / 100;
  if (doc.template === "minimal") {
    ops.push({ t: "rect", x: 0, y: 0, w: W, h: u * 1.6, fill: T.accent });
    ops.push({ t: "rect", x: 0, y: H - u * 1.6, w: W, h: u * 1.6, fill: T.accent });
  } else if (doc.template === "luxury") {
    if (round) {
      ops.push({ t: "circle", cx: W / 2, cy: H / 2, r: W / 2 - u * 3, stroke: T.accent, lw: u * 0.5 });
      return;
    }
    ops.push({ t: "rect", x: u * 3, y: u * 3, w: W - u * 6, h: H - u * 6, stroke: T.accent, lw: u * 0.35 });
    ops.push({ t: "rect", x: u * 4.2, y: u * 4.2, w: W - u * 8.4, h: H - u * 8.4, stroke: mix(T.accent, T.bg, 0.5), lw: u * 0.15 });
  } else if (doc.template === "pastel") {
    ops.push({ t: "circle", cx: W * 0.05, cy: H * 0.04, r: Math.min(W, H) * 0.28, fill: mix(doc.color, "#ffffff", 0.68) });
    ops.push({ t: "circle", cx: W * 0.98, cy: H * 0.2, r: Math.min(W, H) * 0.16, fill: mix(doc.color, "#ffffff", 0.76) });
    ops.push({ t: "circle", cx: W * 0.92, cy: H * 0.98, r: Math.min(W, H) * 0.3, fill: mix(doc.color, "#ffffff", 0.72) });
    ops.push({ t: "circle", cx: W * 0.02, cy: H * 0.86, r: Math.min(W, H) * 0.12, fill: mix(doc.color, "#ffffff", 0.8) });
  } else if (doc.season === "christmas") {
    const flake = mix("#ffffff", T.bg, 0.55);
    const spots: [number, number, number][] = [
      [0.08, 0.06, 5], [0.9, 0.08, 6], [0.18, 0.2, 3], [0.82, 0.24, 3.5], [0.06, 0.55, 4], [0.94, 0.5, 4.5], [0.12, 0.9, 5], [0.88, 0.92, 6], [0.5, 0.97, 3],
    ];
    for (const [fx, fy, s] of spots) snowflake(ops, W * fx, H * fy, u * s, flake);
    // ornament garland along the top
    const n = 9;
    for (let i = 0; i < n; i++) {
      const x = (W / (n - 1)) * i;
      const y = u * 2 + Math.sin((i / (n - 1)) * Math.PI) * u * 4;
      ops.push({ t: "circle", cx: x, cy: y, r: u * 1.6, fill: i % 2 ? "#d9b45b" : T.accent });
    }
  } else if (doc.season === "blackfriday") {
    const y1 = H * 0.06;
    ops.push({ t: "path", d: `M 0 0 L ${W * 0.62} 0 L 0 ${y1 * 3.2} Z`, x: 0, y: 0, scale: 1, fill: T.accent });
    ops.push({ t: "path", d: `M ${W} ${H} L ${W * 0.38} ${H} L ${W} ${H - y1 * 3.2} Z`, x: 0, y: 0, scale: 1, fill: T.accent });
    ops.push({ t: "path", d: `M ${W * 0.7} 0 L ${W * 0.78} 0 L 0 ${y1 * 4.4} L 0 ${y1 * 3.9} Z`, x: 0, y: 0, scale: 1, fill: mix(T.accent, T.bg, 0.55) });
  } else {
    // Tết: lanterns in the top corners, apricot blossoms at the bottom
    const s = Math.min(W, H) * 0.12;
    lantern(ops, W * 0.1, 0, s, "#e3262f", "#f6c453");
    lantern(ops, W * 0.9, 0, s * 0.85, "#e3262f", "#f6c453");
    const blossoms: [number, number, number][] = [[0.07, 0.94, 4], [0.15, 0.97, 3], [0.93, 0.93, 4.5], [0.84, 0.97, 3]];
    for (const [fx, fy, r] of blossoms) maiFlower(ops, W * fx, H * fy, u * r, "#f6c453", "#e3262f");
    if (round) ops.push({ t: "circle", cx: W / 2, cy: H / 2, r: W / 2 - u * 2.5, stroke: "#f6c453", lw: u * 0.5 });
    else ops.push({ t: "rect", x: u * 2.5, y: u * 2.5, w: W - u * 5, h: H - u * 5, stroke: "#f6c453", lw: u * 0.3 });
  }
}

// ------------------------------------------------------------ building blocks

interface Ctx {
  doc: PosterDoc;
  T: Theme;
  labels: (lang: string) => PosterLabels;
  measure: Measure;
  logoAspect: number | null;
}

type Block = { h: number; draw: (ops: Op[], y: number) => void };

function textOp(s: string, x: number, y: number, size: number, weight: number, color: string, align: Align, lang: string, family: FontFamily = "sans"): Op {
  return { t: "text", x, y, text: s, size, weight, family, color, align, lang };
}

function anchor(align: "center" | "left" | "right", x: number, w: number) {
  return align === "center" ? x + w / 2 : align === "left" ? x : x + w;
}

function headerBlock(c: Ctx, x: number, w: number, u: number, align: "center" | "left" | "right", logoH: number): Block | null {
  const { doc, T, measure } = c;
  const main = doc.languages[0];
  const hasLogo = !!(doc.logo && c.logoAspect);
  const logoW = hasLogo ? Math.min(logoH * c.logoAspect!, w * 0.6) : 0;
  const lh = hasLogo ? logoW / c.logoAspect! : 0;
  const nameSize = u * 3.6;
  const name = doc.salonName.trim() ? wrapText(measure, doc.salonName, w, nameSize, 700, T.title, main, 2) : [];
  if (!hasLogo && !name.length) return null;
  const h = lh + (lh && name.length ? u * 1.6 : 0) + name.length * nameSize * 1.2;
  return {
    h,
    draw: (ops, y) => {
      if (hasLogo) {
        const lx = align === "center" ? x + (w - logoW) / 2 : align === "left" ? x : x + w - logoW;
        ops.push({ t: "image", x: lx, y, w: logoW, h: lh });
      }
      let cy = y + lh + (lh && name.length ? u * 1.6 : 0);
      for (const l of name) {
        cy += nameSize * 0.98;
        ops.push(textOp(l, anchor(align, x, w), cy, nameSize, 700, T.ink, align, main, T.title));
        cy += nameSize * 0.22;
      }
    },
  };
}

/** Fits a headline: one line when it can stay large enough, otherwise
 * wrapped into evenly long lines (no lonely last word). */
function headline(c: Ctx, text: string, w: number, max: number, min: number, maxLines: number) {
  const { measure, T } = c;
  const main = c.doc.languages[0];
  const fitted = fitText(measure, text, w, max, min, T.titleWeight, T.title, main, maxLines);
  const oneLine = fitText(measure, text, w, max, Math.max(min, max * 0.7), T.titleWeight, T.title, main, 1);
  const whole = text.replace(/\s+/g, " ").trim();
  if (fitted.lines.length > 1 && oneLine.lines.length === 1 && oneLine.lines[0] === whole) return oneLine;
  if (fitted.lines.length < 2) return fitted;
  let lo = w * 0.45;
  let hi = w;
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    if (wrapText(measure, text, mid, fitted.size, T.titleWeight, T.title, main, maxLines + 1).length > fitted.lines.length) lo = mid;
    else hi = mid;
  }
  return { size: fitted.size, lines: wrapText(measure, text, hi, fitted.size, T.titleWeight, T.title, main, maxLines) };
}

function titleBlock(c: Ctx, x: number, w: number, u: number, align: "center" | "left" | "right", max: number, maxLines: number): Block | null {
  const { doc, T, measure } = c;
  const langs = doc.languages;
  const main = langs[0];
  const t0 = (doc.titles[main] ?? "").trim() || c.labels(main).presets[0];
  const big = headline(c, t0, w, max, u * 4.5, maxLines);
  const others = langs
    .slice(1)
    .map((l) => ({ l, s: (doc.titles[l] ?? "").trim() || c.labels(l).presets[0] }))
    .filter((o) => o.s && o.s !== t0);
  const subSize = Math.min(big.size * 0.42, u * 4.6);
  const otherLines = others.map((o) => ({ l: o.l, lines: wrapText(measure, o.s, w, subSize, 600, "sans", o.l, 2) }));
  const h =
    big.lines.length * big.size * 1.08 + otherLines.reduce((s, o) => s + o.lines.length * subSize * 1.25, 0) + (otherLines.length ? u * 1.2 : 0);
  return {
    h,
    draw: (ops, y) => {
      let cy = y;
      for (const l of big.lines) {
        cy += big.size * 0.92;
        ops.push(textOp(l, anchor(align, x, w), cy, big.size, T.titleWeight, T.ink, align, main, T.title));
        cy += big.size * 0.16;
      }
      if (otherLines.length) cy += u * 1.2;
      for (const o of otherLines)
        for (const l of o.lines) {
          cy += subSize * 1.0;
          ops.push(textOp(l, anchor(align, x, w), cy, subSize, 600, T.accent, align, o.l));
          cy += subSize * 0.25;
        }
    },
  };
}

function subBlock(c: Ctx, x: number, w: number, u: number, align: "center" | "left" | "right"): Block | null {
  const main = c.doc.languages[0];
  const size = u * 2.8;
  const lines = wrapText(c.measure, c.labels(main).sub, w, size, 500, "sans", main, 2);
  if (!lines.length) return null;
  return {
    h: lines.length * size * 1.3,
    draw: (ops, y) => {
      let cy = y;
      for (const l of lines) {
        cy += size;
        ops.push(textOp(l, anchor(align, x, w), cy, size, 500, c.T.muted, align, main));
        cy += size * 0.3;
      }
    },
  };
}

function linesBlock(c: Ctx, x: number, w: number, u: number, align: "center" | "left" | "right"): Block | null {
  const { doc, T, measure } = c;
  const main = doc.languages[0];
  const rows: { icon: keyof typeof ICONS; text: string; offer?: boolean }[] = [];
  if (doc.lines.offer.trim()) rows.push({ icon: "tag", text: doc.lines.offer.trim(), offer: true });
  if (doc.lines.hours.trim()) rows.push({ icon: "clock", text: doc.lines.hours.trim() });
  if (doc.lines.phone.trim()) rows.push({ icon: "phone", text: doc.lines.phone.trim() });
  if (doc.lines.wifi.trim()) rows.push({ icon: "wifi", text: doc.lines.wifi.trim() });
  if (!rows.length) return null;
  const size = u * 3;
  const icon = size * 1.15;
  const gap = u * 1.4;
  const items = rows.map((r) => {
    const s = r.offer ? size * 1.08 : size;
    const lines = wrapText(measure, r.text, w - icon - u * (r.offer ? 7 : 2.5), s, r.offer ? 700 : 500, "sans", main, 2);
    const tw = Math.max(...lines.map((l) => measure(l, s, r.offer ? 700 : 500, "sans", main)));
    const h = r.offer ? lines.length * s * 1.25 + u * 2.6 : lines.length * s * 1.3;
    return { ...r, s, lines, tw, h };
  });
  const h = items.reduce((sum, it) => sum + it.h, 0) + gap * (items.length - 1);
  return {
    h,
    draw: (ops, y) => {
      let cy = y;
      for (const it of items) {
        const rowW = icon + u * 1.4 + it.tw + (it.offer ? u * 4 : 0);
        const rx = align === "center" ? x + (w - rowW) / 2 : align === "left" ? x : x + w - rowW;
        if (it.offer) {
          ops.push({ t: "rect", x: rx, y: cy, w: rowW, h: it.h, r: it.h / 2, fill: T.accent });
        }
        const fg = it.offer ? onColor(T.accent) : T.ink;
        const ix = rx + (it.offer ? u * 2 : 0);
        const iy = cy + (it.offer ? u * 1.3 : 0) + (it.s * 1.25 - icon) / 2;
        ops.push({ t: "path", d: ICONS[it.icon], x: ix, y: iy, scale: icon / 24, stroke: it.offer ? fg : T.accent, lw: 2 });
        let ty = cy + (it.offer ? u * 1.3 : 0);
        for (const l of it.lines) {
          ty += it.s * 0.98;
          ops.push(textOp(l, ix + icon + u * 1.4, ty, it.s, it.offer ? 700 : 500, fg, "left", main));
          ty += it.s * (it.offer ? 0.27 : 0.32);
        }
        cy += it.h + gap;
      }
    },
  };
}

/** Outer size of the white card around a QR of `size` (quiet zone ≥ 3.5
 * modules, so phones lock on quickly). */
function qrPad(data: string, size: number, withLogo: boolean) {
  const modules = qrMatrix(data, withLogo ? "H" : "M").size;
  return Math.max((size / modules) * 3.5, size * 0.05);
}
function cardSize(data: string, size: number, withLogo: boolean) {
  return size + 2 * qrPad(data, size, withLogo);
}

/** QR in a white card with accent corner brackets; logo in the middle when
 * asked (with error correction H, and the logo kept under ~22% of the QR). */
function qrCard(c: Ctx, ops: Op[], data: string, cx: number, top: number, size: number, withLogo: boolean) {
  const ec = withLogo ? "H" : "M";
  const pad = qrPad(data, size, withLogo);
  const card = size + pad * 2;
  const x = cx - card / 2;
  ops.push({ t: "rect", x, y: top, w: card, h: card, r: card * 0.06, fill: c.T.card, stroke: c.T.cardBorder, lw: Math.max(0.6, card * 0.006) });
  ops.push({ t: "qr", x: x + pad, y: top + pad, size, data, fg: "#111111", bg: "#ffffff", ec });
  if (withLogo && c.doc.logo && c.logoAspect) {
    const box = size * 0.24;
    ops.push({ t: "rect", x: cx - box / 2, y: top + pad + (size - box) / 2, w: box, h: box, r: box * 0.18, fill: "#ffffff" });
    const inner = box * 0.82;
    const lw = c.logoAspect >= 1 ? inner : inner * c.logoAspect;
    const lh = c.logoAspect >= 1 ? inner / c.logoAspect : inner;
    ops.push({ t: "image", x: cx - lw / 2, y: top + pad + (size - lh) / 2, w: lw, h: lh });
  }
  // corner brackets
  const b = card * 0.14;
  const o = card * 0.035;
  const lw = Math.max(1.2, card * 0.018);
  const L = x - o;
  const R = x + card + o;
  const Tp = top - o;
  const B = top + card + o;
  const col = c.T.accent;
  for (const [x1, y1, x2, y2] of [
    [L, Tp + b, L, Tp], [L, Tp, L + b, Tp], [R - b, Tp, R, Tp], [R, Tp, R, Tp + b],
    [L, B - b, L, B], [L, B, L + b, B], [R - b, B, R, B], [R, B, R, B - b],
  ])
    ops.push({ t: "line", x1, y1, x2, y2, color: col, lw });
  return card;
}

function reviewBlock(c: Ctx, x: number, w: number, u: number, align: "center" | "left" | "right", qrSize: number): Block | null {
  const { doc, T, measure } = c;
  if (!doc.review.enabled || !/^https?:\/\/\S+\.\S+/.test(doc.review.url.trim())) return null;
  const langs = doc.languages;
  const size = u * 2.7;
  const textW = Math.max(w - qrSize - u * 4, w * 0.4);
  const label = langs.map((l, i) => ({ l, lines: wrapText(measure, c.labels(l).review, textW, i === 0 ? size : size * 0.82, i === 0 ? 700 : 500, "sans", l, 2), i }));
  const textH = label.reduce((s, x) => s + x.lines.length * (x.i === 0 ? size : size * 0.82) * 1.28, 0) + size * 1.4;
  const h = Math.max(qrSize + u * 1.6, textH);
  const textMaxW = Math.max(...label.flatMap((x) => x.lines.map((l) => measure(l, x.i === 0 ? size : size * 0.82, x.i === 0 ? 700 : 500, "sans", x.l))), size * 6);
  const rowW = qrSize + u * 3 + textMaxW;
  return {
    h,
    draw: (ops, y) => {
      const rx = align === "center" ? x + (w - rowW) / 2 : align === "left" ? x : x + w - rowW;
      ops.push({ t: "rect", x: rx - u * 0.8, y, w: qrSize + u * 1.6, h: qrSize + u * 1.6, r: u, fill: "#ffffff" });
      ops.push({ t: "qr", x: rx, y: y + u * 0.8, size: qrSize, data: doc.review.url.trim(), fg: "#111111", bg: "#ffffff", ec: "M" });
      const tx = rx + qrSize + u * 3;
      let ty = y + (h - textH) / 2;
      for (let i = 0; i < 5; i++) ops.push({ t: "path", d: STAR, x: tx + i * size * 1.05, y: ty, scale: size / 24, fill: "#f5b301" });
      ty += size * 1.4;
      for (const lb of label) {
        const s = lb.i === 0 ? size : size * 0.82;
        for (const l of lb.lines) {
          ty += s;
          ops.push(textOp(l, tx, ty, s, lb.i === 0 ? 700 : 500, lb.i === 0 ? T.ink : T.muted, "left", lb.l));
          ty += s * 0.28;
        }
      }
    },
  };
}

function domainOf(data: string) {
  try {
    const u = new URL(data);
    return (u.host.replace(/^www\./, "") + (u.pathname.length > 1 ? u.pathname : "")).slice(0, 48);
  } catch {
    return "";
  }
}

/** Stacks blocks top-to-bottom inside a box, spreading spare space evenly. */
function stack(ops: Op[], blocks: (Block | null)[], top: number, h: number, minGap: number, maxGap: number) {
  const list = blocks.filter((b): b is Block => !!b);
  const used = list.reduce((s, b) => s + b.h, 0);
  const free = h - used;
  const gap = list.length > 1 ? Math.max(minGap, Math.min(maxGap, free / (list.length + 1))) : 0;
  let y = top + Math.max(0, (h - used - gap * (list.length - 1)) / 2);
  for (const b of list) {
    b.draw(ops, y);
    y += b.h + gap;
  }
}

// ------------------------------------------------------------ formats

function portrait(c: Ctx, ops: Op[], W: number, H: number, qrData: string, story: boolean) {
  const u0 = W / 100;
  const m = W * (c.doc.template === "luxury" || c.doc.template === "seasonal" ? 0.1 : 0.08);
  const x = m;
  const w = W - 2 * m;
  const footerH = c.doc.showFooter ? u0 * 4 : u0 * 1.5;
  const top = m * (c.doc.season === "tet" && c.doc.template === "seasonal" ? 1.6 : 1);
  const h = H - top - m - footerH;
  const domain = domainOf(qrData);

  // Shrink text (and the QR's share) step by step until everything fits.
  let plan: { blocks: (Block | null)[]; minGap: number; u: number } | null = null;
  for (const s of [1, 0.93, 0.86, 0.8, 0.74, 0.68, 0.62, 0.56]) {
    const u = u0 * s;
    const header = headerBlock(c, x, w, u, "center", u * (story ? 13 : 10));
    const title = titleBlock(c, x, w, u, "center", u * (story ? 13 : 11), story ? 3 : 2);
    const sub = subBlock(c, x, w, u, "center");
    const lines = linesBlock(c, x, w, u, "center");
    const review = reviewBlock(c, x, w, u, "center", u0 * 15);
    const others = [header, title, sub, lines, review];
    const fixed = others.reduce((sum, b) => sum + (b?.h ?? 0), 0);
    const minGap = u * 2.4;
    const gaps = minGap * others.filter(Boolean).length;
    const extra = u0 * 5.5;
    const ratio = cardSize(qrData, 100, c.doc.qrLogo) / 100 + 0.06; // card + brackets
    const qrSize = Math.min(u0 * (story ? 66 : 56), (h - fixed - gaps - extra) / ratio);
    const minQr = u0 * (c.doc.format === "a6" ? 40 : 34);
    if (qrSize >= minQr || s === 0.56) {
      const size = Math.max(qrSize, u0 * 24);
      const qrBlock: Block = {
        h: size * ratio + extra,
        draw: (o, y) => {
          const card = qrCard(c, o, qrData, W / 2, y + u0, size, c.doc.qrLogo);
          if (domain) o.push(textOp(domain, W / 2, y + u0 + card + u0 * 4.6, u0 * 2.3, 500, c.T.muted, "center", "en"));
        },
      };
      plan = { blocks: [header, title, sub, qrBlock, lines, review], minGap, u };
      break;
    }
  }
  stack(ops, plan!.blocks, top, h, plan!.minGap, plan!.u * 7);
  if (c.doc.showFooter) ops.push(textOp(c.labels(c.doc.languages[0]).footer, W / 2, H - m * 0.55, u0 * 1.9, 500, c.T.muted, "center", c.doc.languages[0]));
}

/** QR on one side, text on the other — table tent faces and square posts. */
function split(c: Ctx, ops: Op[], W: number, H: number, qrData: string) {
  const u = Math.min(W, H) / 100;
  const m = Math.min(W, H) * 0.09;
  const mirror = isRtl(c.doc.languages[0]);
  const gutter = W * 0.05;
  const qrColW = (W - 2 * m - gutter) * 0.44;
  const textW = W - 2 * m - gutter - qrColW;
  const textX = mirror ? m + qrColW + gutter : m;
  const qrX = mirror ? m : m + textW + gutter;
  const align = mirror ? "right" : "left";
  const footerH = c.doc.showFooter ? u * 4.5 : 0;
  const top = m * (c.doc.season === "tet" && c.doc.template === "seasonal" ? 1.5 : 1);
  const h = H - top - m - footerH;

  for (const s of [1, 0.92, 0.84, 0.76, 0.68, 0.6, 0.52]) {
    const us = u * s;
    const blocks = [
      headerBlock(c, textX, textW, us, align, us * 11),
      titleBlock(c, textX, textW, us, align, us * 10, 3),
      subBlock(c, textX, textW, us, align),
      linesBlock(c, textX, textW, us, align),
      reviewBlock(c, textX, textW, us, align, u * 14),
    ];
    const used = blocks.reduce((sum, b) => sum + (b?.h ?? 0), 0) + us * 2.4 * (blocks.filter(Boolean).length - 1);
    if (used <= h || s === 0.52) {
      stack(ops, blocks, top, h, us * 2.4, us * 6);
      break;
    }
  }

  const domain = domainOf(qrData);
  const ratio = cardSize(qrData, 100, c.doc.qrLogo) / 100;
  const qrSize = Math.min((qrColW * 0.92) / ratio, (h * 0.8) / ratio);
  const card = qrSize * ratio;
  const qrTop = top + (h - card - (domain ? u * 4 : 0)) / 2;
  const real = qrCard(c, ops, qrData, qrX + qrColW / 2, qrTop, qrSize, c.doc.qrLogo);
  if (domain) ops.push(textOp(domain, qrX + qrColW / 2, qrTop + real + u * 3.6, u * 2.3, 500, c.T.muted, "center", "en"));
  if (c.doc.showFooter) ops.push(textOp(c.labels(c.doc.languages[0]).footer, W / 2, H - m * 0.5, u * 2, 500, c.T.muted, "center", c.doc.languages[0]));
}

/** A round 100 mm sticker, drawn in a D×D square frame: logo or name,
 * headline, QR and the other languages, centred vertically in the circle. */
function sticker(c: Ctx, D: number, qrData: string): Op[] {
  const u = D / 100;
  const r = D / 2;
  const main = c.doc.languages[0];
  const inner: Op[] = [{ t: "rect", x: 0, y: 0, w: D, h: D, fill: c.T.bg }];
  decorate(inner, c.doc, c.T, D, D, true);

  const t0 = (c.doc.titles[main] ?? "").trim() || c.labels(main).presets[0];
  const title = headline(c, t0, D * 0.6, u * 8.5, u * 4.6, 2);
  const hasLogo = !!(c.doc.logo && c.logoAspect);
  const logoH = hasLogo ? Math.min(u * 8, (D * 0.34) / c.logoAspect!) : 0;
  const nameLine = !hasLogo && c.doc.salonName.trim() ? wrapText(c.measure, c.doc.salonName, D * 0.5, u * 3.8, 700, c.T.title, main, 1)[0] : null;
  const other = c.doc.languages.slice(1).map((l) => ({ l, s: (c.doc.titles[l] ?? "").trim() || c.labels(l).presets[0] })).filter((o) => o.s !== t0);
  const otherSize = u * 3.1;
  const otherLines = other.length ? wrapText(c.measure, other.map((o) => o.s).join(" · "), D * 0.62, otherSize, 600, "sans", other[0].l, 2) : [];
  const qrSize = D * 0.4;
  const card = cardSize(qrData, qrSize, c.doc.qrLogo);
  const footer = c.doc.showFooter ? u * 4.5 : 0;

  const topH = (hasLogo ? logoH + u * 2 : nameLine ? u * 6 : 0) + title.lines.length * title.size * 1.06;
  const total = topH + u * 3.5 + card + u * 3 + otherLines.length * otherSize * 1.3 + footer;
  let y = (D - total) / 2;
  if (hasLogo) {
    const lw = logoH * c.logoAspect!;
    inner.push({ t: "image", x: r - lw / 2, y, w: lw, h: logoH });
    y += logoH + u * 2;
  } else if (nameLine) {
    inner.push(textOp(nameLine, r, y + u * 3.8, u * 3.8, 700, c.T.ink, "center", main, c.T.title));
    y += u * 6;
  }
  for (const l of title.lines) {
    y += title.size * 0.92;
    inner.push(textOp(l, r, y, title.size, c.T.titleWeight, c.T.ink, "center", main, c.T.title));
    y += title.size * 0.14;
  }
  y += u * 3.5;
  const realCard = qrCard(c, inner, qrData, r, y, qrSize, c.doc.qrLogo);
  y += realCard + u * 3;
  for (const l of otherLines) {
    y += otherSize;
    inner.push(textOp(l, r, y, otherSize, 600, c.T.accent, "center", other[0].l));
    y += otherSize * 0.3;
  }
  if (c.doc.showFooter) inner.push(textOp("VaraaAi.com", r, y + u * 3.2, u * 2.3, 600, c.T.muted, "center", "en"));

  return [
    { t: "group", ops: inner, clip: { cx: r, cy: r, r } },
    // cut line
    { t: "circle", cx: r, cy: r, r: r - 0.3, stroke: "#9aa0a6", lw: 0.4, dash: [2, 2] },
  ];
}

// ------------------------------------------------------------ entry point

export interface PosterLayoutInput {
  doc: PosterDoc;
  labels: Record<string, PosterLabels>;
  measure: Measure;
  qrData: string;
  logoAspect: number | null;
}

export function layoutPoster({ doc, labels, measure, qrData, logoAspect }: PosterLayoutInput): Page[] {
  const T = themeFor(doc);
  const c: Ctx = { doc, T, labels: (l) => labels[l] ?? labels.en, measure, logoAspect };
  const F = POSTER_FORMATS[doc.format];

  if (doc.format === "sticker") {
    const D = F.w;
    const one = sticker(c, D, qrData);
    if (!doc.stickerSheet) return [{ w: D, h: D, bg: "#ffffff", ops: one }];
    const A4W = 595.28;
    const A4H = 841.89;
    const gx = (A4W - 2 * D) / 3;
    const gy = (A4H - 2 * D) / 3;
    const ops: Op[] = [];
    for (let row = 0; row < 2; row++)
      for (let col = 0; col < 2; col++) ops.push({ t: "group", ops: one, dx: gx + col * (D + gx), dy: gy + row * (D + gy) });
    return [{ w: A4W, h: A4H, bg: "#ffffff", ops }];
  }

  if (doc.format === "tent") {
    const W = F.w;
    const half = F.h / 2;
    const face: Op[] = [{ t: "rect", x: 0, y: 0, w: W, h: half, fill: T.bg }];
    decorate(face, doc, T, W, half);
    split(c, face, W, half, qrData);
    return [
      {
        w: W,
        h: F.h,
        bg: "#ffffff",
        ops: [
          // back face, upside down so it reads correctly once folded
          { t: "group", ops: face, rotate: 180, cx: W / 2, cy: half / 2 },
          { t: "group", ops: face, dy: half },
          { t: "line", x1: 0, y1: half, x2: W, y2: half, color: "#9aa0a6", lw: 0.5, dash: [4, 3] },
        ],
      },
    ];
  }

  const ops: Op[] = [];
  decorate(ops, doc, T, F.w, F.h);
  if (doc.format === "square") split(c, ops, F.w, F.h, qrData);
  else portrait(c, ops, F.w, F.h, qrData, doc.format === "story");
  return [{ w: F.w, h: F.h, bg: T.bg, ops }];
}

export const SEASONS: Season[] = ["christmas", "blackfriday", "tet"];
