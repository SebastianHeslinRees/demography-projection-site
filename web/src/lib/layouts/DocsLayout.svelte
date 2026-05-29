<script lang="ts">
	import PageNav from '$lib/components/pageNav/PageNav.svelte';
	import { page } from '$app/state';
	import { AppShell } from '@ldn-viz/ui';
	import DocsSidebar from './DocsSidebar.svelte';

	let { children, navigation } = $props();

	const heroImage = $derived(page.data?.metadata?.heroImage ?? '/images/hero/london-rush-hour.jpg');
	const heroTitle = $derived(page.data?.metadata?.title ?? 'Demographic update');
	const heroDescription = $derived(page.data?.metadata?.description ?? '');
</script>

<div class="hero-wrap">
	<div
		class="hero-image"
		style={`background-image: linear-gradient(to bottom, rgba(0,0,0,.45), rgba(0,0,0,.45)), url('${heroImage}')`}
	>
		<div class="hero-content">
			<p class="hero-kicker">GLA Demographics</p>
			<h1 class="hero-title">{heroTitle}</h1>
			{#if heroDescription}
				<p class="hero-subtitle">{heroDescription}</p>
			{/if}
		</div>
	</div>
</div>

<AppShell sidebarPlacement={{ initial: 'left' }} sidebarAlwaysOpen={{ initial: false, md: true }}>
	{#snippet sidebar()}
		<DocsSidebar {navigation} />
	{/snippet}

	{#snippet main()}
		<div class="flex space-x-24 p-4 lg:p-8">
			{@render children?.()}
		</div>
		<PageNav />
	{/snippet}
</AppShell>

<style>
	.hero-wrap {
		margin-top: -1px;
	}

	.hero-image {
		background-size: cover;
		background-position: center;
		min-height: 24rem;
		display: flex;
		align-items: flex-end;
	}

	.hero-content {
		padding: 3rem 2rem;
		max-width: 64rem;
		color: white;
	}

	.hero-kicker {
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.9;
		margin-bottom: 0.4rem;
	}

	.hero-title {
		font-size: clamp(2.2rem, 5vw, 4.5rem);
		line-height: 1.04;
		margin: 0;
	}

	.hero-subtitle {
		font-size: clamp(1.2rem, 2vw, 2rem);
		line-height: 1.2;
		margin-top: 0.7rem;
		margin-bottom: 0;
		max-width: 52rem;
	}

	@media (max-width: 768px) {
		.hero-image {
			min-height: 17rem;
		}

		.hero-content {
			padding: 1.25rem;
		}
	}
</style>
