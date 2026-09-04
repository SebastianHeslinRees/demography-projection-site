import json
from pathlib import Path

import pandas as pd


LONDON_BOROUGHS = {
    "E09000001": "City of London",
    "E09000002": "Barking and Dagenham",
    "E09000003": "Barnet",
    "E09000004": "Bexley",
    "E09000005": "Brent",
    "E09000006": "Bromley",
    "E09000007": "Camden",
    "E09000008": "Croydon",
    "E09000009": "Ealing",
    "E09000010": "Enfield",
    "E09000011": "Greenwich",
    "E09000012": "Hackney",
    "E09000013": "Hammersmith and Fulham",
    "E09000014": "Haringey",
    "E09000015": "Harrow",
    "E09000016": "Havering",
    "E09000017": "Hillingdon",
    "E09000018": "Hounslow",
    "E09000019": "Islington",
    "E09000020": "Kensington and Chelsea",
    "E09000021": "Kingston upon Thames",
    "E09000022": "Lambeth",
    "E09000023": "Lewisham",
    "E09000024": "Merton",
    "E09000025": "Newham",
    "E09000026": "Redbridge",
    "E09000027": "Richmond upon Thames",
    "E09000028": "Southwark",
    "E09000029": "Sutton",
    "E09000030": "Tower Hamlets",
    "E09000031": "Waltham Forest",
    "E09000032": "Wandsworth",
    "E09000033": "Westminster",
}

TREND_SOURCE_ROOT = Path("/Users/user1/Downloads/trend_core_outputs_parquet_24august-2/variant=central/geography=lad23/component=population")
HOUSING_SOURCE_ROOT = Path("/Users/user1/Downloads/20260902_explorer_tool/output_pq/variant=central_ward/geography=lad23/component=population")
BOROUGH_OUTPUT_FILE = Path("src/lib/data/boroughPopulationData.json")
DIFFERENCE_OUTPUT_FILE = Path("src/lib/data/housingLedVsTrendCentralBoroughDifferenceData.json")


def load_borough_totals(source_root: Path) -> dict[str, dict[str, float]]:
    totals_by_year: dict[str, dict[str, float]] = {}

    for year_dir in sorted(source_root.glob("year=*")):
        year = year_dir.name.split("=")[-1]
        parquet_file = next(year_dir.glob("*.parquet"), None)
        if parquet_file is None:
            continue

        frame = pd.read_parquet(parquet_file)
        london_df = frame[frame["gss_code"].isin(LONDON_BOROUGHS.keys())].copy()

        if london_df.empty:
            continue

        grouped = london_df.groupby("gss_code", as_index=False)["value"].sum()
        totals_by_year[year] = {
            row.gss_code: float(row.value)
            for row in grouped.itertuples(index=False)
        }

    return totals_by_year


def main() -> None:
    trend_totals = load_borough_totals(TREND_SOURCE_ROOT)
    housing_totals = load_borough_totals(HOUSING_SOURCE_ROOT)

    borough_rows: list[dict[str, object]] = []
    difference_rows: list[dict[str, object]] = []

    for year in sorted(set(trend_totals) | set(housing_totals)):
        trend_year = trend_totals.get(year, {})
        housing_year = housing_totals.get(year, {})

        for gss_code, borough_name in LONDON_BOROUGHS.items():
            trend_value = trend_year.get(gss_code, 0.0)
            housing_value = housing_year.get(gss_code, 0.0)

            borough_rows.append(
                {
                    "dataset": "borough_population",
                    "xd": borough_name,
                    "b": str(year),
                    "y": float(trend_value),
                }
            )

            if trend_value:
                pct_change = ((housing_value - trend_value) / trend_value) * 100.0
            else:
                pct_change = 0.0

            difference_rows.append(
                {
                    "dataset": "housing_led_vs_trend_central_borough_difference",
                    "xd": borough_name,
                    "b": str(year),
                    "y": float(pct_change),
                }
            )

    BOROUGH_OUTPUT_FILE.write_text(json.dumps(borough_rows, indent=2))
    DIFFERENCE_OUTPUT_FILE.write_text(json.dumps(difference_rows, indent=2))
    print(f"Successfully wrote {len(borough_rows)} borough rows to {BOROUGH_OUTPUT_FILE}")
    print(f"Successfully wrote {len(difference_rows)} central difference rows to {DIFFERENCE_OUTPUT_FILE}")


if __name__ == "__main__":
    main()
