import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../../core/app_assets.dart';
import '../../core/app_theme.dart';
import '../../core/i18n/app_language.dart';
import '../../core/i18n/language_controller.dart';
import '../academy/academy_screen.dart';
import '../draw/draw_mode_sheet.dart';
import '../draw/draw_screen.dart';
import '../exams/exam.dart';
import '../exams/exams_screen.dart';
import '../../core/game_art.dart';
import '../../core/widgets/art_tile.dart';
import '../game/game_status_bar.dart';
import '../game/goals.dart';
import '../game/quests_screen.dart';
import '../game/game_store.dart';
import '../game/shop_screen.dart';
import '../leaderboard/leaderboard_screen.dart';
import '../lessons/gallery_screen.dart';
import '../lessons/learning_path.dart';
import '../lessons/lesson.dart';
import '../lessons/widgets/lesson_card.dart';
import '../teacher/teacher_script.dart';
import '../lessons/lesson_progress_store.dart';
import '../sketch/sketch_screen.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import '../templates/template_catalog.dart';
import '../workspace/workspace_screen.dart';

/// Loads the photo the user wants to trace. Returns null when cancelled.
typedef PhotoPicker = Future<Uint8List?> Function();

Future<Uint8List?> _pickFromGallery() async {
  final XFile? file = await ImagePicker().pickImage(
    source: ImageSource.gallery,
    // Large enough for tracing, small enough to process quickly.
    maxWidth: 2048,
    maxHeight: 2048,
  );
  return file?.readAsBytes();
}

/// Home: "trace your own photo", category chips and the template grid.
class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    this.templates = kTemplates,
    this.lessons = const <Lesson>[],
    this.exams = const <Exam>[],
    this.pickPhoto = _pickFromGallery,
    this.workspaceBuilder,
    this.drawBuilder,
    this.lessonBuilder,
  });

  final List<DrawingTemplate> templates;
  final List<Lesson> lessons;
  final List<Exam> exams;

  /// Opens a colouring lesson in the chosen mode (overridable in tests).
  final Widget Function(Lesson lesson, DrawMode mode)? lessonBuilder;

  /// Opens the digital drawing board (overridable in tests).
  final Widget Function(ImageProvider? image)? drawBuilder;
  final PhotoPicker pickPhoto;

  /// Opens the workspace for a picture (overridable in tests).
  final Widget Function(ImageProvider image)? workspaceBuilder;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  TemplateCategory? _category;
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'home_welcome');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _openLesson(Lesson lesson) {
    _teacher.close();
    openLesson(context, lesson, builder: widget.lessonBuilder);
  }

  void _openAcademy() {
    _teacher.close();
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => AcademyScreen(lessons: widget.lessons, lessonBuilder: widget.lessonBuilder),
      ),
    );
  }

  Widget _draw(ImageProvider? image) =>
      widget.drawBuilder?.call(image) ?? DrawScreen(template: image);

  void _openExamHall() {
    _teacher.close();
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => ExamsScreen(exams: widget.exams)));
  }

  bool? _gamesWereOpen;

  /// The first finished lesson opens the games: Lumi celebrates once.
  void _celebrateUnlock(bool open) {
    final bool? before = _gamesWereOpen;
    _gamesWereOpen = open;
    if (before == false && open) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) {
          _teacher.say(const <TeacherLine>[TeacherLine(id: 'games_unlocked', mood: 'cheer')]);
        }
      });
    }
  }

  void _gamesLocked() {
    _teacher.say(const <TeacherLine>[TeacherLine(id: 'games_locked', mood: 'point')]);
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(
        SnackBar(
          key: const Key('gamesLockedSnack'),
          backgroundColor: AppTheme.cardHigh,
          content: Row(
            children: <Widget>[
              const Icon(Icons.lock_rounded, color: AppTheme.gold),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  context.tr('path.gamesLocked'),
                  style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
        ),
      );
  }

  void _openGallery() {
    _teacher.close();
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => GalleryScreen(lessons: widget.lessons)));
  }

  void _openQuests(int tab) {
    _teacher.close();
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => QuestsScreen(initialTab: tab)));
  }

  void _openShop() {
    _teacher.close();
    Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => const ShopScreen()));
  }

  void _openLeaderboard() {
    _teacher.close();
    Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => const LeaderboardScreen()));
  }

  void _openBlankCanvas() {
    _teacher.close();
    Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => _draw(null)));
  }

  void _toggleLanguage() {
    final LanguageController language = I18nScope.of(context);
    language.setLanguage(language.language == AppLanguage.vi ? AppLanguage.en : AppLanguage.vi);
  }

  Widget _workspace(ImageProvider image) =>
      widget.workspaceBuilder?.call(image) ?? WorkspaceScreen(overlayImage: image);

  Future<void> _openTemplate(DrawingTemplate template) async {
    _teacher.close();
    final DrawMode? mode = await showDrawModeSheet(context);
    if (mode == null || !mounted) return;
    final ImageProvider image = AssetImage(template.asset);
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => mode == DrawMode.camera ? _workspace(image) : _draw(image),
      ),
    );
  }

  Future<void> _traceOwnPhoto() async {
    final Uint8List? bytes = await widget.pickPhoto();
    if (bytes == null || !mounted) return;
    _teacher.close();
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => SketchScreen(
          photo: bytes,
          workspaceBuilder: widget.workspaceBuilder,
          drawBuilder: widget.drawBuilder,
        ),
      ),
    );
  }

  void _showHowItWorks() {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(context.tr('home.howItWorks'), style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 12),
            Text(context.tr('home.howItWorksBody'), style: TextStyle(height: 1.5)),
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: FilledButton(
                onPressed: () => Navigator.of(context).pop(),
                child: Text(context.tr('home.gotIt')),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final List<DrawingTemplate> visible = _category == null
        ? widget.templates
        : widget.templates.where((DrawingTemplate t) => t.category == _category).toList();
    final ThemeData theme = Theme.of(context);
    final GameStore? game = GameScope.maybeOf(context);
    final LessonProgressStore? lessonStore = LessonProgressScope.maybeOf(context);
    final Lesson? next = nextLesson(widget.lessons, lessonStore);
    final bool gamesOpen = widget.lessons.isEmpty || gamesUnlocked(lessonStore, widget.lessons);
    _celebrateUnlock(gamesOpen);

    return Scaffold(
      backgroundColor: AppTheme.ink,
      body: Stack(
        children: <Widget>[
          SafeArea(
            bottom: false,
            child: CustomScrollView(
              slivers: <Widget>[
                SliverToBoxAdapter(
                  child: _HomeHeader(
                    language: context.language == AppLanguage.vi ? 'VI' : 'EN',
                    onLanguage: _toggleLanguage,
                    onHelp: _showHowItWorks,
                    onCoins: _openShop,
                  ),
                ),
                if (widget.lessons.isNotEmpty) ...<Widget>[
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 18, 8, 0),
                      child: Row(
                        children: <Widget>[
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Text(
                                  context.tr('path.sectionTitle'),
                                  style: theme.textTheme.titleLarge?.copyWith(
                                    fontWeight: FontWeight.w900,
                                  ),
                                ),
                                const SizedBox(height: 2),
                                Text(
                                  context.tr('path.sectionHint'),
                                  style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
                                ),
                              ],
                            ),
                          ),
                          TextButton(
                            key: const Key('seeAllLessons'),
                            onPressed: _openAcademy,
                            child: Text(context.tr('academy.seeAll')),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 10, 16, 0),
                      child: Wrap(
                        spacing: 8,
                        runSpacing: 6,
                        children: <Widget>[
                          _StatChip(
                            icon: Icons.check_circle_rounded,
                            color: const Color(0xFF7CF0B4),
                            text: context.tr(
                              'path.lessonsDone',
                              args: <String, Object?>{
                                'done': lessonStore?.doneCount(widget.lessons) ?? 0,
                                'total': widget.lessons.length,
                              },
                            ),
                          ),
                          _StatChip(
                            icon: Icons.star_rounded,
                            color: const Color(0xFFFFD24A),
                            text:
                                '${lessonStore?.totalStars(widget.lessons) ?? 0}/${widget.lessons.length * 3}',
                          ),
                          _StatChip(
                            key: const Key('galleryButton'),
                            icon: Icons.photo_library_rounded,
                            color: const Color(0xFFE07AD8),
                            text: context.tr('path.gallery'),
                            onTap: _openGallery,
                          ),
                        ],
                      ),
                    ),
                  ),
                  if (next != null)
                    SliverToBoxAdapter(
                      child: Padding(
                        padding: const EdgeInsets.fromLTRB(16, 12, 16, 4),
                        child: NextLessonHero(
                          lesson: next,
                          progress: lessonStore,
                          unlockHint: !gamesOpen,
                          onTap: () => _openLesson(next),
                        ),
                      ),
                    ),
                  SliverToBoxAdapter(
                    child: SizedBox(
                      height: 252,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        padding: const EdgeInsets.fromLTRB(16, 10, 16, 6),
                        itemCount: widget.lessons.length,
                        separatorBuilder: (_, _) => const SizedBox(width: 12),
                        itemBuilder: (BuildContext context, int i) => LessonCard(
                          width: 166,
                          lesson: widget.lessons[i],
                          progress: lessonStore,
                          locked: !lessonUnlocked(widget.lessons[i], lessonStore, widget.lessons),
                          onTap: () => openIfUnlocked(
                            context,
                            widget.lessons[i],
                            widget.lessons,
                            _openLesson,
                            onLocked: () => _teacher.say(const <TeacherLine>[
                              TeacherLine(id: 'level_locked', mood: 'point'),
                            ]),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 14, 16, 12),
                    child: _OwnPhotoCard(onTap: _traceOwnPhoto),
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                  sliver: SliverGrid(
                    gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                      maxCrossAxisExtent: 260,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: 1.1,
                    ),
                    delegate: SliverChildListDelegate(<Widget>[
                      ArtTile(
                        key: const Key('blankCanvasCard'),
                        art: GameArt.tile('blank'),
                        title: context.tr('home.blankCanvas'),
                        subtitle: context.tr('home.blankCanvasHint'),
                        colors: const <Color>[Color(0xFF0E5A73), Color(0xFF1597B8)],
                        onTap: _openBlankCanvas,
                      ),
                      if (widget.exams.isNotEmpty)
                        ArtTile(
                          key: const Key('examHallCard'),
                          locked: !gamesOpen,
                          onLocked: _gamesLocked,
                          art: GameArt.tile('exam'),
                          title: context.tr('exam.hallCard'),
                          subtitle: context.tr('exam.hallCardHint'),
                          colors: const <Color>[Color(0xFF3E2483), Color(0xFF7B45D1)],
                          onTap: _openExamHall,
                        ),
                      if (game != null) ...<Widget>[
                        ArtTile(
                          key: const Key('questsCard'),
                          locked: !gamesOpen,
                          onLocked: _gamesLocked,
                          art: GameArt.tile('quests'),
                          title: context.tr('quest.title'),
                          subtitle: context.tr('quest.card'),
                          colors: const <Color>[Color(0xFF0B6B5E), Color(0xFF1DB39B)],
                          badge:
                              '${game.todaysQuests.where(game.questDone).length}/${game.todaysQuests.length}',
                          alert: game.questsToClaim > 0,
                          onTap: () => _openQuests(0),
                        ),
                        ArtTile(
                          key: const Key('badgesCard'),
                          locked: !gamesOpen,
                          onLocked: _gamesLocked,
                          art: GameArt.tile('badges'),
                          title: context.tr('badge.title'),
                          subtitle: context.tr(
                            'badge.card',
                            args: <String, Object?>{
                              'done': kAchievements.where(game.badgeUnlocked).length,
                              'total': kAchievements.length,
                            },
                          ),
                          colors: const <Color>[Color(0xFF8A3A0E), Color(0xFFE08A1E)],
                          alert: game.badgesToClaim > 0,
                          onTap: () => _openQuests(1),
                        ),
                        ArtTile(
                          key: const Key('shopCard'),
                          locked: !gamesOpen,
                          onLocked: _gamesLocked,
                          art: GameArt.tile('shop'),
                          title: context.tr('shop.title'),
                          subtitle: context.tr('shop.card'),
                          colors: const <Color>[Color(0xFF7A1B7E), Color(0xFFD23C82)],
                          alert: game.coins >= GameStore.boxPrice,
                          onTap: _openShop,
                        ),
                        ArtTile(
                          key: const Key('leaderboardCard'),
                          locked: !gamesOpen,
                          onLocked: _gamesLocked,
                          art: GameArt.tile('board'),
                          title: context.tr('board.title'),
                          subtitle: context.tr('board.card'),
                          colors: const <Color>[Color(0xFF1C3384), Color(0xFF3F74E0)],
                          onTap: _openLeaderboard,
                        ),
                      ],
                    ]),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                    child: Text(context.tr('home.templates'), style: theme.textTheme.titleLarge),
                  ),
                ),
                SliverToBoxAdapter(
                  child: SizedBox(
                    height: 44,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      children: <Widget>[
                        _CategoryChip(
                          label: context.tr('home.all'),
                          icon: Icons.apps,
                          selected: _category == null,
                          onTap: () => setState(() => _category = null),
                        ),
                        for (final TemplateCategory c in TemplateCategory.values)
                          _CategoryChip(
                            key: Key('category-${c.name}'),
                            label: context.tr(c.labelKey),
                            icon: c.icon,
                            selected: _category == c,
                            onTap: () => setState(() => _category = c),
                          ),
                      ],
                    ),
                  ),
                ),
                SliverPadding(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
                  sliver: SliverGrid(
                    gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                      maxCrossAxisExtent: 220,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: 0.78,
                    ),
                    delegate: SliverChildBuilderDelegate(
                      (BuildContext context, int i) => _TemplateCard(
                        template: visible[i],
                        onTap: () => _openTemplate(visible[i]),
                      ),
                      childCount: visible.length,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}

class _OwnPhotoCard extends StatelessWidget {
  const _OwnPhotoCard({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      key: const Key('ownPhotoCard'),
      borderRadius: BorderRadius.circular(20),
      clipBehavior: Clip.antiAlias,
      child: Ink(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: <Color>[Color(0xFFFFC56B), Color(0xFFFF9F43)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: InkWell(
          onTap: onTap,
          child: Padding(
            padding: EdgeInsets.all(18),
            child: Row(
              children: <Widget>[
                ArtImage(GameArt.tile('photo'), size: 72),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        context.tr('home.traceYourPhoto'),
                        style: TextStyle(
                          color: AppTheme.ink,
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        context.tr('home.traceYourPhotoHint'),
                        style: TextStyle(color: Color(0xCC14161F), fontSize: 13),
                      ),
                    ],
                  ),
                ),
                Icon(Icons.chevron_right, color: AppTheme.ink),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip({
    super.key,
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        avatar: Icon(icon, size: 18),
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
        showCheckmark: false,
      ),
    );
  }
}

class _TemplateCard extends StatelessWidget {
  const _TemplateCard({required this.template, required this.onTap});

  final DrawingTemplate template;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Material(
      key: Key('template-${template.id}'),
      color: const Color(0xFFF7F3EA),
      borderRadius: BorderRadius.circular(18),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Expanded(
              child: Stack(
                children: <Widget>[
                  Positioned.fill(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Image.asset(
                        template.asset,
                        fit: BoxFit.contain,
                        cacheWidth: 400,
                        semanticLabel: context.tr(template.nameKey),
                      ),
                    ),
                  ),
                  if (template.premium)
                    Positioned(
                      top: 8,
                      right: 8,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: colors.primary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Padding(
                          padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          child: Text(
                            context.tr('home.pro'),
                            style: TextStyle(
                              color: AppTheme.ink,
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Container(
              color: Colors.white,
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Text(
                      context.tr(template.nameKey),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: AppTheme.ink, fontWeight: FontWeight.w700),
                    ),
                  ),
                  _DifficultyDots(difficulty: template.difficulty),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DifficultyDots extends StatelessWidget {
  const _DifficultyDots({required this.difficulty});

  final Difficulty difficulty;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: context.tr(difficulty.labelKey),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          for (int i = 1; i <= 3; i++)
            Container(
              width: 7,
              height: 7,
              margin: const EdgeInsets.only(left: 3),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: i <= difficulty.level ? const Color(0xFFFF9F43) : const Color(0x3314161F),
              ),
            ),
        ],
      ),
    );
  }
}

/// Compact dark tile for a home destination.
class HomeTile extends StatelessWidget {
  const HomeTile({
    super.key,
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.onTap,
    this.trailing,
  });

  final IconData icon;
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final Widget? trailing;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppTheme.card,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 12, 12),
          child: Row(
            children: <Widget>[
              CircleAvatar(
                radius: 20,
                backgroundColor: const Color(0xFFFFF8EC),
                child: Icon(icon, color: const Color(0xFFB0661B)),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(title, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                    Text(subtitle, style: const TextStyle(color: Colors.white70, fontSize: 13)),
                  ],
                ),
              ),
              trailing ?? const Icon(Icons.chevron_right),
            ],
          ),
        ),
      ),
    );
  }
}

/// Banner of a cosy night-time art studio with the app name, language and
/// help buttons, and the game status row (streak, energy, coins).
class _HomeHeader extends StatelessWidget {
  const _HomeHeader({
    required this.language,
    required this.onLanguage,
    required this.onHelp,
    required this.onCoins,
  });

  final String language;
  final VoidCallback onLanguage;
  final VoidCallback onHelp;
  final VoidCallback onCoins;

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return SizedBox(
      height: 220,
      child: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          ClipRRect(
            borderRadius: const BorderRadius.vertical(bottom: Radius.circular(28)),
            child: Image.asset(
              GameArt.banner,
              fit: BoxFit.cover,
              alignment: const Alignment(0, -0.2),
              errorBuilder: (_, _, _) => const ColoredBox(color: AppTheme.card),
            ),
          ),
          const DecoratedBox(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.vertical(bottom: Radius.circular(28)),
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: <Color>[Color(0x9914122E), Color(0x2214122E), Color(0xF014122E)],
                stops: <double>[0, 0.45, 1],
              ),
            ),
          ),
          Positioned(
            left: 16,
            right: 8,
            top: 12,
            child: Row(
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: const <BoxShadow>[
                      BoxShadow(color: Color(0x66000000), blurRadius: 10),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(14),
                    child: Image.asset(AppAssets.logo, width: 46, height: 46),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        context.tr('app.name'),
                        style: theme.textTheme.headlineSmall?.copyWith(
                          color: Colors.white,
                          shadows: const <Shadow>[Shadow(color: Color(0x99000000), blurRadius: 8)],
                        ),
                      ),
                      Text(
                        context.tr('app.tagline'),
                        maxLines: 2,
                        style: theme.textTheme.bodySmall?.copyWith(
                          color: Colors.white,
                          shadows: const <Shadow>[Shadow(color: Color(0x99000000), blurRadius: 6)],
                        ),
                      ),
                    ],
                  ),
                ),
                TextButton.icon(
                  key: const Key('languageButton'),
                  onPressed: onLanguage,
                  style: TextButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: const Color(0x55000000),
                  ),
                  icon: const Icon(Icons.translate, size: 18),
                  label: Text(language, style: const TextStyle(fontWeight: FontWeight.w800)),
                ),
                IconButton(
                  key: const Key('howItWorks'),
                  tooltip: context.tr('home.howItWorks'),
                  onPressed: onHelp,
                  color: Colors.white,
                  icon: const Icon(Icons.help_outline),
                ),
              ],
            ),
          ),
          Positioned(left: 16, right: 16, bottom: 12, child: GameStatusBar(onCoins: onCoins)),
        ],
      ),
    );
  }
}

/// Small stat pill in the lessons section (lessons done, stars, gallery).
class _StatChip extends StatelessWidget {
  const _StatChip({
    super.key,
    required this.icon,
    required this.color,
    required this.text,
    this.onTap,
  });

  final IconData icon;
  final Color color;
  final String text;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: AppTheme.card,
      shape: const StadiumBorder(side: BorderSide(color: AppTheme.line)),
      child: InkWell(
        customBorder: const StadiumBorder(),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 6, 12, 6),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Icon(icon, size: 18, color: color),
              const SizedBox(width: 6),
              Text(text, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13)),
              if (onTap != null) ...<Widget>[
                const SizedBox(width: 2),
                const Icon(Icons.chevron_right, size: 16, color: Colors.white54),
              ],
            ],
          ),
        ),
      ),
    );
  }
}
