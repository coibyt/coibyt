import { useEffect, useState } from "react";
import { FullPlayer, MiniPlayer } from "./components/Player";
import { IconBook, IconCalendar, IconGear, IconHome, IconText } from "./components/Icons";
import { useDay, useIndex } from "./lib/hooks";
import { load, usePlayer } from "./lib/player";
import { go, useRoute } from "./lib/router";
import { progressStore } from "./lib/store";
import { Archive } from "./pages/Archive";
import { Notebook } from "./pages/Notebook";
import { Settings } from "./pages/Settings";
import { Today } from "./pages/Today";
import { Transcript } from "./pages/Transcript";

const NAV = [
  { key: "", label: "Hôm nay", icon: IconHome },
  { key: "text", label: "Lời thoại", icon: IconText },
  { key: "notebook", label: "Sổ tay", icon: IconBook },
  { key: "archive", label: "Lịch", icon: IconCalendar },
  { key: "settings", label: "Cài đặt", icon: IconGear },
];

function Brand() {
  return (
    <a className="brand" href="#/">
      <span className="brand-mark"><img src="./icons/icon-192.png" alt="" width={34} height={34} /></span>
      <span className="brand-name">Nghe <em>mỗi ngày</em></span>
    </a>
  );
}

export function App() {
  const route = useRoute();
  const { data: index, error } = useIndex();
  const player = usePlayer();
  const [open, setOpen] = useState(false);

  // /day/<date>[/text] views an older lesson; otherwise the newest one (or the one being played)
  const routeDate = route[0] === "day" ? route[1] : undefined;
  const latest = index?.days[0]?.date;
  const date = routeDate ?? (route[0] === "text" && player.day ? player.day.date : latest);
  const { day } = useDay(date);
  const section = route[0] === "day" ? (route[2] === "text" ? "text" : "") : route[0] ?? "";

  // Prepare the player with the last lesson (paused) so the mini player and lock screen are ready.
  useEffect(() => {
    if (player.day || !index?.days.length) return;
    const last = progressStore.get().lastLesson;
    const target = index.days.find((d) => d.date === last)?.date ?? index.days[0].date;
    import("./lib/data").then(({ loadDay }) => loadDay(target)).then((d) => load(d, false)).catch(() => undefined);
  }, [index, player.day]);

  let page: React.ReactNode = <div className="empty">Đang tải…</div>;
  if (error) page = <div className="empty">Chưa có bài nào hoặc không tải được dữ liệu.<br /><span className="small faint">{error}</span></div>;
  else if (index) {
    if (section === "notebook") page = <Notebook index={index} />;
    else if (section === "archive") page = <Archive index={index} />;
    else if (section === "settings") page = <Settings />;
    else if (day && section === "text") page = <Transcript day={day} />;
    else if (day) page = <Today day={day} isLatest={day.date === latest} />;
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <Brand />
        <nav className="side-nav">
          {NAV.map((n) => (
            <a key={n.key} href={`#/${n.key}`} className={`side-link${section === n.key ? " active" : ""}`}>
              <n.icon size={20} /> {n.label}
            </a>
          ))}
        </nav>
        <div className="card gold-edge" style={{ marginTop: "auto" }}>
          <div className="upper gold">Mẹo</div>
          <p className="small muted" style={{ margin: "6px 0 0" }}>Nghe nền khi làm việc. Khi có khoảng lặng, khẽ nói theo: chỉ vài giây mỗi lần nhưng hiệu quả gấp nhiều lần.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <Brand />
          {day && <button className="chip gold" onClick={() => go("/archive")}>Ngày {day.day_number}</button>}
        </header>
        {page}
      </main>

      <nav className="tabbar" aria-label="Điều hướng">
        {NAV.map((n) => (
          <a key={n.key} href={`#/${n.key}`} className={`tab${section === n.key ? " active" : ""}`} aria-current={section === n.key ? "page" : undefined}>
            <n.icon size={22} />
            {n.label}
          </a>
        ))}
      </nav>

      <MiniPlayer onOpen={() => setOpen(true)} />
      {open && <FullPlayer onClose={() => setOpen(false)} />}
    </div>
  );
}
