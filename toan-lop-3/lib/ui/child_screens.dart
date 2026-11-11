import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/tutor.dart';
import '../models/content.dart';
import 'app_theme.dart';
import 'board_lesson_screen.dart';
import 'ability_screens.dart';
import 'badges_screen.dart';
import 'shop_screen.dart';
import 'leaderboard_screen.dart';
import 'widgets/game_widgets.dart';
import '../logic/economy.dart';
import '../logic/missions.dart';
import 'widgets/game_art.dart';
import '../tutor/teacher_avatar.dart';
import 'exam_screens.dart';
import 'parent/parent_screens.dart';
import 'quiz_screen.dart';
import 'widgets/bee_mascot.dart';
import 'widgets/big_button.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import '../tutor/teacher_intro.dart';
import 'calendar_screen.dart';
import 'advanced_screens.dart';
import 'review_game_screen.dart';
import 'teacher_class_screen.dart';

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

/// Một ô lớn trên trang chủ.
class HomeTile {
  const HomeTile({
    required this.label,
    required this.icon,
    required this.color,
    required this.builder,
    this.art,
    this.subtitle,
  });

  final String label;
  final IconData icon;
  final Color color;
  final WidgetBuilder builder;

  /// Ảnh 3D (Kie.ai) thay cho [icon] nếu có.
  final UiAsset? art;
  final String? subtitle;
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, this.extraTiles = const []});

  final List<HomeTile> extraTiles;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _teacher = TeacherController(voiceEnabled: false);

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      // Nạp sẵn mọi khung hình cô giáo để khi nói (đổi khung) không bị nháy.
      TeacherAssets.instance.precache(context);
      final app = AppScope.read(context);
      app.refreshHearts();
      // Chuẩn bị sẵn câu hỏi gameshow năng lực ở chế độ nền → bấm vào là chơi ngay.
      app.warmUpAbilityBank();
      // Mở app là cô chào bằng giọng nói ngay (không cần bấm loa).
      _teacher.voiceEnabled = app.voiceEnabled;
      abilityChapterBuilder = (c) => ChapterScreen(chapter: c);
      _teacher.say([
        TutorLines.greeting,
        if (app.abilityResults.isEmpty)
          TutorLines.abilityInvite
        else if (app.missions.claimable > 0)
          TutorLines.missionReady,
      ]);
      if (!app.greetedToday) app.markGreeted();
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final book = app.book!;
    final tiles = [
      HomeTile(
        label: 'Học bài',
        subtitle: 'Bài giảng & luyện tập',
        icon: Icons.auto_stories_rounded,
        color: AppColors.sky,
        art: UiAsset.tileLesson,
        builder: (_) => ChapterListScreen(book: book),
      ),
      HomeTile(
        label: 'Luyện thi',
        subtitle: 'Đề giữa kì, cuối kì',
        icon: Icons.assignment_rounded,
        color: AppColors.tryAgain,
        art: UiAsset.tileExam,
        builder: (_) => ExamListScreen(book: book),
      ),
      HomeTile(
        label: 'Bảng xếp hạng',
        subtitle: 'Thi đua cả tuần',
        icon: Icons.leaderboard_rounded,
        color: AppColors.good,
        art: UiAsset.tileRank,
        builder: (_) => const LeaderboardScreen(),
      ),
      HomeTile(
        label: 'Cửa hàng',
        subtitle: 'Thú cưng & trang phục',
        icon: Icons.storefront_rounded,
        color: const Color(0xFFFF6FB5),
        art: UiAsset.tileShop,
        builder: (_) => const ShopScreen(),
      ),
      HomeTile(
        label: 'Huy hiệu',
        subtitle: 'Bộ sưu tập thành tích',
        icon: Icons.military_tech_rounded,
        color: AppColors.vip,
        art: UiAsset.tileBadge,
        builder: (_) => const BadgesScreen(),
      ),
      HomeTile(
        label: 'Nâng cao',
        subtitle: 'Học sinh giỏi · ×2 vàng',
        icon: Icons.workspace_premium_rounded,
        color: const Color(0xFF5B2DB8),
        art: UiAsset.advCrown,
        builder: (_) => AdvancedScreen(book: book),
      ),
      ...widget.extraTiles,
    ];
    return Scaffold(
      body: ScreenBackground(
        name: 'home',
        child: SafeArea(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 680),
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(16, 12, 16, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _HomeTopBar(app: app),
                    const SizedBox(height: 12),
                    _GlassCard(
                      padding: const EdgeInsets.fromLTRB(8, 8, 12, 12),
                      child: TeacherHud(key: const ValueKey('home-tutor'), controller: _teacher, avatarHeight: 170),
                    ),
                    const SizedBox(height: 12),
                    AbilityHomeCard(app: app),
                    const SizedBox(height: 12),
                    _DailyCard(app: app),
                    const SizedBox(height: 12),
                    _MissionsCard(app: app, teacher: _teacher),
                    const SizedBox(height: 12),
                    RankCard(rank: app.rank),
                    const SizedBox(height: 16),
                    LayoutBuilder(
                      builder: (context, c) {
                        final cols = c.maxWidth >= 420 ? 2 : 1;
                        const gap = 12.0;
                        final w = (c.maxWidth - gap * (cols - 1)) / cols;
                        return Wrap(
                          spacing: gap,
                          runSpacing: gap,
                          children: [
                            for (final t in tiles)
                              SizedBox(
                                width: w,
                                child: _BigTile(tile: t),
                              ),
                          ],
                        );
                      },
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Thẻ kính mờ trắng bo tròn, dùng chung cho trang chủ.
class _GlassCard extends StatelessWidget {
  const _GlassCard({required this.child, this.padding = const EdgeInsets.all(14), super.key});

  final Widget child;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) => Container(
    padding: padding,
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.86),
      borderRadius: BorderRadius.circular(24),
      border: Border.all(color: Colors.white, width: 2),
      boxShadow: const [BoxShadow(color: Color(0x1A3A2A80), blurRadius: 18, offset: Offset(0, 6))],
    ),
    child: child,
  );
}

/// Thanh trên cùng: lời chào, vàng, điểm, nút phụ huynh.
class _HomeTopBar extends StatelessWidget {
  const _HomeTopBar({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final p = app.progress;
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Chào ${p.childName}!',
                key: const ValueKey('home-greeting'),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFF2B2160),
                  shadows: [Shadow(color: Colors.white, blurRadius: 8)],
                ),
              ),
              Text(
                app.book!.series.displayName,
                style: const TextStyle(fontSize: 16, color: Color(0xFF4A3F86), fontWeight: FontWeight.w600),
              ),
            ],
          ),
        ),
        _Pill(
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              GameIcon(UiAsset.coin, size: 26, fallback: const Text('🪙', style: TextStyle(fontSize: 18))),
              const SizedBox(width: 4),
              Text('${p.coins}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            ],
          ),
        ),
        const SizedBox(width: 6),
        _Pill(
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              GameIcon(UiAsset.star, size: 24, fallback: const Text('⭐', style: TextStyle(fontSize: 18))),
              const SizedBox(width: 4),
              Text('${p.totalPoints}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            ],
          ),
        ),
        IconButton(
          key: const ValueKey('btn-parent'),
          iconSize: 30,
          tooltip: 'Dành cho bố mẹ',
          icon: const Icon(Icons.lock_person_rounded, color: Color(0xFF4A3F86)),
          onPressed: () => openParentArea(context),
        ),
      ],
    );
  }
}

class _Pill extends StatelessWidget {
  const _Pill({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.92),
      borderRadius: BorderRadius.circular(30),
      border: Border.all(color: const Color(0xFFFFD66B), width: 2),
      boxShadow: const [BoxShadow(color: Color(0x22000000), blurRadius: 6, offset: Offset(0, 2))],
    ),
    child: child,
  );
}

/// Thẻ "hôm nay": ngọn lửa chuỗi ngày, tim.
class _DailyCard extends StatelessWidget {
  const _DailyCard({required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final p = app.progress;
    final streak = app.streak;
    final active = p.activeOn(app.now());
    final hint = active
        ? 'Hôm nay con đã học rồi, lửa đang cháy!'
        : streak > 0
        ? 'Học một bài hôm nay để giữ lửa nhé!'
        : 'Học một bài hôm nay để nhóm lửa nào!';
    return _GlassCard(
      key: const ValueKey('daily-card'),
      child: Row(
        children: [
          StreakFlame(streak: streak, activeToday: active),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$streak ngày liên tiếp',
                  key: const ValueKey('streak-text'),
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                ),
                Text(hint, style: const TextStyle(fontSize: 15, color: Colors.black54)),
                if (freezeAvailableThisWeek(p, app.now()) && streak > 0)
                  const Text(
                    '🧊 Tuần này còn 1 lượt giữ lửa nếu con lỡ nghỉ 1 ngày',
                    style: TextStyle(fontSize: 13, color: AppColors.sky),
                  ),
              ],
            ),
          ),
          HeartsBar(hearts: p.hearts, size: 18),
        ],
      ),
    );
  }
}

/// Nhiệm vụ hằng ngày: 3 nhiệm vụ + rương báu.
class _MissionsCard extends StatelessWidget {
  const _MissionsCard({required this.app, required this.teacher});

  final AppState app;
  final TeacherController teacher;

  Future<void> _openChest(BuildContext context) async {
    final (coins, shards) = await app.openMissionChest();
    if (coins == 0 || !context.mounted) return;
    teacher.say(const [TutorLines.chestOpened], mood: TeacherMood.clap);
    await showDialog<void>(
      context: context,
      builder: (_) => AlertDialog(
        backgroundColor: const Color(0xFFFFFBF0),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            GameIcon(UiAsset.chestOpen, size: 170, fallback: const Text('🎁', style: TextStyle(fontSize: 90))),
            const Text('Rương báu đã mở!', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800)),
            const SizedBox(height: 8),
            Text('+$coins vàng  •  +$shards mảnh ghép', style: const TextStyle(fontSize: 20)),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Tuyệt vời!', style: TextStyle(fontSize: 20)),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final m = app.missions;
    final done = Missions.all.where(m.isClaimed).length;
    return _GlassCard(
      key: const ValueKey('missions-card'),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              GameIcon(UiAsset.tileMission, size: 34, fallback: const Icon(Icons.flag_rounded, color: AppColors.sky)),
              const SizedBox(width: 8),
              const Expanded(
                child: Text('Nhiệm vụ hôm nay', style: TextStyle(fontSize: 21, fontWeight: FontWeight.w800)),
              ),
              Text('$done/${Missions.all.length}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700)),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                child: Column(
                  children: [for (final def in Missions.all) _MissionRow(app: app, def: def)],
                ),
              ),
              const SizedBox(width: 6),
              Semantics(
                button: true,
                label: m.chestReady ? 'Mở rương báu' : 'Rương báu',
                child: GestureDetector(
                  key: const ValueKey('mission-chest'),
                  onTap: m.chestReady ? () => _openChest(context) : null,
                  child: _ChestView(ready: m.chestReady, opened: m.chestOpened),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _MissionRow extends StatelessWidget {
  const _MissionRow({required this.app, required this.def});

  final AppState app;
  final MissionDef def;

  @override
  Widget build(BuildContext context) {
    final m = app.missions;
    final got = m.progressOf(def);
    final done = m.isDone(def);
    final claimed = m.isClaimed(def);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  def.title,
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w700,
                    decoration: claimed ? TextDecoration.lineThrough : null,
                    color: claimed ? Colors.black38 : AppColors.ink,
                  ),
                ),
                const SizedBox(height: 3),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: LinearProgressIndicator(
                    value: got / def.goal,
                    minHeight: 9,
                    color: done ? AppColors.good : AppColors.honey,
                    backgroundColor: const Color(0xFFEDE7FF),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          SizedBox(
            width: 84,
            child: claimed
                ? const Icon(Icons.check_circle_rounded, color: AppColors.good, size: 30)
                : FilledButton(
                    key: ValueKey('mission-${def.id}'),
                    style: FilledButton.styleFrom(
                      backgroundColor: done ? const Color(0xFFFFB800) : const Color(0xFFE7E3F3),
                      foregroundColor: done ? const Color(0xFF4A2A00) : Colors.black45,
                      padding: const EdgeInsets.symmetric(horizontal: 6),
                      minimumSize: const Size(84, 36),
                    ),
                    onPressed: done ? () => app.claimMission(def.id) : null,
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text('+${def.coins}', style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800)),
                        GameIcon(UiAsset.coin, size: 20, fallback: const Text('🪙')),
                      ],
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}

/// Rương: đóng (mờ khi chưa đủ nhiệm vụ), rung nhẹ khi mở được, mở khi đã nhận.
class _ChestView extends StatefulWidget {
  const _ChestView({required this.ready, required this.opened});

  final bool ready;
  final bool opened;

  @override
  State<_ChestView> createState() => _ChestViewState();
}

class _ChestViewState extends State<_ChestView> with SingleTickerProviderStateMixin {
  late final _wiggle = AnimationController(vsync: this, duration: const Duration(milliseconds: 900));

  @override
  void initState() {
    super.initState();
    _sync();
  }

  @override
  void didUpdateWidget(_ChestView old) {
    super.didUpdateWidget(old);
    _sync();
  }

  void _sync() {
    final motion = TeacherAvatar.motionEnabled;
    if (widget.ready && motion) {
      _wiggle.repeat(count: 30);
    } else {
      _wiggle.stop();
    }
  }

  @override
  void dispose() {
    _wiggle.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final img = GameIcon(
      widget.opened ? UiAsset.chestOpen : UiAsset.chestClosed,
      size: 92,
      fallback: Text(widget.opened ? '🎉' : '🎁', style: const TextStyle(fontSize: 54)),
    );
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        AnimatedBuilder(
          animation: _wiggle,
          builder: (_, child) {
            final t = _wiggle.value;
            final angle = widget.ready ? 0.08 * sin(t * pi * 4) * (t < 0.5 ? 1 : 0) : 0.0;
            return Transform.rotate(angle: angle, child: child);
          },
          child: Opacity(opacity: widget.ready || widget.opened ? 1 : 0.55, child: img),
        ),
        Text(
          widget.opened
              ? 'Đã mở'
              : widget.ready
              ? 'Chạm mở!'
              : '+${Missions.chestCoins} vàng',
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w800,
            color: widget.ready ? const Color(0xFFE07A00) : Colors.black45,
          ),
        ),
      ],
    );
  }
}

class _BigTile extends StatelessWidget {
  const _BigTile({required this.tile});

  final HomeTile tile;

  @override
  Widget build(BuildContext context) {
    final c = tile.color;
    final light = Color.lerp(c, Colors.white, 0.28)!;
    final dark = Color.lerp(c, Colors.black, 0.18)!;
    return Container(
      height: 132,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26),
        gradient: LinearGradient(begin: Alignment.topLeft, end: Alignment.bottomRight, colors: [light, c, dark]),
        border: Border.all(color: Colors.white.withValues(alpha: 0.7), width: 2),
        boxShadow: [BoxShadow(color: c.withValues(alpha: 0.45), blurRadius: 14, offset: const Offset(0, 6))],
      ),
      child: Material(
        type: MaterialType.transparency,
        child: InkWell(
          key: ValueKey('tile-${tile.label}'),
          borderRadius: BorderRadius.circular(26),
          onTap: () => Navigator.of(context).push(MaterialPageRoute<void>(builder: tile.builder)),
          child: Stack(
            children: [
              // Vệt bóng kính phía trên
              Positioned(
                left: 10,
                right: 10,
                top: 6,
                height: 40,
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [Colors.white.withValues(alpha: 0.35), Colors.white.withValues(alpha: 0)],
                    ),
                  ),
                ),
              ),
              Row(
                children: [
                  const SizedBox(width: 10),
                  tile.art == null
                      ? SizedBox(width: 100, child: Icon(tile.icon, size: 62, color: Colors.white))
                      : GameIcon(tile.art!, size: 104, fallback: Icon(tile.icon, size: 62, color: Colors.white)),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.centerLeft,
                          child: Text(
                            tile.label,
                            maxLines: 1,
                            style: const TextStyle(
                              fontSize: 27,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              shadows: [Shadow(color: Color(0x55000000), blurRadius: 4, offset: Offset(0, 2))],
                            ),
                          ),
                        ),
                        if (tile.subtitle != null)
                          Text(
                            tile.subtitle!,
                            maxLines: 2,
                            style: TextStyle(fontSize: 14, color: Colors.white.withValues(alpha: 0.92)),
                          ),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right_rounded, size: 36, color: Colors.white),
                  const SizedBox(width: 6),
                ],
              ),
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
        Opacity(
          opacity: i < stars ? 1 : 0.25,
          child: GameIcon(
            UiAsset.star,
            size: size,
            fallback: Icon(Icons.star_rounded, size: size, color: AppColors.honey),
          ),
        ),
    ],
  );
}

/// Màu riêng cho từng chủ đề (lặp lại theo vòng).
const _chapterColors = [
  Color(0xFF3A86FF),
  Color(0xFFFF6FB5),
  Color(0xFF2EB872),
  Color(0xFFFF9F43),
  Color(0xFF8E5CF7),
  Color(0xFF00B8D9),
  Color(0xFFE5486B),
  Color(0xFF4CAF50),
];

Color chapterColor(int order) => _chapterColors[(order - 1) % _chapterColors.length];

class ChapterListScreen extends StatelessWidget {
  const ChapterListScreen({super.key, required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final chapters = [...book.chapters]..sort((a, b) => a.order.compareTo(b.order));
    final terms = <int, List<Chapter>>{};
    for (final c in chapters) {
      terms.putIfAbsent(c.volume ?? 1, () => []).add(c);
    }
    return Scaffold(
      appBar: AppBar(title: const Text('Chọn chủ đề'), backgroundColor: AppColors.cream),
      body: ScreenBackground(
        name: 'home',
        veil: 0.55,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 720),
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  const TeacherIntro(
                    key: ValueKey('chapters-intro'),
                    lines: [TutorLines.screenChapters],
                    avatarHeight: 96,
                  ),
                  const SizedBox(height: 12),
                  _CalendarShortcut(book: book),
                  const SizedBox(height: 10),
                  AdvancedShortcut(book: book),
                  for (final MapEntry(key: term, value: list) in terms.entries) ...[
                    Padding(
                      padding: const EdgeInsets.fromLTRB(4, 18, 4, 8),
                      child: Text(
                        term == 1 ? 'Học kì 1 · Tập một' : 'Học kì 2 · Tập hai',
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Color(0xFF2B2160)),
                      ),
                    ),
                    for (final c in list)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 14),
                        child: _ChapterCard(chapter: c),
                      ),
                  ],
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// Lối tắt sang lịch học từng ngày.
class _CalendarShortcut extends StatelessWidget {
  const _CalendarShortcut({required this.book});

  final Book book;

  @override
  Widget build(BuildContext context) {
    final cal = AppScope.of(context).calendar;
    if (cal == null) return const SizedBox.shrink();
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('open-calendar'),
        borderRadius: BorderRadius.circular(22),
        onTap: () => pushScreen<void>(context, CalendarScreen(book: book)),
        child: Ink(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(22),
            gradient: const LinearGradient(colors: [Color(0xFF6A5CFF), Color(0xFF9B6BFF)]),
            boxShadow: const [BoxShadow(color: Color(0x406A5CFF), blurRadius: 12, offset: Offset(0, 5))],
          ),
          child: Row(
            children: [
              const Icon(Icons.calendar_month_rounded, color: Colors.white, size: 40),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Lịch học từng ngày',
                      style: TextStyle(fontSize: 21, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      'Cả năm học: ${cal.weekCount} tuần, ${cal.days.length} tiết Toán',
                      style: const TextStyle(fontSize: 15, color: Colors.white),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right_rounded, color: Colors.white, size: 36),
            ],
          ),
        ),
      ),
    );
  }
}

class _ChapterCard extends StatelessWidget {
  const _ChapterCard({required this.chapter});

  final Chapter chapter;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final c = chapter;
    final color = chapterColor(c.order);
    final cover = TeacherAssets.instance.chapter(c.order);
    final (got, max) = app.chapterStars(c);
    final done = c.lessons.where((l) => (app.lessonProgress(l.id)?.bestStars ?? 0) > 0).length;
    return Material(
      color: Colors.white,
      elevation: 3,
      shadowColor: color.withValues(alpha: 0.4),
      borderRadius: BorderRadius.circular(24),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        key: ValueKey('chapter-${c.id}'),
        onTap: () => pushScreen<void>(context, ChapterScreen(chapter: c)),
        child: Semantics(
          button: true,
          label: '${c.order}\n${c.title}',
          excludeSemantics: true,
          child: SizedBox(
            height: 128,
            child: Stack(
              children: [
                if (cover != null)
                  Positioned.fill(
                    left: 110,
                    child: Image.asset(
                      cover,
                      fit: BoxFit.cover,
                      alignment: Alignment.centerRight,
                      errorBuilder: (_, _, _) => const SizedBox(),
                    ),
                  ),
                // Lớp chuyển màu: trái đặc (để chữ rõ) → phải trong (thấy tranh).
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        stops: const [0, 0.5, 1],
                        colors: [
                          Colors.white,
                          Colors.white.withValues(alpha: 0.9),
                          Colors.white.withValues(alpha: 0.05),
                        ],
                      ),
                    ),
                  ),
                ),
                Positioned(left: 0, top: 0, bottom: 0, width: 8, child: ColoredBox(color: color)),
                Padding(
                  padding: const EdgeInsets.fromLTRB(22, 12, 12, 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                        decoration: BoxDecoration(color: color, borderRadius: BorderRadius.circular(12)),
                        child: Text(
                          'Chủ đề ${c.order}',
                          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Colors.white),
                        ),
                      ),
                      const SizedBox(height: 4),
                      SizedBox(
                        width: 250,
                        child: Text(
                          c.title,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, height: 1.15),
                        ),
                      ),
                      const Spacer(),
                      SizedBox(
                        width: 230,
                        child: Row(
                          children: [
                            Expanded(
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(8),
                                child: LinearProgressIndicator(
                                  value: max == 0 ? 0 : got / max,
                                  minHeight: 10,
                                  color: AppColors.honey,
                                  backgroundColor: const Color(0xFFEDE7FF),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              '$done/${c.lessons.length} bài',
                              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
                            ),
                          ],
                        ),
                      ),
                    ],
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

class ChapterScreen extends StatelessWidget {
  const ChapterScreen({super.key, required this.chapter});

  final Chapter chapter;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final lessons = [...chapter.lessons]..sort((a, b) => a.order.compareTo(b.order));
    final color = chapterColor(chapter.order);
    final cover = TeacherAssets.instance.chapter(chapter.order);
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            pinned: true,
            expandedHeight: cover == null ? 120 : 220,
            backgroundColor: color,
            foregroundColor: Colors.white,
            title: Text('Chủ đề ${chapter.order}'),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  if (cover != null) Image.asset(cover, fit: BoxFit.cover, errorBuilder: (_, _, _) => const SizedBox()),
                  DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [color.withValues(alpha: 0.35), color.withValues(alpha: 0.85)],
                      ),
                    ),
                  ),
                  Align(
                    alignment: Alignment.bottomLeft,
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 14),
                      child: Text(
                        chapter.title,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                          shadows: [Shadow(color: Color(0x66000000), blurRadius: 6)],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          SliverPadding(
            padding: const EdgeInsets.all(16),
            sliver: SliverList.list(
              children: [
                Padding(
                  padding: const EdgeInsets.only(bottom: 14),
                  child: ReviewGameCard(chapter: chapter),
                ),
                for (final (i, l) in lessons.indexed)
                  Padding(
                    padding: const EdgeInsets.only(bottom: 12),
                    child: _LessonCard(
                      lesson: l,
                      index: i + 1,
                      color: color,
                      stars: app.lessonProgress(l.id)?.bestStars ?? 0,
                      locked: !app.canOpen(l.access),
                    ),
                  ),
                ChapterAdvancedSection(chapter: chapter),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _LessonCard extends StatelessWidget {
  const _LessonCard({
    required this.lesson,
    required this.index,
    required this.color,
    required this.stars,
    required this.locked,
  });

  final LessonRef lesson;
  final int index;
  final Color color;
  final int stars;
  final bool locked;

  @override
  Widget build(BuildContext context) {
    final done = stars > 0;
    return Material(
      color: Colors.white,
      elevation: 2,
      shadowColor: color.withValues(alpha: 0.3),
      borderRadius: BorderRadius.circular(20),
      child: InkWell(
        key: ValueKey('lesson-${lesson.id}'),
        borderRadius: BorderRadius.circular(20),
        onTap: locked
            ? () => _showVipNeeded(context)
            : () => pushScreen<void>(context, LessonScreen(lessonRef: lesson)),
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Row(
            children: [
              Container(
                width: 52,
                height: 52,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  gradient: LinearGradient(
                    colors: done
                        ? const [Color(0xFFFFD66B), Color(0xFFFFB800)]
                        : [Color.lerp(color, Colors.white, 0.3)!, color],
                  ),
                ),
                child: done
                    ? const Icon(Icons.check_rounded, color: Colors.white, size: 32)
                    : Text(
                        '$index',
                        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Colors.white),
                      ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(lesson.title, style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
                    const SizedBox(height: 4),
                    _StarsRow(stars: stars, size: 22),
                  ],
                ),
              ),
              if (locked)
                const Icon(Icons.lock_rounded, color: AppColors.vip, size: 30)
              else
                Icon(Icons.play_circle_fill_rounded, color: color, size: 40),
            ],
          ),
        ),
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
      body: ScreenBackground(
        name: 'lesson',
        veil: 0.2,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: [
                Text(
                  lessonRef.title,
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w800),
                ),
                const SizedBox(height: 8),
                Center(child: _StarsRow(stars: lp?.bestStars ?? 0, size: 44)),
                const SizedBox(height: 10),
                LessonIllustration(
                  lessonId: lessonRef.id,
                  chapterOrder: int.tryParse(RegExp(r'\.c(\d+)\.').firstMatch(lessonRef.id)?[1] ?? ''),
                  height: 170,
                ),
                const SizedBox(height: 16),
                TeacherIntro(
                  key: const ValueKey('lesson-intro'),
                  lines: [TutorLines.lessonIntro(lessonRef.title)],
                  avatarHeight: 120,
                ),
                const SizedBox(height: 20),
                BigButton(
                  key: const ValueKey('btn-board'),
                  label: 'Video bài giảng',
                  icon: Icons.smart_display_rounded,
                  color: const Color(0xFF1E4D38),
                  onPressed: () => pushScreen<void>(context, BoardLessonScreen(lessonRef: lessonRef)),
                ),
                const SizedBox(height: 16),
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
                      voiceOn: app.voiceEnabled,
                    ),
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

/// Nhớ nhanh: cô giáo tự giảng, làm mẫu từng bước, đọc bí quyết & mẹo.
class TheoryScreen extends StatelessWidget {
  const TheoryScreen({super.key, required this.lessonRef});

  final LessonRef lessonRef;

  @override
  Widget build(BuildContext context) => TeacherClassScreen(lessonRef: lessonRef);
}
