"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MapPin, Menu, Phone, X } from "lucide-react";
import { siteStrings } from "@/lib/site-content";
import { siteNavLinks, SiteLogo, type SiteNavKey } from "@/components/site-brand";
import { LanguageSwitcher } from "@/components/language-switcher";

export function SiteHeader({
  locale,
  slug,
  businessName,
  logoUrl,
  active,
  phone,
  address,
  statusLabel,
  statusOpen,
}: {
  locale: string;
  slug: string;
  businessName: string;
  logoUrl: string | null;
  active: SiteNavKey;
  phone: string | null;
  address: string | null;
  /** e.g. "Open now · 09:00 – 20:30"; null when the salon has no hours. */
  statusLabel: string | null;
  statusOpen: boolean;
}) {
  const s = siteStrings(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = siteNavLinks(locale, slug);
  const bookingHref = links.find((l) => l.key === "booking")!.href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {(statusLabel || phone || address) && (
        <div className="hidden bg-lp-deep text-[13px] text-lp-deep-ink/80 md:block">
          <div className="container flex h-10 items-center justify-between gap-6">
            <div className="flex min-w-0 items-center gap-5">
              {statusLabel && (
                <span className="flex shrink-0 items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${statusOpen ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" : "bg-lp-deep-ink/40"}`} />
                  {statusLabel}
                </span>
              )}
              {address && (
                <span className="flex min-w-0 items-center gap-1.5 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-lp-gold" />
                  <span className="truncate">{address}</span>
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-4">
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-1.5 transition-colors hover:text-lp-deep-ink">
                  <Phone className="h-3.5 w-3.5 text-lp-gold" />
                  {phone}
                </a>
              )}
              <LanguageSwitcher
                locale={locale}
                className="cursor-pointer rounded-md border border-lp-deep-ink/15 bg-transparent px-2 py-1 text-xs text-lp-deep-ink/80 [&>option]:text-ink-900"
              />
            </div>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled ? "border-lp-line bg-lp-bg/90 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] backdrop-blur-xl" : "border-transparent bg-lp-bg"
        }`}
      >
        <div className={`container flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <a href={links[0].href} className="flex min-w-0 items-center gap-3">
            <SiteLogo name={businessName} logoUrl={logoUrl} size={scrolled ? 38 : 44} />
            <span className="truncate font-serif text-xl font-semibold tracking-tight text-lp-ink">{businessName}</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className={`group relative px-4 py-2 text-[15px] font-medium transition-colors ${
                  active === l.key ? "text-lp-ink" : "text-lp-muted hover:text-lp-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-lp-gold transition-transform duration-300 ${
                    active === l.key ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!statusLabel && !phone && !address && (
              <div className="hidden lg:block">
                <LanguageSwitcher
                  locale={locale}
                  className="rounded-full border border-lp-line bg-lp-card px-3 py-2 text-xs text-lp-ink"
                />
              </div>
            )}
            <a
              href={bookingHref}
              className="hidden items-center gap-2 rounded-full bg-lp-accent px-6 py-3 text-sm font-semibold text-lp-accent-ink shadow-[0_10px_30px_-10px_rgb(var(--lp-accent)/0.7)] transition-all hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" />
              {s.bookNow}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-lp-line text-lp-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-lp-bg animate-fade-in lg:hidden">
          <div className="container flex h-20 items-center justify-between">
            <span className="flex min-w-0 items-center gap-3">
              <SiteLogo name={businessName} logoUrl={logoUrl} size={40} />
              <span className="truncate font-serif text-xl font-semibold text-lp-ink">{businessName}</span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-lp-line text-lp-ink"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container flex flex-1 flex-col justify-center gap-1 pb-10">
            {links.map((l, i) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-lp-line py-4 animate-slide-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="font-serif text-sm text-lp-gold">0{i + 1}</span>
                <span className={`font-serif text-3xl ${active === l.key ? "text-lp-accent" : "text-lp-ink"}`}>{l.label}</span>
              </a>
            ))}
            <a
              href={bookingHref}
              onClick={() => setOpen(false)}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-lp-accent py-4 text-base font-semibold text-lp-accent-ink"
            >
              <CalendarCheck className="h-5 w-5" />
              {s.bookNow}
            </a>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm text-lp-muted">
              {phone ? (
                <a href={`tel:${phone}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-lp-gold" />
                  {phone}
                </a>
              ) : (
                <span />
              )}
              <LanguageSwitcher locale={locale} className="rounded-full border border-lp-line bg-lp-card px-3 py-2 text-xs text-lp-ink" />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
