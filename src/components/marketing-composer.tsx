"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Send, Mail } from "lucide-react";

const EMAIL_SENT_POINTS = 1;
const EMAIL_COOLDOWN_BYPASS_POINTS = 5;

interface Campaign {
  id: string;
  subject: string;
  recipientCount: number;
  createdAt: string;
}

export function MarketingComposer({
  initialRecipientCount,
  initialCooldownCount,
}: {
  initialRecipientCount: number;
  initialCooldownCount: number;
}) {
  const tDash = useTranslations("dashboard");
  const locale = useLocale();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientCount, setRecipientCount] = useState(initialRecipientCount);
  const [cooldownCount, setCooldownCount] = useState(initialCooldownCount);
  const [includeCooldown, setIncludeCooldown] = useState(false);
  const [varaPoints, setVaraPoints] = useState<number | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ sent: number } | null>(null);
  const [error, setError] = useState(false);
  const [insufficientPoints, setInsufficientPoints] = useState<{ required: number; available: number } | null>(
    null
  );
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);

  async function loadCampaigns() {
    const res = await fetch("/api/business/marketing/campaigns");
    if (res.ok) setCampaigns((await res.json()).campaigns);
  }

  async function loadRecipients() {
    const res = await fetch("/api/business/marketing/recipients");
    if (res.ok) {
      const d = await res.json();
      setRecipientCount(d.count);
      setCooldownCount(d.cooldownCount);
    }
  }

  async function loadVaraPoints() {
    const res = await fetch("/api/business/vara");
    if (res.ok) setVaraPoints((await res.json()).varaPoints);
  }

  useEffect(() => {
    loadCampaigns();
    loadVaraPoints();
  }, []);

  const cost = recipientCount * EMAIL_SENT_POINTS + (includeCooldown ? cooldownCount * EMAIL_COOLDOWN_BYPASS_POINTS : 0);
  const totalRecipients = recipientCount + (includeCooldown ? cooldownCount : 0);
  const remaining = varaPoints !== null ? varaPoints - cost : null;

  async function send() {
    setSending(true);
    setError(false);
    setInsufficientPoints(null);
    const res = await fetch("/api/business/marketing/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, message, includeCooldown }),
    });
    setSending(false);
    setConfirming(false);
    if (!res.ok) {
      if (res.status === 402) {
        const data = await res.json().catch(() => null);
        if (data?.error === "INSUFFICIENT_VARA_POINTS") {
          setInsufficientPoints({ required: data.required, available: data.available });
          return;
        }
      }
      setError(true);
      return;
    }
    const data = await res.json();
    setResult({ sent: data.sent });
    setSubject("");
    setMessage("");
    setIncludeCooldown(false);
    loadCampaigns();
    loadRecipients();
    loadVaraPoints();
  }

  const canSend = subject.trim().length > 0 && message.trim().length > 0 && totalRecipients > 0;

  return (
    <div className="space-y-5">
      <div className="card space-y-4 p-5">
        <div>
          <h2 className="font-semibold text-ink-900">{tDash("marketing.composeTitle")}</h2>
          <p className="mt-1 text-xs text-ink-400">
            {tDash("marketing.recipientCount", { count: recipientCount })}
          </p>
          {cooldownCount > 0 && (
            <p className="mt-1 text-xs text-ink-400">
              {tDash("marketing.cooldownNotice", { count: cooldownCount })}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink-700">
            {tDash("marketing.subjectLabel")}
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={150}
            placeholder={tDash("marketing.subjectPlaceholder")}
            className="w-full rounded-xl border border-ink-100 px-3 py-2 text-sm outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-ink-700">
            {tDash("marketing.messageLabel")}
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={5000}
            rows={6}
            placeholder={tDash("marketing.messagePlaceholder")}
            className="w-full rounded-xl border border-ink-100 px-3 py-2 text-sm outline-none focus:border-primary-500"
          />
        </div>

        {cooldownCount > 0 && (
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={includeCooldown}
              onChange={(e) => setIncludeCooldown(e.target.checked)}
              className="h-4 w-4 rounded border-ink-200"
            />
            {tDash("marketing.includeCooldownLabel", { count: cooldownCount })}
          </label>
        )}

        {result && (
          <p className="rounded-lg bg-sage-50 px-3 py-2 text-sm text-sage-700">
            {tDash("marketing.sentSuccess", { count: result.sent })}
          </p>
        )}
        {error && (
          <p className="rounded-lg bg-berry-50 px-3 py-2 text-sm text-berry-500">
            {tDash("marketing.sendError")}
          </p>
        )}
        {insufficientPoints && (
          <p className="rounded-lg bg-berry-50 px-3 py-2 text-sm text-berry-500">
            {tDash("marketing.insufficientPoints", {
              required: insufficientPoints.required,
              available: insufficientPoints.available,
            })}
          </p>
        )}

        {!confirming ? (
          <button
            type="button"
            disabled={!canSend}
            onClick={() => setConfirming(true)}
            className="btn-accent !px-5 !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {tDash("marketing.sendButton")}
          </button>
        ) : (
          <div className="space-y-3 rounded-xl border border-ink-100 bg-mist-50 p-4">
            <p className={`text-sm ${remaining !== null && remaining < 0 ? "text-berry-500" : "text-ink-700"}`}>
              {remaining !== null && remaining < 0
                ? tDash("marketing.insufficientPoints", { required: cost, available: varaPoints ?? 0 })
                : remaining !== null
                  ? tDash("marketing.confirmCost", { count: totalRecipients, cost, remaining })
                  : tDash("marketing.confirmText", { count: totalRecipients })}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={send}
                disabled={sending || (remaining !== null && remaining < 0)}
                className="btn-accent !px-4 !py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                {tDash("marketing.confirmSend")}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                disabled={sending}
                className="btn-outline !px-4 !py-2 text-sm"
              >
                {tDash("marketing.cancel")}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="card p-5">
        <h2 className="mb-3 font-semibold text-ink-900">{tDash("marketing.historyTitle")}</h2>
        {campaigns === null ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
        ) : campaigns.length === 0 ? (
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Mail className="h-4 w-4" />
            {tDash("marketing.historyEmpty")}
          </p>
        ) : (
          <ul className="space-y-2">
            {campaigns.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-ink-100 px-3 py-2 text-sm"
              >
                <span className="truncate text-ink-900">{c.subject}</span>
                <span className="shrink-0 text-xs text-ink-400">
                  {tDash("marketing.historyRecipients", { count: c.recipientCount })} ·{" "}
                  {new Date(c.createdAt).toLocaleDateString(locale)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
