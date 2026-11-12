import 'package:flutter/widgets.dart';

import 'english_audio.dart';
import 'english_catalog.dart';
import 'english_store.dart';

/// Gives the English corner (words, Pip's voice, progress) to the app.
class EnglishScope extends InheritedNotifier<EnglishStore> {
  const EnglishScope({
    super.key,
    required this.catalog,
    required this.audio,
    required EnglishStore store,
    required super.child,
  }) : super(notifier: store);

  final EnglishCatalog catalog;
  final EnglishAudio audio;

  EnglishStore get store => notifier!;

  static EnglishScope? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<EnglishScope>();

  static EnglishScope? read(BuildContext context) =>
      context.getInheritedWidgetOfExactType<EnglishScope>();
}
