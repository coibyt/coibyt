import { INTL_LOCALES } from "@/lib/money";
import type { DateParts } from "@/lib/email/ui";

/** Date pieces for the appointment tile, always in the salon's own timezone
 * (the email server can run anywhere). */
export function dateParts(start: Date, end: Date | null | undefined, locale: string, timeZone: string): DateParts {
  const loc = INTL_LOCALES[locale] ?? "en-US";
  const f = (o: Intl.DateTimeFormatOptions, d: Date = start) => new Intl.DateTimeFormat(loc, { timeZone, ...o }).format(d);
  return {
    weekday: f({ weekday: "long" }),
    weekdayShort: f({ weekday: "short" }),
    day: f({ day: "numeric" }).replace(/\.$/, ""),
    month: f({ month: "short" }).replace(/\.$/, ""),
    time: f({ timeStyle: "short" }),
    endTime: end ? f({ timeStyle: "short" }, end) : null,
    full: f({ dateStyle: "full" }),
  };
}

export function durationMinutes(start: Date, end: Date | null | undefined) {
  if (!end) return null;
  const m = Math.round((end.getTime() - start.getTime()) / 60000);
  return m > 0 ? m : null;
}

const utcStamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export interface CalendarEvent {
  uid: string;
  title: string;
  start: Date;
  end: Date;
  location?: string | null;
  description?: string | null;
}

export function googleCalendarUrl(e: CalendarEvent) {
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${utcStamp(e.start)}/${utcStamp(e.end)}`,
  });
  if (e.location) q.set("location", e.location);
  if (e.description) q.set("details", e.description);
  return `https://calendar.google.com/calendar/render?${q.toString()}`;
}

function icsText(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
}

/** RFC 5545 lines must be folded at 75 octets. */
function fold(line: string) {
  const bytes = Buffer.from(line, "utf8");
  if (bytes.length <= 75) return line;
  const parts: string[] = [];
  let cur = "";
  for (const ch of line) {
    if (Buffer.byteLength(cur + ch, "utf8") > (parts.length ? 74 : 75)) {
      parts.push(cur);
      cur = ch;
    } else cur += ch;
  }
  parts.push(cur);
  return parts.join("\r\n ");
}

/** An .ics attachment so Apple Calendar / Outlook can add the visit in one
 * tap. `sequence` must grow on every reschedule so the calendar replaces the
 * old event instead of adding a second one. */
export function icsAttachment(e: CalendarEvent, sequence = 0) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//VaraaAi.Com//Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.uid}@varaaai.com`,
    `SEQUENCE:${sequence}`,
    `DTSTAMP:${utcStamp(new Date())}`,
    `DTSTART:${utcStamp(e.start)}`,
    `DTEND:${utcStamp(e.end)}`,
    `SUMMARY:${icsText(e.title)}`,
    e.location ? `LOCATION:${icsText(e.location)}` : null,
    e.description ? `DESCRIPTION:${icsText(e.description)}` : null,
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${icsText(e.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((l): l is string => !!l);
  return {
    filename: "appointment.ics",
    content: Buffer.from(lines.map(fold).join("\r\n") + "\r\n", "utf8"),
    contentType: "text/calendar; charset=utf-8; method=PUBLISH",
  };
}

/** Short human booking reference from a cuid. */
export function bookingRef(id: string | null | undefined) {
  return id ? `#${id.slice(-6).toUpperCase()}` : null;
}
