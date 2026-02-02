<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	import { Sidebar, SidebarSection } from '@ldn-viz/ui';
    import {findActiveItem} from "$lib/components/navigationMenu/utils";
    import NavigationMenu from "$lib/components/navigationMenu/NavigationMenu.svelte";


    let { navigation } = $props();

	let activeMenuItem = $derived(findActiveItem(navigation, page, resolve));
</script>

<Sidebar theme="light">
	{#snippet sections()}
		<SidebarSection>
			<NavigationMenu
				items={navigation}
				ariaLabel="SiteNavigation"
				activeMenuItemId={activeMenuItem?.id}
			/>
		</SidebarSection>
	{/snippet}
</Sidebar>
