/// Bộ phát giọng dùng chung trên web (web/voice.js, Web Audio): mở khoá một lần khi bé chạm màn hình,
/// sau đó cô và MC tự nói liên tục. Ngoài web: không dùng (trả về null → phát bằng audioplayers).
library;

export 'web_voice_stub.dart' if (dart.library.js_interop) 'web_voice_web.dart';
