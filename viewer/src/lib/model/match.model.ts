export type GameId = number

export class GameData {
    constructor(
        public id: GameId = 5,
        public player1: string,
        public player2: string,
        public result: ResultData = emptyResult()
    ) {
    }

    static fromNewGamePayload(newGame: NewGamePayload): GameData {
        return new GameData(newGame.game_id, newGame.player1, newGame.player2)
    }
}

export type ResultData = {
    score: [number, number] | null
    sets: [number, number][]
}

export function emptyResult(): ResultData {
    return {score: null, sets: []}
}

export class ResultPayload {
    game_id: GameId
    score: [number, number]
    sets: [number, number][]

    constructor(game_id: GameId, result: ResultData) {
        this.game_id = game_id;
        this.score = result.score ?? [0, 0];
        this.sets = result.sets;
    }
}

export type NewGamePayload = {
    game_id: GameId,
    player1: string,
    player2: string,
}
