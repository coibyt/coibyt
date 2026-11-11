import 'dart:math';

import 'package:flutter/foundation.dart';

import '../models/content.dart';
import '../models/problem.dart';
import 'answer_checker.dart';

/// Trạng thái của bài đang làm.
enum QuestionPhase {
  /// Bé đang trả lời.
  answering,

  /// Vừa trả lời đúng.
  correct,

  /// Vừa trả lời sai, còn lượt thử lại.
  incorrect,

  /// Đã hết lượt hoặc đã bấm "Xem lời giải": hiện đáp án.
  revealed,
}

/// Kết quả từng bài — nền tảng cho báo cáo "chủ đề còn yếu" (Phase 3/4).
class ProblemResult {
  ProblemResult({required this.problemId, required this.skillIds});

  final String problemId;
  final List<String> skillIds;
  int attempts = 0;
  bool correct = false;
  bool viewedSolution = false;

  bool get firstTry => correct && attempts == 1;

  /// 10 điểm nếu đúng ngay lần đầu, 5 điểm nếu đúng lần hai.
  int get points => !correct ? 0 : (attempts == 1 ? 10 : 5);
}

class SkillStat {
  SkillStat(this.skillId);

  final String skillId;
  int correct = 0;
  int total = 0;

  double get ratio => total == 0 ? 0 : correct / total;
}

/// Điều khiển một lượt luyện tập (không phụ thuộc widget → dễ kiểm thử).
class QuizSession extends ChangeNotifier {
  QuizSession({
    required Lesson lesson,
    required this.isVip,
    this.maxAttempts = 2,
    Random? random,
  })  : lessonId = lesson.id,
        lessonTitle = lesson.title,
        problems = [
          for (final p in lesson.problems)
            if (p.access == Access.free || isVip) p,
        ],
        lockedVipCount =
            isVip ? 0 : lesson.problems.where((p) => p.access == Access.vip).length,
        _random = random ?? Random() {
    _results = [
      for (final p in problems) ProblemResult(problemId: p.id, skillIds: p.skillIds),
    ];
  }

  final String lessonId;
  final String lessonTitle;
  final bool isVip;
  final int maxAttempts;
  final List<Problem> problems;

  /// Số bài VIP bị ẩn với tài khoản miễn phí.
  final int lockedVipCount;
  final Random _random;

  late final List<ProblemResult> _results;
  int _index = 0;
  QuestionPhase _phase = QuestionPhase.answering;
  CheckResult? _lastCheck;
  String? _message;

  int get index => _index;
  bool get isFinished => _index >= problems.length;
  Problem get current => problems[_index];
  ProblemResult get currentResult => _results[_index];
  QuestionPhase get phase => _phase;
  CheckResult? get lastCheck => _lastCheck;

  /// Câu phản hồi tử tế đang hiển thị.
  String? get message => _message;
  List<ProblemResult> get results => List.unmodifiable(_results);

  bool get canAnswer => _phase == QuestionPhase.answering;

  /// Lời giải chi tiết có bị khoá với tài khoản này không.
  bool solutionLocked(Problem p) => p.solution.access == Access.vip && !isVip;

  /// Bé bấm "Kiểm tra".
  CheckResult submit(UserAnswer answer) {
    if (isFinished || !canAnswer) {
      throw StateError('Không thể nộp bài lúc này ($_phase)');
    }
    final problem = current;
    final result = checkAnswer(problem, answer);
    _lastCheck = result;
    switch (result.status) {
      case CheckStatus.incomplete:
        _message = 'Con hãy làm hết các ô trước nhé!';
      case CheckStatus.invalidFormat:
        _message = 'Con chỉ cần nhập số thôi nhé!';
      case CheckStatus.correct:
        currentResult
          ..attempts += 1
          ..correct = true;
        _phase = QuestionPhase.correct;
        _message = problem.feedbackCorrect ?? _pick(_praise);
      case CheckStatus.incorrect:
        currentResult.attempts += 1;
        if (currentResult.attempts >= maxAttempts) {
          _phase = QuestionPhase.revealed;
          _message = 'Không sao cả! Mình cùng xem cách làm nhé.';
        } else {
          _phase = QuestionPhase.incorrect;
          _message = problem.feedbackIncorrect ?? _pick(_encourage);
        }
    }
    notifyListeners();
    return result;
  }

  /// Bé bấm "Thử lại" sau khi sai.
  void retry() {
    if (_phase != QuestionPhase.incorrect) return;
    _phase = QuestionPhase.answering;
    _message = null;
    notifyListeners();
  }

  /// Bé bấm "Xem lời giải" (khi chưa đúng → bài này tính là chưa làm được).
  void revealSolution() {
    if (isFinished) return;
    currentResult.viewedSolution = true;
    if (_phase == QuestionPhase.answering || _phase == QuestionPhase.incorrect) {
      _phase = QuestionPhase.revealed;
      _message = null;
    }
    notifyListeners();
  }

  /// Sang bài tiếp theo.
  void next() {
    if (isFinished) return;
    if (_phase == QuestionPhase.answering || _phase == QuestionPhase.incorrect) {
      return; // phải trả lời đúng hoặc xem lời giải trước
    }
    _index++;
    _phase = QuestionPhase.answering;
    _lastCheck = null;
    _message = null;
    notifyListeners();
  }

  int get totalPoints => _results.fold(0, (sum, r) => sum + r.points);
  int get maxPoints => problems.length * 10;
  int get correctCount => _results.where((r) => r.correct).length;

  /// 0–3 sao theo tỉ lệ điểm.
  int get stars {
    if (maxPoints == 0) return 0;
    final ratio = totalPoints / maxPoints;
    if (ratio >= 0.9) return 3;
    if (ratio >= 0.6) return 2;
    if (ratio > 0) return 1;
    return 0;
  }

  /// Thống kê theo kỹ năng (dùng cho báo cáo chủ đề còn yếu).
  Map<String, SkillStat> skillStats() {
    final stats = <String, SkillStat>{};
    for (final r in _results) {
      for (final s in r.skillIds) {
        final stat = stats.putIfAbsent(s, () => SkillStat(s));
        stat.total++;
        if (r.correct) stat.correct++;
      }
    }
    return stats;
  }

  /// Kỹ năng có tỉ lệ đúng dưới [threshold].
  List<SkillStat> weakSkills({double threshold = 0.6}) =>
      skillStats().values.where((s) => s.ratio < threshold).toList()
        ..sort((a, b) => a.ratio.compareTo(b.ratio));

  String _pick(List<String> list) => list[_random.nextInt(list.length)];

  static const _praise = [
    'Giỏi quá!',
    'Chính xác!',
    'Tuyệt vời!',
    'Đúng rồi, con làm tốt lắm!',
    'Xuất sắc!',
  ];

  static const _encourage = [
    'Gần đúng rồi, con thử lại nhé!',
    'Chưa đúng rồi. Mình thử lại nào!',
    'Không sao, con thử lần nữa nhé!',
  ];
}
