---
title: Development capacity
description: Borough-level static choropleth maps of 10-year total capacity by input dataset
section: Demography
navLabel: Development capacity
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
</script>

## Development capacity

These maps show borough-level totals from the 10-year capacity for various dwelling development datasets.

Boroughs without a value in the source file are displayed as 0.

<Chart
 chart="Chart"
 title="Large sites"
 subtitle="10-year total capacity by borough. Source dataset: large_sites_lsoa"
 dataset="large_sites_lsoa"
 byline="GLA City Intelligence"
 source="combined_lad_10Y_total_capacity_for_mapping.csv"
 />

<Chart
 chart="Chart"
 title="Industrial additional release"
 subtitle="10-year total capacity by borough. Source dataset: lsoa_industrial_additionalrelease10y"
 dataset="lsoa_industrial_additionalrelease10y"
 byline="GLA City Intelligence"
 source="combined_lad_10Y_total_capacity_for_mapping.csv"
 />

<Chart
 chart="Chart"
 title="Phased longer-term Green Belt"
 subtitle="10-year total capacity by borough. Source dataset: phased_lsoa_longertermgb"
 dataset="phased_lsoa_longertermgb"
 byline="GLA City Intelligence"
 source="combined_lad_10Y_total_capacity_for_mapping.csv"
 />

<Chart
 chart="Chart"
 title="Small sites"
 subtitle="10-year total capacity by borough. Source dataset: small_sites_lsoa"
 dataset="small_sites_lsoa"
 byline="GLA City Intelligence"
 source="combined_lad_10Y_total_capacity_for_mapping.csv"
 />
