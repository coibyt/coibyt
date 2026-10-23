import { Fragment, type ReactNode } from "react";

export const VARACLIP_URL = "https://varaclip.com";

/** "VaraClip" as a blue, underlined link to varaclip.com (new tab), so
 * salons know where to post the videos they paste into VaraaAi. */
export function VaraClipLink({ children = "VaraClip", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <a
      href={VARACLIP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-semibold text-sky-600 underline decoration-sky-400/70 underline-offset-2 transition-colors hover:text-sky-700 hover:decoration-sky-600 ${className}`}
    >
      {children}
    </a>
  );
}

/** `text` with every "VaraClip" in it turned into a VaraClipLink. */
export function WithVaraClipLinks({ text }: { text: string | null | undefined }) {
  if (!text) return null;
  const parts = text.split(/(VaraClip)/i);
  return (
    <>
      {parts.map((part, i) =>
        /^varaclip$/i.test(part) ? <VaraClipLink key={i}>{part}</VaraClipLink> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}

const HINT: Record<string, string> = {
  vi: "Chưa có link? Đăng video lên VaraClip rồi sao chép link video (dạng varaclip.com/v/…) dán vào đây.",
  en: "No link yet? Post your video on VaraClip, then copy its link (like varaclip.com/v/…) and paste it here.",
  fi: "Ei vielä linkkiä? Julkaise video VaraClipissä ja liitä sen linkki (esim. varaclip.com/v/…) tähän.",
};

/** A line under a video-link field pointing to VaraClip — the field's own
 * placeholder can't hold a link. */
export function VaraClipHint({ locale, className = "" }: { locale: string; className?: string }) {
  return (
    <p className={`mt-1.5 text-xs leading-relaxed text-ink-400 ${className}`}>
      <WithVaraClipLinks text={HINT[locale] ?? HINT.en} />
    </p>
  );
}
