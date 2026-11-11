import 'dart:async';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

import '../../core/app_assets.dart';
import '../../core/app_strings.dart';
import '../../core/app_theme.dart';
import '../sketch/sketch_screen.dart';
import '../templates/template_catalog.dart';
import '../workspace/workspace_screen.dart';

/// Loads the photo the user wants to trace. Returns null when cancelled.
typedef PhotoPicker = Future<Uint8List?> Function();

Future<Uint8List?> _pickFromGallery() async {
  final XFile? file = await ImagePicker().pickImage(
    source: ImageSource.gallery,
    // Large enough for tracing, small enough to process quickly.
    maxWidth: 2048,
    maxHeight: 2048,
  );
  return file?.readAsBytes();
}

/// Home: "trace your own photo", category chips and the template grid.
class HomeScreen extends StatefulWidget {
  const HomeScreen({
    super.key,
    this.templates = kTemplates,
    this.pickPhoto = _pickFromGallery,
    this.workspaceBuilder,
  });

  final List<DrawingTemplate> templates;
  final PhotoPicker pickPhoto;

  /// Opens the workspace for a picture (overridable in tests).
  final Widget Function(ImageProvider image)? workspaceBuilder;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  TemplateCategory? _category;

  Widget _workspace(ImageProvider image) =>
      widget.workspaceBuilder?.call(image) ?? WorkspaceScreen(overlayImage: image);

  void _openTemplate(DrawingTemplate template) {
    Navigator.of(context)
        .push(MaterialPageRoute<void>(builder: (_) => _workspace(AssetImage(template.asset))));
  }

  Future<void> _traceOwnPhoto() async {
    final Uint8List? bytes = await widget.pickPhoto();
    if (bytes == null || !mounted) return;
    await Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (_) => SketchScreen(photo: bytes, workspaceBuilder: widget.workspaceBuilder),
      ),
    );
  }

  void _showHowItWorks() {
    showModalBottomSheet<void>(
      context: context,
      showDragHandle: true,
      builder: (BuildContext context) => Padding(
        padding: const EdgeInsets.fromLTRB(24, 0, 24, 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(AppStrings.howItWorks, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 12),
            const Text(AppStrings.howItWorksBody, style: TextStyle(height: 1.5)),
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: FilledButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text(AppStrings.gotIt),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final List<DrawingTemplate> visible = _category == null
        ? widget.templates
        : widget.templates.where((DrawingTemplate t) => t.category == _category).toList();
    final ThemeData theme = Theme.of(context);

    return Scaffold(
      backgroundColor: AppTheme.ink,
      body: SafeArea(
        bottom: false,
        child: CustomScrollView(
          slivers: <Widget>[
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 12, 8),
                child: Row(
                  children: <Widget>[
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Image.asset(AppAssets.logo, width: 44, height: 44),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            AppStrings.appName,
                            style: theme.textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.w800,
                            ),
                          ),
                          Text(
                            AppStrings.tagline,
                            style: theme.textTheme.bodySmall?.copyWith(color: Colors.white70),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      key: const Key('howItWorks'),
                      tooltip: AppStrings.howItWorks,
                      onPressed: _showHowItWorks,
                      icon: const Icon(Icons.help_outline),
                    ),
                  ],
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
                child: _OwnPhotoCard(onTap: _traceOwnPhoto),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 8),
                child: Text(AppStrings.templates, style: theme.textTheme.titleLarge),
              ),
            ),
            SliverToBoxAdapter(
              child: SizedBox(
                height: 44,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  children: <Widget>[
                    _CategoryChip(
                      label: AppStrings.all,
                      icon: Icons.apps,
                      selected: _category == null,
                      onTap: () => setState(() => _category = null),
                    ),
                    for (final TemplateCategory c in TemplateCategory.values)
                      _CategoryChip(
                        key: Key('category-${c.name}'),
                        label: c.label,
                        icon: c.icon,
                        selected: _category == c,
                        onTap: () => setState(() => _category = c),
                      ),
                  ],
                ),
              ),
            ),
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
                  maxCrossAxisExtent: 220,
                  mainAxisSpacing: 12,
                  crossAxisSpacing: 12,
                  childAspectRatio: 0.78,
                ),
                delegate: SliverChildBuilderDelegate(
                  (BuildContext context, int i) =>
                      _TemplateCard(template: visible[i], onTap: () => _openTemplate(visible[i])),
                  childCount: visible.length,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _OwnPhotoCard extends StatelessWidget {
  const _OwnPhotoCard({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Material(
      key: const Key('ownPhotoCard'),
      borderRadius: BorderRadius.circular(20),
      clipBehavior: Clip.antiAlias,
      child: Ink(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: <Color>[Color(0xFFFFC56B), Color(0xFFFF9F43)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: InkWell(
          onTap: onTap,
          child: const Padding(
            padding: EdgeInsets.all(18),
            child: Row(
              children: <Widget>[
                CircleAvatar(
                  radius: 26,
                  backgroundColor: Color(0x33000000),
                  child: Icon(Icons.add_photo_alternate, color: Colors.white, size: 28),
                ),
                SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Text(
                        AppStrings.traceYourPhoto,
                        style: TextStyle(
                          color: AppTheme.ink,
                          fontSize: 18,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        AppStrings.traceYourPhotoHint,
                        style: TextStyle(color: Color(0xCC14161F), fontSize: 13),
                      ),
                    ],
                  ),
                ),
                Icon(Icons.chevron_right, color: AppTheme.ink),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CategoryChip extends StatelessWidget {
  const _CategoryChip({
    super.key,
    required this.label,
    required this.icon,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final IconData icon;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        avatar: Icon(icon, size: 18),
        label: Text(label),
        selected: selected,
        onSelected: (_) => onTap(),
        showCheckmark: false,
      ),
    );
  }
}

class _TemplateCard extends StatelessWidget {
  const _TemplateCard({required this.template, required this.onTap});

  final DrawingTemplate template;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    return Material(
      key: Key('template-${template.id}'),
      color: const Color(0xFFF7F3EA),
      borderRadius: BorderRadius.circular(18),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Expanded(
              child: Stack(
                children: <Widget>[
                  Positioned.fill(
                    child: Padding(
                      padding: const EdgeInsets.all(12),
                      child: Image.asset(
                        template.asset,
                        fit: BoxFit.contain,
                        cacheWidth: 400,
                        semanticLabel: template.name,
                      ),
                    ),
                  ),
                  if (template.premium)
                    Positioned(
                      top: 8,
                      right: 8,
                      child: DecoratedBox(
                        decoration: BoxDecoration(
                          color: colors.primary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Padding(
                          padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          child: Text(
                            AppStrings.pro,
                            style: TextStyle(
                              color: AppTheme.ink,
                              fontSize: 11,
                              fontWeight: FontWeight.w900,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Container(
              color: Colors.white,
              padding: const EdgeInsets.fromLTRB(12, 8, 12, 10),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: Text(
                      template.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(color: AppTheme.ink, fontWeight: FontWeight.w700),
                    ),
                  ),
                  _DifficultyDots(difficulty: template.difficulty),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _DifficultyDots extends StatelessWidget {
  const _DifficultyDots({required this.difficulty});

  final Difficulty difficulty;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: difficulty.label,
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          for (int i = 1; i <= 3; i++)
            Container(
              width: 7,
              height: 7,
              margin: const EdgeInsets.only(left: 3),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: i <= difficulty.level ? const Color(0xFFFF9F43) : const Color(0x3314161F),
              ),
            ),
        ],
      ),
    );
  }
}
