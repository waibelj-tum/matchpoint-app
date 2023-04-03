<script lang="ts">
    import Player from "$lib/Player.svelte";
    import Versus from "$lib/Versus.svelte";
    import Result from "$lib/Result.svelte";
    import {bestOf} from "$lib/store";
    import EditableScore from "$lib/EditableScore.svelte";

    export type Match = {
        player1: string;
        player2: string;
        result: [number, number]
        sets: [number, number][];
    }
    export let match: Match
    let focus: number | null = null

</script>

<tr>
    <td>
        <Player name={match.player1} />
    </td>
    <td>
        <Versus />
    </td>
    <td>
        <Player name={match.player2} />
    </td>

    {#each {length: $bestOf} as _, i}
        <td>
            <EditableScore
                    bind:score={match.sets[i]}
                    edit={focus === i}
                    on:freeFocus={() => focus = null}
                    on:focusNext={() => focus += 1}
                    on:click={() => focus = i}
            />
        </td>
    {/each}

    <td class="result">
        <Result result={match.result}/>
    </td>
</tr>

<style>

    .result {
        border-left-style: solid;
    }

    tr {
        border: solid;
        border-width: 1px 0;
        border-color: grey;
    }
</style>