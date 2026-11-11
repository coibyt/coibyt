import 'package:flutter/material.dart';

import '../app_theme.dart';
import 'bee_mascot.dart';

enum TutorMood { happy, thinking, neutral }

/// Cô Ong + khung thoại. Luôn hiện chữ (giọng đọc chỉ là phần thêm).
class TutorBubble extends StatelessWidget {
  const TutorBubble({
    super.key,
    required this.text,
    this.mood = TutorMood.neutral,
    this.onSpeak,
    this.color = Colors.white,
    this.textColor = AppColors.ink,
    this.extra,
  });

  final String text;
  final TutorMood mood;

  /// Bấm loa để nghe lại.
  final VoidCallback? onSpeak;
  final Color color;
  final Color textColor;
  final Widget? extra;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.end,
      children: [
        BeeMascot(size: 60, happy: mood != TutorMood.thinking),
        const SizedBox(width: 6),
        Expanded(
          child: Container(
            padding: const EdgeInsets.fromLTRB(14, 10, 6, 10),
            decoration: BoxDecoration(
              color: color,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(20),
                topRight: Radius.circular(20),
                bottomRight: Radius.circular(20),
                bottomLeft: Radius.circular(4),
              ),
              boxShadow: const [BoxShadow(color: Color(0x14000000), blurRadius: 6, offset: Offset(0, 2))],
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Cô Ong',
                        style: TextStyle(fontSize: 14, color: Colors.black45, fontWeight: FontWeight.w700),
                      ),
                      Text(
                        text,
                        key: const ValueKey('tutor-text'),
                        style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: textColor, height: 1.3),
                      ),
                      ?extra,
                    ],
                  ),
                ),
                if (onSpeak != null)
                  IconButton(
                    key: const ValueKey('tutor-speak'),
                    tooltip: 'Nghe cô Ong đọc',
                    onPressed: onSpeak,
                    icon: const Icon(Icons.volume_up_rounded, color: AppColors.sky, size: 30),
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
