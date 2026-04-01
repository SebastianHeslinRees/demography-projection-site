<script lang="ts">
    type LLOSectionProps = {
        llos: string[];
    }

    let {llos}: LLOSectionProps = $props();
</script>


<div class="flex flex-col content-start justify-center items-start gap-1 self-stretch pt-3 pl-4 pr-4 pb-4 mb-6 shadow-sm bg-color-ui-background-notice">
    <span class="title-sm">London-Level Outcome</span>

    <span class="body-sm">This section includes indicators connected to the following London Level {llos.length > 1 ? 'Outcomes' : 'Outcome'}:</span>

    {#each llos as llo}
        <div class="border-l-4 pl-1 border-color-static-brand">
            {llo}
        </div>
    {/each}
</div>
