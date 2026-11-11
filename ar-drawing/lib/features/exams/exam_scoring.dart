import 'dart:math' as math;

import 'package:flutter/foundation.dart';
import 'package:image/image.dart' as img;

import 'exam.dart';

/// Everything the grader needs, as plain data (runs in a background isolate).
@immutable
class ScoreRequest {
  const ScoreRequest({
    required this.task,
    required this.weights,
    required this.student,
    required this.studentWidth,
    required this.studentHeight,
    required this.outlinePng,
    required this.modelPng,
    this.sheetRect,
    this.strokeCount = 0,
    this.distinctSizes = 1,
  });

  final ExamTask task;
  final Map<Criterion, double> weights;

  /// The student's layer as RGBA (transparent where nothing is drawn).
  final Uint8List student;
  final int studentWidth;
  final int studentHeight;

  /// Model outline (`1_outline.png`) and finished model (`4_final.png`).
  final Uint8List outlinePng;
  final Uint8List modelPng;

  /// For printed-outline exams: where the outline was printed on the sheet,
  /// as fractions of the student image (left, top, width, height).
  final List<double>? sheetRect;

  /// Stroke statistics (for the creativity estimate).
  final int strokeCount;
  final int distinctSizes;
}

/// The report card. Scores are 0..1 per criterion, [total] is out of 10.
@immutable
class ExamScore {
  const ExamScore({
    required this.criteria,
    required this.total,
    this.details = const <String, double>{},
  });

  static const ExamScore empty = ExamScore(criteria: <Criterion, double>{}, total: 0);

  /// Only the criteria graded by this exam.
  final Map<Criterion, double> criteria;
  final double total;

  /// Raw measurements, for feedback and debugging.
  final Map<String, double> details;

  bool get passed => total >= Exam.passMark;

  /// Vietnamese school grading: Giỏi ≥ 8, Khá ≥ 6.5, Trung bình ≥ 5.
  String get gradeKey => total >= 8
      ? 'exam.grade.excellent'
      : total >= 6.5
      ? 'exam.grade.good'
      : total >= 5
      ? 'exam.grade.average'
      : 'exam.grade.fail';
}

/// Grid size used for comparisons (the longest side).
const int _grid = 96;

/// Grades a drawing against the model with simple computer vision:
///
/// - **Proportion**: the drawing and the model are each cropped to their own
///   bounding box and laid on the same grid, so position and size on the page
///   do not matter, only the shape. Lines are matched with a chamfer distance
///   (how far each student line is from a model line, and vice versa), and the
///   width/height ratio is compared. On a printed sheet it measures colouring
///   inside the lines instead.
/// - **Colour**: average colour difference (CIE ΔE) where the student painted
///   the subject, how well light and shadow follow the model (correlation of
///   lightness), and how much of the subject is coloured.
/// - **Creativity** (an automatic estimate): variety of colours, extra
///   details drawn around the subject, and variety of strokes.
ExamScore gradeExam(ScoreRequest r) {
  final img.Image outline = img.decodePng(r.outlinePng)!;
  final img.Image model = img.decodePng(r.modelPng)!;
  final _Raster student = _Raster.fromRgba(r.student, r.studentWidth, r.studentHeight);
  if (student.inkCount < 20) return ExamScore.empty;

  final Map<String, double> d = <String, double>{};
  final Map<Criterion, double> s = <Criterion, double>{};

  // Bring model and student onto one grid.
  late final _Raster studentGrid, outlineGrid, modelGrid;
  final double modelAspect = model.width / model.height;
  final int gw = modelAspect >= 1 ? _grid : (_grid * modelAspect).round().clamp(8, _grid);
  final int gh = modelAspect >= 1 ? (_grid / modelAspect).round().clamp(8, _grid) : _grid;
  outlineGrid = _Raster.fromImage(outline).crop(null).resize(gw, gh);
  modelGrid = _Raster.fromImage(model).crop(null).resize(gw, gh);

  final FracRect? sheet = r.sheetRect == null
      ? null
      : FracRect.fromLTWH(r.sheetRect![0], r.sheetRect![1], r.sheetRect![2], r.sheetRect![3]);
  if (r.task.printedOutline && sheet != null) {
    // Sheet already aligned: take exactly the printed area (the model's own
    // bounding box inside it, like the outline crop).
    studentGrid = student.cropFraction(sheet).cropLike(_Raster.fromImage(model)).resize(gw, gh);
  } else {
    studentGrid = student.crop(null).resize(gw, gh);
  }

  // ---------------------------------------------------------- proportion
  final Bbox sb = student.bbox()!;
  final Bbox mb = _Raster.fromImage(model).bbox()!;
  final double aspectStudent = sb.width / sb.height, aspectModel = mb.width / mb.height;
  final double aspectScore = math.exp(-2.2 * (math.log(aspectStudent / aspectModel)).abs());
  final Float32List distToModelLines = _distance(outlineGrid.mask(60), gw, gh);
  final Float32List distToStudent = _distance(studentGrid.mask(40), gw, gh);
  const double tol = 3.5; // grid cells (~4% of the picture)
  double lineSoft(Uint8List from, Float32List distTo) {
    double sum = 0;
    int n = 0;
    for (int i = 0; i < from.length; i++) {
      if (from[i] == 0) continue;
      sum += math.max(0, 1 - distTo[i] / (2 * tol));
      n++;
    }
    return n == 0 ? 0 : sum / n;
  }

  final Uint8List modelSilhouette = modelGrid.mask(10);
  final Uint8List studentInk = studentGrid.mask(40);
  if (r.task == ExamTask.sketch) {
    final double precision = lineSoft(studentInk, distToModelLines);
    final double recall = lineSoft(outlineGrid.mask(60), distToStudent);
    final double f = precision + recall == 0 ? 0 : 2 * precision * recall / (precision + recall);
    d['linePrecision'] = precision;
    d['lineRecall'] = recall;
    d['aspect'] = aspectScore;
    // A right width/height ratio only counts when the shape itself matches.
    s[Criterion.proportion] = (f * (0.6 + 0.4 * aspectScore)).clamp(0.0, 1.0);
  } else if (r.task == ExamTask.drawColor) {
    final double iou = _iou(studentInk, modelSilhouette);
    final double recall = lineSoft(outlineGrid.mask(60), distToStudent);
    d['silhouetteIoU'] = iou;
    d['aspect'] = aspectScore;
    s[Criterion.proportion] = ((0.6 * iou + 0.4 * recall) * (0.6 + 0.4 * aspectScore)).clamp(
      0.0,
      1.0,
    );
  } else {
    // Printed outline: colouring neatly inside the lines.
    final Uint8List inside = _dilate(modelSilhouette, gw, gh, 1);
    int ink = 0, inInk = 0;
    for (int i = 0; i < studentInk.length; i++) {
      if (studentInk[i] == 0) continue;
      ink++;
      if (inside[i] != 0) inInk++;
    }
    final double neatness = ink == 0 ? 0 : inInk / ink;
    d['neatness'] = neatness;
    s[Criterion.proportion] = neatness;
  }

  // --------------------------------------------------------------- colour
  if (r.task.gradesColor) {
    final Float32List sLab = studentGrid.blurredLab(), mLab = modelGrid.blurredLab();
    double deSum = 0;
    int overlap = 0, silhouette = 0;
    final List<double> ls = <double>[], lm = <double>[];
    for (int i = 0; i < modelSilhouette.length; i++) {
      if (modelSilhouette[i] == 0) continue;
      silhouette++;
      if (studentInk[i] == 0) continue;
      overlap++;
      final double dl = sLab[i * 3] - mLab[i * 3];
      final double da = sLab[i * 3 + 1] - mLab[i * 3 + 1];
      final double db = sLab[i * 3 + 2] - mLab[i * 3 + 2];
      deSum += math.sqrt(dl * dl + da * da + db * db);
      ls.add(sLab[i * 3]);
      lm.add(mLab[i * 3]);
    }
    final double coverage = silhouette == 0 ? 0 : overlap / silhouette;
    final double deltaE = overlap == 0 ? 100 : deSum / overlap;
    final double hue = (1 - (deltaE - 8) / 45).clamp(0.0, 1.0);
    final double shading = ((_pearson(ls, lm) + 0.1) / 0.9).clamp(0.0, 1.0);
    d['deltaE'] = deltaE;
    d['coverage'] = coverage;
    d['shading'] = shading;
    s[Criterion.color] =
        (0.5 * hue + 0.3 * shading + 0.2 * coverage).clamp(0.0, 1.0) *
        // An almost empty subject cannot score high, however nice the colour.
        math.min(1, coverage / 0.35);
  }

  // ----------------------------------------------------------- creativity
  if (r.weights.containsKey(Criterion.creativity)) {
    final int hues = student.hueBins();
    final double variety = r.task == ExamTask.sketch ? 0.5 : math.min(1.0, hues / 6);
    final Uint8List around = _dilate(modelSilhouette, gw, gh, 3);
    int ink = 0, extra = 0;
    for (int i = 0; i < studentInk.length; i++) {
      if (studentInk[i] == 0) continue;
      ink++;
      if (around[i] == 0) extra++;
    }
    // Freehand drawings are normalised to their own box, so "around" only
    // means something on a printed sheet; use the canvas around the subject.
    final double extraFrac = r.task.printedOutline
        ? (ink == 0 ? 0 : extra / ink)
        : student.inkOutsideFraction(sheet);
    final double extras = extraFrac <= 0.4
        ? math.min(1, extraFrac / 0.12)
        : math.max(0, 1 - (extraFrac - 0.4) * 2);
    final double strokes =
        0.5 * math.min(1, r.distinctSizes / 3) + 0.5 * math.min(1, r.strokeCount / 25);
    d['hueBins'] = hues.toDouble();
    d['extraFraction'] = extraFrac;
    s[Criterion.creativity] = (0.4 * variety + 0.35 * extras + 0.25 * strokes).clamp(0.0, 1.0);
  }

  double total = 0, weightSum = 0;
  r.weights.forEach((Criterion c, double w) {
    total += w * (s[c] ?? 0);
    weightSum += w;
  });
  final double outOf10 = weightSum == 0 ? 0 : (10 * total / weightSum);
  return ExamScore(
    criteria: <Criterion, double>{for (final Criterion c in r.weights.keys) c: s[c] ?? 0},
    total: (outOf10 * 10).round() / 10,
    details: d,
  );
}

// ------------------------------------------------------------------ helpers

@immutable
class FracRect {
  const FracRect.fromLTWH(this.left, this.top, this.width, this.height);

  final double left, top, width, height;
}

@immutable
class Bbox {
  const Bbox(this.x0, this.y0, this.x1, this.y1);

  final int x0, y0, x1, y1;
  int get width => x1 - x0 + 1;
  int get height => y1 - y0 + 1;
}

/// A small RGBA raster with the few operations the grader needs.
class _Raster {
  _Raster(this.width, this.height, this.rgba);

  factory _Raster.fromRgba(Uint8List rgba, int w, int h) => _Raster(w, h, rgba);

  /// Works for any PNG flavour (palette, grey, 8/16 bit) by reading the
  /// resolved colour of every pixel.
  factory _Raster.fromImage(img.Image image) {
    final Uint8List out = Uint8List(image.width * image.height * 4);
    int i = 0;
    for (final img.Pixel p in image) {
      out[i] = (p.rNormalized * 255).round();
      out[i + 1] = (p.gNormalized * 255).round();
      out[i + 2] = (p.bNormalized * 255).round();
      out[i + 3] = image.hasAlpha || image.hasPalette ? (p.aNormalized * 255).round() : 255;
      i += 4;
    }
    return _Raster(image.width, image.height, out);
  }

  final int width, height;
  final Uint8List rgba;

  int get inkCount {
    int n = 0;
    for (int i = 3; i < rgba.length; i += 4) {
      if (rgba[i] > 40) n++;
    }
    return n;
  }

  Bbox? bbox([int threshold = 40]) {
    int x0 = width, y0 = height, x1 = -1, y1 = -1;
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        if (rgba[(y * width + x) * 4 + 3] > threshold) {
          if (x < x0) x0 = x;
          if (x > x1) x1 = x;
          if (y < y0) y0 = y;
          if (y > y1) y1 = y;
        }
      }
    }
    return x1 < 0 ? null : Bbox(x0, y0, x1, y1);
  }

  _Raster _sub(int x0, int y0, int w, int h) {
    final Uint8List out = Uint8List(w * h * 4);
    for (int y = 0; y < h; y++) {
      final int sy = y + y0;
      if (sy < 0 || sy >= height) continue;
      for (int x = 0; x < w; x++) {
        final int sx = x + x0;
        if (sx < 0 || sx >= width) continue;
        final int si = (sy * width + sx) * 4, di = (y * w + x) * 4;
        out[di] = rgba[si];
        out[di + 1] = rgba[si + 1];
        out[di + 2] = rgba[si + 2];
        out[di + 3] = rgba[si + 3];
      }
    }
    return _Raster(w, h, out);
  }

  /// Crops to the content's bounding box.
  _Raster crop(Bbox? box) {
    final Bbox? b = box ?? bbox(10);
    if (b == null) return this;
    return _sub(b.x0, b.y0, b.width, b.height);
  }

  _Raster cropFraction(FracRect r) => _sub(
    (r.left * width).round(),
    (r.top * height).round(),
    math.max(1, (r.width * width).round()),
    math.max(1, (r.height * height).round()),
  );

  /// Crops this (an aligned copy of [model]'s full image) to the same
  /// relative box as the model's content.
  _Raster cropLike(_Raster model) {
    final Bbox? b = model.bbox(10);
    if (b == null) return this;
    return _sub(
      (b.x0 / model.width * width).round(),
      (b.y0 / model.height * height).round(),
      math.max(1, (b.width / model.width * width).round()),
      math.max(1, (b.height / model.height * height).round()),
    );
  }

  /// Area-max resize for alpha (keeps thin lines) and area-average for colour.
  _Raster resize(int w, int h) {
    final Uint8List out = Uint8List(w * h * 4);
    for (int y = 0; y < h; y++) {
      final int sy0 = (y * height / h).floor(),
          sy1 = math.max(sy0 + 1, ((y + 1) * height / h).ceil());
      for (int x = 0; x < w; x++) {
        final int sx0 = (x * width / w).floor(),
            sx1 = math.max(sx0 + 1, ((x + 1) * width / w).ceil());
        int a = 0, r = 0, g = 0, b = 0, n = 0;
        for (int sy = sy0; sy < math.min(sy1, height); sy++) {
          for (int sx = sx0; sx < math.min(sx1, width); sx++) {
            final int i = (sy * width + sx) * 4;
            final int al = rgba[i + 3];
            if (al > a) a = al;
            if (al > 40) {
              r += rgba[i];
              g += rgba[i + 1];
              b += rgba[i + 2];
              n++;
            }
          }
        }
        final int o = (y * w + x) * 4;
        if (n > 0) {
          out[o] = r ~/ n;
          out[o + 1] = g ~/ n;
          out[o + 2] = b ~/ n;
        }
        out[o + 3] = a;
      }
    }
    return _Raster(w, h, out);
  }

  Uint8List mask(int threshold) {
    final Uint8List m = Uint8List(width * height);
    for (int i = 0; i < m.length; i++) {
      m[i] = rgba[i * 4 + 3] > threshold ? 1 : 0;
    }
    return m;
  }

  /// CIE Lab per pixel after a 3×3 blur over painted pixels (smooths
  /// pencil-like texture before comparing colours).
  Float32List blurredLab() {
    final Float32List out = Float32List(width * height * 3);
    for (int y = 0; y < height; y++) {
      for (int x = 0; x < width; x++) {
        double r = 0, g = 0, b = 0;
        int n = 0;
        for (int dy = -1; dy <= 1; dy++) {
          for (int dx = -1; dx <= 1; dx++) {
            final int xx = x + dx, yy = y + dy;
            if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
            final int i = (yy * width + xx) * 4;
            if (rgba[i + 3] <= 40) continue;
            r += rgba[i];
            g += rgba[i + 1];
            b += rgba[i + 2];
            n++;
          }
        }
        final List<double> lab = n == 0 ? const <double>[100, 0, 0] : _lab(r / n, g / n, b / n);
        final int o = (y * width + x) * 3;
        out[o] = lab[0];
        out[o + 1] = lab[1];
        out[o + 2] = lab[2];
      }
    }
    return out;
  }

  /// Number of 30° hue families used noticeably (≥ 2% of the ink).
  int hueBins() {
    final List<int> bins = List<int>.filled(12, 0);
    int ink = 0;
    for (int i = 0; i < rgba.length; i += 4) {
      if (rgba[i + 3] <= 40) continue;
      ink++;
      final double r = rgba[i] / 255, g = rgba[i + 1] / 255, b = rgba[i + 2] / 255;
      final double mx = math.max(r, math.max(g, b)), mn = math.min(r, math.min(g, b));
      if (mx - mn < 0.2 || mx < 0.15) continue; // greys don't count
      double h;
      if (mx == r) {
        h = ((g - b) / (mx - mn)) % 6;
      } else if (mx == g) {
        h = (b - r) / (mx - mn) + 2;
      } else {
        h = (r - g) / (mx - mn) + 4;
      }
      bins[((h * 60) % 360 ~/ 30).clamp(0, 11)]++;
    }
    return ink == 0 ? 0 : bins.where((int c) => c >= ink * 0.02).length;
  }

  /// Share of ink outside [subject] (fractions), or — for freehand work —
  /// outside the largest blob of ink (a ground line, sun, background...).
  double inkOutsideFraction(FracRect? subject) {
    final Uint8List m = mask(40);
    int total = 0;
    for (final int v in m) {
      total += v;
    }
    if (total == 0) return 0;
    // Largest connected blob = the subject.
    final Int32List label = Int32List(m.length);
    int next = 0, biggest = 0;
    final List<int> stack = <int>[];
    for (int i = 0; i < m.length; i++) {
      if (m[i] == 0 || label[i] != 0) continue;
      next++;
      int size = 0;
      stack.add(i);
      label[i] = next;
      while (stack.isNotEmpty) {
        final int p = stack.removeLast();
        size++;
        final int px = p % width, py = p ~/ width;
        for (int dy = -3; dy <= 3; dy++) {
          for (int dx = -3; dx <= 3; dx++) {
            final int xx = px + dx, yy = py + dy;
            if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
            final int q = yy * width + xx;
            if (m[q] != 0 && label[q] == 0) {
              label[q] = next;
              stack.add(q);
            }
          }
        }
      }
      if (size > biggest) biggest = size;
    }
    return 1 - biggest / total;
  }
}

List<double> _lab(double r, double g, double b) {
  double lin(double c) {
    c /= 255;
    return c > 0.04045 ? math.pow((c + 0.055) / 1.055, 2.4).toDouble() : c / 12.92;
  }

  final double rl = lin(r), gl = lin(g), bl = lin(b);
  final double x = (0.4124 * rl + 0.3576 * gl + 0.1805 * bl) / 0.95047;
  final double y = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
  final double z = (0.0193 * rl + 0.1192 * gl + 0.9505 * bl) / 1.08883;
  double f(double t) => t > 0.008856 ? math.pow(t, 1 / 3).toDouble() : 7.787 * t + 16 / 116;
  return <double>[116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}

/// Two-pass chamfer (3-4) distance to the nearest set cell, in cells.
Float32List _distance(Uint8List m, int w, int h) {
  const double inf = 1e9;
  final Float32List d = Float32List(w * h);
  for (int i = 0; i < d.length; i++) {
    d[i] = m[i] != 0 ? 0 : inf;
  }
  double at(int x, int y) => (x < 0 || y < 0 || x >= w || y >= h) ? inf : d[y * w + x];
  for (int y = 0; y < h; y++) {
    for (int x = 0; x < w; x++) {
      final int i = y * w + x;
      d[i] = math.min(
        d[i],
        math.min(
          math.min(at(x - 1, y) + 3, at(x, y - 1) + 3),
          math.min(at(x - 1, y - 1) + 4, at(x + 1, y - 1) + 4),
        ),
      );
    }
  }
  for (int y = h - 1; y >= 0; y--) {
    for (int x = w - 1; x >= 0; x--) {
      final int i = y * w + x;
      d[i] = math.min(
        d[i],
        math.min(
          math.min(at(x + 1, y) + 3, at(x, y + 1) + 3),
          math.min(at(x + 1, y + 1) + 4, at(x - 1, y + 1) + 4),
        ),
      );
    }
  }
  for (int i = 0; i < d.length; i++) {
    d[i] = d[i] / 3;
  }
  return d;
}

Uint8List _dilate(Uint8List m, int w, int h, int r) {
  final Uint8List out = Uint8List(m.length);
  for (int y = 0; y < h; y++) {
    for (int x = 0; x < w; x++) {
      bool on = false;
      for (int dy = -r; dy <= r && !on; dy++) {
        for (int dx = -r; dx <= r; dx++) {
          final int xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < w && yy < h && m[yy * w + xx] != 0) {
            on = true;
            break;
          }
        }
      }
      out[y * w + x] = on ? 1 : 0;
    }
  }
  return out;
}

double _iou(Uint8List a, Uint8List b) {
  int inter = 0, union = 0;
  for (int i = 0; i < a.length; i++) {
    if (a[i] != 0 && b[i] != 0) inter++;
    if (a[i] != 0 || b[i] != 0) union++;
  }
  return union == 0 ? 0 : inter / union;
}

double _pearson(List<double> a, List<double> b) {
  final int n = a.length;
  if (n < 10) return 0;
  double ma = 0, mb = 0;
  for (int i = 0; i < n; i++) {
    ma += a[i];
    mb += b[i];
  }
  ma /= n;
  mb /= n;
  double sab = 0, saa = 0, sbb = 0;
  for (int i = 0; i < n; i++) {
    sab += (a[i] - ma) * (b[i] - mb);
    saa += (a[i] - ma) * (a[i] - ma);
    sbb += (b[i] - mb) * (b[i] - mb);
  }
  if (saa == 0 || sbb == 0) return 0;
  return sab / math.sqrt(saa * sbb);
}
