import 'dart:convert';

import 'package:flutter/services.dart';
import 'package:unorm_dart/unorm_dart.dart' as unorm;

/// Một câu đã ghi âm sẵn (11max).
class VoiceClip {
  const VoiceClip({required this.file, required this.durationMs});

  /// Đường dẫn asset, vd assets/voice/chao-mung-con-1a2b3c.mp3
  final String file;
  final int durationMs;
}

/// Chuẩn hoá câu để tra file ghi âm: NFC, bỏ khoảng trắng thừa.
String voiceKey(String text) => unorm.nfc(text).trim().replaceAll(RegExp(r'\s+'), ' ');

/// Danh mục câu → file ghi âm (assets/voice/manifest.json, do tool/make_voice.dart tạo).
class VoiceLibrary {
  VoiceLibrary(Map<String, VoiceClip> clips) : _clips = {for (final e in clips.entries) voiceKey(e.key): e.value};

  static const manifestPath = 'assets/voice/manifest.json';
  static VoiceLibrary instance = VoiceLibrary(const {});

  final Map<String, VoiceClip> _clips;

  int get length => _clips.length;

  VoiceClip? lookup(String text) => _clips[voiceKey(text)];

  static VoiceLibrary fromJson(Map<String, dynamic> j) => VoiceLibrary({
    for (final e in ((j['lines'] as Map?) ?? const {}).entries)
      e.key as String: VoiceClip(
        file: (e.value as Map)['file'] as String,
        durationMs: ((e.value as Map)['ms'] as num).toInt(),
      ),
  });

  static Future<VoiceLibrary> load([AssetBundle? bundle]) async {
    try {
      final raw = await (bundle ?? rootBundle).loadString(manifestPath);
      return fromJson(jsonDecode(raw) as Map<String, dynamic>);
    } on Object {
      return VoiceLibrary(const {});
    }
  }
}
