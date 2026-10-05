import { docs, index, type Doc, type Guide} from '$content/index';
import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';
import type { Attachment } from 'svelte/attachments';
import { chartColumns } from './components/charts/chartColumns';

const allContent = [...docs, index];

export type ContentResolver = () => Promise<{ default: Component; metadata: Doc | Guide }>;

export const generateMetadata = (slug: string = 'index') => {
	return allContent.find((data) => data.slug === slug);
};

export const getAllDocs = () => {
	return docs;
};

function slugFromPath(path: string) {
	return path.replaceAll(/\/src\/content\/|\/index|\.md$/g, '');
}

export const getContent = async (slug: string = 'index') => {
	const modules = import.meta.glob('/src/content/**/*.md');

	let match: { path?: string; resolver?: ContentResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as ContentResolver };
			break;
		}
	}

	const content = await match?.resolver?.();
	const metadata = generateMetadata(slug);

	if (!content || !metadata) {
		error(404, 'Could not find the document.');
	}

	return {
		component: content.default,
		metadata
	};
};

/** Utility Functions */

// Action that copies details to clipboard
export const clickToCopy: Attachment = (node: HTMLElement, target: any) => {
	async function copyText() {
		let text = target ? document.querySelector(target).innerText : node.innerText;

		try {
			await navigator.clipboard.writeText(text);

			node.dispatchEvent(
				new CustomEvent('copysuccess', {
					bubbles: true
				})
			);
		} catch (error) {
			node.dispatchEvent(
				new CustomEvent('copyerror', {
					bubbles: true,
					detail: error
				})
			);
		}
	}

	node.addEventListener('click', copyText);

	return {
		destroy() {
			node.removeEventListener('click', copyText);
		}
	};
};


export const getColumnMapping = (dataset: string, data: Array<Record<string, unknown>> = []) => {
	const cols =
		chartColumns.find((d) => d.dataset === dataset) ??
		chartColumns.find((d) => d.dataset === '__default__');

	if (cols) {
		const mapping = {
			xd: cols.xd_source ?? 'Date',
			b: cols.b_source ?? 'Trend',
			y: cols.y_source ?? 'Value'
		};

		const hasSecondaryValueData = data.some((row) => {
			const value = row.z2;
			return value !== null && value !== undefined && value !== '';
		});

		if (hasSecondaryValueData && (cols.z2_source ?? 'Secondary Value')) {
			mapping.z2 = cols.z2_source ?? 'Secondary Value';
		}

		return mapping;
	}

	return undefined;
};
