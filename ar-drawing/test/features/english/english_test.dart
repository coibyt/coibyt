import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/english/english_audio.dart';
import 'package:tracelight/features/english/english_catalog.dart';
import 'package:tracelight/features/english/english_corner.dart';
import 'package:tracelight/features/english/english_quiz.dart';
import 'package:tracelight/features/english/english_scope.dart';
import 'package:tracelight/features/english/english_store.dart';
import 'package:tracelight/features/game/game_store.dart';
import 'package:tracelight/features/lessons/lesson.dart';

import '../../test_app.dart';

EnglishCatalog loadEnglish() => EnglishCatalog.parse(
  File(EnglishCatalog.wordsAsset).readAsStringSync(),
  File(EnglishCatalog.extraAsset).readAsStringSync(),
);

Future<void> frames(WidgetTester tester, [int n = 8]) async {
  for (int i = 0; i < n; i++) {
    await tester.pump(const Duration(milliseconds: 150));
  }
}

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final EnglishCatalog catalog = loadEnglish();

  test('every word has its picture and Pip has recorded everything', () {
    expect(catalog.units.length, greaterThanOrEqualTo(6));
    expect(catalog.words.length, greaterThanOrEqualTo(60));
    final Map<String, Object?> manifest =
        jsonDecode(File(EnglishAudio.manifestAsset).readAsStringSync()) as Map<String, Object?>;
    for (final EnglishWord w in catalog.words) {
      if (w.kind == WordKind.picture) expect(File(w.image!).existsSync(), isTrue, reason: w.image);
      expect(manifest.containsKey(w.audio), isTrue, reason: w.audio);
      expect(manifest.containsKey(w.sentenceAudio), isTrue, reason: w.sentenceAudio);
    }
    for (final Lesson l in loadLessons().lessons) {
      expect(catalog.lessonWords.containsKey(l.id), isTrue, reason: 'English word for ${l.id}');
      expect(manifest.containsKey('lw_${l.id}'), isTrue, reason: 'lw_${l.id}');
    }
    for (final String p in kPencilColors.keys) {
      expect(catalog.pencils.containsKey(p), isTrue, reason: 'English name of pencil $p');
      expect(manifest.containsKey('pen_$p'), isTrue, reason: 'pen_$p');
    }
    for (final String f in <String>['pip.png', 'pip_talk.png', 'pip_cheer.png']) {
      expect(File('assets/english/pip/$f').existsSync(), isTrue, reason: f);
    }
  });

  test('questions mix the same kind of words and favour new words', () {
    final EnglishStore store = EnglishStore(<String, int>{'red': 5, 'blue': 5});
    final List<QuizQuestion> q = makeQuiz(catalog.words, store, count: 5, random: math.Random(1));
    expect(q, hasLength(5));
    for (final QuizQuestion x in q) {
      expect(x.options, hasLength(3));
      expect(x.options.map((EnglishWord w) => w.id).toSet(), hasLength(3));
      expect(x.options, contains(x.answer));
      expect(x.options.every((EnglishWord w) => w.kind == x.answer.kind), isTrue);
      expect(<String>['red', 'blue'], isNot(contains(x.answer.id)));
    }
  });

  test('a word counts as learned after two right answers', () async {
    final EnglishStore store = EnglishStore();
    await store.record('cat', correct: true);
    expect(store.learned('cat'), isFalse);
    await store.record('cat', correct: false);
    await store.record('cat', correct: true);
    expect(store.learned('cat'), isTrue);
    expect((await EnglishStore.load()).learned('cat'), isTrue);
  });

  Widget withEnglish(Widget child, {EnglishStore? store, GameStore? game}) => GameScope(
    store: game ?? GameStore(),
    child: EnglishScope(
      catalog: catalog,
      audio: EnglishAudio(),
      store: store ?? EnglishStore(),
      child: testApp(child),
    ),
  );

  testWidgets('a round of five: right answers, then a brush and coins', (
    WidgetTester tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final GameStore game = GameStore(brushes: 2, brushClock: DateTime.now());
    final EnglishStore store = EnglishStore();
    final List<EnglishWord> pool = catalog.units
        .firstWhere((EnglishUnit u) => u.id == 'animals')
        .words;
    await tester.pumpWidget(
      withEnglish(
        EnglishRoundScreen(pool: pool),
        store: store,
        game: game,
      ),
    );
    await frames(tester);
    for (int i = 0; i < 5; i++) {
      final _RoundProbe probe = _RoundProbe.of(tester);
      await tester.tap(find.byKey(Key('option-${probe.answer}')));
      await frames(tester, 6);
    }
    await frames(tester, 6);
    expect(find.byKey(const Key('roundDone')), findsOneWidget);
    expect(game.brushes, 3);
    expect(game.coins, 10);
    expect(
      store.learnedCount(pool.map((EnglishWord w) => w.id)),
      0,
      reason: 'one right answer each',
    );
  });

  testWidgets('the magic word opens the game after the right picture', (WidgetTester tester) async {
    bool? passed;
    await tester.pumpWidget(
      withEnglish(
        Builder(
          builder: (BuildContext context) => Scaffold(
            body: TextButton(
              onPressed: () async => passed = await passMagicWord(context),
              child: const Text('play'),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('play'));
    await frames(tester, 4);
    expect(find.byKey(const Key('magicWord')), findsOneWidget);
    final _RoundProbe probe = _RoundProbe.of(tester);
    final String wrong = probe.options.firstWhere((String id) => id != probe.answer);
    await tester.tap(find.byKey(Key('option-$wrong')));
    await frames(tester, 4);
    expect(find.byKey(const Key('magicWord')), findsOneWidget, reason: 'try again');
    await tester.tap(find.byKey(Key('option-${probe.answer}')));
    await frames(tester, 6);
    expect(passed, isTrue);
  });

  testWidgets('English corner shows units and progress', (WidgetTester tester) async {
    tester.view.physicalSize = const Size(1080, 3000);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    await tester.pumpWidget(withEnglish(const EnglishCornerScreen()));
    await frames(tester);
    expect(find.byKey(const Key('unit-colours')), findsOneWidget);
    expect(find.byKey(const Key('englishPlay')), findsOneWidget);
    await tester.tap(find.byKey(const Key('unit-animals')));
    await frames(tester);
    expect(find.byKey(const Key('wordCard-cat')), findsOneWidget);
    expect(find.text('cat'), findsWidgets);
  });
}

/// Reads the current question from the option keys on screen.
class _RoundProbe {
  _RoundProbe(this.answer, this.options);

  final String answer;
  final List<String> options;

  static _RoundProbe of(WidgetTester tester) {
    final QuizOptions w = tester.widget<QuizOptions>(find.byType(QuizOptions));
    return _RoundProbe(w.question.answer.id, <String>[
      for (final EnglishWord o in w.question.options) o.id,
    ]);
  }
}
