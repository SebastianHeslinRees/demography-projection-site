import type { ChartOptions } from '@ldn-viz/charts';
import { theme } from '@ldn-viz/ui';

// 300/500/700

const colorsTrendBased = $derived({
	colorScale: {
		domain: ['Low', 'Central', 'High'],
		range: [
			theme.tokenNameToValue('palette.blue.300'),
			theme.tokenNameToValue('palette.blue.500'),
			theme.tokenNameToValue('palette.blue.700')
		]
	}
});

const colorHousingLed = $derived({
	colorScale: {
		domain: ['Low', 'Central', 'High'],
		range: [
			theme.tokenNameToValue('palette.darkpink.300'),
			theme.tokenNameToValue('palette.darkpink.500'),
			theme.tokenNameToValue('palette.darkpink.700')
		]
	}
});

const colorHousingLedWithContext = $derived({
	colorScale: {
		domain: ['Low', 'Central', 'High', '2024 structure'],
		range: [
			theme.tokenNameToValue('palette.darkpink.300'),
			theme.tokenNameToValue('palette.darkpink.500'),
			theme.tokenNameToValue('palette.darkpink.700'),
			theme.tokenNameToValue('data.context')
		]
	}
});

const colorScaleCombined = $derived({
	colorScale: {
		domain: [
			'Housing-led - Low',
			'Housing-led - Central',
			'Housing-led - High',

			'Trend - Low',
			'Trend - Central',
			'Trend - High'
		],
		range: [
			theme.tokenNameToValue('palette.darkpink.300'),
			theme.tokenNameToValue('palette.darkpink.500'),
			theme.tokenNameToValue('palette.darkpink.700'),

			theme.tokenNameToValue('palette.blue.300'),
			theme.tokenNameToValue('palette.blue.500'),
			theme.tokenNameToValue('palette.blue.700')
		]
	}
});

class ChartOptionsClass {
	options: Record<string, ChartOptions> = $derived({
		/** Borough choropleth **/
		borough_population: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: ',.0f',
			timeperiod_type: null,
			colorScale: {
				domain: [-5, -1, 1, 5, 10, 15, 20],
				range: [
					'#ef8a62',
					'#ef8a62',
					'#d9d9d9',
					'#67a9cf',
					'#4393c3',
					'#2166ac',
					'#08519c',
					'#08306b'
				]
			}
		},

		housing_led_vs_trend_central_borough_difference: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: '.0f',
			timeperiod_type: null,
			colorScale: {
				domain: [-20, -10, -5, -1, 1, 5, 10, 20],
				range: [
					'#b2182b',
					'#d6604d',
					'#f4a582',
					'#fddbc7',
					'#d1e5f0',
					'#92c5de',
					'#4393c3',
					'#2166ac'
				]
			}
		},

		ward_population: {
			chartType: 'choropleth',
			areaType: 'ward-2022',
			joinKey: 'id',
			type: 'character',
			ytickformat: ',.0f',
			timeperiod_type: null,
			colorScale: {
				domain: [-5, -1, 1, 5, 10, 15, 20],
				range: [
					'#ef8a62',
					'#ef8a62',
					'#d9d9d9',
					'#67a9cf',
					'#4393c3',
					'#2166ac',
					'#08519c',
					'#08306b'
				]
			}
		},

		housing_led_ward_population: {
			chartType: 'choropleth',
			areaType: 'ward-2022',
			joinKey: 'id',
			type: 'character',
			ytickformat: ',.0f',
			timeperiod_type: null,
			colorScale: {
				domain: [-5, -1, 1, 5, 10, 15, 20],
				range: [
					'#ef8a62',
					'#ef8a62',
					'#d9d9d9',
					'#67a9cf',
					'#4393c3',
					'#2166ac',
					'#08519c',
					'#08306b'
				]
			}
		},

		large_sites_lsoa: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: ',.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: null,
			missingDataColor: 'rgb(156, 163, 175)',

			colorScale: {
				domain: [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
				range: [
					'#9ca3af',
					'#f7fbff',
					'#deebf7',
					'#c6dbef',
					'#9ecae1',
					'#6baed6',
					'#4292c6',
					'#2171b5',
					'#084594'
				]
			}
		},

		lsoa_industrial_additionalrelease10y: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: ',.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: null,
			missingDataColor: 'rgb(156, 163, 175)',

			colorScale: {
				domain: [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
				range: [
					'#9ca3af',
					'#f7fbff',
					'#deebf7',
					'#c6dbef',
					'#9ecae1',
					'#6baed6',
					'#4292c6',
					'#2171b5',
					'#084594'
				]
			}
		},

		phased_lsoa_longertermgb: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: ',.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: null,
			missingDataColor: 'rgb(156, 163, 175)',
			colorScale: {
				domain: [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
				range: [
					'#9ca3af',
					'#f7fbff',
					'#deebf7',
					'#c6dbef',
					'#9ecae1',
					'#6baed6',
					'#4292c6',
					'#2171b5',
					'#084594'
				]
			}
		},

		small_sites_lsoa: {
			chartType: 'choropleth',
			areaType: 'borough',
			type: 'character',
			ytickformat: ',.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: null,
			colorScale: {
				domain: [1, 100, 500, 1000, 2500, 5000, 10000, 15000],
				range: [
					'#9ca3af',
					'#f7fbff',
					'#deebf7',
					'#c6dbef',
					'#9ecae1',
					'#6baed6',
					'#4292c6',
					'#2171b5',
					'#084594'
				]
			}
		},

		development_capacity_cumulative_london: {
			chartType: 'line',
			type: 'date',
			ytickformat: ',.0s',
			tooltipFormatValue: ',.0f',
			includeZero: true,
			timeperiod_type: 'Annual',
			insetLeft: 30,
			insetRight: 180,
			yDomain: [0, 800000]
		},

		/** Demography **/
		total_population_year: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.2s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual'
		},

		proj_total_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01'
		},

		housing_led_projected_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',

			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01'
		},

		housing_led_total_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_annual_population_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 4,
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_age_structure_median_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			includeZero: true,
			timeperiod_type: 'year',
			projectedStart: '2024-01-01',
			...colorHousingLedWithContext
		},

		housing_led_working_age_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [5500000, 7500000 + 200000],
			...colorHousingLed
		},

		housing_led_primary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_secondary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [350000, 550000 + 20000],
			...colorHousingLed
		},

		housing_led_population_age_65_plus: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [500000, 2000000 + 200000],
			...colorHousingLed
		},

		housing_led_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_births: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_deaths: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [40000, 80000 + 2000],
			...colorHousingLed
		},

		housing_led_natural_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZero: true,
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_in_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_out_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_net_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			projectedStart: '2024-01-01',
			autoDodgeLabels: true,
			...colorHousingLed
		},

		housing_led_tfr: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [1.1, 1.5 + 0.02],
			...colorHousingLed
		},

		housing_led_tfr_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.1f',
			timeperiod_type: 'year',
			xAxisLabel: 'Age',
			...colorHousingLed
		},

		housing_led_asfr: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.2f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_asfr_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.2f',
			timeperiod_type: 'year',
			includeZero: true,
			xAxisLabel: 'Age',
			autoDodgeLabels: true,
			...colorHousingLed
		},

		housing_led_births_by_mothers_age: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorHousingLed
		},

		housing_led_births_by_mothers_age_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'year',
			includeZero: true,
			xAxisLabel: 'Age',
			autoDodgeLabels: true,
			...colorHousingLed
		},

		housing_led_vs_trend_total_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined
		},

		housing_led_vs_trend_annual_population_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 4,
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined
		},

		housing_led_vs_trend_age_structure: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'year',
			...colorScaleCombined
		},

		housing_led_vs_trend_working_age_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined,
			yDomain: [6000000, 7500000 + 200000]
		},

		housing_led_vs_trend_primary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined
		},

		housing_led_vs_trend_secondary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined,
			yDomain: [350000, 550000 + 20000]
		},

		housing_led_vs_trend_population_age_65_plus: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			xDomain: ['2021-01-01', '2051-01-01'],
			projectedStart: '2024-01-01',
			...colorScaleCombined
		},

		proj_annual_population_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 4,
			projectedStart: '2025-01-01'
		},

		proj_age_structure_median_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'year',
			includeZero: true
		},

		proj_working_age_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01'
		},

		proj_primary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01'
		},

		proj_secondary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01'
		},

		proj_population_age_65_plus: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01'
		},

		proj2_total_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01',
			yDomain: [7000000, 11000000 + 200000],
			...colorsTrendBased
		},

		proj2_annual_population_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 4,
			projectedStart: '2025-01-01',
			...colorsTrendBased
		},

		proj2_age_structure_median_age: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'year',
			includeZero: true,
			...colorsTrendBased
		},

		proj2_working_age_population: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01',
			...colorsTrendBased
		},

		proj2_primary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01',
			...colorsTrendBased
		},

		proj2_secondary_school_age_children: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01',
			yDomain: [350000, 550000 + 20000],
			...colorsTrendBased
		},

		proj2_population_age_65_plus: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2025-01-01',
			yDomain: [500000, 2000000 + 20000],
			...colorsTrendBased
		},

		population_age_structure: {
			chartType: 'lineChartWithForecast',
			type: 'integer',
			ytickformat: '.0f',
			timeperiod_type: 'Annual',
			insetRight: 160,
			includeZero: true
		},

		annual_change_component: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 3
		},

		annual_births: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Bi-annual',
			includeZero: true,
			numTicks: 3
		},

		births_age_mother: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			numTicks: 4
		},

		births_mothers_cob: {
			chartType: 'lineChartWithForecast',
			type: 'date',

			ytickformat: '.1s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZero: true
		},

		total_fertility_rate: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.1f',
			timeperiod_type: 'Annual',
			includeZeroLine: true
		},

		// Components of Change datasets
		births: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorsTrendBased
		},

		deaths: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			yDomain: [40000, 80000 + 2000],
			...colorsTrendBased
		},

		natural_change: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			projectedStart: '2024-01-01',
			yDomain: [20000, 100000 + 2000],
			...colorsTrendBased
		},

		international_net_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			projectedStart: '2024-01-01',
			...colorsTrendBased,
			autoDodgeLabels: true
		},

		domestic_net_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			yDomain: [-200000, 0],
			projectedStart: '2024-01-01',
			autoDodgeLabels: true,
			...colorsTrendBased
		},

		domestic_in_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorsTrendBased
		},

		domestic_out_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0f',
			timeperiod_type: 'Annual',
			projectedStart: '2024-01-01',
			...colorsTrendBased
		},

		total_net_migration: {
			chartType: 'lineChartWithForecast',
			type: 'date',
			ytickformat: '.0s',
			tooltipFormatValue: ',.0f',
			timeperiod_type: 'Annual',
			includeZeroLine: true,
			projectedStart: '2024-01-01',
			autoDodgeLabels: true,
			...colorsTrendBased
		}
	});
}

export const chartOptions = new ChartOptionsClass();
