"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Check, Copy, Eye, ExternalLink, Globe, Loader2 } from "lucide-react";
import { landingEditorStrings } from "@/lib/landing-editor-strings";

/** The top of the website editor: status, public link, preview and the
 * publish switch, on a dark premium card. */
export function LandingPublishCard({
  slug,
  initialPublished,
  readOnly = false,
}: {
  slug: string;
  initialPublished: boolean;
  readOnly?: boolean;
}) {
  const L = landingEditorStrings(useLocale());
  const [published, setPublished] = useState(initialPublished);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // The same on the server and in the browser (no hydration mismatch), and
  // the address customers will actually use.
  const publicUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com"}/site/${slug}`;

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
    navigator.clipboard.writeText(publicUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#1a1326] p-6 text-white sm:p-8">
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-3">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              published ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${published ? "bg-emerald-400" : "bg-amber-400"}`} />
            {published ? L.live : L.draft}
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{L.title}</h1>
          <p className="max-w-xl text-sm text-white/65">{L.subtitle}</p>
          <div className="flex min-w-0 max-w-xl items-center gap-2 rounded-xl bg-white/[0.07] px-3 py-2.5 text-sm ring-1 ring-white/10">
            <Globe className="h-4 w-4 shrink-0 text-white/50" />
            <span className="min-w-0 flex-1 truncate text-white/85">{publicUrl.replace(/^https?:\/\//, "")}</span>
            <button
              type="button"
              onClick={copy}
              className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-white/20"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? L.copied : L.copy}
            </button>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <a
            href={`/site/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1a1326] transition-transform hover:-translate-y-0.5"
          >
            {published ? <ExternalLink className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {published ? L.view : L.preview}
          </a>
          {!readOnly && (
            <label className="flex cursor-pointer items-center gap-3 rounded-full bg-white/[0.07] py-2 pl-4 pr-2 ring-1 ring-white/10">
              <span className="text-sm font-semibold">{L.publish}</span>
              <button
                type="button"
                onClick={toggle}
                disabled={saving}
                role="switch"
                aria-checked={published}
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${published ? "bg-emerald-400" : "bg-white/20"}`}
              >
                {saving ? (
                  <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin text-white" />
                ) : (
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      published ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                )}
              </button>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
