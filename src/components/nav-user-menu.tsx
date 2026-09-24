"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ChevronDown,
  LayoutDashboard,
  CalendarDays,
  ShieldCheck,
  LogOut,
  MessageCircle,
  Heart,
  Newspaper,
} from "lucide-react";

export function NavUserMenu({
  name,
  image,
  role,
}: {
  name: string;
  image?: string | null;
  role?: string;
}) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const initial = name?.charAt(0).toUpperCase() || "?";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full py-1 pl-1 pr-2 hover:bg-mist-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
            {initial}
          </span>
        )}
        <ChevronDown className="h-4 w-4 text-ink-400" />
      </button>

      {open && (
        <div
          role="menu"
          className="animate-slide-up absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1 shadow-popover"
        >
          {role === "BUSINESS_OWNER" && (
            <MenuLink href="/business/dashboard" icon={LayoutDashboard} label={t("dashboard")} />
          )}
          {role === "ADMIN" && (
            <MenuLink href="/admin" icon={ShieldCheck} label={t("admin")} />
          )}
          <MenuLink href="/account/bookings" icon={CalendarDays} label={t("myBookings")} />
          <MenuLink href="/account/messages" icon={MessageCircle} label={t("inbox")} />
          <MenuLink href="/account/following" icon={Heart} label={t("following")} />
          <MenuLink href="/account/feed" icon={Newspaper} label={t("feed")} />
          <button
            onClick={() => signOut()}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-berry-500 hover:bg-berry-50"
          >
            <LogOut className="h-4 w-4" /> {t("signOut")}
          </button>
        </div>
      )}
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink-900 hover:bg-mist-50"
    >
      <Icon className="h-4 w-4 text-ink-400" /> {label}
    </Link>
  );
}
