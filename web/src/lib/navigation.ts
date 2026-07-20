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
		title: 'Executive summary',
		id: 'executive-summary',
		href: '/report',
		children: []
	},
	{
		title: 'Overview of the projections',
		id: 'overview-of-the-projections',
		href: '/report/overview-of-the-projections',
		children: []
	},
	{
		title: 'Projected population',
		id: 'projected-population',
		href: '/report/projected-population',
		children: []
	},
	{
		title: 'Components of change',
		id: 'components-of-change',
		href: '/report/components-of-change',
		children: []
	},
	{
		title: 'Interpreting the results',
		id: 'interpreting-the-results',
		href: '/report/interpreting-the-results',
		children: []
	},
	{
		title: 'Comparisons with 2021-based projections',
		id: 'comparisons-with-2021-based-projections',
		href: '/report/comparisons-with-2021-based-projections',
		children: []
	},
	{
		title: 'Data sources',
		id: 'data-sources',
		href: '/report/data-sources',
		children: []
	},
];
