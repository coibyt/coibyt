"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Mail } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import type { LoyaltyCardStrings } from "@/lib/loyalty-card-strings";

interface Suggestion {
  email: string;
  name: string;
  lastBooking: string | null;
}

export interface OtherEmailResult {
  ok: boolean;
  text: string;
}

/** Staff-only box on the member card: the customer booked with another email,
 * so the scan found no visit. Typing a few letters suggests emails that have
 * booked at this salon; linking one makes its visits count on this card and
 * tries the scan again. */
export function LoyaltyOtherEmail({
  token,
  locale,
  S,
  onDone,
}: {
  token: string;
  locale: string;
  S: LoyaltyCardStrings;
  onDone: (result: OtherEmailResult, scan: { points?: number; pointsRequired?: number; rewardReady?: boolean; ok: boolean }) => void;
}) {
  const [email, setEmail] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const seq = useRef(0);
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "numeric", year: "numeric" });

  useEffect(() => {
    const q = email.trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    const mine = ++seq.current;
    const t = setTimeout(async () => {
      const res = await fetch(
        `/api/business/loyalty/email-suggest?token=${encodeURIComponent(token)}&q=${encodeURIComponent(q)}`
      ).catch(() => null);
      const d = await res?.json().catch(() => null);
      if (mine !== seq.current) return;
      setSuggestions(Array.isArray(d?.suggestions) ? d.suggestions : []);
    }, 250);
    return () => clearTimeout(t);
  }, [email, token]);

  async function save(value = email) {
    const v = value.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(v)) {
      setError(S.errBadEmail);
      return;
    }
    setSaving(true);
    setError(null);
    setOpen(false);
    const res = await fetch("/api/business/loyalty/link-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email: v }),
    }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    setSaving(false);
    if (!d?.linked) {
      setError(
        d?.reason === "SAME_EMAIL"
          ? S.errSameEmail
          : d?.reason === "NO_BOOKINGS"
            ? S.errNoBookings
            : d?.reason === "OTHER_CARD"
              ? S.errOtherCard
              : d?.reason === "INVALID"
                ? S.errBadEmail
                : S.errGeneric
      );
      return;
    }
    const linked = fill(S.otherEmailLinked, { email: v });
    if (d.ok) {
      onDone({ ok: true, text: linked }, d);
    } else {
      onDone(
        {
          ok: false,
          text:
            d.reason === "NO_NEW_VISIT"
              ? fill(S.otherEmailNoVisit, { email: v })
              : d.reason === "REWARD_PENDING"
                ? `${linked} ${S.errPending}`
                : linked,
        },
        d
      );
    }
  }

  const shown = open && suggestions.length > 0;

  return (
    <div className="mt-4 rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10">
      <label htmlFor="loyalty-other-email" className="flex items-center gap-2 text-sm font-bold text-white">
        <Mail className="h-4 w-4 text-amber-200" />
        {S.otherEmailTitle}
      </label>
      <p className="mt-1 text-xs leading-relaxed text-white/60">{S.otherEmailHint}</p>
      <div className="relative mt-3">
        <input
          id="loyalty-other-email"
          type="email"
          inputMode="email"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          role="combobox"
          aria-expanded={shown}
          aria-controls="loyalty-other-email-list"
          placeholder={S.otherEmailPlaceholder}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setOpen(true);
            setError(null);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              void save();
            }
          }}
          className={`w-full rounded-2xl bg-white px-4 py-3 text-base text-[#2a1830] placeholder:text-[#a58cb3] outline-none ring-2 ${
            error ? "ring-[#f08aa8]" : "ring-transparent focus:ring-amber-200"
          }`}
        />
        {shown && (
          <ul
            id="loyalty-other-email-list"
            role="listbox"
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-2xl bg-white py-1.5 text-left shadow-2xl ring-1 ring-black/5"
          >
            {suggestions.map((s) => (
              <li key={s.email} role="option" aria-selected={false}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setEmail(s.email);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left hover:bg-[#f6e8f7]"
                >
                  <span className="block truncate text-sm font-semibold text-[#2a1830]">{s.email}</span>
                  <span className="block truncate text-xs text-[#8c7896]">
                    {s.name}
                    {s.lastBooking && (
                      <span suppressHydrationWarning>
                        {" · "}
                        {fill(S.otherEmailLastBooking, { date: dateFmt.format(new Date(s.lastBooking)) })}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="mt-2 text-sm font-semibold text-[#f6a2b6]">{error}</p>}
      <button
        type="button"
        onClick={() => void save()}
        disabled={saving || email.trim().length === 0}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] py-3 text-sm font-bold text-white shadow-[0_14px_28px_-12px_rgba(185,133,45,0.9)] transition hover:brightness-105 disabled:opacity-50"
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        {S.otherEmailSave}
      </button>
    </div>
  );
}
