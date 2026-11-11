import 'dart:async';
import 'dart:ui' as ui;

import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';

import 'frame_converter.dart';
import 'timelapse_composer.dart';
import 'video_encoder.dart';

/// A finished time-lapse video.
@immutable
class TimelapseResult {
  const TimelapseResult({required this.path, required this.frameCount, required this.recorded});

  final String path;
  final int frameCount;

  /// Real time spent drawing.
  final Duration recorded;
}

/// Records the drawing session as a time-lapse: grabs one camera frame every
/// [captureInterval], draws the overlay on it exactly as on screen and feeds
/// it to a [VideoEncoder]. With the defaults, 1 minute of drawing becomes
/// 2 seconds of video (30x faster).
class TimelapseRecorder extends ChangeNotifier {
  TimelapseRecorder({
    required this.encoder,
    required this.outputPath,
    this.captureInterval = const Duration(seconds: 2),
    this.fps = 15,
  });

  final VideoEncoder encoder;
  final Future<String> Function() outputPath;
  final Duration captureInterval;
  final int fps;

  CameraController? _controller;
  TimelapseScene Function()? _scene;
  int _sensorOrientation = 90;
  String? _path;
  Size? _videoSize;
  bool _busy = false;
  Future<void>? _inFlight;
  DateTime? _lastCapture;
  final Stopwatch _clock = Stopwatch();
  int _frames = 0;
  Object? _error;

  bool get isRecording => _controller != null;
  int get frameCount => _frames;
  Duration get elapsed => _clock.elapsed;

  /// Last error while capturing/encoding (recording keeps going if it can).
  Object? get error => _error;

  /// Starts listening to the camera's image stream.
  Future<void> start(
    CameraController controller, {
    required TimelapseScene Function() scene,
  }) async {
    if (isRecording) return;
    _controller = controller;
    _scene = scene;
    _sensorOrientation = controller.description.sensorOrientation;
    _frames = 0;
    _error = null;
    _path = null;
    _videoSize = null;
    _lastCapture = null;
    _clock
      ..reset()
      ..start();
    notifyListeners();
    await controller.startImageStream(_onImage);
  }

  void _onImage(CameraImage image) {
    final DateTime now = DateTime.now();
    if (_busy || !isRecording) return;
    final DateTime? last = _lastCapture;
    if (last != null && now.difference(last) < captureInterval) return;
    _lastCapture = now;
    _busy = true;
    // Copy the plane data now: the camera reuses its buffers.
    final RawFrame frame = rawFrameFrom(image);
    _inFlight = _process(frame).whenComplete(() => _busy = false);
  }

  Future<void> _process(RawFrame frame) async {
    try {
      final int turns = uprightQuarterTurns(
        width: frame.width,
        height: frame.height,
        sensorOrientation: _sensorOrientation,
      );
      final RgbaFrame rgba = await compute(convertFrame, ConvertRequest(frame, turns));
      if (!isRecording) return;
      final TimelapseScene scene = _scene!();
      final Size video = _videoSize ??= videoSizeFor(scene.screenSize);
      if (_path == null) {
        final String path = await outputPath();
        await encoder.start(
          width: video.width.round(),
          height: video.height.round(),
          fps: fps,
          path: path,
        );
        _path = path;
      }
      final ui.Image camera = await imageFromRgba(rgba.pixels, rgba.width, rgba.height);
      try {
        await encoder.addFrame(await composeFrame(camera: camera, scene: scene, output: video));
      } finally {
        camera.dispose();
      }
      _frames++;
      notifyListeners();
    } on Object catch (e, s) {
      _error = e;
      debugPrint('Time-lapse frame failed: $e\n$s');
    }
  }

  /// Stops recording. Returns the video, or null if no frame was captured.
  Future<TimelapseResult?> stop() async {
    final CameraController? controller = _controller;
    if (controller == null) return null;
    _controller = null;
    _clock.stop();
    try {
      if (controller.value.isStreamingImages) await controller.stopImageStream();
    } on Object catch (e) {
      debugPrint('stopImageStream failed: $e');
    }
    await _inFlight;
    notifyListeners();
    final String? path = _path;
    if (path == null) return null;
    await encoder.finish();
    if (_frames == 0) return null;
    return TimelapseResult(path: path, frameCount: _frames, recorded: _clock.elapsed);
  }
}

/// Copies a [CameraImage] into plain data for the converter isolate.
RawFrame rawFrameFrom(CameraImage image) {
  final RawFrameFormat format = image.format.group == ImageFormatGroup.bgra8888
      ? RawFrameFormat.bgra8888
      : RawFrameFormat.yuv420;
  return RawFrame(
    width: image.width,
    height: image.height,
    format: format,
    planes: <RawPlane>[
      for (final Plane p in image.planes)
        RawPlane(bytes: p.bytes, bytesPerRow: p.bytesPerRow, bytesPerPixel: p.bytesPerPixel ?? 1),
    ],
  );
}
