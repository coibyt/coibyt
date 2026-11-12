import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../english_audio.dart';

/// Pip the parrot: hops gently, opens his beak in rhythm while his English
/// voice plays, and throws his wings up to cheer.
class Pip extends StatefulWidget {
  const Pip({super.key, required this.audio, this.size = 120, this.cheering = false});

  static const String base = 'assets/english/pip/pip.png';
  static const String talk = 'assets/english/pip/pip_talk.png';
  static const String cheer = 'assets/english/pip/pip_cheer.png';

  final EnglishAudio? audio;
  final double size;
  final bool cheering;

  @override
  State<Pip> createState() => _PipState();
}

class _PipState extends State<Pip> with SingleTickerProviderStateMixin {
  late final AnimationController _hop = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 800),
  );
  Timer? _idle;
  final math.Random _random = math.Random();
  Timer? _beak;
  bool _open = false;

  @override
  void initState() {
    super.initState();
    widget.audio?.speaking.addListener(_onSpeaking);
    _onSpeaking();
    _scheduleHop();
  }

  /// Now and then a little hop, like a real bird.
  void _scheduleHop() {
    _idle?.cancel();
    _idle = Timer(Duration(milliseconds: 1800 + _random.nextInt(2400)), () {
      if (!mounted) return;
      if (!(widget.audio?.speaking.value ?? false)) unawaited(_hop.forward(from: 0));
      _scheduleHop();
    });
  }

  @override
  void didUpdateWidget(Pip old) {
    super.didUpdateWidget(old);
    if (old.audio != widget.audio) {
      old.audio?.speaking.removeListener(_onSpeaking);
      widget.audio?.speaking.addListener(_onSpeaking);
    }
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    for (final String a in <String>[Pip.base, Pip.talk, Pip.cheer]) {
      unawaited(precacheImage(AssetImage(a), context).catchError((Object _) {}));
    }
  }

  void _onSpeaking() {
    if (widget.audio?.speaking.value ?? false) {
      _flap();
      unawaited(_hop.repeat());
    } else {
      _hop.stop();
      _beak?.cancel();
      if (mounted && _open) setState(() => _open = false);
    }
  }

  void _flap() {
    _beak?.cancel();
    _beak = Timer(Duration(milliseconds: 90 + _random.nextInt(100)), () {
      if (!mounted) return;
      if (!(widget.audio?.speaking.value ?? false)) {
        setState(() => _open = false);
        return;
      }
      setState(() => _open = !_open);
      _flap();
    });
  }

  @override
  void dispose() {
    widget.audio?.speaking.removeListener(_onSpeaking);
    _beak?.cancel();
    _idle?.cancel();
    _hop.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final String frame = widget.cheering ? Pip.cheer : (_open ? Pip.talk : Pip.base);
    return AnimatedBuilder(
      animation: _hop,
      builder: (BuildContext context, Widget? child) {
        final double t = _hop.value * math.pi;
        final bool talking = widget.audio?.speaking.value ?? false;
        final double dy = -(math.sin(t).abs()) * (widget.cheering ? 10 : (talking ? 5 : 3));
        final double tilt = math.sin(t) * (talking ? 0.05 : 0.025);
        return Transform.translate(
          offset: Offset(0, dy),
          child: Transform.rotate(angle: tilt, alignment: Alignment.bottomCenter, child: child),
        );
      },
      child: Image.asset(
        frame,
        key: const Key('pip'),
        width: widget.size,
        height: widget.size,
        gaplessPlayback: true,
        filterQuality: FilterQuality.medium,
        errorBuilder: (_, _, _) => SizedBox(width: widget.size, height: widget.size),
      ),
    );
  }
}
