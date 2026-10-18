import type { FontFamily, Measure } from "./ops";

const segmenters = new Map<string, Intl.Segmenter | null>();
// Scripts written without spaces between words — only these need a
// dictionary-based word segmenter; everything else breaks at spaces, so
// "16:00" or "2D–3D" never get split in the middle.
const NO_SPACE_SCRIPTS = /[\u0E00-\u0EFF\u1000-\u109F\u1780-\u17FF\u3040-\u30FF\u3400-\u9FFF\uF900-\uFAFF]/;
function segmentWords(text: string, lang: string): string[] {
  if (!NO_SPACE_SCRIPTS.test(text)) return text.split(/(\s+)/).filter(Boolean);
  let seg = segmenters.get(lang);
  if (seg === undefined) {
    try {
      seg = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(lang, { granularity: "word" }) : null;
    } catch {
      seg = null;
    }
    segmenters.set(lang, seg);
  }
  if (!seg) return text.split(/(\s+)/).filter(Boolean);
  return Array.from(seg.segment(text), (s) => s.segment);
}

/** Greedy line breaking on word boundaries (Thai, Khmer and CJK included,
 * via Intl.Segmenter), splitting an over-long word by characters. */
export function wrapText(
  measure: Measure,
  text: string,
  maxW: number,
  size: number,
  weight: number,
  family: FontFamily,
  lang: string,
  maxLines = 4
): string[] {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return [];
  const fits = (s: string) => measure(s, size, weight, family, lang) <= maxW;
  if (fits(clean)) return [clean];
  const lines: string[] = [];
  let cur = "";
  const push = () => {
    if (cur.trim()) lines.push(cur.trim());
    cur = "";
  };
  for (const token of segmentWords(clean, lang)) {
    if (fits(cur + token)) {
      cur += token;
      continue;
    }
    if (cur.trim()) push();
    if (fits(token.trimStart())) {
      cur = token.trimStart();
      continue;
    }
    for (const ch of Array.from(token)) {
      if (!fits(cur + ch)) push();
      cur += ch;
    }
  }
  push();
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    let last = kept[maxLines - 1];
    while (last && !fits(last + "…")) last = Array.from(last).slice(0, -1).join("");
    kept[maxLines - 1] = last + "…";
    return kept;
  }
  return lines;
}

/** Largest font size (≤ max, ≥ min) at which `text` wraps into `maxLines`
 * lines of `maxW` — for headlines that should fill their space. */
export function fitText(
  measure: Measure,
  text: string,
  maxW: number,
  max: number,
  min: number,
  weight: number,
  family: FontFamily,
  lang: string,
  maxLines: number
): { size: number; lines: string[] } {
  for (let size = max; size > min; size *= 0.94) {
    const lines = wrapText(measure, text, maxW, size, weight, family, lang, maxLines + 1);
    if (lines.length <= maxLines) return { size, lines };
  }
  return { size: min, lines: wrapText(measure, text, maxW, min, weight, family, lang, maxLines) };
}
