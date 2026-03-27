#' Convert legacy date formats in the xd column to YYYY/MM/DD
#'
#' Handles both DD/MM/YYYY (legacy) and YYYY/MM/DD (current) date strings,
#' converting legacy formats to the standard YYYY/MM/DD. Non-date values
#' (years, fiscal years, categories) are left unchanged.
#'
#' @param df A tibble with an xd column
#' @return The input tibble with date values in xd converted to YYYY/MM/DD
convert_xd_dates <- function(df) {
  df |>
    dplyr::mutate(
      xd = dplyr::case_when(
        # Already in YYYY/MM/DD format
        grepl("^\\d{4}/\\d{2}/\\d{2}$", xd) ~ xd,
        # DD/MM/YYYY or DD-MM-YYYY (legacy) — convert to YYYY/MM/DD
        grepl("^\\d{2}[/-]\\d{2}[/-]\\d{4}$", xd) ~
          format(suppressWarnings(lubridate::dmy(xd)), "%Y/%m/%d"),
        # Everything else (years, fiscal years, categories) — keep as-is
        TRUE ~ xd
      )
    )
}


#' Classify the xd column type based on timeperiod_type
#'
#' Determines how the xd value should be validated based on
#' the indicator's timeperiod_type from metadata.
#'
#' @param timeperiod_type Character vector of time period types
#' @return Character vector of xd type classifications
classify_xd_type <- function(timeperiod_type) {
  dplyr::case_when(
    tolower(timeperiod_type) %in% c("monthly", "quarter", "quarterly") ~ "date",
    tolower(timeperiod_type) %in% c("financial year", "academic year",
                                     "tfl period") ~ "fiscal_year",
    tolower(timeperiod_type) %in% c("annual", "bi-annual", "multi-year period",
                                     "three year average",
                                     "12-month period") ~ "year_or_category",
    TRUE ~ "unknown"
  )
}


#' Validate xd values based on their classified type
#'
#' Converts legacy date formats to YYYY/MM/DD, then applies type-specific
#' validation rules to each row. For date types, validates YYYY/MM/DD
#' format using lubridate::ymd(). For years, checks four-digit format
#' and reasonable range. For fiscal years, checks YYYY-YY or YYYY/YY
#' patterns. Categorical text passes without validation.
#'
#' @param df A tibble with xd and timeperiod_type columns
#' @return The input tibble with xd_type and xd_valid columns added
validate_xd <- function(df) {
  df |>
    convert_xd_dates() |>
    dplyr::mutate(
      xd_type = classify_xd_type(timeperiod_type),
      # Refine fiscal_year: if xd is actually a YYYY/MM/DD date, treat as "date"
      xd_type = dplyr::case_when(
        xd_type == "fiscal_year" &
          grepl("^\\d{4}/\\d{2}/\\d{2}$", xd) ~ "date",
        TRUE ~ xd_type
      ),
      # Refine year_or_category: if xd matches a 4-digit year, call it "year";
      # otherwise call it "category"
      xd_type = dplyr::case_when(
        xd_type == "year_or_category" & grepl("^\\d{4}$", xd) ~ "year",
        xd_type == "year_or_category" ~ "category",
        TRUE ~ xd_type
      ),
      xd_valid = dplyr::case_when(
        # Date validation: YYYY/MM/DD
        xd_type == "date" ~ validate_date_string(xd),
        # Plain year validation
        xd_type == "year" ~ validate_year_string(xd),
        # Fiscal year validation
        xd_type == "fiscal_year" ~ validate_fiscal_year_string(xd),
        # Categorical text: always valid
        xd_type == "category" ~ TRUE,
        # Unknown: flag for review
        xd_type == "unknown" ~ FALSE,
        TRUE ~ FALSE
      )
    )
}


#' Validate a YYYY/MM/DD date string
#'
#' Checks format matches the expected pattern and that lubridate::ymd()
#' can parse it successfully (catches invalid days like 31st February).
#'
#' @param xd Character vector of date strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_date_string <- function(xd) {
  format_ok <- grepl("^\\d{4}/\\d{2}/\\d{2}$", xd)
  parse_ok <- !is.na(suppressWarnings(lubridate::ymd(xd)))
  format_ok & parse_ok
}


#' Validate a four-digit year string
#'
#' Checks the value is exactly four digits and falls within
#' a reasonable range (1990-2030).
#'
#' @param xd Character vector of year strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_year_string <- function(xd) {
  format_ok <- grepl("^\\d{4}$", xd)
  year_val <- suppressWarnings(as.integer(xd))
  range_ok <- !is.na(year_val) & year_val >= 1990 & year_val <= 2030
  format_ok & range_ok
}


#' Validate a fiscal/academic year string
#'
#' Checks the value matches YYYY-YY, YYYY/YY, or multi-year
#' span patterns like YYYY-YYYY.
#'
#' @param xd Character vector of fiscal year strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_fiscal_year_string <- function(xd) {
  grepl("^\\d{4}[/-]\\d{2,4}$", xd)
}


#' Generate validation report
#'
#' Filters to rows that failed validation and writes them
#' to output/validation_flags.csv.
#'
#' @param validated_df Tibble with xd_valid column from validate_xd()
#' @return Tibble of flagged rows
generate_validation_report <- function(validated_df) {
  flagged <- validated_df |>
    dplyr::filter(!xd_valid)

  readr::write_csv(flagged, "output/validation_flags.csv")
  flagged
}
