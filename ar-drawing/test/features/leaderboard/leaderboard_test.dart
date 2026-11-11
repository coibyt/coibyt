import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:http/http.dart' as http;
import 'package:http/testing.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:tracelight/features/exams/exam_record_store.dart';
import 'package:tracelight/features/leaderboard/leaderboard_client.dart';
import 'package:tracelight/features/leaderboard/leaderboard_screen.dart';
import 'package:tracelight/features/leaderboard/player_profile.dart';

import '../../test_app.dart';

final Map<String, Object?> weekBoard = <String, Object?>{
  'period': 'week',
  'resetAt': 1790000000000,
  'players': 2,
  'rows': <Map<String, Object?>>[
    <String, Object?>{
      'rank': 1,
      'name': 'Mây',
      'avatar': 'owl',
      'score': 17.4,
      'exams': 2,
      'total': 30,
      'me': false,
    },
    <String, Object?>{
      'rank': 2,
      'name': 'Bin',
      'avatar': 'fox',
      'score': 8.1,
      'exams': 1,
      'total': 8.1,
      'me': true,
    },
  ],
  'me': <String, Object?>{
    'rank': 2,
    'name': 'Bin',
    'avatar': 'fox',
    'score': 8.1,
    'exams': 1,
    'total': 8.1,
    'me': true,
  },
};

void main() {
  setUp(() => SharedPreferences.setMockInitialValues(<String, Object>{}));
  final Uri base = Uri.parse('https://example.test/');

  group('artist ranks', () {
    test('thresholds and the gap to the next title', () {
      expect(ArtistRank.of(0), ArtistRank.apprentice);
      expect(ArtistRank.of(24.9), ArtistRank.apprentice);
      expect(ArtistRank.of(25), ArtistRank.promising);
      expect(ArtistRank.of(60), ArtistRank.master);
      expect(ArtistRank.toNext(20), closeTo(5, 1e-9));
      expect(ArtistRank.toNext(70), isNull);
    });
  });

  group('profile', () {
    test('nicknames are cleaned and kept private by default', () async {
      final PlayerProfile p = await PlayerProfile.load();
      expect(p.id, matches(RegExp(r'^[a-z0-9]{16}$')));
      expect(p.token, matches(RegExp(r'^[a-z0-9]{32}$')));
      expect(p.joined, isFalse);
      expect(p.shareArt, isFalse, reason: 'sharing is opt-in');
      await p.update(name: '  <b>Bé   Na</b>!!  ', avatar: 'panda');
      expect(p.name, 'bBé Nab!!');
      final PlayerProfile again = await PlayerProfile.load();
      expect(again.id, p.id);
      expect(again.name, p.name);
      expect(again.avatar, 'panda');
    });
  });

  group('client', () {
    test('sends scores and reads the boards', () async {
      final List<http.Request> sent = <http.Request>[];
      final LeaderboardClient c = LeaderboardClient(
        base: base,
        client: MockClient((http.Request r) async {
          sent.add(r);
          if (r.url.path == '/api/tracelight/leaderboard') {
            return http.Response(
              jsonEncode(weekBoard),
              200,
              headers: <String, String>{'content-type': 'application/json; charset=utf-8'},
            );
          }
          if (r.url.path == '/api/tracelight/hall') {
            return http.Response(
              jsonEncode(<String, Object?>{
                'items': <Object?>[
                  <String, Object?>{
                    'name': 'Mây',
                    'avatar': 'owl',
                    'score': 17.4,
                    'exam': 'final_portrait',
                    'url': '/api/tracelight/art/abc.png?v=1',
                  },
                ],
              }),
              200,
            );
          }
          return http.Response('{"ok":true}', 200);
        }),
      );
      final PlayerProfile me = PlayerProfile(id: 'abcdefghij123456', token: 'x' * 32, name: 'Bin');
      expect(await c.submitScore(me, 'quick_cube', 8.1), isNotNull);
      final Map<String, Object?> body = jsonDecode(sent.last.body) as Map<String, Object?>;
      expect(body['exam'], 'quick_cube');
      expect(body['score'], 8.1);
      expect(body.containsKey('png'), isFalse);
      expect(await c.uploadArt(me, 'quick_cube', 8.1, Uint8List.fromList(<int>[1, 2, 3])), isTrue);
      expect(
        (jsonDecode(sent.last.body) as Map<String, Object?>)['png'],
        startsWith('data:image/png;base64,'),
      );

      final Board? b = await c.board('week', me);
      expect(sent.last.url.queryParameters, <String, String>{'period': 'week', 'id': me.id});
      expect(b!.rows, hasLength(2));
      expect(b.me!.rank, 2);
      final List<HallItem>? hall = await c.hall();
      expect(hall!.single.url, 'https://example.test/api/tracelight/art/abc.png?v=1');
    });

    test('offline or refused calls fail softly', () async {
      final LeaderboardClient c = LeaderboardClient(
        base: base,
        client: MockClient((_) async => throw const SocketLikeException()),
      );
      expect(await c.board('month', null), isNull);
      expect(await c.hall(), isNull);
      final LeaderboardClient refused = LeaderboardClient(
        base: base,
        client: MockClient((_) async => http.Response('{"error":"slow down"}', 429)),
      );
      expect(
        await refused.submitScore(
          PlayerProfile(id: 'abcdefghij123456', token: 'x' * 32),
          'quick_cube',
          5,
        ),
        isNull,
      );
    });
  });

  testWidgets('board screen: rank card, top list and joining with a nickname', (
    WidgetTester tester,
  ) async {
    tester.view.physicalSize = const Size(1080, 2400);
    tester.view.devicePixelRatio = 2.5;
    addTearDown(tester.view.reset);
    final PlayerProfile profile = PlayerProfile(id: 'abcdefghij123456', token: 'x' * 32);
    final LeaderboardClient client = LeaderboardClient(
      base: base,
      client: MockClient(
        (http.Request r) async => http.Response(
          jsonEncode(weekBoard),
          200,
          headers: <String, String>{'content-type': 'application/json; charset=utf-8'},
        ),
      ),
    );
    await tester.pumpWidget(
      testApp(
        ExamRecordScope(
          store: ExamRecordStore(),
          child: ProfileScope(
            profile: profile,
            child: LeaderboardScope(client: client, child: const LeaderboardScreen()),
          ),
        ),
      ),
    );
    for (int i = 0; i < 10; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(find.byKey(const Key('rankCard')), findsOneWidget);
    expect(find.text('Apprentice'), findsOneWidget);
    expect(find.byKey(const Key('boardRow-1')), findsOneWidget);
    expect(find.text('Mây'), findsOneWidget);
    await tester.tap(find.byKey(const Key('joinBoard')));
    for (int i = 0; i < 6; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    await tester.enterText(find.byKey(const Key('nicknameField')), 'Bin');
    await tester.tap(find.byKey(const Key('avatar-panda')));
    await tester.pump();
    final SwitchListTile share = tester.widget(find.byKey(const Key('shareArt')));
    expect(share.value, isFalse);
    await tester.tap(find.byKey(const Key('saveProfile')));
    for (int i = 0; i < 6; i++) {
      await tester.pump(const Duration(milliseconds: 100));
    }
    expect(profile.name, 'Bin');
    expect(profile.avatar, 'panda');
    expect(profile.shareArt, isFalse);
  });
}

class SocketLikeException implements Exception {
  const SocketLikeException();
}
