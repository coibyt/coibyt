import 'package:flutter/material.dart';

import '../app_theme.dart';

/// Bàn phím số to, thay bàn phím hệ thống: bé không bị bàn phím che đề,
/// không gõ nhầm chữ, phím ≥ 64dp.
class NumberPad extends StatelessWidget {
  const NumberPad({
    super.key,
    required this.onDigit,
    required this.onBackspace,
    this.enabled = true,
  });

  final ValueChanged<String> onDigit;
  final VoidCallback onBackspace;
  final bool enabled;

  @override
  Widget build(BuildContext context) {
    const rows = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['', '0', '⌫'],
    ];
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 420),
      child: Column(
        children: [
          for (final row in rows)
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                children: [
                  for (final key in row)
                    Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: key.isEmpty ? const SizedBox(height: AppSizes.minTouch) : _key(key),
                      ),
                    ),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget _key(String key) {
    final isBack = key == '⌫';
    return SizedBox(
      height: AppSizes.minTouch,
      child: Material(
        color: isBack ? AppColors.tryAgainSoft : Colors.white,
        borderRadius: BorderRadius.circular(16),
        elevation: enabled ? 1.5 : 0,
        child: InkWell(
          key: ValueKey('numpad-$key'),
          borderRadius: BorderRadius.circular(16),
          onTap: !enabled ? null : (isBack ? onBackspace : () => onDigit(key)),
          child: Center(
            child: isBack
                ? Icon(Icons.backspace_outlined,
                    size: 30, semanticLabel: 'Xoá', color: enabled ? AppColors.ink : Colors.black26)
                : Text(
                    key,
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w700,
                      color: enabled ? AppColors.ink : Colors.black26,
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}
