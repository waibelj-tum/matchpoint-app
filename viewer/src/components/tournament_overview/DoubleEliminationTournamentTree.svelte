<script lang="ts">
    import type {DoubleEliminationTree} from "$lib/model/tournamentTree.model";
    import UpperTournamentTree from "$components/tournament_overview/UpperTournamentTree.svelte";
    import LowerBracket from "$components/tournament_overview/LowerBracket.svelte";
    import TournamentNode from "$components/tournament_overview/TournamentNode.svelte";

    export let tree: DoubleEliminationTree
</script>

<div class="wrapper">

    <TournamentNode node={tree.finale}/>
    <div class="tail">
        <div class="upper">
            <UpperTournamentTree tournamentTree={tree.upper} level={tree.level}/>
        </div>
        <div class="lower">
            <LowerBracket tree={tree.lower} />
        </div>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .tail {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
    }

    .upper {
        flex: 2;
        margin: 8px;
    }

    .lower {
        flex: 1;
        margin: 8px;
    }
</style>
