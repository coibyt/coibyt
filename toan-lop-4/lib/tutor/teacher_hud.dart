import 'package:flutter/material.dart';

import '../logic/tutor.dart' show kTeacherName;
import '../ui/app_theme.dart';
import 'teacher_avatar.dart';
import 'teacher_controller.dart';

/// HUD cô giáo: cô đứng ở góc dưới bên trái, khung thoại bên cạnh trượt lên
/// khi có câu mới, chữ hiện dần theo giọng đọc.
class TeacherHud extends StatelessWidget {
  const TeacherHud({
    super.key,
    required this.controller,
    this.avatarHeight = 132,
    this.bubbleColor = Colors.white,
    this.textColor = AppColors.ink,
    this.footer,
    this.maxTextHeight,
  });

  /// Phụ đề gọn: chỉ hiện câu cô đang đọc, khung cao tối đa [maxTextHeight] (dòng mới nhất luôn hiện).
  /// Dùng ở màn có đề bài trên màn hình (luyện tập…) để khung thoại không che bảng và ô trả lời.
  final double? maxTextHeight;

  final TeacherController controller;
  final double avatarHeight;
  final Color bubbleColor;
  final Color textColor;

  /// Dòng phụ dưới lời thoại (vd "Đáp án: 96").
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    final reduceMotion = MediaQuery.maybeDisableAnimationsOf(context) ?? false;
    return ListenableBuilder(
      listenable: controller,
      builder: (context, _) {
        final hasText = controller.text.isNotEmpty;
        return Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            TeacherAvatar(
              key: const ValueKey('teacher-avatar'),
              height: avatarHeight,
              mood: controller.mood,
              mouthOpen: controller.mouthOpen,
            ),
            const SizedBox(width: 4),
            Expanded(
              child: AnimatedSwitcher(
                duration: reduceMotion || !TeacherAvatar.motionEnabled
                    ? Duration.zero
                    : const Duration(milliseconds: 380),
                // Bong bóng cũ tắt nhanh, xếp sát đáy → không lộ chữ cũ dưới bong bóng mới.
                reverseDuration: reduceMotion || !TeacherAvatar.motionEnabled
                    ? Duration.zero
                    : const Duration(milliseconds: 90),
                layoutBuilder: (current, previous) =>
                    Stack(alignment: Alignment.bottomLeft, children: [...previous, ?current]),
                switchInCurve: Curves.easeOutBack,
                switchOutCurve: Curves.easeIn,
                transitionBuilder: (child, anim) => FadeTransition(
                  opacity: anim,
                  child: SlideTransition(
                    position: Tween(begin: const Offset(0, 0.35), end: Offset.zero).animate(anim),
                    child: child,
                  ),
                ),
                child: hasText
                    ? _Bubble(
                        key: ValueKey('bubble-${controller.serial}'),
                        controller: controller,
                        color: bubbleColor,
                        textColor: textColor,
                        footer: footer,
                        maxTextHeight: maxTextHeight,
                      )
                    : SizedBox(key: const ValueKey('no-bubble'), height: avatarHeight * 0.3),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _Bubble extends StatelessWidget {
  const _Bubble({
    super.key,
    required this.controller,
    required this.color,
    required this.textColor,
    this.footer,
    this.maxTextHeight,
  });

  final double? maxTextHeight;

  final TeacherController controller;
  final Color color;
  final Color textColor;
  final Widget? footer;

  @override
  Widget build(BuildContext context) {
    final text = controller.text;
    final shown = controller.visibleChars.clamp(0, text.length);
    final style = TextStyle(
      fontSize: 20,
      fontWeight: FontWeight.w700,
      color: textColor,
      height: 1.3,
      fontFamily: 'Andika',
    );
    return GestureDetector(
      onTap: controller.skipTyping,
      child: Container(
        margin: const EdgeInsets.only(bottom: 18),
        padding: const EdgeInsets.fromLTRB(14, 10, 4, 10),
        decoration: BoxDecoration(
          color: color,
          borderRadius: const BorderRadius.only(
            topLeft: Radius.circular(24),
            topRight: Radius.circular(24),
            bottomRight: Radius.circular(24),
            bottomLeft: Radius.circular(6),
          ),
          boxShadow: const [BoxShadow(color: Color(0x1F000000), blurRadius: 10, offset: Offset(0, 3))],
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    kTeacherName,
                    style: TextStyle(fontSize: 14, color: Colors.black45, fontWeight: FontWeight.w700),
                  ),
                  if (maxTextHeight != null)
                    ShaderMask(
                      // Dòng cũ cuộn lên trên thì mờ dần (không bị cắt ngang thô).
                      shaderCallback: (r) => const LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Color(0x00000000), Color(0xFF000000)],
                        stops: [0, 0.22],
                      ).createShader(r),
                      blendMode: BlendMode.dstIn,
                      child: ConstrainedBox(
                        constraints: BoxConstraints(maxHeight: maxTextHeight!),
                        child: SingleChildScrollView(
                          reverse: true, // dòng đang đọc luôn ở trong khung
                          child: Text(
                            () {
                              final (part, n) = controller.currentPart;
                              return part.substring(0, n);
                            }(),
                            key: const ValueKey('tutor-text'),
                            style: style.copyWith(fontSize: 18),
                            semanticsLabel: controller.currentPart.$1,
                          ),
                        ),
                      ),
                    )
                  else
                    // Chữ chưa hiện vẫn chiếm chỗ (trong suốt) để khung không nhảy kích thước.
                    Semantics(
                      label: text,
                      child: ExcludeSemantics(
                        child: RichText(
                          key: const ValueKey('tutor-text'),
                          text: TextSpan(
                            style: style,
                            children: [
                              TextSpan(text: text.substring(0, shown)),
                              TextSpan(
                                text: text.substring(shown),
                                style: const TextStyle(color: Colors.transparent),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ?footer,
                ],
              ),
            ),
            IconButton(
              key: const ValueKey('tutor-speak'),
              tooltip: 'Nghe cô đọc lại',
              onPressed: controller.replay,
              icon: Icon(
                controller.speaking ? Icons.graphic_eq_rounded : Icons.volume_up_rounded,
                color: AppColors.sky,
                size: 30,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
