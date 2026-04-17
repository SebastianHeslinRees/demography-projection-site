#' Convert legacy date formats in the date column to YYYY/MM/DD
#'
#' Handles both DD/MM/YYYY (legacy) and YYYY/MM/DD (current) date strings,
#' converting legacy formats to the standard YYYY/MM/DD. Non-date values
#' (years, fiscal years, categories) are left unchanged.
#'
#' @param df A tibble with a date column
#' @return The input tibble with date values converted to YYYY/MM/DD
convert_legacy_dates <- function(df) {
  df |>
    dplyr::mutate(
      date = dplyr::case_when(
        # Already in YYYY/MM/DD format
        grepl("^\\d{4}/\\d{2}/\\d{2}$", date) ~ date,
        # DD/MM/YYYY or DD-MM-YYYY (legacy) — convert to YYYY/MM/DD
        grepl("^\\d{2}[/-]\\d{2}[/-]\\d{4}$", date) ~
          format(suppressWarnings(lubridate::dmy(date)), "%Y/%m/%d"),
        # Everything else (years, fiscal years, categories) — keep as-is
        TRUE ~ date
      )
    )
}


#' Classify the date column type based on timeperiod_type
#'
#' Determines how the date value should be validated based on
#' the indicator's timeperiod_type from metadata.
#'
#' @param timeperiod_type Character vector of time period types
#' @return Character vector of date type classifications
classify_date_type <- function(timeperiod_type) {
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


#' Validate date values based on their classified type
#'
#' Converts legacy date formats to YYYY/MM/DD, then applies type-specific
#' validation rules to each row. For date types, validates YYYY/MM/DD
#' format using lubridate::ymd(). For years, checks four-digit format
#' and reasonable range. For fiscal years, checks YYYY-YY or YYYY/YY
#' patterns. Categorical text passes without validation.
#'
#' @param df A tibble with date and timeperiod_type columns
#' @return The input tibble with date_type and date_valid columns added
validate_dates <- function(df) {
  df |>
    convert_legacy_dates() |>
    dplyr::mutate(
      date_type = classify_date_type(timeperiod_type),
      # Refine fiscal_year: if date is actually a YYYY/MM/DD date, treat as "date"
      date_type = dplyr::case_when(
        date_type == "fiscal_year" &
          grepl("^\\d{4}/\\d{2}/\\d{2}$", date) ~ "date",
        TRUE ~ date_type
      ),
      # Refine fiscal_year: if source provides only the starting year (YYYY),
      # accept it as a plain year rather than forcing YYYY-YY format
      date_type = dplyr::case_when(
        date_type == "fiscal_year" & grepl("^\\d{4}$", date) ~ "year",
        TRUE ~ date_type
      ),
      # Refine year_or_category: if date matches a 4-digit year, call it "year";
      # otherwise call it "category"
      date_type = dplyr::case_when(
        date_type == "year_or_category" & grepl("^\\d{4}$", date) ~ "year",
        date_type == "year_or_category" ~ "category",
        TRUE ~ date_type
      ),
      date_valid = dplyr::case_when(
        # Date validation: YYYY/MM/DD
        date_type == "date" ~ validate_date_string(date),
        # Plain year validation
        date_type == "year" ~ validate_year_string(date),
        # Fiscal year validation
        date_type == "fiscal_year" ~ validate_fiscal_year_string(date),
        # Categorical text: always valid
        date_type == "category" ~ TRUE,
        # Unknown: flag for review
        date_type == "unknown" ~ FALSE,
        TRUE ~ FALSE
      )
    )
}


#' Validate a YYYY/MM/DD date string
#'
#' Checks format matches the expected pattern and that lubridate::ymd()
#' can parse it successfully (catches invalid days like 31st February).
#'
#' @param date Character vector of date strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_date_string <- function(date) {
  format_ok <- grepl("^\\d{4}/\\d{2}/\\d{2}$", date)
  parse_ok <- !is.na(suppressWarnings(lubridate::ymd(date)))
  format_ok & parse_ok
}


#' Validate a four-digit year string
#'
#' Checks the value is exactly four digits and falls within
#' a reasonable range (1990-2030).
#'
#' @param date Character vector of year strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_year_string <- function(date) {
  format_ok <- grepl("^\\d{4}$", date)
  year_val <- suppressWarnings(as.integer(date))
  range_ok <- !is.na(year_val) & year_val >= 1990 & year_val <= 2030
  format_ok & range_ok
}


#' Validate a fiscal/academic year string
#'
#' Checks the value matches YYYY-YY, YYYY/YY, or multi-year
#' span patterns like YYYY-YYYY.
#'
#' @param date Character vector of fiscal year strings
#' @return Logical vector: TRUE if valid, FALSE otherwise
validate_fiscal_year_string <- function(date) {
  grepl("^\\d{4}[/-]\\d{2,4}$", date)
}


#' Generate validation report
#'
#' Filters to rows that failed validation and writes them
#' to output/validation_flags.csv.
#'
#' @param validated_df Tibble with date_valid column from validate_dates()
#' @return Tibble of flagged rows
generate_validation_report <- function(validated_df) {
  flagged <- validated_df |>
    dplyr::filter(!date_valid)

  readr::write_csv(flagged, "output/validation_flags.csv")
  flagged
}
