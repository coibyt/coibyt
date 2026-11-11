import '../models/blocks.dart';
import '../models/content.dart';
import '../models/problem.dart';
import 'expression_evaluator.dart';

/// Một lỗi nội dung (sai toán, sai liên kết mã...).
class ContentIssue {
  const ContentIssue(this.path, this.message);

  final String path;
  final String message;

  @override
  String toString() => '$path: $message';
}

/// Kiểm tra NGỮ NGHĨA của mục lục (bổ sung cho JSON Schema).
List<ContentIssue> validateCatalog(Catalog catalog) {
  final issues = <ContentIssue>[];
  _unique(issues, r'$.skills', [for (final s in catalog.skills) s.id]);
  _unique(issues, r'$.books', [for (final b in catalog.books) b.id]);
  final lessonIds = <String>[];
  for (final (bi, book) in catalog.books.indexed) {
    _unique(issues, '\$.books[$bi].chapters', [for (final c in book.chapters) c.id]);
    for (final chapter in book.chapters) {
      lessonIds.addAll(chapter.lessons.map((l) => l.id));
    }
  }
  _unique(issues, r'$.books[*].chapters[*].lessons', lessonIds);
  return issues;
}

/// Kiểm tra NGỮ NGHĨA của một bài học: liên kết mã, đáp án, và TOÁN trong
/// lời giải (phép tính đúng, đặt tính khớp kết quả từng chữ số).
List<ContentIssue> validateLesson(Lesson lesson, {Set<String>? knownSkillIds}) {
  final issues = <ContentIssue>[];
  for (final (i, block) in lesson.theory.blocks.indexed) {
    _validateBlock(issues, '\$.theory.blocks[$i]', block);
  }
  _unique(issues, r'$.problems', [for (final p in lesson.problems) p.id]);
  for (final (i, problem) in lesson.problems.indexed) {
    _validateProblem(issues, '\$.problems[$i]', problem, knownSkillIds);
  }
  return issues;
}

void _unique(List<ContentIssue> issues, String path, List<String> ids) {
  final seen = <String>{};
  for (final id in ids) {
    if (!seen.add(id)) issues.add(ContentIssue(path, 'mã "$id" bị trùng'));
  }
}

void _validateProblem(
  List<ContentIssue> issues,
  String path,
  Problem p,
  Set<String>? knownSkillIds,
) {
  void issue(String sub, String message) => issues.add(ContentIssue('$path$sub', message));

  if (knownSkillIds != null) {
    for (final s in p.skillIds) {
      if (!knownSkillIds.contains(s)) {
        issue('.skillIds', 'kỹ năng "$s" chưa khai báo trong catalog');
      }
    }
  }

  switch (p.body) {
    case MultipleChoiceBody(:final choices, :final correctChoiceIds, :final multiSelect):
      final ids = [for (final c in choices) c.id];
      _unique(issues, '$path.choices', ids);
      _unique(issues, '$path.choices(text)', [for (final c in choices) c.text]);
      for (final id in correctChoiceIds) {
        if (!ids.contains(id)) issue('.correctChoiceIds', 'không có lựa chọn "$id"');
      }
      if (!multiSelect && correctChoiceIds.length != 1) {
        issue('.correctChoiceIds', 'bài chọn một đáp án phải có đúng 1 đáp án đúng');
      }
    case FillBlankBody(:final template, :final blanks):
      final slotIds = templateSlotIds(template);
      final blankIds = [for (final b in blanks) b.id];
      _unique(issues, '$path.blanks', blankIds);
      _unique(issues, '$path.template', slotIds);
      if (slotIds.toSet().difference(blankIds.toSet()).isNotEmpty ||
          blankIds.toSet().difference(slotIds.toSet()).isNotEmpty) {
        issue('.template', 'ô trong mẫu $slotIds không khớp danh sách blanks $blankIds');
      }
      for (final (i, b) in blanks.indexed) {
        final rule = b.answer;
        if (rule is NumberAnswerRule && b.maxLength != null &&
            '${rule.value}'.length > b.maxLength!) {
          issue('.blanks[$i].maxLength', 'ô quá hẹp cho đáp án ${rule.value}');
        }
      }
    case DragDropBody(:final template, :final tokens, :final slots, :final reuseTokens):
      final tokenIds = [for (final t in tokens) t.id];
      final slotIds = [for (final s in slots) s.id];
      final templateIds = templateSlotIds(template);
      _unique(issues, '$path.tokens', tokenIds);
      _unique(issues, '$path.slots', slotIds);
      _unique(issues, '$path.template', templateIds);
      if (templateIds.toSet().difference(slotIds.toSet()).isNotEmpty ||
          slotIds.toSet().difference(templateIds.toSet()).isNotEmpty) {
        issue('.template', 'ô trong mẫu $templateIds không khớp danh sách slots $slotIds');
      }
      for (final (i, s) in slots.indexed) {
        for (final t in s.accept) {
          if (!tokenIds.contains(t)) issue('.slots[$i].accept', 'không có thẻ "$t"');
        }
      }
      if (!reuseTokens && tokens.length < slots.length) {
        issue('.tokens', 'không đủ thẻ cho ${slots.length} ô');
      }
    case MatchingBody(:final left, :final right, :final pairs):
      final leftIds = [for (final l in left) l.id];
      final rightIds = [for (final r in right) r.id];
      _unique(issues, '$path.left', leftIds);
      _unique(issues, '$path.right', rightIds);
      for (final l in leftIds) {
        if (!pairs.containsKey(l)) issue('.pairs', '"$l" chưa được nối');
      }
      for (final e in pairs.entries) {
        if (!leftIds.contains(e.key)) issue('.pairs', 'không có mục trái "${e.key}"');
        if (!rightIds.contains(e.value)) issue('.pairs', 'không có mục phải "${e.value}"');
      }
      _unique(issues, '$path.pairs(right)', pairs.values.toList());
  }

  for (final (i, block) in p.solution.steps.indexed) {
    _validateBlock(issues, '$path.solution.steps[$i]', block);
  }
}

void _validateBlock(List<ContentIssue> issues, String path, ContentBlock block) {
  void issue(String message) => issues.add(ContentIssue(path, message));

  switch (block) {
    case EquationBlock(:final text):
      final err = checkEquation(text);
      if (err != null) issue('phép tính "$text" sai: $err');
    case WordProblemBlock(:final lines):
      for (final (i, line) in lines.indexed) {
        final err = checkEquation(line.equation);
        if (err != null) {
          issues.add(ContentIssue('$path.lines[$i]', 'phép tính "${line.equation}" sai: $err'));
        }
      }
    case ColumnArithmeticBlock():
      for (final m in checkColumnArithmetic(block)) {
        issue(m);
      }
    case LongDivisionBlock():
      for (final m in checkLongDivision(block)) {
        issue(m);
      }
    case TextBlock():
    case ImageBlock():
      break;
  }
}

int _digitAt(String number, int place) {
  final i = number.length - 1 - place;
  return i < 0 ? 0 : number.codeUnitAt(i) - 48;
}

/// Kiểm tra phép đặt tính: kết quả đúng và từng lượt (viết, nhớ) đúng.
List<String> checkColumnArithmetic(ColumnArithmeticBlock b) {
  final errors = <String>[];
  final nums = [for (final o in b.operands) int.parse(o)];
  final result = int.parse(b.result);

  int expected;
  int columns;
  switch (b.operation) {
    case ColumnOperation.add:
      expected = nums.reduce((a, c) => a + c);
      columns = b.operands.map((o) => o.length).reduce((a, c) => a > c ? a : c);
    case ColumnOperation.subtract:
      if (nums.length != 2) return ['phép trừ đặt tính phải có đúng 2 số'];
      if (nums[0] < nums[1]) return ['số bị trừ nhỏ hơn số trừ'];
      expected = nums[0] - nums[1];
      columns = b.operands[0].length;
    case ColumnOperation.multiply:
      if (nums.length != 2) return ['phép nhân đặt tính phải có đúng 2 số'];
      if (b.operands[1].length != 1) {
        return ['lớp 3: thừa số thứ hai phải là số có một chữ số'];
      }
      expected = nums[0] * nums[1];
      columns = b.operands[0].length;
  }
  final symbol = b.operation.symbol;
  if (expected != result) {
    errors.add('${b.operands.join(' $symbol ')} = $expected, không phải $result');
  }

  final steps = b.digitSteps;
  if (steps.length != columns) {
    errors.add('cần $columns lượt tính (mỗi hàng một lượt), đang có ${steps.length}');
    return errors;
  }
  var carry = 0;
  final written = StringBuffer();
  for (var p = 0; p < columns; p++) {
    final step = steps[p];
    if (step.place != p) errors.add('lượt ${p + 1} phải có place = $p');
    final isLast = p == columns - 1;
    if (!isLast && step.write.length != 1) {
      errors.add('lượt ${p + 1}: chỉ lượt cuối được viết nhiều chữ số');
    }
    int expectWrite;
    int expectCarry;
    switch (b.operation) {
      case ColumnOperation.add:
        final s = b.operands.fold(0, (acc, o) => acc + _digitAt(o, p)) + carry;
        expectWrite = isLast ? s : s % 10;
        expectCarry = isLast ? 0 : s ~/ 10;
      case ColumnOperation.multiply:
        final s = _digitAt(b.operands[0], p) * nums[1] + carry;
        expectWrite = isLast ? s : s % 10;
        expectCarry = isLast ? 0 : s ~/ 10;
      case ColumnOperation.subtract:
        // Cách SGK: "không trừ được → lấy 1x trừ, nhớ 1 sang hàng số trừ kế tiếp".
        var top = _digitAt(b.operands[0], p);
        final bottom = _digitAt(b.operands[1], p) + carry;
        expectCarry = top < bottom ? 1 : 0;
        if (top < bottom) top += 10;
        expectWrite = top - bottom;
    }
    final w = int.parse(step.write);
    if (w != expectWrite || step.carry != expectCarry) {
      errors.add(
        'lượt ${p + 1} (hàng ${_placeName(p)}): phải viết $expectWrite nhớ $expectCarry, '
        'đang ghi viết ${step.write} nhớ ${step.carry}',
      );
    }
    carry = expectCarry;
    written.write(step.write.split('').reversed.join());
  }
  final writtenNumber = int.tryParse(written.toString().split('').reversed.join());
  if (writtenNumber != result) {
    errors.add('các chữ số viết xuống ($writtenNumber) không khớp kết quả $result');
  }
  return errors;
}

String _placeName(int p) =>
    const ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn'].elementAtOrNull(p) ??
    '10^$p';

/// Kiểm tra phép chia đặt tính: thương, số dư và từng lượt chia.
List<String> checkLongDivision(LongDivisionBlock b) {
  final errors = <String>[];
  final dividend = int.parse(b.dividend);
  final divisor = int.parse(b.divisor);
  final quotient = int.parse(b.quotient);
  if (divisor * quotient + b.remainder != dividend) {
    errors.add('$dividend : $divisor không bằng $quotient dư ${b.remainder}');
  }
  if (b.remainder >= divisor) errors.add('số dư ${b.remainder} phải bé hơn số chia $divisor');

  // Lượt đầu: lấy số chữ số ít nhất ở bên trái để được số ≥ số chia.
  final digits = b.dividend;
  var k = 1;
  while (k < digits.length && int.parse(digits.substring(0, k)) < divisor) {
    k++;
  }
  var expectedPartial = int.parse(digits.substring(0, k));
  var nextDigit = k;
  final quotientDigits = StringBuffer();
  for (final (i, s) in b.digitSteps.indexed) {
    final n = i + 1;
    if (s.partialDividend != expectedPartial) {
      errors.add('lượt $n: số đem chia phải là $expectedPartial, đang ghi ${s.partialDividend}');
    }
    if (s.quotientDigit * divisor != s.product) {
      errors.add('lượt $n: ${s.quotientDigit} × $divisor = ${s.quotientDigit * divisor}, không phải ${s.product}');
    }
    if (s.partialDividend - s.product != s.remainder) {
      errors.add('lượt $n: ${s.partialDividend} - ${s.product} ≠ ${s.remainder}');
    }
    if (s.remainder >= divisor || s.remainder < 0) {
      errors.add('lượt $n: số dư ${s.remainder} phải bé hơn $divisor (thương chưa đúng)');
    }
    quotientDigits.write(s.quotientDigit);
    if (nextDigit < digits.length) {
      expectedPartial = s.remainder * 10 + (digits.codeUnitAt(nextDigit) - 48);
      nextDigit++;
    } else if (n != b.digitSteps.length) {
      errors.add('lượt $n đã hạ hết chữ số nhưng vẫn còn lượt sau');
    }
  }
  if (nextDigit < digits.length) {
    errors.add('chưa hạ hết các chữ số của số bị chia');
  }
  if (int.tryParse(quotientDigits.toString()) != quotient) {
    errors.add('các chữ số thương ($quotientDigits) không khớp thương $quotient');
  }
  if (b.digitSteps.isNotEmpty && b.digitSteps.last.remainder != b.remainder) {
    errors.add('số dư lượt cuối (${b.digitSteps.last.remainder}) khác số dư ${b.remainder}');
  }
  return errors;
}
