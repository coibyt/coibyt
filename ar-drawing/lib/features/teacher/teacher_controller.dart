import 'package:flutter/foundation.dart';

import 'teacher_scope.dart';
import 'teacher_script.dart';

/// Tells the teacher overlay what Lumi should say.
///
/// Screens call [say] (or [sayScript]); the overlay widget plays the lines
/// one after another with voice-over and typewriter text. When the lines are
/// done or the user closes the bubble, Lumi shrinks to a small avatar that
/// can be tapped to hear the last lines again.
class TeacherController extends ChangeNotifier {
  List<TeacherLine> _lines = const <TeacherLine>[];
  int _index = 0;
  bool _open = false;

  /// Bumped on every [say] so the overlay restarts even with the same lines.
  int _version = 0;

  List<TeacherLine> get lines => _lines;
  int get index => _index;
  bool get isOpen => _open && _lines.isNotEmpty;
  int get version => _version;
  TeacherLine? get current => _lines.isEmpty ? null : _lines[_index];
  bool get isLastLine => _index >= _lines.length - 1;

  /// Mood of the line on screen (or of the last one when closed).
  String get mood => current?.mood ?? 'wave';

  void say(List<TeacherLine> lines) {
    if (lines.isEmpty) return;
    _lines = List<TeacherLine>.unmodifiable(lines);
    _index = 0;
    _open = true;
    _version++;
    notifyListeners();
  }

  /// Remembers [lines] without opening the bubble (the avatar can replay
  /// them later).
  void load(List<TeacherLine> lines) {
    _lines = List<TeacherLine>.unmodifiable(lines);
    _index = 0;
    _open = false;
    notifyListeners();
  }

  /// Plays [scriptId] the first time this user sees it; afterwards only
  /// keeps it ready behind the avatar.
  void introduce(TeacherServices? services, String scriptId) {
    if (services == null) return;
    final List<TeacherLine> lines = services.scripts[scriptId];
    if (services.hasSeen(scriptId)) {
      load(lines);
    } else {
      say(lines);
      services.markSeen(scriptId);
    }
  }

  void next() {
    if (isLastLine) {
      close();
      return;
    }
    _index++;
    _version++;
    notifyListeners();
  }

  void close() {
    if (!_open) return;
    _open = false;
    notifyListeners();
  }

  /// Opens the bubble again from the first line.
  void reopen() {
    if (_lines.isEmpty) return;
    say(_lines);
  }
}
