import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

// Can do something like this to enumerate child entries for a menu entry
/*
const dataVisualisation = allDocs
	.filter((doc) => doc.section === 'Data visualisation')
	.filter((doc) => doc.slugFull !== '/design-system/data-visualisation')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-data-visualisation`,
		href: `/${doc.slug}`
	}))
	.sort((a, b) => dvPageOrder.indexOf(b.title) - dvPageOrder.indexOf(a.title));
*/

export const navigation = [
	{
		title: 'Report summary',
		id: 'report-summary',
		href: '',
		children: []
	},
	{
		title: 'Overview of the projections',
		id: 'overview-of-the-projections',
		href: '/overview-of-the-projections',
		children: []
	},
	{
		title: 'Projected population',
		id: 'projected-population',
		href: '/projected-population',
		children: []
	},
	{
		title: 'Housing-led projected population',
		id: 'housing-led-projected-population',
		href: '/housing-led-projected-population',
		children: []
	},
	{
		title: 'Housing-led projection vs Trend projections',
		id: 'housing-led-projection-vs-trend-projections',
		href: '/housing-led-projection-vs-trend-projections',
		children: []
	},
	{
		title: 'Development capacity',
		id: 'development-capacity',
		href: '/development-capacity',
		children: []
	},
	{
		title: 'Components of change',
		id: 'components-of-change',
		href: '/components-of-change',
		children: []
	},
	{
		title: 'Interpreting the results',
		id: 'interpreting-the-results',
		href: '/interpreting-the-results',
		children: []
	},
	{
		title: 'Comparisons with 2021-based projections',
		id: 'comparisons-with-2021-based-projections',
		href: '/comparisons-with-2021-based-projections',
		children: []
	},
	{
		title: 'Data sources',
		id: 'data-sources',
		href: '/data-sources',
		children: []
	},
];
