"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { List, Map as MapIcon, LocateFixed, Loader2, SearchX, Globe2 } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import type { MapBusiness } from "@/components/search-map";
import { getCachedCountry, rememberCountryCookie } from "@/lib/detect-country-client";

const SearchMap = dynamic(
  () => import("@/components/search-map").then((m) => m.SearchMap),
  { ssr: false, loading: () => <div className="h-full min-h-[420px] w-full animate-pulse rounded-3xl bg-mist-100" /> }
);

interface BusinessForCard {
  id: string;
  slug: string;
  name: string;
  coverUrl: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  reviews: { rating: number }[];
  categories: { category: { nameVi: string; nameEn: string } }[];
  minPriceCents: number | null;
  currency: string;
}

/** True on screens wide enough for the side-by-side list + map. Starts false
 * (server render and phones), so Leaflet is only ever loaded where the map
 * is actually shown. */
function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

function haversineKm(a: [number, number], b: [number, number]) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const lat1 = toRad(a[0]);
  const lat2 = toRad(b[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

const TEXT = {
  vi: {
    count: (n: number) => `${n} salon`,
    near: "Gần tôi",
    list: "Danh sách",
    map: "Bản đồ",
    noGeo: "Trình duyệt không hỗ trợ định vị.",
    geoDenied: "Không lấy được vị trí — hãy cho phép quyền truy cập vị trí.",
    empty: "Chưa tìm thấy salon phù hợp",
    emptyHint: "Thử từ khoá ngắn hơn (ví dụ “nail”, “nối mi”, “cắt tóc”), bỏ bớt thành phố, hoặc chọn một danh mục ở trên.",
    sortedByDistance: "Đang sắp xếp theo khoảng cách gần bạn",
    inCountry: "Salon tại",
    changeCountry: "Đổi quốc gia",
  },
  en: {
    count: (n: number) => `${n} salon${n === 1 ? "" : "s"}`,
    near: "Near me",
    list: "List",
    map: "Map",
    noGeo: "Geolocation isn't supported.",
    geoDenied: "Couldn't get your location — please allow location access.",
    empty: "No matching salons yet",
    emptyHint: "Try a shorter word (like “nails”, “lashes”, “haircut”), remove the city, or pick a category above.",
    sortedByDistance: "Sorted by distance from you",
    inCountry: "Salons in",
    changeCountry: "Change country",
  },
  fi: {
    count: (n: number) => `${n} salonkia`,
    near: "Lähelläni",
    list: "Lista",
    map: "Kartta",
    noGeo: "Selain ei tue paikannusta.",
    geoDenied: "Sijaintia ei saatu — salli sijainnin käyttö.",
    empty: "Sopivia salonkeja ei löytynyt",
    emptyHint: "Kokeile lyhyempää hakusanaa (esim. “kynnet”, “ripset”, “hiukset”), poista kaupunki tai valitse kategoria yllä.",
    sortedByDistance: "Järjestetty etäisyyden mukaan",
    inCountry: "Salongit maassa",
    changeCountry: "Vaihda maata",
  },
};

export function SearchResults({
  businesses,
  locale,
  country = null,
  countryChosen = false,
  countries = [],
}: {
  businesses: BusinessForCard[];
  locale: string;
  /** Country the results are limited to (the visitor's own), if any. */
  country?: string | null;
  /** True when the visitor picked the country themselves (?country=). */
  countryChosen?: boolean;
  /** Countries that have salons, for the switcher — code + display name. */
  countries?: { code: string; name: string }[];
}) {
  const L = TEXT[locale as keyof typeof TEXT] ?? TEXT.en;
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDesktop = useIsDesktop();
  // List first: it's server-rendered (so search engines and slow phones get
  // real results immediately), and location is only asked for when the
  // visitor actually wants "near me" or opens the map.
  const [view, setView] = useState<"list" | "map">("list");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // The server guesses the country from the IP; if this browser already
  // knows it more precisely (GPS, from an earlier visit), hand that over via
  // the cookie and re-render once with the right country.
  useEffect(() => {
    if (countryChosen) return;
    const cached = getCachedCountry();
    if (cached && rememberCountryCookie(cached) && cached.toUpperCase() !== country) router.refresh();
  }, [country, countryChosen, router]);

  function changeCountry(code: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("country", code);
    // A city belongs to one country — it wouldn't match anything any more.
    params.delete("city");
    router.push(`?${params.toString()}`);
  }

  function findNearMe() {
    if (!navigator.geolocation) {
      setLocationError(L.noGeo);
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      () => {
        setLocationError(L.geoDenied);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function openMap() {
    setView("map");
    if (!userLocation && !locating) findNearMe();
  }

  // Clicking a price pin brings its card into view next to the map.
  function focusCard(id: string) {
    setActiveId(id);
    document.getElementById(`salon-card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const sorted = useMemo(() => {
    if (!userLocation) return businesses;
    return [...businesses].sort((a, b) => {
      const da = a.lat && a.lng ? haversineKm(userLocation, [a.lat, a.lng]) : Infinity;
      const db = b.lat && b.lng ? haversineKm(userLocation, [b.lat, b.lng]) : Infinity;
      return da - db;
    });
  }, [businesses, userLocation]);

  const mapBusinesses: MapBusiness[] = sorted
    .filter((b): b is BusinessForCard & { lat: number; lng: number } => b.lat !== null && b.lng !== null)
    .map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      lat: b.lat,
      lng: b.lng,
      minPriceCents: b.minPriceCents,
      currency: b.currency,
      coverUrl: b.coverUrl,
      avgRating: b.reviews.length > 0 ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : null,
    }));

  const hasResults = businesses.length > 0;
  const countryName = countries.find((c) => c.code === country)?.name ?? null;

  return (
    <div
      className={
        hasResults
          ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[minmax(0,7fr)_minmax(0,6fr)]"
          : ""
      }
    >
      <div>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-ink-900">{L.count(businesses.length)}</p>
            {countryName && (
              <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-ink-400">
                <Globe2 className="h-3.5 w-3.5" />
                <span>
                  {L.inCountry} <span className="font-semibold text-ink-700">{countryName}</span>
                </span>
                {countries.length > 1 && (
                  <label className="relative inline-flex cursor-pointer items-center font-semibold text-primary-700 hover:underline">
                    · {L.changeCountry}
                    <select
                      value={country ?? ""}
                      onChange={(e) => changeCountry(e.target.value)}
                      aria-label={L.changeCountry}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            )}
            {userLocation && <p className="mt-0.5 text-xs text-teal-600">{L.sortedByDistance}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={findNearMe}
              disabled={locating}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 transition-colors hover:border-primary-200 disabled:opacity-60"
            >
              {locating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LocateFixed className="h-3.5 w-3.5" />}
              {L.near}
            </button>
            {/* Phones and tablets switch between list and map; desktops show both. */}
            <div className="inline-flex rounded-full border border-ink-100 bg-white p-1 lg:hidden">
              <button
                onClick={() => setView("list")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  view === "list" ? "bg-primary-600 text-white" : "text-ink-700"
                }`}
              >
                <List className="h-3.5 w-3.5" /> {L.list}
              </button>
              <button
                onClick={openMap}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  view === "map" ? "bg-primary-600 text-white" : "text-ink-700"
                }`}
              >
                <MapIcon className="h-3.5 w-3.5" /> {L.map}
              </button>
            </div>
          </div>
        </div>

        {locationError && <p className="mb-4 rounded-2xl bg-berry-50 px-4 py-2.5 text-sm text-berry-500">{locationError}</p>}

        {!hasResults ? (
          <div className="flex flex-col items-center rounded-[28px] border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach-100 text-primary-600">
              <SearchX className="h-7 w-7" />
            </span>
            <p className="mt-4 text-lg font-bold text-ink-900">{L.empty}</p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-700">{L.emptyHint}</p>
          </div>
        ) : view === "map" && !isDesktop ? (
          <SearchMap
            businesses={mapBusinesses}
            locale={locale}
            userLocation={userLocation}
            className="h-[70vh] min-h-[420px] rounded-[28px] border border-ink-100"
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {sorted.map((b) => (
              <div
                key={b.id}
                id={`salon-card-${b.id}`}
                onMouseEnter={() => setActiveId(b.id)}
                onMouseLeave={() => setActiveId(null)}
                className={`scroll-mt-24 rounded-3xl transition-shadow ${
                  activeId === b.id ? "ring-2 ring-primary-400 ring-offset-2" : ""
                }`}
              >
                <BusinessCard
                  business={b}
                  locale={locale}
                  distanceKm={userLocation && b.lat && b.lng ? haversineKm(userLocation, [b.lat, b.lng]) : null}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {hasResults && (
        // Desktop only: the map stays pinned beside the list while it scrolls.
        // Its space is reserved with CSS, so nothing jumps when Leaflet loads.
        <div className="hidden lg:block">
          <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden rounded-[28px] border border-ink-100 bg-mist-100">
            {isDesktop && (
              <SearchMap
                businesses={mapBusinesses}
                locale={locale}
                userLocation={userLocation}
                activeId={activeId}
                onMarkerClick={focusCard}
                className="h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
