<script lang="ts">
  import { ChartContainer } from "@ldn-viz/charts";
  import { ColorLegend } from "@ldn-viz/ui";
  import rewind from "@turf/rewind";
  import { format } from "d3-format";
  import { geoCentroid, geoMercator, geoPath } from "d3-geo";

  import type { Feature, FeatureCollection } from "geojson";

  import boroughs from "./boroughs_simplified.json" with { type: "json" };


  type ChoroplethPlotProps = {
    title: string;
    subtitle: string;
    source: string;
    byline: string;

    areaNameField: string;
    valueField: string;

    data: Data;
    colorScale: any;
    ytickformat: string;
  }

  let {
    title,
    subtitle,
    source,
    byline,

    areaNameField = "xd",
    valueField = "y",

    data,
    colorScale,
    ytickformat
  } = $props();


  type Data = {
    dataset: string;
    xd: string;
    b: string;
    y: number;
  }[];



  let geoData: FeatureCollection;
  geoData = {
    ...boroughs,
    type: "FeatureCollection" as const,
    features: boroughs.features.map(
      (feature) => rewind(feature as any, { reverse: true }) as Feature,
    ),
  };

  let joinedData = $derived.by(() => {
    if (geoData && data.length > 0) {
      const joinedFeatures = [];

      for (const feature of geoData.features) {
        const d = data.find(
          (d: any) => d[areaNameField] === feature.properties?.name,
        );
        if (!d) {
          //  console.log("FAIL FOR:", feature);
        }
        joinedFeatures.push({
          ...feature,
          properties: {
            ...feature.properties,
            value: d ? d[valueField] : undefined,
          },
        });
      }

      return { ...geoData, features: joinedFeatures };
    }
  });

  
  const projection = geoMercator();
  const pathGenerator = geoPath(projection);

  const viewbox = {
    x: 0,
    y: 0,
    width: 500,
    height: 500,
  };

  $effect(() =>
    projection.fitExtent(
      [
        [0, 0],
        [viewbox.width, viewbox.height],
      ],
      geoData,
    ),
  );

  /* **/

  let f = $derived(format(ytickformat ?? ".0f"));

  type TooltipData = {
    label: string;
    value: string;
    x: number;
    y: number;
  };
  let tooltipData: TooltipData | undefined = $state();
  let svg: SVGElement;

  const mouseOver = (ev: MouseEvent, feature: any) => {
    //console.log(feature);

    // this is position within the SVG
    const [svgX, svgY] = projection(geoCentroid(feature.geometry)) as [
      number,
      number,
    ];

    // to get coordinates for element superimposed over SVG, have to invert the effect of the viewBox transform
    const screenX =
      ((svgX - viewbox.x) / viewbox.width) * svg.getBoundingClientRect().width;
    const screenY =
      ((svgY - viewbox.y) / viewbox.height) *
      svg.getBoundingClientRect().height;

    tooltipData = {
      label: feature.properties.name,
      value: f(+feature.properties.value),
      x: screenX,
      y: screenY,
    };
  };

  const mouseLeave = () => {
    tooltipData = undefined;
  };
</script>

{#if joinedData}
  <ChartContainer
    {data}
    {title}
    subTitle={subtitle}
    {source}
    {byline}
    dataDownloadButton={true}
    imageDownloadButton
    chartHeight="h-fit"
  >
    {#key colorScale}
      <div class="w-full max-w-[300px]">
        <ColorLegend
          title={""}
          color={colorScale}
          tickFormat={ytickformat}
        />
      </div>
    {/key}

    <div class="relative">
      <svg
        class="max-w-md"
        viewBox={`${viewbox.x} ${viewbox.y} ${viewbox.width} ${viewbox.height} `}
        bind:this={svg}
      >
        <rect
          x={0}
          width={viewbox.width}
          y={0}
          height={viewbox.height}
          fill="white"
        />

        {#each joinedData.features as feature}
          <path
            d={pathGenerator(feature)}
            class="cursor-pointer"
            stroke="white"
            stroke-width={1}
            fill={colorScale(feature.properties?.value)}
            onmouseover={(ev) => mouseOver(ev, feature)}
            onmouseleave={mouseLeave}
          />
        {/each}
      </svg>

      {#if tooltipData}
        <div
          class="absolute bg-color-container-level-1 p-1 min-h-14 h-fit flex flex-col pointer-events-none"
          style:left={`${tooltipData.x + 12}px`}
          style:top={`${tooltipData.y}px`}
          style:transform="translateY(-50%)"
        >
          <div
            class="absolute bg-color-container-level-1 rotate-45 w-4 h-4"
            style:left="-8px"
            style:top="20px"
          />
          <span class="relative z-50 font-bold">{tooltipData.label}</span>
          <span class="relative z-50">{tooltipData.value}</span>
        </div>
      {/if}
    </div>
  </ChartContainer>
{/if}
