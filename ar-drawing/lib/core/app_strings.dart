/// All user-facing text in one place, so it can move to proper localisation
/// (e.g. `flutter gen-l10n` with English + Vietnamese) without hunting
/// through widgets.
abstract final class AppStrings {
  static const String appName = 'TraceLight';

  static const String opacity = 'Opacity';
  static const String nextSample = 'Next sample picture';
  static const String startingCamera = 'Starting camera…';

  static const String permissionTitle = 'Camera access needed';
  static const String permissionBody =
      'TraceLight shows your paper through the rear camera so you can trace '
      'the picture on it. Nothing is recorded or uploaded.';
  static const String permissionBlockedBody =
      'Camera access is turned off for TraceLight. Open Settings, allow the '
      'camera, then come back here.';
  static const String tryAgain = 'Try again';
  static const String openSettings = 'Open Settings';

  static const String noCameraTitle = 'No camera found';
  static const String noCameraBody =
      'This device does not report a camera that TraceLight can use.';

  static const String cameraErrorTitle = 'Camera could not start';
  static const String cameraErrorBody =
      'Another app may be using the camera. Close it and try again.';
}
