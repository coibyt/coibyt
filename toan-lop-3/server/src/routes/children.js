// /v1/children — hồ sơ các bé + đồng bộ tiến độ.
import express from 'express';
import { requireAuth } from '../auth.js';
import { withTransaction } from '../db.js';
import { ah, badRequest, HttpError, isUuid, notFound } from '../http.js';
import { mergeProgress, pointsByDayError, progressShapeError } from '../merge.js';
import { generateFreeNickname } from '../nickname.js';

const childNotFound = () => notFound('Không tìm thấy hồ sơ bé này.');

// Hồ sơ bé trả cho CHÍNH phụ huynh của bé (có tên thật). Bảng xếp hạng thì chỉ dùng biệt danh.
const CHILD_COLUMNS = 'id, name, nickname, leaderboard_opt_in';
const childJson = (row) => ({
  id: row.id,
  name: row.name,
  nickname: row.nickname,
  leaderboardOptIn: row.leaderboard_opt_in,
});

const PATCHABLE = new Set(['leaderboardOptIn', 'regenerateNickname']);

export function childrenRoutes({ db }) {
  const r = express.Router();
  r.use('/children', requireAuth(db));

  r.get(
    '/children',
    ah(async (req, res) => {
      const { rows } = await db.query(
        `SELECT ${CHILD_COLUMNS} FROM children WHERE account_id = $1 ORDER BY created_at, id`,
        [req.account.id],
      );
      res.json({ children: rows.map(childJson) });
    }),
  );

  r.post(
    '/children',
    ah(async (req, res) => {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      if (!name || [...name].length > 40) throw badRequest('Tên bé phải có từ 1 đến 40 ký tự.', 'invalid_name');
      const nickname = await generateFreeNickname(db);
      const { rows } = await db.query(
        `INSERT INTO children(account_id, name, nickname) VALUES ($1, $2, $3) RETURNING ${CHILD_COLUMNS}`,
        [req.account.id, name, nickname],
      );
      res.status(201).json(childJson(rows[0]));
    }),
  );

  // Chỉ đổi được: tham gia bảng xếp hạng (bật/tắt) và xin biệt danh ngẫu nhiên mới. Không tự đặt biệt danh.
  r.patch(
    '/children/:id',
    ah(async (req, res) => {
      if (!isUuid(req.params.id)) throw childNotFound();
      const body = req.body;
      const isObj = body !== null && typeof body === 'object' && !Array.isArray(body);
      const keys = isObj ? Object.keys(body) : [];
      if (!isObj || !keys.length || keys.some((k) => !PATCHABLE.has(k))) {
        throw badRequest('Chỉ đổi được leaderboardOptIn (true/false) và regenerateNickname (true).', 'invalid_patch');
      }
      if (body.leaderboardOptIn !== undefined && typeof body.leaderboardOptIn !== 'boolean') {
        throw badRequest('leaderboardOptIn phải là true hoặc false.', 'invalid_patch');
      }
      if (body.regenerateNickname !== undefined && body.regenerateNickname !== true) {
        throw badRequest('regenerateNickname chỉ nhận giá trị true.', 'invalid_patch');
      }

      const nickname = body.regenerateNickname ? await generateFreeNickname(db) : null;
      const { rows } = await db.query(
        `UPDATE children
            SET leaderboard_opt_in = COALESCE($3, leaderboard_opt_in),
                nickname = COALESCE($4, nickname)
          WHERE id = $1 AND account_id = $2
          RETURNING ${CHILD_COLUMNS}`,
        [req.params.id, req.account.id, body.leaderboardOptIn ?? null, nickname],
      );
      if (!rows.length) throw childNotFound();
      res.json(childJson(rows[0]));
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
      const pbdError = pointsByDayError(incoming);
      if (pbdError) throw new HttpError(422, 'invalid_progress', pbdError);

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
