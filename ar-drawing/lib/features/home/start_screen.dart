import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../core/app_assets.dart';
import '../../core/app_theme.dart';
import '../../core/game_art.dart';
import '../../core/i18n/language_controller.dart';
import '../teacher/widgets/teacher_overlay.dart' show lumiPose;

/// Title screen: the night studio, Lumi waving, "tap to start".
///
/// Besides looking like a real game, the first tap is the user gesture
/// browsers require before playing sound, so Lumi can talk right away on the
/// next screen without a "tap to listen" button.
class StartScreen extends StatefulWidget {
  const StartScreen({super.key, required this.next});

  /// Builds the screen to open after the tap (home).
  final Widget Function() next;

  @override
  State<StartScreen> createState() => _StartScreenState();
}

class _StartScreenState extends State<StartScreen> with SingleTickerProviderStateMixin {
  late final AnimationController _pulse = AnimationController(
    vsync: this,
    duration: const Duration(milliseconds: 1800),
  )..repeat();
  bool _leaving = false;

  @override
  void dispose() {
    _pulse.dispose();
    super.dispose();
  }

  void _start() {
    if (_leaving) return;
    _leaving = true;
    Navigator.of(context).pushReplacement(
      PageRouteBuilder<void>(
        transitionDuration: const Duration(milliseconds: 500),
        pageBuilder: (_, _, _) => widget.next(),
        transitionsBuilder: (_, Animation<double> a, _, Widget child) =>
            FadeTransition(opacity: a, child: child),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Scaffold(
      body: GestureDetector(
        key: const Key('startScreen'),
        behavior: HitTestBehavior.opaque,
        onTap: _start,
        child: Stack(
          fit: StackFit.expand,
          children: <Widget>[
            Image.asset(
              GameArt.banner,
              fit: BoxFit.cover,
              errorBuilder: (_, _, _) => const ColoredBox(color: AppTheme.ink),
            ),
            const DecoratedBox(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: <Color>[Color(0x6614122E), Color(0x3314122E), Color(0xF214122E)],
                  stops: <double>[0, 0.4, 0.8],
                ),
              ),
            ),
            SafeArea(
              child: Column(
                children: <Widget>[
                  const SizedBox(height: 32),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(24),
                      boxShadow: const <BoxShadow>[
                        BoxShadow(color: Color(0x88000000), blurRadius: 20),
                      ],
                    ),
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(24),
                      child: Image.asset(AppAssets.logo, width: 84, height: 84),
                    ),
                  ),
                  const SizedBox(height: 14),
                  Text(
                    context.tr('app.name'),
                    style: theme.textTheme.displaySmall?.copyWith(
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                      shadows: const <Shadow>[Shadow(color: Color(0xAA000000), blurRadius: 12)],
                    ),
                  ),
                  const SizedBox(height: 6),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 32),
                    child: Text(
                      context.tr('start.subtitle'),
                      textAlign: TextAlign.center,
                      style: theme.textTheme.titleMedium?.copyWith(
                        color: AppTheme.gold,
                        shadows: const <Shadow>[Shadow(color: Color(0xAA000000), blurRadius: 8)],
                      ),
                    ),
                  ),
                  const Spacer(),
                  AnimatedBuilder(
                    animation: _pulse,
                    builder: (BuildContext context, Widget? child) => Transform.translate(
                      offset: Offset(0, math.sin(_pulse.value * 2 * math.pi) * 6),
                      child: child,
                    ),
                    child: Image.asset(
                      lumiPose('wave'),
                      height: 230,
                      filterQuality: FilterQuality.medium,
                    ),
                  ),
                  const SizedBox(height: 18),
                  AnimatedBuilder(
                    animation: _pulse,
                    builder: (BuildContext context, Widget? child) {
                      final double glow = 0.5 + 0.5 * math.sin(_pulse.value * 2 * math.pi);
                      return Transform.scale(
                        scale: 1 + 0.04 * glow,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(40),
                            boxShadow: <BoxShadow>[
                              BoxShadow(
                                color: AppTheme.lamp.withValues(alpha: 0.35 + 0.35 * glow),
                                blurRadius: 18 + 14 * glow,
                              ),
                            ],
                          ),
                          child: child,
                        ),
                      );
                    },
                    child: Container(
                      key: const Key('startButton'),
                      padding: const EdgeInsets.symmetric(horizontal: 34, vertical: 16),
                      decoration: BoxDecoration(
                        gradient: AppTheme.goldGradient,
                        borderRadius: BorderRadius.circular(40),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: <Widget>[
                          const Icon(Icons.play_arrow_rounded, color: AppTheme.ink, size: 30),
                          const SizedBox(width: 6),
                          Text(
                            context.tr('start.tap'),
                            style: const TextStyle(
                              color: AppTheme.ink,
                              fontWeight: FontWeight.w900,
                              fontSize: 19,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),
                  Text(
                    context.tr('start.sound'),
                    style: const TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 28),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
