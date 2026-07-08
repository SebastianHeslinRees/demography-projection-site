<script>
	import PageContainer from '$lib/components/pageContainer.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	let { data, children } = $props();
	const tocItems = $derived(data.metadata.toc);
</script>

<PageHead
	title={data.metadata.title}
	subTitle={data.metadata.description}
	image={data.metadata.heroImage}
	intro={data.metadata.intro}
></PageHead>

<PageContainer {tocItems}>
	{@render children()}
</PageContainer>
