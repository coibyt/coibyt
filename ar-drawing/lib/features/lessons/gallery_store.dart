import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// A finished drawing kept in "My gallery".
@immutable
class GalleryItem {
  const GalleryItem({
    required this.lessonId,
    required this.stars,
    required this.at,
    required this.png,
  });

  factory GalleryItem.fromJson(Map<String, Object?> j) => GalleryItem(
    lessonId: j['lesson']! as String,
    stars: (j['stars']! as num).toInt(),
    at: DateTime.fromMillisecondsSinceEpoch((j['at']! as num).toInt()),
    png: base64Decode(j['png']! as String),
  );

  final String lessonId;
  final int stars;
  final DateTime at;

  /// Small PNG of the learner's drawing.
  final Uint8List png;

  Map<String, Object?> toJson() => <String, Object?>{
    'lesson': lessonId,
    'stars': stars,
    'at': at.millisecondsSinceEpoch,
    'png': base64Encode(png),
  };
}

/// The learner's own finished lesson drawings, newest first, on this device.
class GalleryStore extends ChangeNotifier {
  GalleryStore([List<GalleryItem>? items]) : _items = items ?? <GalleryItem>[];

  static const String _key = 'gallery';

  /// Keeps storage small (browser storage is limited).
  static const int maxItems = 24;

  final List<GalleryItem> _items;

  List<GalleryItem> get items => List<GalleryItem>.unmodifiable(_items);

  static Future<GalleryStore> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      final String? raw = prefs.getString(_key);
      if (raw != null) {
        return GalleryStore(<GalleryItem>[
          for (final Object? o in jsonDecode(raw) as List<Object?>)
            GalleryItem.fromJson(o! as Map<String, Object?>),
        ]);
      }
    } on Object catch (e) {
      debugPrint('Could not read gallery: $e');
    }
    return GalleryStore();
  }

  Future<void> add(GalleryItem item) async {
    _items.insert(0, item);
    if (_items.length > maxItems) _items.removeRange(maxItems, _items.length);
    notifyListeners();
    await _save();
  }

  Future<void> remove(GalleryItem item) async {
    _items.remove(item);
    notifyListeners();
    await _save();
  }

  Future<void> _save() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(
        _key,
        jsonEncode(<Object?>[for (final GalleryItem i in _items) i.toJson()]),
      );
    } on Object catch (e) {
      debugPrint('Could not save gallery: $e');
    }
  }
}

class GalleryScope extends InheritedNotifier<GalleryStore> {
  const GalleryScope({super.key, required GalleryStore store, required super.child})
    : super(notifier: store);

  static GalleryStore? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<GalleryScope>()?.notifier;

  static GalleryStore? read(BuildContext context) =>
      context.getInheritedWidgetOfExactType<GalleryScope>()?.notifier;
}
