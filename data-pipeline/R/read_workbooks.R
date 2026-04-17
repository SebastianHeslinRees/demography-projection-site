#' List workbook files in the input folder
#'
#' Scans the specified directory for .xlsx files and returns their paths.
#'
#' @param input_dir Path to the folder containing edited workbooks
#' @return Character vector of absolute paths to .xlsx files
list_workbooks <- function(input_dir = "data-raw/reverse_data") {
  files <- list.files(input_dir, pattern = "\\.xlsx$", full.names = TRUE)
  if (length(files) == 0) {
    warning("No .xlsx files found in ", input_dir)
  }
  files
}


#' Read metadata sheet from a single workbook
#'
#' Opens a workbook and reads the "Metadata" sheet, filtering out
#' empty buffer rows. Returns the sheet_name to dataset mapping
#' along with full metadata.
#'
#' @param wb An openxlsx2 workbook object
#' @param wb_path Path to the workbook (for error reporting)
#' @return A tibble with columns: dataset, title, subtitle, source,
#'   timeperiod_type, sheet_name
read_workbook_metadata <- function(wb, wb_path) {
  meta <- openxlsx2::wb_to_df(
    wb, sheet = "Metadata",
    convert = FALSE,
    skip_empty_rows = TRUE
  )

  # Filter out buffer rows where dataset is NA
  meta <- meta[!is.na(meta$dataset) & nchar(trimws(meta$dataset)) > 0, ]

  chapter <- tools::file_path_sans_ext(basename(wb_path))
  meta$chapter <- chapter

  tibble::as_tibble(meta)
}


#' Read all data sheets from a single workbook
#'
#' Uses the Metadata sheet's sheet_name column to identify which sheets
#' contain data, reads each one, and tags every row with the corresponding
#' dataset identifier and chapter name.
#'
#' @param wb An openxlsx2 workbook object
#' @param wb_path Path to the workbook (for error reporting)
#' @param metadata Tibble from read_workbook_metadata()
#' @return A tibble with columns: dataset, chapter, date, geography, value,
#'   category_primary, category_secondary
read_workbook_data <- function(wb, wb_path, metadata) {
  chapter <- tools::file_path_sans_ext(basename(wb_path))

  # Build sheet_name -> dataset lookup
  sheet_lookup <- stats::setNames(metadata$dataset, metadata$sheet_name)

  all_sheets <- purrr::map_dfr(names(sheet_lookup), function(sn) {
    tryCatch({
      df <- openxlsx2::wb_to_df(
        wb, sheet = sn,
        convert = FALSE,
        skip_empty_rows = TRUE
      )

      # Filter out buffer rows (all core columns NA)
      core_cols <- intersect(
        c("date", "geography", "value", "category_primary", "category_secondary"),
        names(df)
      )
      if (length(core_cols) == 0) {
        warning("Sheet '", sn, "' in ", basename(wb_path),
                " has no recognised data columns")
        return(tibble::tibble())
      }

      # Keep rows where at least one core column is non-NA
      keep <- rowSums(!is.na(df[, core_cols, drop = FALSE])) > 0
      df <- df[keep, ]

      if (nrow(df) == 0) return(tibble::tibble())

      # Tag with dataset and chapter
      df$dataset <- sheet_lookup[[sn]]
      df$chapter <- chapter

      # Select only the columns we need (drop date_type, date_valid)
      wanted <- c("dataset", "chapter", "date", "geography", "value",
                   "category_primary", "category_secondary")
      present <- intersect(wanted, names(df))
      tibble::as_tibble(df[, present, drop = FALSE])
    },
    error = function(e) {
      warning("Failed to read sheet '", sn, "' from ", basename(wb_path),
              ": ", conditionMessage(e))
      tibble::tibble()
    })
  })

  all_sheets
}


#' Read and combine all workbooks from the input folder
#'
#' Iterates over all .xlsx files, reads metadata and data from each,
#' and row-binds the results.
#'
#' @param input_dir Path to the folder containing edited workbooks
#' @return A list with two elements: $data (combined data tibble) and
#'   $metadata (combined metadata tibble)
read_all_workbooks <- function(input_dir = "data-raw/reverse_data") {
  paths <- list_workbooks(input_dir)

  results <- purrr::map(paths, function(p) {
    tryCatch({
      wb <- openxlsx2::wb_load(p)

      # Check Metadata sheet exists
      if (!"Metadata" %in% wb$sheet_names) {
        warning("Skipping ", basename(p), ": no 'Metadata' sheet found")
        return(list(
          data = tibble::tibble(),
          metadata = tibble::tibble()
        ))
      }

      meta <- read_workbook_metadata(wb, p)
      data <- read_workbook_data(wb, p, meta)

      list(data = data, metadata = meta)
    },
    error = function(e) {
      warning("Failed to read workbook ", basename(p), ": ",
              conditionMessage(e))
      list(data = tibble::tibble(), metadata = tibble::tibble())
    })
  })

  list(
    data = dplyr::bind_rows(purrr::map(results, "data")),
    metadata = dplyr::bind_rows(purrr::map(results, "metadata"))
  )
}
