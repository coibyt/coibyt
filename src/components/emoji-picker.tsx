"use client";

import { useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";

const DEFAULT_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🎉", "💅"];

export function EmojiPicker({
  onPick,
  className = "btn-ghost !p-2 text-ink-700",
  emojis = DEFAULT_EMOJIS,
  align = "left",
}: {
  onPick: (emoji: string) => void;
  className?: string;
  emojis?: string[];
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={className}
        aria-label="Emoji"
      >
        <Smile className="h-4 w-4" />
      </button>
      {open && (
        <div
          className={`absolute bottom-full z-10 mb-1 flex gap-1 rounded-xl border border-ink-100 bg-white p-1.5 shadow-lg ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {emojis.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => {
                onPick(e);
                setOpen(false);
              }}
              className="rounded-lg p-1 text-lg leading-none hover:bg-mist-100"
            >
              {e}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
