# Reverse Pipeline: Excel Workbooks -> chart_data.csv + chartMeta.json
#
# Reads edited workbooks from data-raw/reverse_data/, validates the data,
# and reconstructs the single CSV and JSON files. Passing data flows through
# to the output; failing data is captured in a rejection report.

library(targets)
library(tarchetypes)

tar_option_set(
  packages = c(
    "tibble", "dplyr", "tidyr", "purrr",
    "readr", "jsonlite", "lubridate",
    "openxlsx2"
  )
)

# Source all function files in R/
tar_source("R")

list(
  # -- Discover workbooks --
  tar_target(
    workbook_paths,
    list_workbooks("data-raw/reverse_data")
  ),

  # -- Structural validation (per workbook) --
  tar_target(
    structural_issues,
    purrr::map_dfr(workbook_paths, validate_workbook_structure)
  ),

  # -- Read all workbooks --
  tar_target(
    imported,
    read_all_workbooks("data-raw/reverse_data")
  ),

  # -- Validate and split into passing/failing --
  tar_target(
    validated_import,
    validate_import_data(imported$data, imported$metadata)
  ),

  # -- Ingestion report (what was accepted) --
  tar_target(
    ingestion_report,
    generate_ingestion_report(validated_import$passing)
  ),

  # -- Rejection report (what failed and why) --
  tar_target(
    rejection_report,
    generate_rejection_report(validated_import$failing, structural_issues)
  ),

  # -- Read column mapping (date->xd, geography->b, etc.) --
  tar_target(
    column_mapping,
    read_column_mapping("data-raw/column_mapping.csv")
  ),

  # -- Reconstruct chart_data.csv in API shape (xd, b, y, z2) --
  tar_target(
    chart_data_csv,
    reconstruct_chart_data(validated_import$passing, column_mapping)
  ),

  # -- Reconstruct chartMeta.json --
  tar_target(
    chart_meta_json,
    reconstruct_chart_meta(imported$metadata)
  ),

  # -- Write outputs --
  tar_target(
    output_csv,
    write_chart_data_csv(chart_data_csv)
  ),

  tar_target(
    output_json,
    write_chart_meta_json(chart_meta_json)
  )
)
