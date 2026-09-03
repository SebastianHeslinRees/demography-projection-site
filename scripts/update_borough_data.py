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

SOURCE_ROOT = Path("/Users/user1/Downloads/trend_core_outputs_parquet_24august-2/variant=low/geography=lad23/component=population")
OUTPUT_FILE = Path("src/lib/data/boroughPopulationData.json")


def main() -> None:
    output_data: list[dict[str, object]] = []

    for year_dir in sorted(SOURCE_ROOT.glob("year=*")):
        year = year_dir.name.split("=")[-1]
        parquet_file = year_dir / "part-0.parquet"
        if not parquet_file.exists():
            continue

        frame = pd.read_parquet(parquet_file)
        london_df = frame[frame["gss_code"].isin(LONDON_BOROUGHS.keys())].copy()
        summarized = london_df.groupby("gss_code", as_index=False)["value"].sum()

        for row in summarized.itertuples(index=False):
            output_data.append(
                {
                    "dataset": "borough_population",
                    "xd": LONDON_BOROUGHS[row.gss_code],
                    "b": str(year),
                    "y": float(row.value),
                }
            )

    OUTPUT_FILE.write_text(json.dumps(output_data, indent=2))
    print(f"Successfully wrote {len(output_data)} records to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
