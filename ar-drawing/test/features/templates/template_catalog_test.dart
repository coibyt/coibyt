import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:tracelight/features/templates/template_catalog.dart';

void main() {
  test('every template picture exists and is declared in pubspec', () {
    final String pubspec = File('pubspec.yaml').readAsStringSync();
    for (final DrawingTemplate t in kTemplates) {
      expect(File(t.asset).existsSync(), isTrue, reason: t.asset);
      expect(pubspec, contains('assets/templates/${t.category.name}/'));
    }
  });

  test('ids are unique and every category has at least 3 pictures', () {
    expect(kTemplates.map((DrawingTemplate t) => t.asset).toSet(), hasLength(kTemplates.length));
    for (final TemplateCategory c in TemplateCategory.values) {
      expect(
        kTemplates.where((DrawingTemplate t) => t.category == c).length,
        greaterThanOrEqualTo(3),
        reason: c.name,
      );
    }
  });

  test('every category offers free pictures', () {
    for (final TemplateCategory c in TemplateCategory.values) {
      expect(kTemplates.any((DrawingTemplate t) => t.category == c && !t.premium), isTrue);
    }
  });
}
