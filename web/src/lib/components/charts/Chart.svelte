<script lang="ts">
    import {ObservablePlot} from "@ldn-viz/charts";
    import {theme} from "@ldn-viz/ui";

    import {
        horizontalBarChart,
        lineChart,
        verticalBarChart,
        stackedBarChart,
        stackedHistogram,
        incomeSlopeChart
    } from "$lib/components/charts/chartSpecs";
    import {chartOptions} from "$lib/components/charts/chartOptions";

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

    type Data = {
        dataset: string;
        xd: string;
        b: string;
        y: number;
    }[];


    const convertVal = (val) => {
        if (options.type === "integer"){
            return +val;
        } else if (options.type === "date" && !["Financial Year"].includes(options.timeperiod_type) ){
            return new Date(val);
        }
        return val;
    }

    // fetch data
    let data = $state([]);
    fetch(`https://api2.ldn-gis.co.uk/tables/state_of_london/chart_data?dataset=eq.${dataset}`)
        .then(res => res.json())
        .then(dataRes => {

                const newData = data = dataRes.map(d => ({
                    ...d,
                    xd: convertVal(d.xd)
                }))
                    .filter(d => !options.hide || !options.hide.includes(d.b));

                if (dataset === "job_posts"){
                    newData.sort((a, b) => a.xd - b.xd)
                }
                data = newData;

            }
        );

    const getColorScale = (data: Data) => {
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
        const colorChoice = getColorScale(data);

        if (options.chartType === "stackedHistogram"){
            return stackedHistogram(options, data, colorChoice)
        } else if (options.chartType == 'bar') {
            if (options.horiz) {
                return horizontalBarChart(options, data, colorChoice);
            } else if (options.stack) {
                return stackedBarChart(options, data, colorChoice);
            } else {
                return verticalBarChart(options, data, colorChoice);
            }
        } else if (options.chartType === 'line') {
            return lineChart(options, data, colorChoice);
        } else if (options.chartType === 'incomeSlope'){
            return incomeSlopeChart(options, data, colorChoice);
        }
    });
</script>

<!--
<pre>{JSON.stringify(options, null, 2)}</pre>
-->

{#if spec && data.length > 0}
    <div class="w-[1000px]">
        <ObservablePlot
                {data}
                {spec}
                {title}
                subTitle={subtitle}
                {source}
                {byline}
        />
    </div>
{/if}
