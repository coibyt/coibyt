// Tiện ích dùng chung cho nội dung (CMS, seed, API công khai).

export const CATALOG_ID = 'catalog';

/** Mã tài liệu: catalog dùng mã cố định "catalog", lesson/exam dùng body.id. */
export function documentIdOf(body) {
  return body?.kind === 'catalog' ? CATALOG_ID : body?.id;
}

export function titleOf(body) {
  if (body?.kind === 'catalog') return 'Mục lục (catalog)';
  return typeof body?.title === 'string' ? body.title : null;
}

/**
 * Quyền truy cập của tài liệu:
 *  - exam: trường "access" của đề;
 *  - lesson: schema không có "access" ở cấp bài học → lấy theo mục của bài trong catalog
 *    đang phát hành (books[].chapters[].lessons[].access); không có trong catalog → "free";
 *  - catalog: luôn "free".
 */
export function accessOf(kind, body, catalogBody) {
  if (kind === 'exam') return body?.access === 'vip' ? 'vip' : 'free';
  if (kind === 'lesson') {
    for (const book of catalogBody?.books ?? []) {
      for (const chapter of book?.chapters ?? []) {
        for (const l of chapter?.lessons ?? []) {
          if (l?.id === body?.id) return l.access === 'vip' ? 'vip' : 'free';
        }
      }
    }
    return 'free';
  }
  return 'free';
}

export async function publishedCatalog(db) {
  const { rows } = await db.query(
    'SELECT published_body, rev FROM content_documents WHERE id = $1 AND published_body IS NOT NULL',
    [CATALOG_ID],
  );
  return rows[0] ?? null;
}
