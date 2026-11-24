"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export interface CustomerSuggestion {
  email: string;
  name: string;
  phone: string | null;
  lastBooking: string | null;
  hasCard: boolean;
}

/** A text field of the "Activate a card" form that, after two letters, lists
 * this salon's customers whose name or email matches — picking one fills the
 * whole form. Customers who already have a card are shown but can't be picked. */
export function CustomerSuggestInput({
  value,
  onChange,
  onPick,
  locale,
  type = "text",
  placeholder,
  required,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  onPick: (s: CustomerSuggestion) => void;
  locale: string;
  type?: "text" | "email";
  placeholder: string;
  required?: boolean;
  id: string;
}) {
  const vi = locale === "vi";
  const fi = locale === "fi";
  const [items, setItems] = useState<CustomerSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState(false);
  const seq = useRef(0);
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "numeric", year: "numeric" });

  useEffect(() => {
    const q = value.trim();
    // Only while the staff are typing here — not after a pick filled the field.
    if (!typed || q.length < 2) {
      setItems([]);
      return;
    }
    const mine = ++seq.current;
    const t = setTimeout(async () => {
      const res = await fetch(`/api/business/loyalty/customer-suggest?q=${encodeURIComponent(q)}`).catch(() => null);
      const d = await res?.json().catch(() => null);
      if (mine !== seq.current) return;
      setItems(Array.isArray(d?.suggestions) ? d.suggestions : []);
    }, 250);
    return () => clearTimeout(t);
  }, [value, typed]);

  const shown = open && items.length > 0;
  const hasCardLabel = vi ? "Đã có thẻ" : fi ? "Kortti on jo" : "Has a card";
  const lastLabel = vi ? "Hẹn gần nhất" : fi ? "Viimeisin varaus" : "Last booking";

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize={type === "email" ? "none" : undefined}
        spellCheck={false}
        role="combobox"
        aria-expanded={shown}
        aria-controls={`${id}-list`}
        className="input"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setTyped(true);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {shown && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-1.5 max-h-80 overflow-auto rounded-2xl bg-white py-1.5 shadow-2xl ring-1 ring-ink-100"
        >
          {items.map((s) => (
            <li key={s.email} role="option" aria-selected={false} aria-disabled={s.hasCard}>
              <button
                type="button"
                disabled={s.hasCard}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onPick(s);
                  setTyped(false);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-primary-50 disabled:cursor-default disabled:opacity-55 disabled:hover:bg-transparent"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-[#f6e7c4] text-xs font-bold text-primary-700">
                  {s.name.trim().charAt(0).toUpperCase() || "?"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink-900">{s.name}</span>
                  <span className="block truncate text-xs text-ink-400">{s.email}</span>
                  {s.lastBooking && !s.hasCard && (
                    <span className="block truncate text-[11px] text-ink-400" suppressHydrationWarning>
                      {lastLabel} {dateFmt.format(new Date(s.lastBooking))}
                    </span>
                  )}
                </span>
                {s.hasCard && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-600">
                    <CheckCircle2 className="h-3 w-3" />
                    {hasCardLabel}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
