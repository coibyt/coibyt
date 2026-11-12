import 'package:hive_ce_flutter/hive_ce_flutter.dart';

/// Kho khoá–giá trị (chuỗi JSON). Tách interface để test dùng bản bộ nhớ.
abstract class KeyValueStore {
  String? get(String key);
  Future<void> put(String key, String value);
  Future<void> delete(String key);
  Iterable<String> get keys;
}

class MemoryStore implements KeyValueStore {
  MemoryStore([Map<String, String>? initial]) : _data = {...?initial};

  final Map<String, String> _data;

  @override
  String? get(String key) => _data[key];

  @override
  Future<void> put(String key, String value) async => _data[key] = value;

  @override
  Future<void> delete(String key) async => _data.remove(key);

  @override
  Iterable<String> get keys => _data.keys;
}

/// Hive: lưu trên máy (Android/iOS: file; web: IndexedDB).
class HiveStore implements KeyValueStore {
  HiveStore._(this._box);

  static bool _initialized = false;

  static Future<HiveStore> open(String boxName) async {
    if (!_initialized) {
      await Hive.initFlutter('ong_vang_toan4');
      _initialized = true;
    }
    return HiveStore._(await Hive.openBox<String>(boxName));
  }

  final Box<String> _box;

  @override
  String? get(String key) => _box.get(key);

  @override
  Future<void> put(String key, String value) => _box.put(key, value);

  @override
  Future<void> delete(String key) => _box.delete(key);

  @override
  Iterable<String> get keys => _box.keys.cast<String>();
}
