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

function userIcon() {
  return L.divIcon({
    className: "",
    html: `<div style="
      width:16px;height:16px;border-radius:50%;
      background:#4285F4;border:3px solid #fff;
      box-shadow:0 0 0 2px rgba(66,133,244,0.35), 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
}

/** Centers on the customer's own location once known (so the map actually
 * shows "areas near you" rather than the whole country); otherwise falls
 * back to fitting all visible business markers. */
function FitBounds({
  businesses,
  userLocation,
}: {
  businesses: MapBusiness[];
  userLocation: [number, number] | null;
}) {
  const map = useMap();
  useMemo(() => {
    if (userLocation) {
      map.setView(userLocation, 14);
      return;
    }
    if (businesses.length === 0) return;
    const bounds = L.latLngBounds(businesses.map((b) => [b.lat, b.lng]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation?.join(","), businesses.map((b) => b.id).join(",")]);
  return null;
}

export function SearchMap({
  businesses,
  locale,
  userLocation = null,
}: {
  businesses: MapBusiness[];
  locale: string;
  userLocation?: [number, number] | null;
}) {
  const center: [number, number] =
    userLocation ??
    (businesses.length > 0
      ? [businesses[0].lat, businesses[0].lng]
      : [16.0544, 108.2022]); // Vietnam, roughly central, as a fallback

  return (
    <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-ink-100">
      <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds businesses={businesses} userLocation={userLocation} />
        {userLocation && <Marker position={userLocation} icon={userIcon()} />}
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
