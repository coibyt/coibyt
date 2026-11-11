import 'dart:async';

import 'package:flutter/foundation.dart';

import 'teacher_avatar.dart';
import 'tutor_audio_service.dart';

/// Điều khiển cô giáo: tâm trạng, lời thoại chạy chữ, khớp khẩu hình.
class TeacherController extends ChangeNotifier {
  TeacherController({TutorAudioService? audio, this.voiceEnabled = true})
    : _audio = audio ?? TutorAudioService.instance;

  final TutorAudioService _audio;

  /// Cho phép phát tiếng (phụ huynh tắt được). Tắt thì vẫn chạy chữ.
  bool voiceEnabled;

  /// Đổi miệng mỗi 150 ms khi đang phát tiếng.
  static const lipSyncInterval = Duration(milliseconds: 150);

  /// Tốc độ chạy chữ tối đa khi không có tiếng (ký tự / giây).
  static const silentCharsPerSecond = 40.0;

  TeacherMood _mood = TeacherMood.idle;
  bool _mouthOpen = false;
  bool _speaking = false;
  String _text = '';
  List<String> _parts = const [];
  int _visible = 0;
  int _serial = 0;
  Utterance? _utterance;
  Timer? _typeTimer;
  Timer? _lipTimer;
  Timer? _moodTimer;
  int _elapsedMs = 0;

  TeacherMood get mood => _mood;
  bool get mouthOpen => _mouthOpen;
  bool get speaking => _speaking;

  /// Toàn bộ câu thoại hiện tại và số ký tự đã hiện (hiệu ứng gõ chữ).
  String get text => _text;
  int get visibleChars => _visible;
  bool get typing => _visible < _text.length;

  /// Tăng mỗi lần có câu thoại mới (để khung thoại trượt lên lại).
  int get serial => _serial;

  /// Cô nói [parts] (các câu nối tiếp) với tâm trạng [mood].
  /// [holdMood]: giữ tư thế (vd vỗ tay) bao lâu sau khi nói xong rồi về mỉm cười.
  /// [forceVoice]: đọc thành tiếng kể cả khi đã tắt tự đọc (bé chủ động bấm loa).
  void say(
    List<String> parts, {
    TeacherMood mood = TeacherMood.idle,
    Duration holdMood = const Duration(seconds: 2),
    bool forceVoice = false,
  }) {
    final clean = [
      for (final p in parts)
        if (p.trim().isNotEmpty) p.trim(),
    ];
    if (clean.isEmpty) return;
    _stopTimers();
    _parts = clean;
    _text = clean.join(' ');
    _visible = 0;
    _serial++;
    _mood = mood;
    _speaking = true;
    _mouthOpen = false;
    notifyListeners();

    final audibleNow = voiceEnabled || forceVoice;
    final u = _audio.speak(clean, voice: audibleNow);
    _utterance = u;
    // Có tiếng: chữ chạy hết đúng lúc giọng đọc xong; không tiếng: chạy nhanh hơn.
    final totalMs = audibleNow ? u.estimated.inMilliseconds : (_text.length / silentCharsPerSecond * 1000).round();
    _elapsedMs = 0;
    _typeTimer = Timer.periodic(const Duration(milliseconds: 30), (t) {
      _elapsedMs += 30;
      final ms = _elapsedMs;
      final next = totalMs <= 0 ? _text.length : (_text.length * ms / totalMs).ceil().clamp(0, _text.length);
      if (next != _visible) {
        _visible = next;
        notifyListeners();
      }
      if (_visible >= _text.length) t.cancel();
    });
    // Khớp khẩu hình: chỉ cử động miệng khi thật sự đang phát ra tiếng.
    _lipTimer = Timer.periodic(lipSyncInterval, (_) {
      final audible = u.audible.value;
      final open = audible ? !_mouthOpen : false;
      if (open != _mouthOpen) {
        _mouthOpen = open;
        notifyListeners();
      }
    });
    u.done.then((_) {
      if (!identical(_utterance, u)) return;
      _lipTimer?.cancel();
      _speaking = false;
      _mouthOpen = false; // nói xong: ngậm miệng, mỉm cười
      _visible = _text.length;
      notifyListeners();
      if (_mood != TeacherMood.idle) {
        _moodTimer = Timer(holdMood, () {
          _mood = TeacherMood.idle;
          notifyListeners();
        });
      }
    });
  }

  /// Nói lại câu vừa rồi (bé bấm loa).
  void replay() {
    if (_parts.isNotEmpty) say(_parts, mood: _mood, forceVoice: true);
  }

  /// Bé chạm khung thoại: hiện hết chữ ngay (giọng vẫn đọc tiếp).
  void skipTyping() {
    if (!typing) return;
    _typeTimer?.cancel();
    _visible = _text.length;
    notifyListeners();
  }

  /// Đổi tâm trạng mà không nói.
  void setMood(TeacherMood mood) {
    _moodTimer?.cancel();
    _mood = mood;
    notifyListeners();
  }

  /// Ẩn khung thoại, dừng nói.
  void clear() {
    _stopTimers();
    _audio.stop();
    _text = '';
    _parts = const [];
    _visible = 0;
    _speaking = false;
    _mouthOpen = false;
    _mood = TeacherMood.idle;
    notifyListeners();
  }

  void _stopTimers() {
    _typeTimer?.cancel();
    _lipTimer?.cancel();
    _moodTimer?.cancel();
    _utterance = null;
  }

  @override
  void dispose() {
    _stopTimers();
    _audio.stop();
    super.dispose();
  }
}
