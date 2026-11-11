import 'dart:async';
import 'dart:ui' as ui;

import 'package:app_settings/app_settings.dart';
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import '../../core/app_strings.dart';
import '../timelapse/timelapse_composer.dart';
import '../timelapse/timelapse_recorder.dart';
import '../timelapse/timelapse_result_screen.dart';
import '../timelapse/video_encoder.dart';
import 'camera_status.dart';
import 'overlay_transform.dart';
import 'widgets/camera_feed.dart';
import 'widgets/camera_message_view.dart';
import 'widgets/opacity_control.dart';
import 'widgets/trace_overlay.dart';
import 'widgets/workspace_toolbar.dart';

/// Builds the time-lapse recorder. Null = recording not offered (web).
typedef RecorderBuilder = TimelapseRecorder Function();

TimelapseRecorder _defaultRecorder() => TimelapseRecorder(
  encoder: HardwareVideoEncoder(),
  outputPath: () async {
    final String dir = (await getTemporaryDirectory()).path;
    return '$dir/tracelight_${DateTime.now().millisecondsSinceEpoch}.mp4';
  },
);

/// The tracing screen: rear camera full-screen, the picture to trace on top
/// (move / zoom / rotate / lock), opacity, flashlight and time-lapse.
///
/// Camera life cycle:
/// - opened when the screen appears and when the app comes back to the
///   foreground (this also picks up a permission granted in Settings);
/// - released when the app goes to the background; a running time-lapse is
///   finished first and shown when the user comes back;
/// - the screen is kept awake only while the preview is running.
class WorkspaceScreen extends StatefulWidget {
  const WorkspaceScreen({
    super.key,
    required this.overlayImage,
    this.initialOpacity = 0.5,
    RecorderBuilder? recorderBuilder,
    bool enableTimelapse = !kIsWeb,
  }) : recorderBuilder = enableTimelapse ? (recorderBuilder ?? _defaultRecorder) : null;

  /// The picture to trace (template asset, processed photo, ...).
  final ImageProvider overlayImage;
  final double initialOpacity;
  final RecorderBuilder? recorderBuilder;

  @override
  State<WorkspaceScreen> createState() => _WorkspaceScreenState();
}

class _WorkspaceScreenState extends State<WorkspaceScreen> with WidgetsBindingObserver {
  CameraController? _controller;
  CameraStatus _status = CameraStatus.starting;
  late double _opacity = widget.initialOpacity;

  OverlayTransform _transform = OverlayTransform.identity;
  OverlayTransform _gestureStart = OverlayTransform.identity;
  Offset _gestureFocal = Offset.zero;
  bool _locked = false;
  bool _torch = false;
  bool _showHint = true;
  Timer? _hintTimer;

  TimelapseRecorder? _recorder;
  ui.Image? _overlayForVideo;
  Size _workspaceSize = Size.zero;
  TimelapseResult? _pendingResult;

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
    _hintTimer?.cancel();
    _generation++;
    final CameraController? controller = _controller;
    _controller = null;
    final TimelapseRecorder? recorder = _recorder;
    _recorder = null;
    unawaited(() async {
      await recorder?.stop();
      recorder?.dispose();
      await controller?.dispose();
    }());
    _overlayForVideo?.dispose();
    unawaited(_setKeepAwake(false));
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    switch (state) {
      case AppLifecycleState.inactive:
        // Also fired while the OS permission dialog is on screen. Only close
        // a camera that is actually running, so the prompt is not disturbed.
        // A time-lapse keeps running through short interruptions
        // (notification shade, control centre).
        if ((_controller?.value.isInitialized ?? false) && _recorder == null) {
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

  // ---------------------------------------------------------------- camera

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
        // phones and for time-lapse frame grabbing.
        ResolutionPreset.high,
        enableAudio: false,
        // Formats the time-lapse frame converter understands.
        imageFormatGroup: kIsWeb
            ? null
            : defaultTargetPlatform == TargetPlatform.iOS
            ? ImageFormatGroup.bgra8888
            : ImageFormatGroup.yuv420,
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
      if (_torch) await _applyTorch(controller, true);

      _controller = controller;
      _finishStart(generation, CameraStatus.ready);
      _hintTimer ??= Timer(const Duration(seconds: 6), () {
        if (mounted && _showHint) setState(() => _showHint = false);
      });
      await _setKeepAwake(true);
      _showPendingResult();
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
    if (_recorder != null) {
      // Finish the video before letting go of the camera; show it on return.
      _pendingResult = await _finishRecording();
    }
    await _setKeepAwake(false);
    await controller?.dispose();
  }

  /// Keeps the display on while tracing (hands are busy drawing, not
  /// touching the screen). Failing to toggle it must never break the camera.
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

  // ------------------------------------------------------------- controls

  Future<bool> _applyTorch(CameraController controller, bool on) async {
    try {
      await controller.setFlashMode(on ? FlashMode.torch : FlashMode.off);
      return true;
    } on Object catch (e) {
      debugPrint('Torch not available: $e');
      return false;
    }
  }

  Future<void> _toggleTorch() async {
    final CameraController? controller = _controller;
    if (controller == null) return;
    final bool wanted = !_torch;
    final bool ok = await _applyTorch(controller, wanted);
    if (!mounted) return;
    if (ok) {
      setState(() => _torch = wanted);
    } else {
      _toast(AppStrings.flashUnavailable);
    }
  }

  void _toast(String message) {
    ScaffoldMessenger.of(context)
      ..hideCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(message), duration: const Duration(seconds: 2)));
  }

  void _onScaleStart(ScaleStartDetails details) {
    _gestureStart = _transform;
    _gestureFocal = details.focalPoint;
    if (_showHint) setState(() => _showHint = false);
  }

  void _onScaleUpdate(ScaleUpdateDetails details) {
    setState(() {
      _transform = OverlayTransform.fromGesture(
        _gestureStart,
        translation: details.focalPoint - _gestureFocal,
        scale: details.scale,
        rotation: details.rotation,
      );
    });
  }

  // ------------------------------------------------------------ time-lapse

  Future<void> _startRecording() async {
    final CameraController? controller = _controller;
    final RecorderBuilder? build = widget.recorderBuilder;
    if (controller == null || build == null) return;
    try {
      _overlayForVideo ??= await resolveImage(widget.overlayImage);
      final TimelapseRecorder recorder = build();
      setState(() => _recorder = recorder);
      await recorder.start(
        controller,
        scene: () => TimelapseScene(
          screenSize: _workspaceSize,
          overlay: _overlayForVideo!,
          transform: _transform,
          opacity: _opacity,
        ),
      );
    } on Object catch (e) {
      debugPrint('Time-lapse start failed: $e');
      final TimelapseRecorder? failed = _recorder;
      if (mounted) setState(() => _recorder = null);
      failed?.dispose();
      if (mounted) _toast(AppStrings.recordingFailed);
    }
  }

  Future<TimelapseResult?> _finishRecording() async {
    final TimelapseRecorder? recorder = _recorder;
    if (recorder == null) return null;
    if (mounted) setState(() => _recorder = null);
    try {
      return await recorder.stop();
    } on Object catch (e) {
      debugPrint('Time-lapse stop failed: $e');
      return null;
    } finally {
      recorder.dispose();
    }
  }

  Future<void> _stopRecording() async {
    final TimelapseResult? result = await _finishRecording();
    if (!mounted) return;
    if (result == null) {
      _toast(AppStrings.tooShort);
      return;
    }
    await _openResult(result);
  }

  void _showPendingResult() {
    final TimelapseResult? result = _pendingResult;
    _pendingResult = null;
    if (result != null && mounted) unawaited(_openResult(result));
  }

  Future<void> _openResult(TimelapseResult result) {
    return Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => TimelapseResultScreen(result: result)));
  }

  // ------------------------------------------------------------------- UI

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
          message: kIsWeb ? AppStrings.webPermissionBody : AppStrings.permissionBody,
          primaryLabel: AppStrings.tryAgain,
          onPrimary: _startCamera,
          secondaryLabel: kIsWeb ? null : AppStrings.openSettings,
          onSecondary: kIsWeb ? null : _openSettings,
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
    final TimelapseRecorder? recorder = _recorder;
    return LayoutBuilder(
      builder: (BuildContext context, BoxConstraints constraints) {
        _workspaceSize = constraints.biggest;
        return Stack(
          fit: StackFit.expand,
          children: <Widget>[
            CameraFeed(controller: controller),
            // Gesture layer: the whole screen moves the picture, so a small
            // picture is still easy to grab.
            GestureDetector(
              key: const Key('gestureLayer'),
              behavior: HitTestBehavior.opaque,
              onScaleStart: _locked ? null : _onScaleStart,
              onScaleUpdate: _locked ? null : _onScaleUpdate,
              onDoubleTap: _locked
                  ? null
                  : () => setState(() => _transform = OverlayTransform.identity),
              onTap: _locked ? () => _toast(AppStrings.lockedHint) : null,
            ),
            TraceOverlay(image: widget.overlayImage, opacity: _opacity, transform: _transform),
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: WorkspaceToolbar(
                locked: _locked,
                torchOn: _torch,
                canReset: !_transform.isIdentity && !_locked,
                onBack: Navigator.of(context).canPop()
                    ? () => Navigator.of(context).maybePop()
                    : null,
                onLock: () => setState(() => _locked = !_locked),
                onTorch: _toggleTorch,
                onReset: () => setState(() => _transform = OverlayTransform.identity),
                recorder: recorder,
              ),
            ),
            if (_showHint && !_locked)
              const Positioned(
                left: 24,
                right: 24,
                top: 120,
                child: IgnorePointer(child: _GestureHint()),
              ),
            Positioned(
              left: 16,
              right: 16,
              bottom: 0,
              child: SafeArea(
                minimum: const EdgeInsets.only(bottom: 16),
                child: Row(
                  children: <Widget>[
                    Expanded(
                      child: OpacityControl(
                        value: _opacity,
                        onChanged: (double v) => setState(() => _opacity = v),
                      ),
                    ),
                    if (widget.recorderBuilder != null) ...<Widget>[
                      const SizedBox(width: 12),
                      _RecordButton(
                        recording: recorder != null,
                        onPressed: recorder != null ? _stopRecording : _startRecording,
                      ),
                    ],
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(EnumProperty<CameraStatus>('status', _status))
      ..add(DoubleProperty('opacity', _opacity))
      ..add(DiagnosticsProperty<OverlayTransform>('transform', _transform))
      ..add(FlagProperty('locked', value: _locked, ifTrue: 'locked'));
  }
}

class _RecordButton extends StatelessWidget {
  const _RecordButton({required this.recording, required this.onPressed});

  final bool recording;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: recording ? AppStrings.stopRecording : AppStrings.startRecording,
      child: Material(
        key: const Key('recordButton'),
        color: Theme.of(context).colorScheme.surface.withValues(alpha: 0.78),
        shape: const CircleBorder(),
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: onPressed,
          child: SizedBox(
            width: 60,
            height: 60,
            child: Center(
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                width: recording ? 22 : 30,
                height: recording ? 22 : 30,
                decoration: BoxDecoration(
                  color: const Color(0xFFFF4D4D),
                  borderRadius: BorderRadius.circular(recording ? 5 : 15),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _GestureHint extends StatelessWidget {
  const _GestureHint();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: Colors.black.withValues(alpha: 0.55),
          borderRadius: BorderRadius.circular(20),
        ),
        child: const Padding(
          padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          child: Text(
            AppStrings.gestureHint,
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white, fontSize: 13),
          ),
        ),
      ),
    );
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
