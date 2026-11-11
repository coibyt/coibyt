import 'package:flutter/material.dart';

import '../logic/tutor.dart';
import '../ui/app_theme.dart';
import 'teacher_assets.dart';
import 'teacher_avatar.dart';
import 'teacher_controller.dart';
import 'teacher_hud.dart';
import 'voice_library.dart';

/// Màn kiểm tra cho phụ huynh/người làm nội dung: xem từng tư thế cô giáo (thở, chớp mắt),
/// nghe thử và xem khớp khẩu hình, xem vật phẩm Kie.ai đã có hay chưa.
class TeacherGalleryScreen extends StatefulWidget {
  const TeacherGalleryScreen({super.key});

  @override
  State<TeacherGalleryScreen> createState() => _TeacherGalleryScreenState();
}

class _TeacherGalleryScreenState extends State<TeacherGalleryScreen> {
  final _teacher = TeacherController();

  static const _samples = {
    TeacherMood.idle: TutorLines.greeting,
    TeacherMood.think: TutorLines.wrongColumn,
    TeacherMood.clap: 'Xuất sắc!',
  };

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) TeacherAssets.instance.precache(context);
    });
  }

  @override
  void dispose() {
    _teacher.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final a = TeacherAssets.instance;
    const h = TextStyle(fontSize: 20, fontWeight: FontWeight.w700);
    return Scaffold(
      appBar: AppBar(title: const Text('Xem cô giáo & ảnh'), backgroundColor: AppColors.honeySoft),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          TeacherHud(controller: _teacher, avatarHeight: 150),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: [
              for (final e in _samples.entries)
                FilledButton.tonal(
                  key: ValueKey('try-${e.key.name}'),
                  onPressed: () => _teacher.say([e.value], mood: e.key, forceVoice: true),
                  child: Text('Nói thử: ${_moodName(e.key)}'),
                ),
            ],
          ),
          const SizedBox(height: 16),
          const Text('Các tư thế', style: h),
          Text(
            a.hasTeacherImages
                ? 'Đang dùng ảnh Kie.ai trong assets/tutor/.'
                : 'Chưa có ảnh Kie.ai: đang dùng hình vẽ tạm bằng code.',
            style: const TextStyle(color: Colors.black54),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              for (final mood in TeacherMood.values)
                for (final open in [false, true])
                  Column(
                    children: [
                      Container(
                        color: Colors.white,
                        child: TeacherAvatar(height: 140, mood: mood, mouthOpen: open),
                      ),
                      Text('${_moodName(mood)}${open ? ' · mở miệng' : ''}'),
                    ],
                  ),
            ],
          ),
          const SizedBox(height: 16),
          const Text('Tệp ảnh', style: h),
          for (final p in TeacherPose.values) _status('teacher_${p.fileStem}.png', a.pose(p)),
          for (final u in UiAsset.values) _status('${u.name}.png', a.ui(u), preview: true),
          const SizedBox(height: 16),
          const Text('Giọng 11max', style: h),
          Text('${VoiceLibrary.instance.length} câu đã ghi âm sẵn trong assets/voice/.'),
          const SizedBox(height: 8),
          const Text(
            'Hướng dẫn tạo ảnh và giọng: docs/HUONG-DAN-ANH-KIE-AI.md',
            style: TextStyle(color: Colors.black54),
          ),
        ],
      ),
    );
  }

  static String _moodName(TeacherMood m) => switch (m) {
    TeacherMood.idle => 'Mỉm cười',
    TeacherMood.think => 'Suy nghĩ',
    TeacherMood.clap => 'Vỗ tay',
    TeacherMood.point => 'Chỉ bảng',
  };

  Widget _status(String name, String? path, {bool preview = false}) => ListTile(
    dense: true,
    contentPadding: EdgeInsets.zero,
    leading: Icon(
      path != null ? Icons.check_circle : Icons.radio_button_unchecked,
      color: path != null ? AppColors.good : Colors.black26,
    ),
    title: Text(name),
    subtitle: Text(path ?? 'chưa có — dùng hình vẽ / biểu tượng thay thế'),
    trailing: preview && path != null ? Image.asset(path, width: 48, height: 48) : null,
  );
}
