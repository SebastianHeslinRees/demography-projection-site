import {Plot} from "@ldn-viz/charts";
import {theme} from "@ldn-viz/ui";
import {format} from "d3-format";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const incomeSlopeChart = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
    x: {
        label: null,
        insetLeft: 80,
        insetRight: options.insetRight ?? 120, // need space for labels to right of plot

        // 'Financial year' values are like "2013-14"
        type: options.timeperiod_type === 'Financial Year' ? "point" : undefined,
        tickFormat: options.timeperiod_type === 'Financial Year' ? (d: unknown, i: number) => (i % 2 === 0 ? d : "") : undefined,

        ticks: 5
    },

    y: {
        label: null,
        domain: (!options.forceYDomain_b && !options.forceYDomain_t) ? undefined : [options.forceYDomain_b, options.forceYDomain_t],
        includeZero: options.includeZero
    },

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [

        Plot.gridY(),

        Plot.axisY({
            tickFormat: (d: number) => "£" + format(options.ytickformat ?? "2r")(d)
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),

        // sloped line
        Plot.line(data, {
            x: "xd",
            z: "b",
            y: "y",

            stroke: theme.tokenNameToValue('data.context'),
            strokeDasharray: "4,4",
            tip: "xy"
        }),


        // vertical lines
        Plot.line(data, {
            x: "xd",
            z: "xd",
            y: "y",

            stroke: "xd",
        }),


        Plot.dot(data.filter(d => ["10", "50", "90"].includes(d.b)), {
                x: "xd",
                y: "y",
                stroke: 'xd',
                strokeWidth: 2,
                fill: 'white',
                fillOpacity: 1,
                r: 5
            }
        ),

        Plot.text(data.filter(d => ["10", "50", "90"].includes(d.b) && d.xd === "London"), {
                x: "xd",
                y: "y",
                text: d => d.b === "50" ? "Median" : d.b + "th Percentile",
                fill: "xd",
                textAnchor: "end",
                dx: -10
            }
        ),

        Plot.text(data.filter(d => ["10", "50", "90"].includes(d.b) && d.xd !== "London"), {
                x: "xd",
                y: "y",
                text: d => d.b === "50" ? "Median" : d.b + "th Percentile",
                fill: "xd",
                textAnchor: "start",
                dx: 10
            }
        )
    ]
});