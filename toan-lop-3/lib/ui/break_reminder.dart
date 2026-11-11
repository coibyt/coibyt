import 'dart:async';

import 'package:flutter/material.dart';

import '../app_state.dart';
import 'app_theme.dart';
import 'widgets/tutor_bubble.dart';

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
    showDialog<void>(
      context: ctx,
      builder: (context) => AlertDialog(
        key: const ValueKey('break-dialog'),
        backgroundColor: AppColors.cream,
        content: TutorBubble(
          text:
              'Con học $limit phút rồi, giỏi lắm! Mình nghỉ mắt 5 phút nhé: '
              'nhìn ra xa, uống nước rồi quay lại học tiếp.',
          mood: TutorMood.happy,
          outfit: widget.app.progress.outfit,
          companion: widget.app.progress.companion,
        ),
        actions: [FilledButton(onPressed: () => Navigator.pop(context), child: const Text('Vâng ạ'))],
      ),
    );
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => widget.child;
}
