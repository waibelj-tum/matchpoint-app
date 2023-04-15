<script lang="ts">
    export let score: [number, number] | null
    $: player1_wins = score?.[0] > score?.[1]
    $: player2_wins = score?.[1] > score?.[0]
</script>

<div on:click on:keypress>
    <span class:winner={player1_wins}>{score ? score[0] : ""}</span>
    :
    <span class:winner={player2_wins}>{score ? score[1] : ""}</span>
</div>

<style>
    .winner {
        font-weight: bold;
    }

    div {
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: lightgrey;
        width: 50px;
        text-align: center;
        padding: 4px;
        margin: 4px;
        font-size: 16px;
    }
</style>