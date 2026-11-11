import 'dart:convert';

import 'package:flutter/foundation.dart';

import '../app_state.dart';
import '../models/progress.dart';
import 'api_client.dart';
import 'content_repository.dart';
import 'kv_store.dart';

/// Đăng nhập tài khoản phụ huynh, đồng bộ tiến độ, tải nội dung mới.
class SyncService extends ChangeNotifier {
  SyncService({required this.api, required this.store, required this.app});

  static const tokenKey = 'auth.token';
  static const emailKey = 'auth.email';
  static const childKey = 'auth.childId';
  static const lastSyncKey = 'sync.last';

  final ApiClient api;
  final KeyValueStore store;
  final AppState app;

  bool busy = false;
  String? lastError;

  bool get signedIn => api.token != null;
  String? get email => store.get(emailKey);
  String? get childId => store.get(childKey);
  DateTime? get lastSync => DateTime.tryParse(store.get(lastSyncKey) ?? '');

  /// Khôi phục phiên đăng nhập đã lưu.
  void restore() => api.token = store.get(tokenKey);

  Future<T?> _run<T>(Future<T> Function() f) async {
    busy = true;
    lastError = null;
    notifyListeners();
    try {
      return await f();
    } on ApiException catch (e) {
      lastError = e.message;
      if (e.status == 401) await _clearAuth();
      return null;
    } on Object catch (e) {
      lastError = 'Không kết nối được máy chủ ($e)';
      return null;
    } finally {
      busy = false;
      notifyListeners();
    }
  }

  Future<bool> signIn(String email, String password, {bool register = false}) async {
    final ok = await _run(() async {
      final (token, _) = register ? await api.register(email, password) : await api.login(email, password);
      await store.put(tokenKey, token);
      await store.put(emailKey, email.trim().toLowerCase());
      final kids = await api.children();
      final child = kids.isNotEmpty ? kids.first : await api.createChild(app.progress.childName);
      await store.put(childKey, child.id);
      return true;
    });
    if (ok == true) await syncNow();
    return ok == true;
  }

  Future<void> signOut() async {
    await _run(() async {
      if (signedIn) await api.logout();
    });
    await _clearAuth();
    await app.setServerVip(null);
    notifyListeners();
  }

  Future<void> _clearAuth() async {
    api.token = null;
    await store.delete(tokenKey);
    await store.delete(childKey);
  }

  /// Gửi tiến độ lên, nhận bản đã gộp, cập nhật VIP, tải nội dung mới.
  Future<bool> syncNow() async {
    if (!signedIn) return false;
    final ok = await _run(() async {
      final account = await api.me();
      await app.setServerVip(account.isVip ? account.vipUntil : null);
      final id = childId;
      if (id != null) {
        final merged = await api.putProgress(id, app.progress.toJson());
        await app.replaceProgress(Progress.merge(app.progress, Progress.fromJson(merged)));
      }
      await refreshContent();
      await store.put(lastSyncKey, DateTime.now().toIso8601String());
      return true;
    });
    return ok == true;
  }

  /// Tải mục lục + bài học/đề mới hơn bản trên máy. Trả về số file đã cập nhật.
  Future<int> refreshContent() async {
    final cache = app.content.cache;
    if (cache == null) return 0;
    var updated = 0;
    final catalog = await api.catalog();
    await cache.put(ContentRepository.cacheKey(ContentRepository.catalogPath), jsonEncode(catalog));
    for (final book in (catalog['books'] as List).cast<Map<String, dynamic>>()) {
      final docs = <(String, Map<String, dynamic>)>[
        for (final ch in (book['chapters'] as List).cast<Map<String, dynamic>>())
          for (final l in (ch['lessons'] as List).cast<Map<String, dynamic>>()) ('lessons', l),
        for (final e in ((book['exams'] as List?) ?? const []).cast<Map<String, dynamic>>()) ('exams', e),
      ];
      for (final (kind, ref) in docs) {
        final src = ref['src'] as String;
        final revKey = 'content-rev:$src';
        try {
          final doc = await api.content(kind, ref['id'] as String, knownRev: int.tryParse(cache.get(revKey) ?? ''));
          if (doc == null) continue;
          await cache.put(ContentRepository.cacheKey(src), jsonEncode(doc.body));
          await cache.put(revKey, '${doc.rev}');
          updated++;
        } on ApiException catch (e) {
          if (e.code != 'vip_required') rethrow; // nội dung VIP: bỏ qua khi chưa có VIP
        }
      }
    }
    await app.reloadCatalog();
    return updated;
  }

  /// Gửi biên lai mua VIP lên máy chủ để xác minh.
  Future<bool> verifyPurchase({required String platform, required String productId, required String receipt}) async {
    final ok = await _run(() async {
      final account = await api.verifyPurchase(platform: platform, productId: productId, receipt: receipt);
      await app.setServerVip(account.isVip ? account.vipUntil : null);
      return true;
    });
    return ok == true;
  }
}
