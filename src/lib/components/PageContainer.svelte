<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { navigation } from '$lib/navigation';
	// import { extSidebarState } from '$lib/state/sidebarState.svelte';
	// import { sidebarOpen } from '$lib/state.svelte';
	import { sidebarState } from '$lib/state.svelte';
	import { AppShell, Sidebar } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';
	import { NavigationMenu } from '@ldn-viz/ui';
	import { findActiveItem } from './navigationMenu/utils';
	import Toc from './toc/Toc.svelte';

	let activeMenuItem = $derived(findActiveItem(navigation, page, resolve));

	interface Props {
		//Treat the content as prose
		prose?: boolean;
		tocItems?: any[];
		children: Snippet;
	}

	let { children, tocItems, prose = true }: Props = $props();
</script>

<div class="relative md:px-4">
	<div
		class="container relative mx-auto -mt-24 border-t-[6px] border-color-surface-accent bg-color-container p-0"
	>
		<AppShell
			sidebarPlacement={{ initial: 'top', sm: 'left' }}
			sidebarAlwaysOpen={{ xl: true }}
			startOpen={false}
		>
			{#snippet sidebar()}
				<!-- fixed inset-x-0 top-[50px] -->
				<div class="fixed inset-x-0 top-[50px] sm:bottom-0 sm:right-auto xl:absolute xl:inset-y-0">
					<Sidebar sidebarId="sideNav" theme="light" bind:state={sidebarState.state}>
						{#snippet sections()}
							<NavigationMenu
								items={navigation}
								activeMenuItemId={activeMenuItem?.id}
								ariaLabel="chapter menu"
							/>
						{/snippet}
					</Sidebar>
				</div>
			{/snippet}
			{#snippet main()}
				<div class="flex">
					<div class={`${prose ? 'prose flow-prose' : 'w-full'} px-8 py-4`}>
						{@render children()}
					</div>
					{#if tocItems?.length}
						<Toc toc={{ items: tocItems }} />
					{/if}
				</div>
			{/snippet}
		</AppShell>
	</div>
</div>
