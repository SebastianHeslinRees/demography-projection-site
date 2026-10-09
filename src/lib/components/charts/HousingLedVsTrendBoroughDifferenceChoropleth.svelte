<script lang="ts">
	import { chartOptions } from '$lib/components/charts/chartOptions.svelte';
	import { loadChartData } from '$lib/components/charts/utils';
	import type { ChartDataRow } from '@ldn-viz/charts';
	import Chart from './Chart.svelte';

	let {
		title,
		subtitle,
		source,
		byline,
		dataset = 'housing_led_vs_trend_central_borough_difference',
		selectedYear = 2051,
		controls
	} = $props();

	let options = $derived(chartOptions.options[dataset]);
	let allData = $state<ChartDataRow[]>([]);

	$effect(() => {
		loadChartData(dataset, options as any).then((newData) => {
			allData = newData;
		});
	});

	let data = $derived.by(() => {
		if (allData.length === 0) return [];

		return allData
			.filter((d) => d.b.toString() === selectedYear.toString())
			.map((d) => ({ ...d, y: Number(d.y) }));
	});
</script>

<Chart
	{dataset}
	{data}
	{title}
	subtitle={`${subtitle ? subtitle + ' ' : ''}Showing percentage difference between the central housing-led and trend projections for ${selectedYear}.`}
	{source}
	{byline}
	{controls}
></Chart>
