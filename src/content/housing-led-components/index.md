---
title: Housing-led components
description: Housing-led births, deaths, migration and fertility
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

### Background

Changes to the size of the total population occur through three mechanisms – often referred to as components of change – these are births, deaths, and migration.   

Natural change, which is the difference between the number of births and deaths, is higher for London than for the rest of the country and has been the largest direct contributor to London's population growth over recent decades.  

London experiences very high levels of population turnover through migration, with the sum of annual international and domestic flows in to and out of the capital estimated to exceed one million persons in some years. Large net inflows from overseas are typically balanced by similarly sized net domestic outflows, resulting in comparatively small overall net flows. 

While the headline numbers may suggest that migration makes only a relatively modest contribution to London’s population growth, it is the scale and differences in the characteristics of flows to and from London – with net inflows of young adults and net outflows of every other age group – that give rise to its comparatively youthful population and, in turn, its high levels of natural change. 

### Migration

Projected migration rates and flows used in the core variants are based on the periods: 
- Central: 2011-12 to 2023-24 (13 years) 
- Low: 2014-15 to 2023-24 (10 years) 
- High: 2009-10 to 2023-24 (15 years) 

These result in a range of total net migration at the start of the projection period of  
- -4k (low)  
- +2k (central) 
- +4k (high) 

By 2051, these fall to
- -17k (low)
- -16k (central)
- -12k (high)

Migration is not broken down by international/internal in the housing-led projections

<Chart
 chart="Chart"
 title="Total net migration, London"
 subtitle="Net migration (thousands)"
 dataset="housing_led_net_migration"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

### Births, deaths & natural change

Early differences in projected births between variants are primarily driven by diverging fertility rates. By 2032, annual births are projected to change from 106k in 2024 to:
- 92k (low) 
- 104k (central) 
- 116k (high) 

Fertility rates remain constant after this point and subsequent rises in annual births reflect growth in number of potential mothers in the population. Even in the high scenario, annual births do not regain their 2012 peak of 134k, peaking at 126k in 2045.

<Chart
 chart="Chart"
 title="Births, London"
 subtitle="Annual births (thousands)"
 dataset="housing_led_births"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

Despite mortality rates falling over time in each of the core variants, numbers of annual deaths rise steadily as the population ages, from 51k in 2024 to: 
- 75k (low) 
- 72k (central) 
- 67k (high) 

<Chart
 chart="Chart"
 title="Deaths, London"
 subtitle="Annual deaths (thousands)"
 dataset="housing_led_deaths"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

Starting from a value of 55k in 2024, the three core variants span a wide range of projected natural change by the end of the projection period: 
- 23k (low) 
- 39k (central) 
- 58k (high) 

<Chart
 chart="Chart"
 title="Natural change, London"
 subtitle="Births minus deaths (thousands)"
 dataset="housing_led_natural_change"
 byline="GLA City Intelligence"
 source="Housing-led population projections"
 />

### Fertility rates and births by age of mother

Age-specific fertility rates (ASFR) describe the average number of births per woman. The rates used in the model are projected forward from past data and then held constant from 2032 onwards (rates for London as a whole continue to change after this point as the size of populations within it change).   

Total fertility rate (TFR) is a commonly used statistic that summarises the overall level of fertility within a population. It is defined as the average number of children that a woman would have during her lifetime if she experienced the current age-specific fertility rates throughout her reproductive years.

London's TFR last peaked at around 1.9 in 2008.  Fertility rates have been falling since, with London's TFR estimated to be under 1.4 at the start of the projection period.  By 2032, TFRs for London are assumed to be:
- 1.1 (low)
- 1.3 (central)
- 1.4 (high)

The combined effect of changes in fertility rates and potential mothers in the population can be seen in the numbers of births by mother's age.

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
