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

| Variant | Year | Total net migration | Natural change | Total change |
|  --- | --- | --- | --- | --- |
| estimate | 2011-12 | +27,000 | +86,000 | +113,00 |
| estimate | 2023-24 |  +19,000 | +55,000 | +74,000 |
| trend-based low | 2035-36 | -3,000 | +32,000 | +29,000 |
| trend-based low | 2050-51 | -21,000 | +19,000 | -2,000 |
| trend-based central | 2035-36 | -3,000 | +45,000 | +42,000 |
| trend-based central | 2050-51 | -22,000 | +36,000 | +13,000 |
| trend-based high | 2035-36 | -3,000 | +60,000 | +57,000 |
| trend-based high | 2050-51 | -23,000 | +55,000 | +32,000 |

### Migration

Projected migration rates and flows used in the core variants are based on the periods: 
- Central: 2011-12 to 2023-24 (13 years) 
- Low: 2014-15 to 2023-24 (10 years) 
- High: 2009-10 to 2023-24 (15 years) 

At the start of the projection, total net migration ranges from -5k (Low) to +2k (Central), and +7k (High).
These totals are comprised of:
- net international flows of +115k (Low), +109 (Central), and +106k (High)
- net internal flows of: -119k (Low), -107k (Central), and -100k (High) 

While international flows remain fixed over the projection period, internal migration varies as the populations within and outside of London change. Projected net outflows from London tend to increase over time as the city grows. By the end of the projection period, total net outflows are similar across the variants, ranging from –21k (Low) to –23k (High). 

 Variant | Year | Total net | International net | Internal net |
| --- | --- | --- | --- | --- | 
| estimate | 2011-12 | +27,000 | +78,000 | -50,000 |
| estimate | 2023-24 | +19,000 | +147,000 | -128,000 |
| trend-based low | 2035-36 |-3,000 | +115,000 | -117,000 |
| trend-based low | 2050-51 | -21,000 | +115,000 | -135,000 |
| trend-based central | 2035-36 | -3,000 | +109,000 | -112,000 |
| trend-based central | 2050-51 | -22,000 | +109,000 | -131,000 |
| trend-based high | 2035-36 | -3,000 | +106,000 | -110,000 |
| trend-based high | 2050-51 | -23,000 | +106,000 | -130,000 |

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

Early differences in projected births between variants are primarily driven by diverging fertility rates. By 2032, annual births are projected to change by: 
- Low -11k (-11 percent) 
- Central +1k (+1 percent)
- High +14k (+13 percent) 

Fertility rates remain constant after this point and subsequent rises in annual births reflect growth in number of potential mothers in the population. Even in the High scenario, annual births do not regain their 2012 peak of 134k, peaking at 126k in 2045.

Despite mortality rates falling over time in each of the core variants, annual deaths rise steadily as the population ages, from 51k in 2024 to: 
- Low 76k (+51 percent) 
- Central 72k (+43 percent)
- High 67k (+32 percent)

Starting from a value of 55k in 2024, the three core variants span a wide range of projected natural change by the end of the projection period: 
- Low 19k
- Central 36k 
- High 55k

| Variant | Year | Births | Deaths | Natural change |
|  --- | --- | --- | --- | --- | 
| estimate | 2011-12 | 134,000 | 48,000 | +86,000 | 
| estimate | 2023-24 | 106,000 | 51,000 | +55,000 | 
| trend-based low | 2035-36 | 96,000  | 64,000 | +32,000 |
| trend-based low | 2050-51 | 95,000  | 76,000 | +19,000 | 
| trend-based central | 2035-36 | 108,000 | 63,000 | +45,000 |
| trend-based central | 2050-51 | 108,000 | 72,000 | +36,000 | 
| trend-based high | 2035-36 | 121,000 | 61,000 | +60,000 |
| trend-based high | 2050-51 | 122,000 | 67,000 | +55,000 |

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

