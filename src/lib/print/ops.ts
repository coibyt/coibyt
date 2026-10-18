/** Drawing operations shared by the free print tools (price list, QR poster).
 *
 * A tool lays its document out once, in the browser, as pages of these ops
 * (positions in PDF points). The same pages are then drawn by the canvas
 * renderer (live preview, PNG) and by the server's PDF renderer, so the
 * download always matches the preview. Keep this file free of browser- or
 * Node-only imports. */

export type FontFamily = "sans" | "serif";
export type Align = "left" | "right" | "center";

export type Op =
  | { t: "text"; x: number; y: number; text: string; size: number; weight: number; family: FontFamily; color: string; align: Align; lang: string }
  | { t: "rect"; x: number; y: number; w: number; h: number; r?: number; fill?: string; stroke?: string; lw?: number; dash?: [number, number] }
  | { t: "line"; x1: number; y1: number; x2: number; y2: number; color: string; lw: number; dash?: [number, number] }
  | { t: "circle"; cx: number; cy: number; r: number; fill?: string; stroke?: string; lw?: number; dash?: [number, number] }
  /** An SVG path (`d`, in its own units) placed at x,y and scaled by `scale`
   * — icons and decorations. Stroke width is in the path's own units. */
  | { t: "path"; d: string; x: number; y: number; scale: number; fill?: string; stroke?: string; lw?: number }
  /** The document's logo image. */
  | { t: "image"; x: number; y: number; w: number; h: number }
  /** QR code as vector modules. `ec` H tolerates a logo over its centre. */
  | { t: "qr"; x: number; y: number; size: number; data: string; fg: string; bg: string; ec?: "M" | "H" }
  /** Ops drawn in their own coordinate frame: moved by dx,dy, rotated by
   * `rotate` degrees about (cx, cy) of that frame, optionally clipped to a
   * circle (round stickers). */
  | { t: "group"; ops: Op[]; dx?: number; dy?: number; rotate?: number; cx?: number; cy?: number; clip?: { cx: number; cy: number; r: number } };

export interface Page {
  w: number;
  h: number;
  bg: string;
  ops: Op[];
}

export type Measure = (text: string, size: number, weight: number, family: FontFamily, lang: string) => number;

export const RTL_LANGS = new Set(["ar", "he"]);
export const isRtl = (lang: string) => RTL_LANGS.has(lang);
