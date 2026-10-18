export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: number[]) {
  return "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}

/** Blends `hex` toward `toward` by `amount` (0 = hex, 1 = toward). */
export function mix(hex: string, toward: string, amount: number) {
  const a = hexToRgb(hex);
  const b = hexToRgb(toward);
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * amount));
}

export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** A version of `accent` with at least `ratio` contrast against `bg`. */
export function readable(accent: string, bg: string, ratio = 4.5) {
  const light = luminance(bg) > 0.5;
  let c = accent;
  for (let i = 0; i < 6; i++) {
    const l1 = luminance(c);
    const l2 = luminance(bg);
    if ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) >= ratio) break;
    c = mix(c, light ? "#000000" : "#ffffff", 0.25);
  }
  return c;
}

/** Black or white, whichever reads better on `bg`. */
export function onColor(bg: string) {
  return luminance(bg) > 0.45 ? "#15181c" : "#ffffff";
}
