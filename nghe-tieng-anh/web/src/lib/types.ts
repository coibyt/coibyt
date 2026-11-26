export type Lang = "en" | "vi";

export interface Example { en: string; vi: string }
export interface Phrase { id: string; en: string; vi: string; note_vi?: string; examples: Example[] }
export interface Speaker { name: string; gender: "m" | "f" }
export interface DialogueLine { s: string; en: string; vi: string }
export interface Dialogue {
  id: string; title_en: string; title_vi: string; setting_vi?: string;
  speakers: Record<string, Speaker>; lines: DialogueLine[];
}
export interface Paragraph { s: string; en: string; vi?: string }
export interface Listening {
  id: string; kind: string; title_en: string; title_vi: string; summary_vi?: string;
  speakers: Record<string, Speaker>; paragraphs: Paragraph[];
}
export interface Chapter { part: number; start: number; end: number; title_vi: string; title_en: string }
/** s/e seconds · p part · l lang · k kind · r ref · t text (host/review) · v translation · x speed */
export interface Cue { s: number; e: number; p: number; l: Lang; k: string; r?: string; t?: string; v?: string; x?: number }
export interface ReviewItem { id: number; en: string; vi: string; from: string }

export interface DayData {
  v: number;
  date: string;
  day_number: number;
  level: string;
  topic: { id: string; en: string; vi: string };
  intro_vi: string;
  duration: number;
  chapters: Chapter[];
  phrases: Phrase[];
  dialogues: Dialogue[];
  listening: Listening[];
  cues: Cue[];
  clips: Record<string, { en?: [number, number]; slow?: [number, number]; vi?: [number, number] }>;
  audio: { src: string; bytes: number };
  cover: string | null;
  review: ReviewItem[];
  usage: Record<string, string[]>;
  built_at: string;
}

export interface IndexDay {
  date: string; day_number: number; level: string; duration: number; cover: string | null;
  topic: { id: string; en: string; vi: string };
  phrases: { id: string; en: string; vi: string }[];
}
export interface IndexData {
  programme: { name_vi: string; name_en: string; level: string };
  updated: string;
  days: IndexDay[];
}
