// /v1/children — hồ sơ các bé + đồng bộ tiến độ.
import express from 'express';
import { requireAuth } from '../auth.js';
import { withTransaction } from '../db.js';
import { ah, badRequest, isUuid, notFound } from '../http.js';
import { mergeProgress, progressShapeError } from '../merge.js';

const childNotFound = () => notFound('Không tìm thấy hồ sơ bé này.');

export function childrenRoutes({ db }) {
  const r = express.Router();
  r.use('/children', requireAuth(db));

  r.get(
    '/children',
    ah(async (req, res) => {
      const { rows } = await db.query(
        'SELECT id, name FROM children WHERE account_id = $1 ORDER BY created_at, id',
        [req.account.id],
      );
      res.json({ children: rows });
    }),
  );

  r.post(
    '/children',
    ah(async (req, res) => {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      if (!name || [...name].length > 40) throw badRequest('Tên bé phải có từ 1 đến 40 ký tự.', 'invalid_name');
      const { rows } = await db.query('INSERT INTO children(account_id, name) VALUES ($1, $2) RETURNING id, name', [
        req.account.id,
        name,
      ]);
      res.status(201).json(rows[0]);
    }),
  );

  r.get(
    '/children/:id/progress',
    ah(async (req, res) => {
      if (!isUuid(req.params.id)) throw childNotFound();
      const { rows } = await db.query(
        `SELECT p.doc, p.updated_at
           FROM children c LEFT JOIN progress p ON p.child_id = c.id
          WHERE c.id = $1 AND c.account_id = $2`,
        [req.params.id, req.account.id],
      );
      if (!rows.length) throw childNotFound();
      res.json({
        progress: rows[0].doc ?? null,
        updatedAt: rows[0].updated_at ? new Date(rows[0].updated_at).toISOString() : null,
      });
    }),
  );

  r.put(
    '/children/:id/progress',
    ah(async (req, res) => {
      if (!isUuid(req.params.id)) throw childNotFound();
      const incoming = req.body?.progress;
      const shapeError = progressShapeError(incoming);
      if (shapeError) throw badRequest(shapeError, 'invalid_progress');

      const result = await withTransaction(db, async (client) => {
        // Khoá hồ sơ bé: hai thiết bị đẩy cùng lúc sẽ được gộp lần lượt, không mất dữ liệu.
        const owned = await client.query('SELECT id FROM children WHERE id = $1 AND account_id = $2 FOR UPDATE', [
          req.params.id,
          req.account.id,
        ]);
        if (!owned.rows.length) throw childNotFound();
        const current = await client.query('SELECT doc FROM progress WHERE child_id = $1', [req.params.id]);
        const merged = mergeProgress(current.rows[0]?.doc ?? null, incoming);
        const { rows } = await client.query(
          `INSERT INTO progress(child_id, doc, updated_at) VALUES ($1, $2, now())
           ON CONFLICT (child_id) DO UPDATE SET doc = EXCLUDED.doc, updated_at = now()
           RETURNING doc, updated_at`,
          [req.params.id, merged],
        );
        return rows[0];
      });
      res.json({ progress: result.doc, updatedAt: new Date(result.updated_at).toISOString() });
    }),
  );

  return r;
}
