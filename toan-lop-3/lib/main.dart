import 'package:flutter/material.dart';

import 'app_state.dart';
import 'services/content_repository.dart';
import 'services/kv_store.dart';
import 'ui/app_theme.dart';
import 'ui/child_screens.dart';
import 'ui/widgets/bee_mascot.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
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
    final state = AppState(
      content: ContentRepository(),
      store: await HiveStore.open('progress'),
    );
    await state.init();
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
