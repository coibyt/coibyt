import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/board_script.dart';
import '../logic/tips.dart';
import '../models/blocks.dart';
import '../models/content.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_demo.dart';
import '../tutor/teacher_hud.dart';
import 'app_theme.dart';
import 'quiz_screen.dart';
import 'teacher_class_screen.dart';
import 'widgets/big_button.dart';
import 'widgets/chalk.dart';
import 'widgets/game_art.dart';
import 'widgets/real_example_view.dart';

const _weekdays = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];

/// "Thứ Tư, ngày 11 tháng 11 năm 2026" — như cô ghi đầu bảng.
String boardDate(DateTime d) => '${_weekdays[d.weekday - 1]}, ngày ${d.day} tháng ${d.month} năm ${d.year}';

/// Video bài giảng: cô viết bài lên bảng bằng bút phấn, vẽ hình, thuyết minh và hỏi;
/// hết mỗi phần thì cô lau bảng rồi giảng tiếp. Mở ra là chạy, có tạm dừng / xem lại như video.
class BoardLessonScreen extends StatefulWidget {
  const BoardLessonScreen({super.key, required this.lessonRef});

  final LessonRef lessonRef;

  @override
  State<BoardLessonScreen> createState() => _BoardLessonScreenState();
}

class _BoardLessonScreenState extends State<BoardLessonScreen> with SingleTickerProviderStateMixin {
  Future<Lesson>? _lesson;
  List<RealExample> _examples = const [];
  final _teacher = TeacherController(voiceEnabled: false);
  late final AnimationController _erase = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 2200),
  );
  BoardScript? _script;
  DemoPlayer? _player;
  List<Tip> _tips = const [];
  List<ContentBlock> _blocks = const [];
  int? _erasingScene;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _lesson ??= () async {
      final (lesson, examples) = await (
        AppScope.read(context).content.loadLesson(widget.lessonRef.src),
        RealExamples.load(),
      ).wait;
      _examples = examples[lesson.id] ?? const [];
      return lesson;
    }();
  }

  @override
  void dispose() {
    _player?.removeListener(_changed);
    _player?.dispose();
    _teacher.dispose();
    _erase.dispose();
    super.dispose();
  }

  void _start(Lesson lesson) {
    _tips = tipsForLesson(lesson.title);
    final blocks = _blocks = lesson.theory.blocks;
    _script = buildBoardScript(
      blocks,
      lessonId: lesson.id,
      tips: _tips,
      problems: lesson.problems,
      examples: _examples,
    );
    _player = DemoPlayer(blocks: blocks, teacher: _teacher, scenes: _script!.scenes)..addListener(_changed);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _teacher.voiceEnabled = AppScope.read(context).voiceEnabled;
      _player!.play(); // mở ra là cô giảng luôn
    });
  }

  void _changed() {
    if (!mounted) return;
    final p = _player!;
    final s = p.current;
    if (s != null && s.erase && p.playing) {
      if (_erasingScene != p.index) {
        _erasingScene = p.index;
        final motion = TeacherAvatar.motionEnabled && !(MediaQuery.maybeDisableAnimationsOf(context) ?? false);
        if (motion) {
          _erase.forward(from: 0);
        } else {
          _erase.value = 1;
        }
      }
    } else if (_erasingScene != null) {
      _erasingScene = null;
      _erase.value = 0;
    }
    setState(() {});
  }

  void _practice(Lesson lesson) {
    final app = AppScope.read(context);
    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) =>
            QuizScreen(lesson: lesson, isVip: app.isVip, onFinished: app.recordQuiz, voiceOn: app.voiceEnabled),
      ),
    );
  }

  /// Phần bảng đang hiện (-1 = mới có đầu bài).
  int get _section {
    final p = _player!;
    final sc = _script!;
    if (p.done) return sc.sections.length - 1;
    if (p.index < 0) return -1;
    return sc.sectionOf[p.index];
  }

  /// Hình của phần [s] đã được vẽ chưa (cô tới cảnh vẽ hình).
  bool _drawn(int s) {
    final p = _player!;
    if (p.done) return true;
    for (var i = 0; i <= p.index && i < _script!.scenes.length; i++) {
      if (_script!.scenes[i].draw && _script!.sectionOf[i] == s) return true;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF3B2A1E),
      appBar: AppBar(
        title: const Text('Video bài giảng'),
        backgroundColor: const Color(0xFF1E4D38),
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'class',
        veil: 0.15,
        child: FutureBuilder<Lesson>(
          future: _lesson,
          builder: (context, snap) {
            if (snap.hasError) return Center(child: Text('${snap.error}'));
            if (!snap.hasData) return const Center(child: CircularProgressIndicator());
            final lesson = snap.data!;
            if (_player == null) _start(lesson);
            final p = _player!;
            return SafeArea(
              top: false,
              child: Column(
                children: [
                  Expanded(
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 760),
                        child: Padding(
                          padding: const EdgeInsets.fromLTRB(10, 10, 10, 4),
                          child: ChalkBoardFrame(key: const ValueKey('chalk-board'), child: _board(lesson, p)),
                        ),
                      ),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
                    decoration: const BoxDecoration(
                      color: Color(0xF2FFFFFF),
                      borderRadius: BorderRadius.vertical(top: Radius.circular(26)),
                      boxShadow: [BoxShadow(color: Color(0x22000000), blurRadius: 12, offset: Offset(0, -3))],
                    ),
                    child: Center(
                      child: ConstrainedBox(
                        // Bảng luôn giữ ít nhất ~nửa màn hình; phần cô hỏi dài thì cuộn.
                        constraints: BoxConstraints(maxWidth: 760, maxHeight: MediaQuery.sizeOf(context).height * 0.46),
                        child: SingleChildScrollView(
                          reverse: true,
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              TeacherHud(key: const ValueKey('board-teacher'), controller: _teacher, avatarHeight: 96),
                              QuizPanel(player: p),
                              DemoControls(player: p),
                              if (p.done) ...[
                                const SizedBox(height: 6),
                                BigButton(
                                  key: const ValueKey('btn-board-practice'),
                                  label: 'Luyện tập ngay',
                                  icon: Icons.edit_rounded,
                                  color: AppColors.good,
                                  onPressed: () => _practice(lesson),
                                ),
                              ],
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _board(Lesson lesson, DemoPlayer p) {
    final writing = p.playing;
    final s = _section;
    return Padding(
      padding: const EdgeInsets.fromLTRB(14, 10, 14, 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Đầu bảng: ngày, môn, tên bài — giữ suốt giờ học.
          ChalkText(
            boardDate(DateTime.now()),
            key: const ValueKey('board-date'),
            style: Chalk.style(size: 14),
            animate: writing,
            align: TextAlign.center,
            charsPerSecond: 22,
          ),
          ChalkText(
            'Toán',
            key: const ValueKey('board-subject'),
            style: Chalk.style(size: 18, color: Chalk.pink).copyWith(decoration: TextDecoration.underline),
            animate: writing,
            delay: const Duration(milliseconds: 1500),
            align: TextAlign.center,
          ),
          ChalkText(
            lesson.title,
            key: const ValueKey('board-title'),
            style: Chalk.style(size: 19, color: Chalk.yellow),
            animate: writing,
            delay: const Duration(milliseconds: 1900),
            align: TextAlign.center,
            charsPerSecond: 20,
          ),
          Container(
            height: 1.5,
            margin: const EdgeInsets.symmetric(vertical: 6),
            color: Chalk.white.withValues(alpha: 0.35),
          ),
          Expanded(
            child: AnimatedBuilder(
              animation: _erase,
              builder: (context, _) => EraserSweep(
                progress: _erase.value,
                child: s < 0
                    ? const SizedBox.expand()
                    : LayoutBuilder(
                        builder: (context, box) => FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.topCenter,
                          child: SizedBox(
                            width: box.maxWidth,
                            child: KeyedSubtree(key: ValueKey('board-section-$s'), child: _sectionView(s, p, writing)),
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

  Widget _sectionView(int s, DemoPlayer p, bool writing) {
    final sec = _script!.sections[s];
    if (sec.example != null) {
      final e = sec.example!;
      final active = p.current?.example == e;
      return Padding(
        padding: const EdgeInsets.fromLTRB(16, 6, 16, 0),
        child: Transform.rotate(
          angle: -0.015,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              RealExampleView(
                key: ValueKey('board-example-$e'),
                example: _examples[e],
                active: active,
                pointAt: active ? p.current?.pointAt : null,
              ),
              // Băng dính dán tranh lên bảng.
              for (final x in const [-0.92, 0.92])
                Align(
                  alignment: Alignment(x, -1.04),
                  child: Transform.rotate(
                    angle: x * 0.5,
                    child: Container(width: 54, height: 18, color: const Color(0xCCFFF3C4)),
                  ),
                ),
            ],
          ),
        ),
      );
    }
    if (sec.tips) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ChalkText(
            'Ghi nhớ',
            key: const ValueKey('board-tips-head'),
            style: Chalk.style(size: 24, color: Chalk.yellow).copyWith(decoration: TextDecoration.underline),
            animate: writing,
          ),
          const SizedBox(height: 6),
          for (final (k, t) in _tips.indexed)
            if (k < p.tipsShown)
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: ChalkText(
                  '• ${t.text}',
                  key: ValueKey('board-tip-$k'),
                  style: Chalk.style(size: 19, color: k.isEven ? Chalk.white : Chalk.blue),
                  animate: writing,
                ),
              ),
        ],
      );
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (final i in sec.blocks)
          if (p.done || p.reached(i)) ...[
            KeyedSubtree(key: ValueKey('board-block-$i'), child: _block(i, _blocks[i], p, writing)),
            if (sec.diagram != null && i == sec.blocks.first && _drawn(s))
              if (chalkDiagram(sec.diagram!) case final d?)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
                  child: ChalkDrawing(key: ValueKey('board-diagram-${sec.diagram}'), design: d, animate: writing),
                ),
            const SizedBox(height: 8),
          ],
      ],
    );
  }

  Widget _block(int i, ContentBlock b, DemoPlayer p, bool writing) {
    switch (b) {
      case TextBlock(:final text, :final style):
        return ChalkText(
          style == TextBlockStyle.rule ? '✓ $text' : text,
          style: Chalk.style(
            size: 20,
            color: switch (style) {
              TextBlockStyle.rule => Chalk.yellow,
              TextBlockStyle.tip => Chalk.pink,
              TextBlockStyle.normal => Chalk.white,
            },
          ),
          animate: writing,
        );
      case EquationBlock(:final text):
        final pending = p.quizPendingFor(i);
        final objects = pending ? null : chalkObjects(text);
        return Column(
          children: [
            ChalkText(
              pending ? hideResult(text) : text,
              style: Chalk.style(size: 30, color: Chalk.white),
              align: TextAlign.center,
              animate: writing,
              charsPerSecond: 10,
            ),
            if (objects != null && boardDrawsObjects(text))
              Padding(
                padding: const EdgeInsets.only(top: 4),
                child: ChalkDrawing(design: objects, animate: writing, unitsPerSecond: 420),
              ),
          ],
        );
      case final ColumnArithmeticBlock c:
        return Center(
          child: ValueListenableBuilder<int>(
            valueListenable: p.drivers[i] ?? ValueNotifier(c.digitSteps.length),
            builder: (_, step, _) => ChalkColumn(block: c, step: p.done ? c.digitSteps.length : step),
          ),
        );
      case final LongDivisionBlock d:
        return Center(
          child: ValueListenableBuilder<int>(
            valueListenable: p.drivers[i] ?? ValueNotifier(d.digitSteps.length),
            builder: (_, step, _) => ChalkDivision(block: d, step: p.done ? d.digitSteps.length : step),
          ),
        );
      case WordProblemBlock(:final lines, :final answer):
        var delay = 0;
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final (k, l) in lines.indexed) ...[
              ChalkText(
                l.explanation,
                key: ValueKey('wp-e-$k'),
                style: Chalk.style(size: 18),
                animate: writing,
                delay: Duration(milliseconds: delay),
              ),
              ChalkText(
                l.equation,
                key: ValueKey('wp-q-$k'),
                style: Chalk.style(size: 22, color: Chalk.yellow),
                animate: writing,
                delay: Duration(milliseconds: delay += (l.explanation.length / 15 * 1000).round()),
              ),
              if ((delay += (l.equation.length / 15 * 1000).round()) > 0) const SizedBox(height: 4),
            ],
            ChalkText(
              'Đáp số: $answer',
              key: const ValueKey('wp-answer'),
              style: Chalk.style(size: 20, color: Chalk.pink),
              animate: writing,
              delay: Duration(milliseconds: delay),
            ),
          ],
        );
      case ImageBlock():
        return const SizedBox.shrink();
    }
  }
}
