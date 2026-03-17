<script lang="ts">
	/**
	 * This is based on the @ldn-viz/ui Tooltip ocmponent, but with:
	 * - the disableHoverableContent option removed
	 * - the max-w-[200px] class removed
	 * 
	*/
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { Trigger } from "@ldn-viz/ui";

	type Props = Tooltip.RootProps & {
		hintLabel?: string;
		trigger?: Snippet<[Record<string, any>]>;
		open: boolean;
	};

	let {
		open = $bindable(false),
		hintLabel = 'Hover for tooltip',
		trigger,
		children
	}: Props = $props();
</script>

{#snippet tooltipTrigger()}
	{#if trigger}
		<Tooltip.Trigger>
			{#snippet child({ props })}
				{@render trigger({ ...props })}
			{/snippet}
		</Tooltip.Trigger>
	{:else}
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Trigger {...props} {hintLabel} />
			{/snippet}
		</Tooltip.Trigger>
	{/if}
{/snippet}

<Tooltip.Provider delayDuration={100}>
	<Tooltip.Root disableCloseOnTriggerClick  bind:open>
		{@render tooltipTrigger()}

		<Tooltip.Portal>
			<Tooltip.Content
				class="z-50 border border-color-ui-border-secondary bg-color-container-level-0 p-2 text-sm shadow-lg"
			>
				{@render children?.()}

				<Tooltip.Arrow class="text-color-ui-border-secondary" />
			</Tooltip.Content>
		</Tooltip.Portal>
	</Tooltip.Root>
</Tooltip.Provider>
