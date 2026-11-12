import 'dart:async';

import 'package:flutter/material.dart';

import 'app_state.dart';
import 'config.dart';
import 'services/api_client.dart';
import 'services/content_repository.dart';
import 'services/kv_store.dart';
import 'services/exam_music.dart';
import 'services/show_music.dart';
import 'services/sound_service.dart';
import 'services/sync_service.dart';
import 'services/tutor_voice.dart';
import 'tutor/teacher_assets.dart';
import 'tutor/voice_library.dart';
import 'ui/app_theme.dart';
import 'ui/break_reminder.dart';
import 'ui/child_screens.dart';
import 'ui/splash_view.dart';
import 'ui/start_gate.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  AppSound.instance = AudioSoundService();
  AppTutorVoice.instance = TtsTutorVoice();
  ShowMusic.instance = AudioShowMusic();
  ExamMusic.instance = AudioExamMusic();
  runApp(const OngVangApp());
}

class OngVangApp extends StatefulWidget {
  const OngVangApp({super.key, this.stateFactory});

  /// Cho test truyền AppState dựng sẵn (bộ nhớ trong thay vì Hive).
  final Future<AppState> Function()? stateFactory;

  @override
  State<OngVangApp> createState() => _OngVangAppState();
}

class _OngVangAppState extends State<OngVangApp> {
  final _navigatorKey = GlobalKey<NavigatorState>();
  late final Future<AppState> _state = (widget.stateFactory ?? _defaultState)();

  static Future<AppState> _defaultState() async {
    // Ảnh cô giáo (Kie.ai) và giọng ghi âm (11max): có gì dùng nấy, thiếu thì dùng hình vẽ / giọng máy.
    TeacherAssets.instance = await TeacherAssets.load();
    VoiceLibrary.instance = await VoiceLibrary.load();
    final store = await HiveStore.open('progress');
    final state = AppState(
      content: ContentRepository(cache: await HiveStore.open('content')),
      store: store,
    );
    await state.init();
    if (AppConfig.hasApi) {
      final sync = SyncService(
        api: ApiClient(baseUrl: AppConfig.apiBaseUrl),
        store: store,
        app: state,
      )..restore();
      state.sync = sync;
      // Đồng bộ nền khi mở app; lỗi mạng không chặn bé học offline.
      unawaited(sync.syncNow());
    }
    return state;
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<AppState>(
      future: _state,
      builder: (context, snap) {
        final state = snap.data;
        if (state == null) {
          // Màn chờ / lỗi dùng một MaterialApp RIÊNG (không có navigatorKey). Lý do: nếu
          // dùng chung MaterialApp có GlobalKey, Navigator được giữ lại và màn chờ
          // không bao giờ được thay bằng trang chủ.
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            theme: buildAppTheme(),
            home: AppSplash(error: snap.hasError ? snap.error : null),
          );
        }
        // AppScope bọc NGOÀI MaterialApp để mọi màn hình (kể cả màn được push) đều thấy.
        return AppScope(
          state: state,
          child: BreakReminder(
            app: state,
            navigatorKey: _navigatorKey,
            child: MaterialApp(
              title: 'Ong Vàng Toán 4',
              navigatorKey: _navigatorKey,
              debugShowCheckedModeBanner: false,
              theme: buildAppTheme(),
              home: const StartGate(child: RootScreen()),
            ),
          ),
        );
      },
    );
  }
}

/// Lần đầu: chọn bộ sách. Sau đó: trang chủ của bé.
class RootScreen extends StatelessWidget {
  const RootScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    return app.book == null ? const BookPickerScreen() : const HomeScreen();
  }
}
