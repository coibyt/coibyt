// /v1/admin/* — CMS nội dung. Mọi route cần "Authorization: Bearer <ADMIN_TOKEN>".
import express from 'express';
import { requireAdmin } from '../auth.js';
import { accessOf, documentIdOf, publishedCatalog, titleOf } from '../content.js';
import { withTransaction } from '../db.js';
import { ah, HttpError, notFound } from '../http.js';

const invalid = (issues) =>
  new HttpError(422, 'invalid_content', 'Nội dung chưa hợp lệ, xem danh sách lỗi (issues).', { issues });

const iso = (d) => (d ? new Date(d).toISOString() : null);

export function adminRoutes({ db, config, validator }) {
  const r = express.Router();
  r.use('/admin', requireAdmin(config));

  r.get(
    '/admin/documents',
    ah(async (req, res) => {
      const [{ rows }, catalog] = await Promise.all([
        db.query(
          `SELECT id, kind, rev, published, title, body, updated_at
             FROM content_documents ORDER BY kind, id`,
        ),
        publishedCatalog(db),
      ]);
      res.json({
        documents: rows.map((d) => ({
          id: d.id,
          kind: d.kind,
          rev: d.rev,
          access: accessOf(d.kind, d.body, catalog?.published_body),
          published: d.published,
          updatedAt: iso(d.updated_at),
          title: d.title,
        })),
      });
    }),
  );

  r.get(
    '/admin/documents/:id',
    ah(async (req, res) => {
      const { rows } = await db.query('SELECT * FROM content_documents WHERE id = $1', [req.params.id]);
      const d = rows[0];
      if (!d) throw notFound('Không có tài liệu này.');
      const catalog = await publishedCatalog(db);
      res.json({
        id: d.id,
        kind: d.kind,
        rev: d.rev,
        access: accessOf(d.kind, d.body, catalog?.published_body),
        published: d.published,
        title: d.title,
        body: d.body,
        publishedBody: d.published_body,
        createdAt: iso(d.created_at),
        updatedAt: iso(d.updated_at),
        publishedAt: iso(d.published_at),
      });
    }),
  );

  r.post('/admin/validate', (req, res) => {
    const { ok, issues } = validator.validateDocument(req.body?.body);
    res.json({ ok, issues });
  });

  r.put(
    '/admin/documents/:id',
    ah(async (req, res) => {
      const body = req.body?.body;
      const { issues } = validator.validateDocument(body);
      if (!issues.length && documentIdOf(body) !== req.params.id) {
        issues.push({
          path: body.kind === 'catalog' ? '/kind' : '/id',
          message: `Mã tài liệu trong nội dung ("${documentIdOf(body)}") khác mã trên đường dẫn ("${req.params.id}").`,
        });
      }
      if (issues.length) throw invalid(issues);

      const saved = await withTransaction(db, async (client) => {
        const existing = await client.query('SELECT kind FROM content_documents WHERE id = $1 FOR UPDATE', [
          req.params.id,
        ]);
        if (existing.rows.length && existing.rows[0].kind !== body.kind) {
          throw invalid([{ path: '/kind', message: `Không được đổi loại tài liệu (đang là "${existing.rows[0].kind}").` }]);
        }
        const { rows } = await client.query(
          `INSERT INTO content_documents(id, kind, title, body, published, updated_at)
           VALUES ($1, $2, $3, $4, false, now())
           ON CONFLICT (id) DO UPDATE
             SET title = EXCLUDED.title, body = EXCLUDED.body, updated_at = now(),
                 published = (content_documents.published_body IS NOT NULL
                              AND content_documents.published_body::jsonb = EXCLUDED.body::jsonb)
           RETURNING id, kind, rev, published, title, updated_at`,
          [req.params.id, body.kind, titleOf(body), body],
        );
        return rows[0];
      });
      res.json({
        id: saved.id,
        kind: saved.kind,
        rev: saved.rev,
        published: saved.published,
        title: saved.title,
        updatedAt: iso(saved.updated_at),
      });
    }),
  );

  r.post(
    '/admin/documents/:id/publish',
    ah(async (req, res) => {
      const result = await withTransaction(db, async (client) => {
        const { rows } = await client.query('SELECT body FROM content_documents WHERE id = $1 FOR UPDATE', [
          req.params.id,
        ]);
        if (!rows.length) throw notFound('Không có tài liệu này.');
        // Kiểm tra lại trước khi phát hành (phòng khi schema đã đổi từ lúc lưu nháp).
        const { issues } = validator.validateDocument(rows[0].body);
        if (issues.length) throw invalid(issues);
        const updated = await client.query(
          `UPDATE content_documents
              SET published_body = body, published = true, rev = rev + 1, published_at = now()
            WHERE id = $1
            RETURNING id, rev`,
          [req.params.id],
        );
        return updated.rows[0];
      });
      res.json(result);
    }),
  );

  return r;
}
