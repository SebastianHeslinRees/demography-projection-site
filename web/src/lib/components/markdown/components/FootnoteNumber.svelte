<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

    import { Overlay } from '@ldn-viz/ui';
  import Tooltip from './Tooltip.svelte';

	let {
		children,
		...restProps
	}: { children: Snippet } & HTMLAttributes<HTMLElement> = $props();
</script>


<Tooltip>
    {#snippet trigger(props)}
        <a {...props} {...restProps}>
            {@render children()}
        </a>
    {/snippet}

    <div class="prose px-1.5 tooltip !w-fit">
        {@html document.getElementById(restProps.href.slice(1))?.innerHTML }
    </div>
</Tooltip>

<style>
:global(.tooltip .hide-in-tooltip) {
    display: none;
}

</style>