"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Sparkles, X } from "lucide-react";
import { SupportCenter } from "@/components/support-center";
import type { SupportCenterStrings } from "@/lib/support-ai/strings";

/** Window event any "chat with us" button can fire to open the panel. */
export const OPEN_SUPPORT_EVENT = "varaaai:open-support";

const TEASER_KEY = "varaaai_support_teaser_closed";

export interface SupportLauncherLabels {
  launcher: string;
  teaser: string;
  headerTitle: string;
  aiOnline: string;
  teamReplies: string;
}

/** Floating "chat with VaraaAi" button with a slide-up chat panel — the
 * public support chat (AI first when the admin has it on, a person
 * otherwise), for pages where visitors decide whether to sign up. A short
 * greeting pops up once per visit to invite questions. */
export function SupportLauncher({
  locale,
  labels,
  center,
  suggestions,
}: {
  locale: string;
  labels: SupportLauncherLabels;
  center: SupportCenterStrings;
  suggestions: string[];
}) {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [aiOn, setAiOn] = useState<boolean | null>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setTeaser(false);
    };
    window.addEventListener(OPEN_SUPPORT_EVENT, onOpen);
    let closed = false;
    try {
      closed = sessionStorage.getItem(TEASER_KEY) === "1";
    } catch {}
    const timer = closed ? null : setTimeout(() => setTeaser(true), 6000);
    return () => {
      window.removeEventListener(OPEN_SUPPORT_EVENT, onOpen);
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open || aiOn !== null) return;
    fetch("/api/support/messages")
      .then((r) => r.json())
      .then((d) => setAiOn(!!d.aiActive))
      .catch(() => setAiOn(false));
  }, [open, aiOn]);

  function closeTeaser() {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {}
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={labels.headerTitle}
          className="fixed inset-x-2 bottom-2 top-16 z-[60] flex animate-slide-up flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_64px_-12px_rgba(31,24,45,0.45)] ring-1 ring-ink-100 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-auto sm:h-[min(640px,calc(100vh-6rem))] sm:w-[400px]"
        >
          <div className="flex items-center gap-3 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-500 px-4 py-3.5 text-white">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Sparkles className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-primary-700" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{labels.headerTitle}</p>
              <p className="truncate text-xs text-white/75">{aiOn === null ? "…" : aiOn ? labels.aiOnline : labels.teamReplies}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-white">
            <SupportCenter
              locale={locale}
              signedIn={false}
              t={center}
              suggestions={suggestions}
              heightClass="h-full !rounded-none !border-0"
              compact
            />
          </div>
        </div>
      )}

      {!open && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
          {teaser && (
            <div className="relative max-w-[260px] animate-slide-up rounded-2xl rounded-br-md bg-white p-3.5 pr-8 text-sm text-ink-700 shadow-popover ring-1 ring-ink-100">
              <button
                type="button"
                onClick={closeTeaser}
                className="absolute right-2 top-2 rounded-full p-0.5 text-ink-400 hover:bg-mist-100"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <button type="button" onClick={() => setOpen(true)} className="text-left">
                {labels.teaser}
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setTeaser(false);
            }}
            className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary-700 to-primary-500 py-2.5 pl-2.5 pr-5 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(98,79,137,0.7)] transition-transform hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary-400/40 [animation-duration:2.4s]" />
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MessageCircle className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">{labels.launcher}</span>
            <span className="sm:hidden">Chat</span>
          </button>
        </div>
      )}
    </>
  );
}

/** A button anywhere on the page that opens the floating chat panel. */
export function OpenSupportButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_SUPPORT_EVENT))}>
      {children}
    </button>
  );
}
