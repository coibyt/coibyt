import 'dart:math';

import 'package:flutter/material.dart';

import 'teacher_avatar.dart';

/// MC gameshow: thở nhẹ; nói thì mở miệng (khớp khẩu hình), giới thiệu câu hỏi thì đưa tay.
class HostAvatar extends StatefulWidget {
  const HostAvatar({super.key, this.mouthOpen = false, this.presenting = false, this.height = 200});

  final bool mouthOpen;
  final bool presenting;
  final double height;

  static const _dir = 'assets/host/';

  @override
  State<HostAvatar> createState() => _HostAvatarState();
}

class _HostAvatarState extends State<HostAvatar> with SingleTickerProviderStateMixin {
  late final _breath = AnimationController(vsync: this, duration: const Duration(milliseconds: 3000));

  @override
  void initState() {
    super.initState();
    if (TeacherAvatar.motionEnabled) _breath.repeat(reverse: true, count: 200);
  }

  @override
  void dispose() {
    _breath.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final pose = widget.mouthOpen ? 'talk' : (widget.presenting ? 'present' : 'idle');
    return AnimatedBuilder(
      animation: _breath,
      builder: (_, child) => Transform.translate(
        offset: Offset(0, -2 * sin(_breath.value * pi)),
        child: child,
      ),
      child: Image.asset(
        '${HostAvatar._dir}host_$pose.webp',
        height: widget.height,
        fit: BoxFit.contain,
        gaplessPlayback: true,
        errorBuilder: (_, _, _) => SizedBox(
          height: widget.height,
          width: widget.height * 0.75,
          child: const Center(child: Text('🎤', style: TextStyle(fontSize: 60))),
        ),
      ),
    );
  }
}
