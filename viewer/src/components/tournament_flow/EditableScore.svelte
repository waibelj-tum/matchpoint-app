<script lang="ts">
    import ScorePicker from "$components/tournament_flow/ScorePicker.svelte";
    import Score from "$components/tournament_flow/Score.svelte";

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
