import 'dart:async';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter/material.dart';

import '../../../core/app_theme.dart';
import '../../../core/game_art.dart';
import '../../../core/i18n/language_controller.dart';
import '../../english/english_scope.dart';
import '../../english/widgets/pip.dart';
import '../lesson.dart';
import 'lesson_card.dart';

/// What the learner chose on the "lesson complete" screen.
enum CompleteChoice { next, again, home }

/// Celebration after the last step: stars pop in one by one, coins, the
/// learner's drawing next to the finished picture, and an unlock banner
/// after the first lesson.
Future<CompleteChoice?> showLessonComplete(
  BuildContext context, {
  required Lesson lesson,
  required int stars,
  required int coins,
  Uint8List? drawing,
  bool gamesUnlocked = false,
}) {
  return showGeneralDialog<CompleteChoice>(
    context: context,
    barrierDismissible: false,
    barrierColor: const Color(0xCC0A0920),
    transitionDuration: const Duration(milliseconds: 350),
    pageBuilder: (BuildContext context, _, _) => _LessonComplete(
      lesson: lesson,
      stars: stars,
      coins: coins,
      drawing: drawing,
      gamesUnlocked: gamesUnlocked,
    ),
    transitionBuilder: (_, Animation<double> a, _, Widget child) => ScaleTransition(
      scale: CurvedAnimation(parent: a, curve: Curves.easeOutBack),
      child: FadeTransition(opacity: a, child: child),
    ),
  );
}

class _LessonComplete extends StatefulWidget {
  const _LessonComplete({
    required this.lesson,
    required this.stars,
    required this.coins,
    required this.drawing,
    required this.gamesUnlocked,
  });

  final Lesson lesson;
  final int stars;
  final int coins;
  final Uint8List? drawing;
  final bool gamesUnlocked;

  @override
  State<_LessonComplete> createState() => _LessonCompleteState();
}

class _LessonCompleteState extends State<_LessonComplete> with SingleTickerProviderStateMixin {
  late final AnimationController _t = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 2200),
  )..forward();

  @override
  void dispose() {
    _t.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final List<Color> colors = topicColors(widget.lesson.topic);
    return Center(
      child: Material(
        type: MaterialType.transparency,
        child: Container(
          key: const Key('lessonComplete'),
          margin: const EdgeInsets.symmetric(horizontal: 20),
          constraints: const BoxConstraints(maxWidth: 440),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(32),
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: <Color>[colors.first, AppTheme.sheet],
            ),
            border: Border.all(color: const Color(0x66FFD27A), width: 1.5),
            boxShadow: <BoxShadow>[
              BoxShadow(color: colors.last.withValues(alpha: 0.4), blurRadius: 40),
            ],
          ),
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(20, 22, 20, 18),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                Text(
                  context.tr('path.complete'),
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 26,
                    fontWeight: FontWeight.w900,
                    shadows: <Shadow>[Shadow(color: Color(0x88000000), blurRadius: 8)],
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  context.tr(widget.lesson.titleKey),
                  style: const TextStyle(
                    color: AppTheme.gold,
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                  ),
                ),
                const SizedBox(height: 14),
                AnimatedBuilder(
                  animation: _t,
                  builder: (BuildContext context, _) => Row(
                    key: const Key('completeStars'),
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[for (int i = 0; i < 3; i++) _star(i)],
                  ),
                ),
                const SizedBox(height: 14),
                Row(
                  children: <Widget>[
                    Expanded(
                      child: _frame(widget.drawing == null ? null : Image.memory(widget.drawing!)),
                    ),
                    const SizedBox(width: 10),
                    Expanded(child: _frame(Image.asset(widget.lesson.steps.last.overlay))),
                  ],
                ),
                const SizedBox(height: 12),
                _NewWord(lesson: widget.lesson),
                const SizedBox(height: 12),
                if (widget.coins > 0)
                  Container(
                    key: const Key('completeCoins'),
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0x33FFD27A),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: <Widget>[
                        const ArtImage(GameArt.coin, size: 28),
                        const SizedBox(width: 8),
                        Text(
                          context.tr(
                            'game.coinsEarned',
                            args: <String, Object?>{'coins': widget.coins},
                          ),
                          style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                        ),
                      ],
                    ),
                  ),
                if (widget.gamesUnlocked) ...<Widget>[
                  const SizedBox(height: 10),
                  Container(
                    key: const Key('gamesUnlockedBanner'),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: <Color>[Color(0xFF3E2483), Color(0xFF7B45D1)],
                      ),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: Row(
                      children: <Widget>[
                        ArtImage(GameArt.tile('exam'), size: 44),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            context.tr('path.unlockedGames'),
                            style: const TextStyle(fontWeight: FontWeight.w800),
                          ),
                        ),
                        const Icon(Icons.lock_open_rounded, color: AppTheme.gold),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: FilledButton.icon(
                    key: const Key('completeNext'),
                    onPressed: () => Navigator.of(context).pop(CompleteChoice.next),
                    icon: const Icon(Icons.arrow_forward_rounded),
                    label: Text(context.tr('path.nextLesson')),
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: <Widget>[
                    Expanded(
                      child: OutlinedButton.icon(
                        key: const Key('completeAgain'),
                        onPressed: () => Navigator.of(context).pop(CompleteChoice.again),
                        icon: const Icon(Icons.replay_rounded),
                        label: Text(context.tr('path.again')),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        key: const Key('completeHome'),
                        onPressed: () => Navigator.of(context).pop(CompleteChoice.home),
                        icon: const Icon(Icons.home_rounded),
                        label: Text(context.tr('path.backHome')),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _star(int i) {
    // Stars pop in one after another, the earned ones in gold.
    final double start = 0.15 + i * 0.22;
    final double v = ((_t.value - start) / 0.25).clamp(0.0, 1.0);
    final double scale = Curves.elasticOut.transform(v);
    final bool earned = i < widget.stars;
    final double size = i == 1 ? 74 : 58;
    return Padding(
      padding: EdgeInsets.only(left: 6, right: 6, bottom: i == 1 ? 14 : 0),
      child: Transform.rotate(
        angle: (1 - v) * (i - 1) * 0.6,
        child: Transform.scale(
          scale: earned ? scale : math.max(0.6, v),
          child: Icon(
            Icons.star_rounded,
            size: size,
            color: earned ? const Color(0xFFFFD24A) : const Color(0x33FFFFFF),
            shadows: earned
                ? const <Shadow>[Shadow(color: Color(0xCCFF9F43), blurRadius: 18)]
                : null,
          ),
        ),
      ),
    );
  }

  Widget _frame(Widget? child) {
    return AspectRatio(
      aspectRatio: 0.78,
      child: Container(
        padding: const EdgeInsets.all(5),
        decoration: BoxDecoration(
          gradient: const LinearGradient(colors: <Color>[Color(0xFFE8B75A), Color(0xFF9A6A22)]),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Container(
          color: const Color(0xFFFFFDF8),
          padding: const EdgeInsets.all(4),
          child: child ?? const Icon(Icons.edit_note_rounded, size: 40, color: Colors.black26),
        ),
      ),
    );
  }
}

/// The English word of the finished picture, read aloud by Pip.
class _NewWord extends StatefulWidget {
  const _NewWord({required this.lesson});

  final Lesson lesson;

  @override
  State<_NewWord> createState() => _NewWordState();
}

class _NewWordState extends State<_NewWord> {
  EnglishScope? _english;
  Timer? _timer;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _english = EnglishScope.maybeOf(context);
  }

  @override
  void initState() {
    super.initState();
    _timer = Timer(const Duration(milliseconds: 1600), () {
      if (mounted) _say();
    });
  }

  void _say() => _english?.audio.say(<String>['pip_new', 'lw_${widget.lesson.id}']);

  @override
  void dispose() {
    _timer?.cancel();
    _english?.audio.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final ({String en, String vi})? w = _english?.catalog.lessonWords[widget.lesson.id];
    if (w == null) return const SizedBox.shrink();
    return Material(
      key: const Key('newWord'),
      color: const Color(0x2214B8A6),
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: _say,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(6, 6, 14, 6),
          child: Row(
            children: <Widget>[
              Pip(audio: _english?.audio, size: 56),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      context.tr('english.newWord'),
                      style: const TextStyle(
                        color: AppTheme.teal,
                        fontSize: 12,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    Text(
                      w.en,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                      ),
                    ),
                    Text(w.vi, style: const TextStyle(color: Colors.white70, fontSize: 13)),
                  ],
                ),
              ),
              const Icon(Icons.volume_up_rounded, color: AppTheme.gold),
            ],
          ),
        ),
      ),
    );
  }
}
