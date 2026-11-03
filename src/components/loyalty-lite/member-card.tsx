import { Star } from "lucide-react";

/** Loyalty Lite's VIP card: plum with a gold edge, the stamp slots and,
 * when given, the QR. Server-safe; used on the landing page, in the studio
 * and on the customer's card page. */
export function LiteMemberCard({
  salonName,
  customerName,
  token,
  stamps,
  required,
  reward,
  qr,
  labels,
  compact = false,
}: {
  salonName: string;
  customerName: string;
  token: string;
  stamps: number;
  required: number;
  reward: string;
  qr?: string | null;
  labels: { member: string; code: string; reward: string; progress: string };
  compact?: boolean;
}) {
  const have = Math.min(stamps, required);
  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/40 bg-gradient-to-br from-[#e0559b] via-[#c42d7f] to-[#7a1d55] p-5 text-white shadow-[0_30px_60px_-30px_rgba(163,21,95,0.85)] sm:p-6">
      <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-[#ffd1e8]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
      <div className="relative flex items-start justify-between gap-3">
        <p className="min-w-0 truncate font-serif text-xl italic text-[#ffe3f1]">{salonName}</p>
        <span className="shrink-0 rounded-full bg-gradient-to-br from-[#e8d3a6] via-[#c9a96e] to-[#a8843f] px-3 py-1 text-[10px] font-extrabold tracking-[0.2em] text-[#1f182d]">VIP</span>
      </div>
      <p className="relative mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">{labels.member}</p>
      <p className="relative truncate font-serif text-2xl">{customerName}</p>

      {qr && !compact && (
        <div className="relative mx-auto mt-5 w-fit rounded-2xl bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={qr} alt={`QR ${token}`} width={180} height={180} className="h-[180px] w-[180px]" />
        </div>
      )}

      <div className="relative mt-5">
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{labels.progress}</p>
        <div className="mx-auto grid w-fit grid-cols-5 gap-1.5">
          {Array.from({ length: required }).map((_, i) => {
            const on = i < have;
            const last = i === required - 1;
            return (
              <span
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${
                  on
                    ? last
                      ? "bg-gradient-to-br from-[#e8d3a6] to-[#b9852d] text-[#1f182d]"
                      : "bg-white text-[#a3155f]"
                    : last
                      ? "border-[1.5px] border-dashed border-[#f5d48a] text-[#f5d48a]"
                      : "border-[1.5px] border-dashed border-white/45 text-white/70"
                }`}
              >
                {last ? <Star className={`h-3.5 w-3.5 ${on ? "fill-[#1f182d]" : ""}`} /> : on ? "✓" : i + 1}
              </span>
            );
          })}
        </div>
      </div>

      <dl className="relative mt-5 divide-y divide-white/25 border-t border-white/25 text-sm">
        <div className="flex items-center justify-between gap-3 py-2.5">
          <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{labels.code}</dt>
          <dd className="font-mono font-bold tracking-[0.15em] text-[#ffe3f1]">{token}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 pt-2.5">
          <dt className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">{labels.reward}</dt>
          <dd className="text-right font-semibold">{reward}</dd>
        </div>
      </dl>
    </div>
  );
}
