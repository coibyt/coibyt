// Nội dung công khai: /v1/catalog, /v1/content/:kind/:id
import express from 'express';
import { accountJson, optionalAuth } from '../auth.js';
import { accessOf, CATALOG_ID, publishedCatalog } from '../content.js';
import { ah, etagMatches, HttpError, notFound } from '../http.js';

const KIND_BY_PATH = { lessons: 'lesson', exams: 'exam' };

export function contentRoutes({ db }) {
  const r = express.Router();

  r.get(
    '/catalog',
    ah(async (req, res) => {
      const cat = await publishedCatalog(db);
      if (!cat) throw notFound('Chưa có mục lục nào được xuất bản.');
      const etag = `"${CATALOG_ID}@${cat.rev}"`;
      res.set({ ETag: etag, 'Cache-Control': 'no-cache' });
      if (etagMatches(req, etag)) return res.status(304).end();
      res.json(cat.published_body);
    }),
  );

  r.get(
    '/content/:kind/:id',
    optionalAuth(db),
    ah(async (req, res) => {
      const kind = KIND_BY_PATH[req.params.kind];
      if (!kind) throw notFound('Loại nội dung không hợp lệ (chỉ có lessons, exams).');
      const { rows } = await db.query(
        `SELECT id, rev, published_body FROM content_documents
          WHERE id = $1 AND kind = $2 AND published_body IS NOT NULL`,
        [req.params.id, kind],
      );
      const doc = rows[0];
      if (!doc) throw notFound('Không tìm thấy nội dung này.');

      const catalog = kind === 'lesson' ? (await publishedCatalog(db))?.published_body : null;
      const access = accessOf(kind, doc.published_body, catalog);
      if (access === 'vip' && !(req.account && accountJson(req.account).isVip)) {
        throw new HttpError(403, 'vip_required', 'Nội dung này dành cho tài khoản VIP.');
      }

      const etag = `"${doc.id}@${doc.rev}"`;
      res.set({ ETag: etag, 'Cache-Control': access === 'vip' ? 'private, no-cache' : 'no-cache' });
      if (access === 'vip') res.set('Vary', 'Authorization');
      if (etagMatches(req, etag)) return res.status(304).end();
      res.json({ rev: doc.rev, body: doc.published_body });
    }),
  );

  return r;
}
