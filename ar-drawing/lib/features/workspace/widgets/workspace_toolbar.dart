import 'package:flutter/material.dart';

import '../../../core/i18n/language_controller.dart';
import '../../timelapse/timelapse_recorder.dart';

/// Top bar of the workspace: back, recording badge, reset, flashlight, lock.
class WorkspaceToolbar extends StatelessWidget {
  const WorkspaceToolbar({
    super.key,
    required this.locked,
    required this.torchOn,
    required this.canReset,
    required this.onLock,
    required this.onTorch,
    required this.onReset,
    this.onBack,
    this.recorder,
  });

  final bool locked;
  final bool torchOn;
  final bool canReset;
  final VoidCallback onLock;
  final VoidCallback onTorch;
  final VoidCallback onReset;
  final VoidCallback? onBack;

  /// Non-null while a time-lapse is being recorded.
  final TimelapseRecorder? recorder;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    final TimelapseRecorder? rec = recorder;
    return SafeArea(
      minimum: const EdgeInsets.fromLTRB(12, 12, 12, 0),
      child: Row(
        children: <Widget>[
          if (onBack != null)
            _RoundButton(
              key: const Key('backButton'),
              icon: Icons.arrow_back,
              tooltip: context.tr('workspace.back'),
              onPressed: onBack!,
            ),
          const Spacer(),
          if (rec != null)
            ListenableBuilder(
              listenable: rec,
              builder: (BuildContext context, _) =>
                  _RecordingBadge(elapsed: rec.elapsed, frames: rec.frameCount),
            ),
          const Spacer(),
          if (canReset) ...<Widget>[
            _RoundButton(
              key: const Key('resetButton'),
              icon: Icons.center_focus_strong,
              tooltip: context.tr('workspace.resetPosition'),
              onPressed: onReset,
            ),
            const SizedBox(width: 8),
          ],
          _RoundButton(
            key: const Key('torchButton'),
            icon: torchOn ? Icons.flashlight_on : Icons.flashlight_off,
            tooltip: torchOn ? context.tr('workspace.flashOff') : context.tr('workspace.flashOn'),
            active: torchOn,
            onPressed: onTorch,
          ),
          const SizedBox(width: 8),
          _RoundButton(
            key: const Key('lockButton'),
            icon: locked ? Icons.lock : Icons.lock_open,
            tooltip: locked ? context.tr('workspace.unlock') : context.tr('workspace.lock'),
            active: locked,
            activeColor: colors.primary,
            onPressed: onLock,
          ),
        ],
      ),
    );
  }
}

class _RoundButton extends StatelessWidget {
  const _RoundButton({
    super.key,
    required this.icon,
    required this.tooltip,
    required this.onPressed,
    this.active = false,
    this.activeColor,
  });

  final IconData icon;
  final String tooltip;
  final VoidCallback onPressed;
  final bool active;
  final Color? activeColor;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    final Color bg = active
        ? (activeColor ?? colors.primary)
        : colors.surface.withValues(alpha: 0.72);
    final Color fg = active ? colors.onPrimary : Colors.white;
    return Tooltip(
      message: tooltip,
      child: Material(
        color: bg,
        shape: const CircleBorder(),
        child: InkWell(
          customBorder: const CircleBorder(),
          onTap: onPressed,
          child: SizedBox(
            width: 48,
            height: 48,
            child: Icon(icon, color: fg, semanticLabel: tooltip),
          ),
        ),
      ),
    );
  }
}

class _RecordingBadge extends StatelessWidget {
  const _RecordingBadge({required this.elapsed, required this.frames});

  final Duration elapsed;
  final int frames;

  @override
  Widget build(BuildContext context) {
    final String time =
        '${elapsed.inMinutes.toString().padLeft(2, '0')}:${(elapsed.inSeconds % 60).toString().padLeft(2, '0')}';
    return DecoratedBox(
      key: const Key('recordingBadge'),
      decoration: BoxDecoration(
        color: Colors.black.withValues(alpha: 0.6),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            const Icon(Icons.fiber_manual_record, color: Color(0xFFFF4D4D), size: 14),
            const SizedBox(width: 6),
            Text('REC $time · $frames', style: const TextStyle(color: Colors.white, fontSize: 13)),
          ],
        ),
      ),
    );
  }
}
