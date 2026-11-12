// Tiện ích test: CSDL test thật (bị XOÁ SẠCH mỗi lần chạy) + app Express.
import pg from 'pg';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadConfig, loadDotEnv } from '../src/config.js';
import { runMigrations } from '../src/migrate.js';
import { createValidator } from '../src/validate.js';

loadDotEnv();

export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'postgres://toan3:toan3_dev_only@localhost:5432/toan3_test';
export const ADMIN_TOKEN = 'test-admin-token-0123456789abcdef';

const baseConfig = loadConfig({ NODE_ENV: 'test' });
let validator;
export const getValidator = () => (validator ??= createValidator(baseConfig.schemaPath));

/** Tạo pool tới CSDL test và dựng lại lược đồ từ đầu. */
export async function freshDb() {
  const dbName = new URL(TEST_DATABASE_URL).pathname.slice(1);
  if (!dbName.endsWith('_test')) {
    throw new Error(`Từ chối chạy test: tên CSDL "${dbName}" phải kết thúc bằng _test (test sẽ xoá sạch dữ liệu).`);
  }
  const pool = new pg.Pool({ connectionString: TEST_DATABASE_URL, max: 5 });
  await pool.query('DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;');
  await runMigrations(pool);
  return pool;
}

export function testConfig(overrides = {}) {
  return {
    ...baseConfig,
    adminToken: ADMIN_TOKEN,
    iapDevMode: true,
    appleSharedSecret: '',
    googleServiceAccountJson: '',
    authRateLimitPerMin: 10_000,
    corsOrigins: [],
    ...overrides,
  };
}

/** @param {{ clock?: () => Date }} [extra] */
export function makeApp(db, overrides = {}, extra = {}) {
  return createApp({ db, config: testConfig(overrides), validator: getValidator(), ...extra });
}

let counter = 0;
/** Đăng ký một tài khoản mới, trả về { token, account, email, password }. */
export async function register(app, email = `user${Date.now()}_${counter++}@example.com`, password = 'matkhau123') {
  const res = await request(app).post('/v1/auth/register').send({ email, password }).expect(201);
  return { ...res.body, email, password };
}

export const bearer = (token) => ({ Authorization: `Bearer ${token}` });
