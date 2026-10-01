---
title: Housing-led population
description: Housing-led population projections
section: Demography
navLabel: Housing-led population
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
    import PopulationChangeWardChoropleth from "$lib/components/charts/PopulationChangeWardChoropleth.svelte";
    import YearSlider from "$lib/components/charts/YearSlider.svelte";

    let selectedYear = $state(2051);
</script>

## Total population

Over the period 2024 to 2051 the total population of London is projected to grow from **9.13 million** to between **9.82 million** and **10.77 million**, with a Central projection of **10.26 million**.

| Variant 		| 2011 	| 2024 	| 2036	| 2051 	|
|  --- 			| --- 	| --- 	| --- 	| --- 	|
| housing-led low 	| 8.20 	| 9.13	| 9.51	| 9.82 	|
| housing-led central 	| 8.20 	| 9.13	| 9.69	| 10.26	|
| housing-led high 	| 8.20 	| 9.13 	| 9.88	| 10.77	|


<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_total_population"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

This is total growth over the period of **680 thousand** to **1.64 million** (Central: **1.13 million**).

 Variant 		|   2036		| 2051 		|
|  --- 			|   --- 		| --- 		|
| housing-led low 	|   +380k (4.2%)	| +680k (7.5%)	|
| housing-led central 	|   +560k (6.2%)	| +1.13m (12.4%)|
| housing-led high 	|   +740k (8.2%)	| +1.64m (17.9%)|


<Chart
 chart="Chart"
 title="Annual population change, London"
 subtitle="Year-on-year population change (persons), London Plan central, high and low housing-led variants"
 dataset="housing_led_annual_population_change"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

## Population by age

In all variants, the population is projected to grow strongly at older ages, with the number of persons aged 65 and over projected to rise from **1.12 million** to between **1.70 million** (+52 percent) and **1.86 million** (+66 percent), with a Central figure of **1.78 million** (+58 percent). 

Projected growth of the population aged 18 to 64 ranges from **480 thousand** (+8 percent) and **830 thousand** (13 percent) (Central: **630 thousand**, 10 percent).

In all variants, the number of children age 0 to 17 is projected to fall over the first decade from an estimated **1.86 million** in 2024. By the end of the period, the projected number ranges from **1.47 million** (-20 percent) to **1.93 million** (+4 percent) (Central: **1.70 million**, -8 percent).

The median age of London's population in 2024 was **34.9 years**. This is projected to rise to **38.4 years** (High), **39.1** years (Central), and **39.5 years** (Low). 

<Chart
 chart="Chart"
 title="Age structure, London"
 subtitle="Population by single year of age (persons): 2024 structure and 2046 variant projections"
 dataset="housing_led_age_structure_median_age"
 byline="GLA City Intelligence"
 source="Housing-led projections derived from the provided HL output"
 />

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
