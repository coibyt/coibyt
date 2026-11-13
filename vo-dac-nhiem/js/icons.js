// Biểu tượng SVG, logo sói, quân hàm (tự thiết kế) và huân chương.
const s = (body, vb = "0 0 24 24", extra = "") =>
  `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

export const I = {
  home: s('<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  map: s('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/>'),
  bolt: s('<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>'),
  user: s('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>'),
  play: s('<path d="M7 4l13 8-13 8V4z" fill="currentColor"/>'),
  pause: s('<path d="M7 4h3v16H7zM14 4h3v16h-3z" fill="currentColor" stroke="none"/>'),
  slow: s('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l-2 2"/><path d="M9 2h6"/>'),
  loop: s('<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 014-4h12"/><path d="M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 01-4 4H4"/>'),
  mirror: s('<path d="M12 3v18"/><path d="M8 7L3 12l5 5V7z"/><path d="M16 7l5 5-5 5V7z"/>'),
  back: s('<path d="M15 5l-7 7 7 7"/>'),
  next: s('<path d="M9 5l7 7-7 7"/>'),
  check: s('<path d="M5 12l5 5 9-10"/>', "0 0 24 24", 'stroke-width="2.6"'),
  lock: s('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'),
  star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6L2.5 9.3l6.6-.8L12 2.5z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#e9a04a" d="M12 2s5 4.5 5 10a5 5 0 01-10 0c0-2 1-3.5 1-3.5S9 11 10.5 11C10.5 7 12 2 12 2z"/><path fill="#f6d27a" d="M12 12s2.5 2 2.5 4.5a2.5 2.5 0 01-5 0C9.5 14.5 12 12 12 12z"/></svg>',
  clock: s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  spark: s('<path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19"/>'),
  warn: s('<path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.01"/>'),
  close: s('<path d="M6 6l12 12M18 6L6 18"/>'),
  list: s('<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>'),
  target: s('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
  volume: s('<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/>'),
  replay: s('<path d="M3 12a9 9 0 109-9 9.7 9.7 0 00-6.7 2.8L3 8"/><path d="M3 3v5h5"/>'),
  expand: s('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
  quiz: s('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 4M12 17h.01"/>'),
};

export const LOGO = `<svg viewBox="0 0 64 64" aria-hidden="true">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e0b4"/><stop offset="1" stop-color="#b08a3e"/></linearGradient></defs>
  <circle cx="32" cy="32" r="29" fill="#11150e" stroke="url(#lg)" stroke-width="2.5"/>
  <circle cx="32" cy="32" r="24.5" fill="none" stroke="#c9a24a" stroke-opacity=".35" stroke-width="1"/>
  <path fill="url(#lg)" d="M17 13l9.5 11.5L32 21l5.5 3.5L47 13l-1.5 19L40 41l-8 11-8-11-5.5-9z"/>
  <path fill="#11150e" d="M23.5 30.5l6 2.5-5 1.5zM40.5 30.5l-6 2.5 5 1.5zM28.5 43.5h7L32 48zM32 25l2.5 9h-5z"/>
  <path fill="#11150e" d="M21 18l4 6-3.2-1zM43 18l-4 6 3.2-1z" opacity=".8"/>
</svg>`;

export const RANKS = [
  { id: "tan-binh", xp: 0 },
  { id: "hoc-vien", xp: 400 },
  { id: "chien-si", xp: 1000 },
  { id: "trinh-sat", xp: 1800 },
  { id: "dac-cong", xp: 2800 },
  { id: "soi-xam", xp: 4000 },
  { id: "soi-dau-dan", xp: 5500 },
];

const starPath = (cx, cy, r) => {
  let d = "";
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(2)} ${(cy + rr * Math.sin(a)).toFixed(2)}`;
  }
  return `<path d="${d}Z" fill="url(#ig)"/>`;
};

// Cầu vai tự thiết kế: không giống quân hàm của quân đội có thật nào.
export function insignia(level) {
  const marks = [];
  if (level === 0) marks.push('<rect x="24" y="44" width="16" height="2.5" rx="1" fill="url(#ig)"/>');
  if (level === 1 || level === 2) {
    for (let i = 0; i < level; i++) marks.push(`<path d="M22 ${40 - i * 8}l10-6 10 6" stroke="url(#ig)" stroke-width="3" fill="none" stroke-linejoin="round"/>`);
  }
  if (level === 3) marks.push(starPath(32, 32, 6));
  if (level === 4) marks.push(starPath(32, 25, 5.5), starPath(32, 40, 5.5));
  if (level === 5) marks.push(starPath(32, 22, 5), starPath(32, 35, 5), '<rect x="23" y="45" width="18" height="3" rx="1" fill="url(#ig)"/>');
  if (level === 6) {
    marks.push('<path fill="url(#ig)" d="M24 18l4.5 5.5L32 22l3.5 1.5L40 18l-.8 9L36 32l-4 5-4-5-3.2-5z"/>');
    marks.push(starPath(32, 44, 4.5), '<rect x="22" y="50" width="20" height="2.5" rx="1" fill="url(#ig)"/>');
  }
  return `<svg class="ins" viewBox="0 0 64 64" aria-hidden="true">
    <defs><linearGradient id="ig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e0b4"/><stop offset="1" stop-color="#b08a3e"/></linearGradient>
    <linearGradient id="ib" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a5733"/><stop offset="1" stop-color="#262e1a"/></linearGradient></defs>
    <path d="M18 14l14-9 14 9v42a4 4 0 01-4 4H22a4 4 0 01-4-4z" fill="url(#ib)" stroke="url(#ig)" stroke-width="2"/>
    <circle cx="32" cy="11" r="2" fill="url(#ig)"/>
    ${marks.join("")}
  </svg>`;
}

const GLYPH = {
  fall: '<path d="M22 40c4-10 10-14 20-14" stroke="#1a1408" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="26" r="4" fill="#1a1408"/>',
  flame3: '<path fill="#1a1408" d="M32 18s7 6 7 13a7 7 0 01-14 0c0-3 1.5-5 1.5-5S28 30 30 30c0-5 2-12 2-12z"/><text x="32" y="47" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="10" fill="#1a1408">3</text>',
  flame7: '<path fill="#1a1408" d="M32 18s7 6 7 13a7 7 0 01-14 0c0-3 1.5-5 1.5-5S28 30 30 30c0-5 2-12 2-12z"/><text x="32" y="47" text-anchor="middle" font-family="Oswald" font-weight="700" font-size="10" fill="#1a1408">7</text>',
  perfect: '<path d="M22 32l7 7 13-14" stroke="#1a1408" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  drill: '<path fill="#1a1408" d="M34 16L23 33h8l-2 13 12-18h-8z"/>',
  early: '<circle cx="32" cy="34" r="6" fill="#1a1408"/><path d="M32 20v4M20 34h4M40 34h4M23.5 25.5l2.8 2.8M40.5 25.5l-2.8 2.8M20 42h24" stroke="#1a1408" stroke-width="2.5" stroke-linecap="round"/>',
  night: '<path fill="#1a1408" d="M36 18a12 12 0 1010 18 10 10 0 01-10-18z"/>',
  track: '<path fill="#1a1408" d="M22 19l5 6 5-2.5 5 2.5 5-6-1 10-5 6-4 6-4-6-5-6z"/>',
  grad: '<path fill="#1a1408" d="M32 16l12 5v9c0 8-5 13-12 16-7-3-12-8-12-16v-9z"/><path fill="#d1ad5c" d="M32 23l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z"/>',
  checks: '<rect x="22" y="20" width="20" height="24" rx="3" fill="none" stroke="#1a1408" stroke-width="2.5"/><path d="M26 30l3 3 6-6M26 38h12" stroke="#1a1408" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
};

export function medal(glyph) {
  return `<svg class="medal" viewBox="0 0 64 64" aria-hidden="true">
    <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4e4b9"/><stop offset=".55" stop-color="#d1ad5c"/><stop offset="1" stop-color="#9c7731"/></linearGradient></defs>
    <path d="M22 2h8l4 14h-8zM42 2h-8l-4 14h8z" fill="#4a5733"/>
    <circle cx="32" cy="36" r="22" fill="url(#mg)" stroke="#7a5d24" stroke-width="1.5"/>
    <circle cx="32" cy="36" r="17.5" fill="none" stroke="#1a1408" stroke-opacity=".35" stroke-width="1"/>
    <g transform="translate(0 4)">${GLYPH[glyph] || ""}</g>
  </svg>`;
}

export function ring(pct, size = 44, label = "") {
  const r = (size - 6) / 2, c = 2 * Math.PI * r;
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="rgba(10,12,9,.7)" stroke="rgba(255,255,255,.14)" stroke-width="3"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#e8d3a6" stroke-width="3" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle" fill="#e8d3a6" font-family="Oswald" font-size="${size * 0.27}">${label}</text>
  </svg>`;
}
