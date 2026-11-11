import 'package:flutter/material.dart';

import '../../../core/i18n/language_controller.dart';
import '../../lessons/lesson.dart';

/// Colour picker: ready-made colours (the same set as real colour pencils)
/// plus hue / saturation / brightness sliders for any other shade.
Future<Color?> showColorPickerSheet(BuildContext context, Color initial) {
  return showModalBottomSheet<Color>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    builder: (BuildContext context) => _ColorPicker(initial: initial),
  );
}

class _ColorPicker extends StatefulWidget {
  const _ColorPicker({required this.initial});

  final Color initial;

  @override
  State<_ColorPicker> createState() => _ColorPickerState();
}

class _ColorPickerState extends State<_ColorPicker> {
  late HSVColor _hsv = HSVColor.fromColor(widget.initial);

  Color get _color => _hsv.toColor();

  static final List<Color> _presets = <Color>{
    const Color(0xFF000000),
    for (final Color c in kPencilColors.values) c,
  }.toList();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Row(
              children: <Widget>[
                Expanded(
                  child: Text(
                    context.tr('draw.pickColor'),
                    overflow: TextOverflow.ellipsis,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                Container(
                  key: const Key('colorPreview'),
                  width: 44,
                  height: 28,
                  decoration: BoxDecoration(
                    color: _color,
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: Colors.white54),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: <Widget>[
                for (final Color c in _presets)
                  GestureDetector(
                    key: Key('preset-${c.toARGB32().toRadixString(16)}'),
                    onTap: () => Navigator.of(context).pop(c),
                    child: Container(
                      width: 34,
                      height: 34,
                      decoration: BoxDecoration(
                        color: c,
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.white38, width: 1.5),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 16),
            _GradientSlider(
              label: context.tr('draw.hue'),
              value: _hsv.hue / 360,
              colors: <Color>[
                for (int h = 0; h <= 360; h += 60)
                  HSVColor.fromAHSV(1, h.toDouble(), 1, 1).toColor(),
              ],
              onChanged: (double v) => setState(() => _hsv = _hsv.withHue(v * 360)),
            ),
            _GradientSlider(
              label: context.tr('draw.saturation'),
              value: _hsv.saturation,
              colors: <Color>[_hsv.withSaturation(0).toColor(), _hsv.withSaturation(1).toColor()],
              onChanged: (double v) => setState(() => _hsv = _hsv.withSaturation(v)),
            ),
            _GradientSlider(
              label: context.tr('draw.brightness'),
              value: _hsv.value,
              colors: <Color>[Colors.black, _hsv.withValue(1).toColor()],
              onChanged: (double v) => setState(() => _hsv = _hsv.withValue(v)),
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: FilledButton(
                key: const Key('useColor'),
                onPressed: () => Navigator.of(context).pop(_color),
                child: Text(context.tr('draw.useColor')),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// Slider drawn on a colour gradient (hue, saturation, brightness).
class _GradientSlider extends StatelessWidget {
  const _GradientSlider({
    required this.label,
    required this.value,
    required this.colors,
    required this.onChanged,
  });

  final String label;
  final double value;
  final List<Color> colors;
  final ValueChanged<double> onChanged;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: <Widget>[
          SizedBox(width: 78, child: Text(label, style: const TextStyle(fontSize: 13))),
          Expanded(
            child: LayoutBuilder(
              builder: (BuildContext context, BoxConstraints c) => GestureDetector(
                behavior: HitTestBehavior.opaque,
                onPanDown: (DragDownDetails d) =>
                    onChanged((d.localPosition.dx / c.maxWidth).clamp(0.0, 1.0)),
                onPanUpdate: (DragUpdateDetails d) =>
                    onChanged((d.localPosition.dx / c.maxWidth).clamp(0.0, 1.0)),
                child: SizedBox(
                  height: 30,
                  child: Stack(
                    alignment: Alignment.centerLeft,
                    children: <Widget>[
                      Container(
                        height: 16,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(colors: colors),
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      Positioned(
                        left: (value.clamp(0.0, 1.0) * c.maxWidth - 11).clamp(0.0, c.maxWidth - 22),
                        child: Container(
                          width: 22,
                          height: 22,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            color: Colors.white,
                            border: Border.all(color: Colors.black45, width: 2),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
