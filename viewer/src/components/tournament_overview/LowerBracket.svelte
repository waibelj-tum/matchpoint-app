<script lang="ts">
    import type {LowerTree} from "$lib/model/tournamentTree.model";
    import {match, P} from 'ts-pattern';
    import TournamentNode from "$components/tournament_overview/TournamentNode.svelte";

    export let tree: LowerTree
    $: leaf = match(tree)
        .with({node: P._}, () => false)
        .otherwise(() => true)

</script>


<div class="wrapper">
    {#if (leaf) }
        <TournamentNode node={tree}/>
    {:else}
        <TournamentNode node="{tree.node}"/>
        <div class="tail">

            {#if (tree.child)}
                <div class="wrapper2">
                    <svelte:self tree={tree.child}/>
                </div>
            {:else}
                <div class="branch">
                    <svelte:self tree={tree.left}/>
                </div>
                <div class="branch">
                    <svelte:self tree={tree.right}/>
                </div>
            {/if}
        </div>
    {/if}
</div>


<style>

    .wrapper2 {
        margin-top: 20px;
    }

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

    .branch {
        flex: 1;
    }


</style>
