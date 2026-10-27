// Client-safe helpers for showing a salon's weekly hours, which can have
// several windows on one day (e.g. 09:00–12:00 and 13:00–18:00).

export interface HoursWindow {
  openMinute: number;
  closeMinute: number;
}

/** Each weekday's windows, in order of opening time. */
export function groupHoursByDay(hours: (HoursWindow & { weekday: number })[]) {
  const map = new Map<number, HoursWindow[]>();
  for (const h of hours) {
    const list = map.get(h.weekday) ?? [];
    list.push({ openMinute: h.openMinute, closeMinute: h.closeMinute });
    map.set(h.weekday, list);
  }
  for (const list of map.values()) list.sort((a, b) => a.openMinute - b.openMinute);
  return map;
}

export function minutesLabel(min: number) {
  return `${String(Math.floor(min / 60) % 24).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

/** "09:00 – 12:00, 13:00 – 18:00" */
export function windowsLabel(list: HoursWindow[] | undefined) {
  return (list ?? []).map((w) => `${minutesLabel(w.openMinute)} – ${minutesLabel(w.closeMinute)}`).join(", ");
}
