import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import '../services/show_music.dart';
import '../tutor/host_avatar.dart';
import '../tutor/teacher_assets.dart' show UiAsset;
import '../tutor/teacher_avatar.dart';
import 'splash_view.dart';
import 'widgets/game_art.dart';

/// Màn mở đầu "Chạm để vào lớp học" (trên trình duyệt).
///
/// Trình duyệt chặn phát tiếng cho tới khi người dùng chạm vào trang lần đầu. Chạm một lần ở đây
/// (kèm nhạc mở màn) là từ đó cô giáo và các nhân vật tự nói được — bé không phải bấm nút loa nữa.
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

  void _enter() {
    ShowMusic.instance.sting('intro');
    setState(() => _open = true);
  }

  static const _features = [
    (UiAsset.tileLesson, 'Cô giảng\ncó giọng nói'),
    (UiAsset.examCuoiki, 'Gameshow\nnăng lực'),
    (UiAsset.balloonRed, 'Trò chơi\nôn tập'),
    (UiAsset.advCrown, 'Nâng cao\nhọc sinh giỏi'),
  ];

  @override
  Widget build(BuildContext context) {
    if (_open) return widget.child;
    return Scaffold(
      body: SplashBackdrop(
        child: SafeArea(
          child: Semantics(
            button: true,
            label: 'Chạm để vào lớp học',
            child: GestureDetector(
              key: const ValueKey('start-gate'),
              behavior: HitTestBehavior.opaque,
              onTap: _enter,
              child: Center(
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 520),
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const AppLogo(size: 170),
                        const AppTitle(size: 38),
                        const SizedBox(height: 10),
                        // Cô Mai và MC chào đón.
                        SizedBox(
                          height: 210,
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              const TeacherAvatar(height: 210),
                              const HostAvatar(height: 190, pose: HostPose.present),
                            ],
                          ),
                        ),
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            for (final (art, label) in _features)
                              Expanded(
                                child: Container(
                                  margin: const EdgeInsets.symmetric(horizontal: 3),
                                  padding: const EdgeInsets.symmetric(vertical: 6),
                                  decoration: BoxDecoration(
                                    color: const Color(0x55000000),
                                    borderRadius: BorderRadius.circular(16),
                                    border: Border.all(color: const Color(0x88FFC93C)),
                                  ),
                                  child: Column(
                                    children: [
                                      GameIcon(art, size: 40, fallback: const Icon(Icons.star, color: Colors.amber)),
                                      Text(
                                        label,
                                        textAlign: TextAlign.center,
                                        style: const TextStyle(
                                          fontSize: 11.5,
                                          height: 1.2,
                                          fontWeight: FontWeight.w800,
                                          color: Colors.white,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 18),
                        ScaleTransition(
                          scale: Tween(
                            begin: 0.95,
                            end: 1.05,
                          ).animate(CurvedAnimation(parent: _pulse, curve: Curves.easeInOut)),
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 16),
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(40),
                              gradient: const LinearGradient(colors: [Color(0xFFFFE08A), Color(0xFFFF9F1C)]),
                              border: Border.all(color: Colors.white, width: 3),
                              boxShadow: const [
                                BoxShadow(color: Color(0x88FFB800), blurRadius: 24, offset: Offset(0, 6)),
                              ],
                            ),
                            child: const Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(Icons.touch_app_rounded, color: Color(0xFF4A2A00), size: 30),
                                SizedBox(width: 10),
                                Text(
                                  'Chạm để vào lớp học',
                                  style: TextStyle(fontSize: 23, fontWeight: FontWeight.w900, color: Color(0xFF4A2A00)),
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
      ),
    );
  }
}
