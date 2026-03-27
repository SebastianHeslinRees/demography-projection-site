#' Read chart metadata from JSON
#'
#' Reads chartMeta.json and returns a tibble with one row per indicator.
#'
#' @param path Path to chartMeta.json
#' @return A tibble with 106 rows of indicator metadata
read_chart_meta <- function(path = "data-raw/chartMeta.json") {
  jsonlite::fromJSON(path) |>
    tibble::as_tibble()
}


#' Read chart data from CSV
#'
#' Reads chart_data.csv with all columns as character to prevent
#' type coercion. This preserves date strings and numeric values
#' exactly as they appear in the source file.
#'
#' @param path Path to chart_data.csv
#' @return A tibble with all columns as character
read_chart_data <- function(path = "data-raw/chart_data.csv") {
  readr::read_csv(
    path,
    col_types = readr::cols(.default = "c"),
    show_col_types = FALSE
  )
}
