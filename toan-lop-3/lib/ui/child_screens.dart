import 'package:flutter/material.dart';

import '../app_state.dart';
import '../models/content.dart';
import 'app_theme.dart';
import 'badges_screen.dart';
import 'exam_screens.dart';
import 'parent/parent_screens.dart';
import 'quiz_screen.dart';
import 'widgets/bee_mascot.dart';
import 'widgets/big_button.dart';
import 'widgets/solution_view.dart';

/// Chuyển màn hình (gom một chỗ cho dễ đổi hiệu ứng sau này).
Future<T?> pushScreen<T>(BuildContext context, Widget screen) =>
    Navigator.of(context).push<T>(MaterialPageRoute(builder: (_) => screen));

// ===========================================================================
// Chọn bộ sách (lần đầu mở app)
// ===========================================================================

class BookPickerScreen extends StatelessWidget {
  const BookPickerScreen({super.key, this.popOnPick = false});

  final bool popOnPick;

  static const _colors = [AppColors.sky, Color(0xFFFF6FB5), AppColors.good];

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: [
                const Center(child: BeeMascot(size: 130)),
                const SizedBox(height: 8),
                const Text(
                  'Con học sách nào?',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 32, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 20),
                for (final (i, book) in app.catalog.books.indexed)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: _BookCard(
                      key: ValueKey('book-${book.id}'),
                      book: book,
                      color: _colors[i % _colors.length],
                      onTap: book.chapters.isEmpty
                          ? null
                          : () async {
                              await app.selectBook(book.id);
                              if (popOnPick && context.mounted) Navigator.of(context).pop();
                            },
                    ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _BookCard extends StatelessWidget {
  const _BookCard({super.key, required this.book, required this.color, required this.onTap});

  final Book book;
  final Color color;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final enabled = onTap != null;
    return Material(
      color: enabled ? color : Colors.black12,
      borderRadius: BorderRadius.circular(24),
      elevation: enabled ? 3 : 0,
      child: InkWell(
        borderRadius: BorderRadius.circular(24),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Row(
            children: [
              Icon(Icons.menu_book_rounded, size: 56, color: enabled ? Colors.white : Colors.black38),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      book.series.displayName,
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.w700,
                        color: enabled ? Colors.white : Colors.black45,
                      ),
                    ),
                    Text(
                      enabled ? 'Toán 3' : 'Sắp có',
                      style: TextStyle(fontSize: 20, color: enabled ? Colors.white : Colors.black45),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ===========================================================================
// Trang chủ của bé
// ===========================================================================

/// Một ô lớn trên trang chủ (Phase 3/4 thêm "Thi thử", "Huy hiệu").
class HomeTile {
  const HomeTile({required this.label, required this.icon, required this.color, required this.builder});

  final String label;
  final IconData icon;
  final Color color;
  final WidgetBuilder builder;
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key, this.extraTiles = const []});

  final List<HomeTile> extraTiles;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final book = app.book!;
    final tiles = [
      HomeTile(
        label: 'Học bài',
        icon: Icons.auto_stories_rounded,
        color: AppColors.sky,
        builder: (_) => ChapterListScreen(book: book),
      ),
      HomeTile(
        label: 'Luyện thi',
        icon: Icons.assignment_rounded,
        color: AppColors.tryAgain,
        builder: (_) => ExamListScreen(book: book),
      ),
      HomeTile(
        label: 'Huy hiệu',
        icon: Icons.military_tech_rounded,
        color: const Color(0xFF8E5CF7),
        builder: (_) => const BadgesScreen(),
      ),
      ...extraTiles,
    ];
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 640),
            child: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                Row(
                  children: [
                    const BeeMascot(size: 96),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Chào ${app.progress.childName}!',
                            key: const ValueKey('home-greeting'),
                            style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w700),
                          ),
                          Text(book.series.displayName, style: const TextStyle(fontSize: 18, color: Colors.black54)),
                        ],
                      ),
                    ),
                    IconButton(
                      key: const ValueKey('btn-parent'),
                      iconSize: 34,
                      tooltip: 'Dành cho bố mẹ',
                      icon: const Icon(Icons.lock_person_rounded, color: Colors.black54),
                      onPressed: () => openParentArea(context),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: _StatChip(
                        icon: Icons.local_fire_department_rounded,
                        color: AppColors.tryAgain,
                        value: '${app.streak}',
                        label: 'ngày liên tiếp',
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: _StatChip(
                        icon: Icons.stars_rounded,
                        color: AppColors.honey,
                        value: '${app.progress.totalPoints}',
                        label: 'điểm',
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                for (final t in tiles)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 14),
                    child: _BigTile(tile: t),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.icon, required this.color, required this.value, required this.label});

  final IconData icon;
  final Color color;
  final String value;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18)),
      child: Row(
        children: [
          Icon(icon, color: color, size: 36),
          const SizedBox(width: 8),
          Flexible(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(value, style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700)),
                Text(label, style: const TextStyle(fontSize: 15, color: Colors.black54)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _BigTile extends StatelessWidget {
  const _BigTile({required this.tile});

  final HomeTile tile;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: tile.color,
      borderRadius: BorderRadius.circular(26),
      elevation: 3,
      child: InkWell(
        key: ValueKey('tile-${tile.label}'),
        borderRadius: BorderRadius.circular(26),
        onTap: () => Navigator.of(context).push(MaterialPageRoute<void>(builder: tile.builder)),
        child: SizedBox(
          height: 110,
          child: Row(
            children: [
              const SizedBox(width: 24),
              Icon(tile.icon, size: 60, color: Colors.white),
              const SizedBox(width: 20),
              Expanded(
                child: Text(
                  tile.label,
                  style: const TextStyle(fontSize: 32, fontWeight: FontWeight.w700, color: Colors.white),
                ),
              ),
              const Icon(Icons.chevron_right_rounded, size: 48, color: Colors.white),
              const SizedBox(width: 12),
            ],
          ),
        ),
      ),
    );
  }
}

// ===========================================================================
// Danh sách chủ đề → bài học
// ===========================================================================

class _StarsRow extends StatelessWidget {
  const _StarsRow({required this.stars, this.size = 26});

  final int stars;
  final double size;

  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      for (var i = 0; i < 3; i++)
        Icon(Icons.star_rounded, size: size, color: i < stars ? AppColors.honey : Colors.black12),
    ],
  );
}

class ChapterListScreen extends StatelessWidget {
  const ChapterListScreen({super.key, required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final chapters = [...book.chapters]..sort((a, b) => a.order.compareTo(b.order));
    return Scaffold(
      appBar: AppBar(title: const Text('Chọn chủ đề'), backgroundColor: AppColors.cream),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          for (final c in chapters)
            Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Material(
                color: Colors.white,
                borderRadius: BorderRadius.circular(22),
                child: InkWell(
                  key: ValueKey('chapter-${c.id}'),
                  borderRadius: BorderRadius.circular(22),
                  onTap: () => pushScreen<void>(context, ChapterScreen(chapter: c)),
                  child: Semantics(
                    button: true,
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Row(
                        children: [
                          CircleAvatar(
                            radius: 30,
                            backgroundColor: AppColors.honey,
                            child: Text(
                              '${c.order}',
                              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700, color: AppColors.ink),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(c.title, style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700)),
                                const SizedBox(height: 6),
                                Builder(
                                  builder: (context) {
                                    final (got, max) = app.chapterStars(c);
                                    // ExcludeSemantics: để cả thẻ được đọc là "nút", không phải "thanh tiến độ".
                                    return ExcludeSemantics(
                                      child: ClipRRect(
                                        borderRadius: BorderRadius.circular(8),
                                        child: LinearProgressIndicator(
                                          value: max == 0 ? 0 : got / max,
                                          minHeight: 12,
                                          color: AppColors.honey,
                                          backgroundColor: AppColors.cream,
                                        ),
                                      ),
                                    );
                                  },
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

class ChapterScreen extends StatelessWidget {
  const ChapterScreen({super.key, required this.chapter});

  final Chapter chapter;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final lessons = [...chapter.lessons]..sort((a, b) => a.order.compareTo(b.order));
    return Scaffold(
      appBar: AppBar(title: Text('Chủ đề ${chapter.order}'), backgroundColor: AppColors.cream),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(chapter.title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          for (final (i, l) in lessons.indexed)
            Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Material(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                child: InkWell(
                  key: ValueKey('lesson-${l.id}'),
                  borderRadius: BorderRadius.circular(20),
                  onTap: app.canOpen(l.access)
                      ? () => pushScreen<void>(context, LessonScreen(lessonRef: l))
                      : () => _showVipNeeded(context),
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        Text('${i + 1}.', style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700)),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(l.title, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w700)),
                              const SizedBox(height: 4),
                              _StarsRow(stars: app.lessonProgress(l.id)?.bestStars ?? 0),
                            ],
                          ),
                        ),
                        if (!app.canOpen(l.access)) const Icon(Icons.lock_rounded, color: AppColors.vip, size: 32),
                      ],
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}

void _showVipNeeded(BuildContext context) {
  ScaffoldMessenger.of(context).showSnackBar(
    const SnackBar(content: Text('Bài này dành cho VIP. Con nhờ bố mẹ mở khoá nhé!', style: TextStyle(fontSize: 18))),
  );
}

// ===========================================================================
// Một bài học: Nhớ nhanh + Luyện tập
// ===========================================================================

class LessonScreen extends StatelessWidget {
  const LessonScreen({super.key, required this.lessonRef});

  final LessonRef lessonRef;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final lp = app.lessonProgress(lessonRef.id);
    return Scaffold(
      appBar: AppBar(backgroundColor: AppColors.cream),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 560),
          child: ListView(
            padding: const EdgeInsets.all(20),
            children: [
              Text(
                lessonRef.title,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 8),
              Center(child: _StarsRow(stars: lp?.bestStars ?? 0, size: 44)),
              const SizedBox(height: 24),
              BigButton(
                key: const ValueKey('btn-theory'),
                label: 'Nhớ nhanh',
                icon: Icons.lightbulb_rounded,
                color: AppColors.tryAgain,
                onPressed: () => pushScreen<void>(context, TheoryScreen(lessonRef: lessonRef)),
              ),
              const SizedBox(height: 16),
              BigButton(
                key: const ValueKey('btn-practice'),
                label: 'Luyện tập',
                icon: Icons.edit_rounded,
                onPressed: () => pushScreen<void>(
                  context,
                  QuizScreen(
                    lessonAsset: lessonRef.src,
                    isVip: app.isVip,
                    repository: app.content,
                    onFinished: app.recordQuiz,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class TheoryScreen extends StatelessWidget {
  const TheoryScreen({super.key, required this.lessonRef});

  final LessonRef lessonRef;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return Scaffold(
      appBar: AppBar(title: const Text('Nhớ nhanh'), backgroundColor: AppColors.cream),
      body: FutureBuilder(
        future: app.content.loadLesson(lessonRef.src),
        builder: (context, snap) {
          if (snap.hasError) return Center(child: Text('${snap.error}'));
          if (!snap.hasData) return const Center(child: CircularProgressIndicator());
          final lesson = snap.data!;
          return Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 640),
              child: ListView(
                padding: const EdgeInsets.all(20),
                children: [
                  Text(lesson.title, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
                  const SizedBox(height: 16),
                  for (final b in lesson.theory.blocks)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 16),
                      child: BlockView(block: b),
                    ),
                  BigButton(
                    label: 'Luyện tập ngay',
                    icon: Icons.edit_rounded,
                    onPressed: () => Navigator.of(context).pushReplacement(
                      MaterialPageRoute<void>(
                        builder: (_) => QuizScreen(lesson: lesson, isVip: app.isVip, onFinished: app.recordQuiz),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
