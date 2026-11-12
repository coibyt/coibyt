import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:just_audio/just_audio.dart';

/// Pip's English voice: words, example sentences and short phrases
/// (`assets/audio/english/<id>.mp3`, lengths in manifest.json).
class EnglishAudio {
  EnglishAudio({Map<String, int>? manifest, this.isMuted})
    : _manifest = manifest ?? <String, int>{};

  static const String manifestAsset = 'assets/audio/english/manifest.json';

  final Map<String, int> _manifest;

  /// Shares the mute switch of Lumi's voice.
  final bool Function()? isMuted;
  AudioPlayer? _player;
  int _request = 0;

  /// True while Pip is talking (drives his beak).
  final ValueNotifier<bool> speaking = ValueNotifier<bool>(false);

  bool has(String id) => _manifest.containsKey(id);

  static Future<EnglishAudio> load({bool Function()? isMuted, AssetBundle? bundle}) async {
    try {
      final Map<String, Object?> j = jsonDecode(
        await (bundle ?? rootBundle).loadString(manifestAsset),
      ) as Map<String, Object?>;
      return EnglishAudio(
        manifest: <String, int>{
          for (final MapEntry<String, Object?> e in j.entries) e.key: (e.value! as num).toInt(),
        },
        isMuted: isMuted,
      );
    } on Object catch (e) {
      debugPrint('No English audio: $e');
      return EnglishAudio(isMuted: isMuted);
    }
  }

  /// Plays clips one after another; completes when the last one ends
  /// (or right away when there is no sound).
  Future<void> say(List<String> ids) async {
    final int request = ++_request;
    for (final String id in ids) {
      if (request != _request) return;
      await _playOne(id, request);
    }
    if (request == _request) speaking.value = false;
  }

  Future<void> _playOne(String id, int request) async {
    final int? ms = _manifest[id];
    if (ms == null) return;
    speaking.value = true;
    if (isMuted?.call() ?? false) {
      // Still animate Pip for the length of the clip.
      await Future<void>.delayed(Duration(milliseconds: ms));
      return;
    }
    try {
      final AudioPlayer player = _player ??= AudioPlayer();
      await player.setAsset('assets/audio/english/$id.mp3');
      unawaited(player.play().catchError((Object _) {}));
      await Future<void>.delayed(Duration(milliseconds: ms + 120));
    } on Object catch (e) {
      debugPrint('English audio failed for $id: $e');
      await Future<void>.delayed(Duration(milliseconds: ms));
    }
    if (request != _request) return;
  }

  Future<void> stop() async {
    _request++;
    speaking.value = false;
    try {
      await _player?.stop();
    } on Object {
      // ignore
    }
  }
}
