import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/tutor.dart';
import '../models/calendar.dart';
import '../models/content.dart';
import '../models/exam.dart';
import '../tutor/teacher_intro.dart';
import 'app_theme.dart';
import 'child_screens.dart';
import 'exam_screens.dart' show ExamIntroScreen, examArt, examColor;
import 'widgets/game_art.dart';

const _weekdays = ['', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];

String ddmm(DateTime d) => '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}';

/// Tuần học hiện tại theo lịch (tuần của ngày học gần nhất từ hôm nay; hết năm → tuần cuối).
int currentWeek(SchoolCalendar cal, DateTime now) =>
    cal.dayFor(now)?.week ?? cal.nextDayFrom(now)?.week ?? (cal.days.isEmpty ? 1 : cal.days.last.week);

/// Lịch học Toán từng ngày của cả năm học: chọn bất kỳ ngày nào để học bài của ngày đó.
class CalendarScreen extends StatefulWidget {
  const CalendarScreen({super.key, required this.book});

  final Book book;

  @override
  State<CalendarScreen> createState() => _CalendarScreenState();
}

class _CalendarScreenState extends State<CalendarScreen> {
  int? _term;
  final _currentKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final ctx = _currentKey.currentContext;
      if (ctx != null && ctx.mounted) {
        Scrollable.ensureVisible(ctx, alignment: 0.1, duration: const Duration(milliseconds: 400));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final cal = app.calendar!;
    final now = app.now();
    final thisWeek = currentWeek(cal, now);
    final lessons = {
      for (final c in widget.book.chapters)
        for (final l in c.lessons) l.id: (l, c),
    };
    final exams = {for (final e in widget.book.exams) e.id: e};
    final term = _term ?? (cal.days.where((d) => d.week == thisWeek).firstOrNull?.term ?? 1);
    final weeks = <int>[
      for (final w in {for (final d in cal.days) d.week})
        if (cal.daysOfWeek(w).first.term == term) w,
    ];
    final today = cal.dayFor(now) ?? cal.nextDayFrom(now);
    return Scaffold(
      appBar: AppBar(
        title: Text('Lịch học ${cal.schoolYear}'),
        backgroundColor: const Color(0xFF6A5CFF),
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'home',
        veil: 0.6,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const TeacherIntro(
                    key: ValueKey('calendar-intro'),
                    lines: [TutorLines.screenCalendar],
                    avatarHeight: 96,
                  ),
                  const SizedBox(height: 12),
                  if (today != null && lessons[today.lessonId] != null)
                    _TodayCard(day: today, lesson: lessons[today.lessonId]!.$1, isToday: cal.dayFor(now) != null),
                  const SizedBox(height: 12),
                  _YearProgress(cal: cal, app: app),
                  const SizedBox(height: 12),
                  SegmentedButton<int>(
                    key: const ValueKey('calendar-term'),
                    segments: const [
                      ButtonSegment(value: 1, label: Text('Học kì 1', style: TextStyle(fontSize: 17))),
                      ButtonSegment(value: 2, label: Text('Học kì 2', style: TextStyle(fontSize: 17))),
                    ],
                    selected: {term},
                    onSelectionChanged: (s) => setState(() => _term = s.first),
                  ),
                  const SizedBox(height: 12),
                  for (final w in weeks)
                    _WeekCard(
                      key: w == thisWeek ? _currentKey : ValueKey('week-$w'),
                      week: w,
                      cal: cal,
                      isCurrent: w == thisWeek,
                      isPast: w < thisWeek,
                      lessons: lessons,
                      exams: exams,
                      now: now,
                    ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _TodayCard extends StatelessWidget {
  const _TodayCard({required this.day, required this.lesson, required this.isToday});

  final CalendarDay day;
  final LessonRef lesson;
  final bool isToday;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('calendar-today'),
        borderRadius: BorderRadius.circular(24),
        onTap: () => pushScreen<void>(context, LessonScreen(lessonRef: lesson)),
        child: Ink(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(colors: [Color(0xFFFFB800), Color(0xFFFF7A00)]),
            boxShadow: const [BoxShadow(color: Color(0x55FF8A00), blurRadius: 16, offset: Offset(0, 6))],
          ),
          child: Row(
            children: [
              Container(
                width: 64,
                padding: const EdgeInsets.symmetric(vertical: 6),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16)),
                child: Column(
                  children: [
                    Text(
                      _weekdays[day.date.weekday].replaceFirst('Thứ ', 'T.'),
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Color(0xFFFF7A00)),
                    ),
                    Text(
                      '${day.date.day}',
                      style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: AppColors.ink),
                    ),
                    Text('Th ${day.date.month}', style: const TextStyle(fontSize: 12, color: Colors.black54)),
                  ],
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isToday ? 'Bài học hôm nay' : 'Bài học buổi tới',
                      style: const TextStyle(fontSize: 15, color: Colors.white, fontWeight: FontWeight.w700),
                    ),
                    Text(
                      lesson.title,
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      'Tiết ${day.part}/${day.parts} · Tuần ${day.week}',
                      style: const TextStyle(fontSize: 14, color: Colors.white),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.play_circle_fill_rounded, color: Colors.white, size: 46),
            ],
          ),
        ),
      ),
    );
  }
}

/// Tiến độ cả năm: số bài đã học / tổng số bài trong lịch.
class _YearProgress extends StatelessWidget {
  const _YearProgress({required this.cal, required this.app});

  final SchoolCalendar cal;
  final AppState app;

  @override
  Widget build(BuildContext context) {
    final ids = {for (final d in cal.days) d.lessonId};
    final done = ids.where((id) => (app.lessonProgress(id)?.bestStars ?? 0) > 0).length;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
      child: Row(
        children: [
          SizedBox(
            width: 56,
            height: 56,
            child: Stack(
              alignment: Alignment.center,
              children: [
                CircularProgressIndicator(
                  value: ids.isEmpty ? 0 : done / ids.length,
                  strokeWidth: 7,
                  color: AppColors.good,
                  backgroundColor: AppColors.goodSoft,
                ),
                Text(
                  '${ids.isEmpty ? 0 : (done * 100 / ids.length).round()}%',
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800),
                ),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              'Cả năm: ${cal.days.length} tiết Toán, ${ids.length} bài.\nCon đã học $done bài.',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}

class _WeekCard extends StatefulWidget {
  const _WeekCard({
    super.key,
    required this.week,
    required this.cal,
    required this.isCurrent,
    required this.isPast,
    required this.lessons,
    required this.exams,
    required this.now,
  });

  final int week;
  final SchoolCalendar cal;
  final bool isCurrent;
  final bool isPast;
  final Map<String, (LessonRef, Chapter)> lessons;
  final Map<String, ExamRef> exams;
  final DateTime now;

  @override
  State<_WeekCard> createState() => _WeekCardState();
}

class _WeekCardState extends State<_WeekCard> {
  late bool _open = widget.isCurrent;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final days = widget.cal.daysOfWeek(widget.week);
    final monday = days.first.date.subtract(Duration(days: days.first.date.weekday - 1));
    final friday = monday.add(const Duration(days: 4));
    final holidays = [
      for (final h in widget.cal.holidays)
        if (!h.end.isBefore(monday) && !h.start.isAfter(friday)) h,
    ];
    final examRefs = [
      for (final e in widget.cal.examsOfWeek(widget.week))
        if (widget.exams[e.examId] != null) widget.exams[e.examId]!,
    ];
    final doneCount = days.where((d) => (app.lessonProgress(d.lessonId)?.bestStars ?? 0) > 0).length;
    final accent = widget.isCurrent ? const Color(0xFF6A5CFF) : (widget.isPast ? AppColors.good : AppColors.sky);
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Material(
        color: Colors.white,
        elevation: widget.isCurrent ? 4 : 1,
        shadowColor: accent.withValues(alpha: 0.4),
        borderRadius: BorderRadius.circular(20),
        clipBehavior: Clip.antiAlias,
        child: Column(
          children: [
            InkWell(
              key: ValueKey('week-toggle-${widget.week}'),
              onTap: () => setState(() => _open = !_open),
              child: Container(
                padding: const EdgeInsets.fromLTRB(14, 10, 8, 10),
                decoration: BoxDecoration(
                  border: Border(left: BorderSide(color: accent, width: 6)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            crossAxisAlignment: WrapCrossAlignment.center,
                            children: [
                              Text(
                                'Tuần ${widget.week}',
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: accent),
                              ),
                              if (widget.isCurrent)
                                Container(
                                  margin: const EdgeInsets.only(left: 8),
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 1),
                                  decoration: BoxDecoration(color: accent, borderRadius: BorderRadius.circular(10)),
                                  child: const Text(
                                    'Tuần này',
                                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.white),
                                  ),
                                ),
                            ],
                          ),
                          Text(
                            '${ddmm(monday)} – ${ddmm(friday)} · ${days.length} tiết',
                            style: const TextStyle(fontSize: 14, color: Colors.black54),
                          ),
                        ],
                      ),
                    ),
                    for (final e in examRefs.take(2))
                      Padding(
                        padding: const EdgeInsets.only(left: 2),
                        child: GameIcon(examArt(e), size: 30, fallback: const Icon(Icons.assignment_rounded)),
                      ),
                    const SizedBox(width: 6),
                    Text(
                      '$doneCount/${days.length}',
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800),
                    ),
                    Icon(_open ? Icons.expand_less_rounded : Icons.expand_more_rounded, size: 30),
                  ],
                ),
              ),
            ),
            if (_open) ...[
              for (final h in holidays)
                ListTile(
                  dense: true,
                  leading: const Text('🎉', style: TextStyle(fontSize: 24)),
                  title: Text(
                    'Nghỉ: ${h.name}',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppColors.tryAgain),
                  ),
                  subtitle: Text(h.start == h.end ? ddmm(h.start) : '${ddmm(h.start)} – ${ddmm(h.end)}'),
                ),
              for (final d in days) _DayRow(day: d, entry: widget.lessons[d.lessonId], now: widget.now),
              if (examRefs.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
                  child: Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: [
                      for (final e in examRefs)
                        ActionChip(
                          key: ValueKey('week-exam-${e.id}'),
                          avatar: GameIcon(examArt(e), size: 24, fallback: const Icon(Icons.assignment_rounded)),
                          backgroundColor: examColor(e).withValues(alpha: 0.12),
                          side: BorderSide(color: examColor(e)),
                          label: Text(e.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                          onPressed: () => pushScreen<void>(context, ExamIntroScreen(examRef: e)),
                        ),
                    ],
                  ),
                ),
            ],
          ],
        ),
      ),
    );
  }
}

class _DayRow extends StatelessWidget {
  const _DayRow({required this.day, required this.entry, required this.now});

  final CalendarDay day;
  final (LessonRef, Chapter)? entry;
  final DateTime now;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final e = entry;
    if (e == null) return const SizedBox.shrink();
    final (lesson, chapter) = e;
    final stars = app.lessonProgress(lesson.id)?.bestStars ?? 0;
    final isToday = dateOnly(now) == day.date;
    final locked = !app.canOpen(lesson.access);
    return InkWell(
      key: ValueKey('day-${day.date.toIso8601String().substring(0, 10)}'),
      onTap: locked ? null : () => pushScreen<void>(context, LessonScreen(lessonRef: lesson)),
      child: Container(
        color: isToday ? const Color(0xFFFFF4D6) : null,
        padding: const EdgeInsets.fromLTRB(14, 8, 12, 8),
        child: Row(
          children: [
            SizedBox(
              width: 70,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _weekdays[day.date.weekday],
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w800,
                      color: isToday ? const Color(0xFFFF7A00) : AppColors.ink,
                    ),
                  ),
                  Text(ddmm(day.date), style: const TextStyle(fontSize: 13, color: Colors.black54)),
                ],
              ),
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(lesson.title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                  Text(
                    'Chủ đề ${chapter.order} · tiết ${day.part}/${day.parts}',
                    style: const TextStyle(fontSize: 13, color: Colors.black54),
                  ),
                ],
              ),
            ),
            if (locked)
              const Icon(Icons.lock_rounded, color: AppColors.vip)
            else if (stars > 0)
              Text('⭐' * stars, style: const TextStyle(fontSize: 14))
            else
              const Icon(Icons.chevron_right_rounded, color: Colors.black38),
          ],
        ),
      ),
    );
  }
}
