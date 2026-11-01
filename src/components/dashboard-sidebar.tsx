"use client";

import { Lock } from "lucide-react";
import { usePathname, Link } from "@/i18n/navigation";

export function DashboardSidebar({
  links,
  title,
}: {
  // locked: shown with a padlock (loyalty and marketing before the profile is complete).
  links: { href: string; label: string; badge?: number; locked?: boolean }[];
  title: string;
}) {
  const pathname = usePathname();

  return (
    <aside>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-400">
        {title}
      </h2>
      <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
        {links.map((l) => {
          // Sections with sub-pages (Tiện ích) stay lit on them too.
          const active = pathname === l.href || (l.href !== "/business/dashboard" && pathname.startsWith(`${l.href}/`));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-ink-900 text-white"
                  : "text-ink-700 hover:bg-mist-50"
              }`}
            >
              {l.label}
              {l.locked && <Lock className={`ml-1.5 inline h-3 w-3 align-[-1px] ${active ? "text-[#e8d3a6]" : "text-[#b08a3e]"}`} />}
              {l.badge ? (
                <span className="ml-2 rounded-full bg-berry-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                  {l.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
