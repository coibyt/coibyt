/** The Academy account tables (progress, reviews, follows), created by the
 * app itself the first time they are needed (owner, 2026-11-19: no manual
 * SQL step). Additive and idempotent: CREATE TABLE IF NOT EXISTS, the same
 * SQL as prisma/migrations/20261119180000_academy_accounts_reviews. */
import { prisma } from "@/lib/prisma";

export const ACADEMY_TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS \`AcademyProgress\` (
    \`userId\` VARCHAR(191) NOT NULL,
    \`data\` MEDIUMTEXT NOT NULL,
    \`updatedAt\` DATETIME(3) NOT NULL,
    PRIMARY KEY (\`userId\`),
    CONSTRAINT \`AcademyProgress_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS \`AcademyReview\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`courseId\` VARCHAR(40) NOT NULL,
    \`userId\` VARCHAR(191) NOT NULL,
    \`rating\` INTEGER NOT NULL,
    \`comment\` TEXT NULL,
    \`locale\` VARCHAR(8) NOT NULL,
    \`status\` ENUM('PENDING', 'APPROVED', 'HIDDEN') NOT NULL DEFAULT 'APPROVED',
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    \`updatedAt\` DATETIME(3) NOT NULL,
    INDEX \`AcademyReview_courseId_status_idx\`(\`courseId\`, \`status\`),
    UNIQUE INDEX \`AcademyReview_courseId_userId_key\`(\`courseId\`, \`userId\`),
    PRIMARY KEY (\`id\`),
    CONSTRAINT \`AcademyReview_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS \`AcademyFollow\` (
    \`id\` VARCHAR(191) NOT NULL,
    \`courseId\` VARCHAR(40) NOT NULL,
    \`userId\` VARCHAR(191) NOT NULL,
    \`locale\` VARCHAR(8) NOT NULL,
    \`notifiedThrough\` VARCHAR(10) NOT NULL,
    \`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    INDEX \`AcademyFollow_courseId_idx\`(\`courseId\`),
    UNIQUE INDEX \`AcademyFollow_userId_courseId_key\`(\`userId\`, \`courseId\`),
    PRIMARY KEY (\`id\`),
    CONSTRAINT \`AcademyFollow_userId_fkey\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
];

let ready: Promise<boolean> | null = null;

/** True once the tables exist (checked once per server process; a failure is
 * retried on the next call). */
export function ensureAcademyTables(): Promise<boolean> {
  if (!ready) {
    ready = (async () => {
      try {
        for (const sql of ACADEMY_TABLES_SQL) await prisma.$executeRawUnsafe(sql);
        return true;
      } catch (err) {
        console.error("[academy] creating the account tables failed", err);
        ready = null;
        return false;
      }
    })();
  }
  return ready;
}
