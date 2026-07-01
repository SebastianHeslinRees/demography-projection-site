<script lang="ts">
    import {ObservablePlot} from "@ldn-viz/charts";
    import {theme} from "@ldn-viz/ui";

    import {chartOptions} from "$lib/components/charts/chartOptions";
    import {loadChartData, type ChartDataRow} from "$lib/components/charts/utils";
    import {stackedHistogram} from "$lib/components/charts/chartTypes/stackedHistogram";
    import {incomeSlopeChart} from "$lib/components/charts/chartTypes/incomeSlopeChart";
    import {barChartHorizontalGrouped} from "$lib/components/charts/chartTypes/barChartHorizontalGrouped";
    import {barChartVerticalGrouped} from "$lib/components/charts/chartTypes/barChartVerticalGrouped";
    import {barChartStacked} from "$lib/components/charts/chartTypes/barChartStacked";
    import {lineChart} from "$lib/components/charts/chartTypes/lineChart";
    import {lineChartWithLineStyles} from "$lib/components/charts/chartTypes/lineChartWithLineStyles";
    import {barChartVertical} from "$lib/components/charts/chartTypes/barChartVertical";
    import {barChartHorizontal} from "$lib/components/charts/chartTypes/barChartHorizontal";
    import {barChartStackedTimeseries} from "$lib/components/charts/chartTypes/barChartStackedTimeseries";

    type ChartProps = {
        title: string;

        /**
         * N.B. this prop name is lowercase as all YAML keys are converted to lowercase by our pipeline
         */
        subtitle?: string;
        source?: string;
        byline?: string;
        lloindicator?: string;

        dataset: string;
    }

    let {
        title,
        subtitle,
        source,
        byline,
        dataset,
        lloindicator,
    }: ChartProps = $props();

    let options = $derived(chartOptions[dataset])

    // fetch data
    let data = $state<ChartDataRow[]>([]);
    loadChartData(dataset, options).then(newData => { data = newData; });

    const getColorScale = (data: ChartDataRow[]) => {
        const domain = new Array(...new Set(data.map(d => d.b))).sort();

        const colors = [
            theme.tokenNameToValue('data.primary'),
            theme.tokenNameToValue('data.secondary'),
            theme.tokenNameToValue('data.tertiary'),
            theme.tokenNameToValue('data.categorical.turquoise'),
            theme.tokenNameToValue('data.categorical.purple'),
        ];

        if (domain.length === 2 && (domain[0].includes("London") || domain[1].includes("London"))) {
            return {
                type: "ordinal",
                domain,
                range: domain.map(v => v.includes('London') ? theme.tokenNameToValue('data.primary') : theme.tokenNameToValue('data.context'))
            };
        } else if (domain.length == 2 && domain[0].includes('Domestic') && domain[1].includes('International')) {
            return {
                type: "ordinal",
                domain,
                range: domain.map(v => v.includes('Domestic') ? theme.tokenNameToValue('data.primary') : theme.tokenNameToValue('data.secondary'))
            }
        } else if (domain.length == 2 && domain[0].includes('Inner') && domain[1].includes('Outer')) {
            return {
                type: "ordinal",
                domain,
                range: domain.map(v => v.includes('Inner') ? theme.tokenNameToValue('data.primary') : theme.tokenNameToValue('data.secondary'))
            }
        } else if (domain.length <= colors.length) {
            return {
                type: "ordinal",
                range: colors.slice(0, domain.length),
            }
        }

        return {};
    }

    let spec = $derived.by(() => {
        if (data.length === 0) {
            return undefined;
        }

        const colorChoice = getColorScale(data);

        if (options.chartType === "stackedHistogram"){
            return stackedHistogram(options, data, colorChoice)
        } else if (options.chartType === 'barChartStacked') {
            return barChartStacked(options, data, colorChoice)
        } else if (options.chartType === 'barChartStackedTimeseries'){
            return barChartStackedTimeseries(options, data, colorChoice)
        } else if (options.chartType === 'barChartHorizontalGrouped'){
            return barChartHorizontalGrouped(options, data, colorChoice)
        } else if (options.chartType === 'barChartVerticalGrouped'){
            return barChartVerticalGrouped(options, data, colorChoice)
        } else if (options.chartType === 'barChartVertical'){
            return barChartVertical(options, data, colorChoice)
        } else if (options.chartType === 'barChartHorizontal'){
            return barChartHorizontal(options, data, colorChoice)
        }




        else if (options.chartType === 'line') {
            return lineChart(options, data, colorChoice);
        } else if (options.chartType === 'incomeSlope'){
            return incomeSlopeChart(options, data, colorChoice);
        } else if (options.chartType === 'lineChartWithLineStyles'){
            return lineChartWithLineStyles(options, data, colorChoice);
        }
    });
</script>

<!--
<pre>{JSON.stringify(options, null, 2)}</pre>
-->

{#if spec && data.length > 0}
    <div class="w-full mb-16">
        <ObservablePlot
                data={data}
                {spec}
                {title}
                subTitle={subtitle}
                {source}
                {byline}
                note={lloindicator === "core" ? "Core indicator" : "Supplementary indicator"}
        />
    </div>
{/if}
