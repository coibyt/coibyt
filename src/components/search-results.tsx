"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { List, Map as MapIcon, LocateFixed, Loader2 } from "lucide-react";
import { BusinessCard } from "@/components/business-card";
import type { MapBusiness } from "@/components/search-map";

const SearchMap = dynamic(
  () => import("@/components/search-map").then((m) => m.SearchMap),
  { ssr: false, loading: () => <div className="h-[600px] w-full animate-pulse rounded-2xl bg-mist-100" /> }
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
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function SearchResults({
  businesses,
  locale,
}: {
  businesses: BusinessForCard[];
  locale: string;
}) {
  const [view, setView] = useState<"list" | "map">("map");
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Ask for the customer's location as soon as the search page loads, rather
  // than waiting for them to notice and click "find near me" — the map is
  // the default view specifically so this has something to center on.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { findNearMe(); }, []);

  function findNearMe() {
    if (!navigator.geolocation) {
      setLocationError(
        locale === "vi" ? "Trình duyệt không hỗ trợ định vị." : "Geolocation isn't supported."
      );
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
        setLocationError(
          locale === "vi"
            ? "Không thể lấy vị trí — vui lòng cho phép quyền truy cập vị trí."
            : "Couldn't get your location — please allow location access."
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
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
      avgRating:
        b.reviews.length > 0
          ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length
          : null,
    }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={findNearMe}
          disabled={locating}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          {locating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LocateFixed className="h-3.5 w-3.5" />
          )}
          {locale === "vi" ? "Tìm salon gần tôi" : "Find salons near me"}
        </button>

        <div className="inline-flex rounded-full border border-ink-100 p-1">
          <button
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              view === "list" ? "bg-ink-900 text-white" : "text-ink-700"
            }`}
          >
            <List className="h-3.5 w-3.5" /> {locale === "vi" ? "Danh sách" : "List"}
          </button>
          <button
            onClick={() => setView("map")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              view === "map" ? "bg-ink-900 text-white" : "text-ink-700"
            }`}
          >
            <MapIcon className="h-3.5 w-3.5" /> {locale === "vi" ? "Bản đồ" : "Map"}
          </button>
        </div>
      </div>

      {locationError && <p className="mb-4 text-sm text-berry-500">{locationError}</p>}

      {businesses.length === 0 ? (
        <p className="py-20 text-center text-ink-400">
          {locale === "vi" ? "Không tìm thấy kết quả phù hợp." : "No matching results."}
        </p>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((b) => (
            <BusinessCard key={b.id} business={b} locale={locale} />
          ))}
        </div>
      ) : (
        <SearchMap businesses={mapBusinesses} locale={locale} userLocation={userLocation} />
      )}
    </div>
  );
}
