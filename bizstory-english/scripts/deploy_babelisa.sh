#!/usr/bin/env bash
# Đưa trình phát BizStory lên babelisa.com/lab/<SLUG>/ (Hostinger tự deploy khi push nhánh main của repo babelisa).
# Dùng:  bash scripts/deploy_babelisa.sh <SLUG> <đường-dẫn-repo-babelisa>
# Sau đó trong repo babelisa: git add public/lab/<SLUG> && git commit && git push
set -euo pipefail
SLUG="$1"; BAB="$2"
cd "$(dirname "$0")/.."
DEST="$BAB/public/lab/$SLUG"
python3 -m bizstory export-site --dest "$DEST"
# Bản thử riêng: không cho Google lập chỉ mục (server Babelisa cũng gửi X-Robots-Tag cho /lab/).
grep -q 'name="robots"' "$DEST/index.html" || \
  sed -i 's#<meta charset="utf-8">#<meta charset="utf-8">\n<meta name="robots" content="noindex, nofollow">#' "$DEST/index.html"
du -sh "$DEST"
