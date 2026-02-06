import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import {resolve} from "node:path";

export default defineConfig({
	plugins: [sveltekit()],
		server: {
		fs: {
			allow: [resolve(__dirname, './.velite')]
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
