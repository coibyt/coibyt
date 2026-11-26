"""Gọi LLM: Claude (mặc định) hoặc OpenAI, chọn bằng LLM_PROVIDER trong .env.

Khoá chỉ đọc từ biến môi trường (ANTHROPIC_API_KEY / OPENAI_API_KEY), không bao giờ in ra.
"""
from __future__ import annotations

import json
import re

from . import config


class LLMError(RuntimeError):
    pass


def provider() -> str:
    return config.env("LLM_PROVIDER", "anthropic").lower()


def model_name() -> str:
    default = "claude-opus-5-5" if provider() == "anthropic" else "gpt-5"
    return config.env("LLM_MODEL", default)


def check_keys() -> str | None:
    """None nếu đủ khoá; ngược lại là lời nhắc tiếng Việt cho chủ dự án."""
    need = "ANTHROPIC_API_KEY" if provider() == "anthropic" else "OPENAI_API_KEY"
    if not config.env(need):
        return (f"Thiếu {need}. Anh tự thêm khoá vào .env trên máy, hoặc vào phần cài đặt môi trường cloud "
                f"(Environment → Variables/Secrets). Đừng gửi khoá trong chat.")
    return None


def complete(system: str, user: str, max_tokens: int = 64000, effort: str = "high") -> str:
    msg = check_keys()
    if msg:
        raise LLMError(msg)
    if provider() == "anthropic":
        return _anthropic(system, user, max_tokens, effort)
    if provider() == "openai":
        return _openai(system, user, max_tokens)
    raise LLMError(f"LLM_PROVIDER không hỗ trợ: {provider()}")


def _anthropic(system: str, user: str, max_tokens: int, effort: str) -> str:
    import anthropic

    client = anthropic.Anthropic()
    kwargs = dict(
        model=model_name(), max_tokens=max_tokens, system=system,
        messages=[{"role": "user", "content": user}],
        output_config={"effort": effort},
    )
    try:
        if model_name() in ("claude-opus-5-5", "claude-fable-5-2", "claude-sonnet-5-5"):
            # Nếu bị từ chối do bộ lọc an toàn, server tự chạy lại trên mô hình dự phòng.
            with client.beta.messages.stream(betas=["server-side-fallback-2026-07-01"], fallbacks="default",
                                             **kwargs) as stream:
                resp = stream.get_final_message()
        else:
            with client.messages.stream(**kwargs) as stream:
                resp = stream.get_final_message()
    except anthropic.RateLimitError as e:
        raise LLMError(f"Claude bị giới hạn tốc độ, thử lại sau: {e}") from e
    except anthropic.APIStatusError as e:
        raise LLMError(f"Claude lỗi {e.status_code}: {e.message}") from e
    except anthropic.APIConnectionError as e:
        raise LLMError(f"Không kết nối được Claude: {e}") from e
    if resp.stop_reason == "refusal":
        raise LLMError("Claude từ chối yêu cầu (refusal).")
    if resp.stop_reason == "max_tokens":
        raise LLMError("Hết max_tokens, kịch bản bị cắt giữa chừng.")
    return "".join(b.text for b in resp.content if getattr(b, "type", "") == "text")


def _openai(system: str, user: str, max_tokens: int) -> str:
    from openai import OpenAI

    client = OpenAI()
    r = client.chat.completions.create(
        model=model_name(), max_completion_tokens=max_tokens,
        messages=[{"role": "system", "content": system}, {"role": "user", "content": user}],
        response_format={"type": "json_object"},
    )
    return r.choices[0].message.content or ""


def extract_json(text: str) -> dict:
    m = re.search(r"```(?:json)?\s*(\{.*\})\s*```", text, re.S)
    raw = m.group(1) if m else text[text.find("{"): text.rfind("}") + 1]
    try:
        return json.loads(raw)
    except ValueError as e:
        raise LLMError(f"LLM trả về JSON không hợp lệ: {e}") from e
