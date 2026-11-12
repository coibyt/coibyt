// Biệt danh của bé trên bảng xếp hạng — CHỈ server sinh ra, người dùng không tự gõ.
// Lý do: trẻ 8–9 tuổi; không cho nhập chữ tự do → không lộ tên thật / thông tin cá nhân, không có từ xấu.
// Dạng: "<Con vật> <Tính từ tích cực> <số 10–99>", vd "Mèo Thông Minh 99".
//
// LƯU Ý: migrations/002_leaderboard.sql dùng đúng hai danh sách này để gán biệt danh cho các bé cũ
// (test/nickname.test.js kiểm tra hai nơi khớp nhau).
import crypto from 'node:crypto';

export const ANIMALS = Object.freeze([
  'Mèo',
  'Gấu',
  'Thỏ',
  'Cáo',
  'Cú',
  'Sóc',
  'Voi',
  'Hổ',
  'Gấu Trúc',
  'Chim Cánh Cụt',
  'Rùa',
  'Cá Heo',
  'Hươu',
  'Ong',
  'Khỉ',
  'Sư Tử',
  'Ngựa',
  'Vẹt',
  'Kỳ Lân',
  'Cún',
]);

export const ADJECTIVES = Object.freeze([
  'Thông Minh',
  'Chăm Chỉ',
  'Nhanh Nhẹn',
  'Dũng Cảm',
  'Vui Vẻ',
  'Siêu Tốc',
  'Tinh Mắt',
  'Kiên Trì',
  'Sáng Tạo',
  'Giỏi Giang',
  'Cẩn Thận',
  'Tự Tin',
  'Hăng Hái',
  'Lanh Lợi',
  'Bền Bỉ',
  'Chăm Ngoan',
  'Tài Ba',
  'Nhanh Trí',
]);

const pick = (list) => list[crypto.randomInt(list.length)];

/** Sinh một biệt danh ngẫu nhiên (crypto), chuỗi Unicode NFC. */
export function generateNickname() {
  const n = crypto.randomInt(10, 100); // 10..99
  return `${pick(ANIMALS)} ${pick(ADJECTIVES)} ${n}`.normalize('NFC');
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Biểu thức kiểm tra biệt danh hợp lệ (chỉ gồm từ trong danh sách). */
export const NICKNAME_RE = new RegExp(
  `^(?:${ANIMALS.map(escapeRe).join('|')}) (?:${ADJECTIVES.map(escapeRe).join('|')}) [1-9][0-9]$`,
  'u',
);

export const isValidNickname = (s) => typeof s === 'string' && s === s.normalize('NFC') && NICKNAME_RE.test(s);

/**
 * Sinh biệt danh, cố tránh trùng với biệt danh đang có trong CSDL (không bắt buộc duy nhất:
 * 20 × 18 × 90 = 32 400 tổ hợp, trùng thì cũng không sao vì bảng xếp hạng không dùng biệt danh làm khoá).
 * @param {{ query: Function }} db pool hoặc client
 * @param {number} [tries]
 */
export async function generateFreeNickname(db, tries = 5) {
  const candidates = [...new Set(Array.from({ length: tries }, generateNickname))];
  const { rows } = await db.query('SELECT nickname FROM children WHERE nickname = ANY($1::text[])', [candidates]);
  const taken = new Set(rows.map((r) => r.nickname));
  return candidates.find((c) => !taken.has(c)) ?? candidates[0];
}
