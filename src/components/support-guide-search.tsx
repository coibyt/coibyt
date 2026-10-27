"use client";

import { useMemo, useState } from "react";
import { BookOpen, MessageCircle, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";

export interface SearchableGuide {
  id: string;
  title: string;
  why: string;
  /** Steps and tips, only for matching. */
  body: string;
}

/** Vietnamese without its tone marks, so "nhan vien" finds "nhân viên". */
function plain(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
}

/** The hero search: matches every guide's title, summary and steps, and
 * opens the guide in the help centre — or offers the chat when nothing fits. */
export function SupportGuideSearch({
  guides,
  placeholder,
  noResults,
  askChat,
}: {
  guides: SearchableGuide[];
  placeholder: string;
  noResults: string;
  askChat: string;
}) {
  const [q, setQ] = useState("");
  const index = useMemo(() => guides.map((g) => ({ g, title: plain(g.title), all: plain(`${g.title} ${g.why} ${g.body}`) })), [guides]);
  const words = plain(q).split(/\s+/).filter((w) => w.length > 1);
  const results = words.length
    ? index
        .map((x) => ({ g: x.g, score: words.reduce((n, w) => n + (x.title.includes(w) ? 3 : x.all.includes(w) ? 1 : -10), 0) }))
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
    : [];

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-5 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-ink-300" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border-0 bg-white py-4 pl-14 pr-5 text-sm text-ink-900 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.6)] outline-none ring-4 ring-white/10 placeholder:text-ink-300 focus:ring-[#c9a96e]/50"
      />
      {words.length > 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-3xl bg-white text-left shadow-2xl ring-1 ring-ink-100">
          {results.length === 0 ? (
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm text-ink-400">
              {noResults}
              <Link href="/business/dashboard/support?tab=chat" className="flex items-center gap-1.5 rounded-full bg-[#1f182d] px-4 py-2 text-xs font-bold text-white">
                <MessageCircle className="h-3.5 w-3.5" />
                {askChat}
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-ink-100">
              {results.map(({ g }) => (
                <li key={g.id}>
                  <Link href={`/help/getting-started#${g.id}`} className="flex items-start gap-3 px-5 py-3 hover:bg-mist-50">
                    <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#b08a3e]" />
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink-900">{g.title}</span>
                      <span className="line-clamp-1 text-xs text-ink-400">{g.why}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
