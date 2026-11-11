// Lỗi HTTP chuẩn: { error: "<code>", message: "<tiếng Việt>" }.

export class HttpError extends Error {
  /**
   * @param {number} status
   * @param {string} code
   * @param {string} message
   * @param {object} [extra] trường bổ sung đưa vào JSON (vd issues)
   */
  constructor(status, code, message, extra = undefined) {
    super(message);
    this.status = status;
    this.code = code;
    this.extra = extra;
  }
}

/** Bọc handler async để lỗi được chuyển cho error handler của Express 4. */
export const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export const badRequest = (message, code = 'invalid_request') => new HttpError(400, code, message);
export const notFound = (message = 'Không tìm thấy.') => new HttpError(404, 'not_found', message);

/** So khớp If-None-Match với ETag (hỗ trợ danh sách, W/ và *). */
export function etagMatches(req, etag) {
  const header = req.get('if-none-match');
  if (!header) return false;
  return header
    .split(',')
    .map((s) => s.trim().replace(/^W\//, ''))
    .some((t) => t === '*' || t === etag);
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (s) => typeof s === 'string' && UUID_RE.test(s);
