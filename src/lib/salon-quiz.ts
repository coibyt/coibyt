/** The salon quiz (/salon-quiz): the order of its screens, what kind each
 * one is, and how the answers become a plan. All copy is in
 * src/lib/salon-quiz-strings.ts; pictures and the spoken intro are in
 * public/quiz (made with kie.ai and 11max). */

export type TileId = "nail" | "hair" | "lash" | "spa" | "barber" | "skin";
export type Area = "booking" | "noshow" | "loyal" | "manage";

export type QuizScreen =
  | { id: "type"; kind: "tiles"; section: 0; options: readonly TileId[] }
  | { id: "team" | "afterhours" | "returning" | "tech"; kind: "single"; section: 0 | 1 | 2; options: readonly string[]; emoji: readonly string[]; hints?: true }
  | { id: "channels" | "goals"; kind: "multi"; section: 0 | 2; options: readonly string[]; emoji: readonly string[] }
  | { id: "s_messages" | "s_noshow" | "s_ads"; kind: "scale"; section: 1 }
  | { id: "noshow" | "hours"; kind: "slider"; section: 1 | 2; max: number; start: number }
  | { id: "info_free" | "info_night" | "info_remind" | "info_loyal" | "info_easy"; kind: "info"; section: 0 | 1 | 2; info: "free" | "night" | "remind" | "loyal" | "easy"; image: string }
  | { id: "name"; kind: "text"; section: 2 };

export const QUIZ_SCREENS: readonly QuizScreen[] = [
  { id: "type", kind: "tiles", section: 0, options: ["nail", "hair", "lash", "spa", "barber", "skin"] },
  { id: "team", kind: "single", section: 0, options: ["solo", "small", "mid", "big"], emoji: ["🙋‍♀️", "👭", "🧑‍🤝‍🧑", "🏛️"] },
  { id: "info_free", kind: "info", section: 0, info: "free", image: "team" },
  { id: "channels", kind: "multi", section: 0, options: ["phone", "chat", "walkin", "online", "other"], emoji: ["📞", "💬", "🚪", "🗓️", "📱"] },
  { id: "afterhours", kind: "single", section: 0, options: ["wait", "lost", "online"], emoji: ["🌙", "😔", "✨"], hints: true },
  { id: "info_night", kind: "info", section: 0, info: "night", image: "night" },
  { id: "s_messages", kind: "scale", section: 1 },
  { id: "noshow", kind: "slider", section: 1, max: 10, start: 2 },
  { id: "s_noshow", kind: "scale", section: 1 },
  { id: "info_remind", kind: "info", section: 1, info: "remind", image: "remind" },
  { id: "returning", kind: "single", section: 1, options: ["none", "manual", "paper", "program"], emoji: ["🤷‍♀️", "✍️", "🎟️", "💎"] },
  { id: "s_ads", kind: "scale", section: 1 },
  { id: "info_loyal", kind: "info", section: 1, info: "loyal", image: "loyal" },
  { id: "goals", kind: "multi", section: 2, options: ["full", "noshow", "time", "loyal", "website", "manage"], emoji: ["🗓️", "⏰", "💬", "💛", "🌐", "📊"] },
  { id: "hours", kind: "slider", section: 2, max: 15, start: 4 },
  { id: "tech", kind: "single", section: 2, options: ["easy", "ok", "hard"], emoji: ["😎", "🙂", "😅"], hints: true },
  { id: "info_easy", kind: "info", section: 2, info: "easy", image: "easy" },
  { id: "name", kind: "text", section: 2 },
];

/** The first screen of the middle section — reaching it counts as "halfway". */
export const HALFWAY_ID = "s_messages";

export type QuizAnswers = {
  type?: TileId;
  team?: string;
  channels?: string[];
  afterhours?: string;
  s_messages?: number;
  noshow?: number;
  s_noshow?: number;
  returning?: string;
  s_ads?: number;
  goals?: string[];
  hours?: number;
  tech?: string;
  name?: string;
};

export type QuizPlan = {
  /** 0–100: how much of booking, reminding and retention already runs by itself. */
  score: number;
  band: "low" | "mid" | "high";
  /** The three areas that matter most for this salon, most important first. */
  areas: Area[];
  hoursPerMonth: number;
  slotsPerMonth: number;
};

export function quizPlan(a: QuizAnswers): QuizPlan {
  const channels = a.channels ?? [];
  const goals = a.goals ?? [];
  const noshow = a.noshow ?? 0;
  const hours = a.hours ?? 0;
  const online = channels.includes("online") || a.afterhours === "online";

  let score = 20;
  if (channels.includes("online")) score += 25;
  score += a.afterhours === "online" ? 20 : a.afterhours === "wait" ? 5 : 0;
  score += a.returning === "program" ? 15 : a.returning === "paper" ? 8 : a.returning === "manual" ? 4 : 0;
  score += noshow === 0 ? 10 : noshow <= 2 ? 5 : 0;
  score += hours <= 2 ? 10 : hours <= 5 ? 5 : 0;
  score = Math.max(5, Math.min(100, score));

  const has = (g: string) => (goals.includes(g) ? 2 : 0);
  const weight: Record<Area, number> = {
    booking: (a.s_messages ?? 2) + (a.afterhours === "lost" ? 4 : a.afterhours === "wait" ? 3 : 0) + (online ? 0 : 2) + has("full") + has("time") + Math.min(3, hours / 4),
    noshow: Math.min(6, noshow) + (a.s_noshow ?? 2) + has("noshow"),
    loyal: (a.returning === "none" ? 4 : a.returning === "manual" ? 3 : a.returning === "paper" ? 2 : 0) + (a.s_ads ?? 2) + has("loyal"),
    manage: (a.team === "big" ? 4 : a.team === "mid" ? 3 : a.team === "small" ? 1 : 0) + has("website") + has("manage") + Math.min(2, hours / 6),
  };
  // Ties keep this order: bookings first, since every other tool builds on them.
  const order: Area[] = ["booking", "noshow", "loyal", "manage"];
  const areas = [...order].sort((x, y) => weight[y] - weight[x] || order.indexOf(x) - order.indexOf(y)).slice(0, 3);

  return {
    score,
    band: score < 40 ? "low" : score <= 70 ? "mid" : "high",
    areas,
    // A month is counted as four weeks, so the figures stay easy to check.
    hoursPerMonth: hours * 4,
    slotsPerMonth: noshow * 4,
  };
}
