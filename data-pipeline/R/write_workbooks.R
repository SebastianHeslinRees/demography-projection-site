#' Write a chapter workbook to xlsx
#'
#' Creates an Excel workbook for a single chapter containing a Metadata
#' sheet and one data sheet per indicator (dataset). All values are
#' written as text to prevent Excel date/number coercion.
#'
#' @param chapter_data Tibble filtered to a single chapter
#' @param output_dir Directory to write workbooks into
#' @return Path to the written xlsx file (invisibly)
write_chapter_workbook <- function(chapter_data, output_dir = "output/chapters") {
  chapter_name <- unique(chapter_data$chapter)
  if (length(chapter_name) != 1) {
    stop("chapter_data must contain exactly one chapter, got: ",
         paste(chapter_name, collapse = ", "))
  }

  wb <- openxlsx::createWorkbook()

  # -- Styles --
  header_style <- openxlsx::createStyle(
    textDecoration = "Bold",
    fgFill = "#D9D9D9"
  )
  text_style <- openxlsx::createStyle(numFmt = "TEXT")

  # -- Metadata sheet --
  datasets_in_chapter <- unique(chapter_data$dataset)

  meta_sheet <- chapter_data |>
    dplyr::distinct(dataset, .keep_all = TRUE) |>
    dplyr::transmute(
      dataset = dataset,
      title = title,
      subtitle = subtitle,
      source = source,
      timeperiod_type = timeperiod_type,
      sheet_name = truncate_sheet_name(dataset)
    )

  openxlsx::addWorksheet(wb, "Metadata")
  openxlsx::writeData(wb, "Metadata", meta_sheet, headerStyle = header_style)
  openxlsx::setColWidths(wb, "Metadata",
                         cols = seq_len(ncol(meta_sheet)), widths = "auto")
  openxlsx::freezePane(wb, "Metadata", firstRow = TRUE)
  # Apply text formatting to all data cells in Metadata
  apply_text_format(wb, "Metadata", meta_sheet, text_style)

  # -- Data sheets (one per indicator) --
  for (ds in datasets_in_chapter) {
    sheet_name <- truncate_sheet_name(ds)

    indicator_data <- chapter_data |>
      dplyr::filter(dataset == ds) |>
      dplyr::select(xd, b, y, z2, xd_type, xd_valid)

    openxlsx::addWorksheet(wb, sheet_name)
    openxlsx::writeData(wb, sheet_name, indicator_data,
                        headerStyle = header_style)
    openxlsx::setColWidths(wb, sheet_name,
                           cols = seq_len(ncol(indicator_data)), widths = "auto")
    openxlsx::freezePane(wb, sheet_name, firstRow = TRUE)

    # Force all columns to text format to prevent date coercion
    apply_text_format(wb, sheet_name, indicator_data, text_style)
  }

  # -- Save --
  dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)
  out_path <- file.path(output_dir, paste0(chapter_name, ".xlsx"))
  openxlsx::saveWorkbook(wb, out_path, overwrite = TRUE)

  invisible(out_path)
}


#' Apply text formatting to all data cells in a sheet
#'
#' Prevents Excel from reinterpreting date-like or numeric strings
#' by setting every data cell's number format to TEXT.
#'
#' @param wb An openxlsx workbook object
#' @param sheet_name Name of the sheet to format
#' @param data The data frame written to the sheet
#' @param text_style An openxlsx style with numFmt = "TEXT"
apply_text_format <- function(wb, sheet_name, data, text_style) {
  if (nrow(data) == 0) return(invisible(NULL))

  openxlsx::addStyle(
    wb, sheet_name, style = text_style,
    rows = 2:(nrow(data) + 1),
    cols = seq_len(ncol(data)),
    gridExpand = TRUE
  )
}


#' Write all chapter workbooks
#'
#' Iterates over each chapter in the validated data and writes
#' a separate workbook. Used as the final pipeline target.
#'
#' @param validated_df The full validated tibble with chapter column
#' @return Character vector of output file paths
write_all_workbooks <- function(validated_df) {
  chapters <- unique(validated_df$chapter)

  paths <- purrr::map_chr(chapters, function(ch) {
    chapter_data <- dplyr::filter(validated_df, chapter == ch)
    tryCatch(
      write_chapter_workbook(chapter_data),
      error = function(e) {
        warning("Failed to write workbook for chapter '", ch, "': ",
                conditionMessage(e))
        NA_character_
      }
    )
  })

  names(paths) <- chapters
  paths
}
