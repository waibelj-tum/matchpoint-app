import type {GameId, NewGamePayload, ResultData} from "$lib/model/match.model";
import {GameData, ResultPayload} from "$lib/model/match.model";
import {emit, type Event, listen, type UnlistenFn} from "@tauri-apps/api/event";
import {invoke} from "@tauri-apps/api/tauri";

function startTournament(): Promise<void> {
    return invoke('start')
}

function provideResult(gameId: GameId, result: ResultData): Promise<void> {
    return invoke('provide_result', {
        result: new ResultPayload(gameId, result)
    })
}

function subscribeNewGames(callback: (newGame: GameData) => void): Promise<UnlistenFn> {
    return listen('new-game', (event: Event<NewGamePayload>) => {
        callback(GameData.fromNewGamePayload(event.payload))
    })
}

export const tournamentService = {
    provideResult: provideResult,
    subscribeNewGames: subscribeNewGames
}
