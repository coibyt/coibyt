"use client";

/** Small pieces shared by the free print-tool editors (price list, QR
 * poster): section cards, logo normalizing, downloads, usage events, the
 * after-download call to action and the toast. */
import { ArrowRight, QrCode, X, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

export type ToolId = "price_list" | "qr_poster";

/** Counts a usage event (our own counter + Google tag when present). */
export function trackTool(tool: ToolId, event: string) {
  try {
    const body = JSON.stringify({ tool, event });
    if (!navigator.sendBeacon?.("/api/tools/events", new Blob([body], { type: "application/json" })))
      void fetch("/api/tools/events", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true });
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", `${tool}_${event}`);
  } catch {
    // Analytics must never break the tool.
  }
}

export function fmt(s: string, n: number | string) {
  return s.replace("{n}", String(n));
}

/** Normalizes any uploaded/imported logo (PNG, JPG, SVG, WebP…) into a PNG
 * data URL of at most 1200px — also strips anything active out of an SVG. */
export function normalizeLogo(src: string): Promise<{ dataUrl: string; img: HTMLImageElement } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const w0 = img.naturalWidth || 1000;
      const h0 = img.naturalHeight || 1000;
      const k = Math.min(1, 1200 / Math.max(w0, h0));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(w0 * k));
      c.height = Math.max(1, Math.round(h0 * k));
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      const dataUrl = c.toDataURL("image/png");
      const out = new Image();
      out.onload = () => resolve({ dataUrl, img: out });
      out.onerror = () => resolve(null);
      out.src = dataUrl;
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Reads an uploaded logo file, enforcing type (PNG/JPG/SVG) and 2 MB. */
export async function readLogoFile(file: File): Promise<{ dataUrl: string } | { error: "type" | "size" | "decode" }> {
  if (!["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) return { error: "type" };
  if (file.size > 2 * 1024 * 1024) return { error: "size" };
  const src = await new Promise<string>((resolve) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.readAsDataURL(file);
  });
  const out = await normalizeLogo(src);
  return out ? { dataUrl: out.dataUrl } : { error: "decode" };
}

export function saveBlob(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(a.href), 10_000);
}

export function fileBaseName(name: string, fallback: string) {
  return name.normalize("NFKD").replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || fallback;
}

export function Section({ icon: Icon, title, children, aside }: { icon: LucideIcon; title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <section className="rounded-[26px] border border-ink-100 bg-white p-4 shadow-sm shadow-primary-900/[0.03] sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2.5 text-base font-bold text-ink-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <Icon className="h-[18px] w-[18px]" />
          </span>
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function CtaModal({ title, body, button, close, onClose, onClick }: { title: string; body: string; button: string; close: string; onClose: () => void; onClick: () => void }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-ink-900/50 p-4 sm:items-center" onClick={onClose}>
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-primary-800 p-6 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-coral-400/30 blur-3xl" />
        <button type="button" onClick={onClose} aria-label={close} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <QrCode className="h-6 w-6" />
        </span>
        <p className="relative mt-4 text-xl font-extrabold leading-tight">{title}</p>
        <p className="relative mt-2 text-sm leading-relaxed text-primary-100">{body}</p>
        <Link
          href="/business/apply"
          onClick={onClick}
          className="relative mt-5 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-primary-800 hover:bg-peach-100"
        >
          {button} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export function Toast({ text, tone }: { text: string; tone: "ok" | "err" }) {
  return (
    <div
      role="status"
      className={`fixed bottom-20 left-1/2 z-[95] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl px-4 py-3 text-sm font-medium shadow-xl lg:bottom-6 ${
        tone === "ok" ? "bg-ink-900 text-white" : "bg-berry-500 text-white"
      }`}
    >
      {text}
    </div>
  );
}
