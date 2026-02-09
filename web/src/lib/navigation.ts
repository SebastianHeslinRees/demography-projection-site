import { getAllDocs } from './utils.js';

const allDocs = getAllDocs();

const introduction = allDocs
	.filter((doc) => doc.section === 'Getting Started')
	.filter((doc) => doc.slugFull !== '/design-system/getting-started')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-getting-started`,
		href: `/${doc.slug}`
	}));

const foundations = allDocs
	.filter((doc) => doc.section === 'Foundations')
	.filter((doc) => doc.slugFull !== '/design-system/foundations')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-foundations`,
		href: `/${doc.slug}`
	}));

const applicationDesign = allDocs
	.filter((doc) => doc.section === 'Application design')
	.filter((doc) => doc.slugFull !== '/design-system/application-design')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-application-design`,
		href: `/${doc.slug}`
	}));

//Non alphabetic sort index. N.B reverse order so non listed pages are appended
const dvPageOrder = ['Charts', 'Colour', 'Accessibility', 'Getting started'];

const dataVisualisation = allDocs
	.filter((doc) => doc.section === 'Data visualisation')
	.filter((doc) => doc.slugFull !== '/design-system/data-visualisation')
	.map((doc) => ({
		title: doc.navLabel,
		id: `${doc.title.toLowerCase()}-data-visualisation`,
		href: `/${doc.slug}`
	}))
	.sort((a, b) => dvPageOrder.indexOf(b.title) - dvPageOrder.indexOf(a.title));

export const navigation = [
	{
		title: 'Foreword',
		id: 'foreword',
		href: '/report/foreword',
		children: introduction
	},
	{
		title: 'London in Figures',
		id: 'london-in-figures',
		href: '/report/london-in-figures',
		children: foundations
	},
	{
		title: 'Key Stories for London',
		id: 'key-stories-for-london',
		href: '/report/key-stories-for-london',
		children: applicationDesign
	},
	{
		title: 'Demography',
		id: 'demography',
		href: '/report/demography',
		children: applicationDesign
	},
	{
		title: 'Economy',
		id: 'economy',
		href: '/report/economy',
		children: applicationDesign
	},
	{
		title: 'Global city and culture',
		id: 'global-city-and-culture',
		href: '/report/global-city-and-culture',
		children: applicationDesign
	},
	{
		title: 'Skills',
		id: 'skills',
		href: '/report/skills',
		children: applicationDesign
	},
	{
		title: 'Social justice',
		id: 'social-justice',
		href: '/report/social-justice',
		children: applicationDesign
	},
	{
		title: 'Housing',
		id: 'housing',
		href: '/report/housing',
		children: applicationDesign
	},
	{
		title: 'Environment',
		id: 'environment',
		href: '/report/environment',
		children: applicationDesign
	},
	{
		title: 'Crime',
		id: 'crime',
		href: '/report/crime',
		children: applicationDesign
	},
	{
		title: 'Transport',
		id: 'transport',
		href: '/report/transport',
		children: applicationDesign
	},
	{
		title: 'Children and young people',
		id: 'children-and-young-people',
		href: '/report/children-and-young-people',
		children: applicationDesign
	},
	{
		title: 'Health',
		id: 'health',
		href: '/report/health',
		children: applicationDesign
	},
];
