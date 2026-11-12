/// Không phải web: không có bộ phát Web Audio.
abstract final class WebVoice {
  static bool get available => false;
  static bool get ready => false;
  static Future<bool> play(String asset, String owner) async => false;
  static void stop(String owner) {}
  static void preload(String asset) {}
}
