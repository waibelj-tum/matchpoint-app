<script lang="ts">
    import type {TournamentNode} from "$lib/model/tournamentTree.model";
    import PlayerAndScore from "$components/tournament_overview/PlayerAndScore.svelte";
    import {highlightedLoserMatch, highlightedWinnerMatch} from "$lib/store";
    export let node: TournamentNode
    $: s1 = node?.score?.[0]
    $: s2 = node?.score?.[1]
    $: winnerHighlight = $highlightedWinnerMatch === node?.gameId
    $: loserHighlight = $highlightedLoserMatch === node?.gameId

    const highlightSuccessors = () => {
        highlightedWinnerMatch.set(node?.winner ?? null)
        highlightedLoserMatch.set(node?.loser ?? null)
    }

    const unHighlightSuccessors = () => {
        highlightedWinnerMatch.set(node?.winner ?? null)
        highlightedLoserMatch.set(node?.loser ?? null)
    }
</script>

<div class="wrapper"
     class:winner-match={winnerHighlight}
     class:loser-match={loserHighlight}
     on:mouseover={highlightSuccessors}
     on:mouseout={unHighlightSuccessors}
>
    <div class="player top">
        <PlayerAndScore player={node.player1} score={s1} winner={s1 > s2}/>
    </div>
    <div class="player">
        <PlayerAndScore player={node.player2} score={s2} winner={s2> s1}/>
    </div>
</div>

<style>
    .wrapper {
        margin: 2px;
        margin-inline: 10px;
        border-radius: 5px;;
        display: flex;
        flex-direction: column;
        height: var(--tournament-node-heigth);
        width: var(--tournament-node-width);
        border-style: var(--tournament-border-style);
        border-color: var(--tournament-border-color);
        border-width: var(--tournament-border-width);
        overflow: hidden;
    }

    .top {
        border-bottom-style: var(--tournament-border-style);
        border-radius: 0;
        border-color: var(--tournament-border-color);
        border-width: var(--tournament-border-width);
    }

    .player {
        flex: 1;
    }

    .winner-match {
        border-color: green;
    }

    .loser-match {
        border-color: red;
    }

</style>
