import type {GameId} from "$lib/model/match.model";

export class TournamentNode {
    gameId: GameId
    player1: Player | null = { name: "Alison", id: 1}
    player2: Player | null = { name: "Bob", id: 2}
    score: [number, number] | null = [3,1]
    winner: GameId | null
    loser: GameId | null

    constructor(id: GameId, w: GameId|null, l: GameId|null) {
        this.gameId = id
        this.winner = w
        this.loser = l
    }
}

export type Player = {
    name: string
    id: PlayerId
}

export type PlayerId = number
export type UpperTree = InnerUpperNode | TournamentNode

export type InnerUpperNode = {
    node: TournamentNode,
    left: UpperTree,
    right: UpperTree
}

export type LowerTree = SoloNode | DuoNode | TournamentNode
export type SoloNode = {
    node: TournamentNode
    child: LowerTree
}
export type DuoNode = {
    node: TournamentNode,
    left: LowerTree,
    right: LowerTree
}

export type DoubleEliminationTree = {
    finale: TournamentNode
    upper: UpperTree,
    lower: LowerTree
    level: number
}
