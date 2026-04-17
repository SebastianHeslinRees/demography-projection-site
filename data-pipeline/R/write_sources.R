#' Write reconstructed chart_data.csv
#'
#' Writes the passing data tibble to CSV in the format expected
#' by the forward pipeline and the app API.
#'
#' @param chart_data Tibble from reconstruct_chart_data()
#' @param output_path Path to write the CSV
#' @return The output path (invisibly)
write_chart_data_csv <- function(chart_data,
                                 output_path = "output/chart_data.csv") {
  dir.create(dirname(output_path), showWarnings = FALSE, recursive = TRUE)
  readr::write_csv(chart_data, output_path)
  invisible(output_path)
}


#' Write reconstructed chartMeta.json
#'
#' Serialises the metadata tibble to a JSON array matching
#' the original chartMeta.json schema.
#'
#' @param chart_meta Tibble from reconstruct_chart_meta()
#' @param output_path Path to write the JSON file
#' @return The output path (invisibly)
write_chart_meta_json <- function(chart_meta,
                                  output_path = "output/chartMeta.json") {
  dir.create(dirname(output_path), showWarnings = FALSE, recursive = TRUE)
  jsonlite::write_json(
    chart_meta,
    output_path,
    pretty = TRUE,
    auto_unbox = TRUE
  )
  invisible(output_path)
}
