// Gộp (merge) hai bản tiến độ của cùng một bé — hàm THUẦN, không đụng CSDL.
// App Flutter cài đặt đúng các quy tắc này (xem README, mục "Quy tắc gộp tiến độ").
//
//   totalPoints          = lớn hơn
//   lessons[id]          bestStars / bestPoints / plays = lớn hơn; lastPlayed = muộn hơn
//   skills[id]           giữ bên có total lớn hơn (bằng nhau → correct lớn hơn)
//   activeDays           hợp, sắp xếp tăng dần
//   exams                hợp, bỏ trùng theo (examId, at) — so sánh at theo thời điểm, nên
//                        "…00.000Z" và "…00Z" là một; khi trùng giữ bản của bên mới hơn —
//                        sắp xếp theo at
//   badges               hợp, mỗi mã giữ ngày SỚM nhất
//   childName, bookId    lấy từ bên có updatedAt mới hơn (thiếu updatedAt = cũ nhất;
//                        bằng nhau → bên thứ hai "incoming"); bên mới hơn không có thì bỏ trống
//   updatedAt            muộn hơn
//   v                    = 1
//   các khoá lạ (không thuộc danh sách trên) của bên MỚI hơn được giữ nguyên.

export const PROGRESS_VERSION = 1;

const KNOWN_KEYS = new Set([
  'v',
  'childName',
  'bookId',
  'totalPoints',
  'lessons',
  'skills',
  'activeDays',
  'exams',
  'badges',
  'updatedAt',
]);

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : 0);
const obj = (v) => (isObj(v) ? v : {});
const arr = (v) => (Array.isArray(v) ? v : []);

/** Thời điểm (ms) từ chuỗi ISO; không hợp lệ / thiếu → -Infinity (coi là cũ nhất). */
export function timeOf(iso) {
  if (typeof iso !== 'string') return -Infinity;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? -Infinity : t;
}

/** Chọn chuỗi thời gian muộn hơn (giữ nguyên chuỗi gốc). */
function later(x, y) {
  const tx = timeOf(x);
  const ty = timeOf(y);
  if (tx === -Infinity && ty === -Infinity) return undefined;
  return ty > tx ? y : x;
}

/** Chọn chuỗi thời gian sớm hơn; chuỗi không hợp lệ chỉ được chọn khi bên kia cũng không có. */
function earlier(x, y) {
  const tx = timeOf(x);
  const ty = timeOf(y);
  if (tx === -Infinity) return ty === -Infinity ? (x ?? y) : y;
  if (ty === -Infinity) return x;
  return ty < tx ? y : x;
}

function mergeLesson(a, b) {
  const x = obj(a);
  const y = obj(b);
  const out = {
    bestStars: Math.max(num(x.bestStars), num(y.bestStars)),
    bestPoints: Math.max(num(x.bestPoints), num(y.bestPoints)),
    plays: Math.max(num(x.plays), num(y.plays)),
  };
  const lp = later(x.lastPlayed, y.lastPlayed);
  if (lp !== undefined) out.lastPlayed = lp;
  return out;
}

function pickSkill(a, b) {
  if (!isObj(a)) return { correct: num(b?.correct), total: num(b?.total) };
  if (!isObj(b)) return { correct: num(a.correct), total: num(a.total) };
  const ta = num(a.total);
  const tb = num(b.total);
  const win = tb > ta || (tb === ta && num(b.correct) > num(a.correct)) ? b : a;
  return { correct: num(win.correct), total: num(win.total) };
}

function mergeMap(a, b, fn) {
  const x = obj(a);
  const y = obj(b);
  const out = {};
  for (const key of new Set([...Object.keys(x), ...Object.keys(y)])) {
    out[key] = fn(x[key], y[key]);
  }
  return out;
}

function examKey(e) {
  const t = timeOf(e?.at);
  return `${e?.examId}\u0000${t === -Infinity ? String(e?.at) : t}`;
}

function mergeExams(a, b) {
  const seen = new Set();
  const out = [];
  for (const e of [...arr(a), ...arr(b)]) {
    if (!isObj(e)) continue;
    const k = examKey(e);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(e);
  }
  // sort ổn định: cùng thời điểm thì giữ thứ tự xuất hiện
  return out.sort((p, q) => timeOf(p.at) - timeOf(q.at) || 0);
}

/**
 * Gộp hai bản tiến độ. `stored` = bản trên server, `incoming` = bản app vừa gửi.
 * Kết quả không phụ thuộc thứ tự tham số, trừ khi hai bên có updatedAt bằng nhau
 * (khi đó `incoming` được coi là bên mới hơn).
 * @param {object|null|undefined} stored
 * @param {object|null|undefined} incoming
 * @returns {object}
 */
export function mergeProgress(stored, incoming) {
  const a = obj(stored);
  const b = obj(incoming);
  const bNewer = timeOf(b.updatedAt) >= timeOf(a.updatedAt);
  const newer = bNewer ? b : a;
  const older = bNewer ? a : b;

  const out = {};
  for (const [k, v] of Object.entries(newer)) {
    if (!KNOWN_KEYS.has(k)) out[k] = v;
  }
  out.v = PROGRESS_VERSION;

  if (newer.childName !== undefined && newer.childName !== null) out.childName = newer.childName;
  if (newer.bookId !== undefined && newer.bookId !== null) out.bookId = newer.bookId;

  out.totalPoints = Math.max(num(a.totalPoints), num(b.totalPoints));
  out.lessons = mergeMap(a.lessons, b.lessons, mergeLesson);
  out.skills = mergeMap(a.skills, b.skills, pickSkill);
  out.activeDays = [...new Set([...arr(a.activeDays), ...arr(b.activeDays)].filter((d) => typeof d === 'string'))].sort();
  out.exams = mergeExams(newer.exams, older.exams);
  out.badges = mergeMap(a.badges, b.badges, earlier);

  const updatedAt = later(a.updatedAt, b.updatedAt);
  if (updatedAt !== undefined) out.updatedAt = updatedAt;
  return out;
}

/**
 * Kiểm tra sơ bộ kiểu dữ liệu của bản tiến độ app gửi lên.
 * @returns {string|null} thông báo lỗi hoặc null nếu dùng được.
 */
export function progressShapeError(p) {
  if (!isObj(p)) return 'progress phải là một object.';
  const checks = [
    ['lessons', isObj],
    ['skills', isObj],
    ['badges', isObj],
    ['activeDays', Array.isArray],
    ['exams', Array.isArray],
    ['totalPoints', (v) => typeof v === 'number' && Number.isFinite(v)],
    ['childName', (v) => typeof v === 'string'],
    ['bookId', (v) => typeof v === 'string'],
    ['updatedAt', (v) => typeof v === 'string' && !Number.isNaN(Date.parse(v))],
  ];
  for (const [key, ok] of checks) {
    if (p[key] !== undefined && p[key] !== null && !ok(p[key])) return `Trường "${key}" sai kiểu dữ liệu.`;
  }
  return null;
}
