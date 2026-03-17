<script lang="ts">
    /**
     * When processing a MarkDown document that includes footnotes,
     * the `remark-gfm` plugin emits a <section> tag with the `data-footnotes`
     * attribute set.
     * 
    */
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		children,
		...restProps
	}: { children: Snippet } & HTMLAttributes<HTMLElement> = $props();

	const isFootnotes = $derived('data-footnotes' in restProps);
</script>

{#if isFootnotes}
	<aside {...restProps} class="footnotes-section text-sm m-top-6 border-t border-gray-300" role="doc-endnotes">
		<h2 class="text-bold text-sm">Footnotes</h2>
		{@render children()}
	</aside>
{:else}
	<section {...restProps}>
		{@render children()}
	</section>
{/if}

<style>
	.footnotes-section :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
	}

	.footnotes-section :global(li p) {
		margin: 0;
	}
</style>
