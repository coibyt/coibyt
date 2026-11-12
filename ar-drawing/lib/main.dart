import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';
import 'core/i18n/language_controller.dart';
import 'features/english/english_audio.dart';
import 'features/english/english_catalog.dart';
import 'features/english/english_store.dart';
import 'features/exams/exam.dart';
import 'features/exams/exam_record_store.dart';
import 'features/game/game_store.dart';
import 'features/leaderboard/leaderboard_client.dart';
import 'features/leaderboard/player_profile.dart';
import 'features/lessons/gallery_store.dart';
import 'features/lessons/lesson.dart';
import 'features/lessons/lesson_progress_store.dart';
import 'features/teacher/teacher_scope.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Tracing works best with the phone held upright above the paper, and a
  // fixed orientation keeps the camera preview and the overlay aligned.
  await SystemChrome.setPreferredOrientations(<DeviceOrientation>[DeviceOrientation.portraitUp]);

  // Language files, Lumi's scripts / voice-over and the lessons are small
  // bundled JSON files: load them before the first frame.
  final (
    LanguageController language,
    TeacherServices teacher,
    LessonCatalog lessons,
    LessonProgressStore progress,
    ExamCatalog exams,
    ExamRecordStore examRecords,
    GameStore game,
    PlayerProfile profile,
    GalleryStore gallery,
  ) = await (
    LanguageController.load(),
    TeacherServices.load(),
    LessonCatalog.load(),
    LessonProgressStore.load(),
    ExamCatalog.load(),
    ExamRecordStore.load(),
    GameStore.load(),
    PlayerProfile.load(),
    GalleryStore.load(),
  ).wait;
  final (EnglishCatalog englishWords, EnglishStore englishStore) = await (
    EnglishCatalog.load(),
    EnglishStore.load(),
  ).wait;
  final EnglishAudio englishAudio = await EnglishAudio.load(isMuted: () => teacher.voice.muted);

  runApp(
    TraceLightApp(
      language: language,
      teacher: teacher,
      lessons: lessons,
      progress: progress,
      exams: exams,
      examRecords: examRecords,
      game: game,
      profile: profile,
      leaderboard: LeaderboardClient(),
      gallery: gallery,
      englishCatalog: englishWords,
      englishStore: englishStore,
      englishAudio: englishAudio,
    ),
  );
}
