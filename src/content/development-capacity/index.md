---
title: Housing development
description: Housing capacity by component
section: Demography
navLabel: Housing development
---

<script>
    import Chart from "$lib/components/charts/Chart.svelte";
</script>

## Housing development

The housing-led projections incorporate development assumptions derived from the [2026 London Strategic Housing Land Availability Assessment (SHLAA)](https://www.london.gov.uk/media/113854/download?attachment). 

These maps show total 10-year capacity by local authority for each of the components identified in the SHLAA.

## Large sites
This comprises the total capacity from large development sites (>0.25 hectares) which are assessed as developable through the SHLAA process. For further details see Chapter 7 of the SHLAA report.

<Chart
 chart="Chart"
 title="Large Sites"
 dataset="large_sites_lsoa"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

## Industrial sites
This comprises the potential capacity for additional industrial release to contribute towards housing delivery. These figures are indicated as potential additional capacity which could be delivered within the 10-year period of the London Plan housing targets, in addition to already defined proposals on industrial land counted as part of the large sites component.

<Chart
 chart="Chart"
 title="Industrial Sites"
 dataset="lsoa_industrial_additionalrelease10y"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

## Green Belt
An indicative housing capacity has been identified in several boroughs through consideration of limited release of Green Belt in sustainable locations. This is detailed in Chapter 13 of the SHLAA report.

<Chart
 chart="Chart"
 title="Green Belt"
 dataset="phased_lsoa_longertermgb"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

## Small sites
This component of supply represents the contribution from small sites modelled based on an uplift in rates beyond historic windfall to account for the anticipated effects of policy interventions. The background to this is set out in Chapter 8 and 9 of the SHLAA report. 

<Chart
 chart="Chart"
 title="Small Sites"
 dataset="small_sites_lsoa"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />

## Cumulative London totals by component

This line chart shows the cumulative total development capacity for London across the four components.

<Chart
 chart="Chart"
 title="Cumulative London development capacity by year"
 dataset="development_capacity_cumulative_london"
 dataDownloadButton={false}
 imageDownloadButton={false}
 />
