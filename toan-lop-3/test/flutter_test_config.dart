import 'dart:async';

import 'package:toan_lop_3/tutor/teacher_avatar.dart';

/// Chạy trước mọi file test: tắt chuyển động lặp vô hạn của cô giáo (nhịp thở,
/// chớp mắt, nháy sáng, tiền bay) để pumpAndSettle không bị treo. Test riêng của
/// cô giáo tự bật lại khi cần.
Future<void> testExecutable(FutureOr<void> Function() testMain) async {
  TeacherAvatar.motionEnabled = false;
  await testMain();
}
