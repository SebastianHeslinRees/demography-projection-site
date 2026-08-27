---
title: Overview of the projections
description: Scope, methods and variants for the GLA 2022-based population projections
section: Demography
navLabel: Overview
---

The GLA Demography team produces a range of demographic projections to support planning and policy across London.  

Two different approaches are used to produce the population projections: 

**Trend-based projections** are an extrapolation of past trends in fertility, mortality, and migration patterns. Assumptions about housing are not explicitly included, though past development will have influenced the demographic trends on which the projections are based.   

**Housing-led projections** incorporate explicit assumptions about the timing, quantity, and location of future housing development. Past trends are reconciled with the capacity of the available housing stock to arrive at a projected population that reflects both. 

## Included in the release 

Trend-based population projections for local authority districts and regions in England and Wales to 2051. 

Housing-led population projections to 2051 for electoral wards, Middle-layer Super Output Areas (MSOA), and local authorities in London. 

A core set of variants are available for both trend and housing-led projections are available as Excel files from the London Datastore. The core variants of the housing-led projections can also be accessed through the interactive London Population Projections Explorer [https://apps.london.gov.uk/population-projections/]. 

Detailed outputs and additional variants for use in analysis and modelling are available as csv files on the London Datastore. 

## Choice of projections 

The core variants, labelled central, high, and low, are intended to cover a reasonable range of possible outcomes and to be suitable for use in common planning and policy activities. 

The GLA generally suggests the housing-led population projections as the default for most purposes, as they capture the potential impacts of future housing delivery and are available at a finer spatial level.  

We discourage users from relying on the results of a single projection, but to consider the results of multiple variants as well as alternative sources, such as the Subnational Population Projections published by the Office for National Statistics. 

## Overview of the trend-based projections 

The GLA’s trend-based projections are produced using a multi-region cohort component model. This means that all areas within the model are linked, with population moving between areas through internal migration.  The model operates over all local authority level in England and Wales, and consistent results are published for all areas. 

The projections are produced by taking a starting population (mid-2024 in this case), projecting forward one year by calculating a set of components of change (births, deaths and migration), ageing-on the population by one year, and applying the components. This process is repeated until the projection is complete. 

The results of the projections are largely dependent on the assumptions and methods used to generate the components. For the GLA’s projections: 

- Births and deaths are calculated by applying fertility and mortality rates to the population 

Migration is split into international and internal flows: 

- International migration flows typically calculated as fixed annual flows that are independent of the population 

- Internal migration flows between each pair of local authorities are calculated by applying migration rates to the origin population. 

The rates and flows used in the model are based on past estimates and assumptions about how past patterns will change in the future. The GLA produces multiple variants of the projections based on different assumptions for each component.   

**Fertility rates** are projected using a time series model that takes past age-specific fertility rates and produces distributions of possible future rates.  

The central fertility scenario is based on the median values of this distribution. Higher and lower scenarios are based on the values a given percentile above or below the median.  In each case, the fertility rates are held fixed after a given point. 

**Mortality rates** used in the projections are based on the four scenarios included in the ONS 2024-based National Population Projections – Principal, Low, High, No Improvement (where ‘High’ refers to high life expectancy, i.e. low mortality).  For each area in the model, these are scaled to fit recent estimates of deaths by sex. 

**Migration rates and flows** are based on the averages of past estimates. The GLA typically uses the same period of past data for each of the different migration components, reflecting the fact that in/out/domestic/international flows are not independent of one another. Different variants use different periods of past data.  Unlike fertility and mortality, this approach does not produce explicit high and low scenarios – a given period may give higher net migration for one area, but lower for another.   

Projections based on a range of different scenarios for each component are published on the London Datastore.   

For general use, the GLA produces a core set of variants, designated as central, high, and low.  These are intended to cover a reasonable range of possible outcomes and be suitable for use in common planning and policy activities. 

The core variants for the 2024-based projections are based on the following scenarios: 

- central – central fertility scenario, central life expectancy scenario, migration patterns based on 13-years of past data 

- low - low fertility scenario, low life expectancy scenario, migration patterns based on 10-years of past data 

- high - high fertility scenario, high life expectancy scenario, migration patterns based on 15-years of past data 

## Overview of the housing-led projections 

The model used to produce the GLA housing-led population projections has many similarities to the trend-based model in that it uses the cohort-component approach, with population projected forward from a starting estimate and all change accounted for through births, deaths, migration and ageing. Births and deaths are likewise calculated by applying fertility and mortality rates to the population. 

Some key differences are that the model: 

- Operates at a finer spatial level – typically electoral wards or Middle-layer Super Output Areas 

- Is based on a ‘bi-regional’ rather than a true multiregional approach with areas not explicitly linked by migration flows 

- Does not separate internal and international migration 

The fundamental difference is that the model uses housing capacity in the calculation of population and migration flows.  

- An initial projection for the next year is produced, based on a continuation of past trends.   

- The initial projection is converted into households by removing the assumed residents of communal establishments and applying a set of household representative rates to the remaining population. 

- The number of households is compared with a nominal capacity based on the assumed number of homes in the area and a reconciled total population target is calculated 

- The initial projection is modified to be consistent with the population target by adjusting migration flows to and from the area 

*Note: The number of households that a given population converts into depends on both the household representative rates and its age structure. Because representative rates tend to be higher (and average household sizes smaller) at older ages, the projected population for areas with ageing populations may fall over time, even if there is no reduction in the number of homes.* 

After this process is complete, the results are forced to be consistent with those of an external projection in a process known as constraining. In the case of the 2024-based projections, the aggregated population, births, and deaths for every ward or MSOA area within a specified “housing market area” are scaled to match the values from the trend-based projections for that same area. 

This constraining step is necessary because: 

- The bi-regional approach of the underlying model does not reflect structural changes to the wider population when calculating inflows to each area. 

- Without it, size of the overall population would be determined by the assumed number of homes, which is unrealistic at larger scales. 

In previous rounds, the GLA constrained the housing-led projections to the trend-based projections for London at either region or (ITL2) subregion level, meaning that the results of the trend and housing-led projections were consistent at these levels. 

For the 2024-based projections, this approach has been updated to reflect changes to the relationship between trend-based demographic projections and the standard method approach to determining local housing need set out in the National Planning Policy Framework.   

Housing-led projections are now constrained to a larger area that also includes 58 local authorities outside of London (a list of these areas is available on the London Datastore). This allows the population to reflect the relative balance of assumed future housing delivery within and outside of London.  

All published versions of the housing-led projections incorporate the same assumptions about future housing delivery in London, derived from the 2026 London Strategic Housing Land Availability Assessment, but use alternative scenarios assumed future housing deliver in surrounding districts. 

*Note: assumptions about housing delivery for areas outside of London are included in the model as a mechanism for adjusting the relative shares of the wider region’s population within and outside of London. These projections were produced without reference to current or future local plans or assessments of housing capacity in areas outside of London and in no way represent a view of likely future housing delivery in those areas. Where results for areas outside of London are included in the housing-led projections, it is for the purpose of providing transparency about the results for London itself and not as projections intended to be used for decision making within those areas.* 

For districts outside of London, the central assumption about future housing delivery was derived as follows: 

- Objectively assessed housing need for each district was calculated using the National Planning Policy Framework's Standard Method 

- Assumed housing delivery for each district was calculated by multiplying its Standard Method need figure by the ratio of: London's assumed annual housing delivery / London's Standard Method need figure 

- For the low variant, housing delivery outside of London is assumed to be 15 percent higher than this, for the high variant it is assumed to be 15 percent lower 
