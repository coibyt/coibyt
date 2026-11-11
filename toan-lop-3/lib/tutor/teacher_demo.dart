import 'dart:async';

import 'package:flutter/foundation.dart';

import '../logic/demo_script.dart';
import '../models/blocks.dart';
import 'teacher_avatar.dart';
import 'teacher_controller.dart';

export '../logic/demo_script.dart';

TeacherMood _mood(DemoMood m) => switch (m) {
  DemoMood.idle => TeacherMood.idle,
  DemoMood.point => TeacherMood.point,
  DemoMood.clap => TeacherMood.clap,
};

/// Điều khiển phần cô làm mẫu: tự chạy từ đầu tới cuối một lần, tạm dừng, nghe lại, xem hết.
class DemoPlayer extends ChangeNotifier {
  DemoPlayer({required this.scenes, required this.teacher, required List<ContentBlock> blocks}) {
    for (final (i, b) in blocks.indexed) {
      if (b is ColumnArithmeticBlock || b is LongDivisionBlock) drivers[i] = ValueNotifier(0);
    }
    _totals = {
      for (final (i, b) in blocks.indexed)
        if (b is ColumnArithmeticBlock) i: b.digitSteps.length else if (b is LongDivisionBlock) i: b.digitSteps.length,
    };
  }

  final List<DemoScene> scenes;
  final TeacherController teacher;

  /// Bước hiện tại của từng khối đặt tính (cô điều khiển).
  final drivers = <int, ValueNotifier<int>>{};
  late final Map<int, int> _totals;

  /// Khoảng nghỉ giữa hai cảnh (để bé kịp nhìn).
  static const gap = Duration(milliseconds: 450);

  int _index = -1;
  bool _playing = false;
  bool _done = false;
  int _token = 0;
  bool _disposed = false;

  /// Cảnh đang giảng (-1 = chưa bắt đầu).
  int get index => _index;
  bool get playing => _playing;
  bool get done => _done;
  DemoScene? get current => _index >= 0 && _index < scenes.length ? scenes[_index] : null;
  double get progress => scenes.isEmpty ? 1 : (_done ? 1 : (_index + 1).clamp(0, scenes.length) / scenes.length);

  /// Khối đang được giảng (để tô sáng, cuộn tới).
  int? get activeBlock => _done ? null : current?.block;

  /// Mẹo đã đọc tới (để hiện thẻ mẹo).
  int get tipsShown {
    if (_done) return scenes.where((s) => s.tip != null).length;
    var n = 0;
    for (var i = 0; i <= _index && i < scenes.length; i++) {
      if (scenes[i].tip != null) n = scenes[i].tip! + 1;
    }
    return n;
  }

  /// Khối [block] đã được giảng tới chưa (khối chưa tới thì làm mờ).
  bool reached(int block) {
    if (_done) return true;
    for (var i = 0; i <= _index && i < scenes.length; i++) {
      final b = scenes[i].block;
      if (b != null && b >= block) return true;
    }
    return false;
  }

  void play() {
    if (_playing || _disposed) return;
    if (_done) return restart();
    _playing = true;
    notifyListeners();
    unawaited(_run(++_token, _index < 0 ? 0 : _index));
  }

  Future<void> _run(int token, int from) async {
    for (var i = from; i < scenes.length; i++) {
      if (token != _token || _disposed) return;
      _index = i;
      final s = scenes[i];
      if (s.block != null && s.step != null) drivers[s.block!]?.value = s.step!;
      notifyListeners();
      await teacher.say(s.say, mood: _mood(s.mood));
      if (token != _token || _disposed) return;
      await Future<void>.delayed(gap);
    }
    if (token != _token || _disposed) return;
    _playing = false;
    _done = true;
    notifyListeners();
  }

  void pause() {
    if (!_playing) return;
    _token++;
    _playing = false;
    teacher.clear();
    notifyListeners();
  }

  void restart() {
    _token++;
    teacher.clear();
    for (final d in drivers.values) {
      d.value = 0;
    }
    _index = -1;
    _done = false;
    _playing = false;
    play();
  }

  /// Xem hết ngay: hiện toàn bộ các bước, không nói nữa.
  void skipToEnd() {
    _token++;
    teacher.clear();
    for (final e in drivers.entries) {
      e.value.value = _totals[e.key] ?? 0;
    }
    _playing = false;
    _done = true;
    notifyListeners();
  }

  @override
  void dispose() {
    _disposed = true;
    _token++;
    for (final d in drivers.values) {
      d.dispose();
    }
    super.dispose();
  }
}
