"""Text-to-speech providers with a content-addressed cache.

Every unique (provider, model, voice, language, text) is synthesised once and stored as
cache/tts/<sha1>.mp3. Slow versions (0.85x) are made locally with ffmpeg, never paid twice.

Providers:
  max11  11max (ElevenLabs voices). Auth: the MAX11_API_KEY env var if set (sent as xi-api-key);
         inside Claude cloud sessions the network proxy adds the credentials itself.
  edge   Microsoft Edge neural voices via `edge-tts` (free; fallback and previews).
  dummy  Silent placeholders with a realistic length, to test the pipeline without network.
"""
from __future__ import annotations

import asyncio
import hashlib
import json
import os
import subprocess
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests

ENGINE_DIR = Path(__file__).resolve().parents[1]
CACHE_DIR = ENGINE_DIR / "cache" / "tts"


class TTSError(RuntimeError):
    pass


def clip_key(provider: str, model: str, voice_id: str, lang: str, text: str) -> str:
    raw = json.dumps([provider, model, voice_id, lang, text.strip()], ensure_ascii=False)
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()


class Provider:
    name = "base"

    def __init__(self, cfg: dict):
        self.cfg = cfg

    def model(self, lang: str) -> str:
        return "-"

    def voice_id(self, lang: str, voice: str) -> str:
        return self.cfg["voices"][lang][voice]["id"]

    def synth(self, lang: str, voice: str, text: str, out: Path) -> int:
        """Write an MP3 to `out`; return the credits used."""
        raise NotImplementedError


class Max11(Provider):
    name = "max11"

    def __init__(self, cfg: dict):
        super().__init__(cfg)
        m = cfg["tts"]["max11"]
        self.base = m["base_url"].rstrip("/")
        self.models = m["models"]
        self.poll = m["poll_seconds"]
        self.timeout = m["timeout_seconds"]
        self.s = requests.Session()
        key = os.environ.get("MAX11_API_KEY")
        if key:
            self.s.headers["xi-api-key"] = key

    def model(self, lang: str) -> str:
        return self.models[lang]

    def synth(self, lang: str, voice: str, text: str, out: Path) -> int:
        vid = self.voice_id(lang, voice)
        body = {"text": text, "model_id": self.models[lang], "language_code": lang}
        for attempt in range(7):
            try:
                r = self.s.post(f"{self.base}/v1/text-to-speech/{vid}", params={"output_format": "mp3_44100_128"},
                                json=body, timeout=60)
                if r.status_code == 429 or r.status_code >= 500:
                    raise TTSError(f"HTTP {r.status_code}")
                if r.status_code not in (200, 202):
                    raise TTSError(f"11max từ chối ({r.status_code}): {r.text[:200]}")
                if r.headers.get("content-type", "").startswith("audio/"):
                    out.write_bytes(r.content)
                    return len(text)
                job = r.json()["id"]
                t0 = time.time()
                while True:
                    time.sleep(self.poll)
                    h = self.s.get(f"{self.base}/v1/history/{job}", timeout=30).json()
                    if h.get("status") == "completed":
                        a = self.s.get(h["result"]["audio_url"], timeout=60)
                        a.raise_for_status()
                        out.write_bytes(a.content)
                        return int(h.get("credits_deducted") or len(text))
                    if h.get("status") in ("failed", "error", "cancelled"):
                        raise TTSError(f"11max lỗi: {h.get('error') or h.get('detail_error')}")
                    if time.time() - t0 > self.timeout:
                        raise TTSError("11max quá thời gian chờ")
            except (requests.RequestException, TTSError) as e:
                if attempt == 6 or "từ chối" in str(e):
                    raise TTSError(f"{voice}: {e}") from e
                time.sleep((8 if "429" in str(e) else 2) * (attempt + 1))
        raise TTSError("unreachable")


class Edge(Provider):
    name = "edge"

    def voice_id(self, lang: str, voice: str) -> str:
        return self.cfg["voices"][lang][voice]["edge"]

    def synth(self, lang: str, voice: str, text: str, out: Path) -> int:
        import edge_tts  # optional dependency

        async def run():
            await edge_tts.Communicate(text, self.voice_id(lang, voice)).save(str(out))

        asyncio.run(run())
        return 0


class Dummy(Provider):
    """Quiet noise of the expected length: lets us test timing without any API."""
    name = "dummy"

    def synth(self, lang: str, voice: str, text: str, out: Path) -> int:
        sec = max(0.6, len(text) / (14.5 if lang == "en" else 13.0))
        subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "lavfi", "-i",
                        f"anoisesrc=d={sec:.2f}:c=pink:a=0.05", "-ac", "1", "-ar", "24000", "-b:a", "48k", "-f", "mp3", str(out)],
                       check=True)
        return 0


PROVIDERS = {"max11": Max11, "edge": Edge, "dummy": Dummy}


def make_provider(name: str, cfg: dict) -> Provider:
    if name not in PROVIDERS:
        raise TTSError(f"Không có TTS '{name}'")
    return PROVIDERS[name](cfg)


class ClipStore:
    """Resolves (lang, voice, text) to a cached MP3, synthesising missing ones in parallel."""

    def __init__(self, provider: Provider, fallback: Provider | None = None, concurrency: int = 6):
        self.p = provider
        self.fallback = fallback
        self.concurrency = concurrency
        self.credits = 0
        self._lock = threading.Lock()
        CACHE_DIR.mkdir(parents=True, exist_ok=True)

    def key(self, lang: str, voice: str, text: str) -> str:
        return clip_key(self.p.name, self.p.model(lang), self.p.voice_id(lang, voice), lang, text)

    def path(self, lang: str, voice: str, text: str) -> Path:
        return CACHE_DIR / f"{self.key(lang, voice, text)}.mp3"

    def fallback_path(self, lang: str, voice: str, text: str) -> Path | None:
        if not self.fallback:
            return None
        f = self.fallback
        return CACHE_DIR / f"{clip_key(f.name, f.model(lang), f.voice_id(lang, voice), lang, text)}.mp3"

    def resolve(self, lang: str, voice: str, text: str) -> Path:
        """The cached file for this clip: the main provider's, else the fallback's."""
        p = self.path(lang, voice, text)
        if p.exists():
            return p
        fp = self.fallback_path(lang, voice, text)
        if fp and fp.exists():
            return fp
        raise TTSError(f"Chưa có clip: {voice}: {text[:60]}")

    def missing(self, items: set[tuple[str, str, str]]) -> list[tuple[str, str, str]]:
        return sorted(i for i in items if not self.path(*i).exists())

    def ensure(self, items: set[tuple[str, str, str]], log=print) -> None:
        todo = self.missing(items)
        if not todo:
            return
        log(f"  TTS {self.p.name}: {len(todo)} clip mới ({sum(len(t[2]) for t in todo):,} ký tự)")
        done = 0

        def work(item):
            lang, voice, text = item
            dst = self.path(lang, voice, text)
            prov = self.p
            tmp = dst.with_suffix(".part")
            try:
                used = prov.synth(lang, voice, text, tmp)
            except Exception as e:  # noqa: BLE001
                if not self.fallback:
                    raise
                log(f"  ! {e} → dùng {self.fallback.name}")
                prov, dst = self.fallback, self.fallback_path(lang, voice, text)
                if dst.exists():
                    return 0
                tmp = dst.with_suffix(".part")
                used = prov.synth(lang, voice, text, tmp)
            tmp.replace(dst)
            dst.with_suffix(".json").write_text(
                json.dumps({"provider": prov.name, "lang": lang, "voice": voice, "text": text}, ensure_ascii=False),
                encoding="utf-8")
            return used

        with ThreadPoolExecutor(self.concurrency) as ex:
            futs = [ex.submit(work, it) for it in todo]
            for f in as_completed(futs):
                used = f.result()
                with self._lock:
                    self.credits += used
                    done += 1
                    if done % 50 == 0 or done == len(todo):
                        log(f"    {done}/{len(todo)}")
