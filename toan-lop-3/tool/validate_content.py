#!/usr/bin/env python3
"""Kiểm tra các file nội dung (assets/content/**/*.json) theo JSON Schema v1.

Chỉ kiểm tra CẤU TRÚC. Phần kiểm tra TOÁN (phép tính đúng, đặt tính khớp kết quả,
đáp án nằm trong lựa chọn...) nằm trong app: lib/logic/content_validator.dart,
chạy bằng `flutter test`.

Cách chạy (cần Python 3 + gói jsonschema):
    pip install jsonschema
    python tool/validate_content.py
"""
import json
import pathlib
import sys

try:
    from jsonschema import Draft202012Validator
except ImportError:  # pragma: no cover
    sys.exit("Thiếu gói jsonschema. Chạy: pip install jsonschema")

ROOT = pathlib.Path(__file__).resolve().parent.parent
SCHEMA = ROOT / "schema" / "toan3-content.v1.schema.json"


def main() -> int:
    schema = json.loads(SCHEMA.read_text(encoding="utf-8"))
    Draft202012Validator.check_schema(schema)
    validator = Draft202012Validator(schema)
    files = sorted((ROOT / "assets" / "content").rglob("*.json"))
    failed = 0
    for f in files:
        data = json.loads(f.read_text(encoding="utf-8"))
        errors = sorted(validator.iter_errors(data), key=lambda e: list(e.path))
        rel = f.relative_to(ROOT)
        if errors:
            failed += 1
            print(f"LỖI  {rel}")
            for e in errors[:20]:
                best = e
                # oneOf errors are noisy: show the most specific sub-error.
                if e.context:
                    best = max(e.context, key=lambda c: len(list(c.absolute_path)))
                print(f"     tại {'/'.join(map(str, best.absolute_path)) or '(gốc)'}: {best.message}")
        else:
            print(f"OK   {rel}")
    print(f"\n{len(files) - failed}/{len(files)} file hợp lệ.")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
