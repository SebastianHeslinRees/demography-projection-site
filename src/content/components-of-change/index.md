---
title: Trend-based components
description: Births, deaths and migration
section: Demography
navLabel: Trend-based components
---

<script>
import Chart from "$lib/components/charts/Chart.svelte";
</script>

### Background
Changes to the size of the total population occur through three mechanisms – often referred to as components of change – these are births, deaths, and migration.   

Natural change, which is the difference between the number of births and deaths, is higher for London than for the rest of the country and has been the largest direct contributor to London's population growth over recent decades.  

London experiences very high levels of population turnover through migration, with the sum of annual international and domestic flows in to and out of the capital estimated to exceed one million persons in some years. Large net inflows from overseas are typically balanced by similarly sized net domestic outflows, resulting in comparatively small overall net flows. 

While the headline numbers may suggest that migration makes only a relatively modest contribution to London’s population growth, it is the scale and differences in the characteristics of flows to and from London – with net inflows of young adults and net outflows of every other age group – that give rise to its comparatively youthful population and, in turn, its high levels of natural change. 

| Projection | Variant | Year | Births | Deaths | Net migration | Natural change | Total change |
| --- | --- | --- | --- | --- | --- | --- | --- |
| trend-based | estimate | 2011-12 | 134,000 | 48,000 | +27,350 | +86,000 | +113,00 |
| trend-based | estimate | 2023-24 | 106,000 | 51,000 | +19,000 | +55,000 | +74,000 |
| trend-based | low | 2035-36 | 96,000  | 64,000 | -3,000 | +32,000 | +29,000 |
| trend-based | low | 2050-51 | 95,000  | 76,000 | -21,000 | +19,000 | -2,000 |
| trend-based | central | 2035-36 | 108,000 | 63,000 | -3,000 | +45,000 | +42,000 |
| trend-based | central | 2050-51 | 108,000 | 72,000 | -22,000 | +36,000 | +13,000 |
| trend-based | high | 2035-36 | 121,000 | 61,000 | -3,000 | +60,000 | +57,000 |
| trend-based | high | 2050-51 | 122,000 | 67,000 | -23,000 | +55,000 | +32,000 |

### Migration

Projected migration rates and flows used in the core variants are based on the periods: 
- Central: 2011-12 to 2023-24 (13 years) 
- Low: 2014-15 to 2023-24 (10 years) 
- High: 2009-10 to 2023-24 (15 years) 

These result in a range of total net migration at the start of the projection period of  
- -5k (low)  
- +2k (central) 
- +7k (high) 

These totals are comprised of net international flows of: 
- +115k (low) 
- +109 (central) 
- +106k (high) 

And net internal flows of: 
- -119k (low) 
- -107k (central) 
- -100k (high) 

While international flows remain fixed, projected net internal flows vary as the populations within and outside of London change. In the case of London, net internal outflows tend to increase over time as the city grows, reaching: 
- -135k (low) 
- -130k (central) 
- -129k (high) 

By the end of the projection period total net outflows reach –20k to –23k, and the order of the total net outflows is reversed, with the high variant now having the largest outflow and the low having the smallest.

<!-- ### 3.1 Total migration -->

<Chart
 chart="Chart"
 title="Total net migration, London"
 subtitle="Net migration (thousands)"
 dataset="total_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### 3.2 International migration -->

<Chart
 chart="Chart"
 title="International net migration, London"
 subtitle="Net international migration (thousands)"
 dataset="international_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

<!-- ### 3.3 Internal migration -->

<Chart
 chart="Chart"
 title="Domestic net migration, London"
 subtitle="Net domestic migration (thousands)"
 dataset="domestic_net_migration"
 byline="GLA City Intelligence"
 source="GLA 2024-based population projections"
 />

### Births, deaths & natural change

Despite mortality rates falling over time in each of the core variants, numbers of annual deaths rise steadily as the population ages, from 51k in 2024 to: 
- 75k (low) 
- 71k (central) 
- 66k (high) 

Projected births are likewise affected by changes in the number of potential mothers in the population, though in this case the differences between variants is more clearly driven by the fertility rate scenarios, which quickly diverge over the first five years of the projection period. By 2032, annual births a projected to have changed from 106k in 2024 to: 
- 94k (low) 
- 106k (central) 
- 119k (high) 

Fertility rates remain constant after this point and further changes in numbers of births reflect changes in population.    

Across the core variants, projected annual births in London reach a maximum of 126k in 2045 – still substantially below the peak of 134k in 2012. The previous peak in births also marked the high point of natural change at over 86k per year.   

Starting from a value of 55k in 2024, the three core variants span a wide range of projected natural change by the end of the projection period: 
- 23k (low) 
- 39k (central) 
- 58k (high) 

<!-- ### 3.4 Births -->

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

