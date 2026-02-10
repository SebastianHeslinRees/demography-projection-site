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
		title: 'Foreword',
		id: 'foreword',
		href: '/report/foreword',
		children: []
	},
	{
		title: 'London in Figures',
		id: 'london-in-figures',
		href: '/report/london-in-figures',
		children: []
	},
	{
		title: 'Key Stories for London',
		id: 'key-stories-for-london',
		href: '/report/key-stories-for-london',
		children: []
	},
	{
		title: 'Demography',
		id: 'demography',
		href: '/report/demography',
		children: []
	},
	{
		title: 'Economy',
		id: 'economy',
		href: '/report/economy',
		children: []
	},
	{
		title: 'Global city and culture',
		id: 'global-city-and-culture',
		href: '/report/global-city-and-culture',
		children: []
	},
	{
		title: 'Skills',
		id: 'skills',
		href: '/report/skills',
		children: []
	},
	{
		title: 'Social justice',
		id: 'social-justice',
		href: '/report/social-justice',
		children: []
	},
	{
		title: 'Housing',
		id: 'housing',
		href: '/report/housing',
		children: []
	},
	{
		title: 'Environment',
		id: 'environment',
		href: '/report/environment',
		children: []
	},
	{
		title: 'Crime',
		id: 'crime',
		href: '/report/crime',
		children: []
	},
	{
		title: 'Transport',
		id: 'transport',
		href: '/report/transport',
		children: []
	},
	{
		title: 'Children and young people',
		id: 'children-and-young-people',
		href: '/report/children-and-young-people',
		children: []
	},
	{
		title: 'Health',
		id: 'health',
		href: '/report/health',
		children: []
	},
];
