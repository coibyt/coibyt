import { useEffect, useState } from "react";
import { Say } from "../components/Say";
import { IconBook, IconDownload, IconFlame, IconHeadphones, IconCheck, IconPlay, IconPause, IconSparkle, IconText } from "../components/Icons";
import { audioUrl, coverUrl } from "../lib/data";
import { clock, dateVi, minutesText, PART_NAMES } from "../lib/fmt";
import { download, isCached } from "../lib/offline";
import { gotoChapter, load, switchToOffline, toggle, usePlayer } from "../lib/player";
import { go } from "../lib/router";
import { streak, todayKey, useProgress, useSettings } from "../lib/store";
import type { DayData } from "../lib/types";

export function Today({ day, isLatest }: { day: DayData; isLatest: boolean }) {
  const p = usePlayer();
  const prog = useProgress();
  const s = useSettings();
  const [dl, setDl] = useState<"no" | "busy" | "yes">("no");
  const [pct, setPct] = useState(0);
  const active = p.day?.date === day.date;
  const pos = active ? p.time : prog.positions[day.date] ?? 0;
  const todaySec = prog.listened[todayKey()] ?? 0;
  const goal = s.goalMinutes * 60;
  const st = streak(prog.listened, Math.min(goal, 20 * 60));
  const total = Object.values(prog.listened).reduce((a, b) => a + b, 0);

  useEffect(() => {
    void isCached(audioUrl(day)).then((c) => setDl(c ? "yes" : "no"));
  }, [day]);

  async function start(at?: number) {
    if (active && at === undefined) toggle();
    else await load(day, true, at);
  }
  async function doDownload() {
    if (dl !== "no") return;
    setDl("busy");
    try {
      await download(audioUrl(day), (d, t) => setPct(t ? Math.round((d / t) * 100) : 0));
      setDl("yes");
      void switchToOffline(day);
    } catch {
      setDl("no");
    }
  }

  const playing = active && p.playing;
  const label = playing ? "Tạm dừng" : pos > 10 ? `Nghe tiếp từ ${clock(pos)}` : "Bắt đầu nghe";
  const chapters = day.chapters.filter((c) => c.part >= 1 && c.part <= 4);

  return (
    <div>
      <article className="hero">
        <div className="hero-art"><img src={coverUrl(day.date, day.cover)} alt="" /></div>
        <div className="hero-body">
          <div className="row wrap" style={{ gap: 6 }}>
            <span className="chip gold">{isLatest ? "Bài hôm nay" : "Bài cũ"} · Ngày {day.day_number}</span>
            <span className="chip">{day.level}</span>
            <span className="chip">{minutesText(day.duration)}</span>
          </div>
          <h1>{day.topic.vi}</h1>
          <div className="en">{day.topic.en}</div>
          <p className="muted small" style={{ margin: "10px 0 0" }}>{dateVi(day.date)}</p>
          <div className="hero-actions">
            <button className="btn gold" onClick={() => start()}>
              {playing ? <IconPause size={18} /> : <IconPlay size={18} />} {label}
            </button>
            <button className="btn" onClick={doDownload} title="Lưu vào máy để nghe khi không có mạng">
              {dl === "yes" ? <><IconCheck size={18} /> Đã tải</> : dl === "busy" ? <>{pct}%</> : <><IconDownload size={18} /> Tải về</>}
            </button>
          </div>
          <div style={{ marginTop: 16 }}>
            <div className="bar"><i style={{ width: `${Math.min(100, (pos / day.duration) * 100)}%` }} /></div>
            <div className="row between tiny muted" style={{ marginTop: 6 }}>
              <span>{clock(pos)}</span><span>{clock(day.duration)}</span>
            </div>
          </div>
        </div>
      </article>

      <div className="section stats">
        <div className="stat">
          <div className="row" style={{ gap: 8 }}>
            <div className="ring" style={{ ["--p" as string]: Math.min(100, (todaySec / goal) * 100) }}><span /></div>
            <b>{Math.round(todaySec / 60)}′</b>
          </div>
          <span>/ {s.goalMinutes} phút hôm nay</span>
        </div>
        <div className="stat"><b className="row" style={{ gap: 6 }}><IconFlame size={20} />{st}</b><span>ngày liên tiếp</span></div>
        <div className="stat"><b>{(total / 3600).toFixed(1)}</b><span>giờ đã nghe</span></div>
      </div>

      <section className="section">
        <div className="section-head"><h2>Bốn phần của bài</h2><span className="small muted">Chạm để nghe từ đầu phần</span></div>
        <div className="chapters">
          {chapters.map((c) => {
            const i = day.chapters.indexOf(c);
            const cur = active && p.chapter === i;
            const done = pos >= c.end - 2;
            return (
              <button key={i} className={`chapter${cur ? " current" : ""}${done ? " done" : ""}`}
                onClick={async () => { await load(day, true); gotoChapter(i); }}>
                <span className="num">{done ? <IconCheck size={18} /> : c.part}</span>
                <span><span className="t">{PART_NAMES[c.part].vi}</span><br /><span className="h">{PART_NAMES[c.part].hint}</span></span>
                <span className="small muted">{Math.round((c.end - c.start) / 60)} phút</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>15 cụm từ hôm nay</h2>
          <button className="small gold" onClick={() => go(`/day/${day.date}/text`)}>Xem lời thoại →</button>
        </div>
        <div className="phrase-grid">
          {day.phrases.map((ph) => (
            <div key={ph.id} className="phrase">
              <span className="en">{ph.en}</span>
              <span className="vi">{ph.vi}</span>
              <span className="say-wrap" style={{ gridRow: "1 / span 2", gridColumn: 2 }}><Say day={day} refId={ph.id} /></span>
            </div>
          ))}
        </div>
        {day.review.length > 0 && (
          <p className="small muted" style={{ marginTop: 12 }}>
            Phần 4 hôm nay ôn lại <b className="gold">{day.review.length}</b> cụm từ của các ngày trước theo lịch 1-3-7-14-30-60 ngày.
          </p>
        )}
      </section>

      <section className="section">
        <div className="section-head"><h2>Cách học này hoạt động thế nào</h2></div>
        <div className="method">
          <div className="card"><span className="ic-gold"><IconHeadphones size={19} /></span><h3>Nghe hiểu được, nghe thật nhiều</h3><p>Mỗi câu đều có nghĩa tiếng Việt và bản đọc chậm trước khi nghe tốc độ thật, nên tai bạn luôn hiểu được thứ mình đang nghe.</p></div>
          <div className="card"><span className="ic-gold"><IconSparkle size={19} /></span><h3>Lặp lại có chủ đích</h3><p>Cùng 15 cụm từ xuất hiện trong ví dụ, hội thoại và bài nghe dài. Gặp lại nhiều lần trong ngữ cảnh khác nhau là cách nhớ lâu nhất.</p></div>
          <div className="card"><span className="ic-gold"><IconBook size={19} /></span><h3>Ôn đúng lúc sắp quên</h3><p>Cụm từ cũ quay lại sau 1, 3, 7, 14, 30 và 60 ngày. Tự kiểm tra trong <a href="#/notebook">Sổ tay</a> để lịch ôn hợp với trí nhớ của bạn.</p></div>
        </div>
        <div className="row wrap" style={{ marginTop: 14, gap: 8 }}>
          <button className="btn sm" onClick={() => go(`/day/${day.date}/text`)}><IconText size={16} /> Lời thoại & phụ đề</button>
          <a className="btn sm" href={`./days/${day.date}/subs.srt`} download>Tải phụ đề SRT</a>
        </div>
      </section>
    </div>
  );
}
