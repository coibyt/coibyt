import 'package:flutter/material.dart';

import '../../logic/visual_story.dart';

/// Tranh minh hoạ một phép tính bằng đồ vật 3D (Kie.ai) — số lượng luôn đúng:
/// * a × b → b đĩa/giỏ/hộp, mỗi cái a đồ vật;  * a : b = c → chia đều vào b vật đựng;
/// * a + b → hai nhóm;  * a − b → gạch bớt;  * số lớn → khối trăm, thanh chục, khối đơn vị.
/// [lit]: nhóm đang được cô đếm (0..lit sáng, các nhóm sau mờ); null = sáng hết.
class VisualAid extends StatelessWidget {
  const VisualAid({super.key, required this.story, this.lit, this.compact = false});

  final AidStory story;
  final int? lit;
  final bool compact;

  /// Tranh cho "a op b = c"; null nếu không vẽ được.
  static VisualAid? forEquation(String text, {int? lit, bool compact = false}) {
    final s = aidStory(text);
    return s == null ? null : VisualAid(story: s, lit: lit, compact: compact);
  }

  static String _asset(String stem) => 'assets/ui/$stem.webp';

  Widget _img(String stem, double size, {Widget? fallback}) => Image.asset(
    _asset(stem),
    width: size,
    height: size,
    fit: BoxFit.contain,
    errorBuilder: (_, _, _) => fallback ?? Icon(Icons.circle, size: size * 0.7, color: Colors.orange),
  );

  @override
  Widget build(BuildContext context) {
    final s = story;
    final itemSize = compact ? 22.0 : 28.0;
    Widget group(int g) {
      final n = s.itemsIn(g);
      final on = lit == null || g <= lit!;
      final current = lit != null && g == lit;
      final crossedFrom = s.kind == 'sub' ? n - s.b : n;
      return AnimatedScale(
        scale: current ? 1.08 : 1,
        duration: const Duration(milliseconds: 250),
        child: AnimatedOpacity(
          opacity: on ? 1 : 0.3,
          duration: const Duration(milliseconds: 250),
          child: Container(
            width: compact ? 118 : 140,
            padding: const EdgeInsets.fromLTRB(4, 4, 4, 0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: current ? const Color(0xFFFFF1C2) : Colors.transparent,
              boxShadow: current ? const [BoxShadow(color: Color(0x88FFC93C), blurRadius: 14)] : const [],
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Wrap(
                  alignment: WrapAlignment.center,
                  spacing: 0,
                  runSpacing: 0,
                  children: [
                    for (var i = 0; i < n; i++)
                      Stack(
                        alignment: Alignment.center,
                        children: [
                          Opacity(opacity: i >= crossedFrom ? 0.3 : 1, child: _img('obj_${s.theme.item}', itemSize)),
                          if (i >= crossedFrom)
                            Icon(Icons.close_rounded, color: const Color(0xFFE5484D), size: itemSize),
                        ],
                      ),
                  ],
                ),
                Transform.translate(
                  offset: const Offset(0, -6),
                  child: _img('ctr_${s.theme.container}', compact ? 70 : 86, fallback: const SizedBox(height: 10)),
                ),
              ],
            ),
          ),
        ),
      );
    }

    final Widget art = s.kind == 'place'
        ? _PlaceValue(value: s.c)
        : Wrap(
            spacing: 6,
            runSpacing: 2,
            alignment: WrapAlignment.center,
            crossAxisAlignment: WrapCrossAlignment.end,
            children: [
              for (var g = 0; g < s.groups; g++) ...[
                if (s.kind == 'add' && g == 1)
                  const Padding(
                    padding: EdgeInsets.only(bottom: 40),
                    child: Text('+', style: TextStyle(fontSize: 30, fontWeight: FontWeight.w900)),
                  ),
                group(g),
              ],
            ],
          );
    return Container(
      key: const ValueKey('visual-aid'),
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [Color(0xFFFFFDF6), Color(0xFFFFF3D6)],
        ),
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFFFD66B), width: 2),
      ),
      child: Column(
        children: [
          const Row(
            children: [
              Icon(Icons.image_rounded, color: Color(0xFFE07A00), size: 20),
              SizedBox(width: 6),
              Text(
                'Tranh minh hoạ',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFFE07A00)),
              ),
            ],
          ),
          const SizedBox(height: 6),
          art,
          const SizedBox(height: 6),
          Text(
            s.caption,
            textAlign: TextAlign.center,
            style: TextStyle(fontSize: compact ? 14 : 16, fontWeight: FontWeight.w700),
          ),
        ],
      ),
    );
  }
}

/// Khối trăm (ô vuông 10×10), thanh chục, khối đơn vị — nghìn vẽ bằng khối lớn có chữ "1000".
class _PlaceValue extends StatelessWidget {
  const _PlaceValue({required this.value});

  final int value;

  @override
  Widget build(BuildContext context) {
    final t = value ~/ 1000, h = value ~/ 100 % 10, d = value ~/ 10 % 10, u = value % 10;
    Widget block(double w, double hgt, Color c, {String? label}) => Container(
      width: w,
      height: hgt,
      margin: const EdgeInsets.all(2),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: c,
        borderRadius: BorderRadius.circular(3),
        border: Border.all(color: Colors.black26),
        boxShadow: const [BoxShadow(color: Color(0x22000000), blurRadius: 2, offset: Offset(1, 1))],
      ),
      child: label == null ? null : Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900)),
    );
    return Wrap(
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.end,
      children: [
        for (var i = 0; i < t; i++) block(46, 46, const Color(0xFFB794F6), label: '1000'),
        for (var i = 0; i < h; i++) block(40, 40, const Color(0xFF63B3ED), label: '100'),
        for (var i = 0; i < d; i++) block(8, 40, const Color(0xFF68D391)),
        for (var i = 0; i < u; i++) block(9, 9, const Color(0xFFF6AD55)),
      ],
    );
  }
}
