<script>
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { navigation } from '$lib/navigation';
	import { Button } from '@ldn-viz/ui';
	import { ArrowLeftCircle, ArrowRightCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// An Array of all the pages
	const pages = navigation.flatMap((p) => [p, ...(p.children.length ? p.children : [])]);

	// Home page slug is /index not /
	const pageSlug = $derived(
		page.data.metadata.slugFull === '/index' ? '/' : page.data.metadata.slugFull
	);

	const activeIndex = $derived(pages.findIndex((p) => p.href === pageSlug));

	const hasActivePage = $derived(activeIndex !== -1);
	const hasPrevPage = $derived(hasActivePage && activeIndex > 0);
	const hasNextPage = $derived(hasActivePage && activeIndex < pages.length - 1);
</script>

<div class="not-prose flex justify-between gap-4 py-4 lg:py-8">
	<div>
		{#if hasPrevPage}
			{@const prevPage = pages[activeIndex - 1]}
			<Button
				href={resolve(prevPage.href)}
				variant="outline"
				class="!border-color-border-muted !px-3"
			>
				<Icon
					src={ArrowLeftCircle}
					theme="outline"
					class="mb-0.5 mr-2 h-6 w-6 self-end"
					aria-hidden="true"
				/>
				<div class="flex flex-col">
					<span class="product label-sm text-color-interactive-primary"> Previous </span>
					<span class="body-lg product leading-snug">{prevPage.title}</span>
				</div>
			</Button>
		{/if}
	</div>
	<div>
		{#if hasNextPage}
			{@const nextPage = pages[activeIndex + 1]}

			<Button
				href={resolve(nextPage.href)}
				variant="outline"
				class="!border-color-border-muted !px-3"
			>
				<div class="flex flex-col">
					<span class="product label-sm text-color-interactive-primary"> Next </span>
					<span class="body-lg product leading-snug">{nextPage.title}</span>
				</div>
				<Icon
					src={ArrowRightCircle}
					theme="outline"
					class="mb-0.5 ml-2 h-6 w-6 self-end"
					aria-hidden="true"
				/>
			</Button>
		{/if}
	</div>
</div>
