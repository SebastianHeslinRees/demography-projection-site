import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
	plugins: [enhancedImages(), sveltekit()],
	server: {
		fs: {
			allow: [resolve(import.meta.dirname, './.velite')]
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
