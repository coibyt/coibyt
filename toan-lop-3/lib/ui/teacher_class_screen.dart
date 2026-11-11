import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/tips.dart';
import '../logic/tutor.dart';
import '../models/blocks.dart';
import '../models/content.dart';
import '../models/problem.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_demo.dart';
import '../tutor/teacher_hud.dart';
import 'app_theme.dart';
import 'quiz_screen.dart';
import 'widgets/big_button.dart';
import 'board_lesson_screen.dart' show ChalkLessonBoard;
import '../logic/board_script.dart';
import 'widgets/chalk.dart' show ChalkBoardFrame;
import 'widgets/game_art.dart';
import 'widgets/real_example_view.dart';
import 'widgets/solution_view.dart';
import 'widgets/step_solver.dart';
import 'widgets/visual_aid.dart';

/// Màu, ảnh của thẻ mẹo.
Color tipColor(TipKind k) => switch (k) {
  TipKind.secret => const Color(0xFFE09B00),
  TipKind.trick => const Color(0xFF8E5CF7),
  TipKind.warning => const Color(0xFFFF6B4A),
};

UiAsset tipArt(TipKind k) => switch (k) {
  TipKind.secret => UiAsset.tipSecret,
  TipKind.trick => UiAsset.tipMagic,
  TipKind.warning => UiAsset.tipBulb,
};

/// Thẻ "Bí quyết / Mẹo / Cẩn thận".
class TipCard extends StatelessWidget {
  const TipCard({super.key, required this.tip, this.active = false});

  final Tip tip;
  final bool active;

  @override
  Widget build(BuildContext context) {
    final c = tipColor(tip.kind);
    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.fromLTRB(8, 10, 14, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: LinearGradient(colors: [c.withValues(alpha: 0.16), Colors.white], stops: const [0, 0.5]),
        border: Border.all(color: active ? c : c.withValues(alpha: 0.35), width: active ? 3 : 1.5),
        boxShadow: active ? [BoxShadow(color: c.withValues(alpha: 0.35), blurRadius: 14)] : const [],
      ),
      child: Row(
        children: [
          GameIcon(tipArt(tip.kind), size: 52, fallback: Icon(Icons.lightbulb_rounded, color: c, size: 40)),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tip.kind.title,
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: c),
                ),
                Text(tip.text, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, height: 1.3)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Một khối nội dung trong lúc cô làm mẫu: tô sáng khối đang giảng, làm mờ khối chưa tới.
class DemoBlockView extends StatelessWidget {
  const DemoBlockView({super.key, required this.block, required this.index, required this.player});

  final ContentBlock block;
  final int index;
  final DemoPlayer player;

  @override
  Widget build(BuildContext context) {
    final active = player.activeBlock == index;
    final reached = player.reached(index);
    final Widget child = switch (block) {
      final ColumnArithmeticBlock b => ColumnStepper(block: b, driver: player.drivers[index]),
      final LongDivisionBlock b => DivisionStepper(block: b, driver: player.drivers[index]),
      TextBlock(:final text, :final style) => _TextCard(text: text, style: style),
      EquationBlock(:final text) => Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Cô đang hỏi phép tính này: che kết quả cho bé tự tính.
          _ChalkEquation(text: player.quizPendingFor(index) ? hideResult(text) : text),
          if (reached && !player.quizPendingFor(index)) ?VisualAid.forEquation(text),
        ],
      ),
      _ => BlockView(block: block),
    };
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 350),
      opacity: reached ? 1 : 0.35,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(22),
          boxShadow: active ? const [BoxShadow(color: Color(0x88FFC93C), blurRadius: 18, spreadRadius: 2)] : const [],
        ),
        child: Stack(
          clipBehavior: Clip.none,
          children: [
            child,
            if (active)
              Positioned(
                right: 8,
                top: -12,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
                  decoration: BoxDecoration(color: const Color(0xFFFF7A00), borderRadius: BorderRadius.circular(12)),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.record_voice_over_rounded, color: Colors.white, size: 16),
                      SizedBox(width: 4),
                      Text(
                        'Cô đang giảng',
                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _TextCard extends StatelessWidget {
  const _TextCard({required this.text, required this.style});

  final String text;
  final TextBlockStyle style;

  @override
  Widget build(BuildContext context) {
    final (Color bg, Color edge, UiAsset? art, String? label) = switch (style) {
      TextBlockStyle.rule => (const Color(0xFFFFF4D6), const Color(0xFFFFC93C), UiAsset.tipBulb, 'Ghi nhớ'),
      TextBlockStyle.tip => (const Color(0xFFF1EBFF), const Color(0xFF8E5CF7), UiAsset.tipMagic, 'Mẹo'),
      TextBlockStyle.normal => (Colors.white, const Color(0xFFDCE7FF), null, null),
    };
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: bg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: edge, width: 2),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (art != null) ...[
            GameIcon(art, size: 44, fallback: Icon(Icons.lightbulb_rounded, color: edge, size: 34)),
            const SizedBox(width: 8),
          ],
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (label != null)
                  Text(
                    label,
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: edge),
                  ),
                Text(text, style: const TextStyle(fontSize: 19, height: 1.4, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _ChalkEquation extends StatelessWidget {
  const _ChalkEquation({required this.text});

  final String text;

  @override
  Widget build(BuildContext context) => Container(
    width: double.infinity,
    padding: const EdgeInsets.all(6),
    decoration: BoxDecoration(color: const Color(0xFFB27A3C), borderRadius: BorderRadius.circular(18)),
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(color: const Color(0xFF1E4D38), borderRadius: BorderRadius.circular(13)),
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 30, fontWeight: FontWeight.w800, color: Color(0xFFF8F6EA)),
      ),
    ),
  );
}

/// Tranh minh hoạ đầu bài (Kie.ai); bài chưa có tranh riêng dùng ảnh bìa chủ đề.
class LessonIllustration extends StatelessWidget {
  const LessonIllustration({super.key, required this.lessonId, this.chapterOrder, this.height = 190});

  final String lessonId;
  final int? chapterOrder;
  final double height;

  @override
  Widget build(BuildContext context) {
    final a = TeacherAssets.instance;
    final path = a.lessonIllustration(lessonId) ?? (chapterOrder == null ? null : a.chapter(chapterOrder!));
    if (path == null) return const SizedBox.shrink();
    return ClipRRect(
      key: const ValueKey('lesson-illustration'),
      borderRadius: BorderRadius.circular(22),
      child: Stack(
        children: [
          Image.asset(
            path,
            height: height,
            width: double.infinity,
            fit: BoxFit.cover,
            errorBuilder: (_, _, _) => const SizedBox.shrink(),
          ),
          Positioned(
            left: 10,
            bottom: 10,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 3),
              decoration: BoxDecoration(color: const Color(0xCC1E4D38), borderRadius: BorderRadius.circular(12)),
              child: const Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.image_rounded, color: Colors.white, size: 16),
                  SizedBox(width: 4),
                  Text(
                    'Tranh minh hoạ',
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

/// Che kết quả của phép tính mẫu: "6 × 8 = 48" → "6 × 8 = ?".
String hideResult(String text) => text.replaceFirst(RegExp(r'=\s*[\d.]+\s*$'), '= ?');

/// Câu cô hỏi nhanh: 3 lựa chọn to, dễ chạm; chọn xong tô xanh/đỏ.
class QuizPanel extends StatelessWidget {
  const QuizPanel({super.key, required this.player});

  final DemoPlayer player;

  static const _colors = [Color(0xFF3A86FF), Color(0xFFFF6FB5), Color(0xFF2EB872)];
  static const _surveyIcons = [
    Icons.sentiment_very_satisfied_rounded,
    Icons.help_outline_rounded,
    Icons.replay_rounded,
  ];

  @override
  Widget build(BuildContext context) {
    final story = player.story;
    final q = player.activeQuiz;
    if (q == null && story == null) return const SizedBox.shrink();
    final picked = player.picked;
    return Container(
      key: const ValueKey('class-quiz'),
      margin: const EdgeInsets.only(bottom: 6),
      padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(colors: [Color(0xFFFFF4D6), Color(0xFFFFE9F2)]),
        border: Border.all(color: const Color(0xFFFFB800), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Cô thuyết minh tranh đồ vật khi bé trả lời sai: nhóm đang đếm sáng lên.
          if (story != null)
            ConstrainedBox(
              constraints: const BoxConstraints(maxHeight: 250),
              child: SingleChildScrollView(
                child: VisualAid(key: const ValueKey('remedy-aid'), story: story, lit: player.lit, compact: true),
              ),
            ),
          if (q != null) ...[
            Row(
              children: [
                Icon(q.survey ? Icons.psychology_alt_rounded : Icons.quiz_rounded, color: const Color(0xFFE07A00)),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    q.question,
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF4A2A00)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            if (q.survey)
              Column(
                children: [
                  for (var i = 0; i < q.choices.length; i++)
                    Padding(padding: const EdgeInsets.only(bottom: 6), child: _surveyChoice(i, q, picked)),
                ],
              )
            else
              Row(
                children: [
                  for (var i = 0; i < q.choices.length; i++) ...[
                    if (i > 0) const SizedBox(width: 8),
                    Expanded(child: _choice(i, q, picked)),
                  ],
                ],
              ),
            if (picked == null && player.waitingAnswer)
              const Padding(
                padding: EdgeInsets.only(top: 6),
                child: Text(
                  'Con chạm vào đáp án nhé!',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 14, color: Colors.black54, fontWeight: FontWeight.w600),
                ),
              ),
          ],
        ],
      ),
    );
  }

  Widget _surveyChoice(int i, DemoQuiz q, int? picked) => Material(
    color: picked == null ? _colors[i % 3] : (picked == i ? const Color(0xFF8E5CF7) : Colors.black26),
    borderRadius: BorderRadius.circular(16),
    child: InkWell(
      key: ValueKey('class-survey-$i'),
      borderRadius: BorderRadius.circular(16),
      onTap: picked != null || !player.waitingAnswer ? null : () => player.answer(i),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
        child: Row(
          children: [
            Icon(_surveyIcons[i % 3], color: Colors.white),
            const SizedBox(width: 8),
            Expanded(
              child: Text(
                '${'ABC'[i]}. ${q.choices[i]}',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    ),
  );

  Widget _choice(int i, DemoQuiz q, int? picked) {
    final answered = picked != null;
    final isRight = i == q.correct;
    final Color bg = !answered
        ? _colors[i % 3]
        : isRight
        ? AppColors.good
        : (i == picked ? const Color(0xFFE5484D) : Colors.black26);
    return Material(
      color: bg,
      borderRadius: BorderRadius.circular(16),
      elevation: answered ? 0 : 3,
      child: InkWell(
        key: ValueKey('class-quiz-$i'),
        borderRadius: BorderRadius.circular(16),
        onTap: answered || !player.waitingAnswer ? null : () => player.answer(i),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 6),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (answered && isRight) const Icon(Icons.check_circle_rounded, color: Colors.white, size: 22),
              if (answered && !isRight && i == picked) const Icon(Icons.cancel_rounded, color: Colors.white, size: 22),
              Flexible(
                child: FittedBox(
                  fit: BoxFit.scaleDown,
                  child: Text(
                    '${'ABC'[i]}. ${q.choices[i]}',
                    style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Colors.white),
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

class _QuizScoreChip extends StatelessWidget {
  const _QuizScoreChip({required this.score});

  final (int, int, int) score;

  @override
  Widget build(BuildContext context) {
    final (right, _, total) = score;
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          for (var i = 0; i < total; i++)
            Opacity(
              opacity: i < right ? 1 : 0.25,
              child: GameIcon(UiAsset.star, size: 24, fallback: const Icon(Icons.star_rounded, color: AppColors.honey)),
            ),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              'Con trả lời đúng $right/$total câu cô hỏi',
              key: const ValueKey('class-quiz-score'),
              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800),
            ),
          ),
        ],
      ),
    );
  }
}

/// Thanh điều khiển: nghe lại · tạm dừng/tiếp tục · xem hết, kèm tiến độ.
class DemoControls extends StatelessWidget {
  const DemoControls({super.key, required this.player});

  final DemoPlayer player;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton.filledTonal(
          key: const ValueKey('demo-restart'),
          tooltip: 'Nghe lại từ đầu',
          onPressed: player.restart,
          icon: const Icon(Icons.replay_rounded),
        ),
        const SizedBox(width: 6),
        IconButton.filled(
          key: const ValueKey('demo-play'),
          tooltip: player.playing ? 'Tạm dừng' : 'Tiếp tục',
          style: IconButton.styleFrom(backgroundColor: const Color(0xFF5B3FD6)),
          onPressed: player.playing ? player.pause : player.play,
          icon: Icon(player.playing ? Icons.pause_rounded : Icons.play_arrow_rounded),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: LinearProgressIndicator(
              value: player.progress,
              minHeight: 10,
              color: const Color(0xFFFFB800),
              backgroundColor: const Color(0xFFEDE7FF),
            ),
          ),
        ),
        if (!player.done)
          TextButton(
            key: const ValueKey('demo-skip'),
            onPressed: player.skipToEnd,
            child: const Text('Xem hết', style: TextStyle(fontSize: 16)),
          ),
      ],
    );
  }
}

// ===========================================================================
// Lớp học của cô: cô tự giảng Nhớ nhanh, làm mẫu từng bước, đọc bí quyết & mẹo
// ===========================================================================

class TeacherClassScreen extends StatefulWidget {
  const TeacherClassScreen({super.key, required this.lessonRef});

  final LessonRef lessonRef;

  @override
  State<TeacherClassScreen> createState() => _TeacherClassScreenState();
}

class _TeacherClassScreenState extends State<TeacherClassScreen> {
  Future<Lesson>? _lesson;
  List<RealExample> _examples = const [];
  final _exampleKeys = <int, GlobalKey>{};
  final _teacher = TeacherController(voiceEnabled: false);
  DemoPlayer? _player;
  List<Tip> _tips = const [];
  final _blockKeys = <int, GlobalKey>{};
  final _tipsKey = GlobalKey();
  int? _scrolledTo;

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
    _player?.removeListener(_follow);
    _player?.dispose();
    _teacher.dispose();
    super.dispose();
  }

  void _start(Lesson lesson) {
    _tips = tipsForLesson(lesson.title);
    final blocks = lesson.theory.blocks;
    _player = DemoPlayer(
      blocks: blocks,
      teacher: _teacher,
      scenes: buildDemoScript(
        blocks,
        intro: const [TutorLines.classStart], // lời giới thiệu bài đã nói ở màn bài học → không lặp
        tips: _tips,
        outro: const [TutorLines.classDone],
        examples: _examples,
      ),
    )..addListener(_follow);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _teacher.voiceEnabled = AppScope.read(context).voiceEnabled;
      _player!.play(); // mở ra là cô giảng luôn
    });
  }

  /// Cuộn theo khối cô đang giảng.
  void _follow() {
    if (!mounted) return;
    setState(() {});
    final p = _player!;
    final ex = p.current?.example;
    // Khối: 0..n; mẹo: -1; ví dụ e: -100 - e.
    final target = ex != null ? -100 - ex : (p.current?.tip != null ? -1 : p.activeBlock);
    if (target == null || target == _scrolledTo) return;
    _scrolledTo = target;
    final key = ex != null ? _exampleKeys[ex] : (target == -1 ? _tipsKey : _blockKeys[target]);
    final ctx = key?.currentContext;
    if (ctx != null && ctx.mounted) {
      Scrollable.ensureVisible(ctx, alignment: 0.15, duration: const Duration(milliseconds: 450));
    }
  }

  /// Tranh ví dụ [e]: cô đang giảng thì tô sáng, phóng to và chỉ vào đúng chỗ.
  Widget _example(int e, DemoPlayer p) {
    final active = p.current?.example == e;
    return KeyedSubtree(
      key: _exampleKeys.putIfAbsent(e, GlobalKey.new),
      child: RealExampleView(
        key: ValueKey('real-example-$e'),
        example: _examples[e],
        active: active,
        pointAt: active ? p.current?.pointAt : null,
        reached: p.exampleReached(e),
      ),
    );
  }

  /// Thứ tự chủ đề từ mã bài "kntt3.c4.xxx" (để lấy ảnh bìa khi bài chưa có tranh riêng).
  int? _chapterOrder(Lesson lesson) => int.tryParse(RegExp(r'\.c(\d+)\.').firstMatch(lesson.id)?[1] ?? '');

  void _practice(Lesson lesson) {
    final app = AppScope.read(context);
    Navigator.of(context).pushReplacement(
      MaterialPageRoute<void>(
        builder: (_) =>
            QuizScreen(lesson: lesson, isVip: app.isVip, onFinished: app.recordQuiz, voiceOn: app.voiceEnabled),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Nhớ nhanh cùng cô'),
        backgroundColor: const Color(0xFF1E4D38),
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'class',
        veil: 0.45,
        child: FutureBuilder<Lesson>(
          future: _lesson,
          builder: (context, snap) {
            if (snap.hasError) return Center(child: Text('${snap.error}'));
            if (!snap.hasData) return const Center(child: CircularProgressIndicator());
            final lesson = snap.data!;
            if (_player == null) _start(lesson);
            final p = _player!;
            final blocks = lesson.theory.blocks;
            return Column(
              children: [
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 24),
                    child: Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 680),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            Text(
                              lesson.title,
                              key: const ValueKey('class-title'),
                              style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.w800,
                                color: Color(0xFF1E4D38),
                                shadows: [Shadow(color: Colors.white, blurRadius: 8)],
                              ),
                            ),
                            const SizedBox(height: 10),
                            if (_examples.isEmpty)
                              LessonIllustration(lessonId: lesson.id, chapterOrder: _chapterOrder(lesson))
                            else
                              _example(0, p),
                            const SizedBox(height: 14),
                            for (final (i, b) in blocks.indexed)
                              KeyedSubtree(
                                key: _blockKeys.putIfAbsent(i, GlobalKey.new),
                                child: DemoBlockView(block: b, index: i, player: p),
                              ),
                            for (var e = 1; e < _examples.length; e++) _example(e, p),
                            if (_tips.isNotEmpty) ...[
                              const SizedBox(height: 6),
                              Row(
                                key: _tipsKey,
                                children: [
                                  GameIcon(
                                    UiAsset.tipSecret,
                                    size: 36,
                                    fallback: const Icon(Icons.vpn_key_rounded, color: Color(0xFFE09B00)),
                                  ),
                                  const SizedBox(width: 6),
                                  const Expanded(
                                    child: Text(
                                      'Bí quyết & mẹo của cô',
                                      style: TextStyle(
                                        fontSize: 21,
                                        fontWeight: FontWeight.w800,
                                        color: Color(0xFF5A3A00),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 8),
                              for (final (k, t) in _tips.indexed)
                                AnimatedOpacity(
                                  duration: const Duration(milliseconds: 350),
                                  opacity: k < p.tipsShown ? 1 : 0.35,
                                  child: TipCard(key: ValueKey('tip-$k'), tip: t, active: p.current?.tip == k),
                                ),
                            ],
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
                  decoration: const BoxDecoration(
                    color: Color(0xF2FFFFFF),
                    borderRadius: BorderRadius.vertical(top: Radius.circular(26)),
                    boxShadow: [BoxShadow(color: Color(0x22000000), blurRadius: 12, offset: Offset(0, -3))],
                  ),
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 680),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          TeacherHud(
                            key: const ValueKey('class-teacher'),
                            controller: _teacher,
                            avatarHeight: 110,
                            maxTextHeight: 100,
                          ),
                          QuizPanel(player: p),
                          if (p.done && p.quizScore.$3 > 0) _QuizScoreChip(score: p.quizScore),
                          DemoControls(player: p),
                          const SizedBox(height: 6),
                          BigButton(
                            key: const ValueKey('btn-class-practice'),
                            label: 'Luyện tập ngay',
                            icon: Icons.edit_rounded,
                            color: p.done ? AppColors.good : const Color(0xFF7FCFA3),
                            onPressed: () => _practice(lesson),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}

// ===========================================================================
// Lời giải: cô làm mẫu bài vừa làm
// ===========================================================================

/// Lời giải trong bảng trượt: cô tự làm mẫu từng bước và nói (mở ra là chạy).
class SolutionDemo extends StatefulWidget {
  const SolutionDemo({super.key, required this.problem, required this.voiceOn});

  final Problem problem;
  final bool voiceOn;

  @override
  State<SolutionDemo> createState() => _SolutionDemoState();
}

class _SolutionDemoState extends State<SolutionDemo> {
  late final TeacherController _teacher = TeacherController(voiceEnabled: widget.voiceOn);
  late final List<ContentBlock> _blocks = widget.problem.solution.steps;
  // Video lời giải: cô viết từng bước lên bảng phấn, vẽ đồ vật, thuyết minh; dài thì lau bảng rồi viết tiếp.
  late final BoardScript _script = buildBoardScript(
    _blocks,
    lessonId: '',
    intro: const [TutorLines.solutionIntro],
    outro: const [TutorLines.solutionDone],
    checks: false,
    maxQuizzes: 0,
  );
  late final DemoPlayer _player = DemoPlayer(blocks: _blocks, teacher: _teacher, scenes: _script.scenes)
    ..addListener(_changed);

  void _changed() {
    if (mounted) setState(() {});
  }

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _player.play();
    });
  }

  @override
  void dispose() {
    _player.removeListener(_changed);
    _player.dispose();
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final prompt = widget.problem.prompt.text.trim();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        SizedBox(
          height: 340,
          child: ChalkBoardFrame(
            key: const ValueKey('solution-board'),
            child: ChalkLessonBoard(
              player: _player,
              script: _script,
              blocks: _blocks,
              subject: 'Lời giải',
              title: prompt.length <= 90 ? prompt : 'Bài giải',
            ),
          ),
        ),
        const SizedBox(height: 8),
        TeacherHud(controller: _teacher, avatarHeight: 84, maxTextHeight: 78),
        DemoControls(player: _player),
      ],
    );
  }
}
