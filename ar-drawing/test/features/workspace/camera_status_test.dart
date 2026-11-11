import 'package:camera/camera.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/workspace/camera_status.dart';

void main() {
  test('maps plugin error codes to workspace states', () {
    CameraStatus of(String code) => statusForCameraError(CameraException(code, null));

    expect(of('CameraAccessDenied'), CameraStatus.permissionDenied);
    expect(of('CameraAccessDeniedWithoutPrompt'), CameraStatus.permissionBlocked);
    expect(of('CameraAccessRestricted'), CameraStatus.permissionBlocked);
    expect(of('cameraNotReadable'), CameraStatus.error);
  });
}
