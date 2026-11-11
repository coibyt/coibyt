import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import { MIGRATIONS_DIR } from '../src/migrate.js';
import { ADJECTIVES, ANIMALS, generateNickname, isValidNickname, NICKNAME_RE } from '../src/nickname.js';

describe('nickname', () => {
  test('danh sách đủ dài, không trùng, chuẩn NFC, chỉ chữ cái và khoảng trắng', () => {
    assert.ok(ANIMALS.length >= 15);
    assert.ok(ADJECTIVES.length >= 15);
    for (const list of [ANIMALS, ADJECTIVES]) {
      assert.equal(new Set(list).size, list.length);
      for (const w of list) {
        assert.equal(w, w.normalize('NFC'), w);
        assert.match(w, /^\p{Lu}\p{Ll}*(?: \p{Lu}\p{Ll}*)*$/u, w);
      }
    }
  });

  test('định dạng "<Con vật> <Tính từ> <10–99>", chỉ dùng từ trong danh sách', () => {
    const seenNumbers = new Set();
    for (let i = 0; i < 2000; i++) {
      const n = generateNickname();
      assert.equal(n, n.normalize('NFC'));
      assert.match(n, NICKNAME_RE);
      assert.ok(isValidNickname(n));
      const num = Number(n.slice(n.lastIndexOf(' ') + 1));
      assert.ok(num >= 10 && num <= 99, n);
      seenNumbers.add(num);
      const words = n.slice(0, n.lastIndexOf(' '));
      assert.ok(
        ANIMALS.some((a) => ADJECTIVES.some((adj) => `${a} ${adj}` === words)),
        n,
      );
    }
    assert.ok(seenNumbers.size > 60); // ngẫu nhiên thật sự, phủ gần hết 10–99
  });

  test('ví dụ hợp lệ / không hợp lệ', () => {
    for (const ok of ['Mèo Thông Minh 99', 'Gấu Chăm Chỉ 12', 'Thỏ Nhanh Nhẹn 47', 'Chim Cánh Cụt Bền Bỉ 10']) {
      assert.ok(isValidNickname(ok), ok);
    }
    for (const bad of ['Mèo Thông Minh 9', 'Mèo Thông Minh 100', 'Mèo Ngốc 12', 'Nguyễn Văn A 12', 'mèo thông minh 12', '', null]) {
      assert.equal(isValidNickname(bad), false, String(bad));
    }
    // Cùng chữ nhưng dạng NFD → không hợp lệ (luôn lưu NFC).
    assert.equal(isValidNickname('Mèo Thông Minh 99'.normalize('NFD')), false);
  });

  test('"gần như duy nhất": 200 lần sinh cho phần lớn là khác nhau', () => {
    const set = new Set(Array.from({ length: 200 }, generateNickname));
    assert.ok(set.size >= 190, String(set.size));
  });

  test('migration 002 dùng đúng hai danh sách của src/nickname.js', () => {
    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, '002_leaderboard.sql'), 'utf8');
    assert.equal(sql, sql.normalize('NFC'));
    const arrays = [...sql.matchAll(/ARRAY\[([^\]]*)\]/g)].map((m) => [...m[1].matchAll(/'([^']*)'/g)].map((x) => x[1]));
    assert.deepEqual(arrays, [[...ANIMALS], [...ADJECTIVES]]);
    assert.match(sql, new RegExp(`random\\(\\) \\* ${ANIMALS.length}\\)`));
    assert.match(sql, new RegExp(`random\\(\\) \\* ${ADJECTIVES.length}\\)`));
  });
});
