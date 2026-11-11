import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import 'app_language.dart';

/// Texts of one language, read from `assets/i18n/<code>.json`.
///
/// The JSON is nested by screen (`{"home": {"templates": "Tranh mẫu"}}`) and
/// looked up with dotted keys (`home.templates`). `{name}` placeholders are
/// filled from [tr]'s `args`. A key missing in this language falls back to
/// [fallback] (Vietnamese), then to the key itself, so a forgotten text is
/// visible but never crashes the app.
class Translations {
  Translations(this.language, Map<String, Object?> json, {this.fallback}) : _texts = _flatten(json);

  final AppLanguage language;
  final Translations? fallback;
  final Map<String, String> _texts;

  /// All keys of this language (used by tests to compare languages).
  Iterable<String> get keys => _texts.keys;

  static Future<Translations> load(AppLanguage language, {AssetBundle? bundle}) async {
    final AssetBundle source = bundle ?? rootBundle;
    Translations? fallback;
    if (language != AppLanguage.fallback) {
      fallback = await load(AppLanguage.fallback, bundle: source);
    }
    final String raw = await source.loadString(language.asset);
    return Translations(language, jsonDecode(raw) as Map<String, Object?>, fallback: fallback);
  }

  bool has(String key) => _texts.containsKey(key);

  String tr(String key, {Map<String, Object?> args = const <String, Object?>{}}) {
    String? text = _texts[key] ?? fallback?._texts[key];
    if (text == null) {
      debugPrint('Missing translation: $key (${language.name})');
      return key;
    }
    args.forEach((String name, Object? value) {
      text = text!.replaceAll('{$name}', '$value');
    });
    return text!;
  }

  static Map<String, String> _flatten(Map<String, Object?> json, [String prefix = '']) {
    final Map<String, String> out = <String, String>{};
    json.forEach((String key, Object? value) {
      final String path = prefix.isEmpty ? key : '$prefix.$key';
      if (value is Map<String, Object?>) {
        out.addAll(_flatten(value, path));
      } else if (value != null) {
        out[path] = '$value';
      }
    });
    return out;
  }
}
