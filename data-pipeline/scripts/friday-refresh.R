#!/usr/bin/env Rscript
#' Friday refresh — archive current outputs, then re-run the reverse pipeline
#'
#' Run from the data-pipeline/ project root after refreshing the workbooks
#' in data-raw/reverse_data/:
#'
#'     Rscript scripts/friday-refresh.R
#'
#' Steps:
#'   1. Copy current output/* files into output/archive/YYYY-MM-DD/
#'   2. Invalidate the reverse-pipeline targets cache (workbooks are tracked
#'      by directory path, not file content, so tar_make alone won't notice
#'      refreshed xlsx files)
#'   3. Run targets::tar_make() against _targets_reverse.R
#'   4. Print a concise summary of ingested vs rejected rows

suppressPackageStartupMessages({
  library(targets)
})

run_friday_refresh <- function() {

  # --- 0. Sanity check: must run from project root ---------------------------

  if (!file.exists("_targets_reverse.R")) {
    stop(
      "_targets_reverse.R not found in the working directory. ",
      "Run this script from the data-pipeline/ project root.",
      call. = FALSE
    )
  }

  # Point subsequent tar_* calls at the reverse pipeline script.
  # tar_config_set() writes to _targets.yaml in cwd, which would otherwise
  # persist and mis-direct later bare `tar_make()` calls at the reverse
  # script. Save any existing yaml and restore on exit. Wrapping the body in
  # a function is deliberate — on.exit() fires on function return, not on
  # Rscript top-level exit.
  yaml_path    <- "_targets.yaml"
  yaml_existed <- file.exists(yaml_path)
  yaml_backup  <- if (yaml_existed) readLines(yaml_path) else NULL
  on.exit(
    {
      if (yaml_existed) {
        writeLines(yaml_backup, yaml_path)
      } else if (file.exists(yaml_path)) {
        unlink(yaml_path)
      }
    },
    add = TRUE
  )

  targets::tar_config_set(script = "_targets_reverse.R")

  output_dir  <- "output"
  archive_dir <- file.path(output_dir, "archive", format(Sys.Date()))

  cat("==> Friday refresh:", format(Sys.Date()), "\n\n")

  # --- 1. Archive current outputs --------------------------------------------

  archive_files <- c(
    "chart_data.csv",
    "chartMeta.json",
    "reverse_ingested.csv",
    "reverse_rejected.csv"
  )

  dir.create(archive_dir, recursive = TRUE, showWarnings = FALSE)

  cat("--- Archiving previous outputs to", archive_dir, "---\n")
  for (f in archive_files) {
    src <- file.path(output_dir, f)
    dst <- file.path(archive_dir, f)
    if (!file.exists(src)) {
      cat(" -", f, ": not present in output/ (skipped)\n")
      next
    }
    if (file.exists(dst)) {
      cat(" -", f, ": already archived today (skipped)\n")
      next
    }
    ok <- file.copy(src, dst, overwrite = FALSE, copy.date = TRUE)
    cat(" -", f, if (ok) ": archived" else ": FAILED to archive", "\n")
  }
  cat("\n")

  # --- 2. Invalidate reverse-pipeline cache ----------------------------------

  cat("--- Invalidating reverse-pipeline targets cache ---\n")
  targets::tar_invalidate(dplyr::everything())
  cat("\n")

  # --- 3. Run the reverse pipeline -------------------------------------------

  cat("--- Running reverse pipeline (tar_make) ---\n")
  targets::tar_make()
  cat("\n")

  # --- 4. Summary ------------------------------------------------------------

  cat("--- Summary ---\n")

  ingested_path <- file.path(output_dir, "reverse_ingested.csv")
  rejected_path <- file.path(output_dir, "reverse_rejected.csv")
  chart_path    <- file.path(output_dir, "chart_data.csv")

  if (file.exists(chart_path)) {
    n_chart <- nrow(readr::read_csv(chart_path, show_col_types = FALSE))
    cat("chart_data.csv  : ", n_chart, " rows\n", sep = "")
  }

  if (file.exists(ingested_path)) {
    ing <- readr::read_csv(ingested_path, show_col_types = FALSE)
    cat("ingested datasets: ", nrow(ing), "\n", sep = "")
  }

  if (file.exists(rejected_path)) {
    rej <- readr::read_csv(rejected_path, show_col_types = FALSE)
    if (nrow(rej) == 0) {
      cat("rejections       : none \u2713\n")
    } else {
      cat("rejections       : ", nrow(rej), " row(s) \u2014 see ",
          rejected_path, "\n", sep = "")
      print(utils::head(rej, 20))
    }
  }

  cat("\nDone. Commit the refreshed output/ files if the summary looks right.\n")

  invisible(NULL)
}

run_friday_refresh()
