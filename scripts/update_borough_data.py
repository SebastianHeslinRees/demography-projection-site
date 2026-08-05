import pandas as pd
import json
import os
import glob

mapping = {
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
    "E09000033": "Westminster"
}

base_path = "/Users/user1/Downloads/output_pq/variant=2024_ppt_10yr_26-05-28_2006"
output_data = []

# Filter for year folders
year_folders = glob.glob(os.path.join(base_path, "year=*"))
year_folders.sort()

for folder in year_folders:
    year = folder.split("=")[-1]
    parquet_file = os.path.join(folder, "component=population", "part-0.parquet")
    
    if os.path.exists(parquet_file):
        print(f"Processing year {year}...")
        df = pd.read_parquet(parquet_file)
        # Filter for London boroughs
        london_df = df[df['gss_code'].isin(mapping.keys())]
        # Group by gss_code and sum value
        summarized = london_df.groupby('gss_code')['value'].sum().reset_index()
        
        for _, row in summarized.iterrows():
            output_data.append({
                "dataset": "borough_population",
                "xd": mapping[row['gss_code']],
                "b": year,
                "y": int(row['value'])
            })

output_file = "/Users/user1/app-analysis-population-projections/web/src/lib/data/boroughPopulationData.json"
with open(output_file, 'w') as f:
    json.dump(output_data, f)

print(f"Successfully wrote {len(output_data)} records to {output_file}")
