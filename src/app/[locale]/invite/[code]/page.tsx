import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, Check, Clock, Heart, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { loyaltyCardStrings, firstName } from "@/lib/loyalty-card-strings";
import { siteSerif } from "@/lib/site-fonts";
import { ReferralCookie } from "@/components/referral-cookie";

type Params = Promise<{ locale: string; code: string }>;

function findInvite(code: string) {
  return prisma.loyaltyCard.findUnique({
    where: { referralCode: decodeURIComponent(code).trim().toUpperCase() },
    select: {
      referralCode: true,
      customerName: true,
      business: {
        select: {
          id: true,
          name: true,
          slug: true,
          status: true,
          logoUrl: true,
          coverUrl: true,
          city: true,
          addressLine: true,
          services: {
            where: { active: true },
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
            take: 4,
            select: { id: true, name: true, durationMin: true, priceCents: true, currency: true },
          },
        },
      },
    },
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, code } = await params;
  const card = await findInvite(code);
  if (!card) return { robots: { index: false } };
  const S = loyaltyCardStrings(locale);
  const title = `${fill(S.invitedBy, { name: firstName(card.customerName) })} ${card.business.name}`;
  return {
    title,
    robots: { index: false, follow: false },
    openGraph: { title, images: card.business.coverUrl ? [card.business.coverUrl] : undefined },
  };
}

/** Where a customer's invite link lands: who invited you, the salon and a
 * "Book now" button. The code is kept in a cookie so the friend's booking
 * earns the inviter bonus tickets (see recordReferral). */
export default async function InvitePage({ params }: { params: Params }) {
  const { locale, code } = await params;
  const card = await findInvite(code);
  if (!card || card.business.status !== "APPROVED") notFound();
  const S = loyaltyCardStrings(locale);
  const b = card.business;
  const inviter = firstName(card.customerName);

  return (
    <div
      className={`${siteSerif.variable} min-h-screen bg-[radial-gradient(ellipse_at_top,#f6e8f7_0%,#efe3f6_40%,#f9eef4_100%)] px-4 pb-20 pt-8 sm:pt-12`}
    >
      <ReferralCookie businessId={b.id} code={card.referralCode!} />
      <div className="mx-auto max-w-md space-y-5">
        <section className="overflow-hidden rounded-[2.25rem] bg-white/80 text-center shadow-[0_30px_70px_-35px_rgba(110,40,120,0.55)] ring-1 ring-white backdrop-blur-xl">
          {b.coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.coverUrl} alt="" className="h-40 w-full object-cover" />
          ) : (
            <div className="h-24 bg-gradient-to-r from-[#f2c6e2] via-[#e9d5f5] to-[#fde3ef]" />
          )}
          <div className="px-6 pb-8">
            <div className="-mt-9 flex justify-center">
              {b.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={b.logoUrl} alt="" className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-white" />
              ) : (
                <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#6d2a6f] ring-4 ring-white">
                  <Heart className="h-7 w-7 fill-white text-white" />
                </span>
              )}
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7c6a85]">
              {fill(S.invitedBy, { name: inviter })}
            </p>
            <h1 className="mt-2 font-serif text-4xl italic leading-tight text-[#6d2a6f]">{b.name}</h1>
            {(b.addressLine || b.city) && (
              <p className="mt-2 flex items-center justify-center gap-1 text-sm text-[#7c6a85]">
                <MapPin className="h-4 w-4" />
                {[b.addressLine, b.city].filter(Boolean).join(", ")}
              </p>
            )}
            <p className="mt-5 text-sm leading-relaxed text-[#5b4763]">
              {fill(S.inviteLead, { name: inviter, salon: b.name })}
            </p>
            <Link
              href={`/b/${b.slug}`}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] py-4 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_28px_-12px_rgba(185,133,45,0.9)] transition hover:brightness-105"
            >
              <CalendarCheck className="h-5 w-5" />
              {S.inviteCta}
            </Link>
          </div>
        </section>

        {b.services.length > 0 && (
          <section className="rounded-[2rem] bg-white/70 p-6 backdrop-blur">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c7896]">{S.inviteServices}</p>
            <ul className="mt-3 divide-y divide-[#f1e4f3]">
              {b.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/b/${b.slug}`} className="flex items-center justify-between gap-3 py-3 text-sm hover:opacity-80">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-[#3d2742]">{s.name}</span>
                      <span className="flex items-center gap-1 text-xs text-[#8c7896]">
                        <Clock className="h-3.5 w-3.5" />
                        {s.durationMin} min
                      </span>
                    </span>
                    <span className="shrink-0 font-semibold text-[#6d2a6f]">{formatMoney(s.priceCents, s.currency, locale)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-[2rem] bg-white/70 p-6 backdrop-blur">
          <p className="font-bold text-[#6d2a6f]">{S.inviteWhy}</p>
          <ul className="mt-3 space-y-2 text-sm text-[#5b4763]">
            {S.inviteWhyItems.map((item) => (
              <li key={item} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c99a3f]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
