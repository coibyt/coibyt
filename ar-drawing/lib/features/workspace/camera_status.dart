import 'package:camera/camera.dart';

/// What the workspace can currently show in place of the camera feed.
enum CameraStatus {
  /// Asking for permission / opening the camera.
  starting,

  /// Preview is running.
  ready,

  /// User said "no" but the OS can still ask again (Android first denial).
  permissionDenied,

  /// The OS will not show the prompt again; only Settings can fix it.
  permissionBlocked,

  /// The device has no usable camera.
  noCamera,

  /// Any other failure (camera busy, hardware error, ...).
  error,
}

/// Maps the error codes thrown by the `camera` plugin to a [CameraStatus].
///
/// Codes come from camera_android_camerax and camera_avfoundation:
/// - `CameraAccessDenied`: user denied the prompt.
/// - `CameraAccessDeniedWithoutPrompt`: iOS, denied earlier, no prompt shown.
/// - `CameraAccessRestricted`: iOS parental controls / MDM.
CameraStatus statusForCameraError(CameraException error) {
  switch (error.code) {
    case 'CameraAccessDenied':
      return CameraStatus.permissionDenied;
    case 'CameraAccessDeniedWithoutPrompt':
    case 'CameraAccessRestricted':
      return CameraStatus.permissionBlocked;
    default:
      return CameraStatus.error;
  }
}
