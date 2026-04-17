# Chapter Workbook Generator Pipeline
#
# Reads chartMeta.json and chart_data.csv, joins and validates the data,
# then writes one .xlsx workbook per chapter with one sheet per indicator.

library(targets)
library(tarchetypes)

tar_option_set(
  packages = c(
    "tibble", "dplyr", "tidyr", "purrr",
    "readr", "jsonlite", "lubridate",
    "openxlsx2", "readxl"
  )
)

# Source all function files in R/
tar_source("R")

list(
  # -- Read source files --
  tar_target(
    meta_raw,
    read_chart_meta("data-raw/chartMeta.json")
  ),

  tar_target(
    data_raw,
    read_chart_data("data-raw/chart_data.csv")
  ),

  # -- Join and assign chapters --
  tar_target(
    master_df,
    join_and_map(data_raw, meta_raw)
  ),

  # -- Unmapped datasets (CSV rows with no JSON metadata) --
  tar_target(
    unmapped_datasets,
    extract_unmapped_datasets(master_df)
  ),

  # -- Mapped data only --
  tar_target(
    mapped_df,
    filter_mapped(master_df)
  ),

  # -- Validate date values --
  tar_target(
    validated_df,
    validate_dates(mapped_df)
  ),

  # -- Validation report --
  tar_target(
    validation_report,
    generate_validation_report(validated_df)
  ),

  # -- Dynamic branching: group by chapter --
  tar_group_by(
    validated_by_chapter,
    validated_df,
    chapter
  ),

  # -- Write one workbook per chapter --
  tar_target(
    chapter_workbooks,
    write_chapter_workbook(validated_by_chapter),
    pattern = map(validated_by_chapter)
  )
)
