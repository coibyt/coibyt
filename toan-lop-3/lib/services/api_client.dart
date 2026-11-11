import 'dart:convert';

import 'package:http/http.dart' as http;

/// Lỗi từ máy chủ: `{ "error": "<code>", "message": "..." }`.
class ApiException implements Exception {
  ApiException(this.status, this.code, this.message);

  final int status;
  final String code;
  final String message;

  @override
  String toString() => 'ApiException($status, $code): $message';
}

class Account {
  const Account({required this.id, required this.email, required this.isVip, this.vipUntil});

  factory Account.fromJson(Map<String, dynamic> j) => Account(
    id: '${j['id']}',
    email: j['email'] as String,
    isVip: j['isVip'] as bool? ?? false,
    vipUntil: j['vipUntil'] == null ? null : DateTime.tryParse(j['vipUntil'] as String),
  );

  final String id;
  final String email;
  final bool isVip;
  final DateTime? vipUntil;
}

class ChildProfile {
  const ChildProfile({required this.id, required this.name});

  final String id;
  final String name;
}

/// Tài liệu nội dung tải về (bài học / đề).
class RemoteDocument {
  const RemoteDocument({required this.rev, required this.body});

  final int rev;
  final Map<String, dynamic> body;
}

/// Gọi API máy chủ Node.js (xem toan-lop-3/server/README.md).
class ApiClient {
  ApiClient({required this.baseUrl, http.Client? client, this.token}) : _http = client ?? http.Client();

  final String baseUrl;
  final http.Client _http;
  String? token;

  Uri _u(String path) => Uri.parse('${baseUrl.replaceAll(RegExp(r'/+$'), '')}$path');

  Map<String, String> _headers({Map<String, String>? extra}) => {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    if (token != null) 'Authorization': 'Bearer $token',
    ...?extra,
  };

  Never _fail(http.Response r) {
    var code = 'http_${r.statusCode}';
    var message = 'Máy chủ trả lỗi ${r.statusCode}';
    try {
      final j = jsonDecode(utf8.decode(r.bodyBytes)) as Map<String, dynamic>;
      code = j['error'] as String? ?? code;
      message = j['message'] as String? ?? message;
    } catch (_) {}
    throw ApiException(r.statusCode, code, message);
  }

  Map<String, dynamic> _json(http.Response r, {Set<int> ok = const {200, 201}}) {
    if (!ok.contains(r.statusCode)) _fail(r);
    return jsonDecode(utf8.decode(r.bodyBytes)) as Map<String, dynamic>;
  }

  Future<(String, Account)> register(String email, String password) => _auth('/v1/auth/register', email, password);

  Future<(String, Account)> login(String email, String password) => _auth('/v1/auth/login', email, password);

  Future<(String, Account)> _auth(String path, String email, String password) async {
    final r = await _http.post(_u(path), headers: _headers(), body: jsonEncode({'email': email, 'password': password}));
    final j = _json(r);
    token = j['token'] as String;
    return (token!, Account.fromJson(j['account'] as Map<String, dynamic>));
  }

  Future<void> logout() async {
    final r = await _http.post(_u('/v1/auth/logout'), headers: _headers());
    if (r.statusCode != 204 && r.statusCode != 401) _fail(r);
    token = null;
  }

  Future<Account> me() async =>
      Account.fromJson(_json(await _http.get(_u('/v1/me'), headers: _headers()))['account'] as Map<String, dynamic>);

  Future<List<ChildProfile>> children() async {
    final j = _json(await _http.get(_u('/v1/children'), headers: _headers()));
    return [
      for (final c in (j['children'] as List).cast<Map<String, dynamic>>())
        ChildProfile(id: '${c['id']}', name: c['name'] as String),
    ];
  }

  Future<ChildProfile> createChild(String name) async {
    final j = _json(await _http.post(_u('/v1/children'), headers: _headers(), body: jsonEncode({'name': name})));
    return ChildProfile(id: '${j['id']}', name: j['name'] as String);
  }

  Future<Map<String, dynamic>?> getProgress(String childId) async {
    final j = _json(await _http.get(_u('/v1/children/$childId/progress'), headers: _headers()));
    return j['progress'] as Map<String, dynamic>?;
  }

  /// Gửi tiến độ; máy chủ gộp và trả về bản đã gộp.
  Future<Map<String, dynamic>> putProgress(String childId, Map<String, dynamic> progress) async {
    final j = _json(
      await _http.put(
        _u('/v1/children/$childId/progress'),
        headers: _headers(),
        body: jsonEncode({'progress': progress}),
      ),
    );
    return j['progress'] as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> catalog() async => _json(await _http.get(_u('/v1/catalog'), headers: _headers()));

  /// Tải bài học/đề. Trả về null nếu bản trên máy đã mới nhất (304).
  /// Ném [ApiException] `vip_required` (403) nếu là nội dung VIP.
  Future<RemoteDocument?> content(String kind, String id, {int? knownRev}) async {
    final r = await _http.get(
      _u('/v1/content/$kind/${Uri.encodeComponent(id)}'),
      headers: _headers(extra: {if (knownRev != null) 'If-None-Match': '"$id@$knownRev"'}),
    );
    if (r.statusCode == 304) return null;
    final j = _json(r);
    return RemoteDocument(rev: j['rev'] as int, body: j['body'] as Map<String, dynamic>);
  }

  /// Gửi biên lai mua hàng để máy chủ xác minh với App Store / Google Play.
  Future<Account> verifyPurchase({required String platform, required String productId, required String receipt}) async {
    final j = _json(
      await _http.post(
        _u('/v1/iap/verify'),
        headers: _headers(),
        body: jsonEncode({'platform': platform, 'productId': productId, 'receipt': receipt}),
      ),
    );
    return Account.fromJson(j['account'] as Map<String, dynamic>);
  }
}
