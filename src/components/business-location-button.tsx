"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPinned, Navigation } from "lucide-react";

const BusinessDetailMap = dynamic(
  () => import("@/components/business-detail-map").then((m) => m.BusinessDetailMap),
  { ssr: false, loading: () => <div className="h-64 w-full animate-pulse rounded-xl bg-mist-100" /> }
);

export function BusinessLocationButton({
  lat,
  lng,
  name,
  locale,
}: {
  lat: number;
  lng: number;
  name: string;
  locale: string;
}) {
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  function toggle() {
    setShowMap((prev) => {
      const next = !prev;
      if (next && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
          () => {}
        );
      }
      return next;
    });
  }

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"
        >
          <MapPinned className="h-4 w-4" />
          {locale === "vi" ? "Xem trên bản đồ" : "View on map"}
        </button>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"
        >
          <Navigation className="h-4 w-4" />
          {locale === "vi" ? "Chỉ đường" : "Get directions"}
        </a>
      </div>
      {showMap && (
        <div className="mt-2 max-w-md">
          <BusinessDetailMap lat={lat} lng={lng} name={name} userLocation={userLocation} />
        </div>
      )}
    </div>
  );
}
