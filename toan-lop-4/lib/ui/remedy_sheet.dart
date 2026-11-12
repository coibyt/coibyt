import 'package:flutter/material.dart';

import '../logic/real_examples.dart';
import '../logic/remedies.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/teacher_controller.dart';
import '../tutor/teacher_hud.dart';
import 'app_theme.dart';
import 'widgets/big_button.dart';
import 'widgets/real_example_view.dart';

/// Bé làm sai: cô mở tranh minh hoạ của dạng toán, que chỉ lần lượt vào từng chỗ và giảng lại,
/// rồi mời bé làm lại. Cô tự nói ngay khi tranh mở ra (không cần bấm loa).
Future<void> showRemedy(BuildContext context, TeacherController teacher, RealExample remedy) {
  return showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (_) => RemedySheet(teacher: teacher, remedy: remedy),
  );
}

class RemedySheet extends StatefulWidget {
  const RemedySheet({super.key, required this.teacher, required this.remedy});

  final TeacherController teacher;
  final RealExample remedy;

  @override
  State<RemedySheet> createState() => _RemedySheetState();
}

class _RemedySheetState extends State<RemedySheet> {
  PointAt? _at;
  bool _done = false;
  int _token = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _play());
  }

  @override
  void dispose() {
    _token++;
    super.dispose();
  }

  Future<void> _play() async {
    final token = ++_token;
    setState(() {
      _done = false;
      _at = null;
    });
    await widget.teacher.say(const [RemedyLines.intro], mood: TeacherMood.think, forceVoice: true);
    for (final (say, at) in widget.remedy.lines) {
      if (!mounted || token != _token) return;
      setState(() => _at = at);
      await widget.teacher.say([say], mood: TeacherMood.point, forceVoice: true);
    }
    if (!mounted || token != _token) return;
    setState(() {
      _at = null;
      _done = true;
    });
    await widget.teacher.say(const [RemedyLines.outro], mood: TeacherMood.clap, forceVoice: true);
  }

  void _close() {
    _token++;
    widget.teacher.clear();
    Navigator.of(context).pop();
  }

  @override
  Widget build(BuildContext context) {
    final h = MediaQuery.sizeOf(context).height;
    return SafeArea(
      child: Container(
        key: const ValueKey('remedy-sheet'),
        constraints: BoxConstraints(maxHeight: h * 0.94, maxWidth: 640),
        margin: const EdgeInsets.fromLTRB(8, 0, 8, 8),
        padding: const EdgeInsets.fromLTRB(14, 12, 14, 12),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFFFFFBF0), Color(0xFFFFF1F6)],
          ),
          borderRadius: BorderRadius.circular(28),
          border: Border.all(color: const Color(0xFFFFB85C), width: 3),
          boxShadow: const [BoxShadow(color: Color(0x55000000), blurRadius: 24, offset: Offset(0, 10))],
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Row(
              children: [
                Icon(Icons.auto_stories_rounded, color: Color(0xFFE07A00), size: 26),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Cô giảng bằng tranh',
                    style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Color(0xFF5A3A00)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Flexible(
              child: SingleChildScrollView(
                child: RealExampleView(
                  key: const ValueKey('remedy-picture'),
                  example: widget.remedy,
                  active: _at != null,
                  pointAt: _at,
                  chip: 'Tranh minh hoạ của cô',
                ),
              ),
            ),
            TeacherHud(controller: widget.teacher, avatarHeight: 92, maxTextHeight: 78),
            const SizedBox(height: 8),
            Row(
              children: [
                IconButton.filledTonal(
                  key: const ValueKey('remedy-replay'),
                  tooltip: 'Cô giảng lại',
                  iconSize: 30,
                  onPressed: _play,
                  icon: const Icon(Icons.replay_rounded),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: BigButton(
                    key: const ValueKey('remedy-close'),
                    label: _done ? 'Con làm lại' : 'Con hiểu rồi',
                    icon: Icons.edit_rounded,
                    color: AppColors.good,
                    onPressed: _close,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
