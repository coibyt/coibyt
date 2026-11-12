// Bản JS của lib/logic/expression_evaluator.dart — giữ đúng cùng quy tắc.
// Tính biểu thức số tự nhiên đơn giản: + - (− –), × (x X *), : (÷), ngoặc tròn.
// Nhân/chia trước, cộng/trừ sau. Phép chia phải chia hết. Cho phép số có dấu chấm
// phân nhóm nghìn kiểu Việt Nam: 12.345.

export class ExpressionError extends Error {}

/**
 * Kiểm tra đẳng thức "a op b = c [= d...] (đơn vị)".
 * @returns {string|null} null nếu đúng, ngược lại là thông báo lỗi.
 */
export function checkEquation(text) {
  let s = String(text).trim();
  // Bỏ đơn vị trong ngoặc ở cuối: "52 + 38 = 90 (cây)".
  s = s.replace(/\s*\([^()0-9]*\)\s*$/u, '');
  const sides = s.split('=');
  if (sides.length < 2) return 'không có dấu "="';
  try {
    const values = sides.map((side) => evaluate(side));
    for (let i = 1; i < values.length; i++) {
      if (values[i] !== values[0]) {
        return `"${sides[0].trim()}" = ${values[0]} nhưng ghi là "${sides[i].trim()}" (= ${values[i]})`;
      }
    }
    return null;
  } catch (err) {
    if (err instanceof ExpressionError) return err.message;
    throw err;
  }
}

export function evaluate(expression) {
  const tokens = tokenize(expression);
  if (tokens.length === 0) throw new ExpressionError('biểu thức rỗng');
  const parser = new Parser(tokens);
  const value = parser.parseSum();
  if (!parser.atEnd) throw new ExpressionError(`thừa ký tự trong "${expression}"`);
  return value;
}

function tokenize(s) {
  const tokens = [];
  const chars = [...s];
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    if (/\s/u.test(c)) {
      i++;
    } else if (/[0-9]/.test(c)) {
      const start = i;
      while (i < chars.length && /[0-9.]/.test(chars[i])) i++;
      const raw = chars.slice(start, i).join('');
      if (raw.includes('.') && !/^[0-9]{1,3}(\.[0-9]{3})+$/.test(raw)) {
        throw new ExpressionError(`số "${raw}" viết sai`);
      }
      tokens.push(raw.replaceAll('.', ''));
    } else if ('+-−–'.includes(c)) {
      tokens.push(c === '+' ? '+' : '-');
      i++;
    } else if ('×xX*'.includes(c)) {
      tokens.push('×');
      i++;
    } else if (':÷'.includes(c)) {
      tokens.push(':');
      i++;
    } else if (c === '(' || c === ')') {
      tokens.push(c);
      i++;
    } else {
      throw new ExpressionError(`ký tự lạ "${c}"`);
    }
  }
  return tokens;
}

function safe(n) {
  if (!Number.isSafeInteger(n)) throw new ExpressionError('số quá lớn');
  return n;
}

class Parser {
  constructor(tokens) {
    this.tokens = tokens;
    this.pos = 0;
  }

  get atEnd() {
    return this.pos >= this.tokens.length;
  }

  get peek() {
    return this.atEnd ? null : this.tokens[this.pos];
  }

  parseSum() {
    let value = this.parseProduct();
    while (this.peek === '+' || this.peek === '-') {
      const op = this.tokens[this.pos++];
      const rhs = this.parseProduct();
      value = safe(op === '+' ? value + rhs : value - rhs);
    }
    return value;
  }

  parseProduct() {
    let value = this.parseAtom();
    while (this.peek === '×' || this.peek === ':') {
      const op = this.tokens[this.pos++];
      const rhs = this.parseAtom();
      if (op === '×') {
        value = safe(value * rhs);
      } else {
        if (rhs === 0) throw new ExpressionError('chia cho 0');
        if (value % rhs !== 0) throw new ExpressionError(`${value} : ${rhs} không chia hết`);
        value = Math.trunc(value / rhs);
      }
    }
    return value;
  }

  parseAtom() {
    const t = this.peek;
    if (t === null) throw new ExpressionError('thiếu số');
    this.pos++;
    if (t === '(') {
      const v = this.parseSum();
      if (this.peek !== ')') throw new ExpressionError('thiếu ")"');
      this.pos++;
      return v;
    }
    if (!/^[0-9]+$/.test(t)) throw new ExpressionError(`cần số nhưng gặp "${t}"`);
    return safe(Number(t));
  }
}
