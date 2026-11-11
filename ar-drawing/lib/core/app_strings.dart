/// All user-facing text in one place, so it can move to proper localisation
/// (e.g. `flutter gen-l10n` with English + Vietnamese) without hunting
/// through widgets.
abstract final class AppStrings {
  static const String appName = 'TraceLight';
  static const String tagline = 'Trace any picture onto paper with your camera.';

  // Home
  static const String traceYourPhoto = 'Trace your own photo';
  static const String traceYourPhotoHint = 'Pick a picture, turn it into clean lines, trace it.';
  static const String templates = 'Templates';
  static const String all = 'All';
  static const String pro = 'PRO';
  static const String howItWorks = 'How it works';
  static const String howItWorksBody =
      '1. Put your phone on a glass or a stack of books, about 25–40 cm above the paper.\n'
      '2. Pick a picture. Pinch to resize, drag to move, twist to rotate.\n'
      '3. Lock the picture, lower the opacity, and trace what you see on the screen.';
  static const String gotIt = 'Got it';

  // Sketch filter
  static const String makeItTraceable = 'Make it traceable';
  static const String lineArt = 'Lines';
  static const String pencil = 'Pencil';
  static const String original = 'Photo';
  static const String detail = 'Detail';
  static const String startTracing = 'Start tracing';
  static const String processing = 'Turning your photo into lines…';
  static const String imageUnreadable = 'This picture could not be opened. Try another one.';

  // Workspace
  static const String opacity = 'Opacity';
  static const String startingCamera = 'Starting camera…';
  static const String lock = 'Lock picture';
  static const String unlock = 'Unlock picture';
  static const String lockedHint = 'Picture is locked. Tap the lock to move it again.';
  static const String flashOn = 'Turn flashlight on';
  static const String flashOff = 'Turn flashlight off';
  static const String flashUnavailable = 'This device has no flashlight the app can use.';
  static const String resetPosition = 'Reset position';
  static const String back = 'Back';
  static const String gestureHint = 'Pinch to resize · drag to move · twist to rotate';

  // Time-lapse
  static const String startRecording = 'Record time-lapse';
  static const String stopRecording = 'Stop recording';
  static const String recordingFailed = 'Recording could not start on this device.';
  static const String tooShort = 'Recording was too short — draw a little longer.';
  static const String timelapseTitle = 'Your time-lapse';
  static const String drawingTime = 'Drawing time';
  static const String frames = 'frames';
  static const String saveToGallery = 'Save to gallery';
  static const String saved = 'Saved';
  static const String savedToGallery = 'Saved to your gallery.';
  static const String saveFailed = 'Could not save the video';
  static const String share = 'Share';
  static const String shareText = 'I traced this with TraceLight!';

  // Camera problems
  static const String permissionTitle = 'Camera access needed';
  static const String permissionBody =
      'TraceLight shows your paper through the rear camera so you can trace '
      'the picture on it. Nothing is recorded or uploaded.';
  static const String permissionBlockedBody =
      'Camera access is turned off for TraceLight. Open Settings, allow the '
      'camera, then come back here.';
  static const String webPermissionBody =
      'Allow the camera when your browser asks. If you blocked it, tap the '
      'lock icon next to the web address and allow the camera.';
  static const String tryAgain = 'Try again';
  static const String openSettings = 'Open Settings';
  static const String noCameraTitle = 'No camera found';
  static const String noCameraBody =
      'This device does not report a camera that TraceLight can use.';
  static const String cameraErrorTitle = 'Camera could not start';
  static const String cameraErrorBody =
      'Another app may be using the camera. Close it and try again.';
}
