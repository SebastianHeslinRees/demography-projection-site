---
title: Housing-led projection vs Trend projections
description: Compare housing-led and trend-based projections
section: Demography
navLabel: Housing-led projection vs Trend projections
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
    import HousingLedVsTrendBoroughDifferenceChoropleth from "$lib/components/charts/HousingLedVsTrendBoroughDifferenceChoropleth.svelte";
    import YearSlider from "$lib/components/charts/YearSlider.svelte";

    let selectedYear = $state(2051);
</script>

## Total population

The housing-led projections show higher projected overall growth for London than do the equivalent trend-based versions. For the High variants, the difference in population by 2051 is 280k. 

The size of the impact is dependent on the assumptions made about the relative levels of housing delivery within and outside London used in the projections. 

In all scenarios, housing delivery within London is assumed to be in line with the capacity identified in the 2026 Strategic Housing Land Availability Assessment - 56k per year over the period 2026-27 to 2035-36.  Given that delivery in a single year has not exceeded 41k at any point in the last 20 years, and that annual growth in London has slowed over the last decade, it seems reasonable that projected growth in the Central and High housing-led variants would be higher than in the equivalent trend-based outputs. 

*Note: The assumptions about future housing development outside of London used in these projections are not based on analysis of capacity or judgment about the likelihood of any specific area delivering housing in line with assessed need. The NPPF Standard Method is used only as a mechanism for setting relative levels within the model. Scenarios were chosen on the basis that they reflected housing delivery in London being nominally in line with/above/below that of the wider region. These housing scenarios are used together with the scenarios of fertility, mortality, etc, primarily as a means to differentiate the Low/Central/High projection variants.*

Total population (million)
| Variant 		| 2011 	| 2024 	| 2036	| 2051 	|
|  --- 			| --- 	| --- 	| --- 	| --- 	|
| trend-based low 	| 8.20 	| 9.13	| 9.52	| 9.76	| 
| trend-based central 	| 8.20 	| 9.13	| 9.67	| 10.11	| 
| trend-based high 	| 8.20 	| 9.13	| 9.82	| 10.49	|
| housing-led low 	| 8.20 	| 9.13	| 9.51	| 9.82 	|
| housing-led central 	| 8.20 	| 9.13	| 9.69	| 10.26	|
| housing-led high 	| 8.20 	| 9.13 	| 9.88	| 10.77	|

<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_total_population"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

Change in total population from 2024
| Variant 		|   2036		| 2051 		|
|  --- 			|   --- 		| --- 		|
| trend-based low 	|   +390k (4.2%)	| +630k (6.9%)	|
| trend-based central	|   +540k (5.9%)	| +970k (10.7%)	|
| trend-based high 	|   +690k (7.5%)	| +1.36m (14.9%)|
| housing-led low 	|   +380k (4.2%)	| +680k (7.5%)	|
| housing-led central 	|   +560k (6.2%)	| +1.13m (12.4%)|
| housing-led high 	|   +740k (8.2%)	| +1.64m (17.9%)|

<Chart
 chart="Chart"
 title="Annual population change, London"
 subtitle="Year-on-year population change (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_annual_population_change"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

## Population by age group

<Chart
 chart="Chart"
 title="Working age population, London"
 subtitle="Population aged 16 to 64 (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_working_age_population"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

<Chart
 chart="Chart"
 title="Primary school age children, London"
 subtitle="Population aged 5 to 10 (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_primary_school_age_children"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

<Chart
 chart="Chart"
 title="Secondary school age children, London"
 subtitle="Population aged 11 to 15 (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_secondary_school_age_children"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

<Chart
 chart="Chart"
 title="Population age 65 and over, London"
 subtitle="Population aged 65 and over (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_population_age_65_plus"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

## Borough percentage difference in the central projection

The most significant impact of including housing data in the projections is on the spatial distribution of growth across London.

This map shows the percentage difference between the Central housing-led and trend projections for each borough in a selected year. It provides and indication of the impact that the inclusion of housing development data has on projected population.

For areas such where the capacity identified in the SHLAA is large relative to recent population trends, the housing-led model naturally results in far higher projected population than does the trend-based approach, the largest differences by 2051 are:
* City of London +21 percent higher
* Ealing 14 percent higher
* Greenwich 14 percent higher   

In areas where less capacity is identified, and especially where the population is ageing, housing-led projections tend to be lower:
* Sutton 10 percent lower
* Richmond upon Thames 9 percent lower
* Bexley 8 percent lower

<HousingLedVsTrendBoroughDifferenceChoropleth
  {selectedYear}
  title="Percentage difference in population of each borough"
  dataset="housing_led_vs_trend_central_borough_difference"
  byline="GLA City Intelligence"
  source="Housing-led and trend-based projections">
    {#snippet controls()}
        <YearSlider baseYear={2024} bind:selectedYear />
    {/snippet}
</HousingLedVsTrendBoroughDifferenceChoropleth>
