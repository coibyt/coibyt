import 'blocks.dart';
import 'json_reader.dart';
import 'problem.dart';

enum BookSeries {
  ketNoiTriThuc('ket_noi_tri_thuc', 'Kết nối tri thức'),
  chanTroiSangTao('chan_troi_sang_tao', 'Chân trời sáng tạo'),
  canhDieu('canh_dieu', 'Cánh Diều');

  const BookSeries(this.jsonName, this.displayName);

  final String jsonName;
  final String displayName;

  static BookSeries fromJsonName(String s) =>
      values.firstWhere((v) => v.jsonName == s);
}

class Skill {
  const Skill({required this.id, required this.name, this.strand});

  final String id;

  /// Tên cho phụ huynh đọc trong báo cáo.
  final String name;
  final String? strand;
}

class LessonRef {
  const LessonRef({
    required this.id,
    required this.order,
    required this.title,
    required this.src,
    required this.access,
  });

  final String id;
  final int order;
  final String title;

  /// Đường dẫn asset của file bài học.
  final String src;
  final Access access;
}

class Chapter {
  const Chapter({
    required this.id,
    required this.order,
    required this.title,
    required this.lessons,
    this.volume,
  });

  final String id;
  final int order;
  final int? volume;
  final String title;
  final List<LessonRef> lessons;
}

class Book {
  const Book({
    required this.id,
    required this.series,
    required this.title,
    required this.chapters,
  });

  final String id;
  final BookSeries series;
  final String title;
  final List<Chapter> chapters;
}

/// Mục lục: Bộ sách → Chủ đề → Bài học, kèm danh sách kỹ năng.
class Catalog {
  const Catalog({
    required this.schemaVersion,
    required this.contentRev,
    required this.skills,
    required this.books,
  });

  factory Catalog.fromJson(Object? json) {
    final r = JsonReader.root(json);
    final version = r.schemaVersion();
    if (r.string('kind') != 'catalog') {
      throw ContentFormatException('${r.path}.kind', 'file không phải catalog');
    }
    return Catalog(
      schemaVersion: version,
      contentRev: r.integer('contentRev', min: 1),
      skills: r.objects(
        'skills',
        (s) => Skill(
          id: s.string('id'),
          name: s.string('name'),
          strand: s.optString('strand'),
        ),
        minItems: 1,
      ),
      books: r.objects(
        'books',
        (b) {
          if (b.integer('grade') != 3) {
            throw ContentFormatException('${b.path}.grade', 'app này chỉ dành cho lớp 3');
          }
          return Book(
            id: b.string('id'),
            series: BookSeries.fromJsonName(
              b.oneOf('series', {for (final s in BookSeries.values) s.jsonName}),
            ),
            title: b.string('title'),
            chapters: b.objects(
              'chapters',
              (c) => Chapter(
                id: c.string('id'),
                order: c.integer('order', min: 1),
                volume: c.optInteger('volume', min: 1, max: 2),
                title: c.string('title'),
                lessons: c.objects(
                  'lessons',
                  (l) => LessonRef(
                    id: l.string('id'),
                    order: l.integer('order', min: 1),
                    title: l.string('title'),
                    src: l.string('src'),
                    access: Access.values.byName(l.oneOf('access', {'free', 'vip'})),
                  ),
                ),
              ),
            ),
          );
        },
        minItems: 1,
      ),
    );
  }

  final String schemaVersion;
  final int contentRev;
  final List<Skill> skills;
  final List<Book> books;

  Map<String, Skill> get skillsById => {for (final s in skills) s.id: s};
}

class Theory {
  const Theory({required this.blocks, this.title});

  final String? title;
  final List<ContentBlock> blocks;
}

/// Một bài học: tóm tắt lý thuyết + các Bài Toán luyện tập.
class Lesson {
  const Lesson({
    required this.schemaVersion,
    required this.id,
    required this.bookId,
    required this.chapterId,
    required this.order,
    required this.title,
    required this.contentRev,
    required this.theory,
    required this.problems,
  });

  factory Lesson.fromJson(Object? json) {
    final r = JsonReader.root(json);
    final version = r.schemaVersion();
    if (r.string('kind') != 'lesson') {
      throw ContentFormatException('${r.path}.kind', 'file không phải lesson');
    }
    final theory = r.object('theory');
    return Lesson(
      schemaVersion: version,
      id: r.string('id'),
      bookId: r.string('bookId'),
      chapterId: r.string('chapterId'),
      order: r.integer('order', min: 1),
      title: r.string('title'),
      contentRev: r.integer('contentRev', min: 1),
      theory: Theory(
        title: theory.optString('title'),
        blocks: theory.objects('blocks', ContentBlock.fromJson, minItems: 1),
      ),
      problems: r.objects('problems', Problem.fromJson, minItems: 1),
    );
  }

  final String schemaVersion;
  final String id;
  final String bookId;
  final String chapterId;
  final int order;
  final String title;
  final int contentRev;
  final Theory theory;
  final List<Problem> problems;
}
