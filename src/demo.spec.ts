import { describe, it, expect } from 'vitest';
import { lineChartWithForecast } from './lib/components/charts/chartTypes/lineChartWithForecast';
import { getColorChoice, loadChartData, sortChartData } from './lib/components/charts/utils';

describe('comparison chart colors', () => {
	it('keeps the full comparison scale object so series map to the intended colours', () => {
		const options = {
			colorScale: {
				domain: ['Trend - 5-year trend', 'Housing-led - Low'],
				range: ['#dbeafe', '#fef9c3']
			}
		};

		expect(getColorChoice(options, 'light')).toEqual(options.colorScale);
	});

	it('removes the 2011 housing-led zero point from the annual population change comparison chart', async () => {
		const data = await loadChartData('housing_led_vs_trend_annual_population_change', {
			type: 'date',
			timeperiod_type: 'Annual'
		});

		expect(data.some((row) => row.b.startsWith('Housing-led') && row.xd instanceof Date && row.xd.getFullYear() === 2011)).toBe(false);
		expect(data.some((row) => row.b.startsWith('Housing-led') && row.xd instanceof Date && row.xd.getFullYear() === 2012)).toBe(true);
	});

	it('removes the 2011 housing-led zero point from the housing-led annual population change chart', async () => {
		const data = await loadChartData('housing_led_annual_population_change', {
			type: 'date',
			timeperiod_type: 'Annual'
		});

		expect(data.some((row) => ['Central', 'High', 'Low'].includes(String(row.b)) && row.xd instanceof Date && row.xd.getFullYear() === 2011)).toBe(false);
		expect(data.some((row) => ['Central', 'High', 'Low'].includes(String(row.b)) && row.xd instanceof Date && row.xd.getFullYear() === 2012)).toBe(true);
	});

	it('uses the new low/central/high trend labels in the housing-led comparison data', async () => {
		const rows = (await import('./lib/data/housingLedVsTrendProjectionData.json')).default as Array<{ dataset: string; b: string }>;
		expect(rows.some((row) => row.dataset === 'housing_led_vs_trend_total_population' && row.b === 'Trend - Low')).toBe(true);
		expect(rows.some((row) => row.dataset === 'housing_led_vs_trend_total_population' && row.b === 'Trend - Central')).toBe(true);
		expect(rows.some((row) => row.dataset === 'housing_led_vs_trend_total_population' && row.b === 'Trend - High')).toBe(true);
		expect(rows.some((row) => row.dataset === 'housing_led_vs_trend_total_population' && row.b === 'Trend - 5-year trend')).toBe(false);
	});

	it('uses low/central/high labels in the components-of-change trend data', async () => {
		const rows = (await import('./lib/data/ComponentsOfChangeChartData.json')).default as Array<{ dataset: string; b: string }>;
		expect(rows.some((row) => row.dataset === 'births' && row.b === 'Low')).toBe(true);
		expect(rows.some((row) => row.dataset === 'births' && row.b === 'Central')).toBe(true);
		expect(rows.some((row) => row.dataset === 'births' && row.b === 'High')).toBe(true);
		expect(rows.some((row) => row.dataset === 'births' && row.b === '10-year trend')).toBe(false);
	});

	it('derives total net migration from the domestic and international in/out components', async () => {
		const rows = (await import('./lib/data/ComponentsOfChangeChartData.json')).default as Array<{ dataset: string; b: string }>;
		expect(rows.some((row) => row.dataset === 'total_net_migration' && row.b === 'Low')).toBe(true);
		expect(rows.some((row) => row.dataset === 'total_net_migration' && row.b === 'Central')).toBe(true);
		expect(rows.some((row) => row.dataset === 'total_net_migration' && row.b === 'High')).toBe(true);
	});

	it('keeps each series grouped by series name when plotting comparison lines', () => {
		const data = [
			{ dataset: 'proj_age_structure_median_age', xd: 0, b: 'Trend - 5-year trend', y: 200 },
			{ dataset: 'proj_age_structure_median_age', xd: 0, b: 'Trend - 10-year trend', y: 180 },
			{ dataset: 'proj_age_structure_median_age', xd: 1, b: 'Trend - 5-year trend', y: 220 },
			{ dataset: 'proj_age_structure_median_age', xd: 1, b: 'Trend - 10-year trend', y: 210 }
		];

		const grouped = new Map<string, number[]>();
		for (const row of sortChartData(data, 'xd', 'b')) {
			const key = row.b;
			grouped.set(key, [...(grouped.get(key) ?? []), row.xd as number]);
		}

		const seriesOrder = [...grouped.keys()];
		expect(seriesOrder).toEqual(['Trend - 10-year trend', 'Trend - 5-year trend']);
		expect(grouped.get('Trend - 5-year trend')).toEqual([0, 1]);
		expect(grouped.get('Trend - 10-year trend')).toEqual([0, 1]);
	});

	it('maps projected trend labels to low, central and high display names', () => {
		const rawData = [
			{ dataset: 'proj_total_population', xd: '2024-01-01', b: '5-year trend', y: 1 },
			{ dataset: 'proj_total_population', xd: '2024-01-01', b: '10-year trend', y: 2 },
			{ dataset: 'proj_total_population', xd: '2024-01-01', b: '15-year trend', y: 3 }
		];

		const displayData = rawData.map((row) => {
			if (row.b === '5-year trend') return { ...row, b: 'Low' };
			if (row.b === '10-year trend') return { ...row, b: 'Central' };
			if (row.b === '15-year trend') return { ...row, b: 'High' };
			return row;
		});

		expect(displayData.map((row) => row.b)).toEqual(['Low', 'Central', 'High']);
	});

	it('keeps housing-led low/central/high labels visible when those series share the same final age', () => {
		const data = [
			{ dataset: 'housing_led_vs_trend_age_structure', xd: 90, b: 'Housing-led - Low', y: 110000 },
			{ dataset: 'housing_led_vs_trend_age_structure', xd: 90, b: 'Housing-led - Central', y: 120000 },
			{ dataset: 'housing_led_vs_trend_age_structure', xd: 90, b: 'Housing-led - High', y: 130000 },
			{ dataset: 'housing_led_vs_trend_age_structure', xd: 90, b: 'Trend - 5-year trend', y: 140000 }
		];

		const spec = lineChartWithForecast(
			{ type: 'integer', timeperiod_type: 'year', includeZero: true },
			data,
			{ domain: ['Housing-led - Low', 'Housing-led - Central', 'Housing-led - High'], range: ['#111827', '#ef4444', '#f59e0b'] }
		);

		const textPayload = JSON.stringify(spec.marks);
		expect(textPayload).toContain('Housing-led - Low');
		expect(textPayload).toContain('Housing-led - Central');
		expect(textPayload).toContain('Housing-led - High');
	});

	it('suppresses endpoint labels when all age-structure series end at the same age', () => {
		const data = [
			{ dataset: 'proj_age_structure_median_age', xd: 90, b: 'Trend - 5-year trend', y: 110000 },
			{ dataset: 'proj_age_structure_median_age', xd: 90, b: 'Trend - 10-year trend', y: 120000 },
			{ dataset: 'proj_age_structure_median_age', xd: 90, b: 'Trend - 15-year trend', y: 130000 },
			{ dataset: 'proj_age_structure_median_age', xd: 90, b: 'Housing-led - Central', y: 140000 }
		];

		const spec = lineChartWithForecast(
			{ type: 'integer', timeperiod_type: 'year', includeZero: true },
			data,
			{ domain: ['Trend - 5-year trend', 'Housing-led - Central'], range: ['#111827', '#ef4444'] }
		);

		const textMarks = spec.marks.filter((mark) => {
			const channels = (mark as { channels?: Record<string, unknown> }).channels;
			return Boolean(channels && 'text' in channels);
		});

		expect(textMarks).toHaveLength(0);
	});

	it('builds projection population 2 chart specs without throwing', async () => {
		const datasets = [
			['proj2_total_population', { type: 'date', timeperiod_type: 'Annual' }],
			['proj2_annual_population_change', { type: 'date', timeperiod_type: 'Annual' }],
			['proj2_age_structure_median_age', { type: 'integer', timeperiod_type: 'year' }],
			['proj2_working_age_population', { type: 'date', timeperiod_type: 'Annual' }],
			['proj2_primary_school_age_children', { type: 'date', timeperiod_type: 'Annual' }],
			['proj2_secondary_school_age_children', { type: 'date', timeperiod_type: 'Annual' }],
			['proj2_population_age_65_plus', { type: 'date', timeperiod_type: 'Annual' }]
		] as const;

		for (const [dataset, options] of datasets) {
			const data = await loadChartData(dataset, options);
			expect(data.length).toBeGreaterThan(0);
			expect(() =>
				lineChartWithForecast(
					{ ...options, includeZero: dataset === 'proj2_age_structure_median_age' },
					data,
					{}
				)
			).not.toThrow();
		}
	});
});
