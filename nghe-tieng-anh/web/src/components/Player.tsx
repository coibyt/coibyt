import { useEffect, useState } from "react";
import { coverUrl, cueText, audioUrl } from "../lib/data";
import { clock, PART_NAMES } from "../lib/fmt";
import { download, isCached } from "../lib/offline";
import {
  gotoChapter, nextChapter, prevChapter, seek, setRate, setSleep, skip, toggle, switchToOffline, usePlayer,
} from "../lib/player";
import { settingsStore, useSettings } from "../lib/store";
import {
  IconBack, IconCheck, IconChevronDown, IconDownload, IconFwd, IconMoon, IconNext, IconPause, IconPlay, IconPrev,
} from "./Icons";

export function MiniPlayer({ onOpen }: { onOpen: () => void }) {
  const p = usePlayer();
  const s = useSettings();
  if (!p.day) return null;
  const now = p.cue >= 0 && (p.playing || p.time > 1) ? cueText(p.day, p.day.cues[p.cue]) : null;
  const ch = p.day.chapters[p.chapter];
  return (
    <div className="mini" role="region" aria-label="Trình phát">
      <button onClick={onOpen} aria-label="Mở trình phát"><img src={coverUrl(p.day.date, p.day.cover)} alt="" /></button>
      <button className="meta" onClick={onOpen}>
        <b>{now?.main || `Ngày ${p.day.day_number} · ${p.day.topic.vi}`}</b>
        <span>{s.showVi && now?.sub ? now.sub : `${ch ? PART_NAMES[ch.part]?.vi : ""} · ${clock(p.time)} / ${clock(p.duration)}`}</span>
      </button>
      <button className="play-btn" onClick={toggle} aria-label={p.playing ? "Tạm dừng" : "Phát"}>
        {p.playing ? <IconPause size={20} /> : <IconPlay size={20} />}
      </button>
      <div className="progress"><i style={{ width: `${(p.time / (p.duration || 1)) * 100}%` }} /></div>
    </div>
  );
}

const SPEEDS = [0.75, 0.85, 0.9, 1, 1.1, 1.25, 1.5];

export function FullPlayer({ onClose }: { onClose: () => void }) {
  const p = usePlayer();
  const s = useSettings();
  const [panel, setPanel] = useState<"" | "speed" | "sleep">("");
  const [dl, setDl] = useState<"no" | "busy" | "yes">("no");
  const [pct, setPct] = useState(0);
  const day = p.day;

  useEffect(() => {
    if (day) void isCached(audioUrl(day)).then((c) => setDl(c ? "yes" : "no"));
  }, [day]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  if (!day) return null;

  const now = p.cue >= 0 ? cueText(day, day.cues[p.cue]) : null;
  const cue = p.cue >= 0 ? day.cues[p.cue] : null;
  const fill = `${(p.time / (p.duration || 1)) * 100}%`;
  const sleepLeft = p.sleepAt ? Math.max(0, Math.round((p.sleepAt - Date.now()) / 60000)) : 0;

  async function doDownload() {
    if (!day || dl !== "no") return;
    setDl("busy");
    try {
      await download(audioUrl(day), (d, t) => setPct(t ? Math.round((d / t) * 100) : 0));
      setDl("yes");
      void switchToOffline(day);
    } catch {
      setDl("no");
    }
  }

  return (
    <>
      <div className="sheet-backdrop" onClick={onClose} />
      <div className="sheet" role="dialog" aria-label="Trình phát">
        <div className="sheet-top">
          <button className="icon-btn" onClick={onClose} aria-label="Thu nhỏ"><IconChevronDown /></button>
          <div className="upper gold">Ngày {day.day_number} · {PART_NAMES[day.chapters[p.chapter]?.part]?.vi}</div>
          <button className="icon-btn" onClick={doDownload} aria-label="Tải về nghe offline" title="Tải về nghe offline">
            {dl === "yes" ? <IconCheck /> : dl === "busy" ? <span className="small gold">{pct}%</span> : <IconDownload />}
          </button>
        </div>

        <div className="cover-lg"><img src={coverUrl(day.date, day.cover)} alt="" /></div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <div className="serif" style={{ fontSize: 22 }}>{day.topic.vi}</div>
          <div className="serif gold" style={{ fontStyle: "italic" }}>{day.topic.en}</div>
        </div>

        <div className="now" aria-live="polite">
          {now?.speaker && <div className="who">{now.speaker}</div>}
          <div className="main-line" style={cue?.k === "host" ? { fontSize: 15, fontFamily: "var(--sans)", color: "var(--gold-3)" } : undefined}>
            {now?.main || "…"}
            {cue?.x && <span className="badge">chậm</span>}
          </div>
          {s.showVi && now?.sub && cue?.k !== "host" && <div className="sub-line">{now.sub}</div>}
        </div>

        <div className="ch-strip" aria-label="Các phần">
          {day.chapters.map((c, i) => (
            <button key={i} style={{ flex: Math.max(c.end - c.start, 30) }} onClick={() => gotoChapter(i)} title={c.title_vi} aria-label={c.title_vi}>
              <i style={{ transform: `scaleX(${Math.max(0, Math.min(1, (p.time - c.start) / (c.end - c.start)))})` }} />
            </button>
          ))}
        </div>
        <div className="scrub">
          <input
            type="range" min={0} max={p.duration || 1} step={1} value={p.time} aria-label="Vị trí"
            style={{ ["--fill" as string]: fill }}
            onChange={(e) => seek(Number(e.target.value))}
          />
          <div className="times"><span>{clock(p.time)}</span><span>-{clock((p.duration || 0) - p.time)}</span></div>
        </div>

        <div className="controls">
          <button className="icon-btn" onClick={prevChapter} aria-label="Phần trước"><IconPrev /></button>
          <button className="icon-btn" onClick={() => skip(-15)} aria-label="Lùi 15 giây"><IconBack size={26} /></button>
          <button className="play-btn lg" onClick={toggle} aria-label={p.playing ? "Tạm dừng" : "Phát"}>
            {p.waiting && p.playing ? <span className="small">…</span> : p.playing ? <IconPause size={30} /> : <IconPlay size={30} />}
          </button>
          <button className="icon-btn" onClick={() => skip(30)} aria-label="Tới 30 giây"><IconFwd size={26} /></button>
          <button className="icon-btn" onClick={nextChapter} aria-label="Phần sau"><IconNext /></button>
        </div>
        {p.error && <div className="small" style={{ color: "var(--bad)", textAlign: "center" }}>{p.error}</div>}

        <div className="opts">
          <button className={`opt${p.rate !== 1 ? " on" : ""}`} onClick={() => setPanel(panel === "speed" ? "" : "speed")}>
            <b>{p.rate}x</b>Tốc độ
          </button>
          <button className={`opt${p.sleepAt || p.sleepPart ? " on" : ""}`} onClick={() => setPanel(panel === "sleep" ? "" : "sleep")}>
            <b><IconMoon size={16} /></b>{p.sleepPart ? "Hết phần" : p.sleepAt ? `${sleepLeft} phút` : "Hẹn giờ"}
          </button>
          <button className={`opt${s.showVi ? " on" : ""}`} onClick={() => settingsStore.set((x) => ({ ...x, showVi: !x.showVi }))}>
            <b>VI</b>{s.showVi ? "Hiện nghĩa" : "Ẩn nghĩa"}
          </button>
        </div>
        {panel === "speed" && (
          <div className="popover">
            {SPEEDS.map((r) => (
              <button key={r} className={`chip${p.rate === r ? " on" : ""}`} onClick={() => setRate(r)}>{r}x</button>
            ))}
          </div>
        )}
        {panel === "sleep" && (
          <div className="popover">
            {[15, 30, 45, 60, 90].map((m) => (
              <button key={m} className="chip" onClick={() => { setSleep(m); setPanel(""); }}>{m} phút</button>
            ))}
            <button className={`chip${p.sleepPart ? " on" : ""}`} onClick={() => { setSleep("part"); setPanel(""); }}>Hết phần này</button>
            <button className="chip" onClick={() => { setSleep(0); setPanel(""); }}>Tắt</button>
          </div>
        )}

        <div className="section" style={{ marginTop: 18 }}>
          <div className="upper faint" style={{ marginBottom: 8 }}>Các phần</div>
          <div className="chapters">
            {day.chapters.filter((c) => PART_NAMES[c.part]?.hint).map((c) => {
              const i = day.chapters.indexOf(c);
              return (
                <button key={i} className={`chapter${i === p.chapter ? " current" : ""}${p.time >= c.end ? " done" : ""}`} onClick={() => gotoChapter(i)}>
                  <span className="num">{c.part}</span>
                  <span><span className="t">{PART_NAMES[c.part].vi}</span><br /><span className="h">{PART_NAMES[c.part].hint}</span></span>
                  <span className="small muted">{clock(c.start)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
