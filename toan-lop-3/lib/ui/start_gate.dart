import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../logic/tutor.dart';
import '../tutor/teacher_avatar.dart';
import 'widgets/game_art.dart';

/// Màn "Chạm để vào lớp học" (chỉ trên trình duyệt).
///
/// Trình duyệt chặn phát tiếng cho tới khi người dùng chạm vào trang lần đầu. Chạm một lần ở đây
/// là từ đó cô giáo và các nhân vật tự nói được — bé không phải bấm nút loa nữa.
class StartGate extends StatefulWidget {
  const StartGate({super.key, required this.child, this.enabled = kIsWeb});

  final Widget child;
  final bool enabled;

  @override
  State<StartGate> createState() => _StartGateState();
}

class _StartGateState extends State<StartGate> with SingleTickerProviderStateMixin {
  late bool _open = !widget.enabled;
  late final _pulse = AnimationController(vsync: this, duration: const Duration(milliseconds: 1100));

  @override
  void initState() {
    super.initState();
    if (!_open && TeacherAvatar.motionEnabled) _pulse.repeat(reverse: true, count: 400);
  }

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_open) return widget.child;
    return Scaffold(
      body: ScreenBackground(
        name: 'home',
        veil: 0.2,
        child: SafeArea(
          child: Semantics(
            button: true,
            label: 'Chạm để vào lớp học',
            child: GestureDetector(
              key: const ValueKey('start-gate'),
              behavior: HitTestBehavior.opaque,
              onTap: () => setState(() => _open = true),
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 520),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text(
                        'Ong Vàng Toán 3',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 40,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF2B2160),
                          shadows: [Shadow(color: Colors.white, blurRadius: 12)],
                        ),
                      ),
                      const SizedBox(height: 4),
                      const Text(
                        'Lớp học Toán cùng $kTeacherName',
                        style: TextStyle(fontSize: 20, color: Color(0xFF4A3F86), fontWeight: FontWeight.w700),
                      ),
                      const SizedBox(height: 16),
                      const TeacherAvatar(height: 340),
                      const SizedBox(height: 20),
                      ScaleTransition(
                        scale: Tween(
                          begin: 0.95,
                          end: 1.05,
                        ).animate(CurvedAnimation(parent: _pulse, curve: Curves.easeInOut)),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 18),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(40),
                            gradient: const LinearGradient(colors: [Color(0xFFFFC93C), Color(0xFFFF9F1C)]),
                            border: Border.all(color: Colors.white, width: 3),
                            boxShadow: const [
                              BoxShadow(color: Color(0x66FF9F1C), blurRadius: 18, offset: Offset(0, 6)),
                            ],
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.notifications_active_rounded, color: Color(0xFF4A2A00), size: 30),
                              SizedBox(width: 10),
                              Text(
                                'Chạm để vào lớp học',
                                style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF4A2A00)),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
