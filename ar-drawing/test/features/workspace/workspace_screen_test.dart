import 'package:camera_platform_interface/camera_platform_interface.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/app_theme.dart';
import 'package:tracelight/features/workspace/widgets/opacity_control.dart';
import 'package:tracelight/features/workspace/widgets/trace_overlay.dart';
import 'package:tracelight/features/workspace/workspace_screen.dart';

import 'fake_camera_platform.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  // A 1x1 transparent PNG, so the overlay has a real image to decode.
  final MemoryImage overlay = MemoryImage(
    Uint8List.fromList(<int>[
      0x89,
      0x50,
      0x4E,
      0x47,
      0x0D,
      0x0A,
      0x1A,
      0x0A,
      0x00,
      0x00,
      0x00,
      0x0D,
      0x49,
      0x48,
      0x44,
      0x52, //
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x00,
      0x00,
      0x01,
      0x08,
      0x06,
      0x00,
      0x00,
      0x00,
      0x1F,
      0x15,
      0xC4,
      0x89,
      0x00,
      0x00,
      0x00,
      0x0D,
      0x49,
      0x44,
      0x41,
      0x54,
      0x78,
      0x9C,
      0x63,
      0x00,
      0x01,
      0x00,
      0x00,
      0x05,
      0x00,
      0x01,
      0x0D,
      0x0A,
      0x2D,
      0xB4,
      0x00,
      0x00,
      0x00,
      0x00,
      0x49,
      0x45,
      0x4E,
      0x44,
      0xAE,
      0x42, 0x60, 0x82,
    ]),
  );

  final MemoryImage overlay2 = MemoryImage(Uint8List.fromList(overlay.bytes));

  late FakeCameraPlatform camera;
  final List<MethodCall> wakelockCalls = <MethodCall>[];

  setUp(() {
    camera = FakeCameraPlatform();
    CameraPlatform.instance = camera;
    wakelockCalls.clear();
    // wakelock_plus talks to the platform through a Pigeon channel; answer it
    // with an empty success reply and remember that it was used.
    TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger.setMockMessageHandler(
      'dev.flutter.pigeon.wakelock_plus_platform_interface.WakelockPlusApi.toggle',
      (ByteData? message) async {
        wakelockCalls.add(const MethodCall('toggle'));
        return const StandardMessageCodec().encodeMessage(<Object?>[]);
      },
    );
  });

  Future<void> pumpWorkspace(WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: AppTheme.dark(),
        home: WorkspaceScreen(overlayImages: <ImageProvider>[overlay, overlay2]),
      ),
    );
    await tester.pumpAndSettle();
  }

  testWidgets('shows camera preview, overlay at 50% and the slider', (WidgetTester tester) async {
    await pumpWorkspace(tester);

    expect(find.byKey(const Key('fakePreview')), findsOneWidget);
    expect(find.byType(TraceOverlay), findsOneWidget);
    expect(find.byType(OpacityControl), findsOneWidget);
    expect(find.text('50%'), findsOneWidget);
    expect(wakelockCalls, isNotEmpty, reason: 'screen should be kept awake');
  });

  testWidgets('moving the slider changes the overlay opacity', (WidgetTester tester) async {
    await pumpWorkspace(tester);

    final Finder slider = find.byKey(const Key('opacitySlider'));
    final Rect box = tester.getRect(slider);
    // Tap close to the right end of the track -> nearly opaque.
    await tester.tapAt(Offset(box.right - 30, box.center.dy));
    await tester.pumpAndSettle();

    final TraceOverlay traceOverlay = tester.widget(find.byType(TraceOverlay));
    expect(traceOverlay.opacity, greaterThan(0.8));
    final Image image = tester.widget(
      find.descendant(of: find.byType(TraceOverlay), matching: find.byType(Image)),
    );
    expect(image.fit, BoxFit.contain);
    expect(image.opacity!.value, traceOverlay.opacity);
  });

  testWidgets('sample button cycles through the bundled pictures', (WidgetTester tester) async {
    await pumpWorkspace(tester);

    TraceOverlay current() => tester.widget(find.byType(TraceOverlay));
    expect(current().image, same(overlay));
    await tester.tap(find.byKey(const Key('nextSample')));
    await tester.pump();
    expect(current().image, same(overlay2));
    await tester.tap(find.byKey(const Key('nextSample')));
    await tester.pump();
    expect(current().image, same(overlay));
  });

  testWidgets('denied permission shows explanation and retry works', (WidgetTester tester) async {
    camera.initializeErrorCode = 'CameraAccessDenied';
    await pumpWorkspace(tester);

    expect(find.byKey(const Key('permissionDenied')), findsOneWidget);
    expect(find.byType(TraceOverlay), findsNothing);

    // User changes their mind and taps "Try again".
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
}
