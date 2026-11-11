import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../../core/i18n/app_language.dart';
import '../../../core/i18n/language_controller.dart';
import '../../game/game_store.dart';
import '../teacher_controller.dart';
import '../teacher_scope.dart';
import '../teacher_script.dart';
import '../voiceover_service.dart';
import 'typewriter_text.dart';

/// Character art for each mood. Unknown moods fall back to `happy`.
const Map<String, String> kLumiPoses = <String, String>{
  'wave': 'assets/teacher/lumi_wave.png',
  'happy': 'assets/teacher/lumi_happy.png',
  'point': 'assets/teacher/lumi_point.png',
  'cheer': 'assets/teacher/lumi_cheer.png',
  'paint': 'assets/teacher/lumi_paint.png',
};

String lumiPose(String mood, [LumiOutfit outfit = LumiOutfit.classic]) {
  final String key = kLumiPoses.containsKey(mood) ? mood : 'happy';
  if (outfit == LumiOutfit.classic) return kLumiPoses[key]!;
  return 'assets/teacher/outfits/${outfit.name}/lumi_$key.png';
}

/// Lumi, the virtual art teacher: a character in the corner of the screen
/// with a speech bubble. Text types out in sync with the Vietnamese
/// voice-over; Lumi's pose follows the mood of each line.
///
/// Place it as a full-size layer in a [Stack]; only the character and the
/// bubble take touches, the rest of the screen stays usable.
class TeacherOverlay extends StatefulWidget {
  const TeacherOverlay({
    super.key,
    required this.controller,
    this.bottom = 16,
    this.collapsedAlignment = Alignment.bottomRight,
    this.inline = false,
    this.autoAdvance,
  });

  /// When set, Lumi moves on by herself this long after a line is finished,
  /// and shrinks to the avatar after the last one. Used while drawing, when
  /// the learner's hands are busy and the picture must stay visible.
  final Duration? autoAdvance;

  /// Lay out in place (inside a Column) instead of as a full-screen layer.
  final bool inline;

  final TeacherController controller;

  /// Distance from the bottom of the layer (to sit above other controls).
  final double bottom;

  /// Where the small avatar sits when the bubble is closed.
  final Alignment collapsedAlignment;

  @override
  State<TeacherOverlay> createState() => _TeacherOverlayState();
}

class _TeacherOverlayState extends State<TeacherOverlay> {
  final GlobalKey<TypewriterTextState> _typewriter = GlobalKey<TypewriterTextState>();
  int _shownVersion = -1;
  String _text = '';
  Duration _typing = Duration.zero;
  bool _typingDone = false;
  bool _voiceBlocked = false;
  AppLanguage? _language;
  int _request = 0;
  Timer? _advance;

  TeacherController get _teacher => widget.controller;

  /// Cached in didChangeDependencies: dispose() may not look up ancestors.
  VoiceoverService? _voice;

  @override
  void initState() {
    super.initState();
    _teacher.addListener(_onTeacherChanged);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _voice = TeacherScope.maybeOf(context)?.voice;
    final AppLanguage language = context.language;
    final bool languageChanged = _language != null && language != _language;
    _language = language;
    if (_teacher.isOpen && (languageChanged || _shownVersion != _teacher.version)) {
      // Not during this build: start once the frame is done.
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (mounted) unawaited(_startLine());
      });
    }
  }

  @override
  void didUpdateWidget(TeacherOverlay old) {
    super.didUpdateWidget(old);
    if (old.controller != widget.controller) {
      old.controller.removeListener(_onTeacherChanged);
      widget.controller.addListener(_onTeacherChanged);
    }
  }

  @override
  void dispose() {
    _teacher.removeListener(_onTeacherChanged);
    _advance?.cancel();
    unawaited(_voice?.stop());
    super.dispose();
  }

  void _onTeacherChanged() {
    if (!mounted) return;
    if (!_teacher.isOpen) {
      unawaited(_voice?.stop());
      setState(() {});
      return;
    }
    if (_shownVersion != _teacher.version) unawaited(_startLine());
  }

  Future<void> _startLine() async {
    final TeacherLine? line = _teacher.current;
    if (line == null) return;
    final int request = ++_request;
    _advance?.cancel();
    _shownVersion = _teacher.version;
    final String text = context.tr(line.textKey);
    final AppLanguage language = context.language;
    setState(() {
      _text = text;
      _typingDone = false;
      _voiceBlocked = false;
      // Placeholder until we know whether there is a voice.
      _typing = const Duration(days: 1);
    });
    final VoicePlayback playback = await _voice?.play(language, line.id) ?? VoicePlayback.silent;
    if (!mounted || request != _request) return;
    setState(() {
      _voiceBlocked = playback.status == VoiceStatus.blocked;
      _typing = playback.status == VoiceStatus.playing && playback.duration != null
          // Finish typing slightly before the voice ends.
          ? playback.duration! * 0.92
          : _readingTime(text);
    });
  }

  /// Comfortable reading speed when there is no voice (~18 letters/s).
  Duration _readingTime(String text) =>
      Duration(milliseconds: (text.characters.length * 55).clamp(900, 9000));

  void _onTypingFinished() {
    if (!mounted) return;
    setState(() => _typingDone = true);
    final Duration? delay = widget.autoAdvance;
    if (delay == null) return;
    final int version = _teacher.version;
    _advance?.cancel();
    _advance = Timer(delay, () {
      if (mounted && _teacher.isOpen && _teacher.version == version) _teacher.next();
    });
  }

  void _onBubbleTap() {
    if (!_typingDone) {
      _typewriter.currentState?.finish();
    } else {
      _teacher.next();
    }
  }

  Future<void> _toggleMute() async {
    final VoiceoverService? voice = _voice;
    if (voice == null) return;
    if (_voiceBlocked) {
      // The tap itself is the user gesture browsers need to allow sound.
      unawaited(_startLine());
      return;
    }
    await voice.setMuted(!voice.muted);
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final bool open = _teacher.isOpen;
    if (widget.inline) {
      if (open) return _buildDialog(context);
      if (_teacher.lines.isEmpty) return const SizedBox.shrink();
      return Align(
        alignment: widget.collapsedAlignment,
        child: _CollapsedLumi(
          mood: _teacher.mood,
          onTap: _teacher.reopen,
          tooltip: context.tr('teacher.openTeacher'),
        ),
      );
    }
    return Stack(
      children: <Widget>[
        if (open)
          Positioned(left: 8, right: 12, bottom: widget.bottom, child: _buildDialog(context))
        else if (_teacher.lines.isNotEmpty)
          Positioned.fill(
            bottom: widget.bottom,
            child: Align(
              alignment: widget.collapsedAlignment,
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: _CollapsedLumi(
                  mood: _teacher.mood,
                  onTap: _teacher.reopen,
                  tooltip: context.tr('teacher.openTeacher'),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildDialog(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    final VoiceoverService? voice = _voice;
    final bool muted = voice?.muted ?? true;
    final TextStyle body = theme.textTheme.bodyLarge!.copyWith(
      color: const Color(0xFF2A2433),
      height: 1.35,
      fontSize: 15.5,
    );
    return Row(
      key: const Key('teacherDialog'),
      crossAxisAlignment: CrossAxisAlignment.end,
      children: <Widget>[
        _LumiAvatar(mood: _teacher.mood, talking: !_typingDone, height: 118),
        Expanded(
          child: Padding(
            padding: const EdgeInsets.only(bottom: 14),
            child: Material(
              color: const Color(0xFFFFF8EC),
              elevation: 6,
              shadowColor: Colors.black54,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(18),
                topRight: Radius.circular(18),
                bottomRight: Radius.circular(18),
                bottomLeft: Radius.circular(4),
              ),
              child: InkWell(
                key: const Key('teacherBubble'),
                borderRadius: BorderRadius.circular(18),
                onTap: _onBubbleTap,
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(14, 6, 6, 8),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Row(
                        children: <Widget>[
                          Text(
                            context.tr('teacher.name'),
                            style: const TextStyle(
                              color: Color(0xFFB0661B),
                              fontWeight: FontWeight.w900,
                              fontSize: 15,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Text(
                              context.tr('teacher.role'),
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(color: Color(0x992A2433), fontSize: 12),
                            ),
                          ),
                          const Spacer(),
                          _BubbleIcon(
                            key: const Key('teacherSpeaker'),
                            icon: _voiceBlocked
                                ? Icons.volume_up
                                : muted
                                ? Icons.volume_off
                                : Icons.volume_up,
                            tooltip: _voiceBlocked
                                ? context.tr('teacher.tapToListen')
                                : muted
                                ? context.tr('teacher.unmute')
                                : context.tr('teacher.mute'),
                            highlight: _voiceBlocked,
                            onPressed: _toggleMute,
                          ),
                          _BubbleIcon(
                            key: const Key('teacherReplay'),
                            icon: Icons.replay,
                            tooltip: context.tr('teacher.replay'),
                            onPressed: () => unawaited(_startLine()),
                          ),
                          _BubbleIcon(
                            key: const Key('teacherClose'),
                            icon: Icons.close,
                            tooltip: context.tr('teacher.close'),
                            onPressed: _teacher.close,
                          ),
                        ],
                      ),
                      if (_voiceBlocked)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 2),
                          child: Text(
                            context.tr('teacher.tapToListen'),
                            style: const TextStyle(color: Color(0xFFB0661B), fontSize: 12),
                          ),
                        ),
                      Padding(
                        padding: const EdgeInsets.only(right: 8),
                        child: TypewriterText(
                          key: _typewriter,
                          text: _text,
                          duration: _typing,
                          style: body,
                          onFinished: _onTypingFinished,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: <Widget>[
                          for (int i = 0; i < _teacher.lines.length; i++)
                            Container(
                              width: 6,
                              height: 6,
                              margin: const EdgeInsets.only(right: 4),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: i == _teacher.index
                                    ? const Color(0xFFFF9F43)
                                    : const Color(0x332A2433),
                              ),
                            ),
                          const Spacer(),
                          TextButton(
                            key: const Key('teacherNext'),
                            style: TextButton.styleFrom(
                              foregroundColor: const Color(0xFFB0661B),
                              visualDensity: VisualDensity.compact,
                            ),
                            onPressed: _teacher.next,
                            child: Text(
                              context.tr(_teacher.isLastLine ? 'teacher.done' : 'teacher.next'),
                              style: const TextStyle(fontWeight: FontWeight.w800),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _BubbleIcon extends StatelessWidget {
  const _BubbleIcon({
    super.key,
    required this.icon,
    required this.tooltip,
    required this.onPressed,
    this.highlight = false,
  });

  final IconData icon;
  final String tooltip;
  final VoidCallback onPressed;
  final bool highlight;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      tooltip: tooltip,
      visualDensity: VisualDensity.compact,
      iconSize: 20,
      color: highlight ? const Color(0xFFFF9F43) : const Color(0x992A2433),
      onPressed: onPressed,
      icon: Icon(icon),
    );
  }
}

/// Lumi with a gentle floating motion, a small bounce while talking and a
/// soft cross-fade when the pose changes.
class _LumiAvatar extends StatefulWidget {
  const _LumiAvatar({required this.mood, required this.talking, required this.height});

  final String mood;
  final bool talking;
  final double height;

  @override
  State<_LumiAvatar> createState() => _LumiAvatarState();
}

class _LumiAvatarState extends State<_LumiAvatar> with SingleTickerProviderStateMixin {
  late final AnimationController _float = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 2400),
  )..repeat();

  @override
  void dispose() {
    _float.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _float,
      builder: (BuildContext context, Widget? child) {
        final double t = _float.value * 2 * math.pi;
        final double dy = math.sin(t) * 3;
        final double talk = widget.talking ? 1 + 0.025 * math.sin(t * 6).abs() : 1;
        return Transform.translate(
          offset: Offset(0, dy),
          child: Transform.scale(scale: talk, alignment: Alignment.bottomCenter, child: child),
        );
      },
      child: SizedBox(
        height: widget.height,
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 280),
          transitionBuilder: (Widget child, Animation<double> a) => FadeTransition(
            opacity: a,
            child: ScaleTransition(
              scale: Tween<double>(begin: 0.92, end: 1).animate(a),
              alignment: Alignment.bottomCenter,
              child: child,
            ),
          ),
          child: Image.asset(
            lumiPose(widget.mood, GameScope.maybeOf(context)?.outfit ?? LumiOutfit.classic),
            key: ValueKey<String>('${widget.mood}-${GameScope.maybeOf(context)?.outfit.name}'),
            height: widget.height,
            fit: BoxFit.contain,
            filterQuality: FilterQuality.medium,
          ),
        ),
      ),
    );
  }
}

class _CollapsedLumi extends StatelessWidget {
  const _CollapsedLumi({required this.mood, required this.onTap, required this.tooltip});

  final String mood;
  final VoidCallback onTap;
  final String tooltip;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: tooltip,
      child: Material(
        key: const Key('teacherAvatar'),
        color: const Color(0xFFFFF8EC),
        shape: const CircleBorder(side: BorderSide(color: Color(0xFFFFB547), width: 2)),
        elevation: 4,
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          onTap: onTap,
          child: SizedBox(
            width: 58,
            height: 58,
            child: OverflowBox(
              maxHeight: 84,
              alignment: Alignment.topCenter,
              child: Image.asset(
                lumiPose(mood, GameScope.maybeOf(context)?.outfit ?? LumiOutfit.classic),
                height: 84,
                fit: BoxFit.cover,
                alignment: Alignment.topCenter,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
