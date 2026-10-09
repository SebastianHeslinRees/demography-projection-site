<script lang="ts">
	import { Input } from '@ldn-viz/ui';

	let {
		selectedYear = $bindable(),
		// baseYear,
		label = 'Comparison Year'
	} = $props();
</script>

<div class="w-full space-y-4 md:w-1/2">
	<div class="px-4 pt-4">
		<label for="year-slider" class="block text-sm font-medium text-color-text">
			{label}: <span class="font-bold text-color-interactive-primary-active">{selectedYear}</span>
		</label>
		<Input
			id="year-slider"
			type="range"
			min="2025"
			max="2051"
			step="1"
			bind:value={selectedYear}
			class="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-color-border-muted"
		/>
		<div class="mt-1 flex justify-between text-xs text-color-text-muted">
			<span>2025</span>
			<span>2051</span>
		</div>
	</div>
</div>
