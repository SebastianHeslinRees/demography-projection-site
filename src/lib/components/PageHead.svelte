<script lang="ts">
	import { page } from '$app/state';
	import slugify from 'slugify';

	interface PageHeadProps {
		title: string;
		image: string; // used in lookup of imageModules
		alt?: string; // TODO: check image metadata
		subTitle?: string;
		intro?: string;
		isHomePage?: boolean;
	}

	//TODO!!

	let { title, image, alt, subTitle, intro, isHomePage }: PageHeadProps = $props();

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

<div
	class="dark relative flex aspect-[4/3] flex-col justify-center pb-24 sm:aspect-auto sm:h-[500px] xl:pb-32"
>
	{#key page.url.pathname}
		<!-- Removed transition as image currently doesn't change between pages -->
		<!-- transition:fade={{ duration: 200 }} -->
		<div class="absolute inset-0 bg-color-container">
			<enhanced:img
				src={imageToRender}
				sizes="min(1536px, 100vw)"
				{alt}
				class="h-full w-full object-cover opacity-80"
				aria-hidden={alt ? undefined : true}
			/>
		</div>
	{/key}
	<div
		class="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"
		aria-hidden="true"
	></div>

	<div class="md:px-4" id="header">
		<div class="container relative mx-auto flex h-full py-4">
			<div class="flow-prose prose max-w-none">
				{#if isHomePage}
					<h1 class="display max-w-[20ch] text-color-text">{title}</h1>
				{:else}
					<h1 class="headline max-w-[30ch] text-color-text">{title}</h1>
				{/if}

				{#if subTitle}
					<p class="subhead max-w-[40ch] text-color-text">
						{subTitle}
					</p>
				{/if}

				{#if intro}
					<p class="body text-color-text">
						{intro}
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
