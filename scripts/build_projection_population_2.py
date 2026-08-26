from __future__ import annotations

import json
from pathlib import Path

import pandas as pd


LONDON_GSS_CODE = 'E12000007'
SOURCE_ROOT = Path('/Users/user1/Downloads/outputs-2/trend/output_pq')
OUTPUT = Path('src/lib/data/projectedPopulation2ChartData.json')

# Mapping of input variant folders to display labels for the new page.
VARIANT_SPECS = [
    ('variant=llt10', 'Low'),
    ('variant=ppt13', 'Central'),
    ('variant=hht15', 'High'),
]


def read_london_year_frame(variant_dir: str, year: int) -> pd.DataFrame:
    year_file = SOURCE_ROOT / variant_dir / 'geography=region' / 'component=population' / f'year={year}' / 'part-0.parquet'
    frame = pd.read_parquet(year_file)
    london = frame.loc[frame['gss_code'] == LONDON_GSS_CODE].copy()
    if london.empty:
        raise RuntimeError(f'No London rows found in {year_file}')
    return london


def build_rows() -> list[dict]:
    rows: list[dict] = []

    year_dirs = sorted((SOURCE_ROOT / VARIANT_SPECS[0][0] / 'geography=region' / 'component=population').glob('year=*'))
    years = [int(p.name.split('=')[1]) for p in year_dirs]

    totals_by_variant: dict[str, list[tuple[int, float]]] = {}

    for variant_dir, label in VARIANT_SPECS:
        yearly_totals: list[tuple[int, float]] = []

        for year in years:
            london = read_london_year_frame(variant_dir, year)
            total = float(london['value'].sum())
            yearly_totals.append((year, total))

            rows.append({'dataset': 'proj2_total_population', 'xd': f'{year:04d}-01-01', 'b': label, 'y': total})

            rows.append(
                {
                    'dataset': 'proj2_working_age_population',
                    'xd': f'{year:04d}-01-01',
                    'b': label,
                    'y': float(london.loc[london['age'].between(16, 64, inclusive='both'), 'value'].sum()),
                }
            )
            rows.append(
                {
                    'dataset': 'proj2_primary_school_age_children',
                    'xd': f'{year:04d}-01-01',
                    'b': label,
                    'y': float(london.loc[london['age'].between(5, 10, inclusive='both'), 'value'].sum()),
                }
            )
            rows.append(
                {
                    'dataset': 'proj2_secondary_school_age_children',
                    'xd': f'{year:04d}-01-01',
                    'b': label,
                    'y': float(london.loc[london['age'].between(11, 15, inclusive='both'), 'value'].sum()),
                }
            )
            rows.append(
                {
                    'dataset': 'proj2_population_age_65_plus',
                    'xd': f'{year:04d}-01-01',
                    'b': label,
                    'y': float(london.loc[london['age'].between(65, 90, inclusive='both'), 'value'].sum()),
                }
            )

        totals_by_variant[label] = yearly_totals

        age_structure_year = 2046
        age_frame = read_london_year_frame(variant_dir, age_structure_year)
        for age in sorted(age_frame['age'].unique()):
            rows.append(
                {
                    'dataset': 'proj2_age_structure_median_age',
                    'xd': int(age),
                    'b': label,
                    'y': float(age_frame.loc[age_frame['age'] == age, 'value'].sum()),
                }
            )

    # Add the baseline 2024 structure once.
    baseline_frame = read_london_year_frame('variant=ppt13', 2024)
    for age in sorted(baseline_frame['age'].unique()):
        rows.append(
            {
                'dataset': 'proj2_age_structure_median_age',
                'xd': int(age),
                'b': '2024 structure',
                'y': float(baseline_frame.loc[baseline_frame['age'] == age, 'value'].sum()),
            }
        )

    for label, yearly_totals in totals_by_variant.items():
        for index in range(1, len(yearly_totals)):
            year, total = yearly_totals[index]
            previous_total = yearly_totals[index - 1][1]
            rows.append(
                {
                    'dataset': 'proj2_annual_population_change',
                    'xd': f'{year:04d}-01-01',
                    'b': label,
                    'y': total - previous_total,
                }
            )

    return rows


def main() -> None:
    rows = build_rows()
    OUTPUT.write_text(json.dumps(rows, indent=2))
    print(f'wrote {OUTPUT} ({len(rows)} rows)')


if __name__ == '__main__':
    main()