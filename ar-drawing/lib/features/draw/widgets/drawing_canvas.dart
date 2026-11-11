import 'dart:ui' as ui;

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import '../drawing_controller.dart';
import '../stroke.dart';

/// The drawing layer: turns finger / stylus / mouse input into strokes and
/// paints them.
///
/// - Finished strokes are cached in one bitmap (updated incrementally when a
///   stroke is added), so long drawings stay smooth; only the stroke being
///   drawn is painted live.
/// - Stylus pressure changes the line width. Once a stylus has been used,
///   finger touches are ignored (palm rejection), and the stylus' eraser end
///   erases.
/// - A second finger cancels the line in progress (pinching is not drawing).
/// - Everything is painted in its own layer, so the eraser removes only the
///   user's strokes and never the template underneath.
class DrawingCanvas extends StatefulWidget {
  const DrawingCanvas({super.key, required this.controller});

  final DrawingController controller;

  @override
  State<DrawingCanvas> createState() => DrawingCanvasState();
}

class DrawingCanvasState extends State<DrawingCanvas> {
  ui.Image? _cache;
  int _cacheRevision = -1;
  Size _cacheSize = Size.zero;
  double _cacheRatio = 1;

  Size _size = Size.zero;
  final Set<int> _pointers = <int>{};
  int? _drawingPointer;
  bool _stylusSeen = false;

  DrawingController get _c => widget.controller;

  @override
  void initState() {
    super.initState();
    _c.addListener(_onChanged);
  }

  @override
  void didUpdateWidget(DrawingCanvas oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.controller != widget.controller) {
      oldWidget.controller.removeListener(_onChanged);
      widget.controller.addListener(_onChanged);
      _invalidate();
    }
  }

  @override
  void dispose() {
    _c.removeListener(_onChanged);
    _cache?.dispose();
    super.dispose();
  }

  void _invalidate() {
    _cache?.dispose();
    _cache = null;
    _cacheRevision = -1;
  }

  void _onChanged() {
    // A finished stroke moves from "live" into the cached bitmap: rebuild
    // right away so it never blinks.
    if (_c.revision != _cacheRevision && mounted) setState(_updateCache);
  }

  /// Keeps [_cache] equal to all finished strokes.
  void _updateCache() {
    if (_size.isEmpty) return;
    final double ratio = MediaQuery.maybeDevicePixelRatioOf(context) ?? 1;
    final bool sameGeometry = _cacheSize == _size && _cacheRatio == ratio;
    final ui.PictureRecorder recorder = ui.PictureRecorder();
    final Canvas canvas = Canvas(recorder)..scale(ratio);
    final ui.Image? old = _cache;
    if (old != null &&
        sameGeometry &&
        _c.lastChangeWasAppend &&
        _c.revision == _cacheRevision + 1) {
      // Fast path: old bitmap + the one new stroke.
      canvas.drawImageRect(
        old,
        Offset.zero & Size(old.width.toDouble(), old.height.toDouble()),
        Offset.zero & _size,
        Paint(),
      );
      paintStroke(canvas, _c.strokes.last, _size.width);
    } else {
      for (final Stroke s in _c.strokes) {
        paintStroke(canvas, s, _size.width);
      }
    }
    final ui.Picture picture = recorder.endRecording();
    _cache = picture.toImageSync(
      (_size.width * ratio).ceil().clamp(1, 16384),
      (_size.height * ratio).ceil().clamp(1, 16384),
    );
    picture.dispose();
    old?.dispose();
    _cacheRevision = _c.revision;
    _cacheSize = _size;
    _cacheRatio = ratio;
  }

  // ---------------------------------------------------------------- input

  bool _isStylus(PointerEvent e) =>
      e.kind == PointerDeviceKind.stylus || e.kind == PointerDeviceKind.invertedStylus;

  double _pressure(PointerEvent e) {
    if (!_isStylus(e)) return 1;
    final double range = e.pressureMax - e.pressureMin;
    if (range <= 0) return 1;
    return ((e.pressure - e.pressureMin) / range).clamp(0.0, 1.0);
  }

  void _onDown(PointerDownEvent e) {
    if (_isStylus(e)) _stylusSeen = true;
    if (_stylusSeen && e.kind == PointerDeviceKind.touch) return; // palm
    if (e.kind == PointerDeviceKind.mouse && e.buttons != kPrimaryMouseButton) return;
    _pointers.add(e.pointer);
    if (_pointers.length > 1) {
      // Two fingers are not a drawing gesture.
      _c.cancel();
      _drawingPointer = null;
      return;
    }
    _drawingPointer = e.pointer;
    _c.begin(
      e.localPosition,
      _size.width,
      pressure: _pressure(e),
      toolOverride: e.kind == PointerDeviceKind.invertedStylus ? DrawTool.eraser : null,
    );
  }

  void _onMove(PointerMoveEvent e) {
    if (e.pointer != _drawingPointer) return;
    _c.extend(e.localPosition, pressure: _pressure(e));
  }

  void _onUp(PointerUpEvent e) {
    _pointers.remove(e.pointer);
    if (e.pointer != _drawingPointer) return;
    _drawingPointer = null;
    _c.end();
  }

  void _onCancel(PointerCancelEvent e) {
    _pointers.remove(e.pointer);
    if (e.pointer != _drawingPointer) return;
    _drawingPointer = null;
    _c.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        final Size size = constraints.biggest;
        if (size != _size) {
          _size = size;
          _invalidate();
          _updateCache();
        } else if (_cache == null || _cacheRevision != _c.revision) {
          _updateCache();
        }
        return Listener(
          key: const Key('drawingCanvas'),
          behavior: HitTestBehavior.opaque,
          onPointerDown: _onDown,
          onPointerMove: _onMove,
          onPointerUp: _onUp,
          onPointerCancel: _onCancel,
          child: CustomPaint(
            size: size,
            painter: _DrawingPainter(controller: _c, cache: _cache),
            isComplex: true,
          ),
        );
      },
    );
  }
}

class _DrawingPainter extends CustomPainter {
  _DrawingPainter({required this.controller, required this.cache}) : super(repaint: controller);

  final DrawingController controller;
  final ui.Image? cache;

  @override
  void paint(Canvas canvas, Size size) {
    // Own layer: the eraser's BlendMode.clear only clears the user's ink.
    canvas.saveLayer(Offset.zero & size, Paint());
    final ui.Image? image = cache;
    if (image != null) {
      canvas.drawImageRect(
        image,
        Offset.zero & Size(image.width.toDouble(), image.height.toDouble()),
        Offset.zero & size,
        Paint()..filterQuality = FilterQuality.medium,
      );
    } else {
      for (final Stroke s in controller.strokes) {
        paintStroke(canvas, s, size.width);
      }
    }
    final Stroke? live = controller.liveStroke;
    if (live != null) paintStroke(canvas, live, size.width);
    canvas.restore();
  }

  @override
  bool shouldRepaint(_DrawingPainter old) => old.cache != cache || old.controller != controller;
}
