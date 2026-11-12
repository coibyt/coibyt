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
  clapTalk,

  /// Chỉ tay lên bảng khi làm mẫu.
  point,

  /// [point] mở miệng.
  pointTalk;

  String get fileStem => switch (this) {
    TeacherPose.thinkTalk => 'think_talk',
    TeacherPose.clapTalk => 'clap_talk',
    TeacherPose.pointTalk => 'point_talk',
    _ => name,
  };
}

/// Vật phẩm giao diện tạo bằng Kie.ai (tuỳ chọn; thiếu thì app tự vẽ / dùng biểu tượng).
enum UiAsset {
  coin,
  star,
  heart,
  flame,
  chalkboard,
  chestClosed,
  chestOpen,
  tileLesson,
  tileExam,
  tileRank,
  tileShop,
  tileBadge,
  tileMission,
  examTuan,
  examKt15,
  exam1tiet,
  examGiuaki,
  examCuoiki,
  examOntap,
  tipSecret,
  tipMagic,
  tipBulb,
  advCrown,
  advBrain,
  advDaily,
  advLock,
  logoEmblem,
  objApple,
  objOrange,
  objCandy,
  objPencil,
  objCupcake,
  objFlower,
  ctrPlate,
  ctrBasket,
  ctrBox,
  ctrVase,
  balloonRed,
  balloonBlue,
  balloonYellow,
  balloonGreen,
  gameTrophy,
  abSo,
  abCongtru,
  abNhanchia,
  abHinh,
  abDoluong,
  abRocket,
  ruler,
  button;

  /// Tên file: chestClosed → chest_closed
  String get fileStem => name.replaceAllMapped(RegExp('[A-Z]'), (m) => '_${m[0]!.toLowerCase()}');
}

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

  String? ui(UiAsset a) => _first('$uiDir${a.fileStem}');

  /// Ảnh thú cưng (`assets/pets/<id>.webp`).
  String? pet(String id) => _first('assets/pets/$id');

  /// Hình nền (`assets/bg/<name>.webp`), vd 'home', 'lesson'.
  String? background(String name) => _first('assets/bg/$name');

  /// Huy hiệu hạng năng lực 1–4 (`assets/ui/ab_rank_<n>.webp`).
  String? abilityRank(int n) => _first('${uiDir}ab_rank_$n');

  /// Tranh minh hoạ của một bài (`assets/illus/<lessonId>.webp`); null = chưa có.
  String? lessonIllustration(String lessonId) => _first('assets/illus/$lessonId');

  /// Ảnh bìa chủ đề thứ [order] (`assets/chapters/<order>.webp`).
  String? chapter(int order) => _first('assets/chapters/$order');

  /// Đủ bộ ảnh tối thiểu để dùng ảnh thật thay hình vẽ.
  bool get hasTeacherImages => pose(TeacherPose.idle) != null;

  /// Nạp sẵn mọi khung vào bộ nhớ để đổi khung khi nói không bị nháy.
  Future<void> precache(BuildContext context) async {
    for (final p in TeacherPose.values) {
      final path = pose(p);
      if (path != null && context.mounted) await precacheImage(AssetImage(path), context);
    }
  }
}
