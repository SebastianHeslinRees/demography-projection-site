<script lang="ts">
	import { ObservablePlot, Plot } from '@ldn-viz/charts';
	import { theme } from '@ldn-viz/ui';
	import { format } from 'd3-format';

	type Props = {
		title: string;
		subtitle?: string;
		byline?: string;
		source?: string;
	};

	let { title, subtitle, byline, source }: Props = $props();

	const formatThousands = format('.0f');

	const rawData = [
		{ year: 2022, component: 'Births', value: 110 },
		{ year: 2027, component: 'Births', value: 114 },
		{ year: 2032, component: 'Births', value: 118 },
		{ year: 2037, component: 'Births', value: 120 },
		{ year: 2042, component: 'Births', value: 121 },
		{ year: 2047, component: 'Births', value: 122 },
		{ year: 2022, component: 'Deaths', value: 52 },
		{ year: 2027, component: 'Deaths', value: 55 },
		{ year: 2032, component: 'Deaths', value: 58 },
		{ year: 2037, component: 'Deaths', value: 61 },
		{ year: 2042, component: 'Deaths', value: 64 },
		{ year: 2047, component: 'Deaths', value: 66 },
		{ year: 2022, component: 'Natural change', value: 58 },
		{ year: 2027, component: 'Natural change', value: 59 },
		{ year: 2032, component: 'Natural change', value: 60 },
		{ year: 2037, component: 'Natural change', value: 59 },
		{ year: 2042, component: 'Natural change', value: 57 },
		{ year: 2047, component: 'Natural change', value: 56 }
	];

	const chartData = rawData.map((row) => ({
		...row,
		yearDate: new Date(`${row.year}-01-01`)
	}));

	let spec = $derived({
		x: { type: 'utc', insetLeft: 72, insetRight: 24 },
		color: {
			legend: true,
			type: 'ordinal',
			range: [
				theme.tokenNameToValue('data.primary'),
				theme.tokenNameToValue('data.secondary'),
				theme.tokenNameToValue('data.tertiary')
			]
		},
		marks: [
			Plot.gridX({ interval: '5 years' }),
			Plot.gridY(),
			Plot.axisX({ label: 'Year', interval: '5 years' }),
			Plot.axisY({ label: 'Population change (thousands)', tickFormat: (d) => `${formatThousands(d)}k` }),
			Plot.ruleY([0]),
			Plot.line(chartData, { x: 'yearDate', y: 'value', stroke: 'component', z: 'component' }),
			Plot.ruleX(chartData, Plot.pointerX({ x: 'yearDate' })),
			Plot.point(chartData, Plot.pointer({ x: 'yearDate', y: 'value', stroke: 'component', z: 'component' })),
			Plot.tip(
				chartData,
				Plot.pointer({
					x: 'yearDate',
					y: 'value',
					z: 'component',
					channels: {
						component: 'component',
						year: { value: 'year', label: 'Year' },
						value: { value: 'value', label: 'Change (thousands)' }
					},
					format: {
						component: true,
						year: true,
						value: (d) => `${formatThousands(d)}k`
					}
				})
			)
		]
	});
</script>

<ObservablePlot
	data={chartData}
	spec={spec}
	{title}
	subTitle={subtitle}
	{byline}
	source={source ?? 'Dummy data - replace with projection dataset'}
	note="Placeholder chart for components chapter"
	alt="Line chart showing births, deaths and natural change in London using placeholder values"
/>
