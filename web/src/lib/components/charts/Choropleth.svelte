<script lang="ts">
  import { scaleThreshold } from "d3-scale";

  import { chartOptions } from "$lib/components/charts/chartOptions";
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

  type Data = {
    dataset: string;
    xd: string;
    b: string;
    y: number;
  }[];

  const convertVal = (val) => {
    if (options.type === "integer") {
      return +val;
    } else if (
      options.type === "date" &&
      !["Financial Year"].includes(options.timeperiod_type)
    ) {
      return new Date(val);
    }
    return val;
  };

  let data = $state([]);
  fetch(
    `https://apps.london.gov.uk/api/tables/state_of_london/chart_data?dataset=eq.${dataset}`,
  )
    .then((res) => res.json())
    .then((dataRes) => {
      const newData = (data = dataRes
        .map((d) => ({
          ...d,
          xd: convertVal(d.xd),
        }))
        .filter((d) => !options.hide || !options.hide.includes(d.b)));

      if (dataset === "job_posts") {
        newData.sort((a, b) => a.xd - b.xd);
      }
      data = newData;
    });

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