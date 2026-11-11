// Kiểm tra nhanh app ↔ máy chủ thật (không phải test tự động).
// Chạy: dart run tool/e2e_api_check.dart http://localhost:8080
// Cần máy chủ đang chạy với IAP_DEV_MODE=true (chỉ trên máy cá nhân).
import 'dart:io';

import 'package:toan_lop_3/services/api_client.dart';

Future<void> main(List<String> args) async {
  final api = ApiClient(baseUrl: args.isEmpty ? 'http://localhost:8080' : args.first);
  final email = 'e2e-${DateTime.now().millisecondsSinceEpoch}@example.com';
  final (_, acc) = await api.register(email, 'matkhau-thu-nghiem');
  _ok('đăng ký', acc.email == email && !acc.isVip);
  final child = await api.createChild('Bé Thử');
  _ok('tạo hồ sơ bé', (await api.children()).any((c) => c.id == child.id));
  final p1 = {
    'v': 1,
    'childName': 'Bé Thử',
    'bookId': 'kntt3',
    'totalPoints': 40,
    'lessons': {
      'kntt3.c4.nhan-2cs-1cs': {'bestStars': 2, 'bestPoints': 40, 'plays': 1},
    },
    'skills': {
      'chia.2cs_1cs': {'correct': 1, 'total': 3},
    },
    'activeDays': ['2026-11-10'],
    'exams': [],
    'badges': {'first_lesson': '2026-11-10T08:00:00.000Z'},
    'updatedAt': '2026-11-10T08:00:00.000Z',
  };
  await api.putProgress(child.id, p1);
  final p2 = {
    ...p1,
    'totalPoints': 25,
    'activeDays': ['2026-11-11'],
    'lessons': {
      'kntt3.c4.nhan-2cs-1cs': {'bestStars': 3, 'bestPoints': 30, 'plays': 4},
    },
    'updatedAt': '2026-11-11T08:00:00.000Z',
  };
  final merged = await api.putProgress(child.id, p2);
  final l = (merged['lessons'] as Map)['kntt3.c4.nhan-2cs-1cs'] as Map;
  _ok(
    'gộp tiến độ',
    merged['totalPoints'] == 40 &&
        l['bestStars'] == 3 &&
        l['bestPoints'] == 40 &&
        l['plays'] == 4 &&
        (merged['activeDays'] as List).length == 2,
  );
  final cat = await api.catalog();
  _ok('tải mục lục', (cat['books'] as List).isNotEmpty);
  final doc = await api.content('lessons', 'kntt3.c4.nhan-2cs-1cs');
  _ok('tải bài học', doc != null && doc.body['kind'] == 'lesson');
  _ok('304 khi đã mới nhất', await api.content('lessons', 'kntt3.c4.nhan-2cs-1cs', knownRev: doc!.rev) == null);
  try {
    await api.content('exams', 'kntt3.c4.nang-cao-1');
    _ok('đề VIP bị chặn khi chưa VIP', false);
  } on ApiException catch (e) {
    _ok('đề VIP bị chặn khi chưa VIP', e.code == 'vip_required');
  }
  final vip = await api.verifyPurchase(
    platform: 'android',
    productId: 'vn.ongvang.toan3.vip_month',
    receipt: 'TEST-$email',
  );
  _ok('mua VIP (chế độ thử)', vip.isVip && vip.vipUntil != null);
  _ok('đề VIP mở sau khi mua', (await api.content('exams', 'kntt3.c4.nang-cao-1'))?.body['access'] == 'vip');
  await api.logout();
  try {
    await api.me();
    _ok('đăng xuất', false);
  } on ApiException catch (e) {
    _ok('đăng xuất', e.status == 401);
  }
  // ---- Bảng xếp hạng (Phase 4) ----
  final today = DateTime.now().toUtc().add(const Duration(hours: 7)); // giờ Việt Nam
  final day =
      '${today.year.toString().padLeft(4, '0')}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
  Future<(ApiClient, ChildProfile)> kid(String name, int points) async {
    final c = ApiClient(baseUrl: api.baseUrl);
    await c.register('lb-${DateTime.now().microsecondsSinceEpoch}@example.com', 'matkhau-thu-nghiem');
    final k = await c.createChild(name);
    await c.putProgress(k.id, {
      'v': 1,
      'childName': name,
      'pointsByDay': {day: points},
      'updatedAt': today.toIso8601String(),
    });
    return (c, k);
  }

  final (apiA, kidA) = await kid('Nguyễn Văn An', 300);
  final (apiB, kidB) = await kid('Trần Thị Bình', 120);
  _ok('biệt danh do máy chủ tạo', kidA.nickname != null && kidA.nickname != 'Nguyễn Văn An');
  final lbB = await apiB.leaderboard('week', kidB.id);
  final meB = lbB['me'] as Map<String, dynamic>;
  final above = meB['above'] as Map<String, dynamic>?;
  _ok(
    'hạng của bé B có, đứng sau người hơn điểm',
    meB['rank'] != null && above != null && (above['points'] as int) >= 120,
  );
  _ok('số điểm cần để vượt bạn ngay trên', meB['gapToAbove'] == (above!['points'] as int) - 120 + 1);
  final raw = lbB.toString();
  _ok(
    'không lộ tên thật / email',
    !raw.contains('Nguyễn Văn An') && !raw.contains('Trần Thị Bình') && !raw.contains('@'),
  );
  final lbA = await apiA.leaderboard('week', kidA.id);
  _ok('bé A xếp trên bé B', ((lbA['me'] as Map)['rank'] as int) < (meB['rank'] as int));
  await apiA.patchChild(kidA.id, leaderboardOptIn: false);
  final lbA2 = await apiA.leaderboard('week', kidA.id);
  _ok(
    'tắt tham gia thì không còn trong bảng',
    (lbA2['me'] as Map)['rank'] == null && (lbA2['me'] as Map)['optedIn'] == false,
  );
  final capped = await kid('Bé Cày Điểm', 999999);
  final lbC = await capped.$1.leaderboard('week', capped.$2.id);
  _ok('mỗi ngày tính tối đa 1000 điểm', (lbC['me'] as Map)['points'] == 1000);

  stdout.writeln('XONG: mọi bước đều khớp.');
}

void _ok(String name, bool cond) {
  stdout.writeln('${cond ? 'OK ' : 'LỖI'} $name');
  if (!cond) exit(1);
}
