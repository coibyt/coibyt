import 'package:flutter/material.dart';

import '../../app_state.dart';
import '../../config.dart';
import '../../services/purchase_service.dart';
import '../../services/sync_service.dart';
import '../app_theme.dart';

/// Mục "Tài khoản & đồng bộ" + "Gói VIP" trong khu phụ huynh.
class AccountSection extends StatelessWidget {
  const AccountSection({super.key});

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final sync = app.sync;
    const h = TextStyle(fontSize: 20, fontWeight: FontWeight.w700);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        _box([
          const Text('Tài khoản & đồng bộ', style: h),
          const SizedBox(height: 6),
          if (sync == null)
            const Text(
              'Bản này chạy offline: tiến độ chỉ lưu trên máy. '
              '(Khi có máy chủ, build với --dart-define=API_BASE_URL=... để bật đăng nhập và đồng bộ.)',
            )
          else
            ListenableBuilder(listenable: sync, builder: (context, _) => _SyncBody(sync: sync)),
        ]),
        _box([
          const Text('Gói VIP', style: h),
          const SizedBox(height: 6),
          Text(
            app.isVip
                ? (app.vipUntil != null && app.vipUntil!.isAfter(app.now())
                    ? 'Đang dùng VIP đến ${_d(app.vipUntil!)}.'
                    : 'Đang bật VIP thử.')
                : 'VIP mở: lời giải chi tiết từng bước cho mọi bài, bài và đề nâng cao.',
          ),
          const SizedBox(height: 8),
          if (!app.isVip || app.isDevVip)
            FilledButton.icon(
              key: const ValueKey('btn-upgrade'),
              style: FilledButton.styleFrom(backgroundColor: AppColors.vip, minimumSize: const Size.fromHeight(52)),
              onPressed: () => Navigator.of(context).push(
                MaterialPageRoute<void>(builder: (_) => VipPurchaseScreen(sync: sync)),
              ),
              icon: const Icon(Icons.workspace_premium_rounded),
              label: const Text('Nâng cấp VIP', style: TextStyle(fontSize: 18)),
            ),
        ]),
      ],
    );
  }

  static String _d(DateTime t) => '${t.day}/${t.month}/${t.year}';

  static Widget _box(List<Widget> children) => Padding(
        padding: const EdgeInsets.only(bottom: 14),
        child: Material(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: children),
          ),
        ),
      );
}

class _SyncBody extends StatelessWidget {
  const _SyncBody({required this.sync});

  final SyncService sync;

  @override
  Widget build(BuildContext context) {
    if (!sync.signedIn) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Đăng nhập để lưu tiến độ lên máy chủ, học trên nhiều máy và dùng VIP đã mua.'),
          if (sync.lastError != null) Text(sync.lastError!, style: const TextStyle(color: AppColors.tryAgain)),
          const SizedBox(height: 8),
          Wrap(spacing: 8, children: [
            FilledButton(
              onPressed: sync.busy ? null : () => _authDialog(context, register: false),
              child: const Text('Đăng nhập'),
            ),
            OutlinedButton(
              onPressed: sync.busy ? null : () => _authDialog(context, register: true),
              child: const Text('Tạo tài khoản'),
            ),
          ]),
        ],
      );
    }
    final last = sync.lastSync;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Tài khoản: ${sync.email ?? ''}'),
        Text(last == null ? 'Chưa đồng bộ lần nào.' : 'Đồng bộ lần cuối: ${last.hour}:${last.minute.toString().padLeft(2, '0')} ${last.day}/${last.month}'),
        if (sync.lastError != null) Text(sync.lastError!, style: const TextStyle(color: AppColors.tryAgain)),
        const SizedBox(height: 8),
        Wrap(spacing: 8, children: [
          FilledButton.icon(
            onPressed: sync.busy ? null : sync.syncNow,
            icon: sync.busy
                ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                : const Icon(Icons.sync_rounded),
            label: const Text('Đồng bộ ngay'),
          ),
          TextButton(onPressed: sync.busy ? null : sync.signOut, child: const Text('Đăng xuất')),
        ]),
      ],
    );
  }

  Future<void> _authDialog(BuildContext context, {required bool register}) async {
    final email = TextEditingController();
    final pass = TextEditingController();
    final ok = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(register ? 'Tạo tài khoản phụ huynh' : 'Đăng nhập'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: email, keyboardType: TextInputType.emailAddress, decoration: const InputDecoration(labelText: 'Email')),
            TextField(controller: pass, obscureText: true, decoration: const InputDecoration(labelText: 'Mật khẩu (ít nhất 8 ký tự)')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Huỷ')),
          FilledButton(onPressed: () => Navigator.pop(context, true), child: Text(register ? 'Tạo' : 'Đăng nhập')),
        ],
      ),
    );
    if (ok == true) await sync.signIn(email.text.trim(), pass.text, register: register);
    email.dispose();
    pass.dispose();
  }
}

/// Màn mua VIP (chỉ mở được từ khu phụ huynh, sau cổng phụ huynh).
class VipPurchaseScreen extends StatefulWidget {
  const VipPurchaseScreen({super.key, required this.sync});

  final SyncService? sync;

  @override
  State<VipPurchaseScreen> createState() => _VipPurchaseScreenState();
}

class _VipPurchaseScreenState extends State<VipPurchaseScreen> {
  PurchaseService? _purchases;

  @override
  void initState() {
    super.initState();
    final sync = widget.sync;
    if (sync != null) {
      _purchases = PurchaseService(sync: sync)..init();
    }
  }

  @override
  void dispose() {
    _purchases?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final app = AppScope.of(context);
    final p = _purchases;
    return Scaffold(
      appBar: AppBar(title: const Text('Nâng cấp VIP'), backgroundColor: AppColors.honeySoft),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Icon(Icons.workspace_premium_rounded, size: 80, color: AppColors.vip),
          const Text(
            '• Lời giải chi tiết từng bước cho mọi bài\n• Bài tập và đề kiểm tra nâng cao\n• Đồng bộ tiến độ trên nhiều máy',
            style: TextStyle(fontSize: 19, height: 1.6),
          ),
          const SizedBox(height: 16),
          if (p == null || !p.supported)
            const Text(
              'Mua VIP chỉ có trên ứng dụng Android/iOS đã kết nối máy chủ. '
              'Bản chơi thử trên web chưa bán VIP.',
              style: TextStyle(fontSize: 17, color: Colors.black54),
            )
          else
            ListenableBuilder(
              listenable: p,
              builder: (context, _) => Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  for (final prod in p.products)
                    Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: FilledButton(
                        style: FilledButton.styleFrom(backgroundColor: AppColors.vip, minimumSize: const Size.fromHeight(56)),
                        onPressed: () => p.buy(prod),
                        child: Text('${prod.title} — ${prod.price}', style: const TextStyle(fontSize: 18)),
                      ),
                    ),
                  TextButton(onPressed: p.restore, child: const Text('Khôi phục giao dịch đã mua')),
                  if (p.message != null) Text(p.message!, style: const TextStyle(fontSize: 16)),
                ],
              ),
            ),
          if (AppConfig.allowDevVip) ...[
            const Divider(height: 32),
            SwitchListTile(
              key: const ValueKey('dev-vip'),
              value: app.isDevVip,
              onChanged: app.setVip,
              title: const Text('Bật VIP thử (bản thử nghiệm)'),
              subtitle: const Text('Công tắc này không có trong bản phát hành.'),
            ),
          ],
        ],
      ),
    );
  }
}
