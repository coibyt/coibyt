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

  /// Nhạc chào nhẹ nhàng khi bé chạm vào màn mở đầu (hộp nhạc, nhỏ dần vào – ra, không làm bé giật mình).
  Future<void> welcome();
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
  @override
  Future<void> welcome() async => played.add('welcome');
}

class AudioShowMusic implements ShowMusic {
  AudioPlayer? _bg;
  AudioPlayer? _fx;
  AudioPlayer? _welcome;

  @override
  Future<void> welcome() async {
    try {
      final p = _welcome ??= AudioPlayer(playerId: 'welcome')..setReleaseMode(ReleaseMode.stop);
      await p.setVolume(0.05);
      await p.play(AssetSource('sounds/welcome.mp3'));
      // Tăng âm lượng từ từ trong 2 giây, giữ nhỏ để không át giọng cô.
      for (var i = 1; i <= 8; i++) {
        await Future<void>.delayed(const Duration(milliseconds: 250));
        await p.setVolume(0.05 + 0.025 * i);
      }
    } on Object catch (e) {
      debugPrint('Không phát được nhạc chào: $e');
    }
  }

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
