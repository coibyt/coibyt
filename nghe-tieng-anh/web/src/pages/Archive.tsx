import { useState } from "react";
import { IconChevronLeft, IconChevronRight, IconFlame } from "../components/Icons";
import { coverUrl } from "../lib/data";
import { minutesText, shortDateVi } from "../lib/fmt";
import { go } from "../lib/router";
import { streak, todayKey, useProgress, useSettings } from "../lib/store";
import type { IndexData } from "../lib/types";

const MONTHS = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

function bestStreak(listened: Record<string, number>, min: number) {
  const days = Object.keys(listened).filter((k) => listened[k] >= min).sort();
  let best = 0, run = 0, prev = "";
  for (const d of days) {
    const p = new Date(d + "T12:00:00");
    p.setDate(p.getDate() - 1);
    run = prev === todayKey(p) ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

export function Archive({ index }: { index: IndexData }) {
  const prog = useProgress();
  const s = useSettings();
  const latest = index.days[0]?.date ?? todayKey();
  const [month, setMonth] = useState(() => {
    const d = new Date(latest + "T12:00:00");
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const lessons = new Map(index.days.map((d) => [d.date, d]));
  const min = Math.min(s.goalMinutes, 20) * 60;
  const total = Object.values(prog.listened).reduce((a, b) => a + b, 0);
  const activeDays = Object.values(prog.listened).filter((v) => v >= 60).length;

  const first = new Date(month.y, month.m, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const count = new Date(month.y, month.m + 1, 0).getDate();
  const cells: (string | null)[] = [...Array(lead).fill(null)];
  for (let d = 1; d <= count; d++) cells.push(todayKey(new Date(month.y, month.m, d)));

  const last14 = [...Array(14)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const k = todayKey(d);
    return { k, sec: prog.listened[k] ?? 0 };
  });
  const maxSec = Math.max(s.goalMinutes * 60, ...last14.map((x) => x.sec));

  return (
    <div>
      <h1 className="page-title">Lịch & tiến độ</h1>
      <p className="lead">Mỗi ngày có một bài mới. Bài cũ vẫn ở đây để nghe lại bất cứ lúc nào.</p>

      <div className="stats">
        <div className="stat"><b className="row" style={{ gap: 6 }}><IconFlame size={20} />{streak(prog.listened, min)}</b><span>ngày liên tiếp · kỷ lục {bestStreak(prog.listened, min)}</span></div>
        <div className="stat"><b>{(total / 3600).toFixed(1)}</b><span>giờ đã nghe</span></div>
        <div className="stat"><b>{activeDays}</b><span>ngày có nghe</span></div>
      </div>

      <section className="section card">
        <div className="row between">
          <b>Số phút nghe · 14 ngày qua</b>
          <span className="small muted">mục tiêu {s.goalMinutes} phút/ngày</span>
        </div>
        <div className="bars" role="img" aria-label="Biểu đồ số phút nghe 14 ngày qua">
          {last14.map((x) => (
            <div key={x.k} title={`${shortDateVi(x.k)}: ${Math.round(x.sec / 60)} phút`}>
              <i style={{ height: `${(x.sec / maxSec) * 100}%`, opacity: x.sec >= s.goalMinutes * 60 ? 1 : 0.55 }} />
              <span>{new Date(x.k + "T12:00:00").getDate()}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section card">
        <div className="row between" style={{ marginBottom: 12 }}>
          <button className="icon-btn" aria-label="Tháng trước" onClick={() => setMonth(({ y, m }) => (m ? { y, m: m - 1 } : { y: y - 1, m: 11 }))}><IconChevronLeft /></button>
          <b className="serif" style={{ fontSize: 19 }}>{MONTHS[month.m]}, {month.y}</b>
          <button className="icon-btn" aria-label="Tháng sau" onClick={() => setMonth(({ y, m }) => (m < 11 ? { y, m: m + 1 } : { y: y + 1, m: 0 }))}><IconChevronRight /></button>
        </div>
        <div className="cal">
          {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d) => <div key={d} className="dow">{d}</div>)}
          {cells.map((k, i) => {
            if (!k) return <div key={i} />;
            const sec = prog.listened[k] ?? 0;
            const heat = sec >= s.goalMinutes * 60 ? 3 : sec >= 20 * 60 ? 2 : sec >= 60 ? 1 : 0;
            const has = lessons.has(k);
            return (
              <button key={k} className={`d${has ? " has" : ""}${k === todayKey() ? " today" : ""}${heat ? ` heat${heat}` : ""}`}
                disabled={!has} onClick={() => go(`/day/${k}`)} aria-label={`${k}${has ? ", có bài" : ""}${sec ? `, đã nghe ${Math.round(sec / 60)} phút` : ""}`}>
                {Number(k.slice(8))}
                {has && <span className="dot" />}
              </button>
            );
          })}
        </div>
        <div className="row small muted wrap" style={{ marginTop: 12, gap: 14 }}>
          <span className="row" style={{ gap: 6 }}><span className="dot" style={{ width: 6, height: 6, borderRadius: 9, background: "var(--gold)", display: "inline-block" }} /> có bài</span>
          <span>Ô càng sáng = nghe càng nhiều</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head"><h2>Tất cả bài</h2><span className="small muted">{index.days.length} ngày</span></div>
        <div className="stack" style={{ gap: 8 }}>
          {index.days.map((d) => {
            const heard = prog.lessonHeard[d.date] ?? 0;
            return (
              <button key={d.date} className="lesson-card" onClick={() => go(`/day/${d.date}`)}>
                <img src={coverUrl(d.date, d.cover)} alt="" />
                <div style={{ minWidth: 0 }}>
                  <div className="tiny gold upper">Ngày {d.day_number} · {shortDateVi(d.date)}</div>
                  <div style={{ fontWeight: 600 }}>{d.topic.vi}</div>
                  <div className="small muted">{d.topic.en} · {minutesText(d.duration)}</div>
                  <div className="bar" style={{ marginTop: 8 }}><i style={{ width: `${Math.min(100, (heard / d.duration) * 100)}%` }} /></div>
                </div>
                <IconChevronRight className="faint" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
