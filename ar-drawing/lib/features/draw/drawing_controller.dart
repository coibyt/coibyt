import 'dart:ui';

import 'package:flutter/foundation.dart';

import 'stroke.dart';

/// Something the user did that Undo can take back.
sealed class _Action {}

class _AddStroke extends _Action {
  _AddStroke(this.stroke);
  final Stroke stroke;
}

class _Clear extends _Action {
  _Clear(this.removed);
  final List<Stroke> removed;
}

/// State of the digital drawing board: tool, colour, sizes, the strokes on
/// the drawing layer and the Undo / Redo history.
///
/// History stores actions (a stroke added, the page cleared) rather than
/// pictures of the whole canvas, so it is tiny in memory and unlimited.
class DrawingController extends ChangeNotifier {
  DrawTool _tool = DrawTool.brush;

  /// Shop brush effect applied to new brush strokes.
  BrushEffect effect = BrushEffect.normal;
  Color _color = const Color(0xFF2A2433);
  double _brushSize = 6;
  double _eraserSize = 26;
  final List<Color> _recent = <Color>[];

  final List<Stroke> _strokes = <Stroke>[];
  final List<_Action> _undo = <_Action>[];
  final List<_Action> _redo = <_Action>[];
  Stroke? _live;
  double _liveCanvasWidth = 1;

  /// Bumped whenever the finished strokes change (not while drawing), so
  /// the canvas knows when to rebuild its cached picture.
  int _revision = 0;

  /// True when the last change only added one stroke on top (the cache can
  /// be updated by drawing just that stroke).
  bool _lastChangeWasAppend = false;

  DrawTool get tool => _tool;
  Color get color => _color;
  double get brushSize => _brushSize;
  double get eraserSize => _eraserSize;

  /// Size (logical pixels) of the current tool.
  double get size => _tool == DrawTool.eraser ? _eraserSize : _brushSize;
  List<Color> get recentColors => List<Color>.unmodifiable(_recent);
  List<Stroke> get strokes => List<Stroke>.unmodifiable(_strokes);
  Stroke? get liveStroke => _live;
  int get revision => _revision;
  bool get lastChangeWasAppend => _lastChangeWasAppend;
  bool get canUndo => _undo.isNotEmpty;
  bool get canRedo => _redo.isNotEmpty;
  bool get isEmpty => _strokes.isEmpty;
  bool get isDrawing => _live != null;

  static const double minSize = 1;
  static const double maxSize = 80;

  set tool(DrawTool value) {
    if (value == _tool) return;
    _tool = value;
    notifyListeners();
  }

  set size(double value) {
    final double v = value.clamp(minSize, maxSize);
    if (_tool == DrawTool.eraser) {
      _eraserSize = v;
    } else {
      _brushSize = v;
    }
    notifyListeners();
  }

  /// Picks a colour (and switches back to the brush, like real painting
  /// apps do).
  set color(Color value) {
    _color = value;
    _tool = DrawTool.brush;
    _recent
      ..remove(value)
      ..insert(0, value);
    if (_recent.length > 8) _recent.removeLast();
    notifyListeners();
  }

  // ---------------------------------------------------------------- input

  /// Starts a stroke at [position] (logical pixels) on a canvas
  /// [canvasWidth] wide.
  void begin(Offset position, double canvasWidth, {double pressure = 1, DrawTool? toolOverride}) {
    final DrawTool t = toolOverride ?? _tool;
    _liveCanvasWidth = canvasWidth;
    _live = Stroke(
      tool: t,
      effect: t == DrawTool.brush ? effect : BrushEffect.normal,
      color: _color,
      width: (t == DrawTool.eraser ? _eraserSize : _brushSize) / canvasWidth,
      points: <StrokePoint>[_point(position, pressure)],
    );
    notifyListeners();
  }

  void extend(Offset position, {double pressure = 1}) {
    final Stroke? live = _live;
    if (live == null) return;
    final StrokePoint p = _point(position, pressure);
    final StrokePoint last = live.points.last;
    // Skip samples closer than ~0.4 px: they add cost but no detail.
    final double dx = (p.x - last.x) * _liveCanvasWidth, dy = (p.y - last.y) * _liveCanvasWidth;
    if (dx * dx + dy * dy < 0.16) return;
    _live = live.withPoint(p);
    notifyListeners();
  }

  /// Finishes the stroke and records it in the history.
  void end() {
    final Stroke? live = _live;
    if (live == null) return;
    _live = null;
    _strokes.add(live);
    _undo.add(_AddStroke(live));
    _redo.clear();
    _changed(append: true);
  }

  /// Drops the stroke in progress (e.g. a second finger touched the screen).
  void cancel() {
    if (_live == null) return;
    _live = null;
    notifyListeners();
  }

  StrokePoint _point(Offset p, double pressure) =>
      StrokePoint(p.dx / _liveCanvasWidth, p.dy / _liveCanvasWidth, pressure);

  // -------------------------------------------------------------- history

  void undo() {
    if (_undo.isEmpty) return;
    final _Action action = _undo.removeLast();
    switch (action) {
      case _AddStroke():
        _strokes.removeLast();
      case _Clear(:final List<Stroke> removed):
        _strokes.addAll(removed);
    }
    _redo.add(action);
    _changed(append: false);
  }

  void redo() {
    if (_redo.isEmpty) return;
    final _Action action = _redo.removeLast();
    switch (action) {
      case _AddStroke(:final Stroke stroke):
        _strokes.add(stroke);
      case _Clear():
        _strokes.clear();
    }
    _undo.add(action);
    _changed(append: action is _AddStroke);
  }

  /// Empties the drawing layer (can be undone).
  void clear() {
    if (_strokes.isEmpty) return;
    _undo.add(_Clear(List<Stroke>.of(_strokes)));
    _strokes.clear();
    _redo.clear();
    _changed(append: false);
  }

  void _changed({required bool append}) {
    _lastChangeWasAppend = append;
    _revision++;
    notifyListeners();
  }

  /// Renders the drawing layer (transparent where nothing is drawn) to a
  /// [Picture] of [width] logical pixels — used by the canvas cache and,
  /// later, by export.
  Picture recordStrokes(double width, Size size, {Iterable<Stroke>? only}) {
    final PictureRecorder recorder = PictureRecorder();
    final Canvas canvas = Canvas(recorder, Offset.zero & size);
    for (final Stroke s in only ?? _strokes) {
      paintStroke(canvas, s, width);
    }
    return recorder.endRecording();
  }
}
