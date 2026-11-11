import 'dart:math' as math;

import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// Animal avatars (same ids as the server accepts).
const Map<String, String> kAvatars = <String, String>{
  'fox': '🦊',
  'cat': '🐱',
  'owl': '🦉',
  'turtle': '🐢',
  'panda': '🐼',
  'rabbit': '🐰',
  'bear': '🐻',
  'unicorn': '🦄',
};

/// Titles by lifetime points (sum of the best mark of every exam).
enum ArtistRank {
  apprentice(0),
  promising(25),
  master(60);

  const ArtistRank(this.minPoints);

  final double minPoints;

  String get labelKey => 'board.rank.$name';

  static ArtistRank of(double points) =>
      ArtistRank.values.lastWhere((ArtistRank r) => points >= r.minPoints);

  /// Points still needed for the next title (null at the top).
  static double? toNext(double points) {
    final ArtistRank r = of(points);
    return r == ArtistRank.master ? null : ArtistRank.values[r.index + 1].minPoints - points;
  }
}

/// Who the learner is on the leaderboard: a random id + secret token made on
/// this device, a nickname and an animal. No real name, no email.
class PlayerProfile extends ChangeNotifier {
  PlayerProfile({
    required this.id,
    required this.token,
    this.name = '',
    this.avatar = 'fox',
    this.shareArt = false,
  });

  static const String _prefix = 'board_';

  final String id;
  final String token;
  String name;
  String avatar;

  /// Whether the best drawing may be shown in the Hall of Fame.
  bool shareArt;

  bool get joined => name.trim().isNotEmpty;
  String get emoji => kAvatars[avatar] ?? '🦊';

  static String _random(int n) {
    const String chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    final math.Random r = math.Random.secure();
    return List<String>.generate(n, (_) => chars[r.nextInt(chars.length)]).join();
  }

  static Future<PlayerProfile> load() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      String? id = prefs.getString('${_prefix}id');
      String? token = prefs.getString('${_prefix}token');
      if (id == null || token == null) {
        id = _random(16);
        token = _random(32);
        await prefs.setString('${_prefix}id', id);
        await prefs.setString('${_prefix}token', token);
      }
      return PlayerProfile(
        id: id,
        token: token,
        name: prefs.getString('${_prefix}name') ?? '',
        avatar: prefs.getString('${_prefix}avatar') ?? 'fox',
        shareArt: prefs.getBool('${_prefix}share') ?? false,
      );
    } on Object catch (e) {
      debugPrint('Could not read profile: $e');
      return PlayerProfile(id: _random(16), token: _random(32));
    }
  }

  /// Keeps letters, digits and a few signs, like the server does.
  static String cleanName(String raw) => raw
      .replaceAll(RegExp(r"[^\p{L}\p{N} _.!?'-]", unicode: true), '')
      .replaceAll(RegExp(r'\s+'), ' ')
      .trim();

  Future<void> update({String? name, String? avatar, bool? shareArt}) async {
    if (name != null) this.name = cleanName(name).characters.take(16).toString();
    if (avatar != null && kAvatars.containsKey(avatar)) this.avatar = avatar;
    if (shareArt != null) this.shareArt = shareArt;
    notifyListeners();
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('${_prefix}name', this.name);
      await prefs.setString('${_prefix}avatar', this.avatar);
      await prefs.setBool('${_prefix}share', this.shareArt);
    } on Object catch (e) {
      debugPrint('Could not save profile: $e');
    }
  }
}

class ProfileScope extends InheritedNotifier<PlayerProfile> {
  const ProfileScope({super.key, required PlayerProfile profile, required super.child})
    : super(notifier: profile);

  static PlayerProfile? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<ProfileScope>()?.notifier;
}
