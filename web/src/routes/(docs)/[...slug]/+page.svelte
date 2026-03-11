<script lang="ts">
	import Toc from '$lib/components/toc/Toc.svelte';

	let { data } = $props();

	const PageComponent = $derived(data.component);
	const tocItems = $derived(data.metadata.toc);
</script>

<!-- TODO: adding container her is of course restrictive to items that may want to break out of the column -->
<div class="container prose responsive p-0">
	<div class="my-typography-spacing-xl">
		<p class="mb-0.5 text-xs uppercase tracking-widest text-color-surface-accent">State of London</p>
		<h1 class="headline format">{data.metadata.title}</h1>
		<p class="subhead format">
			{data.metadata.description}
		</p>
	</div>
	<PageComponent />
</div>

<!-- <Toc toc={{ items: tocItems }} /> -->

<style>
    :global(.container > ul) {
        /* @apply list-desc; */
        list-style-type: disc;
    }

    :global(.container > ol) {
        /* @apply list-decimal; */
        list-style-type: decimal;
    }

    :global(.footnotes > ol) {
        /* @apply list-decimal; */
        list-style-type: decimal;
    }


    /**
    Table formatting.
     */
    :global(table) {
        border-collapse: collapse;
        width: 100%;
    }

    /* Header row */
    :global(thead tr th) {
        background-color: var(--global-color-static-gla-grey);
        color: #ffffff;
        font-weight: 600;
        padding: 10px 14px;
        text-align: left;
    }

    :global(thead tr th) {
        color: white !important;
    }

    /* Body rows */
    :global(tbody tr td) {
        padding: 10px 14px;
        vertical-align: top;
        color: #1a1a1a;
    }

    /* Alternating row background — even rows get light grey background */
    :global(tbody tr:nth-child(even) td) {
        background-color: var(--theme-container-level-1);
    }

    /* Odd rows get white background. */
    :global(tbody tr:nth-child(odd) td) {
        background-color: #ffffff;
    }
</style>
