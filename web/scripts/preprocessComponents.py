#!/usr/bin/env python3
"""
Transform components of change Parquet data into chart-ready JSON.
Reads from /Users/user1/Downloads/output_pq/ and outputs ComponentsOfChangeChartData.json
"""

import pandas as pd
import json
import glob
import os
from pathlib import Path
from collections import defaultdict

# Configuration
OUTPUT_DIR = Path(__file__).parent.parent / "src" / "lib" / "data"
OUTPUT_FILE = OUTPUT_DIR / "ComponentsOfChangeChartData.json"
INPUT_DIR = Path("/Users/user1/Downloads/output_pq")
LONDON_GSS_CODE = "E12000007"

# Variant mapping
VARIANT_MAPPING = {
    "ppt_5yr": "5-year trend",
    "ppt_10yr": "10-year trend",
    "ppt_15yr": "15-year trend",
}

# Component mapping
COMPONENT_MAPPING = {
    "births": "births",
    "deaths": "deaths",
    "international_net": "international_net_migration",
    "internal_in": "domestic_in_migration",
    "internal_out": "domestic_out_migration",
    "internal_net": "domestic_net_migration",
    "total_net": "total_net_migration",
}

def extract_variant_name(folder_name):
    """Extract variant label from folder name like '2024_ppt_5yr_26-05-28_2029'."""
    for key, label in VARIANT_MAPPING.items():
        if key in folder_name:
            return label
    return None

def read_component_data(variant_path, year, component):
    """Read and aggregate a component's Parquet file."""
    component_path = variant_path / f"year={year}" / f"component={component}"
    
    if not component_path.exists():
        return None
    
    parquet_files = list(component_path.glob("*.parquet"))
    if not parquet_files:
        return None
    
    try:
        # Read all parquet files for this component
        dfs = [pd.read_parquet(f) for f in parquet_files]
        df = pd.concat(dfs, ignore_index=True)

        # Enforce London-only aggregation. Do not silently sum all geographies.
        if "gss_code" not in df.columns:
            print(f"Warning: missing gss_code for {component_path}; skipping")
            return None

        df = df[df["gss_code"] == LONDON_GSS_CODE]
        if df.empty:
            print(f"Warning: no London rows ({LONDON_GSS_CODE}) for {component_path}; skipping")
            return None

        # Aggregate across age/sex rows for the selected geography.
        total_value = df["value"].sum()
        return total_value
    except Exception as e:
        print(f"Error reading {component_path}: {e}")
        return None

def main():
    print(f"Reading data from {INPUT_DIR}")
    
    # Collect data: {variant: {year: {component: value}}}
    data_by_variant = defaultdict(lambda: defaultdict(dict))
    
    # Iterate through variant folders
    variant_folders = sorted([d for d in INPUT_DIR.iterdir() if d.is_dir() and d.name.startswith("variant=")])
    
    for variant_folder in variant_folders:
        variant_name = extract_variant_name(variant_folder.name)
        if not variant_name:
            continue
        
        print(f"Processing variant: {variant_name} ({variant_folder.name})")
        
        # Find all year subdirectories
        year_dirs = sorted([d for d in variant_folder.iterdir() if d.is_dir() and d.name.startswith("year=")])
        
        for year_dir in year_dirs:
            year = int(year_dir.name.replace("year=", ""))
            
            # Read each component
            for component_key, component_label in COMPONENT_MAPPING.items():
                value = read_component_data(variant_folder, year, component_key)
                if value is not None:
                    data_by_variant[variant_name][year][component_label] = value
    
    # Build output rows in long format
    rows = []
    
    for variant in sorted(data_by_variant.keys()):
        for year in sorted(data_by_variant[variant].keys()):
            for component, value in data_by_variant[variant][year].items():
                rows.append({
                    "dataset": component,
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": value
                })
    
    # Calculate derived metric: natural_change
    for variant in sorted(data_by_variant.keys()):
        for year in sorted(data_by_variant[variant].keys()):
            births = data_by_variant[variant][year].get("births")
            deaths = data_by_variant[variant][year].get("deaths")
            
            # Natural change = births - deaths
            if births is not None and deaths is not None:
                natural_change = births - deaths
                rows.append({
                    "dataset": "natural_change",
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": natural_change
                })
    
    # Write output JSON
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    with open(OUTPUT_FILE, "w") as f:
        json.dump(rows, f)
    
    print(f"\nGenerated {len(rows)} rows")
    print(f"Output file: {OUTPUT_FILE}")
    print("\nDatasets created:")
    print("  - births")
    print("  - deaths")
    print("  - natural_change (calculated: births - deaths)")
    print("  - international_net_migration")
    print("  - domestic_in_migration")
    print("  - domestic_out_migration")
    print("  - domestic_net_migration")
    print("  - total_net_migration")

if __name__ == "__main__":
    main()
