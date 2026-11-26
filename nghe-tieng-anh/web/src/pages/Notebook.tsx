import { useEffect, useMemo, useState } from "react";
import { Say } from "../components/Say";
import { IconCheck, IconClose, IconEye, IconSparkle } from "../components/Icons";
import { loadDay } from "../lib/data";
import { shortDateVi } from "../lib/fmt";
import { answer, cardFor, INTERVALS, todayKey, useSrs } from "../lib/store";
import type { DayData, IndexData } from "../lib/types";

interface Item { key: string; en: string; vi: string; id: string; date: string; day: number }

function useDays(dates: string[]) {
  const [days, setDays] = useState<Record<string, DayData>>({});
  useEffect(() => {
    let live = true;
    dates.forEach((d) => loadDay(d).then((x) => live && setDays((s) => ({ ...s, [d]: x }))).catch(() => undefined));
    return () => {
      live = false;
    };
  }, [dates.join(",")]); // eslint-disable-line react-hooks/exhaustive-deps
  return days;
}

export function Notebook({ index }: { index: IndexData }) {
  const srs = useSrs();
  const today = todayKey();
  const items: Item[] = useMemo(
    () => index.days.flatMap((d) => d.phrases.map((p) => ({ key: p.en, en: p.en, vi: p.vi, id: p.id, date: d.date, day: d.day_number }))),
    [index],
  );
  const due = items.filter((it) => cardFor(it.key, it.date, srs).due <= today);
  const mastered = items.filter((it) => cardFor(it.key, it.date, srs).stage >= INTERVALS.length).length;
  const [session, setSession] = useState<Item[] | null>(null);
  const [q, setQ] = useState("");
  const days = useDays(index.days.map((d) => d.date));
  const shown = items.filter((it) => !q || (it.en + " " + it.vi).toLowerCase().includes(q.toLowerCase()));

  function exportTaps() {
    const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), taps: srs.taps }, null, 1)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `nghe-taps-${today}.json`;
    a.click();
  }

  if (session) return <Review items={session} days={days} onDone={() => setSession(null)} />;

  return (
    <div>
      <h1 className="page-title">Sổ tay cụm từ</h1>
      <p className="lead">Tất cả cụm từ bạn đã gặp. Tự kiểm tra để lịch ôn khớp với trí nhớ của bạn: biết rồi thì giãn ra, chưa nhớ thì ôn lại từ ngày mai.</p>

      <div className="stats">
        <div className="stat"><b>{items.length}</b><span>cụm từ</span></div>
        <div className="stat"><b className="gold">{due.length}</b><span>cần ôn hôm nay</span></div>
        <div className="stat"><b>{mastered}</b><span>đã thuộc</span></div>
      </div>

      <div className="card gold-edge section row between wrap" style={{ gap: 12 }}>
        <div className="row" style={{ gap: 12 }}>
          <span className="ic-gold"><IconSparkle size={19} /></span>
          <div>
            <b>Tự kiểm tra {Math.min(due.length, 20) || ""} cụm từ</b>
            <div className="small muted">{due.length ? "Khoảng 3 phút. Nghe, nhớ nghĩa, rồi tự chấm." : "Hôm nay bạn ôn xong rồi. Có thể luyện thêm."}</div>
          </div>
        </div>
        <button className="btn gold" onClick={() => setSession((due.length ? due : items).slice(0, 20))}>Bắt đầu</button>
      </div>

      <div className="section">
        <input className="search" placeholder="Tìm cụm từ hoặc nghĩa…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="stack" style={{ marginTop: 12, gap: 8 }}>
        {shown.map((it) => {
          const c = cardFor(it.key, it.date, srs);
          const day = days[it.date];
          return (
            <div key={it.date + it.id} className="phrase" style={{ gridTemplateColumns: "1fr auto auto" }}>
              <span className="en">{it.en}</span>
              <span className="vi">{it.vi}</span>
              <span style={{ gridColumn: 2, gridRow: "1 / span 2", textAlign: "right" }} className="tiny faint">
                <span className="stage" title={`Mức ${c.stage}/${INTERVALS.length}`}>
                  {INTERVALS.map((_, i) => <i key={i} className={i < c.stage ? "on" : ""} />)}
                </span>
                <br />{c.due <= today ? <span className="gold">ôn hôm nay</span> : `ôn ${shortDateVi(c.due)}`}
              </span>
              <span style={{ gridColumn: 3, gridRow: "1 / span 2" }}>{day && <Say day={day} refId={it.id} />}</span>
            </div>
          );
        })}
      </div>
      <div className="row wrap section" style={{ gap: 8 }}>
        <button className="btn sm" onClick={exportTaps}>Xuất kết quả tự kiểm tra (JSON)</button>
        <span className="small faint">Dùng cho máy tạo bài: lệnh <code>python -m nghe import-taps</code> để Phần 4 ôn đúng những cụm bạn còn quên.</span>
      </div>
    </div>
  );
}

function Review({ items, days, onDone }: { items: Item[]; days: Record<string, DayData>; onDone: () => void }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [score, setScore] = useState({ knew: 0, forgot: 0 });
  const it = items[i];
  const day = it ? days[it.date] : undefined;
  const ex = day?.phrases.find((p) => p.id === it?.id)?.examples[0];

  if (!it) {
    return (
      <div className="flash" style={{ marginTop: 10 }}>
        <div className="ic-gold" style={{ margin: "0 auto" }}><IconCheck /></div>
        <div className="en">Xong rồi!</div>
        <div className="muted">Biết: <b className="gold">{score.knew}</b> · Cần ôn thêm: <b>{score.forgot}</b></div>
        <div><button className="btn gold" onClick={onDone} style={{ marginTop: 10 }}>Về sổ tay</button></div>
      </div>
    );
  }
  function mark(knew: boolean) {
    answer(it.key, it.date, knew);
    setScore((s) => (knew ? { ...s, knew: s.knew + 1 } : { ...s, forgot: s.forgot + 1 }));
    setShown(false);
    setI(i + 1);
  }
  return (
    <div>
      <div className="row between" style={{ marginBottom: 12 }}>
        <button className="icon-btn" onClick={onDone} aria-label="Thoát"><IconClose /></button>
        <span className="small muted">{i + 1} / {items.length}</span>
        <span style={{ width: 42 }} />
      </div>
      <div className="bar" style={{ marginBottom: 16 }}><i style={{ width: `${(i / items.length) * 100}%` }} /></div>
      <div className="flash">
        <div className="tiny faint">Ngày {it.day}</div>
        <div className="en">{it.en}</div>
        <div className="row" style={{ justifyContent: "center", gap: 10 }}>
          {day && <><Say day={day} refId={it.id} slow /><Say day={day} refId={it.id} /></>}
        </div>
        {shown ? (
          <>
            <div className="vi">{it.vi}</div>
            {ex && <div className="ex">“{ex.en}”<br />{ex.vi}</div>}
          </>
        ) : (
          <div><button className="btn" onClick={() => setShown(true)}><IconEye size={18} /> Hiện nghĩa</button></div>
        )}
      </div>
      <div className="answer">
        <button className="btn bad" onClick={() => mark(false)}>Chưa nhớ</button>
        <button className="btn good" onClick={() => mark(true)}>Biết rồi</button>
      </div>
    </div>
  );
}
