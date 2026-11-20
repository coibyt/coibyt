import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { liveLessons } from "@/lib/academy";

/** Academy learning statistics (admin › Học viện). Anonymous: a random
 * browser id, the IP with its last part removed, device type and watch time. */

const LIVE = new Set(liveLessons().map((l) => l.slug));
const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|preview|headless|lighthouse/i;
const EVENTS = new Set(["visit", "open", "watch", "done", "quiz"]);
const none = () => new NextResponse(null, { status: 204 });

/** 85.76.12.34 → 85.76.12.x ; 2001:db8:a:b:… → 2001:db8:a::/48 */
function maskIp(ip: string) {
  const v4 = ip.match(/^(\d+)\.(\d+)\.(\d+)\.\d+$/);
  if (v4) return `${v4[1]}.${v4[2]}.${v4[3]}.x`;
  if (ip.includes(":")) return `${ip.split(":").slice(0, 3).join(":")}::/48`;
  return "unknown";
}

function deviceOf(ua: string) {
  if (/ipad|tablet/i.test(ua)) return "tablet";
  if (/mobi|android|iphone/i.test(ua)) return "mobile";
  return "desktop";
}

const today = () => new Date().toISOString().slice(0, 10);
const int = (x: unknown, max: number) => (typeof x === "number" && Number.isFinite(x) ? Math.max(0, Math.min(max, Math.round(x))) : 0);

export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (BOTS.test(ua)) return none();
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return none();
  }
  const v = typeof b.v === "string" && /^[a-z0-9]{12,40}$/i.test(b.v) ? b.v : null;
  const e = typeof b.e === "string" && EVENTS.has(b.e) ? b.e : null;
  if (!v || !e) return none();
  if (!rateLimit(`academy:${v}`, 120, 60_000)) return none();
  const slug = typeof b.slug === "string" && LIVE.has(b.slug) ? b.slug : null;
  if (e !== "visit" && !slug) return none();

  const now = new Date();
  const day = today();
  const sec = e === "watch" ? int(b.sec, 60) : 0;
  const str = (x: unknown, n: number) => (typeof x === "string" && x ? x.slice(0, n) : undefined);

  try {
    const existing = await prisma.academyVisitor.findUnique({ where: { id: v }, select: { lastDay: true, userId: true } });
    const userId = existing?.userId ?? (await auth())?.user?.id ?? null;
    if (!existing) {
      await prisma.academyVisitor.create({
        data: {
          id: v,
          ipMasked: maskIp(await clientIp()),
          device: deviceOf(ua),
          locale: str(b.loc, 8),
          tab: str(b.tab, 16),
          source: str(b.src, 120),
          userId,
          lastDay: day,
          seconds: sec,
        },
      });
    } else {
      await prisma.academyVisitor.update({
        where: { id: v },
        data: {
          lastSeen: now,
          ...(existing.lastDay !== day ? { lastDay: day, visitDays: { increment: 1 } } : {}),
          ...(sec ? { seconds: { increment: sec } } : {}),
          ...(userId && !existing.userId ? { userId } : {}),
        },
      });
    }

    if (slug) {
      const pos = int(b.pos, 36_000);
      const key = { visitorId_slug: { visitorId: v, slug } };
      const view = await prisma.academyLessonView.findUnique({ where: key, select: { maxPos: true, quizRight: true } });
      if (!view) {
        await prisma.academyLessonView.create({
          data: {
            visitorId: v,
            slug,
            seconds: sec,
            maxPos: pos,
            completed: e === "done",
            ...(e === "quiz" ? { quizRight: int(b.right, 50), quizOf: int(b.of, 50) } : {}),
          },
        });
      } else {
        await prisma.academyLessonView.update({
          where: key,
          data: {
            lastAt: now,
            ...(e === "open" ? { opens: { increment: 1 } } : {}),
            ...(sec ? { seconds: { increment: sec } } : {}),
            ...(pos > view.maxPos ? { maxPos: pos } : {}),
            ...(e === "done" ? { completed: true } : {}),
            ...(e === "quiz" && int(b.right, 50) >= (view.quizRight ?? 0) ? { quizRight: int(b.right, 50), quizOf: int(b.of, 50) } : {}),
          },
        });
      }
    }
  } catch {
    // Two first pings at once can race on the unique keys; losing one ping is fine.
  }
  return none();
}
