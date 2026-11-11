import 'dart:async';

import 'package:app_settings/app_settings.dart';
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import '../../core/app_strings.dart';
import 'camera_status.dart';
import 'widgets/camera_feed.dart';
import 'widgets/camera_message_view.dart';
import 'widgets/opacity_control.dart';
import 'widgets/trace_overlay.dart';

/// The core tracing screen: rear camera full-screen, the picture to trace on
/// top of it, and an opacity slider.
///
/// Camera life cycle:
/// - opened when the screen appears and when the app comes back to the
///   foreground (this also picks up a permission granted in Settings);
/// - released when the app goes to the background, so other apps can use the
///   camera and the battery is spared;
/// - the screen is kept awake only while the preview is running.
class WorkspaceScreen extends StatefulWidget {
  const WorkspaceScreen({super.key, required this.overlayImages, this.initialOpacity = 0.5})
    : assert(overlayImages.length > 0, 'Need at least one picture to trace');

  /// Pictures the user can trace. Phase 1 ships bundled samples; later phases
  /// pass the image picked from the gallery or the template library.
  final List<ImageProvider> overlayImages;
  final double initialOpacity;

  @override
  State<WorkspaceScreen> createState() => _WorkspaceScreenState();
}

class _WorkspaceScreenState extends State<WorkspaceScreen> with WidgetsBindingObserver {
  CameraController? _controller;
  CameraStatus _status = CameraStatus.starting;
  late double _opacity = widget.initialOpacity;
  int _overlayIndex = 0;

  /// Incremented every time the camera is started or stopped. An async start
  /// that finishes after a newer start/stop compares its own number with this
  /// one and throws its result away instead of overwriting newer state.
  int _generation = 0;
  bool _starting = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    unawaited(_startCamera());
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _generation++;
    final CameraController? controller = _controller;
    _controller = null;
    unawaited(controller?.dispose());
    unawaited(_setKeepAwake(false));
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.inactive:
        // Also fired while the OS permission dialog is on screen. Only close
        // a camera that is actually running, so the prompt is not disturbed.
        if (_controller?.value.isInitialized ?? false) {
          unawaited(_stopCamera());
        }
      case AppLifecycleState.hidden:
      case AppLifecycleState.paused:
        unawaited(_stopCamera());
      case AppLifecycleState.resumed:
        if (_controller == null && !_starting) {
          unawaited(_startCamera());
        }
      case AppLifecycleState.detached:
        break;
    }
  }

  Future<void> _startCamera() async {
    final int generation = ++_generation;
    _starting = true;
    if (mounted) setState(() => _status = CameraStatus.starting);

    CameraController? controller;
    try {
      final List<CameraDescription> cameras = await availableCameras();
      if (generation != _generation) return;
      if (cameras.isEmpty) {
        _finishStart(generation, CameraStatus.noCamera);
        return;
      }
      final CameraDescription rear = cameras.firstWhere(
        (CameraDescription c) => c.lensDirection == CameraLensDirection.back,
        orElse: () => cameras.first,
      );

      controller = CameraController(
        rear,
        // 720p: sharp enough to see pencil lines, light enough for low-end
        // phones and, later, for time-lapse recording.
        ResolutionPreset.high,
        enableAudio: false,
      );
      // Initializing triggers the OS permission prompt the first time.
      await controller.initialize();

      if (generation != _generation || !mounted) {
        await controller.dispose();
        return;
      }
      try {
        // Keep the preview upright even if the phone is turned sideways.
        await controller.lockCaptureOrientation(DeviceOrientation.portraitUp);
      } on Object catch (e) {
        debugPrint('lockCaptureOrientation not supported: $e');
      }

      _controller = controller;
      _finishStart(generation, CameraStatus.ready);
      await _setKeepAwake(true);
    } on CameraException catch (e) {
      debugPrint('Camera start failed: ${e.code} ${e.description}');
      await controller?.dispose();
      _finishStart(generation, statusForCameraError(e));
    } on Object catch (e) {
      debugPrint('Camera start failed: $e');
      await controller?.dispose();
      _finishStart(generation, CameraStatus.error);
    }
  }

  void _finishStart(int generation, CameraStatus status) {
    if (generation != _generation) return;
    _starting = false;
    if (mounted) setState(() => _status = status);
  }

  Future<void> _stopCamera() async {
    _generation++;
    _starting = false;
    final CameraController? controller = _controller;
    _controller = null;
    if (mounted && controller != null) {
      setState(() => _status = CameraStatus.starting);
    }
    await _setKeepAwake(false);
    await controller?.dispose();
  }

  /// Keeps the display on while tracing (the user's hands are busy drawing,
  /// not touching the screen). Failing to toggle it must never break the
  /// camera, so errors are only logged.
  Future<void> _setKeepAwake(bool enable) async {
    try {
      await WakelockPlus.toggle(enable: enable);
    } on Object catch (e) {
      debugPrint('Wakelock toggle failed: $e');
    }
  }

  Future<void> _openSettings() async {
    try {
      await AppSettings.openAppSettings();
    } on Object catch (e) {
      debugPrint('Could not open settings: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: switch (_status) {
        CameraStatus.ready when _controller != null => _buildWorkspace(_controller!),
        CameraStatus.ready || CameraStatus.starting => const _StartingView(),
        CameraStatus.permissionDenied => CameraMessageView(
          key: const Key('permissionDenied'),
          icon: Icons.no_photography_outlined,
          title: AppStrings.permissionTitle,
          message: AppStrings.permissionBody,
          primaryLabel: AppStrings.tryAgain,
          onPrimary: _startCamera,
          secondaryLabel: AppStrings.openSettings,
          onSecondary: _openSettings,
        ),
        CameraStatus.permissionBlocked => CameraMessageView(
          key: const Key('permissionBlocked'),
          icon: Icons.no_photography_outlined,
          title: AppStrings.permissionTitle,
          message: AppStrings.permissionBlockedBody,
          primaryLabel: AppStrings.openSettings,
          onPrimary: _openSettings,
          secondaryLabel: AppStrings.tryAgain,
          onSecondary: _startCamera,
        ),
        CameraStatus.noCamera => const CameraMessageView(
          key: Key('noCamera'),
          icon: Icons.videocam_off_outlined,
          title: AppStrings.noCameraTitle,
          message: AppStrings.noCameraBody,
        ),
        CameraStatus.error => CameraMessageView(
          key: const Key('cameraError'),
          icon: Icons.error_outline,
          title: AppStrings.cameraErrorTitle,
          message: AppStrings.cameraErrorBody,
          primaryLabel: AppStrings.tryAgain,
          onPrimary: _startCamera,
        ),
      },
    );
  }

  Widget _buildWorkspace(CameraController controller) {
    return Stack(
      fit: StackFit.expand,
      children: <Widget>[
        CameraFeed(controller: controller),
        TraceOverlay(
          image: widget.overlayImages[_overlayIndex % widget.overlayImages.length],
          opacity: _opacity,
        ),
        if (widget.overlayImages.length > 1)
          Positioned(
            top: 0,
            right: 12,
            child: SafeArea(
              minimum: const EdgeInsets.only(top: 12),
              child: IconButton.filledTonal(
                key: const Key('nextSample'),
                tooltip: AppStrings.nextSample,
                icon: const Icon(Icons.collections_outlined),
                onPressed: () => setState(() => _overlayIndex++),
              ),
            ),
          ),
        Positioned(
          left: 16,
          right: 16,
          bottom: 0,
          child: SafeArea(
            minimum: const EdgeInsets.only(bottom: 16),
            child: OpacityControl(
              value: _opacity,
              onChanged: (double v) => setState(() => _opacity = v),
            ),
          ),
        ),
      ],
    );
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(EnumProperty<CameraStatus>('status', _status))
      ..add(DoubleProperty('opacity', _opacity));
  }
}

class _StartingView extends StatelessWidget {
  const _StartingView();

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          CircularProgressIndicator(),
          SizedBox(height: 16),
          Text(AppStrings.startingCamera, style: TextStyle(color: Colors.white70)),
        ],
      ),
    );
  }
}
