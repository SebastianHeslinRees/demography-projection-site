<script lang="ts">
    /**
     * If a link is a footnote back link, we handle it specially to add a back icon
     * (the default back emoji is stripped out by our footnoteBackContent function)
    */
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

    import { ArrowUDownLeft } from '@steeze-ui/phosphor-icons';
	import { Icon } from '@steeze-ui/svelte-icon';
    import FootnoteNumber from './components/FootnoteNumber.svelte';

	let {
		children,
		...restProps
	}: { children: Snippet } & HTMLAttributes<HTMLElement> = $props();

	const isFootnotesBackref= $derived('data-footnote-backref' in restProps);

    const isFootnotesRef = $derived('data-footnote-ref' in restProps);
</script>

{#if isFootnotesBackref}
    <a {...restProps}>
        <Icon src={ArrowUDownLeft} theme="outline" class="ml-0.5 h-4 w-4 hide-in-tooltip" />
        {#if children}
            {@render children()}
        {/if}
    </a>
{:else if isFootnotesRef}

    <FootnoteNumber {...restProps} >
        {#if children}
            {@render children()}
        {/if}
    </FootnoteNumber>

{:else}
    <a {...restProps}>
        {#if children}
	        {@render children()}
        {/if}
    </a>
{/if}
