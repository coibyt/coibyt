import 'package:flutter/services.dart';

/// Âm thanh phản hồi. Phase 1 dùng bản giữ chỗ; Phase 2/4 thay bằng bản
/// phát file trong assets/sounds/ (gói audioplayers) mà không phải sửa UI.
abstract class SoundService {
  Future<void> correct();
  Future<void> wrong();
  Future<void> tap();
  Future<void> finish();
}

/// GIỮ CHỖ: âm "click" của hệ thống + rung nhẹ.
/// (Trên Android chỉ kêu khi máy bật "Âm thanh khi chạm".)
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
