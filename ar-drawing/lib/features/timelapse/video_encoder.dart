import 'dart:typed_data';

import 'package:flutter_quick_video_encoder/flutter_quick_video_encoder.dart';

/// Turns RGBA frames into an MP4 file. An interface so tests can use a fake.
abstract interface class VideoEncoder {
  Future<void> start({
    required int width,
    required int height,
    required int fps,
    required String path,
  });

  Future<void> addFrame(Uint8List rgba);

  /// Closes the file. After this the video at `path` is playable.
  Future<void> finish();
}

/// Hardware H.264 encoder (MediaCodec on Android, AVFoundation on iOS) via
/// `flutter_quick_video_encoder`. No FFmpeg, no audio track.
class HardwareVideoEncoder implements VideoEncoder {
  @override
  Future<void> start({
    required int width,
    required int height,
    required int fps,
    required String path,
  }) {
    return FlutterQuickVideoEncoder.setup(
      width: width,
      height: height,
      fps: fps,
      // ~0.15 bits per pixel: crisp pencil lines, small files.
      videoBitrate: (width * height * fps * 0.15).round().clamp(1000000, 8000000),
      profileLevel: ProfileLevel.any,
      audioChannels: 0,
      audioBitrate: 0,
      sampleRate: 0,
      filepath: path,
    );
  }

  @override
  Future<void> addFrame(Uint8List rgba) => FlutterQuickVideoEncoder.appendVideoFrame(rgba);

  @override
  Future<void> finish() => FlutterQuickVideoEncoder.finish();
}
