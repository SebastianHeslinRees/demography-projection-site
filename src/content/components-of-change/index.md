---
title: Components of change
description: Births, deaths and migration components used to interpret projected population change
section: Demography
navLabel: Components of change
---

<script>
import Chart from "$lib/components/charts/Chart.svelte";
</script>



Births, deaths and migration all contribute to London's changing population. Natural change, which is the difference between the number of births and deaths, is the largest direct contributor to London's population growth. Natural change is comparatively high in London because its age structure is much younger than that of the rest of the UK meaning more births and fewer deaths.

As noted above, London's relatively youthful population is a result of established patterns of migration to and from the capital, which give rise to a net inflow of young adults and a net outflow of all other age groups.

## Migration

Historically, London has experienced very high levels of population turnover, with the sum of annual international and domestic flows in to and out of the capital estimated to have exceeded one million persons in some years. Large net inflows from overseas are typically balanced by similarly sized net domestic outflows, resulting in comparatively small overall net flows. Since 2002, total net migration has typically ranged between +/- 50 thousand persons per year. 2021 was a notable exception, with the impacts of the COVID-19 pandemic pushing net outflows to 100 thousand for the year.

Future annual international flows are modelled using simple averages of the estimated flows from previous years. Annual flows remain constant for the duration of the projection period.

Future internal migration flows are modelled by applying migration rates to the resident population.  Future rates are based on averages of past estimated rates and are held constant for the duration of the projections, but flows will change in line with changes to the population available to move.

The period of past data used to set future migration rates and flows differs between projection variants. To reflect the fact that these different flows are not independent of one another, the same length period is typically used for international inflows, international outflows, and internal rates.

The periods used in the core variants are selected to provide a reasonable range of overall future net migration. 

### Total net migration

<Chart
 chart="Chart"
 title="Total net migration, London"
 subtitle="Net migration (thousands)"
 dataset="total_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### International & domestic net migration

<Chart
 chart="Chart"
 title="International net migration, London"
 subtitle="Net international migration (thousands)"
 dataset="international_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />


<Chart
 chart="Chart"
 title="Domestic net migration, London"
 subtitle="Net domestic migration (thousands)"
 dataset="domestic_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

## Births, deaths & natural change

Births and deaths are projected by applying age-specific fertility and mortality rates to the population.  

Future fertility rates are produced by projecting forward past rates using a time-series model that provides a distribution of future outcomes. The central variant uses the median values of these projected rates up to 2030, after which they are held constant. The low and high variants use scenarios that cover a range of 50 percent of the distribution and are also held constant after 2030.

Projected births are a product of the number of women of childbearing age in the population and the assumed age specific fertility rates. The number of potential mothers rises over time in all of the core variants, however the impact of this on projected births is less significant than the assumed fertility rate scenario. Annual births in London are projected to fall to as low as 94 thousand in the low variant, down by over 10 thousand from 106 thousand in the year to mid-2024. While the high variant shows a strong increase in births, reaching a peak of 126 thousand - a rise of over 20 thousand from 2024 - this is still lower than the 2012 peak of 134 thousand.  For the central variant, assumed fertility rates stay broadly in line with current levels, resulting in steady births for the first decade of the projections, before beginning to rise in line with the growing population. 

Future mortality rates trends are taken from the ONS 2024-based National Population Projections for England, using the principal, high, and low life expectancy assumptions for the central, high, and low variants.  Rates for individual local authorities, wards, and MSOA areas are based on scaling the England level mortality rates to be consistent with overall deaths by sex over the preceding four years.

Mortality rates are assumed to improve over time in all of the core projection variants. However, because mortality rates increase with age, annual deaths are still projected to rise over the course of the projections as the population ages and the number of older Londoners grows. Annual deaths are projected to rise by 50 percent (25 thousand) in the low variant. Even in the high variant, which uses the most optimistic assumptions about future improvements in life expectancy, annual deaths are projected to increase by over ten thousand by the end of the projection period, due to the strong growth in the population aged 65 and older.

<Chart
 chart="Chart"
 title="Births, London"
 subtitle="Annual births (thousands)"
 dataset="births"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### 3.5 Deaths -->

<Chart
 chart="Chart"
 title="Deaths, London"
 subtitle="Annual deaths (thousands)"
 dataset="deaths"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### 3.6 Natural change -->

<Chart
 chart="Chart"
 title="Natural change, London"
 subtitle="Births minus deaths (thousands)"
 dataset="natural_change"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

