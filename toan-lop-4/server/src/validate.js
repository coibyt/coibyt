// Kiểm tra nội dung: (1) JSON Schema (ajv, draft 2020-12) và (2) kiểm tra TOÁN/liên kết mã.
// Kết quả là danh sách issues: [{ path, message }] — path dạng JSON Pointer ("/problems/3/...").
import fs from 'node:fs';
import Ajv2020 from 'ajv/dist/2020.js';
import { checkEquation } from './expression.js';

const KINDS = ['catalog', 'lesson', 'exam'];
const MAX_ISSUES = 100;

/**
 * Tạo bộ kiểm tra từ file schema.
 * @param {string} schemaPath
 */
export function createValidator(schemaPath) {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: false, verbose: true });
  ajv.addSchema(schema);
  const id = schema.$id;
  const whole = ajv.getSchema(id);
  const defValidators = new Map();
  const defValidator = (name) => {
    if (!defValidators.has(name)) defValidators.set(name, ajv.compile({ $ref: `${id}#/$defs/${name}` }));
    return defValidators.get(name);
  };

  /**
   * Lỗi oneOf của ajv rất nhiễu (báo lỗi cho mọi nhánh). Với mỗi oneOf có trường phân loại
   * ("kind" của tài liệu/block/đáp án, "type" của bài toán), chỉ giữ lỗi của nhánh đúng loại.
   */
  function clean(errors, prefix = '') {
    const out = [];
    const handled = []; // instancePath của các oneOf đã xử lý
    const under = (path, base) => path === base || path.startsWith(`${base}/`);
    const oneOfs = errors.filter((e) => e.keyword === 'oneOf').sort((a, b) => a.instancePath.length - b.instancePath.length);
    for (const e of oneOfs) {
      if (handled.some((h) => under(e.instancePath, h))) continue;
      handled.push(e.instancePath);
      const branches = asArray(e.schema)
        .map((b) => b?.$ref?.match(/^#\/\$defs\/([^/]+)$/)?.[1])
        .filter(Boolean)
        .map((name) => {
          const props = schema.$defs[name]?.properties ?? {};
          const field = props.kind?.const !== undefined ? 'kind' : props.type?.const !== undefined ? 'type' : null;
          return { name, field, value: field ? props[field].const : undefined };
        });
      const fields = [...new Set(branches.map((b) => b.field).filter(Boolean))];
      const match = branches.find((b) => b.field && isObj(e.data) && e.data[b.field] === b.value);
      if (match) {
        const fn = defValidator(match.name);
        if (!fn(e.data)) out.push(...clean(fn.errors, prefix + e.instancePath));
      } else if (fields.length === 1 && branches.every((b) => b.field)) {
        out.push({
          path: `${prefix}${e.instancePath}/${fields[0]}` || '/',
          message: `"${fields[0]}" phải là một trong: ${branches.map((b) => JSON.stringify(b.value)).join(', ')}`,
        });
      } else {
        handled.pop(); // không phân loại được: giữ nguyên các lỗi con
      }
    }
    for (const e of errors) {
      if (handled.some((h) => under(e.instancePath, h))) continue;
      if (e.keyword === 'oneOf') continue;
      out.push({ path: prefix + e.instancePath || '/', message: ajvMessage(e) });
    }
    if (!out.length && errors.length) {
      out.push({ path: prefix + errors[0].instancePath || '/', message: ajvMessage(errors[0]) });
    }
    return out;
  }

  /** @returns {{ok: boolean, issues: {path: string, message: string}[]}} */
  function validateDocument(body) {
    if (!isObj(body)) {
      return { ok: false, issues: [{ path: '/', message: 'Nội dung phải là một object JSON.' }] };
    }
    if (!KINDS.includes(body.kind)) {
      return {
        ok: false,
        issues: [{ path: '/kind', message: `"kind" phải là một trong: ${KINDS.join(', ')}.` }],
      };
    }
    const issues = [];
    if (!whole(body)) issues.push(...clean(whole.errors));
    issues.push(...mathIssues(body));
    const unique = dedupe(issues).slice(0, MAX_ISSUES);
    return { ok: unique.length === 0, issues: unique };
  }

  return { validateDocument, schema };
}

function dedupe(issues) {
  const seen = new Set();
  return issues.filter((i) => {
    const key = `${i.path}\u0000${i.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function ajvMessage(e) {
  switch (e.keyword) {
    case 'required':
      return `thiếu trường bắt buộc "${e.params.missingProperty}"`;
    case 'additionalProperties':
      return `trường không được phép "${e.params.additionalProperty}"`;
    case 'unevaluatedProperties':
      return `trường không được phép "${e.params.unevaluatedProperty}"`;
    case 'enum':
      return `phải là một trong: ${JSON.stringify(e.params.allowedValues)}`;
    case 'const':
      return `phải là ${JSON.stringify(e.params.allowedValue)}`;
    default:
      return e.message || 'không hợp lệ';
  }
}

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const asArray = (v) => (Array.isArray(v) ? v : []);
const slotIds = (template) =>
  typeof template === 'string' ? [...template.matchAll(/\{\{([a-z0-9_]+)\}\}/g)].map((m) => m[1]) : [];

function duplicates(list) {
  const seen = new Set();
  const dup = new Set();
  for (const x of list) (seen.has(x) ? dup : seen).add(x);
  return [...dup];
}

/** Kiểm tra toán + liên kết mã. Viết phòng thủ: chạy được cả khi cấu trúc sai schema. */
export function mathIssues(doc) {
  const issues = [];
  const add = (path, message) => issues.push({ path, message });
  const problemIds = [];

  const walk = (node, path) => {
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${path}/${i}`));
      return;
    }
    if (!isObj(node)) return;

    if (node.kind === 'equation' && typeof node.text === 'string') {
      const err = checkEquation(node.text);
      if (err) add(`${path}/text`, `Phép tính sai: "${node.text}" — ${err}`);
    }
    if (node.kind === 'word_problem') {
      asArray(node.lines).forEach((line, i) => {
        if (isObj(line) && typeof line.equation === 'string') {
          const err = checkEquation(line.equation);
          if (err) add(`${path}/lines/${i}/equation`, `Phép tính sai: "${line.equation}" — ${err}`);
        }
      });
    }
    if (node.kind === 'column_arithmetic') checkColumn(node, path, add);
    if (node.kind === 'long_division') checkLongDivision(node, path, add);
    if (typeof node.type === 'string' && Array.isArray(node.skillIds)) {
      if (typeof node.id === 'string') problemIds.push(node.id);
      checkProblem(node, path, add);
    }
    for (const [k, v] of Object.entries(node)) walk(v, `${path}/${k}`);
  };
  walk(doc, '');

  for (const id of duplicates(problemIds)) add('/', `Mã bài toán bị trùng: "${id}"`);

  if (doc.kind === 'exam') {
    let total = 0;
    asArray(doc.sections).forEach((s) =>
      asArray(s?.items).forEach((it) => {
        if (typeof it?.points === 'number') total += it.points;
      }),
    );
    if (Math.abs(total - 10) > 1e-9) add('/sections', `Tổng điểm của đề phải bằng 10 (hiện là ${total}).`);
  }
  return issues;
}

function checkProblem(p, path, add) {
  switch (p.type) {
    case 'fill_blank': {
      const slots = slotIds(p.template);
      const blanks = asArray(p.blanks).map((b) => b?.id);
      for (const d of duplicates(slots)) add(`${path}/template`, `Ô trống {{${d}}} xuất hiện nhiều lần.`);
      for (const d of duplicates(blanks)) add(`${path}/blanks`, `Mã ô trống "${d}" bị trùng.`);
      for (const s of slots) {
        if (!blanks.includes(s)) add(`${path}/template`, `Ô {{${s}}} trong template không có trong blanks.`);
      }
      blanks.forEach((b, i) => {
        if (!slots.includes(b)) add(`${path}/blanks/${i}/id`, `Ô trống "${b}" không xuất hiện trong template ({{${b}}}).`);
      });
      break;
    }
    case 'multiple_choice': {
      const choices = asArray(p.choices).map((c) => c?.id);
      for (const d of duplicates(choices)) add(`${path}/choices`, `Mã lựa chọn "${d}" bị trùng.`);
      asArray(p.correctChoiceIds).forEach((id, i) => {
        if (!choices.includes(id)) add(`${path}/correctChoiceIds/${i}`, `Đáp án "${id}" không có trong choices.`);
      });
      if (p.multiSelect !== true && asArray(p.correctChoiceIds).length > 1) {
        add(`${path}/correctChoiceIds`, 'Có nhiều đáp án đúng nhưng multiSelect không bật.');
      }
      break;
    }
    case 'drag_drop': {
      const slots = slotIds(p.template);
      const slotDefs = asArray(p.slots).map((s) => s?.id);
      const tokens = asArray(p.tokens).map((t) => t?.id);
      for (const s of slots) {
        if (!slotDefs.includes(s)) add(`${path}/template`, `Ô {{${s}}} trong template không có trong slots.`);
      }
      asArray(p.slots).forEach((s, i) => {
        if (!slots.includes(s?.id)) add(`${path}/slots/${i}/id`, `Ô "${s?.id}" không xuất hiện trong template.`);
        asArray(s?.accept).forEach((a, j) => {
          if (!tokens.includes(a)) add(`${path}/slots/${i}/accept/${j}`, `Thẻ "${a}" không có trong tokens.`);
        });
      });
      break;
    }
    case 'matching': {
      const left = asArray(p.left).map((o) => o?.id);
      const right = asArray(p.right).map((o) => o?.id);
      asArray(p.pairs).forEach((pair, i) => {
        if (!left.includes(pair?.left)) add(`${path}/pairs/${i}/left`, `"${pair?.left}" không có trong left.`);
        if (!right.includes(pair?.right)) add(`${path}/pairs/${i}/right`, `"${pair?.right}" không có trong right.`);
      });
      break;
    }
    default:
      break;
  }
}

const digits = (s) => (typeof s === 'string' && /^[0-9]+$/.test(s) ? Number(s) : null);

function checkColumn(b, path, add) {
  const ops = asArray(b.operands).map(digits);
  const result = digits(b.result);
  if (ops.length < 2 || ops.some((x) => x === null) || result === null) return;
  let expected;
  let sign;
  if (b.operation === 'add') [expected, sign] = [ops.reduce((x, y) => x + y), '+'];
  else if (b.operation === 'subtract') [expected, sign] = [ops.slice(1).reduce((x, y) => x - y, ops[0]), '-'];
  else if (b.operation === 'multiply') [expected, sign] = [ops.reduce((x, y) => x * y), '×'];
  else return;
  if (expected !== result) {
    add(`${path}/result`, `Đặt tính sai: ${ops.join(` ${sign} `)} = ${expected}, không phải ${result}.`);
  }
}

function checkLongDivision(b, path, add) {
  const dividend = digits(b.dividend);
  const divisor = digits(b.divisor);
  const quotient = digits(b.quotient);
  const r = b.remainder;
  if ([dividend, divisor, quotient].some((x) => x === null) || !Number.isInteger(r) || divisor === 0) return;
  if (divisor * quotient + r !== dividend || r >= divisor) {
    add(
      path,
      `Phép chia sai: ${dividend} : ${divisor} = ${Math.floor(dividend / divisor)} dư ${dividend % divisor}, không phải ${quotient} dư ${r}.`,
    );
  }
}
