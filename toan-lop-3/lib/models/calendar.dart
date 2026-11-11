import 'json_reader.dart';

/// Lịch học từng ngày của một năm học (`assets/content/calendar.json`, schema 1.3.0+).
///
/// Mỗi ngày học (thứ Hai – thứ Sáu, trừ ngày nghỉ lễ) ứng với đúng một tiết Toán:
/// bài học nào ([CalendarDay.lessonId]) và tiết thứ mấy của bài đó
/// ([CalendarDay.part] / [CalendarDay.parts]). Pure Dart, không phụ thuộc Flutter.
class SchoolCalendar {
  const SchoolCalendar({
    required this.schemaVersion,
    required this.bookId,
    required this.schoolYear,
    required this.terms,
    required this.holidays,
    required this.days,
    this.exams = const [],
    this.advanced = const [],
  });

  factory SchoolCalendar.fromJson(Object? json) {
    final r = JsonReader.root(json);
    final version = r.schemaVersion();
    if (r.string('kind') != 'calendar') {
      throw ContentFormatException('${r.path}.kind', 'file không phải calendar');
    }
    final days = r.objects('days', CalendarDay.fromJson, minItems: 1);
    for (var i = 1; i < days.length; i++) {
      if (!days[i].date.isAfter(days[i - 1].date)) {
        throw ContentFormatException('${r.path}.days[$i].date', 'các ngày phải tăng dần, không trùng');
      }
    }
    return SchoolCalendar(
      schemaVersion: version,
      bookId: r.string('bookId'),
      schoolYear: r.string('schoolYear'),
      terms: r.objects('terms', CalendarTerm.fromJson, minItems: 1),
      holidays: r.objects('holidays', CalendarHoliday.fromJson, optional: true),
      days: days,
      exams: r.objects('exams', CalendarExam.fromJson, optional: true),
      advanced: r.objects('advanced', CalendarAdvanced.fromJson, optional: true),
    );
  }

  final String schemaVersion;
  final String bookId;

  /// Vd "2026-2027".
  final String schoolYear;
  final List<CalendarTerm> terms;
  final List<CalendarHoliday> holidays;

  /// Các ngày học theo thứ tự thời gian.
  final List<CalendarDay> days;
  final List<CalendarExam> exams;

  /// Bài nâng cao của từng tuần (trường tuỳ chọn `advanced`; thiếu → rỗng).
  final List<CalendarAdvanced> advanced;

  /// Ngày học của [date] (bỏ qua giờ phút); null nếu hôm đó không học (cuối tuần, nghỉ lễ, ngoài năm học).
  CalendarDay? dayFor(DateTime date) {
    final d = dateOnly(date);
    var lo = 0, hi = days.length - 1;
    while (lo <= hi) {
      final mid = (lo + hi) >> 1;
      final c = days[mid].date.compareTo(d);
      if (c == 0) return days[mid];
      if (c < 0) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    return null;
  }

  /// Mã bài học của ngày [date], hoặc null nếu hôm đó không có tiết Toán.
  String? lessonForDate(DateTime date) => dayFor(date)?.lessonId;

  /// Ngày học gần nhất từ [date] trở đi (vd hôm nay là thứ Bảy → tiết thứ Hai tuần sau).
  CalendarDay? nextDayFrom(DateTime date) {
    final d = dateOnly(date);
    for (final day in days) {
      if (!day.date.isBefore(d)) return day;
    }
    return null;
  }

  /// Các ngày học của tuần thứ [week] (đánh số từ 1).
  List<CalendarDay> daysOfWeek(int week) => [
    for (final d in days)
      if (d.week == week) d,
  ];

  /// Số tuần học (tuần cuối cùng có ngày học).
  int get weekCount => days.isEmpty ? 0 : days.last.week;

  /// Đề kiểm tra gợi ý cho tuần [week].
  List<CalendarExam> examsOfWeek(int week) => [
    for (final e in exams)
      if (e.week == week) e,
  ];

  /// Mã bài nâng cao của tuần [week], hoặc null nếu tuần đó không có.
  String? advancedOfWeek(int week) {
    for (final a in advanced) {
      if (a.week == week) return a.lessonId;
    }
    return null;
  }

  /// Đợt nghỉ lễ chứa [date], nếu có.
  CalendarHoliday? holidayFor(DateTime date) {
    final d = dateOnly(date);
    for (final h in holidays) {
      if (h.contains(d)) return h;
    }
    return null;
  }

  /// Học kì chứa [date] (theo khoảng ngày của học kì), hoặc null.
  CalendarTerm? termFor(DateTime date) {
    final d = dateOnly(date);
    for (final t in terms) {
      if (t.contains(d)) return t;
    }
    return null;
  }

  /// Các ngày học của một bài học (theo thứ tự tiết).
  List<CalendarDay> daysOfLesson(String lessonId) => [
    for (final d in days)
      if (d.lessonId == lessonId) d,
  ];
}

class CalendarTerm {
  const CalendarTerm({required this.term, required this.start, required this.end});

  factory CalendarTerm.fromJson(JsonReader r) {
    final t = CalendarTerm(
      term: r.integer('term', min: 1, max: 2),
      start: readDate(r, 'start'),
      end: readDate(r, 'end'),
    );
    if (t.end.isBefore(t.start)) {
      throw ContentFormatException('${r.path}.end', 'ngày kết thúc trước ngày bắt đầu');
    }
    return t;
  }

  final int term;
  final DateTime start;
  final DateTime end;

  bool contains(DateTime date) {
    final d = dateOnly(date);
    return !d.isBefore(start) && !d.isAfter(end);
  }
}

class CalendarHoliday {
  const CalendarHoliday({required this.start, required this.end, required this.name});

  factory CalendarHoliday.fromJson(JsonReader r) {
    final h = CalendarHoliday(start: readDate(r, 'start'), end: readDate(r, 'end'), name: r.string('name'));
    if (h.end.isBefore(h.start)) {
      throw ContentFormatException('${r.path}.end', 'ngày kết thúc trước ngày bắt đầu');
    }
    return h;
  }

  final DateTime start;

  /// Ngày cuối (tính cả ngày này).
  final DateTime end;
  final String name;

  bool contains(DateTime date) {
    final d = dateOnly(date);
    return !d.isBefore(start) && !d.isAfter(end);
  }
}

class CalendarDay {
  const CalendarDay({
    required this.date,
    required this.week,
    required this.term,
    required this.lessonId,
    required this.part,
    required this.parts,
  });

  factory CalendarDay.fromJson(JsonReader r) {
    final parts = r.integer('parts', min: 1, max: 5);
    return CalendarDay(
      date: readDate(r, 'date'),
      week: r.integer('week', min: 1),
      term: r.integer('term', min: 1, max: 2),
      lessonId: r.string('lessonId'),
      part: r.integer('part', min: 1, max: parts),
      parts: parts,
    );
  }

  /// Ngày (giờ địa phương, 00:00).
  final DateTime date;
  final int week;
  final int term;
  final String lessonId;

  /// Tiết thứ mấy của bài (1..[parts]).
  final int part;

  /// Bài học có tất cả mấy tiết.
  final int parts;

  bool get isFirstPart => part == 1;
  bool get isLastPart => part == parts;
}

class CalendarExam {
  const CalendarExam({required this.week, required this.examId});

  factory CalendarExam.fromJson(JsonReader r) =>
      CalendarExam(week: r.integer('week', min: 1), examId: r.string('examId'));

  final int week;
  final String examId;
}

/// Bài nâng cao gắn với một tuần học (`calendar.advanced[]`).
class CalendarAdvanced {
  const CalendarAdvanced({required this.week, required this.lessonId});

  factory CalendarAdvanced.fromJson(JsonReader r) =>
      CalendarAdvanced(week: r.integer('week', min: 1), lessonId: r.string('lessonId'));

  final int week;

  /// Mã bài trong `advancedLessons` của một chủ đề trong catalog.
  final String lessonId;
}

/// Bỏ phần giờ phút: so sánh theo ngày lịch.
DateTime dateOnly(DateTime d) => DateTime(d.year, d.month, d.day);

final _isoDate = RegExp(r'^(\d{4})-(\d{2})-(\d{2})$');

/// Đọc ngày dạng "YYYY-MM-DD" (giờ địa phương).
DateTime readDate(JsonReader r, String key) {
  final s = r.string(key);
  final m = _isoDate.firstMatch(s);
  if (m == null) throw ContentFormatException('${r.path}.$key', '"$s" không phải ngày YYYY-MM-DD');
  final d = DateTime(int.parse(m[1]!), int.parse(m[2]!), int.parse(m[3]!));
  if (d.month != int.parse(m[2]!) || d.day != int.parse(m[3]!)) {
    throw ContentFormatException('${r.path}.$key', '"$s" không phải ngày có thật');
  }
  return d;
}
