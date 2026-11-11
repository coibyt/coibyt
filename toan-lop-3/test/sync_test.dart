import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:toan_lop_3/app_state.dart';
import 'package:toan_lop_3/models/progress.dart';
import 'package:toan_lop_3/services/api_client.dart';
import 'package:toan_lop_3/services/content_repository.dart';
import 'package:toan_lop_3/services/kv_store.dart';
import 'package:toan_lop_3/services/sync_service.dart';

import 'helpers.dart';

/// Máy chủ giả theo đúng hợp đồng API v1.
class FakeServer {
  Map<String, dynamic>? storedProgress;
  bool vip = false;
  final requests = <String>[];

  http.Response _j(Object body, [int status = 200]) => http.Response.bytes(
    utf8.encode(jsonEncode(body)),
    status,
    headers: {'content-type': 'application/json; charset=utf-8'},
  );

  Map<String, dynamic> get account => {
    'id': 1,
    'email': 'bo.me@example.com',
    'isVip': vip,
    'vipUntil': vip ? '2027-01-01T00:00:00.000Z' : null,
  };

  late final client = MockClient((req) async {
    requests.add('${req.method} ${req.url.path}');
    final authed = req.headers['authorization'] == 'Bearer tok-1';
    switch ((req.method, req.url.path)) {
      case ('POST', '/v1/auth/login'):
        final b = jsonDecode(req.body) as Map;
        if (b['password'] != 'matkhau123') {
          return _j({'error': 'invalid_credentials', 'message': 'Sai email hoặc mật khẩu'}, 401);
        }
        return _j({'token': 'tok-1', 'account': account});
      case ('GET', '/v1/me'):
        return authed ? _j({'account': account}) : _j({'error': 'unauthorized', 'message': 'Hết phiên'}, 401);
      case ('GET', '/v1/children'):
        return _j({'children': []});
      case ('POST', '/v1/children'):
        return _j({'id': 7, 'name': (jsonDecode(req.body) as Map)['name']}, 201);
      case ('PUT', '/v1/children/7/progress'):
        final incoming = Progress.fromJson((jsonDecode(req.body) as Map)['progress'] as Map<String, dynamic>);
        final merged = storedProgress == null ? incoming : Progress.merge(Progress.fromJson(storedProgress!), incoming);
        storedProgress = merged.toJson();
        return _j({'progress': storedProgress, 'updatedAt': merged.updatedAt?.toIso8601String()});
      case ('GET', '/v1/catalog'):
        final c = readJson('assets/content/catalog.json')! as Map<String, dynamic>;
        c['contentRev'] = 2;
        return _j(c);
      case ('POST', '/v1/iap/verify'):
        final b = jsonDecode(req.body) as Map;
        if (!(b['receipt'] as String).startsWith('TEST-')) {
          return _j({'error': 'iap_not_configured', 'message': 'Chưa cấu hình'}, 501);
        }
        vip = true;
        return _j({'account': account});
    }
    if (req.method == 'GET' && req.url.path.startsWith('/v1/content/')) {
      final parts = req.url.pathSegments; // v1, content, kind, id
      final kind = parts[2];
      final id = Uri.decodeComponent(parts[3]);
      final body = readJson('assets/content/$kind/$id.json')! as Map<String, dynamic>;
      if (body['access'] == 'vip' && !vip) return _j({'error': 'vip_required', 'message': 'Cần VIP'}, 403);
      if (req.headers['if-none-match'] == '"$id@3"') return http.Response('', 304);
      if (id == 'kntt3.c4.nhan-2cs-1cs') body['title'] = 'Nhân số có hai chữ số với số có một chữ số (bản mới)';
      return _j({'rev': 3, 'body': body});
    }
    return _j({'error': 'not_found', 'message': 'Không có'}, 404);
  });
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  Future<(AppState, SyncService, FakeServer, MemoryStore)> setup() async {
    final server = FakeServer();
    final store = MemoryStore();
    final cache = MemoryStore();
    final app = AppState(
      content: ContentRepository(cache: cache),
      store: store,
    );
    await app.init();
    final sync = SyncService(
      api: ApiClient(baseUrl: 'https://api.example.test/', client: server.client),
      store: store,
      app: app,
    );
    app.sync = sync;
    return (app, sync, server, cache);
  }

  test('đăng nhập sai mật khẩu → báo lỗi tiếng Việt, chưa đăng nhập', () async {
    final (_, sync, _, _) = await setup();
    expect(await sync.signIn('bo.me@example.com', 'sai'), isFalse);
    expect(sync.lastError, 'Sai email hoặc mật khẩu');
    expect(sync.signedIn, isFalse);
  });

  test('đăng nhập → tạo hồ sơ bé → đồng bộ gộp tiến độ → tải nội dung mới', () async {
    final (app, sync, server, cache) = await setup();
    await app.setChildName('Na');
    // Máy khác đã có tiến độ trên server
    server.storedProgress = Progress(
      childName: 'Na',
      totalPoints: 300,
      activeDays: {'2026-11-01'},
      badges: {'first_lesson': DateTime.utc(2026, 11, 1)},
      updatedAt: DateTime.utc(2026, 1, 1),
    ).toJson();

    expect(await sync.signIn('Bo.Me@example.com ', 'matkhau123'), isTrue);
    expect(sync.email, 'bo.me@example.com');
    expect(sync.childId, '7');
    expect(server.requests, containsAll(['POST /v1/children', 'PUT /v1/children/7/progress']));
    expect(app.progress.totalPoints, 300);
    expect(app.progress.badges.keys, contains('first_lesson'));
    expect(app.progress.childName, 'Na');

    // Nội dung: bài học tải về được dùng thay bản đóng gói; bài VIP bị bỏ qua.
    expect(cache.get(ContentRepository.cacheKey('assets/content/lessons/kntt3.c4.nhan-2cs-1cs.json')), isNotNull);
    expect(cache.get(ContentRepository.cacheKey('assets/content/exams/kntt3.c4.nang-cao-1.json')), isNull);
    expect(app.catalog.contentRev, 2);
    final lesson = await app.content.loadLesson('assets/content/lessons/kntt3.c4.nhan-2cs-1cs.json');
    expect(lesson.title, endsWith('(bản mới)'));

    // Lần đồng bộ sau: nội dung không đổi → 304, không tải lại
    final before = server.requests.length;
    expect(await sync.refreshContent(), 0);
    expect(server.requests.length, greaterThan(before));
  });

  test('mua VIP: máy chủ xác minh → mở VIP; biên lai không hợp lệ → báo lỗi', () async {
    final (app, sync, server, cache) = await setup();
    await sync.signIn('bo.me@example.com', 'matkhau123');
    expect(app.isVip, isFalse);
    expect(
      await sync.verifyPurchase(platform: 'android', productId: 'vn.ongvang.toan3.vip_month', receipt: 'that-receipt'),
      isFalse,
    );
    expect(sync.lastError, 'Chưa cấu hình');
    expect(app.isVip, isFalse);
    expect(
      await sync.verifyPurchase(platform: 'android', productId: 'vn.ongvang.toan3.vip_month', receipt: 'TEST-1'),
      isTrue,
    );
    expect(app.isVip, isTrue);
    expect(app.vipUntil, DateTime.utc(2027));
    // Có VIP → đồng bộ lại tải được đề nâng cao
    await sync.syncNow();
    expect(cache.get(ContentRepository.cacheKey('assets/content/exams/kntt3.c4.nang-cao-1.json')), isNotNull);
    await sync.signOut();
    expect(app.isVip, isFalse);
    expect(sync.signedIn, isFalse);
  });

  test('token hết hạn (401) → tự đăng xuất', () async {
    final (_, sync, server, _) = await setup();
    await sync.signIn('bo.me@example.com', 'matkhau123');
    sync.api.token = 'tok-cu';
    expect(await sync.syncNow(), isFalse);
    expect(sync.signedIn, isFalse);
    expect(server.requests.last, 'GET /v1/me');
  });
}
