import 'dart:async';

import 'package:flutter/material.dart';

import 'app_state.dart';
import 'config.dart';
import 'services/api_client.dart';
import 'services/content_repository.dart';
import 'services/kv_store.dart';
import 'services/sound_service.dart';
import 'services/sync_service.dart';
import 'services/tutor_voice.dart';
import 'ui/app_theme.dart';
import 'ui/child_screens.dart';
import 'ui/widgets/bee_mascot.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  AppSound.instance = AudioSoundService();
  AppTutorVoice.instance = TtsTutorVoice();
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
  late final Future<AppState> _state = (widget.stateFactory ?? _defaultState)();

  static Future<AppState> _defaultState() async {
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
        final Widget home;
        if (snap.hasError) {
          home = Scaffold(body: Center(child: Text('Không mở được app: ${snap.error}')));
        } else if (state == null) {
          home = const Scaffold(body: Center(child: BeeMascot(size: 140)));
        } else {
          home = const RootScreen();
        }
        final app = MaterialApp(
          title: 'Ong Vàng Toán 3',
          debugShowCheckedModeBanner: false,
          theme: buildAppTheme(),
          home: home,
        );
        // AppScope bọc NGOÀI MaterialApp để mọi màn hình (kể cả màn được push) đều thấy.
        return state == null ? app : AppScope(state: state, child: app);
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
