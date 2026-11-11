import 'package:flutter/material.dart';

import '../../tutor/teacher_assets.dart';
import 'game_art.dart';

/// Tranh minh hoạ cho một phép tính mẫu, vẽ bằng hình 3D có sẵn — số lượng luôn đúng:
/// * a × b (Việt Nam: a được lấy b lần) → b nhóm, mỗi nhóm a ngôi sao;
/// * a : b = c → a quả chia đều vào b hộp, mỗi hộp c;
/// * a + b, a − b (≤ 20) → hai nhóm / gạch bớt;
/// * số lớn hơn → khối trăm, thanh chục, khối đơn vị của kết quả.
class VisualAid extends StatelessWidget {
  const VisualAid._({required this.kind, required this.a, required this.b, required this.c});

  final String kind;
  final int a;
  final int b;
  final int c;

  static final _re = RegExp(r'^\s*([\d.]+)\s*([+\-−×x*:÷])\s*([\d.]+)\s*=\s*([\d.]+)\s*$');

  /// Tranh cho "a op b = c"; null nếu không vẽ được (biểu thức dài, số quá lớn…).
  static VisualAid? forEquation(String text) {
    final m = _re.firstMatch(text);
    if (m == null) return null;
    int n(String s) => int.parse(s.replaceAll('.', ''));
    final (a, b, c) = (n(m[1]!), n(m[3]!), n(m[4]!));
    final op = m[2]!;
    if ((op == '×' || op == 'x' || op == '*') && a <= 10 && b <= 10 && a * b <= 60) {
      return VisualAid._(kind: 'mul', a: a, b: b, c: c);
    }
    if ((op == ':' || op == '÷') && a <= 60 && b >= 1 && b <= 10 && c * b <= a) {
      return VisualAid._(kind: 'div', a: a, b: b, c: c);
    }
    if (op == '+' && a + b <= 20) return VisualAid._(kind: 'add', a: a, b: b, c: c);
    if ((op == '-' || op == '−') && a <= 20) return VisualAid._(kind: 'sub', a: a, b: b, c: c);
    if (c > 0 && c < 10000) return VisualAid._(kind: 'place', a: a, b: b, c: c);
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final (Widget art, String caption) = switch (kind) {
      'mul' => (
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [for (var g = 0; g < b; g++) _group(a, UiAsset.star, const Color(0xFFFFF4D6))],
        ),
        '$b nhóm, mỗi nhóm $a ngôi sao: $a được lấy $b lần, tất cả có $c.',
      ),
      'div' => (
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [for (var g = 0; g < b; g++) _group(c, UiAsset.coin, const Color(0xFFE8F1FF))],
        ),
        '$a đồng vàng chia đều vào $b hộp, mỗi hộp được $c.',
      ),
      'add' => (
        Wrap(
          spacing: 10,
          alignment: WrapAlignment.center,
          crossAxisAlignment: WrapCrossAlignment.center,
          children: [
            _group(a, UiAsset.star, const Color(0xFFFFF4D6)),
            const Text('+', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w900)),
            _group(b, UiAsset.heart, const Color(0xFFFFE3EA)),
          ],
        ),
        'Gộp $a và $b được $c.',
      ),
      'sub' => (
        _group(a, UiAsset.star, const Color(0xFFFFF4D6), crossed: b),
        'Có $a, bớt đi $b (gạch chéo), còn lại $c.',
      ),
      _ => (_PlaceValue(value: c), _placeCaption(c)),
    };
    return Container(
      key: const ValueKey('visual-aid'),
      margin: const EdgeInsets.only(top: 8),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFCFE3FF), width: 2),
      ),
      child: Column(
        children: [
          const Row(
            children: [
              Icon(Icons.image_rounded, color: Color(0xFF3A86FF), size: 20),
              SizedBox(width: 6),
              Text(
                'Tranh minh hoạ',
                style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: Color(0xFF3A86FF)),
              ),
            ],
          ),
          const SizedBox(height: 8),
          art,
          const SizedBox(height: 8),
          Text(
            caption,
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700),
          ),
        ],
      ),
    );
  }

  static String _placeCaption(int v) {
    final t = v ~/ 1000, h = v ~/ 100 % 10, d = v ~/ 10 % 10, u = v % 10;
    return [
      if (t > 0) '$t nghìn',
      if (t > 0 || h > 0) '$h trăm',
      if (t > 0 || h > 0 || d > 0) '$d chục',
      '$u đơn vị',
    ].join(', ').replaceFirst(RegExp(r'^'), 'Kết quả gồm ');
  }

  Widget _group(int count, UiAsset art, Color bg, {int crossed = 0}) => Container(
    padding: const EdgeInsets.all(6),
    decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(12)),
    constraints: const BoxConstraints(maxWidth: 150),
    child: Wrap(
      spacing: 2,
      runSpacing: 2,
      children: [
        for (var i = 0; i < count; i++)
          Stack(
            alignment: Alignment.center,
            children: [
              Opacity(
                opacity: i >= count - crossed ? 0.35 : 1,
                child: GameIcon(art, size: 24, fallback: const Icon(Icons.circle, size: 18, color: Colors.orange)),
              ),
              if (i >= count - crossed) const Icon(Icons.close_rounded, color: Color(0xFFE5484D), size: 24),
            ],
          ),
      ],
    ),
  );
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
