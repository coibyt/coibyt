import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'app_language.dart';
import 'translations.dart';

/// Holds the current language and its texts; remembers the user's choice.
class LanguageController extends ChangeNotifier {
  LanguageController(this._translations);

  static const String _prefsKey = 'language';

  Translations _translations;

  Translations get translations => _translations;
  AppLanguage get language => _translations.language;

  /// Loads the saved language (Vietnamese on first start).
  static Future<LanguageController> load({AssetBundle? bundle}) async {
    AppLanguage language = AppLanguage.fallback;
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      language = AppLanguage.fromCode(prefs.getString(_prefsKey));
    } on Object catch (e) {
      debugPrint('Could not read language setting: $e');
    }
    return LanguageController(await Translations.load(language, bundle: bundle));
  }

  Future<void> setLanguage(AppLanguage language, {AssetBundle? bundle}) async {
    if (language == this.language) return;
    _translations = await Translations.load(language, bundle: bundle);
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(_prefsKey, language.name);
    } on Object catch (e) {
      debugPrint('Could not save language setting: $e');
    }
  }
}

/// Makes the [LanguageController] available to the widget tree and rebuilds
/// dependants when the language changes.
class I18nScope extends InheritedNotifier<LanguageController> {
  const I18nScope({super.key, required LanguageController controller, required super.child})
    : super(notifier: controller);

  static LanguageController of(BuildContext context) {
    final I18nScope? scope = context.dependOnInheritedWidgetOfExactType<I18nScope>();
    assert(scope != null, 'No I18nScope above this widget');
    return scope!.notifier!;
  }
}

extension I18nContext on BuildContext {
  /// Translated text for [key], e.g. `context.tr('home.templates')`.
  String tr(String key, {Map<String, Object?> args = const <String, Object?>{}}) =>
      I18nScope.of(this).translations.tr(key, args: args);

  AppLanguage get language => I18nScope.of(this).language;
}
