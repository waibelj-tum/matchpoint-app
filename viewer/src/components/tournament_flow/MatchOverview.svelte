<script lang="ts">
    import {GameData} from "$lib/model/match.model";
    import {crossfade} from "svelte/transition";
    import {quintOut} from "svelte/easing";
    import {flip} from 'svelte/animate';
    import { invoke } from "@tauri-apps/api/tauri";
    import {tournamentService} from "$lib/service/tournament.service";
    import Match from "$components/tournament_flow/Match.svelte";
    import CompletedMatch from "$components/tournament_flow/CompletedMatch.svelte";
    import UpcomingMatch from "$components/tournament_flow/UpcomingMatch.svelte";


    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
        fallback(node, params) {
            const style = getComputedStyle(node)
            const transform = style.transform === 'none' ? '' : style.transform

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
            }
        }
    })

    let upcomingMatches: GameData[] = []
    let ongoingMatches: GameData[] = []
    let completedMatches: GameData[] = []

    function move<T>(source: T[], target: T[], index: number): [T[], T[]] {
        let match = source[index]
        source = [...source.slice(0, index), ...source.slice(index+1)]
        target = [match, ...target]
        return [source, target]
    }

    function handleMatchStart(index: number) {
        [upcomingMatches, ongoingMatches] = move(upcomingMatches, ongoingMatches, index)
    }

    function handleMatchComplete(index: number) {
        let match = ongoingMatches[index];
        [ongoingMatches, completedMatches] = move(ongoingMatches, completedMatches, index)
        tournamentService.provideResult(match.id, match.result)
    }

    tournamentService.subscribeNewGames(newGame => {
        upcomingMatches = [newGame, ...upcomingMatches]
    })
</script>

<div>
    <div>
        <h3>Upcoming</h3>
        <table>
            {#each upcomingMatches as match, i (match.id)}
                <tr out:send="{{key: match.id}}" animate:flip>
                    <UpcomingMatch match={match} on:matchStarted={() => handleMatchStart(i)}/>
                </tr>
            {/each}
        </table>
    </div>

    <div>
        <h3>Ongoing</h3>
        <table>
            {#each ongoingMatches as match, i (match.id)}
                <tr
                        in:receive="{{key: match.id}}"
                        out:send="{{key: match.id}}"
                        animate:flip
                >
                    <Match
                            bind:match={match}
                            on:matchComplete={() => handleMatchComplete(i)}
                    />

                </tr>
            {/each}
        </table>
    </div>

    <div>
        <h3>Completed</h3>
        <table>
            {#each completedMatches as match (match.id)}
                <tr in:receive="{{key: match.id}}" animate:flip>
                    <CompletedMatch match={match}/>
                </tr>
            {/each}
        </table>
    </div>
    <button on:click={() => invoke('start')}>Start</button>


</div>


<style>
    table {
        border-collapse: collapse;
    }

    tr {
        border: solid;
        border-width: 1px 0;
        border-color: lightgrey;
    }
</style>




