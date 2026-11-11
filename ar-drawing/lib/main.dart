import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';
import 'core/i18n/language_controller.dart';
import 'features/lessons/lesson.dart';
import 'features/teacher/teacher_scope.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Tracing works best with the phone held upright above the paper, and a
  // fixed orientation keeps the camera preview and the overlay aligned.
  await SystemChrome.setPreferredOrientations(<DeviceOrientation>[DeviceOrientation.portraitUp]);

  // Language files, Lumi's scripts / voice-over and the lessons are small
  // bundled JSON files: load them before the first frame.
  final (LanguageController language, TeacherServices teacher, LessonCatalog lessons) = await (
    LanguageController.load(),
    TeacherServices.load(),
    LessonCatalog.load(),
  ).wait;

  runApp(TraceLightApp(language: language, teacher: teacher, lessons: lessons));
}
