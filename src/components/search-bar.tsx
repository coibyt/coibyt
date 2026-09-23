"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search, MapPin } from "lucide-react";

interface CategorySuggestion {
  slug: string;
  nameVi: string;
  nameEn: string;
  icon: string | null;
}

function useSearchNavigate() {
  const router = useRouter();
  return (q: string, city: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (city) params.set("city", city);
    router.push(`/search?${params.toString()}`);
  };
}

/** Lazily loads the category list once, on first focus of any search box —
 * shared across the hero and compact bars so it's only ever fetched once. */
function useCategorySuggestions() {
  const [categories, setCategories] = useState<CategorySuggestion[] | null>(null);
  function ensureLoaded() {
    if (categories !== null) return;
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data) => setCategories(data.categories ?? []))
      .catch(() => setCategories([]));
  }
  return { categories: categories ?? [], ensureLoaded };
}

function SuggestionDropdown({
  categories,
  query,
  locale,
  onPick,
}: {
  categories: CategorySuggestion[];
  query: string;
  locale: string;
  onPick: (name: string, slug: string) => void;
}) {
  const q = query.trim().toLowerCase();
  const filtered = categories.filter((c) =>
    q ? (locale === "vi" ? c.nameVi : c.nameEn).toLowerCase().includes(q) : true
  );
  if (filtered.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-ink-100 bg-white py-1.5 shadow-popover">
      {filtered.slice(0, 8).map((c) => (
        <button
          key={c.slug}
          type="button"
          // onMouseDown (not onClick) fires before the input's onBlur closes the dropdown
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(locale === "vi" ? c.nameVi : c.nameEn, c.slug);
          }}
          className="flex w-full items-center px-4 py-2.5 text-left text-sm text-ink-900 hover:bg-mist-50"
        >
          {locale === "vi" ? c.nameVi : c.nameEn}
        </button>
      ))}
    </div>
  );
}

/** Big hero search bar used on the homepage. */
export function SearchBarHero() {
  const t = useTranslations("home");
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useSearchNavigate();
  const { categories, ensureLoaded } = useCategorySuggestions();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q, city);
      }}
      className="card relative flex w-full max-w-2xl flex-col gap-2 p-2 sm:flex-row sm:items-center"
    >
      <div className="relative flex flex-1 items-center gap-2 px-3 py-2">
        <Search className="h-5 w-5 shrink-0 text-ink-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            ensureLoaded();
            setOpen(true);
          }}
          onBlur={() => setOpen(false)}
          placeholder={t("searchPlaceholder")}
          className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
        />
        {open && (
          <SuggestionDropdown
            categories={categories}
            query={q}
            locale={locale}
            onPick={(_name, slug) => {
              setOpen(false);
              window.location.href = `/${locale === "vi" ? "" : "en/"}search?category=${slug}`;
            }}
          />
        )}
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
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useSearchNavigate();
  const { categories, ensureLoaded } = useCategorySuggestions();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(q, "");
      }}
      className="relative flex w-full max-w-sm items-center gap-2 rounded-full border border-ink-100 bg-mist-50 px-4 py-2"
    >
      <Search className="h-4 w-4 shrink-0 text-ink-400" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => {
          ensureLoaded();
          setOpen(true);
        }}
        onBlur={() => setOpen(false)}
        placeholder={t("search")}
        className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
      />
      {open && (
        <SuggestionDropdown
          categories={categories}
          query={q}
          locale={locale}
          onPick={(_name, slug) => {
            setOpen(false);
            window.location.href = `/${locale === "vi" ? "" : "en/"}search?category=${slug}`;
          }}
        />
      )}
    </form>
  );
}
