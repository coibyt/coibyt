import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, test } from 'node:test';
import { checkEquation, evaluate } from '../src/expression.js';
import { listContentFiles } from '../src/seed.js';
import { getValidator } from './helpers.js';
import { loadConfig } from '../src/config.js';

const { contentDir } = loadConfig({});
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(contentDir, rel), 'utf8'));
const LESSON = 'lessons/kntt4.c4.nhan-2cs-1cs.json';

describe('expression (port của expression_evaluator.dart)', () => {
  test('thứ tự phép tính, ngoặc, ký hiệu', () => {
    assert.equal(evaluate('2 + 3 × 4'), 14);
    assert.equal(evaluate('(2 + 3) x 4'), 20);
    assert.equal(evaluate('20 : 4 * 3'), 15);
    assert.equal(evaluate('20 ÷ 5 − 1'), 3);
    assert.equal(evaluate('12.345 + 1'), 12346);
  });
  test('checkEquation', () => {
    assert.equal(checkEquation('13 × 4 = 52 (cây)'), null);
    assert.equal(checkEquation('52 + 38 = 90 (cây)'), null);
    assert.equal(checkEquation('2 × 3 = 6 = 3 + 3'), null);
    assert.match(checkEquation('24 × 3 = 62 (cái)'), /72/);
    assert.match(checkEquation('7 : 2 = 3'), /không chia hết/);
    assert.match(checkEquation('5 : 0 = 0'), /chia cho 0/);
    assert.match(checkEquation('12'), /không có dấu/);
    assert.match(checkEquation('1.23 = 1'), /viết sai/);
    assert.match(checkEquation('2 # 3 = 5'), /ký tự lạ/);
    assert.match(checkEquation('(2 + 3 = 5'), /thiếu "\)"/);
  });
});

describe('validateDocument', () => {
  const v = getValidator();

  test('mọi file trong assets/content đều hợp lệ', async () => {
    const files = await listContentFiles(contentDir);
    assert.ok(files.length >= 5);
    for (const f of files) {
      const r = v.validateDocument(JSON.parse(fs.readFileSync(f, 'utf8')));
      assert.deepEqual(r.issues, [], f);
    }
  });

  test('phép tính sai trong word_problem', () => {
    const doc = readJson(LESSON);
    const idx = doc.problems.findIndex((p) => p.solution.steps.some((s) => s.kind === 'word_problem'));
    const j = doc.problems[idx].solution.steps.findIndex((s) => s.kind === 'word_problem');
    doc.problems[idx].solution.steps[j].lines[0].equation = '24 × 3 = 62 (cái)';
    const r = v.validateDocument(doc);
    assert.equal(r.ok, false);
    assert.deepEqual(r.issues.map((i) => i.path), [`/problems/${idx}/solution/steps/${j}/lines/0/equation`]);
  });

  test('phép tính sai trong equation block', () => {
    const doc = readJson(LESSON);
    doc.theory.blocks.push({ kind: 'equation', text: '26 × 3 = 68' });
    const r = v.validateDocument(doc);
    assert.equal(r.issues.length, 1);
    assert.match(r.issues[0].path, /^\/theory\/blocks\/\d+\/text$/);
  });

  test('fill_blank: {{id}} phải khớp blanks', () => {
    const doc = readJson(LESSON);
    const p = doc.problems.find((x) => x.type === 'fill_blank');
    p.template = `${p.template} {{b9}}`;
    const r = v.validateDocument(doc);
    assert.ok(r.issues.some((i) => i.message.includes('{{b9}}')), JSON.stringify(r.issues));
  });

  test('multiple_choice: correctChoiceIds phải tồn tại', () => {
    const doc = readJson(LESSON);
    const p = doc.problems.find((x) => x.type === 'multiple_choice');
    p.correctChoiceIds = ['z'];
    const r = v.validateDocument(doc);
    assert.ok(r.issues.some((i) => i.message.includes('"z"')), JSON.stringify(r.issues));
  });

  test('đề kiểm tra: tổng điểm phải bằng 10', () => {
    const doc = readJson('exams/kntt4.c4.de-1.json');
    doc.sections[0].items[0].points += 0.5;
    const r = v.validateDocument(doc);
    assert.deepEqual(r.issues.map((i) => i.path), ['/sections']);
    assert.match(r.issues[0].message, /10/);
  });

  test('lỗi schema được rút gọn theo đúng loại bài (không nhiễu oneOf)', () => {
    const doc = readJson(LESSON);
    delete doc.problems[0].prompt;
    doc.problems[1].extra = 1;
    const r = v.validateDocument(doc);
    assert.deepEqual(
      r.issues.map((i) => `${i.path} ${i.message}`),
      ['/problems/0 thiếu trường bắt buộc "prompt"', '/problems/1 trường không được phép "extra"'],
    );
  });

  test('kind không hợp lệ / không phải object', () => {
    assert.equal(v.validateDocument({ kind: 'x' }).issues[0].path, '/kind');
    assert.equal(v.validateDocument('chuỗi').ok, false);
  });
});
