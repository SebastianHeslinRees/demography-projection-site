import { PUBLIC_CHART_DATA_API_URL } from "$env/static/public";
// Bundled projected population chart rows shipped with the app build.
import projectedPopulationChartData from "$lib/data/projectedPopulationChartData.json" with { type: "json" };
// Bundled components-of-change chart rows shipped with the app build.
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

function getLocalDatasetRows(dataset: string): ChartDataRow[] {
  return (projectedPopulationChartData as ChartDataRow[])
    .concat(componentsOfChangeData as ChartDataRow[])
    .filter((d) => d.dataset === dataset);
}

function getDatasetRows(dataset: string): Promise<ChartDataRow[]> {
  const localRows = getLocalDatasetRows(dataset);

  if (localRows.length > 0) {
    return Promise.resolve(localRows);
  }

  return fetchChartData(dataset).then((res) => res.json());
}

function deriveTotalNetMigrationRows(
  internationalRows: ChartDataRow[],
  domesticRows: ChartDataRow[],
): ChartDataRow[] {
  const internationalByKey = new Map<string, ChartDataRow>();

  for (const row of internationalRows) {
    internationalByKey.set(`${row.b}::${row.xd}`, row);
  }

  const combinedRows: ChartDataRow[] = [];

  for (const domesticRow of domesticRows) {
    const matchingInternational = internationalByKey.get(`${domesticRow.b}::${domesticRow.xd}`);

    if (!matchingInternational) continue;

    combinedRows.push({
      dataset: "total_net_migration",
      xd: domesticRow.xd,
      b: domesticRow.b,
      y: matchingInternational.y + domesticRow.y,
    });
  }

  return combinedRows;
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

  const dataPromise = getDatasetRows(dataset).then((rows) => {
    if (rows.length > 0 || dataset !== "total_net_migration") {
      return rows;
    }

    return Promise.all([
      getDatasetRows("international_net_migration"),
      getDatasetRows("domestic_net_migration"),
    ]).then(([internationalRows, domesticRows]) =>
      deriveTotalNetMigrationRows(internationalRows, domesticRows),
    );
  });

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
