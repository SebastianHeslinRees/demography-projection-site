#' Map chapter name back to theme
#'
#' Inverts the theme_to_chapter mapping from utils.R and converts
#' a chapter name (from the workbook filename) to the original
#' JSON theme value.
#'
#' @param chapter Character vector of chapter names
#' @return Character vector of theme names (NA for unmatched)
map_chapter_to_theme <- function(chapter) {
  chapter_to_theme <- stats::setNames(
    names(theme_to_chapter),
    unname(theme_to_chapter)
  )
  unname(chapter_to_theme[chapter])
}


#' Read the column mapping configuration
#'
#' Reads column_mapping.csv which defines how workbook columns
#' (date, geography, value, category_secondary) map to the API
#' columns (xd, b, y, z2). The _default row provides the standard
#' mapping; per-dataset rows can override it for specific datasets.
#'
#' @param path Path to column_mapping.csv
#' @return Tibble with columns: dataset, xd_source, b_source, y_source, z2_source
read_column_mapping <- function(path = "data-raw/column_mapping.csv") {
  readr::read_csv(path, col_types = readr::cols(.default = "c"),
                  show_col_types = FALSE)
}


#' Apply column mapping to reconstruct the API data shape
#'
#' Renames workbook columns to the API column names (xd, b, y, z2)
#' using the mapping configuration. Per-dataset overrides are applied
#' where defined; all other datasets use the _default mapping.
#'
#' @param combined_data Tibble of combined workbook data (passing rows only)
#' @param mapping Tibble from read_column_mapping()
#' @return Tibble in API shape: dataset, xd, b, y, z2, chapter
reconstruct_chart_data <- function(combined_data, mapping) {
  defaults <- mapping |> dplyr::filter(dataset == "_default")

  # Find per-dataset rows that actually differ from the default
  overrides <- mapping |>
    dplyr::filter(
      dataset != "_default",
      !(xd_source == defaults$xd_source &
        b_source == defaults$b_source &
        y_source == defaults$y_source &
        z2_source == defaults$z2_source)
    )

  apply_mapping <- function(df, map_row) {
    tibble::tibble(
      dataset = df$dataset,
      xd = df[[map_row$xd_source]],
      b = df[[map_row$b_source]],
      y = df[[map_row$y_source]],
      z2 = df[[map_row$z2_source]],
      chapter = df$chapter
    )
  }

  override_datasets <- overrides$dataset
  has_override <- combined_data$dataset %in% override_datasets

  # Apply default mapping to the bulk of the data
  result <- apply_mapping(combined_data[!has_override, ], defaults)

  # Apply per-dataset overrides only where mapping differs
  if (sum(has_override) > 0) {
    override_results <- purrr::map_dfr(override_datasets, function(ds) {
      ds_data <- combined_data[combined_data$dataset == ds, ]
      if (nrow(ds_data) == 0) return(tibble::tibble())
      ds_map <- overrides[overrides$dataset == ds, ]
      apply_mapping(ds_data, ds_map)
    })
    result <- dplyr::bind_rows(result, override_results)
  }

  result
}


#' Reconstruct chartMeta.json shape from combined metadata
#'
#' Maps chapter back to theme and selects columns matching the
#' original chartMeta.json schema.
#'
#' @param combined_meta Tibble of combined metadata from all workbooks
#' @return Tibble ready to be serialised to JSON
reconstruct_chart_meta <- function(combined_meta) {
  combined_meta |>
    dplyr::mutate(theme = map_chapter_to_theme(chapter)) |>
    dplyr::select(dataset, timeperiod_type, title, subtitle, source, theme)
}
