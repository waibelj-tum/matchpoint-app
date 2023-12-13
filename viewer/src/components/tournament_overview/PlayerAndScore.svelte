<script lang="ts">
    import type {Player} from "$lib/model/tournamentTree.model";
    import {highlightedPlayer} from "$lib/store";

    export let player: Player | null;
    export let score: number | null;
    export let winner: boolean = false

    const highlightPlayer = () => highlightedPlayer.set(player?.id ?? null)
    const unHighlightPlayer = () => highlightedPlayer.set(null)
    $: highlight = $highlightedPlayer === player?.id
</script>

<div class="wrapper" on:mouseover={highlightPlayer} on:mouseout={unHighlightPlayer}>
    <div class="player centered-text" class:highlight={highlight}>
        {player?.name ?? ""}
    </div>
    <div class="score centered-text" class:winner={winner}>
        {score ?? ""}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        border-radius: inherit;
    }

    .score {
        border-left-style: var(--tournament-border-style);
        border-color: var(--tournament-border-color);
        border-width: var(--tournament-border-width);
        width: 20px;
    }

    .highlight {
        background-color: rgba(197, 239, 247, 0.5);
    }

    .player {
        width: 80%;
    }

    .winner {
        font-weight: bold;
    }

    .centered-text {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        height: calc(var(--tournament-node-heigth)/2);
    }
</style>