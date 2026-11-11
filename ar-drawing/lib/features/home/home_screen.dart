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
import '../lessons/lesson.dart';
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

    return Scaffold(
      backgroundColor: AppTheme.ink,
      body: Stack(
        children: <Widget>[
          SafeArea(
            bottom: false,
            child: CustomScrollView(
              slivers: <Widget>[
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 16, 12, 8),
                    child: Row(
                      children: <Widget>[
                        ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.asset(AppAssets.logo, width: 44, height: 44),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                context.tr('app.name'),
                                style: theme.textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                              Text(
                                context.tr('app.tagline'),
                                style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
                              ),
                            ],
                          ),
                        ),
                        TextButton.icon(
                          key: const Key('languageButton'),
                          onPressed: _toggleLanguage,
                          style: TextButton.styleFrom(foregroundColor: Colors.white70),
                          icon: const Icon(Icons.translate, size: 18),
                          label: Text(
                            context.language == AppLanguage.vi ? 'VI' : 'EN',
                            style: const TextStyle(fontWeight: FontWeight.w800),
                          ),
                        ),
                        IconButton(
                          key: const Key('howItWorks'),
                          tooltip: context.tr('home.howItWorks'),
                          onPressed: _showHowItWorks,
                          icon: const Icon(Icons.help_outline),
                        ),
                      ],
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                    child: _OwnPhotoCard(onTap: _traceOwnPhoto),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                    child: _BlankCanvasCard(onTap: _openBlankCanvas),
                  ),
                ),
                if (widget.exams.isNotEmpty)
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 8),
                      child: HomeTile(
                        key: const Key('examHallCard'),
                        icon: Icons.assignment,
                        title: context.tr('exam.hallCard'),
                        subtitle: context.tr('exam.hallCardHint'),
                        onTap: _openExamHall,
                      ),
                    ),
                  ),
                if (widget.lessons.isNotEmpty) ...<Widget>[
                  SliverToBoxAdapter(
                    child: Padding(
                      padding: const EdgeInsets.fromLTRB(20, 12, 8, 0),
                      child: Row(
                        children: <Widget>[
                          Expanded(
                            child: Text(
                              context.tr('lesson.section'),
                              style: theme.textTheme.titleLarge,
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
                      padding: const EdgeInsets.fromLTRB(20, 0, 20, 8),
                      child: Text(
                        context.tr('lesson.sectionHint'),
                        style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
                      ),
                    ),
                  ),
                  SliverToBoxAdapter(
                    child: SizedBox(
                      height: 236,
                      child: ListView.separated(
                        scrollDirection: Axis.horizontal,
                        padding: const EdgeInsets.symmetric(horizontal: 16),
                        itemCount: widget.lessons.length,
                        separatorBuilder: (_, _) => const SizedBox(width: 12),
                        itemBuilder: (BuildContext context, int i) => CourseCard(
                          width: 160,
                          lesson: widget.lessons[i],
                          progress: LessonProgressScope.maybeOf(context),
                          onTap: () => _openLesson(widget.lessons[i]),
                        ),
                      ),
                    ),
                  ),
                ],
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
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Color(0x33000000),
                  child: Icon(Icons.add_photo_alternate, color: Colors.white, size: 28),
                ),
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

class _BlankCanvasCard extends StatelessWidget {
  const _BlankCanvasCard({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      key: const Key('blankCanvasCard'),
      color: const Color(0xFF232838),
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 12, 12),
          child: Row(
            children: <Widget>[
              const CircleAvatar(
                radius: 20,
                backgroundColor: Color(0xFFFFF8EC),
                child: Icon(Icons.draw, color: Color(0xFFB0661B)),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      context.tr('home.blankCanvas'),
                      style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                    ),
                    Text(
                      context.tr('home.blankCanvasHint'),
                      style: const TextStyle(color: Colors.white70, fontSize: 13),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right),
            ],
          ),
        ),
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
      color: const Color(0xFF232838),
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
