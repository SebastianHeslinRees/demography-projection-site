import { PUBLIC_CHART_DATA_API_URL } from "$env/static/public";
import projectedPopulationChartData from "$lib/data/projectedPopulationChartData.json" with { type: "json" };
import componentsOfChangeData from "$lib/data/ComponentsOfChangeChartData.json" with { type: "json" };

export type ChartDataRow = {
  dataset: string;
  xd: string | number | Date;
  b: string;
  y: number;
};

export type ChartDataOptions = {
  type?: string;
  timeperiod_type?: string;
  hide?: string[];
};

export function fetchChartData(dataset: string): Promise<Response> {
  return fetch(`${PUBLIC_CHART_DATA_API_URL}?dataset=eq.${dataset}`);
}

export function loadChartData(
  dataset: string,
  options: ChartDataOptions,
): Promise<ChartDataRow[]> {
  const convertVal = (val: string): string | number | Date => {
    if (options.type === "integer") return +val;
    if (options.type === "date" && !["Financial Year"].includes(options.timeperiod_type ?? ""))
      return new Date(val);
    return val;
  };

  const localData = (projectedPopulationChartData as ChartDataRow[])
    .concat(componentsOfChangeData as ChartDataRow[])
    .filter((d) => d.dataset === dataset);

  const dataPromise =
    localData.length > 0
      ? Promise.resolve(localData)
      : fetchChartData(dataset).then((res) => res.json());

  return dataPromise
    .then((dataRes) => {
      const newData = dataRes
        .map((d: ChartDataRow) => ({ ...d, xd: convertVal(d.xd as string) }))
        .filter((d: ChartDataRow) => !options.hide || !options.hide.includes(d.b));

      if (options.type === "date" || dataset === "job_posts") {
        newData.sort((a: ChartDataRow, b: ChartDataRow) => (a.xd as number) - (b.xd as number));
      }

      return newData;
    });
}
