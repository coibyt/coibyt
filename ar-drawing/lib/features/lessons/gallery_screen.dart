import 'package:flutter/material.dart';

import '../../core/app_theme.dart';
import '../../core/i18n/language_controller.dart';
import '../teacher/teacher_controller.dart';
import '../teacher/teacher_scope.dart';
import '../teacher/widgets/teacher_overlay.dart';
import 'gallery_store.dart';
import 'lesson.dart';
import 'widgets/lesson_card.dart';

/// "My gallery": the learner's finished drawings, framed like an exhibition.
class GalleryScreen extends StatefulWidget {
  const GalleryScreen({super.key, required this.lessons});

  final List<Lesson> lessons;

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  final TeacherController _teacher = TeacherController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) _teacher.introduce(TeacherScope.maybeOf(context), 'gallery_intro');
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  Lesson? _lesson(String id) {
    for (final Lesson l in widget.lessons) {
      if (l.id == id) return l;
    }
    return null;
  }

  void _open(GalleryItem item) {
    final Lesson? lesson = _lesson(item.lessonId);
    showDialog<void>(
      context: context,
      builder: (BuildContext context) => Dialog(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              if (lesson != null)
                Text(context.tr(lesson.titleKey), style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 6),
              StarRow(stars: item.stars, size: 26),
              const SizedBox(height: 12),
              Container(
                color: const Color(0xFFFFFDF8),
                padding: const EdgeInsets.all(8),
                child: Image.memory(item.png, fit: BoxFit.contain),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  TextButton.icon(
                    key: const Key('deleteDrawing'),
                    onPressed: () {
                      GalleryScope.read(this.context)?.remove(item);
                      Navigator.of(context).pop();
                    },
                    icon: const Icon(Icons.delete_outline),
                    label: Text(context.tr('path.delete')),
                  ),
                  const SizedBox(width: 8),
                  FilledButton(
                    onPressed: () => Navigator.of(context).pop(),
                    child: Text(context.tr('home.gotIt')),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final List<GalleryItem> items = GalleryScope.maybeOf(context)?.items ?? const <GalleryItem>[];
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('path.gallery'))),
      body: Stack(
        children: <Widget>[
          if (items.isEmpty)
            Center(
              child: Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    const Icon(Icons.photo_library_outlined, size: 64, color: Colors.white38),
                    const SizedBox(height: 12),
                    Text(
                      context.tr('path.galleryEmpty'),
                      key: const Key('galleryEmpty'),
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              ),
            )
          else
            GridView.builder(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 160),
              gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                maxCrossAxisExtent: 220,
                mainAxisSpacing: 14,
                crossAxisSpacing: 14,
                childAspectRatio: 0.72,
              ),
              itemCount: items.length,
              itemBuilder: (BuildContext context, int i) {
                final GalleryItem it = items[i];
                final Lesson? lesson = _lesson(it.lessonId);
                return GestureDetector(
                  key: Key('drawing-$i'),
                  onTap: () => _open(it),
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      // a golden picture frame
                      gradient: const LinearGradient(
                        colors: <Color>[Color(0xFFE8B75A), Color(0xFF9A6A22), Color(0xFFF2CF7E)],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                      borderRadius: BorderRadius.circular(10),
                      boxShadow: const <BoxShadow>[
                        BoxShadow(color: Color(0x88000000), blurRadius: 12),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        Expanded(
                          child: Container(
                            color: const Color(0xFFFFFDF8),
                            padding: const EdgeInsets.all(6),
                            child: Image.memory(it.png, fit: BoxFit.contain),
                          ),
                        ),
                        Container(
                          color: AppTheme.sheet,
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 5),
                          child: Row(
                            children: <Widget>[
                              Expanded(
                                child: Text(
                                  lesson == null ? '' : context.tr(lesson.titleKey),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                                ),
                              ),
                              StarRow(stars: it.stars, size: 13),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          Positioned.fill(child: TeacherOverlay(controller: _teacher)),
        ],
      ),
    );
  }
}
