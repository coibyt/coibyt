/// Trò chơi ôn tập "Bóng bay Toán học": mỗi câu có 4 quả bóng mang đáp án bay lên,
/// bé chạm đúng quả bóng trước khi bóng bay mất. Câu hỏi lấy từ bài tập của chủ đề đã học.
library;

import 'dart:math';

import '../models/problem.dart';
import 'show_lines.dart' show stableSeed;

class GameQuestion {
  const GameQuestion({required this.prompt, required this.choices, required this.correct, required this.problemId});

  final String prompt;
  final List<String> choices;

  /// Chỉ số đáp án đúng trong [choices].
  final int correct;
  final String problemId;
}

/// Độ dài tối đa của đề trong trò chơi (đề dài quá thì bé không kịp đọc).
const maxPrompt = 150;

/// Gameshow cho phép đề dài hơn (bé bấm xem trọn đề, MC đọc hết).
const maxShowPrompt = 320;

final _blank = RegExp(r'\{\{\s*([A-Za-z0-9_]+)\s*\}\}');

/// Đổi một bài tập thành câu hỏi bóng bay (null nếu không hợp: đề quá dài, nhiều ô trống, đáp án dài…).
GameQuestion? toGameQuestion(Problem p, Random random, {int maxLength = maxPrompt}) {
  final body = p.body;
  final promptText = p.prompt.text.trim();
  // Đề cần nhìn tranh (biểu đồ cột) thì không đưa vào trò chơi / gameshow (ở đó không hiện tranh).
  if (p.prompt.image != null) return null;
  if (body is MultipleChoiceBody) {
    if (body.multiSelect || body.correctChoiceIds.length != 1 || body.choices.length < 2) return null;
    if (promptText.length > maxLength || body.choices.any((c) => c.text.length > 24 || c.text.isEmpty)) return null;
    final opts = [...body.choices]..shuffle(random);
    final chosen = opts.take(4).toList();
    if (!chosen.any((c) => body.correctChoiceIds.contains(c.id))) {
      chosen[0] = body.choices.firstWhere((c) => body.correctChoiceIds.contains(c.id));
      chosen.shuffle(random);
    }
    return GameQuestion(
      prompt: promptText,
      choices: [for (final c in chosen) c.text],
      correct: chosen.indexWhere((c) => body.correctChoiceIds.contains(c.id)),
      problemId: p.id,
    );
  }
  if (body is FillBlankBody) {
    // Hỏi MỘT ô (ô số), các ô khác điền sẵn đáp án: "Trắng: ? bạn / Xanh: 5 bạn".
    final numeric = [
      for (final b in body.blanks)
        if (b.answer is NumberAnswerRule) b,
    ];
    if (numeric.isEmpty || body.blanks.length > 4) return null;
    final ask = numeric[random.nextInt(numeric.length)];
    final rule = ask.answer as NumberAnswerRule;
    final v = rule.value;
    final answers = {for (final b in body.blanks) b.id: b.answer.displayAnswer};
    final shown = body.template.replaceAllMapped(_blank, (m) => m[1] == ask.id ? '?' : answers[m[1]] ?? '?').trim();
    final hasNumbers = RegExp(r'\d').hasMatch(shown.replaceAll('?', ''));
    // Đề có nội dung (có số, hoặc dài) thì luôn giữ lại; chỉ bỏ câu lệnh chung chung như "Tính.".
    final generic = !RegExp(r'\d').hasMatch(promptText) && promptText.length <= 30;
    final prompt = shown == '?' ? promptText : (generic && hasNumbers ? shown : '$promptText\n$shown');
    if (prompt.length > maxLength || prompt.contains('\n\n')) return null;
    final unit = rule.unit == null ? '' : ' ${rule.unit}';
    final wrong = numberDistractors(v, random);
    final values = [v, ...wrong]..shuffle(random);
    return GameQuestion(
      prompt: prompt,
      choices: [for (final x in values) '${formatVi(x)}$unit'],
      correct: values.indexOf(v),
      problemId: p.id,
    );
  }
  return null;
}

/// 3 đáp án sai "gần đúng" (lệch 1, lệch 10, đảo chữ số…), không âm, khác nhau.
List<int> numberDistractors(int v, Random random) {
  final digits = '$v';
  final reversed = int.tryParse(digits.split('').reversed.join()) ?? v;
  final cands = <int>{
    v + 1,
    v - 1,
    v + 10,
    v - 10,
    v + 2,
    if (v >= 100) v + 100,
    if (v >= 100) v - 100,
    reversed,
    v * 2,
  }..removeWhere((x) => x < 0 || x == v);
  final list = cands.toList()..shuffle(random);
  return list.take(3).toList();
}

/// Viết số kiểu Việt Nam: 12.345.
String formatVi(int n) {
  final s = '$n';
  if (s.length <= 4) return s;
  final b = StringBuffer();
  for (var i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 == 0) b.write('.');
    b.write(s[i]);
  }
  return b.toString();
}

/// Chọn [count] câu đa dạng từ nhiều bài (xoay vòng theo bài).
List<GameQuestion> buildGameQuestions(List<List<Problem>> lessons, Random random, {int count = 12}) {
  final pools = [
    for (final l in lessons)
      [
        for (final p in l)
          if (p.access == Access.free) ?toGameQuestion(p, random),
      ]..shuffle(random),
  ].where((p) => p.isNotEmpty).toList()..shuffle(random);
  final out = <GameQuestion>[];
  final seen = <String>{};
  while (out.length < count && pools.any((p) => p.isNotEmpty)) {
    for (final p in pools) {
      if (p.isEmpty || out.length >= count) continue;
      final q = p.removeLast();
      if (seen.add(q.prompt)) out.add(q);
    }
  }
  return out;
}

/// Một ván chơi.
class ReviewGame {
  ReviewGame(this.questions);

  static const hearts0 = 3;

  /// Thời gian mỗi câu (giây) — bóng bay hết màn hình là mất câu đó.
  static const secondsPerQuestion = 12;

  final List<GameQuestion> questions;
  int index = 0;
  int score = 0;
  int correctCount = 0;
  int combo = 0;
  int bestCombo = 0;
  int hearts = hearts0;

  bool get isOver => hearts <= 0 || index >= questions.length;
  GameQuestion get current => questions[index];

  /// Bé chọn [choice] (null = hết giờ). Trả về điểm được cộng (0 nếu sai).
  int answer(int? choice, {double secondsLeft = 0}) {
    final ok = choice != null && choice == current.correct;
    var gained = 0;
    if (ok) {
      combo++;
      bestCombo = max(bestCombo, combo);
      correctCount++;
      final streak = min<int>(combo - 1, 5);
      final timeBonus = (secondsLeft.clamp(0.0, secondsPerQuestion.toDouble()) * 5).round();
      gained = 100 + 20 * streak + timeBonus;
      score += gained;
    } else {
      combo = 0;
      hearts--;
    }
    index++;
    return gained;
  }

  /// Sao: đúng ≥ 90% → 3, ≥ 70% → 2, ≥ 40% → 1 (tính trên tổng số câu của ván).
  int get stars {
    if (questions.isEmpty) return 0;
    final r = correctCount / questions.length;
    return r >= 0.9 ? 3 : (r >= 0.7 ? 2 : (r >= 0.4 ? 1 : 0));
  }

  /// Vàng thưởng: 2 vàng mỗi câu đúng, thêm 10 nếu được 3 sao.
  int get coins => correctCount * 2 + (stars == 3 ? 10 : 0);
}

/// Câu hỏi gameshow của một bài tập: thứ tự đáp án cố định theo mã câu (để MC đọc bằng giọng ghi âm sẵn).
GameQuestion? showQuestion(Problem p) => toGameQuestion(p, Random(stableSeed(p.id)), maxLength: maxShowPrompt);
