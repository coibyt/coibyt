import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';

/// Các khung hình của cô giáo. Mỗi khung là một ảnh PNG nền trong suốt, CÙNG
/// kích thước và CÙNG vị trí nhân vật (chỉ khác mặt/tay), đặt trong assets/tutor/.
enum TeacherPose {
  /// Đứng yên mỉm cười, ngậm miệng (khung gốc).
  idle,

  /// Như [idle] nhưng nhắm mắt (để chớp mắt).
  blink,

  /// Như [idle] nhưng mở miệng (khớp khẩu hình).
  talk,

  /// Suy nghĩ / động viên (tay chống cằm).
  think,

  /// [think] mở miệng (tuỳ chọn).
  thinkTalk,

  /// Vỗ tay khen ngợi.
  clap,

  /// [clap] mở miệng (tuỳ chọn).
  clapTalk;

  String get fileStem => switch (this) {
    TeacherPose.thinkTalk => 'think_talk',
    TeacherPose.clapTalk => 'clap_talk',
    _ => name,
  };
}

/// Vật phẩm giao diện tạo bằng Kie.ai (tuỳ chọn; thiếu thì app tự vẽ).
enum UiAsset { coin, star, chalkboard, ruler, button }

/// Tự nhận ảnh có trong gói app. Thiếu ảnh nào thì dùng hình vẽ sẵn bằng code.
class TeacherAssets {
  TeacherAssets(this._available);

  static const tutorDir = 'assets/tutor/';
  static const uiDir = 'assets/ui/';

  /// Đặt trong main() sau khi nạp danh sách asset.
  static TeacherAssets instance = TeacherAssets(const {});

  final Set<String> _available;

  static Future<TeacherAssets> load([AssetBundle? bundle]) async {
    try {
      final manifest = await AssetManifest.loadFromAssetBundle(bundle ?? rootBundle);
      return TeacherAssets(manifest.listAssets().toSet());
    } on Object {
      return TeacherAssets(const {});
    }
  }

  String? _first(String stem) {
    for (final ext in const ['png', 'webp']) {
      final p = '$stem.$ext';
      if (_available.contains(p)) return p;
    }
    return null;
  }

  /// Đường dẫn ảnh của một khung (null = chưa có, dùng hình vẽ).
  String? pose(TeacherPose p) => _first('${tutorDir}teacher_${p.fileStem}');

  String? ui(UiAsset a) => _first('$uiDir${a.name}');

  /// Đủ bộ ảnh tối thiểu để dùng ảnh thật thay hình vẽ.
  bool get hasTeacherImages => pose(TeacherPose.idle) != null;

  /// Nạp sẵn mọi khung vào bộ nhớ để đổi khung khi nói không bị nháy.
  Future<void> precache(BuildContext context) async {
    for (final p in TeacherPose.values) {
      final path = pose(p);
      if (path != null) await precacheImage(AssetImage(path), context);
    }
  }
}
