"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useLocale } from "next-intl";

const AddressPinMap = dynamic(
  () => import("@/components/address-pin-map").then((m) => m.AddressPinMap),
  { ssr: false, loading: () => <div className="h-48 w-full animate-pulse rounded-xl bg-mist-100" /> }
);

export interface AddressSuggestion {
  displayName: string;
  lat: number;
  lng: number;
  addressLine: string | null;
  city: string | null;
  countryCode: string | null;
}

/** Free-text address field with live Nominatim suggestions and a map pin —
 * picking a suggestion (rather than trusting a geocode of whatever the
 * owner typed) is what lets the business's search-map marker land on the
 * right building instead of somewhere vague in the city. */
export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  pin,
  onPinDrag,
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: AddressSuggestion) => void;
  pin: { lat: number; lng: number } | null;
  /** Lets the owner drag the pin to fine-tune it after picking a suggestion
   * — omit to render a fixed, non-draggable pin. */
  onPinDrag?: (lat: number, lng: number) => void;
}) {
  const locale = useLocale();
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/geocode/search?q=${encodeURIComponent(value)}`)
        .then((r) => r.json())
        .then((data) => setSuggestions(data.suggestions ?? []))
        .catch(() => setSuggestions([]));
    }, 500);
    return () => clearTimeout(debounceRef.current);
  }, [value]);

  function pick(s: AddressSuggestion) {
    setOpen(false);
    setSuggestions([]);
    onSelect(s);
  }

  return (
    <div className="relative">
      <input
        required
        className="input"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={locale === "vi" ? "Bắt đầu nhập địa chỉ..." : "Start typing an address..."}
      />
      {open && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-64 overflow-auto rounded-xl border border-ink-100 bg-white py-1 shadow-popover">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                pick(s);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-ink-900 hover:bg-mist-50"
            >
              {s.displayName}
            </button>
          ))}
        </div>
      )}
      {pin && (
        <div className="mt-2">
          <AddressPinMap lat={pin.lat} lng={pin.lng} onDragEnd={onPinDrag} />
          {onPinDrag && (
            <p className="mt-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Kéo ghim để chỉnh vị trí chính xác hơn."
                : "Drag the pin to fine-tune the exact location."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
