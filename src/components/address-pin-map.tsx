"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Loaded from a CDN instead of bundled — Leaflet's default marker icon
// paths break under most bundlers (webpack rewrites the asset URLs it
// references internally) unless reconfigured like this.
const pinIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function AddressPinMap({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="h-48 w-full overflow-hidden rounded-xl border border-ink-100">
      {/* Keying on the coordinates remounts the map on a new pick instead of
          needing an imperative setView call — simplest fix for Leaflet not
          re-centering on prop changes by itself, and cheap for a single marker. */}
      <MapContainer
        key={`${lat}-${lng}`}
        center={[lat, lng]}
        zoom={16}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={pinIcon} />
      </MapContainer>
    </div>
  );
}
