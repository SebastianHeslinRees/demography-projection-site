import type { ChartDataOptions, ChartDataRow } from '@ldn-viz/charts';

// import { PUBLIC_CHART_DATA_API_URL } from "$env/static/public";
export const PUBLIC_CHART_DATA_API_URL = '';

// Bundled projected population chart rows shipped with the app build.
import projectedPopulation2ChartData from '$lib/data/projectedPopulation2ChartData.json' with { type: 'json' };
import projectedPopulationChartData from '$lib/data/projectedPopulationChartData.json' with { type: 'json' };
// Bundled components-of-change chart rows shipped with the app build.
import componentsOfChangeData from '$lib/data/ComponentsOfChangeChartData.json' with { type: 'json' };
// Bundled borough-level population data.
import boroughPopulationData from '$lib/data/boroughPopulationData.json' with { type: 'json' };
import housingLedVsTrendCentralBoroughDifferenceData from '$lib/data/housingLedVsTrendCentralBoroughDifferenceData.json' with { type: 'json' };
// Bundled ward-level population data.
import housingLedComponentsData from '$lib/data/HousingLedComponentsData.json' with { type: 'json' };
import housingLedFertilityAgeData from '$lib/data/HousingLedFertilityAgeData.json' with { type: 'json' };
import { boroughCapacityMapData } from '$lib/data/boroughCapacityMapData';
import housingLedProjectedPopulationData from '$lib/data/housingLedProjectedPopulation.json' with { type: 'json' };
import housingLedVsTrendProjectionData from '$lib/data/housingLedVsTrendProjectionData.json' with { type: 'json' };
import housingLedWardPopulationData from '$lib/data/housingLedWardPopulationData.json' with { type: 'json' };
import londonSitesCumulativeData from '$lib/data/londonSitesCumulativeData.json' with { type: 'json' };
import wardPopulationData from '$lib/data/wardPopulationData.json' with { type: 'json' };

export function fetchChartData(dataset: string): Promise<Response> {
	return fetch(`${PUBLIC_CHART_DATA_API_URL}?dataset=eq.${dataset}`);
}

function getLocalDatasetRows(dataset: string): ChartDataRow[] {
	return (projectedPopulationChartData as ChartDataRow[])
		.concat(projectedPopulation2ChartData as ChartDataRow[])
		.concat(componentsOfChangeData as ChartDataRow[])
		.concat(boroughPopulationData as ChartDataRow[])
		.concat(housingLedVsTrendCentralBoroughDifferenceData as ChartDataRow[])
		.concat(boroughCapacityMapData as ChartDataRow[])
		.concat(londonSitesCumulativeData as ChartDataRow[])
		.concat(wardPopulationData as ChartDataRow[])
		.concat(housingLedWardPopulationData as ChartDataRow[])
		.concat(housingLedProjectedPopulationData as ChartDataRow[])
		.concat(housingLedVsTrendProjectionData as ChartDataRow[])
		.concat(housingLedComponentsData as ChartDataRow[])
		.concat(housingLedFertilityAgeData as ChartDataRow[])
		.filter((d) => d.dataset === dataset)
		.sort((a, b) => variantRank(a.b) - variantRank(b.b));
}

// re-order lines so the dark 'High' lines are on top,
// for historical data where the series are equal
const VARIANT_ORDER = ['Low', 'Central', 'High'];
function variantRank(b: unknown): number {
	if (b === 'Trend - High') return VARIANT_ORDER.length + 1;
	const index = VARIANT_ORDER.indexOf(b as string);
	return index === -1 ? VARIANT_ORDER.length : index;
}

function getDatasetRows(dataset: string): Promise<ChartDataRow[]> {
	const localRows = getLocalDatasetRows(dataset);

	if (localRows.length > 0) {
		return Promise.resolve(localRows);
	}

	return fetchChartData(dataset).then((res) => res.json());
}

function deriveTotalNetMigrationRows(
	internationalRows: ChartDataRow[],
	domesticRows: ChartDataRow[]
): ChartDataRow[] {
	const internationalByKey = new Map<string, ChartDataRow>();

	for (const row of internationalRows) {
		internationalByKey.set(`${row.b}::${row.xd}`, row);
	}

	const combinedRows: ChartDataRow[] = [];

	for (const domesticRow of domesticRows) {
		const matchingInternational = internationalByKey.get(`${domesticRow.b}::${domesticRow.xd}`);

		if (!matchingInternational) continue;

		combinedRows.push({
			dataset: 'total_net_migration',
			xd: domesticRow.xd,
			b: domesticRow.b,
			y: matchingInternational.y + domesticRow.y
		});
	}

	return combinedRows;
}

export function loadChartData(dataset: string, options: ChartDataOptions): Promise<ChartDataRow[]> {
	const convertVal = (val: string): string | number | Date => {
		if (options.type === 'integer') return +val;
		if (options.type === 'date' && !['Financial Year'].includes(options.timeperiod_type ?? ''))
			return new Date(val);
		return val;
	};

	const dataPromise = getDatasetRows(dataset).then((rows) => {
		if (rows.length > 0 || dataset !== 'total_net_migration') {
			return rows;
		}

		return Promise.all([
			getDatasetRows('international_net_migration'),
			getDatasetRows('domestic_net_migration')
		]).then(([internationalRows, domesticRows]) =>
			deriveTotalNetMigrationRows(internationalRows, domesticRows)
		);
	});

	return dataPromise.then((dataRes) => {
		const newData = dataRes
			.map((d: ChartDataRow) => ({ ...d, xd: convertVal(d.xd as string) }))
			.filter((d: ChartDataRow) => !options.hide || !options.hide.includes(d.b))
			.filter((d: ChartDataRow) => {
				const isHousingLedAnnualPopulationChange =
					dataset === 'housing_led_annual_population_change' ||
					dataset === 'housing_led_vs_trend_annual_population_change';

				const isHousingLedZeroPoint =
					isHousingLedAnnualPopulationChange &&
					typeof d.b === 'string' &&
					((dataset === 'housing_led_annual_population_change' &&
						['Central', 'High', 'Low'].includes(d.b)) ||
						(dataset === 'housing_led_vs_trend_annual_population_change' &&
							d.b.startsWith('Housing-led'))) &&
					d.y === 0 &&
					d.xd instanceof Date &&
					d.xd.getFullYear() === 2011;

				if (isHousingLedZeroPoint) {
					return false;
				}
				return true;
			});

		if (options.type === 'date' || dataset === 'job_posts') {
			newData.sort((a: ChartDataRow, b: ChartDataRow) => (a.xd as number) - (b.xd as number));
		}

		return newData;
	});
}
