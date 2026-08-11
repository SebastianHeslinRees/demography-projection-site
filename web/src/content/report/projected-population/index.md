---
title: Projected population
description: Total population and age-related projected trends under the 2022-based variants.
section: Demography
navLabel: Projected population
---

<script>
import Chart from "$lib/components/charts/Chart.svelte";
import Choropleth_interactive from "$lib/components/charts/Choropleth_interactive.svelte";
import WardChoropleth from "$lib/components/charts/WardChoropleth.svelte";
</script>


## 2 Projected population

### 2.1 Total population

<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_total_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

**Projected total population, London** (population, millions)

| Variant | 2012 | 2017 | 2022 | 2027 | 2032 | 2037 | 2042 | 2047 |
|---|---|---|---|---|---|---|---|---|
| 5-year trend | 8.32 | 8.78 | 8.87 | 9.08 | 9.18 | 9.31 | 9.44 | 9.51 |
| 10-year trend | 8.32 | 8.78 | 8.87 | 9.12 | 9.26 | 9.42 | 9.56 | 9.66 |
| 15-year trend | 8.32 | 8.78 | 8.87 | 9.16 | 9.37 | 9.59 | 9.78 | 9.91 |
| 20-year trend | 8.32 | 8.78 | 8.87 | 9.17 | 9.39 | 9.61 | 9.81 | 9.95 |

### 2.2 Annual population change

<Chart
 chart="Chart"
 title="Annual population change, London"
 subtitle="Year-on-year population change (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_annual_population_change"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.3 Age structure

<Chart
 chart="Chart"
 title="Population age structure, London"
 subtitle="Population by single year of age (persons): 2022 structure and 2046 variant projections"
 dataset="proj_age_structure_median_age"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.4 Working age population

<Chart
 chart="Chart"
 title="Working age population, London"
 subtitle="Population aged 16 to 64 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_working_age_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.5 Primary school age children

<Chart
 chart="Chart"
 title="Primary school age children, London"
 subtitle="Population aged 5 to 10 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_primary_school_age_children"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.6 Secondary school age children

<Chart
 chart="Chart"
 title="Secondary school age children, London"
 subtitle="Population aged 11 to 15 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_secondary_school_age_children"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.7 Population age 65 and over

<Chart
 chart="Chart"
 title="Population age 65 and over, London"
 subtitle="Population aged 65 and over (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_population_age_65_plus"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### 2.8 Borough-level population projections

<Choropleth_interactive
 chart="Choropleth_interactive"
 title="Projected population change by borough"
 subtitle="Percentage change in population, 2024 to year selected"
 dataset="borough_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<WardChoropleth
 chart="WardChoropleth"
 title="Projected population change by ward"
 subtitle="Percentage change in population, 2024 to selected year, central variant AHS60"
 dataset="ward_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections (central variant)"
 />

London's population is projected to grow from 8.87 million in 2022 to between 9.50 million (5-year trend) and 9.89 million (15-year trend) by 2046, with the 10-year trend projection at 9.65 million.
