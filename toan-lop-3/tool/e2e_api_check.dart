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
    'v': 1, 'childName': 'Bé Thử', 'bookId': 'kntt3', 'totalPoints': 40,
    'lessons': {'kntt3.c4.nhan-2cs-1cs': {'bestStars': 2, 'bestPoints': 40, 'plays': 1}},
    'skills': {'chia.2cs_1cs': {'correct': 1, 'total': 3}},
    'activeDays': ['2026-11-10'], 'exams': [], 'badges': {'first_lesson': '2026-11-10T08:00:00.000Z'},
    'updatedAt': '2026-11-10T08:00:00.000Z',
  };
  await api.putProgress(child.id, p1);
  final p2 = {...p1, 'totalPoints': 25, 'activeDays': ['2026-11-11'],
    'lessons': {'kntt3.c4.nhan-2cs-1cs': {'bestStars': 3, 'bestPoints': 30, 'plays': 4}},
    'updatedAt': '2026-11-11T08:00:00.000Z'};
  final merged = await api.putProgress(child.id, p2);
  final l = (merged['lessons'] as Map)['kntt3.c4.nhan-2cs-1cs'] as Map;
  _ok('gộp tiến độ', merged['totalPoints'] == 40 && l['bestStars'] == 3 && l['bestPoints'] == 40 && l['plays'] == 4 &&
      (merged['activeDays'] as List).length == 2);
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
  final vip = await api.verifyPurchase(platform: 'android', productId: 'vn.ongvang.toan3.vip_month', receipt: 'TEST-$email');
  _ok('mua VIP (chế độ thử)', vip.isVip && vip.vipUntil != null);
  _ok('đề VIP mở sau khi mua', (await api.content('exams', 'kntt3.c4.nang-cao-1'))?.body['access'] == 'vip');
  await api.logout();
  try {
    await api.me();
    _ok('đăng xuất', false);
  } on ApiException catch (e) {
    _ok('đăng xuất', e.status == 401);
  }
  stdout.writeln('XONG: mọi bước đều khớp.');
}

void _ok(String name, bool cond) {
  stdout.writeln('${cond ? 'OK ' : 'LỖI'} $name');
  if (!cond) exit(1);
}
