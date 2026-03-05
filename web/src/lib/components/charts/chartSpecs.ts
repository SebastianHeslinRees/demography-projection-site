import {Plot, preprocessOptions} from "@ldn-viz/charts";
import {theme} from "@ldn-viz/ui";

export const horizontalBarChart = (options, data, colorChoice) => ({
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
    ],
})


export const verticalBarChart = (options, data, colorChoice) => ({
    x: {
        label: null,
        axis: null,
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
            tip: "xy"
            //  inset: 0.5,
        }),
    ],
});


export const stackedBarChart = (options, data, colorChoice) => ({
    x: {
        label: null,
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
        }),
    ],
});


export const lineChart = (options, data, colorChoice) => ({
    x: {
        label: null,
        insetLeft: 80,
        insetRight: options.insetRight ?? 120, // need space for labels to right of plot

        // 'Financial year' values are like "2013-14"
        type: options.timeperiod_type === 'Financial Year' ? "point" : undefined,
        tickFormat: options.timeperiod_type === 'Financial Year' ? (d, i) => (i % 2 === 0 ? d : "") : undefined,

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
        Plot.gridX(
        //    {interval: '2 years'}
        ),
        Plot.gridY(),

        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),

        Plot.line(data, {
            x: "xd",
            y: "y",
            stroke: "b",
            tip: "xy"
        }),

        // reference lines
        Plot.ruleY((options.reference_lines || []).map(l => l.y), {stroke: theme.tokenNameToValue('data.context'), strokeWidth: 3, strokeDasharray: "4,4"}),

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
                text: "b",
                fill: "b",
                textAnchor: "start",
                dx: 10
            })
        )
    ]
});


export const stackedHistogram = (options, data, colorChoice) => ({
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

        Plot.rectY(data, Plot.binX({y2: "count"}, {x: "y", fill: "b", mixBlendMode: "multiply",  tip: "xy"})),
    ]
})