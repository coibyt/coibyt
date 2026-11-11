import 'dart:async';
import 'dart:ui' as ui;

import 'package:app_settings/app_settings.dart';
import 'package:camera/camera.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:path_provider/path_provider.dart';
import 'package:wakelock_plus/wakelock_plus.dart';

import '../../core/i18n/language_controller.dart';
import '../timelapse/timelapse_composer.dart';
import '../timelapse/timelapse_recorder.dart';
import '../timelapse/timelapse_result_screen.dart';
import '../timelapse/video_encoder.dart';
import '../game/game_store.dart';
import '../game/goals.dart';
import '../../core/game_art.dart';
import '../lessons/lesson.dart';
import '../lessons/lesson_demo.dart';
import '../lessons/widgets/demo_view.dart';
import '../teacher/teacher_script.dart';
import '../lessons/lesson_progress_store.dart';
import '../lessons/widgets/lesson_panel.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
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
    this.overlayImage,
    this.lesson,
    this.initialOpacity = 0.5,
    RecorderBuilder? recorderBuilder,
    bool enableTimelapse = !kIsWeb,
  }) : assert(overlayImage != null || lesson != null, 'Give a picture or a lesson'),
       recorderBuilder = enableTimelapse ? (recorderBuilder ?? _defaultRecorder) : null;

  /// The picture to trace (template asset, processed photo, ...).
  final ImageProvider? overlayImage;

  /// A colouring lesson: the overlay changes with each step and Lumi
  /// explains what to do.
  final Lesson? lesson;
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

  final TeacherController _teacher = TeacherController();
  LessonProgress? _progress;
  bool _greeted = false;

  // Lumi shows each step on screen before the learner traces it on paper.
  LessonDemo? _demo;
  int? _demoIndex;
  final Set<int> _demoed = <int>{};

  TimelapseRecorder? _recorder;
  ui.Image? _overlayForVideo;
  ImageProvider? _overlayForVideoSource;
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
    final Lesson? lesson = widget.lesson;
    if (lesson != null) {
      _progress = LessonProgress(lesson)..addListener(_onStepChanged);
      unawaited(
        LessonDemo.load(lesson).then((LessonDemo? d) {
          if (!mounted) return;
          setState(() => _demo = d);
          // Lumi already spoke before the demo arrived: show it now.
          if (_greeted && _demoIndex == null) {
            final TeacherLine? intro = _beginDemo();
            if (intro != null) _teacher.say(<TeacherLine>[intro]);
          }
        }),
      );
    }
    unawaited(_startCamera());
  }

  DemoStep? get _currentDemo {
    final LessonProgress? p = _progress;
    return p == null ? null : _demo?.forStep(p.step);
  }

  /// Starts the demonstration of the current step (first time, or [again]).
  TeacherLine? _beginDemo({bool again = false}) {
    final LessonProgress? p = _progress;
    if (p == null || _currentDemo == null) return null;
    if (!again && _demoed.contains(p.index)) return null;
    _demoed.add(p.index);
    setState(() => _demoIndex = p.index);
    return TeacherLine(id: 'demo_intro_${p.step.kind.name}', mood: 'paint');
  }

  void _onDemoFinished() {
    if (!mounted) return;
    setState(() => _demoIndex = null);
    _teacher.say(<TeacherLine>[
      const TeacherLine(id: 'demo_your_turn', mood: 'point'),
      ...?_progress?.step.lines,
    ]);
  }

  /// The picture shown now: the lesson step's layer, or the given picture.
  ImageProvider get _overlayImage {
    final LessonProgress? progress = _progress;
    return progress != null ? AssetImage(progress.step.overlay) : widget.overlayImage!;
  }

  /// Lumi speaks once the camera is up (not over the permission prompt).
  void _greetOnce() {
    if (_greeted) return;
    _greeted = true;
    final LessonProgress? progress = _progress;
    if (progress != null) {
      final TeacherLine? intro = _beginDemo();
      _teacher.say(intro != null ? <TeacherLine>[intro] : progress.step.lines);
      _recordProgress();
    } else {
      _teacher.introduce(TeacherScope.maybeOf(context), 'workspace_intro');
    }
  }

  void _recordProgress() {
    final LessonProgress? p = _progress;
    if (p != null) {
      unawaited(LessonProgressScope.maybeOf(context)?.record(p.lesson, p.index));
      unawaited(GameScope.read(context)?.recordActivity());
      unawaited(GameScope.read(context)?.track(GameEvent.lessonStep));
    }
  }

  void _onStepChanged() {
    setState(() {});
    final TeacherLine? intro = _beginDemo();
    _teacher.say(intro != null ? <TeacherLine>[intro] : _progress!.step.lines);
    _recordProgress();
    // Keep the time-lapse in step with the screen.
    if (_recorder != null) unawaited(_updateVideoOverlay());
  }

  Future<void> _updateVideoOverlay() async {
    final ImageProvider source = _overlayImage;
    if (source == _overlayForVideoSource && _overlayForVideo != null) return;
    final ui.Image image = await resolveImage(source);
    if (!mounted) {
      image.dispose();
      return;
    }
    final ui.Image? old = _overlayForVideo;
    _overlayForVideo = image;
    _overlayForVideoSource = source;
    old?.dispose();
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _hintTimer?.cancel();
    _teacher.dispose();
    _progress?.dispose();
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
      _greetOnce();
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
      _toast(context.tr('workspace.flashUnavailable'));
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
      await _updateVideoOverlay();
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
      if (mounted) _toast(context.tr('timelapse.failed'));
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
      _toast(context.tr('timelapse.tooShort'));
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
          title: context.tr('camera.permissionTitle'),
          message: kIsWeb
              ? context.tr('camera.webPermissionBody')
              : context.tr('camera.permissionBody'),
          primaryLabel: context.tr('camera.tryAgain'),
          onPrimary: _startCamera,
          secondaryLabel: kIsWeb ? null : context.tr('camera.openSettings'),
          onSecondary: kIsWeb ? null : _openSettings,
        ),
        CameraStatus.permissionBlocked => CameraMessageView(
          key: const Key('permissionBlocked'),
          icon: Icons.no_photography_outlined,
          title: context.tr('camera.permissionTitle'),
          message: context.tr('camera.permissionBlockedBody'),
          primaryLabel: context.tr('camera.openSettings'),
          onPrimary: _openSettings,
          secondaryLabel: context.tr('camera.tryAgain'),
          onSecondary: _startCamera,
        ),
        CameraStatus.noCamera => CameraMessageView(
          key: const Key('noCamera'),
          icon: Icons.videocam_off_outlined,
          title: context.tr('camera.noCameraTitle'),
          message: context.tr('camera.noCameraBody'),
        ),
        CameraStatus.error => CameraMessageView(
          key: const Key('cameraError'),
          icon: Icons.error_outline,
          title: context.tr('camera.errorTitle'),
          message: context.tr('camera.errorBody'),
          primaryLabel: context.tr('camera.tryAgain'),
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
              onTap: _locked ? () => _toast(context.tr('workspace.lockedHint')) : null,
            ),
            TraceOverlay(image: _overlayImage, opacity: _opacity, transform: _transform),
            if (_progress != null && _demoIndex != null && _currentDemo != null)
              Positioned.fill(
                child: SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(12, 64, 12, 230),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: DemoView(
                        key: ValueKey<int>(_demoIndex!),
                        step: _currentDemo!,
                        target: _progress!.step.overlay,
                        previous: _progress!.index > 0 && _progress!.step.kind != StepKind.outline
                            ? _progress!.lesson.steps[_progress!.index - 1].overlay
                            : null,
                        onFinished: _onDemoFinished,
                      ),
                    ),
                  ),
                ),
              ),
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
                key: Key('gestureHint'),
                left: 24,
                right: 24,
                top: 120,
                child: IgnorePointer(child: _GestureHint()),
              ),
            // Keyed: the hint above comes and goes, and must not make Flutter
            // rebuild these controls (Lumi would restart mid-sentence).
            Positioned(
              key: const Key('bottomControls'),
              left: 16,
              right: 16,
              bottom: 0,
              child: SafeArea(
                minimum: const EdgeInsets.only(bottom: 16),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    TeacherOverlay(
                      controller: _teacher,
                      inline: true,
                      collapsedAlignment: Alignment.centerLeft,
                      autoAdvance: const Duration(seconds: 2),
                    ),
                    if (_progress != null) ...<Widget>[
                      const SizedBox(height: 8),
                      LessonPanel(
                        progress: _progress!,
                        onFinish: () => Navigator.of(context).maybePop(),
                      ),
                    ],
                    const SizedBox(height: 8),
                    Row(
                      children: <Widget>[
                        if (_currentDemo != null && _demoIndex == null) ...<Widget>[
                          IconButton.filledTonal(
                            key: const Key('replayDemo'),
                            tooltip: context.tr('lesson.demo.watch'),
                            onPressed: () {
                              final TeacherLine? intro = _beginDemo(again: true);
                              if (intro != null) _teacher.say(<TeacherLine>[intro]);
                            },
                            icon: const ArtImage(GameArt.magicBrush, size: 28),
                          ),
                          const SizedBox(width: 8),
                        ],
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
      message: recording ? context.tr('timelapse.stop') : context.tr('timelapse.start'),
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
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
          child: Text(
            context.tr('workspace.gestureHint'),
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white, fontSize: 13),
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
    return Center(
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const CircularProgressIndicator(),
          const SizedBox(height: 16),
          Text(
            context.tr('workspace.startingCamera'),
            style: const TextStyle(color: Colors.white70),
          ),
        ],
      ),
    );
  }
}
