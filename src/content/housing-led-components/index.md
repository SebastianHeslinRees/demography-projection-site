---
title: Housing-led components
description: Housing-led births, deaths, migration and fertility components used to interpret projected population change
section: Demography
navLabel: Housing-led components
---

<script>
import Chart from "$lib/components/charts/Chart.svelte";
import YearSlider from "$lib/components/charts/YearSlider.svelte";
import fertilityAgeData from "$lib/data/HousingLedFertilityAgeData.json" with { type: "json" };

let selectedYear = $state(2025);

const smoothAgeSeries = (series) => {
  const sorted = [...series].sort((a, b) => a.xd - b.xd);

  return sorted.map((row, index) => {
    const start = Math.max(0, index - 2);
    const end = Math.min(sorted.length - 1, index + 2);
    let weightedTotal = 0;
    let weightTotal = 0;

    for (let i = start; i <= end; i += 1) {
      const weight = Math.abs(i - index) === 2 ? 1 : Math.abs(i - index) === 1 ? 2 : 3;
      weightedTotal += sorted[i].y * weight;
      weightTotal += weight;
    }

    return { ...row, y: weightedTotal / weightTotal };
  });
};

const filteredFertilityData = (dataset) => {
  const bySeries = new Map();
  // range input values arrive as strings, so compare years numerically
  const year = Number(selectedYear);

  fertilityAgeData
    .filter((row) => row.dataset === dataset && Number(row.year) === year)
    .forEach((row) => {
      if (!bySeries.has(row.b)) bySeries.set(row.b, []);
      bySeries.get(row.b).push(row);
    });

  return [...bySeries.entries()].flatMap(([seriesName, rows]) =>
    smoothAgeSeries(rows).map((row) => ({ ...row, b: seriesName }))
  );
};
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

### Migration inflows & outflows

<Chart
 chart="Chart"
 title="Migration inflows, London"
 subtitle="In-migration (thousands)"
 dataset="housing_led_in_migration"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 title="Migration outflows, London"
 subtitle="Out-migration (thousands)"
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
 dataset="housing_led_tfr"
 title="Total fertility rate, London"
 subtitle="Total fertility rate"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<YearSlider bind:selectedYear label="Year" />

<Chart
 chart="Chart"
 dataset="housing_led_asfr_age"
 title="Age-specific fertility rate, London"
 subtitle="Age-specific fertility rate by mother's age, selected year"
 data={filteredFertilityData("housing_led_asfr_age")}
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

<Chart
 chart="Chart"
 dataset="housing_led_births_by_mothers_age_age"
 title="Births by mother's age, London"
 subtitle="Births by mother's age, selected year"
 data={filteredFertilityData("housing_led_births_by_mothers_age_age")}
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />
