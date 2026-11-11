// /v1/auth/*, /v1/me
import express from 'express';
import {
  accountJson,
  createSession,
  dummyHash,
  hashPassword,
  rateLimit,
  requireAuth,
  sha256,
  verifyPassword,
} from '../auth.js';
import { ah, badRequest, HttpError } from '../http.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readCredentials(body) {
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  return { email, password };
}

export function authRoutes({ db, config }) {
  const r = express.Router();
  const limiter = rateLimit({ limit: config.authRateLimitPerMin });

  r.post(
    '/auth/register',
    limiter,
    ah(async (req, res) => {
      const { email, password } = readCredentials(req.body);
      if (!EMAIL_RE.test(email) || email.length > 254) throw badRequest('Email không hợp lệ.', 'invalid_email');
      if (password.length < 8) throw badRequest('Mật khẩu phải có ít nhất 8 ký tự.', 'weak_password');
      if (password.length > 200) throw badRequest('Mật khẩu quá dài (tối đa 200 ký tự).', 'invalid_password');
      const hash = await hashPassword(password);
      const { rows } = await db.query(
        `INSERT INTO accounts(email, password_hash) VALUES ($1, $2)
         ON CONFLICT (email) DO NOTHING
         RETURNING id, email, vip_until`,
        [email, hash],
      );
      if (!rows.length) throw new HttpError(409, 'email_taken', 'Email này đã được đăng ký.');
      const token = await createSession(db, rows[0].id);
      res.status(201).json({ token, account: accountJson(rows[0]) });
    }),
  );

  r.post(
    '/auth/login',
    limiter,
    ah(async (req, res) => {
      const { email, password } = readCredentials(req.body);
      const { rows } = await db.query('SELECT id, email, vip_until, password_hash FROM accounts WHERE email = $1', [
        email,
      ]);
      const row = rows[0];
      const ok =
        password.length > 0 && password.length <= 200
          ? await verifyPassword(password, row ? row.password_hash : await dummyHash())
          : false;
      if (!row || !ok) throw new HttpError(401, 'invalid_credentials', 'Email hoặc mật khẩu không đúng.');
      await db.query('DELETE FROM sessions WHERE account_id = $1 AND expires_at <= now()', [row.id]);
      const token = await createSession(db, row.id);
      res.json({ token, account: accountJson(row) });
    }),
  );

  r.post(
    '/auth/logout',
    requireAuth(db),
    ah(async (req, res) => {
      await db.query('DELETE FROM sessions WHERE token_hash = $1', [sha256(req.token)]);
      res.status(204).end();
    }),
  );

  r.get('/me', requireAuth(db), (req, res) => {
    res.json({ account: accountJson(req.account) });
  });

  return r;
}
