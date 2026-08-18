<script lang="ts">
	import type { Snippet } from 'svelte';

	import { ChartContainer, ObservablePlot } from '@ldn-viz/charts';
	import { NonIdealState, theme } from '@ldn-viz/ui';

	import { chartOptions } from '$lib/components/charts/chartOptions';

	import { chartFns } from './chartTypes/index';

	import { getColorScale, loadChartData, type ChartDataRow } from '$lib/components/charts/utils';
	import { getColumnMapping } from '$lib/utils';
	import { getDescription } from './descriptions';

	type ChartProps = {
		title: string;

		/**
		 * N.B. this prop name is lowercase as all YAML keys are converted to lowercase by our pipeline
		 */
		subtitle?: string;
		source?: string;
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
		source,
		byline,
		dataset,
		lloindicator,
		note,
		data = [],
		controls,
		dataDownloadButton,
		imageDownloadButton
	}: ChartProps = $props();

	let options = $derived(chartOptions[dataset]);

	// fetch data
	//let data = $state<ChartDataRow[]>([]);
	let dataLoadFailed = $state(false);
	$effect(() => {
        if (data.length === 0){
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

	const sortByField = (data, fieldName) => {
		// sort, placing undefined vals at end
		return [...data].sort((a, b) => {
			if (a[fieldName] == null && b[fieldName] == null) return 0;
			if (a[fieldName] == null) return 1;
			if (b[fieldName] == null) return -1;
			if (a[fieldName] < b[fieldName]) return -1;
			if (a[fieldName] > b[fieldName]) return 1;
			return 0;
		});
	};

	let width = $state(0);

	let colorChoice = $derived(
			theme.currentMode === 'light' ? 
				( options.colorScaleLight?.range ?? options.colorScale?.range  ?? [0]) :
				( options.colorScaleDark?.range ?? options.colorScale?.range  ?? [0]) 
			);

	let spec = $derived.by(() => {
		const chartFn = chartFns[options.chartType];

		if (!chartFn) {
			console.error('No chart generator function found for chart of type:', options.chartType);
			return {};
		}

		const sortedData = ['line', 'lineChartWithLineStyles'].includes(options.chartType)
			? sortByField(data, 'xd')
			: data;
		return chartFn(options, sortedData, colorChoice, width); // N.B. width is only used by line chart
	});

	let lloLabel = $derived(
		lloindicator === 'core'
			? 'Core LLO Indicator'
			: lloindicator
				? 'Supplementary LLO Indicator'
				: undefined
	);

	let combinedNote = $derived([lloLabel, note].filter(Boolean).join(' | '));

	let columnMapping = $derived(getColumnMapping(dataset));

	let description = $derived(getDescription(options, data, colorChoice));

	let isMapChoropleth = $derived(
		options?.chartType === 'boroughChoropleth' || options?.chartType === 'wardChoropleth'
	);
</script>

{#if dataLoadFailed}
	<div class="w-full">
		<NonIdealState>Chart data could not be loaded.</NonIdealState>
	</div>
{:else if spec && data.length > 0}
	<div
		class="w-full py-typography-spacing-3xl"
		class:map-legend-rotated={isMapChoropleth}
		bind:clientWidth={width}
	>
		<ObservablePlot
			{data}
			{spec}
			{title}
			subTitle={subtitle}
			{source}
			{byline}
			{dataDownloadButton}
			{imageDownloadButton}
			note={combinedNote}
			id={dataset}
			{columnMapping}
			filename={dataset}
			alt={description}
            {controls}
		>
        </ObservablePlot>
</div>
{:else}
	<ChartContainer
		{data}
		{title}
		subTitle={subtitle}
		{source}
		{byline}
		{dataDownloadButton}
		{imageDownloadButton}
		note={combinedNote}
		id={dataset}
		{columnMapping}
		filename={dataset}
        {controls}
	>
		<NonIdealState>Data is loading.</NonIdealState>
	</ChartContainer>
{/if}
