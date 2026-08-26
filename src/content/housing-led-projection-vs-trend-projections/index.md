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

<Chart
 chart="Chart"
 title="Projected total population, London"
 subtitle="Total population (persons), trend low, central and high vs housing-led low, central and high"
 dataset="housing_led_vs_trend_total_population"
 byline="GLA City Intelligence"
 source="Housing-led and trend-based projections"
 />

## Population change

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

This map shows the percentage difference between the central housing-led and trend projections for each borough in a selected year. For example, in 2051, Havering is projected have 13% more population under the housing-led projection than under the trend projection.

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
