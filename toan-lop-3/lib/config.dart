import 'package:flutter/foundation.dart';

/// Cấu hình lúc build (truyền bằng --dart-define=TEN=giatri). KHÔNG chứa bí mật.
abstract final class AppConfig {
  /// Cho phép bật VIP thử trong khu phụ huynh (bản debug, hoặc bản xem trước
  /// build với --dart-define=ALLOW_DEV_VIP=true). Bản phát hành: tắt.
  static const bool _devVipFlag = bool.fromEnvironment('ALLOW_DEV_VIP');
  static bool get allowDevVip => _devVipFlag || !kReleaseMode;
}
