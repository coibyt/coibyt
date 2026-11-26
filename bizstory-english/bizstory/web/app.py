"""FastAPI: phục vụ trình phát + dữ liệu trực tiếp từ output/ và SQLite (chạy trên máy dựng audio).

Chạy: python -m bizstory serve  →  http://localhost:8000
Bản đưa lên Hostinger là site tĩnh (python -m bizstory export-site); khi không có API, web tự lưu tiến độ
SRS trong trình duyệt.
"""
from __future__ import annotations

import datetime as dt
import json

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from .. import config, db
from ..export import build_index, decorate

app = FastAPI(title="BizStory English")


@app.get("/data/days.json")
def days():
    return JSONResponse(build_index())


@app.get("/data/day_{n}.json")
def day(n: int):
    for name in (f"day_{n:02d}.json", f"day_{n:02d}_short.json"):
        p = config.OUTPUT_DIR / f"day_{n:02d}" / name
        if p.exists():
            return JSONResponse(decorate(json.loads(p.read_text(encoding="utf-8"))))
    raise HTTPException(404)


class Review(BaseModel):
    key: str
    result: str  # good | again


@app.post("/api/review")
def review(r: Review):
    if r.result not in ("good", "again"):
        raise HTTPException(400, "result phải là good hoặc again")
    con = db.connect()
    row = con.execute("SELECT id FROM phrases WHERE key=?", (r.key,)).fetchone()
    if row is None:
        raise HTTPException(404, "không có cụm này")
    db.record_review(con, row["id"], dt.date.today().isoformat(), None, "self", r.result)
    con.commit()
    p = con.execute("SELECT srs_step, next_review_date FROM phrases WHERE id=?", (row["id"],)).fetchone()
    return {"ok": True, "srs_step": p["srs_step"], "next_review_date": p["next_review_date"]}


@app.get("/api/stats")
def stats():
    con = db.connect()
    today = dt.date.today().isoformat()
    return {
        "phrases": con.execute("SELECT COUNT(*) c FROM phrases").fetchone()["c"],
        "due": con.execute("SELECT COUNT(*) c FROM phrases WHERE next_review_date<=?", (today,)).fetchone()["c"],
        "days": con.execute("SELECT COUNT(*) c FROM days WHERE mp3_path IS NOT NULL").fetchone()["c"],
    }


app.mount("/media", StaticFiles(directory=config.OUTPUT_DIR, check_dir=False), name="media")
app.mount("/img", StaticFiles(directory=config.ASSETS_DIR / "img", check_dir=False), name="img")


@app.get("/{name}")
def icons(name: str):
    for base in (config.ASSETS_DIR / "icons", config.STATIC_DIR):
        p = base / name
        if p.is_file():
            return FileResponse(p)
    raise HTTPException(404)


@app.get("/")
def index():
    return FileResponse(config.STATIC_DIR / "index.html")
