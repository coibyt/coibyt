import 'dart:io';

import 'package:flutter/material.dart';
import 'package:gal/gal.dart';
import 'package:share_plus/share_plus.dart';
import 'package:video_player/video_player.dart';

import '../../core/i18n/language_controller.dart';
import 'timelapse_recorder.dart';

/// Plays the finished time-lapse in a loop, with Save and Share actions.
class TimelapseResultScreen extends StatefulWidget {
  const TimelapseResultScreen({super.key, required this.result});

  final TimelapseResult result;

  @override
  State<TimelapseResultScreen> createState() => _TimelapseResultScreenState();
}

class _TimelapseResultScreenState extends State<TimelapseResultScreen> {
  late final VideoPlayerController _video = VideoPlayerController.file(File(widget.result.path));
  bool _saving = false;
  bool _saved = false;
  bool _previewFailed = false;

  @override
  void initState() {
    super.initState();
    _startPreview();
  }

  Future<void> _startPreview() async {
    try {
      await _video.initialize();
      await _video.setLooping(true);
      if (!mounted) return;
      setState(() {});
      await _video.play();
    } on Object catch (e) {
      // The file is still fine to save/share even if it cannot play here.
      debugPrint('Time-lapse preview failed: $e');
      if (mounted) setState(() => _previewFailed = true);
    }
  }

  @override
  void dispose() {
    _video.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    setState(() => _saving = true);
    final ScaffoldMessengerState messenger = ScaffoldMessenger.of(context);
    final String album = context.tr('app.name');
    final String savedText = context.tr('timelapse.savedToGallery');
    final String failedText = context.tr('timelapse.saveFailed');
    try {
      if (!await Gal.hasAccess(toAlbum: true)) {
        await Gal.requestAccess(toAlbum: true);
      }
      await Gal.putVideo(widget.result.path, album: album);
      if (mounted) setState(() => _saved = true);
      messenger.showSnackBar(SnackBar(content: Text(savedText)));
    } on GalException catch (e) {
      messenger.showSnackBar(SnackBar(content: Text('$failedText (${e.type.name})')));
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _share() async {
    await SharePlus.instance.share(
      ShareParams(
        files: <XFile>[XFile(widget.result.path)],
        text: context.tr('timelapse.shareText'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final ColorScheme colors = Theme.of(context).colorScheme;
    final Duration rec = widget.result.recorded;
    final String minutes = '${rec.inMinutes}:${(rec.inSeconds % 60).toString().padLeft(2, '0')}';
    return Scaffold(
      appBar: AppBar(title: Text(context.tr('timelapse.title'))),
      body: SafeArea(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Center(
                child: _previewFailed
                    ? const Icon(Icons.movie_outlined, size: 96, color: Colors.white38)
                    : _video.value.isInitialized
                    ? AspectRatio(
                        aspectRatio: _video.value.aspectRatio,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(16),
                          child: VideoPlayer(_video),
                        ),
                      )
                    : const CircularProgressIndicator(),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 12, 20, 4),
              child: Text(
                '${context.tr('timelapse.drawingTime')} $minutes · ${widget.result.frameCount} ${context.tr('timelapse.frames')}',
                style: TextStyle(color: colors.onSurfaceVariant),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: FilledButton.icon(
                      onPressed: _saving || _saved ? null : _save,
                      icon: Icon(_saved ? Icons.check : Icons.download),
                      label: Text(
                        _saved
                            ? context.tr('timelapse.saved')
                            : context.tr('timelapse.saveToGallery'),
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: _share,
                      icon: const Icon(Icons.share),
                      label: Text(context.tr('timelapse.share')),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
