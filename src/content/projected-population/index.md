---
title: Projected population
description: Projected population trend-based projections
section: Demography
navLabel: Projected population
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";

    import PopulationChangeBoroughChoropleth from "$lib/components/charts/PopulationChangeBoroughChoropleth.svelte";
    import PopulationChangeWardChoropleth from "$lib/components/charts/PopulationChangeWardChoropleth.svelte";
    import YearSlider from "$lib/components/charts/YearSlider.svelte";

    let selectedYear = $state(2051);
</script>

## Total population

Over the period 2024 to 2051 the total population of London is projected to grow from 9.13 million to between 9.76 and 10.49 million, with the central projection giving a population of 10.11 million. 

**Projected total population, London** (population, millions)

| Variant 		| 2011 	| 2024 	| 2036	| 2051 	|
|  --- 			| --- 	| --- 	| --- 	| --- 	|
| trend-based low 	| 8.20 	| 9.13	| 9.52	| 9.76	| 
| trend-based central 	| 8.20 	| 9.13	| 9.67	| 10.11	| 
| trend-based high 	| 8.20 	| 9.13	| 9.82	| 10.49	|


<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_total_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

This is total growth over the period of 630 thousand to 1.36 million (Central: 970 thousand). 

**Projected population change from 2024, London**

| Variant 		|   2036		| 2051 		|
|  --- 			|   --- 		| --- 		|
| trend-based low 	|   +390k (4.2%)	| +630k (6.9%)	|
| trend-based central	|   +540k (5.9%)	| +970k (10.7%)	|
| trend-based high 	|   +690k (7.5%)	| +1.36m (14.9%)|


<Chart
 chart="Chart"
 title="Annual population change, London"
 subtitle="Year-on-year population change (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_annual_population_change"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

## Population by age

In all variants, the population is projected to grow strongly at older ages, with the number of persons aged 65 and over projected to rise from 1.12 million to between 1.74 and 1.84 million (central: 1.79 million). This is a change in the size of this group of between 56 and 65 percent (central: 60 percent) over the projection period. 

Projected growth of the population aged 18 to 64 ranges from 490 thousand (8 percent) and 720 thousand (12 percent) (central: 590 thousand (9.7 percent).

In all variants the number of children age 0 to 17 is projected to fall from an estimated 1.92 million in 2024 to between 1.50 million (-22 percent) and 1.90 million (0 percent) (central: 1.70 million (-11 percent).

London's median age in 2024 was estimated to be 34.9 years, 4.5 years younger than England as a whole (39.5 years). Over the course of the projection period, London's median age rises to 38.6 years (High), 39.2 years (Central), and 39.6 years (Low). However, England is projected age more than this, with gap widening to over five years (reaching 43.7 to 44.8 years).

<Chart
 chart="Chart"
 title="Population age structure, London"
 subtitle="Population by single year of age (persons): 2024 structure and 2046 variant projections"
 dataset="proj_age_structure_median_age"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### Working age population -->

<Chart
 chart="Chart"
 title="Working age population, London"
 subtitle="Population aged 16 to 64 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_working_age_population"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### Primary school age children -->

<Chart
 chart="Chart"
 title="Primary school age children, London"
 subtitle="Population aged 5 to 10 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_primary_school_age_children"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### Secondary school age children -->

<Chart
 chart="Chart"
 title="Secondary school age children, London"
 subtitle="Population aged 11 to 15 (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_secondary_school_age_children"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### Population age 65 and over -->

<Chart
 chart="Chart"
 title="Population age 65 and over, London"
 subtitle="Population aged 65 and over (persons), 5-year, 10-year and 15-year trend variants"
 dataset="proj_population_age_65_plus"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />


<PopulationChangeBoroughChoropleth 
  {selectedYear} 
  title="Percentage change in population of each borough"
  dataset="borough_population"
  byline="GLA City Intelligence"
  source="GLA 2024-based population projections">
    {#snippet controls()}
        <YearSlider baseYear={2024} bind:selectedYear />
    {/snippet}
</PopulationChangeBoroughChoropleth>

<PopulationChangeWardChoropleth 
  {selectedYear} 
  title="Percentage change in population of each ward"
  dataset="ward_population"
  byline="GLA City Intelligence"
  source="GLA 2024-based population projections">
    {#snippet controls()}
        <YearSlider baseYear={2024} bind:selectedYear />
    {/snippet}
</PopulationChangeWardChoropleth>

