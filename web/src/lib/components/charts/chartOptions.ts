export type ChartOptions = {

    /********************************************/
    /* Definitions of the structure of the data */
    /********************************************/
    /**
     * Type of the `xd` variable.
     */
    type: 'character' | 'date' | 'integer';

    /**
     * Specific type of date that `xd` is (if it is a date).
     */
    timeperiod_type:
        'Monthly' | /* e.g., 2019-06-30  - all last day of a month*/
        'monthly' | /* e.g. 2024-09-09 - these all have a day of week = month of year */
        'Quarter' | /* e.g. 2024-07-01 - all first day of a quarter (the month is 01/04/07/10)*/

        'Annual' | /* e.g., 2011-01-01 - first of jan*/

        'Bi-annual' | /* e.g., 2002-07-01 1st of Jan or July */
        'Academic Year' | /* e.g. 2021-09-01  all 1st September*/
        'Financial Year' | /* e.g. 2020-04-01 - 1st of April */
        'Three Year Average' | /* e.g. 2019-01-01 - all 1st of Jan*/
        '12-month period' | /* assorted dates, depending on dataset */
        'TfL Period' | /* monthly, but on irregular dates? */

        'year' | /* e.g., 2014  */

        'Multi-year period' /* xd is not actually a date */

    ;


    /*************************************************/
    /* Definitions of how the data should be plotted */
    /*************************************************/
    /**
     * Plot type.
     */
    chartType: 'line' | 'lineChartWithLineStyles' |
        'barChartVertical' | 'barChartVerticalGrouped' | 'barChartHorizontal' | 'barChartHorizontalGrouped' | 'barChartStacked' | 'barChartStackedTimeseries' |
        'stackedHistogram' |
        'incomeSlope';

    /**
     * If `true`, force 0 to be included in the domain of the y-axis.
     */
    includeZero?: boolean;

    /**
     * Indicates that scale doesn't start at 0, but crosses 0, so that we need to draw a rule at y=0.
     * In principle, we could determine this automatically.
     */
    includeZeroLine?: boolean;


    /**
     * Value of insetRight to override default (e.g., to increase space for line labels to the right of the chart).
     */
    insetRight?: number;

    /**
     * Format string used for labelling ticks on the y-axis.
     */
    ytickformat: string | null;

    /**
     * Overrides for the extent of the y-axis.
     */
    forceYDomain_b?: number;

    /**
     * Overrides for the extent of the y-axis.
     */
    forceYDomain_t?: number;

    /**
     * Overrides for the ordering of bars.
     */
    x_order: string | null;

    /**
     * List values of `b` for which rows of data should be hidden.
     */
    hide?: string[];

    /**
     * Specify what horizontal reference lines/rules should be drawn.
     */
    reference_lines?: { label: string, y: number }[];

    /**
     * If `true`, then chart is faceted.
     */
     faceted?: boolean;

     facetOrder?: string[];

     /**
      * Sets the `type` of the x scale. Can be set to `'band'` to silence warnings when ObservablePlot thinks a date or numeric scale should be applied to the x-axis.
      */
     xScaleType?: string;


     /**
      * Time interval of bars in `barChartStackedTimeseries` plot
      */
     xInterval?: string;
}

export type ChartDataRow = {
    dataset?: string;
    xd: string | number | Date;
    b: string;
    y: number;
    z2?: string;
    [key: string]: unknown;
};

export type ColorChoice = {
    type?: string;
    domain?: string[];
    range?: string[];
};

export const chartOptions: Record<string, ChartOptions> = {

    /** Demography **/
    "total_population_year": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".2s",
        "forceYDomain_b": 6000000,
        "forceYDomain_t": 10000000,
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    "population_age_structure": {
        "chartType": "line",
        "type": "integer",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        insetRight: 160,
        includeZero: true
    },

    "annual_change_component": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true
    },

    "annual_births": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Bi-annual",
        includeZero: true
    },

    "births_age_mother": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true
    },

    "births_mothers_cob": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "total_fertility_rate": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 2.3,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true
    },


    /** Economy ***/
    "annual_gva_growth": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZeroLine: true

    },

    "gva_per_hour_worked_rhc": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 76,
        "forceYDomain_t": 120,
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    "gva_composition": {
        "chartType": "barChartHorizontal",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": -0.22,
        "forceYDomain_t": 0.22,
        "x_order": "Transport and storage|Human health and \nsocial work|Construction|Accommodation \nand food services|Arts and \nentertainment|Real estate \nactivities|Wholesale and retail|Financial and \ninsurance activities|Manufacturing|Administrative and \nsupport service activities|Professional and \ntechnical activities|Education|Information and \ncommunication",
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "bbc": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true
    },

    "income_inequality": {
        "chartType": "incomeSlope",
        "type": "character",
        "ytickformat": ",.2r",
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true
    },

    "extended_unemployment": {
        "chartType": "barChartStackedTimeseries",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "12-month period",
        includeZero: true,
        xInterval: 'quarter'
    },

    "jq_score": {
        "chartType": "barChartHorizontalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 1,
        "x_order": "Average job quality indicator||Desired contract|Not on zero hours contract|Satisfactory hours|No unpaid overtime|Not in low pay|Positive employee involvement|Positive career progression",
        "timeperiod_type": "Multi-year period",
        includeZero: true
    },

    "increased_footfall": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 1,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "hs_spend": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.5,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "hs_increased_purchases": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.8,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "vacancy_rate": {
        "chartType": "stackedHistogram",
        "type": "date",
        "ytickformat": null,
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual"
    },


    /**  global city and culture **/
    "gc_fdi_capex": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        facetOrder: ['Projects', 'Capex']
    },

    "gc_int_visitor_nights": {
        "chartType": "barChartStacked",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 161,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
        xScaleType: 'band'
    },

    "gc_visitor_spend": {
        "chartType": "barChartStacked",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 161,
        "x_order": null,
        "timeperiod_type": "Annual",
        xScaleType: 'band'
    },

    "gc_int_vist_ldn": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "gc_physical_engagement_arts": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "gc_digital_engagement_arts": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    /** Skills */
    "neets": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.105,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "level3": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "grad_outcomes": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 1,
        "x_order": null,
        "timeperiod_type": "Academic Year"
    },

    "fe_skills": {
        "chartType": "barChartStacked",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },

    "emp_prof": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.068,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "skills_short": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "bus_train": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.82,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "job_posts": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".2s",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Monthly",
        includeZero: true
    },

    "top_skills_common": {
        "chartType": "barChartHorizontalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.42,
        "x_order": "<keep>",
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "top_skills_technical": {
        "chartType": "barChartHorizontalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": "<keep>",
        "timeperiod_type": "Annual",
        includeZero: true
    },


    /* Social justice */
    "strugg": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.28,
        "x_order": null,
        "timeperiod_type": "monthly",
        includeZero: true
    },

    "med_hhi": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "bills_arrears": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.11,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "food_sec": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "unfair": {
        "chartType": "barChartVertical",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true,
        xScaleType: 'band'
    },

    "hate_crimes": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "x_order": null,
        "timeperiod_type": "Monthly",
        includeZero: true
    },

    "pay_gap_gender": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "pay_gap_ethnicity": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
        insetRight: 180
    },

    "pay_gap_disability": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.21,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "voter_reg": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0.6,
        "forceYDomain_t": 1,
        "x_order": null,
        "timeperiod_type": "Annual",
    },

    "decision_influence": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 47,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "locals": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0.8,
        "forceYDomain_t": 1,
        "x_order": null,
        "timeperiod_type": "Monthly"
    },

    "help": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0.81,
        "forceYDomain_t": 1,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "volunt_formal": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.61,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "volunt_informal": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.71,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "social_action": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 28,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "trust_neigh": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 54,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "talk_neigh": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 40,
        "forceYDomain_t": 90,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },


    /* Housing */
    "missed_payment": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        insetRight: 200
    },

    "rent_affordability": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Monthly"
    },

    "rent_payment": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
        insetRight: 150
    },

    "hmls": {
        "chartType": "barChartStackedTimeseries",
        "type": "date",
        "ytickformat": ".2s",
        "forceYDomain_b": 0,
        "forceYDomain_t": 70100,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        xInterval: 'quarter'
    },

    "dec_homes": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    "cladding_remediation": {
        "chartType": "barChartHorizontalGrouped",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": "London|South East|North West|South West|East of England|West Midlands|Yorkshire and The Humber|East Midlands|North East",
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "sleep_rough": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Monthly",
        includeZero: true
    },

    "roughsleeping_first_time": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        insetRight: 295
    },

    "homeless_decisions": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        insetRight: 155
    },

    "neighbourhood_satisfaction": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "neighbourhood_belonging": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    /* Environment */
    "green_gas": {
        "chartType": "barChartStackedTimeseries",
        "type": "date",
        "ytickformat": ".0s",
        "x_order": "<keep>",
        "timeperiod_type": "year"
    },

    "energy_performance": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
    },

    "recycling_rates": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.55,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true,
    },

    "part_of_nature": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.83,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true,
    },

    "heat_associated_deaths": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 3600,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },


    /* Crime */
    "tno": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".1s",
        "forceYDomain_b": 500000,
        "forceYDomain_t": 1000100,
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    "violence_with_injury": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 8100,
        "x_order": null,
        "timeperiod_type": "Monthly",
        includeZero: true,
    },

    "proven_reoffending": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.48,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
    },

    "victimisation_rate": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Monthly",
        includeZero: true,
    },


    "victim_satisfaction": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
    },

    "worried_crime_asb": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.69,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true,
        insetRight: 230
    },

    "trust_in_mps": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.99,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
    },


    /* Transport */
    "tfl_journeys": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 141,
        "x_order": null,
        "timeperiod_type": "TfL Period",
        includeZero: true
    },

    "tfl_demand_idx": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0.4,
        "forceYDomain_t": 0.8,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "tfl_active20_daily": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0.54,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true
    },

    "tfl_ksi": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 6225,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true

    },

    "tfl_sfdelay_reduction": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true

    },

    "tfl_bus_speed": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 80,
        "forceYDomain_t": 123,
        "x_order": null,
        "timeperiod_type": "Annual"
    },

    /* Children and young people */
    "yr6_obesity": {
        "chartType": "lineChartWithLineStyles",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },

    "sch_happ": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".1f",
        "forceYDomain_b": 6,
        "forceYDomain_t": 8,
        "x_order": null,
        "timeperiod_type": "Academic Year"
    },

    "cyp_mental_disorder": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 25,
        "x_order": null,
        "timeperiod_type": "Academic Year"
    },

    "cyp_gld": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0.5,
        "forceYDomain_t": 0.8,
        "x_order": null,
        "timeperiod_type": "Academic Year"
    },

    "cyp_attainment8": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 60,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },

    "cyp_safe": {
        "chartType": "barChartVerticalGrouped",
        "type": "character",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
        xScaleType: 'band'
    },

    "cyp_neet": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 19.3,
        "x_order": null,
        "timeperiod_type": "Quarter",
        includeZero: true
    },

    "cyp_level3": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 100,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },

    "cyp_absence": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 9.8,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },

    "cyp_suspension": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 10,
        "x_order": null,
        "timeperiod_type": "Academic Year",
        includeZero: true
    },


    /* Health */
    "health_le_m": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 75,
        "forceYDomain_t": 90,
        "x_order": null,
        "timeperiod_type": "Three Year Average",
        faceted: true
    },

    "health_hle_m": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 50,
        "forceYDomain_t": 70,
        "x_order": null,
        "timeperiod_type": "Three Year Average",
        faceted: true
    },

    "inf_mort": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 6,
        "x_order": null,
        "timeperiod_type": "Three Year Average",
        includeZero: true
    },

    "lbw": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 6.2,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true
    },

    "smoking": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 24,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true

    },

    "anxiety_lifesat": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 10,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true,
        faceted: true
    },

    "u75_m_cardio": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Three Year Average",
        includeZero: true

    },

    "u75_m_cancer": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Three Year Average",
        includeZero: true

    },

    "childhood_vacc": {
        "chartType": "line",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 68,
        "forceYDomain_t": 100,
        "x_order": null,
        "timeperiod_type": "Financial Year"
    },

    "sat_nhs": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true

    },

    "usat_scs": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Financial Year",
        includeZero: true

    },


    /* UNSORTED or currently unused */

    "emp": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Quarter"
    },

    "aqpm25": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "year",

        "reference_lines": [
            {"label": "WHO limit", y: 5},
            {"label": "UK limit", y: 20}
        ],
        "hide": ["UK limit", "WHO limit"]
    },
    "aqno2": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "year",

        "reference_lines": [
            {"label": "WHO limit", y: 10},
            {"label": "UK limit", y: 40}
        ],
        "hide": ["UK limit", "WHO limit"]

    },
    "cyp_exclusion": {
        "chartType": "line",
        "type": "date",
        "ytickformat": ".0%",
        "forceYDomain_b": 0,
        "forceYDomain_t": 0,
        "x_order": null,
        "timeperiod_type": "Academic Year"
    },

    "gc_ldn_domint": {
        "chartType": "barChartStacked",
        "type": "character",
        "ytickformat": ".0f",
        "forceYDomain_b": 0,
        "forceYDomain_t": 41,
        "x_order": null,
        "timeperiod_type": "Annual",
        includeZero: true,
        xScaleType: 'band'
    },


}