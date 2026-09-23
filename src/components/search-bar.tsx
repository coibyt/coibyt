"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search, MapPin } from "lucide-react";

function useSearchNavigate() {
  const router = useRouter();
  return (q: string, city: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    router.push(`/search?${params.toString()}`);
  };
}

/** Big hero search bar used on the homepage. */
export function SearchBarHero() {
  const t = useTranslations("home");
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const navigate = useSearchNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q, city);
      }}
      className="card flex w-full max-w-2xl flex-col gap-2 p-2 sm:flex-row sm:items-center"
    >
      <div className="flex flex-1 items-center gap-2 px-3 py-2">
        <Search className="h-5 w-5 shrink-0 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
        />
      </div>
      <div className="hidden h-6 w-px bg-ink-100 sm:block" />
      <div className="flex items-center gap-2 px-3 py-2 sm:w-40">
        <MapPin className="h-5 w-5 shrink-0 text-ink-400" />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("searchCity")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
        />
      </div>
      <button type="submit" className="btn-accent w-full sm:w-auto">
        {t("searchButton")}
      </button>
    </form>
  );
}

/** Compact version used inline in the navbar on larger screens. */
export function SearchBarCompact() {
  const t = useTranslations("nav");
  const [q, setQ] = useState("");
  const navigate = useSearchNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q, "");
      }}
      className="flex w-full max-w-sm items-center gap-2 rounded-full border border-ink-100 bg-mist-50 px-4 py-2"
    >
      <Search className="h-4 w-4 shrink-0 text-ink-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t("search")}
        className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
      />
    </form>
  );
}
