// Mũi tên hướng lực vẽ trên video: chạy theo thời gian của clip, tự vẽ dần, có nhãn ngắn.
const NS = "http://www.w3.org/2000/svg";
const COL = { foot: ["#f6dc96", "#c9a24a"], hit: ["#ff9a7a", "#d0644b"], body: ["#b9e58f", "#6fae4a"] };

// đường cong mượt đi qua các điểm (Catmull-Rom → Bézier)
function pathOf(pts) {
  if (pts.length === 2) return `M${pts[0]} L${pts[1]}`;
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/**
 * Gắn lớp mũi tên vào `stage` (phần tử chứa video). cues: { tênClip: [...] }.
 * Trả về { setClip(name), setMirror(bool), setOn(bool), destroy() }.
 */
export function mountForce(stage, video, cues, legend) {
  const layer = document.createElement("div");
  layer.className = "force";
  layer.innerHTML = `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        ${Object.entries(COL).map(([k, [a, b]]) => `<linearGradient id="fg-${k}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${b}" stop-opacity=".55"/><stop offset="1" stop-color="${a}"/></linearGradient>`).join("")}
        <filter id="fglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter>
      </defs><g class="arrows"></g></svg>
    <div class="force-labels"></div>
    <div class="force-legend">${legend.map(([k, txt]) => `<span class="lg ${k}"><i></i>${txt}</span>`).join("")}</div>`;
  stage.appendChild(layer);
  const g = layer.querySelector(".arrows"), labels = layer.querySelector(".force-labels");
  let items = [], raf = 0, mirror = false, on = true, clip = null, legendT = 0;

  const build = () => {
    g.innerHTML = ""; labels.innerHTML = ""; items = [];
    const list = (on && clip && cues[clip]) || [];
    layer.classList.toggle("has", list.length > 0);
    // chú thích màu chỉ hiện vài giây đầu mỗi clip để không che nhãn
    layer.classList.remove("legend-off");
    clearTimeout(legendT);
    legendT = setTimeout(() => layer.classList.add("legend-off"), 3500);
    for (const c of list) {
      const pts = c.p.map(([x, y]) => [mirror ? 100 - x : x, y]);
      const d = pathOf(pts);
      const grp = document.createElementNS(NS, "g");
      grp.setAttribute("class", `fa ${c.k}`);
      grp.innerHTML = `<path class="glow" d="${d}" stroke="${COL[c.k][1]}" filter="url(#fglow)"/>
        <path class="main" d="${d}" stroke="url(#fg-${c.k})"/>
        <circle class="origin" cx="${pts[0][0]}" cy="${pts[0][1]}" r="1.4" fill="${COL[c.k][0]}"/>
        <path class="head" d="M0 -2.6 L4.6 0 L0 2.6 L1 0 Z" fill="${COL[c.k][0]}"/>`;
      g.appendChild(grp);
      const main = grp.querySelector(".main"), glow = grp.querySelector(".glow"), head = grp.querySelector(".head");
      const len = main.getTotalLength();
      [main, glow].forEach((p) => { p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
      const lab = document.createElement("div");
      lab.className = `fl ${c.k}`;
      lab.textContent = c.l;
      const lp = c.lp || pts[Math.floor(pts.length / 2)];
      // giữ nhãn trong vùng an toàn (không bị thanh trên và các nút dưới che)
      const lx = Math.min(78, Math.max(22, mirror ? 100 - lp[0] : lp[0]));
      const ly = Math.min(76, Math.max(19, lp[1]));
      lab.style.left = `${lx}%`;
      lab.style.top = `${ly}%`;
      labels.appendChild(lab);
      items.push({ c, grp, main, glow, head, len, lab });
    }
  };

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!items.length) return;
    const t = video.currentTime || 0;
    for (const it of items) {
      const { c } = it;
      const pre = 0.35, post = 0.7;
      const vis = t >= c.t0 - pre && t <= c.t1 + post;
      it.grp.style.opacity = vis ? (t > c.t1 ? Math.max(0, 1 - (t - c.t1) / post) : 1) : 0;
      it.lab.classList.toggle("show", vis && t <= c.t1 + post * 0.6);
      if (!vis) continue;
      const p = Math.max(0, Math.min(1, (t - c.t0) / (c.t1 - c.t0)));
      const off = it.len * (1 - p);
      it.main.style.strokeDashoffset = off; it.glow.style.strokeDashoffset = off;
      const L = Math.max(0.01, it.len * p);
      const a = it.main.getPointAtLength(L), b = it.main.getPointAtLength(Math.max(0, L - 1.2));
      const ang = (Math.atan2(a.y - b.y, a.x - b.x) * 180) / Math.PI;
      it.head.setAttribute("transform", `translate(${a.x} ${a.y}) rotate(${ang})`);
      it.head.style.opacity = p > 0.02 ? 1 : 0;
    }
  };
  raf = requestAnimationFrame(tick);

  return {
    setClip(name) { clip = name; build(); },
    setMirror(m) { mirror = m; build(); },
    setOn(v) { on = v; build(); },
    destroy() { cancelAnimationFrame(raf); clearTimeout(legendT); layer.remove(); },
  };
}
