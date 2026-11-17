"use client";

import { useState } from "react";
import { Check, Copy, Scissors, Share2, Store, User } from "lucide-react";
import { academyStrings } from "@/lib/academy/strings";
import { useHydrated } from "@/components/academy/use-progress";
import type { Audience } from "@/lib/academy/types";

const ORDER: { id: Audience; icon: typeof User }[] = [
  { id: "pro", icon: Scissors },
  { id: "owner", icon: Store },
  { id: "customer", icon: User },
];

/** Three links to the public Academy, each opening on its own tab (owner,
 * 2026-11-17), for salons to send to staff, customers and future owners. */
export function AcademyShareLinks({ locale, baseUrl }: { locale: string; baseUrl: string }) {
  const s = academyStrings(locale);
  const hydrated = useHydrated();
  const canShare = hydrated && typeof navigator !== "undefined" && typeof navigator.share === "function";
  const [copied, setCopied] = useState<Audience | null>(null);

  const linkFor = (a: Audience) => `${baseUrl}?tab=${a}`;

  const copy = async (a: Audience) => {
    try {
      await navigator.clipboard.writeText(linkFor(a));
      setCopied(a);
      setTimeout(() => setCopied((c) => (c === a ? null : c)), 2000);
    } catch {
      // Clipboard blocked: the link stays visible to select by hand.
    }
  };

  const share = async (a: Audience) => {
    try {
      await navigator.share({ title: `${s.eyebrow} — ${s.shareFor[a]}`, url: linkFor(a) });
    } catch {
      // Cancelled by the user.
    }
  };

  return (
    <section className="mb-6 rounded-3xl bg-white p-4 shadow-card ring-1 ring-ink-100 sm:p-5">
      <h2 className="flex items-center gap-2 text-base font-extrabold text-ink-900 sm:text-lg">
        <Share2 className="h-5 w-5 text-[#b08a3e]" />
        {s.shareTitle}
      </h2>
      <p className="mt-0.5 text-sm text-ink-400">{s.shareBody}</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {ORDER.map(({ id, icon: Icon }) => (
          <li key={id} className="flex flex-col rounded-2xl bg-mist-50 p-3 ring-1 ring-ink-100">
            <span className="flex items-center gap-2 text-sm font-extrabold text-ink-900">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary-900 text-[#e8d3a6]">
                <Icon className="h-4 w-4" />
              </span>
              {s.shareFor[id]}
            </span>
            <span className="mt-1 text-xs text-ink-400">{s.shareHint[id]}</span>
            <span className="mt-2 block truncate rounded-lg bg-white px-2 py-1.5 font-mono text-[11px] text-ink-700 ring-1 ring-ink-100" title={linkFor(id)}>
              {linkFor(id).replace(/^https?:\/\//, "")}
            </span>
            <span className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => copy(id)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-bold text-primary-700 ring-1 ring-primary-200 transition-colors hover:bg-primary-50"
              >
                {copied === id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === id ? s.copied : s.copyLink}
              </button>
              {canShare && (
                <button
                  type="button"
                  onClick={() => share(id)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink-900 px-3 py-2 text-xs font-bold text-white transition-transform hover:scale-[1.02]"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {s.share}
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
