import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';

/// Giọng đọc của gia sư. Không có giọng tiếng Việt thì app chỉ hiện chữ.
abstract class TutorVoice {
  /// Đọc to; trả về false nếu không đọc được (tắt tiếng / máy không có giọng Việt).
  Future<bool> speak(String text);
  Future<void> stop();

  /// Máy có giọng tiếng Việt không (null = chưa biết).
  bool? get hasVietnamese;
}

abstract final class AppTutorVoice {
  static TutorVoice instance = SilentTutorVoice();
}

/// Web: Web Speech API (speechSynthesis). Điện thoại: giọng đọc của hệ thống.
class TtsTutorVoice implements TutorVoice {
  final FlutterTts _tts = FlutterTts();
  bool _ready = false;
  bool? _vi;

  @override
  bool? get hasVietnamese => _vi;

  Future<void> _init() async {
    if (_ready && _vi == true) return;
    try {
      final ok = await _tts.isLanguageAvailable('vi-VN');
      _vi = ok == true || ok == 1;
      if (_vi!) await _tts.setLanguage('vi-VN');
      // Đọc chậm cho bé: web 1.0 = bình thường; điện thoại 0.5 = bình thường.
      await _tts.setSpeechRate(kIsWeb ? 0.9 : 0.45);
      await _tts.setPitch(1.1);
      _ready = true;
    } catch (e) {
      debugPrint('TTS không khởi tạo được: $e');
      _vi = false;
    }
  }

  @override
  Future<bool> speak(String text) async {
    await _init();
    if (_vi != true) return false;
    try {
      await _tts.stop();
      await _tts.speak(text);
      return true;
    } catch (e) {
      debugPrint('TTS lỗi: $e');
      return false;
    }
  }

  @override
  Future<void> stop() async {
    try {
      await _tts.stop();
    } catch (_) {}
  }
}

/// Không phát tiếng — dùng trong test (ghi lại câu đã "nói").
class SilentTutorVoice implements TutorVoice {
  final List<String> spoken = [];

  @override
  bool? get hasVietnamese => false;

  @override
  Future<bool> speak(String text) async {
    spoken.add(text);
    return false;
  }

  @override
  Future<void> stop() async {}
}
