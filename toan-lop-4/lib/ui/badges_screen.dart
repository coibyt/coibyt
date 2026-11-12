import 'package:flutter/material.dart';

import '../app_state.dart';
import '../logic/badges.dart';
import 'app_theme.dart';
import '../logic/tutor.dart';
import '../tutor/teacher_intro.dart';

/// Bộ sưu tập huy hiệu của bé.
class BadgesScreen extends StatelessWidget {
  const BadgesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final got = app.progress.badges;
    return Scaffold(
      appBar: AppBar(title: Text('Huy hiệu (${got.length}/${allBadges.length})'), backgroundColor: AppColors.cream),
      body: Column(
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(12, 10, 12, 0),
            child: TeacherIntro(key: ValueKey('badges-intro'), lines: [TutorLines.screenBadges], avatarHeight: 90),
          ),
          Expanded(
            child: GridView.extent(
              maxCrossAxisExtent: 200,
              padding: const EdgeInsets.all(16),
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 0.85,
              children: [
                for (final b in allBadges)
                  Container(
                    key: ValueKey('badge-${b.id}'),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: got.containsKey(b.id) ? Colors.white : Colors.black.withValues(alpha: 0.04),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: got.containsKey(b.id) ? AppColors.honey : Colors.black12, width: 3),
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Opacity(
                          opacity: got.containsKey(b.id) ? 1 : 0.25,
                          child: Text(b.emoji, style: const TextStyle(fontSize: 52)),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          b.title,
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                        ),
                        Text(
                          got.containsKey(b.id) ? 'Đã nhận!' : b.description,
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 15,
                            color: got.containsKey(b.id) ? AppColors.good : Colors.black54,
                          ),
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
