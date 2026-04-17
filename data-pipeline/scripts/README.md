# scripts/

Operator scripts for the data-pipeline project.

## `friday-refresh.R`

Weekly refresh of the reverse pipeline. Run after refreshing the workbooks in `data-raw/reverse_data/`:

```bash
cd data-pipeline
Rscript scripts/friday-refresh.R
```

What it does:

1. Archives the current `output/` files (`chart_data.csv`, `chartMeta.json`, `reverse_ingested.csv`, `reverse_rejected.csv`) into `output/archive/YYYY-MM-DD/`.
2. Invalidates the reverse-pipeline `targets` cache. This is necessary because `_targets_reverse.R` tracks the workbook *directory*, not individual file contents — without invalidation, refreshed xlsx files would be ignored.
3. Runs `targets::tar_make(script = "_targets_reverse.R")` to regenerate the final-shape outputs.
4. Prints a summary showing the new `chart_data.csv` row count and any rejected rows.

### What to check each Friday

- **Summary rejections line** — should say `rejections : none ✓`. If any rejections appear, investigate `output/reverse_rejected.csv` before committing.
- **`output/chart_data.csv` mtime** — should be today's date.
- **`output/archive/YYYY-MM-DD/`** — should contain four files from the previous run.

Re-running the script on the same day is safe: existing archive files are skipped rather than overwritten.

Archives are never committed (`output/` is gitignored), so long-term history lives only on disk.
