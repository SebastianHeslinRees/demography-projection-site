<script lang="ts" module>
	export { default as a } from '$lib/components/markdown/a.svelte';
	export { default as img } from '$lib/components/markdown/img.svelte';
	export { default as pre } from '$lib/components/markdown/pre.svelte';
	export { default as section } from '$lib/components/markdown/section.svelte';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
