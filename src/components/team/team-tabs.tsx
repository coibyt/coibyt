"use client";

import { useEffect, useRef } from "react";
import { Gamepad2, GraduationCap, LayoutGrid, LifeBuoy, Megaphone, MessagesSquare } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { teamStrings } from "@/lib/team-strings";

const BASE = "/business/dashboard/utilities";

export function TeamTabs({ locale, counts }: { locale: string; counts: { chat: number; announcements: number; training: number; support: number } }) {
  const S = teamStrings(locale);
  const pathname = usePathname();
  // On a phone the bar scrolls sideways: keep the open tab in view.
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = nav.current?.querySelector<HTMLElement>("[aria-current=page]");
    if (el && nav.current) nav.current.scrollLeft = el.offsetLeft - (nav.current.clientWidth - el.offsetWidth) / 2;
  }, [pathname]);
  const tabs = [
    { href: BASE, label: S.tabHome, icon: LayoutGrid, badge: 0 },
    { href: `${BASE}/chat`, label: S.tabChat, icon: MessagesSquare, badge: counts.chat },
    { href: `${BASE}/announcements`, label: S.tabNotices, icon: Megaphone, badge: counts.announcements },
    { href: `${BASE}/training`, label: S.tabTraining, icon: GraduationCap, badge: counts.training },
    { href: `${BASE}/support`, label: S.tabSupport, icon: LifeBuoy, badge: counts.support },
    { href: `${BASE}/babelisa`, label: S.tabGame, icon: Gamepad2, badge: 0 },
  ];
  return (
    <nav ref={nav} className="flex gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-sm ring-1 ring-ink-100">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm ${
              active ? "bg-[#1f182d] text-white shadow-md shadow-[#1f182d]/20" : "text-ink-700 hover:bg-mist-50"
            }`}
          >
            <t.icon className={`h-4 w-4 ${active ? "text-[#e8d3a6]" : "text-[#a8792b]"}`} />
            {t.label}
            {t.badge > 0 && (
              <span className="min-w-[18px] rounded-full bg-berry-500 px-1.5 text-center text-[10px] font-bold leading-[18px] text-white">
                {t.badge > 99 ? "99+" : t.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
