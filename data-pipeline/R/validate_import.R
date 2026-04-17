#' Validate workbook structure
#'
#' Checks that a workbook has a Metadata sheet with the required columns,
#' and that every sheet_name listed in Metadata exists as a worksheet.
#'
#' @param wb_path Path to an .xlsx file
#' @return Tibble with columns: workbook, issue_type, detail
validate_workbook_structure <- function(wb_path) {
  issues <- tibble::tibble(
    workbook = character(),
    issue_type = character(),
    detail = character()
  )

  wb_name <- basename(wb_path)

  wb <- tryCatch(
    openxlsx2::wb_load(wb_path),
    error = function(e) {
      issues <<- dplyr::bind_rows(issues, tibble::tibble(
        workbook = wb_name,
        issue_type = "corrupt_file",
        detail = conditionMessage(e)
      ))
      return(NULL)
    }
  )
  if (is.null(wb)) return(issues)

  # Check Metadata sheet exists
  if (!"Metadata" %in% wb$sheet_names) {
    return(dplyr::bind_rows(issues, tibble::tibble(
      workbook = wb_name,
      issue_type = "missing_metadata_sheet",
      detail = "No 'Metadata' sheet found"
    )))
  }

  # Read metadata
  meta <- openxlsx2::wb_to_df(
    wb, sheet = "Metadata", convert = FALSE, skip_empty_rows = TRUE
  )
  meta <- meta[!is.na(meta[[1]]) & nchar(trimws(meta[[1]])) > 0, ]

  # Check required columns
  required_cols <- c("dataset", "title", "subtitle", "source",
                     "timeperiod_type", "sheet_name")
  missing_cols <- setdiff(required_cols, names(meta))
  if (length(missing_cols) > 0) {
    issues <- dplyr::bind_rows(issues, tibble::tibble(
      workbook = wb_name,
      issue_type = "missing_metadata_columns",
      detail = paste("Missing:", paste(missing_cols, collapse = ", "))
    ))
  }

  # Check for duplicate datasets
  if ("dataset" %in% names(meta)) {
    dupes <- meta$dataset[duplicated(meta$dataset)]
    if (length(dupes) > 0) {
      issues <- dplyr::bind_rows(issues, tibble::tibble(
        workbook = wb_name,
        issue_type = "duplicate_dataset",
        detail = paste("Duplicated:", paste(unique(dupes), collapse = ", "))
      ))
    }
  }

  # Check every sheet_name in Metadata has a matching worksheet
  if ("sheet_name" %in% names(meta)) {
    available_sheets <- setdiff(wb$sheet_names, "Metadata")
    missing_sheets <- setdiff(meta$sheet_name, available_sheets)
    if (length(missing_sheets) > 0) {
      issues <- dplyr::bind_rows(issues, tibble::tibble(
        workbook = wb_name,
        issue_type = "missing_data_sheet",
        detail = paste("Listed in Metadata but absent:",
                       paste(missing_sheets, collapse = ", "))
      ))
    }
  }

  issues
}


#' Validate imported data and split into passing/failing
#'
#' Runs date validation (reusing existing validators) and value checks
#' on the combined imported data. Splits into passing and failing rows.
#'
#' @param combined_data Tibble of combined workbook data
#' @param combined_meta Tibble of combined metadata
#' @return A list with $passing (clean data), $failing (rejected rows
#'   with reason column), and $issues (summary tibble)
validate_import_data <- function(combined_data, combined_meta) {
  if (nrow(combined_data) == 0) {
    return(list(
      passing = combined_data,
      failing = dplyr::mutate(combined_data, reason = character()),
      issues = tibble::tibble(dataset = character(), issue_type = character(),
                              detail = character())
    ))
  }

  # Normalise common date format variants before validation
  # YYYY-MM-DD -> YYYY/MM/DD (providers often use hyphens)
  combined_data <- combined_data |>
    dplyr::mutate(
      date = dplyr::case_when(
        grepl("^\\d{4}-\\d{2}-\\d{2}$", date) ~
          gsub("-", "/", date),
        TRUE ~ date
      )
    )

  # Join timeperiod_type from metadata for date classification
  df <- combined_data |>
    dplyr::left_join(
      combined_meta |> dplyr::select(dataset, timeperiod_type),
      by = "dataset"
    )

  # Classify and validate dates (reusing existing functions)
  df <- df |>
    dplyr::mutate(
      date_type = classify_date_type(timeperiod_type),
      # Refine: if date looks like YYYY/MM/DD, treat as "date"
      date_type = dplyr::case_when(
        date_type == "fiscal_year" &
          grepl("^\\d{4}/\\d{2}/\\d{2}$", date) ~ "date",
        TRUE ~ date_type
      ),
      # Refine: if source provides only the starting year (YYYY),
      # accept it as a plain year rather than forcing YYYY-YY format
      date_type = dplyr::case_when(
        date_type == "fiscal_year" & grepl("^\\d{4}$", date) ~ "year",
        TRUE ~ date_type
      ),
      # Refine year_or_category
      date_type = dplyr::case_when(
        date_type == "year_or_category" & grepl("^\\d{4}$", date) ~ "year",
        date_type == "year_or_category" ~ "category",
        TRUE ~ date_type
      ),
      date_valid = dplyr::case_when(
        date_type == "date" ~ validate_date_string(date),
        date_type == "year" ~ validate_year_string(date),
        date_type == "fiscal_year" ~ validate_fiscal_year_string(date),
        date_type == "category" ~ TRUE,
        date_type == "unknown" ~ FALSE,
        TRUE ~ FALSE
      )
    )

  # Check value is parseable as numeric (or NA/empty)
  df <- df |>
    dplyr::mutate(
      value_valid = is.na(value) |
        nchar(trimws(value)) == 0 |
        !is.na(suppressWarnings(as.numeric(value)))
    )

  # Check geography is not blank where value is present

  df <- df |>
    dplyr::mutate(
      geography_valid = is.na(value) |
        nchar(trimws(value)) == 0 |
        (!is.na(geography) & nchar(trimws(geography)) > 0)
    )

  # Build reason column for failing rows
  df <- df |>
    dplyr::mutate(
      reason = dplyr::case_when(
        !date_valid & !value_valid & !geography_valid ~
          "invalid date, non-numeric value, missing geography",
        !date_valid & !value_valid ~
          "invalid date, non-numeric value",
        !date_valid & !geography_valid ~
          "invalid date, missing geography",
        !value_valid & !geography_valid ~
          "non-numeric value, missing geography",
        !date_valid ~ "invalid date",
        !value_valid ~ "non-numeric value",
        !geography_valid ~ "missing geography",
        TRUE ~ NA_character_
      )
    )

  passing <- df |>
    dplyr::filter(is.na(reason)) |>
    dplyr::select(-timeperiod_type, -date_type, -date_valid,
                  -value_valid, -geography_valid, -reason)

  failing <- df |>
    dplyr::filter(!is.na(reason)) |>
    dplyr::select(dataset, chapter, date, geography, value,
                  category_primary, category_secondary, reason)

  # Build issues summary
  issues <- failing |>
    dplyr::group_by(dataset, reason) |>
    dplyr::summarise(
      row_count = dplyr::n(),
      .groups = "drop"
    ) |>
    dplyr::rename(issue_type = reason, detail = row_count) |>
    dplyr::mutate(detail = paste(detail, "rows"))

  list(passing = passing, failing = failing, issues = issues)
}


#' Generate ingestion report
#'
#' Writes a summary of successfully ingested data to CSV,
#' showing row counts per dataset and chapter.
#'
#' @param passing_data Tibble of data that passed validation
#' @return The summary tibble (invisibly)
generate_ingestion_report <- function(passing_data) {
  if (nrow(passing_data) == 0) {
    report <- tibble::tibble(
      chapter = character(), dataset = character(), rows = integer()
    )
  } else {
    report <- passing_data |>
      dplyr::group_by(chapter, dataset) |>
      dplyr::summarise(rows = dplyr::n(), .groups = "drop") |>
      dplyr::arrange(chapter, dataset)
  }

  dir.create("output", showWarnings = FALSE, recursive = TRUE)
  readr::write_csv(report, "output/reverse_ingested.csv")
  report
}


#' Generate rejection report
#'
#' Writes all failing rows with their reasons to CSV so colleagues
#' know exactly what to fix.
#'
#' @param failing_data Tibble of rejected rows with reason column
#' @param structural_issues Tibble of structural validation issues
#' @return The combined report tibble (invisibly)
generate_rejection_report <- function(failing_data, structural_issues) {
  dir.create("output", showWarnings = FALSE, recursive = TRUE)

  # Write data-level rejections
  readr::write_csv(failing_data, "output/reverse_rejected.csv")

  # Write structural issues separately
  if (nrow(structural_issues) > 0) {
    readr::write_csv(structural_issues, "output/reverse_structural_issues.csv")
  }

  failing_data
}
