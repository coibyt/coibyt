import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

/// Nhạc gameshow "Đấu trường Ngôi sao Toán học" (bản quyền tự tạo bằng Kie.ai, assets/sounds/show_*.mp3).
abstract class ShowMusic {
  static ShowMusic instance = SilentShowMusic();

  /// Nhạc nền hồi hộp (lặp lại) khi bé suy nghĩ.
  Future<void> playBackground();
  Future<void> stopBackground();

  /// Đoạn nhạc ngắn: intro (mở màn), lock (chốt đáp án), win (kết thúc).
  Future<void> sting(String name);
  Future<void> stopAll();
}

class SilentShowMusic implements ShowMusic {
  final played = <String>[];

  @override
  Future<void> playBackground() async => played.add('bg');
  @override
  Future<void> stopBackground() async => played.add('bg-stop');
  @override
  Future<void> sting(String name) async => played.add(name);
  @override
  Future<void> stopAll() async {}
}

class AudioShowMusic implements ShowMusic {
  AudioPlayer? _bg;
  AudioPlayer? _fx;

  @override
  Future<void> playBackground() async {
    try {
      final p = _bg ??= AudioPlayer(playerId: 'show-bg')..setReleaseMode(ReleaseMode.loop);
      await p.setVolume(0.28);
      await p.play(AssetSource('sounds/show_bg.mp3'));
    } on Object catch (e) {
      debugPrint('Không phát được nhạc nền: $e');
    }
  }

  @override
  Future<void> stopBackground() async {
    try {
      await _bg?.stop();
    } on Object catch (_) {}
  }

  @override
  Future<void> sting(String name) async {
    try {
      final p = _fx ??= AudioPlayer(playerId: 'show-fx')..setReleaseMode(ReleaseMode.stop);
      await p.stop();
      await p.setVolume(0.55);
      await p.play(AssetSource('sounds/show_$name.mp3'));
    } on Object catch (e) {
      debugPrint('Không phát được nhạc "$name": $e');
    }
  }

  @override
  Future<void> stopAll() async {
    await stopBackground();
    try {
      await _fx?.stop();
    } on Object catch (_) {}
  }
}
