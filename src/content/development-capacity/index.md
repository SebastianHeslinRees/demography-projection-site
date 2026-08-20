---
title: Development capacity
description: Borough-level static choropleth maps of 10-year total capacity by input dataset
section: Demography
navLabel: Development capacity
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
</script>

## Development capacity

These maps show borough-level totals from the 10-year capacity for various dwelling development datasets.

***Note:* housing assumptions used in the projections for geographies below local authority level are not publicly available.*

Boroughs without a value in the source file are displayed as 0.

<Chart
 chart="Chart"
 title="Large Sites"
 dataset="large_sites_lsoa"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

<Chart
 chart="Chart"
 title="Industrial Sites"
 dataset="lsoa_industrial_additionalrelease10y"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

<Chart
 chart="Chart"
 title="Green Belts"
 dataset="phased_lsoa_longertermgb"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

<Chart
 chart="Chart"
 title="Small Sites"
 dataset="small_sites_lsoa"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

## Cumulative London totals by dataset

This line chart shows the cumulative total development capacity for London across the four datasets.

<Chart
 chart="Chart"
 title="Cumulative London development capacity by year"
 dataset="development_capacity_cumulative_london"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />
