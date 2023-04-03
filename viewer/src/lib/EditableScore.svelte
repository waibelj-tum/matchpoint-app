<script lang="ts">
    import ScorePicker from "$lib/ScorePicker.svelte";
    import Score from "$lib/Score.svelte";

    export let score: [number, number] | null
    export let edit = false
</script>

{#if edit}
    <ScorePicker
            bind:score={score}
            on:freeFocus
            on:focusNext
    />
{:else}
    <Score
            score={score}
            on:click
    />
{/if}