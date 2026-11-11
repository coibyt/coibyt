import 'package:flutter/material.dart';

/// Bảng màu tươi sáng, tương phản tốt (chữ đậm trên nền kem).
abstract final class AppColors {
  static const ink = Color(0xFF2D3142); // chữ chính
  static const cream = Color(0xFFFFF8E7); // nền
  static const honey = Color(0xFFFFC93C); // màu thương hiệu (ong vàng)
  static const honeySoft = Color(0xFFFFF0C2);
  static const sky = Color(0xFF3A86FF); // hành động phụ / ô đang chọn
  static const skySoft = Color(0xFFE3EEFF);
  static const good = Color(0xFF2EB872); // đúng
  static const goodSoft = Color(0xFFDDF6E9);
  // "Chưa đúng" dùng CAM ấm, không dùng đỏ gắt → bé không sợ sai.
  static const tryAgain = Color(0xFFFF9F43);
  static const tryAgainSoft = Color(0xFFFFEBD6);
  static const vip = Color(0xFF8E5CF7);
  static const card = Colors.white;
  static const pairColors = [
    Color(0xFF3A86FF),
    Color(0xFFFF6FB5),
    Color(0xFF2EB872),
    Color(0xFF8E5CF7),
    Color(0xFFFF9F43),
    Color(0xFF00B8D9),
  ];
}

/// Kích thước dành cho ngón tay trẻ 8–9 tuổi.
abstract final class AppSizes {
  static const minTouch = 64.0; // nút chính cao ≥ 64dp (khuyến nghị tối thiểu 48dp)
  static const radius = 20.0;
  static const promptFont = 26.0;
  static const bodyFont = 21.0;
}

ThemeData buildAppTheme() {
  final base = ThemeData(
    useMaterial3: true,
    fontFamily: 'Andika',
    colorScheme: ColorScheme.fromSeed(seedColor: AppColors.honey, primary: AppColors.sky, surface: AppColors.cream),
    scaffoldBackgroundColor: AppColors.cream,
  );
  // Lưu ý: apply(fontFamily) phải đứng SAU copyWith, nếu không các kiểu chữ
  // vừa thay sẽ mất font Andika và rơi về Roboto.
  final textTheme = base.textTheme
      .copyWith(
        bodyLarge: const TextStyle(fontSize: AppSizes.bodyFont, height: 1.4),
        bodyMedium: const TextStyle(fontSize: 19, height: 1.4),
        titleLarge: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700),
        titleMedium: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700),
      )
      .apply(bodyColor: AppColors.ink, displayColor: AppColors.ink, fontFamily: 'Andika');
  return base.copyWith(
    textTheme: textTheme,
    primaryTextTheme: base.primaryTextTheme.apply(fontFamily: 'Andika'),
  );
}
