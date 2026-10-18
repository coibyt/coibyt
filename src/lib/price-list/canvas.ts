"use client";

/** Browser side of the price-list renderer: font loading, text measuring
 * for the layout engine, and drawing laid-out pages onto a canvas (live
 * preview and PNG export). The browser shapes every script itself. */
import { isRtl } from "./types";
import { qrMatrix } from "./qr";
import type { FontFamily, Measure, Page } from "./layout";

function stack(family: FontFamily, lang: string) {
  const cjk = lang === "ja" ? '"Noto Sans JP", "Noto Sans SC", "Noto Sans KR"' : lang === "ko" ? '"Noto Sans KR", "Noto Sans SC", "Noto Sans JP"' : '"Noto Sans SC", "Noto Sans JP", "Noto Sans KR"';
  return `${family === "serif" ? '"Playfair Display", ' : ""}"Noto Sans", "Noto Sans Thai", "Noto Sans Khmer", "Noto Sans Arabic", "Noto Sans Hebrew", "Noto Sans Devanagari", ${cjk}, sans-serif`;
}

export function fontString(size: number, weight: number, family: FontFamily, lang: string) {
  return `${Math.round(weight)} ${size}px ${stack(family, lang)}`;
}

/** Makes sure every font slice needed for `texts` is downloaded before the
 * layout measures anything (Google Fonts ships each script as its own
 * unicode-range slice, fetched on demand). */
export async function ensureFonts(texts: string[], weights: number[] = [400, 500, 600, 700, 800]) {
  if (typeof document === "undefined" || !document.fonts) return;
  const sample = Array.from(new Set(texts.join("").replace(/\s+/g, ""))).join("").slice(0, 4000) || "Aa";
  const families = ["Noto Sans", "Playfair Display", "Noto Sans Thai", "Noto Sans Khmer", "Noto Sans Arabic", "Noto Sans Hebrew", "Noto Sans Devanagari", "Noto Sans SC", "Noto Sans JP", "Noto Sans KR"];
  await Promise.all(
    families.flatMap((f) => weights.map((w) => document.fonts.load(`${w} 16px "${f}"`, sample).catch(() => [])))
  );
}

let measureCtx: CanvasRenderingContext2D | null = null;
const widthCache = new Map<string, number>();

export const canvasMeasure: Measure = (text, size, weight, family, lang) => {
  if (!text) return 0;
  const key = `${size}|${weight}|${family}|${lang}|${text}`;
  const hit = widthCache.get(key);
  if (hit !== undefined) return hit;
  measureCtx ??= document.createElement("canvas").getContext("2d");
  const ctx = measureCtx!;
  // Measure at 100px for precision, then scale.
  ctx.font = fontString(100, weight, family, lang);
  const w = (ctx.measureText(text).width / 100) * size * 1.01;
  if (widthCache.size > 20_000) widthCache.clear();
  widthCache.set(key, w);
  return w;
};

export function clearMeasureCache() {
  widthCache.clear();
}

export function drawPage(ctx: CanvasRenderingContext2D, page: Page, scale: number, logo: HTMLImageElement | null) {
  ctx.save();
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.fillStyle = page.bg;
  ctx.fillRect(0, 0, page.w, page.h);
  for (const op of page.ops) {
    if (op.t === "rect") {
      ctx.beginPath();
      if (op.r) ctx.roundRect(op.x, op.y, op.w, op.h, op.r);
      else ctx.rect(op.x, op.y, op.w, op.h);
      if (op.fill) {
        ctx.fillStyle = op.fill;
        ctx.fill();
      }
      if (op.stroke) {
        ctx.strokeStyle = op.stroke;
        ctx.lineWidth = op.lw ?? 1;
        ctx.stroke();
      }
    } else if (op.t === "line") {
      ctx.beginPath();
      ctx.moveTo(op.x1, op.y1);
      ctx.lineTo(op.x2, op.y2);
      ctx.strokeStyle = op.color;
      ctx.lineWidth = op.lw;
      ctx.lineCap = "round";
      ctx.setLineDash(op.dash ?? []);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (op.t === "image") {
      if (logo) ctx.drawImage(logo, op.x, op.y, op.w, op.h);
    } else if (op.t === "qr") {
      const { size, dark } = qrMatrix(op.data);
      const cell = op.size / size;
      ctx.fillStyle = op.bg;
      ctx.fillRect(op.x, op.y, op.size, op.size);
      ctx.fillStyle = op.fg;
      for (let r = 0; r < size; r++)
        for (let c = 0; c < size; c++) if (dark(r, c)) ctx.fillRect(op.x + c * cell, op.y + r * cell, cell + 0.02, cell + 0.02);
    } else if (op.t === "text") {
      ctx.font = fontString(op.size, op.weight, op.family, op.lang);
      ctx.fillStyle = op.color;
      ctx.direction = isRtl(op.lang) ? "rtl" : "ltr";
      ctx.textAlign = op.align;
      ctx.textBaseline = "alphabetic";
      ctx.fillText(op.text, op.x, op.y);
    }
  }
  ctx.restore();
}

/** Renders one page to a PNG blob at `scale` pixels per point. */
export function pageToPng(page: Page, scale: number, logo: HTMLImageElement | null): Promise<Blob | null> {
  const c = document.createElement("canvas");
  c.width = Math.round(page.w * scale);
  c.height = Math.round(page.h * scale);
  drawPage(c.getContext("2d")!, page, scale, logo);
  return new Promise((resolve) => c.toBlob(resolve, "image/png"));
}
