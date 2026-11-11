import 'dart:ui';

/// Languages the app ships with. Vietnamese is the default.
enum AppLanguage {
  vi,
  en;

  static const AppLanguage fallback = AppLanguage.vi;

  Locale get locale => Locale(name);

  /// JSON file with this language's texts.
  String get asset => 'assets/i18n/$name.json';

  static AppLanguage fromCode(String? code) =>
      AppLanguage.values.firstWhere((AppLanguage l) => l.name == code, orElse: () => fallback);
}
