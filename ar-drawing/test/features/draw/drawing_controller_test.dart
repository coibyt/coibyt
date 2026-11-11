import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/painting.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/draw/drawing_controller.dart';
import 'package:tracelight/features/draw/stroke.dart';

void line(DrawingController c, Offset a, Offset b, {double width = 400}) {
  c.begin(a, width);
  for (int i = 1; i <= 10; i++) {
    c.extend(Offset.lerp(a, b, i / 10)!);
  }
  c.end();
}

Future<List<int>> pixel(DrawingController c, Size size, Offset at) async {
  final ui.Picture p = c.recordStrokes(size.width, size);
  final ui.Image img = await p.toImage(size.width.round(), size.height.round());
  final ByteData data = (await img.toByteData(format: ui.ImageByteFormat.rawRgba))!;
  final int i = (at.dy.round() * size.width.round() + at.dx.round()) * 4;
  return <int>[for (int k = 0; k < 4; k++) data.getUint8(i + k)];
}

void main() {
  test('a stroke is recorded relative to the canvas width', () {
    final DrawingController c = DrawingController();
    line(c, const Offset(40, 80), const Offset(360, 80));
    expect(c.strokes, hasLength(1));
    final Stroke s = c.strokes.single;
    expect(s.points.first.x, closeTo(0.1, 1e-9));
    expect(s.points.first.y, closeTo(0.2, 1e-9));
    expect(s.width, closeTo(6 / 400, 1e-9), reason: 'default brush 6 px');
    expect(c.isDrawing, isFalse);
  });

  test('undo / redo walk the history, a new stroke clears redo', () {
    final DrawingController c = DrawingController();
    line(c, Offset.zero, const Offset(100, 0));
    line(c, Offset.zero, const Offset(0, 100));
    c.undo();
    expect(c.strokes, hasLength(1));
    expect(c.canRedo, isTrue);
    c.redo();
    expect(c.strokes, hasLength(2));
    c.undo();
    line(c, Offset.zero, const Offset(50, 50));
    expect(c.canRedo, isFalse, reason: 'branching discards the redo history');
    expect(c.strokes, hasLength(2));
  });

  test('clear can be undone', () {
    final DrawingController c = DrawingController();
    line(c, Offset.zero, const Offset(100, 0));
    line(c, Offset.zero, const Offset(0, 100));
    c.clear();
    expect(c.isEmpty, isTrue);
    c.undo();
    expect(c.strokes, hasLength(2));
    c.redo();
    expect(c.isEmpty, isTrue);
  });

  test('colour picks switch back to the brush and are remembered', () {
    final DrawingController c = DrawingController()..tool = DrawTool.eraser;
    c.color = const Color(0xFFE53935);
    expect(c.tool, DrawTool.brush);
    c.color = const Color(0xFF1E88E5);
    expect(c.recentColors.first, const Color(0xFF1E88E5));
    expect(c.recentColors, hasLength(2));
  });

  test('brush and eraser keep their own sizes', () {
    final DrawingController c = DrawingController()..size = 20;
    c.tool = DrawTool.eraser;
    c.size = 50;
    expect(c.eraserSize, 50);
    c.tool = DrawTool.brush;
    expect(c.size, 20);
    c.size = 999;
    expect(c.size, DrawingController.maxSize);
  });

  test('a cancelled stroke leaves no trace', () {
    final DrawingController c = DrawingController();
    c.begin(Offset.zero, 100);
    c.extend(const Offset(50, 50));
    c.cancel();
    expect(c.isEmpty, isTrue);
    expect(c.canUndo, isFalse);
  });

  test('ink shows the brush colour and the eraser clears it', () async {
    final DrawingController c = DrawingController()
      ..color = const Color(0xFFE53935)
      ..size = 20;
    const Size size = Size(200, 100);
    line(c, const Offset(20, 50), const Offset(180, 50), width: 200);
    expect(await pixel(c, size, const Offset(100, 50)), <int>[0xE5, 0x39, 0x35, 255]);
    c.tool = DrawTool.eraser;
    c.size = 30;
    line(c, const Offset(100, 20), const Offset(100, 80), width: 200);
    expect((await pixel(c, size, const Offset(100, 50)))[3], 0, reason: 'erased to transparent');
    expect((await pixel(c, size, const Offset(40, 50)))[3], 255, reason: 'rest of the line stays');
  });

  test('stylus pressure changes the line width', () {
    expect(pressureFactor(1), 1);
    expect(pressureFactor(0), closeTo(0.35, 1e-9));
    expect(pressureFactor(0.5), greaterThan(pressureFactor(0.2)));
  });
}
