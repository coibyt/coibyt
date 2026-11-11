import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

import 'core/app_theme.dart';
import 'core/i18n/app_language.dart';
import 'core/i18n/language_controller.dart';
import 'features/home/home_screen.dart';
import 'features/exams/exam.dart';
import 'features/exams/exam_record_store.dart';
import 'features/lessons/lesson.dart';
import 'features/lessons/lesson_progress_store.dart';
import 'features/teacher/teacher_scope.dart';

/// Root widget of TraceLight (working name).
class TraceLightApp extends StatelessWidget {
  const TraceLightApp({
    super.key,
    required this.language,
    required this.teacher,
    this.lessons = LessonCatalog.empty,
    this.progress,
    this.exams = ExamCatalog.empty,
    this.examRecords,
    this.home,
  });

  final LanguageController language;
  final TeacherServices teacher;
  final LessonCatalog lessons;

  /// Learner's progress in the lessons (empty in tests by default).
  final LessonProgressStore? progress;
  final ExamCatalog exams;
  final ExamRecordStore? examRecords;

  /// Replaces the home screen (tests).
  final Widget? home;

  @override
  Widget build(BuildContext context) {
    return I18nScope(
      controller: language,
      child: TeacherScope(
        services: teacher,
        child: LessonProgressScope(
          store: progress ?? LessonProgressStore(),
          child: ExamRecordScope(
            store: examRecords ?? ExamRecordStore(),
            child: ListenableBuilder(
              listenable: language,
              builder: (BuildContext context, _) => MaterialApp(
                title: language.translations.tr('app.name'),
                debugShowCheckedModeBanner: false,
                theme: AppTheme.dark(),
                locale: language.language.locale,
                supportedLocales: <Locale>[
                  for (final AppLanguage l in AppLanguage.values) l.locale,
                ],
                localizationsDelegates: GlobalMaterialLocalizations.delegates,
                home: home ?? HomeScreen(lessons: lessons.lessons, exams: exams.exams),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
