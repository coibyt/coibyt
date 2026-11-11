// Dựng ứng dụng Express. Test gọi createApp({ db, config }) trực tiếp.
import path from 'node:path';
import express from 'express';
import { assertSafeConfig, SERVER_DIR } from './config.js';
import { HttpError } from './http.js';
import { adminRoutes } from './routes/admin.js';
import { authRoutes } from './routes/auth.js';
import { childrenRoutes } from './routes/children.js';
import { contentRoutes } from './routes/content.js';
import { iapRoutes } from './routes/iap.js';
import { createValidator } from './validate.js';

const API_CSP = "default-src 'none'; frame-ancestors 'none'";
const ADMIN_CSP = [
  "default-src 'self'",
  "script-src 'self' https://cdn.jsdelivr.net",
  "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
  "font-src 'self' https://cdn.jsdelivr.net",
  "img-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'none'",
].join('; ');

function securityHeaders(req, res, next) {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-site',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
    'Content-Security-Policy': req.path.startsWith('/admin') ? ADMIN_CSP : API_CSP,
  });
  next();
}

function cors(origins) {
  const allowed = new Set(origins);
  return (req, res, next) => {
    const origin = req.get('origin');
    if (origin && allowed.has(origin)) {
      res.set({
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, If-None-Match',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Expose-Headers': 'ETag',
        'Access-Control-Max-Age': '600',
      });
      res.vary('Origin');
      if (req.method === 'OPTIONS') return res.status(204).end();
    } else if (origins.length) {
      res.vary('Origin');
    }
    next();
  };
}

/**
 * @param {{ db: import('pg').Pool, config: ReturnType<import('./config.js').loadConfig>, validator?: object }} deps
 */
export function createApp({ db, config, validator }) {
  assertSafeConfig(config);
  validator ??= createValidator(config.schemaPath);
  const deps = { db, config, validator };

  const app = express();
  app.disable('x-powered-by');
  app.set('etag', false); // ETag do mình tự đặt cho nội dung
  app.set('trust proxy', config.trustProxy ? 1 : false);

  app.use(securityHeaders);
  app.use(cors(config.corsOrigins ?? []));
  app.use(express.json({ limit: '1mb' }));

  app.get('/healthz', (req, res) => res.json({ ok: true }));

  // Trang CMS tĩnh.
  const adminDir = path.join(SERVER_DIR, 'public', 'admin');
  app.get('/admin', (req, res) => res.sendFile(path.join(adminDir, 'index.html')));
  app.use('/admin', express.static(adminDir, { index: false, redirect: false }));

  const v1 = express.Router();
  v1.use(authRoutes(deps));
  v1.use(childrenRoutes(deps));
  v1.use(contentRoutes(deps));
  v1.use(iapRoutes(deps));
  v1.use(adminRoutes(deps));
  app.use('/v1', v1);

  app.use((req, res, next) => next(new HttpError(404, 'not_found', 'Không tìm thấy đường dẫn này.')));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ error: err.code, message: err.message, ...(err.extra ?? {}) });
    }
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'invalid_json', message: 'Dữ liệu gửi lên không phải JSON hợp lệ.' });
    }
    if (err?.type === 'entity.too.large') {
      return res.status(413).json({ error: 'payload_too_large', message: 'Dữ liệu gửi lên quá lớn (tối đa 1 MB).' });
    }
    console.error(err);
    res.status(500).json({ error: 'internal_error', message: 'Lỗi máy chủ, vui lòng thử lại sau.' });
  });

  return app;
}
