import 'dart:convert';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// What the child knows: correct answers per word (on this device).
class EnglishStore extends ChangeNotifier {
  EnglishStore([Map<String, int>? correct]) : _correct = correct ?? <String, int>{};

  static const String _key = 'english_progress';

  /// Correct answers needed to count a word as learned.
  static const int learnedAt = 2;

  final Map<String, int> _correct;

  int correctOf(String id) => _correct[id] ?? 0;
  bool learned(String id) => correctOf(id) >= learnedAt;
  int learnedCount(Iterable<String> ids) => ids.where(learned).length;

  static Future<EnglishStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? raw = prefs.getString(_key);
      if (raw != null) {
        return EnglishStore(<String, int>{
          for (final MapEntry<String, Object?> e
              in (jsonDecode(raw) as Map<String, Object?>).entries)
            e.key: (e.value! as num).toInt(),
        });
      }
    } on Object catch (e) {
      debugPrint('Could not read English progress: $e');
    }
    return EnglishStore();
  }

  Future<void> record(String id, {required bool correct}) async {
    if (!correct) return;
    _correct[id] = correctOf(id) + 1;
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(_key, jsonEncode(_correct));
    } on Object catch (e) {
      debugPrint('Could not save English progress: $e');
    }
  }
}
