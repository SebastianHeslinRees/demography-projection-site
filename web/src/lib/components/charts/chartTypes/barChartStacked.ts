import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const barChartStacked = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    x: {
        label: null,
        type: options.xScaleType ?? undefined
    },

    y: {
        label: null,
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        Plot.gridY(),

        Plot.barY(data, {
            x: "xd",
            y: "y",
            fill: "b",
            title: d => [d.b, d.xd, d.y].join("\n"),
            tip: "xy"
        }),
    ],
});