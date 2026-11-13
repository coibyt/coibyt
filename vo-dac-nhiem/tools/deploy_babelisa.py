#!/usr/bin/env python3
"""Chép bản web vào repo Babelisa: public/lab/soi-taiga/ (Babelisa tự deploy khi đẩy lên main).
   python3 tools/deploy_babelisa.py <đường-dẫn-repo-babelisa>"""
import pathlib, shutil, subprocess, sys
SRC = pathlib.Path(__file__).resolve().parent.parent
DST = pathlib.Path(sys.argv[1]).resolve() / "public/lab/soi-taiga"
subprocess.run([sys.executable, str(SRC / "tools/build_sw.py")], check=True)
if DST.exists():
    shutil.rmtree(DST)
skip = shutil.ignore_patterns(".raw", "tools", "README.md", ".gitignore", "__pycache__")
shutil.copytree(SRC, DST, ignore=skip)
size = sum(f.stat().st_size for f in DST.rglob("*") if f.is_file())
print(DST, f"{size / 1e6:.1f} MB")
