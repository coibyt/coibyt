import Image from "next/image";
import { ArrowRight, Clock, Globe, GraduationCap, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { catalogue, liveLessons } from "@/lib/academy";

const TEXT = {
  vi: {
    eyebrow: "VaraaAi Academy · Miễn phí",
    title: "Học thêm nghề đẹp, ngay trên điện thoại",
    body: "Video bài học có lời thuyết minh: làm nail, nối mi, cắt tóc, spa, vệ sinh salon, cách đặt lịch và quản lý salon. Học xong nhận chứng chỉ.",
    cta: "Vào Học viện",
    courses: "khóa học",
    lessons: "bài video",
    tileLessons: "bài",
    hours: "giờ học",
    langs: "Việt · Anh · Phần Lan",
    tiles: { "p-nail": "Nail", "p-lash": "Nối mi", "p-hair": "Cắt tóc", "p-spa": "Spa" },
  },
  en: {
    eyebrow: "VaraaAi Academy · Free",
    title: "Learn more beauty skills, right on your phone",
    body: "Narrated video lessons: nails, lash extensions, haircuts, spa, salon hygiene, booking and running a salon. Finish a course and get a certificate.",
    cta: "Go to the Academy",
    courses: "courses",
    lessons: "video lessons",
    tileLessons: "lessons",
    hours: "hours",
    langs: "English · Finnish · Vietnamese",
    tiles: { "p-nail": "Nails", "p-lash": "Lashes", "p-hair": "Haircuts", "p-spa": "Spa" },
  },
  fi: {
    eyebrow: "VaraaAi Academy · Ilmainen",
    title: "Opi lisää kauneusalaa suoraan puhelimella",
    body: "Selostetut videotunnit: kynnet, ripsienpidennykset, hiustenleikkaus, spa, salongin hygienia, varaaminen ja salongin hoito. Suorita kurssi ja saat todistuksen.",
    cta: "Siirry Akatemiaan",
    courses: "kurssia",
    lessons: "opetusvideota",
    tileLessons: "videota",
    hours: "tuntia",
    langs: "Suomi · Englanti · Vietnam",
    tiles: { "p-nail": "Kynnet", "p-lash": "Ripset", "p-hair": "Hiukset", "p-spa": "Spa" },
  },
};

const TILE_IDS = ["p-nail", "p-lash", "p-hair", "p-spa"] as const;

/** Home page banner for the Academy (owner, 2026-11-25): a premium dark card with
 * the course numbers, four craft course pictures and a link to /academy. */
export function AcademyHomeBanner({ locale }: { locale: string }) {
  const s = TEXT[locale as keyof typeof TEXT] ?? TEXT.en;
  const courses = catalogue(locale);
  const live = liveLessons();
  const hours = Math.max(1, Math.round(live.reduce((a, l) => a + (l.video?.seconds ?? 0), 0) / 3600));
  const tiles = TILE_IDS.flatMap((id) => courses.filter((c) => c.id === id));

  const stats: [typeof GraduationCap, string, string][] = [
    [GraduationCap, String(courses.length), s.courses],
    [PlayCircle, String(live.length), s.lessons],
    [Clock, `${hours}+`, s.hours],
  ];

  return (
    <section className="container pb-14 sm:pb-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1d1430] via-[#241a3d] to-[#130d20] p-6 text-white ring-1 ring-[#e8d3a6]/25 sm:p-10 lg:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#b08a3e]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-primary-500/35 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8d3a6]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#e8d3a6] ring-1 ring-[#e8d3a6]/30">
              <GraduationCap className="h-3.5 w-3.5" />
              {s.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{s.title}</h2>
            <p className="mt-3 max-w-xl text-white/75">{s.body}</p>

            <ul className="mt-6 grid max-w-md grid-cols-3 gap-2 sm:gap-3">
              {stats.map(([Icon, n, label]) => (
                <li key={label} className="rounded-2xl bg-white/[0.06] px-3 py-3 text-center ring-1 ring-white/10">
                  <Icon className="mx-auto h-4 w-4 text-[#e8d3a6]" />
                  <div className="mt-1 text-xl font-extrabold sm:text-2xl">{n}</div>
                  <div className="text-[11px] font-medium leading-tight text-white/60 sm:text-xs">{label}</div>
                </li>
              ))}
            </ul>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/55">
              <Globe className="h-3.5 w-3.5" />
              {s.langs}
            </p>

            <div className="mt-6">
              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a] px-7 py-3.5 text-base font-bold text-[#2a1d0b] shadow-[0_12px_32px_-8px_rgba(176,138,62,0.75)] transition-transform hover:scale-[1.02]"
              >
                {s.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {tiles.map((c, i) => (
              <Link
                key={c.id}
                href={`/academy/khoa-hoc/${c.slug}`}
                className={`group relative block aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/15 ${i % 2 ? "translate-y-4" : ""}`}
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 260px, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2">
                  <span className="text-sm font-bold drop-shadow">{s.tiles[c.id as (typeof TILE_IDS)[number]]}</span>
                  <span className="rounded-full bg-black/45 px-2 py-0.5 text-[11px] font-semibold text-[#e8d3a6] ring-1 ring-[#e8d3a6]/30">
                    {c.live} {s.tileLessons}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
