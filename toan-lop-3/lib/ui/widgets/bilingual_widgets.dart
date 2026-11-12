import 'dart:math';

import 'package:flutter/material.dart';

import '../../app_state.dart';
import '../../services/english_content.dart';
import '../../tutor/teacher_avatar.dart';
import '../../tutor/teacher_controller.dart';
import '../../tutor/teacher_hud.dart';
import '../../tutor/tutor_audio_service.dart';

const _enBlue = Color(0xFF1D4ED8);
const _enRed = Color(0xFFE11D48);

/// Nhãn "EN" nhỏ (cờ tiếng Anh vẽ bằng màu, không phụ thuộc font emoji).
class EnBadge extends StatelessWidget {
  const EnBadge({super.key, this.size = 13});

  final double size;

  @override
  Widget build(BuildContext context) => Container(
    padding: EdgeInsets.symmetric(horizontal: size * 0.45, vertical: size * 0.12),
    decoration: BoxDecoration(
      gradient: const LinearGradient(colors: [_enBlue, Color(0xFF3B82F6)]),
      borderRadius: BorderRadius.circular(size),
      border: Border.all(color: _enRed, width: 1.5),
    ),
    child: Text(
      'EN',
      style: TextStyle(fontSize: size, fontWeight: FontWeight.w900, color: Colors.white, letterSpacing: 0.5),
    ),
  );
}

/// Dòng tiếng Anh dưới câu tiếng Việt; chạm để nghe đọc.
class EnglishLine extends StatelessWidget {
  const EnglishLine(this.text, {super.key, this.size = 18, this.onSpeak, this.color = _enBlue});

  final String text;
  final double size;
  final VoidCallback? onSpeak;

  /// Màu chữ (trên bảng đen dùng xanh nhạt).
  final Color color;

  @override
  Widget build(BuildContext context) => InkWell(
    borderRadius: BorderRadius.circular(12),
    onTap: onSpeak ?? () => TutorAudioService.english.speak([text]),
    child: Padding(
      padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 2),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 3),
            child: EnBadge(size: size * 0.62),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: size,
                height: 1.3,
                fontWeight: FontWeight.w700,
                fontStyle: FontStyle.italic,
                color: color,
              ),
            ),
          ),
          Icon(Icons.volume_up_rounded, size: size * 1.1, color: color.withValues(alpha: 0.7)),
        ],
      ),
    ),
  );
}

/// Thẻ bật / tắt chế độ "Toán + Tiếng Anh" ở trang chủ.
class BilingualSwitchCard extends StatelessWidget {
  const BilingualSwitchCard({super.key, required this.app, this.teacher});

  final AppState app;
  final TeacherController? teacher;

  @override
  Widget build(BuildContext context) {
    final on = app.bilingual;
    return AnimatedContainer(
      key: const ValueKey('bilingual-card'),
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.fromLTRB(14, 12, 10, 12),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(24),
        gradient: LinearGradient(
          colors: on
              ? const [Color(0xFF1D4ED8), Color(0xFF7C3AED), Color(0xFFE11D48)]
              : const [Color(0xFFEFF4FF), Color(0xFFF5F0FF)],
        ),
        border: Border.all(color: on ? Colors.white : const Color(0xFFBFD3FF), width: 2),
        boxShadow: const [BoxShadow(color: Color(0x22000000), blurRadius: 12, offset: Offset(0, 4))],
      ),
      child: Row(
        children: [
          Container(
            width: 58,
            height: 58,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: Colors.white,
              border: Border.all(color: _enRed, width: 3),
            ),
            child: const Text(
              'ABC\n123',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 13, height: 1.1, fontWeight: FontWeight.w900, color: _enBlue),
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Toán + Tiếng Anh',
                  style: TextStyle(fontSize: 21, fontWeight: FontWeight.w900, color: on ? Colors.white : _enBlue),
                ),
                Text(
                  on ? 'Đang bật: học Toán kèm tiếng Anh' : 'Vừa học Toán vừa học tiếng Anh',
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: on ? Colors.white.withValues(alpha: 0.92) : const Color(0xFF475569),
                  ),
                ),
              ],
            ),
          ),
          Transform.scale(
            scale: 1.15,
            child: Switch(
              key: const ValueKey('bilingual-switch'),
              value: on,
              activeThumbColor: Colors.white,
              activeTrackColor: const Color(0xFF22C55E),
              onChanged: (v) async {
                await app.setBilingual(v);
                final t = teacher;
                if (t == null) return;
                await t.say([v ? BilingualLines.modeOn : BilingualLines.modeOff], mood: TeacherMood.clap);
                if (v) await t.say(const [BilingualLines.letsLearn], via: TutorAudioService.english);
              },
            ),
          ),
        ],
      ),
    );
  }
}

/// Thẻ từ vựng tiếng Anh của bài (trang bài học): chạm để nghe; nút chơi ôn từ.
class VocabSection extends StatelessWidget {
  const VocabSection({super.key, required this.english});

  final LessonEnglish english;

  @override
  Widget build(BuildContext context) {
    return Container(
      key: const ValueKey('vocab-section'),
      padding: const EdgeInsets.fromLTRB(14, 12, 14, 14),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.94),
        borderRadius: BorderRadius.circular(22),
        border: Border.all(color: const Color(0xFFBFD3FF), width: 2),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              const EnBadge(size: 15),
              const SizedBox(width: 8),
              const Expanded(
                child: Text(
                  'Từ vựng tiếng Anh',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: _enBlue),
                ),
              ),
              FilledButton.icon(
                key: const ValueKey('btn-vocab-game'),
                style: FilledButton.styleFrom(backgroundColor: const Color(0xFF7C3AED)),
                onPressed: () => Navigator.of(
                  context,
                ).push(MaterialPageRoute<void>(builder: (_) => VocabGameScreen(english: english))),
                icon: const Icon(Icons.sports_esports_rounded),
                label: const Text('Ôn từ', style: TextStyle(fontWeight: FontWeight.w800)),
              ),
            ],
          ),
          if (english.title.isNotEmpty) ...[const SizedBox(height: 4), EnglishLine(english.title, size: 16)],
          const SizedBox(height: 8),
          Wrap(spacing: 8, runSpacing: 8, children: [for (final v in english.vocab) VocabChip(vocab: v)]),
        ],
      ),
    );
  }
}

class VocabChip extends StatelessWidget {
  const VocabChip({super.key, required this.vocab});

  final Vocab vocab;

  @override
  Widget build(BuildContext context) => Material(
    color: const Color(0xFFEFF4FF),
    borderRadius: BorderRadius.circular(16),
    child: InkWell(
      borderRadius: BorderRadius.circular(16),
      onTap: () => TutorAudioService.english.speak([vocab.en]),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(10, 6, 12, 6),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(vocab.emoji, style: const TextStyle(fontSize: 22)),
            const SizedBox(width: 6),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  vocab.en,
                  style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: _enBlue),
                ),
                Text(vocab.vi, style: const TextStyle(fontSize: 13, color: Color(0xFF475569))),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}

/// Trò chơi ôn từ: nghe từ tiếng Anh, chọn nghĩa tiếng Việt đúng trong 3 thẻ.
class VocabGameScreen extends StatefulWidget {
  const VocabGameScreen({super.key, required this.english, this.random});

  final LessonEnglish english;
  final Random? random;

  @override
  State<VocabGameScreen> createState() => _VocabGameScreenState();
}

class _VocabGameScreenState extends State<VocabGameScreen> {
  final _teacher = TeacherController(voiceEnabled: false);
  late final Random _rnd = widget.random ?? Random();
  late final List<Vocab> _words = [...widget.english.vocab]..shuffle(_rnd);
  int _i = 0;
  int _score = 0;
  int? _picked;
  late List<Vocab> _options;

  @override
  void initState() {
    super.initState();
    _prepare();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      if (!mounted) return;
      _teacher.voiceEnabled = AppScope.read(context).voiceEnabled;
      await _teacher.say(const [BilingualLines.leadVocab], mood: TeacherMood.clap);
      _ask();
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  void _prepare() {
    if (_i >= _words.length) return;
    final w = _words[_i];
    final others = [...widget.english.vocab.where((v) => v.vi != w.vi)]..shuffle(_rnd);
    _options = [w, ...others.take(2)]..shuffle(_rnd);
    _picked = null;
  }

  Future<void> _ask() async {
    if (!mounted || _i >= _words.length) return;
    await _teacher.say([_words[_i].en], via: TutorAudioService.english, mood: TeacherMood.point);
    if (!mounted) return;
    await _teacher.say(const [BilingualLines.vocabAsk]);
  }

  Future<void> _pick(int k) async {
    if (_picked != null) return;
    final w = _words[_i];
    final ok = _options[k].vi == w.vi;
    setState(() => _picked = k);
    if (ok) {
      _score++;
      await _teacher.say(const [BilingualLines.vocabRight], mood: TeacherMood.clap);
    } else {
      await _teacher.say(const [BilingualLines.vocabWrong], mood: TeacherMood.think);
      if (!mounted) return;
      await _teacher.say([w.en], via: TutorAudioService.english);
    }
    if (!mounted) return;
    await Future<void>.delayed(const Duration(milliseconds: 500));
    if (!mounted) return;
    setState(() {
      _i++;
      _prepare();
    });
    if (_i < _words.length) {
      _ask();
    } else {
      _teacher.say(const [BilingualLines.vocabDone], mood: TeacherMood.clap);
    }
  }

  @override
  Widget build(BuildContext context) {
    final done = _i >= _words.length;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ôn từ vựng tiếng Anh'),
        backgroundColor: _enBlue,
        foregroundColor: Colors.white,
      ),
      backgroundColor: const Color(0xFFF1F5FF),
      body: SafeArea(
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  LinearProgressIndicator(
                    value: _words.isEmpty ? 1 : _i / _words.length,
                    minHeight: 10,
                    borderRadius: BorderRadius.circular(6),
                    color: const Color(0xFF22C55E),
                    backgroundColor: Colors.white,
                  ),
                  const SizedBox(height: 16),
                  Expanded(
                    child: done
                        ? Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(Icons.emoji_events_rounded, size: 96, color: Color(0xFFF59E0B)),
                                Text(
                                  'Con đúng $_score/${_words.length} từ!',
                                  key: const ValueKey('vocab-score'),
                                  style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
                                ),
                                const SizedBox(height: 16),
                                FilledButton(
                                  onPressed: () => Navigator.of(context).maybePop(),
                                  child: const Text('Xong', style: TextStyle(fontSize: 20)),
                                ),
                              ],
                            ),
                          )
                        : Column(
                            children: [
                              GestureDetector(
                                onTap: () => _teacher.say([_words[_i].en], via: TutorAudioService.english),
                                child: Container(
                                  key: const ValueKey('vocab-word'),
                                  width: double.infinity,
                                  padding: const EdgeInsets.symmetric(vertical: 22),
                                  decoration: BoxDecoration(
                                    gradient: const LinearGradient(colors: [_enBlue, Color(0xFF7C3AED)]),
                                    borderRadius: BorderRadius.circular(26),
                                  ),
                                  child: Column(
                                    children: [
                                      Text(_words[_i].emoji, style: const TextStyle(fontSize: 54)),
                                      Text(
                                        _words[_i].en,
                                        style: const TextStyle(
                                          fontSize: 38,
                                          fontWeight: FontWeight.w900,
                                          color: Colors.white,
                                        ),
                                      ),
                                      const Icon(Icons.volume_up_rounded, color: Colors.white70, size: 30),
                                    ],
                                  ),
                                ),
                              ),
                              const SizedBox(height: 16),
                              for (final (k, o) in _options.indexed)
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 10),
                                  child: FilledButton(
                                    key: ValueKey('vocab-opt-$k'),
                                    style: FilledButton.styleFrom(
                                      minimumSize: const Size.fromHeight(60),
                                      backgroundColor: _picked == null
                                          ? Colors.white
                                          : (o.vi == _words[_i].vi
                                                ? const Color(0xFF22C55E)
                                                : (_picked == k ? const Color(0xFFEF4444) : Colors.white)),
                                      foregroundColor: _picked != null && (o.vi == _words[_i].vi || _picked == k)
                                          ? Colors.white
                                          : const Color(0xFF1E293B),
                                      side: const BorderSide(color: Color(0xFFBFD3FF), width: 2),
                                    ),
                                    onPressed: () => _pick(k),
                                    child: Text(
                                      o.vi,
                                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
                                    ),
                                  ),
                                ),
                            ],
                          ),
                  ),
                  TeacherHud(controller: _teacher, avatarHeight: 90, maxTextHeight: 78),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
