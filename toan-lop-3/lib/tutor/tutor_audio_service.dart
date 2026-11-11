import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

import '../logic/spoken_vi.dart';
import '../services/tutor_voice.dart';
import 'voice_library.dart';

/// Một lượt cô giáo nói (một hoặc vài câu nối tiếp).
class Utterance {
  Utterance._(this.estimated);

  /// Thời lượng dự kiến (để chạy chữ khớp giọng).
  final Duration estimated;
  final _done = Completer<void>();
  final _audible = ValueNotifier<bool>(false);
  bool _cancelled = false;
  final List<Timer> _timers = [];

  /// Chờ [d] (huỷ được khi bị ngắt lời).
  Future<void> _wait(Duration d) {
    final c = Completer<void>();
    _timers.add(
      Timer(d, () {
        if (!c.isCompleted) c.complete();
      }),
    );
    _waiters.add(c);
    return c.future;
  }

  final List<Completer<void>> _waiters = [];

  /// Hoàn tất khi nói xong (hoặc bị ngắt).
  Future<void> get done => _done.future;

  /// true khi đang thực sự phát ra tiếng (để mở/ngậm miệng).
  ValueListenable<bool> get audible => _audible;
  bool get cancelled => _cancelled;

  void _finish() {
    for (final t in _timers) {
      t.cancel();
    }
    for (final c in _waiters) {
      if (!c.isCompleted) c.complete();
    }
    _audible.value = false;
    if (!_done.isCompleted) _done.complete();
  }
}

/// Phát giọng cô giáo: ưu tiên file ghi âm 11max; câu chưa có file thì dùng giọng
/// đọc của máy (nếu có tiếng Việt), không có nữa thì chỉ hiện chữ.
class TutorAudioService {
  TutorAudioService({VoiceLibrary? library, TutorVoice? fallback, AudioPlayer? player, this.speaker = ''})
    : _library = library,
      _fallback = fallback,
      _player = player;

  static TutorAudioService instance = TutorAudioService();

  /// Người nói: '' = cô Mai, 'mc' = MC gameshow. Câu của MC tra trong danh mục với khoá "mc:`câu`"
  /// (cùng một câu, MC và cô có hai file giọng khác nhau); không có thì dùng bản của cô.
  final String speaker;

  /// Mỗi dịch vụ một máy phát riêng: hai màn (luyện tập + lời giải) dùng chung mã máy phát thì trên web
  /// lệnh phát bị treo 30 giây → cô đứng im ở câu đầu.
  static int _seq = 0;
  late final String _playerId = '${speaker.isEmpty ? 'teacher' : speaker}-voice-${_seq++}';

  VoiceClip? _clip(String part) => (speaker.isEmpty ? null : library.lookup('$speaker:$part')) ?? library.lookup(part);

  final VoiceLibrary? _library;
  final TutorVoice? _fallback;
  AudioPlayer? _player;
  Utterance? _current;
  StreamSubscription<void>? _completeSub;

  VoiceLibrary get library => _library ?? VoiceLibrary.instance;
  TutorVoice get fallback => _fallback ?? AppTutorVoice.instance;

  /// Tốc độ đọc ước lượng khi không có file (ký tự / giây) — giọng đọc trẻ em chậm.
  static const charsPerSecond = 14.0;

  static Duration estimate(String text) => Duration(milliseconds: (text.length / charsPerSecond * 1000).round() + 300);

  Duration durationOf(List<String> parts) {
    var ms = 0;
    for (final p in parts) {
      ms += _clip(p)?.durationMs ?? estimate(p).inMilliseconds;
    }
    return Duration(milliseconds: ms);
  }

  /// Nói các câu [parts] nối tiếp. [voice] = false: chỉ chạy chữ, không phát tiếng.
  Utterance speak(List<String> parts, {bool voice = true}) {
    stop();
    final u = Utterance._(durationOf(parts));
    _current = u;
    if (!voice) {
      u._wait(u.estimated).then((_) => u._finish());
    } else {
      _run(u, parts);
    }
    return u;
  }

  Future<void> _run(Utterance u, List<String> parts) async {
    for (final part in parts) {
      if (u._cancelled) break;
      final clip = _clip(part);
      if (clip != null) {
        final ok = await _playClip(u, clip);
        if (!ok) await u._wait(Duration(milliseconds: clip.durationMs));
      } else {
        final spoke = await fallback.speak(spokenVietnamese(part));
        u._audible.value = spoke;
        await u._wait(estimate(part));
        u._audible.value = false;
      }
    }
    u._finish();
  }

  Future<bool> _playClip(Utterance u, VoiceClip clip) async {
    try {
      final player = _player ??= AudioPlayer(playerId: _playerId)..setReleaseMode(ReleaseMode.stop);
      final finished = Completer<void>();
      await _completeSub?.cancel();
      _completeSub = player.onPlayerComplete.listen((_) {
        if (!finished.isCompleted) finished.complete();
      });
      await player.stop();
      await player.play(AssetSource(clip.file.replaceFirst('assets/', '')));
      u._audible.value = true;
      // Chờ phát xong; phòng khi mất sự kiện "complete" thì dừng theo thời lượng + 1 giây.
      await Future.any([finished.future, u._wait(Duration(milliseconds: clip.durationMs + 1000))]);
      u._audible.value = false;
      return true;
    } on Object catch (e) {
      // Trình duyệt chặn tự phát khi bé chưa chạm màn hình, hoặc lỗi tải file.
      debugPrint('Không phát được giọng cô giáo: $e');
      u._audible.value = false;
      return false;
    }
  }

  void dispose() {
    stop();
    _completeSub?.cancel();
    _player?.dispose();
    _player = null;
  }

  /// [u] có phải câu đang nói không.
  bool isCurrent(Utterance u) => identical(_current, u);

  /// Dừng câu đang nói.
  void stop() {
    final u = _current;
    if (u == null) return;
    u._cancelled = true;
    u._finish();
    _current = null;
    _player?.stop();
    fallback.stop();
  }
}
