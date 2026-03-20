<script lang="ts">
    type LLOIntroProps = {
        llos: string[]
    };

    let {llos}: LLOIntroProps = $props();
</script>


<div class="flex flex-col gap-4 ">
    {#each llos as llo}
        <div class="border-l-4 pl-1 border-color-static-brand">
            {llo}
        </div>
    {/each}
</div>
