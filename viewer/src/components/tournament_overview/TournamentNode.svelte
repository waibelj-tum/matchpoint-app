<script lang="ts">
    import type {TournamentNode} from "$lib/model/tournamentTree.model";
    export let node: TournamentNode
    export let topOffset = 0
</script>

<div class="wrapper">
    <div class="player top">
        {node.player1 ?? ""}
    </div>
    <div class="player">
        {node.player2 ?? ""}
    </div>
</div>

<style>
    .wrapper {
        height: 40px;
        width: 80px;
        border-radius: 5px;
        border-style: solid;
        margin: calc(var(--topOffset) * 1px + 2px);
        margin-inline: 10px;
    }

    .player {
        height: 20px;
    }

    .top {
        border-bottom-style: solid;
    }

</style>
