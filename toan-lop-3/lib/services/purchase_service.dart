import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:in_app_purchase/in_app_purchase.dart';

import 'sync_service.dart';

/// Mua VIP qua App Store / Google Play.
///
/// CẦN LÀM TRƯỚC KHI PHÁT HÀNH (không làm được từ code):
/// - Tạo 2 gói đăng ký với đúng mã bên dưới trong App Store Connect và Google Play Console.
/// - Cấu hình máy chủ xác minh biên lai (server/.env: APPLE_SHARED_SECRET, GOOGLE_SERVICE_ACCOUNT_JSON).
/// Biên lai LUÔN được máy chủ xác minh; app không tự mở VIP.
class PurchaseService extends ChangeNotifier {
  PurchaseService({required this.sync});

  static const monthly = 'vn.ongvang.toan3.vip_month';
  static const yearly = 'vn.ongvang.toan3.vip_year';
  static const productIds = {monthly, yearly};

  final SyncService sync;
  StreamSubscription<List<PurchaseDetails>>? _sub;
  String? message;
  List<ProductDetails> products = const [];

  /// Web không có cửa hàng ứng dụng.
  bool get supported => !kIsWeb;

  Future<bool> init() async {
    if (!supported) return false;
    final iap = InAppPurchase.instance;
    if (!await iap.isAvailable()) {
      message = 'Không kết nối được cửa hàng ứng dụng.';
      notifyListeners();
      return false;
    }
    _sub ??= iap.purchaseStream.listen(_onPurchases, onError: (Object e) {
      message = 'Lỗi mua hàng: $e';
      notifyListeners();
    });
    final resp = await iap.queryProductDetails(productIds);
    products = resp.productDetails..sort((a, b) => a.rawPrice.compareTo(b.rawPrice));
    if (resp.notFoundIDs.isNotEmpty) {
      message = 'Chưa tạo gói trên cửa hàng: ${resp.notFoundIDs.join(', ')}';
    }
    notifyListeners();
    return true;
  }

  Future<void> buy(ProductDetails product) async {
    if (!sync.signedIn) {
      message = 'Bố mẹ cần đăng nhập tài khoản trước khi mua để VIP dùng được trên nhiều máy.';
      notifyListeners();
      return;
    }
    await InAppPurchase.instance.buyNonConsumable(purchaseParam: PurchaseParam(productDetails: product));
  }

  Future<void> restore() => InAppPurchase.instance.restorePurchases();

  Future<void> _onPurchases(List<PurchaseDetails> list) async {
    for (final p in list) {
      var delivered = true;
      switch (p.status) {
        case PurchaseStatus.pending:
          message = 'Đang chờ thanh toán...';
        case PurchaseStatus.error:
          message = 'Thanh toán không thành công: ${p.error?.message ?? ''}';
        case PurchaseStatus.canceled:
          message = 'Đã huỷ thanh toán.';
        case PurchaseStatus.purchased:
        case PurchaseStatus.restored:
          final ok = await sync.verifyPurchase(
            platform: defaultTargetPlatform == TargetPlatform.iOS ? 'ios' : 'android',
            productId: p.productID,
            receipt: p.verificationData.serverVerificationData,
          );
          message = ok ? 'Đã mở VIP. Cảm ơn bố mẹ!' : (sync.lastError ?? 'Chưa xác minh được giao dịch.');
          // Chưa xác minh được thì KHÔNG hoàn tất: cửa hàng sẽ gửi lại giao dịch
          // ở lần mở app sau (hoặc khi bấm "Khôi phục"), tránh mất tiền của khách.
          delivered = ok;
      }
      if (delivered && p.pendingCompletePurchase) await InAppPurchase.instance.completePurchase(p);
      notifyListeners();
    }
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }
}
