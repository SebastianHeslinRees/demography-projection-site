import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const barChartVertical = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    x: {
        label: null,
        insetLeft: 80,
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
            tip: "xy"
            //  inset: 0.5,
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),
    ],
});