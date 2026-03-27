#' Write a chapter workbook to xlsx
#'
#' Creates an Excel workbook for a single chapter containing a Metadata
#' sheet and one data sheet per indicator (dataset). All values are
#' written as text to prevent Excel date/number coercion. Data sheets
#' include text-length validation on the xd column and 500 buffer rows
#' pre-formatted as text to protect against paste/type coercion.
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

  buffer_rows <- 500L

  wb <- openxlsx2::wb_workbook()

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

  wb <- wb |>
    openxlsx2::wb_add_worksheet("Metadata") |>
    openxlsx2::wb_add_data(x = meta_sheet, col_names = TRUE) |>
    openxlsx2::wb_set_col_widths(
      cols = seq_len(ncol(meta_sheet)), widths = "auto"
    ) |>
    openxlsx2::wb_freeze_pane(first_row = TRUE)

  # Header styling: bold + grey fill
  header_dims <- openxlsx2::wb_dims(rows = 1, cols = seq_len(ncol(meta_sheet)))
  wb <- wb |>
    openxlsx2::wb_add_font(dims = header_dims, bold = TRUE) |>
    openxlsx2::wb_add_fill(dims = header_dims,
                           color = openxlsx2::wb_color("D9D9D9"))

  # Apply text formatting to data cells + buffer rows
  wb <- apply_text_format(wb, "Metadata", meta_sheet, buffer_rows)

  # -- Data sheets (one per indicator) --
  for (ds in datasets_in_chapter) {
    sheet_name <- truncate_sheet_name(ds)

    indicator_data <- chapter_data |>
      dplyr::filter(dataset == ds) |>
      dplyr::select(xd, b, y, z2, xd_type, xd_valid)

    wb <- wb |>
      openxlsx2::wb_add_worksheet(sheet_name) |>
      openxlsx2::wb_add_data(x = indicator_data, col_names = TRUE) |>
      openxlsx2::wb_set_col_widths(
        cols = seq_len(ncol(indicator_data)), widths = "auto"
      ) |>
      openxlsx2::wb_freeze_pane(first_row = TRUE)

    # Header styling
    data_header_dims <- openxlsx2::wb_dims(
      rows = 1, cols = seq_len(ncol(indicator_data))
    )
    wb <- wb |>
      openxlsx2::wb_add_font(dims = data_header_dims, bold = TRUE) |>
      openxlsx2::wb_add_fill(dims = data_header_dims,
                             color = openxlsx2::wb_color("D9D9D9"))

    # Force all columns to text format to prevent date coercion
    wb <- apply_text_format(wb, sheet_name, indicator_data, buffer_rows)

    # Add data validation to the xd (date) column
    wb <- add_xd_validation(wb, sheet_name, indicator_data, buffer_rows)
  }

  # -- Save --
  dir.create(output_dir, showWarnings = FALSE, recursive = TRUE)
  out_path <- file.path(output_dir, paste0(chapter_name, ".xlsx"))
  openxlsx2::wb_save(wb, out_path, overwrite = TRUE)

  invisible(out_path)
}


#' Apply text formatting to data cells and buffer rows
#'
#' Prevents Excel from reinterpreting date-like or numeric strings
#' by setting every cell's number format to text (@). Extends formatting
#' beyond the data rows to cover empty buffer rows below.
#'
#' @param wb An openxlsx2 workbook object
#' @param sheet_name Name of the sheet to format
#' @param data The data frame written to the sheet
#' @param buffer_rows Number of empty rows below data to pre-format
apply_text_format <- function(wb, sheet_name, data, buffer_rows = 500L) {
  if (nrow(data) == 0) return(wb)

  last_row <- nrow(data) + 1 + buffer_rows
  dims <- openxlsx2::wb_dims(rows = 2:last_row, cols = seq_len(ncol(data)))

  openxlsx2::wb_add_numfmt(wb, sheet = sheet_name, dims = dims, numfmt = "@")
}


#' Add text-length validation to the xd column
#'
#' Applies a textLength data validation to column 1 (xd) covering
#' data rows and buffer rows. Shows an input prompt guiding authors
#' on the expected date format and a warning on invalid input.
#'
#' @param wb An openxlsx2 workbook object
#' @param sheet_name Name of the sheet
#' @param data The data frame written to the sheet
#' @param buffer_rows Number of empty rows below data to validate
add_xd_validation <- function(wb, sheet_name, data, buffer_rows = 500L) {
  last_row <- nrow(data) + 1 + buffer_rows
  xd_dims <- openxlsx2::wb_dims(rows = 2:last_row, cols = 1)

  openxlsx2::wb_add_data_validation(
    wb, sheet = sheet_name,
    dims = xd_dims,
    type = "textLength",
    operator = "between",
    value = c(1, 50),
    allow_blank = TRUE,
    show_input_msg = TRUE,
    prompt_title = "Date format",
    prompt = "Enter date as YYYY/MM/DD, a year (YYYY), or a fiscal year (YYYY-YY).",
    show_error_msg = TRUE,
    error_style = "warning",
    error_title = "Check format",
    error = "This cell expects a text date value (e.g. 2024/01/15)."
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
