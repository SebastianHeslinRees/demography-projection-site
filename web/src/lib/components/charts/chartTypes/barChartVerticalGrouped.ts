import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const barChartVerticalGrouped = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    x: {
        label: null,
        axis: null,
        type: options.xScaleType ?? undefined
    },

    y: {
        label: null,
        domain: (options.x_order && options.x_order.includes("|")) ? options.x_order.split("|") : undefined,
    },

    fx: {
        label: null,
        insetLeft: 80
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        /* these don't join up, as each pair of plots is in a different facet :( */
        Plot.gridY(),

        Plot.barY(data, {
            x: "b",
            fx: "xd",
            y: "y",
            fill: "b",
            title: d => [d.b, d.xd, d.y].join("\n"),
            tip: "xy"
            //  inset: 0.5,
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),
    ],
});