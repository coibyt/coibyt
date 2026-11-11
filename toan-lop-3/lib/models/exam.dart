import 'json_reader.dart';
import 'problem.dart';

enum ExamType {
  kt15p('kt_15p', 'Kiểm tra 15 phút'),
  kt1Tiet('kt_1_tiet', 'Kiểm tra 1 tiết'),
  chuDe('chu_de', 'Kiểm tra chủ đề'),
  giuaHk1('giua_hk1', 'Giữa học kì 1'),
  cuoiHk1('cuoi_hk1', 'Cuối học kì 1'),
  giuaHk2('giua_hk2', 'Giữa học kì 2'),
  cuoiHk2('cuoi_hk2', 'Cuối học kì 2'),
  onTap('on_tap', 'Ôn tập');

  const ExamType(this.jsonName, this.displayName);

  final String jsonName;
  final String displayName;

  static Set<String> get names => {for (final t in values) t.jsonName};

  /// Khoảng thời gian hợp lệ (phút) theo loại đề.
  (int, int) get durationRange => switch (this) {
        ExamType.kt15p => (15, 15),
        ExamType.kt1Tiet => (35, 45),
        ExamType.giuaHk1 || ExamType.cuoiHk1 || ExamType.giuaHk2 || ExamType.cuoiHk2 => (35, 60),
        ExamType.chuDe || ExamType.onTap => (5, 90),
      };
  static ExamType fromJsonName(String s) => values.firstWhere((t) => t.jsonName == s);
}

/// Mục đề thi trong catalog.
class ExamRef {
  const ExamRef({
    required this.id,
    required this.title,
    required this.src,
    required this.access,
    required this.examType,
    required this.durationMinutes,
    this.term,
  });

  factory ExamRef.fromJson(JsonReader r) => ExamRef(
        term: r.optInteger('term', min: 1, max: 2),
        id: r.string('id'),
        title: r.string('title'),
        src: r.string('src'),
        access: Access.values.byName(r.oneOf('access', {'free', 'vip'})),
        examType: ExamType.fromJsonName(r.oneOf('examType', ExamType.names)),
        durationMinutes: r.integer('durationMinutes', min: 5, max: 90),
      );

  final String id;
  final String title;
  final String src;
  final Access access;
  final ExamType examType;
  final int durationMinutes;
  final int? term;
}

class ExamItem {
  const ExamItem({required this.points, required this.problem});

  final double points;
  final Problem problem;
}

class ExamSection {
  const ExamSection({required this.title, required this.items});

  final String title;
  final List<ExamItem> items;
}

/// Một đề kiểm tra (schema 1.1.0, kind = "exam").
class Exam {
  const Exam({
    required this.id,
    required this.bookId,
    required this.title,
    required this.examType,
    required this.durationMinutes,
    required this.access,
    required this.contentRev,
    required this.sections,
    this.chapterIds = const [],
    this.term,
    this.description,
  });

  factory Exam.fromJson(Object? json) {
    final r = JsonReader.root(json);
    r.schemaVersion();
    if (r.string('kind') != 'exam') {
      throw ContentFormatException('${r.path}.kind', 'file không phải exam');
    }
    return Exam(
      id: r.string('id'),
      bookId: r.string('bookId'),
      chapterIds: r.strings('chapterIds', optional: true),
      term: r.optInteger('term', min: 1, max: 2),
      description: r.optString('description'),
      title: r.string('title'),
      examType: ExamType.fromJsonName(r.oneOf('examType', ExamType.names)),
      durationMinutes: r.integer('durationMinutes', min: 5, max: 90),
      access: Access.values.byName(r.oneOf('access', {'free', 'vip'})),
      contentRev: r.integer('contentRev', min: 1),
      sections: r.objects(
        'sections',
        (s) => ExamSection(
          title: s.string('title'),
          items: s.objects(
            'items',
            (i) {
              final pts = i.json['points'];
              if (pts is! num || pts <= 0 || (pts * 4) != (pts * 4).roundToDouble()) {
                throw ContentFormatException('${i.path}.points', 'phải > 0 và là bội của 0,25');
              }
              return ExamItem(points: pts.toDouble(), problem: Problem.fromJson(i.object('problem')));
            },
            minItems: 1,
          ),
        ),
        minItems: 1,
      ),
    );
  }

  final String id;
  final String bookId;
  final List<String> chapterIds;
  final String title;
  final ExamType examType;
  final int durationMinutes;
  final Access access;
  final int contentRev;
  final List<ExamSection> sections;
  final int? term;

  /// Một câu: đề ôn những gì.
  final String? description;

  List<ExamItem> get items => [for (final s in sections) ...s.items];

  double get totalPoints => items.fold(0, (sum, i) => sum + i.points);
}
