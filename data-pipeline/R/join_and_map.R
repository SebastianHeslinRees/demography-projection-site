#' Join chart data to metadata and assign chapters
#'
#' Performs a left join of chart_data to chartMeta on the dataset column,
#' then maps the theme field to a chapter name. Rows with no metadata
#' match will have chapter = NA.
#'
#' @param data_raw Tibble from read_chart_data()
#' @param meta_raw Tibble from read_chart_meta()
#' @return Joined tibble with chapter column added
join_and_map <- function(data_raw, meta_raw) {
  data_raw |>
    dplyr::filter(!is.na(dataset), dataset != "") |>
    dplyr::left_join(
      meta_raw,
      by = "dataset",
      suffix = c("", "_meta")
    ) |>
    dplyr::mutate(
      chapter = map_theme_to_chapter(theme)
    )
}


#' Extract unmapped datasets
#'
#' Identifies datasets present in the CSV but not in the JSON metadata,
#' summarises them, and writes a report to output/unmapped_datasets.csv.
#'
#' @param master_df The full joined tibble from join_and_map()
#' @return Tibble of unmapped dataset names with row counts and sample values
extract_unmapped_datasets <- function(master_df) {
  unmapped <- master_df |>
    dplyr::filter(is.na(chapter)) |>
    dplyr::group_by(dataset) |>
    dplyr::summarise(
      row_count = dplyr::n(),
      sample_date_values = paste(
        utils::head(unique(date), 5),
        collapse = ", "
      ),
      .groups = "drop"
    )

  readr::write_csv(unmapped, "output/unmapped_datasets.csv")
  unmapped
}


#' Filter to mapped datasets only
#'
#' Returns only rows that have a valid chapter assignment.
#'
#' @param master_df The full joined tibble from join_and_map()
#' @return Filtered tibble with no NA chapters
filter_mapped <- function(master_df) {
  dplyr::filter(master_df, !is.na(chapter))
}
