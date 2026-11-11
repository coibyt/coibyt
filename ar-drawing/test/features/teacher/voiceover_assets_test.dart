import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/features/teacher/voiceover_service.dart';

import '../../test_app.dart';

void main() {
  final Map<String, Object?> manifest =
      jsonDecode(File(VoiceoverService.manifestAsset).readAsStringSync()) as Map<String, Object?>;
  final Map<String, Object?> vi = manifest['vi']! as Map<String, Object?>;

  test('every Vietnamese line of Lumi has a recording listed with its length', () {
    final Iterable<String> lineIds = translationsFor(AppLanguage.vi).keys
        .where((String k) => k.startsWith('teacher.lines.'))
        .map((String k) => k.substring('teacher.lines.'.length));
    for (final String id in lineIds) {
      expect(vi[id], isA<num>(), reason: 'manifest: $id');
      expect((vi[id]! as num) > 800, isTrue, reason: 'too short: $id');
      expect(File('assets/audio/teacher/vi/$id.mp3').existsSync(), isTrue, reason: id);
    }
  });

  test('every recording in the manifest is a real file', () {
    for (final String id in vi.keys) {
      expect(File('assets/audio/teacher/vi/$id.mp3').lengthSync(), greaterThan(5000), reason: id);
    }
  });

  test('voice service knows lengths and stays silent without a recording', () async {
    final VoiceoverService voice = VoiceoverService(
      manifest: <String, Map<String, int>>{
        'vi': <String, int>{'hello': 1500},
      },
    );
    expect(voice.durationOf(AppLanguage.vi, 'hello'), const Duration(milliseconds: 1500));
    expect(voice.durationOf(AppLanguage.en, 'hello'), isNull);
    expect((await voice.play(AppLanguage.en, 'hello')).status, VoiceStatus.silent);
    expect(voice.assetFor(AppLanguage.vi, 'hello'), 'assets/audio/teacher/vi/hello.mp3');
  });
}
