import { prisma } from "@/lib/prisma";
import { DEFAULT_RINGTONE, isRingtoneId } from "@/lib/ringtones";

/** Which ringtone the booking alarm uses, for salon owners and for staff (admin choice, stored as platform settings). */
export type RingtoneRole = "owner" | "staff";
const KEY: Record<RingtoneRole, string> = { owner: "ringtoneOwner", staff: "ringtoneStaff" };

export async function getRingtoneSetting(role: RingtoneRole): Promise<string> {
  try {
    const row = await prisma.platformSetting.findUnique({ where: { key: KEY[role] } });
    return row && isRingtoneId(row.value) ? row.value : DEFAULT_RINGTONE;
  } catch {
    return DEFAULT_RINGTONE;
  }
}

export async function setRingtoneSetting(role: RingtoneRole, id: string) {
  await prisma.platformSetting.upsert({ where: { key: KEY[role] }, update: { value: id }, create: { key: KEY[role], value: id } });
}
