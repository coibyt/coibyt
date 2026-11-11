import 'dart:convert';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'exam.dart';
import 'exam_scoring.dart';

/// One finished exam.
@immutable
class ExamAttempt {
  const ExamAttempt({
    required this.examId,
    required this.total,
    required this.at,
    required this.criteria,
  });

  factory ExamAttempt.fromJson(Map<String, Object?> j) => ExamAttempt(
    examId: j['exam']! as String,
    total: (j['total']! as num).toDouble(),
    at: DateTime.fromMillisecondsSinceEpoch((j['at']! as num).toInt()),
    criteria: <Criterion, double>{
      for (final MapEntry<String, Object?> e in (j['criteria']! as Map<String, Object?>).entries)
        Criterion.values.byName(e.key): (e.value! as num).toDouble(),
    },
  );

  final String examId;
  final double total;
  final DateTime at;
  final Map<Criterion, double> criteria;

  bool get passed => total >= Exam.passMark;

  Map<String, Object?> toJson() => <String, Object?>{
    'exam': examId,
    'total': total,
    'at': at.millisecondsSinceEpoch,
    'criteria': <String, double>{
      for (final MapEntry<Criterion, double> e in criteria.entries) e.key.name: e.value,
    },
  };
}

/// Exam history on this device (best marks, attempts).
class ExamRecordStore extends ChangeNotifier {
  ExamRecordStore([List<ExamAttempt>? attempts]) : _attempts = attempts ?? <ExamAttempt>[];

  static const String _key = 'exam_attempts';
  final List<ExamAttempt> _attempts;

  List<ExamAttempt> get attempts => List<ExamAttempt>.unmodifiable(_attempts);

  static Future<ExamRecordStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? raw = prefs.getString(_key);
      if (raw != null) {
        return ExamRecordStore(<ExamAttempt>[
          for (final Object? e in jsonDecode(raw) as List<Object?>)
            ExamAttempt.fromJson(e! as Map<String, Object?>),
        ]);
      }
    } on Object catch (e) {
      debugPrint('Could not read exam history: $e');
    }
    return ExamRecordStore();
  }

  ExamAttempt? best(String examId) {
    ExamAttempt? b;
    for (final ExamAttempt a in _attempts) {
      if (a.examId == examId && (b == null || a.total > b.total)) b = a;
    }
    return b;
  }

  int attemptsOf(String examId) => _attempts.where((ExamAttempt a) => a.examId == examId).length;

  Future<ExamAttempt> record(Exam exam, ExamScore score, {DateTime? at}) async {
    final ExamAttempt attempt = ExamAttempt(
      examId: exam.id,
      total: score.total,
      at: at ?? DateTime.now(),
      criteria: score.criteria,
    );
    _attempts.add(attempt);
    if (_attempts.length > 300) _attempts.removeAt(0);
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(
        _key,
        jsonEncode(_attempts.map((ExamAttempt a) => a.toJson()).toList()),
      );
    } on Object catch (e) {
      debugPrint('Could not save exam history: $e');
    }
    return attempt;
  }
}

class ExamRecordScope extends InheritedNotifier<ExamRecordStore> {
  const ExamRecordScope({super.key, required ExamRecordStore store, required super.child})
    : super(notifier: store);

  static ExamRecordStore? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<ExamRecordScope>()?.notifier;
}
