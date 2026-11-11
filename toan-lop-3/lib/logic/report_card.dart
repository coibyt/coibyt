import '../models/content.dart';
import 'exam_session.dart';

/// Một phần kiến thức trong bảng điểm (gộp các kỹ năng cùng tên cho bé).
class ReportTopic {
  ReportTopic(this.name);

  /// Tên cho bé, vd "phép nhân".
  final String name;
  final Set<String> skillIds = {};
  int correct = 0;
  int total = 0;

  double get ratio => total == 0 ? 0 : correct / total;
  bool get strong => total > 0 && ratio >= 0.8;
  bool get weak => total > 0 && ratio < 0.6;
}

/// Bảng điểm phân tích sau khi nộp bài.
class ReportCard {
  ReportCard._(this.result, this.topics, this.message, this.suggestedLessons, this.previousScore);

  /// [previousScore]: điểm (làm tròn) lần làm trước của cùng đề, nếu có.
  factory ReportCard.build(ExamResult result, Catalog catalog, {int? previousScore}) {
    final skills = catalog.skillsById;
    final topics = <String, ReportTopic>{};
    for (final stat in result.skillStats().values) {
      final name = skills[stat.skillId]?.shortName ?? stat.skillId;
      final t = topics.putIfAbsent(name, () => ReportTopic(name));
      t.skillIds.add(stat.skillId);
      t.correct += stat.correct;
      t.total += stat.total;
    }
    final list = topics.values.toList()
      ..sort((a, b) => a.ratio != b.ratio ? a.ratio.compareTo(b.ratio) : b.total.compareTo(a.total));
    final lessons = <String, LessonRef>{};
    for (final t in list.where((t) => t.weak)) {
      for (final s in t.skillIds) {
        for (final l in catalog.lessonsForSkill(s)) {
          lessons.putIfAbsent(l.id, () => l);
        }
      }
    }
    return ReportCard._(
      result,
      list,
      buildFeedback(list, allCorrect: result.correctCount == result.items.length),
      lessons.values.take(3).toList(),
      previousScore,
    );
  }

  final ExamResult result;

  /// Các phần kiến thức, phần yếu nhất trước.
  final List<ReportTopic> topics;

  /// Lời nhận xét cho bé.
  final String message;

  /// Bài học nên ôn ngay (tối đa 3).
  final List<LessonRef> suggestedLessons;
  final int? previousScore;

  List<ReportTopic> get weakTopics => [
    for (final t in topics)
      if (t.weak) t,
  ];
  List<ReportTopic> get strongTopics => [
    for (final t in topics)
      if (t.strong) t,
  ];

  /// Chênh lệch với lần trước (null nếu lần đầu).
  int? get scoreChange => previousScore == null ? null : result.roundedScore - previousScore!;
}

/// "a", "a và b", "a, b và c"
String joinVi(List<String> items) {
  if (items.isEmpty) return '';
  if (items.length == 1) return items.first;
  return '${items.sublist(0, items.length - 1).join(', ')} và ${items.last}';
}

/// Lời nhận xét kiểu cô giáo: khen phần làm tốt, chỉ ra phần cần ôn.
String buildFeedback(List<ReportTopic> topics, {required bool allCorrect}) {
  if (topics.isEmpty) return 'Con đã hoàn thành bài thi. Cùng xem lại từng câu nhé!';
  if (allCorrect) {
    final names = joinVi([for (final t in topics.take(3)) t.name]);
    return 'Con làm đúng hết tất cả các câu! Con đang làm rất tốt $names. Tuyệt vời!';
  }
  // Phần tốt: đúng nhiều nhất trước; phần yếu: sai nhiều nhất trước.
  final strong = [
    for (final t in topics.reversed)
      if (t.strong) t.name,
  ].take(2).toList();
  final weak = [
    for (final t in topics)
      if (t.weak) t.name,
  ].take(3).toList();
  if (strong.isNotEmpty && weak.isNotEmpty) {
    return 'Con đang làm rất tốt ${joinVi(strong)}, nhưng cần ôn lại ${joinVi(weak)} nhé.';
  }
  if (weak.isNotEmpty) {
    return 'Con cần ôn lại ${joinVi(weak)} nhé. Mình luyện thêm một chút là sẽ tiến bộ ngay!';
  }
  if (strong.isNotEmpty) {
    final middle = [
      for (final t in topics)
        if (!t.strong) t.name,
    ].take(2).toList();
    return middle.isEmpty
        ? 'Con làm tốt ${joinVi(strong)}. Cẩn thận thêm chút nữa là được điểm 10 nhé!'
        : 'Con làm tốt ${joinVi(strong)}. Luyện thêm ${joinVi(middle)} để chắc điểm cao nhé!';
  }
  return 'Con làm khá rồi! Ôn thêm ${joinVi([for (final t in topics.take(2)) t.name])} để chắc điểm cao nhé.';
}
