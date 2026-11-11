/// Đọc JSON có kiểu, báo lỗi kèm đường dẫn (vd `problems[3].blanks[0].answer.value`)
/// để người nhập nội dung trong CMS biết ngay sai ở đâu.
library;

/// Phiên bản schema mà app này hiểu (major phải trùng).
const int supportedSchemaMajor = 1;

class ContentFormatException implements Exception {
  ContentFormatException(this.path, this.message);

  final String path;
  final String message;

  @override
  String toString() => 'Nội dung sai định dạng tại "$path": $message';
}

/// Bọc một `Map` JSON cùng đường dẫn của nó.
class JsonReader {
  JsonReader(this.json, [this.path = r'$']);

  factory JsonReader.root(Object? value, [String path = r'$']) {
    if (value is! Map<String, dynamic>) {
      throw ContentFormatException(path, 'phải là object JSON');
    }
    return JsonReader(value, path);
  }

  final Map<String, dynamic> json;
  final String path;

  String _p(String key) => '$path.$key';

  bool has(String key) => json.containsKey(key) && json[key] != null;

  T _req<T>(String key) {
    if (!json.containsKey(key) || json[key] == null) {
      throw ContentFormatException(_p(key), 'thiếu trường bắt buộc');
    }
    final value = json[key];
    if (value is! T) {
      throw ContentFormatException(
        _p(key),
        'kiểu phải là $T nhưng lại là ${value.runtimeType}',
      );
    }
    return value;
  }

  T? _opt<T>(String key) {
    final value = json[key];
    if (value == null) return null;
    if (value is! T) {
      throw ContentFormatException(
        _p(key),
        'kiểu phải là $T nhưng lại là ${value.runtimeType}',
      );
    }
    return value;
  }

  String string(String key) {
    final s = _req<String>(key);
    if (s.trim().isEmpty) {
      throw ContentFormatException(_p(key), 'không được để trống');
    }
    return s;
  }

  String? optString(String key) => _opt<String>(key);

  int integer(String key, {int? min, int? max}) {
    final v = _req<num>(key);
    return _checkInt(key, v, min, max);
  }

  int? optInteger(String key, {int? min, int? max}) {
    final v = _opt<num>(key);
    return v == null ? null : _checkInt(key, v, min, max);
  }

  int _checkInt(String key, num v, int? min, int? max) {
    if (v is! int && v != v.roundToDouble()) {
      throw ContentFormatException(_p(key), 'phải là số nguyên, đang là $v');
    }
    final i = v.toInt();
    if (min != null && i < min) {
      throw ContentFormatException(_p(key), 'phải ≥ $min, đang là $i');
    }
    if (max != null && i > max) {
      throw ContentFormatException(_p(key), 'phải ≤ $max, đang là $i');
    }
    return i;
  }

  bool boolean(String key, {required bool defaultValue}) =>
      _opt<bool>(key) ?? defaultValue;

  double? optDouble(String key) => _opt<num>(key)?.toDouble();

  /// Đọc một chuỗi thuộc tập giá trị cho phép.
  String oneOf(String key, Set<String> allowed) {
    final s = string(key);
    if (!allowed.contains(s)) {
      throw ContentFormatException(
        _p(key),
        '"$s" không hợp lệ, chỉ nhận: ${allowed.join(', ')}',
      );
    }
    return s;
  }

  JsonReader object(String key) =>
      JsonReader(_req<Map<String, dynamic>>(key), _p(key));

  JsonReader? optObject(String key) {
    final m = _opt<Map<String, dynamic>>(key);
    return m == null ? null : JsonReader(m, _p(key));
  }

  /// Danh sách object, mỗi phần tử được chuyển bằng [convert].
  List<T> objects<T>(
    String key,
    T Function(JsonReader r) convert, {
    int minItems = 0,
    bool optional = false,
  }) {
    final List<dynamic> list = optional
        ? (_opt<List<dynamic>>(key) ?? const [])
        : _req<List<dynamic>>(key);
    if (list.length < minItems) {
      throw ContentFormatException(_p(key), 'cần ít nhất $minItems phần tử');
    }
    return [
      for (var i = 0; i < list.length; i++)
        convert(JsonReader.root(list[i], '${_p(key)}[$i]')),
    ];
  }

  List<String> strings(String key, {int minItems = 0, bool optional = false}) {
    final List<dynamic> list = optional
        ? (_opt<List<dynamic>>(key) ?? const [])
        : _req<List<dynamic>>(key);
    if (list.length < minItems) {
      throw ContentFormatException(_p(key), 'cần ít nhất $minItems phần tử');
    }
    return [
      for (var i = 0; i < list.length; i++)
        if (list[i] is String)
          list[i] as String
        else
          throw ContentFormatException('${_p(key)}[$i]', 'phải là chuỗi'),
    ];
  }

  List<int> integers(String key, {bool optional = false}) {
    final List<dynamic> list = optional
        ? (_opt<List<dynamic>>(key) ?? const [])
        : _req<List<dynamic>>(key);
    return [
      for (var i = 0; i < list.length; i++)
        if (list[i] is int)
          list[i] as int
        else
          throw ContentFormatException('${_p(key)}[$i]', 'phải là số nguyên'),
    ];
  }

  /// Kiểm tra `schemaVersion` dạng `1.x.y`.
  String schemaVersion() {
    final v = string('schemaVersion');
    final match = RegExp(r'^(\d+)\.(\d+)\.(\d+)$').firstMatch(v);
    if (match == null) {
      throw ContentFormatException(_p('schemaVersion'), '"$v" không phải semver');
    }
    final major = int.parse(match.group(1)!);
    if (major != supportedSchemaMajor) {
      throw ContentFormatException(
        _p('schemaVersion'),
        'app chỉ đọc được schema $supportedSchemaMajor.x, file là $v — hãy cập nhật app',
      );
    }
    return v;
  }
}
