/** "New lessons" emails to learners who follow an Academy course. Run by the
 * reminders cron; each follow remembers the last publish day it was told
 * about, so nobody gets the same lesson twice. */
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { SITE_URL, button, emailLayout, esc, greeting, para, steps } from "@/lib/email/ui";
import { lessonsOfCourse, pageCourse } from "@/lib/academy";
import { courseSeoById } from "@/lib/academy/course-pages";
import { pick } from "@/lib/academy/types";
import { todayUtc, unfollowToken } from "@/lib/academy/community";

const T = {
  vi: {
    subject: (n: number, c: string) => `${n} bài mới trong khóa ${c}`,
    eyebrow: "Học viện VaraaAi",
    title: (n: number, c: string) => `Khóa ${c} có ${n} bài mới`,
    intro: "Bài mới vừa lên, miễn phí như mọi bài khác. Xem ngay trên điện thoại.",
    hi: "Chào",
    body: "Bạn đã bấm “Nhận bài mới qua email” ở khóa học này. Đây là những bài vừa ra mắt:",
    cta: "Xem bài mới",
    why: "Bạn nhận email này vì đã chọn nhận bài mới của khóa học này.",
    stop: "Không nhận nữa",
  },
  en: {
    subject: (n: number, c: string) => `${n} new ${n === 1 ? "lesson" : "lessons"} in ${c}`,
    eyebrow: "VaraaAi Academy",
    title: (n: number, c: string) => `${n} new ${n === 1 ? "lesson" : "lessons"} in ${c}`,
    intro: "Just published, and free like every other lesson. Watch it on your phone.",
    hi: "Hi",
    body: "You asked to hear about new lessons in this course. Here is what's new:",
    cta: "Watch the new lesson",
    why: "You get this email because you chose to hear about new lessons in this course.",
    stop: "Stop these emails",
  },
  fi: {
    subject: (n: number, c: string) => `${n} ${n === 1 ? "uusi oppitunti" : "uutta oppituntia"}: ${c}`,
    eyebrow: "VaraaAi-akatemia",
    title: (n: number, c: string) => `${c}: ${n} ${n === 1 ? "uusi oppitunti" : "uutta oppituntia"}`,
    intro: "Juuri julkaistu ja ilmainen kuten kaikki muutkin. Katso puhelimellasi.",
    hi: "Hei",
    body: "Halusit tiedon tämän kurssin uusista oppitunneista. Tässä uudet:",
    cta: "Katso uusi oppitunti",
    why: "Saat tämän viestin, koska halusit tiedon tämän kurssin uusista oppitunneista.",
    stop: "Lopeta viestit",
  },
};

const sitePath = (locale: string, path: string) => `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}${path}`;

export async function sendAcademyUpdates(max = 100) {
  // A lesson is announced from the day after its publish date, so the deploy
  // that brings it to the site has surely finished.
  const today = todayUtc();
  const follows = await prisma.academyFollow.findMany({
    take: 2000,
    orderBy: { createdAt: "asc" },
    select: { id: true, courseId: true, locale: true, notifiedThrough: true, user: { select: { name: true, email: true, isGuest: true } } },
  });
  let sent = 0;
  for (const f of follows) {
    if (sent >= max) break;
    const course = pageCourse(f.courseId);
    if (!course) continue;
    const fresh = lessonsOfCourse(f.courseId).filter((l) => l.video && l.video.published > f.notifiedThrough && l.video.published < today);
    if (fresh.length === 0) continue;
    const through = fresh.reduce((m, l) => (l.video!.published > m ? l.video!.published : m), f.notifiedThrough);
    if (f.user.isGuest || !f.user.email || f.user.email.endsWith("@guest.varaaai.com")) {
      await prisma.academyFollow.update({ where: { id: f.id }, data: { notifiedThrough: through } });
      continue;
    }
    const locale = f.locale === "en" || f.locale === "fi" ? f.locale : "vi";
    const t = T[locale];
    const name = pick(course.title, locale);
    const slug = courseSeoById(f.courseId)?.slug;
    const stopUrl = `${SITE_URL}/api/academy/unfollow?f=${encodeURIComponent(f.id)}&t=${unfollowToken(f.id)}`;
    const html = emailLayout({
      locale,
      preheader: t.intro,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: esc(t.title(fresh.length, name)), intro: esc(t.intro), tone: "gold", badge: "▶" },
      body: [
        greeting(t.hi, f.user.name || ""),
        para(esc(t.body)),
        steps(
          fresh.map((l) => ({
            title: `<a href="${esc(sitePath(locale, `/academy/${l.slug}`))}" style="color:#231d2e;text-decoration:none">${esc(pick(l.title, locale))}</a>`,
            body: esc(pick(l.summary, locale)),
          }))
        ),
        button(sitePath(locale, `/academy/${fresh[0].slug}`), esc(t.cta), { variant: "gold" }),
        slug ? para(`<a href="${esc(sitePath(locale, `/academy/khoa-hoc/${slug}`))}">${esc(name)}</a>`, { center: true, small: true, mt: 18 }) : "",
      ].join(""),
      footerNote: `${esc(t.why)} <a href="${esc(stopUrl)}" style="color:#624f89">${esc(t.stop)}</a>.`,
    });
    try {
      await sendMail({ to: f.user.email, subject: t.subject(fresh.length, name), html });
      await prisma.academyFollow.update({ where: { id: f.id }, data: { notifiedThrough: through } });
      sent++;
    } catch (err) {
      console.error("[academy] new-lesson email", f.id, err);
    }
  }
  return sent;
}
