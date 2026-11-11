import 'package:camera_platform_interface/camera_platform_interface.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/timelapse/timelapse_recorder.dart';
import 'package:tracelight/features/timelapse/timelapse_result_screen.dart';
import 'package:tracelight/features/timelapse/video_encoder.dart';
import 'package:tracelight/features/workspace/overlay_transform.dart';
import 'package:tracelight/features/workspace/widgets/opacity_control.dart';
import 'package:tracelight/features/workspace/widgets/trace_overlay.dart';
import 'package:tracelight/features/workspace/workspace_screen.dart';

import '../../test_app.dart';
import '../../test_images.dart';
import 'fake_camera_platform.dart';

class FakeEncoder implements VideoEncoder {
  String? path;
  int width = 0, height = 0;
  final List<int> frameLengths = <int>[];
  bool finished = false;

  @override
  Future<void> start({
    required int width,
    required int height,
    required int fps,
    required String path,
  }) async {
    this.width = width;
    this.height = height;
    this.path = path;
  }

  @override
  Future<void> addFrame(Uint8List rgba) async => frameLengths.add(rgba.length);

  @override
  Future<void> finish() async => finished = true;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  final MemoryImage overlay = MemoryImage(tinyPng);
  late FakeCameraPlatform camera;
  final List<bool> wakelock = <bool>[];

  setUp(() {
    camera = FakeCameraPlatform();
    CameraPlatform.instance = camera;
    wakelock.clear();
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMessageHandler(
      'dev.flutter.pigeon.wakelock_plus_platform_interface.WakelockPlusApi.toggle',
      (ByteData? message) async {
        wakelock.add(true);
        return const StandardMessageCodec().encodeMessage(<Object?>[]);
      },
    );
  });

  Future<void> pumpWorkspace(WidgetTester tester, {RecorderBuilder? recorder}) async {
    await tester.pumpWidget(
      testApp(
        WorkspaceScreen(
          overlayImage: overlay,
          recorderBuilder: recorder,
          enableTimelapse: recorder != null,
        ),
      ),
    );
    await tester.pumpAndSettle();
  }

  TraceOverlay overlayWidget(WidgetTester tester) => tester.widget(find.byType(TraceOverlay));

  testWidgets('shows camera preview, overlay at 50% and the slider', (WidgetTester tester) async {
    await pumpWorkspace(tester);

    expect(find.byKey(const Key('fakePreview')), findsOneWidget);
    expect(find.byType(TraceOverlay), findsOneWidget);
    expect(find.byType(OpacityControl), findsOneWidget);
    expect(find.text('50%'), findsOneWidget);
    expect(wakelock, isNotEmpty, reason: 'screen should be kept awake');
    expect(find.byKey(const Key('recordButton')), findsNothing);
  });

  testWidgets('moving the slider changes the overlay opacity', (WidgetTester tester) async {
    await pumpWorkspace(tester);

    final Rect box = tester.getRect(find.byKey(const Key('opacitySlider')));
    await tester.tapAt(Offset(box.right - 30, box.center.dy));
    await tester.pumpAndSettle();

    expect(overlayWidget(tester).opacity, greaterThan(0.8));
    final Image image = tester.widget(
      find.descendant(of: find.byType(TraceOverlay), matching: find.byType(Image)),
    );
    expect(image.fit, BoxFit.contain);
    expect(image.opacity!.value, overlayWidget(tester).opacity);
  });

  testWidgets('dragging moves the picture; lock stops it; reset recentres', (
    WidgetTester tester,
  ) async {
    await pumpWorkspace(tester);
    final Finder layer = find.byKey(const Key('gestureLayer'));

    await tester.drag(layer, const Offset(60, 40));
    await tester.pumpAndSettle();
    final OverlayTransform moved = overlayWidget(tester).transform;
    expect(moved.offset.dx, greaterThan(30));
    expect(moved.offset.dy, greaterThan(15));

    await tester.tap(find.byKey(const Key('lockButton')));
    await tester.pumpAndSettle();
    await tester.drag(layer, const Offset(-100, -100));
    await tester.pumpAndSettle();
    expect(overlayWidget(tester).transform, moved, reason: 'locked picture must not move');
    expect(find.byKey(const Key('resetButton')), findsNothing);

    await tester.tap(find.byKey(const Key('lockButton')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('resetButton')));
    await tester.pumpAndSettle();
    expect(overlayWidget(tester).transform, OverlayTransform.identity);
  });

  testWidgets('pinch zooms the picture', (WidgetTester tester) async {
    await pumpWorkspace(tester);
    final Offset c = tester.getCenter(find.byKey(const Key('gestureLayer')));
    final TestGesture a = await tester.startGesture(c - const Offset(40, 0));
    final TestGesture b = await tester.startGesture(c + const Offset(40, 0));
    await tester.pump();
    for (int i = 0; i < 8; i++) {
      await a.moveBy(const Offset(-5, 0));
      await b.moveBy(const Offset(5, 0));
      await tester.pump();
    }
    await a.up();
    await b.up();
    await tester.pumpAndSettle();
    expect(overlayWidget(tester).transform.scale, greaterThan(1.25));
  });

  testWidgets('flashlight toggles torch mode', (WidgetTester tester) async {
    await pumpWorkspace(tester);
    await tester.tap(find.byKey(const Key('torchButton')));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const Key('torchButton')));
    await tester.pumpAndSettle();
    expect(camera.flashModes, <FlashMode>[FlashMode.torch, FlashMode.off]);
  });

  testWidgets('phones without a torch get a message', (WidgetTester tester) async {
    camera.torchUnsupported = true;
    await pumpWorkspace(tester);
    await tester.tap(find.byKey(const Key('torchButton')));
    await tester.pump();
    expect(find.text('This device has no flashlight the app can use.'), findsOneWidget);
  });

  testWidgets('denied permission shows explanation and retry works', (WidgetTester tester) async {
    camera.initializeErrorCode = 'CameraAccessDenied';
    await pumpWorkspace(tester);

    expect(find.byKey(const Key('permissionDenied')), findsOneWidget);
    expect(find.byType(TraceOverlay), findsNothing);

    camera.initializeErrorCode = null;
    await tester.tap(find.text('Try again'));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('fakePreview')), findsOneWidget);
  });

  testWidgets('iOS "denied without prompt" points the user to Settings', (
    WidgetTester tester,
  ) async {
    camera.initializeErrorCode = 'CameraAccessDeniedWithoutPrompt';
    await pumpWorkspace(tester);
    expect(find.byKey(const Key('permissionBlocked')), findsOneWidget);
    expect(find.text('Open Settings'), findsOneWidget);
  });

  testWidgets('device without a camera gets a clear message', (WidgetTester tester) async {
    CameraPlatform.instance = FakeCameraPlatform(cameras: const <CameraDescription>[]);
    await pumpWorkspace(tester);
    expect(find.byKey(const Key('noCamera')), findsOneWidget);
  });

  testWidgets('other camera failures show an error with retry', (WidgetTester tester) async {
    camera.initializeErrorCode = 'CameraBusy';
    await pumpWorkspace(tester);
    expect(find.byKey(const Key('cameraError')), findsOneWidget);
  });

  testWidgets('camera is released in background and reopened on resume', (
    WidgetTester tester,
  ) async {
    await pumpWorkspace(tester);
    expect(camera.createCount, 1);

    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.inactive);
    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.hidden);
    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.paused);
    await tester.pumpAndSettle();
    expect(camera.disposeCount, 1);
    expect(find.byKey(const Key('fakePreview')), findsNothing);

    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.hidden);
    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.inactive);
    tester.binding.handleAppLifecycleStateChanged(AppLifecycleState.resumed);
    await tester.pumpAndSettle();
    expect(camera.createCount, 2);
    expect(find.byKey(const Key('fakePreview')), findsOneWidget);
  });

  testWidgets('time-lapse: records camera frames with the overlay into a video', (
    WidgetTester tester,
  ) async {
    final FakeEncoder encoder = FakeEncoder();
    await pumpWorkspace(
      tester,
      recorder: () => TimelapseRecorder(
        encoder: encoder,
        outputPath: () async => '/tmp/test.mp4',
        captureInterval: Duration.zero,
      ),
    );

    await tester.runAsync(() async {
      await tester.tap(find.byKey(const Key('recordButton')));
      // Decoding the overlay picture is real async work.
      await Future<void>.delayed(const Duration(milliseconds: 200));
    });
    await tester.pump();
    expect(find.byKey(const Key('recordingBadge')), findsOneWidget);

    // A 4x2 landscape YUV frame, like Android delivers.
    CameraImageData frame() => CameraImageData(
      format: const CameraImageFormat(ImageFormatGroup.yuv420, raw: 35),
      width: 4,
      height: 2,
      planes: <CameraImagePlane>[
        CameraImagePlane(bytes: Uint8List.fromList(List<int>.filled(8, 120)), bytesPerRow: 4),
        CameraImagePlane(bytes: Uint8List.fromList(List<int>.filled(2, 128)), bytesPerRow: 2),
        CameraImagePlane(bytes: Uint8List.fromList(List<int>.filled(2, 128)), bytesPerRow: 2),
      ],
    );
    for (int i = 0; i < 3; i++) {
      await tester.runAsync(() async {
        camera.frames.add(frame());
        // Let the converter isolate + GPU readback finish.
        for (int t = 0; t < 50 && encoder.frameLengths.length <= i; t++) {
          await Future<void>.delayed(const Duration(milliseconds: 20));
        }
      });
      await tester.pump();
    }
    expect(encoder.frameLengths, hasLength(3));
    expect(encoder.width % 16, 0);
    expect(encoder.frameLengths.first, encoder.width * encoder.height * 4);

    await tester.runAsync(() async {
      await tester.tap(find.byKey(const Key('recordButton')));
      await Future<void>.delayed(const Duration(milliseconds: 100));
    });
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 500));
    expect(encoder.finished, isTrue);
    expect(find.byType(TimelapseResultScreen), findsOneWidget);
  });
}
