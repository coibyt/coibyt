import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/features/teacher/teacher_controller.dart';
import 'package:tracelight/features/teacher/teacher_scope.dart';
import 'package:tracelight/features/teacher/teacher_script.dart';
import 'package:tracelight/features/teacher/voiceover_service.dart';
import 'package:tracelight/features/teacher/widgets/teacher_overlay.dart';
import 'package:tracelight/features/teacher/widgets/typewriter_text.dart';

import '../../test_app.dart';

/// Pretends every line has a 2-second recording and remembers what played.
class FakeVoice extends VoiceoverService {
  FakeVoice() : super(manifest: const <String, Map<String, int>>{});

  final List<String> played = <String>[];
  int stops = 0;

  /// Simulates a browser that refuses sound until the user taps.
  bool blockNext = false;

  @override
  Future<VoicePlayback> play(AppLanguage language, String lineId) async {
    played.add('${language.name}:$lineId');
    if (blockNext) {
      blockNext = false;
      return const VoicePlayback(VoiceStatus.blocked);
    }
    return muted
        ? VoicePlayback.silent
        : const VoicePlayback(VoiceStatus.playing, Duration(seconds: 2));
  }

  @override
  Future<void> stop() async => stops++;
}

const List<TeacherLine> twoLines = <TeacherLine>[
  TeacherLine(id: 'home_welcome_1', mood: 'wave'),
  TeacherLine(id: 'home_welcome_3', mood: 'point'),
];

/// Lumi's pose image, or one of its talking / blinking frames.
Finder lumiShows(String mood) => find.byWidgetPredicate(
  (Widget w) =>
      w is Image &&
      w.image is AssetImage &&
      RegExp('(lumi_$mood\\.png|/${mood}_(talk|blink)\\.png)\$')
          .hasMatch((w.image as AssetImage).assetName),
);

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));

  group('TeacherController', () {
    test('say / next / close / reopen', () {
      final TeacherController c = TeacherController();
      expect(c.isOpen, isFalse);
      c.say(twoLines);
      expect(c.isOpen, isTrue);
      expect(c.current!.id, 'home_welcome_1');
      expect(c.mood, 'wave');
      c.next();
      expect(c.current!.id, 'home_welcome_3');
      expect(c.isLastLine, isTrue);
      c.next(); // past the last line closes the bubble
      expect(c.isOpen, isFalse);
      c.reopen();
      expect(c.isOpen, isTrue);
      expect(c.index, 0);
    });

    test('introduce plays a script once, then only keeps it ready', () {
      final TeacherServices services = testTeacher(seenAll: false);
      final TeacherController first = TeacherController()..introduce(services, 'home_welcome');
      expect(first.isOpen, isTrue);
      expect(services.hasSeen('home_welcome'), isTrue);
      final TeacherController again = TeacherController()..introduce(services, 'home_welcome');
      expect(again.isOpen, isFalse);
      expect(again.lines, isNotEmpty);
    });
  });

  testWidgets('typewriter reveals Vietnamese letters whole and can be finished early', (
    WidgetTester tester,
  ) async {
    final GlobalKey<TypewriterTextState> key = GlobalKey<TypewriterTextState>();
    const String text = 'Mình tô điểm sáng';
    await tester.pumpWidget(
      const Directionality(textDirection: TextDirection.ltr, child: SizedBox()),
    );
    await tester.pumpWidget(
      Directionality(
        textDirection: TextDirection.ltr,
        child: TypewriterText(key: key, text: text, duration: const Duration(seconds: 2)),
      ),
    );
    String visible() {
      final Text t = tester.widget(find.byType(Text));
      return (t.textSpan! as TextSpan).children!.first.toPlainText();
    }

    expect(visible(), '');
    await tester.pump(const Duration(seconds: 1));
    final String half = visible();
    expect(half.length, inInclusiveRange(6, 11));
    expect(text.startsWith(half), isTrue, reason: 'never shows a broken letter');
    key.currentState!.finish();
    await tester.pump();
    expect(visible(), text);
    expect(key.currentState!.isFinished, isTrue);
  });

  Future<(TeacherController, FakeVoice)> pumpTeacher(
    WidgetTester tester, {
    AppLanguage language = AppLanguage.vi,
  }) async {
    final TeacherController controller = TeacherController();
    final FakeVoice voice = FakeVoice();
    await tester.pumpWidget(
      testApp(
        Scaffold(
          body: Stack(
            children: <Widget>[Positioned.fill(child: TeacherOverlay(controller: controller))],
          ),
        ),
        language: language,
        teacher: testTeacher(voice: voice),
      ),
    );
    return (controller, voice);
  }

  testWidgets('Lumi speaks, types in sync with the voice and changes pose', (
    WidgetTester tester,
  ) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(tester);
    controller.say(twoLines);
    await tester.pump();
    await tester.pump();
    expect(find.byKey(const Key('teacherDialog')), findsOneWidget);
    expect(voice.played, <String>['vi:home_welcome_1']);
    expect(lumiShows('wave'), findsOneWidget);

    // Voice lasts 2 s: text is still typing at 1 s, complete by 2 s.
    await tester.pump(const Duration(seconds: 1));
    expect(find.textContaining('Xin chào! Mình là Lumi', findRichText: true), findsOneWidget);
    final TypewriterTextState tw = tester.state(find.byType(TypewriterText));
    expect(tw.isFinished, isFalse);
    await tester.pump(const Duration(milliseconds: 900));
    expect(tw.isFinished, isTrue);

    // Tapping the bubble when the text is complete goes to the next line.
    await tester.tap(find.byKey(const Key('teacherBubble')));
    await tester.pump();
    await tester.pump();
    expect(voice.played.last, 'vi:home_welcome_3');
    await tester.pump(const Duration(milliseconds: 400));
    expect(lumiShows('point'), findsOneWidget);
    expect(find.text('Xong'), findsOneWidget, reason: 'last line offers "Done"');
  });

  testWidgets('tap while typing shows the whole sentence first', (WidgetTester tester) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(tester);
    controller.say(twoLines);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));
    await tester.tap(find.byKey(const Key('teacherBubble')));
    await tester.pump();
    final TypewriterTextState tw = tester.state(find.byType(TypewriterText));
    expect(tw.isFinished, isTrue);
    expect(controller.index, 0, reason: 'first tap only completes the text');
    expect(voice.played, hasLength(1));
  });

  testWidgets('close shrinks Lumi to an avatar that replays the lines', (
    WidgetTester tester,
  ) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(tester);
    controller.say(twoLines);
    await tester.pump();
    await tester.pump();
    await tester.tap(find.byKey(const Key('teacherClose')));
    await tester.pump();
    expect(find.byKey(const Key('teacherDialog')), findsNothing);
    expect(find.byKey(const Key('teacherAvatar')), findsOneWidget);
    expect(voice.stops, greaterThan(0), reason: 'voice stops when closed');

    await tester.tap(find.byKey(const Key('teacherAvatar')));
    await tester.pump();
    await tester.pump();
    expect(find.byKey(const Key('teacherDialog')), findsOneWidget);
    expect(voice.played.last, 'vi:home_welcome_1');
  });

  testWidgets('mute button silences Lumi and is remembered', (WidgetTester tester) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(tester);
    controller.say(twoLines);
    await tester.pump();
    await tester.pump();
    await tester.tap(find.byKey(const Key('teacherSpeaker')));
    await tester.pump();
    expect(voice.muted, isTrue);
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    expect(prefs.getBool('teacher_muted'), isTrue);
  });

  testWidgets('English interface shows English lines', (WidgetTester tester) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(
      tester,
      language: AppLanguage.en,
    );
    controller.say(twoLines);
    await tester.pump();
    await tester.pump();
    await tester.pump(const Duration(seconds: 3));
    expect(find.textContaining("Hello! I'm Lumi", findRichText: true), findsOneWidget);
    expect(find.text('Next'), findsOneWidget);
    expect(voice.played.single, 'en:home_welcome_1');
  });

  testWidgets('when the browser blocks sound, "tap to listen" plays it on tap', (
    WidgetTester tester,
  ) async {
    final (TeacherController controller, FakeVoice voice) = await pumpTeacher(tester);
    voice.blockNext = true;
    controller.say(twoLines);
    await tester.pump();
    await tester.pump();
    expect(find.text('Chạm để nghe'), findsOneWidget);
    await tester.tap(find.byKey(const Key('teacherSpeaker')));
    await tester.pump();
    await tester.pump();
    expect(voice.played, <String>['vi:home_welcome_1', 'vi:home_welcome_1']);
    expect(find.text('Chạm để nghe'), findsNothing);
    expect(voice.muted, isFalse, reason: 'tapping to listen must not mute');
  });
}
