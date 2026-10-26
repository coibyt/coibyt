import { auth } from "@/auth";
import { Link, redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { loyaltyQrPng } from "@/lib/loyalty";

export default async function MyLoyaltyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) redirect({ href: "/auth/sign-in?callbackUrl=/account/loyalty", locale });
  const vi = locale === "vi";

  const email = session!.user.email?.toLowerCase() ?? "";
  const cards = await prisma.loyaltyCard.findMany({
    where: { customerEmail: email },
    include: {
      business: { select: { name: true, slug: true, loyaltyProgram: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const rendered = await Promise.all(
    cards.map(async (c) => {
      const png = await loyaltyQrPng(c.token);
      return { ...c, qr: `data:image/png;base64,${png.toString("base64")}` };
    })
  );

  return (
    <div className="container max-w-2xl space-y-6 py-10">
      <h1 className="text-xl font-bold text-ink-900">{vi ? "Thẻ thành viên của tôi" : "My member cards"}</h1>
      {rendered.length === 0 ? (
        <p className="text-sm text-ink-400">
          {vi
            ? "Bạn chưa có thẻ thành viên nào. Salon sẽ kích hoạt thẻ cho bạn và gửi mã QR qua email."
            : "You don't have a loyalty card yet. The salon will activate one and email you the QR."}
        </p>
      ) : (
        rendered.map((c) => {
          const p = c.business.loyaltyProgram;
          const left = p ? Math.max(0, p.pointsRequired - c.points) : 0;
          return (
            <section key={c.id} className="card space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink-900">{c.business.name}</p>
                  {p && (
                    <p className="text-xs text-ink-400">
                      {vi
                        ? `Đủ ${p.pointsRequired} vé, được giảm ${p.discountPercent}%`
                        : `Collect ${p.pointsRequired} tickets, get ${p.discountPercent}% off`}
                    </p>
                  )}
                </div>
                <img src={c.qr} alt="QR" width={140} height={140} className="rounded-lg" />
              </div>
              <p className="text-sm text-ink-700">
                {vi ? "Số vé" : "Tickets"}: <b>{c.points}</b>
                {p && (
                  <>
                    {" / "}
                    {p.pointsRequired}
                  </>
                )}
              </p>
              {c.rewardReady ? (
                <p className="rounded-lg bg-sage-50 p-3 text-sm font-semibold text-sage-700">
                  {vi
                    ? `Bạn đã đủ vé — được giảm ${p?.discountPercent ?? 0}% cho lần làm tiếp theo!`
                    : `You've reached the goal — ${p?.discountPercent ?? 0}% off your next visit!`}
                </p>
              ) : (
                <p className="text-sm text-ink-700">
                  {vi ? `Còn ${left} vé nữa là được giảm giá` : `${left} more ticket(s) to unlock your discount`}
                </p>
              )}
              <p className="text-xs text-ink-400">
                {vi ? "Mã thẻ" : "Card code"}: <span className="font-mono">{c.token}</span>
              </p>
              <Link href={`/loyalty/${c.token}`} className="btn-primary inline-flex">
                {vi ? "Mở thẻ & mời bạn bè (+2 vé)" : "Open card & invite friends (+2 tickets)"}
              </Link>
            </section>
          );
        })
      )}
    </div>
  );
}
