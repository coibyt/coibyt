/// Ví dụ trong cuộc sống: mỗi bài có 1–2 tranh thật (Kie.ai) để cô chỉ vào và giảng
/// (Dart thuần — dùng chung cho giao diện, kịch bản cô giảng và tool/make_voice.dart).
library;

/// Vị trí cô chỉ trên tranh (tranh được vẽ theo bố cục trái / giữa / phải).
enum PointAt {
  left(0.24, 0.56),
  center(0.5, 0.5),
  right(0.76, 0.56),
  all(0.5, 0.5);

  const PointAt(this.x, this.y);

  /// Toạ độ tương đối (0..1) trên tranh.
  final double x;
  final double y;

  static PointAt parse(String? s) => values.firstWhere((v) => v.name == s, orElse: () => all);
}

class RealExample {
  const RealExample({required this.image, required this.title, required this.lines});

  /// `assets/examples/<mã bài>-<n>.webp`
  final String image;

  /// Chú thích dưới tranh.
  final String title;

  /// Lời cô nói + chỗ cô chỉ.
  final List<(String say, PointAt at)> lines;
}

const realExamplesPath = 'assets/content/examples.json';

String exampleImage(String lessonId, int n) => 'assets/examples/$lessonId-${n + 1}.webp';

/// Đọc danh mục ví dụ: `{"<mã bài>": [{"title", "prompt", "lines": [{"say", "at"}]}]}`.
Map<String, List<RealExample>> parseRealExamples(Map<String, dynamic> json) => {
  for (final e in json.entries)
    e.key: [
      for (final (n, x) in (e.value as List).cast<Map<String, dynamic>>().indexed)
        RealExample(
          image: exampleImage(e.key, n),
          title: x['title'] as String,
          lines: [
            for (final l in (x['lines'] as List).cast<Map<String, dynamic>>())
              (l['say'] as String, PointAt.parse(l['at'] as String?)),
          ],
        ),
    ],
};
