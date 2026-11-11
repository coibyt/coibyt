import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Tracing works best with the phone held upright above the paper, and a
  // fixed orientation keeps the camera preview and the overlay aligned.
  await SystemChrome.setPreferredOrientations(<DeviceOrientation>[DeviceOrientation.portraitUp]);

  runApp(const TraceLightApp());
}
