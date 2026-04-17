<script lang="ts">
  import { scaleThreshold } from "d3-scale";

  import { chartOptions } from "$lib/components/charts/chartOptions";
  import { loadChartData } from "$lib/components/charts/utils";
  import ChoroplethPlot from "./ChoroplethPlot.svelte";

  let {
    title,
    subtitle,
    source,
    byline,

    dataset,
    areaNameField = "xd",
    valueField = "y",
  } = $props();

  // fetch data
  // TODO: de-duplicate with other components
  let options = $derived(chartOptions[dataset]);

  let data = $state([]);
  loadChartData(dataset, options).then(newData => { data = newData; });

  let colorScale = scaleThreshold(
    options.colorScale.domain,
    options.colorScale.range,
  );
</script>


<ChoroplethPlot 
    {title}
    {subtitle}
    {source}
    {byline}

    {areaNameField}
    {valueField}

    {data}
    {colorScale}
    ytickformat={options.ytickformat}
/>