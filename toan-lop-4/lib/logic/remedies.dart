/// Tranh sửa sai theo dạng toán (assets/content/remedies.json, do tool/gen_remedies.py tạo):
/// bé làm sai thì cô mở tranh, que chỉ lần lượt vào từng chỗ và giảng lại cách làm.
/// Dart thuần — dùng chung cho giao diện và tool/make_voice.dart.
library;

import '../models/problem.dart';
import 'real_examples.dart';

const remediesPath = 'assets/content/remedies.json';

String remedyImage(String skill) => 'assets/remedies/$skill.webp';

/// `{"<skillId>": {"title", "prompt", "lines": [{"say", "at"}]}}` → tranh theo dạng toán.
Map<String, RealExample> parseRemedies(Map<String, dynamic> json) => {
  for (final e in json.entries)
    e.key: RealExample(
      image: remedyImage(e.key),
      title: (e.value as Map)['title'] as String,
      lines: [
        for (final l in ((e.value as Map)['lines'] as List).cast<Map<String, dynamic>>())
          (l['say'] as String, PointAt.parse(l['at'] as String?)),
      ],
    ),
};

/// Tranh cho một bài tập: dạng toán đầu tiên của bài có tranh.
RealExample? remedyForProblem(Problem p, Map<String, RealExample> all) {
  for (final s in p.skillIds) {
    final r = all[s];
    if (r != null) return r;
  }
  return null;
}

/// Tranh cho cả bài học (video bài giảng): dạng toán gặp nhiều nhất trong bài.
RealExample? remedyForLesson(Iterable<Problem> problems, Map<String, RealExample> all) {
  final count = <String, int>{};
  for (final p in problems) {
    for (final s in p.skillIds) {
      if (all.containsKey(s)) count[s] = (count[s] ?? 0) + 1;
    }
  }
  if (count.isEmpty) return null;
  final best = count.entries.reduce((a, b) => b.value > a.value ? b : a).key;
  return all[best];
}

/// Câu cô nói trước và sau khi giảng bằng tranh.
abstract final class RemedyLines {
  static const intro = 'Không sao đâu con! Cô giảng lại bằng tranh cho con dễ hiểu nhé.';
  static const outro = 'Con hiểu rồi chứ? Giờ con làm lại bài này nhé, cô tin con làm được!';
  static const all = [intro, outro];
}
