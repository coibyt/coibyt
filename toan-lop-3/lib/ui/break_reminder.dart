import 'dart:async';

import 'package:flutter/material.dart';

import '../app_state.dart';
import 'app_theme.dart';
import '../logic/tutor.dart';
import '../tutor/teacher_avatar.dart';
import '../tutor/tutor_audio_service.dart';

/// Nhắc bé nghỉ mắt sau N phút dùng app liên tục (phụ huynh chọn, mặc định 30).
/// Chỉ đếm khi app đang mở trên màn hình. Không khoá app — chỉ nhắc nhẹ.
class BreakReminder extends StatefulWidget {
  const BreakReminder({super.key, required this.app, required this.navigatorKey, required this.child});

  final AppState app;
  final GlobalKey<NavigatorState> navigatorKey;
  final Widget child;

  @override
  State<BreakReminder> createState() => _BreakReminderState();
}

class _BreakReminderState extends State<BreakReminder> with WidgetsBindingObserver {
  Timer? _timer;
  int _minutes = 0;
  bool _foreground = true;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _timer = Timer.periodic(const Duration(minutes: 1), (_) => _tick());
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    _foreground = state == AppLifecycleState.resumed;
  }

  void _tick() {
    final limit = widget.app.breakMinutes;
    if (!_foreground || limit <= 0) return;
    _minutes++;
    if (_minutes < limit) return;
    _minutes = 0;
    final ctx = widget.navigatorKey.currentContext;
    if (ctx == null) return;
    if (widget.app.voiceEnabled) TutorAudioService.instance.speak(const [TutorLines.breakTime]);
    showDialog<void>(
      context: ctx,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        key: const ValueKey('break-dialog'),
        backgroundColor: AppColors.cream,
        content: Row(
          children: [
            const TeacherAvatar(height: 120, mood: TeacherMood.clap),
            const SizedBox(width: 8),
            const Expanded(
              child: Text(TutorLines.breakTime, style: TextStyle(fontSize: 19, fontWeight: FontWeight.w700)),
            ),
          ],
        ),
        actions: [
          FilledButton(
            onPressed: () {
              TutorAudioService.instance.stop();
              Navigator.pop(context);
            },
            child: const Text('Vâng ạ'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    TutorAudioService.instance.stop();
    WidgetsBinding.instance.removeObserver(this);
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
