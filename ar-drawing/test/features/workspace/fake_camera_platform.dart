import 'dart:async';

import 'package:camera_platform_interface/camera_platform_interface.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

/// In-memory stand-in for the native camera so widget tests can drive the
/// workspace through "granted", "denied", "no camera" and "error" paths.
class FakeCameraPlatform extends CameraPlatform {
  FakeCameraPlatform({
    this.cameras = const <CameraDescription>[
      CameraDescription(
        name: 'back',
        lensDirection: CameraLensDirection.back,
        sensorOrientation: 90,
      ),
    ],
    this.initializeErrorCode,
  });

  final List<CameraDescription> cameras;

  /// When set, `createCamera` throws a CameraException with this code, the
  /// same way the real plugins report a denied permission.
  String? initializeErrorCode;

  int createCount = 0;
  int disposeCount = 0;
  final List<FlashMode> flashModes = <FlashMode>[];

  /// When true, `setFlashMode` throws like on a phone without a torch.
  bool torchUnsupported = false;

  /// Frames pushed by tests into the image stream.
  final StreamController<CameraImageData> frames = StreamController<CameraImageData>.broadcast();

  final StreamController<CameraErrorEvent> _errors = StreamController<CameraErrorEvent>.broadcast();

  @override
  Future<List<CameraDescription>> availableCameras() async => cameras;

  @override
  Stream<DeviceOrientationChangedEvent> onDeviceOrientationChanged() =>
      const Stream<DeviceOrientationChangedEvent>.empty();

  @override
  Future<int> createCameraWithSettings(
    CameraDescription cameraDescription,
    MediaSettings mediaSettings,
  ) async {
    createCount++;
    final String? code = initializeErrorCode;
    if (code != null) {
      throw CameraException(code, 'fake error');
    }
    return createCount;
  }

  @override
  Future<void> initializeCamera(
    int cameraId, {
    ImageFormatGroup imageFormatGroup = ImageFormatGroup.unknown,
  }) async {}

  @override
  Stream<CameraInitializedEvent> onCameraInitialized(int cameraId) =>
      Stream<CameraInitializedEvent>.value(
        CameraInitializedEvent(
          cameraId,
          1280,
          720,
          ExposureMode.auto,
          false,
          FocusMode.auto,
          false,
        ),
      );

  @override
  Stream<CameraErrorEvent> onCameraError(int cameraId) => _errors.stream;

  @override
  Future<void> lockCaptureOrientation(int cameraId, DeviceOrientation orientation) async {}

  @override
  Widget buildPreview(int cameraId) => const SizedBox.expand(key: Key('fakePreview'));

  @override
  Future<void> setFlashMode(int cameraId, FlashMode mode) async {
    if (torchUnsupported) throw CameraException('torchModeNotSupported', 'no torch');
    flashModes.add(mode);
  }

  @override
  bool supportsImageStreaming() => true;

  @override
  Stream<CameraImageData> onStreamedFrameAvailable(
    int cameraId, {
    CameraImageStreamOptions? options,
  }) => frames.stream;

  @override
  Future<void> dispose(int cameraId) async {
    disposeCount++;
  }
}
