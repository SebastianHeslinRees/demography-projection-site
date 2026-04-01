<script lang="ts">
    import {ChartContainer, ObservablePlot, ObservablePlotInner} from "@ldn-viz/charts";
    import {theme} from "@ldn-viz/ui";

    import {chartOptions} from "$lib/components/charts/chartOptions";
    import {loadChartData, type ChartDataRow} from "$lib/components/charts/utils";
    import {stackedHistogram} from "$lib/components/charts/chartTypes/stackedHistogram";
    import {barChartHorizontalGrouped} from "$lib/components/charts/chartTypes/barChartHorizontalGrouped";
    import {barChartVerticalGrouped} from "$lib/components/charts/chartTypes/barChartVerticalGrouped";
    import {barChartStacked} from "$lib/components/charts/chartTypes/barChartStacked";
    import {lineChart} from "$lib/components/charts/chartTypes/lineChart";

    type ChartProps = {
        title: string;

        /**
         * N.B. this prop name is lowercase as all YAML keys are converted to lowercase by our pipeline
         */
        subtitle?: string;
        source?: string;
        byline?: string;

        dataset: string;
    }

    let {
        title,
        subtitle,
        source,
        byline,
        dataset,
    }: ChartProps = $props();

    let options = $derived(chartOptions[dataset])

    // fetch data
    let data = $state([]);
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
                domain,
                range: colors.slice(0, domain.length),
            }
        }

        return {};
    }

    let facetVals = $derived(options.facetOrder ?? (new Set(data.map(d => d.b))).values())

    let spec = $derived.by(() => (facetVal) => {

        const filteredDate = data.filter(d => d.b === facetVal);

        // filter the colors, so each facet only includes legend for corresponding color
        const colorChoice = getColorScale(data);
        const colorChoiceFacet = colorChoice ? {
            domain: [facetVal],
            range: [colorChoice.range[ colorChoice.domain.indexOf(facetVal) ]]
        } : {};


        if (options.chartType === "stackedHistogram"){
            return stackedHistogram(options, filteredDate, colorChoiceFacet)
        } else if (options.chartType == 'bar') {
            if (options.horiz) {
                return barChartHorizontalGrouped(options, filteredDate, colorChoiceFacet);
            } else if (options.stack) {
                return barChartStacked(options, filteredDate, colorChoiceFacet);
            } else {
                return barChartVerticalGrouped(options, filteredDate, colorChoiceFacet);
            }
        } else if (options.chartType === 'line') {
            return lineChart(options, filteredDate, colorChoiceFacet);
        }
    });
</script>

<!--
<pre>{JSON.stringify(options, null, 2)}</pre>
-->

{#if spec && data.length > 0}
    <div class="w-full">
        <ChartContainer
                data={data}
                {title}
                subTitle={subtitle}
                {source}
                {byline}
                dataDownloadButton={true}
                imageDownloadButton
                chartHeight="h-fit"
        >
            {#each facetVals as facetVal}
                <ObservablePlotInner
                        {data}
                        spec={spec(facetVal)}
                />
            {/each}
        </ChartContainer>
    </div>
{/if}
