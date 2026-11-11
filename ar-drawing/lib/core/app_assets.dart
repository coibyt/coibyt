/// Paths of bundled assets (declared in pubspec.yaml).
abstract final class AppAssets {
  /// Original sample line-art (generated for TraceLight with kie.ai, then
  /// converted to transparent ink). Used until the template library exists.
  static const String sampleFox = 'assets/images/sample_fox_lineart.png';
  static const String sampleChibi = 'assets/images/sample_chibi_lineart.png';

  static const List<String> samples = <String>[sampleFox, sampleChibi];
}
