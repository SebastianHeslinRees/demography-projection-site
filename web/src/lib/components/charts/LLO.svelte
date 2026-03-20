<!-- This is now deprecated: the Figma designs now use the LLOIntro and LLOSection components instead, but I'll keep this around for now in case we revert. -->

<script lang="ts">
    type LLOProps = {
        title: string;
    }

    let {title}: LLOProps = $props();
</script>

<div class="inline-flex flex-col px-3 items-start border-l-4 border-color-static-brand mb-12 mt-16">
    <div class="self-stretch text-color-static-brand text-xs font-normal font-medium leading-5 tracking-wide uppercase">
        London Level Outcome
    </div>

    <div class="headline text-3xl">{title}</div>
</div>
