import { PrismaClient } from "@prisma/client";

// Hostinger runs several Node processes of the site at once, and Prisma's default pool
// (2 × CPU cores + 1 per process) filled MySQL's connection limit ("Too many connections",
// 2026-11-21). Cap each process's pool unless DATABASE_URL already sets connection_limit.
function databaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url || /[?&]connection_limit=/.test(url)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}connection_limit=3&pool_timeout=20`;
}

// Avoid exhausting the MySQL connection pool from Next.js hot-reload in dev.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const url = databaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(url ? { datasources: { db: { url } } } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
