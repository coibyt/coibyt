import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../logic/real_examples.dart';
import '../../tutor/teacher_avatar.dart';

/// Danh mục ví dụ trong cuộc sống (đọc một lần).
class RealExamples {
  static Future<Map<String, List<RealExample>>>? _cache;

  static Future<Map<String, List<RealExample>>> load([AssetBundle? bundle]) => _cache ??= () async {
    try {
      // load + utf8.decode (loadString tách luồng riêng với tệp > 50 KB → chậm hơn, và treo trong kiểm thử).
      final data = await (bundle ?? rootBundle).load(realExamplesPath);
      final raw = utf8.decode(data.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes));
      return parseRealExamples(jsonDecode(raw) as Map<String, dynamic>);
    } on Object {
      return <String, List<RealExample>>{};
    }
  }();

  /// Chỉ dùng trong kiểm thử.
  static void reset() => _cache = null;
}

/// Tranh ví dụ trong cuộc sống: lúc cô giảng, tranh phóng to về chỗ cô chỉ,
/// que chỉ của cô đặt đúng chỗ đó và một vòng sáng nhấp nháy quanh.
class RealExampleView extends StatelessWidget {
  const RealExampleView({super.key, required this.example, this.active = false, this.pointAt, this.reached = true});

  final RealExample example;
  final bool active;
  final PointAt? pointAt;
  final bool reached;

  @override
  Widget build(BuildContext context) {
    final at = active ? pointAt : null;
    final focus = at != null && at != PointAt.all;
    final align = Alignment(((at?.x ?? 0.5) * 2) - 1, ((at?.y ?? 0.5) * 2) - 1);
    return AnimatedOpacity(
      duration: const Duration(milliseconds: 350),
      opacity: reached ? 1 : 0.4,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        margin: const EdgeInsets.only(bottom: 14),
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          gradient: const LinearGradient(colors: [Color(0xFFFFE08A), Color(0xFFFFB85C), Color(0xFFFF8FB1)]),
          boxShadow: active
              ? const [BoxShadow(color: Color(0x99FFB800), blurRadius: 22, spreadRadius: 2)]
              : const [BoxShadow(color: Color(0x22000000), blurRadius: 8, offset: Offset(0, 3))],
        ),
        child: Container(
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(19)),
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              AspectRatio(
                aspectRatio: 4 / 3,
                child: LayoutBuilder(
                  builder: (context, box) {
                    final p = Offset(box.maxWidth * (at?.x ?? 0.5), box.maxHeight * (at?.y ?? 0.5));
                    return Stack(
                      clipBehavior: Clip.hardEdge,
                      children: [
                        Positioned.fill(
                          child: AnimatedScale(
                            // Phóng to về chỗ cô chỉ (chỗ đó đứng yên khi phóng to).
                            scale: focus ? 1.22 : 1,
                            alignment: align,
                            duration: const Duration(milliseconds: 900),
                            curve: Curves.easeInOutCubic,
                            child: Image.asset(
                              example.image,
                              fit: BoxFit.cover,
                              errorBuilder: (_, _, _) => Container(
                                color: const Color(0xFFFFF3D6),
                                alignment: Alignment.center,
                                child: const Icon(Icons.image_rounded, size: 64, color: Color(0xFFFFB85C)),
                              ),
                            ),
                          ),
                        ),
                        const Positioned(left: 10, top: 10, child: _Chip()),
                        if (at != null)
                          AnimatedPositioned(
                            key: const ValueKey('example-pointer'),
                            duration: const Duration(milliseconds: 650),
                            curve: Curves.easeOutBack,
                            left: p.dx - 40,
                            top: p.dy - 40,
                            child: _Pointer(whole: !focus),
                          ),
                      ],
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(14, 10, 14, 12),
                child: Row(
                  children: [
                    const Icon(Icons.lightbulb_rounded, color: Color(0xFFFFB800), size: 22),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        example.title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF5A3A00)),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip();

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
    decoration: BoxDecoration(
      color: const Color(0xE61E4D38),
      borderRadius: BorderRadius.circular(14),
      boxShadow: const [BoxShadow(color: Color(0x33000000), blurRadius: 6)],
    ),
    child: const Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.photo_camera_rounded, color: Color(0xFFFFE08A), size: 16),
        SizedBox(width: 5),
        Text(
          'Ví dụ trong cuộc sống',
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w800, color: Colors.white),
        ),
      ],
    ),
  );
}

/// Que chỉ của cô + vòng sáng nhấp nháy tại điểm chỉ (tâm ô 80×80).
class _Pointer extends StatefulWidget {
  const _Pointer({required this.whole});

  /// Cô nói về cả bức tranh: chỉ hiện vòng sáng nhẹ ở giữa, không có que.
  final bool whole;

  @override
  State<_Pointer> createState() => _PointerState();
}

class _PointerState extends State<_Pointer> with SingleTickerProviderStateMixin {
  late final AnimationController _c = AnimationController(vsync: this, duration: const Duration(milliseconds: 1100));

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final motion = TeacherAvatar.motionEnabled && !(MediaQuery.maybeDisableAnimationsOf(context) ?? false);
    if (motion && !_c.isAnimating) {
      _c.repeat();
    } else if (!motion) {
      _c.value = 0.5;
    }
  }

  @override
  void dispose() {
    _c.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => SizedBox(
    width: 80,
    height: 80,
    child: AnimatedBuilder(
      animation: _c,
      builder: (context, _) {
        final t = _c.value;
        final tap = math.sin(t * math.pi * 2) * 4; // que gõ nhẹ vào tranh
        return Stack(
          clipBehavior: Clip.none,
          alignment: Alignment.center,
          children: [
            for (final d in [0.0, 0.5])
              Opacity(
                opacity: (1 - ((t + d) % 1)) * 0.9,
                child: Container(
                  width: 18 + 56 * ((t + d) % 1),
                  height: 18 + 56 * ((t + d) % 1),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    border: Border.all(color: const Color(0xFFFFD84D), width: 4),
                  ),
                ),
              ),
            Container(
              width: 16,
              height: 16,
              decoration: const BoxDecoration(
                shape: BoxShape.circle,
                color: Color(0xFFFFE680),
                boxShadow: [BoxShadow(color: Color(0xCCFFB800), blurRadius: 12, spreadRadius: 4)],
              ),
            ),
            if (!widget.whole)
              Positioned(
                // Đầu que (góc trên trái của ảnh que) chạm vào điểm chỉ.
                left: 30 + tap,
                top: 30 + tap,
                child: Image.asset(
                  'assets/ui/pointer.webp',
                  width: 92,
                  height: 92,
                  errorBuilder: (_, _, _) => Transform.rotate(
                    angle: -0.5,
                    child: const Icon(Icons.touch_app_rounded, size: 52, color: Color(0xFFE07A00)),
                  ),
                ),
              ),
          ],
        );
      },
    ),
  );
}
