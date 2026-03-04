#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

INPUT_DIR="input-files"
REPORT_DIR="../web/src/content-raw/report"

for md in "$INPUT_DIR"/*.md; do
  [ -f "$md" ] || continue

  name="$(basename "$md" .md)"
  target_dir="$REPORT_DIR/$name"

  if [ ! -d "$target_dir" ]; then
    echo "No matching folder for: $name — skipping"
    continue
  fi

  echo "Syncing: $name.md -> $target_dir/index.md"
  rsync -a "$md" "$target_dir/index.md"
done

echo "Done."
