// Client-safe: the audience segments a campaign can target (rules in
// src/lib/marketing-recipients.ts) and what each email costs.

export const SEGMENTS = ["ALL", "RECENT", "LAPSED", "LOYAL", "NEW", "MEMBERS"] as const;
export type Segment = (typeof SEGMENTS)[number];

export const EMAIL_SENT_POINTS = 1;
export const EMAIL_COOLDOWN_BYPASS_POINTS = 5;
