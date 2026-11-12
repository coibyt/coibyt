import 'dart:async';

import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import '../game/game_store.dart';
import '../game/goals.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/teacher_script.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'english_audio.dart';
import 'english_catalog.dart';
import 'english_quiz.dart';
import 'english_scope.dart';
import 'widgets/pip.dart';
import 'widgets/word_picture.dart';

/// Gradient per English unit.
List<Color> unitColors(String id) => switch (id) {
  'colours' => const <Color>[Color(0xFFB0367F), Color(0xFFFF8A65)],
  'numbers' => const <Color>[Color(0xFF3E2483), Color(0xFF7B45D1)],
  'animals' => const <Color>[Color(0xFF155E3F), Color(0xFF3FBF84)],
  'food' => const <Color>[Color(0xFF9E2A3E), Color(0xFFFF8A7A)],
  'family' => const <Color>[Color(0xFF7E2152), Color(0xFFE0679A)],
  'nature' => const <Color>[Color(0xFF16507E), Color(0xFF45A2E0)],
  _ => const <Color>[Color(0xFF7A3E1D), Color(0xFFE0954B)],
};

/// The English corner: Pip greets the child, units of words, and a quick
/// round that earns an energy brush and coins (learning powers playing).
class EnglishCornerScreen extends StatefulWidget {
  const EnglishCornerScreen({super.key});

  @override
  State<EnglishCornerScreen> createState() => _EnglishCornerScreenState();
}

class _EnglishCornerScreenState extends State<EnglishCornerScreen> {
  Timer? _intro;
  EnglishAudio? _audio;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _audio = EnglishScope.maybeOf(context)?.audio;
  }

  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      unawaited(EnglishScope.read(context)?.audio.say(<String>['pip_hello']));
      _intro = Timer(const Duration(milliseconds: 2600), () {
        if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'english_intro');
      });
    });
  }

  @override
  void dispose() {
    _intro?.cancel();
    unawaited(_audio?.stop());
    _teacher.dispose();
    super.dispose();
  }

  void _round(List<EnglishWord> pool) {
    _teacher.close();
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => EnglishRoundScreen(pool: pool)));
  }

  @override
  Widget build(BuildContext context) {
    final EnglishScope? english = EnglishScope.maybeOf(context);
    final List<EnglishUnit> units = english?.catalog.units ?? const <EnglishUnit>[];
    final List<EnglishWord> all = english?.catalog.words ?? const <EnglishWord>[];
    final int learned = english?.store.learnedCount(all.map((EnglishWord w) => w.id)) ?? 0;
    final String lang = context.language.locale.languageCode;
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('english.title'))),
      body: Stack(
        children: <Widget>[
          CustomScrollView(
            slivers: <Widget>[
              SliverToBoxAdapter(
                child: Container(
                  margin: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: <Color>[Color(0xFF0B6B5E), Color(0xFF1DB39B)],
                    ),
                    borderRadius: BorderRadius.circular(28),
                    border: Border.all(color: const Color(0x55FFD27A)),
                  ),
                  child: Row(
                    children: <Widget>[
                      Pip(audio: english?.audio, size: 110),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            const Text(
                              "Hello! I'm Pip!",
                              style: TextStyle(
                                fontWeight: FontWeight.w900,
                                fontSize: 20,
                                color: Colors.white,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              context.tr(
                                'english.learned',
                                args: <String, Object?>{'count': learned, 'total': all.length},
                              ),
                              key: const Key('englishLearned'),
                              style: const TextStyle(
                                color: AppTheme.gold,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                            const SizedBox(height: 6),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(6),
                              child: LinearProgressIndicator(
                                value: all.isEmpty ? 0 : learned / all.length,
                                minHeight: 7,
                                backgroundColor: const Color(0x33FFFFFF),
                              ),
                            ),
                            const SizedBox(height: 10),
                            FilledButton.icon(
                              key: const Key('englishPlay'),
                              onPressed: all.isEmpty ? null : () => _round(all),
                              icon: const Icon(Icons.play_arrow_rounded),
                              label: Text(context.tr('english.play')),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SliverPadding(
                padding: const EdgeInsets.fromLTRB(16, 4, 16, 170),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                    maxCrossAxisExtent: 220,
                    mainAxisSpacing: 12,
                    crossAxisSpacing: 12,
                    childAspectRatio: 0.95,
                  ),
                  delegate: SliverChildBuilderDelegate((BuildContext context, int i) {
                    final EnglishUnit u = units[i];
                    final int done =
                        english?.store.learnedCount(u.words.map((EnglishWord w) => w.id)) ?? 0;
                    final List<Color> c = unitColors(u.id);
                    return Material(
                      key: Key('unit-${u.id}'),
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(24),
                      clipBehavior: Clip.antiAlias,
                      child: Ink(
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: c,
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(24),
                          border: Border.all(color: const Color(0x33FFFFFF)),
                        ),
                        child: InkWell(
                          onTap: () {
                            _teacher.close();
                            Navigator.of(context).push(
                              MaterialPageRoute<void>(builder: (_) => EnglishUnitScreen(unit: u)),
                            );
                          },
                          child: Padding(
                            padding: const EdgeInsets.all(12),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Expanded(
                                  child: Center(
                                    child: Wrap(
                                      spacing: 2,
                                      children: <Widget>[
                                        for (final EnglishWord w in u.words.take(3))
                                          WordPicture(word: w, size: 46),
                                      ],
                                    ),
                                  ),
                                ),
                                Text(
                                  u.title(lang),
                                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                                ),
                                Text(
                                  '${u.titleEn} · $done/${u.words.length}',
                                  style: const TextStyle(color: Color(0xDDFFFFFF), fontSize: 12),
                                ),
                                const SizedBox(height: 6),
                                ClipRRect(
                                  borderRadius: BorderRadius.circular(4),
                                  child: LinearProgressIndicator(
                                    value: done / u.words.length,
                                    minHeight: 5,
                                    backgroundColor: const Color(0x33FFFFFF),
                                    color: AppTheme.gold,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                  }, childCount: units.length),
                ),
              ),
            ],
          ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}

/// Word cards of a unit: Pip reads each card aloud as it appears; tapping
/// the card reads the word and the example sentence.
class EnglishUnitScreen extends StatefulWidget {
  const EnglishUnitScreen({super.key, required this.unit});

  final EnglishUnit unit;

  @override
  State<EnglishUnitScreen> createState() => _EnglishUnitScreenState();
}

class _EnglishUnitScreenState extends State<EnglishUnitScreen> {
  EnglishAudio? _audio;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _audio = EnglishScope.maybeOf(context)?.audio;
  }

  final PageController _pages = PageController(viewportFraction: 0.86);
  final TeacherController _teacher = TeacherController();
  int _index = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _read(0);
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'english_cards', mood: 'point')]);
    });
  }

  void _read(int i, {bool sentence = false}) {
    final EnglishWord w = widget.unit.words[i];
    unawaited(
      EnglishScope.read(context)?.audio.say(<String>[w.audio, if (sentence) w.sentenceAudio]),
    );
  }

  @override
  void dispose() {
    unawaited(_audio?.stop());
    _pages.dispose();
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final EnglishScope? english = EnglishScope.maybeOf(context);
    final List<Color> c = unitColors(widget.unit.id);
    final String lang = context.language.locale.languageCode;
    return Scaffold(
      appBar: AppBar(title: Text('${widget.unit.title(lang)} · ${widget.unit.titleEn}')),
      body: Stack(
        children: <Widget>[
          Column(
            children: <Widget>[
              Expanded(
                child: PageView.builder(
                  controller: _pages,
                  itemCount: widget.unit.words.length,
                  onPageChanged: (int i) {
                    setState(() => _index = i);
                    _read(i);
                  },
                  itemBuilder: (BuildContext context, int i) {
                    final EnglishWord w = widget.unit.words[i];
                    final bool learned = english?.store.learned(w.id) ?? false;
                    return GestureDetector(
                      key: Key('wordCard-${w.id}'),
                      onTap: () => _read(i, sentence: true),
                      child: Container(
                        margin: const EdgeInsets.fromLTRB(6, 14, 6, 14),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: c,
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(30),
                          border: Border.all(color: const Color(0x55FFFFFF), width: 1.5),
                          boxShadow: <BoxShadow>[
                            BoxShadow(color: c.last.withValues(alpha: 0.35), blurRadius: 20),
                          ],
                        ),
                        padding: const EdgeInsets.all(18),
                        child: Column(
                          children: <Widget>[
                            Align(
                              alignment: Alignment.topRight,
                              child: learned
                                  ? Chip(
                                      avatar: const Icon(
                                        Icons.verified_rounded,
                                        color: Color(0xFF2EAD6B),
                                      ),
                                      label: Text(context.tr('english.mastered')),
                                    )
                                  : const SizedBox(height: 32),
                            ),
                            Expanded(
                              child: Container(
                                width: double.infinity,
                                decoration: BoxDecoration(
                                  color: const Color(0xFFFFFAF0),
                                  borderRadius: BorderRadius.circular(24),
                                ),
                                alignment: Alignment.center,
                                child: WordPicture(word: w, size: 190),
                              ),
                            ),
                            const SizedBox(height: 14),
                            Text(
                              w.en,
                              style: const TextStyle(
                                fontSize: 40,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                                shadows: <Shadow>[Shadow(color: Color(0x66000000), blurRadius: 8)],
                              ),
                            ),
                            Text(
                              w.vi,
                              style: const TextStyle(
                                color: AppTheme.gold,
                                fontSize: 18,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              '“${w.sentence}”',
                              textAlign: TextAlign.center,
                              style: const TextStyle(
                                fontSize: 16,
                                fontStyle: FontStyle.italic,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              w.sentenceVi,
                              style: const TextStyle(color: Color(0xCCFFFFFF), fontSize: 13),
                            ),
                            const SizedBox(height: 8),
                            const Icon(Icons.volume_up_rounded, color: Colors.white70),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                child: Row(
                  children: <Widget>[
                    Pip(audio: english?.audio, size: 64),
                    const SizedBox(width: 8),
                    Text(
                      '${_index + 1}/${widget.unit.words.length}',
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                    ),
                    const Spacer(),
                    FilledButton.icon(
                      key: const Key('unitPractice'),
                      onPressed: () {
                        _teacher.close();
                        Navigator.of(context).push(
                          MaterialPageRoute<void>(
                            builder: (_) => EnglishRoundScreen(pool: widget.unit.words),
                          ),
                        );
                      },
                      icon: const Icon(Icons.sports_esports_rounded),
                      label: Text(context.tr('english.practice')),
                    ),
                  ],
                ),
              ),
            ],
          ),
          Positioned(
            left: 0,
            right: 0,
            bottom: 84,
            child: TeacherOverlay(
              controller: _teacher,
              inline: true,
              collapsedAlignment: Alignment.bottomRight,
              autoAdvance: const Duration(seconds: 1),
            ),
          ),
        ],
      ),
    );
  }
}

/// A round of five "listen and pick" questions. Finishing it earns an
/// energy brush and coins.
class EnglishRoundScreen extends StatefulWidget {
  const EnglishRoundScreen({super.key, required this.pool, this.count = 5});

  final List<EnglishWord> pool;
  final int count;

  @override
  State<EnglishRoundScreen> createState() => _EnglishRoundScreenState();
}

class _EnglishRoundScreenState extends State<EnglishRoundScreen> {
  EnglishAudio? _audio;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _audio = EnglishScope.maybeOf(context)?.audio;
  }

  final TeacherController _teacher = TeacherController();
  late List<QuizQuestion> _questions;
  int _index = 0;
  int _firstTry = 0;
  bool _missed = false;
  bool _finished = false;
  bool _cheer = false;
  int _coins = 0;

  @override
  void initState() {
    super.initState();
    _questions = <QuizQuestion>[];
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      final EnglishScope? english = EnglishScope.read(context);
      setState(() => _questions = makeQuiz(widget.pool, english?.store, count: widget.count));
      _teacher.say(const <TeacherLine>[TeacherLine(id: 'english_quiz', mood: 'point')]);
      _ask();
    });
  }

  @override
  void dispose() {
    unawaited(_audio?.stop());
    _teacher.dispose();
    super.dispose();
  }

  void _ask() {
    if (_index >= _questions.length) return;
    unawaited(
      EnglishScope.read(context)?.audio
          .say(<String>['pip_listen', _questions[_index].answer.audio]),
    );
  }

  Future<void> _answer(bool ok) async {
    final EnglishScope? english = EnglishScope.read(context);
    final QuizQuestion q = _questions[_index];
    if (!ok) {
      _missed = true;
      await english?.audio.say(<String>['pip_try', q.answer.audio]);
      return;
    }
    if (!_missed) _firstTry++;
    unawaited(english?.store.record(q.answer.id, correct: !_missed));
    unawaited(GameScope.read(context)?.track(GameEvent.english));
    setState(() => _cheer = true);
    await english?.audio.say(<String>[
      q.answer.sentenceAudio,
      if (_index.isEven) 'pip_great' else 'pip_super',
    ]);
    if (!mounted) return;
    setState(() {
      _cheer = false;
      _missed = false;
      _index++;
    });
    if (_index < _questions.length) {
      _ask();
    } else {
      await _finish();
    }
  }

  Future<void> _finish() async {
    final GameStore? game = GameScope.read(context);
    _coins = 5 + _firstTry;
    await game?.earnBrush();
    await game?.addCoins(_coins);
    await game?.recordActivity();
    if (!mounted) return;
    setState(() => _finished = true);
    _teacher.say(const <TeacherLine>[TeacherLine(id: 'english_round_done', mood: 'cheer')]);
    unawaited(EnglishScope.read(context)?.audio.say(<String>['pip_round']));
  }

  @override
  Widget build(BuildContext context) {
    final EnglishScope? english = EnglishScope.maybeOf(context);
    return Scaffold(
      appBar: AppBar(
        title: Text(context.tr('english.listenPick')),
        actions: <Widget>[
          if (!_finished && _questions.isNotEmpty)
            Padding(
              padding: const EdgeInsets.only(right: 16),
              child: Center(
                child: Text(
                  context.tr(
                    'english.round',
                    args: <String, Object?>{'n': _index + 1, 'total': _questions.length},
                  ),
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
              ),
            ),
        ],
      ),
      body: Stack(
        children: <Widget>[
          if (_finished)
            Center(
              child: Column(
                key: const Key('roundDone'),
                mainAxisSize: MainAxisSize.min,
                children: <Widget>[
                  Pip(audio: english?.audio, size: 160, cheering: true),
                  const SizedBox(height: 10),
                  Text(
                    context.tr('english.done'),
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      for (int i = 0; i < _questions.length; i++)
                        Icon(
                          Icons.star_rounded,
                          size: 34,
                          color: i < _firstTry ? const Color(0xFFFFD24A) : const Color(0x33FFFFFF),
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    context.tr('english.reward', args: <String, Object?>{'coins': _coins}),
                    key: const Key('roundReward'),
                    style: const TextStyle(
                      color: AppTheme.gold,
                      fontWeight: FontWeight.w900,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      OutlinedButton(
                        key: const Key('roundBack'),
                        onPressed: () => Navigator.of(context).pop(),
                        child: Text(context.tr('english.back')),
                      ),
                      const SizedBox(width: 10),
                      FilledButton(
                        key: const Key('roundAgain'),
                        onPressed: () => Navigator.of(context).pushReplacement(
                          MaterialPageRoute<void>(
                            builder: (_) => EnglishRoundScreen(pool: widget.pool),
                          ),
                        ),
                        child: Text(context.tr('english.again')),
                      ),
                    ],
                  ),
                ],
              ),
            )
          else if (_questions.isNotEmpty)
            ListView(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 170),
              children: <Widget>[
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Pip(audio: english?.audio, size: 120, cheering: _cheer),
                    const SizedBox(width: 8),
                    IconButton.filledTonal(
                      key: const Key('replayWord'),
                      iconSize: 34,
                      onPressed: () =>
                          english?.audio.say(<String>[_questions[_index].answer.audio]),
                      icon: const Icon(Icons.volume_up_rounded),
                    ),
                  ],
                ),
                const SizedBox(height: 8),
                LinearProgressIndicator(value: _index / _questions.length, minHeight: 6),
                const SizedBox(height: 18),
                QuizOptions(question: _questions[_index], onAnswer: _answer, size: 82),
                if (_cheer) ...<Widget>[
                  const SizedBox(height: 16),
                  Center(
                    child: Text(
                      '${_questions[_index].answer.en} · ${_questions[_index].answer.vi}',
                      key: const Key('answerShown'),
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
                    ),
                  ),
                ],
              ],
            ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}
