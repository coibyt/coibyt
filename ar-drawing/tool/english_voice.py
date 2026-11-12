"""Records the English audio of the English corner with a native voice.

    python3 tool/english_voice.py          # missing files only
    python3 tool/english_voice.py --all    # everything again

Reads assets/english/words.json (each word and its example sentence),
assets/english/extra.json (lesson words, pencil colour names, Pip's lines)
and writes assets/audio/english/<id>.mp3 plus manifest.json with each
length in milliseconds. The 11max API key is injected by the network proxy
(or ELEVEN_MAX_API_KEY)."""
import json, os, subprocess, sys, time

ROOT = os.path.join(os.path.dirname(__file__), '..')
OUT = os.path.join(ROOT, 'assets/audio/english')
API = 'https://api.11max.id.vn'
VOICE = 'cgSgspJ2msm6clMCkdW9'  # ElevenLabs "Jessica": playful, bright, native English
MODEL = 'eleven_v3'
KEY = os.environ.get('ELEVEN_MAX_API_KEY')


def curl(*args):
    headers = ['-H', f'xi-api-key: {KEY}'] if KEY else []
    return subprocess.run(['curl', '-sS', *headers, *args], capture_output=True, text=True, check=True).stdout


def first_json(raw):
    try:
        return json.JSONDecoder().raw_decode(raw.strip())[0]
    except ValueError:
        return {}


def texts():
    words = json.load(open(os.path.join(ROOT, 'assets/english/words.json')))
    extra = json.load(open(os.path.join(ROOT, 'assets/english/extra.json')))
    out = {}
    for u in words['units']:
        for w in u['words']:
            out[w['id']] = w['en'][0].upper() + w['en'][1:] + '!'
            out[w['id'] + '_s'] = w['s']
    for k, v in extra['lessonWords'].items():
        out['lw_' + k] = v['en'][0].upper() + v['en'][1:] + '!'
    for k, v in extra['pencils'].items():
        out['pen_' + k] = v[0].upper() + v[1:] + '.'
    out.update(extra['pip'])
    return out


def main():
    lines = texts()
    os.makedirs(OUT, exist_ok=True)
    todo = [i for i in lines if '--all' in sys.argv or not os.path.exists(f'{OUT}/{i}.mp3')]
    tasks = {}
    for lid in todo:
        body = json.dumps({'text': lines[lid], 'model_id': MODEL, 'language_code': 'en',
                           'voice_settings': {'stability': 0.5, 'speed': 0.9}})
        for attempt in range(6):
            reply = first_json(curl('-X', 'POST', f'{API}/v1/text-to-speech/{VOICE}',
                                    '-H', 'Content-Type: application/json', '-d', body))
            if 'id' in reply:
                tasks[lid] = reply['id']
                break
            time.sleep(5 * (attempt + 1))
        time.sleep(0.4)
    while tasks:
        time.sleep(4)
        for lid, tid in list(tasks.items()):
            d = first_json(curl(f'{API}/v1/history/{tid}'))
            if d.get('status') == 'completed':
                raw = f'{OUT}/{lid}.raw.mp3'
                curl('-o', raw, d['result']['audio_url'])
                subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af',
                                'silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
                                'silenceremove=start_periods=1:start_threshold=-45dB,areverse',
                                '-ac', '1', '-b:a', '64k', f'{OUT}/{lid}.mp3'], check=True)
                os.remove(raw)
                del tasks[lid]
                print('ok', lid, flush=True)
            elif d.get('status') == 'failed':
                del tasks[lid]
                print('FAILED', lid, d.get('error'), flush=True)
    manifest = {}
    for lid in lines:
        p = f'{OUT}/{lid}.mp3'
        if os.path.exists(p):
            dur = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', p],
                                 capture_output=True, text=True).stdout.strip()
            manifest[lid] = int(float(dur) * 1000)
    json.dump(manifest, open(f'{OUT}/manifest.json', 'w'), indent=1, sort_keys=True)
    print('manifest:', len(manifest))


if __name__ == '__main__':
    main()
