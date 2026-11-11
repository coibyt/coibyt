import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { mergeProgress, progressShapeError } from '../src/merge.js';

const deviceA = {
  v: 1,
  childName: 'Na',
  bookId: 'kntt3',
  totalPoints: 120,
  lessons: {
    l1: { bestStars: 2, bestPoints: 40, plays: 3, lastPlayed: '2026-11-01T08:00:00.000Z' },
    l2: { bestStars: 3, bestPoints: 50, plays: 1, lastPlayed: '2026-11-02T08:00:00.000Z' },
  },
  skills: {
    s1: { correct: 5, total: 10 },
    s2: { correct: 4, total: 6 },
    s3: { correct: 1, total: 4 },
  },
  activeDays: ['2026-11-01', '2026-11-02'],
  exams: [
    { examId: 'e1', score: 8, correct: 8, total: 10, usedSeconds: 600, at: '2026-11-01T09:00:00.000Z', weakSkillIds: [] },
  ],
  badges: { first: '2026-11-01T08:00:00.000Z', streak3: '2026-11-03T08:00:00.000Z' },
  updatedAt: '2026-11-03T10:00:00.000Z',
  extraOld: 'chỉ có ở bản cũ',
};

const deviceB = {
  v: 1,
  childName: 'Bé Na',
  totalPoints: 90,
  lessons: {
    l1: { bestStars: 3, bestPoints: 35, plays: 5, lastPlayed: '2026-10-30T08:00:00.000Z' },
    l3: { bestStars: 1, bestPoints: 10, plays: 1 },
  },
  skills: {
    s1: { correct: 9, total: 12 },
    s2: { correct: 5, total: 6 },
    s4: { correct: 2, total: 2 },
    s3: { correct: 0, total: 3 },
  },
  activeDays: ['2026-10-30', '2026-11-02', '2026-11-05'],
  exams: [
    { examId: 'e1', score: 8, correct: 8, total: 10, usedSeconds: 600, at: '2026-11-01T09:00:00Z', weakSkillIds: [] },
    { examId: 'e2', score: 6, correct: 6, total: 10, usedSeconds: 700, at: '2026-10-29T09:00:00.000Z', weakSkillIds: ['s3'] },
  ],
  badges: { first: '2026-10-30T08:00:00.000Z', perfect: '2026-11-05T08:00:00.000Z' },
  updatedAt: '2026-11-05T10:00:00.000Z',
  settings: { sound: false },
};

describe('mergeProgress', () => {
  const m = mergeProgress(deviceA, deviceB);

  test('totalPoints = max, v = 1', () => {
    assert.equal(m.totalPoints, 120);
    assert.equal(m.v, 1);
  });

  test('lessons: max từng trường, lastPlayed muộn hơn, hợp các bài', () => {
    assert.deepEqual(m.lessons.l1, { bestStars: 3, bestPoints: 40, plays: 5, lastPlayed: '2026-11-01T08:00:00.000Z' });
    assert.deepEqual(m.lessons.l2, deviceA.lessons.l2);
    assert.deepEqual(m.lessons.l3, { bestStars: 1, bestPoints: 10, plays: 1 });
  });

  test('skills: bên có total lớn hơn, bằng nhau thì correct lớn hơn', () => {
    assert.deepEqual(m.skills.s1, { correct: 9, total: 12 });
    assert.deepEqual(m.skills.s2, { correct: 5, total: 6 });
    assert.deepEqual(m.skills.s3, { correct: 1, total: 4 });
    assert.deepEqual(m.skills.s4, { correct: 2, total: 2 });
  });

  test('activeDays = hợp đã sắp xếp', () => {
    assert.deepEqual(m.activeDays, ['2026-10-30', '2026-11-01', '2026-11-02', '2026-11-05']);
  });

  test('exams = hợp, bỏ trùng (examId, at) kể cả khác cách viết ISO, sắp xếp theo at', () => {
    assert.deepEqual(m.exams.map((e) => e.examId), ['e2', 'e1']);
  });

  test('badges = hợp, giữ ngày sớm nhất', () => {
    assert.deepEqual(m.badges, {
      first: '2026-10-30T08:00:00.000Z',
      streak3: '2026-11-03T08:00:00.000Z',
      perfect: '2026-11-05T08:00:00.000Z',
    });
  });

  test('childName/bookId theo bên mới hơn (bên mới không có bookId → không có), updatedAt = max', () => {
    assert.equal(m.childName, 'Bé Na');
    assert.equal(m.bookId, undefined);
    assert.equal(mergeProgress(deviceA, { ...deviceB, bookId: 'ctst3' }).bookId, 'ctst3');
    assert.equal(mergeProgress({ ...deviceA, updatedAt: '2027-01-01T00:00:00Z' }, deviceB).bookId, 'kntt3');
    assert.equal(m.updatedAt, '2026-11-05T10:00:00.000Z');
  });

  test('khoá lạ: giữ của bên mới hơn', () => {
    assert.deepEqual(m.settings, { sound: false });
    assert.equal(m.extraOld, undefined);
  });

  test('đối xứng: đổi thứ tự tham số cho cùng kết quả', () => {
    assert.deepEqual(mergeProgress(deviceB, deviceA), m);
  });

  test('updatedAt bằng nhau → bên thứ hai (incoming) được coi là mới hơn', () => {
    const t = '2026-01-01T00:00:00.000Z';
    assert.equal(mergeProgress({ childName: 'A', updatedAt: t }, { childName: 'B', updatedAt: t }).childName, 'B');
  });

  test('thiếu updatedAt = cũ nhất', () => {
    const r = mergeProgress({ childName: 'Mới', updatedAt: '2026-01-01T00:00:00Z' }, { childName: 'Cũ' });
    assert.equal(r.childName, 'Mới');
    assert.equal(r.updatedAt, '2026-01-01T00:00:00Z');
  });

  test('null / rỗng', () => {
    const r = mergeProgress(null, { childName: 'A', totalPoints: 5 });
    assert.equal(r.childName, 'A');
    assert.equal(r.totalPoints, 5);
    assert.deepEqual(r.lessons, {});
    assert.deepEqual(r.exams, []);
    assert.equal(r.updatedAt, undefined);
  });

  test('idempotent: gộp với chính nó không đổi', () => {
    assert.deepEqual(mergeProgress(m, m), m);
  });
});

describe('progressShapeError', () => {
  test('chấp nhận JSON của Progress.toJson()', () => {
    assert.equal(progressShapeError(deviceA), null);
  });
  test('từ chối sai kiểu', () => {
    assert.match(progressShapeError([]), /object/);
    assert.match(progressShapeError({ lessons: [] }), /lessons/);
    assert.match(progressShapeError({ updatedAt: 'hôm qua' }), /updatedAt/);
  });
});
