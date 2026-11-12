// Đọc cấu hình từ biến môi trường.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const SERVER_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const REPO_DIR = path.resolve(SERVER_DIR, '..');

/** Nạp file server/.env (nếu có) vào process.env — không cần thư viện dotenv.
 *  Biến đã có sẵn trong môi trường KHÔNG bị ghi đè. */
export function loadDotEnv(file = path.join(SERVER_DIR, '.env')) {
  if (fs.existsSync(file)) process.loadEnvFile(file);
}

/** Giá trị còn là placeholder trong .env.example (vd "<<placeholder>>"). */
export function isPlaceholder(value) {
  return typeof value !== 'string' || value.trim() === '' || value.includes('<<') || value.includes('>>');
}

// Bảng xếp hạng: mỗi ngày tính tối đa LEADERBOARD_DAILY_CAP điểm (chống gian lận / bản tiến độ bị sửa),
// chỉ trả LEADERBOARD_TOP_N bé đứng đầu.
export const LEADERBOARD_DAILY_CAP = 1000;
export const LEADERBOARD_TOP_N = 50;

function bool(v) {
  return /^(1|true|yes|on)$/i.test(String(v ?? '').trim());
}

/**
 * @param {Record<string, string|undefined>} env
 */
export function loadConfig(env = process.env) {
  const config = {
    nodeEnv: env.NODE_ENV || 'development',
    port: Number(env.PORT) || 8080,
    databaseUrl: env.DATABASE_URL || '',
    adminToken: env.ADMIN_TOKEN || '',
    iapDevMode: bool(env.IAP_DEV_MODE),
    appleSharedSecret: env.APPLE_SHARED_SECRET || '',
    googleServiceAccountJson: env.GOOGLE_SERVICE_ACCOUNT_JSON || '',
    corsOrigins: (env.CORS_ORIGINS || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    authRateLimitPerMin: Number(env.AUTH_RATE_LIMIT_PER_MIN) || 20,
    trustProxy: bool(env.TRUST_PROXY),
    schemaPath: env.SCHEMA_PATH || path.join(REPO_DIR, 'schema', 'toan4-content.v1.schema.json'),
    contentDir: env.CONTENT_DIR || path.join(REPO_DIR, 'assets', 'content'),
    leaderboardDailyCap: LEADERBOARD_DAILY_CAP,
    leaderboardTopN: LEADERBOARD_TOP_N,
  };
  assertSafeConfig(config);
  return config;
}

/** Ném lỗi nếu cấu hình nguy hiểm (gọi cả ở loadConfig lẫn createApp). */
export function assertSafeConfig(config) {
  if (config.iapDevMode && config.nodeEnv === 'production') {
    throw new Error('IAP_DEV_MODE=true không được phép khi NODE_ENV=production. Hãy đặt IAP_DEV_MODE=false.');
  }
}
