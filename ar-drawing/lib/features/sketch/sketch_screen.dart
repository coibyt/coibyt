import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';

import '../../core/i18n/language_controller.dart';
import '../draw/draw_mode_sheet.dart';
import '../draw/draw_screen.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import '../workspace/workspace_screen.dart';
import 'sketch_filter.dart';

/// Lets the user turn a picked photo into clean lines (or pencil / keep the
/// photo), preview it on "paper", then start tracing it.
class SketchScreen extends StatefulWidget {
  const SketchScreen({super.key, required this.photo, this.workspaceBuilder, this.drawBuilder});

  /// Encoded photo bytes as picked from the gallery.
  final Uint8List photo;

  /// Opens the workspace for the chosen picture (overridable in tests).
  final Widget Function(ImageProvider image)? workspaceBuilder;

  /// Opens the digital drawing board for the picture (overridable in tests).
  final Widget Function(ImageProvider? image)? drawBuilder;

  @override
  State<SketchScreen> createState() => _SketchScreenState();
}

class _SketchScreenState extends State<SketchScreen> {
  SketchStyle _style = SketchStyle.lineArt;
  double _detail = 0.5;
  Uint8List? _result;
  bool _busy = false;
  bool _failed = false;
  int _job = 0;
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    unawaited(_render());
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'sketch_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  Future<void> _render() async {
    final int job = ++_job;
    setState(() {
      _busy = true;
      _failed = false;
    });
    try {
      final Uint8List bytes = _style == SketchStyle.original
          ? widget.photo
          : await renderSketch(SketchRequest(bytes: widget.photo, style: _style, detail: _detail));
      if (!mounted || job != _job) return;
      setState(() {
        _result = bytes;
        _busy = false;
      });
    } on Object catch (e) {
      debugPrint('Sketch failed: $e');
      if (!mounted || job != _job) return;
      setState(() {
        _busy = false;
        _failed = true;
      });
    }
  }

  Future<void> _trace() async {
    final Uint8List? bytes = _result;
    if (bytes == null) return;
    _teacher.close();
    final DrawMode? mode = await showDrawModeSheet(context);
    if (mode == null || !mounted) return;
    final ImageProvider image = MemoryImage(bytes);
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => mode == DrawMode.camera
            ? widget.workspaceBuilder?.call(image) ?? WorkspaceScreen(overlayImage: image)
            : widget.drawBuilder?.call(image) ?? DrawScreen(template: image),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('sketch.title'))),
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    color: const Color(0xFFF7F3EA), // paper
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Stack(
                    fit: StackFit.expand,
                    children: <Widget>[
                      if (_result != null)
                        Padding(
                          padding: const EdgeInsets.all(12),
                          child: Image.memory(
                            _result!,
                            key: const Key('sketchPreview'),
                            fit: BoxFit.contain,
                            gaplessPlayback: true,
                          ),
                        ),
                      if (_failed)
                        Center(
                          child: Padding(
                            padding: EdgeInsets.all(24),
                            child: Text(
                              context.tr('sketch.imageUnreadable'),
                              textAlign: TextAlign.center,
                              style: TextStyle(color: Colors.black87),
                            ),
                          ),
                        ),
                      Positioned.fill(child: TeacherOverlay(controller: _teacher, bottom: 8)),
                      if (_busy)
                        ColoredBox(
                          color: Colors.white.withValues(alpha: 0.6),
                          child: Center(
                            child: Column(
                              mainAxisSize: MainAxisSize.min,
                              children: <Widget>[
                                CircularProgressIndicator(),
                                SizedBox(height: 12),
                                Text(
                                  context.tr('sketch.processing'),
                                  style: TextStyle(color: Colors.black87),
                                ),
                              ],
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: SegmentedButton<SketchStyle>(
                segments: <ButtonSegment<SketchStyle>>[
                  ButtonSegment<SketchStyle>(
                    value: SketchStyle.lineArt,
                    label: Text(context.tr('sketch.lineArt')),
                    icon: Icon(Icons.gesture),
                  ),
                  ButtonSegment<SketchStyle>(
                    value: SketchStyle.pencil,
                    label: Text(context.tr('sketch.pencil')),
                    icon: Icon(Icons.edit),
                  ),
                  ButtonSegment<SketchStyle>(
                    value: SketchStyle.original,
                    label: Text(context.tr('sketch.original')),
                    icon: Icon(Icons.photo),
                  ),
                ],
                selected: <SketchStyle>{_style},
                onSelectionChanged: (Set<SketchStyle> s) {
                  setState(() => _style = s.first);
                  unawaited(_render());
                },
              ),
            ),
            AnimatedOpacity(
              opacity: _style == SketchStyle.original ? 0.35 : 1,
              duration: const Duration(milliseconds: 200),
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 8, 20, 0),
                child: Row(
                  children: <Widget>[
                    Text(
                      context.tr('sketch.detail'),
                      style: TextStyle(color: colors.onSurfaceVariant),
                    ),
                    Expanded(
                      child: Slider(
                        key: const Key('detailSlider'),
                        value: _detail,
                        onChanged: _style == SketchStyle.original
                            ? null
                            : (double v) => setState(() => _detail = v),
                        // Re-render once the finger is lifted, not on every
                        // pixel of the drag.
                        onChangeEnd: (_) => unawaited(_render()),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
              child: SizedBox(
                width: double.infinity,
                height: 52,
                child: FilledButton.icon(
                  key: const Key('startTracing'),
                  onPressed: _result != null && !_busy ? _trace : null,
                  icon: const Icon(Icons.camera_alt),
                  label: Text(context.tr('sketch.startTracing')),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
