<script lang="ts">
    import {bestOf} from "$lib/store";
    export let result: [number, number] | null

    $bestOf
    $: player1_wins = result?.[0] > $bestOf/2
    $: player2_wins = result?.[1] > $bestOf/2
</script>

<div>
    {#if result != null}
        <span class:winner={player1_wins}>{result[0]??0}</span>
        :
        <span class:winner={player2_wins}>{result[1]??0}</span>
    {:else}
        :
    {/if}
</div>

<style>
    .winner {
        font-weight: bold;
    }

    div {
        border-style: solid;
        width: 50px;
        border-radius: 5px;
        border-width: 1px;
        border-color: lightgrey;
        text-align: center;
        padding: 4px;
        margin: 1px;
    }
</style>