<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { navigation } from '$lib/navigation';
	import { sidebarState } from '$lib/state.svelte';
	import { AppShell, NavigationMenu, Sidebar } from '@ldn-viz/ui';
	import type { Snippet } from 'svelte';
	import Toc from './toc/Toc.svelte';

	let activeMenuItem = $derived(
		navigation.find((item) => resolve(item.href as any) === page.url.pathname)
	);

	interface Props {
		tocItems?: any[];
		children: Snippet;
	}

	let { children, tocItems }: Props = $props();
</script>

<div class="md:px-4">
	<div
		class="container relative mx-auto -mt-24 border-t-[6px] border-color-surface-accent bg-color-canvas xl:-mt-32 xl:pl-0"
	>
		<AppShell
			sidebarPlacement={{ initial: 'left' }}
			sidebarAlwaysOpen={{ xl: true }}
			startOpen={false}
		>
			{#snippet main()}
				<!-- <div class="grid-gutter relative flex p-4 xl:pl-8 2xl:pl-16"> -->
				<div class="grid-gutter relative flex lg:py-4 xl:pl-8 2xl:pl-16">
					<div class="w-full py-4">
						<div class="flow-prose prose">
							{@render children()}
						</div>
					</div>
					{#if tocItems?.length}
						<Toc toc={{ items: tocItems }} />
					{/if}
				</div>
			{/snippet}
			{#snippet sidebar()}
				<div class="fixed bottom-0 left-0 top-[50px] z-30 xl:absolute xl:inset-y-0">
					<Sidebar width="slim" sidebarId="sideNav" theme="light" bind:state={sidebarState.state}>
						{#snippet unstyledContent()}
							<div class="px-6 pt-6 xl:sticky xl:top-[50px]">
								<NavigationMenu
									items={navigation}
									activeMenuItemId={activeMenuItem?.id}
									ariaLabel="chapter menu"
								/>
							</div>
						{/snippet}
					</Sidebar>
				</div>
			{/snippet}
		</AppShell>
	</div>
</div>
