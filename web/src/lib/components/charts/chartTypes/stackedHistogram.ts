import {Plot} from "@ldn-viz/charts";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const stackedHistogram = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    x: {
        label: "Vacancy Rate",
        tickFormat: ".2%",
        insetLeft: 80,
        insetRight: 120, // need space for labels to right of plot
    },

    y: {
        label: "Count",
        domain: (options.forceYDomain_b == 0 && options.forceYDomain_t == 0) ? undefined : [options.forceYDomain_b, options.forceYDomain_t],
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.gridX({interval: '2 years'}),
        Plot.gridY(),

        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        Plot.rectY(data, Plot.binX({y2: "count"}, {x: "y", fill: "b", mixBlendMode: "multiply", tip: "xy"} as any)),
    ]
})