import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/draw/drawing_controller.dart';
import 'package:tracelight/features/teacher/hint_coach.dart';
import 'package:tracelight/features/teacher/teacher_controller.dart';

void main() {
  group('colour hints', () {
    const List<Color> model = <Color>[Color(0xFFE53935), Color(0xFF43A047), Color(0xFF8D6E63)];
    test('close colours need no hint', () {
      expect(HintCoach.colorHint(const Color(0xFFE23A34), model), isNull);
      expect(HintCoach.colorHint(const Color(0xFF43A047), model), isNull);
    });
    test('too dark, too light and wrong hue are told apart', () {
      expect(HintCoach.colorHint(const Color(0xFF4E342E), model), 'hint_color_dark');
      expect(HintCoach.colorHint(const Color(0xFFD7CCC8), model), 'hint_color_light');
      expect(HintCoach.colorHint(const Color(0xFF3F51B5), model), isNotNull);
    });
    test('no model colours → no hint', () {
      expect(HintCoach.colorHint(Colors.blue, const <Color>[]), isNull);
    });
  });

  group('proportion hints', () {
    late DrawingController drawing;
    late TeacherController teacher;
    DateTime now = DateTime(2026);

    setUp(() {
      drawing = DrawingController();
      teacher = TeacherController();
      now = DateTime(2026);
    });
    tearDown(() {
      drawing.dispose();
      teacher.dispose();
    });

    /// Draws [n] horizontal strokes filling a [w]×[h] box (canvas 400 wide).
    void box(double w, double h, {int n = 8}) {
      for (int i = 0; i < n; i++) {
        final double y = 20 + h * i / (n - 1);
        drawing.begin(Offset(20, y), 400);
        drawing.extend(Offset(20 + w / 2, y));
        drawing.extend(Offset(20 + w, y));
        drawing.end();
      }
    }

    test('a much wider drawing than the model gets one gentle hint', () {
      final HintCoach coach = HintCoach(
        drawing: drawing,
        teacher: teacher,
        modelAspect: 1,
        now: () => now,
      );
      box(300, 100);
      expect(coach.proportionHint(), 'hint_proportion_wide');
      expect(coach.given['hint_proportion_wide'], 1);
      // Cooldown: no repeat right away.
      box(300, 100);
      expect(coach.given['hint_proportion_wide'], 1);
      coach.dispose();
    });

    test('a tall drawing for a wide model', () {
      final HintCoach coach = HintCoach(drawing: drawing, teacher: teacher, modelAspect: 2);
      box(100, 200);
      expect(coach.proportionHint(), 'hint_proportion_tall');
      coach.dispose();
    });

    test('right proportions or too few strokes → silent', () {
      final HintCoach coach = HintCoach(drawing: drawing, teacher: teacher, modelAspect: 1.5);
      box(150, 100, n: 3);
      expect(coach.proportionHint(), isNull, reason: 'too few strokes');
      box(150, 100);
      expect(coach.proportionHint(), isNull);
      expect(coach.given, isEmpty);
      coach.dispose();
    });
  });
}
