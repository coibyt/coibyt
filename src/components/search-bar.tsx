"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Search, MapPin, LocateFixed, Loader2 } from "lucide-react";
import { categoryName } from "@/lib/category-names";
import { homeHeroStrings } from "@/lib/home-hero-strings";

interface CategorySuggestion {
  slug: string;
  nameVi: string;
  nameEn: string;
  icon: string | null;
}

function useSearchNavigate() {
  const router = useRouter();
  const navigate = (q: string, city: string) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (city.trim()) params.set("city", city.trim());
    router.push(`/search?${params.toString()}`);
  };
  const goToCategory = (slug: string) => router.push(`/search?category=${slug}`);
  return { navigate, goToCategory };
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
    q ? categoryName(locale, c).toLowerCase().includes(q) : true
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
            onPick(categoryName(locale, c), c.slug);
          }}
          className="flex w-full items-center px-4 py-2.5 text-left text-sm text-ink-900 hover:bg-mist-50"
        >
          {categoryName(locale, c)}
        </button>
      ))}
    </div>
  );
}

/** Big hero search bar used on the homepage and the search page: a
 * labelled service field with category suggestions, an area field with a
 * "Near me" button that fills in the visitor's city, and the search button. */
export function SearchBarHero({ initialQ = "", initialCity = "" }: { initialQ?: string; initialCity?: string } = {}) {
  const t = useTranslations("home");
  const locale = useLocale();
  const H = homeHeroStrings(locale);
  const [q, setQ] = useState(initialQ);
  const [city, setCity] = useState(initialCity);
  const [open, setOpen] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState(false);
  const { navigate, goToCategory } = useSearchNavigate();
  const { categories, ensureLoaded } = useCategorySuggestions();

  function nearMe() {
    if (!navigator.geolocation) {
      setLocateError(true);
      return;
    }
    setLocating(true);
    setLocateError(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const res = await fetch(`/api/geolocate?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`).catch(() => null);
        const data = res?.ok ? await res.json().catch(() => null) : null;
        setLocating(false);
        if (data?.city) setCity(data.city);
        else setLocateError(true);
      },
      () => {
        setLocating(false);
        setLocateError(true);
      },
      { timeout: 10_000, maximumAge: 10 * 60_000 }
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(q, city);
        }}
        className="relative flex w-full flex-col gap-1 rounded-[1.75rem] bg-white p-2 text-left shadow-[0_30px_60px_-20px_rgba(15,8,30,0.55)] ring-1 ring-white/60 sm:flex-row sm:items-center sm:rounded-full"
      >
        <label className="relative flex min-w-0 flex-1 cursor-text items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors focus-within:bg-mist-50 sm:rounded-full">
          <Search className="h-5 w-5 shrink-0 text-primary-500" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-400">{H.serviceLabel}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => {
                ensureLoaded();
                setOpen(true);
              }}
              onBlur={() => setOpen(false)}
              placeholder={t("searchPlaceholder")}
              className="w-full bg-transparent text-[15px] font-medium text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-400"
            />
          </span>
          {open && (
            <SuggestionDropdown
              categories={categories}
              query={q}
              locale={locale}
              onPick={(_name, slug) => {
                setOpen(false);
                goToCategory(slug);
              }}
            />
          )}
        </label>
        <div className="mx-4 h-px bg-ink-100 sm:mx-0 sm:h-9 sm:w-px" />
        <label className="flex cursor-text items-center gap-3 rounded-2xl px-4 py-2.5 transition-colors focus-within:bg-mist-50 sm:w-52 sm:rounded-full xl:w-60">
          <MapPin className="h-5 w-5 shrink-0 text-coral-500" />
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-ink-400">{H.areaLabel}</span>
            <input
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setLocateError(false);
              }}
              placeholder={t("searchCity")}
              className="w-full bg-transparent text-[15px] font-medium text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-400"
            />
          </span>
          <button
            type="button"
            onClick={nearMe}
            disabled={locating}
            title={H.nearMe}
            aria-label={H.nearMe}
            className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary-50 px-3 text-xs font-bold text-primary-600 ring-1 ring-primary-100 transition hover:bg-primary-100 disabled:opacity-70"
          >
            {locating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LocateFixed className="h-3.5 w-3.5" />}
            <span className="sm:hidden xl:inline">{locating ? H.locating : H.nearMe}</span>
          </button>
        </label>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-coral-500 via-coral-500 to-[#e0517a] px-7 py-4 text-base font-bold text-white shadow-[0_14px_30px_-12px_rgba(236,106,71,0.9)] transition hover:brightness-110 sm:w-auto sm:rounded-full"
        >
          <Search className="h-5 w-5" />
          {t("searchButton")}
        </button>
      </form>
      {locateError && <p className="mt-2 px-4 text-left text-xs font-medium text-peach-200">{H.locateFailed}</p>}
    </div>
  );
}

/** Compact version used inline in the navbar on larger screens. */
export function SearchBarCompact() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const { navigate, goToCategory } = useSearchNavigate();
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
            goToCategory(slug);
          }}
        />
      )}
    </form>
  );
}
