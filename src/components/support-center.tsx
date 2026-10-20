"use client";

import { useEffect, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SupportChat } from "@/components/support-chat";
import type { SupportCenterStrings } from "@/lib/support-ai/strings";

/** The chat on /support: signed-in users chat straight away; a visitor
 * without an account first leaves a name and email (kept as a guest thread
 * in a cookie), unless this browser already has a chat going. */
export function SupportCenter({
  locale,
  signedIn,
  t,
}: {
  locale: string;
  signedIn: boolean;
  t: SupportCenterStrings;
}) {
  const [started, setStarted] = useState<boolean | null>(signedIn ? true : null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (signedIn) return;
    fetch("/api/support/messages")
      .then((r) => r.json())
      .then((d) => setStarted(!!d.started))
      .catch(() => setStarted(false));
  }, [signedIn]);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setBusy(true);
    setError(false);
    const res = await fetch("/api/support/guest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), locale }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      setError(true);
      return;
    }
    setStarted(true);
  }

  if (started === null) {
    return (
      <div className="flex h-[32rem] items-center justify-center rounded-2xl border border-ink-100 bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
      </div>
    );
  }

  if (!started) {
    return (
      <form onSubmit={start} className="card mx-auto max-w-md space-y-4 p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
          <MessageCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-ink-900">{t.guestTitle}</h2>
          <p className="mt-1 text-sm text-ink-400">{t.guestIntro}</p>
        </div>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-ink-700">{t.name}</span>
          <input className="input w-full" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-ink-700">{t.email}</span>
          <input
            className="input w-full"
            type="email"
            value={email}
            maxLength={180}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </label>
        {error && <p className="text-sm text-berry-500">{t.invalid}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : t.start}
        </button>
        <p className="text-center text-xs text-ink-400">
          {t.or}{" "}
          <Link href="/auth/sign-in?callbackUrl=%2Fsupport" className="font-semibold text-primary-600 hover:underline">
            {t.signIn}
          </Link>
        </p>
      </form>
    );
  }

  return (
    <SupportChat
      endpoint="/api/support/messages"
      humanEndpoint="/api/support/human"
      mine="VISITOR"
      locale={locale}
      linkLocale={locale}
      heightClass="h-[min(36rem,75vh)]"
      suggestions={t.suggestions}
      labels={{
        placeholder: t.placeholder,
        send: t.send,
        empty: t.empty,
        error: t.error,
        otherName: t.teamName,
        aiName: t.aiName,
        aiTyping: t.aiTyping,
        talkToHuman: t.talkToHuman,
      }}
    />
  );
}
