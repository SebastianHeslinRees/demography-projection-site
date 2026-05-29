<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { navigation } from '$lib/navigation';
	import { Button } from '@ldn-viz/ui';
	import { ArrowLeftCircle, ArrowRightCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// An Array of all the pages
	const pages = navigation.flatMap((p) => [p, ...(p.children.length ? p.children : [])]);

	// Match both with and without leading slash
	const currentSlug = $derived(page.data?.metadata?.slugFull?.replace(/^\/+/, '') || '');
	const activeIndex = $derived(pages.findIndex((p) => {
		const navHref = p.href.replace(/^\/+/, '').replace(/\/$/, '');
		return navHref === currentSlug || p.href === `/${currentSlug}` || p.href === `/${currentSlug}/`;
	}));

	const hasActivePage = $derived(activeIndex !== -1);
	const hasPrevPage = $derived(hasActivePage && activeIndex > 0);
	const hasNextPage = $derived(hasActivePage && activeIndex < pages.length - 1);
</script>

<div class="flex justify-between gap-4 p-4 lg:p-8">
	<div>
		{#if hasPrevPage}
			{@const prevPage = pages[activeIndex - 1]}
			{#if prevPage?.href}
				<Button href={resolve(prevPage.href, {})} variant="outline" emphasis="secondary">
					<Icon src={ArrowLeftCircle} theme="outline" class="mr-4 h-8 w-8" aria-hidden="true" />
					<div class="flex flex-col">
						<span class="product label-sm text-color-text-secondary"> Previous </span>
						<span class="product label-lg responsive">{prevPage.title}</span>
					</div>
				</Button>
			{/if}
		{/if}
	</div>
	<div>
		{#if hasNextPage}
			{@const nextPage = pages[activeIndex + 1]}
			{#if nextPage?.href}
				<Button href={resolve(nextPage.href, {})} variant="outline" emphasis="secondary">
					<div class="flex flex-col">
						<span class="product label-sm text-color-text-secondary"> Next </span>
						<span class="product label-lg responsive">{nextPage.title}</span>
					</div>
					<Icon src={ArrowRightCircle} theme="outline" class="ml-4 h-8 w-8" aria-hidden="true" />
				</Button>
			{/if}
		{/if}
	</div>
</div>
