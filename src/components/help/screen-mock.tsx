import { CalendarDays, ChevronRight, Copy, QrCode } from "lucide-react";

/** A guide's block with its text already in the reader's language. */
export type MockBlock =
  | { k: "button"; label: string; primary?: boolean; m?: number }
  | { k: "field"; label: string; value: string; m?: number }
  | { k: "row"; items: { label: string; value: string }[]; m?: number }
  | { k: "chips"; label: string; items: string[]; m?: number }
  | { k: "toggle"; label: string; on?: boolean; m?: number }
  | { k: "list"; rows: { title: string; sub?: string; right?: string }[]; m?: number }
  | { k: "note"; text: string; m?: number }
  | { k: "calendar"; m?: number }
  | { k: "qr"; label: string; m?: number }
  | { k: "tabs"; items: string[]; active: number; m?: number }
  | { k: "link"; label: string; value: string; m?: number };

/** Numbered marker matching a step in the guide. */
function Marker({ n }: { n: number }) {
  return (
    <span className="absolute -right-2.5 -top-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-coral-500 text-[11px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(236,106,71,0.7)] ring-2 ring-white">
      {n}
    </span>
  );
}

function Block({ b }: { b: MockBlock }) {
  switch (b.k) {
    case "button":
      return (
        <div
          className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold ${
            b.primary ? "bg-primary-500 text-white" : "bg-white text-primary-700 ring-1 ring-primary-200"
          }`}
        >
          {b.label}
        </div>
      );
    case "field":
      return (
        <div>
          <p className="mb-1 text-[11px] font-semibold text-ink-700">{b.label}</p>
          <div className="truncate rounded-xl bg-white px-3 py-2 text-xs text-ink-900 ring-1 ring-ink-100">{b.value}</div>
        </div>
      );
    case "row":
      return (
        <div className="grid grid-cols-2 gap-2">
          {b.items.map((it, i) => (
            <div key={i}>
              {it.label && <p className="mb-1 truncate text-[11px] font-semibold text-ink-700">{it.label}</p>}
              <div className="truncate rounded-xl bg-white px-3 py-2 text-xs text-ink-900 ring-1 ring-ink-100">{it.value}</div>
            </div>
          ))}
        </div>
      );
    case "chips":
      return (
        <div>
          <p className="mb-1 text-[11px] font-semibold text-ink-700">{b.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {b.items.map((c, i) => (
              <span key={i} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${i === 0 ? "bg-primary-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100"}`}>
                {c}
              </span>
            ))}
          </div>
        </div>
      );
    case "toggle":
      return (
        <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 ring-1 ring-ink-100">
          <p className="text-xs font-semibold text-ink-900">{b.label}</p>
          <span className={`relative h-5 w-9 shrink-0 rounded-full ${b.on ? "bg-primary-500" : "bg-ink-100"}`}>
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${b.on ? "left-[18px]" : "left-0.5"}`} />
          </span>
        </div>
      );
    case "list":
      return (
        <div className="divide-y divide-ink-100 overflow-hidden rounded-xl bg-white ring-1 ring-ink-100">
          {b.rows.map((r, i) => (
            <div key={i} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-ink-900">{r.title}</p>
                {r.sub && <p className="truncate text-[11px] text-ink-400">{r.sub}</p>}
              </div>
              {r.right && <span className="shrink-0 text-[11px] font-bold text-primary-600">{r.right}</span>}
            </div>
          ))}
        </div>
      );
    case "note":
      return <div className="rounded-xl bg-primary-50 px-3 py-2 text-[11px] font-semibold text-primary-700 ring-1 ring-primary-100">{b.text}</div>;
    case "calendar":
      return (
        <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-white p-2 ring-1 ring-ink-100">
          {[
            ["border-primary-500 bg-primary-50", 10, 22],
            ["border-teal-400 bg-teal-50", 30, 26],
            ["border-coral-400 bg-coral-50", 4, 20],
          ].map(([cls, top, h], i) => (
            <div key={i} className="relative h-24 rounded-lg bg-mist-50">
              <div className={`absolute inset-x-1 rounded-md border-l-[3px] ${cls}`} style={{ top: `${top}%`, height: `${h}%` }} />
              <div className={`absolute inset-x-1 rounded-md border-l-[3px] ${cls}`} style={{ top: `${(top as number) + 40}%`, height: `${(h as number) + 6}%` }} />
            </div>
          ))}
        </div>
      );
    case "qr":
      return (
        <div className="flex items-center gap-3 rounded-xl bg-white p-2.5 ring-1 ring-ink-100">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-ink-900 text-white">
            <QrCode className="h-7 w-7" />
          </span>
          <p className="text-xs font-semibold text-ink-900">{b.label}</p>
        </div>
      );
    case "tabs":
      return (
        <div className="inline-flex gap-1 rounded-full bg-white p-1 ring-1 ring-ink-100">
          {b.items.map((x, i) => (
            <span key={i} className={`rounded-full px-3 py-1 text-[11px] font-bold ${i === b.active ? "bg-ink-900 text-white" : "text-ink-400"}`}>
              {x}
            </span>
          ))}
        </div>
      );
    case "link":
      return (
        <div>
          <p className="mb-1 text-[11px] font-semibold text-ink-700">{b.label}</p>
          <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-ink-100">
            <span className="min-w-0 flex-1 truncate text-xs text-primary-700">{b.value}</span>
            <Copy className="h-3.5 w-3.5 shrink-0 text-ink-400" />
          </div>
        </div>
      );
  }
}

/** A simplified picture of a dashboard screen, with coral numbered markers on
 * the parts each step refers to. Purely illustrative (aria-hidden). */
export function ScreenMock({ page, blocks }: { page: string; blocks: MockBlock[] }) {
  return (
    <div className="mx-auto w-full max-w-sm" aria-hidden>
      <div className="rounded-[1.75rem] bg-gradient-to-b from-ink-900 to-[#2a2036] p-2 shadow-[0_24px_48px_-16px_rgba(31,24,45,0.45)]">
        <div className="overflow-hidden rounded-[1.35rem] bg-mist-50">
          <div className="flex items-center justify-between bg-white px-4 py-2.5 ring-1 ring-ink-100">
            <span className="text-sm font-extrabold text-primary-500">
              Varaa<span className="text-ink-900">Ai</span>
            </span>
            <span className="flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-bold text-white">
              <CalendarDays className="h-3 w-3" />
              {page}
            </span>
          </div>
          <div className="flex items-center gap-1 px-4 pt-3 text-[10px] font-semibold text-ink-400">
            Dashboard <ChevronRight className="h-3 w-3" /> <span className="text-ink-700">{page}</span>
          </div>
          <div className="space-y-3.5 p-4 pt-3">
            {blocks.map((b, i) => (
              <div key={i} className={`relative ${b.m ? "rounded-2xl p-1.5 ring-2 ring-coral-400 ring-offset-2 ring-offset-mist-50" : ""}`}>
                {b.m ? <Marker n={b.m} /> : null}
                <Block b={b} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
