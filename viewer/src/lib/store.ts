import {type Writable, writable} from "svelte/store";
import type {PlayerId} from "$lib/model/tournamentTree.model";
import type {GameId} from "$lib/model/match.model";

export const bestOf = writable(5);

export const highlightedPlayer: Writable<PlayerId|null> = writable(null)

export const highlightedWinnerMatch: Writable<GameId|null> = writable(null)

export const highlightedLoserMatch: Writable<GameId|null> = writable(null)
