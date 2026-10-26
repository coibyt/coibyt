"use client";

import { useState } from "react";
import { CalendarCheck, Check, Gift, Heart, Link2, Loader2, Phone, Plus, Share2, Sparkles, Ticket, UserRound } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { loyaltyCardStrings, firstName } from "@/lib/loyalty-card-strings";
import { REFERRAL_TICKETS } from "@/lib/loyalty-referral-constants";

export interface MemberCardData {
  token: string;
  customerName: string;
  points: number;
  rewardReady: boolean;
  rewardsEarned: number;
  inviteUrl: string;
  program: { pointsRequired: number; discountPercent: number } | null;
  business: { name: string; slug: string; logoUrl: string | null; city: string | null; phone: string | null };
  friends: { name: string; rewarded: boolean }[];
  history: { kind: "visit" | "bonus" | "reward"; at: string }[];
}

const MAX_SLOTS = 12;

/** The progress ring with a numbered ticket slot for every ticket needed. */
function TicketRing({ points, total, center }: { points: number; total: number; center: React.ReactNode }) {
  // Fits the card's inner width on a 360px phone, slots included.
  const size = 280;
  const r = 90;
  const c = 2 * Math.PI * r;
  const pct = total > 0 ? Math.min(1, points / total) : 0;
  const slots = total <= MAX_SLOTS ? total : 0;
  const slotR = 121;
  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ead9f0" strokeWidth="10" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#gold)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`}
          className="transition-[stroke-dasharray] duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9b25c" />
            <stop offset="1" stopColor="#a7792b" />
          </linearGradient>
        </defs>
      </svg>
      {Array.from({ length: slots }, (_, i) => {
        const angle = (i / slots) * 2 * Math.PI - Math.PI / 2;
        const x = size / 2 + slotR * Math.cos(angle);
        const y = size / 2 + slotR * Math.sin(angle);
        const filled = i < points;
        return (
          <span
            key={i}
            className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl text-xs font-semibold transition-all ${
              filled
                ? "bg-gradient-to-br from-[#c2378f] to-[#8e2a8a] text-amber-200 shadow-[0_8px_18px_-6px_rgba(142,42,138,0.7)]"
                : "border-2 border-dashed border-[#cdb6d8] bg-white/60 text-[#a58cb3]"
            }`}
            style={{ left: x, top: y }}
          >
            {filled ? <Ticket className="h-4 w-4" /> : i + 1}
          </span>
        );
      })}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{center}</div>
    </div>
  );
}

/** The public member card a loyalty QR opens: tickets, the invite-a-friend
 * link and history — plus an "Add 1 ticket" button for the salon's staff. */
export function LoyaltyMemberCard({
  data,
  locale,
  isStaff,
  signedIn,
}: {
  data: MemberCardData;
  locale: string;
  isStaff: boolean;
  signedIn: boolean;
}) {
  const S = loyaltyCardStrings(locale);
  const router = useRouter();
  const [toast, setToast] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [staffMsg, setStaffMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const total = data.program?.pointsRequired ?? 10;
  const pctOff = data.program?.discountPercent ?? 0;
  const left = Math.max(0, total - data.points);
  const progress = total > 0 ? Math.round((Math.min(data.points, total) / total) * 100) : 0;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  }

  function copyInvite() {
    navigator.clipboard.writeText(data.inviteUrl).catch(() => {});
    flash(S.copied);
  }

  async function shareInvite() {
    const text = fill(S.invitedBy, { name: firstName(data.customerName) }) + ` ${data.business.name}`;
    if (navigator.share) {
      await navigator.share({ title: data.business.name, text, url: data.inviteUrl }).catch(() => {});
      return;
    }
    copyInvite();
  }

  async function addTicket() {
    setAdding(true);
    setStaffMsg(null);
    const res = await fetch("/api/business/loyalty/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data.token }),
    }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    setAdding(false);
    if (res?.ok) {
      setStaffMsg({
        ok: true,
        text: d.rewardReady
          ? fill(S.staffReady, { total: d.pointsRequired, pct: pctOff })
          : fill(S.staffAdded, { n: d.points, total: d.pointsRequired }),
      });
      router.refresh();
    } else {
      setStaffMsg({
        ok: false,
        text: d?.reason === "NO_NEW_VISIT" ? S.errNoVisit : d?.reason === "REWARD_PENDING" ? S.errPending : S.errGeneric,
      });
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,#f6e8f7_0%,#efe3f6_40%,#f9eef4_100%)] px-4 pb-24 pt-8 sm:pt-12">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#f2c6e2]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 h-72 w-72 rounded-full bg-[#d8c8f2]/60 blur-3xl" />

      <div className="relative mx-auto max-w-md space-y-5">
        {/* The card */}
        <section className="overflow-hidden rounded-[2.25rem] bg-white/75 px-6 pb-8 pt-9 text-center shadow-[0_30px_70px_-35px_rgba(110,40,120,0.55)] ring-1 ring-white backdrop-blur-xl">
          {data.business.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.business.logoUrl} alt="" className="mx-auto mb-3 h-14 w-14 rounded-full object-cover ring-2 ring-[#ead9f0]" />
          )}
          <h1 className="font-serif text-4xl italic leading-tight text-[#6d2a6f]">{data.business.name}</h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.42em] text-[#7c6a85]">{S.memberCard}</p>

          <p className="mt-8 font-serif text-2xl text-[#3d2742]">
            {fill(S.hello, { name: data.customerName })} <span aria-hidden>🌸</span>
          </p>

          <div className="mt-6">
            <TicketRing
              points={Math.min(data.points, total)}
              total={total}
              center={
                <>
                  <span className="font-serif text-5xl text-[#3d2742]">
                    {progress}
                    <span className="text-2xl">%</span>
                  </span>
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.3em] text-[#7c6a85]">
                    {fill(S.ticketsOf, { n: Math.min(data.points, total), total })}
                  </span>
                </>
              }
            />
          </div>

          {data.program &&
            (data.rewardReady ? (
              <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#fff4d6] to-[#fde3ef] p-5 ring-1 ring-[#f2d38a]">
                <p className="flex items-center justify-center gap-2 font-serif text-xl text-[#6d2a6f]">
                  <Gift className="h-5 w-5 text-[#b8862f]" />
                  {S.ready}
                </p>
                <p className="mt-1 text-sm text-[#5b4763]">{fill(S.readyText, { pct: pctOff })}</p>
              </div>
            ) : (
              <p className="mt-6 font-serif text-lg italic leading-relaxed text-[#6b5873]">
                {fill(left === 1 ? S.awayOne : S.away, { n: left, pct: pctOff })} <span aria-hidden>✨</span>
              </p>
            ))}
          {data.rewardsEarned > 0 && (
            <p className="mt-3 text-xs font-medium text-[#8c7896]">{fill(S.rewardsEarned, { n: data.rewardsEarned })}</p>
          )}
        </section>

        {/* Invite a friend */}
        <section className="rounded-[2rem] border-2 border-dashed border-[#e3a9cf] bg-white/70 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-lg font-bold text-[#6d2a6f]">
              <Heart className="h-5 w-5 fill-[#e35da3] text-[#e35da3]" />
              {S.inviteTitle}
            </p>
            <span className="flex items-center gap-1 rounded-full bg-[#fff1cf] px-3 py-1 text-sm font-bold text-[#a7792b]">
              +{REFERRAL_TICKETS}
              <Ticket className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#5b4763]">{fill(S.inviteText, { n: REFERRAL_TICKETS })}</p>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={copyInvite}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_28px_-12px_rgba(185,133,45,0.9)] transition hover:brightness-105"
            >
              <Link2 className="h-4 w-4" />
              {S.copyInvite}
            </button>
            <button
              type="button"
              onClick={shareInvite}
              aria-label={S.share}
              title={S.share}
              className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-white text-[#6d2a6f] ring-1 ring-[#ead9f0] hover:ring-[#d9b25c]"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
          {data.friends.length === 0 ? (
            <p className="mt-4 text-center text-sm text-[#b04b88]">
              {S.noFriends} <span aria-hidden>💕</span>
            </p>
          ) : (
            <div className="mt-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c7896]">{S.friendsTitle}</p>
              <ul className="mt-2 divide-y divide-[#f1e4f3]">
                {data.friends.map((f, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="flex items-center gap-2 font-semibold text-[#3d2742]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f6e8f7] text-[#8e2a8a]">
                        <UserRound className="h-4 w-4" />
                      </span>
                      {f.name}
                    </span>
                    <span className={`text-xs font-semibold ${f.rewarded ? "text-emerald-600" : "text-[#8c7896]"}`}>
                      {f.rewarded ? fill(S.friendRewarded, { n: REFERRAL_TICKETS }) : S.friendPending}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Staff */}
        {isStaff ? (
          <section className="rounded-[2rem] bg-[#2a1830] p-6 text-white shadow-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">{S.staffTitle}</p>
            <button
              type="button"
              onClick={addTicket}
              disabled={adding}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c2378f] to-[#8e2a8a] py-4 text-base font-bold shadow-[0_14px_30px_-12px_rgba(194,55,143,0.9)] transition hover:brightness-110 disabled:opacity-70"
            >
              {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
              {S.staffAdd}
            </button>
            {staffMsg && (
              <p className={`mt-3 flex items-start gap-2 text-sm ${staffMsg.ok ? "text-emerald-300" : "text-amber-200"}`}>
                {staffMsg.ok && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
                {staffMsg.text}
              </p>
            )}
            <Link href="/business/dashboard/loyalty" className="mt-3 block text-center text-xs font-semibold text-white/60 underline-offset-4 hover:underline">
              {S.staffOpen}
            </Link>
          </section>
        ) : null}

        {/* How it works + history */}
        <section className="rounded-[2rem] bg-white/70 p-6 backdrop-blur">
          {data.program && (
            <>
              <p className="flex items-center gap-2 font-bold text-[#6d2a6f]">
                <Sparkles className="h-4 w-4 text-[#c99a3f]" />
                {S.howTitle}
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#5b4763]">
                <li className="flex gap-2">
                  <Ticket className="mt-0.5 h-4 w-4 shrink-0 text-[#8e2a8a]" />
                  {S.howVisit}
                </li>
                <li className="flex gap-2">
                  <Gift className="mt-0.5 h-4 w-4 shrink-0 text-[#8e2a8a]" />
                  {fill(S.howGoal, { total, pct: pctOff })}
                </li>
              </ul>
            </>
          )}
          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8c7896]">{S.historyTitle}</p>
          {data.history.length === 0 ? (
            <p className="mt-2 text-sm text-[#8c7896]">{S.noHistory}</p>
          ) : (
            <ul className="mt-2 divide-y divide-[#f1e4f3]">
              {data.history.map((h, i) => (
                <li key={i} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <span className="flex items-center gap-2 text-[#3d2742]">
                    {h.kind === "reward" ? (
                      <Gift className="h-4 w-4 text-[#b8862f]" />
                    ) : h.kind === "bonus" ? (
                      <Heart className="h-4 w-4 text-[#e35da3]" />
                    ) : (
                      <Ticket className="h-4 w-4 text-[#8e2a8a]" />
                    )}
                    {h.kind === "reward" ? fill(S.rewardUsed, { pct: pctOff }) : h.kind === "bonus" ? S.bonusTicket : S.visitTicket}
                  </span>
                  <span className="flex items-center gap-3 text-xs text-[#8c7896]">
                    {h.kind !== "reward" && (
                      <span className="font-bold text-[#8e2a8a]">+{h.kind === "bonus" ? REFERRAL_TICKETS : 1}</span>
                    )}
                    <span suppressHydrationWarning>{dateFmt.format(new Date(h.at))}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Salon */}
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-[2rem] bg-white/70 p-5 backdrop-blur">
          <div className="min-w-0">
            <p className="truncate font-serif text-lg text-[#3d2742]">{data.business.name}</p>
            {data.business.city && <p className="text-xs text-[#8c7896]">{data.business.city}</p>}
          </div>
          <div className="flex gap-2">
            {data.business.phone && (
              <a
                href={`tel:${data.business.phone}`}
                className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#6d2a6f] ring-1 ring-[#ead9f0]"
              >
                <Phone className="h-4 w-4" />
                {S.call}
              </a>
            )}
            <Link
              href={`/b/${data.business.slug}`}
              className="flex items-center gap-1.5 rounded-full bg-[#6d2a6f] px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
            >
              <CalendarCheck className="h-4 w-4" />
              {S.book}
            </Link>
          </div>
        </section>

        {!signedIn && !isStaff && (
          <Link
            href={`/auth/sign-in?callbackUrl=${encodeURIComponent(`/loyalty/${data.token}`)}`}
            className="block text-center text-xs font-medium text-[#8c7896] underline-offset-4 hover:underline"
          >
            {S.staffSignIn}
          </Link>
        )}
      </div>

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-50 mx-auto flex max-w-md items-center justify-center gap-2 rounded-full bg-[#2a1830] px-5 py-4 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          {toast} <span aria-hidden>🎁</span>
        </div>
      )}
    </div>
  );
}
