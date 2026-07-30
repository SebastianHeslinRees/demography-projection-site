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
    year = "2024",
  } = $props();

  let options = $derived(chartOptions[dataset]);

  let allData = $state([]);
  loadChartData(dataset, options).then((newData) => { allData = newData; });

  // Filter to the selected year (b field stores the year)
  let data = $derived(allData.filter((d) => d.b === year));

  let colorScale = $derived(scaleThreshold(
    options.colorScale.domain,
    options.colorScale.range,
  ));
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
