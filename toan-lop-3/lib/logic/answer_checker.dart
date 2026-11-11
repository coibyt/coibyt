import '../models/problem.dart';
import 'normalizers.dart';

/// Câu trả lời của bé, theo từng dạng bài.
sealed class UserAnswer {
  const UserAnswer();

  /// Lưu được (bài thi làm dở).
  Map<String, dynamic> toJson() => switch (this) {
    ChoiceAnswer(:final selectedIds) => {'t': 'choice', 'v': selectedIds.toList()},
    BlankAnswer(:final values) => {'t': 'blank', 'v': values},
    DragDropAnswer(:final placements) => {'t': 'drag', 'v': placements},
    MatchingAnswer(:final pairs) => {'t': 'match', 'v': pairs},
  };

  static UserAnswer? fromJson(Object? json) {
    if (json is! Map) return null;
    final v = json['v'];
    try {
      return switch (json['t']) {
        'choice' => ChoiceAnswer({...(v as List).cast<String>()}),
        'blank' => BlankAnswer((v as Map).cast<String, String>()),
        'drag' => DragDropAnswer((v as Map).cast<String, String?>()),
        'match' => MatchingAnswer((v as Map).cast<String, String>()),
        _ => null,
      };
    } on Object {
      return null;
    }
  }
}

class ChoiceAnswer extends UserAnswer {
  const ChoiceAnswer(this.selectedIds);
  final Set<String> selectedIds;
}

class BlankAnswer extends UserAnswer {
  const BlankAnswer(this.values);

  /// blank id → chuỗi bé nhập
  final Map<String, String> values;
}

class DragDropAnswer extends UserAnswer {
  const DragDropAnswer(this.placements);

  /// slot id → token id (null/thiếu = ô trống)
  final Map<String, String?> placements;
}

class MatchingAnswer extends UserAnswer {
  const MatchingAnswer(this.pairs);

  /// left id → right id
  final Map<String, String> pairs;
}

enum CheckStatus {
  correct,
  incorrect,

  /// Chưa làm xong (còn ô trống / chưa chọn) — không tính lượt.
  incomplete,

  /// Nhập không phải số — không tính lượt, nhắc nhẹ.
  invalidFormat,
}

class CheckResult {
  const CheckResult(this.status, {this.partCorrect = const {}});

  final CheckStatus status;

  /// Từng phần đúng/sai (blank id, slot id, left id) để tô màu gợi ý.
  final Map<String, bool> partCorrect;

  bool get isCorrect => status == CheckStatus.correct;

  /// Có tính là một lượt trả lời hay không.
  bool get countsAsAttempt => status == CheckStatus.correct || status == CheckStatus.incorrect;
}

/// Chấm một câu trả lời. Hàm thuần (không phụ thuộc UI) để dễ kiểm thử.
CheckResult checkAnswer(Problem problem, UserAnswer answer) {
  return switch ((problem.body, answer)) {
    (final MultipleChoiceBody b, final ChoiceAnswer a) => _checkChoice(b, a),
    (final FillBlankBody b, final BlankAnswer a) => _checkBlanks(b, a),
    (final DragDropBody b, final DragDropAnswer a) => _checkDragDrop(b, a),
    (final MatchingBody b, final MatchingAnswer a) => _checkMatching(b, a),
    _ => throw ArgumentError('Câu trả lời ${answer.runtimeType} không khớp dạng bài ${problem.type.jsonName}'),
  };
}

CheckResult _checkChoice(MultipleChoiceBody body, ChoiceAnswer answer) {
  if (answer.selectedIds.isEmpty) return const CheckResult(CheckStatus.incomplete);
  final selected = answer.selectedIds;
  final ok = selected.length == body.correctChoiceIds.length && selected.containsAll(body.correctChoiceIds);
  return CheckResult(
    ok ? CheckStatus.correct : CheckStatus.incorrect,
    partCorrect: {for (final id in selected) id: body.correctChoiceIds.contains(id)},
  );
}

/// Chấm một ô trống. Trả về null nếu nhập sai định dạng / còn trống.
bool? checkBlankValue(AnswerRule rule, String input) {
  switch (rule) {
    case NumberAnswerRule():
      final parsed = parseNumberInput(
        input,
        units: [?rule.unit, ...rule.unitAliases],
        allowLeadingZeros: rule.allowLeadingZeros,
      );
      return switch (parsed) {
        ValidNumber(:final value) => value == rule.value || rule.alsoAccept.contains(value),
        _ => null,
      };
    case TextAnswerRule():
      if (normalizeText(input).isEmpty) return null;
      return rule.values.any(
        (v) => textMatches(input, v, ignoreCase: rule.ignoreCase, ignoreDiacritics: rule.ignoreDiacritics),
      );
  }
}

CheckResult _checkBlanks(FillBlankBody body, BlankAnswer answer) {
  final parts = <String, bool>{};
  var anyEmpty = false;
  var anyInvalid = false;
  for (final blank in body.blanks) {
    final input = answer.values[blank.id] ?? '';
    if (normalizeText(input).isEmpty) {
      anyEmpty = true;
      continue;
    }
    final ok = checkBlankValue(blank.answer, input);
    if (ok == null) {
      anyInvalid = true;
    } else {
      parts[blank.id] = ok;
    }
  }
  if (anyEmpty) return CheckResult(CheckStatus.incomplete, partCorrect: parts);
  if (anyInvalid) return CheckResult(CheckStatus.invalidFormat, partCorrect: parts);
  final allOk = parts.values.every((v) => v);
  return CheckResult(allOk ? CheckStatus.correct : CheckStatus.incorrect, partCorrect: parts);
}

CheckResult _checkDragDrop(DragDropBody body, DragDropAnswer answer) {
  final parts = <String, bool>{};
  for (final slot in body.slots) {
    final token = answer.placements[slot.id];
    if (token == null) {
      return CheckResult(CheckStatus.incomplete, partCorrect: parts);
    }
    parts[slot.id] = slot.accept.contains(token);
  }
  if (!body.reuseTokens) {
    final used = [for (final s in body.slots) answer.placements[s.id]];
    if (used.toSet().length != used.length) {
      // Một thẻ nằm ở hai ô — không thể xảy ra qua UI, coi như sai.
      return CheckResult(CheckStatus.incorrect, partCorrect: parts);
    }
  }
  return CheckResult(parts.values.every((v) => v) ? CheckStatus.correct : CheckStatus.incorrect, partCorrect: parts);
}

CheckResult _checkMatching(MatchingBody body, MatchingAnswer answer) {
  final parts = <String, bool>{};
  for (final entry in body.pairs.entries) {
    final chosen = answer.pairs[entry.key];
    if (chosen == null) {
      return CheckResult(CheckStatus.incomplete, partCorrect: parts);
    }
    parts[entry.key] = chosen == entry.value;
  }
  return CheckResult(parts.values.every((v) => v) ? CheckStatus.correct : CheckStatus.incorrect, partCorrect: parts);
}
