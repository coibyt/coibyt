import 'package:flutter/material.dart';

import '../app_state.dart';
import 'teacher_avatar.dart';
import 'teacher_controller.dart';
import 'teacher_hud.dart';

/// Cô giáo xuất hiện ở đầu màn hình và TỰ NÓI ngay khi màn hình mở (không cần bấm loa).
class TeacherIntro extends StatefulWidget {
  const TeacherIntro({
    super.key,
    required this.lines,
    this.mood = TeacherMood.idle,
    this.avatarHeight = 120,
    this.controller,
  });

  /// Các câu cô nói khi mở màn hình.
  final List<String> lines;
  final TeacherMood mood;
  final double avatarHeight;

  /// Truyền vào nếu màn hình muốn cô nói thêm sau đó; null = tự tạo.
  final TeacherController? controller;

  @override
  State<TeacherIntro> createState() => _TeacherIntroState();
}

class _TeacherIntroState extends State<TeacherIntro> {
  late final TeacherController _teacher = widget.controller ?? TeacherController(voiceEnabled: false);

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      _teacher.voiceEnabled = AppScope.read(context).voiceEnabled;
      _teacher.say(widget.lines, mood: widget.mood);
    });
  }

  @override
  void dispose() {
    if (widget.controller == null) _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.fromLTRB(6, 6, 10, 8),
    decoration: BoxDecoration(
      color: Colors.white.withValues(alpha: 0.85),
      borderRadius: BorderRadius.circular(24),
      border: Border.all(color: Colors.white, width: 2),
      boxShadow: const [BoxShadow(color: Color(0x1A3A2A80), blurRadius: 16, offset: Offset(0, 5))],
    ),
    child: TeacherHud(controller: _teacher, avatarHeight: widget.avatarHeight),
  );
}
