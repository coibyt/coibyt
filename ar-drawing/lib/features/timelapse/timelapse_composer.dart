import 'dart:async';
import 'dart:typed_data';
import 'dart:ui' as ui;

import 'package:flutter/painting.dart';

import '../workspace/overlay_transform.dart';
import '../workspace/widgets/trace_overlay.dart';

/// Everything needed to draw one time-lapse frame the way the screen looks.
class TimelapseScene {
  const TimelapseScene({
    required this.screenSize,
    required this.overlay,
    required this.transform,
    required this.opacity,
  });

  /// Logical size of the workspace on screen.
  final Size screenSize;
  final ui.Image overlay;
  final OverlayTransform transform;
  final double opacity;
}

/// Video size for a screen: [height] pixels tall, same shape as the screen,
/// width rounded to a multiple of 16 (what hardware H.264 encoders like).
Size videoSizeFor(Size screen, {int height = 1280}) {
  final double raw = height * screen.width / screen.height;
  final int width = ((raw / 16).round() * 16).clamp(16, 4096);
  return Size(width.toDouble(), height.toDouble());
}

/// Draws [camera] (cover-fit) and the overlay (same geometry as
/// `TraceOverlay`) into an [output]-sized picture and returns raw RGBA.
Future<Uint8List> composeFrame({
  required ui.Image camera,
  required TimelapseScene scene,
  required Size output,
}) async {
  final ui.PictureRecorder recorder = ui.PictureRecorder();
  final Canvas canvas = Canvas(recorder);
  final Size screen = scene.screenSize;

  // Map screen coordinates onto the video: same scale on both axes, centred.
  final double k = output.height / screen.height;
  canvas
    ..translate((output.width - screen.width * k) / 2, 0)
    ..scale(k);
  final Rect screenRect = Offset.zero & screen;

  final Size camSize = Size(camera.width.toDouble(), camera.height.toDouble());
  final FittedSizes camFit = applyBoxFit(BoxFit.cover, camSize, screen);
  final Rect camSrc = Alignment.center.inscribe(camFit.source, Offset.zero & camSize);
  final Paint smooth = Paint()..filterQuality = FilterQuality.medium;
  canvas.drawImageRect(camera, camSrc, screenRect, smooth);

  final Rect box = kOverlayPadding.deflateRect(screenRect);
  final Size ovSize = Size(scene.overlay.width.toDouble(), scene.overlay.height.toDouble());
  final FittedSizes ovFit = applyBoxFit(BoxFit.contain, ovSize, box.size);
  final Rect ovDst = Alignment.center.inscribe(ovFit.destination, box);
  canvas.save();
  scene.transform.applyToCanvas(canvas, screenRect.center);
  canvas.drawImageRect(
    scene.overlay,
    Offset.zero & ovSize,
    ovDst,
    Paint()
      ..filterQuality = FilterQuality.medium
      ..color = Color.fromRGBO(0, 0, 0, scene.opacity.clamp(0.0, 1.0)),
  );
  canvas.restore();

  final ui.Picture picture = recorder.endRecording();
  final ui.Image frame = await picture.toImage(output.width.round(), output.height.round());
  picture.dispose();
  final ByteData? data = await frame.toByteData(format: ui.ImageByteFormat.rawRgba);
  frame.dispose();
  return data!.buffer.asUint8List();
}

/// Decodes raw RGBA pixels into a [ui.Image].
Future<ui.Image> imageFromRgba(Uint8List pixels, int width, int height) {
  final Completer<ui.Image> done = Completer<ui.Image>();
  ui.decodeImageFromPixels(pixels, width, height, ui.PixelFormat.rgba8888, done.complete);
  return done.future;
}

/// Resolves any [ImageProvider] (asset, memory, ...) to a [ui.Image].
Future<ui.Image> resolveImage(ImageProvider provider) {
  final Completer<ui.Image> done = Completer<ui.Image>();
  final ImageStream stream = provider.resolve(ImageConfiguration.empty);
  late final ImageStreamListener listener;
  listener = ImageStreamListener(
    (ImageInfo info, bool _) {
      stream.removeListener(listener);
      done.complete(info.image.clone());
      info.dispose();
    },
    onError: (Object error, StackTrace? stack) {
      stream.removeListener(listener);
      done.completeError(error, stack);
    },
  );
  stream.addListener(listener);
  return done.future;
}
