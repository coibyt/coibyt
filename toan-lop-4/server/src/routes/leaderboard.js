// /v1/leaderboard — bảng xếp hạng tuần / tháng theo biệt danh.
import express from 'express';
import { requireAuth } from '../auth.js';
import { ah, badRequest, isUuid, notFound } from '../http.js';
import { buildLeaderboard, PERIODS } from '../leaderboard.js';

export function leaderboardRoutes({ db, config, clock }) {
  const r = express.Router();
  r.use('/leaderboard', requireAuth(db));

  r.get(
    '/leaderboard',
    ah(async (req, res) => {
      const period = req.query.period === undefined ? 'week' : req.query.period;
      if (!PERIODS.includes(period)) throw badRequest('period phải là "week" hoặc "month".', 'invalid_period');

      const childId = req.query.childId;
      if (!isUuid(childId)) throw notFound('Không tìm thấy hồ sơ bé này.');
      const owned = await db.query('SELECT 1 FROM children WHERE id = $1 AND account_id = $2', [
        childId,
        req.account.id,
      ]);
      if (!owned.rows.length) throw notFound('Không tìm thấy hồ sơ bé này.');

      res.json(
        await buildLeaderboard(db, {
          childId,
          period,
          now: clock(),
          dailyCap: config.leaderboardDailyCap,
          topN: config.leaderboardTopN,
        }),
      );
    }),
  );

  return r;
}
