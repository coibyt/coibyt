// npx tsx scripts/og/course-copy.ts — writes scripts/og/course-copy.json, the
// text of the course link-preview banners, from the course data.
import fs from "node:fs";
import path from "node:path";
import { catalogue } from "../../src/lib/academy";
import { COURSE_SEO } from "../../src/lib/academy/course-pages";
import { coursePageStrings } from "../../src/lib/academy/course-page-strings";
import { pick } from "../../src/lib/academy/types";

const hours = (seconds: number, locale: string) => {
  const m = Math.round(seconds / 60);
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (locale === "vi") return h ? `${h} giờ ${r} phút` : `${r} phút`;
  return h ? `${h} h ${r} min` : `${r} min`;
};

const out: Record<string, Record<string, unknown>> = {};
for (const seo of COURSE_SEO) {
  for (const locale of ["vi", "en", "fi"]) {
    const c = catalogue(locale).find((x) => x.id === seo.id);
    if (!c) continue; // hidden course
    const s = coursePageStrings(locale);
    const track = c.audience === "pro" ? s.trackPro : c.audience === "owner" ? s.trackOwner : s.trackCustomer;
    const headline = pick(seo.headline, locale);
    const [title, ...rest] = headline.split(":");
    out[seo.slug] ??= {};
    out[seo.slug][locale] = {
      eyebrow: `${s.academy} · ${track}`,
      title: title.trim(),
      // The course name as the gold second line, unless the title already says it.
      accent: rest.length && !title.toLowerCase().includes(c.title.toLowerCase()) ? c.title : "",
      chips: [s.free, s.lessons(c.live), hours(c.seconds, locale), s.certificate.split(" ")[0] === "Chứng" ? "Có chứng nhận" : locale === "fi" ? "Todistus" : "Certificate"],
      cta: s.start,
    };
  }
}
fs.writeFileSync(path.join(__dirname, "course-copy.json"), JSON.stringify(out, null, 2));
console.log(Object.keys(out).length, "courses");
