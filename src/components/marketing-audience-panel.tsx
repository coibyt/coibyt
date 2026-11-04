"use client";

import { useState } from "react";
import { ChevronDown, Filter, Loader2, MailOpen, MailX, MousePointerClick, Send, UserX, type LucideIcon } from "lucide-react";
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

const GROUP_STYLE: Record<AudienceGroup, string> = {
  OPENED: "text-emerald-700 bg-emerald-50 ring-emerald-200",
  CLICKED: "text-primary-700 bg-primary-100/60 ring-primary-200",
  NOT_OPENED: "text-amber-700 bg-amber-50 ring-amber-200",
  UNSUBSCRIBED: "text-berry-500 bg-berry-50 ring-berry-100",
};

export async function fetchAudience(campaignId: string): Promise<AudienceData | null> {
  const res = await fetch(`/api/business/marketing/campaigns/${campaignId}/audience`).catch(() => null);
  return res?.ok ? res.json() : null;
}

/** Under a sent campaign: its recipients split by what they did, each group's
 * list, and a button to write a follow-up campaign to that group. */
export function MarketingAudiencePanel({
  campaignId,
  S,
  isOwner,
  onCompose,
}: {
  campaignId: string;
  S: MarketingStudioStrings;
  isOwner: boolean;
  onCompose: (group: SendableGroup, data: GroupData) => void;
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AudienceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState<AudienceGroup>("OPENED");

  async function toggle() {
    const next = !open;
    setOpen(next);
    if (next && !data) {
      setLoading(true);
      setData(await fetchAudience(campaignId));
      setLoading(false);
    }
  }

  const g = data?.groups[group];
  const sendable = group !== "UNSUBSCRIBED" && g && g.eligible + g.cooldown > 0;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-[#624f89] ring-1 ring-[#e4dcef] hover:bg-[#f6f2fb]"
      >
        <Filter className="h-3.5 w-3.5" />
        {S.audienceOpen}
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="mt-3 rounded-2xl bg-mist-50/60 p-3 ring-1 ring-ink-100">
          {loading || !data ? (
            <div className="flex justify-center py-6">{loading ? <Loader2 className="h-5 w-5 animate-spin text-ink-400" /> : <p className="text-xs text-ink-400">{S.errGeneric}</p>}</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(["OPENED", "CLICKED", "NOT_OPENED", "UNSUBSCRIBED"] as const).map((k) => {
                  const Icon = GROUP_ICONS[k];
                  const on = group === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setGroup(k)}
                      className={`rounded-xl px-3 py-2.5 text-left ring-1 transition ${on ? GROUP_STYLE[k] + " ring-2" : "bg-white text-ink-500 ring-ink-100 hover:ring-ink-200"}`}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                        <Icon className="h-3.5 w-3.5" />
                        {S[`group${k}`]}
                      </span>
                      <span className="mt-0.5 block text-lg font-extrabold tabular-nums text-ink-900">
                        {k === "NOT_OPENED" && !data.tracked ? "—" : data.groups[k].count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {group === "NOT_OPENED" && !data.tracked ? (
                <p className="mt-3 text-xs text-ink-500">{S.audienceUntracked}</p>
              ) : g && g.count === 0 ? (
                <p className="mt-3 text-xs text-ink-400">{S.audienceEmpty}</p>
              ) : (
                g && (
                  <ul className="mt-3 max-h-56 divide-y divide-ink-100 overflow-y-auto rounded-xl bg-white ring-1 ring-ink-100">
                    {g.people.map((p, i) => (
                      <li key={i} className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
                        <span className="min-w-0 truncate font-semibold text-ink-900">{p.name || p.email || "—"}</span>
                        {p.email && <span className="min-w-0 truncate text-ink-400">{p.email}</span>}
                      </li>
                    ))}
                    {g.count > g.people.length && <li className="px-3 py-2 text-xs text-ink-400">{fill(S.audienceMore, { n: g.count - g.people.length })}</li>}
                  </ul>
                )
              )}

              {group === "UNSUBSCRIBED" ? (
                <p className="mt-3 text-xs text-ink-500">{S.audienceUnsubNote}</p>
              ) : (
                isOwner &&
                g &&
                g.count > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={!sendable}
                      onClick={() => onCompose(group, g)}
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c99a3f] to-[#b9852d] px-4 py-2.5 text-xs font-bold text-white shadow disabled:opacity-45"
                    >
                      <Send className="h-3.5 w-3.5" />
                      {S.audienceSend}
                    </button>
                    {!sendable && <span className="text-[11px] text-ink-400">{S.audienceNoneLeft}</span>}
                  </div>
                )
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
