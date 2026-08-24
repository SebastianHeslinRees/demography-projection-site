#!/usr/bin/env python3
"""
Transform components of change Parquet data into chart-ready JSON.
Reads the new trend output under /Users/user1/Downloads/outputs-2/trend/output_pq
and emits the component series in Low/Central/High form.
"""

import json
from collections import defaultdict
from pathlib import Path

import pandas as pd

OUTPUT_DIR = Path(__file__).parent.parent / "src" / "lib" / "data"
OUTPUT_FILE = OUTPUT_DIR / "ComponentsOfChangeChartData.json"
INPUT_DIR = Path("/Users/user1/Downloads/outputs-2/trend/output_pq")
LONDON_GSS_CODE = "E12000007"

VARIANT_MAPPING = {
    "variant=llt10": "Low",
    "variant=ppt13": "Central",
    "variant=hht15": "High",
}

COMPONENT_MAPPING = {
    "births": "births",
    "deaths": "deaths",
    "internal_in": "domestic_in_migration",
    "internal_out": "domestic_out_migration",
    "international_in": "international_in_migration",
    "international_out": "international_out_migration",
}


def read_component_data(variant_path: Path, year: int, component: str):
    component_path = variant_path / "geography=region" / f"component={component}" / f"year={year}"
    if not component_path.exists():
        return None

    parquet_files = sorted(component_path.glob("*.parquet"))
    if not parquet_files:
        return None

    try:
        frames = [pd.read_parquet(file_path) for file_path in parquet_files]
        df = pd.concat(frames, ignore_index=True)
        if "gss_code" not in df.columns:
            print(f"Warning: missing gss_code for {component_path}; skipping")
            return None

        london_df = df[df["gss_code"] == LONDON_GSS_CODE]
        if london_df.empty:
            print(f"Warning: no London rows ({LONDON_GSS_CODE}) for {component_path}; skipping")
            return None

        return float(london_df["value"].sum())
    except Exception as exc:
        print(f"Error reading {component_path}: {exc}")
        return None


def main():
    print(f"Reading data from {INPUT_DIR}")

    data_by_variant = defaultdict(lambda: defaultdict(dict))

    for variant_dir in sorted(INPUT_DIR.iterdir()):
        if not variant_dir.is_dir():
            continue

        variant_name = VARIANT_MAPPING.get(variant_dir.name)
        if variant_name is None:
            continue

        print(f"Processing: {variant_name} ({variant_dir.name})")

        for year in range(2002, 2051):
            for component_key, component_label in COMPONENT_MAPPING.items():
                value = read_component_data(variant_dir, year, component_key)
                if value is not None:
                    data_by_variant[variant_name][year][component_label] = value

    rows = []
    for variant in sorted(data_by_variant.keys()):
        for year in sorted(data_by_variant[variant].keys()):
            for component, value in data_by_variant[variant][year].items():
                rows.append({
                    "dataset": component,
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": value,
                })

    for variant in sorted(data_by_variant.keys()):
        for year in sorted(data_by_variant[variant].keys()):
            domestic_in = data_by_variant[variant][year].get("domestic_in_migration")
            domestic_out = data_by_variant[variant][year].get("domestic_out_migration")
            international_in = data_by_variant[variant][year].get("international_in_migration")
            international_out = data_by_variant[variant][year].get("international_out_migration")

            domestic_net = None
            international_net = None

            if domestic_in is not None and domestic_out is not None:
                domestic_net = domestic_in - domestic_out
                data_by_variant[variant][year]["domestic_net_migration"] = domestic_net
                rows.append({
                    "dataset": "domestic_net_migration",
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": domestic_net,
                })

            if international_in is not None and international_out is not None:
                international_net = international_in - international_out
                data_by_variant[variant][year]["international_net_migration"] = international_net
                rows.append({
                    "dataset": "international_net_migration",
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": international_net,
                })

            if domestic_net is not None and international_net is not None:
                total_net = domestic_net + international_net
                data_by_variant[variant][year]["total_net_migration"] = total_net
                rows.append({
                    "dataset": "total_net_migration",
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": total_net,
                })

            births = data_by_variant[variant][year].get("births")
            deaths = data_by_variant[variant][year].get("deaths")
            if births is not None and deaths is not None:
                rows.append({
                    "dataset": "natural_change",
                    "xd": f"{year:04d}-01-01",
                    "b": variant,
                    "y": births - deaths,
                })

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_FILE.write_text(json.dumps(rows, indent=2))

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
    print("  - international_in_migration")
    print("  - international_out_migration")


if __name__ == "__main__":
    main()
