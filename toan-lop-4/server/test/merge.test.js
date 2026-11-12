import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { isDayKey, mergeProgress, pointsByDayError, progressShapeError } from '../src/merge.js';

const deviceA = {
  v: 1,
  childName: 'Na',
  bookId: 'kntt4',
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
    assert.equal(mergeProgress(deviceA, { ...deviceB, bookId: 'ctst4' }).bookId, 'ctst4');
    assert.equal(mergeProgress({ ...deviceA, updatedAt: '2027-01-01T00:00:00Z' }, deviceB).bookId, 'kntt4');
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

describe('pointsByDay', () => {
  test('hợp các ngày, mỗi ngày lấy lớn hơn; khoá sắp xếp', () => {
    const r = mergeProgress(
      { pointsByDay: { '2026-11-10': 50, '2026-11-09': 10 }, updatedAt: '2026-11-10T00:00:00Z' },
      { pointsByDay: { '2026-11-10': 30, '2026-11-11': 70 }, updatedAt: '2026-11-11T00:00:00Z' },
    );
    assert.deepEqual(r.pointsByDay, { '2026-11-09': 10, '2026-11-10': 50, '2026-11-11': 70 });
    assert.deepEqual(Object.keys(r.pointsByDay), ['2026-11-09', '2026-11-10', '2026-11-11']);
  });

  test('bỏ giá trị không phải số nguyên ≥ 0 và khoá ngày sai định dạng', () => {
    const r = mergeProgress(
      { pointsByDay: { '2026-11-10': -5, '2026-11-11': 2.5, '2026-11-12': '40', '2026-11-13': null, '2026-11-14': 0 } },
      { pointsByDay: { '2026-02-30': 10, '2026-1-05': 10, 'hôm nay': 10, '2026-11-10x': 10, '2026-11-15': 15 } },
    );
    assert.deepEqual(r.pointsByDay, { '2026-11-14': 0, '2026-11-15': 15 });
    // giá trị hỏng một bên không che giá trị đúng của bên kia
    assert.deepEqual(mergeProgress({ pointsByDay: { '2026-11-10': 'x' } }, { pointsByDay: { '2026-11-10': 4 } }).pointsByDay, {
      '2026-11-10': 4,
    });
  });

  test('chỉ một bên có / không bên nào có', () => {
    assert.deepEqual(mergeProgress({ totalPoints: 1 }, { pointsByDay: { '2026-11-10': 3 } }).pointsByDay, { '2026-11-10': 3 });
    assert.deepEqual(mergeProgress({ pointsByDay: { '2026-11-10': 3 } }, null).pointsByDay, { '2026-11-10': 3 });
    assert.equal(Object.hasOwn(mergeProgress({ totalPoints: 1 }, { totalPoints: 2 }), 'pointsByDay'), false);
  });

  test('đối xứng và idempotent; không bị coi là khoá lạ', () => {
    const a = { pointsByDay: { '2026-11-10': 5, '2026-11-12': 9 }, updatedAt: '2026-11-12T00:00:00Z' };
    const b = { pointsByDay: { '2026-11-10': 8 }, updatedAt: '2026-11-13T00:00:00Z' };
    const m = mergeProgress(a, b);
    assert.deepEqual(m.pointsByDay, { '2026-11-10': 8, '2026-11-12': 9 }); // không lấy nguyên bản của bên mới hơn
    assert.deepEqual(mergeProgress(b, a), m);
    assert.deepEqual(mergeProgress(m, m), m);
  });

  test('khoá lạ mới của app (coins, hearts, pets) vẫn lấy của bên mới hơn', () => {
    const r = mergeProgress(
      { coins: 5, pets: ['mèo'], updatedAt: '2026-11-10T00:00:00Z' },
      { coins: 3, hearts: 2, updatedAt: '2026-11-11T00:00:00Z' },
    );
    assert.equal(r.coins, 3);
    assert.equal(r.hearts, 2);
    assert.equal(r.pets, undefined);
  });

  test('isDayKey', () => {
    assert.equal(isDayKey('2026-11-10'), true);
    assert.equal(isDayKey('2028-02-29'), true);
    assert.equal(isDayKey('2026-02-29'), false);
    assert.equal(isDayKey('2026-13-01'), false);
    assert.equal(isDayKey('20261110'), false);
    assert.equal(isDayKey(20261110), false);
  });

  test('pointsByDayError: có mặt thì phải là object', () => {
    assert.equal(pointsByDayError({}), null);
    assert.equal(pointsByDayError({ pointsByDay: {} }), null);
    for (const bad of [[], 'x', 1, null, true]) assert.match(pointsByDayError({ pointsByDay: bad }), /pointsByDay/);
  });
});
