import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/review_game.dart';
import '../logic/tutor.dart';
import '../models/content.dart';
import '../models/problem.dart';
import '../services/sound_service.dart';
import '../tutor/reward_burst.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import 'app_theme.dart';
import 'widgets/big_button.dart';
import 'widgets/game_art.dart';

const _balloonArt = [UiAsset.balloonRed, UiAsset.balloonBlue, UiAsset.balloonYellow, UiAsset.balloonGreen];
const _balloonColor = [Color(0xFFD7263D), Color(0xFF3A86FF), Color(0xFFFFB800), Color(0xFF2EC4A6)];

/// Thẻ "Trò chơi ôn tập" ở đầu màn một chủ đề.
class ReviewGameCard extends StatelessWidget {
  const ReviewGameCard({super.key, required this.chapter});

  final Chapter chapter;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final unlocked = app.gameUnlocked(chapter);
    final (best, stars) = app.gameBest(chapter.id);
    final done = chapter.lessons.where((l) => (app.lessonProgress(l.id)?.bestStars ?? 0) > 0).length;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('open-review-game'),
        borderRadius: BorderRadius.circular(24),
        onTap: () => _open(context, app, unlocked),
        child: Ink(
          padding: const EdgeInsets.fromLTRB(8, 10, 14, 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(colors: [Color(0xFF34C3FF), Color(0xFF7A5CFF), Color(0xFFFF6FB5)]),
            border: Border.all(color: Colors.white, width: 2),
            boxShadow: const [BoxShadow(color: Color(0x557A5CFF), blurRadius: 16, offset: Offset(0, 6))],
          ),
          child: Row(
            children: [
              SizedBox(
                width: 86,
                height: 80,
                child: Stack(
                  children: [
                    Positioned(
                      left: 0,
                      top: 6,
                      child: GameIcon(UiAsset.balloonRed, size: 52, fallback: const Text('🎈')),
                    ),
                    Positioned(
                      left: 26,
                      top: 0,
                      child: GameIcon(UiAsset.balloonBlue, size: 56, fallback: const SizedBox()),
                    ),
                    Positioned(
                      left: 44,
                      top: 14,
                      child: GameIcon(UiAsset.balloonYellow, size: 50, fallback: const SizedBox()),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Trò chơi ôn tập: Bóng bay Toán học',
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      unlocked
                          ? (best > 0 ? 'Kỷ lục: $best điểm · ${'⭐' * stars}' : 'Chạm để chơi · chấm điểm ngay')
                          : 'Học xong $done/${chapter.lessons.length} bài để mở khoá',
                      style: const TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.w600),
                    ),
                  ],
                ),
              ),
              Icon(unlocked ? Icons.sports_esports_rounded : Icons.lock_rounded, color: Colors.white, size: 36),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _open(BuildContext context, AppState app, bool unlocked) async {
    if (!unlocked) {
      final ok = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: const Color(0xFFFFFBF0),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
          title: const Text('Trò chơi đang khoá'),
          content: Text(
            'Con học xong các bài của chủ đề này là tự mở khoá.\n'
            'Hoặc mở ngay bằng ${AppState.gameUnlockCost} vàng.',
            style: const TextStyle(fontSize: 17),
          ),
          actions: [
            TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Để sau')),
            FilledButton(
              key: const ValueKey('game-unlock-coins'),
              onPressed: app.progress.coins >= AppState.gameUnlockCost ? () => Navigator.pop(context, true) : null,
              child: Text('Mở bằng ${AppState.gameUnlockCost} vàng'),
            ),
          ],
        ),
      );
      if (ok != true || !await app.unlockGame(chapter)) return;
    }
    if (!context.mounted) return;
    await Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => ReviewGameScreen(chapter: chapter)));
  }
}

enum _Phase { loading, intro, playing, result }

/// Trò chơi "Bóng bay Toán học" ôn tập một chủ đề.
class ReviewGameScreen extends StatefulWidget {
  const ReviewGameScreen({super.key, required this.chapter, this.random, this.sound});

  final Chapter chapter;
  final Random? random;
  final SoundService? sound;

  @override
  State<ReviewGameScreen> createState() => _ReviewGameScreenState();
}

class _ReviewGameScreenState extends State<ReviewGameScreen> with SingleTickerProviderStateMixin {
  late final Random _random = widget.random ?? Random();
  late final SoundService _sound = widget.sound ?? AppSound.instance;
  final _teacher = TeacherController(voiceEnabled: false);
  late final AnimationController _rise = AnimationController(
    vsync: this,
    duration: const Duration(seconds: ReviewGame.secondsPerQuestion),
  )..addStatusListener(_onRiseStatus);

  var _phase = _Phase.loading;
  ReviewGame? _game;

  /// Ván đang chơi (cho test).
  @visibleForTesting
  ReviewGame? get game => _game;
  List<GameQuestion> _questions = const [];
  int? _picked;
  bool _revealing = false;
  int _burst = 0;
  int _lastGain = 0;
  bool _record = false;
  int _coins = 0;
  Timer? _next;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_phase == _Phase.loading && _questions.isEmpty) _load();
  }

  Future<void> _load() async {
    final app = AppScope.read(context);
    final lessons = <List<Problem>>[];
    for (final l in widget.chapter.lessons) {
      try {
        lessons.add((await app.content.loadLesson(l.src)).problems);
      } on Object {
        continue;
      }
    }
    if (!mounted) return;
    _questions = buildGameQuestions(lessons, _random);
    setState(() => _phase = _Phase.intro);
    _teacher.voiceEnabled = app.voiceEnabled;
    _teacher.say(const [TutorLines.gameIntro]);
  }

  @override
  void dispose() {
    _next?.cancel();
    _rise.dispose();
    _teacher.dispose();
    super.dispose();
  }

  void _start() {
    _game = ReviewGame([..._questions]..shuffle(_random));
    setState(() {
      _phase = _Phase.playing;
      _picked = null;
      _revealing = false;
    });
    _teacher.clear();
    _rise.forward(from: 0);
  }

  void _onRiseStatus(AnimationStatus s) {
    if (s == AnimationStatus.completed && _phase == _Phase.playing && !_revealing) _answer(null);
  }

  void _answer(int? choice) {
    final g = _game!;
    if (_revealing || g.isOver) return;
    final secondsLeft = (1 - _rise.value) * ReviewGame.secondsPerQuestion;
    final correct = g.current.correct;
    _rise.stop();
    final gained = g.answer(choice, secondsLeft: secondsLeft);
    setState(() {
      _picked = choice;
      _revealing = true;
      _lastGain = gained;
      if (gained > 0) _burst++;
    });
    if (gained > 0) {
      _sound.correct();
      _teacher.say([TutorLines.praise[g.correctCount % TutorLines.praise.length]], mood: TeacherMood.clap);
    } else {
      _sound.wrong();
      _teacher.say([choice == null ? TutorLines.gameTimeout : TutorLines.gameWrong], mood: TeacherMood.think);
    }
    assert(correct >= 0);
    _next = Timer(Duration(milliseconds: gained > 0 ? 1100 : 1800), () {
      if (!mounted) return;
      if (g.isOver) {
        _finish();
      } else {
        setState(() {
          _picked = null;
          _revealing = false;
        });
        _rise.forward(from: 0);
      }
    });
  }

  Future<void> _finish() async {
    final g = _game!;
    final app = AppScope.read(context);
    _coins = g.coins;
    _record = await app.saveGameResult(widget.chapter.id, score: g.score, stars: g.stars, coins: _coins);
    if (!mounted) return;
    _sound.finish();
    setState(() => _phase = _Phase.result);
    _teacher.say([
      TutorLines.summary[g.stars]!,
      if (_record && g.score > 0) TutorLines.gameRecord,
    ], mood: g.stars >= 2 ? TeacherMood.clap : TeacherMood.idle);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ScreenBackground(
        name: 'game',
        veil: 0,
        child: SafeArea(
          child: Stack(
            children: [
              switch (_phase) {
                _Phase.loading => const Center(child: CircularProgressIndicator()),
                _Phase.intro => _intro(),
                _Phase.playing => _play(),
                _Phase.result => _result(),
              },
              Positioned.fill(
                child: IgnorePointer(child: RewardBurst(trigger: _burst, count: 20)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _closeRow({Widget? trailing}) => Row(
    children: [
      IconButton(
        tooltip: 'Thoát',
        iconSize: 32,
        icon: const Icon(Icons.close_rounded, color: Color(0xFF2B2160)),
        onPressed: () => Navigator.of(context).maybePop(),
      ),
      const Spacer(),
      ?trailing,
    ],
  );

  Widget _panel(Widget child) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.93),
      borderRadius: BorderRadius.circular(26),
      boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 16, offset: Offset(0, 6))],
    ),
    child: child,
  );

  Widget _intro() {
    final (best, _) = AppScope.of(context).gameBest(widget.chapter.id);
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _closeRow(),
              _panel(
                Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        for (final a in _balloonArt)
                          GameIcon(a, size: 64, fallback: const Text('🎈', style: TextStyle(fontSize: 40))),
                      ],
                    ),
                    const SizedBox(height: 6),
                    const Text(
                      'Bóng bay Toán học',
                      style: TextStyle(fontSize: 30, fontWeight: FontWeight.w900, color: Color(0xFF2B2160)),
                    ),
                    Text(
                      'Ôn tập Chủ đề ${widget.chapter.order}: ${widget.chapter.title}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 16, color: Colors.black54, fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 12),
                    _rule(Icons.touch_app_rounded, 'Chạm quả bóng có đáp án đúng'),
                    _rule(
                      Icons.timer_rounded,
                      'Mỗi câu ${ReviewGame.secondsPerQuestion} giây — trả lời nhanh được thêm điểm',
                    ),
                    _rule(Icons.local_fire_department_rounded, 'Đúng liên tiếp: điểm thưởng chuỗi'),
                    _rule(Icons.favorite_rounded, 'Có ${ReviewGame.hearts0} tim — sai hoặc hết giờ mất 1 tim'),
                    _rule(
                      Icons.emoji_events_rounded,
                      best > 0 ? 'Kỷ lục của con: $best điểm' : 'Lập kỷ lục đầu tiên nào!',
                    ),
                    const SizedBox(height: 8),
                    Text('${_questions.length} câu', style: const TextStyle(fontSize: 15, color: Colors.black54)),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              _panel(TeacherHud(controller: _teacher, avatarHeight: 110, maxTextHeight: 104)),
              const SizedBox(height: 14),
              BigButton(
                key: const ValueKey('btn-game-start'),
                label: 'Chơi ngay',
                icon: Icons.play_arrow_rounded,
                color: const Color(0xFFFF6FB5),
                onPressed: _questions.isEmpty ? null : _start,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _rule(IconData icon, String text) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 3),
    child: Row(
      children: [
        Icon(icon, color: const Color(0xFF7A5CFF)),
        const SizedBox(width: 8),
        Expanded(
          child: Text(text, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
        ),
      ],
    ),
  );

  Widget _play() {
    final g = _game!;
    if (g.isOver) return const SizedBox();
    final q = g.current;
    return Column(
      children: [
        _closeRow(
          trailing: Row(
            children: [
              for (var i = 0; i < ReviewGame.hearts0; i++)
                Opacity(
                  opacity: i < g.hearts ? 1 : 0.2,
                  child: GameIcon(UiAsset.heart, size: 28, fallback: const Icon(Icons.favorite, color: Colors.red)),
                ),
              const SizedBox(width: 10),
              Container(
                key: const ValueKey('game-score'),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(20)),
                child: Text('${g.score}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900)),
              ),
              const SizedBox(width: 8),
            ],
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: [
              Text(
                'Câu ${g.index + 1}/${g.questions.length}',
                style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: Color(0xFF2B2160)),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: AnimatedBuilder(
                  animation: _rise,
                  builder: (_, _) => ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: LinearProgressIndicator(
                      value: 1 - _rise.value,
                      minHeight: 10,
                      color: _rise.value > 0.7 ? const Color(0xFFFF5F6D) : const Color(0xFF2EB872),
                      backgroundColor: Colors.white70,
                    ),
                  ),
                ),
              ),
              if (g.combo >= 2) ...[
                const SizedBox(width: 8),
                GameIcon(UiAsset.flame, size: 26, fallback: const Text('🔥')),
                Text('×${g.combo}', style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900)),
              ],
            ],
          ),
        ),
        const SizedBox(height: 8),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Container(
            key: ValueKey('game-q-${g.index}'),
            width: double.infinity,
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(color: const Color(0xFFB27A3C), borderRadius: BorderRadius.circular(20)),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              decoration: BoxDecoration(color: const Color(0xFF1E4D38), borderRadius: BorderRadius.circular(15)),
              child: Text(
                q.prompt,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 22,
                  height: 1.3,
                  fontWeight: FontWeight.w800,
                  color: Color(0xFFF8F6EA),
                ),
              ),
            ),
          ),
        ),
        Expanded(
          child: LayoutBuilder(
            builder: (context, box) => AnimatedBuilder(
              animation: _rise,
              builder: (context, _) => Stack(
                clipBehavior: Clip.none,
                children: [
                  for (var i = 0; i < q.choices.length; i++) _balloon(i, q, box),
                  if (_revealing && _lastGain > 0)
                    Positioned(
                      top: 10,
                      left: 0,
                      right: 0,
                      child: Center(
                        child: Text(
                          '+$_lastGain',
                          style: const TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFFFFB800),
                            shadows: [Shadow(color: Colors.white, blurRadius: 10)],
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(10, 6, 10, 8),
          color: Colors.white.withValues(alpha: 0.85),
          child: TeacherHud(controller: _teacher, avatarHeight: 80, maxTextHeight: 78),
        ),
      ],
    );
  }

  Widget _balloon(int i, GameQuestion q, BoxConstraints box) {
    final n = q.choices.length;
    const size = 120.0;
    final slot = box.maxWidth / n;
    final phase = i * 1.7;
    final t = _rise.value;
    // Bay từ dưới lên, lắc nhẹ; mỗi quả lệch độ cao một chút cho tự nhiên.
    final y = box.maxHeight - size * 1.25 - t * (box.maxHeight * 0.85) + (i.isEven ? 0 : 24);
    final x = slot * i + (slot - size) / 2 + sin(t * 10 + phase) * 10;
    final isCorrect = i == q.correct;
    final picked = _picked == i;
    final popped = _revealing && picked && isCorrect;
    final glow = _revealing && isCorrect && !picked;
    final wrongPick = _revealing && picked && !isCorrect;
    return Positioned(
      left: x,
      top: y,
      child: AnimatedScale(
        scale: popped ? 1.6 : (wrongPick ? 0.85 : 1),
        duration: const Duration(milliseconds: 260),
        child: AnimatedOpacity(
          opacity: popped ? 0 : (_revealing && !isCorrect && !picked ? 0.45 : 1),
          duration: const Duration(milliseconds: 300),
          child: GestureDetector(
            key: ValueKey('balloon-$i'),
            onTap: _revealing ? null : () => _answer(i),
            child: SizedBox(
              width: size,
              height: size * 1.3,
              child: Stack(
                alignment: Alignment.topCenter,
                children: [
                  if (glow)
                    Container(
                      width: size,
                      height: size,
                      decoration: const BoxDecoration(
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: Color(0xCCFFE066), blurRadius: 30, spreadRadius: 8)],
                      ),
                    ),
                  GameIcon(
                    _balloonArt[i % 4],
                    size: size * 1.3,
                    fallback: Container(
                      width: size,
                      height: size,
                      decoration: BoxDecoration(shape: BoxShape.circle, color: _balloonColor[i % 4]),
                    ),
                  ),
                  Positioned(
                    top: size * 0.32,
                    left: 6,
                    right: 6,
                    child: FittedBox(
                      fit: BoxFit.scaleDown,
                      child: Text(
                        q.choices[i],
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          shadows: [Shadow(color: Color(0x99000000), blurRadius: 4, offset: Offset(0, 2))],
                        ),
                      ),
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

  Widget _result() {
    final g = _game!;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 560),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _panel(
                Column(
                  children: [
                    TweenAnimationBuilder<double>(
                      tween: Tween(begin: 0.3, end: 1),
                      duration: const Duration(milliseconds: 900),
                      curve: Curves.elasticOut,
                      builder: (_, v, child) => Transform.scale(scale: v, child: child),
                      child: GameIcon(
                        UiAsset.gameTrophy,
                        size: 140,
                        fallback: const Text('🏆', style: TextStyle(fontSize: 90)),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        for (var i = 0; i < 3; i++)
                          Opacity(
                            opacity: i < g.stars ? 1 : 0.2,
                            child: GameIcon(UiAsset.star, size: 46, fallback: const Icon(Icons.star_rounded, size: 46)),
                          ),
                      ],
                    ),
                    TweenAnimationBuilder<int>(
                      tween: IntTween(begin: 0, end: g.score),
                      duration: const Duration(milliseconds: 1200),
                      builder: (_, v, _) => Text(
                        '$v điểm',
                        key: const ValueKey('game-final-score'),
                        style: const TextStyle(fontSize: 40, fontWeight: FontWeight.w900, color: Color(0xFF2B2160)),
                      ),
                    ),
                    if (_record && g.score > 0)
                      Container(
                        margin: const EdgeInsets.only(top: 4),
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFD66B),
                          borderRadius: BorderRadius.circular(14),
                        ),
                        child: const Text('Kỷ lục mới!', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                      ),
                    const SizedBox(height: 8),
                    Text(
                      'Đúng ${g.correctCount}/${g.questions.length} câu · chuỗi dài nhất ${g.bestCombo}',
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        GameIcon(UiAsset.coin, size: 26, fallback: const Text('🪙')),
                        Text(' +$_coins vàng', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              _panel(TeacherHud(controller: _teacher, avatarHeight: 110, maxTextHeight: 104)),
              const SizedBox(height: 14),
              BigButton(
                key: const ValueKey('btn-game-again'),
                label: 'Chơi lại',
                icon: Icons.replay_rounded,
                color: const Color(0xFFFF6FB5),
                onPressed: _start,
              ),
              const SizedBox(height: 10),
              BigButton(
                label: 'Về chủ đề',
                icon: Icons.arrow_back_rounded,
                color: AppColors.sky,
                outlined: true,
                onPressed: () => Navigator.of(context).maybePop(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
