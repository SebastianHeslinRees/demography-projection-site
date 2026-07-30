<script lang="ts">
	import { page } from '$app/state';
	import slugify from 'slugify';
	import { fade } from 'svelte/transition';

	interface PageHeadProps {
		title: string;
		image: string; // used in lookup of imageModules
		alt?: string; // TODO: check image metadata
		subTitle?: string;
		intro?: string;
	}

	//TODO!!

	let { title, image, alt = 'some alt text', subTitle, intro }: PageHeadProps = $props();

	type ImgModule = {
		default: {
			img: {
				src: string;
				w: number;
				h: number;
			};
			sources: Record<string, string>;
		};
	};

	const imageModules: Record<string, ImgModule> = import.meta.glob(
		'$lib/assets/images/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
		{
			eager: true,
			query: {
				enhanced: true
			}
		}
	);

	/**
	 * This is a rough implementation: If there is an image in the meta, use that.
	 * If not look for a matching jpg based on title
	 * If no file, use a default image
	 */
	const imageToRender = $derived(
		imageModules[image]
			? imageModules[image].default
			: imageModules[`/src/lib/assets/images/pageheads/${slugify(title, { lower: true })}.jpg`]
				? imageModules[`/src/lib/assets/images/pageheads/${slugify(title, { lower: true })}.jpg`]
						.default
				: imageModules['/src/lib/assets/images/pageheads/general-crop.jpg'].default
	);
</script>

<div class="dark relative">
	{#key page.url.pathname}
		<div class="absolute inset-0 bg-color-container" transition:fade={{ duration: 200 }}>
			<enhanced:img
				src={imageToRender}
				sizes="min(1536px, 100vw)"
				{alt}
				class="h-full w-full object-cover opacity-80"
			/>
		</div>
	{/key}
	<div
		class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"
		aria-hidden="true"
	></div>

	<div class="h-[500px] md:px-4" id="header">
		<!--TODO: fixed height may need adjustment-->
		<div class="container relative mx-auto flex h-full pb-48 pt-24">
			<div class="prose responsive">
				<!-- YOu can remove this conditional if you don't want the larger text of the homepage -->
				{#if page.route.id === '/'}
					<h1 class="display format pt-12 lg:pt-6 xl:pt-0">{title}</h1>
				{:else}
					<h1 class="headline format pt-12">{title}</h1>
				{/if}

				{#if subTitle}
					<p
						class="subhead mb-typography-spacing-md max-w-[40ch] pt-typography-spacing-xxs text-color-text"
					>
						{subTitle}
					</p>
				{/if}

				{#if intro}
					<p class="body-md text-color-text">
						{intro}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
