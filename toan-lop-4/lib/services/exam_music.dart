import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

/// Nhạc phòng thi (tự tạo bằng Kie.ai: assets/sounds/exam_*.mp3): nhạc nền nhẹ khi làm bài,
/// tiếng chuông bắt đầu / kết thúc. Cô nói thì nhạc nhỏ lại.
abstract class ExamMusic {
  static ExamMusic instance = SilentExamMusic();

  Future<void> play();
  Future<void> stop();

  /// true = cô đang nói → nhạc nhỏ lại.
  Future<void> duck(bool on);

  /// Bé tắt / bật nhạc nền.
  Future<void> mute(bool on);

  /// Chuông: start | end.
  Future<void> chime(String name);
}

class SilentExamMusic implements ExamMusic {
  final played = <String>[];

  @override
  Future<void> play() async => played.add('bg');
  @override
  Future<void> stop() async => played.add('stop');
  @override
  Future<void> duck(bool on) async {}
  @override
  Future<void> mute(bool on) async => played.add(on ? 'mute' : 'unmute');
  @override
  Future<void> chime(String name) async => played.add(name);
}

class AudioExamMusic implements ExamMusic {
  AudioPlayer? _bg;
  AudioPlayer? _fx;
  bool _ducked = false;
  bool _muted = false;

  static const _normal = 0.22, _low = 0.06;

  double get _volume => _muted ? 0 : (_ducked ? _low : _normal);

  @override
  Future<void> play() async {
    try {
      final p = _bg ??= AudioPlayer(playerId: 'exam-bg')..setReleaseMode(ReleaseMode.loop);
      await p.setVolume(_volume);
      await p.play(AssetSource('sounds/exam_bg.mp3'));
    } on Object catch (e) {
      debugPrint('Không phát được nhạc phòng thi: $e');
    }
  }

  @override
  Future<void> stop() async {
    try {
      await _bg?.stop();
    } on Object catch (_) {}
  }

  @override
  Future<void> duck(bool on) async {
    if (_ducked == on) return;
    _ducked = on;
    try {
      await _bg?.setVolume(_volume);
    } on Object catch (_) {}
  }

  @override
  Future<void> mute(bool on) async {
    _muted = on;
    try {
      await _bg?.setVolume(_volume);
    } on Object catch (_) {}
  }

  @override
  Future<void> chime(String name) async {
    try {
      final p = _fx ??= AudioPlayer(playerId: 'exam-fx')..setReleaseMode(ReleaseMode.stop);
      await p.stop();
      await p.setVolume(0.5);
      await p.play(AssetSource('sounds/exam_$name.mp3'));
    } on Object catch (e) {
      debugPrint('Không phát được chuông "$name": $e');
    }
  }
}
