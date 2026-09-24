"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const salonIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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

export function BusinessDetailMap({
  lat,
  lng,
  name,
  userLocation,
}: {
  lat: number;
  lng: number;
  name: string;
  userLocation?: [number, number] | null;
}) {
  const center: [number, number] = userLocation ?? [lat, lng];

  return (
    <div className="h-64 w-full overflow-hidden rounded-xl border border-ink-100">
      <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={salonIcon}>
          <Popup>{name}</Popup>
        </Marker>
        {userLocation && <Marker position={userLocation} icon={userIcon()} />}
      </MapContainer>
    </div>
  );
}
