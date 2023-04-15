import type {GameId} from "$lib/model/match.model";

export class TournamentNode {
    gameId: GameId = 5
    player1: string | null = null
    player2: string | null = null
    score: [number, number] | null = null

    constructor() {}
}

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
