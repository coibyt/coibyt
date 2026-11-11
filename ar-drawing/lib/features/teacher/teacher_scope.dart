import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'teacher_script.dart';
import 'voiceover_service.dart';

/// Everything the virtual teacher needs: scripts, voice-over, and which
/// introductions the user has already heard (so Lumi does not repeat herself
/// every time a screen opens).
class TeacherServices {
  TeacherServices({required this.scripts, required this.voice, Set<String>? seen})
    : _seen = seen ?? <String>{};

  static const String _seenKey = 'teacher_seen';

  final TeacherScripts scripts;
  final VoiceoverService voice;
  final Set<String> _seen;

  static Future<TeacherServices> load({AssetBundle? bundle}) async {
    final TeacherScripts scripts = await TeacherScripts.load(bundle: bundle);
    final VoiceoverService voice = await VoiceoverService.load(bundle: bundle);
    Set<String> seen = <String>{};
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      seen = (prefs.getStringList(_seenKey) ?? <String>[]).toSet();
    } on Object catch (e) {
      debugPrint('Could not read teacher progress: $e');
    }
    return TeacherServices(scripts: scripts, voice: voice, seen: seen);
  }

  bool hasSeen(String scriptId) => _seen.contains(scriptId);

  Future<void> markSeen(String scriptId) async {
    if (!_seen.add(scriptId)) return;
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setStringList(_seenKey, _seen.toList());
    } on Object catch (e) {
      debugPrint('Could not save teacher progress: $e');
    }
  }
}

/// Provides [TeacherServices] to the widget tree.
class TeacherScope extends InheritedWidget {
  const TeacherScope({super.key, required this.services, required super.child});

  final TeacherServices services;

  /// Null when no teacher is configured (e.g. isolated widget tests).
  static TeacherServices? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<TeacherScope>()?.services;

  @override
  bool updateShouldNotify(TeacherScope oldWidget) => services != oldWidget.services;
}
