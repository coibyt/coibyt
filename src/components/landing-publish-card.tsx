"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, ExternalLink, Loader2 } from "lucide-react";

export function LandingPublishCard({
  slug,
  initialPublished,
}: {
  slug: string;
  initialPublished: boolean;
}) {
  const tDash = useTranslations("dashboard");
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = `${origin}/site/${slug}`;

  async function toggle() {
    setSaving(true);
    const next = !published;
    const res = await fetch("/api/business/landing/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: next }),
    });
    setSaving(false);
    if (res.ok) setPublished(next);
  }

  function copy() {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="card space-y-3 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-ink-900">{tDash("landing.publishTitle")}</h2>
          <p className="mt-1 text-xs text-ink-400">{tDash("landing.publishSubtitle")}</p>
        </div>
        <button
          onClick={toggle}
          disabled={saving}
          role="switch"
          aria-checked={published}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            published ? "bg-primary-500" : "bg-ink-100"
          }`}
        >
          {saving ? (
            <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin text-white" />
          ) : (
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                published ? "translate-x-6" : "translate-x-1"
              }`}
            />
          )}
        </button>
      </div>

      <p className="text-xs font-medium text-ink-900">
        {published ? tDash("landing.statusPublished") : tDash("landing.statusUnpublished")}
      </p>

      {published && (
        <>
          <div className="flex items-center gap-2 rounded-xl border border-ink-100 bg-mist-50 px-3 py-2 text-xs text-ink-700">
            <span className="flex-1 truncate">{publicUrl}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !px-3 !py-1.5 text-xs"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {tDash("landing.viewPage")}
            </a>
            <button onClick={copy} className="btn-outline !px-3 !py-1.5 text-xs">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {tDash("landing.copyLink")}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
