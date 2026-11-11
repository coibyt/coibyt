import 'package:flutter/material.dart';

import '../game_art.dart';

/// A glossy destination card: jewel gradient, a 3D illustration popping out
/// of the top-right corner, title, subtitle and an optional badge.
class ArtTile extends StatelessWidget {
  const ArtTile({
    super.key,
    required this.art,
    required this.title,
    required this.subtitle,
    required this.colors,
    required this.onTap,
    this.badge,
    this.alert = false,
    this.locked = false,
    this.onLocked,
  });

  /// Learning comes first: the tile is shown dimmed with a padlock.
  final bool locked;
  final VoidCallback? onLocked;

  final String art;
  final String title;
  final String subtitle;
  final List<Color> colors;
  final VoidCallback onTap;

  /// Small pill in the top-left corner (e.g. "1/3").
  final String? badge;

  /// Shows a glowing dot: a reward is waiting.
  final bool alert;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(24),
      clipBehavior: Clip.antiAlias,
      child: Ink(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: colors,
          ),
          border: Border.all(color: const Color(0x33FFFFFF)),
          borderRadius: BorderRadius.circular(24),
        ),
        child: InkWell(
          onTap: locked ? onLocked : onTap,
          child: Stack(
            children: <Widget>[
              // soft light from the top-left corner
              const Positioned.fill(
                child: DecoratedBox(
                  decoration: BoxDecoration(
                    gradient: RadialGradient(
                      center: Alignment(-0.9, -1),
                      radius: 1.1,
                      colors: <Color>[Color(0x33FFFFFF), Color(0x00FFFFFF)],
                    ),
                  ),
                ),
              ),
              Positioned(right: -4, top: 2, child: ArtImage(art, size: 88)),
              Positioned(
                left: 14,
                right: 12,
                bottom: 12,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Text(
                      title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontWeight: FontWeight.w900,
                        fontSize: 16,
                        height: 1.15,
                        color: Colors.white,
                        shadows: <Shadow>[Shadow(color: Color(0x66000000), blurRadius: 6)],
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      subtitle,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: Color(0xDDFFFFFF), fontSize: 12, height: 1.25),
                    ),
                  ],
                ),
              ),
              if (locked)
                Positioned.fill(
                  child: Container(
                    key: const Key('tileLocked'),
                    color: const Color(0x9914122E),
                    alignment: Alignment.center,
                    child: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: const BoxDecoration(
                        color: Color(0xCC2F2B66),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.lock_rounded, color: Color(0xFFFFD27A), size: 26),
                    ),
                  ),
                ),
              if (!locked && (badge != null || alert))
                Positioned(
                  left: 12,
                  top: 12,
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      if (badge != null)
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0x55000000),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            badge!,
                            style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                          ),
                        ),
                      if (alert)
                        Container(
                          key: const Key('tileAlert'),
                          margin: const EdgeInsets.only(left: 6),
                          width: 12,
                          height: 12,
                          decoration: const BoxDecoration(
                            color: Color(0xFFFF4D6D),
                            shape: BoxShape.circle,
                            boxShadow: <BoxShadow>[
                              BoxShadow(color: Color(0xAAFF4D6D), blurRadius: 8),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
