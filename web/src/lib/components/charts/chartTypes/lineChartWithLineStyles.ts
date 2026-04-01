import {Plot} from "@ldn-viz/charts";
import {theme} from "@ldn-viz/ui";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

export const lineChartWithLineStyles = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => ({
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

    fx: options.faceted ? {
        label: null
    } : undefined,

    color: {
        legend: true,
        ...colorChoice
    },

    marks: [
        Plot.gridX(
            //    {interval: '2 years'}
        ),
        Plot.gridY(),

        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),

        ...(new Set(data.map(d => d.z2))).values().map((v, i) => Plot.line(data.filter(d => d.z2 === v), {
            x: "xd",
            y: "y",

            strokeDasharray: ['4,0', '4,4'][i],


            stroke: "b",
            title: d => [d.b, d.xd, d.y].join("\n"),
            tip: "xy"
        }),),


        // reference lines
        Plot.ruleY((options.reference_lines || []).map(l => l.y), {
            stroke: theme.tokenNameToValue('data.context'),
            strokeWidth: 3,
            strokeDasharray: "4,4"
        }),

        ...(options.reference_lines || []).map(l => Plot.text([l.label], {
            y: l.y,
            lineAnchor: 'bottom',
            dy: -4,
            frameAnchor: 'right'
        })),

        // Label end-point with b
        Plot.dot(data, Plot.selectLast({
                x: "xd",
                y: "y",
                fx: options.faceted ? 'z2' : undefined,

                stroke: 'b',
                strokeWidth: 2,
                fill: 'white',
                fillOpacity: 1,
                r: 5
            })
        ),

        Plot.text(data, Plot.selectLast({
                x: "xd",
                y: "y",
                fx: options.faceted ? 'z2' : undefined,

                text: "b",
                fill: "b",
                textAnchor: "start",
                dx: 10
            })
        )
    ]
});