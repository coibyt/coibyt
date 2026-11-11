import 'package:flutter/material.dart';

import '../../models/blocks.dart';
import '../../models/problem.dart';
import '../app_theme.dart';
import 'step_solver.dart';

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
          decoration: BoxDecoration(color: AppColors.goodSoft, borderRadius: BorderRadius.circular(AppSizes.radius)),
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
      final ColumnArithmeticBlock b => ColumnStepper(block: b),
      final LongDivisionBlock b => DivisionStepper(block: b),
      final WordProblemBlock b => WordProblemView(block: b),
      ImageBlock(:final image) => Semantics(
        label: image.alt,
        child: Image.asset(image.src, errorBuilder: (_, _, _) => Text('[Ảnh: ${image.alt}]')),
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
              Expanded(
                child: Text(text, style: textStyle.copyWith(fontWeight: FontWeight.w700)),
              ),
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
