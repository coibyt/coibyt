import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart' as http;

import 'player_profile.dart';

/// One row of the board.
@immutable
class BoardRow {
  const BoardRow({
    required this.rank,
    required this.name,
    required this.avatar,
    required this.score,
    required this.exams,
    required this.total,
    required this.me,
  });

  factory BoardRow.fromJson(Map<String, Object?> j) => BoardRow(
    rank: (j['rank']! as num).toInt(),
    name: j['name'] as String? ?? '',
    avatar: j['avatar'] as String? ?? 'fox',
    score: (j['score']! as num).toDouble(),
    exams: ((j['exams'] as num?) ?? 0).toInt(),
    total: ((j['total'] as num?) ?? 0).toDouble(),
    me: j['me'] == true,
  );

  final int rank;
  final String name;
  final String avatar;
  final double score;
  final int exams;
  final double total;
  final bool me;
}

@immutable
class Board {
  const Board({required this.rows, required this.me, required this.players, required this.resetAt});

  factory Board.fromJson(Map<String, Object?> j) => Board(
    rows: <BoardRow>[
      for (final Object? r in j['rows']! as List<Object?>)
        BoardRow.fromJson(r! as Map<String, Object?>),
    ],
    me: j['me'] == null ? null : BoardRow.fromJson(j['me']! as Map<String, Object?>),
    players: ((j['players'] as num?) ?? 0).toInt(),
    resetAt: DateTime.fromMillisecondsSinceEpoch(((j['resetAt'] as num?) ?? 0).toInt()),
  );

  final List<BoardRow> rows;
  final BoardRow? me;
  final int players;
  final DateTime resetAt;
}

@immutable
class HallItem {
  const HallItem({
    required this.name,
    required this.avatar,
    required this.score,
    required this.exam,
    required this.url,
  });

  factory HallItem.fromJson(Map<String, Object?> j, Uri base) => HallItem(
    name: j['name'] as String? ?? '',
    avatar: j['avatar'] as String? ?? 'fox',
    score: (j['score']! as num).toDouble(),
    exam: j['exam'] as String? ?? '',
    url: base.resolve(j['url']! as String).toString(),
  );

  final String name;
  final String avatar;
  final double score;
  final String exam;
  final String url;
}

/// Talks to the Babelisa server (`/api/tracelight/*`). All calls fail
/// softly: the app works offline, only the boards need the network.
class LeaderboardClient {
  LeaderboardClient({Uri? base, http.Client? client})
    : base =
          base ??
          (kIsWeb
              ? Uri.base.replace(path: '/', query: '', fragment: '')
              : Uri.parse('https://babelisa.com/')),
      _http = client ?? http.Client();

  final Uri base;
  final http.Client _http;

  Uri _u(String path, [Map<String, String>? q]) => base.resolve(path).replace(queryParameters: q);

  Future<Map<String, Object?>?> _post(String path, Map<String, Object?> body) async {
    try {
      final http.Response r = await _http
          .post(
            _u(path),
            headers: <String, String>{'Content-Type': 'application/json'},
            body: jsonEncode(body),
          )
          .timeout(const Duration(seconds: 12));
      if (r.statusCode != 200) {
        debugPrint('POST $path → ${r.statusCode} ${r.body}');
        return null;
      }
      return jsonDecode(r.body) as Map<String, Object?>;
    } on Object catch (e) {
      debugPrint('POST $path failed: $e');
      return null;
    }
  }

  /// Sends an exam mark. Returns the server's answer, or null when offline.
  Future<Map<String, Object?>?> submitScore(PlayerProfile p, String exam, double score) =>
      _post('api/tracelight/score', <String, Object?>{
        'id': p.id,
        'token': p.token,
        'name': p.name,
        'avatar': p.avatar,
        'exam': exam,
        'score': score,
      });

  /// Shares a drawing (PNG) for the Hall of Fame (only with consent).
  Future<bool> uploadArt(PlayerProfile p, String exam, double score, Uint8List png) async {
    final Map<String, Object?>? r = await _post('api/tracelight/art', <String, Object?>{
      'id': p.id,
      'token': p.token,
      'exam': exam,
      'score': score,
      'png': 'data:image/png;base64,${base64Encode(png)}',
    });
    return r?['ok'] == true;
  }

  Future<Board?> board(String period, PlayerProfile? me) async {
    try {
      final http.Response r = await _http
          .get(
            _u('api/tracelight/leaderboard', <String, String>{
              'period': period,
              if (me != null) 'id': me.id,
            }),
          )
          .timeout(const Duration(seconds: 12));
      if (r.statusCode != 200) return null;
      return Board.fromJson(jsonDecode(r.body) as Map<String, Object?>);
    } on Object catch (e) {
      debugPrint('Leaderboard failed: $e');
      return null;
    }
  }

  Future<List<HallItem>?> hall() async {
    try {
      final http.Response r = await _http
          .get(_u('api/tracelight/hall'))
          .timeout(const Duration(seconds: 12));
      if (r.statusCode != 200) return null;
      final Map<String, Object?> j = jsonDecode(r.body) as Map<String, Object?>;
      return <HallItem>[
        for (final Object? i in j['items']! as List<Object?>)
          HallItem.fromJson(i! as Map<String, Object?>, base),
      ];
    } on Object catch (e) {
      debugPrint('Hall failed: $e');
      return null;
    }
  }
}

class LeaderboardScope extends InheritedWidget {
  const LeaderboardScope({super.key, required this.client, required super.child});

  final LeaderboardClient client;

  static LeaderboardClient? maybeOf(BuildContext context) =>
      context.dependOnInheritedWidgetOfExactType<LeaderboardScope>()?.client;

  @override
  bool updateShouldNotify(LeaderboardScope old) => client != old.client;
}
