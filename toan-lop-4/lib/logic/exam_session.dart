import 'package:flutter/foundation.dart';

import '../models/exam.dart';
import '../models/problem.dart';
import 'answer_checker.dart';
import 'quiz_session.dart' show SkillStat;

/// Kết quả chấm một câu trong đề.
class ExamItemResult {
  const ExamItemResult({required this.item, required this.answer, required this.check, required this.earned});

  final ExamItem item;
  final UserAnswer? answer;
  final CheckResult? check;
  final double earned;

  bool get answered => answer != null && check?.status != CheckStatus.incomplete;
  bool get fullyCorrect => check?.isCorrect ?? false;
}

/// Kết quả cả đề.
class ExamResult {
  const ExamResult({required this.exam, required this.items, required this.usedSeconds, required this.timedOut});

  final Exam exam;
  final List<ExamItemResult> items;
  final int usedSeconds;
  final bool timedOut;

  /// Điểm thô (có thể lẻ 0,25), thang 10.
  double get rawScore {
    final total = exam.totalPoints;
    final got = items.fold<double>(0, (s, i) => s + i.earned);
    return total == 0 ? 0 : got * 10 / total;
  }

  /// Điểm hiển thị: số nguyên (làm tròn 0,5 lên), như điểm bài kiểm tra ở tiểu học.
  int get roundedScore => rawScore.round();

  int get correctCount => items.where((i) => i.fullyCorrect).length;

  Map<String, SkillStat> skillStats() {
    final stats = <String, SkillStat>{};
    for (final r in items) {
      for (final s in r.item.problem.skillIds) {
        final stat = stats.putIfAbsent(s, () => SkillStat(s));
        stat.total++;
        if (r.fullyCorrect) stat.correct++;
      }
    }
    return stats;
  }

  /// Kỹ năng làm đúng dưới [threshold] — "chủ đề cần ôn".
  List<SkillStat> weakSkills({double threshold = 0.6}) =>
      skillStats().values.where((s) => s.ratio < threshold).toList()..sort((a, b) => a.ratio.compareTo(b.ratio));
}

/// Số phần của một câu (ô trống, ô thả, mục nối) để chấm điểm từng phần.
int partCount(Problem p) => switch (p.body) {
  MultipleChoiceBody() => 1,
  FillBlankBody(:final blanks) => blanks.length,
  DragDropBody(:final slots) => slots.length,
  MatchingBody(:final pairs) => pairs.length,
};

/// Chấm một câu trong đề: trắc nghiệm đúng/sai cả câu; dạng khác có điểm từng
/// phần, làm tròn XUỐNG tới 0,25 điểm.
(CheckResult?, double) gradeExamItem(ExamItem item, UserAnswer? answer) {
  if (answer == null) return (null, 0);
  final check = checkAnswer(item.problem, answer);
  if (check.isCorrect) return (check, item.points);
  if (item.problem.body is MultipleChoiceBody) return (check, 0);
  final good = check.partCorrect.values.where((v) => v).length;
  final raw = item.points * good / partCount(item.problem);
  return (check, (raw * 4).floorToDouble() / 4);
}

/// Bài thi làm dở (lưu để bé thoát ra rồi làm tiếp).
class ExamDraft {
  const ExamDraft({
    required this.examId,
    required this.contentRev,
    required this.elapsedSeconds,
    required this.current,
    required this.answers,
  });

  factory ExamDraft.fromJson(Map<String, dynamic> j) => ExamDraft(
    examId: j['examId'] as String,
    contentRev: j['contentRev'] as int? ?? 1,
    elapsedSeconds: j['elapsed'] as int? ?? 0,
    current: j['current'] as int? ?? 0,
    answers: {
      for (final e in ((j['answers'] as Map?) ?? const {}).entries)
        if (int.tryParse('${e.key}') != null && UserAnswer.fromJson(e.value) != null)
          int.parse('${e.key}'): UserAnswer.fromJson(e.value)!,
    },
  );

  final String examId;
  final int contentRev;
  final int elapsedSeconds;
  final int current;
  final Map<int, UserAnswer> answers;

  Map<String, dynamic> toJson() => {
    'examId': examId,
    'contentRev': contentRev,
    'elapsed': elapsedSeconds,
    'current': current,
    'answers': {for (final e in answers.entries) '${e.key}': e.value.toJson()},
  };
}

/// Phiên làm đề: lưu câu trả lời, đếm giờ, nộp bài, chấm.
class ExamSession extends ChangeNotifier {
  ExamSession(this.exam) : items = exam.items;

  /// Làm tiếp bài dở (bỏ qua nếu đề đã được sửa từ lúc lưu).
  factory ExamSession.resume(Exam exam, ExamDraft draft) {
    final s = ExamSession(exam);
    if (draft.examId != exam.id || draft.contentRev != exam.contentRev) return s;
    for (final e in draft.answers.entries) {
      if (e.key >= 0 && e.key < s.items.length) s._answers[e.key] = e.value;
    }
    s._elapsed = draft.elapsedSeconds.clamp(0, s.durationSeconds - 1);
    s._current = draft.current.clamp(0, s.items.length - 1);
    return s;
  }

  ExamDraft toDraft() => ExamDraft(
    examId: exam.id,
    contentRev: exam.contentRev,
    elapsedSeconds: _elapsed,
    current: _current,
    answers: {..._answers},
  );

  final Exam exam;
  final List<ExamItem> items;
  final Map<int, UserAnswer> _answers = {};
  int _current = 0;
  int _elapsed = 0;
  ExamResult? _result;

  int get current => _current;
  int get elapsedSeconds => _elapsed;
  int get durationSeconds => exam.durationMinutes * 60;
  int get remainingSeconds => (durationSeconds - _elapsed).clamp(0, durationSeconds);
  bool get isSubmitted => _result != null;
  ExamResult? get result => _result;

  UserAnswer? answerOf(int index) => _answers[index];

  /// Câu đã có câu trả lời đầy đủ.
  bool isAnswered(int index) {
    final a = _answers[index];
    if (a == null) return false;
    return checkAnswer(items[index].problem, a).status != CheckStatus.incomplete;
  }

  int get answeredCount => [for (var i = 0; i < items.length; i++) i].where(isAnswered).length;

  void setAnswer(int index, UserAnswer answer) {
    if (isSubmitted) return;
    _answers[index] = answer;
    notifyListeners();
  }

  void goTo(int index) {
    if (index < 0 || index >= items.length) return;
    _current = index;
    notifyListeners();
  }

  /// Gọi mỗi giây. Hết giờ → tự nộp. Trả về true nếu vừa tự nộp.
  bool tick([int seconds = 1]) {
    if (isSubmitted) return false;
    _elapsed += seconds;
    if (_elapsed >= durationSeconds) {
      _elapsed = durationSeconds;
      submit(timedOut: true);
      return true;
    }
    notifyListeners();
    return false;
  }

  ExamResult submit({bool timedOut = false}) {
    if (_result != null) return _result!;
    final results = <ExamItemResult>[];
    for (var i = 0; i < items.length; i++) {
      final (check, earned) = gradeExamItem(items[i], _answers[i]);
      results.add(ExamItemResult(item: items[i], answer: _answers[i], check: check, earned: earned));
    }
    _result = ExamResult(exam: exam, items: results, usedSeconds: _elapsed, timedOut: timedOut);
    notifyListeners();
    return _result!;
  }
}

/// "05:07"
String formatClock(int seconds) {
  final m = seconds ~/ 60;
  final s = seconds % 60;
  return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
}
