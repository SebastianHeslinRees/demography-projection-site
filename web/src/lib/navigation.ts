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
		href: '/state-of-london/foreword',
		children: introduction
	},
	{
		title: 'London in Figures',
		id: 'london-in-figures',
		href: '/state-of-london/london-in-figures',
		children: foundations
	},
	{
		title: 'Key Stories for London',
		id: 'key-stories-for-london',
		href: '/state-of-london/key-stories-for-london',
		children: applicationDesign
	},
	{
		title: 'Demography',
		id: 'demography',
		href: '/state-of-london/demography',
		children: applicationDesign
	},
	{
		title: 'Economy',
		id: 'economy',
		href: '/state-of-london/economy',
		children: applicationDesign
	},
	{
		title: 'Global city and culture',
		id: 'global-city-and-culture',
		href: '/state-of-london/global-city-and-culture',
		children: applicationDesign
	},
	{
		title: 'Skills',
		id: 'skills',
		href: '/state-of-london/skills',
		children: applicationDesign
	},
	{
		title: 'Social justice',
		id: 'social-justice',
		href: '/state-of-london/social-justice',
		children: applicationDesign
	},
	{
		title: 'Housing',
		id: 'housing',
		href: '/state-of-london/housing',
		children: applicationDesign
	},
	{
		title: 'Environment',
		id: 'environment',
		href: '/state-of-london/environment',
		children: applicationDesign
	},
	{
		title: 'Crime',
		id: 'crime',
		href: '/state-of-london/crime',
		children: applicationDesign
	},
	{
		title: 'Transport',
		id: 'transport',
		href: '/state-of-london/transport',
		children: applicationDesign
	},
	{
		title: 'Children and young people',
		id: 'children-and-young-people',
		href: '/state-of-london/children-and-young-people',
		children: applicationDesign
	},
	{
		title: 'Health',
		id: 'health',
		href: '/state-of-london/health',
		children: applicationDesign
	},
];
