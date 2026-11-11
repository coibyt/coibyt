import 'lesson.dart';
import 'lesson_progress_store.dart';

/// Learning comes first: the exam room and the games open after the
/// learner finishes this many colouring lessons.
const int kLessonsToUnlockGames = 1;

/// Lessons of the previous level to finish before a level opens.
const int kLessonsPerLevelGate = 2;

/// Lessons added in the latest update (shown with a "new" ribbon).
const Set<String> kNewLessons = <String>{
  'strawberry',
  'watermelon',
  'ice_cream',
  'goldfish',
  'ladybug',
  'mushroom',
  'owl',
  'panda',
  'sunflower',
  'teapot',
  'balloon',
  'lighthouse',
  'sailboat',
  'unicorn',
  'dragon',
  'castle',
  'portrait_boy',
  'toddler',
  'schoolgirl',
  'young_woman',
  'man_glasses',
  'grandma',
  'grandpa',
  'rice_terraces',
  'beach_sunset',
  'village_house',
  'city_street',
  'karst_bay',
};

bool gamesUnlocked(LessonProgressStore? store, List<Lesson> lessons) =>
    store == null || store.doneCount(lessons) >= kLessonsToUnlockGames;

/// Basic is always open; each next level opens after finishing
/// [kLessonsPerLevelGate] lessons of the level before.
bool levelUnlocked(LessonLevel level, LessonProgressStore? store, List<Lesson> lessons) {
  if (store == null || level == LessonLevel.basic) return true;
  final LessonLevel before = LessonLevel.values[level.index - 1];
  final int done = lessons.where((Lesson l) => l.level == before && store.isDone(l)).length;
  return done >= kLessonsPerLevelGate;
}

bool lessonUnlocked(Lesson lesson, LessonProgressStore? store, List<Lesson> lessons) =>
    levelUnlocked(lesson.level, store, lessons);

/// The lesson to suggest now: one in progress, else the first not finished
/// in an open level, else the first lesson.
Lesson? nextLesson(List<Lesson> lessons, LessonProgressStore? store) {
  if (lessons.isEmpty) return null;
  if (store == null) return lessons.first;
  final List<Lesson> open = lessons.where((Lesson l) => lessonUnlocked(l, store, lessons)).toList();
  for (final Lesson l in open) {
    if (store.isStarted(l) && !store.isDone(l)) return l;
  }
  for (final Lesson l in open) {
    if (!store.isDone(l)) return l;
  }
  return lessons.first;
}

/// Stars for a finished lesson from how much of each step the learner
/// covered (drawing board), 0..1 per step.
int starsFor(List<double> stepCoverage) {
  if (stepCoverage.isEmpty) return 3;
  final double avg = stepCoverage.reduce((double a, double b) => a + b) / stepCoverage.length;
  if (avg >= 0.7) return 3;
  if (avg >= 0.4) return 2;
  return 1;
}
