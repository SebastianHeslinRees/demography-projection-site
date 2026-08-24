---
title: Projection population 2
description: Total population and age-related projected trends using output_pq trend data
section: Demography
navLabel: Projection population 2
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
    import PopulationChangeBoroughChoropleth from "$lib/components/charts/PopulationChangeBoroughChoropleth.svelte";
    import YearSlider from "$lib/components/charts/YearSlider.svelte";

    let selectedYear = $state(2051);
</script>

## Total population

<Chart
 chart="Chart"
 title="Projected total population, London (Projection population 2)"
 subtitle="Total population (persons), low, central and high variants"
 dataset="proj2_total_population"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

## Population change

<Chart
 chart="Chart"
 title="Annual population change, London (Projection population 2)"
 subtitle="Year-on-year population change (persons), low, central and high variants"
 dataset="proj2_annual_population_change"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

## Age structure

<Chart
 chart="Chart"
 title="Population age structure, London (Projection population 2)"
 subtitle="Population by single year of age (persons): 2022 structure and 2046 variant projections"
 dataset="proj2_age_structure_median_age"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

## Population by age group

<Chart
 chart="Chart"
 title="Working age population, London (Projection population 2)"
 subtitle="Population aged 16 to 64 (persons), low, central and high variants"
 dataset="proj2_working_age_population"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

<Chart
 chart="Chart"
 title="Primary school age children, London (Projection population 2)"
 subtitle="Population aged 5 to 10 (persons), low, central and high variants"
 dataset="proj2_primary_school_age_children"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

<Chart
 chart="Chart"
 title="Secondary school age children, London (Projection population 2)"
 subtitle="Population aged 11 to 15 (persons), low, central and high variants"
 dataset="proj2_secondary_school_age_children"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

<Chart
 chart="Chart"
 title="Population age 65 and over, London (Projection population 2)"
 subtitle="Population aged 65 and over (persons), low, central and high variants"
 dataset="proj2_population_age_65_plus"
 byline="GLA City Intelligence"
 source="Trend output_pq projection data"
 />

## Geography detail

<PopulationChangeBoroughChoropleth
  {selectedYear}
  title="Percentage change in population of each borough"
  dataset="borough_population"
  byline="GLA City Intelligence"
  source="Trend output_pq projection data">
    {#snippet controls()}
        <YearSlider baseYear={2024} bind:selectedYear />
    {/snippet}
</PopulationChangeBoroughChoropleth>
