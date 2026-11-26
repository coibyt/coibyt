/* BizStory English · trình phát (điện thoại trước). Không phụ thuộc thư viện ngoài. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const A = $("#audio"), C = $("#clip");
  const INTERVALS = [1, 3, 7, 14];
  const SPEEDS = [0.8, 0.9, 1.0, 1.1, 1.25, 1.5];
  const store = {
    get(k, d) { try { const v = localStorage.getItem("bz." + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("bz." + k, JSON.stringify(v)); } catch { /* chế độ riêng tư */ } },
  };
  const S = { days: [], day: null, data: null, segs: [], chaps: [], phrases: {}, cur: -1, chap: -1, api: false,
              sleep: null, follow: true, flash: null };

  // ---------------- tiện ích
  const today = () => new Date().toLocaleDateString("sv-SE");
  const addDays = (d, n) => { const x = new Date(d + "T12:00:00"); x.setDate(x.getDate() + n); return x.toLocaleDateString("sv-SE"); };
  const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return h ? `${h}:${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}` : `${m}:${String(x).padStart(2, "0")}`; };
  const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const base = () => S.days.find((d) => d.day === S.day)?.base || `media/day_${String(S.day).padStart(2, "0")}/`;
  const toast = (msg) => { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => (t.hidden = true), 2200); };
  const COHOST = { word_vi: "Từ vựng", word_example_vi: "Từ vựng", sentence_vi: "Nghe hiểu", words_intro: "Từ vựng", sentences_intro: "Nghe hiểu" };
  const label = (s) => s.role === "word" || s.role === "word_example" ? "Từ vựng"
    : s.kind === "sentence" ? "Câu nghe hiểu" + (s.speed !== 1 ? " · 0.85×" : "")
    : s.kind === "phrase" ? (s.speed !== 1 ? "English · 0.85×" : "English")
    : s.lang === "vi" ? (COHOST[s.role] || (s.layer === 2 ? "Luyện nhanh" : s.part === 4 ? "Ôn tập" : (s.speaker === "vn_cohost" ? "Người dẫn phụ" : "Người dẫn")))
    : (s.speaker || "").startsWith("en_") ? "Narrator" : s.speaker;

  function bsearch(t) {
    let lo = 0, hi = S.segs.length - 1, ans = -1;
    while (lo <= hi) { const m = (lo + hi) >> 1; if (S.segs[m].t <= t + 0.05) { ans = m; lo = m + 1; } else hi = m - 1; }
    return ans;
  }
  function highlight(seg) {
    let html = esc(seg.text);
    const keys = seg.phrase_hits || [];
    for (const k of keys) {
      const p = S.phrases[k]; if (!p) continue;
      for (const f of (p.forms || [p.en.replace(/[.!?]$/, "")])) {
        const re = new RegExp(`(${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/'/g, "['’]")})`, "i");
        if (re.test(html)) { html = html.replace(re, `<span class="ph${p.kind === "word" ? " w" : ""}" data-k="${k}">$1</span>`); break; }
      }
    }
    if (seg.kind === "phrase" && seg.phrase_id) html = `<span class="ph" data-k="${seg.phrase_id}">${html}</span>`;
    return html;
  }

  // ---------------- tải dữ liệu
  async function boot() {
    try { S.days = await (await fetch("data/days.json", { cache: "no-cache" })).json(); } catch { S.days = []; }
    fetch("api/stats").then((r) => { S.api = r.ok; }).catch(() => {});
    renderArchive();
    const want = Number((location.hash.match(/day=(\d+)/) || [])[1]) || store.get("lastDay", 0) || S.days[0]?.day;
    if (want) await loadDay(want, false);
    else { $("#capText").textContent = "Chưa có tập nào. Hãy dựng một ngày bằng CLI."; }
    const v = (location.hash.match(/#(listen|text|book|archive|stats)/) || [])[1];
    go(v || "listen");
    refreshStats(); renderBook();
  }

  async function loadDay(n, autoplay) {
    const meta = S.days.find((d) => d.day === n);
    const url = meta ? meta.data : `data/day_${String(n).padStart(2, "0")}.json`;
    const data = await (await fetch(url, { cache: "no-cache" })).json();
    S.day = n; S.data = data; S.segs = data.segments; S.chaps = data.chapters; S.cur = -1; S.chap = -1;
    S.phrases = Object.fromEntries(data.phrases.map((p) => [p.key, p]));
    store.set("lastDay", n);
    // ghi cụm vào sổ tay
    const book = store.get("book", {});
    for (const p of data.phrases) if (!p.review_only) book[p.key] = { ...p, day: n, date: data.date, base: base() };
    store.set("book", book);
    A.src = base() + data.audio;
    $("#bDownload").href = A.src; $("#bDownload").setAttribute("download", `BizStory-ngay-${n}.mp3`);
    A.playbackRate = store.get("speed", 1);
    $("#dayLabel").textContent = `Ngày ${n} · ${data.date}` + (data.mode === "short" ? " · bản thử" : "");
    renderChapters(); renderTranscript(); renderArchive(); renderBook();
    $("#tDur").textContent = fmt(data.duration);
    const pos = store.get("pos." + n, 0);
    A.addEventListener("loadedmetadata", function once() { A.removeEventListener("loadedmetadata", once);
      if (pos > 5 && pos < A.duration - 5) A.currentTime = pos; tick(true); }, { once: true });
    tick(true);
    if (autoplay) A.play().catch(() => {});
  }

  // ---------------- chương & thanh tiến trình
  function renderChapters() {
    const ol = $("#chapList"); ol.innerHTML = "";
    let lastPart = null;
    S.chaps.forEach((c, i) => {
      const li = document.createElement("li");
      const partStart = c.part !== lastPart; lastPart = c.part;
      li.className = (partStart ? "part-start" : "sub");
      li.innerHTML = `<span>${esc(c.title)}</span><span class="t">${fmt(c.t)}</span>`;
      li.onclick = () => { A.currentTime = c.t + 0.01; A.play().catch(() => {}); };
      ol.appendChild(li);
    });
    $("#chapCount").textContent = `${S.chaps.length} mốc · ${fmt(S.data.duration)}`;
    const ticks = $("#ticks"); ticks.innerHTML = "";
    let lp = null;
    for (const c of S.chaps) {
      const i = document.createElement("i"); i.style.left = (c.t / S.data.duration * 100) + "%";
      if (c.part !== lp) i.className = "part"; lp = c.part; ticks.appendChild(i);
    }
  }
  const chapAt = (t) => { let k = 0; S.chaps.forEach((c, i) => { if (c.t <= t + 0.05) k = i; }); return k; };

  function setChapter(k) {
    if (k === S.chap || !S.chaps.length) return;
    S.chap = k;
    const c = S.chaps[k];
    [...$("#chapList").children].forEach((li, i) => li.classList.toggle("on", i === k));
    const part = S.data.parts.find((p) => p.part === c.part);
    const covers = S.data.covers || {};
    const img = (part && part.cover) || covers[String(c.part)] || covers["0"] || "img/hero.webp";
    const ci = $("#coverImg"); if (!ci.src.endsWith(img)) { ci.style.opacity = 0; ci.onload = () => (ci.style.opacity = 1); ci.src = img; }
    $("#partTitle").textContent = part ? part.title_vi : (c.part === 4 ? "Ôn tập SRS" : S.data.title_vi);
    $("#layerTitle").textContent = c.title;
    $("#tChap").textContent = c.title;
    $("#miniTitle").textContent = part ? part.title_vi : S.data.title_vi;
    $("#miniSub").textContent = c.title;
    mediaMeta(c, img, part);
  }

  function mediaMeta(c, img, part) {
    if (!("mediaSession" in navigator)) return;
    const abs = new URL(img, location.href).href;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: c.title, artist: `BizStory English · Ngày ${S.day}`, album: part ? part.title_vi : S.data.title_vi,
      artwork: [{ src: abs, sizes: "1024x1024", type: "image/webp" }, { src: new URL("icon-512.png", location.href).href, sizes: "512x512", type: "image/png" }],
    });
  }
  function mediaHandlers() {
    if (!("mediaSession" in navigator)) return;
    const h = {
      play: () => A.play(), pause: () => A.pause(),
      seekbackward: (d) => { A.currentTime = Math.max(0, A.currentTime - (d.seekOffset || 15)); },
      seekforward: (d) => { A.currentTime = Math.min(A.duration || 1e9, A.currentTime + (d.seekOffset || 30)); },
      previoustrack: () => jumpChapter(-1), nexttrack: () => jumpChapter(1),
      seekto: (d) => { A.currentTime = d.seekTime; },
    };
    for (const [k, f] of Object.entries(h)) { try { navigator.mediaSession.setActionHandler(k, f); } catch { /* không hỗ trợ */ } }
  }
  function jumpChapter(dir) {
    const k = chapAt(A.currentTime);
    const c = S.chaps[k];
    let target = dir < 0 ? (A.currentTime - c.t > 4 ? k : k - 1) : k + 1;
    target = Math.max(0, Math.min(S.chaps.length - 1, target));
    A.currentTime = S.chaps[target].t + 0.01;
  }

  // ---------------- vòng cập nhật
  let lastReal = 0, lastSave = 0, lastPos = 0;
  function tick(force) {
    const t = A.currentTime || 0, d = A.duration || S.data?.duration || 1;
    const pct = Math.min(100, t / d * 100);
    $("#fill").style.width = pct + "%"; $("#knob").style.left = pct + "%"; $("#miniFill").style.width = pct + "%";
    $("#tCur").textContent = fmt(t);
    if (A.buffered.length) $("#buffer").style.width = (A.buffered.end(A.buffered.length - 1) / d * 100) + "%";
    if (!S.segs.length) return;
    setChapter(chapAt(t));
    const i = bsearch(t);
    if (i !== S.cur || force) {
      S.cur = i;
      const s = S.segs[Math.max(0, i)];
      if (s) {
        const cap = $("#caption");
        if (s.kind === "sfx") { /* giữ câu trước */ } else {
          cap.classList.toggle("en", s.lang === "en");
          $("#capSpeaker").textContent = label(s);
          $("#capText").innerHTML = highlight(s);
          if (s.kind === "phrase" && s.phrase_id) markSeen(s.phrase_id);
        }
        const prev = document.querySelector(".seg.now"); if (prev) prev.classList.remove("now");
        const el = document.querySelector(`.seg[data-i="${s.i}"]`) || nearestSegEl(i);
        if (el) { el.classList.add("now"); if (S.follow && $("#autoScroll").checked && !$("#v-text").hidden) el.scrollIntoView({ block: "center", behavior: force ? "auto" : "smooth" }); }
      }
    }
    if ("mediaSession" in navigator && navigator.mediaSession.setPositionState && A.duration && Math.abs(t - lastPos) > 5) {
      lastPos = t; try { navigator.mediaSession.setPositionState({ duration: A.duration, position: t, playbackRate: A.playbackRate }); } catch { /* */ }
    }
  }
  function nearestSegEl(i) { for (let k = i; k >= 0 && k > i - 4; k--) { const e = document.querySelector(`.seg[data-i="${S.segs[k]?.i}"]`); if (e) return e; } return null; }

  A.addEventListener("timeupdate", () => {
    tick(false);
    const now = performance.now();
    if (!A.paused && lastReal) {
      const dt = (now - lastReal) / 1000;
      if (dt > 0 && dt < 3) { const L = store.get("listen", {}); L[today()] = (L[today()] || 0) + dt; S._listen = L; }
    }
    lastReal = A.paused ? 0 : now;
    if (now - lastSave > 8000) { lastSave = now; savePos(); if (S._listen) store.set("listen", S._listen); refreshPills(); }
    if (S.sleep && S.sleep.mode === "chapter") {
      const k = chapAt(A.currentTime);
      if (k !== S.sleep.chap) { A.pause(); clearSleep(); toast("Hẹn giờ: đã dừng ở cuối chương"); }
    }
  });
  const savePos = () => { if (S.day) store.set("pos." + S.day, A.currentTime || 0); };
  A.addEventListener("play", () => { document.body.classList.add("playing"); $("#bPlay").classList.add("playing"); $("#bMiniPlay").classList.add("playing"); lastReal = performance.now(); updateMini(); });
  A.addEventListener("pause", () => { document.body.classList.remove("playing"); $("#bPlay").classList.remove("playing"); $("#bMiniPlay").classList.remove("playing"); savePos(); lastReal = 0; if (S._listen) store.set("listen", S._listen); refreshStats(); });
  A.addEventListener("ended", async () => {
    store.set("pos." + S.day, 0);
    const done = store.get("done", {}); done[S.day] = today(); store.set("done", done);
    toast("Hoàn thành ngày " + S.day + " 🎉");
    if (!store.get("autoNext", true)) return;
    // ngày kế tiếp chưa nghe xong (days.json xếp mới → cũ)
    const nxt = [...S.days].sort((a, b) => a.day - b.day).find((d) => d.day > S.day && !done[d.day]);
    if (nxt) { await loadDay(nxt.day, true); }
  });
  // Nghe liền mạch: mạng chập chờn thì tự nối lại đúng chỗ, không cần chạm điện thoại.
  let wantPlay = false, stallTimer = null;
  A.addEventListener("play", () => { wantPlay = true; });
  A.addEventListener("pause", () => { if (!A.ended && !S._clipPause) wantPlay = false; });
  const recover = () => {
    if (!wantPlay || A.ended) return;
    clearTimeout(stallTimer);
    stallTimer = setTimeout(() => {
      if (!wantPlay || !A.paused && A.readyState >= 3) return;
      const t = A.currentTime; const src = A.src;
      A.src = src; A.load();
      A.addEventListener("loadedmetadata", () => { A.currentTime = t; A.play().catch(() => {}); }, { once: true });
    }, 9000);
  };
  ["stalled", "waiting", "error"].forEach((ev) => A.addEventListener(ev, recover));
  A.addEventListener("playing", () => clearTimeout(stallTimer));
  const autoLabel = () => { const on = store.get("autoNext", true); $("#bAuto").classList.toggle("on", on); $("#autoLabel").textContent = on ? "Tự sang ngày sau" : "Dừng cuối ngày"; };
  $("#bAuto").onclick = () => { store.set("autoNext", !store.get("autoNext", true)); autoLabel(); };
  autoLabel();
  $("#bWork").onclick = () => {
    if (!A.paused) { A.pause(); return; }
    A.volume = 1; A.play().then(() => {
      const left = Math.max(0, (A.duration || S.data.duration) - A.currentTime);
      toast(`Đang phát liền ${fmt(left)}. Khoá màn hình được rồi.`);
    }).catch(() => toast("Bấm lại một lần nữa để phát"));
  };
  const workLabel = () => {
    const playing = !A.paused;
    $("#workTitle").textContent = playing ? "Đang nghe liền mạch" : (A.currentTime > 5 ? "Nghe tiếp liền mạch" : "Nghe liền mạch cả ngày");
    $("#workSub").textContent = playing ? "Khoá màn hình, cất điện thoại. Âm thanh vẫn chạy đến hết ngày." : "Bấm một lần, khoá màn hình, cất điện thoại. Tự phát hết 2 giờ.";
    $("#workGo").textContent = playing ? "❚❚" : "▶";
  };
  A.addEventListener("play", workLabel); A.addEventListener("pause", workLabel); A.addEventListener("loadedmetadata", workLabel);
  document.addEventListener("visibilitychange", () => { if (document.hidden) { savePos(); if (S._listen) store.set("listen", S._listen); } });

  // ---------------- điều khiển
  const toggle = () => (A.paused ? A.play().catch(() => {}) : A.pause());
  $("#bPlay").onclick = toggle; $("#bMiniPlay").onclick = toggle;
  $("#bBack").onclick = () => (A.currentTime = Math.max(0, A.currentTime - 15));
  $("#bFwd").onclick = () => (A.currentTime = Math.min(A.duration || 1e9, A.currentTime + 30));
  $("#bPrev").onclick = () => jumpChapter(-1); $("#bNext").onclick = () => jumpChapter(1);
  $("#bSpeed").onclick = () => {
    const i = (SPEEDS.indexOf(A.playbackRate) + 1) % SPEEDS.length;
    A.playbackRate = SPEEDS[i] || 1; store.set("speed", A.playbackRate); speedLabel();
  };
  const speedLabel = () => { $("#bSpeed").textContent = A.playbackRate.toFixed(A.playbackRate % 1 ? (String(A.playbackRate).length > 3 ? 2 : 1) : 1) + "×"; $("#bSpeed").classList.toggle("on", A.playbackRate !== 1); };
  A.addEventListener("ratechange", speedLabel);
  $("#bFollow").onclick = () => go("text");
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, select, textarea")) return;
    if (e.code === "Space") { e.preventDefault(); toggle(); }
    if (e.code === "ArrowLeft") A.currentTime -= 15;
    if (e.code === "ArrowRight") A.currentTime += 30;
  });

  // tua
  const bar = $("#bar");
  const seekAt = (x) => { const r = bar.getBoundingClientRect(); const p = Math.min(1, Math.max(0, (x - r.left) / r.width)); A.currentTime = p * (A.duration || S.data.duration); };
  bar.addEventListener("pointerdown", (e) => { bar.setPointerCapture(e.pointerId); seekAt(e.clientX); bar.onpointermove = (m) => seekAt(m.clientX); });
  bar.addEventListener("pointerup", () => (bar.onpointermove = null));

  // hẹn giờ ngủ
  $("#bSleep").onclick = () => {
    const opts = [["Tắt", 0], ["10′", 10], ["15′", 15], ["30′", 30], ["45′", 45], ["60′", 60], ["Hết chương", "chapter"]];
    sheet(`<h3>Hẹn giờ tắt</h3><p class="muted">Âm thanh nhỏ dần rồi dừng. Vẫn chạy khi khoá màn hình.</p><div class="opts">${opts.map(([l, v]) =>
      `<button data-v="${v}" class="${(S.sleep?.min ?? 0) == v || (v === "chapter" && S.sleep?.mode === "chapter") ? "on" : ""}">${l}</button>`).join("")}</div>`, (body) => {
      body.querySelectorAll("button[data-v]").forEach((b) => (b.onclick = () => { setSleep(b.dataset.v); closeSheet(); }));
    });
  };
  function clearSleep() { if (S.sleep?.timer) clearInterval(S.sleep.timer); S.sleep = null; A.volume = 1; $("#sleepLabel").textContent = "Hẹn giờ"; $("#bSleep").classList.remove("on"); }
  function setSleep(v) {
    clearSleep();
    if (v === "0") return;
    if (v === "chapter") { S.sleep = { mode: "chapter", chap: chapAt(A.currentTime) }; $("#sleepLabel").textContent = "Hết chương"; $("#bSleep").classList.add("on"); return; }
    const end = Date.now() + Number(v) * 60000;
    S.sleep = { mode: "time", min: Number(v), end };
    $("#bSleep").classList.add("on");
    S.sleep.timer = setInterval(() => {
      const left = (end - Date.now()) / 1000;
      $("#sleepLabel").textContent = fmt(left);
      if (left < 12) A.volume = Math.max(0, left / 12);
      if (left <= 0) { A.pause(); clearSleep(); toast("Hẹn giờ: đã dừng"); }
    }, 1000);
    toast(`Sẽ tắt sau ${v} phút`);
  }

  // ---------------- lời thoại
  function renderTranscript() {
    const box = $("#transcript"); box.innerHTML = "";
    const frag = document.createDocumentFragment();
    const chapStarts = new Map(S.chaps.map((c) => [Math.round(c.t * 1000), c]));
    let prevSpeaker = null;
    for (const s of S.segs) {
      const c = chapStarts.get(Math.round(s.t * 1000));
      if (c) { const h = document.createElement("h3"); h.innerHTML = `${esc(c.title)} <small>${fmt(c.t)}</small>`; frag.appendChild(h); prevSpeaker = null; }
      if (s.kind === "sfx") continue;
      const d = document.createElement("div");
      d.className = "seg" + (s.lang === "en" ? " en" : "") + (s.kind === "phrase" ? " phrase" : "");
      d.dataset.i = s.i;
      const who = label(s);
      d.innerHTML = `<span class="ts">${fmt(s.t)}</span><div>${who !== prevSpeaker ? `<span class="who">${esc(who)}</span>` : ""}<span class="tx">${highlight(s)}</span></div>`;
      prevSpeaker = who;
      frag.appendChild(d);
    }
    box.appendChild(frag);
  }
  $("#transcript").addEventListener("click", (e) => {
    const ph = e.target.closest(".ph"); if (ph) { phraseSheet(ph.dataset.k); return; }
    const seg = e.target.closest(".seg"); if (!seg) return;
    const s = S.segs.find((x) => x.i == seg.dataset.i); if (s) { A.currentTime = s.t + 0.01; A.play().catch(() => {}); }
  });
  $("#caption").addEventListener("click", (e) => { const ph = e.target.closest(".ph"); if (ph) phraseSheet(ph.dataset.k); });
  ["wheel", "touchmove"].forEach((ev) => $("#transcript").addEventListener(ev, () => { S.follow = false; clearTimeout(S._fol); S._fol = setTimeout(() => (S.follow = true), 6000); }, { passive: true }));

  // ---------------- nghe riêng cụm
  function playClip(p, slow) {
    const src = p && (slow ? p.clip_slow : p.clip);
    if (!src) { toast("Cụm này chưa có file âm thanh"); return; }
    const wasPlaying = !A.paused;
    if (wasPlaying) { S._clipPause = true; A.pause(); S._clipPause = false; }
    C.src = (p.base || base()) + src;
    C.onended = () => { if (wasPlaying) A.play().catch(() => {}); };
    C.play().catch(() => {});
  }
  function phraseSheet(key) {
    const p = S.phrases[key] || store.get("book", {})[key]; if (!p) return;
    const ex = (p.examples || []).map((x) => `<p class="ex">${esc(x.en)}<i>${esc(x.vi)}</i></p>`).join("");
    sheet(`<span class="eyebrow">Cụm từ</span><h3>${esc(p.en)}</h3><p style="font-size:16px;margin:2px 0 8px">${esc(p.vi)}</p>
      ${p.note_vi ? `<p class="muted">${esc(p.note_vi)}</p>` : ""}
      <div class="flash-actions-top" style="justify-content:flex-start"><button class="mini" data-a="n">▶ 1.0×</button><button class="mini" data-a="s">▶ 0.85×</button>${p.t != null && S.phrases[key] ? `<button class="mini" data-a="t">↺ Nghe trong truyện</button>` : ""}</div>${ex}
      ${p.recall_vi ? `<p class="muted" style="margin-top:12px">📍 ${esc(p.recall_vi)}</p>` : ""}`, (b) => {
      b.querySelector('[data-a="n"]').onclick = () => playClip(p, false);
      b.querySelector('[data-a="s"]').onclick = () => playClip(p, true);
      const t = b.querySelector('[data-a="t"]'); if (t) t.onclick = () => { closeSheet(); A.currentTime = Math.max(0, p.t - 8); A.play().catch(() => {}); };
    });
    playClip(p, false);
  }

  // ---------------- SRS (trên trình duyệt; đồng bộ API nếu chạy FastAPI)
  function markSeen(key) {
    const srs = store.get("srs", {});
    if (!srs[key]) { srs[key] = { step: 0, next: addDays(today(), 1), seen: today(), reviews: 0, lapses: 0 }; store.set("srs", srs); }
  }
  function grade(key, good) {
    const srs = store.get("srs", {}); const r = srs[key] || { step: 0, reviews: 0, lapses: 0, seen: today() };
    if (good) { r.step = (r.step || 0) + 1; r.next = r.step < INTERVALS.length ? addDays(today(), INTERVALS[r.step]) : addDays(today(), 60); }
    else { r.step = 0; r.lapses = (r.lapses || 0) + 1; r.next = addDays(today(), INTERVALS[0]); }
    r.reviews = (r.reviews || 0) + 1; r.last = today(); srs[key] = r; store.set("srs", srs);
    if (S.api) fetch("api/review", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, result: good ? "good" : "again" }) }).catch(() => {});
  }
  function bookState(key) {
    const r = store.get("srs", {})[key];
    if (!r) return "new";
    if (r.step >= INTERVALS.length) return "done";
    return r.next <= today() ? "due" : "learning";
  }
  function dueKeys() { const book = store.get("book", {}); return Object.keys(book).filter((k) => bookState(k) === "due"); }

  function renderBook() {
    const book = store.get("book", {});
    const q = ($("#bookSearch").value || "").toLowerCase(), f = $("#bookFilter").value;
    const items = Object.values(book).sort((a, b) => (b.day - a.day) || a.key.localeCompare(b.key, undefined, { numeric: true }));
    const ul = $("#bookList"); ul.innerHTML = "";
    const srs = store.get("srs", {});
    for (const p of items) {
      const st = bookState(p.key);
      if (f === "word" || f === "phrase") { if ((p.kind || "phrase") !== f) continue; }
      else if (f !== "all" && f !== st) continue;
      if (q && !(p.en + " " + p.vi).toLowerCase().includes(q)) continue;
      const r = srs[p.key];
      const li = document.createElement("li");
      li.innerHTML = `<div class="en"><span>${esc(p.en)}</span><span class="playbtns"><button class="round" data-a="n" aria-label="Nghe">▶</button><button class="round" data-a="s" aria-label="Nghe chậm">.85</button></span></div>
        <p class="vi">${esc(p.vi)}</p>${p.note_vi ? `<p class="note">${esc(p.note_vi)}</p>` : ""}
        <div class="meta"><span class="tag kind">${p.kind === "word" ? "Từ vựng" : "Cụm câu"}</span><span class="tag ${st}">${{ new: "Chưa gặp", due: "Đến hạn ôn", learning: "Đang nhớ", done: "Đã thuộc" }[st]}</span>
        <span class="muted" style="font-size:12px">Ngày ${p.day}${r ? ` · bậc ${Math.min(r.step, 4)}/4 · ôn tiếp ${r.next}` : ""}</span></div>`;
      li.querySelector('[data-a="n"]').onclick = (e) => { e.stopPropagation(); playClip(p, false); };
      li.querySelector('[data-a="s"]').onclick = (e) => { e.stopPropagation(); playClip(p, true); };
      li.onclick = () => phraseSheet(p.key);
      ul.appendChild(li);
    }
    if (!ul.children.length) ul.innerHTML = `<li class="muted">Chưa có cụm nào ở mục này.</li>`;
    const n = dueKeys().length;
    $("#dueTitle").textContent = n ? `${n} cụm đến hạn` : "Không có cụm đến hạn";
    $("#dueSub").textContent = n ? "Nghe câu tiếng Anh, tự nhớ nghĩa, rồi lật thẻ." : `Đã có ${items.length} cụm trong sổ. Ôn thêm bất kỳ lúc nào.`;
    $("#bStartReview").textContent = n ? "Ôn ngay" : "Ôn tự do";
    const badge = $("#dueBadge"); badge.hidden = !n; badge.textContent = n;
  }
  $("#bookSearch").oninput = renderBook; $("#bookFilter").onchange = renderBook;

  $("#bStartReview").onclick = () => {
    const book = store.get("book", {});
    let keys = dueKeys();
    if (!keys.length) keys = Object.keys(book).sort(() => Math.random() - 0.5).slice(0, 10);
    if (!keys.length) { toast("Sổ tay còn trống. Hãy nghe một tập trước."); return; }
    S.flash = { keys, i: 0 }; $("#flash").hidden = false; showCard();
    $("#flash").scrollIntoView({ behavior: "smooth", block: "center" });
  };
  function showCard() {
    const { keys, i } = S.flash; const p = store.get("book", {})[keys[i]];
    $("#flashCount").textContent = `${i + 1} / ${keys.length}`;
    $("#flashEn").textContent = p.en; $("#flashVi").textContent = p.vi; $("#flashCtx").textContent = p.recall_vi || "";
    $("#flashBack").hidden = true; $("#bReveal").hidden = false; $("#bAgain").hidden = true; $("#bGood").hidden = true;
    playClip(p, false);
  }
  $("#bFlashPlay").onclick = () => playClip(store.get("book", {})[S.flash.keys[S.flash.i]], false);
  $("#bFlashSlow").onclick = () => playClip(store.get("book", {})[S.flash.keys[S.flash.i]], true);
  $("#bReveal").onclick = () => { $("#flashBack").hidden = false; $("#bReveal").hidden = true; $("#bAgain").hidden = false; $("#bGood").hidden = false; };
  const next = (good) => { grade(S.flash.keys[S.flash.i], good); S.flash.i++;
    if (S.flash.i >= S.flash.keys.length) { $("#flash").hidden = true; toast("Xong lượt ôn! 👏"); S.flash = null; renderBook(); refreshStats(); } else showCard(); };
  $("#bGood").onclick = () => next(true); $("#bAgain").onclick = () => next(false);
  $("#bCloseFlash").onclick = () => { $("#flash").hidden = true; S.flash = null; renderBook(); };

  // ---------------- kho
  function renderArchive() {
    const ul = $("#dayList"); ul.innerHTML = "";
    if (!S.days.length) { ul.innerHTML = `<li class="muted" style="cursor:default">Chưa có tập nào.</li>`; return; }
    for (const d of S.days) {
      const pos = store.get("pos." + d.day, 0), pct = Math.min(100, pos / d.duration * 100);
      const li = document.createElement("li"); li.className = d.day === S.day ? "on" : "";
      li.innerHTML = `<img src="${esc(d.cover || "img/hero.webp")}" alt="" loading="lazy"><div><span class="eyebrow">Ngày ${d.day} · ${esc(d.date)}${d.mode === "short" ? " · bản thử" : ""}</span>
        <h3>${esc(d.title_vi)}</h3><p>${d.parts.map((p) => esc(p.title_vi)).join(" · ")}</p><p>${fmt(d.duration)} · ${d.phrases} cụm câu${d.words ? ` · ${d.words} từ vựng` : ""}</p><div class="prog"><i style="width:${pct}%"></i></div></div>`;
      li.onclick = async () => { if (d.day !== S.day) await loadDay(d.day, true); else A.play().catch(() => {}); go("listen"); };
      ul.appendChild(li);
    }
  }

  // ---------------- thống kê
  function streak(L) {
    let n = 0, d = today();
    if ((L[d] || 0) < 600) d = addDays(d, -1);
    while ((L[d] || 0) >= 600) { n++; d = addDays(d, -1); }
    return n;
  }
  function refreshPills() { const L = S._listen || store.get("listen", {}); $("#streakN").textContent = streak(L); $("#todayMin").textContent = Math.floor((L[today()] || 0) / 60); }
  function refreshStats() {
    const L = S._listen || store.get("listen", {});
    refreshPills();
    $("#sStreak").textContent = streak(L);
    $("#sToday").textContent = Math.floor((L[today()] || 0) / 60);
    $("#sTotal").textContent = (Object.values(L).reduce((a, b) => a + b, 0) / 3600).toFixed(1);
    const book = store.get("book", {}), srs = store.get("srs", {});
    $("#sPhrases").textContent = Object.keys(book).length;
    $("#sPhrasesSub").textContent = `${Object.values(srs).filter((r) => r.step >= 4).length} đã thuộc · ${dueKeys().length} đến hạn`;
    const sp = $("#spark"); sp.innerHTML = "";
    const vals = [...Array(14)].map((_, i) => { const d = addDays(today(), i - 13); return [d, (L[d] || 0) / 60]; });
    const max = Math.max(30, ...vals.map((v) => v[1]));
    for (const [d, m] of vals) { const b = document.createElement("div"); b.className = m < 1 ? "zero" : ""; b.style.height = Math.max(3, m / max * 100) + "%"; b.title = `${d}: ${Math.round(m)} phút`; b.innerHTML = `<span>${d.slice(8)}</span>`; sp.appendChild(b); }
    const goal = store.get("goal", 120); $("#goal").value = goal; $("#goalV").textContent = goal + "′";
    $("#goalFill").style.width = Math.min(100, (L[today()] || 0) / 60 / goal * 100) + "%";
  }
  $("#goal").oninput = (e) => { store.set("goal", Number(e.target.value)); refreshStats(); };

  // ---------------- điều hướng, sheet, mini player
  function go(v) {
    document.querySelectorAll(".view").forEach((s) => (s.hidden = s.dataset.view !== v));
    document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.go === v));
    history.replaceState(null, "", "#" + v + (S.day ? `&day=${S.day}` : ""));
    updateMini();
    window.scrollTo({ top: 0 });
    if (v === "text") { const el = document.querySelector(".seg.now"); if (el) el.scrollIntoView({ block: "center" }); }
    if (v === "book") renderBook();
    if (v === "stats") refreshStats();
    if (v === "archive") renderArchive();
  }
  function updateMini() { $("#miniPlayer").hidden = !A.src || !$("#v-listen").hidden; }
  document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => go(b.dataset.go)));
  $("#miniPlayer").addEventListener("click", (e) => { if (!e.target.closest("button")) go("listen"); });
  function sheet(html, bind) { $("#sheetBody").innerHTML = html; $("#sheet").hidden = false; bind && bind($("#sheetBody")); }
  function closeSheet() { $("#sheet").hidden = true; }
  $("#sheet").addEventListener("click", (e) => { if (e.target.id === "sheet") closeSheet(); });

  mediaHandlers();
  speedLabel();
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
  boot();
})();
