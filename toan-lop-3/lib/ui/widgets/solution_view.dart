import 'package:flutter/material.dart';

import '../../models/blocks.dart';
import '../../models/problem.dart';
import '../app_theme.dart';

/// Nội dung "Xem lời giải": đáp án + các bước (hoặc khoá VIP).
class SolutionPanel extends StatelessWidget {
  const SolutionPanel({super.key, required this.problem, required this.locked});

  final Problem problem;

  /// Lời giải chi tiết dành cho VIP và người dùng chưa phải VIP.
  final bool locked;

  @override
  Widget build(BuildContext context) {
    final solution = problem.solution;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.goodSoft,
            borderRadius: BorderRadius.circular(AppSizes.radius),
          ),
          child: Row(
            children: [
              const Icon(Icons.check_circle, color: AppColors.good, size: 32),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  'Đáp án: ${solution.answerText}',
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        if (locked)
          const _VipLockCard()
        else
          for (final (i, step) in solution.steps.indexed)
            Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: BlockView(block: step, key: ValueKey('step-$i')),
            ),
      ],
    );
  }
}

class _VipLockCard extends StatelessWidget {
  const _VipLockCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: AppColors.vip.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(AppSizes.radius),
        border: Border.all(color: AppColors.vip, width: 2),
      ),
      child: const Row(
        children: [
          Icon(Icons.lock_rounded, color: AppColors.vip, size: 36),
          SizedBox(width: 12),
          Expanded(
            child: Text(
              'Lời giải từng bước dành cho tài khoản VIP. Con nhờ bố mẹ mở khoá nhé!',
              style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700),
            ),
          ),
        ],
      ),
    );
  }
}

/// Vẽ một khối nội dung (lý thuyết hoặc bước giải).
class BlockView extends StatelessWidget {
  const BlockView({super.key, required this.block});

  final ContentBlock block;

  @override
  Widget build(BuildContext context) {
    return switch (block) {
      TextBlock(:final text, :final style) => _TextBlockView(text: text, style: style),
      EquationBlock(:final text) => Text(
          text,
          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w700, color: AppColors.sky),
        ),
      final ColumnArithmeticBlock b => ColumnArithmeticView(block: b),
      final LongDivisionBlock b => LongDivisionView(block: b),
      final WordProblemBlock b => WordProblemView(block: b),
      ImageBlock(:final image) => Semantics(
          label: image.alt,
          child: Image.asset(
            image.src,
            errorBuilder: (_, _, _) => Text('[Ảnh: ${image.alt}]'),
          ),
        ),
    };
  }
}

class _TextBlockView extends StatelessWidget {
  const _TextBlockView({required this.text, required this.style});

  final String text;
  final TextBlockStyle style;

  @override
  Widget build(BuildContext context) {
    const textStyle = TextStyle(fontSize: AppSizes.bodyFont, height: 1.4);
    switch (style) {
      case TextBlockStyle.normal:
        return Text(text, style: textStyle);
      case TextBlockStyle.rule:
        return Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: AppColors.honeySoft,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: AppColors.honey, width: 3),
          ),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(Icons.star_rounded, color: AppColors.tryAgain, size: 30),
              const SizedBox(width: 8),
              Expanded(child: Text(text, style: textStyle.copyWith(fontWeight: FontWeight.w700))),
            ],
          ),
        );
      case TextBlockStyle.tip:
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Icon(Icons.lightbulb_rounded, color: AppColors.honey, size: 30),
            const SizedBox(width: 8),
            Expanded(child: Text(text, style: textStyle)),
          ],
        );
    }
  }
}

const _cellWidth = 30.0;
const _digitStyle = TextStyle(fontSize: 30, fontWeight: FontWeight.w700, height: 1.25);

Widget _cells(List<String> chars, {Color color = AppColors.ink}) => Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final c in chars)
          SizedBox(
            width: _cellWidth,
            child: Text(c, textAlign: TextAlign.center, style: _digitStyle.copyWith(color: color)),
          ),
      ],
    );

List<String> _rightAlign(String s, int width) =>
    [...List.filled(width - s.length, ''), ...s.split('')];

/// "Đặt tính rồi tính": các số thẳng cột theo hàng + lời giải từng lượt.
/// Phase 3 sẽ thêm hiệu ứng hiện từng chữ số và chữ số nhớ.
class ColumnArithmeticView extends StatelessWidget {
  const ColumnArithmeticView({super.key, required this.block});

  final ColumnArithmeticBlock block;

  @override
  Widget build(BuildContext context) {
    final digits = [...block.operands.map((o) => o.length), block.result.length].reduce((a, b) => a > b ? a : b);
    final width = digits + 1; // + 1 cột cho dấu phép tính
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.skySoft, width: 3),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Đặt tính rồi tính:', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Center(
            child: Semantics(
              label: '${block.operands.join(' ${block.operation.symbol} ')} bằng ${block.result}',
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  for (final (i, o) in block.operands.indexed)
                    _cells([
                      i == 1 ? block.operation.symbol : '',
                      ..._rightAlign(o, width - 1),
                    ]),
                  Container(height: 3, width: _cellWidth * width, color: AppColors.ink),
                  _cells(['', ..._rightAlign(block.result, width - 1)], color: AppColors.good),
                ],
              ),
            ),
          ),
          const SizedBox(height: 10),
          for (final (i, step) in block.digitSteps.indexed) _NumberedLine(n: i + 1, text: step.text),
        ],
      ),
    );
  }
}

/// Phép chia đặt tính (bố cục rút gọn cho Phase 1).
class LongDivisionView extends StatelessWidget {
  const LongDivisionView({super.key, required this.block});

  final LongDivisionBlock block;

  @override
  Widget build(BuildContext context) {
    final w = block.dividend.length;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.skySoft, width: 3),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Đặt tính rồi tính:', style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
          const SizedBox(height: 8),
          Center(
            child: Semantics(
              label: '${block.dividend} chia ${block.divisor} được ${block.quotient}'
                  '${block.remainder > 0 ? ', dư ${block.remainder}' : ''}',
              child: IntrinsicHeight(
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _cells(_rightAlign(block.dividend, w)),
                    Container(width: 3, color: AppColors.ink),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _cells(['', ...block.divisor.split('')]),
                        Container(height: 3, width: _cellWidth * (block.quotient.length + 1), color: AppColors.ink),
                        _cells(['', ...block.quotient.split('')], color: AppColors.good),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
          const SizedBox(height: 10),
          for (final (i, step) in block.digitSteps.indexed) _NumberedLine(n: i + 1, text: step.text),
          if (block.remainder > 0) Text('Số dư: ${block.remainder}', style: const TextStyle(fontSize: 19)),
        ],
      ),
    );
  }
}

class _NumberedLine extends StatelessWidget {
  const _NumberedLine({required this.n, required this.text});

  final int n;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 15,
            backgroundColor: AppColors.sky,
            child: Text('$n', style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700)),
          ),
          const SizedBox(width: 10),
          Expanded(child: Text(text, style: const TextStyle(fontSize: 20, height: 1.35))),
        ],
      ),
    );
  }
}

/// Trình bày "Bài giải" giống vở ô li: câu lời giải, phép tính, Đáp số.
class WordProblemView extends StatelessWidget {
  const WordProblemView({super.key, required this.block});

  final WordProblemBlock block;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.honey, width: 3),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Center(
            child: Text(
              'Bài giải',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, decoration: TextDecoration.underline),
            ),
          ),
          const SizedBox(height: 8),
          for (final line in block.lines) ...[
            Text(line.explanation, style: const TextStyle(fontSize: 21, height: 1.4)),
            Center(
              child: Text(line.equation, style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w700)),
            ),
            const SizedBox(height: 6),
          ],
          Align(
            alignment: Alignment.centerRight,
            child: Text(block.answer, style: const TextStyle(fontSize: 21, fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }
}
