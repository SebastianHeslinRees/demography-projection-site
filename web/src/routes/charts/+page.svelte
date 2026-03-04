<script lang="ts">
    import chartDefintions from "./chartMeta.json" with {type: 'json'};
    import {chartOptions} from "$lib/components/charts/chartOptions";

    import Chart from "$lib/components/charts/Chart.svelte";

    const chartTypes = new Array(...new Set(chartDefintions.map(c => chartOptions[c.dataset].chartType)))

    const comments = {
        "victim_satisfaction": "This is really 3 series, correspond to different reporting methods, but this extra field isn't included in the data",
        "food_sec": "In the report this is shown as stacked bars: there seem to be multiple counts for each (date, location) pair, corresponding to different levels of food insecurity"
    };
</script>

<div class="container p-8">

    {#each chartTypes as chartType}
        <h2 class="text-2xl font-bold">{chartType}</h2>

        <div class="flex flex-col gap-4">
            {#each chartDefintions.filter(c => chartOptions[c.dataset].chartType === chartType) as chart, i}
                <div>

                    <h2 class="font-bold text-xl">{i} - {chart.dataset}</h2>

                    {#if comments[chart.dataset]}
							<div
								class="mb-2 w-fit list-none border-l-4 border-amber-400 bg-amber-50 py-1 pr-3 pl-3 text-sm text-gray-700 italic"
							>
                                {comments[chart.dataset]}
                            </div>
                        {/if}

                    <Chart
                            dataset={chart.dataset}

                            title={chart.title}
                            subTitle={chart.subtitle}
                            source={chart.source}
                    />
                </div>
            {/each}
        </div>

    {/each}
</div>