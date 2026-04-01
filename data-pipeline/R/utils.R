#' Theme-to-chapter lookup vector
#'
#' Maps JSON theme values to chapter folder/workbook names.
#' Used to assign each indicator to its chapter.
theme_to_chapter <- c(
  "Economy"        = "economics",
  "Housing"        = "housing",
  "Social Justice" = "social_justice",
  "Environment"    = "environment",
  "Skills"         = "skills",
  "Crime"          = "crime",
  "Health"         = "health",
  "Transport"      = "transport",
  "Global City"    = "global_city",
  "Demography"     = "demography",
  "CYP"            = "cyp"
)


#' Map theme to chapter name
#'
#' Converts a theme string from chartMeta.json to the corresponding
#' chapter name using the theme_to_chapter lookup.
#'
#' @param theme Character vector of theme values
#' @return Character vector of chapter names (NA for unmatched themes)
map_theme_to_chapter <- function(theme) {
  unname(theme_to_chapter[theme])
}


#' Truncate sheet name to Excel's 31-character limit
#'
#' @param name Character string to truncate
#' @return Character string of at most 31 characters
truncate_sheet_name <- function(name) {
  substr(name, 1, 31)
}
