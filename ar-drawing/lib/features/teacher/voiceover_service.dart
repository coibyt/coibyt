import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:just_audio/just_audio.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../core/i18n/app_language.dart';

/// Result of asking for a voice-over.
enum VoiceStatus {
  /// Playing; the text should type along for [VoicePlayback.duration].
  playing,

  /// No recording for this line/language, or the voice is muted.
  silent,

  /// The browser blocked sound until the user taps (web autoplay rules).
  blocked,
}

@immutable
class VoicePlayback {
  const VoicePlayback(this.status, [this.duration]);

  static const VoicePlayback silent = VoicePlayback(VoiceStatus.silent);

  final VoiceStatus status;

  /// Length of the recording, so the typewriter can finish with the voice.
  final Duration? duration;
}

/// Plays Lumi's recorded voice-over lines.
///
/// Recordings live in `assets/audio/teacher/<language>/<lineId>.mp3` and are
/// listed with their length in `assets/audio/teacher/manifest.json`, so the
/// app knows instantly whether a line has a voice and how long it is. Lines
/// without a recording simply stay silent. The mute switch is remembered.
class VoiceoverService extends ChangeNotifier {
  VoiceoverService({required Map<String, Map<String, int>> manifest, AudioPlayer? player})
    // ignore: prefer_initializing_formals
    : _manifest = manifest,
      // ignore: prefer_initializing_formals
      _player = player;

  static const String manifestAsset = 'assets/audio/teacher/manifest.json';
  static const String _mutedKey = 'teacher_muted';

  final Map<String, Map<String, int>> _manifest;
  AudioPlayer? _player;
  bool _muted = false;

  bool get muted => _muted;

  static Future<VoiceoverService> load({AssetBundle? bundle}) async {
    Map<String, Map<String, int>> manifest = <String, Map<String, int>>{};
    try {
      final Map<String, Object?> json = jsonDecode(
        await (bundle ?? rootBundle).loadString(manifestAsset),
      ) as Map<String, Object?>;
      manifest = <String, Map<String, int>>{
        for (final MapEntry<String, Object?> lang in json.entries)
          lang.key: <String, int>{
            for (final MapEntry<String, Object?> line
                in (lang.value! as Map<String, Object?>).entries)
              line.key: (line.value! as num).toInt(),
          },
      };
    } on Object catch (e) {
      debugPrint('No voice-over manifest: $e');
    }
    final VoiceoverService service = VoiceoverService(manifest: manifest);
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      service._muted = prefs.getBool(_mutedKey) ?? false;
    } on Object catch (e) {
      debugPrint('Could not read mute setting: $e');
    }
    return service;
  }

  String assetFor(AppLanguage language, String lineId) =>
      'assets/audio/teacher/${language.name}/$lineId.mp3';

  /// Length of the recording for [lineId], or null when there is none.
  Duration? durationOf(AppLanguage language, String lineId) {
    final int? ms = _manifest[language.name]?[lineId];
    return ms == null ? null : Duration(milliseconds: ms);
  }

  /// Starts the voice for [lineId]. Never throws: problems end up as
  /// [VoiceStatus.silent] or [VoiceStatus.blocked].
  Future<VoicePlayback> play(AppLanguage language, String lineId) async {
    await stop();
    final Duration? duration = durationOf(language, lineId);
    if (_muted || duration == null) return VoicePlayback.silent;
    try {
      final AudioPlayer player = _player ??= AudioPlayer();
      await player.setAsset(assetFor(language, lineId));
      // Do not await play(): its future completes only when playback ends.
      final Completer<VoicePlayback> started = Completer<VoicePlayback>();
      unawaited(
        player.play().catchError((Object e) {
          debugPrint('Voice-over blocked: $e');
          if (!started.isCompleted) started.complete(const VoicePlayback(VoiceStatus.blocked));
        }),
      );
      // A browser that refuses autoplay rejects play() right away.
      await Future<void>.delayed(const Duration(milliseconds: 150));
      if (kIsWeb && !started.isCompleted) {
        // Some browsers refuse silently: the sound just never moves.
        await Future<void>.delayed(const Duration(milliseconds: 450));
        if (!started.isCompleted && player.position < const Duration(milliseconds: 60)) {
          await player.stop();
          started.complete(const VoicePlayback(VoiceStatus.blocked));
        }
      }
      if (!started.isCompleted) started.complete(VoicePlayback(VoiceStatus.playing, duration));
      return await started.future;
    } on Object catch (e) {
      debugPrint('Voice-over failed for $lineId: $e');
      return VoicePlayback.silent;
    }
  }

  Future<void> stop() async {
    try {
      await _player?.stop();
    } on Object catch (e) {
      debugPrint('Voice-over stop failed: $e');
    }
  }

  Future<void> setMuted(bool value) async {
    if (value == _muted) return;
    _muted = value;
    if (value) await stop();
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setBool(_mutedKey, value);
    } on Object catch (e) {
      debugPrint('Could not save mute setting: $e');
    }
  }

  @override
  void dispose() {
    unawaited(_player?.dispose());
    super.dispose();
  }
}
