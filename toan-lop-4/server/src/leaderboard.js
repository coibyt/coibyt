// Bảng xếp hạng theo tuần / tháng (giờ Việt Nam). Chỉ hiện BIỆT DANH — không tên thật, không email, không id.
import { LEADERBOARD_DAILY_CAP, LEADERBOARD_TOP_N } from './config.js';

export const PERIODS = Object.freeze(['week', 'month']);
const VN_OFFSET_MS = 7 * 3600 * 1000; // UTC+7, Việt Nam không có giờ mùa hè
const DAY_MS = 24 * 3600 * 1000;

const ymd = (ms) => new Date(ms).toISOString().slice(0, 10);

/**
 * Khoảng thời gian [start, end) dạng "YYYY-MM-DD" theo lịch Việt Nam.
 *   week  = thứ Hai 00:00 → thứ Hai tuần sau 00:00
 *   month = ngày 1 00:00 → ngày 1 tháng sau 00:00
 * @param {Date} now
 * @param {'week'|'month'} period
 */
export function periodBounds(now, period) {
  const vn = new Date(now.getTime() + VN_OFFSET_MS); // đọc các trường UTC của vn = giờ địa phương VN
  const y = vn.getUTCFullYear();
  const m = vn.getUTCMonth();
  const d = vn.getUTCDate();
  if (period === 'month') {
    return { start: ymd(Date.UTC(y, m, 1)), end: ymd(Date.UTC(y, m + 1, 1)) };
  }
  const sinceMonday = (vn.getUTCDay() + 6) % 7; // thứ Hai = 0 … Chủ nhật = 6
  const start = Date.UTC(y, m, d - sinceMonday);
  return { start: ymd(start), end: ymd(start + 7 * DAY_MS) };
}

// Điểm của mỗi bé trong [start, end): tổng min(pointsByDay[ngày], cap). Khoá ngày "YYYY-MM-DD" so sánh
// theo chuỗi là đúng thứ tự thời gian. Giá trị không phải số / âm bị bỏ qua (merge.js vốn đã lọc).
//
// Mở rộng sau này: câu này quét toàn bộ progress mỗi lần gọi — ổn với vài nghìn bé. Khi đông hơn nên
// tách pointsByDay ra bảng child_daily_points(child_id, day, points) cập nhật lúc PUT progress (hoặc
// materialized view làm mới định kỳ) với index (day), rồi cache kết quả bảng xếp hạng vài phút.
const LEADERBOARD_SQL = `
WITH scores AS (
  SELECT c.id, c.nickname, c.leaderboard_opt_in AS opted_in, c.created_at, s.points
    FROM children c
    LEFT JOIN progress p ON p.child_id = c.id
    CROSS JOIN LATERAL (
      SELECT COALESCE(sum(LEAST(GREATEST(floor(d.v), 0), $3::int)), 0)::int AS points
        FROM (
          SELECT CASE WHEN jsonb_typeof(e.value) = 'number' THEN (e.value)::numeric END AS v
            FROM jsonb_each(
                   CASE WHEN jsonb_typeof(p.doc -> 'pointsByDay') = 'object'
                        THEN p.doc -> 'pointsByDay' ELSE '{}'::jsonb END) e
           WHERE e.key ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' AND e.key >= $1 AND e.key < $2
        ) d
    ) s
),
ranked AS (
  SELECT id, nickname, points,
         (row_number() OVER (ORDER BY points DESC, created_at ASC, id ASC))::int AS rank
    FROM scores
   WHERE opted_in AND points > 0
),
me AS (SELECT rank FROM ranked WHERE id = $4)
SELECT 'ranked' AS kind, r.id = $4 AS is_me, r.nickname, r.points, r.rank, true AS opted_in
  FROM ranked r
 WHERE r.rank <= $5
    OR r.rank BETWEEN (SELECT rank - 1 FROM me) AND (SELECT rank FROM me)
UNION ALL
SELECT 'self', true, s.nickname, s.points, NULL, s.opted_in
  FROM scores s
 WHERE s.id = $4
ORDER BY kind, rank`;

/**
 * @param {{ query: Function }} db
 * @param {{ childId: string, period: 'week'|'month', now: Date, dailyCap?: number, topN?: number }} opts
 */
export async function buildLeaderboard(db, { childId, period, now, dailyCap = LEADERBOARD_DAILY_CAP, topN = LEADERBOARD_TOP_N }) {
  const { start, end } = periodBounds(now, period);
  const { rows } = await db.query(LEADERBOARD_SQL, [start, end, dailyCap, childId, topN]);

  const ranked = rows.filter((r) => r.kind === 'ranked');
  const self = rows.find((r) => r.kind === 'self');
  const mine = ranked.find((r) => r.is_me);

  const entries = ranked
    .filter((r) => r.rank <= topN)
    .map((r) => ({ rank: r.rank, nickname: r.nickname, points: r.points, isMe: r.is_me }));

  let above = null;
  if (mine && mine.rank > 1) {
    const a = ranked.find((r) => r.rank === mine.rank - 1);
    above = { rank: a.rank, nickname: a.nickname, points: a.points };
  }

  return {
    period,
    start,
    end,
    entries,
    me: {
      rank: mine ? mine.rank : null,
      points: self.points,
      nickname: self.nickname,
      optedIn: self.opted_in,
      above,
      // Điểm cần thêm để vượt hẳn lên trên bạn ngay phía trước.
      gapToAbove: above ? above.points - mine.points + 1 : null,
    },
  };
}
