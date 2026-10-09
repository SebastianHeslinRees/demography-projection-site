<script lang="ts">
	import type { Snippet } from 'svelte';

	import { ChartContainer, type ChartDataRow } from '@ldn-viz/charts';
	import { NonIdealState } from '@ldn-viz/ui';

	import { chartOptions } from '$lib/components/charts/chartOptions.svelte';

	import { loadChartData } from '$lib/components/charts/utils';
	import { getColumnMapping } from '$lib/utils';

	import { Chart } from '@ldn-viz/charts';

	type ChartProps = {
		title: string;

		/**
		 * N.B. this prop name is lowercase as all YAML keys are converted to lowercase by our pipeline
		 */
		subtitle?: string;
		// source?: string;
		byline?: string;
		lloindicator?: string;
		note?: string;

		/**
		 * Data cna either be provided directly as a `data` array, or as the name of a dataset ot be loaded.
		 */
		dataset?: string;
		data?: ChartDataRow[];

		controls?: Snippet;
		dataDownloadButton?: true | false | ('CSV' | 'JSON')[];
		imageDownloadButton?: true | false | ('PNG' | 'SVG')[];
	};

	let {
		title,
		subtitle,
		// source,
		byline,
		dataset,
		lloindicator,
		note,
		data = [],
		controls,
		dataDownloadButton,
		imageDownloadButton
	}: ChartProps = $props();

	let options = $derived(chartOptions.options[dataset]);

	// fetch data
	//let data = $state<ChartDataRow[]>([]);
	let dataLoadFailed = $state(false);
	$effect(() => {
		if (data.length === 0) {
			let cancelled = false;
			dataLoadFailed = false;
			loadChartData(dataset, options)
				.then((newData) => {
					if (!cancelled) {
						data = newData;
					}
				})
				.catch(() => {
					if (!cancelled) {
						dataLoadFailed = true;
					}
				});
			return () => {
				cancelled = true;
			};
		}
	});

	let columnMapping = $derived(getColumnMapping(dataset, data));
</script>

{#if dataLoadFailed}
	<div class="w-full">
		<NonIdealState>Chart data could not be loaded.</NonIdealState>
	</div>
{:else if data.length > 0}
	<Chart
		{data}
		{title}
		subTitle={subtitle}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		{note}
		{columnMapping}
		{dataset}
		{controls}
		{options}
	/>
{:else}
	<ChartContainer
		{data}
		{title}
		subTitle={subtitle}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		{note}
		id={dataset}
		{columnMapping}
		filename={dataset}
		{controls}
	>
		<NonIdealState>Data is loading.</NonIdealState>
	</ChartContainer>
{/if}
