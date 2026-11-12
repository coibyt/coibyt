import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import 'english_catalog.dart';
import 'english_scope.dart';
import 'english_store.dart';
import 'widgets/pip.dart';
import 'widgets/word_picture.dart';

/// One "listen and pick" question.
@immutable
class QuizQuestion {
  const QuizQuestion(this.answer, this.options);

  final EnglishWord answer;
  final List<EnglishWord> options;
}

/// Builds questions: the answer plus [choices]-1 other words of the same
/// kind (pictures with pictures, colours with colours), favouring words the
/// child has not learned yet.
List<QuizQuestion> makeQuiz(
  List<EnglishWord> pool,
  EnglishStore? store, {
  int count = 5,
  int choices = 3,
  math.Random? random,
}) {
  final math.Random r = random ?? math.Random();
  final List<EnglishWord> order = List<EnglishWord>.of(pool)..shuffle(r);
  order.sort(
    (EnglishWord a, EnglishWord b) =>
        (store?.correctOf(a.id) ?? 0).compareTo(store?.correctOf(b.id) ?? 0),
  );
  final List<QuizQuestion> out = <QuizQuestion>[];
  for (final EnglishWord a in order) {
    if (out.length >= count) break;
    final List<EnglishWord> same =
        pool.where((EnglishWord w) => w.kind == a.kind && w.id != a.id).toList()..shuffle(r);
    if (same.length < choices - 1) continue;
    final List<EnglishWord> opts = <EnglishWord>[a, ...same.take(choices - 1)]..shuffle(r);
    out.add(QuizQuestion(a, opts));
  }
  return out;
}

/// The picture options of a question; reports the chosen word.
class QuizOptions extends StatefulWidget {
  const QuizOptions({super.key, required this.question, required this.onAnswer, this.size = 96});

  final QuizQuestion question;

  /// Called with true when the right picture is tapped (after a short
  /// celebration), false on a wrong one (the child can try again).
  final void Function(bool correct) onAnswer;
  final double size;

  @override
  State<QuizOptions> createState() => _QuizOptionsState();
}

class _QuizOptionsState extends State<QuizOptions> {
  String? _wrong;
  String? _right;

  @override
  void didUpdateWidget(QuizOptions old) {
    super.didUpdateWidget(old);
    if (old.question != widget.question) {
      _wrong = null;
      _right = null;
    }
  }

  void _tap(EnglishWord w) {
    if (_right != null) return;
    final bool ok = w.id == widget.question.answer.id;
    setState(() {
      if (ok) {
        _right = w.id;
      } else {
        _wrong = w.id;
      }
    });
    widget.onAnswer(ok);
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      alignment: WrapAlignment.center,
      spacing: 12,
      runSpacing: 12,
      children: <Widget>[
        for (final EnglishWord w in widget.question.options)
          GestureDetector(
            key: Key('option-${w.id}'),
            onTap: () => _tap(w),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 220),
              padding: const EdgeInsets.all(10),
              transform: Matrix4.translationValues(_wrong == w.id ? 6 : 0, 0, 0),
              decoration: BoxDecoration(
                color: const Color(0xFFFFFAF0),
                borderRadius: BorderRadius.circular(22),
                border: Border.all(
                  width: 4,
                  color: _right == w.id
                      ? const Color(0xFF2EAD6B)
                      : _wrong == w.id
                      ? const Color(0xFFE53935)
                      : const Color(0x00000000),
                ),
                boxShadow: const <BoxShadow>[
                  BoxShadow(color: Color(0x44000000), blurRadius: 8, offset: Offset(0, 3)),
                ],
              ),
              child: Stack(
                alignment: Alignment.center,
                children: <Widget>[
                  WordPicture(word: w, size: widget.size),
                  if (_right == w.id)
                    const Icon(Icons.check_circle_rounded, color: Color(0xFF2EAD6B), size: 40),
                  if (_wrong == w.id)
                    const Icon(Icons.cancel_rounded, color: Color(0xFFE53935), size: 40),
                ],
              ),
            ),
          ),
      ],
    );
  }
}

/// The "magic word" gate before playing: Pip says a word, the child picks
/// the picture. Returns true when answered (as many tries as needed), false
/// when closed.
Future<bool> passMagicWord(BuildContext context) async {
  final EnglishScope? english = EnglishScope.read(context);
  if (english == null || english.catalog.words.isEmpty) return true;
  final List<QuizQuestion> q = makeQuiz(english.catalog.words, english.store, count: 1);
  if (q.isEmpty) return true;
  final bool? ok = await showDialog<bool>(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext context) => _MagicWordDialog(question: q.single, english: english),
  );
  return ok ?? false;
}

class _MagicWordDialog extends StatefulWidget {
  const _MagicWordDialog({required this.question, required this.english});

  final QuizQuestion question;
  final EnglishScope english;

  @override
  State<_MagicWordDialog> createState() => _MagicWordDialogState();
}

class _MagicWordDialogState extends State<_MagicWordDialog> {
  bool _done = false;

  @override
  void initState() {
    super.initState();
    unawaited(widget.english.audio.say(<String>['pip_magic', widget.question.answer.audio]));
  }

  @override
  void dispose() {
    unawaited(widget.english.audio.stop());
    super.dispose();
  }

  Future<void> _answer(bool ok) async {
    unawaited(widget.english.store.record(widget.question.answer.id, correct: ok));
    if (!ok) {
      await widget.english.audio.say(<String>['pip_try', widget.question.answer.audio]);
      return;
    }
    setState(() => _done = true);
    await widget.english.audio.say(<String>['pip_open']);
    if (mounted) Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      key: const Key('magicWord'),
      child: Padding(
        padding: const EdgeInsets.fromLTRB(18, 16, 18, 14),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Row(
              children: <Widget>[
                Pip(audio: widget.english.audio, size: 76, cheering: _done),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        context.tr('english.magicTitle'),
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        context.tr('english.magicHint'),
                        style: const TextStyle(color: Colors.white70, fontSize: 12.5),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  key: const Key('magicClose'),
                  onPressed: () => Navigator.of(context).pop(false),
                  icon: const Icon(Icons.close),
                ),
              ],
            ),
            const SizedBox(height: 10),
            TextButton.icon(
              key: const Key('magicReplay'),
              onPressed: () => widget.english.audio.say(<String>[widget.question.answer.audio]),
              icon: const Icon(Icons.volume_up_rounded, color: AppTheme.gold),
              label: Text(context.tr('english.tapToHear')),
            ),
            const SizedBox(height: 6),
            QuizOptions(question: widget.question, onAnswer: _answer, size: 76),
          ],
        ),
      ),
    );
  }
}
