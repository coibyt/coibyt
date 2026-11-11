import 'package:flutter/material.dart';

import '../app_theme.dart';

/// Nút to, bo tròn, chữ đậm — dễ bấm cho trẻ.
class BigButton extends StatelessWidget {
  const BigButton({
    super.key,
    required this.label,
    required this.onPressed,
    this.color = AppColors.good,
    this.icon,
    this.outlined = false,
  });

  final String label;
  final VoidCallback? onPressed;
  final Color color;
  final IconData? icon;
  final bool outlined;

  @override
  Widget build(BuildContext context) {
    final shape = RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppSizes.radius));
    const textStyle = TextStyle(fontSize: 22, fontWeight: FontWeight.w700, fontFamily: 'Andika');
    final child = Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[Icon(icon, size: 28), const SizedBox(width: 8)],
        Flexible(child: Text(label, textAlign: TextAlign.center)),
      ],
    );
    final minSize = const Size(AppSizes.minTouch, AppSizes.minTouch);
    if (outlined) {
      return OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          minimumSize: minSize,
          foregroundColor: color,
          side: BorderSide(color: color, width: 3),
          shape: shape,
          textStyle: textStyle,
          padding: const EdgeInsets.symmetric(horizontal: 16),
        ),
        child: child,
      );
    }
    return FilledButton(
      onPressed: onPressed,
      style: FilledButton.styleFrom(
        minimumSize: minSize,
        backgroundColor: color,
        foregroundColor: Colors.white,
        shape: shape,
        textStyle: textStyle,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        elevation: 2,
      ),
      child: child,
    );
  }
}
