// Sơ đồ bước chân (nhìn từ trên xuống): luôn đúng thứ tự chân, bổ sung cho clip quay.
// Người thuận tay phải: chân TRÁI trước, chân PHẢI sau. Mặt hướng lên trên.

const BASE = { L: { x: 128, y: 92, r: 12 }, R: { x: 178, y: 158, r: 38 } };
const mv = (f, dx, dy) => ({ x: f.x + dx, y: f.y + dy, r: f.r });

function frames(type, T) {
  const B = BASE;
  if (type === "stance") {
    return [
      { L: B.L, R: B.R, cap: T.stance1, hi: "L" },
      { L: B.L, R: B.R, cap: T.stance2, hi: "R" },
      { L: B.L, R: B.R, cap: T.stance3, hi: null, guide: true },
    ];
  }
  if (type === "fwdback") {
    const L1 = mv(B.L, 0, -42), R1 = mv(B.R, 0, -42);
    return [
      { L: B.L, R: B.R, cap: T.ready, hi: null },
      { L: L1, R: B.R, cap: T.fb1, hi: "L", n: 1 },
      { L: L1, R: R1, cap: T.fb2, hi: "R", n: 2 },
      { L: L1, R: B.R, cap: T.fb3, hi: "R", n: 3 },
      { L: B.L, R: B.R, cap: T.fb4, hi: "L", n: 4 },
    ];
  }
  if (type === "side") {
    const L1 = mv(B.L, -44, 0), R1 = mv(B.R, -44, 0);
    return [
      { L: B.L, R: B.R, cap: T.ready, hi: null },
      { L: L1, R: B.R, cap: T.sd1, hi: "L", n: 1 },
      { L: L1, R: R1, cap: T.sd2, hi: "R", n: 2 },
      { L: L1, R: B.R, cap: T.sd3, hi: "R", n: 3 },
      { L: B.L, R: B.R, cap: T.sd4, hi: "L", n: 4 },
    ];
  }
  if (type === "angle") {
    const L1 = mv(B.L, 34, -34), R1 = mv(B.R, 34, -34);
    return [
      { L: B.L, R: B.R, cap: T.ready, hi: null, attack: true },
      { L: L1, R: B.R, cap: T.an1, hi: "L", n: 1, attack: true },
      { L: L1, R: R1, cap: T.an2, hi: "R", n: 2, attack: true },
      { L: B.L, R: B.R, cap: T.an3, hi: null, attack: true },
    ];
  }
  if (type === "pivot") {
    const out = [{ L: B.L, R: B.R, cap: T.ready, hi: null, pivot: true }];
    const dx = B.R.x - B.L.x, dy = B.R.y - B.L.y;
    for (let a = 15; a <= 90; a += 15) {
      const t = (-a * Math.PI) / 180;
      out.push({
        L: { ...B.L, r: B.L.r - a }, R: { x: B.L.x + dx * Math.cos(t) - dy * Math.sin(t), y: B.L.y + dx * Math.sin(t) + dy * Math.cos(t), r: B.R.r - a },
        cap: T.pv1, hi: "R", n: 1, pivot: true, quick: a < 90, face: -a,
      });
    }
    out.push({ L: B.L, R: B.R, cap: T.pv2, hi: "R", n: 2, pivot: true });
    return out;
  }
  return [];
}

const sole = (label) => `<path d="M0 -30 C 13 -30 15 -14 13 0 C 12 14 10 28 0 30 C -10 28 -12 14 -13 0 C -15 -14 -13 -30 0 -30 Z" class="sole"/>
  <circle cx="0" cy="-17" r="5" class="toe"/><text x="0" y="12" text-anchor="middle" class="lab">${label}</text>`;

/** Gắn sơ đồ vào `host`. Trả về hàm dừng hoạt hình. */
export function mountFeet(host, type, T) {
  const fr = frames(type, T);
  if (!fr.length) return () => {};
  host.innerHTML = `<div class="feet-h"><span class="eyebrow">${T.title}</span><span class="feet-n" aria-live="polite"></span></div>
    <svg viewBox="0 0 300 230" class="feet-svg" role="img" aria-label="${T.title}">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#c9a24a"/></marker></defs>
      <g class="grid">${Array.from({ length: 7 }, (_, i) => `<line x1="${20 + i * 43}" y1="10" x2="${20 + i * 43}" y2="220"/>`).join("")}${Array.from({ length: 5 }, (_, i) => `<line x1="10" y1="${15 + i * 50}" x2="290" y2="${15 + i * 50}"/>`).join("")}</g>
      <g class="face" style="transform-origin:128px 92px"><line x1="150" y1="60" x2="150" y2="22" marker-end="url(#ah)"/><text x="160" y="30" class="facet">${T.facing}</text></g>
      <line class="guide" x1="128" y1="40" x2="128" y2="210"/><line class="guide" x1="178" y1="40" x2="178" y2="210"/>
      <g class="attack"><line x1="128" y1="-10" x2="128" y2="40" marker-end="url(#ah)"/><text x="60" y="20" class="facet">${T.attackLine}</text></g>
      <circle class="pivotdot" cx="128" cy="92" r="9"/>
      <g class="foot L"><g class="in">${sole(T.left)}</g></g>
      <g class="foot R"><g class="in">${sole(T.right)}</g></g>
    </svg>
    <p class="feet-cap"></p><p class="feet-note">${T.lefty}</p>`;
  const svg = host.querySelector("svg");
  const footL = svg.querySelector(".foot.L"), footR = svg.querySelector(".foot.R");
  const cap = host.querySelector(".feet-cap"), num = host.querySelector(".feet-n");
  const set = (g, f, quick) => {
    g.style.transition = `transform ${quick ? 0.16 : 0.65}s cubic-bezier(.3,.7,.3,1)`;
    g.style.transform = `translate(${f.x}px, ${f.y}px) rotate(${f.r}deg)`;
  };
  let i = 0, timer = 0, dead = false;
  const step = () => {
    if (dead) return;
    const f = fr[i];
    set(footL, f.L, f.quick); set(footR, f.R, f.quick);
    footL.classList.toggle("hi", f.hi === "L"); footR.classList.toggle("hi", f.hi === "R");
    svg.classList.toggle("show-guide", !!f.guide);
    svg.classList.toggle("show-attack", !!f.attack);
    svg.classList.toggle("show-pivot", !!f.pivot);
    svg.querySelector(".face").style.transform = `rotate(${f.face || 0}deg)`;
    if (!f.quick || i === fr.length - 1) { cap.textContent = f.cap; num.textContent = f.n ? `${f.n}/${fr.filter((x) => x.n && !x.quick).length || 1}` : ""; }
    const hold = f.quick ? 170 : i === 0 ? 1300 : 1700;
    i = (i + 1) % fr.length;
    timer = setTimeout(step, hold);
  };
  step();
  return () => { dead = true; clearTimeout(timer); };
}
