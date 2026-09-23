"use client";

import { usePathname, Link } from "@/i18n/navigation";

export function DashboardSidebar({
  links,
  title,
}: {
  links: { href: string; label: string }[];
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
          const active = pathname === l.href;
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
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
