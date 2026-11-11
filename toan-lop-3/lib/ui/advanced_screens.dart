import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/badges.dart';
import '../logic/tutor.dart';
import '../models/content.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_intro.dart';
import 'calendar_screen.dart' show currentWeek, ddmm;
import 'child_screens.dart';
import 'quiz_screen.dart';
import 'widgets/game_art.dart';

const _royal = Color(0xFF3B1E8C);
const _gold = Color(0xFFFFC93C);

/// Mọi bài nâng cao của bộ sách, kèm chủ đề.
List<(LessonRef, Chapter)> advancedLessonsOf(Book book) => [
  for (final c in book.chapters)
    for (final l in c.advancedLessons) (l, c),
]..sort((a, b) => (AppState.advancedWeek(a.$1.id) ?? 0).compareTo(AppState.advancedWeek(b.$1.id) ?? 0));

/// Tên ngắn của bài nâng cao (bỏ tiền tố "Nâng cao tuần N:").
String advancedShortTitle(String title) => title.replaceFirst(RegExp(r'^Nâng cao tuần \d+:\s*'), '');

/// Mở một bài nâng cao: đã mở khoá thì vào học; chưa thì hỏi dùng chìa khoá vàng.
Future<void> openAdvancedLesson(BuildContext context, LessonRef lesson) async {
  final app = AppScope.read(context);
  if (app.advancedUnlocked(lesson.id)) {
    await pushScreen<void>(context, LessonScreen(lessonRef: lesson));
    return;
  }
  final (done, total) = app.advancedProgress(lesson.id);
  final ok = await showDialog<bool>(
    context: context,
    builder: (context) => AlertDialog(
      key: const ValueKey('adv-locked-dialog'),
      backgroundColor: const Color(0xFFFFFBF0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          GameIcon(UiAsset.advLock, size: 110, fallback: const Icon(Icons.lock_rounded, size: 80, color: _royal)),
          const Text('Bài nâng cao đang khoá', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800)),
          const SizedBox(height: 8),
          Text(
            'Con học xong các bài cơ bản của tuần ($done/$total bài) là tự mở khoá.\n'
            'Hoặc dùng chìa khoá vàng: ${AppState.advUnlockCost} vàng.',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 17),
          ),
        ],
      ),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Để sau')),
        FilledButton.icon(
          key: const ValueKey('adv-unlock-coins'),
          style: FilledButton.styleFrom(
            backgroundColor: const Color(0xFFFFB800),
            foregroundColor: const Color(0xFF4A2A00),
          ),
          onPressed: app.progress.coins >= AppState.advUnlockCost ? () => Navigator.pop(context, true) : null,
          icon: const Icon(Icons.key_rounded),
          label: Text('Mở bằng ${AppState.advUnlockCost} vàng'),
        ),
      ],
    ),
  );
  if (ok == true && await app.unlockAdvanced(lesson.id) && context.mounted) {
    await pushScreen<void>(context, LessonScreen(lessonRef: lesson));
  }
}

/// Khu Nâng cao — học sinh giỏi: thử thách mỗi ngày + một bài nâng cao cho mỗi tuần học.
class AdvancedScreen extends StatefulWidget {
  const AdvancedScreen({super.key, required this.book});

  final Book book;

  @override
  State<AdvancedScreen> createState() => _AdvancedScreenState();
}

class _AdvancedScreenState extends State<AdvancedScreen> {
  int? _term;
  final _currentKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final ctx = _currentKey.currentContext;
      if (ctx != null && ctx.mounted) {
        Scrollable.ensureVisible(ctx, alignment: 0.2, duration: const Duration(milliseconds: 400));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final all = advancedLessonsOf(widget.book);
    final cal = app.calendar;
    final thisWeek = cal == null ? null : currentWeek(cal, app.now());
    final termOf = <int, int>{for (final d in cal?.days ?? const []) d.week: d.term};
    final term = _term ?? (thisWeek == null ? 1 : termOf[thisWeek] ?? 1);
    final visible = [
      for (final e in all)
        if ((termOf[AppState.advancedWeek(e.$1.id)] ?? 1) == term) e,
    ];
    final current = all.where((e) => AppState.advancedWeek(e.$1.id) == thisWeek).firstOrNull;
    final conquered = all.where((e) => (app.lessonProgress(e.$1.id)?.bestStars ?? 0) > 0).length;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nâng cao · Học sinh giỏi'),
        backgroundColor: _royal,
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'advanced',
        veil: 0,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _HeroCard(conquered: conquered, total: all.length, app: app),
                  const SizedBox(height: 12),
                  const TeacherIntro(key: ValueKey('adv-intro'), lines: [TutorLines.advIntro], avatarHeight: 100),
                  if (current != null) ...[const SizedBox(height: 12), _DailyChallengeCard(lesson: current.$1)],
                  const SizedBox(height: 14),
                  SegmentedButton<int>(
                    key: const ValueKey('adv-term'),
                    style: SegmentedButton.styleFrom(
                      backgroundColor: Colors.white.withValues(alpha: 0.85),
                      selectedBackgroundColor: _gold,
                    ),
                    segments: const [
                      ButtonSegment(value: 1, label: Text('Học kì 1', style: TextStyle(fontSize: 17))),
                      ButtonSegment(value: 2, label: Text('Học kì 2', style: TextStyle(fontSize: 17))),
                    ],
                    selected: {term},
                    onSelectionChanged: (s) => setState(() => _term = s.first),
                  ),
                  const SizedBox(height: 10),
                  for (final (l, c) in visible)
                    _AdvancedWeekCard(
                      key: AppState.advancedWeek(l.id) == thisWeek ? _currentKey : ValueKey('adv-${l.id}'),
                      lesson: l,
                      chapter: c,
                      isCurrent: AppState.advancedWeek(l.id) == thisWeek,
                    ),
                  if (all.isEmpty)
                    const Padding(
                      padding: EdgeInsets.all(24),
                      child: Text(
                        'Chưa có bài nâng cao.',
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 18, color: Colors.white),
                      ),
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

class _HeroCard extends StatelessWidget {
  const _HeroCard({required this.conquered, required this.total, required this.app});

  final int conquered;
  final int total;
  final AppState app;

  @override
  Widget build(BuildContext context) {
    final badgeIds = ['adv_first', 'adv_5', 'adv_3stars'];
    return Container(
      key: const ValueKey('adv-hero'),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF5B2DB8), Color(0xFF2B1470)],
        ),
        border: Border.all(color: _gold, width: 2.5),
        boxShadow: const [BoxShadow(color: Color(0x66000000), blurRadius: 18, offset: Offset(0, 6))],
      ),
      child: Row(
        children: [
          GameIcon(UiAsset.advCrown, size: 92, fallback: const Text('👑', style: TextStyle(fontSize: 60))),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Khu Học sinh giỏi',
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white),
                ),
                Text(
                  'Đã chinh phục $conquered/$total bài nâng cao',
                  key: const ValueKey('adv-conquered'),
                  style: const TextStyle(fontSize: 15, color: Color(0xFFFFE9A8), fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 6),
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: LinearProgressIndicator(
                    value: total == 0 ? 0 : conquered / total,
                    minHeight: 10,
                    color: _gold,
                    backgroundColor: Colors.white24,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  children: [
                    for (final id in badgeIds)
                      Padding(
                        padding: const EdgeInsets.only(right: 6),
                        child: Opacity(
                          opacity: app.progress.badges.containsKey(id) ? 1 : 0.3,
                          child: Text(badgeById(id)?.emoji ?? '', style: const TextStyle(fontSize: 22)),
                        ),
                      ),
                    const Text(
                      '×2 vàng',
                      style: TextStyle(fontSize: 14, color: Colors.white70, fontWeight: FontWeight.w700),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Thử thách hôm nay: một câu nâng cao, đổi mỗi ngày.
class _DailyChallengeCard extends StatelessWidget {
  const _DailyChallengeCard({required this.lesson});

  final LessonRef lesson;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final today = app.now();
    final doneId = '${lesson.id}#ngay-${dayKeyOf(today)}';
    final done = (app.lessonProgress(doneId)?.plays ?? 0) > 0;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('adv-daily'),
        borderRadius: BorderRadius.circular(24),
        onTap: () async {
          final full = await app.content.loadLesson(lesson.src);
          if (!context.mounted) return;
          await pushScreen<void>(
            context,
            QuizScreen(
              lesson: app.dailyChallenge(full, today),
              isVip: app.isVip,
              onFinished: app.recordQuiz,
              voiceOn: app.voiceEnabled,
            ),
          );
        },
        child: Ink(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(colors: [Color(0xFFFFB800), Color(0xFFFF6A00)]),
            boxShadow: const [BoxShadow(color: Color(0x66FF8A00), blurRadius: 16, offset: Offset(0, 6))],
          ),
          child: Row(
            children: [
              GameIcon(
                UiAsset.advDaily,
                size: 70,
                fallback: const Icon(Icons.bolt_rounded, color: Colors.white, size: 50),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Thử thách hôm nay',
                      style: TextStyle(fontSize: 21, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      done ? 'Con đã chinh phục hôm nay! Mai có câu mới nhé.' : '1 câu nâng cao · thưởng ×2 vàng',
                      style: const TextStyle(fontSize: 15, color: Colors.white),
                    ),
                    Text(
                      '${ddmm(today)} · ${advancedShortTitle(lesson.title)}',
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(fontSize: 13, color: Color(0xFFFFF1CC)),
                    ),
                  ],
                ),
              ),
              Icon(done ? Icons.check_circle_rounded : Icons.play_circle_fill_rounded, color: Colors.white, size: 44),
            ],
          ),
        ),
      ),
    );
  }
}

String dayKeyOf(DateTime d) =>
    '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

class _AdvancedWeekCard extends StatelessWidget {
  const _AdvancedWeekCard({super.key, required this.lesson, required this.chapter, required this.isCurrent});

  final LessonRef lesson;
  final Chapter chapter;
  final bool isCurrent;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final week = AppState.advancedWeek(lesson.id);
    final unlocked = app.advancedUnlocked(lesson.id);
    final (done, total) = app.advancedProgress(lesson.id);
    final stars = app.lessonProgress(lesson.id)?.bestStars ?? 0;
    final days = week == null ? const [] : app.calendar?.daysOfWeek(week) ?? const [];
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Material(
        color: Colors.white.withValues(alpha: unlocked ? 0.97 : 0.88),
        elevation: isCurrent ? 6 : 2,
        shadowColor: _gold,
        borderRadius: BorderRadius.circular(22),
        child: InkWell(
          key: ValueKey('adv-open-${lesson.id}'),
          borderRadius: BorderRadius.circular(22),
          onTap: () => openAdvancedLesson(context, lesson),
          child: Container(
            padding: const EdgeInsets.fromLTRB(10, 10, 12, 10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(22),
              border: Border.all(color: isCurrent ? _gold : Colors.transparent, width: 3),
            ),
            child: Row(
              children: [
                Container(
                  width: 58,
                  padding: const EdgeInsets.symmetric(vertical: 6),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(16),
                    gradient: const LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Color(0xFF6B3FD6), _royal],
                    ),
                  ),
                  child: Column(
                    children: [
                      const Text('Tuần', style: TextStyle(fontSize: 12, color: Color(0xFFFFE9A8))),
                      Text(
                        '${week ?? ''}',
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Colors.white),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          if (isCurrent)
                            Container(
                              margin: const EdgeInsets.only(right: 6),
                              padding: const EdgeInsets.symmetric(horizontal: 7, vertical: 1),
                              decoration: BoxDecoration(color: _gold, borderRadius: BorderRadius.circular(10)),
                              child: const Text(
                                'Tuần này',
                                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Color(0xFF4A2A00)),
                              ),
                            ),
                          Flexible(
                            child: Text(
                              days.isEmpty
                                  ? 'Chủ đề ${chapter.order}'
                                  : '${ddmm(days.first.date)} – ${ddmm(days.last.date)}',
                              style: const TextStyle(fontSize: 13, color: Colors.black54),
                            ),
                          ),
                        ],
                      ),
                      Text(
                        advancedShortTitle(lesson.title),
                        style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: _royal),
                      ),
                      const SizedBox(height: 4),
                      if (unlocked)
                        Row(
                          children: [
                            for (var i = 0; i < 3; i++)
                              Opacity(
                                opacity: i < stars ? 1 : 0.25,
                                child: GameIcon(
                                  UiAsset.star,
                                  size: 20,
                                  fallback: const Icon(Icons.star_rounded, size: 20, color: _gold),
                                ),
                              ),
                          ],
                        )
                      else
                        Row(
                          children: [
                            Expanded(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(6),
                                child: LinearProgressIndicator(
                                  value: total == 0 ? 0 : done / total,
                                  minHeight: 8,
                                  color: const Color(0xFF8E5CF7),
                                  backgroundColor: const Color(0xFFEDE7FF),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              'Cơ bản $done/$total',
                              style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                unlocked
                    ? GameIcon(
                        UiAsset.advCrown,
                        size: 46,
                        fallback: const Icon(Icons.workspace_premium_rounded, color: _gold, size: 40),
                      )
                    : GameIcon(UiAsset.advLock, size: 46, fallback: const Icon(Icons.lock_rounded, color: _royal)),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Lối vào khu Nâng cao (đặt ở màn Chọn chủ đề).
class AdvancedShortcut extends StatelessWidget {
  const AdvancedShortcut({super.key, required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final all = advancedLessonsOf(book);
    if (all.isEmpty) return const SizedBox.shrink();
    final conquered = all.where((e) => (app.lessonProgress(e.$1.id)?.bestStars ?? 0) > 0).length;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('open-advanced'),
        borderRadius: BorderRadius.circular(22),
        onTap: () => pushScreen<void>(context, AdvancedScreen(book: book)),
        child: Ink(
          padding: const EdgeInsets.fromLTRB(10, 10, 14, 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(22),
            gradient: const LinearGradient(colors: [Color(0xFF5B2DB8), Color(0xFF2B1470)]),
            border: Border.all(color: _gold, width: 2),
            boxShadow: const [BoxShadow(color: Color(0x553B1E8C), blurRadius: 12, offset: Offset(0, 5))],
          ),
          child: Row(
            children: [
              GameIcon(UiAsset.advCrown, size: 56, fallback: const Text('👑', style: TextStyle(fontSize: 38))),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Nâng cao · Học sinh giỏi',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      'Mỗi tuần một bài nâng cao · $conquered/${all.length} đã chinh phục',
                      style: const TextStyle(fontSize: 14, color: Color(0xFFFFE9A8)),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right_rounded, color: Colors.white, size: 34),
            ],
          ),
        ),
      ),
    );
  }
}

/// Phần "Nâng cao" ở cuối màn một chủ đề.
class ChapterAdvancedSection extends StatelessWidget {
  const ChapterAdvancedSection({super.key, required this.chapter});

  final Chapter chapter;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    if (chapter.advancedLessons.isEmpty) return const SizedBox.shrink();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(4, 12, 4, 8),
          child: Row(
            children: [
              Text('👑 ', style: TextStyle(fontSize: 22)),
              Text(
                'Nâng cao cho học sinh giỏi',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: _royal),
              ),
            ],
          ),
        ),
        for (final l in chapter.advancedLessons)
          _AdvancedWeekCard(
            key: ValueKey('chapter-adv-${l.id}'),
            lesson: l,
            chapter: chapter,
            isCurrent: app.calendar != null && AppState.advancedWeek(l.id) == currentWeek(app.calendar!, app.now()),
          ),
      ],
    );
  }
}
