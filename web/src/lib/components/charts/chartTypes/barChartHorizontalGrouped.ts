import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const barChartHorizontalGrouped = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    marginLeft: 220, // space for bar labels

    y: {
        label: null,
        axis: null,
    },

    x: {
        label: null,
        insetLeft: 0,
    },

    fy: {
        label: null,
        anchor: "left",
        domain: (options.x_order && options.x_order.includes("|")) ? options.x_order.split("|") : undefined,
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.axisX({
            tickFormat: options.ytickformat
        }),

        Plot.axisFy({
            anchor: "left",
            tickSize: 0,
        }),

        /* these don't join up, as each pair of plots is in a different facet :( */
        Plot.gridX(),

        Plot.barX(data, {
            y: "b",
            fy: "xd",
            x: "y",
            fill: "b",
            tip: "xy"
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleX([0])] : []),
    ],
})