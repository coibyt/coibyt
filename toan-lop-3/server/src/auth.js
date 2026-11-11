// Mật khẩu (scrypt), token phiên, middleware xác thực, mã quản trị, giới hạn tần suất.
import crypto from 'node:crypto';
import { promisify } from 'node:util';
import { isPlaceholder } from './config.js';
import { HttpError } from './http.js';

const scrypt = promisify(crypto.scrypt);

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };
export const SESSION_DAYS = 90;

/** "scrypt$N$r$p$<salt>$<hash>" (base64). */
export async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return ['scrypt', SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString('base64'), hash.toString('base64')].join('$');
}

export async function verifyPassword(password, stored) {
  const parts = String(stored).split('$');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;
  const [, N, r, p, saltB64, hashB64] = parts;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

// Hash giả để so sánh khi email không tồn tại (thời gian phản hồi giống nhau).
let dummyHashPromise;
export function dummyHash() {
  dummyHashPromise ??= hashPassword(crypto.randomBytes(16).toString('hex'));
  return dummyHashPromise;
}

export const sha256 = (s) => crypto.createHash('sha256').update(s).digest();

export function newToken() {
  return crypto.randomBytes(32).toString('base64url');
}

/** So sánh hằng-thời-gian hai chuỗi bất kỳ độ dài. */
export function safeEqual(a, b) {
  return crypto.timingSafeEqual(sha256(String(a)), sha256(String(b)));
}

export function bearerToken(req) {
  const h = req.get('authorization') || '';
  const m = /^Bearer\s+(\S+)\s*$/i.exec(h);
  return m ? m[1] : null;
}

/** Tạo phiên mới, trả về token gốc (chỉ lưu hash). */
export async function createSession(db, accountId) {
  const token = newToken();
  await db.query(
    `INSERT INTO sessions(token_hash, account_id, expires_at)
     VALUES ($1, $2, now() + make_interval(days => $3))`,
    [sha256(token), accountId, SESSION_DAYS],
  );
  return token;
}

/** Tìm tài khoản theo token (null nếu không hợp lệ/hết hạn). */
export async function accountForToken(db, token) {
  if (!token || token.length > 200) return null;
  const { rows } = await db.query(
    `SELECT a.id, a.email, a.vip_until
       FROM sessions s JOIN accounts a ON a.id = s.account_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [sha256(token)],
  );
  return rows[0] ?? null;
}

/** Dạng tài khoản trả về cho app. */
export function accountJson(row, now = new Date()) {
  const vipUntil = row.vip_until ? new Date(row.vip_until) : null;
  return {
    id: row.id,
    email: row.email,
    vipUntil: vipUntil ? vipUntil.toISOString() : null,
    isVip: Boolean(vipUntil && vipUntil > now),
  };
}

/** Middleware: bắt buộc đăng nhập. Gắn req.account, req.token. */
export function requireAuth(db) {
  return async (req, res, next) => {
    try {
      const token = bearerToken(req);
      const account = await accountForToken(db, token);
      if (!account) throw new HttpError(401, 'unauthorized', 'Bạn cần đăng nhập (token không hợp lệ hoặc đã hết hạn).');
      req.account = account;
      req.token = token;
      next();
    } catch (err) {
      next(err);
    }
  };
}

/** Middleware: đăng nhập tuỳ chọn (token sai → coi như khách). */
export function optionalAuth(db) {
  return async (req, res, next) => {
    try {
      const token = bearerToken(req);
      req.account = token ? await accountForToken(db, token) : null;
      next();
    } catch (err) {
      next(err);
    }
  };
}

export const ADMIN_TOKEN_MIN_LENGTH = 16;

export function adminEnabled(config) {
  const t = config.adminToken;
  return !isPlaceholder(t) && t.length >= ADMIN_TOKEN_MIN_LENGTH;
}

/** Middleware cho /v1/admin/*: 503 nếu chưa cấu hình ADMIN_TOKEN, 401 nếu sai. */
export function requireAdmin(config) {
  return (req, res, next) => {
    if (!adminEnabled(config)) {
      return next(
        new HttpError(503, 'admin_disabled', 'CMS đang tắt: hãy đặt ADMIN_TOKEN (≥ 16 ký tự ngẫu nhiên) trong file .env.'),
      );
    }
    const token = bearerToken(req);
    if (!token || !safeEqual(token, config.adminToken)) {
      return next(new HttpError(401, 'unauthorized', 'Mã quản trị không đúng.'));
    }
    next();
  };
}

/** Giới hạn tần suất đơn giản trong bộ nhớ (cửa sổ cố định 1 phút, theo IP). */
export function rateLimit({ limit, windowMs = 60_000 }) {
  const hits = new Map();
  let lastSweep = Date.now();
  return (req, res, next) => {
    const now = Date.now();
    if (now - lastSweep > windowMs) {
      for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
      lastSweep = now;
    }
    const key = req.ip || 'unknown';
    let entry = hits.get(key);
    if (!entry || entry.reset <= now) {
      entry = { count: 0, reset: now + windowMs };
      hits.set(key, entry);
    }
    entry.count++;
    if (entry.count > limit) {
      res.set('Retry-After', String(Math.ceil((entry.reset - now) / 1000)));
      return next(new HttpError(429, 'rate_limited', 'Bạn thử quá nhiều lần. Vui lòng đợi một phút rồi thử lại.'));
    }
    next();
  };
}
