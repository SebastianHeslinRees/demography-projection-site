<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import Tooltip from './Tooltip.svelte';

	let { children, ...restProps }: { children: Snippet } & HTMLAttributes<HTMLElement> = $props();
</script>

<Tooltip>
	{#snippet trigger(props)}
		<a {...props} {...restProps}>
			{@render children()}
		</a>
	{/snippet}

	<div class="tooltip prose !w-fit px-1.5">
		<!-- eslint-disable-next-line TODO anything that can be done to avoid svelte/no-at-html-tags error? -->
		{@html document.getElementById(restProps.href.slice(1))?.innerHTML}
	</div>
</Tooltip>

<style>
	:global(.tooltip .hide-in-tooltip) {
		display: none;
	}
</style>
