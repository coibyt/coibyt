"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, MailOpen, MailX, MousePointerClick, Send, UserX, Users, type LucideIcon } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import type { MarketingStudioStrings } from "@/lib/marketing-studio-strings";

export type AudienceGroup = "OPENED" | "CLICKED" | "NOT_OPENED" | "UNSUBSCRIBED";
export type SendableGroup = Exclude<AudienceGroup, "UNSUBSCRIBED">;

interface GroupData {
  count: number;
  people: { name: string; email: string | null }[];
  eligible: number;
  cooldown: number;
}
export interface AudienceData {
  tracked: boolean;
  groups: Record<AudienceGroup, GroupData>;
}

export const GROUP_ICONS: Record<AudienceGroup, LucideIcon> = {
  OPENED: MailOpen,
  CLICKED: MousePointerClick,
  NOT_OPENED: MailX,
  UNSUBSCRIBED: UserX,
};

const GROUPS = ["OPENED", "CLICKED", "NOT_OPENED", "UNSUBSCRIBED"] as const;

/** Each group's colours: the icon tile, the selected card, the bar and the avatars. */
const LOOK: Record<AudienceGroup, { tile: string; card: string; bar: string; avatar: string; text: string }> = {
  OPENED: {
    tile: "from-emerald-400 to-teal-600",
    card: "bg-gradient-to-br from-emerald-50 to-white ring-emerald-300",
    bar: "bg-emerald-500",
    avatar: "bg-emerald-100 text-emerald-700",
    text: "text-emerald-700",
  },
  CLICKED: {
    tile: "from-[#8b6fc0] to-[#4b3878]",
    card: "bg-gradient-to-br from-[#f3eefb] to-white ring-[#c9b8e6]",
    bar: "bg-[#624f89]",
    avatar: "bg-[#ece5f7] text-[#4b3878]",
    text: "text-[#4b3878]",
  },
  NOT_OPENED: {
    tile: "from-amber-300 to-orange-500",
    card: "bg-gradient-to-br from-amber-50 to-white ring-amber-300",
    bar: "bg-amber-400",
    avatar: "bg-amber-100 text-amber-800",
    text: "text-amber-700",
  },
  UNSUBSCRIBED: {
    tile: "from-rose-400 to-berry-500",
    card: "bg-gradient-to-br from-rose-50 to-white ring-rose-300",
    bar: "bg-rose-400",
    avatar: "bg-rose-100 text-rose-700",
    text: "text-rose-600",
  },
};

export async function fetchAudience(campaignId: string): Promise<AudienceData | null> {
  const res = await fetch(`/api/business/marketing/campaigns/${campaignId}/audience`).catch(() => null);
  return res?.ok ? res.json() : null;
}

function initials(p: { name: string; email: string | null }) {
  const src = (p.name || p.email || "?").trim();
  const words = src.split(/\s+/).filter(Boolean);
  return ((words[0]?.[0] ?? "?") + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase();
}

function Avatar({ p, cls, size = "h-8 w-8 text-[11px]", one = false }: { p: { name: string; email: string | null }; cls: string; size?: string; one?: boolean }) {
  return <span className={`flex shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white ${size} ${cls}`}>{one ? initials(p)[0] : initials(p)}</span>;
}

/** Under each sent campaign, always shown: its recipients split by what they
 * did — a bar of the whole, four cards with faces, the chosen group's list —
 * and a button to write a follow-up campaign to that group. Loads when the
 * campaign scrolls into view. */
export function MarketingAudiencePanel({
  campaignId,
  recipientCount,
  S,
  isOwner,
  onCompose,
}: {
  campaignId: string;
  recipientCount: number;
  S: MarketingStudioStrings;
  isOwner: boolean;
  onCompose: (group: SendableGroup, data: GroupData) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<AudienceData | null>(null);
  const [failed, setFailed] = useState(false);
  const [group, setGroup] = useState<AudienceGroup>("OPENED");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const load = () => {
      if (done) return;
      done = true;
      void fetchAudience(campaignId).then((d) => (d ? setData(d) : setFailed(true)));
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && (load(), io.disconnect()), { rootMargin: "300px" });
    io.observe(el);
    return () => io.disconnect();
  }, [campaignId]);

  const total = Math.max(recipientCount, data ? data.groups.OPENED.count + data.groups.NOT_OPENED.count : 0, 1);
  const pct = (n: number) => Math.round((n / total) * 100);
  const g = data?.groups[group];
  const look = LOOK[group];
  const untracked = !!data && !data.tracked;
  const sendable = group !== "UNSUBSCRIBED" && !!g && g.eligible + g.cooldown > 0;

  return (
    <section ref={ref} className="mt-5 overflow-hidden rounded-[1.5rem] border border-ink-100 bg-gradient-to-b from-[#fbfaff] to-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-100 px-4 py-3 sm:px-5">
        <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1f182d] text-[#e8d3a6]">
            <Users className="h-3.5 w-3.5" />
          </span>
          {S.audienceTitle2}
        </p>
        {data && (
          <span className="text-[11px] font-semibold text-ink-400">{fill(S.customers, { n: recipientCount })}</span>
        )}
      </div>

      {!data ? (
        <div className="flex h-40 items-center justify-center">
          {failed ? <p className="text-xs text-ink-400">{S.errGeneric}</p> : <Loader2 className="h-5 w-5 animate-spin text-ink-300" />}
        </div>
      ) : (
        <div className="p-4 sm:p-5">
          {/* The whole audience in one bar: opened (of which clicked) · didn't open · unsubscribed. */}
          {data.tracked && (
            <div className="mb-4">
              <div className="flex h-2.5 overflow-hidden rounded-full bg-ink-100">
                <div className={LOOK.CLICKED.bar} style={{ width: `${pct(data.groups.CLICKED.count)}%` }} />
                <div className={LOOK.OPENED.bar} style={{ width: `${Math.max(0, pct(data.groups.OPENED.count) - pct(data.groups.CLICKED.count))}%` }} />
                <div className={LOOK.NOT_OPENED.bar} style={{ width: `${pct(data.groups.NOT_OPENED.count)}%` }} />
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-semibold text-ink-500">
                {(["CLICKED", "OPENED", "NOT_OPENED"] as const).map((k) => (
                  <span key={k} className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${LOOK[k].bar}`} />
                    {S[`group${k}`]}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {GROUPS.map((k) => {
              const Icon = GROUP_ICONS[k];
              const gd = data.groups[k];
              const on = group === k;
              const blank = k === "NOT_OPENED" && untracked;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setGroup(k)}
                  className={`relative min-w-0 rounded-2xl p-3.5 text-left ring-1 transition ${on ? `${LOOK[k].card} ring-2 shadow-[0_14px_30px_-22px_rgba(31,24,45,0.55)]` : "bg-white ring-ink-100 hover:ring-ink-200"}`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm ${LOOK[k].tile}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    {!blank && k !== "UNSUBSCRIBED" && <span className={`text-xs font-extrabold tabular-nums ${LOOK[k].text}`}>{pct(gd.count)}%</span>}
                  </span>
                  <span className="mt-3 block text-2xl font-extrabold tabular-nums text-ink-900">{blank ? "—" : gd.count}</span>
                  <span className="block truncate text-xs font-semibold text-ink-500">{S[`group${k}`]}</span>
                  {!blank && gd.people.length > 0 && (
                    <span className="mt-2.5 flex -space-x-1.5 overflow-hidden py-0.5 pl-0.5">
                      {gd.people.slice(0, 3).map((p, i) => (
                        <Avatar key={i} p={p} cls={LOOK[k].avatar} size="h-7 w-7 text-[11px]" one />
                      ))}
                      {gd.count > 3 && (
                        <span className="flex h-7 min-w-7 shrink-0 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-ink-500 ring-2 ring-white">+{gd.count - 3}</span>
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* The chosen group: who they are, and a follow-up to them. */}
          <div className="mt-4 rounded-2xl bg-white ring-1 ring-ink-100">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 px-4 py-3">
              <p className={`flex items-center gap-2 text-sm font-bold ${look.text}`}>
                {(() => {
                  const Icon = GROUP_ICONS[group];
                  return <Icon className="h-4 w-4" />;
                })()}
                {S[`group${group}`]}
                {g && !(group === "NOT_OPENED" && untracked) && <span className="rounded-full bg-mist-50 px-2 py-0.5 text-[11px] text-ink-500">{g.count}</span>}
              </p>
              {isOwner && group !== "UNSUBSCRIBED" && g && g.count > 0 && (
                <button
                  type="button"
                  disabled={!sendable}
                  onClick={() => onCompose(group, g)}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d4ab55] via-[#c99a3f] to-[#a87a2a] px-4 py-2 text-xs font-bold text-white shadow-[0_10px_22px_-12px_rgba(168,122,42,0.9)] disabled:opacity-45"
                >
                  <Send className="h-3.5 w-3.5" />
                  {S.audienceSend}
                </button>
              )}
            </div>

            {group === "NOT_OPENED" && untracked ? (
              <p className="px-4 py-5 text-xs text-ink-500">{S.audienceUntracked}</p>
            ) : !g || g.count === 0 ? (
              <p className="px-4 py-5 text-center text-xs text-ink-400">{S.audienceEmpty}</p>
            ) : (
              <ul className="grid max-h-72 overflow-y-auto sm:grid-cols-2">
                {g.people.map((p, i) => (
                  <li key={i} className="flex min-w-0 items-center gap-3 border-b border-ink-50 px-4 py-2.5 sm:odd:border-r">
                    <Avatar p={p} cls={look.avatar} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink-900">{p.name || p.email || "—"}</span>
                      {p.email && p.name && <span className="block truncate text-[11px] text-ink-400">{p.email}</span>}
                    </span>
                  </li>
                ))}
                {g.count > g.people.length && (
                  <li className="px-4 py-2.5 text-xs text-ink-400 sm:col-span-2">{fill(S.audienceMore, { n: g.count - g.people.length })}</li>
                )}
              </ul>
            )}

            {group === "UNSUBSCRIBED" ? (
              <p className="border-t border-ink-100 px-4 py-3 text-[11px] text-ink-500">{S.audienceUnsubNote}</p>
            ) : (
              isOwner && g && g.count > 0 && !sendable && <p className="border-t border-ink-100 px-4 py-3 text-[11px] text-ink-400">{S.audienceNoneLeft}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
