import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/ability.dart';
import '../logic/review_game.dart';
import '../logic/show_lines.dart';
import '../logic/tutor.dart';
import '../services/show_music.dart';
import '../services/sound_service.dart';
import '../tutor/host_avatar.dart';
import '../tutor/reward_burst.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import 'ability_screens.dart';
import 'widgets/game_art.dart';

const _gold = Color(0xFFFFC93C);
const _navy = Color(0xFF0E1A5C);
const _panelTop = Color(0xFF1B2C8F);
const _panelBottom = Color(0xFF0A1248);

/// Thời gian mỗi câu (giây).
const kShowSeconds = 45;

/// Mốc an toàn trên thang 15 bậc.
const _milestones = {5, 10, 15};

enum _Stage { loading, intro, reading, answering, locked, revealed, finished }

enum _AnswerState { normal, selected, correct, wrong, removed }

/// Kiểm tra năng lực dạng gameshow: MC đọc câu hỏi, 4 đáp án, đồng hồ đếm ngược,
/// nhạc nền, 3 quyền trợ giúp (50:50, hỏi cô Mai, đổi câu), thang 15 bậc.
class QuizShowScreen extends StatefulWidget {
  const QuizShowScreen({super.key, this.random, this.sound, this.music});

  final Random? random;
  final SoundService? sound;
  final ShowMusic? music;

  @override
  State<QuizShowScreen> createState() => _QuizShowScreenState();
}

class _QuizShowScreenState extends State<QuizShowScreen> with TickerProviderStateMixin {
  late final Random _random = widget.random ?? Random();
  late final SoundService _sound = widget.sound ?? AppSound.instance;
  late final ShowMusic _music = widget.music ?? ShowMusic.instance;
  final _host = TeacherController(voiceEnabled: false);
  final _teacher = TeacherController(voiceEnabled: false);
  late final AnimationController _clock =
      AnimationController(
        vsync: this,
        duration: const Duration(seconds: kShowSeconds),
      )..addStatusListener((s) {
        if (s == AnimationStatus.completed && _stage == _Stage.answering) _timeUp();
      });
  late final AnimationController _flash = AnimationController(vsync: this, duration: const Duration(milliseconds: 260));

  var _stage = _Stage.loading;
  AbilityTest? _test;
  final _questions = <String, GameQuestion>{};
  final _results = <bool>[];
  int? _selected;
  Set<int> _removed = {};
  final _used = <String>{};
  String? _teacherHint;
  int _burst = 0;
  bool _presenting = false;
  int _token = 0;
  final _clockWatch = Stopwatch();

  @visibleForTesting
  AbilityTest? get test => _test;
  @visibleForTesting
  GameQuestion? get question => _test == null || _test!.isFinished ? null : _q(_test!.current);

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_stage == _Stage.loading && _test == null) _load();
  }

  Future<void> _load() async {
    final app = AppScope.read(context);
    final bank = await app.abilityBank();
    if (!mounted) return;
    // Chỉ dùng câu đổi được thành 4 lựa chọn.
    final usable = [
      for (final i in bank)
        if (toGameQuestion(i.problem, _random) != null) i,
    ];
    _test = AbilityTest(usable, random: _random);
    _host.voiceEnabled = app.voiceEnabled;
    _teacher.voiceEnabled = app.voiceEnabled;
    setState(() => _stage = _Stage.intro);
    _music.sting('intro');
    _presenting = true;
    await _host.say([app.abilityResults.isEmpty ? ShowLines.welcome : ShowLines.welcomeBack]);
    if (mounted) setState(() => _presenting = false);
  }

  GameQuestion _q(AbilityItem item) =>
      _questions.putIfAbsent(item.problem.id, () => toGameQuestion(item.problem, _random)!);

  @override
  void dispose() {
    _token++;
    _clock.dispose();
    _flash.dispose();
    _host.dispose();
    _teacher.dispose();
    _music.stopAll();
    super.dispose();
  }

  Future<void> _begin() async {
    _clockWatch.start();
    _music.playBackground();
    await _ask(intro: ShowLines.start);
  }

  /// MC đọc số câu + đề, rồi bắt đầu đếm giờ.
  Future<void> _ask({String? intro}) async {
    final t = _test!;
    if (t.isFinished) return _finish();
    final token = ++_token;
    final q = _q(t.current);
    final n = t.index + 1;
    setState(() {
      _stage = _Stage.reading;
      _selected = null;
      _removed = {};
      _teacherHint = null;
      _presenting = true;
    });
    _clock.value = 0;
    await _host.say([
      ?intro,
      if (n == t.total) ShowLines.finale,
      ShowLines.questionNumber(n),
      q.prompt.replaceAll('\n', '. '),
    ]);
    if (!mounted || token != _token) return;
    setState(() {
      _stage = _Stage.answering;
      _presenting = false;
    });
    _clock.forward(from: 0);
  }

  void _select(int i) {
    if (_stage != _Stage.answering || _removed.contains(i)) return;
    _sound.tap();
    setState(() => _selected = i);
    if (!_host.speaking) _host.say(const [ShowLines.confirm]);
  }

  Future<void> _lock() async {
    if (_selected == null || _stage != _Stage.answering) return;
    final token = ++_token;
    _clock.stop();
    _music.stopBackground();
    _music.sting('lock');
    _host.clear();
    setState(() => _stage = _Stage.locked);
    await Future<void>.delayed(const Duration(milliseconds: 2200));
    if (!mounted || token != _token) return;
    _reveal(_selected);
  }

  void _timeUp() {
    _token++;
    _music.stopBackground();
    _reveal(null);
  }

  Future<void> _reveal(int? choice) async {
    final t = _test!;
    final q = _q(t.current);
    final ok = choice != null && choice == q.correct;
    setState(() => _stage = _Stage.revealed);
    _flash.repeat(reverse: true, count: 3);
    if (ok) {
      _burst++;
      _sound.correct();
    } else {
      _sound.wrong();
    }
    final n = t.index + 1;
    final token = ++_token;
    await _host.say([
      if (ok)
        ShowLines.correct[n % ShowLines.correct.length]
      else
        (choice == null ? ShowLines.timeout : ShowLines.wrong),
      if (n == 5) ShowLines.milestone5,
      if (n == 10) ShowLines.milestone10,
    ], mood: ok ? TeacherMood.clap : TeacherMood.think);
    if (!mounted || token != _token) return;
    await Future<void>.delayed(const Duration(milliseconds: 500));
    if (!mounted || token != _token) return;
    _results.add(ok);
    t.answer(correct: ok);
    if (t.isFinished) {
      _finish();
    } else {
      _music.playBackground();
      _ask();
    }
  }

  // ---- Quyền trợ giúp ----

  void _fiftyFifty() {
    if (_stage != _Stage.answering || _used.contains('5050')) return;
    final q = _q(_test!.current);
    final wrong = [
      for (var i = 0; i < q.choices.length; i++)
        if (i != q.correct) i,
    ]..shuffle(_random);
    setState(() {
      _used.add('5050');
      _removed = wrong.take(max(0, q.choices.length - 2)).toSet();
      if (_selected != null && _removed.contains(_selected)) _selected = null;
    });
    _host.say(const [ShowLines.fifty]);
  }

  Future<void> _askTeacher() async {
    if (_stage != _Stage.answering || _used.contains('teacher')) return;
    final hint = TutorBrain(random: _random).hint(_test!.current.problem);
    setState(() {
      _used.add('teacher');
      _teacherHint = hint;
    });
    _clock.stop();
    await _host.say(const [ShowLines.askTeacher]);
    if (!mounted || _stage != _Stage.answering) return;
    await _teacher.say([hint], mood: TeacherMood.think);
    if (mounted && _stage == _Stage.answering) _clock.forward();
  }

  Future<void> _swap() async {
    if (_stage != _Stage.answering || _used.contains('swap')) return;
    if (!_test!.swap()) return;
    _used.add('swap');
    await _ask(intro: ShowLines.swap);
  }

  Future<void> _finish() async {
    _token++;
    _clockWatch.stop();
    _clock.stop();
    _music.stopBackground();
    _music.sting('win');
    setState(() => _stage = _Stage.finished);
    final app = AppScope.read(context);
    final result = _test!.result(app.now(), seconds: _clockWatch.elapsed.inSeconds);
    final previous = app.abilityResults.isEmpty ? null : app.abilityResults.last;
    final coins = await app.saveAbilityResult(result);
    await _host.say(const [ShowLines.end], mood: TeacherMood.clap);
    if (!mounted) return;
    unawaited(
      Navigator.of(context).pushReplacement(
        MaterialPageRoute<void>(
          builder: (_) => AbilityResultScreen(result: result, previous: previous, coins: coins),
        ),
      ),
    );
  }

  // ---- Giao diện ----

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _navy,
      body: ScreenBackground(
        name: 'show',
        veil: 0,
        child: SafeArea(
          child: Stack(
            children: [
              switch (_stage) {
                _Stage.loading => const Center(child: CircularProgressIndicator(color: _gold)),
                _Stage.intro => _intro(),
                _ => _play(),
              },
              Positioned.fill(
                child: IgnorePointer(child: RewardBurst(trigger: _burst, count: 24)),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _hostRow({double height = 170}) => ListenableBuilder(
    listenable: _host,
    builder: (context, _) => Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        HostAvatar(
          key: const ValueKey('show-host'),
          height: height,
          mouthOpen: _host.mouthOpen,
          presenting: _presenting || _host.mood == TeacherMood.clap,
        ),
        Expanded(
          child: AnimatedOpacity(
            duration: const Duration(milliseconds: 250),
            opacity: _host.text.isEmpty ? 0 : 1,
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
              decoration: BoxDecoration(
                gradient: const LinearGradient(colors: [Color(0xF2FFFFFF), Color(0xE6E9EDFF)]),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                  bottomRight: Radius.circular(20),
                  bottomLeft: Radius.circular(4),
                ),
                border: Border.all(color: _gold, width: 2),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    kHostName,
                    style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Color(0xFF5B3FD6)),
                  ),
                  Text(
                    _host.text.substring(0, _host.visibleChars.clamp(0, _host.text.length)),
                    key: const ValueKey('show-host-text'),
                    style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: _navy, height: 1.3),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    ),
  );

  Widget _intro() {
    final app = AppScope.of(context);
    final last = app.abilityResults.isEmpty ? null : app.abilityResults.last;
    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 600),
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Align(
                alignment: Alignment.centerLeft,
                child: IconButton(
                  tooltip: 'Thoát',
                  icon: const Icon(Icons.close_rounded, color: Colors.white, size: 30),
                  onPressed: () => Navigator.of(context).maybePop(),
                ),
              ),
              ShaderMask(
                shaderCallback: (r) =>
                    const LinearGradient(colors: [Color(0xFFFFF1B8), _gold, Color(0xFFFF9F1C)]).createShader(r),
                child: const Text(
                  'ĐẤU TRƯỜNG\nNGÔI SAO TOÁN HỌC',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontSize: 32, height: 1.1, fontWeight: FontWeight.w900, color: Colors.white),
                ),
              ),
              const SizedBox(height: 4),
              const Text(
                'Kiểm tra năng lực Toán 3',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Color(0xFFD9DEFF), fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 10),
              _hostRow(height: 230),
              const SizedBox(height: 10),
              _glass(
                Column(
                  children: [
                    _rule(Icons.stairs_rounded, '15 câu hỏi · 5 mảng kiến thức · leo thang 15 bậc'),
                    _rule(Icons.timer_rounded, 'Mỗi câu $kShowSeconds giây — MC đọc đề xong mới tính giờ'),
                    _rule(Icons.touch_app_rounded, 'Chọn đáp án rồi bấm "Chốt đáp án"'),
                    _rule(Icons.support_rounded, '3 quyền trợ giúp: 50:50 · Hỏi cô Mai · Đổi câu hỏi'),
                    _rule(
                      Icons.card_giftcard_rounded,
                      last == null ? 'Hoàn thành nhận 30 vàng' : 'Lần trước: ${last.overall} điểm · ${last.rank.title}',
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              _GoldButton(key: const ValueKey('btn-show-start'), label: 'VÀO ĐẤU TRƯỜNG', onTap: _begin),
            ],
          ),
        ),
      ),
    );
  }

  Widget _glass(Widget child) => Container(
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: const Color(0xCC0A1248),
      borderRadius: BorderRadius.circular(20),
      border: Border.all(color: const Color(0x88FFC93C), width: 1.5),
    ),
    child: child,
  );

  Widget _rule(IconData icon, String text) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 3),
    child: Row(
      children: [
        Icon(icon, color: _gold, size: 22),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(fontSize: 15, color: Colors.white, fontWeight: FontWeight.w600),
          ),
        ),
      ],
    ),
  );

  Widget _play() {
    final t = _test!;
    if (_stage == _Stage.finished || t.isFinished) {
      return Center(child: _hostRow(height: 260));
    }
    final q = _q(t.current);
    const letters = ['A', 'B', 'C', 'D'];
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(4, 2, 8, 0),
          child: Row(
            children: [
              IconButton(
                tooltip: 'Thoát',
                icon: const Icon(Icons.close_rounded, color: Colors.white, size: 28),
                onPressed: () => Navigator.of(context).maybePop(),
              ),
              _Lifeline(
                key: const ValueKey('life-5050'),
                label: '50:50',
                used: _used.contains('5050') || q.choices.length < 3,
                onTap: _fiftyFifty,
              ),
              _Lifeline(
                key: const ValueKey('life-teacher'),
                icon: Icons.school_rounded,
                used: _used.contains('teacher'),
                onTap: _askTeacher,
              ),
              _Lifeline(
                key: const ValueKey('life-swap'),
                icon: Icons.swap_horiz_rounded,
                used: _used.contains('swap'),
                onTap: _swap,
              ),
              const Spacer(),
              InkWell(
                key: const ValueKey('show-ladder'),
                borderRadius: BorderRadius.circular(20),
                onTap: () => _showLadder(t),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: _gold),
                    color: const Color(0x660A1248),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.stairs_rounded, color: _gold, size: 20),
                      Text(
                        ' Bậc ${t.index + 1}/${t.total}',
                        key: const ValueKey('show-progress'),
                        style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
        _MiniLadder(results: _results, total: t.total),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(14, 4, 14, 12),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 640),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _hostRow(height: 150),
                    if (_teacherHint != null) _TeacherHintCard(controller: _teacher),
                    Center(
                      child: AnimatedBuilder(
                        animation: _clock,
                        builder: (_, _) => _ClockRing(
                          secondsLeft: (kShowSeconds * (1 - _clock.value)).ceil(),
                          fraction: 1 - _clock.value,
                          running: _stage == _Stage.answering,
                        ),
                      ),
                    ),
                    const SizedBox(height: 8),
                    _HexBar(
                      key: ValueKey('show-q-${t.index}-${q.problemId}'),
                      top: _panelTop,
                      bottom: _panelBottom,
                      padding: const EdgeInsets.symmetric(horizontal: 26, vertical: 16),
                      child: Text(
                        q.prompt,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 20,
                          height: 1.3,
                          fontWeight: FontWeight.w800,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    for (var i = 0; i < q.choices.length; i++)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 9),
                        child: AnimatedBuilder(
                          animation: _flash,
                          builder: (_, _) => _AnswerBar(
                            key: ValueKey('show-answer-$i'),
                            letter: letters[i],
                            text: q.choices[i],
                            state: _answerState(i, q),
                            flash: _flash.value,
                            onTap: () => _select(i),
                          ),
                        ),
                      ),
                    const SizedBox(height: 4),
                    AnimatedSwitcher(
                      duration: const Duration(milliseconds: 250),
                      child: _stage == _Stage.answering && _selected != null
                          ? _GoldButton(key: const ValueKey('btn-show-lock'), label: 'CHỐT ĐÁP ÁN', onTap: _lock)
                          : _stage == _Stage.locked
                          ? const Padding(
                              padding: EdgeInsets.all(8),
                              child: Text(
                                'Đang chờ kết quả…',
                                textAlign: TextAlign.center,
                                style: TextStyle(fontSize: 18, color: _gold, fontWeight: FontWeight.w800),
                              ),
                            )
                          : const SizedBox(height: 56),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }

  _AnswerState _answerState(int i, GameQuestion q) {
    if (_removed.contains(i)) return _AnswerState.removed;
    if (_stage == _Stage.revealed) {
      if (i == q.correct) return _AnswerState.correct;
      if (i == _selected) return _AnswerState.wrong;
      return _AnswerState.normal;
    }
    if (i == _selected) return _AnswerState.selected;
    return _AnswerState.normal;
  }

  void _showLadder(AbilityTest t) {
    showModalBottomSheet<void>(
      context: context,
      backgroundColor: const Color(0xFF0A1248),
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            key: const ValueKey('ladder-sheet'),
            children: [
              const Text(
                'Thang Ngôi sao',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: _gold),
              ),
              const SizedBox(height: 8),
              for (var n = t.total; n >= 1; n--)
                Container(
                  margin: const EdgeInsets.symmetric(vertical: 2),
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(14),
                    color: n == t.index + 1 ? const Color(0xFFFF9F1C) : Colors.transparent,
                    border: Border.all(color: _milestones.contains(n) ? _gold : Colors.white24),
                  ),
                  child: Row(
                    children: [
                      SizedBox(
                        width: 34,
                        child: Text(
                          '$n',
                          style: TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w900,
                            color: _milestones.contains(n) ? _gold : Colors.white,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          _milestones.contains(n) ? 'Mốc ${n ~/ 5} · ${'⭐' * (n ~/ 5)}' : '${n * 100} điểm sao',
                          style: const TextStyle(fontSize: 16, color: Colors.white, fontWeight: FontWeight.w700),
                        ),
                      ),
                      if (n <= _results.length)
                        Icon(
                          _results[n - 1] ? Icons.check_circle_rounded : Icons.cancel_rounded,
                          color: _results[n - 1] ? const Color(0xFF2EE59D) : Colors.white38,
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

/// Khung hình lục giác kéo dài (đầu nhọn hai bên) — kiểu bảng câu hỏi gameshow.
class _HexBar extends StatelessWidget {
  const _HexBar({
    super.key,
    required this.child,
    required this.top,
    required this.bottom,
    this.border = _gold,
    this.padding = const EdgeInsets.symmetric(horizontal: 26, vertical: 12),
  });

  final Widget child;
  final Color top;
  final Color bottom;
  final Color border;
  final EdgeInsets padding;

  @override
  Widget build(BuildContext context) => CustomPaint(
    painter: _HexPainter(top: top, bottom: bottom, border: border),
    child: Padding(padding: padding, child: child),
  );
}

class _HexPainter extends CustomPainter {
  _HexPainter({required this.top, required this.bottom, required this.border});

  final Color top;
  final Color bottom;
  final Color border;

  @override
  void paint(Canvas canvas, Size size) {
    final tip = min(18.0, size.height / 2);
    final path = Path()
      ..moveTo(tip, 0)
      ..lineTo(size.width - tip, 0)
      ..lineTo(size.width, size.height / 2)
      ..lineTo(size.width - tip, size.height)
      ..lineTo(tip, size.height)
      ..lineTo(0, size.height / 2)
      ..close();
    canvas.drawShadow(path, Colors.black, 6, false);
    canvas.drawPath(
      path,
      Paint()
        ..shader = LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [top, bottom],
        ).createShader(Offset.zero & size),
    );
    canvas.drawPath(
      path,
      Paint()
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.5
        ..color = border,
    );
  }

  @override
  bool shouldRepaint(_HexPainter old) => old.top != top || old.bottom != bottom || old.border != border;
}

class _AnswerBar extends StatelessWidget {
  const _AnswerBar({
    super.key,
    required this.letter,
    required this.text,
    required this.state,
    required this.flash,
    required this.onTap,
  });

  final String letter;
  final String text;
  final _AnswerState state;
  final double flash;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final (Color top, Color bottom, Color edge) = switch (state) {
      _AnswerState.normal => (_panelTop, _panelBottom, const Color(0xFF8FA2FF)),
      _AnswerState.selected => (const Color(0xFFFFB347), const Color(0xFFE07A00), _gold),
      _AnswerState.correct => (
        Color.lerp(const Color(0xFF2EE59D), const Color(0xFF9DFFD0), flash)!,
        const Color(0xFF0E8F5A),
        Colors.white,
      ),
      _AnswerState.wrong => (const Color(0xFFFF5F6D), const Color(0xFFB0102A), Colors.white),
      _AnswerState.removed => (const Color(0x331B2C8F), const Color(0x330A1248), Colors.white12),
    };
    final removed = state == _AnswerState.removed;
    return Semantics(
      button: true,
      label: '$letter: $text',
      child: GestureDetector(
        onTap: removed ? null : onTap,
        child: Opacity(
          opacity: removed ? 0.35 : 1,
          child: _HexBar(
            top: top,
            bottom: bottom,
            border: edge,
            padding: const EdgeInsets.symmetric(horizontal: 22, vertical: 12),
            child: Row(
              children: [
                Text(
                  '◆ $letter:',
                  style: TextStyle(
                    fontSize: 19,
                    fontWeight: FontWeight.w900,
                    color: state == _AnswerState.normal ? _gold : Colors.white,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    removed ? '' : text,
                    style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: Colors.white),
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

class _Lifeline extends StatelessWidget {
  const _Lifeline({super.key, this.label, this.icon, required this.used, required this.onTap});

  final String? label;
  final IconData? icon;
  final bool used;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 3),
    child: Semantics(
      button: true,
      label: label ?? (icon == Icons.school_rounded ? 'Hỏi cô Mai' : 'Đổi câu hỏi'),
      child: GestureDetector(
        onTap: used ? null : onTap,
        child: Container(
          width: 52,
          height: 36,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            gradient: used
                ? null
                : const LinearGradient(
                    colors: [_panelTop, _panelBottom],
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                  ),
            color: used ? Colors.white10 : null,
            border: Border.all(color: used ? Colors.white24 : _gold, width: 2),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              label != null
                  ? Text(
                      label!,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                        color: used ? Colors.white30 : Colors.white,
                      ),
                    )
                  : Icon(icon, size: 22, color: used ? Colors.white30 : Colors.white),
              if (used) const Icon(Icons.close_rounded, color: Color(0xCCFF5F6D), size: 30),
            ],
          ),
        ),
      ),
    ),
  );
}

/// Đồng hồ đếm ngược dạng vòng tròn.
class _ClockRing extends StatelessWidget {
  const _ClockRing({required this.secondsLeft, required this.fraction, required this.running});

  final int secondsLeft;
  final double fraction;
  final bool running;

  @override
  Widget build(BuildContext context) {
    final danger = running && secondsLeft <= 10;
    final c = danger ? const Color(0xFFFF5F6D) : _gold;
    return SizedBox(
      width: 74,
      height: 74,
      child: Stack(
        alignment: Alignment.center,
        children: [
          Container(
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: const Color(0xFF0A1248),
              boxShadow: [BoxShadow(color: c.withValues(alpha: 0.6), blurRadius: danger ? 16 : 8)],
            ),
          ),
          SizedBox(
            width: 66,
            height: 66,
            child: CircularProgressIndicator(
              value: fraction,
              strokeWidth: 6,
              color: c,
              backgroundColor: Colors.white12,
            ),
          ),
          Text(
            '$secondsLeft',
            key: const ValueKey('show-clock'),
            style: TextStyle(fontSize: 26, fontWeight: FontWeight.w900, color: c),
          ),
        ],
      ),
    );
  }
}

/// Thang nhỏ phía trên: mỗi câu một ô (vàng = đúng, xám = sai), mốc 5/10/15 có viền.
class _MiniLadder extends StatelessWidget {
  const _MiniLadder({required this.results, required this.total});

  final List<bool> results;
  final int total;

  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.fromLTRB(16, 2, 16, 4),
    child: Row(
      children: [
        for (var i = 0; i < total; i++)
          Expanded(
            child: Container(
              height: 10,
              margin: const EdgeInsets.symmetric(horizontal: 1.5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(5),
                color: i < results.length
                    ? (results[i] ? _gold : Colors.white24)
                    : (i == results.length ? const Color(0xFFFF9F1C) : Colors.white10),
                border: _milestones.contains(i + 1) ? Border.all(color: Colors.white, width: 1.2) : null,
              ),
            ),
          ),
      ],
    ),
  );
}

/// Cô Mai gợi ý (quyền trợ giúp "Hỏi cô Mai").
class _TeacherHintCard extends StatelessWidget {
  const _TeacherHintCard({required this.controller});

  final TeacherController controller;

  @override
  Widget build(BuildContext context) => ListenableBuilder(
    listenable: controller,
    builder: (context, _) => Container(
      key: const ValueKey('show-teacher-hint'),
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.fromLTRB(4, 4, 12, 4),
      decoration: BoxDecoration(
        color: const Color(0xF2FFFFFF),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFF8E5CF7), width: 2),
      ),
      child: Row(
        children: [
          TeacherAvatar(height: 80, mood: controller.mood, mouthOpen: controller.mouthOpen),
          const SizedBox(width: 6),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Cô Mai gợi ý',
                  style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Color(0xFF8E5CF7)),
                ),
                Text(
                  controller.text,
                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: _navy),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
  );
}

class _GoldButton extends StatelessWidget {
  const _GoldButton({super.key, required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) => Semantics(
    button: true,
    label: label,
    child: GestureDetector(
      onTap: onTap,
      child: _HexBar(
        top: const Color(0xFFFFE08A),
        bottom: const Color(0xFFFF9F1C),
        border: Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 15),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w900, color: Color(0xFF3B1E00), letterSpacing: 1),
        ),
      ),
    ),
  );
}
