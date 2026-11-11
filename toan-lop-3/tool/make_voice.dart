// Tạo giọng đọc cho cô giáo bằng 11max (ElevenLabs) → assets/voice/*.mp3 + manifest.json.
//
// Chạy từ thư mục toan-lop-3:
//   dart run tool/make_voice.dart --count      # chỉ đếm câu còn thiếu + ước tính credit
//   dart run tool/make_voice.dart --limit 1    # tạo thử 1 câu
//   dart run tool/make_voice.dart              # tạo mọi câu còn thiếu (câu đã có thì bỏ qua)
//
// Khoá API: biến môi trường MAX11_API_KEY (KHÔNG ghi khoá vào code / git).
// Cần ffmpeg + ffprobe để cắt khoảng lặng, nén và đo thời lượng.
// ignore_for_file: avoid_print
import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:toan_lop_3/logic/spoken_vi.dart';
import 'package:toan_lop_3/logic/tutor.dart';
import 'package:toan_lop_3/models/content.dart';
import 'package:toan_lop_3/logic/demo_script.dart';
import 'package:unorm_dart/unorm_dart.dart' as unorm;

const api = 'https://api.11max.id.vn';
const model = 'eleven_flash_v2_5';

/// Giọng nữ đa ngôn ngữ "Sarah" (cùng giọng Babelisa dùng cho tiếng Việt).
const voiceId = 'EXAVITQu4vr4xnSDxMaL';
const outDir = 'assets/voice';
const creditsPerChar = 0.5;

String voiceKey(String t) => unorm.nfc(t).trim().replaceAll(RegExp(r'\s+'), ' ');

String slug(String t) {
  final base = unorm
      .nfd(t)
      .replaceAll(RegExp('[̀-ͯ]'), '')
      .replaceAll('đ', 'd')
      .replaceAll('Đ', 'D')
      .toLowerCase()
      .replaceAll(RegExp(r'[^a-z0-9]+'), '-')
      .replaceAll(RegExp(r'^-+|-+$'), '');
  var h = 0x811c9dc5;
  for (final c in utf8.encode(voiceKey(t))) {
    h = ((h ^ c) * 0x01000193) & 0xffffffff;
  }
  final short = base.length > 40 ? base.substring(0, 40).replaceAll(RegExp(r'-+$'), '') : base;
  return '$short-${h.toRadixString(16).padLeft(8, '0').substring(0, 6)}';
}

/// Mọi câu cô giáo nói: câu cố định + gợi ý của từng bài luyện tập.
List<String> allLines() {
  final lines = <String>{...TutorLines.all()};
  // Lời cô giới thiệu từng bài học trong mục lục.
  final catalog = Catalog.fromJson(jsonDecode(File('assets/content/catalog.json').readAsStringSync()));
  for (final b in catalog.books) {
    for (final c in b.chapters) {
      for (final l in c.lessons) {
        lines.add(TutorLines.lessonIntro(l.title));
      }
    }
  }
  final brain = TutorBrain();
  for (final f in Directory('assets/content/lessons').listSync().whereType<File>()) {
    if (!f.path.endsWith('.json')) continue;
    final lesson = Lesson.fromJson(jsonDecode(f.readAsStringSync()));
    for (final p in lesson.problems) {
      lines.add(brain.hint(p));
    }
    // Cô làm mẫu phần Nhớ nhanh: đọc từng khối và từng bước đặt tính.
    for (final s in buildDemoScript(lesson.theory.blocks)) {
      lines.addAll(s.say);
    }
  }
  return [for (final l in lines) voiceKey(l)];
}

Future<List<int>> tts(http.Client c, String key, String text) async {
  final headers = {'xi-api-key': key, 'Content-Type': 'application/json'};
  final body = jsonEncode({
    'text': text,
    'model_id': model,
    'language_code': 'vi',
    'output_format': 'mp3_22050_32',
    'voice_settings': {'stability': 0.55, 'similarity_boost': 0.75, 'speed': 0.92},
  });
  for (var attempt = 0; attempt < 6; attempt++) {
    try {
      final r = await c.post(Uri.parse('$api/v1/text-to-speech/$voiceId'), headers: headers, body: body);
      if (r.statusCode == 429) {
        await Future<void>.delayed(Duration(seconds: 10 + attempt * 10));
        continue;
      }
      if (r.statusCode >= 300) {
        throw HttpException('${r.statusCode} ${r.body.substring(0, r.body.length.clamp(0, 200))}');
      }
      if ((r.headers['content-type'] ?? '').contains('audio')) return r.bodyBytes;
      final task = (jsonDecode(r.body) as Map)['id'];
      for (var i = 0; i < 90; i++) {
        await Future<void>.delayed(const Duration(seconds: 2));
        final d = jsonDecode((await c.get(Uri.parse('$api/v1/history/$task'), headers: headers)).body) as Map;
        if (d['status'] == 'completed') {
          final url = (d['result'] as Map)['audio_url'] as String;
          return (await c.get(Uri.parse(url))).bodyBytes;
        }
        if (d['status'] == 'failed') throw HttpException('11max failed: ${d['error']}');
      }
      throw const HttpException('timeout');
    } on Exception catch (e) {
      if (attempt == 5) rethrow;
      print('  thử lại ($e)');
      await Future<void>.delayed(Duration(seconds: 4 + attempt * 4));
    }
  }
  throw StateError('unreachable');
}

/// Cắt khoảng lặng đầu/cuối, nén mono 24 kHz 32 kbps; trả về thời lượng (ms).
Future<int> shrink(List<int> audio, File dest) async {
  final tmp = File('${Directory.systemTemp.path}/voice-${DateTime.now().microsecondsSinceEpoch}.mp3')
    ..writeAsBytesSync(audio);
  const trim =
      'silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
      'silenceremove=start_periods=1:start_threshold=-45dB,areverse,apad=pad_dur=0.08';
  final r = await Process.run('ffmpeg', [
    '-v',
    'error',
    '-y',
    '-i',
    tmp.path,
    '-af',
    trim,
    '-ac',
    '1',
    '-ar',
    '24000',
    '-b:a',
    '32k',
    dest.path,
  ]);
  if (r.exitCode != 0 || !dest.existsSync() || dest.lengthSync() < 400) dest.writeAsBytesSync(audio);
  tmp.deleteSync();
  final probe = await Process.run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'csv=p=0',
    dest.path,
  ]);
  return ((double.tryParse('${probe.stdout}'.trim()) ?? 1.5) * 1000).round();
}

Future<void> main(List<String> args) async {
  final countOnly = args.contains('--count');
  final limitIdx = args.indexOf('--limit');
  final limit = limitIdx >= 0 ? int.parse(args[limitIdx + 1]) : null;

  Directory(outDir).createSync(recursive: true);
  final manifestFile = File('$outDir/manifest.json');
  final manifest = manifestFile.existsSync()
      ? (jsonDecode(manifestFile.readAsStringSync()) as Map<String, dynamic>)
      : <String, dynamic>{'version': 1, 'voice': 'Sarah (11max, $model)', 'lines': <String, dynamic>{}};
  final lines = manifest['lines'] as Map<String, dynamic>;

  // Câu cần tạo: chưa có file, hoặc bản đọc (số/ký hiệu → chữ) đã đổi so với lần tạo trước.
  bool upToDate(String l) {
    final e = lines[l] as Map<String, dynamic>?;
    if (e == null || !File(e['file'] as String).existsSync()) return false;
    final spoken = spokenVietnamese(l);
    if (e['spoken'] == spoken) return true;
    if (e['spoken'] == null && spoken == l) {
      e['spoken'] = spoken; // câu không có số/ký hiệu: bản cũ vẫn đúng
      return true;
    }
    return false;
  }

  final missing = [
    for (final l in allLines())
      if (!upToDate(l)) l,
  ];
  final chars = missing.fold<int>(0, (s, l) => s + spokenVietnamese(l).length);
  print(
    'Tổng ${allLines().length} câu, thiếu ${missing.length} câu, $chars ký tự ≈ ${(chars * creditsPerChar).round()} credit.',
  );
  if (countOnly) {
    for (final l in missing) {
      print('  - ${spokenVietnamese(l)}');
    }
    return;
  }

  final key = Platform.environment['MAX11_API_KEY'] ?? 'proxy-injected';
  final client = http.Client();
  var done = 0;
  for (final text in missing.take(limit ?? missing.length)) {
    final file = '$outDir/${slug(text)}.mp3';
    final spoken = spokenVietnamese(text);
    stdout.write('• $spoken\n');
    final audio = await tts(client, key, spoken);
    final ms = await shrink(audio, File(file));
    lines[text] = {'file': file, 'ms': ms, 'spoken': spoken};
    done++;
    // Ghi danh mục sau mỗi câu: dừng giữa chừng vẫn giữ phần đã tạo.
    final sorted = Map.fromEntries(lines.entries.toList()..sort((a, b) => a.key.compareTo(b.key)));
    manifest['lines'] = sorted;
    manifestFile.writeAsStringSync('${const JsonEncoder.withIndent('  ').convert(manifest)}\n');
  }
  client.close();
  print('Xong: tạo $done câu.');
}
