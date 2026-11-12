import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/ability.dart';
import '../logic/answer_checker.dart';
import '../logic/tutor.dart';
import '../models/content.dart';
import '../models/problem.dart';
import '../services/sound_service.dart';
import '../tutor/reward_burst.dart';
import '../tutor/teacher_assets.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import '../tutor/teacher_intro.dart';
import 'app_theme.dart';
import 'quiz_show_screen.dart';
import 'widgets/answer_views.dart';
import 'widgets/big_button.dart';
import 'widgets/game_art.dart';

// ===========================================================================
// Màu, ảnh của từng mảng kiến thức
// ===========================================================================

Color abilityColor(AbilityDomain d) => switch (d) {
  AbilityDomain.so => const Color(0xFF3A86FF),
  AbilityDomain.congTru => const Color(0xFF2EB872),
  AbilityDomain.nhanChia => const Color(0xFF8E5CF7),
  AbilityDomain.hinhHoc => const Color(0xFFFF9F43),
  AbilityDomain.doLuong => const Color(0xFFFF6FB5),
};

UiAsset abilityArt(AbilityDomain d) => switch (d) {
  AbilityDomain.so => UiAsset.abSo,
  AbilityDomain.congTru => UiAsset.abCongtru,
  AbilityDomain.nhanChia => UiAsset.abNhanchia,
  AbilityDomain.hinhHoc => UiAsset.abHinh,
  AbilityDomain.doLuong => UiAsset.abDoluong,
};

IconData _abilityIcon(AbilityDomain d) => switch (d) {
  AbilityDomain.so => Icons.pin_rounded,
  AbilityDomain.congTru => Icons.exposure_rounded,
  AbilityDomain.nhanChia => Icons.close_rounded,
  AbilityDomain.hinhHoc => Icons.category_rounded,
  AbilityDomain.doLuong => Icons.straighten_rounded,
};

const _ink = Color(0xFF241A5C);

/// Huy hiệu hạng (ảnh Kie.ai hoặc biểu tượng).
class AbilityRankBadge extends StatelessWidget {
  const AbilityRankBadge({super.key, required this.rank, this.size = 120});

  final AbilityRank rank;
  final double size;

  @override
  Widget build(BuildContext context) {
    final path = TeacherAssets.instance.abilityRank(rank.tier);
    if (path != null) {
      return Image.asset(path, width: size, height: size, fit: BoxFit.contain, errorBuilder: (_, _, _) => _fallback());
    }
    return _fallback();
  }

  Widget _fallback() => SizedBox(
    width: size,
    height: size,
    child: Center(
      child: Text(['🌱', '🧭', '⭐', '💎'][rank.tier - 1], style: TextStyle(fontSize: size * 0.6)),
    ),
  );
}

// ===========================================================================
// Ô "Kiểm tra năng lực" trên trang chủ
// ===========================================================================

class AbilityHomeCard extends StatelessWidget {
  const AbilityHomeCard({super.key, required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final results = app.abilityResults;
    final last = results.isEmpty ? null : results.last;
    final due = app.abilityDue;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('ability-card'),
        borderRadius: BorderRadius.circular(26),
        onTap: () => Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => const QuizShowScreen())),
        child: Ink(
          padding: const EdgeInsets.fromLTRB(10, 12, 14, 12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(26),
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFF2B1E7A), Color(0xFF5B3FD6), Color(0xFF9A6BFF)],
            ),
            border: Border.all(color: const Color(0xFFFFD66B), width: 2),
            boxShadow: const [BoxShadow(color: Color(0x553B2AB0), blurRadius: 16, offset: Offset(0, 6))],
          ),
          child: Row(
            children: [
              last == null
                  ? GameIcon(UiAsset.abRocket, size: 84, fallback: const Text('🚀', style: TextStyle(fontSize: 54)))
                  : AbilityRankBadge(rank: last.rank, size: 84),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Kiểm tra năng lực',
                      style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white),
                    ),
                    Text(
                      last == null
                          ? '15 câu · 5 mảng kiến thức · nhận 30 vàng'
                          : '${last.rank.title} · ${last.overall} điểm',
                      style: const TextStyle(fontSize: 15, color: Color(0xFFEDE6FF)),
                    ),
                    if (due)
                      Container(
                        margin: const EdgeInsets.only(top: 6),
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 2),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFD66B),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          last == null ? 'Làm ngay!' : 'Đến lúc kiểm tra lại!',
                          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Color(0xFF4A2A00)),
                        ),
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

// ===========================================================================
// Giới thiệu bài kiểm tra
// ===========================================================================

class AbilityIntroScreen extends StatelessWidget {
  const AbilityIntroScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final results = app.abilityResults;
    final last = results.isEmpty ? null : results.last;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Kiểm tra năng lực'),
        backgroundColor: const Color(0xFF2B1E7A),
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'ability',
        veil: 0,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  TeacherIntro(
                    key: const ValueKey('ability-intro'),
                    lines: [last == null ? TutorLines.abilityIntro : TutorLines.abilityRetest],
                    avatarHeight: 120,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    '5 mảng kiến thức',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Colors.white),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: [for (final d in AbilityDomain.values) _DomainChip(domain: d, score: last?.scores[d])],
                  ),
                  const SizedBox(height: 16),
                  _GlassPanel(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _infoRow(Icons.quiz_rounded, '15 câu, mỗi mảng 3 câu'),
                        _infoRow(Icons.trending_up_rounded, 'Làm đúng thì câu sau khó hơn, sai thì dễ hơn'),
                        _infoRow(Icons.timer_rounded, 'Khoảng 10–15 phút, không giới hạn thời gian'),
                        _infoRow(
                          Icons.card_giftcard_rounded,
                          last == null ? 'Làm xong nhận 30 vàng' : 'Nhận 20 vàng + 1 vàng cho mỗi điểm tiến bộ',
                        ),
                        _infoRow(Icons.event_repeat_rounded, 'Nên kiểm tra lại sau ${AppState.abilityRetestDays} ngày'),
                      ],
                    ),
                  ),
                  if (last != null) ...[
                    const SizedBox(height: 16),
                    _GlassPanel(
                      child: Row(
                        children: [
                          AbilityRankBadge(rank: last.rank, size: 70),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Lần trước', style: TextStyle(fontSize: 14, color: Colors.black54)),
                                Text(
                                  '${last.overall} điểm · ${last.rank.title}',
                                  style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800, color: _ink),
                                ),
                                Text(
                                  'Ngày ${last.at.day}/${last.at.month}/${last.at.year}',
                                  style: const TextStyle(fontSize: 14, color: Colors.black54),
                                ),
                              ],
                            ),
                          ),
                          TextButton(
                            key: const ValueKey('ability-history'),
                            onPressed: () => Navigator.of(context).push(
                              MaterialPageRoute<void>(builder: (_) => AbilityResultScreen(result: last, coins: null)),
                            ),
                            child: const Text('Xem', style: TextStyle(fontSize: 17)),
                          ),
                        ],
                      ),
                    ),
                  ],
                  const SizedBox(height: 20),
                  BigButton(
                    key: const ValueKey('btn-ability-start'),
                    label: last == null ? 'Bắt đầu kiểm tra' : 'Kiểm tra lại',
                    icon: Icons.rocket_launch_rounded,
                    color: const Color(0xFFFF9F1C),
                    onPressed: () => Navigator.of(
                      context,
                    ).pushReplacement(MaterialPageRoute<void>(builder: (_) => const QuizShowScreen())),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  static Widget _infoRow(IconData icon, String text) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 4),
    child: Row(
      children: [
        Icon(icon, color: const Color(0xFF5B3FD6), size: 24),
        const SizedBox(width: 10),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w600, color: _ink),
          ),
        ),
      ],
    ),
  );
}

class _GlassPanel extends StatelessWidget {
  const _GlassPanel({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.92),
      borderRadius: BorderRadius.circular(22),
      boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 14, offset: Offset(0, 5))],
    ),
    child: child,
  );
}

class _DomainChip extends StatelessWidget {
  const _DomainChip({required this.domain, this.score});

  final AbilityDomain domain;
  final int? score;

  @override
  Widget build(BuildContext context) {
    final c = abilityColor(domain);
    return Container(
      width: 108,
      padding: const EdgeInsets.fromLTRB(6, 8, 6, 8),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.92),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: c, width: 2),
      ),
      child: Column(
        children: [
          GameIcon(abilityArt(domain), size: 56, fallback: Icon(_abilityIcon(domain), color: c, size: 40)),
          Text(
            domain.short,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800, color: c),
          ),
          if (score != null) Text('$score điểm', style: const TextStyle(fontSize: 13, color: Colors.black54)),
        ],
      ),
    );
  }
}

// ===========================================================================
// Làm bài
// ===========================================================================

class AbilityTestScreen extends StatefulWidget {
  const AbilityTestScreen({super.key, this.random, this.sound});

  final Random? random;
  final SoundService? sound;

  @override
  State<AbilityTestScreen> createState() => _AbilityTestScreenState();
}

class _AbilityTestScreenState extends State<AbilityTestScreen> {
  Future<List<AbilityItem>>? _bank;
  AbilityTest? _test;
  final _teacher = TeacherController(voiceEnabled: false);
  late final SoundService _sound = widget.sound ?? AppSound.instance;
  UserAnswer? _answer;
  CheckResult? _check;
  int _attempt = 0;
  int _burst = 0;
  bool _locked = false;
  final _clock = Stopwatch();
  Timer? _tick;
  Timer? _advance;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _bank ??= AppScope.read(context).abilityBank();
  }

  @override
  void dispose() {
    _tick?.cancel();
    _advance?.cancel();
    _teacher.dispose();
    super.dispose();
  }

  void _begin(List<AbilityItem> bank) {
    _test = AbilityTest(bank, random: widget.random);
    _clock.start();
    _tick = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted) setState(() {});
    });
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _teacher.voiceEnabled = AppScope.read(context).voiceEnabled;
      _readQuestion(prefix: TutorLines.abilityStart);
    });
  }

  void _readQuestion({String? prefix}) {
    final t = _test;
    if (t == null || t.isFinished) return;
    final p = t.current.problem;
    _teacher.say([?prefix, p.displayInstruction, p.prompt.speak ?? p.prompt.text]);
  }

  UserAnswer _empty(Problem p) => switch (p.body) {
    MultipleChoiceBody() => const ChoiceAnswer({}),
    FillBlankBody() => const BlankAnswer({}),
    DragDropBody() => const DragDropAnswer({}),
    MatchingBody() => const MatchingAnswer({}),
  };

  void _submit() {
    final t = _test!;
    final p = t.current.problem;
    final check = checkAnswer(p, _answer ?? _empty(p));
    if (check.status == CheckStatus.incomplete) {
      _teacher.say(const [TutorLines.incomplete]);
      return;
    }
    final ok = check.status == CheckStatus.correct;
    setState(() {
      _check = check;
      _locked = true;
      if (ok) _burst++;
    });
    ok ? _sound.correct() : _sound.wrong();
    final half = t.index + 1 == t.total ~/ 2;
    _teacher.say([
      ok ? TutorLines.praise[t.index % TutorLines.praise.length] : TutorLines.abilityNext,
      if (half) TutorLines.abilityHalf,
    ], mood: ok ? TeacherMood.clap : TeacherMood.think);
    _advance = Timer(const Duration(milliseconds: 1600), () {
      if (!mounted) return;
      t.answer(correct: ok);
      setState(() {
        _answer = null;
        _check = null;
        _locked = false;
        _attempt++;
      });
      if (t.isFinished) {
        _finish();
      } else {
        _readQuestion();
      }
    });
  }

  Future<void> _finish() async {
    _clock.stop();
    _tick?.cancel();
    final app = AppScope.read(context);
    final result = _test!.result(app.now(), seconds: _clock.elapsed.inSeconds);
    final previous = app.abilityResults.isEmpty ? null : app.abilityResults.last;
    final coins = await app.saveAbilityResult(result);
    _sound.finish();
    if (!mounted) return;
    unawaited(
      Navigator.of(context).pushReplacement(
        MaterialPageRoute<void>(
          builder: (_) => AbilityResultScreen(result: result, previous: previous, coins: coins),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ScreenBackground(
        name: 'ability',
        veil: 0,
        child: SafeArea(
          child: FutureBuilder<List<AbilityItem>>(
            future: _bank,
            builder: (context, snap) {
              if (snap.hasError) {
                return Center(child: Text('Không tải được câu hỏi: ${snap.error}'));
              }
              if (!snap.hasData) {
                return const Center(child: CircularProgressIndicator(color: Colors.white));
              }
              if (_test == null) {
                if (snap.data!.isEmpty) {
                  return const Center(
                    child: Text('Chưa có câu hỏi.', style: TextStyle(fontSize: 22, color: Colors.white)),
                  );
                }
                _begin(snap.data!);
              }
              final t = _test!;
              if (t.isFinished) return const Center(child: CircularProgressIndicator(color: Colors.white));
              return Stack(
                children: [
                  _body(t),
                  Positioned.fill(child: RewardBurst(trigger: _burst)),
                ],
              );
            },
          ),
        ),
      ),
    );
  }

  Widget _body(AbilityTest t) {
    final item = t.current;
    final p = item.problem;
    final c = abilityColor(item.domain);
    final secs = _clock.elapsed.inSeconds;
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(4, 4, 12, 0),
          child: Row(
            children: [
              IconButton(
                tooltip: 'Thoát',
                iconSize: 32,
                color: Colors.white,
                icon: const Icon(Icons.close_rounded),
                onPressed: () => Navigator.of(context).maybePop(),
              ),
              Expanded(
                child: _Segments(total: t.total, done: t.index, color: const Color(0xFFFFD66B)),
              ),
              const SizedBox(width: 10),
              const Icon(Icons.timer_outlined, color: Colors.white, size: 22),
              Text(
                ' ${secs ~/ 60}:${(secs % 60).toString().padLeft(2, '0')}',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Colors.white),
              ),
            ],
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 640),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.fromLTRB(4, 2, 12, 2),
                          decoration: BoxDecoration(color: c, borderRadius: BorderRadius.circular(20)),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              GameIcon(
                                abilityArt(item.domain),
                                size: 34,
                                fallback: Icon(_abilityIcon(item.domain), color: Colors.white),
                              ),
                              const SizedBox(width: 4),
                              Text(
                                item.domain.short,
                                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                        const Spacer(),
                        Text(
                          'Câu ${t.index + 1}/${t.total}',
                          key: const ValueKey('ability-progress'),
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Colors.white),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Container(
                      padding: const EdgeInsets.all(18),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(24),
                        border: Border.all(color: c.withValues(alpha: 0.6), width: 3),
                        boxShadow: const [BoxShadow(color: Color(0x40000000), blurRadius: 16, offset: Offset(0, 6))],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            p.displayInstruction,
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            p.prompt.text,
                            style: const TextStyle(
                              fontSize: AppSizes.promptFont,
                              fontWeight: FontWeight.w700,
                              height: 1.35,
                            ),
                          ),
                          const SizedBox(height: 14),
                          KeyedSubtree(
                            key: ValueKey('${p.id}#$_attempt'),
                            child: buildAnswerView(
                              problem: p,
                              state: AnswerViewState(enabled: !_locked, check: _check, showCorrect: _check != null),
                              onChanged: (a) => _answer = a,
                              random: widget.random,
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
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(12, 8, 12, 12),
          decoration: const BoxDecoration(
            color: Color(0xE6FFFFFF),
            borderRadius: BorderRadius.vertical(top: Radius.circular(26)),
          ),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 640),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TeacherHud(controller: _teacher, avatarHeight: 96, maxTextHeight: 104),
                  const SizedBox(height: 6),
                  BigButton(
                    key: const ValueKey('btn-ability-answer'),
                    label: 'Trả lời',
                    icon: Icons.check_rounded,
                    onPressed: _locked ? null : _submit,
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

/// Thanh tiến độ chia ô (mỗi câu một ô).
class _Segments extends StatelessWidget {
  const _Segments({required this.total, required this.done, required this.color});

  final int total;
  final int done;
  final Color color;

  @override
  Widget build(BuildContext context) => Row(
    children: [
      for (var i = 0; i < total; i++)
        Expanded(
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            height: 12,
            margin: const EdgeInsets.symmetric(horizontal: 1.5),
            decoration: BoxDecoration(
              color: i < done ? color : Colors.white.withValues(alpha: i == done ? 0.7 : 0.3),
              borderRadius: BorderRadius.circular(6),
            ),
          ),
        ),
    ],
  );
}

// ===========================================================================
// Kết quả
// ===========================================================================

class AbilityResultScreen extends StatefulWidget {
  const AbilityResultScreen({super.key, required this.result, this.previous, required this.coins});

  final AbilityResult result;
  final AbilityResult? previous;

  /// Vàng vừa nhận (null = đang xem lại kết quả cũ).
  final int? coins;

  @override
  State<AbilityResultScreen> createState() => _AbilityResultScreenState();
}

class _AbilityResultScreenState extends State<AbilityResultScreen> {
  int _burst = 0;

  List<String> get _lines {
    final r = widget.result;
    final prev = widget.previous;
    return [
      TutorLines.abilityRank[r.rank.tier]!,
      if (prev != null) r.overall > prev.overall ? TutorLines.abilityImproved : TutorLines.abilitySame,
      if (r.weakest != null && (r.scores[r.weakest] ?? 100) < 85) TutorLines.abilityWeak(r.weakest!.title),
    ];
  }

  @override
  void initState() {
    super.initState();
    if (widget.coins != null) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) setState(() => _burst++);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final r = widget.result;
    final prev = widget.previous;
    final history = app.abilityResults;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bảng năng lực'),
        backgroundColor: const Color(0xFF2B1E7A),
        foregroundColor: Colors.white,
      ),
      body: ScreenBackground(
        name: 'ability',
        veil: 0,
        child: Stack(
          children: [
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 640),
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      _RankHeader(result: r, coins: widget.coins),
                      const SizedBox(height: 12),
                      TeacherIntro(
                        key: const ValueKey('ability-result-teacher'),
                        lines: _lines,
                        mood: r.overall >= 40 ? TeacherMood.clap : TeacherMood.idle,
                        avatarHeight: 110,
                      ),
                      const SizedBox(height: 12),
                      _GlassPanel(
                        child: Column(
                          children: [
                            const Text(
                              'Biểu đồ năng lực',
                              style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: _ink),
                            ),
                            if (prev != null)
                              const Padding(
                                padding: EdgeInsets.only(top: 2),
                                child: Text(
                                  'Màu tím: lần này · Nét đứt xám: lần trước',
                                  style: TextStyle(fontSize: 13, color: Colors.black54),
                                ),
                              ),
                            const SizedBox(height: 8),
                            AspectRatio(
                              aspectRatio: 1.15,
                              child: CustomPaint(
                                key: const ValueKey('ability-radar'),
                                painter: AbilityRadarPainter(current: r, previous: prev),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(height: 12),
                      _GlassPanel(
                        child: Column(
                          children: [
                            for (final d in AbilityDomain.values)
                              if (r.scores[d] != null)
                                _DomainBar(domain: d, score: r.scores[d]!, before: prev?.scores[d]),
                          ],
                        ),
                      ),
                      if (r.weakest != null) ...[const SizedBox(height: 12), _Recommendation(domain: r.weakest!)],
                      if (history.length >= 2) ...[
                        const SizedBox(height: 12),
                        _GlassPanel(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Hành trình tiến bộ',
                                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800, color: _ink),
                              ),
                              const SizedBox(height: 8),
                              SizedBox(
                                height: 140,
                                child: CustomPaint(
                                  size: Size.infinite,
                                  painter: _HistoryPainter([for (final h in history) h.overall]),
                                ),
                              ),
                              Text(
                                '${history.length} lần kiểm tra · cao nhất ${history.map((h) => h.overall).reduce(max)} điểm',
                                style: const TextStyle(fontSize: 14, color: Colors.black54),
                              ),
                            ],
                          ),
                        ),
                      ],
                      const SizedBox(height: 16),
                      BigButton(
                        key: const ValueKey('btn-ability-done'),
                        label: 'Về trang chủ',
                        icon: Icons.home_rounded,
                        onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned.fill(
              child: IgnorePointer(child: RewardBurst(trigger: _burst, count: 28)),
            ),
          ],
        ),
      ),
    );
  }
}

class _RankHeader extends StatelessWidget {
  const _RankHeader({required this.result, required this.coins});

  final AbilityResult result;
  final int? coins;

  @override
  Widget build(BuildContext context) {
    final r = result;
    final mins = r.seconds ~/ 60, secs = r.seconds % 60;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(28),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFFFFF4D6), Color(0xFFFFE08A), Color(0xFFFFC93C)],
        ),
        border: Border.all(color: Colors.white, width: 3),
        boxShadow: const [BoxShadow(color: Color(0x55FFB800), blurRadius: 20, offset: Offset(0, 6))],
      ),
      child: Row(
        children: [
          TweenAnimationBuilder<double>(
            tween: Tween(begin: 0.4, end: 1),
            duration: const Duration(milliseconds: 900),
            curve: Curves.elasticOut,
            builder: (_, v, child) => Transform.scale(scale: v, child: child),
            child: AbilityRankBadge(rank: r.rank, size: 120),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  r.rank.title,
                  key: const ValueKey('ability-rank'),
                  style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Color(0xFF5A3A00)),
                ),
                TweenAnimationBuilder<int>(
                  tween: IntTween(begin: 0, end: r.overall),
                  duration: const Duration(milliseconds: 1200),
                  builder: (_, v, _) => Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: '$v',
                          style: const TextStyle(fontSize: 54, fontWeight: FontWeight.w900, color: Color(0xFF3B2A00)),
                        ),
                        const TextSpan(
                          text: ' /100 điểm',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: Color(0xFF6B4E00)),
                        ),
                      ],
                    ),
                    key: const ValueKey('ability-score'),
                  ),
                ),
                Text(
                  'Đúng ${r.correct}/${r.total} câu · $mins phút ${secs.toString().padLeft(2, '0')} giây',
                  style: const TextStyle(fontSize: 14, color: Color(0xFF6B4E00), fontWeight: FontWeight.w600),
                ),
                if (coins != null && coins! > 0)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Row(
                      children: [
                        GameIcon(UiAsset.coin, size: 24, fallback: const Text('🪙')),
                        Text(
                          ' +$coins vàng',
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF3B2A00)),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _DomainBar extends StatelessWidget {
  const _DomainBar({required this.domain, required this.score, this.before});

  final AbilityDomain domain;
  final int score;
  final int? before;

  @override
  Widget build(BuildContext context) {
    final c = abilityColor(domain);
    final delta = before == null ? null : score - before!;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        children: [
          GameIcon(abilityArt(domain), size: 40, fallback: Icon(_abilityIcon(domain), color: c)),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(domain.title, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
                    ),
                    Text(
                      '$score',
                      style: TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: c),
                    ),
                    if (delta != null && delta != 0)
                      Text(
                        delta > 0 ? '  ▲$delta' : '  ▼${-delta}',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: delta > 0 ? AppColors.good : AppColors.tryAgain,
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: 3),
                ClipRRect(
                  borderRadius: BorderRadius.circular(6),
                  child: TweenAnimationBuilder<double>(
                    tween: Tween(begin: 0, end: score / 100),
                    duration: const Duration(milliseconds: 1000),
                    curve: Curves.easeOutCubic,
                    builder: (_, v, _) => LinearProgressIndicator(
                      value: v,
                      minHeight: 10,
                      color: c,
                      backgroundColor: c.withValues(alpha: 0.15),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

/// Gợi ý: chủ đề nên học để nâng mảng yếu nhất.
class _Recommendation extends StatelessWidget {
  const _Recommendation({required this.domain});

  final AbilityDomain domain;

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final chapters = [...?app.book?.chapters]..sort((a, b) => a.order.compareTo(b.order));
    Chapter? target;
    for (final c in chapters) {
      if (AbilityDomain.ofChapter(c.order) != domain) continue;
      final unfinished = c.lessons.any((l) => (app.lessonProgress(l.id)?.bestStars ?? 0) < 3);
      if (unfinished) {
        target = c;
        break;
      }
    }
    target ??= chapters.where((c) => AbilityDomain.ofChapter(c.order) == domain).firstOrNull;
    final c = abilityColor(domain);
    return _GlassPanel(
      child: Row(
        children: [
          GameIcon(abilityArt(domain), size: 56, fallback: Icon(_abilityIcon(domain), color: c, size: 40)),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Cô gợi ý luyện thêm', style: TextStyle(fontSize: 14, color: Colors.black54)),
                Text(
                  domain.title,
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: c),
                ),
                if (target != null)
                  Text('Chủ đề ${target.order}: ${target.title}', style: const TextStyle(fontSize: 14)),
              ],
            ),
          ),
          if (target != null)
            FilledButton(
              key: const ValueKey('ability-recommend'),
              style: FilledButton.styleFrom(backgroundColor: c),
              onPressed: () =>
                  Navigator.of(context).push(MaterialPageRoute<void>(builder: (_) => abilityChapterBuilder(target!))),
              child: const Text('Học ngay', style: TextStyle(fontSize: 16)),
            ),
        ],
      ),
    );
  }
}

/// Màn chủ đề để mở từ gợi ý (gán từ child_screens.dart để tránh nhập vòng).
Widget Function(Chapter) abilityChapterBuilder = (c) => Scaffold(appBar: AppBar(title: Text(c.title)));

/// Biểu đồ mạng nhện 5 mảng (lần này + lần trước).
class AbilityRadarPainter extends CustomPainter {
  AbilityRadarPainter({required this.current, this.previous});

  final AbilityResult current;
  final AbilityResult? previous;

  @override
  void paint(Canvas canvas, Size size) {
    final domains = AbilityDomain.values;
    final center = Offset(size.width / 2, size.height / 2 + 6);
    final radius = min(size.width, size.height) / 2 - 34;
    Offset at(int i, double v) {
      final a = -pi / 2 + 2 * pi * i / domains.length;
      return center + Offset(cos(a), sin(a)) * radius * v;
    }

    final grid = Paint()
      ..style = PaintingStyle.stroke
      ..color = const Color(0x22241A5C)
      ..strokeWidth = 1.2;
    for (final ring in [0.25, 0.5, 0.75, 1.0]) {
      canvas.drawPath(Path()..addPolygon([for (var i = 0; i < domains.length; i++) at(i, ring)], true), grid);
    }
    for (var i = 0; i < domains.length; i++) {
      canvas.drawLine(center, at(i, 1), grid);
    }

    Path shape(AbilityResult r) =>
        Path()..addPolygon([for (final (i, d) in domains.indexed) at(i, (r.scores[d] ?? 0) / 100)], true);

    if (previous != null) {
      final prevPaint = Paint()
        ..style = PaintingStyle.stroke
        ..color = const Color(0xFF9A9AB0)
        ..strokeWidth = 2;
      // nét đứt đơn giản
      for (final metric in shape(previous!).computeMetrics()) {
        for (var d = 0.0; d < metric.length; d += 10) {
          canvas.drawPath(metric.extractPath(d, min(d + 5, metric.length)), prevPaint);
        }
      }
    }
    canvas.drawPath(
      shape(current),
      Paint()
        ..shader = const RadialGradient(
          colors: [Color(0xAA9A6BFF), Color(0x665B3FD6)],
        ).createShader(Rect.fromCircle(center: center, radius: radius)),
    );
    canvas.drawPath(
      shape(current),
      Paint()
        ..style = PaintingStyle.stroke
        ..color = const Color(0xFF5B3FD6)
        ..strokeWidth = 3
        ..strokeJoin = StrokeJoin.round,
    );
    for (final (i, d) in domains.indexed) {
      final v = (current.scores[d] ?? 0) / 100;
      canvas.drawCircle(at(i, v), 5.5, Paint()..color = abilityColor(d));
      canvas.drawCircle(
        at(i, v),
        5.5,
        Paint()
          ..style = PaintingStyle.stroke
          ..color = Colors.white
          ..strokeWidth = 2,
      );
      final tp = TextPainter(
        text: TextSpan(
          text: '${d.short}\n${current.scores[d] ?? 0}',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: abilityColor(d), fontFamily: 'Andika'),
        ),
        textAlign: TextAlign.center,
        textDirection: TextDirection.ltr,
      )..layout();
      final p = at(i, 1.18);
      tp.paint(canvas, p - Offset(tp.width / 2, tp.height / 2));
    }
  }

  @override
  bool shouldRepaint(AbilityRadarPainter old) => old.current != current || old.previous != previous;
}

/// Đường điểm tổng qua các lần kiểm tra.
class _HistoryPainter extends CustomPainter {
  _HistoryPainter(this.values);

  final List<int> values;

  @override
  void paint(Canvas canvas, Size size) {
    if (values.length < 2) return;
    final dx = size.width / (values.length - 1);
    Offset pt(int i) => Offset(i * dx, size.height - 16 - (size.height - 32) * values[i] / 100);
    final line = Path()..moveTo(pt(0).dx, pt(0).dy);
    for (var i = 1; i < values.length; i++) {
      line.lineTo(pt(i).dx, pt(i).dy);
    }
    final fill = Path.from(line)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(
      fill,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0x559A6BFF), Color(0x009A6BFF)],
        ).createShader(Offset.zero & size),
    );
    canvas.drawPath(
      line,
      Paint()
        ..style = PaintingStyle.stroke
        ..color = const Color(0xFF5B3FD6)
        ..strokeWidth = 3,
    );
    for (var i = 0; i < values.length; i++) {
      canvas.drawCircle(pt(i), 5, Paint()..color = const Color(0xFFFFB800));
      final tp = TextPainter(
        text: TextSpan(
          text: '${values[i]}',
          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: _ink, fontFamily: 'Andika'),
        ),
        textDirection: TextDirection.ltr,
      )..layout();
      tp.paint(canvas, pt(i) - Offset(tp.width / 2, 20));
    }
  }

  @override
  bool shouldRepaint(_HistoryPainter old) => old.values != values;
}
