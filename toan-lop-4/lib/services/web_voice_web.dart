import 'dart:js_interop';
import 'dart:ui_web' as ui_web;

@JS('ongVoice')
external _OngVoice? get _ongVoice;

extension type _OngVoice(JSObject _) implements JSObject {
  external JSBoolean ready();
  external void preload(JSString url);
  external JSPromise<JSBoolean> play(JSString url, JSString owner);
  external void stop(JSString owner);
}

/// Web: phát giọng qua web/voice.js (Web Audio) — không bị chặn ở câu thứ hai trở đi.
abstract final class WebVoice {
  static bool get available => _ongVoice != null;

  /// Trình duyệt đã cho phát tiếng (bé đã chạm màn hình ít nhất một lần).
  static bool get ready => _ongVoice?.ready().toDart ?? false;

  static String _url(String asset) => ui_web.assetManager.getAssetUrl(asset);

  /// Phát file [asset] (vd `assets/voice/x.mp3`); true = phát xong trọn vẹn.
  static Future<bool> play(String asset, String owner) async {
    final v = _ongVoice;
    if (v == null || !v.ready().toDart) return false;
    try {
      return (await v.play(_url(asset).toJS, owner.toJS).toDart).toDart;
    } on Object {
      return false;
    }
  }

  static void stop(String owner) => _ongVoice?.stop(owner.toJS);

  static void preload(String asset) => _ongVoice?.preload(_url(asset).toJS);
}
