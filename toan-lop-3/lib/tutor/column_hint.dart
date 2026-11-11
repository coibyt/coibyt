import 'package:flutter/material.dart';

import '../logic/tutor.dart';
import '../models/blocks.dart';
import '../ui/app_theme.dart';
import 'teacher_avatar.dart';

/// Phép tính đặt sẵn theo cột (KHÔNG có kết quả) với cột cần tính trước nháy sáng:
/// cột hàng đơn vị (cộng/trừ/nhân) hoặc chữ số hàng chục đầu tiên của số bị chia.
class ColumnHintCard extends StatefulWidget {
  const ColumnHintCard({super.key, required this.focus});

  final ColumnFocus focus;

  @override
  State<ColumnHintCard> createState() => _ColumnHintCardState();
}

class _ColumnHintCardState extends State<ColumnHintCard> with SingleTickerProviderStateMixin {
  late final AnimationController _pulse = AnimationController(vsync: this, duration: const Duration(milliseconds: 650));

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final reduce = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    if (TeacherAvatar.motionEnabled && !reduce) {
      // Nháy 4 lần rồi đứng yên ở trạng thái sáng.
      _pulse.repeat(reverse: true, count: 4).whenComplete(() {
        if (mounted) _pulse.value = 1;
      });
    } else {
      _pulse.value = 1;
    }
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  static const _cell = 34.0;

  Widget _cell_(String c, {bool lit = false, Color color = AppColors.ink}) => AnimatedBuilder(
    animation: _pulse,
    builder: (context, _) => Container(
      width: _cell,
      height: 44,
      alignment: Alignment.center,
      decoration: lit
          ? BoxDecoration(
              color: Color.lerp(AppColors.honeySoft, const Color(0xFFFFD84D), _pulse.value),
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(color: const Color(0xFFFFC93C).withValues(alpha: 0.6 * _pulse.value), blurRadius: 12),
              ],
            )
          : null,
      child: Text(
        c,
        style: TextStyle(fontSize: 30, fontWeight: FontWeight.w700, color: color),
      ),
    ),
  );

  @override
  Widget build(BuildContext context) {
    final (Widget figure, String caption) = switch (widget.focus) {
      ColumnFocusArithmetic(:final block) => (_arith(block), 'Cột hàng đơn vị: tính trước!'),
      ColumnFocusDivision(:final block) => (_division(block), 'Chia từ hàng chục trước!'),
    };
    return Container(
      key: const ValueKey('column-hint'),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: AppColors.honey, width: 3),
      ),
      child: Column(
        children: [
          Text(
            caption,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700, color: AppColors.tryAgain),
          ),
          const SizedBox(height: 6),
          figure,
        ],
      ),
    );
  }

  Widget _arith(ColumnArithmeticBlock b) {
    final digits = [...b.operands.map((o) => o.length), b.result.length].reduce((a, c) => a > c ? a : c);
    final width = digits + 1;
    List<String> aligned(String s) => [...List.filled(width - s.length, ''), ...s.split('')];
    Widget row(List<String> cells, {bool underline = false}) => Container(
      decoration: underline
          ? const BoxDecoration(
              border: Border(bottom: BorderSide(color: AppColors.ink, width: 3)),
            )
          : null,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [for (var c = 0; c < width; c++) _cell_(cells[c], lit: c == width - 1)],
      ),
    );
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        for (final (i, o) in b.operands.indexed)
          row([if (i == 1) b.operation.symbol else '', ...aligned(o).skip(1)], underline: i == b.operands.length - 1),
        row([...List.filled(width - 1, ''), '?']),
      ],
    );
  }

  Widget _division(LongDivisionBlock b) {
    final firstLen = '${b.digitSteps.first.partialDividend}'.length;
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var i = 0; i < b.dividend.length; i++) _cell_(b.dividend[i], lit: i < firstLen),
        Container(width: 3, height: 44, color: AppColors.ink, margin: const EdgeInsets.symmetric(horizontal: 6)),
        _cell_(b.divisor),
      ],
    );
  }
}
