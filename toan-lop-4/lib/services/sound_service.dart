import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

/// Âm thanh phản hồi.
abstract class SoundService {
  Future<void> correct();
  Future<void> wrong();
  Future<void> tap();
  Future<void> finish();
}

/// Dịch vụ âm thanh dùng chung của app (main() gán bản phát file thật).
abstract final class AppSound {
  static SoundService instance = const PlaceholderSoundService();
}

/// Phát các file trong assets/sounds/ (tự tổng hợp, xem tool/make_sounds.py),
/// kèm rung nhẹ trên điện thoại. Lỗi phát âm thanh không bao giờ làm hỏng bài học.
class AudioSoundService implements SoundService {
  AudioSoundService() {
    for (final name in const ['correct', 'wrong', 'tap', 'finish']) {
      _players[name] = AudioPlayer(playerId: 'sfx-$name')..setReleaseMode(ReleaseMode.stop);
    }
  }

  final Map<String, AudioPlayer> _players = {};
  bool muted = false;

  Future<void> _play(String name, {double volume = 1}) async {
    if (muted) return;
    try {
      final p = _players[name]!;
      await p.stop();
      await p.setVolume(volume);
      await p.play(AssetSource('sounds/$name.wav'));
    } catch (e) {
      debugPrint('Không phát được âm "$name": $e');
    }
  }

  @override
  Future<void> correct() async {
    await _play('correct');
    await _haptic(HapticFeedback.lightImpact);
  }

  @override
  Future<void> wrong() async {
    await _play('wrong', volume: 0.7);
    await _haptic(HapticFeedback.mediumImpact);
  }

  @override
  Future<void> tap() => _play('tap', volume: 0.5);

  @override
  Future<void> finish() => _play('finish');

  Future<void> _haptic(Future<void> Function() f) async {
    if (kIsWeb) return;
    try {
      await f();
    } catch (_) {}
  }
}

/// Không có file âm thanh: âm "click" của hệ thống + rung nhẹ.
class PlaceholderSoundService implements SoundService {
  const PlaceholderSoundService();

  @override
  Future<void> correct() async {
    await SystemSound.play(SystemSoundType.click);
    await HapticFeedback.lightImpact();
  }

  @override
  Future<void> wrong() async {
    await HapticFeedback.mediumImpact();
  }

  @override
  Future<void> tap() async {
    await HapticFeedback.selectionClick();
  }

  @override
  Future<void> finish() async {
    await SystemSound.play(SystemSoundType.click);
  }
}

/// Không phát gì — dùng trong test.
class SilentSoundService implements SoundService {
  const SilentSoundService();

  @override
  Future<void> correct() async {}
  @override
  Future<void> wrong() async {}
  @override
  Future<void> tap() async {}
  @override
  Future<void> finish() async {}
}
