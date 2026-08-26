---
title: Housing-led components
description: Housing-led births, deaths, migration and fertility components used to interpret projected population change
section: Demography
navLabel: Housing-led components
---

<script>
import Chart from "$lib/components/charts/Chart.svelte";
</script>

London’s projected population changes reflect the combined effect of births, deaths and migration.

## Migration

Housing-led migration flows follow the same structural logic as the trend-based components: inflows and outflows are translated into net migration totals for London. The housing-led approach produces a different overall profile for future migration across the Low, Central and High variants, reflecting the population growth pathway implied by the housing supply scenario.

### Total net migration

<Chart
 chart="Chart"
 title="Total net migration, London"
 subtitle="Net migration (thousands)"
 dataset="housing_led_net_migration"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

### International & domestic net migration

<Chart
 chart="Chart"
 title="International net migration, London"
 subtitle="Net international migration (thousands)"
 dataset="housing_led_in_migration"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Domestic net migration, London"
 subtitle="Net domestic migration (thousands)"
 dataset="housing_led_out_migration"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

## Births, deaths & natural change

Projected births and deaths continue to be central to the housing-led demographic story. Annual births and deaths are driven by the projected age structure and the age-specific fertility and mortality assumptions in the model, while the population trajectory affects the scale of those flows over time. The Low, Central and High lines illustrate the range of possible demographic outcomes under the housing-led scenario.

<Chart
 chart="Chart"
 title="Births, London"
 subtitle="Annual births (thousands)"
 dataset="housing_led_births"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Deaths, London"
 subtitle="Annual deaths (thousands)"
 dataset="housing_led_deaths"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Natural change, London"
 subtitle="Births minus deaths (thousands)"
 dataset="housing_led_natural_change"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

## Fertility and age-specific fertility rates

The age-specific fertility rate (ASFR) profile and total fertility rate (TFR) determine how many births arise from the projected female population by age. The Low, Central and High housing-led variants capture the range of fertility outcomes in the scenario.

<Chart
 chart="Chart"
 title="Total fertility rate, London"
 subtitle="Total fertility rate"
 dataset="housing_led_tfr"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Age-specific fertility rate, London"
 subtitle="Age-specific fertility rate"
 dataset="housing_led_asfr"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Births by mother's age, London"
 subtitle="Births by mother's age"
 dataset="housing_led_births_by_mothers_age"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />
