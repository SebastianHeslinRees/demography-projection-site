import {Plot} from "@ldn-viz/charts";
import {theme} from "@ldn-viz/ui";
import type {ChartOptions, ChartDataRow, ColorChoice} from "../chartOptions";

import {extent, ticks, tickStep} from "d3-array";

const getDomain = (data: ChartDataRow[], options: ChartOptions) => {

    const nt = options.numTicks ?? 5;

    const range = extent( data.map(d => d.y)  )

    if (options.includeZero && range[0] > 0){
        range[0] = 0;
    }


    const tickVals = ticks(range[0], range[1], nt)
    const stepSize = tickStep(range[0], range[1], nt)

    let start = tickVals[0];
    if (start > range[0]){
        start -= stepSize;
    }
    if (start !== 0){
        start -= stepSize * 0.2;
    }

    let end = tickVals.slice(-1)[0];

    if (end < range[1]){
        end += stepSize;
    }
    if (end !== 0){
        end += stepSize * 0.2;
    }

    return [start, end];
}

export const lineChart = (options: ChartOptions, data: ChartDataRow[], colorChoice: ColorChoice) => {
    const yDomain = (!options.forceYDomain_b && !options.forceYDomain_t)
        ? getDomain(data, options)
        : [options.forceYDomain_b, options.forceYDomain_t];

    const hasProjectedShading =
        Boolean(options.projectedStart) &&
        options.type === 'date' &&
        data.length > 0;

    const projectedMarks = hasProjectedShading
        ? (() => {
            const xVals = data
                .map((d) => d.xd)
                .filter((d): d is Date => d instanceof Date);
            if (xVals.length === 0) return [];

            const maxX = new Date(Math.max(...xVals.map((d) => d.getTime())));
            const projectedStart = new Date(options.projectedStart as string);

            return [
                Plot.rect([
                    {
                        x1: projectedStart,
                        x2: maxX,
                        y1: yDomain[0],
                        y2: yDomain[1],
                    },
                ], {
                    x1: "x1",
                    x2: "x2",
                    y1: "y1",
                    y2: "y2",
                    fill: theme.tokenNameToValue('data.context'),
                    fillOpacity: 0.1,
                }),
                Plot.ruleX([projectedStart], {
                    stroke: theme.tokenNameToValue('data.context'),
                    strokeWidth: 1.5,
                    strokeDasharray: "4,3",
                    strokeOpacity: 0.6,
                }),
                Plot.text(["Projected →"], {
                    x: projectedStart,
                    y: yDomain[1],
                    dx: 6,
                    dy: 10,
                    textAnchor: "start",
                    lineAnchor: "top",
                    fill: theme.tokenNameToValue('data.context'),
                    fontSize: 11,
                }),
            ];
        })()
        : [];

    const lineMarks = (() => {
        if (!hasProjectedShading) {
            return [
                Plot.line(data, {
                    x: "xd",
                    y: "y",
                    fx: options.faceted ? 'z2' : undefined,
                    stroke: "b",
                    title: d => [d.b, d.xd, d.y].join("\n"),
                    tip: "xy"
                })
            ];
        }

        const projectedStart = new Date(options.projectedStart as string);
        const dateData = data.filter((d): d is ChartDataRow & { xd: Date } => d.xd instanceof Date);

        const historicalData = dateData.filter((d) => d.xd < projectedStart);

        const grouped = new Map<string, (ChartDataRow & { xd: Date })[]>();
        for (const row of dateData) {
            const key = row.b;
            if (!grouped.has(key)) grouped.set(key, []);
            grouped.get(key)!.push(row);
        }

        const projectedData: (ChartDataRow & { xd: Date })[] = [];
        for (const rows of grouped.values()) {
            rows.sort((a, b) => a.xd.getTime() - b.xd.getTime());
            const firstProjectedIdx = rows.findIndex((r) => r.xd >= projectedStart);

            if (firstProjectedIdx === -1) continue;
            if (firstProjectedIdx > 0) projectedData.push(rows[firstProjectedIdx - 1]);
            projectedData.push(...rows.slice(firstProjectedIdx));
        }

        return [
            Plot.line(historicalData, {
                x: "xd",
                y: "y",
                fx: options.faceted ? 'z2' : undefined,
                stroke: "b",
                title: d => [d.b, d.xd, d.y].join("\n"),
                tip: "xy"
            }),
            Plot.line(projectedData, {
                x: "xd",
                y: "y",
                fx: options.faceted ? 'z2' : undefined,
                stroke: "b",
                strokeDasharray: "5,4",
                title: d => [d.b, d.xd, d.y].join("\n"),
                tip: "xy"
            })
        ];
    })();

    return {
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
        domain: yDomain,
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
        ...projectedMarks,

        Plot.gridX(
            //    {interval: '2 years'}
        ),
        Plot.gridY(),

        Plot.axisY({
            tickFormat: options.ytickformat
        }),

        ...((options.includeZero || options.includeZeroLine) ? [Plot.ruleY([0])] : []),

        ...lineMarks,

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
    };
};