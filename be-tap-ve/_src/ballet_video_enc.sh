#!/bin/bash
# Encode kie.ai clips for the game: ping-pong (A→B→A), 540 px wide, no sound, fast start.
# usage: ballet_video_enc.sh SRC_DIR OUT_DIR   (SRC_DIR holds v_<a>_<b>.mp4, tv_talk.mp4, tv_clap.mp4)
S=$1; O=$2; mkdir -p "$O"
for f in "$S"/v_*.mp4; do
  k=$(basename "$f" .mp4); k=${k#v_}
  [ -f "$O/$k.mp4" ] && continue
  ffmpeg -y -loglevel error -i "$f" -filter_complex "[0:v]scale=720:-2,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -an \
    -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 27 -preset slow -movflags +faststart "$O/$k.mp4"
done
# teacher: skip the first 1.5 s (camera settles), crop the upper body, ping-pong
[ -f "$O/tv_talk.mp4" ] || ffmpeg -y -loglevel error -ss 1.5 -i "$S/tv_talk.mp4" -filter_complex "[0:v]crop=iw:ih*0.7:0:0,scale=320:-2,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 31 -preset slow -movflags +faststart "$O/tv_talk.mp4"
[ -f "$O/tv_clap.mp4" ] || ffmpeg -y -loglevel error -i "$S/tv_clap.mp4" -filter_complex "[0:v]crop=iw:ih*0.7:0:0,scale=320:-2,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" -map "[v]" -an -c:v libx264 -pix_fmt yuv420p -crf 31 -preset slow -movflags +faststart "$O/tv_clap.mp4"
