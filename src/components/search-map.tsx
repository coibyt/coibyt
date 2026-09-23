"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { Star } from "lucide-react";

export interface MapBusiness {
  id: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  minPriceCents: number | null;
  currency: string;
  coverUrl: string | null;
  avgRating: number | null;
}

function priceIcon(label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
      background:#0d1718;color:#fff;font-weight:700;font-size:12px;
      padding:6px 10px;border-radius:999px;white-space:nowrap;
      box-shadow:0 2px 8px rgba(13,23,24,0.25);border:2px solid #fff;
    ">${label}</div>`,
    iconSize: undefined,
    iconAnchor: [20, 15],
  });
}

/** Recenters the map whenever the visible business list changes (e.g. after
 * a "near me" search), without remounting the whole map. */
function FitBounds({ businesses }: { businesses: MapBusiness[] }) {
  const map = useMap();
  useMemo(() => {
    if (businesses.length === 0) return;
    const bounds = L.latLngBounds(businesses.map((b) => [b.lat, b.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businesses.map((b) => b.id).join(",")]);
  return null;
}

export function SearchMap({
  businesses,
  locale,
}: {
  businesses: MapBusiness[];
  locale: string;
}) {
  const center: [number, number] =
    businesses.length > 0
      ? [businesses[0].lat, businesses[0].lng]
      : [16.0544, 108.2022]; // Vietnam, roughly central, as a fallback

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-ink-100">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds businesses={businesses} />
        {businesses.map((b) => (
          <Marker
            key={b.id}
            position={[b.lat, b.lng]}
            icon={priceIcon(
              b.minPriceCents !== null
                ? formatMoney(b.minPriceCents, b.currency, locale)
                : "—"
            )}
          >
            <Popup>
              <Link href={`/b/${b.slug}`} className="flex w-48 flex-col gap-1.5">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-mist-100">
                  {b.coverUrl ? (
                    <Image src={b.coverUrl} alt="" fill className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-lg font-bold text-primary-500">
                      {b.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold text-ink-900">{b.name}</span>
                {b.avgRating && (
                  <span className="flex items-center gap-1 text-xs text-ink-700">
                    <Star className="h-3 w-3 fill-coral-500 text-coral-500" />
                    {b.avgRating.toFixed(1)}
                  </span>
                )}
                {b.minPriceCents !== null && (
                  <span className="text-xs text-ink-400">
                    {locale === "vi" ? "Từ " : "From "}
                    {formatMoney(b.minPriceCents, b.currency, locale)}
                  </span>
                )}
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
