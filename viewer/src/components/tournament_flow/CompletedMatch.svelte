<script lang="ts">
    import Versus from "$components/tournament_flow/Versus.svelte";
    import {bestOf} from "$lib/store";
    import type {GameData} from "$lib/model/match.model";
    import Player from "$components/tournament_flow/Player.svelte";
    import EditableScore from "$components/tournament_flow/EditableScore.svelte";
    import Result from "$components/tournament_flow/Result.svelte";

    export let match: GameData

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
                score={match.result.sets[i]}
                edit={false}
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
