<script lang="ts">
    import type {UpperTree} from "$lib/model/tournamentTree.model";
    import {match, P} from 'ts-pattern';
    import TournamentNode from "$components/tournament_overview/TournamentNode.svelte";

    export let tournamentTree: UpperTree
    export let level: number
    $: leaf = match(tournamentTree)
        .with({node: P._, left: P._, right: P._}, () => false)
        .otherwise(() => true)

</script>


<div class="wrapper">
    {#if (leaf) }
        <TournamentNode node={tournamentTree} />
    {:else}
        <TournamentNode node={tournamentTree.node} />
        <div class:space={level > 1}></div>
        <div class="tail">
            <div class="branch">
                <svelte:self tournamentTree={tournamentTree.left} level={level-1}/>
            </div>
            <div class="branch">
                <svelte:self tournamentTree={tournamentTree.right} level={level-1}/>
            </div>
        </div>
    {/if}
</div>


<style>
    .wrapper {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }

    .space {
        width: calc(var(--tournament-node-width) + 21px);
    }

    .tail {
        flex: 1 1 0;
        display: flex;
        flex-direction: column;
    }

    .branch {
        flex: 1;
    }


</style>
