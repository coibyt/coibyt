import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:tracelight/core/app_theme.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/core/i18n/language_controller.dart';
import 'package:tracelight/core/i18n/translations.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/teacher/teacher_scope.dart';
import 'package:tracelight/features/teacher/teacher_script.dart';
import 'package:tracelight/features/teacher/voiceover_service.dart';

/// Reads a language file straight from disk (no asset bundle needed).
Translations translationsFor(AppLanguage language) {
  Map<String, Object?> read(AppLanguage l) =>
      jsonDecode(File(l.asset).readAsStringSync()) as Map<String, Object?>;
  final Translations vi = Translations(AppLanguage.vi, read(AppLanguage.vi));
  return language == AppLanguage.vi ? vi : Translations(language, read(language), fallback: vi);
}

TeacherScripts loadScripts() => TeacherScripts.parse(File(TeacherScripts.asset).readAsStringSync());

LessonCatalog loadLessons() => LessonCatalog.parse(File(LessonCatalog.asset).readAsStringSync());

/// Teacher services for tests: silent voice, and by default every intro is
/// marked as already heard so Lumi stays a small avatar.
TeacherServices testTeacher({bool seenAll = true, VoiceoverService? voice}) {
  final TeacherScripts scripts = loadScripts();
  return TeacherServices(
    scripts: scripts,
    voice: voice ?? VoiceoverService(manifest: const <String, Map<String, int>>{}),
    seen: seenAll ? scripts.ids.toSet() : <String>{},
  );
}

/// Wraps [home] with languages, the teacher and the app theme.
Widget testApp(
  Widget home, {
  AppLanguage language = AppLanguage.en,
  TeacherServices? teacher,
  LanguageController? controller,
}) {
  final LanguageController lang = controller ?? LanguageController(translationsFor(language));
  return I18nScope(
    controller: lang,
    child: TeacherScope(
      services: teacher ?? testTeacher(),
      child: ListenableBuilder(
        listenable: lang,
        builder: (BuildContext context, _) => MaterialApp(
          theme: AppTheme.dark(),
          locale: lang.language.locale,
          supportedLocales: <Locale>[for (final AppLanguage l in AppLanguage.values) l.locale],
          localizationsDelegates: GlobalMaterialLocalizations.delegates,
          home: home,
        ),
      ),
    ),
  );
}
