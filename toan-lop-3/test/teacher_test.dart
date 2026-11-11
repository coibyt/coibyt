import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:toan_lop_3/logic/spoken_vi.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/services/sound_service.dart';
import 'package:toan_lop_3/services/tutor_voice.dart';
import 'package:toan_lop_3/tutor/reward_burst.dart';
import 'package:toan_lop_3/tutor/teacher_assets.dart';
import 'package:toan_lop_3/tutor/teacher_avatar.dart';
import 'package:toan_lop_3/tutor/teacher_controller.dart';
import 'package:toan_lop_3/tutor/tutor_audio_service.dart';
import 'package:toan_lop_3/tutor/voice_library.dart';
import 'package:toan_lop_3/ui/app_theme.dart';
import 'package:toan_lop_3/ui/quiz_screen.dart';

import 'helpers.dart';

/// Giọng giả: "đọc được" (để thử khớp khẩu hình mà không cần loa).
class AudibleVoice implements TutorVoice {
  final spoken = <String>[];
  @override
  bool? get hasVietnamese => true;
  @override
  Future<bool> speak(String text) async {
    spoken.add(text);
    return true;
  }

  @override
  Future<void> stop() async {}
}

void main() {
  group('Thư viện giọng 11max', () {
    test('tra câu không phân biệt khoảng trắng / dạng Unicode, đọc thời lượng', () {
      final lib = VoiceLibrary.fromJson({
        'lines': {
          'Xuất sắc!': {'file': 'assets/voice/xuat-sac.mp3', 'ms': 900},
        },
      });
      expect(lib.lookup('  Xuất   sắc! ')!.durationMs, 900);
      expect(lib.lookup('Xuất sắc!'), isNotNull, reason: 'dạng tổ hợp (NFD) vẫn khớp');
      expect(lib.lookup('Giỏi quá!'), isNull);
      final audio = TutorAudioService(library: lib, fallback: SilentTutorVoice());
      expect(audio.durationOf(['Xuất sắc!']).inMilliseconds, 900);
      expect(audio.durationOf(['Giỏi quá!']), TutorAudioService.estimate('Giỏi quá!'));
    });
  });

  group('Khớp khẩu hình + gõ chữ', () {
    testWidgets('đang phát tiếng: miệng đổi mỗi 150 ms; xong: ngậm miệng, hiện đủ chữ, về mỉm cười', (tester) async {
      final voice = AudibleVoice();
      final c = TeacherController(
        audio: TutorAudioService(library: VoiceLibrary(const {}), fallback: voice),
      );
      addTearDown(c.dispose);
      const line = 'Chưa chính xác rồi, con thử tính cột hàng đơn vị trước xem sao?';
      c.say(const [line], mood: TeacherMood.think, holdMood: const Duration(milliseconds: 500));
      expect(c.visibleChars, 0);
      expect(c.mood, TeacherMood.think);
      final states = <bool>[];
      for (var i = 0; i < 8; i++) {
        await tester.pump(const Duration(milliseconds: 150));
        states.add(c.mouthOpen);
      }
      expect(states.where((o) => o).length, greaterThanOrEqualTo(3));
      expect(states.where((o) => !o).length, greaterThanOrEqualTo(3));
      // Chữ chạy dần theo thời lượng giọng, chưa hiện hết.
      expect(c.visibleChars, greaterThan(0));
      expect(c.visibleChars, lessThan(line.length));
      await tester.pump(TutorAudioService.estimate(line));
      expect(c.speaking, isFalse);
      expect(c.mouthOpen, isFalse);
      expect(c.visibleChars, line.length);
      await tester.pump(const Duration(milliseconds: 600));
      expect(c.mood, TeacherMood.idle);
      expect(voice.spoken, [line]);
    });

    testWidgets('tắt giọng: không cử động miệng, chữ chạy nhanh; bấm loa thì vẫn đọc', (tester) async {
      final voice = AudibleVoice();
      final c = TeacherController(
        audio: TutorAudioService(library: VoiceLibrary(const {}), fallback: voice),
        voiceEnabled: false,
      );
      addTearDown(c.dispose);
      c.say(const [TutorLines.greeting]);
      await tester.pump(const Duration(milliseconds: 600));
      expect(c.mouthOpen, isFalse);
      expect(voice.spoken, isEmpty);
      await tester.pump(const Duration(seconds: 3));
      expect(c.visibleChars, TutorLines.greeting.length);
      c.replay();
      await tester.pump(const Duration(milliseconds: 10));
      expect(voice.spoken, [spokenVietnamese(TutorLines.greeting)]);
      await tester.pump(const Duration(seconds: 8));
    });

    testWidgets('chạm khung thoại: hiện hết chữ ngay', (tester) async {
      final c = TeacherController(
        audio: TutorAudioService(library: VoiceLibrary(const {}), fallback: SilentTutorVoice()),
      );
      addTearDown(c.dispose);
      c.say(const [TutorLines.greeting]);
      await tester.pump(const Duration(milliseconds: 100));
      c.skipTyping();
      expect(c.visibleChars, TutorLines.greeting.length);
      await tester.pump(const Duration(seconds: 8));
    });
  });

  group('Ảnh cô giáo', () {
    testWidgets('có ảnh Kie.ai thì dùng ảnh đúng khung; thiếu thì vẽ bằng code', (tester) async {
      final assets = TeacherAssets({
        'assets/tutor/teacher_idle.png',
        'assets/tutor/teacher_talk.png',
        'assets/tutor/teacher_think.png',
      });
      String? shown() {
        final imgs = tester.widgetList<Image>(find.byType(Image));
        return imgs.isEmpty ? null : (imgs.first.image as AssetImage).assetName;
      }

      Future<void> show(TeacherMood m, bool open) => tester.pumpWidget(
        MaterialApp(
          home: TeacherAvatar(assets: assets, mood: m, mouthOpen: open),
        ),
      );
      await show(TeacherMood.idle, false);
      expect(shown(), 'assets/tutor/teacher_idle.png');
      await show(TeacherMood.idle, true);
      expect(shown(), 'assets/tutor/teacher_talk.png');
      await show(TeacherMood.think, true);
      expect(shown(), 'assets/tutor/teacher_think.png', reason: 'thiếu think_talk → giữ ảnh suy nghĩ');
      await show(TeacherMood.clap, false);
      expect(shown(), 'assets/tutor/teacher_idle.png', reason: 'thiếu ảnh vỗ tay → ảnh đứng yên');

      await tester.pumpWidget(MaterialApp(home: TeacherAvatar(assets: TeacherAssets(const {}))));
      expect(find.byType(Image), findsNothing);
      expect(find.byType(CustomPaint), findsWidgets);
    });

    testWidgets('nhịp thở: cô nhô lên / hạ xuống nhẹ theo thời gian', (tester) async {
      TeacherAvatar.motionEnabled = true;
      addTearDown(() => TeacherAvatar.motionEnabled = false);
      await tester.pumpWidget(
        MaterialApp(
          home: Center(child: TeacherAvatar(assets: TeacherAssets(const {}))),
        ),
      );
      double dy() => tester
          .widget<Transform>(find.descendant(of: find.byType(TeacherAvatar), matching: find.byType(Transform)).first)
          .transform
          .getTranslation()
          .y;
      final a = dy();
      await tester.pump(const Duration(milliseconds: 1600));
      final b = dy();
      expect(b, lessThan(a), reason: 'đã nhô lên');
      expect(b, greaterThanOrEqualTo(-2.01));
      await tester.pumpWidget(const SizedBox());
    });

    test('tên file khung hình đúng quy ước', () {
      expect(TeacherPose.values.map((p) => 'teacher_${p.fileStem}.png'), [
        'teacher_idle.png',
        'teacher_blink.png',
        'teacher_talk.png',
        'teacher_think.png',
        'teacher_think_talk.png',
        'teacher_clap.png',
        'teacher_clap_talk.png',
      ]);
    });
  });

  group('Trong bài luyện tập', () {
    final lesson = loadLessonFromDisk('kntt3.c4.nhan-2cs-1cs');

    Future<void> pumpQuiz(WidgetTester tester, TutorVoice voice, {bool readAloud = false}) async {
      tester.view.physicalSize = const Size(1080, 2340);
      tester.view.devicePixelRatio = 2.5;
      addTearDown(tester.view.reset);
      await tester.pumpWidget(
        MaterialApp(
          theme: buildAppTheme(),
          home: QuizScreen(
            lesson: lesson,
            sound: const SilentSoundService(),
            random: Random(7),
            voice: voice,
            readAloud: readAloud,
          ),
        ),
      );
      await tester.pump();
    }

    TeacherAvatar avatar(WidgetTester tester) =>
        tester.widget<TeacherAvatar>(find.byKey(const ValueKey('teacher-avatar')));

    testWidgets('làm đúng: cô vỗ tay, khen, tiền vàng bay lên', (tester) async {
      final voice = AudibleVoice();
      await pumpQuiz(tester, voice);
      await tester.tap(find.byKey(const ValueKey('numpad-6')));
      await tester.tap(find.byKey(const ValueKey('numpad-3')));
      await tester.pump();
      final before = tester.widget<RewardBurst>(find.byType(RewardBurst)).trigger;
      await tester.tap(find.byKey(const ValueKey('btn-check')));
      await tester.pump();
      expect(avatar(tester).mood, TeacherMood.clap);
      expect(tester.widget<RewardBurst>(find.byType(RewardBurst)).trigger, before + 1);
      expect(voice.spoken.single, isIn([...TutorLines.praise, ...TutorLines.praiseFast]));
      await tester.pump(const Duration(seconds: 6));
    });

    testWidgets('làm sai bài đặt tính: cô suy nghĩ, nói đúng câu gợi ý, cột đơn vị nháy sáng', (tester) async {
      final voice = AudibleVoice();
      await pumpQuiz(tester, voice);
      await tester.tap(find.byKey(const ValueKey('numpad-3')));
      await tester.tap(find.byKey(const ValueKey('numpad-6')));
      await tester.tap(find.byKey(const ValueKey('btn-check')));
      await tester.pump();
      expect(avatar(tester).mood, TeacherMood.think);
      expect(voice.spoken, [TutorLines.wrongColumn]);
      expect(find.byKey(const ValueKey('column-hint')), findsOneWidget);
      expect(find.text('?'), findsWidgets, reason: 'ô kết quả hàng đơn vị chờ bé tính');
      await tester.pump(const Duration(seconds: 6));
    });

    testWidgets('bé ngồi im 25 giây: cô hỏi có cần gợi ý không', (tester) async {
      final voice = AudibleVoice();
      await pumpQuiz(tester, voice);
      await tester.pump(const Duration(seconds: 24));
      expect(voice.spoken, isEmpty);
      await tester.pump(const Duration(seconds: 2));
      expect(voice.spoken, hasLength(1));
      expect(TutorLines.idleNudge, contains(voice.spoken.single));
      await tester.pump(const Duration(seconds: 6));
    });

    testWidgets('câu mới hiện ra: cô tự đọc đề (số đọc thành chữ), không cần bấm loa', (tester) async {
      final voice = AudibleVoice();
      await pumpQuiz(tester, voice, readAloud: true);
      await tester.pump(const Duration(seconds: 3));
      expect(voice.spoken, ['Tính.', 'hai mươi mốt nhân ba bằng bao nhiêu?']);
      // Cô đọc xong mới bắt đầu tính thời gian bé ngồi im.
      await tester.pump(const Duration(seconds: 20));
      expect(voice.spoken, hasLength(2));
      await tester.pump(const Duration(seconds: 12));
      expect(voice.spoken, hasLength(3));
      expect(TutorLines.idleNudge, contains(voice.spoken.last));
      await tester.pump(const Duration(seconds: 6));
    });

    testWidgets('điền xong mà chưa bấm Kiểm tra 8 giây: cô nhắc bấm Kiểm tra', (tester) async {
      final voice = AudibleVoice();
      await pumpQuiz(tester, voice);
      await tester.tap(find.byKey(const ValueKey('numpad-6')));
      await tester.pump(const Duration(seconds: 9));
      expect(voice.spoken, [TutorLines.pressCheck]);
      await tester.pump(const Duration(seconds: 6));
    });
  });
}
