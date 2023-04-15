<script lang="ts">
    import type {GameData} from "$lib/model/match.model";
    import {createEventDispatcher} from "svelte";
    import Player from "$components/tournament_flow/Player.svelte";
    import Versus from "$components/tournament_flow/Versus.svelte";

    export let match: GameData
    const dispatch = createEventDispatcher()

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
<td>
    <button on:click={() => dispatch('matchStarted')}>
        Start
    </button>
</td>

<style>
    button {
        background-color: springgreen;
        border-width: 0;
        height: 30px;
        border-radius: 5px;
    }
</style>
