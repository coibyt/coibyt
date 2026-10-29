/** The "personal time" entries every staff member has on the bookings
 * calendar (like Timma's "Henkilökohtainen aika"): picking one instead of a
 * service blocks that stretch of the staff member's day so customers can't
 * book it. They're not services — customers never see them. */
export const PERSONAL_TIME_KINDS = [
  "LUNCH",
  "PERSONAL",
  "WORK",
  "SICK",
  "VACATION",
  "CHILD_CARE",
  "PARENTAL",
  "OVERTIME_OFF",
  "REDUCED_HOURS",
  // Fixing a customer's earlier work for free.
  "WARRANTY",
  // Recruiting / working on models; can have an income report.
  "MODEL_RECRUIT",
] as const;
export type PersonalTimeKind = (typeof PERSONAL_TIME_KINDS)[number];

/** Default length when picked, in minutes (the owner can change it). */
export const PERSONAL_TIME_MINUTES: Record<PersonalTimeKind, number> = {
  LUNCH: 30,
  PERSONAL: 60,
  WORK: 60,
  SICK: 480,
  VACATION: 480,
  CHILD_CARE: 240,
  PARENTAL: 240,
  OVERTIME_OFF: 240,
  REDUCED_HOURS: 240,
  WARRANTY: 30,
  MODEL_RECRUIT: 180,
};

/** Kinds whose time can earn money, so they get a "Report income" button
 * (Doanh thu) like a booking. */
export const INCOME_KINDS: PersonalTimeKind[] = ["MODEL_RECRUIT"];

/** Each kind's look on the calendar: block background, left border, text,
 * and the hatching colour. */
export const PERSONAL_TIME_COLORS: Record<PersonalTimeKind, { cls: string; hatch: string; dot: string }> = {
  LUNCH: { cls: "border-amber-400 bg-amber-50 text-amber-800 ring-amber-200", hatch: "rgba(217,119,6,0.12)", dot: "bg-amber-400" },
  PERSONAL: { cls: "border-slate-500 bg-slate-100 text-slate-700 ring-slate-300/70", hatch: "rgba(100,116,139,0.13)", dot: "bg-slate-500" },
  WORK: { cls: "border-sky-500 bg-sky-50 text-sky-800 ring-sky-200", hatch: "rgba(2,132,199,0.12)", dot: "bg-sky-500" },
  SICK: { cls: "border-rose-500 bg-rose-50 text-rose-800 ring-rose-200", hatch: "rgba(225,29,72,0.11)", dot: "bg-rose-500" },
  VACATION: { cls: "border-emerald-500 bg-emerald-50 text-emerald-800 ring-emerald-200", hatch: "rgba(5,150,105,0.12)", dot: "bg-emerald-500" },
  CHILD_CARE: { cls: "border-pink-400 bg-pink-50 text-pink-800 ring-pink-200", hatch: "rgba(219,39,119,0.11)", dot: "bg-pink-400" },
  PARENTAL: { cls: "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-800 ring-fuchsia-200", hatch: "rgba(192,38,211,0.11)", dot: "bg-fuchsia-500" },
  OVERTIME_OFF: { cls: "border-indigo-500 bg-indigo-50 text-indigo-800 ring-indigo-200", hatch: "rgba(79,70,229,0.11)", dot: "bg-indigo-500" },
  REDUCED_HOURS: { cls: "border-stone-500 bg-stone-100 text-stone-700 ring-stone-300", hatch: "rgba(120,113,108,0.13)", dot: "bg-stone-500" },
  WARRANTY: { cls: "border-teal-500 bg-teal-50 text-teal-800 ring-teal-200", hatch: "rgba(13,148,136,0.13)", dot: "bg-teal-500" },
  MODEL_RECRUIT: { cls: "border-orange-500 bg-orange-50 text-orange-800 ring-orange-200", hatch: "rgba(234,88,12,0.13)", dot: "bg-orange-500" },
};

/** A kind's colours; older rows without a kind look like "Personal". */
export function personalTimeColor(kind: string | null | undefined) {
  return isPersonalTimeKind(kind) ? PERSONAL_TIME_COLORS[kind] : PERSONAL_TIME_COLORS.PERSONAL;
}

const LABELS: Record<string, { group: string; kinds: Record<PersonalTimeKind, string> }> = {
  vi: {
    group: "Thời gian cá nhân",
    kinds: {
      LUNCH: "Nghỉ trưa",
      PERSONAL: "Việc riêng",
      WORK: "Việc công",
      SICK: "Nghỉ ốm",
      VACATION: "Nghỉ phép",
      CHILD_CARE: "Nghỉ chăm con",
      PARENTAL: "Nghỉ thai sản",
      OVERTIME_OFF: "Nghỉ bù",
      REDUCED_HOURS: "Giảm giờ làm",
      WARRANTY: "Bảo hành cho khách hàng",
      MODEL_RECRUIT: "Tuyển người mẫu",
    },
  },
  en: {
    group: "Personal time",
    kinds: {
      LUNCH: "Lunch break",
      PERSONAL: "Personal errand",
      WORK: "Work errand",
      SICK: "Sick leave",
      VACATION: "Vacation",
      CHILD_CARE: "Child-care leave",
      PARENTAL: "Parental leave",
      OVERTIME_OFF: "Time off in lieu",
      REDUCED_HOURS: "Working-time reduction",
      WARRANTY: "Customer warranty fix",
      MODEL_RECRUIT: "Model recruiting",
    },
  },
  fi: {
    group: "Henkilökohtainen aika",
    kinds: {
      LUNCH: "Ruokatauko",
      PERSONAL: "Henkilökohtainen meno",
      WORK: "Työmeno",
      SICK: "Sairasloma",
      VACATION: "Loma",
      CHILD_CARE: "Tilapäinen hoitovapaa",
      PARENTAL: "Vanhempainvapaa",
      OVERTIME_OFF: "Ylityövapaa",
      REDUCED_HOURS: "Työajan lyhennys",
      WARRANTY: "Takuukorjaus asiakkaalle",
      MODEL_RECRUIT: "Mallien rekrytointi",
    },
  },
};

export function isPersonalTimeKind(v: unknown): v is PersonalTimeKind {
  return typeof v === "string" && (PERSONAL_TIME_KINDS as readonly string[]).includes(v);
}

export function personalTimeLabels(locale: string) {
  return LABELS[locale] ?? LABELS.en;
}

/** A kind's name in the viewer's language; older rows without a kind fall
 * back to the generic group name. */
export function personalTimeLabel(kind: string | null | undefined, locale: string) {
  const L = personalTimeLabels(locale);
  return isPersonalTimeKind(kind) ? L.kinds[kind] : L.group;
}

/** The calendar's service picker mixes services and personal time in one
 * <select>; personal time options carry this prefix. */
export const PERSONAL_OPTION_PREFIX = "personal:";
export function personalKindFromOption(value: string): PersonalTimeKind | null {
  if (!value.startsWith(PERSONAL_OPTION_PREFIX)) return null;
  const kind = value.slice(PERSONAL_OPTION_PREFIX.length);
  return isPersonalTimeKind(kind) ? kind : null;
}
