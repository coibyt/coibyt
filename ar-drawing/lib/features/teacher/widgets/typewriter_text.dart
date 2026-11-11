import 'package:flutter/widgets.dart';

/// Reveals [text] letter by letter over [duration] (the length of the
/// voice-over when there is one), like someone typing it.
///
/// Counts grapheme clusters, so Vietnamese letters with stacked accents
/// (ệ, ữ, ở…) appear whole instead of as a bare letter plus a floating mark.
class TypewriterText extends StatefulWidget {
  const TypewriterText({
    super.key,
    required this.text,
    required this.duration,
    this.style,
    this.onFinished,
  });

  final String text;
  final Duration duration;
  final TextStyle? style;
  final VoidCallback? onFinished;

  @override
  State<TypewriterText> createState() => TypewriterTextState();
}

class TypewriterTextState extends State<TypewriterText> with SingleTickerProviderStateMixin {
  late final AnimationController _progress = AnimationController(vsync: this)
    ..addStatusListener((AnimationStatus s) {
      if (s == AnimationStatus.completed) _notifyFinished();
    });
  late List<String> _letters;

  bool get isFinished => _progress.isCompleted;

  @override
  void initState() {
    super.initState();
    _restart();
  }

  @override
  void didUpdateWidget(TypewriterText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text || oldWidget.duration != widget.duration) _restart();
  }

  void _restart() {
    _letters = widget.text.characters.toList();
    _progress
      ..duration = widget.duration
      ..reset();
    if (widget.duration == Duration.zero) {
      _progress.value = 1;
    } else {
      _progress.forward();
    }
  }

  /// Completion can happen while the tree is building (e.g. a zero duration
  /// set in didUpdateWidget), so tell the parent right after, not during.
  void _notifyFinished() {
    Future<void>.microtask(() {
      if (mounted) widget.onFinished?.call();
    });
  }

  /// Shows the whole text at once (user tapped while it was typing).
  void finish() {
    if (!_progress.isCompleted) _progress.value = 1;
  }

  @override
  void dispose() {
    _progress.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _progress,
      builder: (BuildContext context, _) {
        final int shown = (_letters.length * _progress.value).round();
        return Text.rich(
          TextSpan(
            children: <TextSpan>[
              TextSpan(text: _letters.take(shown).join()),
              // Reserve the space of the hidden rest so the bubble does not
              // grow line by line while typing.
              TextSpan(
                text: _letters.skip(shown).join(),
                style: const TextStyle(color: Color(0x00000000)),
              ),
            ],
          ),
          style: widget.style,
        );
      },
    );
  }
}
