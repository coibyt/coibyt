import { z } from "zod";
import { TRAINING_CATEGORIES } from "@/lib/team-strings";

/** Bodies the team hub's notice and training routes accept. */

export const announcementSchema = z.object({
  title: z.string().trim().min(1).max(160),
  body: z.string().trim().min(1).max(20000),
  priority: z.enum(["NORMAL", "IMPORTANT", "URGENT"]).default("NORMAL"),
  pinned: z.boolean().default(false),
  requireAck: z.boolean().default(false),
  attachmentIds: z.array(z.string()).max(20).default([]),
});

export const trainingSchema = z.object({
  title: z.string().trim().min(1).max(160),
  summary: z.string().trim().max(400).nullable().default(null),
  body: z.string().trim().max(50000).nullable().default(null),
  category: z.enum(TRAINING_CATEGORIES).default("SERVICE"),
  videoUrl: z.string().trim().max(500).nullable().default(null),
  coverMediaId: z.string().nullable().default(null),
  attachmentIds: z.array(z.string()).max(30).default([]),
  required: z.boolean().default(false),
  minutes: z.number().int().min(1).max(600).nullable().default(null),
  published: z.boolean().default(true),
});
