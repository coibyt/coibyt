import 'package:flutter/foundation.dart';

/// Cấu hình lúc build (truyền bằng --dart-define=TEN=giatri). KHÔNG chứa bí mật.
abstract final class AppConfig {
  /// Cho phép bật VIP thử trong khu phụ huynh (bản debug, hoặc bản xem trước
  /// build với --dart-define=ALLOW_DEV_VIP=true). Bản phát hành: tắt.
  static const bool _devVipFlag = bool.fromEnvironment('ALLOW_DEV_VIP');
  static bool get allowDevVip => _devVipFlag || !kReleaseMode;

  /// Địa chỉ máy chủ API, vd https://api.ten-mien-cua-ban.vn
  /// Bỏ trống = app chạy offline hoàn toàn (không đăng nhập/đồng bộ).
  static const String apiBaseUrl = String.fromEnvironment('API_BASE_URL');
  static bool get hasApi => apiBaseUrl.isNotEmpty;
}
