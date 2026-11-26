import { playSnippet } from "../lib/player";
import type { DayData } from "../lib/types";
import { IconSlow, IconSpeaker } from "./Icons";

/** Tap to hear one clip of the day's audio (natural or slow). */
export function Say({ day, refId, slow, sm, label }: { day: DayData; refId: string; slow?: boolean; sm?: boolean; label?: string }) {
  const c = day.clips[refId];
  const range = slow ? c?.slow ?? c?.en : c?.en ?? c?.slow;
  if (!range) return null;
  return (
    <button
      className={`say${sm ? " sm" : ""}`}
      aria-label={label ?? (slow ? "Nghe chậm" : "Nghe")}
      title={slow ? "Nghe chậm (0.85x)" : "Nghe"}
      onClick={(e) => {
        e.stopPropagation();
        void playSnippet(day, range);
      }}
    >
      {slow ? <IconSlow size={sm ? 15 : 17} /> : <IconSpeaker size={sm ? 15 : 17} />}
    </button>
  );
}
