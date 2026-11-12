import 'dart:math';

import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/english.dart';
import '../services/sound_service.dart';
import '../tutor/reward_burst.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import '../tutor/tutor_audio_service.dart';
import 'app_theme.dart';
import 'widgets/big_button.dart';

const _navy = Color(0xFF1B2A6B);
const _red = Color(0xFFE5484D);

/// Huy hiệu nhỏ "EN" (cờ Anh vẽ bằng màu, không dùng ảnh ngoài).
class EnglishBadge extends StatelessWidget {
  const EnglishBadge({super.key, this.size = 28});

  final double size;

  @override
  Widget build(BuildContext context) => Container(
    width: size * 1.5,
    height: size,
    alignment: Alignment.center,
    decoration: BoxDecoration(
      gradient: const LinearGradient(colors: [_navy, Color(0xFF2E4BD1)]),
      borderRadius: BorderRadius.circular(size * 0.3),
      border: Border.all(color: Colors.white, width: 2),
      boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 4, offset: Offset(0, 2))],
    ),
    child: Text(
      'EN',
      style: TextStyle(fontSize: size * 0.5, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 1),
    ),
  );
}

/// Thẻ bật/tắt "Toán + Tiếng Anh" ở trang chủ.
class BilingualToggleCard extends StatelessWidget {
  const BilingualToggleCard({super.key, required this.app});

  final AppState app;

  @override
  Widget build(BuildContext context) {
    final on = app.bilingual;
    return Material(
      color: Colors.transparent,
      child: InkWell(
        key: const ValueKey('bilingual-card'),
        borderRadius: BorderRadius.circular(24),
        onTap: () => app.setBilingual(!on),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.fromLTRB(16, 14, 12, 14),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: LinearGradient(
              colors: on
                  ? const [Color(0xFF1B2A6B), Color(0xFF3A57E8), Color(0xFFE5484D)]
                  : const [Color(0xFFFFFFFF), Color(0xFFF3F1FF)],
            ),
            border: Border.all(color: on ? const Color(0xFFE8D3A6) : const Color(0xFFDCD6FF), width: 2),
            boxShadow: [
              BoxShadow(
                color: on ? const Color(0x553A57E8) : const Color(0x14000000),
                blurRadius: 14,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: Row(
            children: [
              const EnglishBadge(size: 34),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Toán + Tiếng Anh',
                      style: TextStyle(
                        fontSize: 21,
                        fontWeight: FontWeight.w800,
                        color: on ? Colors.white : AppColors.ink,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      on ? 'Đang bật: học Toán và Tiếng Anh cùng lúc' : 'Vừa học Toán vừa học Tiếng Anh với cô Mai',
                      style: TextStyle(fontSize: 15, color: on ? const Color(0xFFFFF1C9) : Colors.black54),
                    ),
                  ],
                ),
              ),
              Switch(
                key: const ValueKey('bilingual-switch'),
                value: on,
                activeThumbColor: const Color(0xFFFFD66B),
                onChanged: app.setBilingual,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Dòng tiếng Anh hiện dưới phần cô nhận xét (khi bé làm đúng).
class EnglishLineCard extends StatelessWidget {
  const EnglishLineCard({super.key, required this.text, this.onReplay});

  final String text;
  final VoidCallback? onReplay;

  @override
  Widget build(BuildContext context) => Container(
    key: const ValueKey('english-line'),
    margin: const EdgeInsets.only(bottom: 6),
    padding: const EdgeInsets.fromLTRB(12, 8, 6, 8),
    decoration: BoxDecoration(
      color: const Color(0xFFEEF2FF),
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: const Color(0xFFB9C6FF), width: 2),
    ),
    child: Row(
      children: [
        const EnglishBadge(size: 22),
        const SizedBox(width: 10),
        Expanded(
          child: Text(
            text,
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: _navy, height: 1.3),
          ),
        ),
        if (onReplay != null)
          IconButton(
            tooltip: 'Nghe lại',
            onPressed: onReplay,
            icon: const Icon(Icons.volume_up_rounded, color: _navy),
          ),
      ],
    ),
  );
}

/// Chọn một từ để đố và 2 từ khác làm phương án nhiễu (cố định theo [seed]).
(EnglishWord, List<String>)? englishQuizFor(List<EnglishWord> words, int seed) {
  if (words.length < 3) return null;
  final word = words[seed % words.length];
  final others = [
    for (final w in words)
      if (w.en != word.en) w.en,
  ]..shuffle(Random(seed));
  final choices = [word.en, ...others.take(2)]..shuffle(Random(seed + 7));
  return (word, choices);
}

/// Câu đố nhanh "Góc Tiếng Anh" xen giữa các câu Toán.
Future<void> showEnglishQuiz(BuildContext context, TeacherController teacher, EnglishWord word, List<String> choices) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    isDismissible: false,
    enableDrag: false,
    backgroundColor: Colors.transparent,
    builder: (_) => _EnglishQuizSheet(teacher: teacher, word: word, choices: choices),
  );
}

class _EnglishQuizSheet extends StatefulWidget {
  const _EnglishQuizSheet({required this.teacher, required this.word, required this.choices});

  final TeacherController teacher;
  final EnglishWord word;
  final List<String> choices;

  @override
  State<_EnglishQuizSheet> createState() => _EnglishQuizSheetState();
}

class _EnglishQuizSheetState extends State<_EnglishQuizSheet> {
  String? _picked;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await widget.teacher.say([englishQuizLead, widget.word.quizQuestion]);
      if (!mounted || _picked != null) return;
      for (final c in widget.choices) {
        if (!mounted || _picked != null) break;
        await widget.teacher.say([c]);
      }
    });
  }

  void _pick(String c) {
    if (_picked != null) return;
    setState(() => _picked = c);
    final right = c == widget.word.en;
    widget.teacher.say([
      right ? englishQuizRight : englishQuizWrong,
      widget.word.en,
      widget.word.example,
    ], mood: right ? TeacherMood.clap : TeacherMood.think);
  }

  @override
  Widget build(BuildContext context) {
    final w = widget.word;
    return SafeArea(
      child: Container(
        margin: const EdgeInsets.all(10),
        padding: const EdgeInsets.fromLTRB(18, 16, 18, 16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFFFFFBF0), Color(0xFFEEF2FF)],
          ),
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: const Color(0xFFE8D3A6), width: 3),
          boxShadow: const [BoxShadow(color: Color(0x55000000), blurRadius: 24, offset: Offset(0, 10))],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                const EnglishBadge(size: 30),
                const SizedBox(width: 10),
                const Expanded(
                  child: Text(
                    'Góc Tiếng Anh',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: _navy),
                  ),
                ),
                Icon(Icons.auto_awesome_rounded, color: const Color(0xFFB08A3E).withValues(alpha: 0.9)),
              ],
            ),
            const SizedBox(height: 10),
            Text(
              w.quizQuestion,
              key: const ValueKey('english-quiz-question'),
              style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, height: 1.3),
            ),
            const SizedBox(height: 12),
            for (final c in widget.choices)
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: _ChoiceButton(
                  label: c,
                  state: _picked == null
                      ? null
                      : c == w.en
                      ? true
                      : (c == _picked ? false : null),
                  onTap: () => _pick(c),
                ),
              ),
            if (_picked != null)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(color: const Color(0xFFEEF2FF), borderRadius: BorderRadius.circular(16)),
                child: Text(
                  '${w.en} = ${w.vi}\n“${w.example}”',
                  style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: _navy, height: 1.35),
                ),
              ),
            const SizedBox(height: 8),
            TeacherHud(controller: widget.teacher, avatarHeight: 80, maxTextHeight: 70),
            const SizedBox(height: 8),
            BigButton(
              key: const ValueKey('english-quiz-continue'),
              label: _picked == null ? 'Bỏ qua' : 'Học Toán tiếp',
              icon: Icons.arrow_forward_rounded,
              color: _picked == null ? Colors.grey : AppColors.good,
              onPressed: () {
                widget.teacher.clear();
                Navigator.of(context).pop();
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _ChoiceButton extends StatelessWidget {
  const _ChoiceButton({required this.label, required this.state, required this.onTap});

  final String label;

  /// null = chưa chấm / không liên quan, true = đáp án đúng, false = bé chọn sai.
  final bool? state;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final (bg, edge) = switch (state) {
      true => (AppColors.goodSoft, AppColors.good),
      false => (AppColors.tryAgainSoft, AppColors.tryAgain),
      null => (Colors.white, const Color(0xFFB9C6FF)),
    };
    return Material(
      color: bg,
      borderRadius: BorderRadius.circular(18),
      child: InkWell(
        key: ValueKey('english-choice-$label'),
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Container(
          constraints: const BoxConstraints(minHeight: 58),
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: edge, width: 3),
          ),
          child: Text(
            label,
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: _navy),
          ),
        ),
      ),
    );
  }
}

/// Thẻ từ vựng Tiếng Anh của một chủ đề: cô đọc từ, nghĩa, câu ví dụ; bé lật từng thẻ.
class EnglishVocabScreen extends StatefulWidget {
  const EnglishVocabScreen({super.key, required this.words, this.title = 'Từ vựng Tiếng Anh'});

  final List<EnglishWord> words;
  final String title;

  @override
  State<EnglishVocabScreen> createState() => _EnglishVocabScreenState();
}

class _EnglishVocabScreenState extends State<EnglishVocabScreen> {
  late final List<EnglishWord> _words = widget.words;
  late final TeacherController _teacher = TeacherController(audio: TutorAudioService());
  int _i = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _read());
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _read() {
    final w = _words[_i];
    _teacher.say([w.en, w.meaningLine, w.example], forceVoice: true);
  }

  void _go(int d) {
    setState(() => _i = (_i + d).clamp(0, _words.length - 1));
    _read();
  }

  @override
  Widget build(BuildContext context) {
    final w = _words[_i];
    return Scaffold(
      appBar: AppBar(title: Text(widget.title), backgroundColor: const Color(0xFFEEF2FF)),
      backgroundColor: const Color(0xFFF6F4FF),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: ListView(
              padding: const EdgeInsets.all(18),
              children: [
                Text(
                  'Thẻ ${_i + 1}/${_words.length}',
                  textAlign: TextAlign.center,
                  style: const TextStyle(fontSize: 16, color: Colors.black54, fontWeight: FontWeight.w700),
                ),
                const SizedBox(height: 8),
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 350),
                  transitionBuilder: (c, a) => ScaleTransition(
                    scale: Tween(begin: 0.92, end: 1.0).animate(a),
                    child: FadeTransition(opacity: a, child: c),
                  ),
                  child: Container(
                    key: ValueKey('vocab-card-$_i'),
                    padding: const EdgeInsets.fromLTRB(20, 22, 20, 22),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [_navy, Color(0xFF3A57E8), Color(0xFF7B5CFF)],
                      ),
                      borderRadius: BorderRadius.circular(28),
                      border: Border.all(color: const Color(0xFFE8D3A6), width: 3),
                      boxShadow: const [BoxShadow(color: Color(0x553A57E8), blurRadius: 22, offset: Offset(0, 10))],
                    ),
                    child: Column(
                      children: [
                        const EnglishBadge(size: 30),
                        const SizedBox(height: 12),
                        Text(
                          w.en,
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 40, fontWeight: FontWeight.w900, color: Colors.white),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          w.vi,
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700, color: Color(0xFFFFD66B)),
                        ),
                        const SizedBox(height: 16),
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: const Color(0x26FFFFFF),
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Text(
                            '“${w.example}”',
                            textAlign: TextAlign.center,
                            style: const TextStyle(
                              fontSize: 20,
                              color: Colors.white,
                              height: 1.35,
                              fontStyle: FontStyle.italic,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),
                TeacherHud(controller: _teacher, avatarHeight: 96, maxTextHeight: 80),
                const SizedBox(height: 10),
                Row(
                  children: [
                    IconButton.filledTonal(
                      key: const ValueKey('vocab-prev'),
                      iconSize: 32,
                      onPressed: _i == 0 ? null : () => _go(-1),
                      icon: const Icon(Icons.arrow_back_rounded),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: BigButton(
                        key: const ValueKey('vocab-replay'),
                        label: 'Nghe lại',
                        icon: Icons.volume_up_rounded,
                        color: _red,
                        onPressed: _read,
                      ),
                    ),
                    const SizedBox(width: 10),
                    IconButton.filledTonal(
                      key: const ValueKey('vocab-next'),
                      iconSize: 32,
                      onPressed: _i == _words.length - 1 ? null : () => _go(1),
                      icon: const Icon(Icons.arrow_forward_rounded),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                BigButton(
                  key: const ValueKey('btn-word-game'),
                  label: 'Trò chơi ôn từ',
                  icon: Icons.sports_esports_rounded,
                  color: const Color(0xFF7B5CFF),
                  onPressed: () {
                    _teacher.clear();
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(builder: (_) => EnglishWordGameScreen(words: _words, title: widget.title)),
                    );
                  },
                ),
                const SizedBox(height: 14),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  alignment: WrapAlignment.center,
                  children: [
                    for (final (k, x) in _words.indexed)
                      ChoiceChip(
                        label: Text(x.en, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                        selected: k == _i,
                        onSelected: (_) {
                          setState(() => _i = k);
                          _read();
                        },
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
}


/// Trò chơi ôn từ: lượt chẵn nghe từ tiếng Anh → chọn nghĩa tiếng Việt; lượt lẻ xem nghĩa → chọn từ tiếng Anh.
class EnglishWordGameScreen extends StatefulWidget {
  const EnglishWordGameScreen({super.key, required this.words, this.title = 'Trò chơi ôn từ', this.seed});

  final List<EnglishWord> words;
  final String title;
  final int? seed;

  @override
  State<EnglishWordGameScreen> createState() => _EnglishWordGameScreenState();
}

class _EnglishWordGameScreenState extends State<EnglishWordGameScreen> {
  late final TeacherController _teacher = TeacherController(audio: TutorAudioService());
  late Random _rnd = Random(widget.seed);
  late List<EnglishWord> _rounds;
  late List<String> _choices;
  int _i = 0;
  int _score = 0;
  int _burst = 0;
  String? _picked;
  bool _done = false;

  EnglishWord get _word => _rounds[_i];

  /// Lượt nghe (chọn nghĩa tiếng Việt) hay lượt đọc nghĩa (chọn từ tiếng Anh).
  bool get _listen => _i.isEven;

  @override
  void initState() {
    super.initState();
    _start(first: true);
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _start({bool first = false}) {
    _rnd = Random(widget.seed);
    _rounds = [...widget.words]..shuffle(_rnd);
    if (_rounds.length > 8) _rounds = _rounds.sublist(0, 8);
    _i = 0;
    _score = 0;
    _done = false;
    _setupRound();
    WidgetsBinding.instance.addPostFrameCallback((_) => _ask(lead: true));
  }

  void _setupRound() {
    _picked = null;
    final pool = widget.words.length >= 4 ? widget.words : englishWordIndex.values.toList();
    final others = [
      for (final w in pool)
        if (w.en != _word.en) w,
    ]..shuffle(_rnd);
    final opts = [_word, ...others.take(3)]..shuffle(_rnd);
    _choices = [for (final w in opts) _listen ? w.vi : w.en];
  }

  void _ask({bool lead = false}) {
    if (!mounted || _done) return;
    _teacher.say([
      if (lead) englishGameLead,
      if (_listen) ...[_word.en, englishGameListen] else _word.quizQuestion,
    ], forceVoice: true);
  }

  void _pick(String c) {
    if (_picked != null) return;
    final right = c == (_listen ? _word.vi : _word.en);
    setState(() {
      _picked = c;
      if (right) {
        _score++;
        _burst++;
      }
    });
    if (right) {
      AppSound.instance.correct();
    } else {
      AppSound.instance.wrong();
    }
    _teacher.say([
      right ? englishQuizRight : englishQuizWrong,
      _word.en,
      _word.meaningLine,
    ], mood: right ? TeacherMood.clap : TeacherMood.think, forceVoice: true);
  }

  void _next() {
    _teacher.clear();
    if (_i + 1 >= _rounds.length) {
      setState(() => _done = true);
      AppSound.instance.finish();
      _teacher.say([_score == _rounds.length ? englishGamePerfect : englishGameDone], mood: TeacherMood.clap, forceVoice: true);
      return;
    }
    setState(() {
      _i++;
      _setupRound();
    });
    _ask();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.title), backgroundColor: const Color(0xFFEEF2FF)),
      backgroundColor: const Color(0xFFF6F4FF),
      body: SafeArea(
        child: Stack(
          children: [
            Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 560),
                child: ListView(padding: const EdgeInsets.all(18), children: _done ? _result() : _round()),
              ),
            ),
            Positioned.fill(child: IgnorePointer(child: RewardBurst(trigger: _burst))),
          ],
        ),
      ),
    );
  }

  List<Widget> _round() {
    final w = _word;
    final answer = _listen ? w.vi : w.en;
    return [
      Row(
        children: [
          Text(
            'Câu ${_i + 1}/${_rounds.length}',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: _navy),
          ),
          const Spacer(),
          const Icon(Icons.star_rounded, color: Color(0xFFFFB800), size: 28),
          Text(
            '$_score',
            key: const ValueKey('word-game-score'),
            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: _navy),
          ),
        ],
      ),
      const SizedBox(height: 8),
      ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: LinearProgressIndicator(
          value: (_i + (_picked == null ? 0 : 1)) / _rounds.length,
          minHeight: 10,
          backgroundColor: const Color(0xFFDDE3FF),
          color: const Color(0xFF7B5CFF),
        ),
      ),
      const SizedBox(height: 14),
      Container(
        key: ValueKey('word-game-card-$_i'),
        padding: const EdgeInsets.fromLTRB(18, 18, 18, 18),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [_navy, Color(0xFF3A57E8), Color(0xFF7B5CFF)],
          ),
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: const Color(0xFFE8D3A6), width: 3),
        ),
        child: Column(
          children: [
            Text(
              _listen ? 'Nghe và chọn nghĩa đúng' : 'Chọn từ tiếng Anh đúng',
              style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: Color(0xFFFFD66B)),
            ),
            const SizedBox(height: 10),
            if (_listen)
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  IconButton.filled(
                    key: const ValueKey('word-game-listen'),
                    iconSize: 34,
                    style: IconButton.styleFrom(backgroundColor: _red),
                    onPressed: () => _teacher.say([w.en], forceVoice: true),
                    icon: const Icon(Icons.volume_up_rounded, color: Colors.white),
                  ),
                  const SizedBox(width: 12),
                  Flexible(
                    child: Text(
                      w.en,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 36, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                  ),
                ],
              )
            else
              Text(
                w.vi,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 34, fontWeight: FontWeight.w900, color: Colors.white),
              ),
          ],
        ),
      ),
      const SizedBox(height: 14),
      for (final c in _choices)
        Padding(
          padding: const EdgeInsets.only(bottom: 10),
          child: _ChoiceButton(
            label: c,
            state: _picked == null
                ? null
                : c == answer
                ? true
                : (c == _picked ? false : null),
            onTap: () => _pick(c),
          ),
        ),
      if (_picked != null)
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(color: const Color(0xFFEEF2FF), borderRadius: BorderRadius.circular(16)),
          child: Text(
            '${w.en} = ${w.vi}\n“${w.example}”',
            style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: _navy, height: 1.35),
          ),
        ),
      const SizedBox(height: 8),
      TeacherHud(controller: _teacher, avatarHeight: 80, maxTextHeight: 70),
      const SizedBox(height: 8),
      BigButton(
        key: const ValueKey('word-game-next'),
        label: _picked == null ? 'Bỏ qua' : (_i + 1 >= _rounds.length ? 'Xem điểm' : 'Câu tiếp'),
        icon: Icons.arrow_forward_rounded,
        color: _picked == null ? Colors.grey : AppColors.good,
        onPressed: _next,
      ),
    ];
  }

  List<Widget> _result() {
    final total = _rounds.length;
    final stars = _score == total ? 3 : (_score * 3 >= total * 2 ? 2 : (_score > 0 ? 1 : 0));
    return [
      const SizedBox(height: 10),
      const Center(child: EnglishBadge(size: 44)),
      const SizedBox(height: 12),
      const Text(
        'Kết quả ôn từ',
        textAlign: TextAlign.center,
        style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: _navy),
      ),
      const SizedBox(height: 10),
      Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          for (var k = 0; k < 3; k++)
            Icon(
              Icons.star_rounded,
              size: 64,
              color: k < stars ? const Color(0xFFFFB800) : const Color(0xFFD9D9E3),
            ),
        ],
      ),
      Text(
        'Con đúng $_score/$total từ',
        key: const ValueKey('word-game-result'),
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: _navy),
      ),
      const SizedBox(height: 14),
      TeacherHud(controller: _teacher, avatarHeight: 96, maxTextHeight: 80),
      const SizedBox(height: 14),
      BigButton(
        key: const ValueKey('word-game-again'),
        label: 'Chơi lại',
        icon: Icons.replay_rounded,
        color: const Color(0xFF7B5CFF),
        onPressed: () => setState(_start),
      ),
      const SizedBox(height: 12),
      BigButton(
        key: const ValueKey('word-game-close'),
        label: 'Xong',
        icon: Icons.check_rounded,
        color: AppColors.good,
        onPressed: () => Navigator.of(context).pop(),
      ),
    ];
  }
}
