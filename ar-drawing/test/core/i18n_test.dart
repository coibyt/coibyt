import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/core/i18n/app_language.dart';
import 'package:tracelight/core/i18n/translations.dart';
import 'package:tracelight/features/draw/stroke.dart';
import 'package:tracelight/features/game/game_store.dart';
import 'package:tracelight/features/leaderboard/player_profile.dart';
import 'package:tracelight/features/lessons/lesson.dart';
import 'package:tracelight/features/templates/template_catalog.dart';
import 'package:tracelight/features/teacher/teacher_script.dart';

import '../test_app.dart';

void main() {
  final Translations vi = translationsFor(AppLanguage.vi);
  final Translations en = translationsFor(AppLanguage.en);

  Set<String> ownKeys(AppLanguage l) => translationsFor(l).keys.toSet();

  test('Vietnamese is the default language', () {
    expect(AppLanguage.fallback, AppLanguage.vi);
    expect(AppLanguage.fromCode(null), AppLanguage.vi);
    expect(AppLanguage.fromCode('xx'), AppLanguage.vi);
  });

  test('Vietnamese and English have exactly the same keys', () {
    final Set<String> v = ownKeys(AppLanguage.vi), e = ownKeys(AppLanguage.en);
    expect(v.difference(e), isEmpty, reason: 'missing in en.json');
    expect(e.difference(v), isEmpty, reason: 'missing in vi.json');
  });

  test('placeholders match between languages', () {
    final RegExp ph = RegExp(r'\{(\w+)\}');
    for (final String key in vi.keys) {
      Set<String> names(Translations t) =>
          ph.allMatches(t.tr(key)).map((Match m) => m.group(1)!).toSet();
      expect(names(en), names(vi), reason: key);
    }
    expect(vi.tr('lesson.stepOf', args: <String, Object?>{'current': 2, 'total': 5}), 'Bước 2/5');
  });

  test('every key used in the code exists', () {
    final RegExp use = RegExp(r"""tr\(\s*'([a-zA-Z0-9_.]+)'""");
    final List<String> missing = <String>[];
    for (final FileSystemEntity f in Directory('lib').listSync(recursive: true)) {
      if (f is! File || !f.path.endsWith('.dart')) continue;
      for (final Match m in use.allMatches(f.readAsStringSync())) {
        final String key = m.group(1)!;
        if (!vi.has(key) || !en.has(key)) missing.add('${f.path}: $key');
      }
    }
    expect(missing, isEmpty);
  });

  test('dynamic keys (templates, categories, lessons, pencils, Lumi) exist', () {
    final List<String> keys = <String>[
      for (final DrawingTemplate t in kTemplates) t.nameKey,
      for (final TemplateCategory c in TemplateCategory.values) c.labelKey,
      for (final Difficulty d in Difficulty.values) d.labelKey,
      for (final StepKind k in StepKind.values) 'lesson.kind.${k.name}',
      for (final String p in kPencilColors.keys) 'pencil.$p',
      for (final Lesson l in loadLessons().lessons) ...<String>[
        l.titleKey,
        l.level.labelKey,
        l.topic.labelKey,
        'academy.levelHint.${l.level.name}',
        ?l.creditKey,
        for (final LessonStep s in l.steps) ...<String>[
          for (final TeacherLine line in s.lines) line.textKey,
          for (final PaletteColor p in s.palette) 'pencil.${p.pencil}',
        ],
      ],
      for (final String id in loadScripts().ids)
        for (final TeacherLine line in loadScripts()[id]) line.textKey,
    ];
    for (final String k in keys) {
      expect(vi.has(k), isTrue, reason: 'vi: $k');
      expect(en.has(k), isTrue, reason: 'en: $k');
    }
  });

  test('dynamic keys of exams, shop, ranks and Lumi coaching exist', () {
    final List<String> keys = <String>[
      for (final Prize p in GameStore.prizes) p.nameKey,
      for (final BrushEffect e in BrushEffect.values) 'shop.effect.${e.name}',
      for (final ArtistRank r in ArtistRank.values) r.labelKey,
      for (final LumiOutfit o in LumiOutfit.values) 'shop.outfit.${o.name}',
      for (final String t in <String>['sketch', 'draw_color', 'color_shade'])
        'teacher.lines.exam_start_$t',
      for (final String g in <String>['excellent', 'good', 'average', 'fail'])
        'teacher.lines.result_$g',
      for (int i = 1; i <= 4; i++) 'teacher.lines.praise_$i',
      for (final String h in <String>[
        'proportion_wide',
        'proportion_tall',
        'color_dark',
        'color_light',
        'color_warm',
        'color_hue',
      ])
        'teacher.lines.hint_$h',
      for (final String l in <String>[
        'exam_time_5min',
        'exam_time_1min',
        'drill_intro',
        'drill_pass',
        'drill_retry',
        'energy_empty',
        'gacha_win_brush',
        'gacha_win_outfit',
        'gacha_dupe',
        'rank_up',
      ])
        'teacher.lines.$l',
    ];
    for (final String k in keys) {
      expect(vi.has(k), isTrue, reason: 'vi: $k');
      expect(en.has(k), isTrue, reason: 'en: $k');
    }
  });

  test('a missing key falls back to Vietnamese, then shows the key', () {
    final Translations partial = Translations(AppLanguage.en, const <String, Object?>{
      'home': <String, Object?>{'all': 'All'},
    }, fallback: vi);
    expect(partial.tr('home.all'), 'All');
    expect(partial.tr('home.templates'), 'Tranh mẫu');
    expect(partial.tr('does.not.exist'), 'does.not.exist');
  });
}
