import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const barChartHorizontal = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    marginLeft: 220, // space for bar labels

    y: {
        label: null,
        domain: (options.x_order && options.x_order.includes("|")) ? options.x_order.split("|") : undefined,
    },

    x: {
        label: null,
        insetLeft: 0,
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.axisX({
            tickFormat: options.ytickformat
        }),

        Plot.gridX(),

        Plot.barX(data, {
            y: "xd",
            x: "y",
            fill: "b",
            title: d => [d.b, d.xd, d.y].join("\n"),
            tip: "xy"
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleX([0])] : []),
    ],
})