export type ChartOptions = {

  /********************************************/
  /* Definitions of the structure of the data */
  /********************************************/
  /**
   * Name of the dataset being plotted.
   */
  dataset: string;

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
  chartType: 'bar' | 'line' | 'stackedHistogram';

  /**
   * Determines whether to stack bars.
   */
  stack: boolean;

  /**
   * Determines whether bars should be drawn horizontally (rather than vertically)
   */
  horiz: boolean;

  /**
   * Format string used for labelling ticks on the y-axis.
   */
  ytickformat: string | null;

  /**
   * Overrides for the extent of the y-axis.
   */
  forceYDomain_b: number;

  /**
   * Overrides for the extent of the y-axis.
   */
  forceYDomain_t: number;

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
}

export const chartOptions: Record<string, ChartOptions> = {
  "emp": {
    "dataset": "emp",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "dec_homes": {
    "dataset": "dec_homes",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "med_hhi": {
    "dataset": "med_hhi",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "locals": {
    "dataset": "locals",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0.8,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "help": {
    "dataset": "help",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0.81,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "hate_crimes": {
    "dataset": "hate_crimes",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 3300,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "green_gas": {
    "dataset": "green_gas",
    "chartType": "bar",
    "type": "date",
    "ytickformat": ".2s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": true,
    "horiz": false,
    "x_order": "<keep>",
    "timeperiod_type": "year"
  },
  "aqpm25": {
    "dataset": "aqpm25",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "year",

    "reference_lines": [
      {"label": "WHO limit", y: 5},
      {"label": "UK limit", y: 20}
    ],
    "hide": ["UK limit", "WHO limit"]
  },
  "aqno2": {
    "dataset": "aqno2",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "year",

    "reference_lines": [
      {"label": "WHO limit", y: 10},
      {"label": "UK limit", y: 40}
    ],
    "hide": ["UK limit", "WHO limit"]

  },
  "part_of_nature": {
    "dataset": "part_of_nature",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.83,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "heat_associated_deaths": {
    "dataset": "heat_associated_deaths",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 3600,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "recycling_rates": {
    "dataset": "recycling_rates",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.55,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "emp_prof": {
    "dataset": "emp_prof",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.068,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "skills_short": {
    "dataset": "skills_short",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "bus_train": {
    "dataset": "bus_train",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.82,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "fe_skills": {
    "dataset": "fe_skills",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "grad_outcomes": {
    "dataset": "grad_outcomes",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "job_posts": {
    "dataset": "job_posts",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".2s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "neets": {
    "dataset": "neets",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.105,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "level3": {
    "dataset": "level3",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.91,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "top_skills_common": {
    "dataset": "top_skills_common",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.42,
    "stack": false,
    "horiz": true,
    "x_order": "<keep>",
    "timeperiod_type": "Annual"
  },
  "top_skills_technical": {
    "dataset": "top_skills_technical",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": true,
    "x_order": "<keep>",
    "timeperiod_type": "Annual"
  },
  "violence_with_injury": {
    "dataset": "violence_with_injury",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 8100,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "proven_reoffending": {
    "dataset": "proven_reoffending",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.48,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "victimisation_rate": {
    "dataset": "victimisation_rate",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "victim_satisfaction": {
    "dataset": "victim_satisfaction",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "worried_crime_asb": {
    "dataset": "worried_crime_asb",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.69,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "trust_in_mps": {
    "dataset": "trust_in_mps",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.99,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tno": {
    "dataset": "tno",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 500000,
    "forceYDomain_t": 1000100,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "health_le_m": {
    "dataset": "health_le_m",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 75,
    "forceYDomain_t": 90,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Three Year Average"
  },
  "health_hle_m": {
    "dataset": "health_hle_m",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 50,
    "forceYDomain_t": 70,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Three Year Average"
  },
  "inf_mort": {
    "dataset": "inf_mort",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 6,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Three Year Average"
  },
  "u75_m_cardio": {
    "dataset": "u75_m_cardio",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Three Year Average"
  },
  "u75_m_cancer": {
    "dataset": "u75_m_cancer",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Three Year Average"
  },
  "sat_nhs": {
    "dataset": "sat_nhs",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "usat_scs": {
    "dataset": "usat_scs",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "lbw": {
    "dataset": "lbw",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 6.2,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "smoking": {
    "dataset": "smoking",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 24,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "anxiety_lifesat": {
    "dataset": "anxiety_lifesat",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 10,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "childhood_vacc": {
    "dataset": "childhood_vacc",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 68,
    "forceYDomain_t": 100,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "energy_performance": {
    "dataset": "energy_performance",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "cyp_gld": {
    "dataset": "cyp_gld",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0.5,
    "forceYDomain_t": 0.8,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_attainment8": {
    "dataset": "cyp_attainment8",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 60,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "sch_happ": {
    "dataset": "sch_happ",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".1f",
    "forceYDomain_b": 6,
    "forceYDomain_t": 8,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_safe": {
    "dataset": "cyp_safe",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "cyp_level3": {
    "dataset": "cyp_level3",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 100,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_neet": {
    "dataset": "cyp_neet",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 19.3,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "yr6_obesity": {
    "dataset": "yr6_obesity",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_mental_disorder": {
    "dataset": "cyp_mental_disorder",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 25,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_suspension": {
    "dataset": "cyp_suspension",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 10,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_exclusion": {
    "dataset": "cyp_exclusion",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "cyp_absence": {
    "dataset": "cyp_absence",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 9.8,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Academic Year"
  },
  "decision_influence": {
    "dataset": "decision_influence",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 47,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "food_sec": {
    "dataset": "food_sec",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "talk_neigh": {
    "dataset": "talk_neigh",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 40,
    "forceYDomain_t": 90,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "pay_gap_disability": {
    "dataset": "pay_gap_disability",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.21,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "pay_gap_gender": {
    "dataset": "pay_gap_gender",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.32,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "voter_reg": {
    "dataset": "voter_reg",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0.6,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "unfair": {
    "dataset": "unfair",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "social_action": {
    "dataset": "social_action",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 28,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "volunt_formal": {
    "dataset": "volunt_formal",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.61,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "volunt_informal": {
    "dataset": "volunt_informal",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.71,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "trust_neigh": {
    "dataset": "trust_neigh",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 54,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "bills_arrears": {
    "dataset": "bills_arrears",
    "chartType": "line",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.11,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "pay_gap_ethnicity": {
    "dataset": "pay_gap_ethnicity",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.39,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "gva_per_hour_worked_rhc": {
    "dataset": "gva_per_hour_worked_rhc",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 76,
    "forceYDomain_t": 120,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "annual_gva_growth": {
    "dataset": "annual_gva_growth",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "extended_unemployment": {
    "dataset": "extended_unemployment",
    "chartType": "bar",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": true,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "12-month period"
  },
  "jq_score": {
    "dataset": "jq_score",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": true,
    "x_order": "Average job quality indicator||Desired contract|Not on zero hours contract|Satisfactory hours|No unpaid overtime|Not in low pay|Positive employee involvement|Positive career progression",
    "timeperiod_type": "Multi-year period"
  },
  "increased_footfall": {
    "dataset": "increased_footfall",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 1,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "hs_spend": {
    "dataset": "hs_spend",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.5,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "vacancy_rate": {
    "dataset": "vacancy_rate",
    "chartType": "stackedHistogram",
    "type": "date",
    "ytickformat": null,
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "bbc": {
    "dataset": "bbc",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 25200,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "gva_composition": {
    "dataset": "gva_composition",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": -0.22,
    "forceYDomain_t": 0.22,
    "stack": false,
    "horiz": true,
    "x_order": "Transport and storage|Human health and \nsocial work|Construction|Accommodation \nand food services|Arts and \nentertainment|Real estate \nactivities|Wholesale and retail|Financial and \ninsurance activities|Manufacturing|Administrative and \nsupport service activities|Professional and \ntechnical activities|Education|Information and \ncommunication",
    "timeperiod_type": "Annual"
  },
  "hs_increased_purchases": {
    "dataset": "hs_increased_purchases",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.8,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tfl_demand_idx": {
    "dataset": "tfl_demand_idx",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0.4,
    "forceYDomain_t": 0.8,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tfl_active20_daily": {
    "dataset": "tfl_active20_daily",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.54,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "tfl_ksi": {
    "dataset": "tfl_ksi",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 6225,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tfl_sfdelay_reduction": {
    "dataset": "tfl_sfdelay_reduction",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tfl_bus_speed": {
    "dataset": "tfl_bus_speed",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 80,
    "forceYDomain_t": 123,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "tfl_journeys": {
    "dataset": "tfl_journeys",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 141,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "TfL Period"
  },
  "gc_ldn_domint": {
    "dataset": "gc_ldn_domint",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 41,
    "stack": true,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "gc_fdi_capex": {
    "dataset": "gc_fdi_capex",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "gc_int_vist_ldn": {
    "dataset": "gc_int_vist_ldn",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "gc_digital_engagement_arts": {
    "dataset": "gc_digital_engagement_arts",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "gc_visitor_spend": {
    "dataset": "gc_visitor_spend",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 161,
    "stack": true,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "gc_physical_engagement_arts": {
    "dataset": "gc_physical_engagement_arts",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "gc_int_visitor_nights": {
    "dataset": "gc_int_visitor_nights",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 161,
    "stack": true,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "strugg": {
    "dataset": "strugg",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0.28,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "monthly"
  },
  "cladding_remediation": {
    "dataset": "cladding_remediation",
    "chartType": "bar",
    "type": "character",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": true,
    "x_order": "London|South East|North West|South West|East of England|West Midlands|Yorkshire and The Humber|East Midlands|North East",
    "timeperiod_type": "Annual"
  },
  "missed_payment": {
    "dataset": "missed_payment",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "rent_affordability": {
    "dataset": "rent_affordability",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "rent_payment": {
    "dataset": "rent_payment",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "roughsleeping_first_time": {
    "dataset": "roughsleeping_first_time",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "neighbourhood_belonging": {
    "dataset": "neighbourhood_belonging",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "neighbourhood_satisfaction": {
    "dataset": "neighbourhood_satisfaction",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0%",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Financial Year"
  },
  "hmls": {
    "dataset": "hmls",
    "chartType": "bar",
    "type": "date",
    "ytickformat": ".2s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 70100,
    "stack": true,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "sleep_rough": {
    "dataset": "sleep_rough",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Monthly"
  },
  "homeless_decisions": {
    "dataset": "homeless_decisions",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Quarter"
  },
  "total_fertility_rate": {
    "dataset": "total_fertility_rate",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 2.3,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "births_mothers_cob": {
    "dataset": "births_mothers_cob",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 100000,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "annual_births": {
    "dataset": "annual_births",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Bi-annual"
  },
  "births_age_mother": {
    "dataset": "births_age_mother",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "annual_change_component": {
    "dataset": "annual_change_component",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".1s",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "population_age_structure": {
    "dataset": "population_age_structure",
    "chartType": "line",
    "type": "integer",
    "ytickformat": ".0f",
    "forceYDomain_b": 0,
    "forceYDomain_t": 0,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  },
  "total_population_year": {
    "dataset": "total_population_year",
    "chartType": "line",
    "type": "date",
    "ytickformat": ".2s",
    "forceYDomain_b": 6000000,
    "forceYDomain_t": 10000000,
    "stack": false,
    "horiz": false,
    "x_order": null,
    "timeperiod_type": "Annual"
  }
}