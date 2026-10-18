"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { List, Map as MapIcon, LocateFixed, Loader2, SearchX } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import type { MapBusiness } from "@/components/search-map";

const SearchMap = dynamic(
  () => import("@/components/search-map").then((m) => m.SearchMap),
  { ssr: false, loading: () => <div className="h-[600px] w-full animate-pulse rounded-3xl bg-mist-100" /> }
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
  },
};

export function SearchResults({ businesses, locale }: { businesses: BusinessForCard[]; locale: string }) {
  const L = TEXT[locale as keyof typeof TEXT] ?? TEXT.en;
  // List first: it's server-rendered (so search engines and slow phones get
  // real results immediately), and location is only asked for when the
  // visitor actually wants "near me" or opens the map.
  const [view, setView] = useState<"list" | "map">("list");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

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

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-ink-900">{L.count(businesses.length)}</p>
          {userLocation && <p className="text-xs text-teal-600">{L.sortedByDistance}</p>}
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
          <div className="inline-flex rounded-full border border-ink-100 bg-white p-1">
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

      {businesses.length === 0 ? (
        <div className="flex flex-col items-center rounded-[28px] border border-dashed border-ink-100 bg-white px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach-100 text-primary-600">
            <SearchX className="h-7 w-7" />
          </span>
          <p className="mt-4 text-lg font-bold text-ink-900">{L.empty}</p>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-700">{L.emptyHint}</p>
        </div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((b) => (
            <BusinessCard
              key={b.id}
              business={b}
              locale={locale}
              distanceKm={
                userLocation && b.lat && b.lng ? haversineKm(userLocation, [b.lat, b.lng]) : null
              }
            />
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px]">
          <SearchMap businesses={mapBusinesses} locale={locale} userLocation={userLocation} />
        </div>
      )}
    </div>
  );
}
