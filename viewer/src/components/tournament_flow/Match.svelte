<script lang="ts">
    import {bestOf} from "$lib/store";
    import {createEventDispatcher} from "svelte";
    import type {GameData} from "$lib/model/match.model";
    import Player from "$components/tournament_flow/Player.svelte";
    import EditableScore from "$components/tournament_flow/EditableScore.svelte";
    import Result from "$components/tournament_flow/Result.svelte";
    import Versus from "$components/tournament_flow/Versus.svelte";

    const dispatch = createEventDispatcher()
    export let match: GameData
    $: match ? updateResult() : {}
    let focus: number | null = null

    function updateResult() {
        match.result.score = computeScore(match.result.sets)
        if (match.result.score?.[0] === 3 || match.result.score?.[1] === 3) {
            dispatch('matchComplete')
        }
    }

    function computeScore(sets?: [number, number][] | null): [number, number] | null {
        return sets?.map(([p1, p2]) => [p1 > p2 ? 1 : 0, p2 > p1 ? 1 : 0])
            ?.reduce(
                ([acc1, acc2], [x1, x2]) => [acc1 + x1, acc2 + x2],
                [0, 0]
            ) ?? null
    }

</script>

<td>
    <Player name={match.player1}/>
</td>
<td>
    <Versus/>
</td>
<td>
    <Player name={match.player2}/>
</td>

{#each {length: $bestOf} as _, i}
    <td>
        <EditableScore
                bind:score={match.result.sets[i]}
                edit={focus === i}
                on:freeFocus={() => focus = null}
                on:focusNext={() => focus += 1}
                on:click={() => focus = i}
        />
    </td>
{/each}

<td class="result">
    <Result result={match.result.score}/>
</td>

<style>
    .result {
        border-left-style: solid;
    }
</style>
