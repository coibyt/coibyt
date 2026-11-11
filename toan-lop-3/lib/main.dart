import 'package:flutter/material.dart';

import 'models/content.dart';
import 'services/content_repository.dart';
import 'ui/app_theme.dart';
import 'ui/quiz_screen.dart';
import 'ui/widgets/big_button.dart';

void main() {
  runApp(const OngVangApp());
}

class OngVangApp extends StatelessWidget {
  const OngVangApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ong Vàng Toán 3',
      debugShowCheckedModeBanner: false,
      theme: buildAppTheme(),
      home: const LessonPickerScreen(),
    );
  }
}

/// MÀN HÌNH TẠM của Phase 1: liệt kê bài học trong catalog để thử QuizScreen.
class LessonPickerScreen extends StatefulWidget {
  const LessonPickerScreen({super.key});

  @override
  State<LessonPickerScreen> createState() => _LessonPickerScreenState();
}

class _LessonPickerScreenState extends State<LessonPickerScreen> {
  final _repo = ContentRepository();
  late final Future<Catalog> _catalog = _repo.loadCatalog();
  bool _vip = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.honey,
        title: const Text('🐝 Ong Vàng Toán 3', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: FutureBuilder<Catalog>(
        future: _catalog,
        builder: (context, snap) {
          if (snap.hasError) return Center(child: Text('${snap.error}'));
          if (!snap.hasData) return const Center(child: CircularProgressIndicator());
          final lessons = [
            for (final b in snap.data!.books)
              for (final c in b.chapters) ...c.lessons,
          ];
          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              SwitchListTile(
                value: _vip,
                onChanged: (v) => setState(() => _vip = v),
                title: const Text('Thử chế độ VIP', style: TextStyle(fontSize: 20)),
              ),
              for (final l in lessons)
                Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: BigButton(
                    label: l.title,
                    color: AppColors.sky,
                    onPressed: () => Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => QuizScreen(lessonAsset: l.src, isVip: _vip, repository: _repo),
                      ),
                    ),
                  ),
                ),
            ],
          );
        },
      ),
    );
  }
}
