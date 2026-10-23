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
};

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
