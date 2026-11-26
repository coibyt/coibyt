import { useEffect, useState } from "react";
import { IconTrash } from "../components/Icons";
import { cachedUrls, removeCached } from "../lib/offline";
import { setRate, setSleep } from "../lib/player";
import { progressStore, settingsStore, srsStore, useSettings, type Settings as S } from "../lib/store";

const TOPICS: [string, string][] = [
  ["work", "Công sở"], ["daily", "Đời sống"], ["travel", "Du lịch"], ["food", "Ăn uống"], ["health", "Sức khoẻ"],
  ["shopping", "Mua sắm"], ["tech", "Công nghệ"], ["family", "Gia đình"], ["business", "Kinh doanh"], ["nordic", "Sống ở Bắc Âu"],
];

function Seg<T extends string | number>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <div className="seg" role="radiogroup">
      {options.map(([v, l]) => (
        <button key={String(v)} role="radio" aria-checked={value === v} className={value === v ? "on" : ""} onClick={() => onChange(v)}>{l}</button>
      ))}
    </div>
  );
}

export function Settings() {
  const s = useSettings();
  const [offline, setOffline] = useState<string[]>([]);
  const [msg, setMsg] = useState("");
  const upd = (patch: Partial<S>) => settingsStore.set((x) => ({ ...x, ...patch }));
  const refresh = () => void cachedUrls().then(setOffline);
  useEffect(refresh, []);

  function backup() {
    const data = { settings: settingsStore.get(), progress: progressStore.get(), srs: srsStore.get(), exported: new Date().toISOString() };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
    a.download = "nghe-tieng-anh-sao-luu.json";
    a.click();
  }
  function restore(file: File) {
    file.text().then((t) => {
      try {
        const d = JSON.parse(t);
        if (d.settings) settingsStore.set(d.settings);
        if (d.progress) progressStore.set(d.progress);
        if (d.srs) srsStore.set(d.srs);
        setMsg("Đã khôi phục dữ liệu.");
      } catch {
        setMsg("File không hợp lệ.");
      }
    });
  }

  return (
    <div>
      <h1 className="page-title">Cài đặt</h1>
      <p className="lead">Tuỳ chỉnh cách nghe trên máy này.</p>

      <section className="card">
        <div className="upper gold">Nghe</div>
        <div className="set-row">
          <div className="l"><b>Mục tiêu mỗi ngày</b><span>Dùng cho vòng tiến độ và chuỗi ngày</span></div>
          <Seg value={s.goalMinutes} options={[[30, "30′"], [60, "1 giờ"], [90, "1,5 giờ"], [120, "2 giờ"]]} onChange={(v) => upd({ goalMinutes: v })} />
        </div>
        <div className="set-row">
          <div className="l"><b>Tốc độ mặc định</b><span>Giọng đọc vẫn giữ nguyên cao độ</span></div>
          <Seg value={s.speed} options={[[0.85, "0.85x"], [1, "1x"], [1.1, "1.1x"], [1.25, "1.25x"]]} onChange={(v) => setRate(v)} />
        </div>
        <div className="set-row">
          <div className="l"><b>Hiện nghĩa tiếng Việt</b><span>Trong trình phát và lời thoại</span></div>
          <button className={`switch${s.showVi ? " on" : ""}`} role="switch" aria-checked={s.showVi} aria-label="Hiện nghĩa tiếng Việt" onClick={() => upd({ showVi: !s.showVi })} />
        </div>
        <div className="set-row">
          <div className="l"><b>Hẹn giờ tắt mặc định</b><span>Tự bật mỗi lần mở bài</span></div>
          <Seg value={s.sleepDefault} options={[[0, "Tắt"], [30, "30′"], [60, "60′"]]} onChange={(v) => { upd({ sleepDefault: v }); setSleep(v); }} />
        </div>
      </section>

      <section className="card section">
        <div className="upper gold">Nội dung bài tự động</div>
        <p className="small muted" style={{ margin: "6px 0 0" }}>Áp dụng cho các bài được tạo từ ngày mai.</p>
        <div className="set-row">
          <div className="l"><b>Trình độ</b><span>Độ khó của từ và câu</span></div>
          <Seg value={s.level} options={[["A1-A2", "Mới bắt đầu"], ["A2-B1", "Cơ bản"], ["B1-B2", "Khá"]]} onChange={(v) => upd({ level: v })} />
        </div>
        <div className="set-row" style={{ display: "block" }}>
          <div className="l"><b>Chủ đề yêu thích</b><span>Chọn vài chủ đề, bài mới sẽ xoay vòng</span></div>
          <div className="row wrap" style={{ gap: 6, marginTop: 10 }}>
            {TOPICS.map(([k, l]) => {
              const on = s.topics.includes(k);
              return (
                <button key={k} className={`chip${on ? " on" : ""}`} aria-pressed={on}
                  onClick={() => upd({ topics: on ? s.topics.filter((x) => x !== k) : [...s.topics, k] })}>{l}</button>
              );
            })}
          </div>
        </div>
        <div className="set-row">
          <div className="l"><b>Độ dài mỗi ngày</b><span>Bản ngắn bớt số vòng lặp lại</span></div>
          <Seg value={s.dailyLength} options={[["1h", "1 giờ"], ["1h30", "1,5 giờ"], ["2h", "2 giờ"]]} onChange={(v) => upd({ dailyLength: v })} />
        </div>
        <div className="set-row">
          <div className="l"><b>Giọng đọc</b><span>6 giọng 11max (3 Anh, 3 Việt)</span></div>
          <Seg value={s.voiceVariety} options={[["rotate", "Luân phiên"], ["fixed", "Cố định"]]} onChange={(v) => upd({ voiceVariety: v })} />
        </div>
      </section>

      <section className="card section">
        <div className="upper gold">Nghe offline</div>
        {offline.length === 0 && <p className="small muted">Chưa tải bài nào. Bấm “Tải về” ở trang Hôm nay để nghe khi không có mạng.</p>}
        {offline.map((u) => {
          const date = u.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? u;
          return (
            <div key={u} className="set-row">
              <div className="l"><b>Bài ngày {date}</b><span>Đã lưu trên máy</span></div>
              <button className="icon-btn" aria-label="Xoá bản tải" onClick={() => removeCached(u).then(refresh)}><IconTrash size={19} /></button>
            </div>
          );
        })}
      </section>

      <section className="card section">
        <div className="upper gold">Dữ liệu của bạn</div>
        <p className="small muted" style={{ margin: "6px 0 10px" }}>Tiến độ, chuỗi ngày và sổ tay được lưu trong trình duyệt này. Sao lưu để chuyển sang máy khác.</p>
        <div className="row wrap" style={{ gap: 8 }}>
          <button className="btn sm" onClick={backup}>Sao lưu</button>
          <label className="btn sm" style={{ cursor: "pointer" }}>Khôi phục<input type="file" accept="application/json" className="sr-only" onChange={(e) => e.target.files?.[0] && restore(e.target.files[0])} /></label>
        </div>
        {msg && <p className="small gold">{msg}</p>}
      </section>
      <p className="tiny faint" style={{ textAlign: "center", marginTop: 24 }}>Nghe Tiếng Anh Mỗi Ngày · giọng đọc 11max · minh hoạ kie.ai</p>
    </div>
  );
}
