import { zlibSync } from "fflate";
import { drawPage } from "./canvas";
import type { Page } from "./ops";

/** Builds the PDF in the browser, for when the server can't.
 *
 * Each page is drawn on a canvas at print resolution (300 dpi) and stored
 * losslessly, so text and QR codes stay sharp on paper. The server's PDF is
 * still the better one — real vector outlines, a smaller file — which is why
 * this is only the fallback. */

// 300 dpi on paper; phones refuse canvases much beyond ~16 million pixels.
const DPI_SCALE = 300 / 72;
const MAX_PIXELS = 9_000_000;

const ascii = (s: string) => {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i) & 0xff;
  return out;
};
const num = (v: number) => (Math.round(v * 100) / 100).toString();

function pageImage(page: Page, logo: HTMLImageElement | null) {
  const scale = Math.min(DPI_SCALE, Math.sqrt(MAX_PIXELS / (page.w * page.h)));
  const c = document.createElement("canvas");
  c.width = Math.round(page.w * scale);
  c.height = Math.round(page.h * scale);
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("NO_CANVAS");
  drawPage(ctx, page, scale, logo);
  const rgba = ctx.getImageData(0, 0, c.width, c.height).data;
  // PDF wants plain RGB; the page background is opaque, so alpha is dropped.
  const rgb = new Uint8Array(c.width * c.height * 3);
  for (let i = 0, o = 0; i < rgba.length; i += 4, o += 3) {
    rgb[o] = rgba[i];
    rgb[o + 1] = rgba[i + 1];
    rgb[o + 2] = rgba[i + 2];
  }
  const data = zlibSync(rgb, { level: 6 });
  // Give the canvas memory back before the next page.
  c.width = c.height = 0;
  return { w: Math.round(page.w * scale), h: Math.round(page.h * scale), data };
}

export async function pagesToPdfBlob(pages: Page[], logo: HTMLImageElement | null, title: string): Promise<Blob> {
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let length = 0;
  const push = (chunk: Uint8Array | string) => {
    const bytes = typeof chunk === "string" ? ascii(chunk) : chunk;
    parts.push(bytes);
    length += bytes.length;
  };
  const begin = (id: number) => {
    offsets[id] = length;
    push(`${id} 0 obj\n`);
  };

  // Objects: 1 catalog, 2 page tree, 3 info, then page / content / image per page.
  const pageId = (i: number) => 4 + i * 3;
  push("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n");
  begin(1);
  push("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  begin(2);
  push(`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_, i) => `${pageId(i)} 0 R`).join(" ")}] >>\nendobj\n`);
  begin(3);
  // The title as UTF-16 hex, so any language survives.
  const hex = Array.from(title.slice(0, 200))
    .flatMap((ch) => Array.from({ length: ch.length }, (_, k) => ch.charCodeAt(k).toString(16).padStart(4, "0")))
    .join("");
  push(`<< /Title <FEFF${hex}> /Creator (VaraaAi.com) /Producer (VaraaAi.com) >>\nendobj\n`);

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const img = pageImage(page, logo);
    const id = pageId(i);
    begin(id);
    push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${num(page.w)} ${num(page.h)}] /Contents ${id + 1} 0 R ` +
        `/Resources << /XObject << /Im0 ${id + 2} 0 R >> >> >>\nendobj\n`,
    );
    const content = `q ${num(page.w)} 0 0 ${num(page.h)} 0 0 cm /Im0 Do Q`;
    begin(id + 1);
    push(`<< /Length ${content.length} >>\nstream\n${content}\nendstream\nendobj\n`);
    begin(id + 2);
    push(
      `<< /Type /XObject /Subtype /Image /Width ${img.w} /Height ${img.h} /ColorSpace /DeviceRGB ` +
        `/BitsPerComponent 8 /Filter /FlateDecode /Length ${img.data.length} >>\nstream\n`,
    );
    push(img.data);
    push("\nendstream\nendobj\n");
    // Let the page breathe between pages — a long price list is many canvases.
    await new Promise((r) => setTimeout(r, 0));
  }

  const count = 4 + pages.length * 3;
  const xref = length;
  push(`xref\n0 ${count}\n0000000000 65535 f \n`);
  for (let id = 1; id < count; id++) push(`${String(offsets[id]).padStart(10, "0")} 00000 n \n`);
  push(`trailer\n<< /Size ${count} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF\n`);

  return new Blob(parts.map((p) => new Uint8Array(p)), { type: "application/pdf" });
}
