import 'package:flutter/material.dart';

import '../../models/blocks.dart';
import '../app_theme.dart';

const _cell = 32.0;
const _digit = TextStyle(fontSize: 30, fontWeight: FontWeight.w700, height: 1.2);
const _carryStyle = TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: AppColors.tryAgain);

Widget _digitCell(String c, {Color color = AppColors.ink, Color? bg, bool underline = false}) => Container(
      width: _cell,
      height: 42,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: bg,
        border: underline ? const Border(bottom: BorderSide(color: AppColors.ink, width: 2.5)) : null,
      ),
      child: Text(c, style: _digit.copyWith(color: color)),
    );

/// Nút điều khiển bước: Lùi · Bước tiếp · Xem hết.
class _StepControls extends StatelessWidget {
  const _StepControls({
    required this.step,
    required this.total,
    required this.onBack,
    required this.onNext,
    required this.onAll,
  });

  final int step;
  final int total;
  final VoidCallback onBack;
  final VoidCallback onNext;
  final VoidCallback onAll;

  @override
  Widget build(BuildContext context) {
    final done = step >= total;
    return Wrap(
      spacing: 8,
      runSpacing: 8,
      alignment: WrapAlignment.center,
      crossAxisAlignment: WrapCrossAlignment.center,
      children: [
        IconButton.filledTonal(
          key: const ValueKey('step-back'),
          iconSize: 30,
          tooltip: 'Lùi lại',
          onPressed: step == 0 ? null : onBack,
          icon: const Icon(Icons.arrow_back_rounded),
        ),
        if (!done)
          FilledButton.icon(
            key: const ValueKey('step-next'),
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.sky,
              minimumSize: const Size(160, 56),
              textStyle: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700, fontFamily: 'Andika'),
            ),
            onPressed: onNext,
            icon: const Icon(Icons.play_arrow_rounded, size: 30),
            label: Text(step == 0 ? 'Bắt đầu' : 'Bước tiếp'),
          )
        else
          const Chip(
            avatar: Icon(Icons.check_circle, color: AppColors.good),
            label: Text('Xong!', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          ),
        if (!done)
          TextButton(
            key: const ValueKey('step-all'),
            onPressed: onAll,
            child: const Text('Xem hết', style: TextStyle(fontSize: 18)),
          ),
        Text('$step/$total', style: const TextStyle(fontSize: 16, color: Colors.black54)),
      ],
    );
  }
}

class _Narration extends StatelessWidget {
  const _Narration({required this.lines, required this.shown, required this.intro});

  final List<String> lines;
  final int shown;
  final String intro;

  @override
  Widget build(BuildContext context) {
    if (shown == 0) {
      return Text(intro, style: const TextStyle(fontSize: 19, height: 1.35, color: Colors.black87));
    }
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        for (var i = 0; i < shown; i++)
          Container(
            margin: const EdgeInsets.only(bottom: 6),
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 6),
            decoration: BoxDecoration(
              color: i == shown - 1 ? AppColors.honeySoft : Colors.transparent,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 14,
                  backgroundColor: i == shown - 1 ? AppColors.sky : Colors.black26,
                  child: Text('${i + 1}', style: const TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.w700)),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    lines[i],
                    style: TextStyle(
                      fontSize: 20,
                      height: 1.35,
                      fontWeight: i == shown - 1 ? FontWeight.w700 : FontWeight.w400,
                      color: i == shown - 1 ? AppColors.ink : Colors.black54,
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _Frame extends StatelessWidget {
  const _Frame({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) => Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.skySoft, width: 3),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: children),
      );
}

/// Mixin quản lý bước hiện tại.
mixin _Stepping<T extends StatefulWidget> on State<T> {
  int step = 0;
  int get totalSteps;

  Widget controls() => _StepControls(
        step: step,
        total: totalSteps,
        onBack: () => setState(() => step--),
        onNext: () => setState(() => step++),
        onAll: () => setState(() => step = totalSteps),
      );
}

// ===========================================================================
// Đặt tính cộng / trừ / nhân — hiện từng chữ số
// ===========================================================================

class ColumnStepper extends StatefulWidget {
  const ColumnStepper({super.key, required this.block, this.startAtEnd = false});

  final ColumnArithmeticBlock block;

  /// Hiện sẵn toàn bộ (dùng cho phần lý thuyết in ra / ảnh chụp).
  final bool startAtEnd;

  @override
  State<ColumnStepper> createState() => _ColumnStepperState();
}

class _ColumnStepperState extends State<ColumnStepper> with _Stepping {
  ColumnArithmeticBlock get b => widget.block;

  @override
  int get totalSteps => b.digitSteps.length;

  @override
  void initState() {
    super.initState();
    if (widget.startAtEnd) step = totalSteps;
  }

  @override
  Widget build(BuildContext context) {
    final digits = [...b.operands.map((o) => o.length), b.result.length].reduce((a, c) => a > c ? a : c);
    final width = digits + 1;
    int col(int place) => width - 1 - place;

    // Chữ số kết quả và số nhớ đã hiện tới bước hiện tại.
    final resultCells = List<String>.filled(width, '');
    final carryCells = List<String>.filled(width, '');
    final highlight = <int>{};
    for (var p = 0; p < step; p++) {
      final s = b.digitSteps[p];
      final w = s.write;
      for (var j = 0; j < w.length; j++) {
        final c = col(p + (w.length - 1 - j));
        if (c >= 0) resultCells[c] = w[j];
        if (p == step - 1 && c >= 0) highlight.add(c);
      }
      if (s.carry > 0 && p + 1 < totalSteps) carryCells[col(p + 1)] = '+${s.carry}';
    }
    if (step > 0 && step <= totalSteps) highlight.add(col(step - 1));

    List<String> aligned(String s) => [...List.filled(width - s.length, ''), ...s.split('')];

    Widget row(List<String> cells, {Color color = AppColors.ink, bool underline = false}) => Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var c = 0; c < width; c++)
              _digitCell(
                cells[c],
                color: color,
                bg: highlight.contains(c) ? AppColors.honeySoft : null,
                underline: underline,
              ),
          ],
        );

    final carryRow = Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (var c = 0; c < width; c++)
          SizedBox(
            width: _cell,
            height: 22,
            child: Text(carryCells[c], textAlign: TextAlign.center, style: _carryStyle),
          ),
      ],
    );

    return _Frame(children: [
      const Text('Đặt tính rồi tính:', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
      const SizedBox(height: 6),
      Center(
        child: Semantics(
          label: '${b.operands.join(' ${b.operation.symbol} ')} bằng ${b.result}',
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              // Số nhớ (nhỏ, màu cam): cộng/nhân ghi trên đầu cột; trừ ghi cạnh số trừ
              // (vì "nhớ 1" được cộng vào chữ số của số trừ ở hàng kế tiếp).
              if (b.operation != ColumnOperation.subtract) carryRow,
              for (final (i, o) in b.operands.indexed) ...[
                if (i == 1 && b.operation == ColumnOperation.subtract) carryRow,
                row(
                  [
                    if (i == 1) b.operation.symbol else '',
                    ...aligned(o).skip(1),
                  ],
                  underline: i == b.operands.length - 1,
                ),
              ],
              row(resultCells, color: AppColors.good),
            ],
          ),
        ),
      ),
      const SizedBox(height: 8),
      _Narration(
        lines: [for (final s in b.digitSteps) s.text],
        shown: step,
        intro: 'Viết các số thẳng cột: hàng đơn vị thẳng hàng đơn vị, hàng chục thẳng hàng chục. '
            'Tính từ phải sang trái.',
      ),
      const SizedBox(height: 6),
      controls(),
    ]);
  }
}

// ===========================================================================
// Phép chia đặt tính — hiện từng lượt chia
// ===========================================================================

class DivisionStepper extends StatefulWidget {
  const DivisionStepper({super.key, required this.block, this.startAtEnd = false});

  final LongDivisionBlock block;
  final bool startAtEnd;

  @override
  State<DivisionStepper> createState() => _DivisionStepperState();
}

class _DivisionStepperState extends State<DivisionStepper> with _Stepping {
  LongDivisionBlock get b => widget.block;

  @override
  int get totalSteps => b.digitSteps.length;

  @override
  void initState() {
    super.initState();
    if (widget.startAtEnd) step = totalSteps;
  }

  @override
  Widget build(BuildContext context) {
    final width = b.dividend.length;
    final steps = b.digitSteps;
    final firstEnd = '${steps.first.partialDividend}'.length - 1;
    int endCol(int i) => firstEnd + i;

    List<String> placed(int value, int end) {
      final s = '$value';
      final cells = List<String>.filled(width, '');
      for (var j = 0; j < s.length; j++) {
        final c = end - (s.length - 1 - j);
        if (c >= 0 && c < width) cells[c] = s[j];
      }
      return cells;
    }

    Widget row(List<String> cells, {bool underline = false, Set<int> hl = const {}, Color color = AppColors.ink}) => Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var c = 0; c < width; c++)
              _digitCell(cells[c], underline: underline && cells[c].isNotEmpty, bg: hl.contains(c) ? AppColors.honeySoft : null, color: color),
          ],
        );

    final leftRows = <Widget>[row(b.dividend.split(''), hl: step == 0 ? const {} : {endCol(step - 1)})];
    for (var i = 0; i < step; i++) {
      leftRows.add(row(placed(steps[i].product, endCol(i)), underline: true));
      if (i + 1 < totalSteps) {
        leftRows.add(row(placed(steps[i + 1].partialDividend, endCol(i + 1))));
      } else {
        leftRows.add(row(placed(steps[i].remainder, endCol(i)), color: AppColors.good));
      }
    }
    final quotientShown = [for (var i = 0; i < step; i++) '${steps[i].quotientDigit}'];

    return _Frame(children: [
      const Text('Đặt tính rồi tính:', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
      const SizedBox(height: 6),
      Center(
        child: Semantics(
          label: '${b.dividend} chia ${b.divisor} được ${b.quotient}${b.remainder > 0 ? ', dư ${b.remainder}' : ''}',
          child: IntrinsicHeight(
            child: Row(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: leftRows),
                Container(width: 3, color: AppColors.ink, margin: const EdgeInsets.only(left: 4)),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(children: [const SizedBox(width: 6), _digitCell(b.divisor)]),
                    Container(height: 3, width: _cell * (b.quotient.length + 1), color: AppColors.ink),
                    Row(
                      children: [
                        const SizedBox(width: 6),
                        for (final d in quotientShown) _digitCell(d, color: AppColors.good),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
      const SizedBox(height: 8),
      _Narration(
        lines: [for (final s in steps) s.text],
        shown: step,
        intro: 'Viết số bị chia bên trái, số chia bên phải. Chia lần lượt từ trái sang phải.',
      ),
      if (step == totalSteps && b.remainder > 0)
        Text('Số dư: ${b.remainder}', style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
      const SizedBox(height: 6),
      controls(),
    ]);
  }
}
