import { defineCollection, defineConfig, s, type UserConfig } from 'velite';

const baseSchema = s.object({
	title: s.string(),
	description: s.string(),
	path: s.path(),
	content: s.markdown(),
	navLabel: s.string().optional(),
	raw: s.raw()
});

const docSchema = baseSchema
	.extend({
		toc: s.toc(),
		section: s.enum([
			'Foreword',
			'London in Figures',
			'Key Stories for London',
			'Demography',
			'Economy',
			'Global city and culture',
			'Skills',
			'Social justice',
			'Housing',
			'Environment',
			'Crime',
			'Transport',
			'Children and young people',
			'Health'
		])
	})
	.transform((data) => {
		return {
			...data,
			slug: data.path,
			slugFull: `/${data.path}`
		};
	});



const index = defineCollection({
	name: 'Index',
	pattern: './index.md',
	schema: baseSchema.transform((data) => {
		return {
			...data,
			slug: data.path,
			slugFull: `/${data.path}`
		};
	}),
	single: true
});

const docs = defineCollection({
	name: 'Doc',
	pattern: './report/**/*.md',
	schema: docSchema
});


export default defineConfig({
	root: './src/content',
	collections: {
		index,
		docs,
	//	stateOfLondon
	//	dataVizGuide
	}
}) as UserConfig;
