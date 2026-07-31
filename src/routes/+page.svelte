<script lang="ts">
	let { data } = $props();

	const PageComponent = $derived(data.component);
</script>

<svelte:head>
    <title>Population Projections</title>
</svelte:head>


<PageComponent />
