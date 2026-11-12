import 'dart:async';
import 'dart:math';

import 'package:flutter/material.dart';

import 'teacher_avatar.dart';

/// Tư thế của MC gameshow.
enum HostPose {
  /// Đứng cầm thẻ câu hỏi.
  idle,

  /// Đưa tay giới thiệu (mở màn, đọc đề).
  present,

  /// Chỉ xuống các đáp án.
  point,

  /// Chạm cằm, chờ bé chọn (hồi hộp).
  think,

  /// Vỗ tay reo mừng (trả lời đúng).
  cheer;

  /// Khung khi mở miệng (khớp khẩu hình); null = tư thế này không có khung nói riêng.
  String? get talkStem => switch (this) {
    idle => 'talk',
    present => 'present_talk',
    point => 'point_talk',
    think => null,
    cheer => 'cheer_talk',
  };
}

/// MC gameshow "sống": thở, lắc lư nhẹ, tự chớp mắt, gật đầu khi nói, đổi tư thế mượt,
/// mở/ngậm miệng theo [mouthOpen] (lấy từ TeacherController — chỉ cử động khi đang phát tiếng).
class HostAvatar extends StatefulWidget {
  const HostAvatar({
    super.key,
    this.pose = HostPose.idle,
    this.mouthOpen = false,
    this.height = 200,
    this.prefix = 'assets/host/host_',
    this.emoji = '🎤',
  });

  /// Linh vật Vẹt Lulu (Đảo Tiếng Anh) dùng cùng bộ chuyển động với MC.
  const HostAvatar.mascot({super.key, this.pose = HostPose.idle, this.mouthOpen = false, this.height = 200})
    : prefix = 'assets/mascot/mascot_',
      emoji = '🦜';

  /// Đường dẫn khung hình: `<prefix><khung>.webp`.
  final String prefix;
  final String emoji;

  final HostPose pose;
  final bool mouthOpen;
  final double height;

  static const dir = 'assets/host/';
  static String path(String stem) => '${dir}host_$stem.webp';

  /// Mọi khung hình (để nạp sẵn → đổi khung không nháy).
  static const stems = [
    'idle',
    'blink',
    'talk',
    'present',
    'present_talk',
    'point',
    'point_talk',
    'think',
    'cheer',
    'cheer_talk',
  ];

  static Future<void> precache(BuildContext context) async {
    for (final s in stems) {
      if (!context.mounted) return;
      // Khung chưa có: bỏ qua (avatar tự dùng khung gần nhất).
      await precacheImage(AssetImage(path(s)), context, onError: (_, _) {});
    }
  }

  @override
  State<HostAvatar> createState() => _HostAvatarState();
}

class _HostAvatarState extends State<HostAvatar> with TickerProviderStateMixin {
  late final _breath = AnimationController(vsync: this, duration: const Duration(milliseconds: 3200));
  late final _sway = AnimationController(vsync: this, duration: const Duration(milliseconds: 5200));
  late final _bob = AnimationController(vsync: this, duration: const Duration(milliseconds: 420));
  final _random = Random();
  Timer? _blinkTimer;
  bool _blinking = false;

  bool get _motion => TeacherAvatar.motionEnabled;

  @override
  void initState() {
    super.initState();
    if (_motion) {
      _breath.repeat(reverse: true, count: 300);
      _sway.repeat(reverse: true, count: 200);
      _scheduleBlink();
    }
  }

  void _scheduleBlink() {
    _blinkTimer = Timer(Duration(milliseconds: 2400 + _random.nextInt(2600)), () {
      if (!mounted) return;
      if (!widget.mouthOpen && widget.pose == HostPose.idle) {
        setState(() => _blinking = true);
        Timer(const Duration(milliseconds: 140), () {
          if (mounted) setState(() => _blinking = false);
        });
      }
      _scheduleBlink();
    });
  }

  @override
  void didUpdateWidget(HostAvatar old) {
    super.didUpdateWidget(old);
    // Gật đầu nhẹ theo nhịp khi đang nói.
    if (_motion && widget.mouthOpen && !_bob.isAnimating) {
      _bob.forward(from: 0);
    }
  }

  @override
  void dispose() {
    _blinkTimer?.cancel();
    _breath.dispose();
    _sway.dispose();
    _bob.dispose();
    super.dispose();
  }

  String get _stem {
    final p = widget.pose;
    if (widget.mouthOpen) return p.talkStem ?? p.name;
    if (_blinking && p == HostPose.idle) return 'blink';
    return p.name;
  }

  @override
  Widget build(BuildContext context) {
    final h = widget.height;
    final fallback = SizedBox(
      height: h,
      width: h * 0.75,
      child: Center(child: Text(widget.emoji, style: const TextStyle(fontSize: 60))),
    );
    String path(String stem) => '${widget.prefix}$stem.webp';
    Widget frame(String stem) => Image.asset(
      path(stem),
      key: ValueKey(stem),
      height: h,
      fit: BoxFit.contain,
      gaplessPlayback: true,
      // Thiếu khung nói / chớp mắt: dùng khung tư thế, rồi khung đứng.
      errorBuilder: (_, _, _) => stem == widget.pose.name
          ? Image.asset(path('idle'), height: h, errorBuilder: (_, _, _) => fallback)
          : Image.asset(path(widget.pose.name), height: h, errorBuilder: (_, _, _) => fallback),
    );
    return AnimatedBuilder(
      animation: Listenable.merge([_breath, _sway, _bob]),
      builder: (_, child) {
        final breathe = sin(_breath.value * pi);
        final sway = (_sway.value - 0.5) * 2; // -1..1
        final bob = sin(_bob.value * pi);
        return Transform(
          alignment: Alignment.bottomCenter,
          transform: Matrix4.identity()
            ..translateByDouble(sway * 2.5, -2.5 * breathe - 2 * bob, 0, 1)
            ..rotateZ(sway * 0.012)
            ..scaleByDouble(1 + 0.008 * breathe, 1 + 0.008 * breathe + 0.006 * bob, 1, 1),
          child: child,
        );
      },
      // Đổi tư thế: mờ chuyển nhanh; đổi khung miệng/chớp mắt: tức thì (cùng tư thế).
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 160),
        layoutBuilder: (current, previous) =>
            Stack(alignment: Alignment.bottomCenter, children: [...previous, ?current]),
        transitionBuilder: (c, a) => FadeTransition(opacity: a, child: c),
        child: KeyedSubtree(key: ValueKey(widget.pose), child: frame(_stem)),
      ),
    );
  }
}
