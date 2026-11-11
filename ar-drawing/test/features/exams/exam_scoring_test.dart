import 'dart:io';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:image/image.dart' as img;
import 'package:tracelight/features/exams/exam.dart';
import 'package:tracelight/features/exams/exam_scoring.dart';

const int canvasW = 360, canvasH = 560;

Uint8List png(String path) => File(path).readAsBytesSync();

/// Puts [picture] on a transparent canvas at ([x], [y]) with size ([w], [h]).
img.Image place(img.Image picture, int x, int y, int w, int h) {
  final img.Image canvas = img.Image(width: canvasW, height: canvasH, numChannels: 4);
  final img.Image scaled = img.copyResize(picture.convert(numChannels: 4), width: w, height: h);
  img.compositeImage(canvas, scaled, dstX: x, dstY: y);
  return canvas;
}

ExamScore grade(
  Exam exam,
  img.Image student, {
  List<double>? sheet,
  int strokes = 12,
  int sizes = 2,
}) {
  return gradeExam(
    ScoreRequest(
      task: exam.task,
      weights: exam.weights,
      student: student.getBytes(order: img.ChannelOrder.rgba),
      studentWidth: student.width,
      studentHeight: student.height,
      outlinePng: png(exam.outlineAsset),
      modelPng: png(exam.modelAsset),
      sheetRect: sheet,
      strokeCount: strokes,
      distinctSizes: sizes,
    ),
  );
}

void main() {
  final List<Exam> exams = ExamCatalog.parse(File(ExamCatalog.asset).readAsStringSync()).exams;
  Exam byId(String id) => exams.firstWhere((Exam e) => e.id == id);

  test('catalog: all exam types, weights add up to 1, assets exist', () {
    expect(exams.map((Exam e) => e.type).toSet(), ExamType.values.toSet());
    for (final Exam e in exams) {
      expect(
        e.weights.values.reduce((double a, double b) => a + b),
        closeTo(1, 1e-9),
        reason: e.id,
      );
      expect(File(e.modelAsset).existsSync(), isTrue);
      expect(File(e.outlineAsset).existsSync(), isTrue);
      expect(e.weights.containsKey(Criterion.color), e.task.gradesColor, reason: e.id);
    }
    expect(byId('quick_cube').timeLimit, const Duration(minutes: 15));
    expect(byId('final_portrait').timeLimit, const Duration(minutes: 90));
  });

  group('sketch (proportion)', () {
    final Exam exam = byId('quick_apple');
    final img.Image outline = img.decodePng(png(exam.outlineAsset))!;
    final double ar = outline.width / outline.height;

    test('a faithful copy scores high wherever and however big it is drawn', () {
      final ExamScore big = grade(exam, place(outline, 10, 40, 340, (340 / ar).round()));
      final ExamScore small = grade(exam, place(outline, 150, 300, 160, (160 / ar).round()));
      expect(big.criteria[Criterion.proportion], greaterThan(0.85));
      expect(small.criteria[Criterion.proportion], greaterThan(0.8));
      expect(big.criteria.containsKey(Criterion.color), isFalse);
    });

    test('a stretched copy loses proportion marks', () {
      final double good = grade(
        exam,
        place(outline, 10, 40, 300, (300 / ar).round()),
      ).criteria[Criterion.proportion]!;
      final double stretched = grade(
        exam,
        place(outline, 0, 100, 360, (180 / ar).round()),
      ).criteria[Criterion.proportion]!;
      expect(stretched, lessThan(good - 0.15));
    });

    test('random scribbles score low', () {
      final img.Image scribble = img.Image(width: canvasW, height: canvasH, numChannels: 4);
      final math.Random rnd = math.Random(7);
      for (int i = 0; i < 25; i++) {
        img.drawLine(
          scribble,
          x1: rnd.nextInt(canvasW),
          y1: rnd.nextInt(canvasH),
          x2: rnd.nextInt(canvasW),
          y2: rnd.nextInt(canvasH),
          color: img.ColorRgba8(30, 30, 30, 255),
          thickness: 3,
        );
      }
      final ExamScore s = grade(exam, scribble);
      expect(s.criteria[Criterion.proportion], lessThan(0.45));
      expect(s.passed, isFalse);
    });

    test('an empty sheet gets 0', () {
      final ExamScore s = grade(exam, img.Image(width: canvasW, height: canvasH, numChannels: 4));
      expect(s.total, 0);
      expect(s.gradeKey, 'exam.grade.fail');
    });
  });

  group('colour and shading on a printed sheet', () {
    final Exam exam = byId('midterm_cylinder');
    final img.Image model = img.decodePng(png(exam.modelAsset))!;
    final double ar = model.width / model.height;
    final int w = 320, h = (320 / ar).round();
    final List<double> sheet = <double>[20 / canvasW, 60 / canvasH, w / canvasW, h / canvasH];

    test('the right colours and shading score high and pass', () {
      final ExamScore s = grade(exam, place(model, 20, 60, w, h), sheet: sheet);
      expect(s.criteria[Criterion.color], greaterThan(0.8));
      expect(s.criteria[Criterion.proportion], greaterThan(0.9), reason: 'neat colouring');
      expect(s.passed, isTrue);
    });

    test('wrong colours lose colour marks', () {
      final img.Image wrong = place(model, 20, 60, w, h);
      for (final img.Pixel p in wrong) {
        final num r = p.r;
        p
          ..r = p.b
          ..b = r; // blue mug becomes orange-ish
      }
      final ExamScore right = grade(exam, place(model, 20, 60, w, h), sheet: sheet);
      final ExamScore s = grade(exam, wrong, sheet: sheet);
      expect(s.criteria[Criterion.color]!, lessThan(right.criteria[Criterion.color]! - 0.3));
    });

    test('flat colour without shading scores lower than shaded colour', () {
      final img.Image flat = place(model, 20, 60, w, h);
      for (final img.Pixel p in flat) {
        if (p.a > 40) {
          p
            ..r = 150
            ..g = 216
            ..b = 240;
        }
      }
      final double shaded = grade(
        exam,
        place(model, 20, 60, w, h),
        sheet: sheet,
      ).details['shading']!;
      final double plain = grade(exam, flat, sheet: sheet).details['shading']!;
      expect(plain, lessThan(shaded));
    });
  });

  test('freehand drawing in colour: shape and colour both graded', () {
    final Exam exam = byId('period_vase');
    final img.Image model = img.decodePng(png(exam.modelAsset))!;
    final double ar = model.width / model.height;
    final ExamScore s = grade(exam, place(model, 40, 80, 260, (260 / ar).round()));
    expect(s.criteria[Criterion.proportion], greaterThan(0.75));
    expect(s.criteria[Criterion.color], greaterThan(0.75));
    expect(s.total, greaterThan(6.5));
  });
}
