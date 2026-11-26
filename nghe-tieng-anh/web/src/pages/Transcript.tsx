import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Say } from "../components/Say";
import { cueText } from "../lib/data";
import { clock, PART_NAMES } from "../lib/fmt";
import { load, seek, usePlayer } from "../lib/player";
import { settingsStore, useSettings } from "../lib/store";
import type { DayData, Phrase } from "../lib/types";

type Tab = "follow" | "phrases" | "dialogues" | "listening";

function highlight(text: string, phrases: Phrase[]) {
  const lower = text.toLowerCase();
  for (const p of phrases) {
    const core = p.en.replace(/[.!?]+$/, "");
    const i = lower.indexOf(core.toLowerCase());
    if (i >= 0) {
      return <>{text.slice(0, i)}<mark className="hl">{text.slice(i, i + core.length)}</mark>{text.slice(i + core.length)}</>;
    }
  }
  return text;
}

export function Transcript({ day, initialTab }: { day: DayData; initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab ?? "phrases");
  const s = useSettings();
  return (
    <div>
      <h1 className="page-title">Lời thoại</h1>
      <p className="lead">Ngày {day.day_number} · {day.topic.vi}. Chạm <span className="gold">loa</span> để nghe lại từng câu.</p>
      <div className="tabs" role="tablist">
        {([["phrases", "Cụm từ"], ["dialogues", "Hội thoại"], ["listening", "Bài nghe"], ["follow", "Theo audio"]] as [Tab, string][]).map(([k, l]) => (
          <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>
      <div className="row" style={{ justifyContent: "flex-end", margin: "10px 0 14px" }}>
        <button className="row small muted" onClick={() => settingsStore.set((x) => ({ ...x, showVi: !x.showVi }))}>
          <span className={`switch${s.showVi ? " on" : ""}`} aria-hidden /> Nghĩa tiếng Việt
        </button>
      </div>
      {tab === "phrases" && <Phrases day={day} showVi={s.showVi} />}
      {tab === "dialogues" && <Dialogues day={day} showVi={s.showVi} />}
      {tab === "listening" && <ListeningTexts day={day} showVi={s.showVi} />}
      {tab === "follow" && <Follow day={day} showVi={s.showVi} />}
    </div>
  );
}

function Phrases({ day, showVi }: { day: DayData; showVi: boolean }) {
  return (
    <div className="stack">
      {day.phrases.map((p, i) => (
        <div key={p.id} className="card">
          <div className="row" style={{ alignItems: "flex-start" }}>
            <span className="serif gold" style={{ fontSize: 20, width: 28 }}>{i + 1}</span>
            <div className="grow">
              <div style={{ fontWeight: 600, fontSize: 17 }}>{p.en}</div>
              {showVi && <div className="gold small">{p.vi}</div>}
              {p.note_vi && <div className="small muted" style={{ marginTop: 6 }}>{p.note_vi}</div>}
            </div>
            <Say day={day} refId={p.id} slow />
            <Say day={day} refId={p.id} />
          </div>
          <div style={{ marginTop: 10, paddingLeft: 38 }}>
            {p.examples.map((ex, j) => (
              <div key={j} className="row" style={{ alignItems: "flex-start", padding: "6px 0", borderTop: "1px solid var(--line-2)" }}>
                <div className="grow">
                  <div style={{ fontSize: 14.5 }}>{highlight(ex.en, [p])}</div>
                  {showVi && <div className="small muted">{ex.vi}</div>}
                </div>
                <Say day={day} refId={`${p.id}.x${j}`} sm />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Dialogues({ day, showVi }: { day: DayData; showVi: boolean }) {
  return (
    <div className="stack">
      {day.dialogues.map((d) => (
        <div key={d.id} className="card">
          <div className="upper gold">Hội thoại {d.id.slice(1)}</div>
          <h3 className="serif" style={{ fontSize: 21, margin: "4px 0 2px" }}>{d.title_en}</h3>
          <div className="small muted">{d.title_vi}{d.setting_vi ? ` · ${d.setting_vi}` : ""}</div>
          <div style={{ marginTop: 10 }}>
            {d.lines.map((ln, i) => {
              const sp = d.speakers[ln.s];
              return (
                <div key={i} className="line">
                  <span className={`avatar ${sp.gender}`} title={sp.name}>{sp.name.slice(0, 2)}</span>
                  <div>
                    <div className="tiny faint">{sp.name}</div>
                    <div className="en">{highlight(ln.en, day.phrases)}</div>
                    {showVi && <div className="vi">{ln.vi}</div>}
                  </div>
                  <Say day={day} refId={`${d.id}.${i}`} sm />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ListeningTexts({ day, showVi }: { day: DayData; showVi: boolean }) {
  return (
    <div className="stack">
      {day.listening.map((l) => (
        <div key={l.id} className="card">
          <div className="upper gold">{l.kind === "podcast" ? "Podcast" : l.kind === "story" ? "Truyện ngắn" : "Độc thoại"}</div>
          <h3 className="serif" style={{ fontSize: 22, margin: "4px 0 2px" }}>{l.title_en}</h3>
          <div className="small muted">{l.title_vi}</div>
          {l.summary_vi && <p className="small" style={{ color: "var(--gold-3)", margin: "8px 0 0" }}>{l.summary_vi}</p>}
          {l.paragraphs.map((pa, i) => (
            <div key={i} className="para row" style={{ alignItems: "flex-start" }}>
              <div className="grow">
                {Object.keys(l.speakers).length > 1 && <div className="tiny faint">{l.speakers[pa.s].name}</div>}
                <div className="en">{highlight(pa.en, day.phrases)}</div>
                {showVi && pa.vi && <div className="vi">{pa.vi}</div>}
              </div>
              <Say day={day} refId={`${l.id}.${i}`} sm />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/** The whole programme in order, following the audio. Tap a line to jump there. */
function Follow({ day, showVi }: { day: DayData; showVi: boolean }) {
  const p = usePlayer();
  const active = p.day?.date === day.date;
  const [part, setPart] = useState<number>(active ? day.chapters[p.chapter]?.part ?? 1 : 1);
  const [follow, setFollow] = useState(true);
  const cur = active ? p.cue : -1;
  const ref = useRef<HTMLDivElement>(null);
  const items = useMemo(() => day.cues.map((c, i) => ({ c, i })).filter(({ c }) => c.p === part), [day, part]);

  useEffect(() => {
    if (active && follow && cur >= 0) {
      const curPart = day.cues[cur].p;
      if (curPart !== part) setPart(curPart);
    }
  }, [active, follow, cur, day, part]);
  useEffect(() => {
    if (!follow || cur < 0) return;
    const el = ref.current?.querySelector(`[data-i="${cur}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [cur, follow, part]);

  return (
    <div>
      <div className="row wrap" style={{ gap: 6, marginBottom: 8 }}>
        {[1, 2, 3, 4].map((n) => (
          <button key={n} className={`chip${part === n ? " on" : ""}`} onClick={() => { setPart(n); setFollow(false); }}>
            {n}. {PART_NAMES[n].vi}
          </button>
        ))}
        <button className={`chip${follow ? " gold" : ""}`} onClick={() => setFollow(!follow)}>{follow ? "● Đang theo audio" : "Theo audio"}</button>
      </div>
      <div className="timeline" ref={ref}>
        {items.map(({ c, i }, k) => {
          const t = cueText(day, c);
          const prev = items[k - 1]?.c;
          const repeat = prev && prev.r && prev.r === c.r && prev.l === c.l;
          if (repeat && i !== cur) return null; // hide immediate repeats to keep the list readable
          return (
            <Fragment key={i}>
              <button
                data-i={i}
                className={`cue ${c.l}${c.k === "host" ? " host" : ""}${i === cur ? " on" : ""}`}
                onClick={async () => { if (!active) await load(day, true, c.s); else seek(c.s); }}
              >
                <span className="tm">{clock(c.s)}</span>
                <span className="tx">
                  {t.speaker && <span className="tiny faint">{t.speaker} · </span>}
                  {t.main}
                  {c.x && <span className="badge">chậm</span>}
                  {showVi && t.sub && c.k !== "host" && c.l === "en" && <small>{t.sub}</small>}
                </span>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
