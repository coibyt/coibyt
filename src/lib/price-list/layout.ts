/** Turns a PriceListDoc into positioned pages of simple drawing operations
 * (text lines, rectangles, rules, the logo, the QR code), in PDF points.
 *
 * The layout runs once, in the browser — line breaks and page breaks are
 * decided there with real font metrics — and the very same pages are then
 * drawn by the canvas renderer (live preview, PNG) and by the server's PDF
 * renderer, so the downloaded PDF paginates exactly like the preview. */
import { FORMATS, isRtl, formatPrice, type PriceListDoc, type TemplateId } from "./types";
import { luminance, mix, readable } from "@/lib/print/color";
import { wrapText } from "@/lib/print/text";
import type { Align, FontFamily, Measure, Op, Page } from "@/lib/print/ops";

export type { Align, FontFamily, Measure, Op, Page };

/** Words printed on the price list itself, per display language. */
export interface SheetLabels {
  priceList: string;
  scanToBook: string;
  min: string;
  from: string;
  cont: string;
  footer: string;
}

interface Theme {
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  rule: string;
  head: FontFamily;
  leader: boolean;
  frame: boolean;
  band: string | null;
  chip: string | null;
  rowAlt: string | null;
}

function themeFor(template: TemplateId, color: string): Theme {
  if (template === "luxury") {
    const bg = "#16120e";
    return {
      bg,
      ink: "#f4ede2",
      muted: "#b8ab98",
      accent: readable(color, bg),
      rule: mix(color, bg, 0.55),
      head: "serif",
      leader: true,
      frame: true,
      band: null,
      chip: null,
      rowAlt: null,
    };
  }
  if (template === "colorful") {
    const bg = mix(color, "#ffffff", 0.93);
    return {
      bg,
      ink: "#1c2024",
      muted: "#5a6169",
      accent: readable(color, bg),
      rule: mix(color, "#ffffff", 0.7),
      head: "sans",
      leader: false,
      frame: false,
      band: color,
      chip: mix(color, "#ffffff", 0.8),
      rowAlt: mix(color, "#ffffff", 0.86),
    };
  }
  const bg = "#ffffff";
  return {
    bg,
    ink: "#1b1f23",
    muted: "#6b7280",
    accent: readable(color, bg),
    rule: mix(color, "#ffffff", 0.78),
    head: "sans",
    leader: true,
    frame: false,
    band: null,
    chip: null,
    rowAlt: null,
  };
}

// ---------------------------------------------------------------- layout

interface Block {
  kind: "heading" | "row";
  catIndex: number;
  h: number;
  draw: (x: number, y: number, w: number, ops: Op[], alt: boolean) => void;
}

export interface LayoutInput {
  doc: PriceListDoc;
  labels: Record<string, SheetLabels>;
  measure: Measure;
  /** Final QR link (with UTM), or null for no QR. */
  qrData: string | null;
  /** width / height of the logo image, when there is one. */
  logoAspect: number | null;
  /** Hard cap so a runaway document can't produce hundreds of pages. */
  maxPages?: number;
}

export function layoutPriceList({ doc, labels, measure, qrData, logoAspect, maxPages = 40 }: LayoutInput): Page[] {
  const F = FORMATS[doc.format];
  const W = F.w;
  const H = F.h;
  const square = doc.format === "square";
  const k = square ? 0.86 : W / 595.28;
  const m = (square ? 30 : 38) * k;
  const T = themeFor(doc.template, doc.color);
  const langs = doc.languages.length ? doc.languages : ["en"];
  const main = langs[0];
  const L = (lang: string) => labels[lang] ?? labels.en;
  const mirror = isRtl(main);
  const totalServices = doc.categories.reduce((s, c) => s + c.services.length, 0);

  const cols =
    doc.format === "a5" || square
      ? 1
      : totalServices <= 10
        ? 1
        : doc.format === "a3"
          ? langs.length >= 3
            ? 2
            : 3
          : 2;
  const gutter = 22 * k;

  const S = {
    salon: (doc.template === "luxury" ? 30 : 26) * k,
    eyebrow: 9 * k,
    info: 9 * k,
    cat: 14 * k,
    catSub: 9 * k,
    name: 10.5 * k,
    nameSub: 9 * k,
    desc: 8 * k,
    price: 10.5 * k,
    dur: 8 * k,
    footer: 7 * k,
  };
  const lh = 1.32;

  const text = (
    ops: Op[],
    s: string,
    x: number,
    y: number,
    size: number,
    weight: number,
    color: string,
    align: Align,
    lang: string,
    family: FontFamily = "sans"
  ) => {
    if (s) ops.push({ t: "text", x, y, text: s, size, weight, family, color, align, lang });
  };

  const priceText = (price: number | null, from: boolean) => {
    if (price === null) return "";
    const p = formatPrice(price, doc.currency, main);
    return from ? `${L(main).from} ${p}` : p;
  };

  // ---- blocks
  const blocks: Block[] = [];
  doc.categories.forEach((cat, ci) => {
    if (cat.services.length === 0 && !Object.values(cat.names).some(Boolean)) return;
    const primary = cat.names[main] || Object.values(cat.names).find(Boolean) || "";
    const others = langs.slice(1).map((l) => cat.names[l]).filter((n): n is string => !!n && n !== primary);
    const headingH = (pad: number, w: number) => {
      const pl = wrapText(measure, primary, w, S.cat, 700, T.head, main, 2);
      const ol = others.length ? wrapText(measure, others.join(" · "), w, S.catSub, 400, "sans", langs[1] ?? main, 2) : [];
      return { pl, ol, h: pad + pl.length * S.cat * lh + ol.length * S.catSub * lh + 8 * k };
    };
    blocks.push({
      kind: "heading",
      catIndex: ci,
      h: 0, // measured per column width below
      draw: (x, y, w, ops) => {
        const { pl, ol } = headingH(0, w - (T.chip ? 16 * k : 0));
        let cy = y + 6 * k;
        const ax = mirror ? x + w : x;
        const al: Align = mirror ? "right" : "left";
        if (T.chip) {
          const chipH = pl.length * S.cat * lh + 8 * k;
          ops.push({ t: "rect", x, y: cy - 2 * k, w, h: chipH, r: 8 * k, fill: T.chip });
          cy += 2 * k;
        }
        const tx = T.chip ? (mirror ? ax - 8 * k : ax + 8 * k) : ax;
        for (const line of pl) {
          cy += S.cat * 1.02;
          text(ops, line, tx, cy, S.cat, 700, T.chip ? T.ink : T.accent, al, main, T.head);
          cy += S.cat * (lh - 1.02);
        }
        if (T.chip) cy += 6 * k;
        for (const line of ol) {
          cy += S.catSub * 1.05;
          text(ops, line, tx, cy, S.catSub, 400, T.muted, al, langs[1] ?? main);
          cy += S.catSub * (lh - 1.05);
        }
        if (!T.chip) ops.push({ t: "line", x1: x, y1: cy + 3 * k, x2: x + w, y2: cy + 3 * k, color: T.rule, lw: 0.8 * k });
      },
    });
    (blocks[blocks.length - 1] as Block & { measureH: (w: number) => number }).measureH = (w: number) =>
      headingH(6 * k, w - (T.chip ? 16 * k : 0)).h + (T.chip ? 10 * k : 0);

    cat.services.forEach((svc) => {
      const pText = priceText(svc.price, svc.priceFrom);
      const dText = svc.durationMin ? `${svc.durationMin} ${L(main).min}` : "";
      const nameLines = (w: number) => {
        const priceW = Math.max(measure(pText, S.price, 700, "sans", main), measure(dText, S.dur, 400, "sans", main));
        const nameW = w - priceW - 12 * k;
        const out: { text: string; size: number; weight: number; color: string; lang: string }[] = [];
        langs.forEach((l, i) => {
          const n = svc.names[l] || (i === 0 ? Object.values(svc.names).find(Boolean) || "" : "");
          if (!n || (i > 0 && n === (svc.names[main] || ""))) return;
          const size = i === 0 ? S.name : S.nameSub;
          for (const line of wrapText(measure, n, nameW, size, i === 0 ? 600 : 400, "sans", l, 3))
            out.push({ text: line, size, weight: i === 0 ? 600 : 400, color: i === 0 ? T.ink : T.muted, lang: l });
        });
        langs.forEach((l) => {
          const d = svc.descriptions[l];
          if (!d) return;
          for (const line of wrapText(measure, d, nameW, S.desc, 400, "sans", l, 3))
            out.push({ text: line, size: S.desc, weight: 400, color: T.muted, lang: l });
        });
        return { out, priceW, nameW };
      };
      const rowPad = 5 * k;
      const block: Block & { measureH?: (w: number) => number } = {
        kind: "row",
        catIndex: ci,
        h: 0,
        draw: (x, y, w, ops, alt) => {
          const { out, priceW } = nameLines(w);
          const h = block.measureH!(w);
          if (T.rowAlt && alt) ops.push({ t: "rect", x: x - 4 * k, y, w: w + 8 * k, h, r: 6 * k, fill: T.rowAlt });
          let cy = y + rowPad;
          const nameX = mirror ? x + w : x;
          const priceX = mirror ? x : x + w;
          out.forEach((ln, i) => {
            cy += ln.size * 1.02;
            const rtlLine = isRtl(ln.lang) !== mirror;
            // A right-to-left line inside a left-to-right list (or the
            // reverse) hugs the price side, like a bilingual menu.
            const lx = rtlLine ? (mirror ? x + priceW + 12 * k : x + w - priceW - 12 * k) : nameX;
            const la: Align = mirror ? (rtlLine ? "left" : "right") : rtlLine ? "right" : "left";
            text(ops, ln.text, lx, cy, ln.size, ln.weight, ln.color, la, ln.lang);
            if (i === 0) {
              text(ops, pText, priceX, cy, S.price, 700, T.ink, mirror ? "left" : "right", main);
              if (T.leader && pText && !rtlLine) {
                const tw = measure(ln.text, ln.size, ln.weight, "sans", ln.lang);
                const from = mirror ? x + w - tw - 6 * k : x + tw + 6 * k;
                const to = mirror ? x + priceW + 6 * k : x + w - priceW - 6 * k;
                if (Math.abs(to - from) > 14 * k)
                  ops.push({ t: "line", x1: from, y1: cy - 1 * k, x2: to, y2: cy - 1 * k, color: T.rule, lw: 0.9 * k, dash: [0.9 * k, 2.6 * k] });
              }
            }
            cy += ln.size * (lh - 1.02);
          });
          if (dText) {
            const dy = y + rowPad + S.name * 1.02 + S.dur * 1.35;
            text(ops, dText, priceX, dy, S.dur, 400, T.muted, mirror ? "left" : "right", main);
          }
          if (!T.rowAlt) ops.push({ t: "line", x1: x, y1: y + h - 0.5, x2: x + w, y2: y + h - 0.5, color: mix(T.rule, T.bg, 0.5), lw: 0.5 * k });
        },
      };
      block.measureH = (w: number) => {
        const { out } = nameLines(w);
        const linesH = out.reduce((s, ln) => s + ln.size * lh, 0);
        const minH = S.name * lh + (dText ? S.dur * lh : 0);
        return rowPad * 2 + Math.max(linesH, minH);
      };
      blocks.push(block);
    });
  });

  // ---- page frame pieces
  const pages: Page[] = [];
  const qrBig = qrData ? (square ? 0 : 84 * k) : 0;
  const footerH = 18 * k;

  function drawFrame(p: Page) {
    if (T.frame) {
      p.ops.push({ t: "rect", x: 14 * k, y: 14 * k, w: W - 28 * k, h: H - 28 * k, stroke: T.accent, lw: 1.2 * k });
      p.ops.push({ t: "rect", x: 19 * k, y: 19 * k, w: W - 38 * k, h: H - 38 * k, stroke: T.rule, lw: 0.6 * k });
    }
  }

  function drawFirstHeader(p: Page): number {
    const ops = p.ops;
    const centered = doc.template === "luxury";
    const eyebrow = langs.map((l) => L(l).priceList).join(" · ").toUpperCase();
    const info = [doc.address, doc.phone].filter(Boolean).join("  ·  ");
    const logoH = (square ? 40 : 54) * k;
    const logoW = logoAspect ? Math.min(logoH * logoAspect, 160 * k) : 0;

    if (T.band) {
      const bandH = (square ? 92 : 128) * k;
      ops.push({ t: "rect", x: 0, y: 0, w: W, h: bandH, fill: T.band });
      const onBand = luminance(T.band) > 0.55 ? "#1c2024" : "#ffffff";
      let tx = m;
      if (doc.logo && logoAspect) {
        const box = logoH + 12 * k;
        const bw = Math.max(box, logoW + 12 * k);
        ops.push({ t: "rect", x: m, y: (bandH - box) / 2, w: bw, h: box, r: 12 * k, fill: "#ffffff" });
        ops.push({ t: "image", x: m + (bw - logoW) / 2, y: (bandH - logoH) / 2, w: logoW, h: logoH });
        tx = m + bw + 16 * k;
      }
      const maxW = W - tx - m;
      const nameLines = wrapText(measure, doc.salonName, maxW, S.salon, 800, "sans", main, 2);
      const blockH = 12 * k + nameLines.length * S.salon * 1.1 + (info ? S.info * 1.6 : 0);
      let cy = (bandH - blockH) / 2;
      cy += S.eyebrow;
      text(ops, eyebrow, mirror ? W - m : tx, cy, S.eyebrow, 700, onBand, mirror ? "right" : "left", main);
      for (const l of nameLines) {
        cy += S.salon * 1.1;
        text(ops, l, mirror ? W - m : tx, cy, S.salon, 800, onBand, mirror ? "right" : "left", main);
      }
      if (info) text(ops, info, mirror ? W - m : tx, cy + S.info * 1.7, S.info, 400, onBand, mirror ? "right" : "left", main);
      return bandH + 22 * k;
    }

    let y = m + (T.frame ? 8 * k : 0);
    if (centered) {
      if (doc.logo && logoAspect) {
        ops.push({ t: "image", x: (W - logoW) / 2, y, w: logoW, h: logoH });
        y += logoH + 12 * k;
      }
      for (const l of wrapText(measure, doc.salonName, W - 2 * m - 20 * k, S.salon, 700, "serif", main, 2)) {
        y += S.salon * 1.05;
        text(ops, l, W / 2, y, S.salon, 700, T.ink, "center", main, "serif");
      }
      y += 16 * k;
      const ew = Math.min(measure(eyebrow, S.eyebrow, 600, "sans", main), W - 2 * m - 80 * k);
      text(ops, eyebrow, W / 2, y, S.eyebrow, 600, T.accent, "center", main);
      ops.push({ t: "line", x1: W / 2 - ew / 2 - 46 * k, y1: y - S.eyebrow * 0.35, x2: W / 2 - ew / 2 - 10 * k, y2: y - S.eyebrow * 0.35, color: T.accent, lw: 0.8 * k });
      ops.push({ t: "line", x1: W / 2 + ew / 2 + 10 * k, y1: y - S.eyebrow * 0.35, x2: W / 2 + ew / 2 + 46 * k, y2: y - S.eyebrow * 0.35, color: T.accent, lw: 0.8 * k });
      if (info) {
        y += S.info * 1.9;
        text(ops, info, W / 2, y, S.info, 400, T.muted, "center", main);
      }
      return y + 24 * k;
    }

    // minimal
    let tx = mirror ? W - m : m;
    if (doc.logo && logoAspect) {
      ops.push({ t: "image", x: mirror ? W - m - logoW : m, y, w: logoW, h: logoH });
      tx = mirror ? W - m - logoW - 14 * k : m + logoW + 14 * k;
    }
    const maxW = W - 2 * m - (logoW ? logoW + 14 * k : 0);
    const nameLines = wrapText(measure, doc.salonName, maxW, S.salon, 800, "sans", main, 2);
    let cy = y + S.eyebrow;
    text(ops, eyebrow, tx, cy, S.eyebrow, 700, T.accent, mirror ? "right" : "left", main);
    for (const l of nameLines) {
      cy += S.salon * 1.1;
      text(ops, l, tx, cy, S.salon, 800, T.ink, mirror ? "right" : "left", main);
    }
    if (info) {
      cy += S.info * 1.7;
      text(ops, info, tx, cy, S.info, 400, T.muted, mirror ? "right" : "left", main);
    }
    const bottom = Math.max(cy + 8 * k, y + logoH) + 10 * k;
    ops.push({ t: "rect", x: m, y: bottom, w: W - 2 * m, h: 2 * k, fill: T.accent });
    return bottom + 20 * k;
  }

  function drawNextHeader(p: Page): number {
    const y = m + (T.frame ? 8 * k : 0);
    const title = [doc.salonName, L(main).priceList].filter(Boolean).join(" · ");
    text(p.ops, title, mirror ? W - m : m, y + 10 * k, 10 * k, 700, T.band ? T.accent : T.ink, mirror ? "right" : "left", main, T.head);
    p.ops.push({ t: "line", x1: m, y1: y + 18 * k, x2: W - m, y2: y + 18 * k, color: T.rule, lw: 0.8 * k });
    return y + 34 * k;
  }

  function drawQrBlock(p: Page, bottomY: number) {
    if (!qrData) return;
    const size = qrBig;
    const boxW = W - 2 * m;
    const boxH = size + 16 * k;
    const y = bottomY - boxH;
    const panelFill = doc.template === "luxury" ? mix(T.accent, T.bg, 0.88) : doc.template === "colorful" ? "#ffffff" : mix(T.accent, "#ffffff", 0.92);
    p.ops.push({ t: "rect", x: m, y, w: boxW, h: boxH, r: 12 * k, fill: panelFill });
    const qx = mirror ? m + 8 * k : m + boxW - size - 8 * k;
    p.ops.push({ t: "rect", x: qx - 2 * k, y: y + 6 * k, w: size + 4 * k, h: size + 4 * k, r: 6 * k, fill: "#ffffff" });
    p.ops.push({ t: "qr", x: qx, y: y + 8 * k, size, data: qrData, fg: "#111111", bg: "#ffffff" });
    const tx = mirror ? m + boxW - 16 * k : m + 16 * k;
    const tw = boxW - size - 40 * k;
    let cy = y + 14 * k;
    const lines = langs.map((l) => ({ l, s: L(l).scanToBook }));
    lines.forEach(({ l, s }, i) => {
      const size2 = i === 0 ? 15 * k : 10 * k;
      for (const line of wrapText(measure, s, tw, size2, i === 0 ? 800 : 500, i === 0 ? T.head : "sans", l, 2)) {
        cy += size2 * 1.25;
        text(p.ops, line, tx, cy, size2, i === 0 ? 800 : 500, i === 0 ? (doc.template === "luxury" ? T.accent : T.ink) : T.muted, mirror ? "right" : "left", l, i === 0 ? T.head : "sans");
      }
    });
    let shown = qrData;
    try {
      const u = new URL(qrData);
      shown = (u.host + u.pathname).replace(/\/$/, "");
    } catch {}
    const urlLines = wrapText(measure, shown, tw, 8 * k, 400, "sans", "en", 1);
    if (urlLines[0] && cy + 16 * k < y + boxH) text(p.ops, urlLines[0], tx, Math.max(cy + 14 * k, y + boxH - 12 * k), 8 * k, 400, T.muted, mirror ? "right" : "left", "en");
  }

  function drawFooter(p: Page, index: number, total: number) {
    const y = H - m + (T.frame ? -4 * k : 4 * k);
    if (doc.showFooter) text(p.ops, L(main).footer, mirror ? W - m : m, y, S.footer, 500, T.muted, mirror ? "right" : "left", main);
    if (total > 1) text(p.ops, `${index + 1}/${total}`, mirror ? m : W - m, y, S.footer, 600, T.muted, mirror ? "left" : "right", main);
    // Small QR on the later pages (and on square posts, which have no room
    // for the big panel).
    if (qrData && (index > 0 || square)) {
      const s = (square ? 58 : 46) * k;
      const qx = mirror ? m : W - m - s;
      const qy = y - s - 10 * k;
      p.ops.push({ t: "rect", x: qx - 3 * k, y: qy - 3 * k, w: s + 6 * k, h: s + 6 * k, r: 5 * k, fill: "#ffffff" });
      p.ops.push({ t: "qr", x: qx, y: qy, size: s, data: qrData, fg: "#111111", bg: "#ffffff" });
      text(p.ops, L(main).scanToBook, mirror ? qx + s + 8 * k : qx - 8 * k, qy + s - 2 * k, 8 * k, 700, T.muted, mirror ? "left" : "right", main);
    }
  }

  // ---- flow
  const colW = (W - 2 * m - gutter * (cols - 1)) / cols;
  const measured = blocks.map((b) => ({
    b,
    h: (b as Block & { measureH: (w: number) => number }).measureH(colW),
  }));

  const newPage = (): { page: Page; top: number; bottom: number } => {
    const page: Page = { w: W, h: H, bg: T.bg, ops: [] };
    drawFrame(page);
    const first = pages.length === 0;
    const top = first ? drawFirstHeader(page) : drawNextHeader(page);
    const footerTop = H - m - footerH - (qrData && (!first || square) ? (square ? 70 : 58) * k : 0);
    const bottom = first && qrData && !square ? footerTop - qrBig - 16 * k - 14 * k : footerTop;
    if (first && qrData && !square) drawQrBlock(page, footerTop - 4 * k);
    pages.push(page);
    return { page, top, bottom };
  };

  let cur = newPage();
  let col = 0;
  let y = cur.top;
  let rowIndex = 0;
  let lastCat = -1;
  const colX = (c: number) => (mirror ? W - m - colW - c * (colW + gutter) : m + c * (colW + gutter));

  const advanceColumn = () => {
    col++;
    if (col >= cols) {
      if (pages.length >= maxPages) return false;
      cur = newPage();
      col = 0;
    }
    y = cur.top;
    return true;
  };

  for (let i = 0; i < measured.length; i++) {
    const { b, h } = measured[i];
    if (b.kind === "heading") {
      const next = measured[i + 1];
      const need = h + (next && next.b.kind === "row" ? next.h : 0);
      if (y + need > cur.bottom && y > cur.top + 1) {
        if (!advanceColumn()) break;
      }
      b.draw(colX(col), y, colW, cur.page.ops, false);
      y += h;
      lastCat = b.catIndex;
      rowIndex = 0;
      continue;
    }
    if (y + h > cur.bottom && y > cur.top + 1) {
      if (!advanceColumn()) break;
      // Repeat the category name, marked as continued, at the new column top.
      const cat = doc.categories[b.catIndex];
      const name = cat.names[main] || Object.values(cat.names).find(Boolean) || "";
      if (name && lastCat === b.catIndex) {
        const ch = S.catSub * 2.2;
        text(cur.page.ops, `${name} (${L(main).cont})`, mirror ? colX(col) + colW : colX(col), y + S.catSub * 1.3, S.catSub, 700, T.accent, mirror ? "right" : "left", main, T.head);
        y += ch;
      }
    }
    b.draw(colX(col), y, colW, cur.page.ops, rowIndex % 2 === 1);
    y += h;
    rowIndex++;
  }

  pages.forEach((p, i) => drawFooter(p, i, pages.length));
  return pages;
}
