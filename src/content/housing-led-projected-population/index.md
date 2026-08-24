---
title: Housing-led projected population
description: Total population projections under the London Plan housing-led variants
section: Demography
navLabel: Housing-led projected population
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
    import PopulationChangeWardChoropleth from "$lib/components/charts/PopulationChangeWardChoropleth.svelte";
    import YearSlider from "$lib/components/charts/YearSlider.svelte";

    let selectedYear = $state(2051);
</script>

## Total population

<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_total_population"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

The chart shows London total population from the housing-led variants supplied in the local HL output files. Each line represents one of the three variants: central, high and low.

## Population change

<Chart
 chart="Chart"
 title="Annual population change, London"
 subtitle="Year-on-year population change (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_annual_population_change"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

## Age structure

<Chart
 chart="Chart"
 title="Age structure, London"
 subtitle="Population by single year of age (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_age_structure_median_age"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

## Population by age group

<Chart
 chart="Chart"
 title="Working age population, London"
 subtitle="Population aged 16 to 64 (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_working_age_population"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

<Chart
 chart="Chart"
 title="Primary school age children, London"
 subtitle="Population aged 5 to 10 (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_primary_school_age_children"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

<Chart
 chart="Chart"
 title="Secondary school age children, London"
 subtitle="Population aged 11 to 15 (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_secondary_school_age_children"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

<Chart
 chart="Chart"
 title="Population age 65 and over, London"
 subtitle="Population aged 65 and over (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_population_age_65_plus"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

## Ward-level percentage change

<PopulationChangeWardChoropleth
  {selectedYear}
  dataset="housing_led_ward_population"
  title="Percentage change in population of each ward"
  byline="GLA City Intelligence"
  source="GLA 2024-based London Plan housing-led projections">
    {#snippet controls()}
        <YearSlider baseYear={2011} bind:selectedYear />
    {/snippet}
</PopulationChangeWardChoropleth>
