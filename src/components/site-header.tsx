"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { siteStrings } from "@/lib/site-content";

export function SiteHeader({
  locale,
  prefix,
  slug,
  businessName,
  logoUrl,
  active,
}: {
  locale: string;
  prefix: string;
  slug: string;
  businessName: string;
  logoUrl: string | null;
  active: "home" | "services" | "booking";
}) {
  const s = siteStrings(locale);
  const [open, setOpen] = useState(false);

  const links = [
    { key: "home" as const, label: s.navHome, href: `${prefix}/site/${slug}` },
    { key: "services" as const, label: s.navServices, href: `${prefix}/site/${slug}/services` },
    { key: "booking" as const, label: s.navBooking, href: `${prefix}/site/${slug}/booking` },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <a href={links[0].href} className="flex min-w-0 items-center gap-2.5">
          {logoUrl ? (
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-mist-100">
              <Image src={logoUrl} alt="" fill className="object-cover" />
            </div>
          ) : (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
              {businessName.charAt(0)}
            </span>
          )}
          <span className="truncate font-serif text-lg font-semibold tracking-tight text-ink-900">
            {businessName}
          </span>
        </a>

        <nav className="hidden items-center gap-8 sm:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                active === l.key ? "text-primary-600" : "text-ink-700 hover:text-ink-900"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={links[2].href} className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            {s.bookNow}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-100 bg-white sm:hidden">
          <div className="container flex flex-col py-2">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-3 text-base font-medium ${
                  active === l.key ? "text-primary-600" : "text-ink-900"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={links[2].href}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center !py-3"
            >
              {s.bookNow}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
